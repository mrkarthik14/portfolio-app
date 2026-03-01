'use client';

import { useState } from 'react';
import {
    Container, Typography, Stack, Box, useTheme,
    Chip, Paper, Divider, darken, Collapse, Tooltip, IconButton, Avatar
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Lanyard from '@/components/ui/Lanyard';
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

            {/* Education Timeline as Lanyards */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 4,
                mb: 8,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {education.map((edu, i) => (
                    <AnimatedSection key={edu.degree} delay={i * 0.1}>
                        <Box sx={{
                            width: { xs: '100vw', md: '45vw' },
                            maxWidth: '500px',
                            height: '500px',
                            position: 'relative'
                        }}>
                            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]}>
                                <Stack spacing={1.5} sx={{ textAlign: 'center', alignItems: 'center', height: '100%', pt: 2 }}>

                                    <Avatar sx={{ bgcolor: i === 0 ? '#1565c0' : '#2e7d32', width: 44, height: 44, mb: 0.5, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                        <SchoolIcon fontSize="medium" />
                                    </Avatar>

                                    <Typography variant="body1" fontWeight={900} sx={{ fontSize: '1.05rem', lineHeight: 1.2, color: '#1a1a1a' }}>
                                        {edu.degree}
                                    </Typography>

                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#444', fontSize: '0.85rem' }}>
                                        {edu.institution}
                                    </Typography>

                                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 600 }}>
                                        {edu.duration}
                                    </Typography>

                                    <Chip
                                        label={edu.status}
                                        size="small"
                                        sx={{
                                            bgcolor: i === 0 ? '#e3f2fd' : '#e8f5e9',
                                            color: i === 0 ? '#1565c0' : '#2e7d32',
                                            fontWeight: 800,
                                            fontSize: '0.65rem',
                                            height: 22,
                                            border: `1px solid ${i === 0 ? '#90caf9' : '#a5d6a7'}`
                                        }}
                                    />

                                    <Divider sx={{ width: '80%', my: 0.5, borderColor: 'rgba(0,0,0,0.1)' }} />

                                    {/* Render Tags */}
                                    <Box sx={{
                                        transform: 'scale(0.85)',
                                        transformOrigin: 'top center',
                                        width: '115%',
                                        maxHeight: '120px',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5
                                    }}>
                                        {renderHighlights(edu.highlights)}
                                    </Box>

                                </Stack>
                            </Lanyard>
                        </Box>
                    </AnimatedSection>
                ))}
            </Box>

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
