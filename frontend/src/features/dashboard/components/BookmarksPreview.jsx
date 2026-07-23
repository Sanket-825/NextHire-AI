import { Link } from "react-router-dom";
import { HiOutlineBookmark } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import { useBookmarksPreview } from "../hooks/useBookmarksPreview";

export default function BookmarksPreview() {
  const { data: bookmarks, isLoading } = useBookmarksPreview(4);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-secondary">Bookmarked</h3>
        <Link to="/bookmarks" className="text-xs text-accent-green hover:underline">
          See all
        </Link>
      </div>

      {isLoading && <p className="text-sm text-text-secondary py-4">Loading...</p>}

      {!isLoading && bookmarks?.length === 0 && (
        <p className="text-sm text-text-secondary py-4">
          Bookmark questions during practice to revisit them here.
        </p>
      )}

      {!isLoading && bookmarks?.length > 0 && (
        <ul className="flex flex-col gap-3">
          {bookmarks.map((q) => (
            <li key={q._id} className="flex items-start gap-3">
              <HiOutlineBookmark className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-sm text-text truncate">{q.question}</p>
                <p className="text-xs text-text-secondary">{q.topic}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
