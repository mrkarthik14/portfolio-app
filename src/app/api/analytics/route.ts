import { NextResponse } from 'next/server';
import { getLanguageDistribution } from '@/lib/github';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json({
            languageDistribution: [],
            activityTimeline: [],
            postFrequency: [],
            engagementTrends: [],
            totalStats: { repos: 0, stars: 0, forks: 0, posts: 0, followers: 0, connections: 0 }
        });
    }

    try {
        let projects: any[] = [];
        let githubStats: any = null;
        let linkedinStats: any = null;
        let posts: any[] = [];

        [projects, githubStats, linkedinStats, posts] = await Promise.all([
            prisma.project.findMany(),
            prisma.profileStats.findFirst({ where: { platform: 'github' } }),
            prisma.profileStats.findFirst({ where: { platform: 'linkedin' } }),
            prisma.linkedInPost.findMany(),
        ]);

        if (projects.length === 0) {
            return NextResponse.json({
                languageDistribution: [],
                activityTimeline: [],
                postFrequency: [],
                engagementTrends: [],
                totalStats: { repos: 0, stars: 0, forks: 0, posts: 0, followers: 0, connections: 0 }
            });
        }

        // Language distribution from repos
        const repos = projects.map((p: any) => ({
            language: p.language,
            stargazers_count: p.stars,
            forks_count: p.forks,
        }));

        const languageDistribution = getLanguageDistribution(
            repos.map((r: any) => ({ ...r, id: 0, name: '', description: null, html_url: '', homepage: null, topics: [], created_at: '', updated_at: '' }))
        );

        // Activity timeline (last 12 months)
        const now = new Date();
        const months: string[] = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push(d.toLocaleDateString('en', { month: 'short', year: '2-digit' }));
        }

        const activityTimeline = months.map((month) => {
            const reposInMonth = projects.filter((r: any) => {
                const d = new Date(r.createdAt);
                return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
            });
            return {
                month,
                repos: reposInMonth.length,
                stars: reposInMonth.reduce((sum: number, r: any) => sum + r.stars, 0),
            };
        });

        const postFrequency = months.map((month) => {
            const postsInMonth = posts.filter((p: any) => {
                const d = new Date(p.postDate);
                return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
            });
            return { month, posts: postsInMonth.length };
        });

        const engagementTrends = months.map((month) => {
            const postsInMonth = posts.filter((p: any) => {
                const d = new Date(p.postDate);
                return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
            });
            return {
                month,
                likes: postsInMonth.reduce((sum: number, p: any) => sum + p.likes, 0),
                comments: postsInMonth.reduce((sum: number, p: any) => sum + p.comments, 0),
            };
        });

        const totalStars = projects.reduce((sum: number, r: any) => sum + r.stars, 0);
        const totalForks = projects.reduce((sum: number, r: any) => sum + r.forks, 0);

        return NextResponse.json({
            languageDistribution,
            activityTimeline,
            postFrequency,
            engagementTrends,
            totalStats: {
                repos: githubStats?.publicRepos || projects.length,
                stars: totalStars,
                forks: totalForks,
                posts: posts.length,
                followers: (githubStats?.followers || 0) + (linkedinStats?.followers || 0),
                connections: linkedinStats?.connections || 0,
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
