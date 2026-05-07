import { Box, Typography, Paper, useTheme, Stack, Chip } from '@mui/material';

const experiences = [
    {
        title: 'Freelance Data Analyst',
        company: 'Self-employed — Remote',
        date: 'Jan 2026 – Mar 2026',
        description: 'Worked on freelance Business Intelligence and reporting projects for retail and e-commerce clients, focused on solving day-to-day business reporting problems using SQL, Power BI, Python, and Excel.',
        bullets: [
            'Built Power BI dashboards for sales tracking, category performance, and seasonal demand analysis to support pricing and stock planning decisions',
            'Wrote SQL queries for data extraction, joins, cleaning, duplicate removal, validation checks, and reporting table preparation',
            'Automated repetitive data preparation tasks using Python to reduce manual effort and improve reporting consistency',
        ],
        skills: ['SQL', 'Power BI', 'Python', 'Excel', 'Business Intelligence'],
    },
    {
        title: 'Freelance Project — Siri Travels Tirupati',
        company: 'Self-employed — Remote',
        date: 'Mar 2026 – Apr 2026',
        description: 'Developed and deployed a complete business landing page for Siri Travels Tirupati, a local travel service brand, focused on improving online visibility and generating direct customer inquiries.',
        bullets: [
            'Designed a fully responsive landing page using HTML5, CSS3, and JavaScript for smooth performance across all devices',
            'Applied SEO optimization using meta tags, structured headings, keyword placement, and image optimization',
            'Managed complete deployment using Hostinger hosting platform, configuring domain setup and live website publishing',
        ],
        skills: ['HTML5', 'CSS3', 'JavaScript', 'SEO', 'Hostinger'],
    }
];

export default function ExperienceTimeline() {
    const theme = useTheme();

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
                Experience
            </Typography>
            <Stack spacing={3}>
                {experiences.map((exp, index) => (
                    <Paper 
                        key={index}
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.main}08)`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: `0 8px 30px ${theme.palette.primary.main}15`,
                                borderColor: theme.palette.primary.main,
                            },
                        }}
                    >
                        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={1} gap={1}>
                            <Typography variant="subtitle1" fontWeight={800} color="primary.main">
                                {exp.title}
                            </Typography>
                            <Chip label={exp.date} size="small" variant="outlined" color="secondary" />
                        </Stack>
                        
                        <Typography variant="subtitle2" fontWeight={600} color="text.secondary" mb={2}>
                            {exp.company}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 1.6 }}>
                            {exp.description}
                        </Typography>

                        <Box component="ul" sx={{ pl: 2, m: 0, mb: 2, color: 'text.secondary', '& li': { mb: 0.5 } }}>
                            {exp.bullets.map((bullet, i) => (
                                <Typography component="li" variant="body2" key={i}>
                                    {bullet}
                                </Typography>
                            ))}
                        </Box>

                        <Stack direction="row" flexWrap="wrap" gap={1}>
                            {exp.skills.map(skill => (
                                <Chip key={skill} label={skill} size="small" sx={{ fontSize: '0.7rem', fontWeight: 600, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }} />
                            ))}
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
}
