'use client';

import { useEffect, useState } from 'react';
import { Container, Typography, Stack, CircularProgress, Alert } from '@mui/material';
import PostCard from '@/components/posts/PostCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { LinkedInPostData } from '@/types';

export default function PostsPage() {
    const [posts, setPosts] = useState<LinkedInPostData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/posts');
                if (!res.ok) throw new Error('Failed to fetch posts');
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load posts');
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
                <CircularProgress size={48} />
                <Typography sx={{ mt: 2 }} color="text.secondary">Loading LinkedIn posts...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <AnimatedSection>
                <Typography variant="h3" fontWeight={800} gutterBottom>
                    LinkedIn Posts
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 5, maxWidth: 600 }}>
                    Thoughts on data science, machine learning, and building impactful projects.
                </Typography>
            </AnimatedSection>

            {error && <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>}

            <Stack gap={3}>
                {posts.map((post, i) => (
                    <AnimatedSection key={post.id} delay={i * 0.08}>
                        <PostCard post={post} />
                    </AnimatedSection>
                ))}
            </Stack>

            {posts.length === 0 && !loading && (
                <Typography color="text.secondary" textAlign="center" sx={{ py: 6 }}>
                    No posts yet. Sync your LinkedIn data to get started.
                </Typography>
            )}
        </Container>
    );
}
