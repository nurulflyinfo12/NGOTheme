"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  User as UserIcon,
  Menu,
  X,
  Layers,
  Film,
  BookOpen,
  Images,
  Layout,
  Shield,
  Users,
  ChevronRight,
  FolderKanban,
  Target,
  Trophy,
  MapPin,
  Briefcase,
  UserRound,
  CircleUserRound,
} from "lucide-react";

const PRIMARY = "#f86048";

interface UserProfile {
  UserFullName?: string;
  UserName?: string;
  RoleName?: string;
  IsAdmin?: boolean;
}

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Role Management", href: "/admin/role", icon: Shield },
  { name: "Users", href: "/admin/user", icon: Users },
  { name: "Category", href: "/admin/category", icon: Layers },
  { name: "Sub Category", href: "/admin/subcategory", icon: Layers },
  { name: "Banner", href: "/admin/herobanner", icon: Layout },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Key Initiatives", href: "/admin/key-initiatives", icon: Target },
  { name: "Awards", href: "/admin/awards", icon: Trophy },
  { name: "Our Branch", href: "/admin/branch", icon: MapPin },
  { name: "Our Staff", href: "/admin/staff", icon: Users },
  { name: "Photo Gallery", href: "/admin/photogallery", icon: Images },
  { name: "Video Gallery", href: "/admin/videogallery", icon: Film },
  { name: "Publication", href: "/admin/publication", icon: BookOpen },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const isAdmin = document.cookie
      .split("; ")
      .some((cookie) => cookie === "admin=true");

    if (!isAdmin) {
      router.replace("/login");
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user profile:", error);
        localStorage.removeItem("user");
      }
    }

    setAuthorized(true);
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);

    document.cookie =
      "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

    localStorage.removeItem("accessToken");
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("permittedScreens");

    window.location.href = "/login";
  };

  const displayName = user?.UserFullName || user?.UserName || "Admin User";
  const displayRole =
    user?.RoleName || (user?.IsAdmin ? "Super Admin" : "Administrator");

  if (!mounted || !authorized) return null;

  /* ---------------- Sidebar Content ---------------- */
  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white dark:bg-slate-900!">
      {/* Logo */}
      <div className="flex h-20 items-center px-6!">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="relative h-9 w-20 overflow-hidden transition-transform group-hover:scale-105">
            <img
              src="/assets/img/logo/Sagorika.webp"
              alt="SUSS Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-lg! font-black! leading-none! text-slate-900! dark:text-white! tracking-tight!">
              SUSS
            </span>
            <span
              className="text-[10px]! font-bold! uppercase! tracking-[0.2em]! mt-1!"
              style={{ color: PRIMARY }}
            >
              Admin
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto px-4! py-4! scroll-smooth">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center justify-between rounded-xl! px-4! py-3! transition-all duration-200 ${
                  isActive
                    ? "text-[#f86048]! bg-[#f86048]/10!"
                    : "text-slate-600! dark:text-slate-400! hover:bg-slate-50! dark:hover:bg-slate-800/60! dark:hover:text-white!"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={
                      isActive
                        ? "text-[#f86048]!"
                        : "text-slate-400! dark:text-slate-500! group-hover:text-slate-600! dark:group-hover:text-slate-300!"
                    }
                  />
                  <span
                    className={`text-sm! font-semibold! ${
                      isActive
                        ? "text-[#f86048]!"
                        : "text-slate-700! dark:text-slate-300! group-hover:text-slate-900! dark:group-hover:text-white!"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {isActive && (
                  <ChevronRight
                    size={14}
                    className="animate-in fade-in slide-in-from-left-1 text-[#f86048]!"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4! border-t border-slate-100 dark:border-slate-800! bg-slate-50/50 dark:bg-slate-900/50!">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl! px-4! py-3! text-sm! font-bold! bg-white dark:bg-slate-800! border border-slate-200 dark:border-slate-700! text-slate-700! dark:text-slate-300! shadow-sm transition-all hover:bg-rose-50 dark:hover:bg-rose-500/10! hover:text-rose-600! dark:hover:text-rose-400! hover:border-rose-100! dark:hover:border-rose-500/30!"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#fcfcfc] dark:bg-[#0b1120]! text-slate-900! dark:text-slate-100! antialiased transition-colors duration-300">
      {/* Desktop Sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-slate-100 dark:border-slate-800! bg-white dark:bg-slate-900! lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 dark:bg-black/60! backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />

        <aside className="absolute left-0 top-0 h-full w-72 bg-white dark:bg-slate-900! shadow-2xl animate-in slide-in-from-left duration-300">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 top-6 z-10 rounded-lg! p-2! text-slate-400! dark:text-slate-500! hover:bg-slate-100 dark:hover:bg-slate-800! hover:text-slate-700! dark:hover:text-white!"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

          <SidebarContent />
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="relative z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-100 dark:border-slate-800! bg-white dark:bg-slate-900! px-6!">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg! p-2! hover:bg-slate-50! dark:hover:bg-slate-800! text-slate-700! dark:text-slate-300! lg:hidden!"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="flex flex-1 items-center justify-end gap-4">
            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-lg! p-2! text-slate-400! dark:text-slate-500! transition-colors hover:bg-slate-50! dark:hover:bg-slate-800! hover:text-slate-600! dark:hover:text-slate-300!"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span
                className="absolute right-2 top-2 h-2 w-2 rounded-full ring-2 ring-white dark:ring-slate-900!"
                style={{ backgroundColor: PRIMARY }}
              />
            </button>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((previous) => !previous)}
                className={`group relative flex items-center gap-2.5 rounded-full! border px-3! py-1.5! transition-all duration-300 outline-none select-none ${
                  profileOpen
                    ? "border-[#f86048]! bg-[#f86048]/10! shadow-md shadow-[#f86048]/10! ring-2! ring-[#f86048]/20!"
                    : "border-slate-200 dark:border-slate-700! bg-white dark:bg-slate-800! hover:border-[#f86048]/50! dark:hover:border-[#f86048]/50! hover:bg-slate-50/80 dark:hover:bg-slate-800/80! hover:shadow-sm"
                }`}
                aria-expanded={profileOpen}
                aria-haspopup="dialog"
              >
                <div className="relative shrink-0">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full! text-xs! font-black! transition-all duration-300 ${
                      profileOpen
                        ? "text-white! shadow-xs"
                        : "bg-slate-900 dark:bg-slate-700! text-white! group-hover:bg-[#f86048]! transition-colors"
                    }`}
                    style={
                      profileOpen ? { backgroundColor: PRIMARY } : undefined
                    }
                  >
                    {displayName ? (
                      displayName.charAt(0).toUpperCase()
                    ) : (
                      <UserIcon size={14} strokeWidth={2.5} />
                    )}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col text-left">
                  <span className="max-w-[130px] truncate text-xs! font-bold! leading-none! text-slate-800! dark:text-white! transition-colors group-hover:text-slate-950! dark:group-hover:text-white!">
                    {displayName}
                  </span>
                  <span className="max-w-[130px] truncate text-[10px]! font-semibold! leading-tight! text-slate-400! dark:text-slate-500! mt-0.5! tracking-wide! uppercase!">
                    {displayRole}
                  </span>
                </div>

                <ChevronRight
                  size={14}
                  strokeWidth={2.5}
                  className={`ml-1 shrink-0 transition-transform duration-300 ${
                    profileOpen
                      ? "rotate-90 text-[#f86048]!"
                      : "text-slate-400! dark:text-slate-500! group-hover:text-slate-600! dark:group-hover:text-slate-300!"
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  role="dialog"
                  aria-label="User profile"
                  className="absolute right-0 top-full z-[9999] mt-2.5! w-[270px] overflow-hidden rounded-2xl! border border-slate-200 dark:border-slate-800! bg-white dark:bg-slate-900! shadow-xl shadow-slate-900/10 dark:shadow-black/40! animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150"
                >
                  {/* Gradient Header */}
                  <div
                    className="px-4! py-4!"
                    style={{
                      background: `linear-gradient(135deg, ${PRIMARY}, #ff9a80)`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full! bg-white text-[#f86048]! shadow-md">
                        <UserRound size={21} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm! font-black! text-white!">
                          {displayName}
                        </h3>
                        <p className="mt-0.5! truncate text-[10px]! font-medium! text-white/80!">
                          @{user?.UserName || "admin"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info Rows */}
                  <div className="p-3!">
                    <div className="space-y-2">
                      {/* Full Name */}
                      <div className="flex items-center gap-2.5! rounded-xl! bg-slate-50 dark:bg-slate-800/60! px-2.5! py-2.5!">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg! bg-white dark:bg-slate-800! text-slate-500! dark:text-slate-400! shadow-sm">
                          <CircleUserRound size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px]! font-bold! uppercase! tracking-wider! text-slate-400! dark:text-slate-500!">
                            Full Name
                          </p>
                          <p className="truncate text-xs! font-semibold! text-slate-800! dark:text-white!">
                            {displayName}
                          </p>
                        </div>
                      </div>

                      {/* Username */}
                      <div className="flex items-center gap-2.5! rounded-xl! bg-slate-50 dark:bg-slate-800/60! px-2.5! py-2.5!">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg! bg-white dark:bg-slate-800! text-slate-500! dark:text-slate-400! shadow-sm">
                          <UserIcon size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px]! font-bold! uppercase! tracking-wider! text-slate-400! dark:text-slate-500!">
                            Username
                          </p>
                          <p className="truncate text-xs! font-semibold! text-slate-800! dark:text-white!">
                            {user?.UserName || "Not available"}
                          </p>
                        </div>
                      </div>

                      {/* Role */}
                      <div className="flex items-center gap-2.5! rounded-xl! bg-slate-50 dark:bg-slate-800/60! px-2.5! py-2.5!">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg! bg-white dark:bg-slate-800! text-slate-500! dark:text-slate-400! shadow-sm">
                          <Shield size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[8px]! font-bold! uppercase! tracking-wider! text-slate-400! dark:text-slate-500!">
                            Role
                          </p>
                          <p className="truncate text-xs! font-semibold! text-slate-800! dark:text-white!">
                            {displayRole}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="my-3! h-px! bg-slate-100 dark:bg-slate-800!" />

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-xl! border border-rose-100! dark:border-rose-500/30! bg-rose-50! dark:bg-rose-500/10! px-3! py-2.5! text-xs! font-bold! text-rose-600! dark:text-rose-400! transition-all hover:bg-rose-600! hover:text-white! hover:border-rose-600! active:scale-[0.98]"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6! lg:p-10!">
          <div className="animate-in fade-in duration-700">{children}</div>
        </main>
      </div>

      {/* Scrollbar Styles */}
      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 5px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        .dark .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #334155;
        }
        .dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}