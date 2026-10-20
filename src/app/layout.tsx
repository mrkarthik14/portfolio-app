import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { Metadata } from "next";
import ThemeProvider from "@/theme/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingChatAgent from "@/components/ui/FloatingChatAgent";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Charan Karthik Nayakanti — Data Science & Machine Learning",
  description:
    "Exploring computer vision, machine learning, and business analytics. Discover Charan Karthik Nayakanti’s projects, experiments, and approach to finding insight in data.",
  keywords: [
    "Charan Karthik Nayakanti",
    "data science",
    "machine learning",
    "computer vision",
    "analytics",
    "Python",
  ],
  openGraph: {
    title: "Charan Karthik Nayakanti | Data Science & Machine Learning",
    description:
      "From raw data to real insight: projects in machine learning, computer vision, and analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
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
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
