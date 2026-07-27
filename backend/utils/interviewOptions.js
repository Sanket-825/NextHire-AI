export const EXPERIENCE_LEVELS = ["Fresher", "0-1 Years", "2-3 Years", "4-5 Years", "5+ Years", "Senior"];
export const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const INTERVIEW_TYPE_CATEGORIES = [
  { category: "Core", options: ["Technical", "HR", "Behavioral", "DSA", "System Design"] },
  { category: "Frontend", options: ["JavaScript", "TypeScript", "React", "Angular", "Vue.js", "HTML/CSS"] },
  { category: "Backend", options: ["Node.js", "Python", "Java", "Spring Boot", "Django", "PHP", "Go", ".NET"] },
  { category: "Databases", options: ["MongoDB", "SQL", "PostgreSQL", "MySQL", "Redis"] },
  { category: "QA & Testing", options: ["Manual Testing", "Selenium", "Cypress", "API Testing", "Test Automation"] },
  { category: "DevOps & Cloud", options: ["AWS", "Docker", "Kubernetes", "CI/CD", "Git"] },
  { category: "Design", options: ["UI/UX Design", "Figma"] },
  { category: "Data & AI", options: ["Data Structures", "Machine Learning", "Data Analysis"] },
  { category: "Mobile", options: ["Android", "iOS", "React Native", "Flutter"] },
  // { category: "Communication", options: ["English", "Hindi", "Marathi"] },
];

export const INTERVIEW_TYPES = INTERVIEW_TYPE_CATEGORIES.flatMap((group) => group.options);