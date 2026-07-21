import axiosInstance from "./axiosInstance";
import { setTokens, clearTokens } from "../lib/tokenStorage";

export const registerUser = async (formData) => {
  const res = await axiosInstance.post("/auth/register", formData);
  setTokens({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });
  return res.data.user;
};

export const loginUser = async (formData) => {
  const res = await axiosInstance.post("/auth/login", formData);
  setTokens({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken });
  return res.data.user;
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } finally {
    clearTokens();
  }
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data.user;
};

export const forgotPassword = async (email) => {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token, password) => {
  const res = await axiosInstance.put(`/auth/reset-password/${token}`, { password });
  return res.data;
};