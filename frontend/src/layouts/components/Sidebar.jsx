import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  HiOutlineSparkles,
  HiOutlineSquares2X2,
  HiOutlinePlusCircle,
  HiOutlineBookmark,
  HiOutlineUser,
  HiOutlineXMark,
} from "react-icons/hi2";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: HiOutlineSquares2X2, end: true },
  { to: "/interviews/create", label: "Create Interview", icon: HiOutlinePlusCircle },
  { to: "/bookmarks", label: "Bookmarks", icon: HiOutlineBookmark },
  { to: "/profile", label: "Profile", icon: HiOutlineUser },
];

// Fixed on desktop (md+), slide-in drawer on mobile controlled by
// isOpen/onClose (wired up from Topbar's hamburger button).
export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile scrim */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-surface border-r border-border",
          "flex flex-col px-4 py-6 transition-transform duration-200 ease-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <span className="flex items-center gap-2 text-text font-semibold">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/30">
              <HiOutlineSparkles className="w-4 h-4 text-accent-green" />
            </span>
            NextHire AI
          </span>
          <button
            onClick={onClose}
            className="md:hidden text-text-secondary hover:text-text transition-colors"
            aria-label="Close menu"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent-green/10 text-accent-green"
                    : "text-text-secondary hover:text-text hover:bg-surface-hover"
                )
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}