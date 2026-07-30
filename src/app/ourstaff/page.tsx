"use client";

import React, { useState, useMemo, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaSearch,
  FaUsers,
  FaPhone,
  FaBuilding,
  FaProjectDiagram,
  FaUserCircle
} from "react-icons/fa";
import { staffsData } from "../data/ourstaff";

// Staff data from the image with employment type
const staffData = staffsData || []
// Filter types
const filterTypes = ["All", "Regular", "Project"];

export default function OurStaffPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Filter staff based on type and search term
  const filteredStaff = useMemo(() => {
    let filtered = staffData;

    if (selectedType !== "All") {
      filtered = filtered.filter(staff => staff.type === selectedType);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(staff =>
        staff.name.toLowerCase().includes(term) ||
        staff.designation.toLowerCase().includes(term) ||
        staff.type.toLowerCase().includes(term) ||
        staff.email.toLowerCase().includes(term) ||
        staff.id.toString().includes(term)
      );
    }

    return filtered;
  }, [selectedType, searchTerm]);

  const visibleStaff = useMemo(() => {
    return filteredStaff.slice(0, visibleCount);
  }, [filteredStaff, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedType, searchTerm]);

  const getTypeCount = (type: string) => {
    if (type === "All") return staffData.length;
    return staffData.filter(s => s.type === type).length;
  };

  // Get color for type - using theme color
  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Regular": "bg-[#f86048]/10 text-[#f86048]",
      "Project": "bg-[#f86048]/10 text-[#f86048]"
    };
    return colors[type] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  };

  // Get icon for type
  const getTypeIcon = (type: string) => {
    if (type === "Project") return FaProjectDiagram;
    return FaUserCircle;
  };

  // Handle image error - fallback to initials avatar
  const handleImageError = (staffId: number) => {
    setImageErrors(prev => ({ ...prev, [staffId]: true }));
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get color for avatar based on name - using theme color
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-[#f86048]', 'bg-[#f86048]/80', 'bg-[#f86048]/70',
      'bg-[#f86048]/90', 'bg-[#f86048]/60', 'bg-[#f86048]/85'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Format email as single line with commas
  const formatEmail = (email: string) => {
    if (!email || email === "N/A") return "";
    return email;
  };

  return (
    <DanboxLayout header={1}>
      <main className="bg-white dark:bg-[#0f172a] font-bangla">
        <PageBanner
          pageName="Our Staff"
          pageTitle="Our Dedicated Team"
        />

        <section className="py-16 sm:py-20 lg:py-32 bg-white! dark:bg-[#0f172a]!">
          <div className="container mx-auto px-4! sm:pl-6!">
            {/* Header with Stats */}
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900! dark:text-white!">
                    Meet Our Team
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400! mt-1! sm:mt-2!">
                    {filteredStaff.length} staff members ({staffData.filter(s => s.type === "Regular").length} Regular, {staffData.filter(s => s.type === "Project").length} Project)
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-80">
                  <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400! dark:text-slate-500! text-xs sm:text-sm" />
                  <input
                    type="text"
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-full border-2 border-slate-200 dark:border-slate-700! bg-white! dark:bg-slate-800/50! text-slate-900! dark:text-white! placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:border-[#f86048]! transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Type Filters - Regular, Project, All - Matching Branch Page Design */}
            <div className="mb-8! md:mb-12! overflow-x-auto -mx-4! px-4! sm:mx-0! sm:px-0!">
              <div className="flex flex-nowrap sm:flex-wrap gap-2! sm:gap-3! pb-2! min-w-max sm:min-w-0">
                {filterTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3! sm:px-5! md:px-6! py-2! sm:py-2.5! rounded-full! text-[10px]! sm:text-xs! font-black! uppercase! tracking-wide! transition-all duration-500! border-2! whitespace-nowrap flex-shrink-0 ${selectedType === type
                        ? "bg-slate-900! border-slate-900! text-[#f86048]! dark:bg-white! dark:text-slate-900! shadow-lg!"
                        : "bg-transparent! border-slate-100! text-slate-400! hover:border-[#f86048]! hover:text-[#f86048]! dark:border-slate-800!"
                      }`}
                  >
                    {type} ({getTypeCount(type)})
                  </button>
                ))}
              </div>
            </div>


            {/* Staff Cards Grid */}
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                {visibleStaff.map((staff, index) => {
                  const TypeIcon = getTypeIcon(staff.type);
                  const showImageError = imageErrors[staff.id];
                  const emailText = formatEmail(staff.email);

                  return (
                    <motion.div
                      key={staff.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="group bg-white! dark:bg-slate-800/50! rounded-2xl sm:rounded-[2rem] overflow-hidden border-2 border-slate-100 dark:border-slate-700! hover:border-[#f86048]! transition-all duration-500 hover:shadow-2xl hover:shadow-[#f86048]/10 dark:hover:shadow-[#f86048]/5!"
                    >
                      <div className="p-4 sm:p-6">
                        {/* Staff Header with Image */}
                        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                          {/* Profile Image / Avatar */}
                          <div className="flex-shrink-0">
                            {!showImageError && staff.image ? (
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#f86048]/20 group-hover:border-[#f86048] transition-colors">
                                <img
                                  src={staff.image}
                                  alt={staff.name}
                                  className="w-full h-full object-fill"
                                  onError={() => handleImageError(staff.id)}
                                />
                              </div>
                            ) : (
                              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white! font-bold text-lg sm:text-xl ${getAvatarColor(staff.name)}`}>
                                {getInitials(staff.name)}
                              </div>
                            )}
                          </div>

                          {/* Staff Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1! sm:mb-1.5!">
                              <span className={`text-[8px] flex items-center sm:text-[10px] font-black uppercase tracking-[0.15em]! sm:tracking-[0.2em]! px-2 sm:px-3 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${getTypeColor(staff.type)}`}>
                                <TypeIcon className="inline mr-1 text-[8px] sm:text-[10px]" />
                                {staff.type}
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base lg:text-lg font-black text-slate-900! dark:text-white! leading-tight break-words">
                              {staff.name}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-slate-600! dark:text-slate-400! mt-0.5! font-semibold">
                              {staff.designation}
                            </p>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="my-3 sm:my-4 h-px bg-slate-200 dark:bg-slate-700"></div>

                        {/* Contact Info - Email in single line with wrapping */}
                        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                          {emailText && (
                            <div className="flex items-center gap-2 sm:gap-3 text-slate-600! dark:text-white!">
                              <FaEnvelope className="text-[#f86048]! text-[10px] sm:text-xs flex-shrink-0 mt-0.5" />
                              <a
                                href={`mailto:${emailText.split(',')[0].trim()}`}
                                className="text-[10px] sm:text-xs hover:text-[#f86048]! transition-colors break-words leading-relaxed! dark:text-white!"
                              >
                                {emailText}
                              </a>
                            </div>
                          )}
                          {staff.phone && staff.phone !== "N/A" && (
                            <a
                              href={`tel:${staff.phone}`}
                              className="flex items-center gap-2 sm:gap-3 text-slate-600! dark:text-slate-300! hover:text-[#f86048]! transition-colors"
                            >
                              <FaPhone className="text-[#f86048]! text-[10px] sm:text-xs flex-shrink-0" />
                              <span className="font-mono text-xs sm:text-sm">{staff.phone}</span>
                            </a>
                          )}
                        </div>

                        {/* Action Button */}
                        {/* <button className="w-full mt-3 sm:mt-4 py-2 sm:py-2.5 rounded-full bg-slate-100! dark:bg-slate-700! text-slate-700 dark:text-slate-300! font-bold text-[9px] sm:text-xs uppercase tracking-widest! hover:bg-[#f86048]! hover:text-white! transition-all duration-300">
                          View Profile
                        </button> */}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredStaff.length === 0 && (
              <div className="text-center py-12 sm:py-16">
                <FaUsers className="text-4xl sm:text-6xl text-slate-300 dark:text-slate-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-1 sm:mb-2">
                  No staff members found
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSelectedType("All");
                    setSearchTerm("");
                  }}
                  className="mt-3 sm:mt-4 px-5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#f86048] text-white font-bold text-xs sm:text-sm hover:bg-[#e05038] transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < filteredStaff.length && (
              <div className="mt-12 sm:mt-16 text-center">
                <button
                  onClick={handleLoadMore}
                  className="group relative px-8 sm:px-10 lg:px-16 py-3 sm:py-4 lg:py-5 bg-slate-900! dark:bg-white! overflow-hidden rounded-2xl transition-all hover:shadow-[0_20px_50px_rgba(248,96,72,0.3)]"
                >
                  <div className="absolute inset-0 w-0 bg-[#f86048]! transition-all duration-500 group-hover:w-full" />
                  <span className="relative z-10 text-white! dark:text-slate-900! font-black uppercase tracking-wide! text-[10px] sm:text-xs group-hover:text-white transition-colors">
                    Load More Staff ({filteredStaff.length - visibleCount} remaining)
                  </span>
                </button>
              </div>
            )}

            {/* Showing count */}
            {filteredStaff.length > 0 && (
              <div className="mt-6! sm:mt-8! text-center text-xs sm:text-sm text-slate-500! dark:text-slate-400!">
                Showing {visibleStaff.length} of {filteredStaff.length} staff members
              </div>
            )}

            {/* Head Office Info */}
            <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/30! border-2 border-slate-200! dark:border-slate-700!">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FaBuilding className="text-[#f86048] text-xl sm:text-2xl" />
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900! dark:text-white!">
                      Head Office
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Vill+Po: Charbata, Upazilla: Subarnachar, Dist: Noakhali
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#f86048] text-xs sm:text-sm" />
                    <span className="text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300">
                      +880-1865-041206
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-[#f86048] text-xs sm:text-sm" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      matin_suss@yahoo.com
                    </span>
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