import asyncHandler from "express-async-handler";
import Question from "../models/Question.js";
import InterviewSession from "../models/InterviewSession.js";
import { generateInterviewQuestions, generateAnswerFeedback } from "../services/aiService.js";

/**
 * @desc    Generate AI interview questions for a given session and save them
 * @route   POST /api/questions/generate
 * @access  Private
 * @body    { sessionId, count? }
 */
export const generateQuestions = asyncHandler(async (req, res) => {
  const { sessionId, count } = req.body;

  if (!sessionId) {
    res.status(400);
    throw new Error("sessionId is required");
  }

  const session = await InterviewSession.findOne({
    _id: sessionId,
    userId: req.user._id,
  });

  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  const aiQuestions = await generateInterviewQuestions({
    role: session.role,
    experienceLevel: session.experienceLevel,
    difficulty: session.difficulty,
    interviewType: session.interviewType,
    count: count || 10,
  });

  const questionDocs = aiQuestions.map((q) => ({
    sessionId: session._id,
    userId: req.user._id,
    question: q.question,
    topic: q.topic || "General",
    difficulty: q.difficulty || session.difficulty,
  }));

  const savedQuestions = await Question.insertMany(questionDocs);

  session.totalQuestions += savedQuestions.length;
  await session.save();

  res.status(201).json({ success: true, count: savedQuestions.length, questions: savedQuestions });
});

/**
 * @desc    Get all questions belonging to a specific session
 * @route   GET /api/questions/session/:sessionId
 * @access  Private
 */
export const getQuestionsBySession = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findOne({
    _id: req.params.sessionId,
    userId: req.user._id,
  });

  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  const questions = await Question.find({ sessionId: session._id }).sort({ createdAt: 1 });

  res.status(200).json({ success: true, count: questions.length, questions });
});

/**
 * @desc    Save/update a user's answer to a question
 * @route   POST /api/questions/save
 * @access  Private
 * @body    { questionId, answer }
 */
export const saveAnswer = asyncHandler(async (req, res) => {
  const { questionId, answer } = req.body;

  if (!questionId) {
    res.status(400);
    throw new Error("questionId is required");
  }

  const question = await Question.findOne({ _id: questionId, userId: req.user._id });

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  question.answer = answer ?? question.answer;
  await question.save();

  res.status(200).json({ success: true, question });
});

/**
 * @desc    Toggle bookmark status on a question
 * @route   PUT /api/questions/bookmark
 * @access  Private
 * @body    { questionId }
 */
export const toggleBookmark = asyncHandler(async (req, res) => {
  const { questionId } = req.body;

  if (!questionId) {
    res.status(400);
    throw new Error("questionId is required");
  }

  const question = await Question.findOne({ _id: questionId, userId: req.user._id });

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  question.bookmarked = !question.bookmarked;
  await question.save();

  res.status(200).json({ success: true, bookmarked: question.bookmarked, question });
});

/**
 * @desc    Get all bookmarked questions for the user, with optional search
 * @route   GET /api/questions/bookmarks
 * @access  Private
 */
export const getBookmarks = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const query = { userId: req.user._id, bookmarked: true };
  if (search) {
    query.$or = [
      { question: { $regex: search, $options: "i" } },
      { topic: { $regex: search, $options: "i" } },
    ];
  }

  const bookmarks = await Question.find(query).sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: bookmarks.length, bookmarks });
});

/**
 * @desc    Generate AI feedback for a specific question's answer, save it,
 *          and update the parent session's running average score
 * @route   POST /api/feedback
 * @access  Private
 * @body    { questionId }
 */
export const generateFeedback = asyncHandler(async (req, res) => {
  const { questionId } = req.body;

  if (!questionId) {
    res.status(400);
    throw new Error("questionId is required");
  }

  const question = await Question.findOne({ _id: questionId, userId: req.user._id });

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  if (!question.answer || question.answer.trim() === "") {
    res.status(400);
    throw new Error("Cannot generate feedback for an unanswered question");
  }

  const session = await InterviewSession.findById(question.sessionId);

  const feedback = await generateAnswerFeedback({
    question: question.question,
    answer: question.answer,
    role: session?.role || "General",
    difficulty: question.difficulty,
  });

  question.feedback = {
    score: feedback.score ?? 0,
    correctness: feedback.correctness || "",
    improvementSuggestions: feedback.improvementSuggestions || "",
    idealAnswer: feedback.idealAnswer || "",
    confidenceLevel: feedback.confidenceLevel || "",
  };
  await question.save();

  // Recalculate the session's average score across all scored questions
  if (session) {
    const scoredQuestions = await Question.find({
      sessionId: session._id,
      "feedback.score": { $ne: null },
    });
    const total = scoredQuestions.reduce((sum, q) => sum + (q.feedback.score || 0), 0);
    session.averageScore = scoredQuestions.length > 0
      ? Math.round((total / scoredQuestions.length) * 10) / 10
      : 0;
    await session.save();
  }

  res.status(200).json({ success: true, question });
});