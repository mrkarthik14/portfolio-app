'use client';

import {
    Container, Typography, Grid, Box, Stack, useTheme,
    Chip, Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface Problem {
    name: string;
    displayName: string;
    category: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    concepts: string[];
    solved: boolean;
}

// Real data from GitHub: mrkarthik14/TensorTonic-Solutions
const solvedProblems: Problem[] = [
    {
        name: 'cosine-similarity',
        displayName: 'Cosine Similarity',
        category: 'Distance Metrics',
        difficulty: 'Easy',
        description: 'Compute the cosine of the angle between two vectors — widely used in NLP and recommendation systems.',
        concepts: ['Dot product', 'Vector magnitude', 'Similarity measures'],
        solved: true,
    },
    {
        name: 'euclidean-distance',
        displayName: 'Euclidean Distance',
        category: 'Distance Metrics',
        difficulty: 'Easy',
        description: 'Calculate the straight-line distance between two points in n-dimensional space.',
        concepts: ['L2 norm', 'Distance metrics', 'KNN'],
        solved: true,
    },
    {
        name: 'manhattan-distance',
        displayName: 'Manhattan Distance',
        category: 'Distance Metrics',
        difficulty: 'Easy',
        description: 'Calculate the sum of absolute differences between coordinates — used in grid-based pathfinding.',
        concepts: ['L1 norm', 'Taxicab geometry', 'City block distance'],
        solved: true,
    },
    {
        name: 'matrix-transpose',
        displayName: 'Matrix Transpose',
        category: 'Linear Algebra',
        difficulty: 'Easy',
        description: 'Flip a matrix over its diagonal, switching rows and columns.',
        concepts: ['Matrix operations', 'NumPy', 'Data transformation'],
        solved: true,
    },
    {
        name: 'matrix-trace',
        displayName: 'Matrix Trace',
        category: 'Linear Algebra',
        difficulty: 'Easy',
        description: 'Compute the sum of diagonal elements of a square matrix.',
        concepts: ['Square matrices', 'Eigenvalue sum', 'Trace properties'],
        solved: true,
    },
    {
        name: 'make-diagonal',
        displayName: 'Make Diagonal',
        category: 'Linear Algebra',
        difficulty: 'Easy',
        description: 'Create a diagonal matrix from a vector or extract diagonal elements.',
        concepts: ['Identity matrix', 'Diagonal operations', 'Matrix construction'],
        solved: true,
    },
    {
        name: 'mean-median-mode',
        displayName: 'Mean, Median & Mode',
        category: 'Statistics',
        difficulty: 'Easy',
        description: 'Compute central tendency measures — the building blocks of statistical analysis.',
        concepts: ['Central tendency', 'Descriptive statistics', 'Data distribution'],
        solved: true,
    },
    {
        name: 'mean-squared-error',
        displayName: 'Mean Squared Error',
        category: 'Loss Functions',
        difficulty: 'Easy',
        description: 'Calculate MSE — the most common loss function for regression models.',
        concepts: ['Regression metrics', 'Cost function', 'Model evaluation'],
        solved: true,
    },
];

const categories = [...new Set(solvedProblems.map((p) => p.category))];

const difficultyColor = (d: string) => {
    switch (d) {
        case 'Easy': return 'success';
        case 'Medium': return 'warning';
        case 'Hard': return 'error';
        default: return 'default';
    }
};

export default function TensorTonicPage() {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <AnimatedSection>
                <Stack direction="row" alignItems="center" gap={2} mb={1}>
                    <Typography variant="h3" fontWeight={800}>
                        🧠 TensorTonic Solutions
                    </Typography>
                    <Chip
                        icon={<GitHubIcon />}
                        label="View on GitHub"
                        component="a"
                        href="https://github.com/mrkarthik14/TensorTonic-Solutions"
                        target="_blank"
                        clickable
                        variant="outlined"
                        size="small"
                    />
                </Stack>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2, maxWidth: 700 }}>
                    Core machine learning algorithms implemented from scratch on{' '}
                    <Box
                        component="a"
                        href="https://tensortonic.com"
                        target="_blank"
                        sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}
                    >
                        TensorTonic
                    </Box>
                    . Every solution builds deep intuition for ML fundamentals.
                </Typography>
            </AnimatedSection>

            {/* Stats Bar */}
            <AnimatedSection delay={0.1}>
                <GlassCard sx={{ mb: 4 }}>
                    <Stack direction="row" gap={4} flexWrap="wrap">
                        <Stack alignItems="center">
                            <Typography variant="h3" fontWeight={800} color="primary">
                                {solvedProblems.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">Problems Solved</Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography variant="h3" fontWeight={800} color="success.main">
                                {categories.length}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">Categories</Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography variant="h3" fontWeight={800} sx={{ color: theme.palette.warning.main }}>
                                100%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">Solve Rate</Typography>
                        </Stack>
                    </Stack>
                </GlassCard>
            </AnimatedSection>

            {/* Problems by Category */}
            {categories.map((category, ci) => (
                <AnimatedSection key={category} delay={0.1 + ci * 0.05}>
                    <Typography variant="h5" fontWeight={700} sx={{ mt: 3, mb: 2 }}>
                        {category}
                    </Typography>
                    <Grid container spacing={2}>
                        {solvedProblems
                            .filter((p) => p.category === category)
                            .map((problem, i) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={problem.name}>
                                    <Paper
                                        elevation={0}
                                        component="a"
                                        href={`https://github.com/mrkarthik14/TensorTonic-Solutions/tree/main/${problem.name}`}
                                        target="_blank"
                                        sx={{
                                            display: 'block',
                                            p: 3,
                                            borderRadius: 3,
                                            textDecoration: 'none',
                                            border: `1px solid ${theme.palette.success.main}30`,
                                            bgcolor: `${theme.palette.success.main}05`,
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: `0 8px 24px ${theme.palette.success.main}20`,
                                                borderColor: theme.palette.success.main,
                                            },
                                        }}
                                    >
                                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                            <Stack direction="row" gap={1} alignItems="center">
                                                <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                                                <Typography fontWeight={700} color="text.primary">
                                                    {problem.displayName}
                                                </Typography>
                                            </Stack>
                                            <Chip
                                                label={problem.difficulty}
                                                size="small"
                                                color={difficultyColor(problem.difficulty) as 'success' | 'warning' | 'error' | 'default'}
                                                variant="outlined"
                                                sx={{ fontSize: '0.7rem' }}
                                            />
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                            {problem.description}
                                        </Typography>
                                        <Stack direction="row" gap={0.5} flexWrap="wrap">
                                            {problem.concepts.map((c) => (
                                                <Chip key={c} label={c} size="small" variant="outlined" sx={{ fontSize: '0.65rem' }} />
                                            ))}
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                    </Grid>
                </AnimatedSection>
            ))}
        </Container>
    );
}
