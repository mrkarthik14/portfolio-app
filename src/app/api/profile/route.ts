import { NextResponse } from 'next/server';
import { getGitHubSnapshot } from '@/lib/github-sync';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { user, totalStars } = await getGitHubSnapshot();
        // LinkedIn stats are independent of the live GitHub profile.
        const linkedin = process.env.DATABASE_URL
            ? await prisma.profileStats.findFirst({ where: { platform: 'linkedin' } }).catch(() => null)
            : null;
        return NextResponse.json({
            github: {
                name: user.name ?? user.login,
                login: user.login,
                avatarUrl: user.avatar_url,
                bio: user.bio,
                followers: user.followers,
                publicRepos: user.public_repos,
                totalStars,
                location: user.location,
                company: user.company,
                blog: user.blog,
                twitterUsername: user.twitter_username,
                profileUrl: `https://github.com/${user.login}`,
            },
            linkedin: {
                connections: linkedin?.connections ?? 500,
                profileUrl: 'https://www.linkedin.com/in/charankarthiknayakanti/',
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
