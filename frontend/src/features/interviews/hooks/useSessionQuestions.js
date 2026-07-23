import { useQuery } from "@tanstack/react-query";
import { getQuestionsBySession } from "../../../services/questionService";

export function useSessionQuestions(sessionId) {
  return useQuery({
    queryKey: ["session-questions", sessionId],
    queryFn: () => getQuestionsBySession(sessionId),
    enabled: !!sessionId,
  });
}
