'use client';

import { Container, Typography, Box } from '@mui/material';
import ExperienceTimeline from '@/components/about/ExperienceTimeline';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ExperiencePage() {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <AnimatedSection>
                <Box mb={4}>
                    <Typography variant="h3" fontWeight={800} gutterBottom sx={{ color: 'white' }}>
                        Professional Experience
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        A timeline of my professional journey, freelance projects, and roles.
                    </Typography>
                </Box>
                <ExperienceTimeline />
            </AnimatedSection>
        </Container>
    );
}
