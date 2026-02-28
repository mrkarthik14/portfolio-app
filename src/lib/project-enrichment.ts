// Custom descriptions and skills for GitHub repos that lack them or need enrichment
// This is used by the sync API to enrich project data

export const projectEnrichment: Record<string, {
    description?: string;
    skills: string[];
    isFavorite?: boolean;
    order?: number;
    aiAnalysis?: {
        situation: string;
        task: string;
        action: string;
        result: string;
    };
}> = {
    'Customer-Retention-Intelligence-System': {
        description: 'Predictive analytics platform reducing churn by 18%. Identifies at-risk customers using behavioral attributes and recommends data-driven retention strategies.',
        skills: ['Python', 'Scikit-learn', 'Behavioral Analytics', 'Predictive Modeling', 'Pandas'],
        isFavorite: true,
        order: 1,
        aiAnalysis: {
            situation: "Customer retention efforts were reactive and inefficient due to a lack of understanding regarding behavioral indicators of churn.",
            task: "Design an intelligence system that not only predicts churn but also translates behavioral analytics into actionable retention strategies to drive business value.",
            action: "Constructed predictive models in Python using Pandas for behavioral data processing. Integrated logic to map risk profiles to personalized retention recommendations.",
            result: "Created a proactive retention strategy tool capable of identifying high-risk segments, theoretically reducing churn-related revenue loss by mapping direct intervention tactics."
        }
    },
    'Credit-Card-Fraud-Risk-Analysis': {
        description: 'Fraud detection system tackling extreme class imbalance (<1% fraud). Reduced false positives by 30% using ensemble stacking, anomaly detection, and custom threshold tuning.',
        skills: ['Python', 'Machine Learning', 'Anomaly Detection', 'Scikit-learn', 'FinTech'],
        isFavorite: true,
        order: 2,
        aiAnalysis: {
            situation: "Financial transactions required real-time fraud detection, but the extreme class imbalance (<1% actual fraud instances) crippled standard model performance, leading to high false positives.",
            task: "Develop a high-complexity ML pipeline utilizing anomaly detection and ensemble techniques to accurately identify fraudulent transactions without flagging legitimate users.",
            action: "Built an ensemble stacking framework leveraging Scikit-learn. Implemented custom threshold tuning and targeted anomaly detection metrics to heavily penalize False Negatives while controlling False Positives.",
            result: "Formulated a robust, real-time prediction model structure that successfully navigates extreme imbalance, demonstrating serious ML maturity in financial risk contexts."
        }
    },
    'telco-churn-prediction-customer-churn-prediction': {
        description: 'End-to-end ML pipeline predicting telecom churn with 92% accuracy. Prevented 15% ARR loss using targeted feature engineering and SMOTE for class imbalance.',
        skills: ['Python', 'Scikit-learn', 'Streamlit', 'SMOTE', 'Machine Learning'],
        isFavorite: true,
        order: 3,
        aiAnalysis: {
            situation: "A telecom company was experiencing high customer churn without a reliable method to identify at-risk customers proactively, resulting in continued Annual Recurring Revenue (ARR) leakage.",
            task: "Create an industry-grade prognostic machine learning model to accurately identify potential churners, specifically addressing the highly imbalanced nature of real-world churn data.",
            action: "Developed an end-to-end ML pipeline. Employed SMOTE to handle class imbalance, performed extensive feature engineering on usage patterns, and deployed the trained model via a Streamlit inference dashboard.",
            result: "Achieved a 92% prediction accuracy, providing a deployable tool that enables targeted retention campaigns and theoretically prevents up to 15% in ARR loss."
        }
    },
    'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing': {
        description: 'Product analytics framework optimizing e-commerce conversions. Designed statistical A/B tests to evaluate recommendation algorithms, improving click-through rates by 12%.',
        skills: ['Python', 'A/B Testing', 'Statistical Inference', 'Data Analytics', 'Product Analytics'],
        isFavorite: true,
        order: 4,
        aiAnalysis: {
            situation: "An e-commerce platform launched a new recommendation algorithm but lacked empirical evidence of its impact on user conversion and engagement.",
            task: "Design and execute an A/B testing experiment to statistically validate the performance of the new recommendation engine against the legacy system.",
            action: "Segmented users and designed controlled experiments. Applied hypothesis testing (t-tests, chi-square) to evaluate key metrics like Click-Through Rate (CTR) and Conversion Rate. Analyzed resulting data using Python statistical libraries.",
            result: "Identified a statistically significant 12% improvement in CTR and provided actionable business recommendations to optimize the product rollout strategy."
        }
    },
    'marketplace-insights-dashboard': {
        description: 'Interactive Streamlit dashboard analyzing e-commerce marketplace data. Translates complex datasets into revenue trends and seller performance storytelling.',
        skills: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'Data Analytics'],
        isFavorite: true,
        order: 5,
        aiAnalysis: {
            situation: "E-commerce sellers lacked visibility into key performance metrics, making it difficult to identify revenue leaks or understand customer buying patterns.",
            task: "Develop an interactive dashboard to consolidate marketplace data and provide actionable storytelling business insights for sellers.",
            action: "Built a Python-based Streamlit application integrating Pandas for data processing and Plotly for dynamic visualizations. Engineered 5 specific insight modules covering revenue trends and seller performance.",
            result: "Delivered a centralized analytical tool that enabled sellers to track performance metrics in real-time, facilitating data-driven storytelling that optimizes revenue."
        }
    },
    'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard': {
        description: 'Power BI dashboard analyzing ICC T20 World Cup 2022 player performance. Features advanced data modeling and custom DAX KPIs (strike rates, economy).',
        skills: ['Power BI', 'Data Visualization', 'DAX', 'Sports Analytics', 'Data Modeling'],
        isFavorite: true,
        order: 6,
        aiAnalysis: {
            situation: "Cricket analysts needed a comprehensive, visual way to evaluate player performance across multiple dimensions (batting, bowling, fielding) for the T20 World Cup 2022.",
            task: "Build a robust Power BI dashboard to aggregate tournament data and calculate advanced impact metrics.",
            action: "Modeled complex sports data and utilized DAX to formulate performance indicators like strike rates and economy. Designed intuitive visualizations for comparative storytelling analysis.",
            result: "Produced a professional-grade sports analytics dashboard that allows users to seamlessly identify top performers and evaluate strategic impact."
        }
    },
    'Zomato-data': {
        description: 'Exploratory data analysis (EDA) of Zomato restaurant data. Uncovered cuisine trends, pricing patterns, rating distributions, and location-based insights.',
        skills: ['Python', 'Jupyter', 'Pandas', 'EDA', 'Data Visualization'],
        order: 7,
    },
    'Power-BI-projects': {
        description: 'Collection of Power BI dashboards demonstrating analytical maturity across business contexts, covering sales performance and data-driven decision making.',
        skills: ['Power BI', 'DAX', 'Data Visualization', 'Business Analytics', 'Data Modeling'],
        order: 8,
    },
    // Tier 3: ML Foundations
    'TensorTonic-Solutions': {
        description: 'Mathematical foundation of ML: 8 core algorithms constructed entirely from scratch demonstrating deep understanding of NumPy, linear algebra, and calculus.',
        skills: ['Python', 'NumPy', 'Linear Algebra', 'Machine Learning', 'Algorithms'],
        order: 9,
    },
    'faang-ml-journey': {
        description: 'Comprehensive 12-week Machine Learning syllabus and roadmap. Demonstrates structured learning discipline across math, algorithms, and FAANG-level system design.',
        skills: ['Python', 'Machine Learning', 'Linear Algebra', 'Deep Learning', 'System Design'],
        order: 10,
    },
    'lucag-ml-journey': {
        description: 'Personal machine learning learning path documenting progress in algorithms, mathematics, and data science concepts.',
        skills: ['Machine Learning', 'Python', 'Documentation', 'Notes'],
        order: 11,
    },
    // Tier 4: AI / Web / Experimental
    'career-compass-ai-coach': {
        description: 'AI-powered career guidance platform providing personalized learning paths, skill gap analysis, and career roadmaps using generative AI.',
        skills: ['TypeScript', 'AI/ML', 'Next.js', 'GenAI', 'Career Development'],
        order: 12,
    },
    'AI-Mentor-Personalised-learning-and-Career-Guidance': {
        description: 'Personalized learning and career guidance system powered by AI — generates custom study plans, tracks milestones, and provides career recommendations.',
        skills: ['TypeScript', 'React', 'AI/ML', 'Education Tech', 'Next.js'],
        order: 13,
    },
    'AIMentorX': {
        description: 'Intelligent mentoring platform that uses AI to match learners with personalized resources, track progress, and provide adaptive learning paths.',
        skills: ['AI/ML', 'Education Tech', 'Mentoring', 'Adaptive Learning'],
        order: 14,
    },
    'ai-mentor-gen-ai': {
        description: 'Generative AI-powered mentor chatbot providing personalized learning guidance, topic explanations, and practice problem generation.',
        skills: ['JavaScript', 'GenAI', 'LLM', 'Chatbot', 'Education Tech'],
        order: 15,
    },
    'ai-mentor': {
        description: 'AI mentoring prototype exploring conversational AI for educational support and personalized tutoring.',
        skills: ['AI/ML', 'Chatbot', 'Education Tech', 'Prototyping'],
        order: 16,
    },
    'DataProSimX': {
        description: 'Data processing simulation tool built with TypeScript for testing and benchmarking data pipeline workflows.',
        skills: ['TypeScript', 'Data Engineering', 'Simulation', 'Benchmarking', 'Node.js'],
        order: 17,
    },
    'scholar-gateway-pro': {
        description: 'Smart scholarship discovery platform that matches students with relevant funding opportunities based on their profile and academic interests.',
        skills: ['TypeScript', 'React', 'Full-Stack', 'Education Tech', 'Database Design'],
        order: 18,
    },
    'rentmylife-social-platform': {
        description: 'Social networking platform built with TypeScript/React — user profiles, real-time interactions, and content sharing features.',
        skills: ['TypeScript', 'Next.js', 'React', 'Web App', 'Social Platform'],
        order: 19,
    },
    'RentMyLife': {
        description: 'Web platform for renting and sharing life experiences — built with responsive HTML/CSS and interactive JavaScript.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Web Development'],
        order: 20,
    },
    'CarbonConnect': {
        description: 'Carbon footprint tracking web app — calculate, monitor, and reduce your environmental impact with interactive visualizations.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Environmental Tech', 'Data Visualization'],
        order: 21,
    },
    'Ski-dashboard': {
        description: 'Streamlit-powered analytics dashboard for ski resort data — visitor trends, weather impact analysis, and operational insights.',
        skills: ['Python', 'Streamlit', 'Data Visualization', 'Pandas', 'Analytics'],
        order: 22,
    },
    'A-Silent-Thread': {
        description: 'Creative storytelling project exploring narrative design and interactive fiction concepts using React.',
        skills: ['React', 'JavaScript', 'Creative Writing', 'Narrative Design', 'Storytelling'],
        order: 23,
    },
    'luca': {
        description: 'Custom Android launcher designed for streamlined app access and personalized home screen experience.',
        skills: ['Android', 'Java', 'Kotlin', 'Mobile Development'],
        order: 23.5,
    },
    'TechnoSnag': {
        description: 'Tech troubleshooting and debugging knowledge base — curated solutions for common development issues and best practices.',
        skills: ['Documentation', 'Troubleshooting', 'DevOps', 'Best Practices'],
        order: 24,
    },
    'mrkarthik14': {
        description: 'GitHub profile README — showcasing my journey in Data Science, Machine Learning, and Web Development.',
        skills: ['Markdown', 'GitHub', 'Personal Branding'],
        order: 25,
    },
    'portfolio-app': {
        description: 'This portfolio website! Built with Next.js 16, Material UI, Prisma, and auto-synced with GitHub & LinkedIn data.',
        skills: ['TypeScript', 'Next.js', 'Material UI', 'Prisma', 'Web App'],
        order: 26,
    },
    'git14': {
        description: 'Git workflow practice repository focusing on branching strategies, merge conflict resolution, and collaborative development patterns.',
        skills: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
        order: 27,
    },
};
