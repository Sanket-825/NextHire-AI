import { Link } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineLightBulb,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

import Logo from "../../../components/brand/Logo";

const FEATURES = [
  { icon: HiOutlineSparkles, title: "AI Mock Interviews", desc: "Questions generated for your role & level" },
  { icon: HiOutlineCheckCircle, title: "AI Feedback & Scoring", desc: "Scored answers with improvement tips" },
  { icon: HiOutlineChartBar, title: "Performance Dashboard", desc: "Track your progress over time" },
  { icon: HiOutlineLightBulb, title: "Topic Recommendations", desc: "Know exactly what to practice next" },
];


export default function SplitAuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-[420px] shrink-0 flex-col justify-center px-10 border-r border-border">
        <Link to="/" className="flex items-center gap-2 text-text font-semibold text-lg mb-8">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/30">
            <Logo className="w-4 h-4 text-accent-green" />
          </span>
          NextHire AI
        </Link>

        <h1 className="text-2xl font-semibold text-text leading-snug">
          AI-Powered Interviews.<br />
          <span className="text-accent-green">Real</span> Careers.
        </h1>
        <p className="text-sm text-text-secondary mt-3 mb-8">
          Practice, get scored, and know exactly what to work on next.
        </p>

        <div className="flex flex-col gap-5">
          {FEATURES.map(({ icon: Icon, title: featureTitle, desc }) => (
            <div key={featureTitle} className="flex items-start gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface border border-border shrink-0">
                <Icon className="w-4 h-4 text-accent-green" />
              </span>
              <div>
                <p className="text-sm text-text font-medium">{featureTitle}</p>
                <p className="text-xs text-text-secondary">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        {/* Logo shown here too, for pages viewed below the lg breakpoint
            where the left panel is hidden. */}
        <Link to="/" className="lg:hidden flex items-center gap-2 text-text font-semibold text-lg mb-8">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/30">
            <Logo className="w-4 h-4 text-accent-green" />
          </span>
          NextHire AI
        </Link>

        <div className="w-full max-w-md bg-surface border border-border rounded-xl p-5 sm:p-8">
          {(title || subtitle) && (
            <div className="text-center mb-6">
              {title && <h1 className="text-xl font-semibold text-text">{title}</h1>}
              {subtitle && <p className="text-sm text-text-secondary mt-1.5">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>

        {footer && (
          <p className="text-sm text-text-secondary mt-6 text-center">{footer}</p>
        )}
      </div>
    </div>
  );
}