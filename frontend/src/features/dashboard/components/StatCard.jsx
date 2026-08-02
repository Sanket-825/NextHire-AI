import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import clsx from "clsx";

export default function StatCard({
  icon: Icon,
  label,
  value,
  accent = "green",
  to,
}) {
  const accentStyles = {
    green: "bg-accent-green/10 text-accent-green border-accent-green/30",
    amber: "bg-accent-amber/10 text-accent-amber border-accent-amber/30",
  };

  const content = (
    <Card
      className={clsx(
        "flex items-center gap-4",
        to && "transition-colors hover:bg-accent-green/10 hover:border-accent-green/40"
      )}
    >
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

  return to ? <Link to={to}>{content}</Link> : content;
}