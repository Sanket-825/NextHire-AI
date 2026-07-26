// Single source of truth for interview creation options. Both the
// validation rules (interviewValidators.js) and the public options
// endpoint (GET /interviews/meta/options) import from here — so adding
// a new interview type, experience level, or difficulty is a one-line
// change in this file only, with no frontend redeploy needed.
export const EXPERIENCE_LEVELS = ["Fresher", "0-1 Years", "2-3 Years", "4-5 Years", "5+ Years", "Senior"];
export const DIFFICULTIES = ["Easy", "Medium", "Hard"];
export const INTERVIEW_TYPES = [
  "Technical", "HR", "Behavioral", "DSA", "System Design",
  "JavaScript", "React", "Node.js", "MongoDB", "SQL",
];