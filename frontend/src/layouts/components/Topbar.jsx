import { useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HiOutlineBars3,
  HiOutlineUser,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

import { useAuth } from "../../context/AuthContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Topbar({ onOpenSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-4 md:px-8 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="md:hidden text-text-secondary hover:text-text transition-colors"
          aria-label="Open menu"
        >
          <HiOutlineBars3 className="w-6 h-6" />
        </button>
        <div>
          <p className="text-sm text-text-secondary">
            {getGreeting()}
            {user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </p>
        </div>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-hover border border-border overflow-hidden text-text-secondary text-sm font-medium hover:border-accent-green/40 transition-colors"
            aria-label="Account menu"
          >
            {user?.profileImage?.url ? (
              <img
                src={user.profileImage.url}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(user?.name) || <HiOutlineUser className="w-4 h-4" />
            )}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={8}
            className="min-w-[180px] rounded-lg border border-border bg-surface p-1 shadow-xl"
          >
            <DropdownMenu.Item asChild>
              <button
                onClick={() => navigate("/profile")}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-text hover:bg-surface-hover transition-colors outline-none cursor-pointer"
              >
                <HiOutlineUser className="w-4 h-4" />
                Profile
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-error hover:bg-surface-hover transition-colors outline-none cursor-pointer"
              >
                <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
                Log out
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}