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
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingChatAgent() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: 'ai' | 'user', text: string }[]>([
        { sender: 'ai', text: "Hi there! 👋 I'm the AI portfolio assistant. Feel free to ask me about Charan's projects, experience, or skills!" }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { sender: 'user', text: input }]);
        const currentInput = input;
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                sender: 'ai',
                text: `That's a great question about "${currentInput}". I'm currently in prototype mode, but you can find detailed AI briefs on the Projects page or check out the 'About' section!`
            }]);
        }, 1000);
    };

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
                                border: '1px solid',
                                borderColor: 'divider',
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
                            <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'background.default' }}>
                                {messages.map((msg, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                                        }}
                                    >
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 1.5,
                                                maxWidth: '85%',
                                                borderRadius: 3,
                                                bgcolor: msg.sender === 'user' ? '#00838f' : 'background.paper',
                                                color: msg.sender === 'user' ? 'white' : 'text.primary',
                                                border: msg.sender === 'ai' ? '1px solid' : 'none',
                                                borderColor: 'divider',
                                                borderBottomRightRadius: msg.sender === 'user' ? 4 : 16,
                                                borderBottomLeftRadius: msg.sender === 'ai' ? 4 : 16,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                                {msg.text}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                ))}
                                <div ref={messagesEndRef} />
                            </Box>

                            {/* Input Area */}
                            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper', display: 'flex', gap: 1 }}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    placeholder="Ask me something..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: 8, bgcolor: 'background.default' }
                                    }}
                                />
                                <IconButton
                                    onClick={handleSend}
                                    sx={{
                                        bgcolor: '#00838f',
                                        color: 'white',
                                        '&:hover': { bgcolor: '#006064' },
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
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </Fab>
        </>
    );
}
