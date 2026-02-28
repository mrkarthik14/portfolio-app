'use client';

import { useEffect, useState } from 'react';
import {
    Container, Typography, Grid, Box, Stack, useTheme,
    Chip, Paper, CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import GitHubIcon from '@mui/icons-material/GitHub';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface WeekData {
    week: number;
    title: string;
    topics: string[];
    status: 'completed' | 'in-progress' | 'upcoming';
    folderName: string;
}

// Fetched from GitHub: repo has week-00, week-01 folders
const roadmapWeeks: WeekData[] = [
    { week: 0, title: 'Foundation & Setup', topics: ['Python refresher', 'NumPy/Pandas mastery', 'Math prerequisites', 'Dev environment setup'], status: 'completed', folderName: 'week-00-foundation' },
    { week: 1, title: 'Linear Algebra', topics: ['Vectors & matrices', 'Eigenvalues & eigenvectors', 'Matrix decomposition', 'Linear transformations'], status: 'in-progress', folderName: 'week-01-linear-algebra' },
    { week: 2, title: 'Probability & Statistics', topics: ['Bayesian thinking', 'Distributions', 'Hypothesis testing', 'Statistical inference'], status: 'upcoming', folderName: 'week-02-probability-stats' },
    { week: 3, title: 'Calculus & Optimization', topics: ['Gradient descent', 'Partial derivatives', 'Chain rule', 'Convex optimization'], status: 'upcoming', folderName: 'week-03-calculus-optimization' },
    { week: 4, title: 'Linear Models', topics: ['Linear regression from scratch', 'Logistic regression', 'Regularization (L1/L2)', 'Cost functions'], status: 'upcoming', folderName: 'week-04-linear-models' },
    { week: 5, title: 'Tree-Based Models', topics: ['Decision trees', 'Random forests', 'XGBoost/LightGBM', 'Feature importance'], status: 'upcoming', folderName: 'week-05-tree-models' },
    { week: 6, title: 'Unsupervised Learning', topics: ['K-means clustering', 'PCA', 'DBSCAN', 'Dimensionality reduction'], status: 'upcoming', folderName: 'week-06-unsupervised' },
    { week: 7, title: 'Neural Networks', topics: ['Perceptrons', 'Backpropagation', 'Activation functions', 'TensorFlow/PyTorch basics'], status: 'upcoming', folderName: 'week-07-neural-networks' },
    { week: 8, title: 'Deep Learning', topics: ['CNNs for vision', 'RNNs/LSTMs for sequences', 'Transfer learning', 'Regularization techniques'], status: 'upcoming', folderName: 'week-08-deep-learning' },
    { week: 9, title: 'NLP & Transformers', topics: ['Text preprocessing', 'Word embeddings', 'Attention mechanism', 'BERT/GPT architecture'], status: 'upcoming', folderName: 'week-09-nlp-transformers' },
    { week: 10, title: 'System Design for ML', topics: ['ML system design patterns', 'Feature stores', 'Model serving', 'A/B testing at scale'], status: 'upcoming', folderName: 'week-10-system-design' },
    { week: 11, title: 'Interview Prep & Projects', topics: ['FAANG interview patterns', 'Case studies', 'End-to-end ML projects', 'Presentation skills'], status: 'upcoming', folderName: 'week-11-interview-prep' },
];

export default function FAANGMLJourneyPage() {
    const theme = useTheme();

    const completedCount = roadmapWeeks.filter((w) => w.status === 'completed').length;
    const inProgressCount = roadmapWeeks.filter((w) => w.status === 'in-progress').length;
    const progress = Math.round(((completedCount + inProgressCount * 0.5) / roadmapWeeks.length) * 100);

    const statusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 28 }} />;
            case 'in-progress':
                return <PlayCircleFilledIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />;
            default:
                return <RadioButtonUncheckedIcon sx={{ color: theme.palette.text.disabled, fontSize: 28 }} />;
        }
    };

    const statusColor = (status: string) => {
        switch (status) {
            case 'completed': return theme.palette.success.main;
            case 'in-progress': return theme.palette.warning.main;
            default: return theme.palette.divider;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <AnimatedSection>
                <Stack direction="row" alignItems="center" gap={2} mb={1}>
                    <Typography variant="h3" fontWeight={800}>
                        🚀 FAANG ML Journey
                    </Typography>
                    <Chip
                        icon={<GitHubIcon />}
                        label="View on GitHub"
                        component="a"
                        href="https://github.com/mrkarthik14/faang-ml-journey"
                        target="_blank"
                        clickable
                        variant="outlined"
                        size="small"
                    />
                </Stack>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2, maxWidth: 700 }}>
                    A 12-week, end-to-end Machine Learning roadmap covering math foundations,
                    ML algorithms from scratch, and production-ready thinking — aligned with
                    FAANG-level expectations.
                </Typography>
            </AnimatedSection>

            {/* Progress Bar */}
            <AnimatedSection delay={0.1}>
                <GlassCard sx={{ mb: 4 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography fontWeight={700}>Overall Progress</Typography>
                        <Typography fontWeight={800} color="primary">{progress}%</Typography>
                    </Stack>
                    <Box
                        sx={{
                            height: 12,
                            borderRadius: 6,
                            bgcolor: theme.palette.action.hover,
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                width: `${progress}%`,
                                borderRadius: 6,
                                background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.primary.main})`,
                                transition: 'width 1s ease',
                            }}
                        />
                    </Box>
                    <Stack direction="row" gap={3} mt={2}>
                        <Stack direction="row" gap={0.5} alignItems="center">
                            <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 18 }} />
                            <Typography variant="body2">{completedCount} Completed</Typography>
                        </Stack>
                        <Stack direction="row" gap={0.5} alignItems="center">
                            <PlayCircleFilledIcon sx={{ color: theme.palette.warning.main, fontSize: 18 }} />
                            <Typography variant="body2">{inProgressCount} In Progress</Typography>
                        </Stack>
                        <Stack direction="row" gap={0.5} alignItems="center">
                            <RadioButtonUncheckedIcon sx={{ color: theme.palette.text.disabled, fontSize: 18 }} />
                            <Typography variant="body2">{roadmapWeeks.length - completedCount - inProgressCount} Upcoming</Typography>
                        </Stack>
                    </Stack>
                </GlassCard>
            </AnimatedSection>

            {/* Roadmap Timeline */}
            <Stack gap={0} sx={{ position: 'relative' }}>
                {roadmapWeeks.map((week, i) => (
                    <AnimatedSection key={week.week} delay={i * 0.05}>
                        <Stack direction="row" gap={3} sx={{ position: 'relative' }}>
                            {/* Timeline line */}
                            <Stack alignItems="center" sx={{ width: 40, flexShrink: 0 }}>
                                {statusIcon(week.status)}
                                {i < roadmapWeeks.length - 1 && (
                                    <Box
                                        sx={{
                                            width: 3,
                                            flexGrow: 1,
                                            bgcolor: statusColor(week.status),
                                            opacity: week.status === 'upcoming' ? 0.3 : 0.7,
                                            my: 0.5,
                                        }}
                                    />
                                )}
                            </Stack>
                            {/* Card */}
                            <Paper
                                elevation={0}
                                sx={{
                                    flex: 1,
                                    p: 3,
                                    mb: 2,
                                    borderRadius: 3,
                                    bgcolor: week.status === 'in-progress'
                                        ? `${theme.palette.warning.main}08`
                                        : week.status === 'completed'
                                            ? `${theme.palette.success.main}08`
                                            : theme.palette.background.paper,
                                    border: `1px solid ${week.status === 'in-progress'
                                        ? theme.palette.warning.main + '40'
                                        : week.status === 'completed'
                                            ? theme.palette.success.main + '40'
                                            : theme.palette.divider
                                        }`,
                                    opacity: week.status === 'upcoming' ? 0.6 : 1,
                                    transition: 'all 0.3s',
                                    '&:hover': { opacity: 1, transform: 'translateX(4px)' },
                                }}
                            >
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                    <Box>
                                        <Typography variant="overline" color="text.secondary" fontWeight={700}>
                                            Week {week.week}
                                        </Typography>
                                        <Typography variant="h6" fontWeight={800}>
                                            {week.title}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={week.status.replace('-', ' ')}
                                        size="small"
                                        color={
                                            week.status === 'completed' ? 'success'
                                                : week.status === 'in-progress' ? 'warning'
                                                    : 'default'
                                        }
                                        variant={week.status === 'upcoming' ? 'outlined' : 'filled'}
                                        sx={{ textTransform: 'capitalize' }}
                                    />
                                </Stack>
                                <Stack direction="row" gap={1} mt={1.5} flexWrap="wrap">
                                    {week.topics.map((topic) => (
                                        <Chip
                                            key={topic}
                                            label={topic}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontSize: '0.75rem' }}
                                        />
                                    ))}
                                </Stack>
                            </Paper>
                        </Stack>
                    </AnimatedSection>
                ))}
            </Stack>
        </Container>
    );
}
