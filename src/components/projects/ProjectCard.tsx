'use client';

import {
    Box,
    Typography,
    Chip,
    Stack,
    useTheme,
    Paper,
    darken,
    Collapse,
    IconButton,
    Tooltip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { ProjectData } from '@/types';
import { brandColors, getSkillColor } from '@/lib/brandColors';
import { useState } from 'react';

interface ProjectCardProps {
    project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const theme = useTheme();
    const [showAi, setShowAi] = useState(false);
    // Determine main brand color for the card accent
    const mainTech = project.language || project.skills?.[0] || 'Default';
    const brand = brandColors[mainTech] || brandColors[project.language || ''];
    const accentColor = brand ? brand.bg : theme.palette.primary.main;

    return (
        <Paper
            component="a"
            href={project.url}
            target="_blank"
            elevation={0}
            onClick={(e) => {
                // If it's a link click, let it pass, otherwise perhaps nothing or toggle AI
                // The parent is an 'a' tag, so clicking anywhere navigates.
                // We must prevent bubbling on interactive elements inside.
            }}
            sx={{
                display: 'block',
                p: 4,
                borderRadius: 4,
                textDecoration: 'none',
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${accentColor}08)`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: `0 12px 40px ${accentColor}20`,
                    borderColor: accentColor,
                },
            }}
        >
            <Stack gap={2} sx={{ height: '100%' }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box sx={{ flex: 1, mr: 1 }}>
                        {project.isFavorite && (
                            <Chip 
                                label="⭐ Featured" 
                                size="small" 
                                sx={{ mb: 1, fontWeight: 800, bgcolor: 'rgba(255, 180, 0, 0.15)', color: '#FFB400', border: '1px solid #FFB400' }} 
                            />
                        )}
                        <Typography variant="h5" fontWeight={800} color="text.primary">
                            {project.name}
                        </Typography>
                    </Box>
                    <Stack direction="row" gap={1} alignItems="center">
                        {project.aiAnalysis && (
                            <Tooltip title="AI Project Analysis (STAR)">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setShowAi(!showAi);
                                    }}
                                    sx={{
                                        color: showAi ? 'white' : '#00838f',
                                        bgcolor: showAi ? '#00838f' : 'transparent',
                                        border: '1px solid #00838f',
                                        '&:hover': { bgcolor: '#00838f', color: 'white' }
                                    }}
                                >
                                    <AutoAwesomeIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}
                        <GitHubIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                        <ArrowForwardIcon sx={{ fontSize: 18, color: accentColor }} />
                    </Stack>
                </Stack>

                {/* Language subtitle */}
                {project.language && (
                    <Stack direction="row" gap={1} alignItems="center">
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: accentColor,
                            }}
                        />
                        <Typography variant="subtitle2" fontWeight={600} sx={{ color: accentColor }}>
                            {project.language}
                        </Typography>
                    </Stack>
                )}

                {/* Metrics Badge */}
                {project.metrics && project.metrics.length > 0 && (
                    <Stack direction="row" gap={1} mt={0.5} flexWrap="wrap">
                        {project.metrics.map((m, idx) => (
                            <Chip 
                                key={idx}
                                label={<Box component="span"><strong>{m.value}</strong> {m.label}</Box>}
                                size="small"
                                sx={{ fontWeight: 600, fontSize: '0.75rem', bgcolor: 'rgba(0, 200, 83, 0.1)', color: '#00C853', border: '1px solid rgba(0, 200, 83, 0.3)' }}
                            />
                        ))}
                    </Stack>
                )}

                {/* Description and AI Analysis */}
                <Box sx={{ flexGrow: 1 }}>
                    <Collapse in={!showAi}>
                        <Typography variant="body2" color="text.secondary">
                            {project.description || 'No description available'}
                        </Typography>
                    </Collapse>

                    {project.aiAnalysis && (
                        <Collapse in={showAi}>
                            <Box
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 131, 143, 0.1)' : '#e0f7fa',
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderLeft: `4px solid #00838f`,
                                    cursor: 'default'
                                }}
                            >
                                <Stack gap={1.5}>
                                    <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
                                        <AutoAwesomeIcon sx={{ fontSize: 16, color: theme.palette.mode === 'dark' ? '#b2ebf2' : '#00838f' }} />
                                        <Typography variant="subtitle2" fontWeight={700} sx={{ color: theme.palette.mode === 'dark' ? '#b2ebf2' : '#00838f' }}>
                                            AI Project Brief (STAR)
                                        </Typography>
                                    </Stack>

                                    <Box>
                                        <Typography variant="caption" fontWeight={700} color="text.primary" display="block">
                                            SITUATION
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {project.aiAnalysis.situation}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" fontWeight={700} color="text.primary" display="block">
                                            TASK
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {project.aiAnalysis.task}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" fontWeight={700} color="text.primary" display="block">
                                            ACTION
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {project.aiAnalysis.action}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" fontWeight={700} color="text.primary" display="block">
                                            RESULT
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {project.aiAnalysis.result}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Collapse>
                    )}
                </Box>

                {/* Skills (Brand Colored) + Topics (Outlined) */}
                <Stack direction="row" gap={0.5} flexWrap="wrap">
                    {(() => {
                        const skills = project.skills || [];
                        const topics = (project.topics || []).filter((t: string) => !skills.includes(t));
                        const allTags = [
                            ...skills.map(val => ({ val, type: 'skill' })),
                            ...topics.map(val => ({ val, type: 'topic' }))
                        ].slice(0, 4); // Limit to 4 tags max

                        return allTags.map((tag) => {
                            if (tag.type === 'skill') {
                                const style = getSkillColor(tag.val, theme.palette.primary.main);
                                const isCustom = !!brandColors[tag.val];
                                return (
                                    <Chip
                                        key={tag.val}
                                        label={tag.val}
                                        size="small"
                                        sx={{
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            bgcolor: isCustom ? style.bg : theme.palette.primary.main,
                                            color: isCustom ? style.color : theme.palette.primary.contrastText,
                                            '&:hover': {
                                                bgcolor: isCustom ? darken(style.bg, 0.1) : theme.palette.primary.dark,
                                            }
                                        }}
                                    />
                                );
                            } else {
                                return (
                                    <Chip
                                        key={tag.val}
                                        label={tag.val}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontSize: '0.7rem' }}
                                    />
                                );
                            }
                        });
                    })()}
                </Stack>

                {/* Stats bar */}
                <Stack direction="row" gap={3} alignItems="center" mt="auto">
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <StarIcon sx={{ fontSize: 16, color: '#FFB400' }} />
                        <Typography variant="caption" fontWeight={700}>
                            {project.stars}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <ForkRightIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" fontWeight={700}>
                            {project.forks}
                        </Typography>
                    </Stack>
                    {project.homepage && (
                        <Chip
                            icon={<LaunchIcon sx={{ fontSize: '14px !important' }} />}
                            label="Live Demo"
                            size="small"
                            variant="outlined"
                            clickable
                            sx={{ fontSize: '0.7rem', ml: 'auto' }}
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(project.homepage!, '_blank');
                            }}
                        />
                    )}
                </Stack>
            </Stack>
        </Paper>
    );
}
