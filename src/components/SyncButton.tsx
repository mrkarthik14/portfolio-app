'use client';
import { useState } from 'react';
import { Button, CircularProgress, Typography, Stack } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function SyncButton() {
    const [status, setStatus] = useState<Status>('idle');
    const [message, setMessage] = useState('');

    const handleSync = async () => {
        setStatus('loading');
        setMessage('');
        try {
            const res = await fetch('/api/github/sync', { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setMessage(data.message ?? 'Sync complete');
                // Reload to show newly synced projects
                setTimeout(() => window.location.reload(), 1500);
            } else {
                setStatus('error');
                setMessage(data.error ?? 'Sync failed');
            }
        } catch {
            setStatus('error');
            setMessage('Network error — check console');
        }
    };

    return (
        <Stack direction="row" alignItems="center" gap={1}>
            <Button
                onClick={handleSync}
                disabled={status === 'loading'}
                startIcon={status === 'loading' ? <CircularProgress size={16} color="inherit" /> : <SyncIcon />}
                variant="contained"
                size="small"
            >
                {status === 'loading' ? 'Syncing…' : 'Sync GitHub'}
            </Button>
            {message && (
                <Typography
                    variant="caption"
                    color={status === 'error' ? 'error' : 'success.main'}
                >
                    {message}
                </Typography>
            )}
        </Stack>
    );
}
