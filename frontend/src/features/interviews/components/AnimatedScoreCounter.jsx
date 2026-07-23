import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Counts up from 0 to score (0-10 scale) once on mount.
export default function AnimatedScoreCounter({ score }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 600;
    const start = performance.now();

    let frameId;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * score * 10) / 10);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [score]);

  const color =
    score >= 7 ? "text-accent-green" : score >= 4 ? "text-accent-amber" : "text-error";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-baseline gap-1"
    >
      <span className={`text-3xl font-semibold ${color}`}>{display.toFixed(1)}</span>
      <span className="text-sm text-text-secondary">/ 10</span>
    </motion.div>
  );
}