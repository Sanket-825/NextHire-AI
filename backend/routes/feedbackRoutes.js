import express from "express";
import { generateFeedback } from "../controllers/questionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { feedbackValidation } from "../utils/interviewValidators.js";

const router = express.Router();

router.use(protect);

router.post("/", feedbackValidation, validate, generateFeedback);

export default router;