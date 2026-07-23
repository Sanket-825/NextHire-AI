import { useParams } from "react-router-dom";

import Card from "../../../components/ui/Card";
import Badge, { difficultyToVariant } from "../../../components/ui/Badge";
import SessionTimer from "../components/SessionTimer";
import QuestionCard from "../components/QuestionCard";
import { useInterviewSession } from "../hooks/useInterviewSession";
import { useSessionQuestions } from "../hooks/useSessionQuestions";

export default function InterviewSessionPage() {
  const { sessionId } = useParams();
  const { data: session, isLoading: isSessionLoading } = useInterviewSession(sessionId);
  const { data: questions, isLoading: areQuestionsLoading } = useSessionQuestions(sessionId);

  if (isSessionLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-text-secondary text-sm">
        Loading session...
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

      {!areQuestionsLoading && questions?.length === 0 && (
        <Card className="text-center py-10">
          <p className="text-sm text-text-secondary">
            No questions generated yet for this session.
          </p>
        </Card>
      )}

      {!areQuestionsLoading && questions?.length > 0 && (
        <div className="flex flex-col gap-4">
          {questions.map((q, i) => (
            <QuestionCard key={q._id} question={q} index={i} total={questions.length} />
          ))}
        </div>
      )}
    </div>
  );
}
