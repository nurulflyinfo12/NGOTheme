"use client";

import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  Globe,
  FileText,
  Image as ImageIcon,
  Users,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Layers,
  BookOpen,
  Briefcase,
  Video,
  Building2,
  Loader2,
} from "lucide-react";

import { useProjects } from "@/hooks/useProjects";
import { useCategories } from "@/hooks/useCategories";
import { useBranch } from "@/hooks/useBranch";
import { useStaff } from "@/hooks/useStaff";
import { usePublication } from "@/hooks/usePublication";
import { useCareer } from "@/hooks/useCareer";
import { useVideoGallery } from "@/hooks/useVideoGallery";
import { useKeyInitiatives } from "@/hooks/useKeyInitiatives";
import { StatusCell } from "@/components/Admin/TableCells";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PRIMARY = "#f86048";

/* ---------------- Helpers ---------------- */
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ---------------- Dashboard ---------------- */
export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  /* ---------- Hooks ---------- */
  const { projects, loading: projectsLoading, fetchProjects } = useProjects();
  const { categories, fetchCategories } = useCategories();
  const { branches, fetchBranches } = useBranch();
  const { staffList, fetchStaff } = useStaff();
  const { publications, fetchPublications } = usePublication();
  const { careers, fetchCareers } = useCareer();
  const { videos, fetchVideos } = useVideoGallery();
  const { initiatives, fetchInitiatives } = useKeyInitiatives();

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- Initial data load ---------- */
  useEffect(() => {
    if (!mounted) return;
    fetchProjects();
    fetchCategories();
    fetchBranches();
    fetchStaff();
    fetchPublications();
    fetchCareers();
    fetchVideos();
    fetchInitiatives();
  }, [
    mounted,
    fetchProjects,
    fetchCategories,
    fetchBranches,
    fetchStaff,
    fetchPublications,
    fetchCareers,
    fetchVideos,
    fetchInitiatives,
  ]);

  /* ---------- Derived stats ---------- */
  const stats = useMemo(() => {
    const activeProjects = projects.filter((p) => p.IsActive).length;
    const activeBranches = branches.length;
    const activeStaff = staffList.filter((s) => s.IsActive !== false).length;

    return [
      {
        label: "Active Projects",
        value: String(activeProjects),
        icon: Globe,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
      },
      {
        label: "Categories",
        value: String(categories.length),
        icon: Layers,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-500/10",
      },
      {
        label: "Branches",
        value: String(activeBranches),
        icon: Building2,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-500/10",
      },
      {
        label: "Team Members",
        value: String(activeStaff),
        icon: Users,
        color: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-50 dark:bg-purple-500/10",
      },
    ];
  }, [projects, categories, branches, staffList]);

  const secondaryStats = useMemo(() => {
    return [
      {
        label: "Key Initiatives",
        value: initiatives.filter((i) => i.IsActive).length,
        icon: Activity,
      },
      {
        label: "Publications",
        value: publications.filter((p) => p.IsActive).length,
        icon: BookOpen,
      },
      {
        label: "Job Circulars",
        value: careers.filter((c) => c.IsActive).length,
        icon: Briefcase,
      },
      {
        label: "Videos",
        value: videos.length,
        icon: Video,
      },
    ];
  }, [initiatives, publications, careers, videos]);

  /* ---------- Recent programs ---------- */
  const recentPrograms = useMemo(() => {
    return [...projects]
      .sort((a, b) => {
        const aTime = a.SetDate ? new Date(a.SetDate).getTime() : 0;
        const bTime = b.SetDate ? new Date(b.SetDate).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [projects]);

  /* ---------- Monthly engagement chart ---------- */
  const activityData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const now = new Date();
    const buckets: number[] = new Array(12).fill(0);

    projects.forEach((p) => {
      const src = p.SetDate || p.Date;
      if (!src) return;
      const d = new Date(src);
      if (isNaN(d.getTime())) return;
      buckets[d.getMonth()] += 1;
    });

    const startMonth = Math.max(0, now.getMonth() - 5);
    const labels = months.slice(startMonth, now.getMonth() + 1);
    const data = buckets.slice(startMonth, now.getMonth() + 1);

    return {
      labels,
      datasets: [
        {
          fill: true,
          label: "Projects Added",
          data,
          borderColor: PRIMARY,
          backgroundColor: `${PRIMARY}15`,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: PRIMARY,
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [projects]);

  const totalProjects = projects.length;
  const totalActive = projects.filter((p) => p.IsActive).length;

  const isLoading =
    projectsLoading ||
    !mounted ||
    (projects.length === 0 &&
      branches.length === 0 &&
      staffList.length === 0 &&
      publications.length === 0);

  if (!mounted) return null;

  /* ---------------- Chart Options (dark-aware) ---------------- */
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? "#0f172a" : "#1e293b",
        padding: 12,
        titleFont: { size: 14, weight: "bold" as const },
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        grid: { display: false },
        ticks: {
          color: isDark ? "#64748b" : "#94a3b8",
          stepSize: 1,
          precision: 0,
        },
      },
      x: {
        grid: { display: false },
        ticks: { color: isDark ? "#64748b" : "#94a3b8" },
      },
    },
  };

  return (
    <div className="space-y-8! sm:space-y-10! pb-10! animate-in fade-in duration-700">
      {/* ---------------- Primary Stats ---------------- */}
      <div className="grid grid-cols-2! lg:grid-cols-4! gap-4! sm:gap-6!">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white dark:bg-slate-900/80! p-4! sm:p-6! rounded-2xl! border border-slate-100 dark:border-slate-800! shadow-sm"
          >
            <div className="flex items-center justify-between mb-3! sm:mb-4!">
              <div
                className={`${s.bg} ${s.color} p-2.5! sm:p-3! rounded-xl!`}
              >
                <s.icon size={18} className="sm:hidden!" />
                <s.icon size={20} className="hidden! sm:block!" />
              </div>
              <span className="flex items-center gap-1 text-[10px]! font-black! text-emerald-600! dark:text-emerald-400! bg-emerald-50 dark:bg-emerald-500/10! px-2! py-1! rounded-lg!">
                <ArrowUpRight size={11} />
                Live
              </span>
            </div>
            <div>
              <p className="text-[10px]! sm:text-[11px]! font-black! text-slate-400! dark:text-slate-500! uppercase! tracking-wider!">
                {s.label}
              </p>
              <h3 className="text-xl! sm:text-2xl! font-black! text-slate-900! dark:text-white! mt-1!">
                {isLoading ? (
                  <span className="inline-block h-6! w-12! bg-slate-100 dark:bg-slate-800! rounded animate-pulse" />
                ) : (
                  s.value
                )}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------------- Secondary Stats Row ---------------- */}
      <div className="grid grid-cols-2! lg:grid-cols-4! gap-4! sm:gap-6!">
        {secondaryStats.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.06 }}
            className="flex items-center gap-3! bg-white dark:bg-slate-900/80! px-4! sm:px-5! py-3.5! sm:py-4! rounded-2xl! border border-slate-100 dark:border-slate-800! shadow-sm"
          >
            <div className="w-9! h-9! sm:w-10! sm:h-10! rounded-xl! flex items-center justify-center bg-[#f86048]/10! shrink-0">
              <s.icon size={16} className="text-[#f86048]!" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px]! font-black! text-slate-400! dark:text-slate-500! uppercase! tracking-wider! truncate">
                {s.label}
              </p>
              <p className="text-base! sm:text-lg! font-black! text-slate-900! dark:text-white! leading-tight!">
                {isLoading ? (
                  <span className="inline-block h-5! w-8! bg-slate-100 dark:bg-slate-800! rounded animate-pulse" />
                ) : (
                  s.value
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ---------------- Main Grid: Chart + Recent ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6! sm:gap-8!">
        {/* ---------- Engagement Chart ---------- */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/80! p-5! sm:p-8! rounded-2xl! border border-slate-100 dark:border-slate-800! shadow-sm">
          <div className="flex items-center justify-between mb-6! sm:mb-8!">
            <div>
              <h2 className="text-base! sm:text-lg! font-black! text-slate-900! dark:text-white! uppercase! tracking-tight!">
                Project Activity
              </h2>
              <p className="text-[10px]! sm:text-xs! font-bold! text-slate-400! dark:text-slate-500! uppercase! tracking-widest! mt-0.5!">
                Programs added over the last 6 months
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px]! font-black! text-emerald-600! dark:text-emerald-400! bg-emerald-50 dark:bg-emerald-500/10! px-2.5! py-1! rounded-lg!">
                <Activity size={12} />
                {totalActive} active
              </span>
              <TrendingUp className="text-[#f86048]!" size={20} />
            </div>
          </div>

          <div className="h-[240px]! sm:h-[280px]! lg:h-[300px]!">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2
                  className="animate-spin text-slate-300 dark:text-slate-600!"
                  size={28}
                />
              </div>
            ) : (
              <Line data={activityData} options={chartOptions} />
            )}
          </div>

          {/* Mini totals footer */}
          <div className="grid grid-cols-3 gap-3! mt-6! pt-5! border-t border-slate-100 dark:border-slate-800!">
            <div>
              <p className="text-[10px]! font-black! text-slate-400! dark:text-slate-500! uppercase! tracking-widest!">
                Total
              </p>
              <p className="text-base! sm:text-lg! font-black! text-slate-900! dark:text-white! mt-0.5!">
                {totalProjects}
              </p>
            </div>
            <div>
              <p className="text-[10px]! font-black! text-slate-400! dark:text-slate-500! uppercase! tracking-widest!">
                Active
              </p>
              <p className="text-base! sm:text-lg! font-black! text-emerald-600! dark:text-emerald-400! mt-0.5!">
                {totalActive}
              </p>
            </div>
            <div>
              <p className="text-[10px]! font-black! text-slate-400! dark:text-slate-500! uppercase! tracking-widest!">
                Inactive
              </p>
              <p className="text-base! sm:text-lg! font-black! text-slate-400! dark:text-slate-500! mt-0.5!">
                {totalProjects - totalActive}
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Recent Programs ---------- */}
        <div className="bg-white dark:bg-slate-900/80! rounded-2xl! border border-slate-100 dark:border-slate-800! shadow-sm overflow-hidden flex flex-col">
          <div className="p-4! sm:p-6! border-b border-slate-50 dark:border-slate-800! bg-slate-50/30 dark:bg-slate-800/30! flex items-center justify-between">
            <h2 className="text-xs! sm:text-sm! font-black! text-slate-900! dark:text-white! uppercase! tracking-widest!">
              Recent Projects
            </h2>
            <span className="text-[10px]! font-black! text-slate-400! dark:text-slate-500! bg-slate-100 dark:bg-slate-800! px-2! py-0.5! rounded-md!">
              {recentPrograms.length}
            </span>
          </div>

          <div className="flex-1 divide-y divide-slate-50 dark:divide-slate-800!">
            {isLoading ? (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="p-4! animate-pulse">
                  <div className="h-4! w-3/4! bg-slate-100 dark:bg-slate-800! rounded mb-2!" />
                  <div className="h-3! w-1/2! bg-slate-100 dark:bg-slate-800! rounded" />
                </div>
              ))
            ) : recentPrograms.length === 0 ? (
              <div className="p-6! text-center">
                <FileText
                  className="mx-auto text-slate-300! dark:text-slate-600! mb-3!"
                  size={28}
                />
                <p className="text-xs! font-bold! text-slate-400! dark:text-slate-500!">
                  No projects yet
                </p>
              </div>
            ) : (
              recentPrograms.map((p) => (
                <div
                  key={p.ProjectID}
                  className="p-4! flex items-center justify-between gap-3!"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm! font-bold! text-slate-800! dark:text-white! truncate">
                      {p.Title}
                    </h4>
                    <p className="text-[10px]! font-bold! text-slate-400! dark:text-slate-500! uppercase! truncate! mt-0.5!">
                      {p.CategoryName || p.Category || "Uncategorized"} •{" "}
                      {formatDate(p.SetDate || p.Date)}
                    </p>
                  </div>
                  <StatusCell status={p.IsActive ? "Active" : "Inactive"} />
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}