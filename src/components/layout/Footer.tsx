'use client';

import { Box, Container, Typography, IconButton, Stack, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Footer() {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: 4,
                borderTop: `1px solid ${theme.palette.divider}`,
                background: isDark
                    ? 'rgba(15, 23, 42, 0.5)'
                    : 'rgba(248, 249, 252, 0.8)',
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                        Made with{' '}
                        <FavoriteIcon sx={{ fontSize: 16, color: '#FFD1BA' }} />{' '}
                        using Next.js & Material UI. Focused on data analytics, dashboards, and ML projects.
                    </Typography>

                    <Stack direction="row" gap={1}>
                        <IconButton
                            href="https://github.com/mrkarthik14"
                            target="_blank"
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            <GitHubIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            href="https://www.linkedin.com/in/charankarthiknayakanti/"
                            target="_blank"
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            <LinkedInIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            href="mailto:charankarthik60@gmail.com"
                            size="small"
                            sx={{
                                color: 'text.secondary',
                                '&:hover': { color: 'primary.main' },
                            }}
                        >
                            <EmailIcon fontSize="small" />
                        </IconButton>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} All rights reserved.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}
