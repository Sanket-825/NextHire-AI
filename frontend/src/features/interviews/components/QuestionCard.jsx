import { useState } from "react";
import { toast } from "react-toastify";

import Card from "../../../components/ui/Card";
import Badge, { difficultyToVariant } from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import FeedbackPanel from "./FeedbackPanel";
import { useSaveAnswer } from "../hooks/useSaveAnswer";
import { useGenerateFeedback } from "../hooks/useGenerateFeedback";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function QuestionCard({ question, index, total, sessionId }) {
  const [answer, setAnswer] = useState(question.answer || "");
  const saveAnswer = useSaveAnswer(sessionId);
  const generateFeedback = useGenerateFeedback(sessionId);

  const isDirty = answer !== (question.answer || "");
  const hasSavedAnswer = !!question.answer?.trim();
  const hasFeedback = question.feedback?.score != null;

  const handleSave = () => {
    saveAnswer.mutate(
      { questionId: question._id, answer },
      {
        onSuccess: () => toast.success("Answer saved"),
        onError: (error) => toast.error(getErrorMessage(error, "Could not save answer")),
      }
    );
  };

  const handleGetFeedback = () => {
    generateFeedback.mutate(question._id, {
      onError: (error) =>
        toast.error(getErrorMessage(error, "Could not generate feedback")),
    });
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-text-secondary">
          Question {index + 1} of {total}
        </span>
        <div className="flex items-center gap-2">
          <Badge variant="neutral">{question.topic}</Badge>
          <Badge variant={difficultyToVariant(question.difficulty)}>
            {question.difficulty}
          </Badge>
        </div>
      </div>

      <p className="text-text text-[15px] leading-relaxed mb-4">{question.question}</p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        rows={5}
        className="w-full resize-y bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-green/50 transition-colors duration-150"
      />

      <div className="flex items-center justify-between mt-3">
        {hasFeedback ? (
          <span className="text-xs text-text-secondary">Feedback generated</span>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            isLoading={saveAnswer.isPending}
            disabled={!isDirty}
            onClick={handleSave}
          >
            Save answer
          </Button>
          <Button
            size="sm"
            isLoading={generateFeedback.isPending}
            disabled={!hasSavedAnswer || isDirty}
            onClick={handleGetFeedback}
          >
            {hasFeedback ? "Regenerate feedback" : "Get feedback"}
          </Button>
        </div>
      </div>

      {hasFeedback && <FeedbackPanel feedback={question.feedback} />}
    </Card>
  );
}