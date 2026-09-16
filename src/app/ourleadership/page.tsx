"use client";

import { useEffect, useState } from "react";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import Image from "next/image";
import { Mail, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useStaff, ApiStaff } from "@/hooks/useStaff";
import { api } from "@/utility/api";

const PRIMARY_COLOR = "#e86958";
const PRIMARY = "#f86048";

export default function OurLeadershipPage() {
  const { fetchExecutiveTeam, fetchLeadershipTeam } = useStaff();

  const [executiveMembers, setExecutiveMembers] = useState<ApiStaff[]>([]);
  const [leadershipMembers, setLeadershipMembers] = useState<ApiStaff[]>([]);
  const [execLoading, setExecLoading] = useState<boolean>(true);
  const [leadLoading, setLeadLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Fetch Executive Team (General & Executive Committee)
    setExecLoading(true);
    fetchExecutiveTeam().then((data) => {
      if (isMounted) {
        setExecutiveMembers(data);
        setExecLoading(false);
      }
    });

    // Fetch Leadership Team
    setLeadLoading(true);
    fetchLeadershipTeam().then((data) => {
      if (isMounted) {
        setLeadershipMembers(data);
        setLeadLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchExecutiveTeam, fetchLeadershipTeam]);

  // Safe Image URL helper function
  const getMemberPhoto = (photo?: string) => {
    if (!photo) return "/assets/img/team/default-user.jpg";
    if (photo.startsWith("http://") || photo.startsWith("https://")) {
      return photo;
    }
    return api.getFileUrl(photo);
  };

  return (
    <DanboxLayout header={1}>
      <main className="bg-white dark:bg-[#0f172a]! font-bangla">
        <PageBanner pageName="Our Leadership" pageTitle="Our Leadership" />

        {/* ========================================================= */}
        {/* Section 1: Executive Committee                            */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between lg:items-end! mb-16 lg:mb-24! gap-10">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex items-center gap-4 mb-4!"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-[2px]"
                    style={{ backgroundColor: PRIMARY }}
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-black uppercase tracking-[0.3em]! text-[10px]!"
                    style={{ color: PRIMARY }}
                  >
                    GOVERNANCE
                  </motion.span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white! leading-[1]! tracking-wide!"
                >
                  General &{" "}
                  <motion.span
                    initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ color: PRIMARY_COLOR }}
                    className="inline-block"
                  >
                    Executive Committee
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.55, type: "spring", stiffness: 150, damping: 10 }}
                    style={{ color: PRIMARY }}
                  >
                    .
                  </motion.span>
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
                className="max-w-sm text-slate-500 dark:text-slate-400! text-sm! leading-relaxed! italic! border-l-2! pl-6!"
                style={{ borderColor: PRIMARY }}
              >
                SSUS has a strong and active executive body that meets monthly to review organizational performance and guide project implementation.
              </motion.p>
            </div>

            {/* Committee Members Grid Loading State */}
            {execLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-slate-100 dark:bg-slate-800 rounded-2xl h-72 animate-pulse p-4 flex flex-col justify-end">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : executiveMembers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No executive committee members found.
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
                  },
                }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              >
                {executiveMembers.map((member, index) => (
                  <motion.div
                    key={member.StaffID || member.ID || index}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.03, delayChildren: 0.05 },
                      },
                    }}
                    transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                    }}
                    className="group relative bg-white dark:bg-slate-800! rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-100 dark:border-slate-700! transition-shadow duration-500 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700!">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src={getMemberPhoto(member.Photo)}
                          alt={member.Name || "Executive Member"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </motion.div>

                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100"
                      />

                      {/* Shine Effect */}
                      <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{ x: "200%", opacity: 0.15 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                      />

                      {/* Social Action Icons */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, staggerChildren: 0.04, delayChildren: 0.05 }}
                        className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 z-10"
                      >
                        {member.Email && (
                          <motion.a
                            href={`mailto:${member.Email}`}
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all duration-300 shadow-lg"
                          >
                            <Mail className="w-4 h-4 text-white" />
                          </motion.a>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.2, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all duration-300 shadow-lg"
                        >
                          <Share2 className="w-4 h-4 text-white" />
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Member Details */}
                    <div className="p-3 sm:p-4 md:p-5 text-center relative flex-1 flex flex-col justify-center">
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] sm:text-xs font-semibold uppercase tracking-[1.5px]! sm:tracking-[2px]! mb-1 sm:mb-2!"
                        style={{ color: PRIMARY_COLOR }}
                      >
                        {member.Name}
                      </motion.p>
                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white! leading-tight! group-hover:text-[#e86958]! transition-colors duration-300"
                      >
                        {member.Position}
                      </motion.h3>

                      {/* Underline Accent */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#e86958] origin-center"
                      />
                    </div>

                    {/* Ring Glow */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-2 ring-[#e86958]/30 pointer-events-none opacity-0 group-hover:opacity-100"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* Section 2: Leadership Team                                */}
        {/* ========================================================= */}
        <section className="py-16! sm:py-20! lg:py-32! bg-slate-50! dark:bg-slate-900/50! overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between lg:items-end! mb-16 lg:mb-24! gap-10">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex items-center gap-4 mb-4!"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-[2px]"
                    style={{ backgroundColor: PRIMARY }}
                  />
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-black uppercase tracking-[0.3em]! text-[10px]!"
                    style={{ color: PRIMARY }}
                  >
                    LEADERSHIP TEAM
                  </motion.span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white! leading-[1]! tracking-wide!"
                >
                  The Visionaries Driving{" "}
                  <motion.span
                    initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ color: PRIMARY_COLOR }}
                    className="inline-block"
                  >
                    Excellence
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.5, type: "spring", stiffness: 150, damping: 10 }}
                    style={{ color: PRIMARY }}
                  >
                    .
                  </motion.span>
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
                className="max-w-sm text-slate-500 dark:text-slate-400! text-sm! leading-relaxed! italic! border-l-2! pl-6!"
                style={{ borderColor: PRIMARY }}
              >
                Seasoned leaders with decades of experience dedicated to sustainable development and community empowerment.
              </motion.p>
            </div>

            {/* Leadership Members Grid Loading State */}
            {leadLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-72 animate-pulse p-4 flex flex-col justify-end">
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mb-2" />
                    <div className="h-5 bg-slate-300 dark:bg-slate-700 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : leadershipMembers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No leadership members found.
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
                  },
                }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              >
                {leadershipMembers.map((member, index) => (
                  <motion.div
                    key={member.StaffID || member.ID || index}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.03, delayChildren: 0.05 },
                      },
                    }}
                    transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                    }}
                    className="group relative bg-white dark:bg-slate-800! rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-100 dark:border-slate-700! transition-shadow duration-500 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700!">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src={getMemberPhoto(member.Photo)}
                          alt={member.Name || "Leadership Member"}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100"
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, staggerChildren: 0.04, delayChildren: 0.05 }}
                        className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 z-10"
                      >
                        {member.Email && (
                          <motion.a
                            href={`mailto:${member.Email}`}
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all duration-300 shadow-lg"
                          >
                            <Mail className="w-4 h-4 text-white" />
                          </motion.a>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.2, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all duration-300 shadow-lg"
                        >
                          <Share2 className="w-4 h-4 text-white" />
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Member Details */}
                    <div className="p-3 sm:p-4 md:p-5 text-center relative flex-1 flex flex-col justify-center">
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] sm:text-xs font-semibold uppercase tracking-[1.5px]! sm:tracking-[2px]! mb-1 sm:mb-2!"
                        style={{ color: PRIMARY_COLOR }}
                      >
                        {member.Name}
                      </motion.p>
                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white! leading-tight! group-hover:text-[#e86958]! transition-colors duration-300"
                      >
                        {member.Position}
                      </motion.h3>

                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#e86958] origin-center"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </DanboxLayout>
  );
}