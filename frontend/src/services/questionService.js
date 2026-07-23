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
 


