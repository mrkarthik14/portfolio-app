import { NextResponse } from 'next/server';
import { projectEnrichment } from '@/lib/project-enrichment';
import { getGitHubSnapshot } from '@/lib/github-sync';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { repos: filteredRepos } = await getGitHubSnapshot();

        // Keep curated descriptions and ordering alongside current GitHub data.
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

        // Sort primarily by the custom order defined in enrichment, then by stars
        formatted.sort((a, b) => {
            const orderA = a.order ?? 99;
            const orderB = b.order ?? 99;
            if (orderA !== orderB) return orderA - orderB;
            return (b.stars || 0) - (a.stars || 0);
        });

        return NextResponse.json(formatted);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
