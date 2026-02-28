'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container, Typography, Grid, Stack, Box, Chip, useTheme, Paper, darken, Collapse, Tooltip, IconButton } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getSkillColor } from '@/lib/brandColors';

const learningProjects = [
    {
        slug: 'faang-ml-journey',
        title: '🚀 FAANG ML Journey',
        subtitle: '12-Week Machine Learning Roadmap',
        description: 'An end-to-end Machine Learning roadmap covering math foundations, ML algorithms from scratch, optimization, and production-ready thinking — aligned with FAANG-level expectations.',
        progress: 12,
        tags: ['Linear Algebra', 'Probability', 'ML Algorithms', 'Deep Learning', 'System Design'],
        icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
        githubUrl: 'https://github.com/mrkarthik14/faang-ml-journey',
        status: 'In Progress — Week 1: Linear Algebra',
    },
    {
        slug: 'tensortonic-solutions',
        title: '🧠 TensorTonic Solutions',
        subtitle: 'ML Problems Solved from Scratch',
        description: 'Implementations of core ML algorithms on TensorTonic — from distance metrics and linear algebra to loss functions and statistics. Building deep intuition through hands-on coding.',
        progress: 100,
        tags: ['Cosine Similarity', 'Euclidean Distance', 'MSE', 'Matrix Operations', 'Statistics'],
        icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
        githubUrl: 'https://github.com/mrkarthik14/TensorTonic-Solutions',
        status: '8 Problems Solved',
    },
];

export default function BlogPage() {
    const theme = useTheme();
    const [showAiSummary, setShowAiSummary] = useState(false);

    const aiSummaryText = "AI Insight: The Learning Journey section highlights a highly structured, self-directed approach to mastering Machine Learning. By implementing complex algorithms from scratch (TensorTonic) and following a FAANG-level syllabus, Charan demonstrates the rigorous mathematical discipline required for senior Data Science and ML Engineering roles.";

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <AnimatedSection>
                <Stack direction="row" alignItems="center" gap={2} mb={1}>
                    <Typography variant="h3" fontWeight={800}>
                        Learning Journey
                    </Typography>
                    <Tooltip title="AI Journey Analysis">
                        <IconButton
                            onClick={() => setShowAiSummary(!showAiSummary)}
                            sx={{
                                bgcolor: showAiSummary ? '#00838f' : 'transparent',
                                color: showAiSummary ? 'white' : '#00838f',
                                border: '1px solid #00838f',
                                '&:hover': { bgcolor: '#00838f', color: 'white' }
                            }}
                        >
                            <AutoAwesomeIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
                    Deep dives into my active GitHub learning projects — roadmaps, solved problems,
                    and progress visualization.
                </Typography>

                <Collapse in={showAiSummary}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            mb: 4,
                            maxWidth: 700,
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 131, 143, 0.1)' : '#e0f7fa',
                            borderLeft: '4px solid #00838f',
                            borderRadius: 1
                        }}
                    >
                        <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? '#b2ebf2' : '#006064', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.6 }}>
                            ✨ {aiSummaryText}
                        </Typography>
                    </Paper>
                </Collapse>
            </AnimatedSection>

            <Grid container spacing={4}>
                {learningProjects.map((project, i) => (
                    <Grid size={{ xs: 12, md: 6 }} key={project.slug}>
                        <AnimatedSection delay={i * 0.1}>
                            <Paper
                                component={Link}
                                href={`/blog/${project.slug}`}
                                elevation={0}
                                sx={{
                                    display: 'block',
                                    p: 4,
                                    borderRadius: 4,
                                    textDecoration: 'none',
                                    height: '100%',
                                    border: `1px solid ${theme.palette.divider}`,
                                    background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.main}08)`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-6px)',
                                        boxShadow: `0 12px 40px ${theme.palette.primary.main}20`,
                                        borderColor: theme.palette.primary.main,
                                    },
                                }}
                            >
                                <Stack gap={2}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                        <Typography variant="h5" fontWeight={800} color="text.primary">
                                            {project.title}
                                        </Typography>
                                        <ArrowForwardIcon sx={{ color: theme.palette.primary.main }} />
                                    </Stack>

                                    <Typography variant="subtitle1" fontWeight={600} color="primary">
                                        {project.subtitle}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {project.description}
                                    </Typography>

                                    {/* Progress bar */}
                                    <Box>
                                        <Stack direction="row" justifyContent="space-between" mb={0.5}>
                                            <Typography variant="caption" color="text.secondary">
                                                {project.status}
                                            </Typography>
                                            <Typography variant="caption" fontWeight={700} color="primary">
                                                {project.progress}%
                                            </Typography>
                                        </Stack>
                                        <Box sx={{
                                            height: 6, borderRadius: 3,
                                            bgcolor: theme.palette.action.hover,
                                        }}>
                                            <Box sx={{
                                                height: '100%', borderRadius: 3,
                                                width: `${project.progress}%`,
                                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            }} />
                                        </Box>
                                    </Box>

                                    {/* Styles updated to match Projects/About (Filled Chips) */}
                                    <Stack direction="row" gap={0.5} flexWrap="wrap">
                                        {project.tags.map((tag) => {
                                            const color = getSkillColor(tag, theme.palette.primary.main);
                                            const isCustom = color.bg !== theme.palette.primary.main;
                                            return (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    sx={{
                                                        fontSize: '0.7rem',
                                                        fontWeight: 700,
                                                        bgcolor: isCustom ? color.bg : theme.palette.primary.main,
                                                        color: isCustom ? color.color : theme.palette.primary.contrastText,
                                                        transition: 'all 0.2s',
                                                        '&:hover': {
                                                            bgcolor: isCustom ? darken(color.bg, 0.1) : theme.palette.primary.dark,
                                                            transform: 'translateY(-1px)',
                                                        }
                                                    }}
                                                />
                                            );
                                        })}
                                    </Stack>

                                    <Chip
                                        icon={<GitHubIcon />}
                                        label="View on GitHub"
                                        clickable
                                        variant="outlined"
                                        size="small"
                                        sx={{ alignSelf: 'flex-start', mt: 'auto' }}
                                        onClick={(e: React.MouseEvent) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(project.githubUrl, '_blank');
                                        }}
                                    />
                                </Stack>
                            </Paper>
                        </AnimatedSection>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
