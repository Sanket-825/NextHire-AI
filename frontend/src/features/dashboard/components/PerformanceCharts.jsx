import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import Card from "../../../components/ui/Card";

function formatWeekLabel(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  fontSize: 13,
  color: "var(--color-text)",
};

export default function PerformanceCharts({ trend }) {
  const data = trend.map((entry) => ({
    ...entry,
    label: formatWeekLabel(entry.weekStart),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <h3 className="text-sm font-medium text-text-secondary mb-4">Weekly Progress</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="label" stroke="var(--color-text-secondary)" fontSize={12} />
            <YAxis stroke="var(--color-text-secondary)" fontSize={12} allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-surface-hover)" }} />
            <Bar dataKey="sessionsCount" name="Sessions" fill="var(--color-accent-green)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="text-sm font-medium text-text-secondary mb-4">Score Trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="label" stroke="var(--color-text-secondary)" fontSize={12} />
            <YAxis domain={[0, 10]} stroke="var(--color-text-secondary)" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="averageScore"
              name="Avg Score"
              stroke="var(--color-accent-amber)"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
