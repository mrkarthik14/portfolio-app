'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mui/material';

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <Box
            sx={{
                '& h1': { fontSize: '2rem', fontWeight: 700, mt: 3, mb: 1.5 },
                '& h2': { fontSize: '1.5rem', fontWeight: 700, mt: 3, mb: 1 },
                '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1 },
                '& p': { lineHeight: 1.8, mb: 2, color: 'text.primary' },
                '& ul, & ol': { pl: 3, mb: 2 },
                '& li': { lineHeight: 1.8, mb: 0.5 },
                '& code': {
                    bgcolor: 'rgba(167,199,231,0.15)',
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 1,
                    fontSize: '0.85em',
                    fontFamily: '"Fira Code", monospace',
                },
                '& pre': {
                    bgcolor: 'rgba(0,0,0,0.04)',
                    borderRadius: 2,
                    p: 2,
                    overflow: 'auto',
                    mb: 2,
                    '& code': { bgcolor: 'transparent', px: 0, py: 0 },
                },
                '& blockquote': {
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    pl: 2,
                    ml: 0,
                    color: 'text.secondary',
                    fontStyle: 'italic',
                },
                '& a': { color: 'primary.main', textDecoration: 'underline' },
                '& hr': { border: 'none', borderTop: '1px solid', borderColor: 'divider', my: 3 },
            }}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </Box>
    );
}
