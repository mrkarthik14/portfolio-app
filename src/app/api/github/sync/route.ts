import { NextResponse } from 'next/server';
import { syncGitHub } from '@/lib/github-sync';

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        return NextResponse.json(await syncGitHub());
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 502 });
    }
}

export async function GET() {
    return NextResponse.json({ status: 'GitHub sync endpoint ready' });
}
