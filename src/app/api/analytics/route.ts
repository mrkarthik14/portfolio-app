import { NextResponse } from 'next/server';
import { getLanguageDistribution } from '@/lib/github';
import { getGitHubSnapshot } from '@/lib/github-sync';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Share the same current GitHub data as projects and profile, including
        // when the optional analytics database has not been configured.
        const { repos, user, totalStars } = await getGitHubSnapshot();
        const [linkedinStats, posts] = process.env.DATABASE_URL
            ? await Promise.all([
                prisma.profileStats.findFirst({ where: { platform: 'linkedin' } }),
                prisma.linkedInPost.findMany(),
            ])
            : [null, []];
        const now = new Date();
        const months = Array.from({ length: 12 }, (_, i) =>
            new Date(now.getFullYear(), now.getMonth() - 11 + i, 1)
                .toLocaleDateString('en', { month: 'short', year: '2-digit' })
        );
        const monthOf = (date: string | Date) => new Date(date)
            .toLocaleDateString('en', { month: 'short', year: '2-digit' });

        return NextResponse.json({
            languageDistribution: getLanguageDistribution(repos),
            activityTimeline: months.map(month => {
                const matching = repos.filter(repo => monthOf(repo.created_at) === month);
                return { month, repos: matching.length, stars: matching.reduce((sum, repo) => sum + repo.stargazers_count, 0) };
            }),
            postFrequency: months.map(month => ({ month, posts: posts.filter(post => monthOf(post.postDate) === month).length })),
            engagementTrends: months.map(month => {
                const matching = posts.filter(post => monthOf(post.postDate) === month);
                return {
                    month,
                    likes: matching.reduce((sum, post) => sum + post.likes, 0),
                    comments: matching.reduce((sum, post) => sum + post.comments, 0),
                };
            }),
            totalStats: {
                repos: user.public_repos,
                stars: totalStars,
                forks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
                posts: posts.length,
                followers: user.followers + (linkedinStats?.followers ?? 0),
                connections: linkedinStats?.connections ?? 0,
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
