'use client';

import { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Stack,
    Alert,
    CircularProgress,
    useTheme,
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function AdminPage() {
    const theme = useTheme();
    const [syncing, setSyncing] = useState<string | null>(null);
    const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSync = async (platform: 'github' | 'linkedin') => {
        setSyncing(platform);
        setResult(null);

        try {
            const res = await fetch(`/api/${platform}/sync`, { method: 'POST' });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || `Failed to sync ${platform}`);

            setResult({
                type: 'success',
                message: data.message || `${platform} synced successfully!`,
            });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : `Failed to sync ${platform}`;
            setResult({ type: 'error', message });
        } finally {
            setSyncing(null);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <AnimatedSection>
                <Typography variant="h3" fontWeight={800} gutterBottom>
                    Admin Panel
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
                    Manually trigger data sync and manage integrations.
                </Typography>
            </AnimatedSection>

            <Stack gap={3}>
                <AnimatedSection delay={0.1}>
                    <GlassCard hover={false}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" gap={2}>
                                <GitHubIcon sx={{ fontSize: 32, color: 'text.primary' }} />
                                <div>
                                    <Typography variant="h6" fontWeight={700}>
                                        GitHub Sync
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Fetch latest repositories and update projects
                                    </Typography>
                                </div>
                            </Stack>
                            <Button
                                variant="contained"
                                startIcon={syncing === 'github' ? <CircularProgress size={18} /> : <SyncIcon />}
                                disabled={syncing !== null}
                                onClick={() => handleSync('github')}
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    color: '#1a2a3a',
                                    fontWeight: 700,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                    },
                                }}
                            >
                                Sync Now
                            </Button>
                        </Stack>
                    </GlassCard>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                    <GlassCard hover={false}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" gap={2}>
                                <LinkedInIcon sx={{ fontSize: 32, color: '#0A66C2' }} />
                                <div>
                                    <Typography variant="h6" fontWeight={700}>
                                        LinkedIn Sync
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Fetch latest posts and profile stats
                                    </Typography>
                                </div>
                            </Stack>
                            <Button
                                variant="contained"
                                startIcon={syncing === 'linkedin' ? <CircularProgress size={18} /> : <SyncIcon />}
                                disabled={syncing !== null}
                                onClick={() => handleSync('linkedin')}
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    color: '#1a2a3a',
                                    fontWeight: 700,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                    },
                                }}
                            >
                                Sync Now
                            </Button>
                        </Stack>
                    </GlassCard>
                </AnimatedSection>

                {result && (
                    <Alert severity={result.type} sx={{ borderRadius: 2 }}>
                        {result.message}
                    </Alert>
                )}

                <AnimatedSection delay={0.2}>
                    <GlassCard hover={false}>
                        <Typography variant="subtitle1" fontWeight={700} mb={1}>
                            Auto-Sync Schedule
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Data is automatically synced every 6 hours via cron job.
                            You can also set up a GitHub webhook for real-time updates
                            when repositories change.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            <strong>Webhook URL:</strong>{' '}
                            <code style={{ fontSize: '0.8rem' }}>
                                {typeof window !== 'undefined' ? window.location.origin : ''}/api/github/webhook
                            </code>
                        </Typography>
                    </GlassCard>
                </AnimatedSection>
            </Stack>
        </Container>
    );
}
