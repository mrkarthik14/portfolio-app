'use client';

import { Container, Typography, Chip, Stack, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GlassCard from '@/components/ui/GlassCard';
import MarkdownRenderer from '@/components/blog/MarkdownRenderer';
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types';

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPost() {
            try {
                const res = await fetch(`/api/blog/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                }
            } catch {
                // post not found
            } finally {
                setLoading(false);
            }
        }
        loadPost();
    }, [slug]);

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
                <Typography color="text.secondary">Loading...</Typography>
            </Container>
        );
    }

    if (!post) {
        return (
            <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Post not found
                </Typography>
                <Button component={Link} href="/blog" startIcon={<ArrowBackIcon />}>
                    Back to Blog
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <AnimatedSection>
                <Button
                    component={Link}
                    href="/blog"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 3, color: 'text.secondary' }}
                >
                    Back to Blog
                </Button>

                <Typography variant="h3" fontWeight={800} gutterBottom>
                    {post.title}
                </Typography>

                <Stack direction="row" gap={2} alignItems="center" mb={2}>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <CalendarTodayIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {format(new Date(post.date), 'MMMM d, yyyy')}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                            {post.readTime} min read
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap={0.5} mb={4}>
                    {post.tags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ bgcolor: 'rgba(167,199,231,0.15)', color: 'primary.main' }}
                        />
                    ))}
                </Stack>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
                <GlassCard hover={false}>
                    <MarkdownRenderer content={post.content} />
                </GlassCard>
            </AnimatedSection>
        </Container>
    );
}
