import clsx from "clsx";

const VARIANT_STYLES = {
  easy: "bg-accent-green/10 text-accent-green border-accent-green/30",
  medium: "bg-accent-amber/10 text-accent-amber border-accent-amber/30",
  hard: "bg-error/10 text-error border-error/30",
  neutral: "bg-surface-hover text-text-secondary border-border",
};

export default function Badge({ children, variant = "neutral", className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        VARIANT_STYLES[variant] || VARIANT_STYLES.neutral,
        className
      )}
    >
      {children}
    </span>
  );
}

    
export function difficultyToVariant(difficulty) {
  const normalized = (difficulty || "").toLowerCase();
  if (normalized === "easy") return "easy";
  if (normalized === "hard") return "hard";
  if (normalized === "medium") return "medium";
  return "neutral";
}