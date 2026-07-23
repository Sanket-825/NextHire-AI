import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../../../services/questionService";

export function useBookmarks(search = "") {
  return useQuery({
    queryKey: ["bookmarks", search],
    queryFn: () => getBookmarks(search),
  });
}