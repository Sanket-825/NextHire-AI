import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../../services/profileService";

export function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccount,
  });
}