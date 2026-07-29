import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineRectangleStack, HiOutlineTrash } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import Badge, { difficultyToVariant } from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { useRecentSessions } from "../../dashboard/hooks/useRecentSessions";
import { useDeleteInterviewSession } from "../hooks/useDeleteInterviewSession";
import getErrorMessage from "../../../lib/getErrorMessage";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function SessionsPage() {
  // limit=Infinity reuses the same "interview-sessions" cache as the
  // dashboard's recent list, just without slicing it down to 5.
  const { data: sessions, isLoading } = useRecentSessions(Infinity);
  const deleteSession = useDeleteInterviewSession();
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleDelete = () => {
    deleteSession.mutate(pendingDeleteId, {
      onSuccess: () => {
        toast.success("Interview session deleted");
        setPendingDeleteId(null);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "Could not delete session"));
        setPendingDeleteId(null);
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-text">All Interview Sessions</h1>
        <p className="text-sm text-text-secondary mt-1">
          Every interview you've created or attended.
        </p>
      </div>

      {isLoading && <p className="text-sm text-text-secondary">Loading...</p>}

      {!isLoading && sessions?.length === 0 && (
        <Card className="text-center py-10">
          <p className="text-sm text-text-secondary mb-4">No interview sessions yet.</p>
          <Link to="/interviews/create" className="text-sm text-accent-green hover:underline">
            Start your first interview
          </Link>
        </Card>
      )}

      {!isLoading && sessions?.length > 0 && (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <Card key={session._id} className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-hover border border-border shrink-0">
                <HiOutlineRectangleStack className="w-4 h-4 text-text-secondary" />
              </span>

              <Link to={`/interviews/${session._id}/session`} className="min-w-0 flex-1 group">
                <p className="text-sm text-text truncate group-hover:text-accent-green transition-colors">
                  {session.role}
                </p>
                <p className="text-xs text-text-secondary">
                  {session.interviewType} · {session.experienceLevel} · {formatDate(session.createdAt)}
                </p>
              </Link>

              <Badge variant={difficultyToVariant(session.difficulty)}>{session.difficulty}</Badge>

              <button
                onClick={() => setPendingDeleteId(session._id)}
                className="text-text-secondary hover:text-error transition-colors shrink-0"
                aria-label="Delete session"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!pendingDeleteId}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
        title="Delete this session?"
      >
        <p className="text-sm text-text-secondary mb-6">
          This permanently deletes the session and all its questions, answers, and feedback.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setPendingDeleteId(null)}>
            Cancel
          </Button>
          <Button variant="danger" isLoading={deleteSession.isPending} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}