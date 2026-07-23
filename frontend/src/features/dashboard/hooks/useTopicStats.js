import { useQuery } from "@tanstack/react-query";
import { getTopicStats } from "../../../services/questionService";

export function useTopicStats(limit = 5) {
  return useQuery({
    queryKey: ["topic-stats", limit],
    queryFn: () => getTopicStats(limit),
  });
}
