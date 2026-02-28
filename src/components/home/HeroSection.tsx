'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Box, Container, Typography, Button, Stack, Avatar, useTheme,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AssessmentIcon from '@mui/icons-material/Assessment'; // Kaggle
import { motion } from 'framer-motion';
import GradientText from '@/components/ui/GradientText';
import ProfileCard from '@/components/ui/ProfileCard';

interface ProfileData {
    name: string;
    avatarUrl: string;
    bio: string;
    profileUrl: string;
    linkedinUrl: string;
}

export default function HeroSection() {
    const theme = useTheme();
    const [profile, setProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
        fetch('/api/profile')
            .then((r) => r.json())
            .then((data) => setProfile(data))
            .catch(() => { });
    }, []);

    const name = profile?.name || 'Charan Karthik';
    const avatar = profile?.avatarUrl || 'https://avatars.githubusercontent.com/u/150363006?v=4';
    const githubUrl = profile?.profileUrl || 'https://github.com/mrkarthik14';
    const linkedinUrl = profile?.linkedinUrl || 'https://www.linkedin.com/in/charankarthiknayakanti/';
    const kaggleUrl = 'https://www.kaggle.com/charankarthik1404'; // Kaggle URL

    // Brand Colors for Social Buttons
    const brandColors = {
        github: '#2b3137', // GitHub Dark
        linkedin: '#0077b5', // LinkedIn Blue
        kaggle: '#20BEFF',   // Kaggle Blue
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '60%',
                    height: '100%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${theme.palette.primary.main}15, transparent 70%)`,
                    filter: 'blur(80px)',
                },
            }}
        >
            <Container maxWidth="lg">
                <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" gap={6}>
                    <Box sx={{ flex: 1 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Typography
                                variant="h6"
                                color="primary"
                                fontWeight={600}
                                gutterBottom
                                sx={{ letterSpacing: 2, textTransform: 'uppercase' }}
                            >
                                Aspiring Data Scientist & Data Analyst
                            </Typography>
                            <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, lineHeight: 1.2, mb: 2, width: 'fit-content' }}>
                                Hi, I&apos;m Charan Karthik
                                <Box component="div" sx={{ textAlign: 'right' }}>
                                    <GradientText
                                        colors={['#FF9AA2', '#FFB7B2', '#FFDAC1', '#B5EAD7', '#C7CEEA']}
                                        animationSpeed={8}
                                        showBorder={false}
                                    >
                                        Nayakanti
                                    </GradientText>
                                </Box>
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
                                I turn raw data into actionable business insights using Python, SQL, and BI tools.
                                <br />
                                <Box component="span" sx={{ display: 'block', mt: 1, fontSize: '0.9em', opacity: 0.9 }}>
                                    Interested in fintech, marketing analytics, and sports analytics.
                                </Box>
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">
                                <Button
                                    component={Link}
                                    href="/projects"
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        borderRadius: 50,
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 700,
                                        color: '#fff' // Ensure text is white
                                    }}
                                >
                                    See My Data Projects
                                </Button>

                                {/* Social Buttons with Label & Brand Colors */}
                                <Stack direction="row" gap={1.5} flexWrap="wrap">
                                    {[
                                        { icon: <GitHubIcon />, url: githubUrl, color: brandColors.github, label: 'GitHub' },
                                        { icon: <LinkedInIcon />, url: linkedinUrl, color: brandColors.linkedin, label: 'LinkedIn' },
                                        { icon: <AssessmentIcon />, url: kaggleUrl, color: brandColors.kaggle, label: 'Kaggle' },
                                    ].map((social) => (
                                        <Button
                                            key={social.label}
                                            component={Link}
                                            href={social.url}
                                            target="_blank"
                                            variant="outlined"
                                            startIcon={social.icon}
                                            sx={{
                                                borderRadius: 50,
                                                px: 3,
                                                py: 1,
                                                color: social.color,
                                                borderColor: social.color,
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                borderWidth: 2,
                                                '&:hover': {
                                                    bgcolor: social.color,
                                                    color: '#fff',
                                                    borderColor: social.color,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 4px 12px ${social.color}66`
                                                },
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {social.label}
                                        </Button>
                                    ))}
                                </Stack>
                            </Stack>
                        </motion.div>
                    </Box>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Box sx={{ width: 300, height: 450, position: 'relative', top: '-40px' }}>
                            <ProfileCard
                                name="Charan Karthik"
                                title="Data Analyst & Data Scientist"
                                handle="mrkarthik14"
                                avatarUrl={avatar}
                                status="Open to Work"
                                contactText="Contact Me"
                                enableTilt={true}
                                showUserInfo={false}
                            />
                        </Box>
                    </motion.div>
                </Stack>
            </Container>
        </Box>
    );
}
