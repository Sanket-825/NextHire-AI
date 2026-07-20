import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const MODEL_NAME = "gemini-2.5-flash";

const cleanJsonResponse = (text) => {
  return text
    .replace(/```json\s*/gi, "")
    .replace(/```/g, "")
    .trim();
};

export const generateInterviewQuestions = async ({
  role,
  experienceLevel,
  difficulty,
  interviewType,
  count = 10,
}) => {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `You are an expert technical interviewer. Generate exactly ${count} interview questions for the following candidate profile:

Role: ${role}
Experience Level: ${experienceLevel}
Difficulty: ${difficulty}
Interview Type: ${interviewType}

Rules:
- Questions must be relevant and realistic for this specific role, experience level, and interview type.
- Vary the topics covered within the interview type.
- Do not include any answers, only questions.

Return ONLY a valid JSON array, with no markdown formatting, no code fences, and no explanation text before or after. Use exactly this structure:
[
  { "question": "string", "topic": "string", "difficulty": "Easy" | "Medium" | "Hard" }
]`;

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();
  const cleaned = cleanJsonResponse(rawText);

  let questions;
  try {
    questions = JSON.parse(cleaned);
  } catch (error) {
    throw new Error(
      "AI returned an unexpected format. Please try generating questions again.",
    );
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("AI did not return any questions. Please try again.");
  }

  return questions;
};

export const generateAnswerFeedback = async ({
  question,
  answer,
  role,
  difficulty,
}) => {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const prompt = `You are an expert technical interviewer evaluating a candidate's answer.

Role: ${role}
Difficulty: ${difficulty}
Question: ${question}
Candidate's Answer: ${answer || "(No answer provided)"}

Evaluate the answer and return ONLY a valid JSON object, no markdown, no code fences, no explanation text, using exactly this structure:
{
  "score": <integer 0-10>,
  "correctness": "<one sentence assessment of technical correctness>",
  "improvementSuggestions": "<specific, actionable suggestions to improve the answer>",
  "idealAnswer": "<a concise model answer a strong candidate would give>",
  "confidenceLevel": "Low" | "Medium" | "High"
}

If no answer was provided, give a score of 0 and note that no answer was submitted.`;

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();
  const cleaned = cleanJsonResponse(rawText);

  let feedback;
  try {
    feedback = JSON.parse(cleaned);
  } catch (error) {
    throw new Error(
      "AI returned an unexpected format while generating feedback. Please try again.",
    );
  }

  return feedback;
};
