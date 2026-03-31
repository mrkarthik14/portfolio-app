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
    'Credit-Card-Fraud-Risk-Analysis': {
        description: 'Fraud detection system tackling extreme class imbalance (<1% fraud). Reduced false positives by 30% using ensemble stacking, anomaly detection, and custom threshold tuning.',
        skills: ['Python', 'Machine Learning', 'Anomaly Detection', 'Scikit-learn', 'FinTech'],
        isFavorite: true,
        order: 1,
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
        order: 2,
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
        order: 3,
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
        order: 4,
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
        order: 5,
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
        isFavorite: true,
        order: 6,
        aiAnalysis: {
            situation: "Understanding consumer dining preferences and restaurant pricing dynamics was difficult without a structured analysis of disorganized location data.",
            task: "Conduct an end-to-end Exploratory Data Analysis (EDA) on a massive Zomato dataset to extract actionable business insights regarding cuisine popularity and pricing.",
            action: "Utilized Python and Pandas within Jupyter Notebooks to clean, process, and analyze the data. Created sophisticated Data Visualizations to map rating distributions and geographic trends.",
            result: "Uncovered clear relationships between location, cuisine type, and average cost, providing a data-driven overview of the current restaurant market landscape."
        }
    },
    'Power-BI-projects': {
        description: 'Collection of Power BI dashboards demonstrating analytical maturity across business contexts, covering sales performance and data-driven decision making.',
        skills: ['Power BI', 'DAX', 'Data Visualization', 'Business Analytics', 'Data Modeling'],
        isFavorite: true,
        order: 7,
        aiAnalysis: {
            situation: "Various business datasets required interactive, visual storytelling to allow stakeholders to make informed decisions without diving into raw CSVs or SQL databases.",
            task: "Develop a suite of comprehensive, interactive Power BI dashboards covering different business domains like sales performance and operational metrics.",
            action: "Executed advanced Data Modeling and wrote complex DAX measures to calculate KPIs. Designed intuitive user interfaces with drill-down capabilities for deep data exploration.",
            result: "Delivered a portfolio of business-ready dashboards that successfully translate raw transactional data into clear, actionable executive insights."
        }
    },
    'TensorTonic-Solutions': {
        description: 'Mathematical foundation of ML: 8 core algorithms constructed entirely from scratch demonstrating deep understanding of NumPy, linear algebra, and calculus.',
        skills: ['Python', 'NumPy', 'Linear Algebra', 'Machine Learning', 'Algorithms'],
        order: 8,
        aiAnalysis: {
            situation: "Relying purely on high-level libraries (like Scikit-Learn) can obscure the fundamental mathematical mechanics governing how machine learning algorithms actually learn.",
            task: "Solidify mathematical and algorithmic foundations by implementing 8 core machine learning algorithms (like Gradient Descent and KNN) entirely from scratch.",
            action: "Used pure Python and NumPy to code vectorized mathematical operations involving Linear Algebra and Calculus (e.g., matrix multiplication, derivatives for MSE).",
            result: "Demonstrated a deep, rigorous understanding of the underlying mathematics of AI, proving the ability to optimize and debug algorithms at the lowest computational level."
        }
    },
    'faang-ml-journey': {
        description: 'Comprehensive 12-week Machine Learning syllabus and roadmap. Demonstrates structured learning discipline across math, algorithms, and FAANG-level system design.',
        skills: ['Python', 'Machine Learning', 'Linear Algebra', 'Deep Learning', 'System Design'],
        order: 9,
        aiAnalysis: {
            situation: "Transitioning into advanced Data Science and ML Engineering roles requires a structured, comprehensive understanding of everything from linear algebra to system design.",
            task: "Create and execute a rigorous 12-week study roadmap that covers the breadth and depth of FAANG-level Machine Learning expectations.",
            action: "Curated a curriculum spanning mathematical foundations, deep learning frameworks, and large-scale ML system architecture. Documented progress and implementations clearly.",
            result: "Built a robust, demonstrable knowledge base positioning myself for high-level technical interviews and complex architectural problem-solving."
        }
    },
    'AI-Agents': {
        description: 'AI agent implementations exploring autonomous task execution, tool use, and multi-step reasoning with modern LLM frameworks.',
        skills: ['Python', 'AI/ML', 'LLM', 'Agents', 'GenAI'],
        order: 10,
        aiAnalysis: {
            situation: "As LLMs become more capable, there is growing demand for autonomous AI agents that can plan, reason, and execute multi-step tasks with minimal human intervention.",
            task: "Build and experiment with AI agent architectures that leverage tool use and chain-of-thought reasoning to solve complex tasks autonomously.",
            action: "Implemented agent workflows using modern LLM frameworks, integrating tool-calling capabilities and structured reasoning patterns for multi-step problem solving.",
            result: "Created functional AI agent prototypes demonstrating practical applications of autonomous reasoning and task execution in real-world scenarios."
        }
    },
    'Siri-Travels-Tirupati': {
        description: 'Travel and tourism web application for Tirupati — featuring destination guides, booking information, and local travel insights.',
        skills: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'Tourism'],
        order: 11,
        aiAnalysis: {
            situation: "Travelers visiting Tirupati lacked a centralized, user-friendly resource for destination information, local guides, and travel planning.",
            task: "Develop a comprehensive travel web application that provides destination guides, booking details, and curated local insights for Tirupati visitors.",
            action: "Built a responsive web application with intuitive navigation, featuring destination highlights, travel tips, and essential booking information for tourists.",
            result: "Delivered an accessible travel platform that simplifies trip planning for Tirupati visitors, consolidating essential information in one place."
        }
    },
    'a-silent-thread-react': {
        description: 'Creative storytelling project exploring narrative design and interactive fiction concepts using React.',
        skills: ['React', 'JavaScript', 'Creative Writing', 'Narrative Design', 'Storytelling'],
        order: 12,
        aiAnalysis: {
            situation: "Traditional linear storytelling fails to leverage the interactive capabilities of modern web browsers.",
            task: "Design an interactive fiction experience blending creative writing with state-driven web development.",
            action: "Wrote a branching narrative structure and implemented it using React state management to track user choices and unlock specific story paths.",
            result: "Created a unique digital experience that showcases the intersection of technical programming skills and creative narrative design."
        }
    },
    'mrkarthik14': {
        description: 'GitHub profile README — showcasing my journey in Data Science, Machine Learning, and Web Development.',
        skills: ['Markdown', 'GitHub', 'Personal Branding'],
        order: 13,
        aiAnalysis: {
            situation: "A GitHub profile without a comprehensive README fails to communicate the developer's overarching narrative, skills, and professional focus.",
            task: "Design a visually appealing, informative profile README that acts as a central hub for my entire professional portfolio.",
            action: "Utilized advanced Markdown formatting, HTML alignments, and dynamic GitHub stats cards to curate a professional digital storefront.",
            result: "Created a strong personal brand presence that immediately communicates technical stack, current projects, and professional trajectory to recruiters and collaborators."
        }
    },
    'portfolio-app': {
        description: 'This portfolio website! Built with Next.js 16, Material UI, Prisma, and auto-synced with GitHub & LinkedIn data.',
        skills: ['TypeScript', 'Next.js', 'Material UI', 'Prisma', 'Web App'],
        order: 14,
        aiAnalysis: {
            situation: "A static portfolio website requires constant manual updating and fails to reflect real-time professional achievements or code activity.",
            task: "Engineer a dynamic, full-stack portfolio application that automatically pulls data from external APIs like GitHub and LinkedIn.",
            action: "Architected a Next.js application using TypeScript and Material UI. Implemented a robust backend using Prisma and custom syncing API routes to aggregate external data.",
            result: "Launched a self-updating digital resume that programmatically showcases continuous learning and development activity without manual intervention."
        }
    },
};
