import axiosInstance from "./axiosInstance";

export const updateProfile = async (payload) => {
  const res = await axiosInstance.put("/profile", payload);
  return res.data.user;
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await axiosInstance.post("/profile/image", formData);
  return res.data.profileImage;
};

export const deleteAccount = async () => {
  const res = await axiosInstance.delete("/profile");
  return res.data;
};