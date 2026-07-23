import { useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import Select from "../../../components/ui/Select";
import BookmarkCard from "../components/BookmarkCard";
import { useBookmarks } from "../hooks/useBookmarks";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

export default function BookmarksPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  // Debounce search so we don't fire a request per keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data: bookmarks, isLoading } = useBookmarks(search);

  const filtered =
    difficulty === "All"
      ? bookmarks
      : bookmarks?.filter((q) => q.difficulty === difficulty);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text">Bookmarks</h1>
        <p className="text-sm text-text-secondary mt-1">
          Questions you've saved to revisit later.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by question or topic..."
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-green/50 transition-colors duration-150"
          />
        </div>
        <div className="sm:w-44">
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={DIFFICULTIES}
          />
        </div>
      </div>

      {isLoading && <p className="text-sm text-text-secondary">Loading bookmarks...</p>}

      {!isLoading && filtered?.length === 0 && (
        <Card className="text-center py-10">
          <p className="text-sm text-text-secondary">
            {search || difficulty !== "All"
              ? "No bookmarks match your search/filter."
              : "You haven't bookmarked any questions yet."}
          </p>
        </Card>
      )}

      {!isLoading && filtered?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((q) => (
            <BookmarkCard key={q._id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}