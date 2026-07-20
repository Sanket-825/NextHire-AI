import asyncHandler from "express-async-handler";
import InterviewSession from "../models/InterviewSession.js";
import Question from "../models/Question.js";

/**
 * @desc    Create a new interview session
 * @route   POST /api/interviews
 * @access  Private
 */
export const createInterviewSession = asyncHandler(async (req, res) => {
  const { role, experienceLevel, difficulty, interviewType } = req.body;

  if (!role || !experienceLevel || !interviewType) {
    res.status(400);
    throw new Error("Role, experience level, and interview type are required");
  }

  const session = await InterviewSession.create({
    userId: req.user._id,
    role,
    experienceLevel,
    difficulty: difficulty || "Medium",
    interviewType,
  });

  res.status(201).json({ success: true, session });
});

/**
 * @desc    Get all interview sessions for the logged-in user, with optional
 *          filters (role, interviewType, difficulty, date range) and search
 * @route   GET /api/interviews
 * @access  Private
 */
export const getInterviewSessions = asyncHandler(async (req, res) => {
  const { role, interviewType, difficulty, search, from, to } = req.query;

  const query = { userId: req.user._id };

  if (role) query.role = role;
  if (interviewType) query.interviewType = interviewType;
  if (difficulty) query.difficulty = difficulty;
  if (search) query.role = { $regex: search, $options: "i" };

  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to);
  }

  const sessions = await InterviewSession.find(query).sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: sessions.length, sessions });
});

/**
 * @desc    Get a single interview session by ID (must belong to the user)
 * @route   GET /api/interviews/:id
 * @access  Private
 */
export const getInterviewSessionById = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  res.status(200).json({ success: true, session });
});

/**
 * @desc    Delete an interview session and all its associated questions
 * @route   DELETE /api/interviews/:id
 * @access  Private
 */
export const deleteInterviewSession = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  // Clean up dependent questions so we don't leave orphaned documents
  await Question.deleteMany({ sessionId: session._id });
  await session.deleteOne();

  res.status(200).json({ success: true, message: "Interview session deleted successfully" });
});

/**
 * @desc    Get aggregate dashboard stats for the logged-in user
 * @route   GET /api/interviews/stats/dashboard
 * @access  Private
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const totalSessions = await InterviewSession.countDocuments({ userId });
  const totalQuestions = await Question.countDocuments({ userId });
  const totalBookmarked = await Question.countDocuments({ userId, bookmarked: true });

  const scoreAgg = await Question.aggregate([
    { $match: { userId, "feedback.score": { $ne: null } } },
    { $group: { _id: null, averageScore: { $avg: "$feedback.score" } } },
  ]);
  const averageScore = scoreAgg.length > 0 ? Math.round(scoreAgg[0].averageScore * 10) / 10 : 0;

  res.status(200).json({
    success: true,
    stats: {
      totalSessions,
      totalQuestions,
      totalBookmarked,
      averageScore,
    },
  });
});