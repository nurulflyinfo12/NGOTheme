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
  FaUser,
  FaTimes,
  FaMapMarkedAlt
} from "react-icons/fa";
import { branchesData } from "../data/ourbranches";

const branchData = branchesData || [];
const districts = ["All", ...new Set(branchData.map((b) => b.district))];

export default function BranchPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedMap, setSelectedMap] = useState<string | null>(null);

  const filteredBranches = useMemo(() => {
    let filtered = branchData;

    if (selectedDistrict !== "All") {
      filtered = filtered.filter((branch) => branch.district === selectedDistrict);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (branch) =>
          branch.name.toLowerCase().includes(term) ||
          branch.district.toLowerCase().includes(term) ||
          branch.upazilla.toLowerCase().includes(term) ||
          branch.thana.toLowerCase().includes(term) ||
          branch.union.toLowerCase().includes(term) ||
          branch.village.toLowerCase().includes(term) ||
          branch.postOffice.toLowerCase().includes(term) ||
          branch.code.includes(term)
      );
    }

    return filtered;
  }, [selectedDistrict, searchTerm]);

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
    if (district === "All") return branchData.length;
    return branchData.filter((b) => b.district === district).length;
  };

  // Close modal on backdrop click or close button
  const closeMap = () => setSelectedMap(null);

  return (
    <DanboxLayout header={1}>
      <main className="bg-white dark:bg-[#0f172a]! font-bangla">
        <PageBanner pageName="Our Branches" pageTitle="Our Branch Network" />

        <section className="py-12! md:py-20! lg:py-32! bg-white dark:bg-[#0f172a]!">
          <div className="container mx-auto px-4! sm:pl-6!">
            {/* Header with Stats */}
            <div className="mb-8! md:mb-12!">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4! md:gap-6!">
                <div className="w-full lg:w-auto">
                  <h2 className="text-xl! sm:text-2xl! md:text-3xl! font-black! text-slate-900! dark:text-white!">
                    Find Your Nearest Branch
                  </h2>
                  <p className="text-sm! sm:text-base! text-slate-600! dark:text-slate-400! mt-1! md:mt-2!">
                    {filteredBranches.length} branches found across {districts.length - 1} districts
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-80 mt-3! lg:mt-0!">
                  <FaSearch className="absolute left-3! sm:left-4! top-1/2 -translate-y-1/2 text-slate-400! dark:text-slate-500! text-sm!" />
                  <input
                    type="text"
                    placeholder="Search branches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10! sm:pl-12! pr-3! sm:pr-4! py-2.5! sm:py-3! rounded-full! border-2! border-slate-200! dark:border-slate-700! bg-white! dark:bg-slate-800/50! text-sm! sm:text-base! text-slate-900! dark:text-white! placeholder:text-slate-400! focus:outline-none! focus:border-[#f86048]! transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* District Filters */}
            <div className="mb-8! md:mb-12! overflow-x-auto -mx-4! px-4! sm:mx-0! sm:px-0!">
              <div className="flex flex-nowrap sm:flex-wrap gap-2! sm:gap-3! pb-2! min-w-max sm:min-w-0">
                {districts.map((district) => (
                  <button
                    key={district}
                    onClick={() => setSelectedDistrict(district)}
                    className={`px-3! sm:px-5! md:px-6! py-2! sm:py-2.5! rounded-full! text-[10px]! sm:text-xs! font-black! uppercase! tracking-wide! transition-all duration-500! border-2! whitespace-nowrap flex-shrink-0 ${
                      selectedDistrict === district
                        ? "bg-slate-900! border-slate-900! text-[#f86048]! dark:bg-white! dark:text-slate-900! shadow-lg!"
                        : "bg-transparent! border-slate-100! text-slate-400! hover:border-[#f86048]! hover:text-[#f86048]! dark:border-slate-800!"
                    }`}
                  >
                    {district} ({getDistrictCount(district)})
                  </button>
                ))}
              </div>
            </div>

            {/* Branch Cards Grid */}
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4! md:gap-6!"
              >
                {visibleBranches.map((branch, index) => (
                  <motion.div
                    key={branch.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white dark:bg-slate-800/50! rounded-2xl! sm:rounded-[2rem]! overflow-hidden border-2! border-slate-100! dark:border-slate-700! hover:border-[#f86048]! transition-all duration-500 hover:shadow-2xl hover:shadow-[#f86048]/10! dark:hover:shadow-[#f86048]/5! flex flex-col"
                  >
                    {/* Card Content - flex-1 pushes button to bottom */}
                    <div className="p-4! sm:p-6! flex flex-col flex-1">
                      {/* Branch Header */}
                      {branch.co && branch.co !== "N/A" && (
                        <div className="flex items-start sm:items-center gap-2! sm:gap-3! text-slate-700 dark:text-slate-300 bg-[#f86048]/5! rounded-lg! p-2! mb-3!">
                          <FaUser className="text-[#f86048]! text-xs mt-0.5 flex-shrink-0" />
                          <div className="text-xs! sm:text-sm!">
                            <span className="font-semibold">C/O:</span> {branch.co}
                          </div>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3! sm:mb-4!">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2! mb-2!">
                            <span className="text-[9px]! sm:text-[10px]! font-black! uppercase! tracking-[0.2em]! px-2! sm:px-3! py-1! rounded-full! bg-[#f86048]/10! text-[#f86048]! border! border-[#f86048]/20!">
                              Branch #{branch.code}
                            </span>
                            <span className="text-[9px]! sm:text-[10px]! font-black! uppercase! tracking-[0.2em]! px-2! sm:px-3! py-1! rounded-full! bg-slate-100! dark:bg-slate-700! text-slate-600! dark:text-slate-300!">
                              {branch.district}
                            </span>
                          </div>
                          <h3 className="text-base! sm:text-lg! md:text-xl! font-black! text-slate-900! dark:text-white! leading-tight! break-words">
                            {branch.name}
                          </h3>
                        </div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full! bg-[#f86048]/10! flex items-center justify-center flex-shrink-0 ml-2! sm:ml-3!">
                          <FaBuilding className="text-[#f86048]! text-xs sm:text-sm" />
                        </div>
                      </div>

                      {/* All Location Details */}
                      <div className="space-y-2! sm:space-y-2.5! text-xs! sm:text-sm! bg-slate-50! dark:bg-slate-800/30! rounded-xl! p-3! sm:p-4!">
                        {branch.village && (
                          <div className="flex items-start gap-2! sm:gap-3! text-slate-700 dark:text-slate-300">
                            <FaHome className="text-[#f86048]! text-xs mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="font-semibold">Vill:</span> {branch.village}
                            </div>
                          </div>
                        )}

                        {branch.postOffice && (
                          <div className="flex items-start gap-2! sm:gap-3! text-slate-700 dark:text-slate-300!">
                            <FaMapPin className="text-[#f86048]! text-xs mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="font-semibold">PO:</span> {branch.postOffice}
                            </div>
                          </div>
                        )}

                        {branch.union && branch.union !== "N/A" && (
                          <div className="flex items-start gap-2! sm:gap-3! text-slate-700 dark:text-slate-300!">
                            <FaCity className="text-[#f86048]! text-xs mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="font-semibold">Union:</span> {branch.union}
                            </div>
                          </div>
                        )}

                        {branch.thana && branch.thana !== "N/A" && (
                          <div className="flex items-start gap-2! sm:gap-3! text-slate-700 dark:text-slate-300!">
                            <FaGlobe className="text-[#f86048]! text-xs mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="font-semibold">Thana/PS:</span> {branch.thana}
                            </div>
                          </div>
                        )}

                        {branch.upazilla && (
                          <div className="flex items-start gap-2! sm:gap-3! text-slate-700 dark:text-slate-300!">
                            <FaMapMarkerAlt className="text-[#f86048]! text-xs mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="font-semibold">Upazilla:</span> {branch.upazilla}
                            </div>
                          </div>
                        )}

                        {branch.district && (
                          <div className="flex items-start gap-2! sm:gap-3! text-slate-700 dark:text-slate-300! border-t! border-slate-200 dark:border-slate-700! pt-2! mt-1!">
                            <FaMapMarkerAlt className="text-[#f86048]! text-xs mt-1 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="font-semibold">District:</span> {branch.district}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="my-3! sm:my-4! h-px! bg-slate-200 dark:bg-slate-700!"></div>

                      {/* Contact Info */}
                      <div className="space-y-2! text-xs! sm:text-sm!">
                        {branch.email && (
                          <a
                            href={`mailto:${branch.email}`}
                            className="flex items-center gap-2! sm:gap-3! text-slate-600 dark:text-slate-300! hover:text-[#f86048]! transition-colors"
                          >
                            <FaEnvelope className="text-[#f86048]! text-xs flex-shrink-0" />
                            <span className="truncate">{branch.email}</span>
                          </a>
                        )}
                        {branch.phone && (
                          <a
                            href={`tel:${branch.phone}`}
                            className="flex items-center gap-2! sm:gap-3! text-slate-600 dark:text-slate-300! hover:text-[#f86048]! transition-colors"
                          >
                            <FaPhone className="text-[#f86048]! text-xs flex-shrink-0" />
                            <span className="font-mono">{branch.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Action Button – View on Map - Always at bottom */}
                    <div className="px-4! sm:px-6! pb-4! sm:pb-6!">
                      <button
                        onClick={() => setSelectedMap(branch.map || null)}
                        disabled={!branch.map}
                        className={`w-full py-2.5! rounded-full! font-bold text-[10px]! sm:text-xs! uppercase tracking-widest! transition-all duration-300 flex items-center justify-center gap-2 ${
                          branch.map
                            ? "bg-slate-100! dark:bg-slate-700! text-slate-700 dark:text-slate-300! hover:bg-[#f86048]! hover:text-white! cursor-pointer"
                            : "bg-slate-100! dark:bg-slate-700! text-slate-400! cursor-not-allowed opacity-50"
                        }`}
                      >
                        <FaMapMarkedAlt className="text-xs" />
                        View on Map
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Map Modal */}
            <AnimatePresence>
              {selectedMap && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeMap}
                >
                  <motion.div
                    className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-slate-800"
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      onClick={closeMap}
                      className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center text-slate-700 dark:text-white hover:bg-[#f86048] hover:text-white transition-colors"
                    >
                      <FaTimes />
                    </button>
                    {/* Map iframe */}
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

            {/* No Results */}
            {filteredBranches.length === 0 && (
              <div className="text-center py-12! md:py-16!">
                <FaBuilding className="text-4xl sm:text-6xl text-slate-300 dark:text-slate-600 mx-auto mb-4!" />
                <h3 className="text-lg! sm:text-xl! font-black! text-slate-900! dark:text-white! mb-2!">
                  No branches found
                </h3>
                <p className="text-sm! sm:text-base! text-slate-600! dark:text-slate-400!">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSelectedDistrict("All");
                    setSearchTerm("");
                  }}
                  className="mt-4! px-6! py-2! rounded-full! bg-[#f86048]! text-white! font-bold text-sm hover:bg-[#e05038]! transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < filteredBranches.length && (
              <div className="mt-12! md:mt-16! text-center">
                <button
                  onClick={handleLoadMore}
                  className="group relative px-6! sm:px-10! md:px-16! py-3! sm:py-4! md:py-5! bg-slate-900! dark:bg-white! overflow-hidden rounded-2xl transition-all hover:shadow-[0_20px_50px_rgba(248,96,72,0.3)]! w-full sm:w-auto"
                >
                  <div className="absolute inset-0 w-0 bg-[#f86048]! transition-all duration-500 group-hover:w-full!" />
                  <span className="relative z-10 text-white! dark:text-slate-900! font-black! uppercase tracking-wide! text-[10px]! sm:text-xs! group-hover:text-white! transition-colors">
                    Load More Branches ({filteredBranches.length - visibleCount} remaining)
                  </span>
                </button>
              </div>
            )}

            {/* Showing count */}
            {filteredBranches.length > 0 && (
              <div className="mt-6! md:mt-8! text-center text-xs! sm:text-sm! text-slate-500 dark:text-slate-400">
                Showing {visibleBranches.length} of {filteredBranches.length} branches
              </div>
            )}
          </div>
        </section>
      </main>
    </DanboxLayout>
  );
}