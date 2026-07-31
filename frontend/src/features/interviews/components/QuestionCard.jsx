import { useState } from "react";
import { toast } from "react-toastify";
import { HiBookmark, HiOutlineBookmark, HiMicrophone, HiOutlineMicrophone } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import Badge, { difficultyToVariant } from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import FeedbackPanel from "./FeedbackPanel";
import { useSaveAnswer } from "../hooks/useSaveAnswer";
import { useGenerateFeedback } from "../hooks/useGenerateFeedback";
import { useToggleBookmark } from "../../bookmarks/hooks/useToggleBookmark";
import { useSpeechToText } from "../hooks/useSpeechToText";
import getErrorMessage from "../../../lib/getErrorMessage";

export default function QuestionCard({ question, index, total, sessionId }) {
  const [answer, setAnswer] = useState(question.answer || "");
  const saveAnswer = useSaveAnswer(sessionId);
  const generateFeedback = useGenerateFeedback(sessionId);
  const toggleBookmark = useToggleBookmark();
  const {
    isSupported: isSpeechSupported,
    isListening,
    interimTranscript,
    startListening,
    stopListening,
  } = useSpeechToText();

  const isDirty = answer !== (question.answer || "");
  const hasSavedAnswer = !!question.answer?.trim();
  const hasFeedback = question.feedback?.score != null;

  const handleToggleBookmark = () => {
    toggleBookmark.mutate(question._id, {
      onError: (error) =>
        toast.error(getErrorMessage(error, "Could not update bookmark")),
    });
  };

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

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening((finalChunk) => {
      setAnswer((prev) => (prev ? `${prev.trim()} ${finalChunk.trim()}` : finalChunk.trim()));
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
          <button
            onClick={handleToggleBookmark}
            disabled={toggleBookmark.isPending}
            aria-label={question.bookmarked ? "Remove bookmark" : "Add bookmark"}
            className="text-accent-green hover:text-text-secondary transition-colors disabled:opacity-50"
          >
            {question.bookmarked ? (
              <HiBookmark className="w-4 h-4" />
            ) : (
              <HiOutlineBookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <p className="text-text text-[15px] leading-relaxed mb-4">{question.question}</p>

      <div className="relative">
        <textarea
          value={isListening && interimTranscript ? `${answer} ${interimTranscript}`.trim() : answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          rows={5}
          readOnly={isListening}
          className="w-full resize-y bg-surface border border-border rounded-lg px-3.5 py-2.5 pr-11 text-sm text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-green/50 transition-colors duration-150"
        />

        {isSpeechSupported && (
          <button
            type="button"
            onClick={handleToggleMic}
            aria-label={isListening ? "Stop recording" : "Answer by voice"}
            title={isListening ? "Stop recording" : "Answer by voice"}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-md transition-colors ${
              isListening
                ? "bg-red-500/10 text-red-500 animate-pulse"
                : "text-text-secondary hover:text-accent-green hover:bg-accent-green/10"
            }`}
          >
            {isListening ? (
              <HiMicrophone className="w-4 h-4" />
            ) : (
              <HiOutlineMicrophone className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {isListening && (
        <p className="text-xs text-accent-green mt-1.5 animate-pulse">Listening...</p>
      )}

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