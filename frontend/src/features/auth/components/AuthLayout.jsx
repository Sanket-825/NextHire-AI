import { Link } from "react-router-dom";
import Card from "../../../components/ui/Card";
import Logo from "../../../components/brand/Logo";

// Shared shell for all auth pages (Login, Register, Forgot/Reset Password).
// Keeps brand mark + centered card layout consistent across Part 7 & 8.
export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <Link
        to="/"
        className="flex items-center gap-2 text-text font-semibold text-lg mb-8"
      >
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/30">
          <Logo className="w-4 h-4 text-accent-green" />
        </span>
        NextHire AI
      </Link>

      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-text">{title}</h1>
          {subtitle && (
            <p className="text-sm text-text-secondary mt-1.5">{subtitle}</p>
          )}
        </div>

        {children}
      </Card>

      {footer && (
        <p className="text-sm text-text-secondary mt-6 text-center">
          {footer}
        </p>
      )}
    </div>
  );
}