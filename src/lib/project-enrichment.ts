// Custom descriptions and skills for GitHub repos that lack them or need enrichment
// This is used by the sync API to enrich project data

export const projectEnrichment: Record<string, { description?: string; skills: string[] }> = {
    'marketplace-insights-dashboard': {
        description: 'Interactive Streamlit dashboard analyzing e-commerce marketplace data with 5 actionable business insights, seller performance metrics, and revenue trends.',
        skills: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Data Analytics'],
    },
    'telco-churn-prediction': {
        description: 'End-to-end ML pipeline for predicting telecom customer churn with 92% accuracy. Includes feature engineering, SMOTE for class imbalance, and a Streamlit inference dashboard.',
        skills: ['Python', 'Scikit-learn', 'Streamlit', 'SMOTE', 'Machine Learning'],
    },
    'customer-churn-prediction': {
        description: 'Customer retention intelligence system that predicts churn using behavioral analytics and recommends personalized retention strategies.',
        skills: ['Python', 'Machine Learning', 'Pandas', 'Data Analytics', 'Predictive Modeling'],
    },
    'Credit-Card-Fraud-Risk-Analysis': {
        description: 'Fraud detection system tackling extreme class imbalance (<1% fraud). Uses ensemble methods, anomaly detection, and threshold tuning for real-time prediction.',
        skills: ['Python', 'Machine Learning', 'Anomaly Detection', 'Scikit-learn', 'FinTech'],
    },
    'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard': {
        description: 'Power BI dashboard analyzing ICC T20 World Cup 2022 player performance — batting strike rates, bowling economy, and fielding impact scores.',
        skills: ['Power BI', 'Data Visualization', 'DAX', 'Sports Analytics', 'Data Modeling'],
    },
    'TensorTonic-Solutions': {
        description: '8 core ML algorithms implemented from scratch on TensorTonic — cosine similarity, euclidean distance, matrix operations, MSE, and statistics fundamentals.',
        skills: ['Python', 'NumPy', 'Linear Algebra', 'Machine Learning', 'Algorithms'],
    },
    'Customer-Retention-Intelligence-System': {
        description: 'Predictive analytics platform that identifies at-risk customers before they churn and recommends data-driven retention strategies.',
        skills: ['Python', 'Scikit-learn', 'Behavioral Analytics', 'Predictive Modeling', 'Pandas'],
    },
    'Ski-dashboard': {
        description: 'Streamlit-powered analytics dashboard for ski resort data — visitor trends, weather impact analysis, and operational insights.',
        skills: ['Python', 'Streamlit', 'Data Visualization', 'Pandas', 'Analytics'],
    },
    'faang-ml-journey': {
        description: '12-week Machine Learning roadmap covering math foundations, ML algorithms from scratch, deep learning, NLP, and FAANG-level system design.',
        skills: ['Python', 'Machine Learning', 'Linear Algebra', 'Deep Learning', 'System Design'],
    },
    'rentmylife-social-platform': {
        description: 'Social networking platform built with TypeScript/React — user profiles, real-time interactions, and content sharing features.',
        skills: ['TypeScript', 'Next.js', 'React', 'Web App', 'Social Platform'],
    },
    'A-Silent-Thread': {
        description: 'Creative storytelling project exploring narrative design and interactive fiction concepts.',
        skills: ['Creative Writing', 'Narrative Design', 'Storytelling'],
    },
    'RentMyLife': {
        description: 'Web platform for renting and sharing life experiences — built with responsive HTML/CSS and interactive JavaScript.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Web Development'],
    },
    'CarbonConnect': {
        description: 'Carbon footprint tracking web app — calculate, monitor, and reduce your environmental impact with interactive visualizations.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Environmental Tech', 'Data Visualization'],
    },
    'DataProSimX': {
        description: 'Data processing simulation tool built with TypeScript for testing and benchmarking data pipeline workflows.',
        skills: ['TypeScript', 'Data Engineering', 'Simulation', 'Benchmarking', 'Node.js'],
    },
    'career-compass-ai-coach': {
        description: 'AI-powered career guidance platform providing personalized learning paths, skill gap analysis, and career roadmaps using generative AI.',
        skills: ['TypeScript', 'AI/ML', 'Next.js', 'GenAI', 'Career Development'],
    },
    'AIMentorX': {
        description: 'Intelligent mentoring platform that uses AI to match learners with personalized resources, track progress, and provide adaptive learning paths.',
        skills: ['AI/ML', 'Education Tech', 'Mentoring', 'Adaptive Learning'],
    },
    'AI-Mentor-Personalised-learning-and-Career-Guidance': {
        description: 'Personalized learning and career guidance system powered by AI — generates custom study plans, tracks milestones, and provides career recommendations.',
        skills: ['TypeScript', 'React', 'AI/ML', 'Education Tech', 'Next.js'],
    },
    'scholar-gateway-pro': {
        description: 'Smart scholarship discovery platform that matches students with relevant funding opportunities based on their profile and academic interests.',
        skills: ['TypeScript', 'React', 'Full-Stack', 'Education Tech', 'Database Design'],
    },
    'ai-mentor-gen-ai': {
        description: 'Generative AI-powered mentor chatbot providing personalized learning guidance, topic explanations, and practice problem generation.',
        skills: ['JavaScript', 'GenAI', 'LLM', 'Chatbot', 'Education Tech'],
    },
    'ai-mentor': {
        description: 'AI mentoring prototype exploring conversational AI for educational support and personalized tutoring.',
        skills: ['AI/ML', 'Chatbot', 'Education Tech', 'Prototyping'],
    },
    'Zomato-data': {
        description: 'Exploratory data analysis of Zomato restaurant data — cuisine trends, pricing patterns, rating distributions, and location-based insights.',
        skills: ['Python', 'Jupyter', 'Pandas', 'EDA', 'Data Visualization'],
    },
    'Power-BI-projects': {
        description: 'Collection of Power BI dashboards covering business analytics, sales performance, and data-driven decision making visualizations.',
        skills: ['Power BI', 'DAX', 'Data Visualization', 'Business Analytics', 'Data Modeling'],
    },
    'TechnoSnag': {
        description: 'Tech troubleshooting and debugging knowledge base — curated solutions for common development issues and best practices.',
        skills: ['Documentation', 'Troubleshooting', 'DevOps', 'Best Practices'],
    },
    'mrkarthik14': {
        description: 'GitHub profile README — showcasing my journey in Data Science, Machine Learning, and Web Development.',
        skills: ['Markdown', 'GitHub', 'Personal Branding'],
    },
    'portfolio-app': {
        description: 'This portfolio website! Built with Next.js 16, Material UI, Prisma, and auto-synced with GitHub & LinkedIn data.',
        skills: ['TypeScript', 'Next.js', 'Material UI', 'Prisma', 'Web App'],
    },
    'git14': {
        description: 'Git workflow practice repository focusing on branching strategies, merge conflict resolution, and collaborative development patterns.',
        skills: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
    },
    'lucag-ml-journey': {
        description: 'Personal machine learning learning path documenting progress in algorithms, mathematics, and data science concepts.',
        skills: ['Machine Learning', 'Python', 'Documentation', 'Notes'],
    },
};
