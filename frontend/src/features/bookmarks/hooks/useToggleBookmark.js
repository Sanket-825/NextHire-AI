import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleBookmark } from "../../../services/questionService";

export function useToggleBookmark() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId) => toggleBookmark(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["session-questions"] });
    },
  });
}