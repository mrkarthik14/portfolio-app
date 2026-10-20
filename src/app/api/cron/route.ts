import { NextRequest, NextResponse } from 'next/server';
import { syncGitHub } from '@/lib/github-sync';

// Vercel Cron-compatible endpoint
// Add to vercel.json: { "crons": [{ "path": "/api/cron", "schedule": "0 */6 * * *" }] }
export async function GET(request: NextRequest) {
    try {
        // Verify cron secret if configured (for Vercel Cron)
        const authHeader = request.headers.get('authorization');
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const baseUrl = request.nextUrl.origin;
        const githubResult = await syncGitHub();

        // Sync LinkedIn
        const linkedinSync = await fetch(`${baseUrl}/api/linkedin/sync`, {
            method: 'POST',
        });
        const linkedinResult = await linkedinSync.json();

        return NextResponse.json({
            message: linkedinSync.ok ? 'Cron sync completed' : 'GitHub synced; LinkedIn sync failed',
            github: githubResult,
            linkedin: linkedinResult,
            timestamp: new Date().toISOString(),
        }, { status: linkedinSync.ok ? 200 : 502 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
