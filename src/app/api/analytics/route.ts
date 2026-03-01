import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { getLanguageDistribution } from '@/lib/github';

export async function GET() {
    try {
        const [projects, githubStats, linkedinStats, posts] = await Promise.all([
            prisma.project.findMany(),
            prisma.profileStats.findFirst({ where: { platform: 'github' } }),
            prisma.profileStats.findFirst({ where: { platform: 'linkedin' } }),
            prisma.linkedInPost.findMany(),
        ]);

        // Language distribution from repos
        const repos = projects.map((p) => ({
            language: p.language,
            stargazers_count: p.stars,
            forks_count: p.forks,
        }));

        const languageDistribution = getLanguageDistribution(
            repos.map((r) => ({ ...r, id: 0, name: '', description: null, html_url: '', homepage: null, topics: [], created_at: '', updated_at: '' }))
        );

        // Activity timeline (last 12 months)
        const now = new Date();
        const months: string[] = [];
        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push(d.toLocaleDateString('en', { month: 'short', year: '2-digit' }));
        }

        const activityTimeline = months.map((month) => {
            const reposInMonth = projects.filter((r) => {
                const d = new Date(r.createdAt);
                return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
            });
            return {
                month,
                repos: reposInMonth.length,
                stars: reposInMonth.reduce((sum, r) => sum + r.stars, 0),
            };
        });

        const postFrequency = months.map((month) => {
            const postsInMonth = posts.filter((p) => {
                const d = new Date(p.postDate);
                return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
            });
            return { month, posts: postsInMonth.length };
        });

        const engagementTrends = months.map((month) => {
            const postsInMonth = posts.filter((p) => {
                const d = new Date(p.postDate);
                return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
            });
            return {
                month,
                likes: postsInMonth.reduce((sum, p) => sum + p.likes, 0),
                comments: postsInMonth.reduce((sum, p) => sum + p.comments, 0),
            };
        });

        const totalStars = projects.reduce((sum, r) => sum + r.stars, 0);
        const totalForks = projects.reduce((sum, r) => sum + r.forks, 0);

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
