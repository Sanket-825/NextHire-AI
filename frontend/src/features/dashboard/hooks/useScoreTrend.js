import { useQuery } from "@tanstack/react-query";
import { getScoreTrend } from "../../../services/interviewService";

export function useScoreTrend(weeks = 8) {
  return useQuery({
    queryKey: ["score-trend", weeks],
    queryFn: () => getScoreTrend(weeks),
  });
}
