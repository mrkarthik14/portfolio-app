"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Fab,
    Paper,
    Typography,
    IconButton,
    TextField,
    useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export default function FloatingChatAgent() {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    const { messages, sendMessage } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: 'welcome',
                role: 'assistant',
                parts: [{ type: 'text', text: "Hi there! 👋 I'm the AI portfolio assistant. Feel free to ask me about Charan's projects, experience, or skills!" }]
            }
        ]
    } as any);

    const [input, setInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSend = (e?: React.FormEvent | React.KeyboardEvent) => {
        if (e) e.preventDefault();
        if (!input || !input.trim()) return;

        const text = input.trim();
        setInput('');
        sendMessage({ text });
    };

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        sx={{
                            position: 'fixed',
                            bottom: 90,
                            right: 20,
                            width: { xs: 'calc(100vw - 40px)', sm: 360 },
                            height: 480,
                            zIndex: 9999,
                        }}
                    >
                        <Paper
                            elevation={12}
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 4,
                                overflow: 'hidden',
                                border: `1px solid ${theme.palette.divider}`,
                                background: `linear-gradient(135deg, ${theme.palette.background.paper}, #00838f08)`,
                                boxShadow: `0 12px 40px #00838f20`,
                            }}
                        >
                            {/* Header - Filled Chilled Color */}
                            <Box
                                sx={{
                                    bgcolor: '#00838f', // Deep Cyan / Teal
                                    color: 'white',
                                    p: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AutoAwesomeIcon fontSize="small" sx={{ color: '#e0f7fa' }} />
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        AI Assistant
                                    </Typography>
                                </Box>
                                <IconButton size="small" onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            {/* Chat Area */}
                            <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, background: 'transparent' }}>
                                {messages.map((msg, i) => (
                                    <Box
                                        key={msg.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                                        }}
                                    >
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 1.5,
                                                maxWidth: '85%',
                                                borderRadius: 3,
                                                bgcolor: msg.role === 'user' ? '#00838f' : (theme.palette.mode === 'dark' ? 'rgba(0, 131, 143, 0.1)' : '#e0f7fa'),
                                                color: msg.role === 'user' ? 'white' : 'text.primary',
                                                border: msg.role !== 'user' ? `1px solid ${theme.palette.divider}` : 'none',
                                                borderLeft: msg.role !== 'user' ? `4px solid #00838f` : 'none',
                                                borderBottomRightRadius: msg.role === 'user' ? 4 : 16,
                                                borderBottomLeftRadius: msg.role !== 'user' ? 4 : 16,
                                                fontSize: '0.875rem',
                                                lineHeight: 1.5,
                                                '& p': { m: 0, '&:not(:last-child)': { mb: 1 } },
                                                '& a': { color: msg.role === 'user' ? 'white' : '#00838f' }
                                            }}
                                        >
                                            <ReactMarkdown>
                                                {msg.parts?.filter(p => p.type === 'text').map(p => (p as any).text).join('') || (msg as any).content || ''}
                                            </ReactMarkdown>
                                        </Paper>
                                    </Box>
                                ))}
                                <div ref={messagesEndRef} />
                            </Box>

                            {/* Input Area */}
                            <Box
                                component="form"
                                onSubmit={handleSend}
                                sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, background: 'transparent', display: 'flex', gap: 1 }}
                            >
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Ask me something..."
                                    value={input}
                                    onChange={handleInputChange}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: 8, bgcolor: theme.palette.background.paper }
                                    }}
                                />
                                <IconButton
                                    type="submit"
                                    disabled={!input || !input.trim()}
                                    sx={{
                                        bgcolor: '#00838f',
                                        color: 'white',
                                        '&:hover': { bgcolor: '#006064' },
                                        '&:disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled' },
                                        width: 40,
                                        height: 40
                                    }}
                                >
                                    <SendIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Box>
                )}
            </AnimatePresence>

            <Fab
                aria-label="chat"
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 9999,
                    bgcolor: '#00838f', // Chilled color
                    color: 'white',
                    boxShadow: '0 4px 14px 0 rgba(0,131,143,0.39)',
                    '&:hover': {
                        bgcolor: '#006064',
                        transform: 'scale(1.05)',
                        transition: 'all 0.2s ease-in-out'
                    }
                }}
            >
                {isOpen ? <CloseIcon /> : <AutoAwesomeIcon fontSize="large" />}
            </Fab>
        </>
    );
}
