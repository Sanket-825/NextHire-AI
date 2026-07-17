import mongoose from "mongoose";

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
      enum: ["Fresher", "0-1 Years", "2-3 Years", "4-5 Years", "5+ Years", "Senior"],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    interviewType: {
      type: String,
      required: [true, "Interview type is required"],
      enum: [
        "Technical",
        "HR",
        "Behavioral",
        "DSA",
        "System Design",
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "SQL",
      ],
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
