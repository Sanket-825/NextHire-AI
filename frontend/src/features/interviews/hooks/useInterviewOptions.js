import { useQuery } from "@tanstack/react-query";
import { getInterviewOptions } from "../../../services/interviewService";

export function useInterviewOptions() {
  return useQuery({
    queryKey: ["interview-options"],
    queryFn: getInterviewOptions,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}