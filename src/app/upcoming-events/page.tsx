"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { useProjects } from "@/hooks/useProjects";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

/* ---------------- Helpers ---------------- */
const parseDateParts = (dateString?: string) => {
  if (!dateString) return { day: "15", month: "Mar", fullDate: "15 Mar 2026" };
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return { day: "15", month: "Mar", fullDate: dateString };

  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const year = d.getFullYear();
  return { day, month, fullDate: `${day} ${month} ${year}` };
};

const stripHtml = (html?: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ");
};

const getImageUrl = (photo?: string) => {
  if (!photo) return "/assets/img/factbg.webp";
  if (photo.startsWith("http")) return photo;
  return api.getFileUrl(photo);
};

/* ---------------- Page ---------------- */
const UpcomingEvents = () => {
  const { projects, loading, fetchProjectsByCategorySlug, fetchProjects } =
    useProjects();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function loadEvents() {
      const res = await fetchProjectsByCategorySlug("upcoming-events");
      if (!res || res.length === 0) {
        await fetchProjects();
      }
    }
    loadEvents();
  }, [fetchProjectsByCategorySlug, fetchProjects]);

  /* ---------------- Tabs ---------------- */
  const tabs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.SubcategoryName) set.add(p.SubcategoryName);
    });
    const dynamic = Array.from(set).map((cat) => ({
      key: cat.toLowerCase().replace(/\s+/g, "-"),
      label: cat,
    }));
    return [{ key: "all", label: "All Events" }, ...dynamic];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter(
      (p) =>
        p.SubcategoryName?.toLowerCase().replace(/\s+/g, "-") === activeTab
    );
  }, [projects, activeTab]);

  /* ---------------- Animation Variants ---------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Our Events" pageTitle="Upcoming Events" />

      <section className="relative py-24 lg:py-32 bg-white dark:bg-[#0f172a]! overflow-hidden">
        {/* Background decorations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[480px] h-[480px] bg-[#f86048]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-slate-200/40 dark:bg-slate-800/30! rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"
        />

        <div className="container relative mx-auto px-6 lg:max-w-7xl">
          {/* ---------- Header ---------- */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10 mb-20! lg:mb-28!">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="flex items-center gap-4 mb-5!"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "2.5rem" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="h-[2px] rounded-full"
                  style={{ backgroundColor: PRIMARY }}
                />
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="font-semibold uppercase tracking-[0.28em]! text-[11px]"
                  style={{ color: PRIMARY }}
                >
                  Our Events
                </motion.span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white! leading-[0.95]! tracking-tight!"
              >
                Upcoming
                <br />
                SSUS Events
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9,
                    type: "spring",
                    stiffness: 150,
                    damping: 10,
                  }}
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
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="max-w-[280px] text-slate-500 dark:text-slate-400! text-[15px] leading-relaxed! border-l-2! pl-5"
              style={{ borderColor: PRIMARY }}
            >
              Join us in making a meaningful impact across coastal communities
              through our upcoming events.
            </motion.p>
          </div>

          {/* ---------- Tabs ---------- */}
          {!loading && tabs.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16 overflow-x-auto pb-2 no-scrollbar"
            >
              <ul className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <li key={tab.key}>
                      <button
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                          isActive
                            ? "text-white shadow-lg shadow-[#f86048]/25"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                        }`}
                        style={isActive ? { backgroundColor: PRIMARY } : undefined}
                      >
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}

          {/* ---------- Loading ---------- */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-96 rounded-[1.75rem] bg-slate-100 dark:bg-slate-800 animate-pulse"
                />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            /* ---------- Empty State ---------- */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center py-24"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${PRIMARY}12` }}
              >
                <i
                  className="far fa-calendar-times text-3xl"
                  style={{ color: PRIMARY }}
                />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                No Events Found
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                There are no upcoming events at the moment. Please check back
                soon.
              </p>
            </motion.div>
          ) : (
            /* ---------- Events Grid ---------- */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((event, idx) => {
                const dateParts = parseDateParts(event.Date);
                const imgUrl = getImageUrl(event.Photo);
                const detailLink = `/upcoming-events/${encodeURIComponent(
                  event.ProjectID || ""
                )}`;
                const description =
                  stripHtml(event.Details) || event.Subtitle || "";

                return (
                  <motion.div
                    key={event.ProjectID || idx}
                    variants={cardVariants}
                    transition={{
                      duration: 0.6,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    whileHover={{
                      y: -6,
                      transition: {
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}
                    className="h-full"
                  >
                    <Link
                      href={detailLink}
                      className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#f86048]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b1120]! rounded-[1.75rem]"
                    >
                      <article className="relative h-full flex flex-col bg-white dark:bg-slate-900/80! border border-slate-100 dark:border-slate-800! rounded-[1.75rem] overflow-hidden shadow-sm shadow-slate-200/60 dark:shadow-none transition-all duration-500 hover:shadow-xl hover:shadow-[#f86048]/10 hover:border-[#f86048]/25">
                        {/* ---------- Image ---------- */}
                        <div className="relative aspect-[4/3] overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                          <motion.img
                            whileHover={{ scale: 1.08 }}
                            transition={{
                              duration: 0.7,
                              ease: [0.215, 0.61, 0.355, 1],
                            }}
                            src={imgUrl}
                            alt={event.Title}
                            className="w-full h-full object-cover"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                          {/* Shine effect */}
                          <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            whileHover={{ x: "200%", opacity: 0.12 }}
                            transition={{
                              duration: 0.8,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                          />

                          {/* Date Badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.5,
                              delay: 0.3 + idx * 0.08,
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}
                            className="absolute top-5 left-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-center px-3.5 py-2.5 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700"
                          >
                            <div
                              className="text-[10px] font-black uppercase tracking-wider leading-none"
                              style={{ color: PRIMARY }}
                            >
                              {dateParts.month}
                            </div>
                            <div className="text-xl font-black text-slate-900 dark:text-white leading-none mt-1">
                              {dateParts.day}
                            </div>
                          </motion.div>

                          {/* Category Tag */}
                          {(event.SubcategoryName || event.CategoryName) && (
                            <span
                              className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md"
                              style={{ backgroundColor: PRIMARY }}
                            >
                              {event.SubcategoryName || event.CategoryName}
                            </span>
                          )}

                          {/* Description on hover */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                          >
                            <p className="text-white/95 text-[13px] leading-relaxed! line-clamp-3">
                              {description}
                            </p>
                          </motion.div>
                        </div>

                        {/* ---------- Content ---------- */}
                        <div className="flex flex-1 flex-col justify-between p-6 lg:p-7">
                          <div>
                            {/* Meta */}
                            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                              <li className="flex items-center gap-1.5">
                                <i
                                  className="far fa-calendar-alt"
                                  style={{ color: PRIMARY }}
                                />
                                {dateParts.fullDate}
                              </li>
                              {event.Time && (
                                <li className="flex items-center gap-1.5">
                                  <i
                                    className="far fa-clock"
                                    style={{ color: PRIMARY }}
                                  />
                                  {event.Time}
                                </li>
                              )}
                            </ul>

                            {/* Title */}
                            <motion.h3
                              whileHover={{ color: PRIMARY }}
                              transition={{ duration: 0.3 }}
                              className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white! leading-snug! group-hover:text-[#f86048] transition-colors duration-300 line-clamp-2"
                            >
                              {event.Title}
                            </motion.h3>

                            {/* Location */}
                            {event.Location && (
                              <p className="mt-3 flex items-center gap-1.5 text-[12px] text-slate-500 dark:text-slate-400 font-medium">
                                <i
                                  className="far fa-map-marker-alt shrink-0"
                                  style={{ color: PRIMARY }}
                                />
                                <span className="truncate">
                                  {event.Location}
                                </span>
                              </p>
                            )}
                          </div>

                          {/* Explore Details */}
                          <div className="mt-6 flex items-center gap-3">
                            <motion.span
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                              className="text-[13px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-[#f86048] transition-colors duration-300"
                            >
                              Event Details
                            </motion.span>

                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700 group-hover:bg-[#f86048]/50 transition-colors duration-300" />

                            <motion.span
                              whileHover={{
                                scale: 1.1,
                                backgroundColor: PRIMARY,
                                color: "#ffffff",
                              }}
                              whileTap={{ scale: 0.95 }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-[#f86048] group-hover:text-white transition-all duration-300"
                            >
                              <motion.i
                                animate={{ x: [0, 3, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="far fa-arrow-right text-[11px]"
                              />
                            </motion.span>
                          </div>
                        </div>

                        {/* Hover border */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 rounded-[1.75rem] ring-2 ring-[#f86048]/20 pointer-events-none opacity-0 group-hover:opacity-100"
                        />
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </DanboxLayout>
  );
};

export default UpcomingEvents;