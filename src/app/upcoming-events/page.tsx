"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderProps } from "@/utility/sliderProps";
import { useProjects, ApiProject } from "@/hooks/useProjects";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

// Helper: Format ISO Date into Month & Day
const parseDateParts = (dateString?: string) => {
  if (!dateString) return { day: "15", month: "Mar", fullDate: "15 Mar 2026" };
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return { day: "15", month: "Mar", fullDate: dateString };

  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleDateString("en-US", { month: "short" });
  const year = d.getFullYear();
  return { day, month, fullDate: `${day} ${month} ${year}` };
};

// Helper: Clean HTML tags for preview text
const stripHtml = (html?: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ");
};

// Helper: Image URL resolution
const getImageUrl = (photo?: string) => {
  if (!photo) return "/assets/img/factbg.webp";
  if (photo.startsWith("http")) return photo;
  return api.getFileUrl(photo);
};

/* ============================================================================
   Event1 Component
   ============================================================================ */
export const Event1 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { projects, loading, fetchProjectsByCategorySlug, fetchProjects } = useProjects();

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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-slate-50/50 dark:bg-[#0f172a] py-16 lg:py-24 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:max-w-7xl">
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <span
            className="inline-flex items-center gap-2 font-black tracking-[0.25em] uppercase text-xs"
            style={{ color: PRIMARY }}
          >
            <i className="far fa-heart" />
            OUR EVENTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mt-2 leading-tight tracking-tight">
            Upcoming SSUS Events
            <span style={{ color: PRIMARY }}>.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Join us in making a meaningful impact across coastal communities
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 animate-pulse">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-64 rounded-3xl bg-slate-200/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"
              />
            ))}
          </div>
        ) : (
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
                  className={`group bg-white dark:bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:border-[#f86048]/40 shadow-sm hover:shadow-xl hover:shadow-[#f86048]/5 flex flex-col sm:flex-row transition-all duration-700 ${
                    isVisible
                      ? "translate-y-0 translate-x-0 opacity-100"
                      : cardAnimations[i % cardAnimations.length]
                  }`}
                  style={{
                    transitionDelay: cardDelays[i % cardDelays.length],
                  }}
                >
                  <div className="relative w-full sm:w-5/12 h-56 sm:h-auto shrink-0 overflow-hidden bg-slate-900">
                    <Image
                      src={imgUrl}
                      alt={project.Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-center px-3 py-2 rounded-2xl shadow-md border border-white/20 dark:border-slate-700">
                      <div
                        className="text-[10px] font-black uppercase tracking-wider leading-none"
                        style={{ color: PRIMARY }}
                      >
                        {dateParts.month}
                      </div>
                      <div className="text-lg font-black text-slate-900 dark:text-white leading-none mt-1">
                        {dateParts.day}
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
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

                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2 leading-snug line-clamp-2">
                        <Link
                          href={detailLink}
                          className="hover:text-[#f86048] transition-colors"
                        >
                          {project.Title}
                        </Link>
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                        {description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
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

/* ============================================================================
   Event2 Component
   ============================================================================ */
export const Event2 = () => {
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

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-[#0f172a]">
      <div className="container mx-auto px-4 sm:px-6 lg:max-w-7xl">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <span
            className="sub-title uppercase tracking-[0.25em] font-black text-xs inline-flex items-center gap-2 mb-2"
            style={{ color: PRIMARY }}
          >
            <i className="far fa-heart" /> Our Events
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            Be Ready for Our Upcoming <br /> Charity Events
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-72 rounded-3xl bg-slate-100 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((event, index) => {
              const dateParts = parseDateParts(event.Date);
              const imgUrl = getImageUrl(event.Photo);
              const detailLink = `/upcoming-events/${event.ProjectID}`;
              const description =
                stripHtml(event.Details) || event.Subtitle || "";

              return (
                <div
                  key={event.ProjectID || index}
                  className="group bg-slate-50 dark:bg-slate-900/70 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 hover:border-[#f86048]/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <Image
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      src={imgUrl}
                      alt={event.Title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <ul className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                        <li className="flex items-center gap-1.5">
                          <i
                            className="fal fa-calendar-alt"
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
                        {event.Location && (
                          <li className="flex items-center gap-1.5">
                            <i
                              className="far fa-map-marker-alt"
                              style={{ color: PRIMARY }}
                            />
                            {event.Location}
                          </li>
                        )}
                      </ul>

                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
                        <Link
                          href={detailLink}
                          className="hover:text-[#f86048] transition-colors"
                        >
                          {event.Title}
                        </Link>
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    <div>
                      <Link
                        href={detailLink}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#f86048] text-[#f86048] font-bold text-xs uppercase tracking-wider hover:bg-[#f86048] hover:text-white transition-all shadow-sm"
                      >
                        <i className="far fa-heart text-xs" /> Join Now
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

/* ============================================================================
   Event3 Component
   ============================================================================ */
export const Event3 = () => {
  const { projects, fetchProjectsByCategorySlug, fetchProjects } =
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

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/60 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:max-w-7xl">
        <Swiper {...sliderProps.event} className="swiper event-slider">
          <div className="swiper-wrapper">
            {projects.map((event, index) => {
              const dateParts = parseDateParts(event.Date);
              const imgUrl = getImageUrl(event.Photo);
              const detailLink = `/upcoming-events/${event.ProjectID}`;

              return (
                <SwiperSlide key={event.ProjectID || index} className="swiper-slide">
                  <div className="group rounded-3xl overflow-hidden shadow-lg aspect-square relative flex items-end p-6 bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <Image
                      src={imgUrl}
                      alt={event.Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                    <div className="relative z-10 text-white w-full">
                      <div className="flex items-center gap-4">
                        <div className="bg-[#f86048] text-[#ffffff] p-2.5 rounded-2xl text-center min-w-[54px] shadow-md shrink-0">
                          <span className="block text-xl font-black leading-none">
                            {dateParts.day}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider leading-none mt-1 block">
                            {dateParts.month}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-black tracking-widest text-[#f86048] block mb-0.5">
                            {event.SubcategoryName || event.CategoryName || "Event"}
                          </span>
                          <h4 className="text-base font-bold leading-snug line-clamp-2">
                            <Link
                              href={detailLink}
                              className="hover:underline hover:text-white"
                            >
                              {event.Title}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

/* ============================================================================
   EventPage Component (Default Export)
   ============================================================================ */
export const EventPage = () => {
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

  const tabs = useMemo(() => {
    const categoriesSet = new Set<string>();
    projects.forEach((p) => {
      if (p.SubcategoryName) categoriesSet.add(p.SubcategoryName);
    });

    const dynamicTabs = Array.from(categoriesSet).map((cat) => ({
      key: cat.toLowerCase().replace(/\s+/g, "-"),
      label: cat,
    }));

    return [{ key: "all", label: "All Events" }, ...dynamicTabs];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter(
      (p) =>
        p.SubcategoryName?.toLowerCase().replace(/\s+/g, "-") === activeTab
    );
  }, [projects, activeTab]);

  return (
    <section className="py-16 lg:py-24 bg-white dark:bg-[#0f172a]">
      <div className="container mx-auto px-4 sm:px-6 lg:max-w-7xl">
        <Tab.Container
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || "all")}
        >
          <div className="mb-10 overflow-x-auto pb-2 no-scrollbar">
            <Nav as="ul" className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <Nav.Item key={tab.key} as="li">
                    <button
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                        isActive
                          ? "bg-[#f86048] text-white shadow-lg shadow-[#f86048]/25"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-[#ffffff]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  </Nav.Item>
                );
              })}
            </Nav>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-80 rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800"
                />
              ))}
            </div>
          ) : (
            <Tab.Content>
              <Tab.Pane eventKey={activeTab}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((event, index) => {
                    const imgUrl = getImageUrl(event.Photo);
                    const dateParts = parseDateParts(event.Date);
                    const detailLink = `/upcoming-events/${event.ProjectID}`;
                    const description =
                      stripHtml(event.Details) || event.Subtitle || "";

                    return (
                      <div
                        key={event.ProjectID || index}
                        className="group bg-white dark:bg-slate-900/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-800 p-5 flex flex-col justify-between hover:border-[#f86048]/40 transition-all duration-300"
                      >
                        <div>
                          <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-900">
                            <Image
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              src={imgUrl}
                              alt={event.Title}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#f86048] mb-1">
                            <i className="far fa-calendar-alt" />
                            <span>{dateParts.fullDate}</span>
                          </div>
                          <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 mb-2 leading-snug">
                            <Link
                              href={detailLink}
                              className="hover:text-[#f86048] transition-colors"
                            >
                              {event.Title}
                            </Link>
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                            {description}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                          <Link
                            href={detailLink}
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#f86048] hover:gap-3 transition-all"
                          >
                            Event Details <i className="far fa-long-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Tab.Pane>
            </Tab.Content>
          )}
        </Tab.Container>
      </div>
    </section>
  );
};

// Next.js App Router Page Default Export
export default EventPage;