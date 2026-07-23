import axiosInstance from "./axiosInstance";

export const getBookmarks = async (search = "") => {
  const res = await axiosInstance.get("/questions/bookmarks", {
    params: search ? { search } : {},
  });
  return res.data.bookmarks;
};

export const getTopicStats = async (limit = 5) => {
  const res = await axiosInstance.get("/questions/stats/topics", { params: { limit } });
  return res.data.topics;
};

export const getQuestionsBySession = async (sessionId) => {
  const res = await axiosInstance.get(`/questions/session/${sessionId}`);
  return res.data.questions;
};
 
export const generateQuestions = async (sessionId, count = 10) => {
  const res = await axiosInstance.post("/questions/generate", { sessionId, count });
  return res.data.questions;
};
 
export const saveAnswer = async (questionId, answer) => {
  const res = await axiosInstance.post("/questions/save", { questionId, answer });
  return res.data.question;
};

export const toggleBookmark = async (questionId) => {
  const res = await axiosInstance.put("/questions/bookmark", { questionId });
  return res.data.question;
};