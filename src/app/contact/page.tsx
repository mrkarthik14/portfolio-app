'use client';

import { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
    Snackbar,
    useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ContactPage() {
    const theme = useTheme();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed to send message');

            setSuccess(true);
            setForm({ name: '', email: '', message: '' });
        } catch {
            setError('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <AnimatedSection>
                <Typography variant="h3" fontWeight={800} gutterBottom>
                    Get in Touch
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
                    Have a question or want to work together? Drop me a message!
                </Typography>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
                <GlassCard hover={false}>
                    <form onSubmit={handleSubmit}>
                        <Stack gap={3}>
                            <TextField
                                label="Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Message"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                required
                                fullWidth
                                multiline
                                rows={5}
                            />

                            {error && (
                                <Alert severity="error" sx={{ borderRadius: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                endIcon={<SendIcon />}
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    color: '#1a2a3a',
                                    fontWeight: 700,
                                    py: 1.5,
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                                    },
                                    '&.Mui-disabled': {
                                        background: theme.palette.action.disabledBackground,
                                    },
                                }}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </Stack>
                    </form>
                </GlassCard>
            </AnimatedSection>

            <Snackbar
                open={success}
                autoHideDuration={5000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity="success"
                    onClose={() => setSuccess(false)}
                    sx={{ borderRadius: 2 }}
                >
                    Message sent successfully! I'll get back to you soon.
                </Alert>
            </Snackbar>
        </Container>
    );
}
