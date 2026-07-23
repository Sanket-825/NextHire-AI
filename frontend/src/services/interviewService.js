import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/interviews/stats/dashboard");
  return res.data.stats;
};

export const getScoreTrend = async (weeks = 8) => {
  const res = await axiosInstance.get("/interviews/stats/trend", { params: { weeks } });
  return res.data.trend;
};

export const getInterviewSessions = async () => {
  const res = await axiosInstance.get("/interviews");
  return res.data.sessions;
};

export const createInterviewSession = async (payload) => {
  const res = await axiosInstance.post("/interviews", payload);
  return res.data.session;
};
