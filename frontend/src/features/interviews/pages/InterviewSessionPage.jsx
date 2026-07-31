import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import Badge, { difficultyToVariant } from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import SessionTimer from "../components/SessionTimer";
import QuestionCard from "../components/QuestionCard";
import { useInterviewSession } from "../hooks/useInterviewSession";
import { useSessionQuestions } from "../hooks/useSessionQuestions";
import { useGenerateQuestions } from "../hooks/useGenerateQuestions";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function InterviewSessionPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const {
    data: session,
    isLoading: isSessionLoading,
    isError: isSessionError,
    error: sessionError,
  } = useInterviewSession(sessionId);
  const {
    data: questions,
    isLoading: areQuestionsLoading,
    isError: areQuestionsError,
  } = useSessionQuestions(sessionId);
  const generateQuestions = useGenerateQuestions(sessionId);

  const handleGenerate = () => {
    generateQuestions.mutate(10, {
      onError: (error) =>
        toast.error(getErrorMessage(error, "Could not generate questions")),
    });
  };

  if (isSessionLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-text-secondary text-sm">
        Loading session...
      </div>
    );
  }

  // Session doesn't exist (deleted, bad link, wrong id, etc.) or failed to load.
  // Bail out here with a friendly message instead of crashing on session.role below.
  if (isSessionError || !session) {
    return (
      <div className="max-w-md mx-auto flex flex-col items-center text-center py-24 gap-3">
        <HiOutlineExclamationTriangle className="w-10 h-10 text-text-secondary" />
        <h1 className="text-lg font-semibold text-text">Session not found</h1>
        <p className="text-sm text-text-secondary">
          {getErrorMessage(
            sessionError,
            "This interview session doesn't exist or may have been deleted."
          )}
        </p>
        <Button className="mt-2" onClick={() => navigate("/interviews")}>
          Back to all sessions
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text">{session.role}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="neutral">{session.interviewType}</Badge>
            <Badge variant={difficultyToVariant(session.difficulty)}>
              {session.difficulty}
            </Badge>
          </div>
        </div>
        <SessionTimer />
      </div>

      {areQuestionsLoading && (
        <p className="text-sm text-text-secondary">Loading questions...</p>
      )}

      {!areQuestionsLoading && areQuestionsError && (
        <Card className="text-center py-10">
          <p className="text-sm text-text-secondary">
            Couldn't load questions for this session. Try refreshing the page.
          </p>
        </Card>
      )}

      {!areQuestionsLoading && !areQuestionsError && questions?.length === 0 && (
        <Card className="text-center py-10">
          <p className="text-sm text-text-secondary mb-4">
            No questions generated yet for this session.
          </p>
          <Button
            isLoading={generateQuestions.isPending}
            onClick={handleGenerate}
          >
            Generate questions
          </Button>
        </Card>
      )}

      {!areQuestionsLoading && !areQuestionsError && questions?.length > 0 && (
        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <QuestionCard
              key={q._id}
              question={q}
              index={i}
              total={questions.length}
              sessionId={sessionId}
            />
          ))}
        </div>
      )}
    </div>
  );
}