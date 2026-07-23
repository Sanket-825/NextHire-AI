import axiosInstance from "./axiosInstance";

export const generateFeedback = async (questionId) => {
  const res = await axiosInstance.post("/feedback", { questionId });
  return res.data.question;
};