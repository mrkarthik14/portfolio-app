import type { ProjectData } from '@/types';

export type ProjectCategory = 'ml' | 'analytics' | 'dashboards' | 'data-engineering';

// Use GitHub metadata as well as curated skills, so new repositories can be
// discovered by the filters without requiring a source-code catalog entry.
export function getProjectCategories(project: Pick<ProjectData, 'name' | 'description' | 'topics' | 'skills'>): ProjectCategory[] {
    // Curated skills describe the project more precisely than incidental words
    // in its prose (for example, a profile README mentioning machine learning).
    const skills = project.skills || [];
    const text = [project.name, ...(skills.length ? [] : [project.description]), ...skills, ...project.topics]
        .join(' ').toLowerCase().replace(/[_-]+/g, ' ');
    const categories: ProjectCategory[] = [];
    if (/\b(machine learning|ml|ai|deep learning|computer vision|opencv|scikit learn|xgboost|lightgbm|llm|genai|generative ai|predictive model\w*)\b/.test(text)) categories.push('ml');
    if (/\b(data science|data analy\w*|analytics|pandas|eda|a\/b testing|statistical|financial analysis|signal processing)\b/.test(text)) categories.push('analytics');
    if (/\b(dashboard\w*|power bi|tableau|looker|recharts)\b/.test(text)) categories.push('dashboards');
    if (/\b(data engineering|data pipeline\w*|etl|elt|snowflake|bigquery|azure data factory)\b/.test(text)) categories.push('data-engineering');
    return categories;
}

export function matchesProjectCategory(project: Pick<ProjectData, 'name' | 'description' | 'topics' | 'skills'>, category: string): boolean {
    const categories = getProjectCategories(project);
    return category === 'data-science' ? categories.length > 0 : categories.some(value => value === category);
}
