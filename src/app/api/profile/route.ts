import { NextResponse } from 'next/server';
import { fetchGitHubUser } from '@/lib/github';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const username = process.env.GITHUB_USERNAME || 'mrkarthik14';

        // Try to get from DB first (cached from last sync)
        const stats = await prisma.profileStats.findFirst({
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
            name: user?.name || 'Charan Karthik Nayakanti',
            login: user?.login || username,
            avatarUrl: user?.avatar_url || `https://avatars.githubusercontent.com/u/150363006?v=4`,
            bio: user?.bio || 'Data Scientist & Full-Stack Developer',
            followers: user?.followers || stats?.followers || 6,
            publicRepos: user?.public_repos || stats?.publicRepos || 27,
            totalStars: stats?.totalStars || 8,
            location: user?.location || null,
            company: user?.company || null,
            blog: user?.blog || null,
            twitterUsername: user?.twitter_username || null,
            profileUrl: `https://github.com/${username}`,
            linkedinUrl: 'https://www.linkedin.com/in/charankarthiknayakanti/',
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
