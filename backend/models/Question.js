import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      default: "",
    },
    topic: {
      type: String,
      default: "General",
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    bookmarked: {
      type: Boolean,
      default: false,
    },
    feedback: {
      score: { type: Number, min: 0, max: 10, default: null },
      correctness: { type: String, default: "" },
      improvementSuggestions: { type: String, default: "" },
      idealAnswer: { type: String, default: "" },
      confidenceLevel: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

questionSchema.index({ userId: 1, bookmarked: 1 });

export default mongoose.model("Question", questionSchema);
