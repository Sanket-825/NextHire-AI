import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/interviews/stats/dashboard");
  return res.data.stats;
};
