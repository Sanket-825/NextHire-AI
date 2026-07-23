import { motion } from "framer-motion";
import { HiOutlineLightBulb, HiOutlineCheckCircle } from "react-icons/hi2";

import AnimatedScoreCounter from "./AnimatedScoreCounter";
import ConfidenceMeter from "./ConfidenceMeter";

export default function FeedbackPanel({ feedback }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-4 pt-4 border-t border-border flex flex-col gap-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <AnimatedScoreCounter score={feedback.score} />
        <div className="w-40">
          <ConfidenceMeter confidenceLevel={feedback.confidenceLevel} />
        </div>
      </div>

      {feedback.correctness && (
        <p className="text-sm text-text-secondary">{feedback.correctness}</p>
      )}

      {feedback.improvementSuggestions && (
        <div className="flex gap-2">
          <HiOutlineLightBulb className="w-4 h-4 text-accent-amber shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-text-secondary mb-1">Improvement suggestions</p>
            <p className="text-sm text-text">{feedback.improvementSuggestions}</p>
          </div>
        </div>
      )}

      {feedback.idealAnswer && (
        <div className="flex gap-2">
          <HiOutlineCheckCircle className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-text-secondary mb-1">Ideal answer</p>
            <p className="text-sm text-text">{feedback.idealAnswer}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}