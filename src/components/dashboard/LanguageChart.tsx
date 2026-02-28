'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';

interface LanguageChartProps {
    data: { name: string; value: number; color: string }[];
}

export default function LanguageChart({ data }: LanguageChartProps) {
    const theme = useTheme();

    return (
        <GlassCard hover={false}>
            <Typography variant="h6" fontWeight={700} mb={2}>
                Languages
            </Typography>
            <Box sx={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, i) => (
                                <Cell key={i} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 12,
                                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{ fontSize: '0.75rem' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </GlassCard>
    );
}
