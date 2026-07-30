"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  User,
  Menu,
  X,
  FileText,
  Layers,
  Film,
  BookOpen,
  Images,
  Layout,
  Shield,
  Users,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Role Management", href: "/admin/role", icon: Shield },
  { name: "Users", href: "/admin/user", icon: Users },
  { name: "Category", href: "/admin/category", icon: Layers },
  { name: "All Programs", href: "/admin/allprograms", icon: BookOpen },
  { name: "Banner", href: "/admin/herobanner", icon: Layout },
  { name: "Photo Gallery", href: "/admin/photogallery", icon: Images },
  { name: "Video Gallery", href: "/admin/videogallery", icon: Film },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
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

  useEffect(() => {
    setMounted(true);
    const isAdmin = document.cookie.includes("admin=true");
    if (!isAdmin) {
      router.replace("/login");
      return;
    }
    setAuthorized(true);
  }, [router]);

  const handleLogout = () => {
    document.cookie = "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace("/login");
  };

  if (!mounted || !authorized) return null;

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      {/* BRAND LOGO SECTION - Refined */}
      <div className="flex h-20 items-center px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="relative h-9 w-20 overflow-hidden transition-transform group-hover:scale-105">
            <img
              src="/assets/img/logo/Sagorika.webp"
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black leading-none text-slate-900 tracking-tight">
              SUSS
            </span>
            <span className="text-[10px] font-bold text-[#e86958] uppercase tracking-[0.2em] mt-1">
              Admin
            </span>
          </div>
        </Link>
      </div>

      {/* NAV LIST - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-[#e86958]/10 text-[#e86958]"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={
                      isActive
                        ? "text-[#e86958]"
                        : "text-slate-400 group-hover:text-slate-600"
                    }
                  />
                  <span
                    className={`text-sm font-semibold ${isActive ? "text-[#e86958]" : "text-slate-700"}`}
                  >
                    {item.name}
                  </span>
                </div>
                {isActive && (
                  <ChevronRight
                    size={14}
                    className="animate-in fade-in slide-in-from-left-1"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* LOGOUT AREA - Fixed Bottom */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl! bg-white border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-rose-50! hover:text-rose-600 hover:border-rose-100!"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-[#fcfcfc] text-slate-900 antialiased">
      {/* Sidebar Desktop */}
      <aside className="hidden w-72 shrink-0 border-r border-slate-100 bg-white lg:block">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl animate-in slide-in-from-left duration-300">
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-4 top-6 p-2 text-slate-400"
          >
            <X size={20} />
          </button>
          <SidebarContent />
        </aside>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white/80 px-6 backdrop-blur-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-slate-50 rounded-lg"
          >
            <Menu size={22} />
          </button>

          <div className="flex flex-1 items-center justify-end gap-5">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#e86958] ring-2 ring-white"></span>
            </button>

            <div className="flex items-center gap-3 group cursor-pointer border border-slate-100 rounded-full py-1 pl-1 pr-4 hover:bg-slate-50 transition-colors">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
                <User size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  Admin User
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Super Admin
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>

      <style jsx global>{`
        /* Minimalist Scrollbar for Sidebar */
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
      `}</style>
    </div>
  );
}
