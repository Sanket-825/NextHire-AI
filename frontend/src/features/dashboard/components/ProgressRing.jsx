// SVG circular progress ring. `value` and `max` set the fill fraction;
// used for average feedback score (0-10 scale) on the dashboard.
export default function ProgressRing({ value, max = 10, size = 120, strokeWidth = 10, label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(value, max));
  const progress = max > 0 ? clamped / max : 0;
  const offset = circumference * (1 - progress);

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-accent-green)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-text">{value}</span>
        <span className="text-xs text-text-secondary">/ {max}</span>
      </div>
      {label && (
        <p className="absolute top-full mt-3 text-sm text-text-secondary whitespace-nowrap">
          {label}
        </p>
      )}
    </div>
  );
}
