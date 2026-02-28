import { NextResponse } from 'next/server';
import { getLinkedInPosts, getLinkedInStats } from '@/lib/linkedin';
import prisma from '@/lib/prisma';

export async function POST() {
    try {
        const [posts, stats] = await Promise.all([
            getLinkedInPosts(),
            getLinkedInStats(),
        ]);

        // Upsert posts into database
        let synced = 0;
        for (const post of posts) {
            await prisma.linkedInPost.upsert({
                where: { externalId: post.id },
                update: {
                    content: post.content,
                    imageUrl: post.imageUrl || null,
                    likes: post.likes,
                    comments: post.comments,
                    postDate: new Date(post.postDate),
                    syncedAt: new Date(),
                },
                create: {
                    externalId: post.id,
                    content: post.content,
                    imageUrl: post.imageUrl || null,
                    likes: post.likes,
                    comments: post.comments,
                    postDate: new Date(post.postDate),
                    syncedAt: new Date(),
                },
            });
            synced++;
        }

        // Upsert LinkedIn stats
        if (stats) {
            await prisma.profileStats.upsert({
                where: { id: 'linkedin-profile' },
                update: {
                    platform: 'linkedin',
                    followers: stats.followers,
                    connections: stats.connections,
                    recordedAt: new Date(),
                },
                create: {
                    id: 'linkedin-profile',
                    platform: 'linkedin',
                    followers: stats.followers,
                    connections: stats.connections,
                    recordedAt: new Date(),
                },
            });
        }

        // Log sync
        await prisma.syncLog.create({
            data: {
                platform: 'linkedin',
                status: 'success',
                message: `Synced ${synced} posts`,
            },
        });

        return NextResponse.json({
            message: `Successfully synced ${synced} posts`,
            posts: synced,
            stats,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        await prisma.syncLog.create({
            data: { platform: 'linkedin', status: 'error', message },
        }).catch(() => { });
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ status: 'LinkedIn sync endpoint ready' });
}
