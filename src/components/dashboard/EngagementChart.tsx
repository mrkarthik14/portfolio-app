'use client';

import { Typography, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';

interface EngagementChartProps {
    data: { month: string; likes: number; comments: number }[];
}

export default function EngagementChart({ data }: EngagementChartProps) {
    const theme = useTheme();

    return (
        <GlassCard hover={false}>
            <Typography variant="h6" fontWeight={700} mb={2}>
                LinkedIn Engagement
            </Typography>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.8rem' }} />
                    <Bar dataKey="likes" fill="#C3B1E1" radius={[6, 6, 0, 0]} name="Likes" />
                    <Bar dataKey="comments" fill="#B8E0D2" radius={[6, 6, 0, 0]} name="Comments" />
                </BarChart>
            </ResponsiveContainer>
        </GlassCard>
    );
}
