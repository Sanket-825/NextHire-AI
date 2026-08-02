import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HiBookmark, HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import Badge, { difficultyToVariant } from "../../../components/ui/Badge";
import { useToggleBookmark } from "../hooks/useToggleBookmark";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function BookmarkCard({ question }) {
  const toggleBookmark = useToggleBookmark();

  const handleRemove = () => {
    toggleBookmark.mutate(question._id, {
      onError: (error) => toast.error(getErrorMessage(error, "Could not remove bookmark")),
    });
  };

  return (
    <Card>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="neutral">{question.topic}</Badge>
          <Badge variant={difficultyToVariant(question.difficulty)}>
            {question.difficulty}
          </Badge>
        </div>
        <button
          onClick={handleRemove}
          disabled={toggleBookmark.isPending}
          aria-label="Remove bookmark"
          className="text-accent-green hover:text-text-secondary transition-colors disabled:opacity-50"
        >
          <HiBookmark className="w-5 h-5" />
        </button>
      </div>

      <p className="text-sm text-text mb-2">{question.question}</p>

      {question.answer && (
        <p className="text-sm text-text-secondary line-clamp-2 mb-3">{question.answer}</p>
      )}

      {question.sessionId && (
        <Link
          to={`/interviews/${question.sessionId}/session?highlight=${question._id}`}
          className="inline-flex items-center gap-1 text-xs text-accent-green hover:underline"
        >
          View in session
          <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
        </Link>
      )}
    </Card>
  );
}