import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveAnswer } from "../../../services/questionService";

export function useSaveAnswer(sessionId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, answer }) => saveAnswer(questionId, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session-questions", sessionId] });
    },
  });
}