import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInterviewSession } from "../../../services/interviewService";

export function useDeleteInterviewSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteInterviewSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-sessions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["score-trend"] });
    },
  });
}