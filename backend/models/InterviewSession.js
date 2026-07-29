import mongoose from "mongoose";
import { EXPERIENCE_LEVELS, DIFFICULTIES, INTERVIEW_TYPES } from "../utils/interviewOptions.js";

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: [true, "Job role is required"],
    },
    experienceLevel: {
      type: String,
      required: [true, "Experience level is required"],
      enum: EXPERIENCE_LEVELS,
    },
    difficulty: {
      type: String,
      enum: DIFFICULTIES,
      default: "Medium",
    },
    interviewType: {
      type: String,
      required: [true, "Interview type is required"],
      enum: INTERVIEW_TYPES,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
    totalQuestions: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

interviewSessionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("InterviewSession", interviewSessionSchema);