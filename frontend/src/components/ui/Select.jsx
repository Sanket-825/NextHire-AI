import { forwardRef } from "react";
import clsx from "clsx";
import { HiChevronDown } from "react-icons/hi2";

const Select = forwardRef(function Select(
  { label, error, id, className, options, placeholder, ...props },
  ref
) {
  const selectId = id || props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={clsx(
            "w-full appearance-none bg-surface border rounded-lg px-3.5 py-2.5 pr-9 text-sm text-text",
            "focus:outline-none focus:ring-2 focus:ring-accent-green/50",
            "transition-colors duration-150",
            error ? "border-error" : "border-border",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
      </div>
      {error && (
        <p id={`${selectId}-error`} className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
