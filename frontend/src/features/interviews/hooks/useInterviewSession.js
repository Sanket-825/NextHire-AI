import { useQuery } from "@tanstack/react-query";
import { getInterviewSessionById } from "../../../services/interviewService";

export function useInterviewSession(sessionId) {
  return useQuery({
    queryKey: ["interview-session", sessionId],
    queryFn: () => getInterviewSessionById(sessionId),
    enabled: !!sessionId,
  });
}
