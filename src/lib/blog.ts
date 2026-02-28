import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllBlogPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) {
        return getDefaultPosts();
    }

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

    if (files.length === 0) {
        return getDefaultPosts();
    }

    const posts = files.map((filename) => {
        const filePath = path.join(BLOG_DIR, filename);
        const raw = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);

        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        return {
            slug: filename.replace('.md', ''),
            title: data.title || filename.replace('.md', ''),
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            excerpt: data.excerpt || content.slice(0, 160) + '...',
            tags: data.tags || [],
            content,
            readTime,
        };
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
    const posts = getAllBlogPosts();
    return posts.find((p) => p.slug === slug) || null;
}

function getDefaultPosts(): BlogPost[] {
    return [
        {
            slug: 'getting-started-with-nextjs',
            title: 'Getting Started with Next.js 14',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            excerpt: 'A comprehensive guide to building modern web applications with Next.js 14 and the App Router.',
            tags: ['Next.js', 'React', 'Web Development'],
            content: `# Getting Started with Next.js 14

Next.js 14 introduces several exciting features that make building modern web applications easier than ever.

## Why Next.js?

Next.js provides a powerful framework for building React applications with:

- **Server-Side Rendering (SSR)** for better SEO and performance
- **Static Site Generation (SSG)** for blazing-fast pages
- **API Routes** for building full-stack applications
- **File-based Routing** for intuitive project structure

## Getting Started

To create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app --typescript
\`\`\`

## The App Router

The App Router is the recommended approach in Next.js 14. It uses a file-system based router where folder structure defines your routes.

Stay tuned for more tutorials in this series!`,
            readTime: 3,
        },
        {
            slug: 'data-visualization-best-practices',
            title: 'Data Visualization Best Practices',
            date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
            excerpt: 'Learn the principles of effective data visualization that will make your dashboards stand out.',
            tags: ['Data Science', 'Visualization', 'Analytics'],
            content: `# Data Visualization Best Practices

Effective data visualization is both an art and a science. Here are key principles to follow.

## 1. Know Your Audience

Before creating any visualization, understand who will be viewing it and what decisions they need to make.

## 2. Choose the Right Chart Type

- **Line charts** for trends over time
- **Bar charts** for comparisons
- **Pie charts** for proportions (use sparingly)
- **Scatter plots** for relationships

## 3. Use Color Intentionally

Color should highlight, not decorate. Use a consistent palette and reserve bright colors for emphasis.

## 4. Simplify

Remove unnecessary gridlines, borders, and decorations. Every element should serve a purpose.

These principles apply whether you're using Tableau, Power BI, or custom code!`,
            readTime: 4,
        },
    ];
}
