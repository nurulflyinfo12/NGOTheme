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
    {},
  );

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  // Dynamically extract employment types from API response
  const filterTypes = useMemo(() => {
    const types = Array.from(
      new Set(
        staffList
          .map((s) => s.Type)
          .filter((t): t is string => Boolean(t && t.trim() !== "")),
      ),
    );
    return ["All", ...types];
  }, [staffList]);

  // Filter staff based on employment type and search term
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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

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

  return (
    <DanboxLayout header={1}>
      <main className="bg-[#f8fafc] dark:bg-[#0b1120] font-bangla transition-colors duration-300 min-h-screen">
        <PageBanner pageName="Our Staff" pageTitle="Our Dedicated Team" />

        <section className="py-12 md:py-20 lg:py-24 relative overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#f86048]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:max-w-7xl relative z-10">
            {/* Header & Search */}
            <div className="bg-white dark:bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-[#f86048] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#f86048]">
                      Leadership & Operational Team
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    Meet Our Team Members
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {filteredStaff.length} team member
                    {filteredStaff.length === 1 ? "" : "s"} listed
                  </p>
                </div>

                {/* Search Bar Input */}
                <div className="relative w-full lg:w-80">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search staff by name, position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f86048]/50 focus:border-[#f86048] transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Employment Type Pills */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 min-w-max">
                  {filterTypes.map((type) => {
                    const active = selectedType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4! py-2! rounded-xl! text-xs! font-bold! transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                          active
                            ? "bg-[#f86048]! text-white! shadow-lg! shadow-[#f86048]/30!"
                            : "bg-slate-100! dark:bg-slate-800/60! text-slate-600! dark:text-slate-400! hover:bg-slate-200! dark:hover:bg-slate-800! hover:text-slate-900! dark:hover:text-white!"
                        }`}
                      >
                        <span className={active ? "text-white!" : ""}>
                          {type}
                        </span>
                        <span
                          className={`px-2! py-0.5! rounded-md! text-[10px]! font-black! ${
                            active
                              ? "bg-white/25! text-white!"
                              : "bg-slate-200! dark:bg-slate-700! text-slate-500! dark:text-slate-400!"
                          }`}
                        >
                          {getTypeCount(type)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-64 rounded-3xl bg-slate-200/60 dark:bg-slate-800/40 animate-pulse border border-slate-200 dark:border-slate-800"
                  />
                ))}
              </div>
            ) : (
              /* Staff Grid */
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {visibleStaff.map((staff, index) => {
                    const staffKey = staff.StaffID || staff.ID || String(index);
                    const TypeIcon = getTypeIcon(staff.Type);
                    const photoUrl = getPhotoUrl(staff.Photo);
                    const showImageError = imageErrors[staffKey] || !photoUrl;

                    return (
                      <motion.div
                        key={staffKey}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, delay: index * 0.04 }}
                        className="group bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 hover:border-[#f86048]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#f86048]/5 flex flex-col overflow-hidden"
                      >
                        <div className="p-6 flex flex-col flex-1">
                          {/* Staff Header Avatar + Info */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="relative shrink-0">
                              {!showImageError ? (
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#f86048]/20 group-hover:border-[#f86048] transition-colors shadow-sm">
                                  <img
                                    src={photoUrl}
                                    alt={staff.Name}
                                    className="w-full h-full object-cover"
                                    onError={() => handleImageError(staffKey)}
                                  />
                                </div>
                              ) : (
                                <div
                                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-sm ${getAvatarColor(
                                    staff.Name,
                                  )}`}
                                >
                                  {getInitials(staff.Name)}
                                </div>
                              )}

                              {staff.IsLead && (
                                <span
                                  className="absolute -top-1.5 -right-1.5 p-1 rounded-full text-white text-[10px] shadow-sm"
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
                                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#f86048]/10 text-[#f86048] border border-[#f86048]/20 inline-flex items-center gap-1">
                                    <TypeIcon size={10} />
                                    {staff.Type}
                                  </span>
                                )}
                                {staff.IsLead && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    Lead
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug break-words group-hover:text-[#f86048] transition-colors">
                                {staff.Name}
                              </h3>
                              <p className="text-xs text-[#f86048] font-bold mt-0.5">
                                {staff.Position}
                              </p>
                            </div>
                          </div>

                          {/* Contact Details */}
                          {staff.Email && (
                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                              <a
                                href={`mailto:${staff.Email}`}
                                className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-[#f86048] transition-colors"
                              >
                                <FaEnvelope className="text-[#f86048] shrink-0" />
                                <span className="truncate">{staff.Email}</span>
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

            {/* Empty State */}
            {!loading && filteredStaff.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800">
                <FaUsers className="text-5xl text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2">
                  No Staff Members Match Your Query
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Try adjusting your search query or selecting a different
                  employment type filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedType("All");
                    setSearchTerm("");
                  }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#f86048] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#e05038] transition-all shadow-md"
                >
                  Reset Search Criteria
                </button>
              </div>
            )}

            {/* Load More Button */}
            {!loading && visibleCount < filteredStaff.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#f86048] dark:hover:bg-[#f86048] dark:hover:text-white rounded-2xl font-black uppercase tracking-wider text-xs transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Load More Staff ({filteredStaff.length - visibleCount}{" "}
                  remaining)
                </button>
              </div>
            )}

            {/* Head Office Information Card */}
            <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f86048]/10 text-[#f86048] flex items-center justify-center text-xl shrink-0">
                    <FaBuilding />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      Head Office Administration
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Vill+Po: Charbata, Upazilla: Subarnachar, Dist: Noakhali
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#f86048]" />
                    <span className="font-mono">+880-1865-041206</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-[#f86048]" />
                    <span>matin_suss@yahoo.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DanboxLayout>
  );
}
