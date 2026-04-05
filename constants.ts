import { Experience, Project, Skill, SocialLink } from './types';

export const PORTFOLIO_DATA = {
  name: "Ajaykumar Kailash Maurya",
  title: "Senior Software Engineer",
  yearsOfExperience: "5+",
  headline: "Building Scalable Industrial Solutions.",
  tagline: "Specializing in Java Ecosystems, Backend Architecture, and Industrial SCADA Solutions.",
  about: `Senior Software Engineer with a deep focus on high-performance backend systems and industrial automation. I bridge the gap between complex software architecture and industrial operational technology. Currently pursuing my MCA (2027) to further deepen my theoretical foundations in computer science.`,
  location: "Mumbai, India",
  email: "ajaykmaurya15@gmail.com", 
  phone: "(+91) 8425948315",
  linkedin: "https://www.linkedin.com/in/ajaykumar-maurya-a7b22621a/", // Keeping existing link as it wasn't provided in new text but likely same
  github: "https://github.com/ajaykmaurya15-dot", // Keeping existing
  profileImage: "https://picsum.photos/seed/profile/600/600",
  education: [
    { degree: "MCA", year: "2027", institution: "Mumbai University" },
    { degree: "B.Sc", year: "2019", institution: "Mumbai University" }
  ],
  languages: ["Hindi", "English", "Marathi"],
  hobbies: ["Traveling", "Playing Chess"]
};

export const SKILLS: Skill[] = [
  { name: "Java", category: "Languages", level: 95 },
  { name: "SQL", category: "Backend", level: 90 },
  { name: "Ignition SCADA", category: "Tools", level: 85 },
  { name: "Spark", category: "Backend", level: 80 },
  { name: "Quarkus", category: "Backend", level: 85 },
  { name: "NoSQL", category: "Backend", level: 80 },
  { name: "Hibernate ORM", category: "Backend", level: 90 },
  { name: "Blaze", category: "Tools", level: 75 },
  { name: "Spring Boot", category: "Backend", level: 90 },
  { name: "Git", category: "Tools", level: 85 }
];

export const EXPERIENCE: Experience[] = [
  {
    id: "exp-1",
    role: "Senior Software Engineer",
    company: "Leanqubit (Optebiz)",
    period: "Mar 2022 - Present",
    description: [
      "Designed and developed a scalable Java API using Swing, enhancing overall system performance by 100%.",
      "Integrated RESTful APIs with front-end applications on the Ignition Platform, improving user experience and reducing system latency.",
      "Processed millions of data points from multiple databases to implement Manufacturing Execution System (MES) analysis methods.",
      "Engineered dynamic charts and numerical readings on the front-end to facilitate real-time industrial monitoring."
    ]
  },
  {
    id: "exp-2",
    role: "Programmer",
    company: "Tata Consultancy Services",
    period: "Feb 2020 - Aug 2021",
    description: [
      "Managed the end-to-end incident lifecycle from ticket logging to closure, resolving complex L2/L3 errors using log analysis and SQL queries.",
      "Prioritized P1-P4 tickets to guarantee SLA compliance, ensuring timely delivery and client satisfaction.",
      "Analyzed recurring application issues to perform root cause analysis and deployed permanent code-level bug fixes.",
      "Tracked application health and system monitoring proactively to prevent user-facing downtime."
    ]
  },
  {
    id: "exp-3",
    role: "Data Analyst",
    company: "HERE Technologies (Contract via TeamLease)",
    period: "Aug 2019 - Feb 2020",
    description: [
      "Developed and coded specialized internal tools for geographic data mapping.",
      "Analyzed large, complex datasets to ensure data accuracy and fit for specific project requirements.",
      "Automated day-to-day data processing tasks to improve overall project efficiency and operational workflow."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "AnalysisMES",
    description: "Created a Java-based RESTful API that serves analytical calculation using millions of data from different data sources. Integrated with a front-end application using Ignition Designer software. Leveraged Docker for containerization of ignition application.",
    tags: ["Java", "RESTful API", "Ignition Designer", "Docker"],
    category: "Professional"
  },
  {
    id: "p2",
    title: "IT Support Application",
    description: "Managed tickets from logging to closure. Prioritized P1-P4 tickets to ensure timely delivery. Resolved complex L2/L3 errors using log analysis and SQL queries. Proactively tracked application health.",
    tags: ["Support", "SQL", "Log Analysis", "SLA Management"],
    category: "Professional"
  },
  {
    id: "p3",
    title: "AnalysisScheduling",
    description: "Developing the API for the analysis method using Java Blaze Persistence. Analysing the SQL query and convert into blaze persistence format. Maintain the code structure.",
    tags: ["Java", "Blaze Persistence", "SQL"],
    category: "Professional"
  },
  {
    id: "p4",
    title: "Component Development",
    description: "Developed custom Java modules using Ignition SDK to extend gateway functionality and enhance scripting capabilities. Engineered bespoke UI components for real-time data visualization. Created high-speed data integration pipelines.",
    tags: ["Java", "Ignition SDK", "Real-time Data"],
    category: "Professional"
  },
  {
    id: "p5",
    title: "SmartNaukari.com",
    description: "A comprehensive platform that provides ATS scores for resumes, offers optimization suggestions, and identifies the nearest available job opportunities using AI-driven insights.",
    tags: ["React", "JavaScript", "AI Integration", "ATS Optimization"],
    category: "Personal"
  },
  {
    id: "p6",
    title: "E-commerce Website Application",
    description: "A full-stack e-commerce solution featuring a Java Spring Boot backend with Hibernate and MySQL, and a dynamic React frontend built with TypeScript and TSX.",
    tags: ["Java", "Spring Boot", "Hibernate", "MySQL", "React", "TypeScript"],
    category: "Personal"
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "LinkedIn", url: PORTFOLIO_DATA.linkedin, icon: "linkedin" },
  { platform: "GitHub", url: PORTFOLIO_DATA.github, icon: "github" },
  { platform: "Email", url: `https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_DATA.email}`, icon: "mail" },
];