import { Link, Outlet } from "react-router-dom";

// Minimal placeholder shell for logged-in pages (dashboard, interviews,
// bookmarks, profile). Replaced with the real sidebar/topbar design in
// Phase 4, Part 1 — for now it just proves nested routing works.
export default function AppLayout() {
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/interviews/create", label: "Create Interview" },
    { to: "/bookmarks", label: "Bookmarks" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background text-text">
      <nav className="border-b border-border bg-surface px-6 py-4 flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-text-secondary hover:text-accent-green text-sm"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}