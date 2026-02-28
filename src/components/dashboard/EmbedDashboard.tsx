'use client';

import { Box, Typography, TextField, Alert } from '@mui/material';
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

interface EmbedDashboardProps {
    embedUrl?: string;
}

export default function EmbedDashboard({ embedUrl }: EmbedDashboardProps) {
    const [url, setUrl] = useState(embedUrl || '');

    if (!url) {
        return (
            <GlassCard hover={false}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                    External Dashboard
                </Typography>
                <Alert severity="info" sx={{ borderRadius: 2, mb: 2 }}>
                    Configure your Tableau, Looker Studio, or Power BI embed URL in the environment variable{' '}
                    <code>NEXT_PUBLIC_DASHBOARD_EMBED_URL</code> or paste it below.
                </Alert>
                <TextField
                    fullWidth
                    label="Dashboard Embed URL"
                    placeholder="https://public.tableau.com/views/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    size="small"
                />
            </GlassCard>
        );
    }

    return (
        <GlassCard hover={false} sx={{ p: 0, overflow: 'hidden' }}>
            <Typography variant="h6" fontWeight={700} sx={{ p: 3, pb: 2 }}>
                External Dashboard
            </Typography>
            <Box
                component="iframe"
                src={url}
                sx={{
                    width: '100%',
                    height: 500,
                    border: 'none',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                }}
                title="Analytics Dashboard"
                allowFullScreen
            />
        </GlassCard>
    );
}
