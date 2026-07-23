import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center p-6">
      <div className="bg-surface border border-border rounded-xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-semibold text-red-400">404</h1>
        <p className="text-text-secondary mt-2 text-sm">This page doesn't exist.</p>
        <Link to="/" className="inline-block mt-4 text-accent-green underline">
          Back to home
        </Link>
      </div>
    </div>
  );
}