import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { projectEnrichment } from '@/lib/project-enrichment';

export async function GET() {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json([]);
    }

    try {
        let projects: any[] = [];
        projects = await prisma.project.findMany({
            orderBy: { stars: 'desc' },
        });

        if (projects.length === 0) {
            return NextResponse.json([]);
        }

        // Parse topics and apply enrichment (descriptions + skills)
        const formatted = projects.map((p) => {
            const enriched = projectEnrichment[p.name];
            const githubTopics: string[] = JSON.parse(p.topics || '[]');
            const skills = enriched?.skills || [];
            // Merge GitHub topics with enrichment skills, deduplicate
            const allTopics = [...new Set([...skills, ...githubTopics])];

            return {
                ...p,
                description: enriched?.description || p.description || 'No description available',
                topics: allTopics,
                skills: skills,
                isFavorite: enriched?.isFavorite || false,
                order: enriched?.order || 99,
                aiAnalysis: enriched?.aiAnalysis,
                createdAt: p.createdAt?.toISOString() || new Date().toISOString(),
                updatedAt: p.updatedAt?.toISOString() || new Date().toISOString(),
                syncedAt: p.syncedAt?.toISOString() || new Date().toISOString(),
            };
        });

        return NextResponse.json(formatted);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
