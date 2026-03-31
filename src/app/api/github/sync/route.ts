import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { fetchGitHubRepos, fetchGitHubUser, filterPortfolioRepos } from '@/lib/github';
import prisma from '@/lib/prisma';

export async function POST() {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json({ message: 'Build time bypass' });
    }

    try {
        let existingProjects: any[] = [];
        let existingStats = null;
        existingProjects = await prisma.project.findMany();
        existingStats = await prisma.profileStats.findFirst({
            where: { platform: 'github' }
        });
        const username = process.env.GITHUB_USERNAME;

        if (!username) {
            return NextResponse.json(
                { error: 'GITHUB_USERNAME not configured' },
                { status: 400 }
            );
        }

        const [allRepos, user] = await Promise.all([
            fetchGitHubRepos(username),
            fetchGitHubUser(username),
        ]);

        // Filter: only repos with 'portfolio' topic. Fallback: top 20 by update date if none tagged.
        let repos = filterPortfolioRepos(allRepos);
        if (repos.length === 0) {
            console.log('No repos with "portfolio" topic found — syncing top 20 most recently updated repos as fallback');
            repos = allRepos.slice(0, 20);
        }

        console.log(`Fetched ${allRepos.length} repos total, syncing ${repos.length} portfolio repos`);

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

        // Remove projects that no longer exist on GitHub
        const syncedGithubIds = repos.map(r => r.id);
        const deleted = await prisma.project.deleteMany({
            where: {
                githubId: { notIn: syncedGithubIds },
            },
        });
        if (deleted.count > 0) {
            console.log(`Removed ${deleted.count} projects no longer on GitHub`);
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
                message: `Synced ${synced} repos, removed ${deleted.count} stale, ${user.followers} followers`,
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
        try {
            await prisma.syncLog.create({
                data: { platform: 'github', status: 'error', message },
            });
        } catch (e) { /* Ignore during build */ }
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ status: 'GitHub sync endpoint ready' });
}
