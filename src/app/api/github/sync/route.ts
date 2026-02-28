import { NextResponse } from 'next/server';
import { fetchGitHubRepos, fetchGitHubUser } from '@/lib/github';
import prisma from '@/lib/prisma';

export async function POST() {
    try {
        const username = process.env.GITHUB_USERNAME;

        if (!username) {
            return NextResponse.json(
                { error: 'GITHUB_USERNAME not configured' },
                { status: 400 }
            );
        }

        const [repos, user] = await Promise.all([
            fetchGitHubRepos(username),
            fetchGitHubUser(username),
        ]);

        // Upsert all repos into database
        let synced = 0;
        for (const repo of repos) {
            await prisma.project.upsert({
                where: { githubId: repo.id },
                update: {
                    name: repo.name,
                    description: repo.description,
                    url: repo.html_url,
                    homepage: repo.homepage,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language,
                    topics: JSON.stringify(repo.topics || []),
                    updatedAt: new Date(repo.updated_at),
                    syncedAt: new Date(),
                },
                create: {
                    githubId: repo.id,
                    name: repo.name,
                    description: repo.description,
                    url: repo.html_url,
                    homepage: repo.homepage,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language,
                    topics: JSON.stringify(repo.topics || []),
                    createdAt: new Date(repo.created_at),
                    updatedAt: new Date(repo.updated_at),
                    syncedAt: new Date(),
                },
            });
            synced++;
        }

        // Upsert GitHub profile stats
        await prisma.profileStats.upsert({
            where: { id: 'github-profile' },
            update: {
                platform: 'github',
                followers: user.followers,
                publicRepos: user.public_repos,
                totalStars: repos.reduce((sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count, 0),
                recordedAt: new Date(),
            },
            create: {
                id: 'github-profile',
                platform: 'github',
                followers: user.followers,
                publicRepos: user.public_repos,
                totalStars: repos.reduce((sum: number, r: { stargazers_count: number }) => sum + r.stargazers_count, 0),
                recordedAt: new Date(),
            },
        });

        // Log sync
        await prisma.syncLog.create({
            data: {
                platform: 'github',
                status: 'success',
                message: `Synced ${synced} repos, ${user.followers} followers`,
            },
        });

        return NextResponse.json({
            message: `Successfully synced ${synced} repositories`,
            repos: synced,
            user: {
                name: user.name,
                avatar: user.avatar_url,
                bio: user.bio,
                followers: user.followers,
                publicRepos: user.public_repos,
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        await prisma.syncLog.create({
            data: { platform: 'github', status: 'error', message },
        }).catch(() => { });
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ status: 'GitHub sync endpoint ready' });
}
