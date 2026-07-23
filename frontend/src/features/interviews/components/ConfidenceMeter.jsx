const LEVEL_TO_PERCENT = { high: 90, medium: 60, low: 30 };

export default function ConfidenceMeter({ confidenceLevel }) {
  const normalized = (confidenceLevel || "").toLowerCase();
  const percent = LEVEL_TO_PERCENT[normalized] ?? 50;
  const barColor =
    percent >= 75 ? "bg-accent-green" : percent >= 45 ? "bg-accent-amber" : "bg-error";

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-text-secondary">Confidence</span>
        <span className="text-xs text-text">{confidenceLevel || "N/A"}</span>
      </div>
      <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}