import { Link } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import { useTopicStats } from "../hooks/useTopicStats";

export default function RecommendedTopics() {
  const { data: topics, isLoading } = useTopicStats(5);

  return (
    <Card>
      <h3 className="text-sm font-medium text-text-secondary mb-4">Recommended Topics</h3>

      {isLoading && <p className="text-sm text-text-secondary py-4">Loading...</p>}

      {!isLoading && topics?.length === 0 && (
        <p className="text-sm text-text-secondary py-4">
          Practice a few interviews to get personalized topic recommendations.
        </p>
      )}

      {!isLoading && topics?.length > 0 && (
        <ul className="flex flex-col gap-3">
          {topics.map((t) => (
            <li key={t.topic} className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-amber/10 border border-accent-amber/30 shrink-0">
                <HiOutlineLightBulb className="w-4 h-4 text-accent-amber" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-text truncate">{t.topic}</p>
                <p className="text-xs text-text-secondary">
                  Avg {t.averageScore}/10 · {t.questionsCount} question
                  {t.questionsCount !== 1 ? "s" : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        to="/interviews/create"
        className="block text-sm text-accent-green hover:underline mt-4"
      >
        Practice now
      </Link>
    </Card>
  );
}
