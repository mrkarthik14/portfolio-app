import { GitHubRepo } from '@/types';

const GITHUB_API = 'https://api.github.com';

export interface GitHubUser {
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    followers: number;
    public_repos: number;
    location: string | null;
    company: string | null;
    blog: string | null;
    twitter_username: string | null;
}

export function getGitHubUsername() {
    return process.env.GITHUB_USERNAME?.trim() || 'mrkarthik14';
}

async function githubRequest<T>(path: string): Promise<T> {
    const token = process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_TOKEN;
    const response = await fetch(`${GITHUB_API}${path}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
        const limited = response.status === 429 ||
            (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0');
        throw new Error(limited
            ? 'GitHub API rate limit reached. Configure GITHUB_ACCESS_TOKEN or retry after the rate limit resets.'
            : `GitHub API request failed (${response.status}). Check the configured username and token permissions.`);
    }
    return response.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
    const repos: GitHubRepo[] = [];
    for (let page = 1; ; page++) {
        const data = await githubRequest<GitHubRepo[]>(
            `/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&sort=updated&type=owner`
        );
        repos.push(...data);
        if (data.length < 100) return repos;
    }
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
    return githubRequest<GitHubUser>(`/users/${encodeURIComponent(username)}`);
}

export async function fetchGitHubContributions(username: string) {
    return githubRequest<unknown[]>(`/users/${encodeURIComponent(username)}/events?per_page=100`);
}

// Public original repositories appear automatically, including new and renamed repos.
// Never let the previous top-20 fallback expose private repositories or forks.
export function filterPortfolioRepos(repos: GitHubRepo[]): GitHubRepo[] {
    return repos.filter(repo => !repo.name.startsWith('.') && !repo.fork && !repo.private);
}

export function getLanguageDistribution(repos: Pick<GitHubRepo, 'language'>[]): { name: string; value: number; color: string }[] {
    const langColors: Record<string, string> = {
        TypeScript: '#3178C6',
        JavaScript: '#F7DF1E',
        Python: '#3776AB',
        Java: '#ED8B00',
        'C#': '#239120',
        Go: '#00ADD8',
        Rust: '#DEA584',
        Ruby: '#CC342D',
        PHP: '#777BB4',
        Swift: '#FA7343',
        Kotlin: '#7F52FF',
        HTML: '#E34F26',
        CSS: '#1572B6',
        Shell: '#89E051',
        Jupyter: '#F37626',
        R: '#276DC3',
    };

    const counts: Record<string, number> = {};
    repos.forEach((repo) => {
        if (repo.language) {
            counts[repo.language] = (counts[repo.language] || 0) + 1;
        }
    });

    return Object.entries(counts)
        .map(([name, value]) => ({
            name,
            value,
            color: langColors[name] || '#94A3B8',
        }))
        .sort((a, b) => b.value - a.value);
}
