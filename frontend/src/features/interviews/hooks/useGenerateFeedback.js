import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateFeedback } from "../../../services/feedbackService";

export function useGenerateFeedback(sessionId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId) => generateFeedback(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session-questions", sessionId] });
      queryClient.invalidateQueries({ queryKey: ["interview-session", sessionId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
}