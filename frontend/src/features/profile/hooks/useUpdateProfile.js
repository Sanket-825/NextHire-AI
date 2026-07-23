import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../../services/profileService";
import { useAuth } from "../../../context/AuthContext";

export function useUpdateProfile() {
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: (payload) => updateProfile(payload),
    onSuccess: (user) => updateUser(user),
  });
}