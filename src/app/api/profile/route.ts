import { NextResponse } from 'next/server';
import { fetchGitHubUser } from '@/lib/github';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    // Build-time bypass: Next.js evaluates this file statically first
    if (!process.env.DATABASE_URL) {
        return NextResponse.json({
            github: {
                name: 'Charan Karthik Nayakanti',
                login: 'mrkarthik14',
                followers: 6,
                publicRepos: 27,
                totalStars: 8,
            },
            linkedin: { connections: 500 }
        });
    }

    try {
        const username = process.env.GITHUB_USERNAME || 'mrkarthik14';

        let dbStats = null;
        dbStats = await prisma.profileStats.findFirst({
            where: { platform: 'github' },
        });

        // Also fetch fresh from GitHub (lightweight call)
        let user;
        try {
            user = await fetchGitHubUser(username);
        } catch {
            // Fall back to DB
        }

        return NextResponse.json({
            github: {
                name: user?.name || 'Charan Karthik Nayakanti',
                login: user?.login || username,
                avatarUrl: user?.avatar_url || `https://avatars.githubusercontent.com/u/150363006?v=4`,
                bio: user?.bio || 'Data Scientist & Full-Stack Developer',
                followers: Math.max(user?.followers || 0, dbStats?.followers || 6),
                publicRepos: user?.public_repos || dbStats?.publicRepos || 27,
                totalStars: dbStats?.totalStars || 8,
                location: user?.location || null,
                company: user?.company || null,
                blog: user?.blog || null,
                twitterUsername: user?.twitter_username || null,
                profileUrl: `https://github.com/${username}`,
            },
            linkedin: {
                connections: dbStats?.connections || 500, // Fallback if no linkedin stats yet
                profileUrl: 'https://www.linkedin.com/in/charankarthiknayakanti/',
            }
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
