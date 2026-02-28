'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import GlassCard from '../ui/GlassCard';
import AnimatedSection from '../ui/AnimatedSection';

interface QuickStatsProps {
    repos?: number;
    stars?: number;
    posts?: number;
    followers?: number;
}

export default function QuickStats({
    repos: initialRepos = 27,
    stars: initialStars = 8,
    posts: initialPosts = 10,
    followers: initialFollowers = 6,
}: QuickStatsProps) {
    const theme = useTheme();
    const [stats, setStats] = useState({
        repos: initialRepos,
        stars: initialStars,
        posts: initialPosts,
        followers: initialFollowers,
    });

    useEffect(() => {
        fetch('/api/analytics')
            .then((r) => r.json())
            .then((data) => {
                if (data.totalStats) {
                    setStats({
                        repos: data.totalStats.repos || initialRepos,
                        stars: data.totalStats.stars || initialStars,
                        posts: data.totalStats.posts || initialPosts,
                        followers: data.totalStats.followers || initialFollowers,
                    });
                }
            })
            .catch(() => { });
    }, [initialRepos, initialStars, initialPosts, initialFollowers]);

    const items = [
        { icon: <CodeIcon fontSize="large" />, label: 'Repositories', value: stats.repos, color: theme.palette.primary.main },
        { icon: <StarIcon fontSize="large" />, label: 'Total Stars', value: stats.stars, color: '#FFB400' },
        { icon: <ArticleIcon fontSize="large" />, label: 'Posts', value: stats.posts, color: theme.palette.secondary.main },
        { icon: <PeopleIcon fontSize="large" />, label: 'Followers', value: stats.followers, color: '#4CAF50' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Grid container spacing={3}>
                {items.map((item, i) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={item.label}>
                        <AnimatedSection delay={i * 0.1}>
                            <GlassCard sx={{ textAlign: 'center', py: 4 }}>
                                <Box sx={{ color: item.color, mb: 1 }}>{item.icon}</Box>
                                <Typography variant="h3" fontWeight={800}>
                                    {item.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.label}
                                </Typography>
                            </GlassCard>
                        </AnimatedSection>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
