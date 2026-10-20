import { unstable_cache, revalidateTag } from 'next/cache';
import { fetchGitHubRepos, fetchGitHubUser, filterPortfolioRepos, getGitHubUsername } from './github';
import prisma from './prisma';

const CACHE_TAG = 'github-portfolio';

async function fetchSnapshot(username: string) {
    const [allRepos, user] = await Promise.all([
        fetchGitHubRepos(username), fetchGitHubUser(username),
    ]);
    const repos = filterPortfolioRepos(allRepos);
    return { repos, user, totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) };
}

const cachedSnapshot = unstable_cache(fetchSnapshot, ['github-portfolio-v1'], {
    revalidate: 3600,
    tags: [CACHE_TAG],
});

export function getGitHubSnapshot() {
    return cachedSnapshot(getGitHubUsername());
}

export async function syncGitHub() {
    // Always fetch fresh data; never acknowledge a sync without contacting GitHub.
    const snapshot = await fetchSnapshot(getGitHubUsername());
    const { repos, user, totalStars } = snapshot;
    const persisted = Boolean(process.env.DATABASE_URL);

    if (persisted) {
        // One transaction prevents partially refreshed projects/stats and removes
        // repositories that were deleted, made private, or are no longer eligible.
        await prisma.$transaction(async tx => {
            for (const repo of repos) {
                const data = {
                    name: repo.name, description: repo.description, url: repo.html_url,
                    homepage: repo.homepage, stars: repo.stargazers_count,
                    forks: repo.forks_count, language: repo.language,
                    topics: JSON.stringify(repo.topics || []),
                    createdAt: new Date(repo.created_at), updatedAt: new Date(repo.updated_at),
                    syncedAt: new Date(),
                };
                await tx.project.upsert({
                    where: { githubId: repo.id }, update: data,
                    create: { ...data, githubId: repo.id },
                });
            }
            await tx.project.deleteMany({ where: { githubId: { notIn: repos.map(repo => repo.id) } } });
            const stats = { platform: 'github', followers: user.followers, publicRepos: user.public_repos, totalStars, recordedAt: new Date() };
            await tx.profileStats.upsert({
                where: { id: 'github-profile' }, update: stats,
                create: { id: 'github-profile', ...stats },
            });
            await tx.syncLog.create({ data: {
                platform: 'github', status: 'success', message: `Synced ${repos.length} repositories`,
            } });
        }, { timeout: 30000 });
    }

    // Expire immediately so the next projects/profile request observes this sync.
    revalidateTag(CACHE_TAG, { expire: 0 });
    return {
        message: `Successfully refreshed ${repos.length} repositories${persisted ? ' and saved to the database' : ' from GitHub (database not configured)'}`,
        repos: repos.length, persisted,
        user: { name: user.name, avatar: user.avatar_url, bio: user.bio, followers: user.followers, publicRepos: user.public_repos },
    };
}
