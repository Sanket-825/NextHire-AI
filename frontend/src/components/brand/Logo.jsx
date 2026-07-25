// Bold geometric "N" monogram — brand mark used across the app
// (sidebar, auth pages, navbar). Uses currentColor so it inherits
// whatever text color class is applied by the wrapper.
export default function Logo({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="4" y="4" width="3.5" height="16" rx="1" />
      <rect x="16.5" y="4" width="3.5" height="16" rx="1" />
      <polygon points="7.5,4 11,4 16.5,20 13,20" />
    </svg>
  );
}