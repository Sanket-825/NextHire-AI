import { useQuery } from "@tanstack/react-query";
import { getInterviewSessions } from "../../../services/interviewService";

export function useRecentSessions(limit = 5) {
  const query = useQuery({
    queryKey: ["interview-sessions"],
    queryFn: getInterviewSessions,
  });

  return { ...query, data: query.data?.slice(0, limit) };
}
