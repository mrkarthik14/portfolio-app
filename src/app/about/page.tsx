'use client';

import { useEffect, useState } from 'react';
import {
    Container, Typography, Grid, Chip, Stack, useTheme,
    Avatar, Box, Paper, darken, Button, Collapse, IconButton, Tooltip
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getSkillColor } from '@/lib/brandColors';
import GitHubActivityChart from '@/components/dashboard/GitHubActivityChart'; // Import Chart
import { AnalyticsData } from '@/types';
import { getDemoAnalytics } from '@/lib/analytics';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AssessmentIcon from '@mui/icons-material/Assessment'; // Kaggle

interface ProfileData {
    name: string;
    avatarUrl: string;
    bio: string;
    followers: number;
    publicRepos: number;
    totalStars: number;
    profileUrl: string;
    linkedinUrl: string;
}

// Hand-picked colors and arrangement to minimize adjacent color conflicts
const skills = [
    { name: 'Python', level: 85 },
    { name: 'SQL', level: 80 },
    { name: 'Pandas', level: 80 },
    { name: 'NumPy', level: 80 },
    { name: 'Machine Learning', level: 65 },
    { name: 'Scikit-learn', level: 85 },
    { name: 'Data Visualization', level: 85 },
    { name: 'Power BI', level: 80 },
    { name: 'Streamlit', level: 80 },
    { name: 'Plotly', level: 80 },
    { name: 'Tableau', level: 80 },
    { name: 'Statistics', level: 80 },
    { name: 'EDA', level: 85 },
    { name: 'Feature Engineering', level: 70 },
];

export default function AboutPage() {
    const theme = useTheme();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [analytics, setAnalytics] = useState<AnalyticsData>(getDemoAnalytics()); // Init with demo data
    const [showAiSummary, setShowAiSummary] = useState(false);

    const aiSummaryText = "AI Insight: Charan combines strong foundational data analytics skills (SQL, Power BI, Python) with an aggressive trajectory into FAANG-level Machine Learning. His profile demonstrates a clear pattern of continuous learning and an ability to translate complex technical concepts into measurable business value, making him an ideal candidate for roles bridging pure analytics and early-stage data science.";

    useEffect(() => {
        // Fetch Profile Data
        fetch('/api/profile')
            .then((r) => r.json())
            .then((data) => setProfile(data))
            .catch(() => { });

        // Fetch Analytics Data (for GitHub Chart)
        fetch('/api/analytics')
            .then((r) => {
                if (r.ok) return r.json();
                throw new Error('Failed');
            })
            .then((data) => {
                if (data.totalStats) setAnalytics(data);
            })
            .catch(() => { });
    }, []);

    const name = profile?.name || 'Charan Karthik Nayakanti';
    const avatar = profile?.avatarUrl || 'https://avatars.githubusercontent.com/u/150363006?v=4';
    const repos = profile?.publicRepos || 27;
    const followers = profile?.followers || 6;

    // Social Links
    const githubUrl = profile?.profileUrl || 'https://github.com/mrkarthik14';
    const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/charankarthiknayakanti/';
    const kaggleUrl = 'https://www.kaggle.com/charankarthik1404';

    // Brand Colors
    const brandColors = {
        github: '#2b3137', // GitHub Dark
        linkedin: '#0077b5', // LinkedIn Blue
        kaggle: '#20BEFF',   // Kaggle Blue
    };

    const cardStyle = {
        p: 4,
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.main}08)`,
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: `0 12px 40px ${theme.palette.primary.main}20`,
            borderColor: theme.palette.primary.main,
        },
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Grid container spacing={4}>
                {/* Bio Section */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper elevation={0} sx={cardStyle}>
                        <Stack direction="row" gap={3} alignItems="flex-start" mb={3}>
                            <Avatar
                                src={avatar}
                                alt={name}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    border: `3px solid ${theme.palette.primary.main}`,
                                }}
                            />
                            <Box>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography variant="h4" fontWeight={800}>
                                        {name}
                                    </Typography>
                                    <Tooltip title="AI Profile Analysis">
                                        <IconButton
                                            onClick={() => setShowAiSummary(!showAiSummary)}
                                            size="small"
                                            sx={{
                                                bgcolor: showAiSummary ? '#00838f' : 'transparent',
                                                color: showAiSummary ? 'white' : '#00838f',
                                                border: '1px solid #00838f',
                                                '&:hover': { bgcolor: '#00838f', color: 'white' }
                                            }}
                                        >
                                            <AutoAwesomeIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                                <Typography variant="h6" color="text.secondary" fontWeight={400}>
                                    Aspiring Data Scientist &amp; Analyst
                                </Typography>
                                <Stack direction="row" gap={1} mt={1} alignItems="center" flexWrap="wrap">
                                    <Chip label={`${repos} Projects`} size="small" color="primary" variant="outlined" />
                                    <Chip label={`${followers} Followers`} size="small" color="secondary" variant="outlined" />
                                </Stack>

                                {/* Social Buttons Row */}
                                <Stack direction="row" gap={1} mt={2} flexWrap="wrap">
                                    {[
                                        { icon: <GitHubIcon fontSize="small" />, url: githubUrl, color: brandColors.github, label: 'GitHub' },
                                        { icon: <LinkedInIcon fontSize="small" />, url: linkedinUrl, color: brandColors.linkedin, label: 'LinkedIn' },
                                        { icon: <AssessmentIcon fontSize="small" />, url: kaggleUrl, color: brandColors.kaggle, label: 'Kaggle' },
                                    ].map((social) => (
                                        <Button
                                            key={social.label}
                                            component={Link}
                                            href={social.url}
                                            target="_blank"
                                            variant="contained"
                                            startIcon={social.icon}
                                            size="small"
                                            sx={{
                                                borderRadius: 50,
                                                px: 2,
                                                bgcolor: social.color,
                                                color: '#fff',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                border: social.label === 'GitHub' && theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.2)' : 'none',
                                                '&:hover': {
                                                    bgcolor: social.color,
                                                    filter: 'brightness(1.1)',
                                                }
                                            }}
                                        >
                                            {social.label}
                                        </Button>
                                    ))}
                                </Stack>
                            </Box>
                        </Stack>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            I&apos;m an aspiring Data Scientist with a strong foundation in Data Analytics.
                            I specialize in turning complex datasets into clear, actionable stories using Python, SQL, and Visualization tools.
                            Currently, I am diving deep into Machine Learning algorithms to build predictive models that solve real-world business problems.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            My journey is driven by curiosity and a commitment to continuous learning—whether it&apos;s mastering a new algorithm,
                            optimizing a data pipeline, or visualizing trends that drive decisions.
                        </Typography>

                        <Collapse in={showAiSummary}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    mt: 3,
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
                    </Paper>

                    {/* What I Do */}
                    <AnimatedSection delay={0.2}>
                        <Paper elevation={0} sx={{ ...cardStyle, mt: 3, height: '100%' }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                What I Do
                            </Typography>
                            <Grid container spacing={2}>
                                {[
                                    { emoji: '📊', title: 'Data Analytics', desc: 'EDA, SQL, Power BI, Business Insights' },
                                    { emoji: '🤖', title: 'Machine Learning', desc: 'Regression, Classification, Scikit-learn, Predictive Modeling' },
                                    { emoji: '🐍', title: 'Python & SQL', desc: 'Pandas, NumPy, Data Cleaning, Query Optimization' },
                                    { emoji: '📈', title: 'Visualization', desc: 'Streamlit, Plotly, Tableau, Storytelling with Data' },
                                ].map((item) => (
                                    <Grid size={{ xs: 12, sm: 6 }} key={item.title}>
                                        <Stack direction="row" gap={1.5} alignItems="flex-start">
                                            <Typography fontSize={28}>{item.emoji}</Typography>
                                            <Box>
                                                <Typography fontWeight={700}>{item.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.desc}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </AnimatedSection>
                </Grid>

                {/* Skills & Activity Section */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Stack gap={3}>
                        {/* Skills */}
                        <AnimatedSection delay={0.1}>
                            <Paper elevation={0} sx={{ ...cardStyle, height: '100%' }}>
                                <Typography variant="h6" fontWeight={700} gutterBottom>
                                    Skills &amp; Technologies
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    Proficiency based on projects and hands-on experience.
                                </Typography>

                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {skills.map((skill) => {
                                        const color = getSkillColor(skill.name, theme.palette.primary.main);
                                        const isCustom = color.bg !== theme.palette.primary.main;

                                        return (
                                            <Chip
                                                key={skill.name}
                                                label={`${skill.name} ${skill.level}%`}
                                                size="small"
                                                sx={{
                                                    fontSize: '0.7rem',
                                                    fontWeight: 700,
                                                    bgcolor: isCustom ? color.bg : theme.palette.primary.main,
                                                    color: isCustom ? color.color : theme.palette.primary.contrastText,
                                                    transition: 'all 0.2s',
                                                    '&:hover': {
                                                        bgcolor: isCustom ? darken(color.bg, 0.1) : theme.palette.primary.dark,
                                                    }
                                                }}
                                            />
                                        );
                                    })}
                                </Box>
                            </Paper>
                        </AnimatedSection>

                        {/* GitHub Activity - Moved from Dashboard */}
                        <AnimatedSection delay={0.3}>
                            {/* Wrapper to match card style roughly, but resizing chart to fit */}
                            <Box sx={{ height: 300, width: '100%' }}>
                                <GitHubActivityChart data={analytics.activityTimeline} />
                            </Box>
                        </AnimatedSection>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}
