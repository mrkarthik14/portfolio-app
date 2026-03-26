import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET() {
    if (!process.env.DATABASE_URL) {
        return NextResponse.json([]);
    }

    try {
        let posts: any[] = [];
        posts = await prisma.linkedInPost.findMany({
            orderBy: { postDate: 'desc' },
            take: 10,
        });
        const formatted = posts.map((p) => ({
            id: p.id,
            externalId: p.externalId,
            content: p.content,
            imageUrl: p.imageUrl,
            likes: p.likes,
            comments: p.comments,
            postDate: p.postDate.toISOString(),
        }));

        return NextResponse.json(formatted);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
