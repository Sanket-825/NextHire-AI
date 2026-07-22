import {
  HiOutlineRectangleStack,
  HiOutlineQuestionMarkCircle,
  HiOutlineBookmark,
} from "react-icons/hi2";

import Card from "../../../components/ui/Card";
import StatCard from "../components/StatCard";
import ProgressRing from "../components/ProgressRing";
import { useDashboardStats } from "../hooks/useDashboardStats";

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-text-secondary text-sm">
        Loading your stats...
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="text-center py-10">
        <p className="text-error text-sm">
          Couldn&apos;t load your dashboard stats. Please try again shortly.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={HiOutlineRectangleStack}
          label="Interview Sessions"
          value={stats.totalSessions}
        />
        <StatCard
          icon={HiOutlineQuestionMarkCircle}
          label="Questions Practiced"
          value={stats.totalQuestions}
        />
        <StatCard
          icon={HiOutlineBookmark}
          label="Bookmarked"
          value={stats.totalBookmarked}
          accent="amber"
        />
      </div>

      <Card className="flex flex-col items-center py-8">
        <ProgressRing value={stats.averageScore} label="Average Feedback Score" />
      </Card>
    </div>
  );
}
