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
        order: 8,
        aiAnalysis: {
            situation: "Various business datasets required interactive, visual storytelling to allow stakeholders to make informed decisions without diving into raw CSVs or SQL databases.",
            task: "Develop a suite of comprehensive, interactive Power BI dashboards covering different business domains like sales performance and operational metrics.",
            action: "Executed advanced Data Modeling and wrote complex DAX measures to calculate KPIs. Designed intuitive user interfaces with drill-down capabilities for deep data exploration.",
            result: "Delivered a portfolio of business-ready dashboards that successfully translate raw transactional data into clear, actionable executive insights."
        }
    },
    // Tier 3: ML Foundations
    'TensorTonic-Solutions': {
        description: 'Mathematical foundation of ML: 8 core algorithms constructed entirely from scratch demonstrating deep understanding of NumPy, linear algebra, and calculus.',
        skills: ['Python', 'NumPy', 'Linear Algebra', 'Machine Learning', 'Algorithms'],
        order: 9,
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
        order: 10,
        aiAnalysis: {
            situation: "Transitioning into advanced Data Science and ML Engineering roles requires a structured, comprehensive understanding of everything from linear algebra to system design.",
            task: "Create and execute a rigorous 12-week study roadmap that covers the breadth and depth of FAANG-level Machine Learning expectations.",
            action: "Curated a curriculum spanning mathematical foundations, deep learning frameworks, and large-scale ML system architecture. Documented progress and implementations clearly.",
            result: "Built a robust, demonstrable knowledge base positioning myself for high-level technical interviews and complex architectural problem-solving."
        }
    },
    'lucag-ml-journey': {
        description: 'Personal machine learning learning path documenting progress in algorithms, mathematics, and data science concepts.',
        skills: ['Machine Learning', 'Python', 'Documentation', 'Notes'],
        order: 11,
        aiAnalysis: {
            situation: "Continuous learning in the rapidly evolving ML space requires diligent tracking and structured documentation to ensure knowledge retention.",
            task: "Maintain a clear, accessible repository of personal notes, algorithm implementations, and data science concepts.",
            action: "Authored detailed markdown documentation and Python code snippets detailing the progression through various mathematical and programmatic ML concepts.",
            result: "Established a personal knowledge base that serves as both a reference material and a testament to continuous technical growth and documentation skills."
        }
    },
    // Tier 4: AI / Web / Experimental
    'career-compass-ai-coach': {
        description: 'AI-powered career guidance platform providing personalized learning paths, skill gap analysis, and career roadmaps using generative AI.',
        skills: ['TypeScript', 'AI/ML', 'Next.js', 'GenAI', 'Career Development'],
        order: 12,
        aiAnalysis: {
            situation: "Students and young professionals often struggle to map their current skills to rapidly changing industry requirements without expensive career coaching.",
            task: "Develop an AI-powered platform to automate career coaching, skill gap analysis, and personalized roadmap generation.",
            action: "Integrated Generative AI into a Next.js TypeScript application. Built a conversational interface that assesses user skills and dynamically generates custom educational pathways.",
            result: "Created an accessible, scalable career guidance prototype demonstrating practical application of LLMs in the rapidly growing EdTech sector."
        }
    },
    'AI-Mentor-Personalised-learning-and-Career-Guidance': {
        description: 'Personalized learning and career guidance system powered by AI — generates custom study plans, tracks milestones, and provides career recommendations.',
        skills: ['TypeScript', 'React', 'AI/ML', 'Education Tech', 'Next.js'],
        order: 13,
        aiAnalysis: {
            situation: "Traditional tutoring lacks the personalization and 24/7 availability required by modern, self-paced learners.",
            task: "Construct a comprehensive learning system utilizing AI to generate custom study plans and persistently track user milestones.",
            action: "Developed a responsive React/Next.js frontend communicating with a custom AI backend. Designed user profiles to store progress and dynamically adjust recommended pacing.",
            result: "Delivered a full-stack educational tool capable of mimicking a personalized tutor, enhancing self-directed learning experiences."
        }
    },
    'AIMentorX': {
        description: 'Intelligent mentoring platform that uses AI to match learners with personalized resources, track progress, and provide adaptive learning paths.',
        skills: ['AI/ML', 'Education Tech', 'Mentoring', 'Adaptive Learning'],
        order: 14,
        aiAnalysis: {
            situation: "Resource discovery for niche technical subjects is often overwhelming, leading to high abandonment rates in self-taught learners.",
            task: "Build an adaptive learning engine that intelligently matches students with the exact resources they need based on their current comprehension level.",
            action: "Implemented ML algorithms to analyze user performance data and map it against a database of educational materials, optimizing the resource recommendation feed.",
            result: "Engineered a prototype capable of significantly reducing resource-hunting time, keeping learners focused on targeted skill acquisition."
        }
    },
    'ai-mentor-gen-ai': {
        description: 'Generative AI-powered mentor chatbot providing personalized learning guidance, topic explanations, and practice problem generation.',
        skills: ['JavaScript', 'GenAI', 'LLM', 'Chatbot', 'Education Tech'],
        order: 15,
        aiAnalysis: {
            situation: "Static learning material cannot interactively answer specific student questions or generate on-the-fly practice problems.",
            task: "Deploy a conversational Generative AI chatbot specialized in educational scaffolding and concept explanation.",
            action: "Utilized modern LLM APIs to build a specialized JavaScript chatbot. Crafted precise system prompts to enforce Socratic teaching methods rather than just giving direct answers.",
            result: "Launched an interactive mentoring bot that enhances student engagement by providing infinite, personalized practice scenarios and immediate feedback."
        }
    },
    'ai-mentor': {
        description: 'AI mentoring prototype exploring conversational AI for educational support and personalized tutoring.',
        skills: ['AI/ML', 'Chatbot', 'Education Tech', 'Prototyping'],
        order: 16,
        aiAnalysis: {
            situation: "Needed a lightweight proof-of-concept to test the viability of combining conversational AI with strict educational curricula.",
            task: "Rapidly prototype a chatbot interface capable of maintaining context across a tutoring session.",
            action: "Explored natural language processing fundamentals to build a responsive AI mentoring interface focused on specific domain knowledge.",
            result: "Successfully established the base architecture for future, more complex AI tutoring systems (like AIMentorX)."
        }
    },
    'DataProSimX': {
        description: 'Data processing simulation tool built with TypeScript for testing and benchmarking data pipeline workflows.',
        skills: ['TypeScript', 'Data Engineering', 'Simulation', 'Benchmarking', 'Node.js'],
        order: 17,
        aiAnalysis: {
            situation: "Data engineering pipelines often fail in production due to untested edge cases in data volume or malformed structures.",
            task: "Engineer a simulation tool to safely benchmark and stress-test data processing workflows before deployment.",
            action: "Built a robust Node.js/TypeScript tool capable of generating customized, high-volume mock data streams to measure pipeline latency and error handling.",
            result: "Provided a valuable utility for data engineers to validate system stability, proactively preventing production bottlenecks."
        }
    },
    'scholar-gateway-pro': {
        description: 'Smart scholarship discovery platform that matches students with relevant funding opportunities based on their profile and academic interests.',
        skills: ['TypeScript', 'React', 'Full-Stack', 'Education Tech', 'Database Design'],
        order: 18,
        aiAnalysis: {
            situation: "Students leave millions of dollars in scholarship funding unclaimed annually due to poor discoverability and fragmented search systems.",
            task: "Develop a centralized, smart-matching platform connecting students with highly relevant financial aid opportunities.",
            action: "Designed a relational database tracking complex eligibility requirements. Built a responsive React frontend allowing students to input multi-faceted academic profiles for automated matching.",
            result: "Created a streamlined gateway that drastically reduces the friction of finding and applying for critical educational funding."
        }
    },
    'rentmylife-social-platform': {
        description: 'Social networking platform built with TypeScript/React — user profiles, real-time interactions, and content sharing features.',
        skills: ['TypeScript', 'Next.js', 'React', 'Web App', 'Social Platform'],
        order: 19,
        aiAnalysis: {
            situation: "Building a scalable social network requires deep understanding of real-time state management and modern web architecture.",
            task: "Develop a fully-featured social platform capable of handling user authentication, profile management, and interactive content sharing.",
            action: "Engineered a robust frontend using Next.js and TypeScript. Implemented secure user sessions and optimized interactive components for seamless content rendering.",
            result: "Successfully launched a complex web application, demonstrating full-stack proficiency and modern React ecosystem mastery."
        }
    },
    'RentMyLife': {
        description: 'Web platform for renting and sharing life experiences — built with responsive HTML/CSS and interactive JavaScript.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Web Development'],
        order: 20,
        aiAnalysis: {
            situation: "Users needed a centralized, intuitive interface to browse and share experiential rental listings.",
            task: "Design and implement a responsive, interactive web platform focusing on ease-of-use and aesthetic appeal.",
            action: "Constructed the application using semantic HTML5 and vanilla JavaScript. Applied modern CSS techniques for a fully responsive, mobile-first design.",
            result: "Delivered a performant, accessible website showcasing strong foundational web development skills without over-reliance on massive frameworks."
        }
    },
    'CarbonConnect': {
        description: 'Carbon footprint tracking web app — calculate, monitor, and reduce your environmental impact with interactive visualizations.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Environmental Tech', 'Data Visualization'],
        order: 21,
        aiAnalysis: {
            situation: "Individuals lack accessible tools to quantify and visualize their daily environmental impact in a meaningful way.",
            task: "Build an interactive web application that calculates and visually represents a user's carbon footprint based on daily activities.",
            action: "Developed dynamic JavaScript logic to process user inputs against standardized emission factors. Integrated front-end charting libraries to display clear, actionable data visualizations.",
            result: "Produced an educational and utility-driven application that empowers users to make data-informed decisions regarding their environmental habits."
        }
    },
    'Ski-dashboard': {
        description: 'Streamlit-powered analytics dashboard for ski resort data — visitor trends, weather impact analysis, and operational insights.',
        skills: ['Python', 'Streamlit', 'Data Visualization', 'Pandas', 'Analytics'],
        order: 22,
        aiAnalysis: {
            situation: "Ski resort operators struggled to correlate historical weather patterns with ticketing data to optimize seasonal staffing and operations.",
            task: "Create a rapid-prototyped analytics dashboard to merge and visualize diverse datasets related to resort operations.",
            action: "Used Python and Pandas to clean and join disparate CSV files. Built an interactive Streamlit application to filter metrics by season and weather severity.",
            result: "Delivered an operational intelligence tool that clearly visualizes the mathematical relationship between weather events and resort profitability."
        }
    },
    'A-Silent-Thread': {
        description: 'Creative storytelling project exploring narrative design and interactive fiction concepts using React.',
        skills: ['React', 'JavaScript', 'Creative Writing', 'Narrative Design', 'Storytelling'],
        order: 23,
        aiAnalysis: {
            situation: "Traditional linear storytelling fails to leverage the interactive capabilities of modern web browsers.",
            task: "Design an interactive fiction experience blending creative writing with state-driven web development.",
            action: "Wrote a branching narrative structure and implemented it using React state management to track user choices and unlock specific story paths.",
            result: "Created a unique digital experience that showcases the intersection of technical programming skills and creative narrative design."
        }
    },
    'luca': {
        description: 'Custom Android launcher designed for streamlined app access and personalized home screen experience.',
        skills: ['Android', 'Java', 'Kotlin', 'Mobile Development'],
        order: 23.5,
        aiAnalysis: {
            situation: "Standard Android interfaces can be cluttered, reducing accessibility and daily user efficiency.",
            task: "Develop a custom Android launcher from scratch to provide a minimalist, highly efficient user experience.",
            action: "Built a native Android application using Kotlin/Java. Interfaced deeply with the Android OS APIs to hijack home screen intent, manage installed applications, and render a custom UI.",
            result: "Deployed a functional utility app, demonstrating deep systems-level knowledge of the Android operating system and mobile lifecycle management."
        }
    },
    'TechnoSnag': {
        description: 'Tech troubleshooting and debugging knowledge base — curated solutions for common development issues and best practices.',
        skills: ['Documentation', 'Troubleshooting', 'DevOps', 'Best Practices'],
        order: 24,
        aiAnalysis: {
            situation: "Developers waste countless hours repeatedly solving the same fundamental configuration and environment issues.",
            task: "Curate a centralized, easily searchable knowledge base of specialized debugging solutions and best practices.",
            action: "Structured a markdown-heavy repository categorizing complex tech issues from various domains, providing clear, reproducible fixes.",
            result: "Established a highly useful external brain for technical problem-solving, showcasing strong technical communication and DevOps-oriented thinking."
        }
    },
    'mrkarthik14': {
        description: 'GitHub profile README — showcasing my journey in Data Science, Machine Learning, and Web Development.',
        skills: ['Markdown', 'GitHub', 'Personal Branding'],
        order: 25,
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
        order: 26,
        aiAnalysis: {
            situation: "A static portfolio website requires constant manual updating and fails to reflect real-time professional achievements or code activity.",
            task: "Engineer a dynamic, full-stack portfolio application that automatically pulls data from external APIs like GitHub and LinkedIn.",
            action: "Architected a Next.js application using TypeScript and Material UI. Implemented a robust backend using Prisma and custom syncing API routes to aggregate external data.",
            result: "Launched a self-updating digital resume that programmatically showcases continuous learning and development activity without manual intervention."
        }
    },
    'git14': {
        description: 'Git workflow practice repository focusing on branching strategies, merge conflict resolution, and collaborative development patterns.',
        skills: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
        order: 27,
        aiAnalysis: {
            situation: "Collaboration in large software teams demands strict adherence to version control best practices, which are difficult to learn without a sandbox.",
            task: "Create a dedicated repository to rigorously practice and document advanced Git workflows and collaborative branching strategies.",
            action: "Simulated complex team environments by creating and resolving artificial merge conflicts, executing specific interactive rebases, and documenting Git-Flow methodologies.",
            result: "Solidified expert-level version control skills critical for seamless integration into enterprise-level software engineering teams."
        }
    },
};
