import { useEffect, useState } from "react";
import { HiOutlineClock } from "react-icons/hi2";

function formatElapsed(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function SessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-sm text-text-secondary tabular-nums">
      <HiOutlineClock className="w-4 h-4" />
      {formatElapsed(seconds)}
    </div>
  );
}
