import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../../../services/questionService";

export function useBookmarksPreview(limit = 4) {
  const query = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(),
  });

  return { ...query, data: query.data?.slice(0, limit) };
}
