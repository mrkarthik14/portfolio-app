'use client';

import { Box, Tooltip, Typography, useTheme } from '@mui/material';

interface ContributionHeatmapProps {
    data?: Record<string, number>; // date string -> count
}

export default function ContributionHeatmap({ data }: ContributionHeatmapProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // Generate last 365 days of data
    const days = 365;
    const today = new Date();
    const cells: { date: string; count: number; dayOfWeek: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        const count = data?.[dateStr] ?? Math.floor(Math.random() * 5);
        cells.push({ date: dateStr, count, dayOfWeek: d.getDay() });
    }

    const getColor = (count: number) => {
        if (count === 0) return isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
        if (count === 1) return '#B8E0D2';
        if (count === 2) return '#8CCAB5';
        if (count === 3) return '#5DB89E';
        return '#3A9D80';
    };

    // Group into weeks
    const weeks: typeof cells[] = [];
    let currentWeek: typeof cells = [];
    cells.forEach((cell) => {
        if (cell.dayOfWeek === 0 && currentWeek.length > 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
        currentWeek.push(cell);
    });
    if (currentWeek.length > 0) weeks.push(currentWeek);

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                Contribution Activity
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: '3px',
                    overflowX: 'auto',
                    pb: 1,
                    '&::-webkit-scrollbar': { height: 4 },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: 2,
                        bgcolor: 'action.disabled',
                    },
                }}
            >
                {weeks.map((week, wi) => (
                    <Box key={wi} sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {week.map((cell) => (
                            <Tooltip
                                key={cell.date}
                                title={`${cell.count} contributions on ${cell.date}`}
                                arrow
                            >
                                <Box
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '3px',
                                        bgcolor: getColor(cell.count),
                                        transition: 'all 0.15s',
                                        '&:hover': {
                                            transform: 'scale(1.3)',
                                            outline: `2px solid ${theme.palette.primary.main}`,
                                        },
                                    }}
                                />
                            </Tooltip>
                        ))}
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography variant="caption" color="text.secondary">Less</Typography>
                {[0, 1, 2, 3, 4].map((level) => (
                    <Box
                        key={level}
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '3px',
                            bgcolor: getColor(level),
                        }}
                    />
                ))}
                <Typography variant="caption" color="text.secondary">More</Typography>
            </Box>
        </Box>
    );
}
