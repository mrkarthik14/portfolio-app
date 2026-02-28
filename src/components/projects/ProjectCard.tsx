'use client';

import {
    Box,
    Typography,
    Chip,
    Stack,
    useTheme,
    Paper,
    darken,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProjectData } from '@/types';
import { brandColors, getSkillColor } from '@/lib/brandColors';

interface ProjectCardProps {
    project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const theme = useTheme();
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
                    <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ flex: 1, mr: 1 }}>
                        {project.name}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="center">
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

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {project.description || 'No description available'}
                </Typography>

                {/* Skills (Brand Colored) + Topics (Outlined) */}
                <Stack direction="row" gap={0.5} flexWrap="wrap">
                    {(project.skills || []).slice(0, 5).map((skill: string) => {
                        const style = getSkillColor(skill, theme.palette.primary.main);
                        // If using primary theme color, we keep it simple, otherwise use custom
                        const isCustom = !!brandColors[skill];

                        return (
                            <Chip
                                key={skill}
                                label={skill}
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
                    })}
                    {project.topics
                        .filter((t: string) => !(project.skills || []).includes(t))
                        .slice(0, 3)
                        .map((topic: string) => (
                            <Chip
                                key={topic}
                                label={topic}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                            />
                        ))}
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
