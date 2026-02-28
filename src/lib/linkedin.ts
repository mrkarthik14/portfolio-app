import { LinkedInPostData, ProfileStatsData } from '@/types';
import path from 'path';
import fs from 'fs';

/**
 * LinkedIn API is restricted for personal profiles.
 * This module provides a manual JSON fallback approach:
 * - Add your posts to content/linkedin-posts.json
 * - Add your stats to content/linkedin-stats.json
 * 
 * When LinkedIn API access is available, the fetchFromAPI 
 * functions can be enabled.
 */

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function getLinkedInPosts(): Promise<LinkedInPostData[]> {
    try {
        // Try API first if credentials are available
        if (process.env.LINKEDIN_ACCESS_TOKEN) {
            return await fetchLinkedInPostsFromAPI();
        }
    } catch {
        console.log('LinkedIn API unavailable, falling back to local data');
    }

    // Fallback to local JSON
    return getLinkedInPostsFromFile();
}

export async function getLinkedInStats(): Promise<ProfileStatsData | null> {
    try {
        if (process.env.LINKEDIN_ACCESS_TOKEN) {
            return await fetchLinkedInStatsFromAPI();
        }
    } catch {
        console.log('LinkedIn API unavailable, falling back to local data');
    }

    return getLinkedInStatsFromFile();
}

function getLinkedInPostsFromFile(): LinkedInPostData[] {
    const filePath = path.join(CONTENT_DIR, 'linkedin-posts.json');

    if (!fs.existsSync(filePath)) {
        return getDefaultPosts();
    }

    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return getDefaultPosts();
    }
}

function getLinkedInStatsFromFile(): ProfileStatsData | null {
    const filePath = path.join(CONTENT_DIR, 'linkedin-stats.json');

    if (!fs.existsSync(filePath)) {
        return getDefaultStats();
    }

    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return getDefaultStats();
    }
}

async function fetchLinkedInPostsFromAPI(): Promise<LinkedInPostData[]> {
    // LinkedIn Share API endpoint
    // Requires Marketing Developer Platform approved app
    const response = await fetch('https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:person:me&count=20', {
        headers: {
            Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
            'X-Restli-Protocol-Version': '2.0.0',
        },
    });

    if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.status}`);
    }

    const data = await response.json();

    return data.elements?.map((post: Record<string, unknown>) => {
        const created = post.created as Record<string, unknown> | undefined;
        return {
            id: String(post.id || ''),
            externalId: String(post.id || ''),
            content: String((post.text as Record<string, unknown>)?.text || ''),
            imageUrl: null,
            likes: 0,
            comments: 0,
            postDate: new Date(Number(created?.time) || Date.now()).toISOString(),
        };
    }) || [];
}

async function fetchLinkedInStatsFromAPI(): Promise<ProfileStatsData> {
    const response = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
            Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.status}`);
    }

    return {
        platform: 'linkedin',
        followers: 0,
        connections: 0,
        publicRepos: 0,
        totalStars: 0,
        recordedAt: new Date().toISOString(),
    };
}

function getDefaultPosts(): LinkedInPostData[] {
    return [
        {
            id: '1',
            content: '🚀 Excited to share my latest project! Built a full-stack portfolio with automatic GitHub sync and analytics dashboard. The tech stack includes Next.js, Material UI, and Prisma. Check it out!',
            imageUrl: null,
            likes: 47,
            comments: 12,
            postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: '2',
            content: '💡 Key lesson from my latest data science project: Always visualize your data before building models. A simple EDA saved us weeks of debugging. Here\'s what I found...',
            imageUrl: null,
            likes: 89,
            comments: 23,
            postDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: '3',
            content: '🎯 Just completed the Machine Learning Specialization! Here are my top 3 takeaways:\n\n1. Feature engineering is everything\n2. Start simple, then iterate\n3. Cross-validation is your best friend\n\n#MachineLearning #DataScience #CareerGrowth',
            imageUrl: null,
            likes: 156,
            comments: 34,
            postDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: '4',
            content: '📊 Data visualization tip: Use color intentionally. Don\'t just make things colorful — use color to highlight the story in your data. Less is more when it comes to effective dashboards.',
            imageUrl: null,
            likes: 72,
            comments: 18,
            postDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: '5',
            content: '🔥 Open source contribution milestone! Just had my first PR merged into a major project. The developer community is incredibly welcoming. If you\'re thinking about contributing — just do it!',
            imageUrl: null,
            likes: 203,
            comments: 45,
            postDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];
}

function getDefaultStats(): ProfileStatsData {
    return {
        platform: 'linkedin',
        followers: 1250,
        connections: 500,
        publicRepos: 0,
        totalStars: 0,
        recordedAt: new Date().toISOString(),
    };
}
