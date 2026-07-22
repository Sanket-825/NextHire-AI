import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// Shell for all logged-in pages (dashboard, interviews, bookmarks, profile).
// Sidebar is fixed on desktop and a slide-in drawer on mobile, toggled via
// Topbar's hamburger button.
export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="md:pl-64">
        <Topbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="px-4 md:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}