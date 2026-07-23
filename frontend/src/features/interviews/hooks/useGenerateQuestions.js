import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateQuestions } from "../../../services/questionService";

export function useGenerateQuestions(sessionId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (count) => generateQuestions(sessionId, count),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session-questions", sessionId] });
      queryClient.invalidateQueries({ queryKey: ["interview-session", sessionId] });
    },
  });
}