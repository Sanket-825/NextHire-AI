import { useRef } from "react";
import clsx from "clsx";

// 6 separate single-digit boxes acting as one controlled string value.
// Supports typing, backspace-to-previous, and pasting a full code.
export default function OtpInput({ value, onChange, length = 6, error, disabled }) {
  const inputRefs = useRef([]);
  const digits = value.padEnd(length, " ").split("").slice(0, length);

  const setDigit = (index, digit) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").trimEnd());
  };

  const handleChange = (index, e) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) {
      setDigit(index, " ");
      return;
    }
    setDigit(index, char);
    if (index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index]?.trim() && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div>
      <div className="flex gap-1 sm:gap-2 justify-center">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit.trim()}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={clsx(
              "w-8 h-10 sm:w-11 sm:h-12 text-center text-base sm:text-lg font-semibold rounded-lg bg-surface border text-text",
              "focus:outline-none focus:ring-2 focus:ring-accent-green/50 transition-colors duration-150",
              error ? "border-error" : "border-border"
            )}
          />
        ))}
      </div>
      {error && <p className="text-xs text-error text-center mt-2">{error}</p>}
    </div>
  );
}