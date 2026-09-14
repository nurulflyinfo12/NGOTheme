"use client";

import React, { useState, useMemo, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaSearch,
  FaBuilding,
  FaHome,
  FaMapPin,
  FaCity,
  FaGlobe,
  FaTimes,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useBranch, ApiBranch } from "@/hooks/useBranch";

export default function BranchPage() {
  const { branches, loading, fetchBranches } = useBranch();
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  // Extract unique list of districts from API response
  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(
      new Set(
        branches
          .map((b) => b.District)
          .filter((d): d is string => Boolean(d && d.trim() !== "")),
      ),
    );
    return ["All", ...uniqueDistricts];
  }, [branches]);

  // Filter branches based on District filter and Search input
  const filteredBranches = useMemo(() => {
    let filtered = branches;

    if (selectedDistrict !== "All") {
      filtered = filtered.filter(
        (branch) => branch.District === selectedDistrict,
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((branch) => {
        return (
          (branch.BranchName &&
            branch.BranchName.toLowerCase().includes(term)) ||
          (branch.District && branch.District.toLowerCase().includes(term)) ||
          (branch.Upazilla && branch.Upazilla.toLowerCase().includes(term)) ||
          (branch.Thana && branch.Thana.toLowerCase().includes(term)) ||
          (branch.Union && branch.Union.toLowerCase().includes(term)) ||
          (branch.Village && branch.Village.toLowerCase().includes(term)) ||
          (branch.PostOffice &&
            branch.PostOffice.toLowerCase().includes(term)) ||
          (branch.BranchID && branch.BranchID.toLowerCase().includes(term))
        );
      });
    }

    return filtered;
  }, [branches, selectedDistrict, searchTerm]);

  const visibleBranches = useMemo(() => {
    return filteredBranches.slice(0, visibleCount);
  }, [filteredBranches, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedDistrict, searchTerm]);

  const getDistrictCount = (district: string) => {
    if (district === "All") return branches.length;
    return branches.filter((b) => b.District === district).length;
  };

  // Generate Embed Map URL from Lat & Long if present
  const getMapEmbedUrl = (branch: ApiBranch) => {
    if (!branch.Lat || !branch.Long) return null;
    const cleanLat = branch.Lat.replace("°", "").trim();
    const cleanLong = branch.Long.replace("°", "").trim();
    return `https://maps.google.com/maps?q=${cleanLat},${cleanLong}&hl=es&z=14&output=embed`;
  };

  const closeMap = () => setSelectedMap(null);

  return (
    <DanboxLayout header={1}>
      <main className="bg-white dark:bg-[#0f172a]! font-bangla transition-colors duration-300">
        <PageBanner pageName="Our Branches" pageTitle="Our Branch Network" />

        <section className="py-12! md:py-20! lg:py-28! bg-white dark:bg-[#0f172a]!">
          <div className="container mx-auto px-4! sm:px-6! lg:max-w-7xl">
            {/* Header & Search */}
            <div className="mb-8! md:mb-12!">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4! md:gap-6!">
                <div className="w-full lg:w-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-[#f86048] animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#f86048]">
                      Presence & Reach
                    </span>
                  </div>
                  <h2 className="text-2xl! sm:text-3xl! md:text-4xl! font-black! text-slate-900! dark:text-white!">
                    Find Your Nearest Branch
                  </h2>
                  <p className="text-sm! sm:text-base! text-slate-500! dark:text-slate-400! mt-1! md:mt-2!">
                    {filteredBranches.length} branches found across{" "}
                    {districts.length > 1 ? districts.length - 1 : 0} districts
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-80 mt-2! lg:mt-0!">
                  <FaSearch className="absolute left-4! top-1/2 -translate-y-1/2 text-slate-400! dark:text-slate-500! text-sm!" />
                  <input
                    type="text"
                    placeholder="Search branches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11! pr-4! py-3! rounded-full! border-2! border-slate-200/80 dark:border-slate-800! bg-slate-50/50 dark:bg-slate-900/50! text-sm! text-slate-900! dark:text-white! placeholder:text-slate-400! focus:outline-none! focus:border-[#f86048]! transition-all shadow-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* District Filter Pills */}
            <div className="mb-8! md:mb-12! overflow-x-auto -mx-4! px-4! sm:mx-0! sm:px-0! no-scrollbar">
              <div className="flex flex-nowrap sm:flex-wrap gap-2! sm:gap-3! pb-2! min-w-max sm:min-w-0">
                {districts.map((district) => (
                  <button
                    key={district}
                    onClick={() => setSelectedDistrict(district)}
                    className={`px-4! sm:px-5! py-2! sm:py-2.5! rounded-full! text-xs! font-bold! tracking-wide! transition-all duration-300! border-2! whitespace-nowrap flex-shrink-0 ${
                      selectedDistrict === district
                        ? "bg-[#f86048]! border-[#f86048]! text-white! shadow-lg shadow-[#f86048]/25!"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-[#f86048] hover:text-[#f86048]"
                    }`}
                  >
                    {district} ({getDistrictCount(district)})
                  </button>
                ))}
              </div>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-80 rounded-[2rem] bg-slate-100 dark:bg-slate-800/50 animate-pulse border border-slate-200/50 dark:border-slate-800"
                  />
                ))}
              </div>
            ) : (
              /* Branch Grid */
              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5! md:gap-7!"
                >
                  {visibleBranches.map((branch, index) => {
                    const mapUrl = getMapEmbedUrl(branch);

                    return (
                      <motion.div
                        key={branch.BranchID || index}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, delay: index * 0.04 }}
                        className="group bg-white dark:bg-slate-900/80! rounded-2xl! sm:rounded-[2rem]! overflow-hidden border border-slate-200/80 dark:border-slate-800! hover:border-[#f86048]/40! transition-all duration-500 hover:shadow-2xl hover:shadow-[#f86048]/10 dark:hover:shadow-none flex flex-col"
                      >
                        <div className="p-5! sm:p-6! flex flex-col flex-1">
                          {/* Card Header */}
                          <div className="flex items-start justify-between mb-4!">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2! mb-2.5!">
                                <span className="text-[10px]! font-extrabold! uppercase! tracking-widest! px-2.5! py-1! rounded-full! bg-[#f86048]/10! text-[#f86048]! border border-[#f86048]/20!">
                                  Branch #{branch.BranchID || index + 1}
                                </span>
                                {branch.District && (
                                  <span className="text-[10px]! font-bold! uppercase! tracking-widest! px-2.5! py-1! rounded-full! bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                    {branch.District}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg! sm:text-xl! font-black! text-slate-900 dark:text-white! leading-snug break-words group-hover:text-[#f86048] transition-colors">
                                {branch.BranchName}
                              </h3>
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-[#f86048]/10 flex items-center justify-center flex-shrink-0 ml-3 border border-[#f86048]/20">
                              <FaBuilding className="text-[#f86048] text-sm" />
                            </div>
                          </div>

                          {/* Location Specifications */}
                          <div className="space-y-2.5! text-xs! sm:text-sm! bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4! border border-slate-100 dark:border-slate-800/80">
                            {branch.Village && (
                              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                <FaHome className="text-[#f86048] text-xs mt-1 flex-shrink-0" />
                                <div className="min-w-0">
                                  <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1">
                                    Village:
                                  </span>{" "}
                                  {branch.Village}
                                </div>
                              </div>
                            )}

                            {branch.PostOffice && (
                              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                <FaMapPin className="text-[#f86048] text-xs mt-1 flex-shrink-0" />
                                <div className="min-w-0">
                                  <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1">
                                    PostOffice:
                                  </span>{" "}
                                  {branch.PostOffice}
                                </div>
                              </div>
                            )}

                            {branch.Union && (
                              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                <FaCity className="text-[#f86048] text-xs mt-1 flex-shrink-0" />
                                <div className="min-w-0">
                                  <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1">
                                    Union:
                                  </span>{" "}
                                  {branch.Union}
                                </div>
                              </div>
                            )}

                            {branch.Thana && (
                              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                <FaGlobe className="text-[#f86048] text-xs mt-1 flex-shrink-0" />
                                <div className="min-w-0">
                                  <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1">
                                    Thana/PS:
                                  </span>{" "}
                                  {branch.Thana}
                                </div>
                              </div>
                            )}

                            {branch.Upazilla && (
                              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                <FaMapMarkerAlt className="text-[#f86048] text-xs mt-1 flex-shrink-0" />
                                <div className="min-w-0">
                                  <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1">
                                    Upazilla:
                                  </span>{" "}
                                  {branch.Upazilla}
                                </div>
                              </div>
                            )}

                            {branch.District && (
                              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 border-t border-slate-200/60 dark:border-slate-700/60 pt-2 mt-1">
                                <FaMapMarkerAlt className="text-[#f86048] text-xs mt-1 flex-shrink-0" />
                                <div className="min-w-0">
                                  <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1">
                                    District:
                                  </span>{" "}
                                  {branch.District}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Interactive View Map Action Button */}
                        <div className="px-5! sm:px-6! pb-5! sm:pb-6!">
                          <button
                            onClick={() => mapUrl && setSelectedMap(mapUrl)}
                            disabled={!mapUrl}
                            className={`w-full py-3! rounded-xl! font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                              mapUrl
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#f86048] hover:text-white cursor-pointer shadow-sm"
                                : "bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
                            }`}
                          >
                            <FaMapMarkedAlt className="text-xs" />
                            {mapUrl ? "View Location Map" : "Map Unavailable"}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Map Modal */}
            <AnimatePresence>
              {selectedMap && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeMap}
                >
                  <motion.div
                    className="relative w-full max-w-4xl h-[450px] sm:h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={closeMap}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md flex items-center justify-center text-slate-700 dark:text-white hover:bg-[#f86048] hover:text-white transition-all"
                    >
                      <FaTimes />
                    </button>

                    <iframe
                      src={selectedMap}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State Handling */}
            {!loading && filteredBranches.length === 0 && (
              <div className="text-center py-16!">
                <FaBuilding className="text-5xl text-slate-300 dark:text-slate-700 mx-auto mb-4!" />
                <h3 className="text-xl! font-black! text-slate-800 dark:text-white mb-2!">
                  No branches found
                </h3>
                <p className="text-sm! text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  We couldn&apos;t find any branches matching your search or
                  filter requirements.
                </p>
                <button
                  onClick={() => {
                    setSelectedDistrict("All");
                    setSearchTerm("");
                  }}
                  className="mt-5! px-6! py-2.5! rounded-full! bg-[#f86048] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#e05038] transition-all shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Load More Action */}
            {!loading && visibleCount < filteredBranches.length && (
              <div className="mt-12! md:mt-16! text-center">
                <button
                  onClick={handleLoadMore}
                  className="group relative px-8! py-4! bg-slate-900 dark:bg-white overflow-hidden rounded-2xl transition-all hover:shadow-xl w-full sm:w-auto"
                >
                  <div className="absolute inset-0 w-0 bg-[#f86048] transition-all duration-500 group-hover:w-full" />
                  <span className="relative z-10 text-white dark:text-slate-900 font-extrabold uppercase tracking-wider text-xs group-hover:text-white transition-colors">
                    Load More Branches ({filteredBranches.length - visibleCount}{" "}
                    remaining)
                  </span>
                </button>
              </div>
            )}

            {!loading && filteredBranches.length > 0 && (
              <div className="mt-6! text-center text-xs text-slate-400 font-medium">
                Showing {visibleBranches.length} of {filteredBranches.length}{" "}
                active branches
              </div>
            )}
          </div>
        </section>
      </main>
    </DanboxLayout>
  );
}
