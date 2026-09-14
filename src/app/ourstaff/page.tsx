"use client";

import React, { useState, useMemo, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaSearch,
  FaUsers,
  FaPhone,
  FaBuilding,
  FaProjectDiagram,
  FaUserCircle,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { useStaff, ApiStaff } from "@/hooks/useStaff";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

export default function OurStaffPage() {
  const { staffList, loading, fetchStaff } = useStaff();
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  const filterTypes = useMemo(() => {
    const types = Array.from(
      new Set(
        staffList
          .map((s) => s.Type)
          .filter((t): t is string => Boolean(t && t.trim() !== ""))
      )
    );
    return ["All", ...types];
  }, [staffList]);

  const filteredStaff = useMemo(() => {
    let filtered = staffList;

    if (selectedType !== "All") {
      filtered = filtered.filter((staff) => staff.Type === selectedType);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((staff) => {
        const idStr = String(staff.StaffID || staff.ID || "");
        return (
          (staff.Name && staff.Name.toLowerCase().includes(term)) ||
          (staff.Position && staff.Position.toLowerCase().includes(term)) ||
          (staff.Type && staff.Type.toLowerCase().includes(term)) ||
          (staff.Email && staff.Email.toLowerCase().includes(term)) ||
          idStr.includes(term)
        );
      });
    }

    return filtered;
  }, [staffList, selectedType, searchTerm]);

  const visibleStaff = useMemo(() => {
    return filteredStaff.slice(0, visibleCount);
  }, [filteredStaff, visibleCount]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 12);

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedType, searchTerm]);

  const getTypeCount = (type: string) => {
    if (type === "All") return staffList.length;
    return staffList.filter((s) => s.Type === type).length;
  };

  const getTypeIcon = (type?: string) => {
    if (type?.toLowerCase() === "project") return FaProjectDiagram;
    return FaUserCircle;
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const getInitials = (name: string) => {
    if (!name) return "ST";
    return name
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-[#f86048]",
      "bg-[#f86048]/80",
      "bg-[#f86048]/70",
      "bg-[#f86048]/90",
      "bg-[#f86048]/60",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getPhotoUrl = (photo: string) => {
    if (!photo) return "";
    if (photo.startsWith("http://") || photo.startsWith("https://")) {
      return photo;
    }
    return api.getFileUrl(photo);
  };

  /* ---------------- Animation Variants ---------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <DanboxLayout header={1}>
      <main className="bg-[#f8fafc] dark:bg-[#0b1120]! font-bangla transition-colors duration-300 min-h-screen">
        <PageBanner pageName="Our Staff" pageTitle="Our Dedicated Team" />

        <section className="relative py-16! md:py-24! lg:py-28! overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#f86048]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container relative z-10 mx-auto px-4! sm:px-6! lg:max-w-7xl">
            {/* ---------- Header Card ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              className="bg-white dark:bg-slate-900/90! p-6! sm:p-8! rounded-3xl! border border-slate-200/80 dark:border-slate-800! shadow-sm mb-10!"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <span
                      className="h-[2px] w-10 rounded-full"
                      style={{ backgroundColor: PRIMARY }}
                    />
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.28em]"
                      style={{ color: PRIMARY }}
                    >
                      Leadership & Operational Team
                    </span>
                  </motion.div>

                  <h2 className="text-2xl! sm:text-3xl! md:text-4xl! font-black! text-slate-900! dark:text-white! leading-tight! tracking-tight!">
                    Meet Our Team Members
                    <span style={{ color: PRIMARY }}>.</span>
                  </h2>

                  <p className="text-sm! sm:text-base! text-slate-500! dark:text-slate-400! mt-2!">
                    <span className="font-bold text-slate-900! dark:text-white!">
                      {filteredStaff.length}
                    </span>{" "}
                    team member{filteredStaff.length === 1 ? "" : "s"} listed
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-96">
                  <div className="relative group">
                    {/* Focus glow */}
                    <div
                      className="absolute -inset-0.5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition duration-300 blur-sm"
                      style={{
                        background: `linear-gradient(135deg, ${PRIMARY}, #ff9a80)`,
                      }}
                    />
                    <div className="relative">
                      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400! dark:text-slate-500! text-sm z-10" />
                      <input
                        type="text"
                        placeholder="Search staff by name, position..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="
                          w-full pl-11! pr-11! py-3!
                          rounded-2xl!
                          border border-slate-200 dark:border-slate-800!
                          bg-slate-50 dark:bg-slate-950!
                          text-sm! text-slate-900! dark:text-white!
                          placeholder:text-slate-400!
                          focus:outline-none! focus:ring-2! focus:ring-[#f86048]/50! focus:border-[#f86048]!
                          transition-all
                        "
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800! flex items-center justify-center text-xs text-slate-500! dark:text-slate-400! hover:bg-[#f86048] hover:text-white! transition-all z-10"
                          aria-label="Clear search"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------- Employment Type Pills ---------- */}
              <div className="mt-6! pt-6! border-t border-slate-100 dark:border-slate-800! overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 min-w-max">
                  {filterTypes.map((type) => {
                    const active = selectedType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`
                          px-4! py-2! rounded-xl! text-xs! font-bold!
                          transition-all duration-300 flex items-center gap-2
                          cursor-pointer whitespace-nowrap
                          ${
                            active
                              ? "text-white! shadow-lg shadow-[#f86048]/30!"
                              : "bg-slate-100 dark:bg-slate-800/60! text-slate-600! dark:text-slate-400! hover:bg-slate-200 dark:hover:bg-slate-800! hover:text-slate-900! dark:hover:text-white!"
                          }
                        `}
                        style={active ? { backgroundColor: PRIMARY } : undefined}
                      >
                        <span
                          className={active ? "text-white!" : undefined}
                        >
                          {type}
                        </span>
                        <span
                          className={`
                            px-2! py-0.5! rounded-md! text-[10px]! font-black!
                            ${
                              active
                                ? "bg-white/25! text-white!"
                                : "bg-slate-200 dark:bg-slate-700! text-slate-500! dark:text-slate-400!"
                            }
                          `}
                        >
                          {getTypeCount(type)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* ---------- Loading Skeleton ---------- */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-64 rounded-3xl bg-slate-200/60 dark:bg-slate-800/40! animate-pulse border border-slate-200 dark:border-slate-800!"
                  />
                ))}
              </div>
            ) : (
              /* ---------- Staff Grid ---------- */
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {visibleStaff.map((staff, index) => {
                    const staffKey = staff.StaffID || staff.ID || String(index);
                    const TypeIcon = getTypeIcon(staff.Type);
                    const photoUrl = getPhotoUrl(staff.Photo);
                    const showImageError =
                      imageErrors[staffKey] || !photoUrl;

                    return (
                      <motion.div
                        key={staffKey}
                        layout
                        variants={cardVariants}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        whileHover={{
                          y: -6,
                          transition: {
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          },
                        }}
                        className="
                          group relative
                          bg-white dark:bg-slate-900/90!
                          rounded-3xl!
                          border border-slate-200/80 dark:border-slate-800!
                          hover:border-[#f86048]/40!
                          transition-all duration-500
                          hover:shadow-xl hover:shadow-[#f86048]/5
                          dark:hover:shadow-none!
                          flex flex-col overflow-hidden
                        "
                      >
                        {/* Top accent bar on hover */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: `linear-gradient(90deg, ${PRIMARY}, #ff9a80, ${PRIMARY})`,
                          }}
                        />

                        {/* Shine sweep */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

                        <div className="p-6! flex flex-col flex-1 relative">
                          {/* Avatar + Info */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="relative shrink-0">
                              {!showImageError ? (
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#f86048]/20! group-hover:border-[#f86048]! transition-colors shadow-sm">
                                  <img
                                    src={photoUrl}
                                    alt={staff.Name}
                                    className="w-full h-full object-cover"
                                    onError={() => handleImageError(staffKey)}
                                  />
                                </div>
                              ) : (
                                <div
                                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white! font-extrabold text-xl shadow-sm transition-transform duration-500 group-hover:scale-105 ${getAvatarColor(
                                    staff.Name
                                  )}`}
                                >
                                  {getInitials(staff.Name)}
                                </div>
                              )}

                              {staff.IsLead && (
                                <span
                                  className="absolute -top-1.5 -right-1.5 p-1 rounded-full text-white! text-[10px] shadow-sm"
                                  style={{ backgroundColor: PRIMARY }}
                                  title="Leadership Team"
                                >
                                  <FaStar size={10} />
                                </span>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                {staff.Type && (
                                  <span
                                    className="
                                      inline-flex items-center gap-1
                                      text-[10px]! font-black! uppercase! tracking-wider!
                                      px-2.5! py-0.5! rounded-md!
                                      border!
                                    "
                                    style={{
                                      backgroundColor: `${PRIMARY}12`,
                                      color: PRIMARY,
                                      borderColor: `${PRIMARY}25`,
                                    }}
                                  >
                                    <TypeIcon size={10} />
                                    {staff.Type}
                                  </span>
                                )}
                                {staff.IsLead && (
                                  <span className="text-[10px]! font-bold! uppercase! tracking-wider! px-2! py-0.5! rounded-md! bg-amber-500/10! text-amber-600! dark:text-amber-400! border border-amber-500/20!">
                                    Lead
                                  </span>
                                )}
                              </div>

                              <h3 className="text-lg! font-black! text-slate-900! dark:text-white! leading-snug! break-words group-hover:text-[#f86048] transition-colors duration-300">
                                {staff.Name}
                              </h3>
                              <p
                                className="text-xs! font-bold! mt-0.5"
                                style={{ color: PRIMARY }}
                              >
                                {staff.Position}
                              </p>
                            </div>
                          </div>

                          {/* Contact Details */}
                          {staff.Email && (
                            <div className="mt-auto pt-4! border-t border-slate-100 dark:border-slate-800! text-xs">
                              <a
                                href={`mailto:${staff.Email}`}
                                className="flex items-center gap-2.5 text-slate-600! dark:text-slate-400! hover:text-[#f86048]! transition-colors group/link"
                              >
                                <span
                                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover/link:scale-110"
                                  style={{ backgroundColor: `${PRIMARY}12` }}
                                >
                                  <FaEnvelope
                                    className="text-[10px]"
                                    style={{ color: PRIMARY }}
                                  />
                                </span>
                                <span className="truncate">
                                  {staff.Email}
                                </span>
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}

            {/* ---------- Empty State ---------- */}
            {!loading && filteredStaff.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20! bg-white dark:bg-slate-900/60! rounded-3xl! border border-slate-200 dark:border-slate-800!"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${PRIMARY}12` }}
                >
                  <FaUsers className="text-3xl" style={{ color: PRIMARY }} />
                </div>
                <h3 className="text-2xl! font-black! text-slate-800! dark:text-white! mb-3!">
                  No Staff Members Match Your Query
                </h3>
                <p className="text-sm! text-slate-500! dark:text-slate-400! max-w-md mx-auto mb-8">
                  Try adjusting your search query or selecting a different
                  employment type filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedType("All");
                    setSearchTerm("");
                  }}
                  className="px-7! py-3! rounded-full! text-white! font-bold! text-xs! uppercase! tracking-wider! hover:opacity-90! transition-all shadow-lg"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Reset Search Criteria
                </button>
              </motion.div>
            )}

            {/* ---------- Load More ---------- */}
            {!loading && visibleCount < filteredStaff.length && (
              <div className="mt-14! md:mt-16! text-center">
                <button
                  onClick={handleLoadMore}
                  className="
                    group relative
                    px-10! py-4!
                    bg-slate-900 dark:bg-white!
                    overflow-hidden rounded-2xl
                    transition-all hover:shadow-xl
                    w-full sm:w-auto
                  "
                >
                  <div
                    className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: PRIMARY }}
                  />
                  <span className="relative z-10 text-white! dark:text-slate-900! font-black! uppercase! tracking-wider! text-xs group-hover:text-white! transition-colors flex items-center gap-2 justify-center">
                    Load More Staff
                    <span className="text-[10px] opacity-70">
                      ({filteredStaff.length - visibleCount} remaining)
                    </span>
                  </span>
                </button>
              </div>
            )}

            {/* ---------- Footer Counter ---------- */}
            {!loading && filteredStaff.length > 0 && (
              <div className="mt-8! text-center text-xs text-slate-400! dark:text-slate-500! font-medium">
                Showing{" "}
                <span className="font-bold text-slate-700! dark:text-slate-300!">
                  {visibleStaff.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-700! dark:text-slate-300!">
                  {filteredStaff.length}
                </span>{" "}
                team members
              </div>
            )}

            {/* ---------- Head Office Card ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16! p-6! sm:p-8! rounded-3xl! bg-white dark:bg-slate-900/90! border border-slate-200/80 dark:border-slate-800! shadow-sm"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                    style={{
                      backgroundColor: `${PRIMARY}12`,
                      color: PRIMARY,
                    }}
                  >
                    <FaBuilding />
                  </div>
                  <div>
                    <h4 className="text-base! font-black! text-slate-900! dark:text-white!">
                      Head Office Administration
                    </h4>
                    <p className="text-xs! text-slate-500! dark:text-slate-400!">
                      Vill+Po: Charbata, Upazilla: Subarnachar, Dist: Noakhali
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-slate-700! dark:text-slate-300!">
                  <div className="flex items-center gap-2">
                    <FaPhone style={{ color: PRIMARY }} />
                    <span className="font-mono">+880-1865-041206</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope style={{ color: PRIMARY }} />
                    <span>matin_suss@yahoo.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </DanboxLayout>
  );
}