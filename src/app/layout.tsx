import './globals.css';
import type { Metadata } from 'next';
import ThemeProvider from '@/theme/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingChatAgent from '@/components/ui/FloatingChatAgent';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Data Analyst & Aspiring Data Scientist | Charan Karthik Nayakanti',
  description:
    'A modern portfolio showcasing projects, blog posts, and professional insights. Built with Next.js, Material UI, and real-time GitHub/LinkedIn sync.',
  keywords: ['portfolio', 'developer', 'data science', 'full-stack', 'projects'],
  openGraph: {
    title: 'Portfolio | Full-Stack Developer & Data Enthusiast',
    description: 'A modern portfolio showcasing projects, blog posts, and professional insights.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>
        <ThemeProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
            <FloatingChatAgent />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
