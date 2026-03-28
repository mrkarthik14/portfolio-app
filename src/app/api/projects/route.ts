import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { projectEnrichment } from '@/lib/project-enrichment';
import { fetchGitHubRepos, filterPortfolioRepos } from '@/lib/github';

function enrichProject(p: {
    id?: string;
    githubId: number;
    name: string;
    description: string | null;
    url: string;
    homepage: string | null;
    stars: number;
    forks: number;
    language: string | null;
    topics: string | string[];
    createdAt: Date | string;
    updatedAt: Date | string;
    syncedAt?: Date | string | null;
}) {
    const enriched = projectEnrichment[p.name];
    const rawTopics = typeof p.topics === 'string' ? JSON.parse(p.topics || '[]') : (p.topics || []);
    const skills = enriched?.skills || [];
    const allTopics = [...new Set([...skills, ...rawTopics])];

    return {
        ...p,
        description: enriched?.description || p.description || 'No description available',
        topics: allTopics,
        skills: skills,
        isFavorite: enriched?.isFavorite || false,
        order: enriched?.order || 99,
        aiAnalysis: enriched?.aiAnalysis,
        createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : (p.createdAt || new Date().toISOString()),
        updatedAt: p.updatedAt instanceof Date ? p.updatedAt.toISOString() : (p.updatedAt || new Date().toISOString()),
        syncedAt: p.syncedAt instanceof Date ? p.syncedAt.toISOString() : (p.syncedAt || new Date().toISOString()),
    };
}

async function fetchProjectsFromGitHub() {
    const username = process.env.GITHUB_USERNAME || 'mrkarthik14';
    const allRepos = await fetchGitHubRepos(username);
    let repos = filterPortfolioRepos(allRepos);
    if (repos.length === 0) {
        repos = allRepos.slice(0, 20);
    }

    return repos.map((repo) =>
        enrichProject({
            id: String(repo.id),
            githubId: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            topics: repo.topics || [],
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
        })
    );
}

export async function GET() {
    // Try database first
    if (process.env.DATABASE_URL) {
        try {
            const projects = await prisma.project.findMany({
                orderBy: { stars: 'desc' },
            });

            if (projects.length > 0) {
                const formatted = projects.map((p: any) => enrichProject(p));
                return NextResponse.json(formatted);
            }
        } catch (error) {
            console.warn('Database query failed, falling back to GitHub API:', error instanceof Error ? error.message : error);
        }
    }

    // Fallback: fetch directly from GitHub API
    try {
        const projects = await fetchProjectsFromGitHub();
        return NextResponse.json(projects);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('GitHub API fallback also failed:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
