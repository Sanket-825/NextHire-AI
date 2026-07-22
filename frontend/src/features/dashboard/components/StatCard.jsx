import Card from "../../../components/ui/Card";
import clsx from "clsx";

// Single metric tile used on the dashboard (total sessions, questions, etc).
// `accent` tints the icon chip; value/label do the rest.
export default function StatCard({ icon: Icon, label, value, accent = "green" }) {
  const accentStyles = {
    green: "bg-accent-green/10 text-accent-green border-accent-green/30",
    amber: "bg-accent-amber/10 text-accent-amber border-accent-amber/30",
  };

  return (
    <Card className="flex items-center gap-4">
      <span
        className={clsx(
          "flex items-center justify-center w-11 h-11 rounded-lg border shrink-0",
          accentStyles[accent] || accentStyles.green
        )}
      >
        <Icon className="w-5 h-5" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-semibold text-text leading-tight">{value}</p>
        <p className="text-sm text-text-secondary truncate">{label}</p>
      </div>
    </Card>
  );
}
