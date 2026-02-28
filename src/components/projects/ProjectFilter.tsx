'use client';

import { Chip, Stack, Typography } from '@mui/material';

interface ProjectFilterProps {
    languages: string[];
    selectedLanguage: string | null;
    onSelect: (lang: string | null) => void;
}

export default function ProjectFilter({
    languages,
    selectedLanguage,
    onSelect,
}: ProjectFilterProps) {
    return (
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
            <Chip
                label="All"
                onClick={() => onSelect(null)}
                variant={selectedLanguage === null ? 'filled' : 'outlined'}
                sx={{
                    fontWeight: 600,
                    bgcolor: selectedLanguage === null ? 'primary.main' : 'transparent',
                    color: selectedLanguage === null ? 'primary.contrastText' : 'text.secondary',
                    borderColor: 'primary.main',
                }}
            />
            {languages.map((lang) => (
                <Chip
                    key={lang}
                    label={lang}
                    onClick={() => onSelect(lang)}
                    variant={selectedLanguage === lang ? 'filled' : 'outlined'}
                    sx={{
                        fontWeight: 500,
                        bgcolor: selectedLanguage === lang ? 'secondary.main' : 'transparent',
                        color: selectedLanguage === lang ? 'secondary.contrastText' : 'text.secondary',
                        borderColor: 'secondary.main',
                    }}
                />
            ))}
        </Stack>
    );
}
