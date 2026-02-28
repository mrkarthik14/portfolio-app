export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    created_at: string;
    updated_at: string;
}

export interface ProjectData {
    id: string;
    githubId: number;
    name: string;
    description: string | null;
    url: string;
    homepage: string | null;
    stars: number;
    forks: number;
    language: string | null;
    topics: string[];
    isFavorite?: boolean;
    order?: number;
    aiAnalysis?: {
        situation: string;
        task: string;
        action: string;
        result: string;
    };
    skills?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface LinkedInPostData {
    id: string;
    externalId?: string | null;
    content: string;
    imageUrl?: string | null;
    likes: number;
    comments: number;
    postDate: string;
}

export interface ProfileStatsData {
    platform: string;
    followers: number;
    connections: number;
    publicRepos: number;
    totalStars: number;
    recordedAt: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface SyncLogData {
    id: string;
    platform: string;
    status: string;
    message: string | null;
    syncedAt: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content: string;
    readTime: number;
}

export interface AnalyticsData {
    languageDistribution: { name: string; value: number; color: string }[];
    activityTimeline: { month: string; repos: number; stars: number }[];
    postFrequency: { month: string; posts: number }[];
    engagementTrends: { month: string; likes: number; comments: number }[];
    totalStats: {
        repos: number;
        stars: number;
        forks: number;
        posts: number;
        followers: number;
        connections: number;
    };
}
