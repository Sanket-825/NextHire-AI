import { body } from "express-validator";
import { EXPERIENCE_LEVELS as VALID_EXPERIENCE_LEVELS, DIFFICULTIES as VALID_DIFFICULTIES, INTERVIEW_TYPES as VALID_INTERVIEW_TYPES } from "./interviewOptions.js";

export const createSessionValidation = [
  body("role").trim().notEmpty().withMessage("Role is required"),
  body("experienceLevel")
    .trim()
    .isIn(VALID_EXPERIENCE_LEVELS)
    .withMessage(`Experience level must be one of: ${VALID_EXPERIENCE_LEVELS.join(", ")}`),
  body("difficulty")
    .optional()
    .isIn(VALID_DIFFICULTIES)
    .withMessage(`Difficulty must be one of: ${VALID_DIFFICULTIES.join(", ")}`),
  body("interviewType")
    .trim()
    .isIn(VALID_INTERVIEW_TYPES)
    .withMessage(`Interview type must be one of: ${VALID_INTERVIEW_TYPES.join(", ")}`),
];

export const generateQuestionsValidation = [
  body("sessionId").notEmpty().withMessage("sessionId is required"),
  body("count")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("count must be between 1 and 20"),
];

export const saveAnswerValidation = [
  body("questionId").notEmpty().withMessage("questionId is required"),
  body("answer").optional().isString(),
];

export const bookmarkValidation = [
  body("questionId").notEmpty().withMessage("questionId is required"),
];

export const feedbackValidation = [
  body("questionId").notEmpty().withMessage("questionId is required"),
];