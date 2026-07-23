import { useMutation } from "@tanstack/react-query";
import { uploadProfileImage } from "../../../services/profileService";
import { useAuth } from "../../../context/AuthContext";

export function useUploadProfileImage() {
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (file) => uploadProfileImage(file),
    onSuccess: (profileImage) => updateUser({ profileImage }),
  });
}