import express from "express";
import {
  generateQuestions,
  getQuestionsBySession,
  saveAnswer,
  toggleBookmark,
  getBookmarks,
   getTopicStats,
} from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import {
  generateQuestionsValidation,
  saveAnswerValidation,
  bookmarkValidation,
} from "../utils/interviewValidators.js";

const router = express.Router();

router.use(protect);

router.get("/bookmarks", getBookmarks);
router.get("/stats/topics", getTopicStats);
router.get("/session/:sessionId", getQuestionsBySession);

router.post("/generate", generateQuestionsValidation, validate, generateQuestions);
router.post("/save", saveAnswerValidation, validate, saveAnswer);
router.put("/bookmark", bookmarkValidation, validate, toggleBookmark);

export default router;