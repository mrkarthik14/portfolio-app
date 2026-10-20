import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createRequire } from 'node:module';
import { createHmac } from 'node:crypto';
import ts from 'typescript';

// Load the real TypeScript modules with isolated framework/database dependencies.
// No test server, GitHub credentials, or live database is required.
const require = createRequire(import.meta.url);
function load(file, overrides = {}) {
    const filename = resolve(file);
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    });
    const loadedModule = { exports: {} };
    const localRequire = name => {
        if (name in overrides) return overrides[name];
        if (name.startsWith('.')) return load(resolve(dirname(filename), `${name}.ts`), overrides);
        if (name.startsWith('@/')) return load(`src/${name.slice(2)}.ts`, overrides);
        return require(name);
    };
    new Function('require', 'module', 'exports', outputText)(localRequire, loadedModule, loadedModule.exports);
    return loadedModule.exports;
}
const initialEnv = { ...process.env };
const initialFetch = globalThis.fetch;
afterEach(() => {
    globalThis.fetch = initialFetch;
    for (const key of ['DATABASE_URL', 'GITHUB_USERNAME', 'GITHUB_ACCESS_TOKEN', 'GITHUB_TOKEN', 'GITHUB_WEBHOOK_SECRET']) {
        if (initialEnv[key] === undefined) delete process.env[key];
        else process.env[key] = initialEnv[key];
    }
});
const repo = (id, extra = {}) => ({
    id, name: `repo-${id}`, description: null, html_url: `https://github.com/owner/repo-${id}`,
    homepage: null, stargazers_count: 0, forks_count: 0, language: 'TypeScript', topics: [],
    created_at: '2026-01-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z',
    private: false, fork: false, ...extra,
});
const user = { login: 'owner', name: 'Owner', followers: 0, public_repos: 0 };
function service({ repos = [repo(1)], db = {}, fetchUser = async () => user } = {}) {
    const invalidated = [];
    const api = load('src/lib/github-sync.ts', {
        './github': {
            fetchGitHubRepos: async () => repos,
            fetchGitHubUser: fetchUser,
            filterPortfolioRepos: load('src/lib/github.ts').filterPortfolioRepos,
            getGitHubUsername: () => 'owner',
        },
        './prisma': { default: db, __esModule: true },
        'next/cache': { unstable_cache: fn => fn, revalidateTag: (...args) => invalidated.push(args) },
    });
    return { ...api, invalidated };
}

test('fetches every repository page and honors the legacy token alias', async () => {
    delete process.env.GITHUB_ACCESS_TOKEN;
    process.env.GITHUB_TOKEN = 'test-only-token';
    const calls = [];
    globalThis.fetch = async (url, options) => {
        calls.push({ url, options });
        return Response.json(calls.length === 1 ? Array.from({ length: 100 }, (_, i) => repo(i)) : [repo(100)]);
    };
    const repos = await load('src/lib/github.ts').fetchGitHubRepos('custom-owner');
    assert.equal(repos.length, 101);
    assert.match(calls[1].url, /users\/custom-owner\/repos\?.*page=2/);
    assert.equal(calls[0].options.headers.Authorization, 'Bearer test-only-token');
    assert.equal(calls[0].options.cache, 'no-store');
});

test('prefers GITHUB_ACCESS_TOKEN consistently for profile requests', async () => {
    process.env.GITHUB_ACCESS_TOKEN = 'primary-test-token';
    process.env.GITHUB_TOKEN = 'legacy-test-token';
    globalThis.fetch = async (_url, options) => {
        assert.equal(options.headers.Authorization, 'Bearer primary-test-token');
        return Response.json(user);
    };
    await load('src/lib/github.ts').fetchGitHubUser('owner');
});

test('includes new untagged projects and excludes private, forked, and hidden repos', () => {
    const { filterPortfolioRepos } = load('src/lib/github.ts');
    assert.deepEqual(filterPortfolioRepos([
        repo(1), repo(2, { private: true }), repo(3, { fork: true }), repo(4, { name: '.hidden' }),
    ]).map(r => r.id), [1]);
});

test('rate limits report actionable errors rather than a successful empty sync', async () => {
    globalThis.fetch = async () => new Response('', { status: 403, headers: { 'x-ratelimit-remaining': '0' } });
    await assert.rejects(load('src/lib/github.ts').fetchGitHubRepos('owner'), /rate limit.*GITHUB_ACCESS_TOKEN/);
});

test('database-free sync really fetches GitHub and expires displayed data', async () => {
    delete process.env.DATABASE_URL;
    let fetched = false;
    const api = service({ fetchUser: async () => { fetched = true; return user; } });
    const result = await api.syncGitHub();
    assert.equal(fetched, true);
    assert.equal(result.persisted, false);
    assert.equal(result.repos, 1);
    assert.deepEqual(api.invalidated, [['github-portfolio', { expire: 0 }]]);
});

test('database sync atomically replaces outdated projects, profile stats, and log', async () => {
    process.env.DATABASE_URL = 'postgresql://test-only';
    const writes = [];
    const tx = {
        project: { upsert: async args => writes.push(['project', args]), deleteMany: async args => writes.push(['delete', args]) },
        profileStats: { upsert: async args => writes.push(['stats', args]) },
        syncLog: { create: async args => writes.push(['log', args]) },
    };
    let transactions = 0;
    const api = service({ repos: [repo(5, { name: 'renamed', stargazers_count: 3 })], db: {
        $transaction: async fn => { transactions++; await fn(tx); },
    } });
    assert.equal((await api.syncGitHub()).persisted, true);
    assert.equal(transactions, 1);
    assert.equal(writes[0][1].where.githubId, 5);
    assert.equal(writes[0][1].update.name, 'renamed');
    assert.deepEqual(writes[1][1].where.githubId.notIn, [5]);
    assert.equal(writes[2][1].update.totalStars, 3);
    assert.equal(writes[2][1].update.followers, 0);
    assert.equal(writes[3][0], 'log');
});

test('failed upstream requests never delete stored projects or acknowledge sync', async () => {
    process.env.DATABASE_URL = 'postgresql://test-only';
    const api = service({ fetchUser: async () => { throw new Error('upstream unavailable'); }, db: {
        $transaction: async () => assert.fail('must not write after a partial GitHub fetch'),
    } });
    await assert.rejects(api.syncGitHub(), /upstream unavailable/);
    assert.deepEqual(api.invalidated, []);
});

test('project display includes newly added repos and retains curated descriptions', async () => {
    const { GET } = load('src/app/api/projects/route.ts', {
        '@/lib/github-sync': { getGitHubSnapshot: async () => ({ repos: [repo(1, { name: 'new-project' }), repo(2, { name: 'Siri-Travels-Tirupati' })] }) },
    });
    const response = await GET();
    const projects = await response.json();
    assert.equal(response.status, 200);
    assert.equal(projects.length, 2);
    assert.equal(projects[0].name, 'Siri Travels Tirupati');
    assert.equal(projects[1].name, 'new-project');
});

test('profile reports fresh zero counts without requiring a database', async () => {
    delete process.env.DATABASE_URL;
    const { GET } = load('src/app/api/profile/route.ts', {
        '@/lib/github-sync': { getGitHubSnapshot: async () => ({ user, totalStars: 0 }) },
        '@/lib/prisma': {},
    });
    const profile = await (await GET()).json();
    assert.equal(profile.github.login, 'owner');
    assert.equal(profile.github.followers, 0);
    assert.equal(profile.github.publicRepos, 0);
    assert.equal(profile.github.totalStars, 0);
});

function webhook() {
    let synced = 0;
    const { POST } = load('src/app/api/github/webhook/route.ts', {
        '@/lib/github-sync': { syncGitHub: async () => { synced++; return { repos: 1 }; } },
        '@/lib/github': { getGitHubUsername: () => 'owner' },
    });
    const request = (signature, body = '{}', event = 'push') => new Request('https://portfolio.example/api/github/webhook', {
        method: 'POST', headers: { 'x-github-event': event, ...(signature ? { 'x-hub-signature-256': signature } : {}) }, body,
    });
    return { POST, request, count: () => synced };
}
test('webhooks reject missing and malformed signatures', async () => {
    process.env.GITHUB_WEBHOOK_SECRET = 'test-only-secret';
    const { POST, request, count } = webhook();
    assert.equal((await POST(request(null))).status, 401);
    assert.equal((await POST(request('sha256=bad'))).status, 401);
    assert.equal(count(), 0);
});

test('signed webhooks sync directly on deployed hosts and filter unrelated owners', async () => {
    process.env.GITHUB_WEBHOOK_SECRET = 'test-only-secret';
    const { POST, request, count } = webhook();
    for (const owner of ['other', 'owner']) {
        const body = JSON.stringify({ repository: { owner: { login: owner } } });
        const signature = `sha256=${createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET).update(body).digest('hex')}`;
        assert.equal((await POST(request(signature, body))).status, 200);
    }
    assert.equal(count(), 1);
});

test('manual sync endpoint propagates upstream failure as non-success', async () => {
    const { POST } = load('src/app/api/github/sync/route.ts', {
        '@/lib/github-sync': { syncGitHub: async () => { throw new Error('GitHub unavailable'); } },
    });
    const response = await POST();
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error, 'GitHub unavailable');
});

test('analytics uses current GitHub data without a database, including zero values', async () => {
    delete process.env.DATABASE_URL;
    const { GET } = load('src/app/api/analytics/route.ts', {
        '@/lib/github-sync': { getGitHubSnapshot: async () => ({ repos: [repo(1)], user, totalStars: 0 }) },
        '@/lib/prisma': {},
    });
    const response = await GET();
    const analytics = await response.json();
    assert.equal(response.status, 200);
    assert.equal(analytics.totalStats.followers, 0);
    assert.equal(analytics.totalStats.stars, 0);
    assert.equal(analytics.totalStats.repos, 0);
    assert.deepEqual(analytics.languageDistribution, [{ name: 'TypeScript', value: 1, color: '#3178C6' }]);
    assert.equal(analytics.activityTimeline.length, 12);
});

test('failed database writes do not expire the last successful portfolio cache', async () => {
    process.env.DATABASE_URL = 'postgresql://test-only';
    const api = service({ db: { $transaction: async () => { throw new Error('database offline'); } } });
    await assert.rejects(api.syncGitHub(), /database offline/);
    assert.deepEqual(api.invalidated, []);
});

test('empty upstream repository list clears previously stored projects', async () => {
    process.env.DATABASE_URL = 'postgresql://test-only';
    let deletion;
    const api = service({ repos: [], db: { $transaction: async fn => fn({
        project: { deleteMany: async args => { deletion = args; } },
        profileStats: { upsert: async () => {} }, syncLog: { create: async () => {} },
    }) } });
    assert.equal((await api.syncGitHub()).repos, 0);
    assert.deepEqual(deletion, { where: { githubId: { notIn: [] } } });
});

test('all identified data science and ML repositories have details and appear in Data Science', () => {
    const { projectEnrichment } = load('src/lib/project-enrichment.ts');
    const { matchesProjectCategory } = load('src/lib/project-categories.ts');
    const names = [
        'SomnoVision', 'Defect-Detection-in-Hot-Rolling', 'END-2-END-ML-PROJECT-WITH-DEPLOYMENT',
        'Emerging-Repos-', 'hackerrank-orchestrate-september26-buy-or-wait-agent', 'ML_Projects',
        'retail-bigquery-analytics', 'retail-data-pipeline-adf-sqlserver-snowflake',
        'Credit-Card-Fraud-Risk-Analysis', 'telco-churn-prediction-customer-churn-prediction',
        'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing', 'marketplace-insights-dashboard',
        'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard', 'Zomato-data',
        'Power-BI-projects', 'TensorTonic-Solutions', 'faang-ml-journey', 'AI-Agents',
    ];
    for (const name of names) {
        const details = projectEnrichment[name];
        const project = { name, description: details?.description || null, skills: details?.skills || [], topics: [] };
        assert.equal(matchesProjectCategory(project, 'data-science'), true, name);
        assert.ok(details?.description, `${name} needs a description`);
    }
});

test('new GitHub ML topics and names appear in filters without curated entries', () => {
    const { matchesProjectCategory } = load('src/lib/project-categories.ts');
    const project = { name: 'new-experiment', description: null, skills: [], topics: ['machine-learning'] };
    assert.equal(matchesProjectCategory(project, 'ml'), true);
    assert.equal(matchesProjectCategory(project, 'data-science'), true);
    assert.equal(matchesProjectCategory({ ...project, name: 'next_ml_project', topics: [] }, 'ml'), true);
    assert.equal(matchesProjectCategory({ ...project, topics: ['data-engineering'] }, 'data-engineering'), true);
    assert.equal(matchesProjectCategory({ ...project, topics: [] }, 'data-science'), false);
});

test('ML apps with Streamlit remain visible under Machine Learning', () => {
    const { matchesProjectCategory } = load('src/lib/project-categories.ts');
    const project = { name: 'churn-dashboard', description: null, skills: ['Machine Learning', 'Streamlit'], topics: [] };
    assert.equal(matchesProjectCategory(project, 'ml'), true);
    assert.equal(matchesProjectCategory(project, 'dashboards'), true);
});

test('profile README mentioning ML is not presented as a data science project', () => {
    const { matchesProjectCategory } = load('src/lib/project-categories.ts');
    assert.equal(matchesProjectCategory({
        name: 'mrkarthik14', description: 'My journey in Data Science and Machine Learning',
        skills: ['Markdown', 'GitHub', 'Personal Branding'], topics: [],
    }, 'data-science'), false);
});
