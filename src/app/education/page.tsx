'use client';

import { useState } from 'react';
import {
    Container, Typography, Stack, Box, useTheme,
    Chip, Paper, Divider, darken, Collapse, Tooltip, IconButton
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PixelCard from '@/components/ui/PixelCard';
import { getSkillColor, brandColors } from '@/lib/brandColors';

const education = [
    {
        degree: 'Master of Science (M.Sc.) in Computer Science',
        institution: 'Sri Venkateswara University, Tirupati',
        duration: '2024 – 2026',
        status: 'Currently Pursuing',
        highlights: [
            'Presented seminar on Autonomous AI Agents using LangChain and LangGraph',
            'Attended Microsoft Git & GitHub Workshop conducted at the university',
            'Currently learning Machine Learning concepts and algorithms',
            'Continuously strengthening Data Analytics tools, SQL, Python, and visualization skills',
        ],
    },
    {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'Cluster University, Kurnool',
        duration: '2021 – 2024',
        status: 'CGPA: 8.0 / 10',
        highlights: [
            'Coursework: Data Structures & Algorithms, DBMS (SQL), Statistics for Data Analysis, Python Programming, Data Analytics & Visualization',
            'Completed academic certifications in Data Analytics and Data Visualization',
        ],
    },
];

const certifications = [
    { name: 'Cisco Data Analytics Essentials', issuer: 'Cisco Networking Academy', year: '2025' },
    { name: 'SQL Certification (Intermediate)', issuer: 'HackerRank', year: '2025' },
    { name: 'Python for Data Science', issuer: 'Udemy', year: '2024' },
    { name: 'Introduction to Data Science', issuer: 'Udemy', year: '2024' },
    { name: 'Data Science Job Simulation', issuer: 'Forage', year: '2024' },
];

// Custom palette for non-brand tags - distinct from brand colors
const tagPalette = [
    '#5C6BC0', // Indigo
    '#AB47BC', // Purple
    '#EF5350', // Red
    '#26A69A', // Teal
    '#FF7043', // Orange
    '#8D6E63', // Brown
    '#78909C', // Blue Grey
    '#EC407A', // Pink
    '#42A5F5', // Blue
    '#66BB6A', // Green
];

// Fallback for tags that aren't brands
const getTagColor = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % tagPalette.length);
    return tagPalette[index];
};

export default function EducationPage() {
    const theme = useTheme();
    const [showAiSummary, setShowAiSummary] = useState(false);

    const aiSummaryText = "AI Insight: Charan is actively transitioning academic theory into practical application. While his B.Sc. provided a strong foundation in statistics and SQL, his ongoing M.Sc. in Computer Science demonstrates a commitment to mastering complex systems like Autonomous AI Agents and FAANG-level algorithmic problem solving.";

    // Helper to render highlights as tags, splitting coursework if needed
    const renderHighlights = (highlights: string[]) => {
        const tags: string[] = [];

        highlights.forEach(h => {
            if (h.startsWith('Coursework:')) {
                // Split coursework into individual tags
                const courses = h.replace('Coursework:', '').split(',').map(s => s.trim());
                tags.push(...courses);
            } else {
                tags.push(h);
            }
        });

        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                {tags.map((tag, i) => {
                    const isLongSentence = tag.length > 30;

                    if (isLongSentence) {
                        return (
                            <Stack key={i} direction="row" gap={1} alignItems="flex-start" sx={{ width: '100%', mb: 0.5 }}>
                                <Box
                                    sx={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        bgcolor: theme.palette.primary.main,
                                        mt: 1,
                                        flexShrink: 0,
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {tag}
                                </Typography>
                            </Stack>
                        );
                    }

                    // Hybrid Approach:
                    // 1. Check if it's a known Brand (like Python, SQL) -> Use Brand Color
                    // 2. If not, use Custom Tag Palette -> Use Vibrant Custom Color

                    // Simple logic to find matching brand key in the tag string (e.g. "DBMS (SQL)" matches "SQL")
                    const brandKey = Object.keys(brandColors).find(k => tag.toLowerCase().includes(k.toLowerCase()));

                    let bg = '';
                    let color = '';

                    if (brandKey) {
                        const brand = brandColors[brandKey];
                        bg = brand.bg;
                        color = brand.color;
                    } else {
                        bg = getTagColor(tag);
                        color = '#fff';
                    }

                    return (
                        <Chip
                            key={i}
                            label={tag}
                            size="small"
                            sx={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                bgcolor: bg,
                                color: color,
                                border: 'none',
                                boxShadow: 'none',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: darken(bg, 0.1),
                                    boxShadow: 'none',
                                },
                            }}
                        />
                    );
                })}
            </Box>
        );
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Header */}
            <AnimatedSection>
                <Stack direction="row" alignItems="center" gap={2} mb={1}>
                    <Typography variant="h3" fontWeight={800}>
                        🎓 Education
                    </Typography>
                    <Tooltip title="AI Education Analysis">
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
                    My academic journey and professional certifications in Computer Science,
                    Data Science, and Machine Learning.
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

            {/* Education Timeline */}
            <Stack gap={0} sx={{ mb: 6 }}>
                {education.map((edu, i) => (
                    <AnimatedSection key={edu.degree} delay={i * 0.1}>
                        <Stack direction="row" gap={3} sx={{ position: 'relative' }}>
                            {/* Timeline */}
                            <Stack alignItems="center" sx={{ width: 44, flexShrink: 0 }}>
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: i === 0 ? `${theme.palette.primary.main}15` : `${theme.palette.success.main}15`,
                                        border: `2px solid ${i === 0 ? theme.palette.primary.main : theme.palette.success.main}`,
                                    }}
                                >
                                    {i === 0 ? (
                                        <PlayCircleFilledIcon sx={{ color: theme.palette.primary.main, fontSize: 22 }} />
                                    ) : (
                                        <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 22 }} />
                                    )}
                                </Box>
                                {i < education.length - 1 && (
                                    <Box sx={{ width: 3, flexGrow: 1, bgcolor: theme.palette.divider, my: 0.5 }} />
                                )}
                            </Stack>

                            {/* Card */}
                            <Box sx={{
                                flex: 1,
                                mb: 3,
                                transition: 'all 0.3s',
                                '&:hover': { transform: 'translateX(4px)' }
                            }}>
                                <PixelCard variant={i === 0 ? "blue" : "default"}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1}>
                                        <Box>
                                            <Typography variant="h5" fontWeight={800}>
                                                {edu.degree}
                                            </Typography>
                                            <Stack direction="row" gap={1} alignItems="center" mt={0.5}>
                                                <SchoolIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                                                <Typography variant="subtitle1" color="primary" fontWeight={600}>
                                                    {edu.institution}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                        <Stack alignItems="flex-end" gap={0.5}>
                                            <Chip
                                                icon={<CalendarMonthIcon />}
                                                label={edu.duration}
                                                size="small"
                                                variant="outlined"
                                            />
                                            <Chip
                                                label={edu.status}
                                                size="small"
                                                color={i === 0 ? 'primary' : 'success'}
                                                variant={i === 0 ? 'filled' : 'outlined'}
                                            />
                                        </Stack>
                                    </Stack>

                                    <Divider sx={{ my: 2 }} />

                                    {/* Render Tags */}
                                    {renderHighlights(edu.highlights)}
                                </PixelCard>
                            </Box>
                        </Stack>
                    </AnimatedSection>
                ))}
            </Stack>

            {/* Certifications */}
            <AnimatedSection delay={0.2}>
                <Typography variant="h4" fontWeight={800} gutterBottom sx={{ mb: 3 }}>
                    📜 Certifications
                </Typography>
            </AnimatedSection>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {certifications.map((cert, i) => {
                    // Check for brand color in certs too
                    const brandKey = Object.keys(brandColors).find(k => cert.name.toLowerCase().includes(k.toLowerCase()));

                    let bg = '';
                    let color = '#fff';

                    if (brandKey) {
                        const brand = brandColors[brandKey];
                        bg = brand.bg;
                        color = brand.color;
                    } else {
                        bg = getTagColor(cert.name);
                    }

                    return (
                        <Box key={cert.name} sx={{ flexGrow: 1, minWidth: 300, maxWidth: { xs: '100%', md: '48%' } }}>
                            <AnimatedSection delay={0.25 + i * 0.05}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        border: `1px solid ${theme.palette.divider}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        height: '100%',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            borderColor: bg,
                                            bgcolor: `${bg}08`,
                                            boxShadow: 'none'
                                        },
                                    }}
                                >
                                    <WorkspacePremiumIcon sx={{ color: bg, fontSize: 28 }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography fontWeight={700} variant="subtitle1">
                                            {cert.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {cert.issuer}
                                        </Typography>
                                    </Box>
                                    <Chip label={cert.year} size="small" variant="outlined" />
                                </Paper>
                            </AnimatedSection>
                        </Box>
                    );
                })}
            </Box>
        </Container>
    );
}
