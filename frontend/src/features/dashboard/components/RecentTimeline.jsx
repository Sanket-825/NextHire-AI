import { Link } from "react-router-dom";
import { HiOutlineRectangleStack } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import Badge, { difficultyToVariant } from "../../../components/ui/Badge";
import { useRecentSessions } from "../hooks/useRecentSessions";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function RecentTimeline() {
  const { data: sessions, isLoading } = useRecentSessions(5);

  return (
    <Card>
      <h3 className="text-sm font-medium text-text-secondary mb-4">Recent Interviews</h3>

      {isLoading && (
        <p className="text-sm text-text-secondary py-4">Loading...</p>
      )}

      {!isLoading && sessions?.length === 0 && (
        <div className="text-center py-6">
          <p className="text-sm text-text-secondary mb-3">No interviews yet.</p>
          <Link to="/interviews/create" className="text-sm text-accent-green hover:underline">
            Start your first interview
          </Link>
        </div>
      )}

      {!isLoading && sessions?.length > 0 && (
        <ul className="flex flex-col divide-y divide-border">
          {sessions.map((session) => (
            <li key={session._id}>
              <Link
                to={`/interviews/${session._id}/session`}
                className="flex items-center gap-3 py-3 group"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-hover border border-border shrink-0">
                  <HiOutlineRectangleStack className="w-4 h-4 text-text-secondary" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-text truncate group-hover:text-accent-green transition-colors">
                    {session.role}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {session.interviewType} · {formatDate(session.createdAt)}
                  </p>
                </div>
                <Badge variant={difficultyToVariant(session.difficulty)}>
                  {session.difficulty}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
