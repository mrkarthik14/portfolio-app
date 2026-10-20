import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { syncGitHub } from '@/lib/github-sync';
import { getGitHubUsername } from '@/lib/github';

export async function POST(request: NextRequest) {
    const secret = process.env.GITHUB_WEBHOOK_SECRET;
    if (!secret) {
        return NextResponse.json({ error: 'GITHUB_WEBHOOK_SECRET is not configured' }, { status: 503 });
    }
    try {
        const body = await request.text();
        const signature = request.headers.get('x-hub-signature-256') || '';
        const digest = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
        if (!/^sha256=[a-f0-9]{64}$/.test(signature) ||
            !timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }
        const event = request.headers.get('x-github-event');
        if (event === 'ping') return NextResponse.json({ message: 'Webhook connected' });
        if (!['push', 'repository', 'create', 'delete', 'public'].includes(event || '')) {
            return NextResponse.json({ message: `Event ${event} ignored` });
        }
        const payload = JSON.parse(body);
        if (payload.repository?.owner?.login?.toLowerCase() !== getGitHubUsername().toLowerCase()) {
            return NextResponse.json({ message: 'Repository owner ignored' });
        }
        // Call directly: deployed functions cannot assume localhost or NEXTAUTH_URL.
        return NextResponse.json(await syncGitHub());
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 502 });
    }
}
