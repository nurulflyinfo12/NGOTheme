"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

const parseDateParts = (dateString?: string) => {
  if (!dateString) return { day: "15", month: "Mar", fullDate: "15 Mar 2026" };
  const d = new Date(dateString);
  if (isNaN(d.getTime()))
    return { day: "15", month: "Mar", fullDate: dateString };

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

export const Event1 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { projects, loading, fetchProjectsByCategorySlug, fetchProjects } =
    useProjects();

  useEffect(() => {
    async function loadEvents() {
      const res = await fetchProjectsByCategorySlug("upcoming-events");
      if (!res || res.length === 0) {
        await fetchProjects();
      }
    }
    loadEvents();
  }, [fetchProjectsByCategorySlug, fetchProjects]);

  const cardAnimations = [
    "translate-y-[-60px] opacity-0",
    "translate-y-[-60px] opacity-0",
    "translate-y-[60px] opacity-0",
    "translate-y-[60px] opacity-0",
  ];
  const cardDelays = ["0ms", "200ms", "300ms", "450ms"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-slate-50/50 dark:bg-[#0f172a]! py-16 lg:py-24 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:max-w-7xl">
        {/* ---------- Header ---------- */}
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <span
            className="inline-flex items-center gap-2 font-black tracking-[0.25em] uppercase text-xs"
            style={{ color: PRIMARY }}
          >
            <i className="far fa-heart" />
            OUR EVENTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white! mt-2 leading-tight tracking-tight">
            Upcoming SSUS Events
            <span style={{ color: PRIMARY }}>.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400! mt-3 text-sm sm:text-base leading-relaxed">
            Join us in making a meaningful impact across coastal communities
          </p>
        </div>

        {/* ---------- Loading ---------- */}
        {loading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 animate-pulse">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-64 rounded-3xl bg-slate-200/60 dark:bg-slate-800/50! border border-slate-200 dark:border-slate-800!"
              />
            ))}
          </div>
        ) : (
          /* ---------- Cards ---------- */
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, i) => {
              const dateParts = parseDateParts(project.Date);
              const imgUrl = getImageUrl(project.Photo);
              const detailLink = `/upcoming-events/${project.ProjectID}`;
              const description =
                stripHtml(project.Details) || project.Subtitle || "";

              return (
                <div
                  key={project.ProjectID || i}
                  className={`group bg-white dark:bg-slate-900/90! rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800! hover:border-[#f86048]/40 shadow-sm hover:shadow-xl hover:shadow-[#f86048]/5 flex flex-col sm:flex-row transition-all duration-700 ${
                    isVisible
                      ? "translate-y-0 translate-x-0 opacity-100"
                      : cardAnimations[i % cardAnimations.length]
                  }`}
                  style={{
                    transitionDelay: cardDelays[i % cardDelays.length],
                  }}
                >
                  {/* ---------- Image ---------- */}
                  <div className="relative w-full sm:w-5/12 h-56 sm:h-auto shrink-0 overflow-hidden bg-slate-900 dark:bg-slate-950!">
                    <Image
                      src={imgUrl}
                      alt={project.Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                    {/* Date badge */}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90! backdrop-blur-md text-center px-3 py-2 rounded-2xl shadow-md border border-white/20 dark:border-slate-700!">
                      <div
                        className="text-[10px] font-black uppercase tracking-wider leading-none"
                        style={{ color: PRIMARY }}
                      >
                        {dateParts.month}
                      </div>
                      <div className="text-lg font-black text-slate-900 dark:text-white! leading-none mt-1">
                        {dateParts.day}
                      </div>
                    </div>
                  </div>

                  {/* ---------- Content ---------- */}
                  <div className="w-full sm:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400! mb-3 font-medium">
                        {project.Time && (
                          <div className="flex items-center gap-1.5">
                            <i
                              className="far fa-clock text-xs"
                              style={{ color: PRIMARY }}
                            />
                            <span>{project.Time}</span>
                          </div>
                        )}
                        {project.Location && (
                          <div className="flex items-center gap-1.5 min-w-0">
                            <i
                              className="far fa-map-marker-alt text-xs shrink-0"
                              style={{ color: PRIMARY }}
                            />
                            <span className="truncate">{project.Location}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold mb-2 leading-snug line-clamp-2">
                        <Link
                          href={detailLink}
                          className="text-slate-900 dark:text-white! hover:text-[#f86048] transition-colors"
                        >
                          {project.Title}
                        </Link>
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-400! text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                        {description}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800!">
                      <Link
                        href={detailLink}
                        className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:gap-3"
                        style={{ color: PRIMARY }}
                      >
                        Event Details
                        <i className="far fa-long-arrow-right text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
