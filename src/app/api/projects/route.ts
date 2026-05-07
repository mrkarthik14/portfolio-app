import { NextResponse } from 'next/server';
import { projectEnrichment } from '@/lib/project-enrichment';
import { GitHubRepo } from '@/types';

// Revalidate every hour to prevent GitHub API rate limits
export const revalidate = 3600;

const allowedProjects = [
    "Credit-Card-Fraud-Risk-Analysis",
    "telco-churn-prediction-customer-churn-prediction",
    "Optimizing-E-Commerce-Recommendations-Using-A-B-Testing",
    "marketplace-insights-dashboard",
    "ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard",
    "Zomato-data",
    "Power-BI-projects",
    "TensorTonic-Solutions",
    "faang-ml-journey",
    "AI-Agents",
    "retail-bigquery-analytics",
    "Siri-Travels-Tirupati"
];

export async function GET() {
    try {
        const res = await fetch('https://api.github.com/users/mrkarthik14/repos?per_page=100', {
            headers: {
                // If a token is provided in env, use it to increase rate limit
                ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` }),
                Accept: 'application/vnd.github.v3+json',
            },
        });

        if (!res.ok) {
            throw new Error(`GitHub API returned ${res.status}`);
        }

        const rawRepos: GitHubRepo[] = await res.json();

        // 1. Filter exactly by the allowed projects list
        const filteredRepos = rawRepos.filter(p => allowedProjects.includes(p.name));

        // 2. Map and enrich exactly matching the structure the frontend expects
        const formatted = filteredRepos.map((repo) => {
            const enriched = projectEnrichment[repo.name];
            const githubTopics: string[] = repo.topics || [];
            const skills = enriched?.skills || [];
            // Merge GitHub topics with enrichment skills, deduplicate
            const allTopics = [...new Set([...skills, ...githubTopics])];

            return {
                id: repo.id.toString(),
                githubId: repo.id,
                name: enriched?.title || repo.name,
                url: repo.html_url,
                homepage: repo.homepage,
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                language: repo.language,
                description: enriched?.description || repo.description || 'No description available',
                topics: allTopics,
                skills: skills,
                metrics: enriched?.metrics,
                isFavorite: enriched?.isFavorite || false,
                order: enriched?.order || 99,
                aiAnalysis: enriched?.aiAnalysis,
                createdAt: repo.created_at || new Date().toISOString(),
                updatedAt: repo.updated_at || new Date().toISOString(),
            };
        });

        // 3. Sort primarily by the custom order defined in enrichment, then by stars
        formatted.sort((a, b) => {
            const orderA = a.order ?? 99;
            const orderB = b.order ?? 99;
            if (orderA !== orderB) return orderA - orderB;
            return (b.stars || 0) - (a.stars || 0);
        });

        return NextResponse.json(formatted);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
