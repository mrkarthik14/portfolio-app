import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const secret = process.env.GITHUB_WEBHOOK_SECRET;

        if (secret) {
            const signature = request.headers.get('x-hub-signature-256');
            const body = await request.text();

            if (signature) {
                const hmac = crypto.createHmac('sha256', secret);
                hmac.update(body);
                const digest = `sha256=${hmac.digest('hex')}`;

                if (signature !== digest) {
                    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
                }
            }
        }

        const event = request.headers.get('x-github-event');

        if (event === 'push' || event === 'repository' || event === 'create') {
            // Trigger a sync
            const syncResponse = await fetch(
                `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/github/sync`,
                { method: 'POST' }
            );

            if (!syncResponse.ok) {
                return NextResponse.json(
                    { error: 'Sync failed' },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                message: `Webhook received: ${event} event. Sync triggered.`,
            });
        }

        return NextResponse.json({ message: `Event ${event} ignored` });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
