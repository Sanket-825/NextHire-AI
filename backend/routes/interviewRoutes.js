import express from "express";
import {
  createInterviewSession,
  getInterviewSessions,
  getInterviewSessionById,
  deleteInterviewSession,
  getDashboardStats,
  getScoreTrend,
} from "../controllers/interviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";
import { createSessionValidation } from "../utils/interviewValidators.js";

const router = express.Router();

router.use(protect);

router.get("/stats/dashboard", getDashboardStats);
router.get("/stats/trend", getScoreTrend);

router.post("/", createSessionValidation, validate, createInterviewSession);
router.get("/", getInterviewSessions);
router.get("/:id", getInterviewSessionById);
router.delete("/:id", deleteInterviewSession);

export default router;