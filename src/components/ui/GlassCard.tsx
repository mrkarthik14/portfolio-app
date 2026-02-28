'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
    onClick?: () => void;
    hover?: boolean;
}

export default function GlassCard({ children, sx, onClick, hover = true }: GlassCardProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            onClick={onClick}
            sx={{
                background: isDark
                    ? 'rgba(30, 41, 59, 0.7)'
                    : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: '20px',
                padding: { xs: 2.5, md: 3 },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: onClick ? 'pointer' : 'default',
                ...(hover && {
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: isDark
                            ? '0 12px 40px rgba(167, 199, 231, 0.1)'
                            : '0 12px 40px rgba(0,0,0,0.08)',
                        border: `1px solid ${isDark ? 'rgba(167, 199, 231, 0.2)' : 'rgba(167, 199, 231, 0.4)'}`,
                    },
                }),
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}
