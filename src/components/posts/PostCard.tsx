'use client';

import { Box, Typography, Stack, Avatar, useTheme } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import GlassCard from '@/components/ui/GlassCard';
import { LinkedInPostData } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
    post: LinkedInPostData;
}

export default function PostCard({ post }: PostCardProps) {
    const theme = useTheme();

    return (
        <GlassCard>
            <Stack direction="row" gap={2} alignItems="flex-start">
                <Box
                    sx={{
                        width: 3,
                        minHeight: '100%',
                        borderRadius: 2,
                        background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        flexShrink: 0,
                    }}
                />
                <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" gap={1} mb={1.5}>
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                bgcolor: 'primary.main',
                                fontSize: '0.875rem',
                                fontWeight: 700,
                            }}
                        >
                            P
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                                Your Name
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {formatDistanceToNow(new Date(post.postDate), { addSuffix: true })}
                            </Typography>
                        </Box>
                    </Stack>

                    <Typography
                        variant="body2"
                        sx={{
                            whiteSpace: 'pre-line',
                            lineHeight: 1.7,
                            mb: 2,
                            color: 'text.primary',
                        }}
                    >
                        {post.content}
                    </Typography>

                    {post.imageUrl && (
                        <Box
                            component="img"
                            src={post.imageUrl}
                            alt="Post image"
                            sx={{
                                width: '100%',
                                borderRadius: 2,
                                mb: 2,
                                maxHeight: 300,
                                objectFit: 'cover',
                            }}
                        />
                    )}

                    <Stack direction="row" gap={3} alignItems="center">
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={0.5}
                            sx={{ color: 'text.secondary' }}
                        >
                            <ThumbUpIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                            <Typography variant="caption" fontWeight={600}>
                                {post.likes}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={0.5}
                            sx={{ color: 'text.secondary' }}
                        >
                            <CommentIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                            <Typography variant="caption" fontWeight={600}>
                                {post.comments}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </GlassCard>
    );
}
