import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const posts = await prisma.linkedInPost.findMany({
            orderBy: { postDate: 'desc' },
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
