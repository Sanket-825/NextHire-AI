import Card from "../../../components/ui/Card";
import Badge, { difficultyToVariant } from "../../../components/ui/Badge";

export default function QuestionCard({ question, index, total }) {
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
      <p className="text-text text-[15px] leading-relaxed">{question.question}</p>
    </Card>
  );
}
