import clsx from "clsx";

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "bg-surface border border-border rounded-xl p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}