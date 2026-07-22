import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../../services/interviewService";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}
