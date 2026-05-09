const DEFAULT_PORTFOLIO = {
  profile: {
    name: "Vikrant Mishra",
    role: "Full Stack Web Developer and Data analyst",
    heroLead: "I build useful web apps, AI-assisted platforms, and data-driven systems with JavaScript, React, Node.js, Express, Python, SQL, and clean front-end interfaces. I'm pursuing B.Tech in Information Technology & Mathematical Innovation at Cluster Innovation Centre, University of Delhi.",
    status: "Available for web development projects",
    aboutTitle: "Developer with a mathematical problem-solving spine.",
    aboutText: "I'm Vikrant Mishra, a full stack web developer and data analyst from New Delhi. I'm studying B.Tech in Information Technology & Mathematical Innovation at Cluster Innovation Centre, University of Delhi, where I combine software engineering, data analysis, and computational thinking.",
    whatIDoTitle: "Backend logic, responsive UI, and math-aware problem solving.",
    whatIDoText: "I enjoy turning ideas into working systems: APIs, dashboards, browser games, data-backed websites, and interfaces that feel direct and usable.",
    projectsTitle: "Selected work across AI, data analysis, and applied machine learning.",
    projectsPageTitle: "Projects built around AI, public data, and predictive modelling.",
    projectsPageText: "These selected projects show my work in AI-based exam preparation, court-efficiency analytics, and financial risk prediction.",
    email: "viirantmishra2005@gmail.com",
    phone: "+91 7905938024",
    location: "New Delhi",
    github: "https://github.com/Vikrantmishra",
    linkedin: "https://www.linkedin.com/in/vikrant-mishra-03524625a",
    languages: "English, Hindi, French"
  },
  stats: [
    { value: "9.13", label: "CGPA" },
    { value: "3", label: "Featured Projects" },
    { value: "1", label: "USI Internship" },
    { value: "14", label: "Core Skills" }
  ],
  skills: ["JavaScript", "React", "Node.js", "Express.js", "Python", "PostgreSQL", "MySQL", "Java", "HTML", "CSS", "Bootstrap", "Tailwind", "Matlab", "QGIS"],
  education: [
    {
      period: "2022 - Present",
      title: "University of Delhi, Cluster Innovation Centre",
      description: "B.Tech in Information Technology & Mathematical Innovation. Current CGPA: 9.13/10."
    },
    {
      period: "2020 - 2022",
      title: "Radiant Central Children Academy",
      description: "Senior Secondary with PCM. Score: 92.3%."
    },
    {
      period: "2018 - 2020",
      title: "High School",
      description: "Completed high school with 92.2%."
    }
  ],
  profileFacts: ["New Delhi", "English, Hindi, French", "USI event management internship"],
  skillBars: [
    { label: "JavaScript / React", value: 88 },
    { label: "Node.js / Express.js", value: 84 },
    { label: "HTML / CSS / Bootstrap / Tailwind / EJS", value: 90 },
    { label: "PostgreSQL / MySQL / SQL", value: 80 },
    { label: "Python / Java / C", value: 78 },
    { label: "QGIS / Matlab / Mathematica", value: 74 }
  ],
  projects: [
    {
      name: "exam-hub",
      title: "Exam Hub - AI Mock Test Generation",
      description: "Exam Hub is a mock-test generation platform for SSC and banking exam preparation. It uses AI to create practice tests, helping learners generate structured exam-style questions and prepare with a focused digital workflow.",
      language: "Python",
      type: "AI EdTech Platform",
      year: "2026",
      tags: ["AI", "Mock Tests", "SSC", "Banking Exams", "Exam Prep"],
      url: "https://github.com/Vikrantmishra/MOCK_TEST",
      homepage: "",
      featured: true
    },
    {
      name: "court-efficiency-index",
      title: "Court Efficiency Index",
      description: "Built a Court Efficiency Index using NITI Aayog data from pan-India subordinate courts. The index uses delay ratio, old pending percentage, pending case growth, case disposal rate, and pending-to-disposed ratio, with PCA-based weights and geospatial visualization in QGIS.",
      language: "Jupyter Notebook",
      type: "Data Analysis",
      year: "2024",
      tags: ["Data Analysis", "PCA", "QGIS", "Geospatial Visualization", "Public Data"],
      url: "https://github.com/Vikrantmishra/Court-Casess",
      homepage: "",
      featured: true
    },
    {
      name: "bankruptcy-prediction",
      title: "Bankruptcy Prediction Model",
      description: "Developed a hybrid bankruptcy prediction model combining neural networks, XGBoost, and logistic regression to classify company bankruptcy from financial ratios and indicators. Used SMOTE for imbalance handling, stacked autoencoders for dimensionality reduction, and achieved 97 percent accuracy with AUC of 0.97.",
      language: "Jupyter Notebook",
      type: "Machine Learning",
      year: "2024",
      tags: ["Machine Learning", "XGBoost", "Neural Networks", "SMOTE", "Finance"],
      url: "https://github.com/Vikrantmishra/Bankruptcy-Prediction",
      homepage: "",
      featured: true
    }
  ],
  documents: [
    {
      title: "Resume",
      description: "View my latest resume with education, technical skills, coursework, and project details.",
      url: "assets/vikrant-mishra-resume.pdf",
      viewLabel: "View Resume",
      downloadLabel: "Download"
    },
    {
      title: "USI Internship Certificate",
      description: "Certificate for my USI internship experience in event management during IMHF 2025.",
      url: "assets/usi-imhf-2025-certificate.pdf",
      viewLabel: "View Certificate",
      downloadLabel: "Download"
    }
  ],
  certifications: [
    {
      title: "Web Development Course",
      provider: "Udemy",
      description: "Certificate of completion for a web development course covering practical website and web application development.",
      url: "assets/web-development-certificate.pdf",
      viewLabel: "View Certificate",
      downloadLabel: "Download"
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      provider: "DeepLearning.AI, Stanford University & Coursera",
      description: "Completed an online machine learning course focused on regression, classification, supervised learning workflows, and model evaluation.",
      url: "assets/machine-learning-certificate.pdf",
      viewLabel: "View Certificate",
      downloadLabel: "Download"
    }
  ],
  contactCards: [
    { label: "Email", value: "viirantmishra2005@gmail.com", href: "mailto:viirantmishra2005@gmail.com" },
    { label: "Phone", value: "+91 7905938024", href: "tel:+917905938024" },
    { label: "LinkedIn", value: "vikrant-mishra-03524625a", href: "https://www.linkedin.com/in/vikrant-mishra-03524625a" },
    { label: "GitHub", value: "@Vikrantmishra", href: "https://github.com/Vikrantmishra" }
  ]
};

const FALLBACK_PROJECTS = DEFAULT_PORTFOLIO.projects;
