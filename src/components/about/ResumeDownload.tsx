'use client';

import { Button, Stack, Typography, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import GlassCard from '@/components/ui/GlassCard';

export default function ResumeDownload() {
    const theme = useTheme();

    return (
        <GlassCard>
            <Stack direction="row" alignItems="center" gap={2}>
                <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Stack sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        Resume
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Download my latest resume in PDF format
                    </Typography>
                </Stack>
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    href="/resume.pdf"
                    download
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: '#1a2a3a',
                        fontWeight: 700,
                        '&:hover': {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        },
                    }}
                >
                    Download
                </Button>
            </Stack>
        </GlassCard>
    );
}
