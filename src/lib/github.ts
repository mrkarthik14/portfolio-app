import { GitHubRepo } from '@/types';

const GITHUB_API = 'https://api.github.com';

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_ACCESS_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`;
    }

    const repos: GitHubRepo[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const response = await fetch(
            `${GITHUB_API}/users/${username}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
            { headers, next: { revalidate: 0 } }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const data: GitHubRepo[] = await response.json();
        repos.push(...data);
        hasMore = data.length === 100;
        page++;
    }

    return repos;
}

export async function fetchGitHubUser(username: string) {
    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_ACCESS_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`;
    }

    const response = await fetch(`${GITHUB_API}/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
}

export async function fetchGitHubContributions(username: string) {
    // GitHub doesn't expose contributions via REST API easily
    // We'll use the events API as a proxy
    const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_ACCESS_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`;
    }

    const response = await fetch(
        `${GITHUB_API}/users/${username}/events?per_page=100`,
        { headers, next: { revalidate: 3600 } }
    );

    if (!response.ok) {
        return [];
    }

    return response.json();
}

export function filterPortfolioRepos(repos: GitHubRepo[]): GitHubRepo[] {
    return repos.filter(
        (repo) =>
            !repo.name.startsWith('.') &&
            repo.topics?.includes('portfolio')
    );
}

export function getLanguageDistribution(repos: GitHubRepo[]): { name: string; value: number; color: string }[] {
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
