import { darken } from '@mui/material';

// Brand colors for various technologies
export const brandColors: Record<string, { bg: string; color: string }> = {
    // Languages
    TypeScript: { bg: '#3178C6', color: '#fff' },
    JavaScript: { bg: '#F7DF1E', color: '#000' },
    Python: { bg: '#3776AB', color: '#fff' },
    Java: { bg: '#ED8B00', color: '#fff' },
    Go: { bg: '#00ADD8', color: '#fff' },
    Rust: { bg: '#DEA584', color: '#000' },
    Ruby: { bg: '#CC342D', color: '#fff' },
    PHP: { bg: '#777BB4', color: '#fff' },
    HTML: { bg: '#E34F26', color: '#fff' },
    CSS: { bg: '#1572B6', color: '#fff' },
    'C#': { bg: '#239120', color: '#fff' },
    Shell: { bg: '#89E051', color: '#000' },

    // Frameworks & Libraries
    React: { bg: '#61DAFB', color: '#000' },
    'Next.js': { bg: '#000000', color: '#fff' },
    'Node.js': { bg: '#339933', color: '#fff' },
    Streamlit: { bg: '#FF4B4B', color: '#fff' },
    Pandas: { bg: '#150458', color: '#fff' },
    NumPy: { bg: '#013243', color: '#fff' },
    'Scikit-learn': { bg: '#F7931E', color: '#fff' },
    Plotly: { bg: '#3F4F75', color: '#fff' },
    'Material UI': { bg: '#007FFF', color: '#fff' },
    Prisma: { bg: '#2D3748', color: '#fff' },
    Tailwind: { bg: '#06B6D4', color: '#fff' },

    // Tools & Platforms
    Git: { bg: '#F05032', color: '#fff' },
    GitHub: { bg: '#181717', color: '#fff' },
    Docker: { bg: '#2496ED', color: '#fff' },
    Jupyter: { bg: '#F37626', color: '#fff' },
    SQL: { bg: '#4479A1', color: '#fff' },
    'Power BI': { bg: '#F2C811', color: '#000' },
    Tableau: { bg: '#E97627', color: '#fff' },

    // Fallbacks/Generic
    'Machine Learning': { bg: '#FF6F00', color: '#fff' },
    'Data Analytics': { bg: '#00897B', color: '#fff' },
    'Data Visualization': { bg: '#E91E63', color: '#fff' },
    'Deep Learning': { bg: '#4527A0', color: '#fff' },
    'AI/ML': { bg: '#7B1FA2', color: '#fff' },
    'Statistics': { bg: '#673AB7', color: '#fff' },
    'EDA': { bg: '#00ACC1', color: '#fff' },
    'Feature Engineering': { bg: '#558B2F', color: '#fff' },
};

// Generate a consistent HSL color for any string (for vibrant fallbacks)
export const getStringColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return { bg: `hsl(${hue}, 70%, 45%)`, color: '#fff' };
};

// Helper to get color for a skill, fallback to theme default or generated color
export const getSkillColor = (skill: string, themeColor: string, useRandomFallback = false) => {
    // Basic normalization for matching (e.g., handles lowercase match if exact match fails)
    const exactMatch = brandColors[skill];
    if (exactMatch) return exactMatch;

    // Check case-insensitive
    const lowerSkill = skill.toLowerCase();
    const foundKey = Object.keys(brandColors).find(k => k.toLowerCase() === lowerSkill);
    if (foundKey) return brandColors[foundKey];

    // Fallback: Random/Hash color if requested, otherwise theme color
    if (useRandomFallback) {
        return getStringColor(skill);
    }

    return { bg: themeColor, color: '#fff' };
};
