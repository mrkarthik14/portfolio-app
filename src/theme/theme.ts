'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseTheme: ThemeOptions = {
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 700,
        },
        h2: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 700,
        },
        h3: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 600,
        },
        h4: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 600,
        },
        h5: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 500,
        },
        h6: {
            fontFamily: '"Outfit", "Inter", sans-serif',
            fontWeight: 500,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '10px 24px',
                    fontSize: '0.95rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
    },
};

export const lightTheme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'light',
        primary: {
            main: '#A7C7E7',
            dark: '#7BA7D0',
            light: '#C5DCEF',
            contrastText: '#1a2a3a',
        },
        secondary: {
            main: '#C3B1E1',
            dark: '#A68FCA',
            light: '#D8CCF0',
            contrastText: '#2a1a3a',
        },
        background: {
            default: '#F8F9FC',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
        success: {
            main: '#B8E0D2',
            dark: '#8CCAB5',
        },
        warning: {
            main: '#FFD1BA',
            dark: '#FFB694',
        },
        info: {
            main: '#FFF2B2',
            dark: '#FFE880',
        },
        divider: 'rgba(0,0,0,0.06)',
    },
});

export const darkTheme = createTheme({
    ...baseTheme,
    palette: {
        mode: 'dark',
        primary: {
            main: '#A7C7E7',
            dark: '#7BA7D0',
            light: '#C5DCEF',
            contrastText: '#0f1729',
        },
        secondary: {
            main: '#C3B1E1',
            dark: '#A68FCA',
            light: '#D8CCF0',
            contrastText: '#0f1729',
        },
        background: {
            default: '#0F172A',
            paper: '#1E293B',
        },
        text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
        },
        success: {
            main: '#B8E0D2',
            dark: '#8CCAB5',
        },
        warning: {
            main: '#FFD1BA',
            dark: '#FFB694',
        },
        info: {
            main: '#FFF2B2',
            dark: '#FFE880',
        },
        divider: 'rgba(255,255,255,0.08)',
    },
    components: {
        ...baseTheme.components,
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                },
            },
        },
    },
});
