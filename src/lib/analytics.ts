import { AnalyticsData } from '@/types';

export function aggregateAnalytics(
    repos: { language: string | null; stars: number; forks: number; createdAt: Date }[],
    posts: { likes: number; comments: number; postDate: Date }[],
    githubStats: { followers: number; publicRepos: number },
    linkedinStats: { followers: number; connections: number }
): AnalyticsData {
    // Language distribution
    const langCounts: Record<string, number> = {};
    const langColors: Record<string, string> = {
        TypeScript: '#3178C6',
        JavaScript: '#F7DF1E',
        Python: '#3776AB',
        Java: '#ED8B00',
        'C#': '#239120',
        Go: '#00ADD8',
        Rust: '#DEA584',
        Ruby: '#CC342D',
        PHP: '#777BB4',
        HTML: '#E34F26',
        CSS: '#1572B6',
        Shell: '#89E051',
        Jupyter: '#F37626',
    };

    repos.forEach((r) => {
        if (r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        }
    });

    const languageDistribution = Object.entries(langCounts)
        .map(([name, value]) => ({
            name,
            value,
            color: langColors[name] || '#94A3B8',
        }))
        .sort((a, b) => b.value - a.value);

    // Activity timeline (repos created per month, last 12 months)
    const now = new Date();
    const months: string[] = [];
    for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(d.toLocaleDateString('en', { month: 'short', year: '2-digit' }));
    }

    const activityTimeline = months.map((month) => {
        const reposInMonth = repos.filter((r) => {
            const d = new Date(r.createdAt);
            return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
        });
        return {
            month,
            repos: reposInMonth.length,
            stars: reposInMonth.reduce((sum, r) => sum + r.stars, 0),
        };
    });

    // Post frequency per month
    const postFrequency = months.map((month) => {
        const postsInMonth = posts.filter((p) => {
            const d = new Date(p.postDate);
            return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
        });
        return {
            month,
            posts: postsInMonth.length,
        };
    });

    // Engagement trends
    const engagementTrends = months.map((month) => {
        const postsInMonth = posts.filter((p) => {
            const d = new Date(p.postDate);
            return d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) === month;
        });
        return {
            month,
            likes: postsInMonth.reduce((sum, p) => sum + p.likes, 0),
            comments: postsInMonth.reduce((sum, p) => sum + p.comments, 0),
        };
    });

    const totalStars = repos.reduce((sum, r) => sum + r.stars, 0);
    const totalForks = repos.reduce((sum, r) => sum + r.forks, 0);

    return {
        languageDistribution,
        activityTimeline,
        postFrequency,
        engagementTrends,
        totalStats: {
            repos: githubStats.publicRepos || repos.length,
            stars: totalStars,
            forks: totalForks,
            posts: posts.length,
            followers: githubStats.followers + linkedinStats.followers,
            connections: linkedinStats.connections,
        },
    };
}

// Analytics based on real GitHub data for mrkarthik14
export function getDemoAnalytics(): AnalyticsData {
    const months = ['Mar \'25', 'Apr \'25', 'May \'25', 'Jun \'25', 'Jul \'25', 'Aug \'25',
        'Sep \'25', 'Oct \'25', 'Nov \'25', 'Dec \'25', 'Jan \'26', 'Feb \'26'];

    return {
        languageDistribution: [
            { name: 'Python', value: 6, color: '#3776AB' },
            { name: 'TypeScript', value: 5, color: '#3178C6' },
            { name: 'Jupyter Notebook', value: 1, color: '#F37626' },
        ],
        activityTimeline: [
            { month: 'Mar \'25', repos: 0, stars: 0 },
            { month: 'Apr \'25', repos: 1, stars: 0 },
            { month: 'May \'25', repos: 0, stars: 0 },
            { month: 'Jun \'25', repos: 0, stars: 0 },
            { month: 'Jul \'25', repos: 0, stars: 0 },
            { month: 'Aug \'25', repos: 1, stars: 1 },
            { month: 'Sep \'25', repos: 1, stars: 0 },
            { month: 'Oct \'25', repos: 2, stars: 2 },
            { month: 'Nov \'25', repos: 0, stars: 0 },
            { month: 'Dec \'25', repos: 1, stars: 1 },
            { month: 'Jan \'26', repos: 2, stars: 2 },
            { month: 'Feb \'26', repos: 4, stars: 2 },
        ],
        postFrequency: months.map((month) => ({
            month,
            posts: Math.floor(Math.random() * 3) + 1,
        })),
        engagementTrends: months.map((month, i) => ({
            month,
            likes: Math.floor(Math.random() * 50) + 10 + i * 3,
            comments: Math.floor(Math.random() * 15) + 2 + i,
        })),
        totalStats: {
            repos: 27,
            stars: 8,
            forks: 0,
            posts: 10,
            followers: 6,
            connections: 500,
        },
    };
}
