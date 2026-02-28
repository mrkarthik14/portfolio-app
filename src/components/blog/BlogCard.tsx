'use client';

import { Box, Typography, Chip, Stack, useTheme } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GlassCard from '@/components/ui/GlassCard';
import { BlogPost } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const theme = useTheme();

    return (
        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
            <GlassCard
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: 'text.primary',
                        lineHeight: 1.3,
                    }}
                >
                    {post.title}
                </Typography>

                <Stack direction="row" gap={2} alignItems="center" mb={1.5}>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {format(new Date(post.date), 'MMM d, yyyy')}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {post.readTime} min read
                        </Typography>
                    </Stack>
                </Stack>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6,
                    }}
                >
                    {post.excerpt}
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {post.tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                                fontSize: '0.7rem',
                                height: 22,
                                bgcolor: theme.palette.mode === 'dark'
                                    ? 'rgba(167,199,231,0.1)'
                                    : 'rgba(167,199,231,0.15)',
                                color: 'primary.main',
                            }}
                        />
                    ))}
                </Stack>
            </GlassCard>
        </Link>
    );
}
