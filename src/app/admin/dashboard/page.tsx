"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bar, Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
} from "lucide-react";
import { StatusCell } from "@/components/Admin/TableCells";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// --- Modern Dummy Data ---
const stats = [
  {
    label: "Active Programs",
    value: "24",
    icon: Globe,
    trend: "+12%",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Total Blogs",
    value: "142",
    icon: FileText,
    trend: "+5%",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Live Banners",
    value: "08",
    icon: ImageIcon,
    trend: "Stable",
    color: "text-[#e86958]",
    bg: "bg-[#e86958]/10",
  },
  {
    label: "System Users",
    value: "1,240",
    icon: Users,
    trend: "+18%",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const recentPrograms = [
  {
    id: "1",
    title: "Industrial Robotics Mastery",
    Category: "Automation",
    status: "Active",
    date: "Mar 28, 2026",
  },
  {
    id: "2",
    title: "Advanced PLC Programming",
    Category: "Engineering",
    status: "Inactive",
    date: "Mar 25, 2026",
  },
  {
    id: "3",
    title: "IoT Solutions for SME",
    Category: "Technology",
    status: "Active",
    date: "Mar 20, 2026",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Modern Chart Configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        titleFont: { size: 14, weight: "bold" as const },
        cornerRadius: 8,
      },
    },
    scales: {
      y: { grid: { display: false }, ticks: { color: "#94a3b8" } },
      x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
    },
  };

  const activityData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        fill: true,
        label: "Platform Engagement",
        data: [40, 65, 52, 88, 70, 95],
        borderColor: "#e86958",
        backgroundColor: "rgba(232, 105, 88, 0.05)",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className=" space-y-10 pb-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={s.label}
            className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`${s.bg} ${s.color} p-3 rounded-xl transition-colors`}
              >
                <s.icon size={20} />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={12} /> {s.trend}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                {s.label}
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {s.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content: Charts & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                Platform Engagement
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Monthly user interactions
              </p>
            </div>
            <TrendingUp className="text-[#e86958]" size={20} />
          </div>
          <div className="h-[300px]">
            <Line data={activityData} options={chartOptions} />
          </div>
        </div>

        {/* Quick List / Programs */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
              Recent Programs
            </h2>
          </div>
          <div className="flex-1 divide-y divide-slate-50">
            {recentPrograms.map((p) => (
              <div
                key={p.id}
                className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {p.title}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {p.Category} • {p.date}
                  </p>
                </div>
                <StatusCell status={p.status as "Active" | "Inactive"} />
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-[10px] font-black text-[#e86958] uppercase tracking-widest hover:bg-[#e86958]/5 transition-colors">
            View All Programs
          </button>
        </div>
      </div>
    </div>
  );
}
