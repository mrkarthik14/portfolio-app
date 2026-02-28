'use client';

import { useEffect, useState } from 'react';
import {
    Container, Typography, Chip, Stack, useTheme,
    TextField, InputAdornment, Box, CircularProgress, Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProjectCard from '@/components/projects/ProjectCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ProjectData } from '@/types';

// Category priority order for sorting projects
const CATEGORY_ORDER = [
    'python',       // Python (Pandas, NumPy, Matplotlib, Seaborn, Streamlit, Scikit-learn)
    'powerbi',      // Power BI
    'ml',           // Machine Learning, AI/ML
    'jupyter',      // Jupyter Notebooks
    'html_css_js',  // HTML, CSS, JavaScript
    'typescript',   // TypeScript
    'react',        // React
    'other',        // Everything else
];

const PYTHON_SKILLS = ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Streamlit', 'Scikit-learn', 'Plotly'];
const ML_SKILLS = ['Machine Learning', 'AI/ML', 'Deep Learning', 'GenAI', 'LLM'];

function getProjectCategory(project: ProjectData): string {
    const skills = project.skills || [];
    const lang = project.language || '';

    // Python data science projects (must have Python + a DS library skill)
    const hasPythonSkill = skills.some(s => PYTHON_SKILLS.includes(s));
    if (hasPythonSkill && (lang === 'Python' || skills.includes('Python'))) return 'python';

    // Power BI projects
    if (skills.includes('Power BI')) return 'powerbi';

    // ML/AI projects (that aren't already Python DS)
    if (skills.some(s => ML_SKILLS.includes(s))) return 'ml';

    // Jupyter notebook projects
    if (lang === 'Jupyter Notebook' || skills.includes('Jupyter')) return 'jupyter';

    // HTML/CSS/JavaScript
    if (['HTML', 'CSS', 'JavaScript'].some(s => skills.includes(s)) || lang === 'HTML' || lang === 'JavaScript') return 'html_css_js';

    // TypeScript
    if (skills.includes('TypeScript') || lang === 'TypeScript') return 'typescript';

    // React
    if (skills.includes('React')) return 'react';

    return 'other';
}

function sortProjectsByCategory(projects: ProjectData[]): ProjectData[] {
    return [...projects].sort((a, b) => {
        const catA = CATEGORY_ORDER.indexOf(getProjectCategory(a));
        const catB = CATEGORY_ORDER.indexOf(getProjectCategory(b));
        return catA - catB;
    });
}

export default function ProjectsPage() {
    const theme = useTheme();
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>('favorites');

    // Skill-based category filters for the chips
    const FILTER_CATEGORIES: { key: string; label: string }[] = [
        { key: 'favorites', label: 'Favorites ⭐️' },
        { key: 'python', label: 'Python' },
        { key: 'powerbi', label: 'Power BI' },
        { key: 'ml', label: 'ML / AI' },
        { key: 'jupyter', label: 'Data Analytics' },
        { key: 'html_css_js', label: 'Web Dev' },
        { key: 'other', label: 'Other' },
    ];

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch('/api/projects');
                if (!res.ok) throw new Error('Failed to fetch projects');
                const data = await res.json();
                setProjects(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load projects');
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    const filteredProjects = sortProjectsByCategory(projects.filter((project) => {
        const matchesSearch =
            !search ||
            project.name.toLowerCase().includes(search.toLowerCase()) ||
            project.description?.toLowerCase().includes(search.toLowerCase());

        let matchesCategory = true;
        if (selectedCategory) {
            if (selectedCategory === 'favorites') {
                matchesCategory = !!project.isFavorite;
            } else {
                matchesCategory = getProjectCategory(project) === selectedCategory;
            }
        }

        return matchesSearch && matchesCategory;
    }));

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
                <CircularProgress size={48} />
                <Typography sx={{ mt: 2 }} color="text.secondary">Loading projects from GitHub...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <AnimatedSection>
                <Typography variant="h3" fontWeight={800} gutterBottom>
                    Projects
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                    Open-source projects synced automatically from{' '}
                    <Box
                        component="a"
                        href="https://github.com/mrkarthik14"
                        target="_blank"
                        sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}
                    >
                        GitHub
                    </Box>
                    .
                </Typography>
            </AnimatedSection>

            {error && <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>}

            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} mb={4} alignItems="center">
                <TextField
                    size="small"
                    placeholder="Search projects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: 240 }}
                />
                <Stack direction="row" gap={1} flexWrap="wrap">
                    <Chip
                        label="All"
                        variant={!selectedCategory ? 'filled' : 'outlined'}
                        onClick={() => setSelectedCategory(null)}
                        color={!selectedCategory ? 'primary' : 'default'}
                        size="small"
                    />
                    {FILTER_CATEGORIES.map((cat) => (
                        <Chip
                            key={cat.key}
                            label={cat.label}
                            variant={selectedCategory === cat.key ? 'filled' : 'outlined'}
                            onClick={() => setSelectedCategory(cat.key === selectedCategory ? null : cat.key)}
                            color={selectedCategory === cat.key ? 'primary' : 'default'}
                            size="small"
                        />
                    ))}
                </Stack>
            </Stack>

            {/* Masonry Layout (Pinterest Style) */}
            <Box
                sx={{
                    columnCount: { xs: 1, sm: 2, lg: 3 },
                    columnGap: 3,
                }}
            >
                {filteredProjects.map((project, i) => (
                    <Box
                        key={project.id}
                        sx={{
                            breakInside: 'avoid',
                            mb: 3,
                        }}
                    >
                        <AnimatedSection delay={i * 0.05}>
                            <ProjectCard project={project} />
                        </AnimatedSection>
                    </Box>
                ))}
            </Box>

            {filteredProjects.length === 0 && !loading && (
                <Typography color="text.secondary" textAlign="center" sx={{ py: 6 }}>
                    No projects match your filters.
                </Typography>
            )}
        </Container>
    );
}
