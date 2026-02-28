'use client';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    useTheme,
    Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CodeIcon from '@mui/icons-material/Code';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Education', path: '/education' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isDark = theme.palette.mode === 'dark';

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    background: isDark
                        ? 'rgba(15, 23, 42, 0.75)'
                        : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
                    color: theme.palette.text.primary,
                    transition: 'background-color 0.3s ease',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ gap: { xs: 1, md: 2 }, minHeight: '70px' }}>
                        <CodeIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1 }} />
                        <Typography
                            variant="h6"
                            component={Link}
                            href="/"
                            sx={{
                                fontFamily: '"Outfit", sans-serif',
                                fontWeight: 700,
                                color: 'text.primary',
                                textDecoration: 'none',
                                flexGrow: isMobile ? 1 : 0,
                                mr: 4,
                                background: isDark
                                    ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                                    : `linear-gradient(135deg, #1A2980, #26D0CE)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            CK.
                        </Typography>

                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1, justifyContent: 'center' }}>
                                {navItems.map((item) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Button
                                            key={item.path}
                                            component={Link}
                                            href={item.path}
                                            disableRipple
                                            sx={{
                                                color: isActive ? (isDark ? '#FFF' : '#000') : 'text.secondary',
                                                fontWeight: isActive ? 600 : 500,
                                                fontSize: '0.95rem',
                                                textTransform: 'none',
                                                borderRadius: '12px',
                                                px: 2,
                                                py: 0.75,
                                                backgroundColor: isActive
                                                    ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
                                                    : 'transparent',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    color: isDark ? '#FFF' : '#000',
                                                    backgroundColor: isDark
                                                        ? 'rgba(255,255,255,0.12)'
                                                        : 'rgba(0,0,0,0.06)',
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    );
                                })}
                            </Box>
                        )}

                        <Box sx={{ ml: isMobile ? 0 : 'auto' }}>
                            <ThemeToggle />
                        </Box>

                        {isMobile && (
                            <IconButton
                                onClick={() => setMobileOpen(true)}
                                sx={{ color: 'text.primary', ml: 1 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        bgcolor: 'background.paper',
                        borderLeft: `1px solid ${theme.palette.divider}`,
                    },
                }}
            >
                <Box sx={{ py: 3, px: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: '"Outfit", sans-serif',
                            fontWeight: 700,
                            mb: 2,
                            px: 1,
                            background: isDark
                                ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                                : `linear-gradient(135deg, #1A2980, #26D0CE)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Portfolio
                    </Typography>
                    <List>
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <ListItem key={item.path} disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        href={item.path}
                                        onClick={() => setMobileOpen(false)}
                                        selected={isActive}
                                        sx={{
                                            borderRadius: '12px',
                                            mb: 0.5,
                                            backgroundColor: isActive
                                                ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)')
                                                : 'transparent',
                                            color: isActive ? (isDark ? '#FFF' : '#000') : 'text.secondary',
                                            '&.Mui-selected': {
                                                backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                                                color: isDark ? '#FFF' : '#000',
                                                '&:hover': {
                                                    backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'
                                                },
                                            },
                                            '&:hover': {
                                                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                            }
                                        }}
                                    >
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{
                                                fontWeight: isActive ? 600 : 500
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
