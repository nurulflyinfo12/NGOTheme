"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import DanboxLayout from "@/layout/DanboxLayout";
import PageBanner from "@/components/PageBanner";
import { useProjects, ApiProject } from "@/hooks/useProjects";
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

const EventDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  const { fetchProjectById } = useProjects();

  const [project, setProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || id === "undefined") return;

    const loadProject = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProjectById(decodeURIComponent(id));
        if (!data) {
          setError("Event not found.");
          return;
        }
        setProject(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id, fetchProjectById]);

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <DanboxLayout header={1}>
        <PageBanner pageName="Our Events" pageTitle="Event Details" />

        <section className="py-24 bg-white dark:bg-[#0f172a]!">
          <div className="container mx-auto px-6 lg:max-w-7xl">
            <div className="animate-pulse">
              <div className="h-[400px] rounded-3xl bg-slate-100 dark:bg-slate-800! mb-10" />
              <div className="h-10 w-2/3 rounded bg-slate-100 dark:bg-slate-800! mb-5" />
              <div className="h-5 w-full rounded bg-slate-100 dark:bg-slate-800! mb-3" />
              <div className="h-5 w-5/6 rounded bg-slate-100 dark:bg-slate-800!" />
            </div>
          </div>
        </section>
      </DanboxLayout>
    );
  }

  /* ---------------- Error ---------------- */
  if (error || !project) {
    return (
      <DanboxLayout header={1}>
        <PageBanner pageName="Our Events" pageTitle="Event Details" />

        <section className="py-24 bg-white dark:bg-[#0f172a]!">
          <div className="container mx-auto px-6 lg:max-w-7xl text-center">
            <div className="py-20">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white! mb-4">
                Event Not Found
              </h1>
              <p className="text-slate-500 dark:text-slate-400!">
                {error || "The requested event could not be found."}
              </p>
            </div>
          </div>
        </section>
      </DanboxLayout>
    );
  }

  /* ---------------- Data ---------------- */
  const image = project.Photo
    ? api.getFileUrl(project.Photo)
    : "/assets/img/factbg.webp";

  const dateParts = parseDateParts(project.Date);

  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName={project.CategoryName || "Our Events"}
        pageTitle={project.Title || "Event Details"}
      />

      <section className="relative py-20 lg:py-28 bg-white dark:bg-[#0f172a]! overflow-hidden">
        {/* Decorative blobs — use Tailwind classes, NOT inline styles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[480px] h-[480px] bg-[#f86048]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-slate-200/40 dark:bg-slate-800/30! rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"
        />

        <div className="container relative mx-auto px-6 lg:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image with date badge */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800! shadow-xl"
            >
              <img
                src={image}
                alt={project.Title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />

              {/* Floating date badge */}
              <div className="absolute top-6 left-6 bg-white/95 dark:bg-slate-900/95! backdrop-blur-md text-center px-4 py-3 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700!">
                <div
                  className="text-[11px] font-black uppercase tracking-wider leading-none"
                  style={{ color: PRIMARY }}
                >
                  {dateParts.month}
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white! leading-none mt-1">
                  {dateParts.day}
                </div>
              </div>
            </motion.div>

            {/* Title & Meta */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white! leading-[1.05] tracking-tight">
                {project.Title}
                <span style={{ color: PRIMARY }}>.</span>
              </h1>

              {project.Subtitle && (
                <p className="mt-6 text-lg lg:text-xl font-medium text-slate-500 dark:text-slate-400! leading-relaxed">
                  {project.Subtitle}
                </p>
              )}

              {/* Quick info pills */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY }}
                >
                  <i className="far fa-calendar-alt" />
                  {dateParts.fullDate}
                </div>

                {project.Time && (
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY }}
                  >
                    <i className="far fa-clock" />
                    {project.Time}
                  </div>
                )}

                {project.Location && (
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${PRIMARY}12`, color: PRIMARY }}
                  >
                    <i className="far fa-map-marker-alt" />
                    {project.Location}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Details Section */}
          {project.Details && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-20 lg:mt-28 max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-[2px] w-10 rounded-full"
                  style={{ backgroundColor: PRIMARY }}
                />
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                  style={{ color: PRIMARY }}
                >
                  About This Event
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white! mb-8">
                Event Details
                <span style={{ color: PRIMARY }}>.</span>
              </h2>

              <div
                className="
    text-slate-600 dark:text-slate-300!
    text-base leading-relaxed

    /* Force backgrounds transparent in dark mode */
    [&_*]:!bg-transparent
    dark:[&_*]:!bg-transparent

    /* Kill inline color/styles inside HTML */
    [&_*]:[color:inherit]!
    [&_*]:[background-color:transparent]!

    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-900 dark:[&_h1]:text-white! [&_h1]:mt-6 [&_h1]:mb-3
    [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white! [&_h2]:mt-6 [&_h2]:mb-3
    [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 dark:[&_h3]:text-white! [&_h3]:mt-5 [&_h3]:mb-2
    [&_p]:mb-4
    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
    [&_li]:text-slate-600 dark:[&_li]:text-slate-300!
    [&_strong]:text-slate-900 dark:[&_strong]:text-white! [&_strong]:font-bold
    [&_a]:text-[#f86048] [&_a]:underline
    [&_img]:rounded-2xl [&_img]:my-6 [&_img]:w-full [&_img]:h-auto
    [&_blockquote]:border-l-4 [&_blockquote]:border-[#f86048] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:my-6
  "
                dangerouslySetInnerHTML={{ __html: project.Details }}
              />
            </motion.div>
          )}
        </div>
      </section>
    </DanboxLayout>
  );
};

export default EventDetails;
