'use client';

import { Typography, useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';

interface GitHubActivityChartProps {
    data: { month: string; repos: number; stars: number }[];
}

export default function GitHubActivityChart({ data }: GitHubActivityChartProps) {
    const theme = useTheme();

    return (
        <GlassCard hover={false}>
            <Typography variant="h6" fontWeight={700} mb={2}>
                GitHub Activity
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorRepos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#A7C7E7" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#A7C7E7" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorStars" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFD1BA" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#FFD1BA" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.divider }}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
                        axisLine={{ stroke: theme.palette.divider }}
                    />
                    <Tooltip
                        contentStyle={{
                            background: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 12,
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="repos"
                        stroke="#A7C7E7"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRepos)"
                        name="Repos"
                    />
                    <Area
                        type="monotone"
                        dataKey="stars"
                        stroke="#FFD1BA"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorStars)"
                        name="Stars"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </GlassCard>
    );
}
