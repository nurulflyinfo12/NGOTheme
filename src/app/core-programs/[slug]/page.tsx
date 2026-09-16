"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import DanboxLayout from "@/layout/DanboxLayout";
import PageBanner from "@/components/PageBanner";
import { useProjects, ApiProject } from "@/hooks/useProjects";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

const CoreProgramDetails = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const { fetchProjectById } = useProjects();

  const [project, setProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug || slug === "undefined") return;

    const loadProject = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProjectById(decodeURIComponent(slug));

        if (!data) {
          setError("Project not found.");
          return;
        }

        setProject(data);
      } catch (err: any) {
        setError(err?.message || "Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug, fetchProjectById]);

  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <DanboxLayout header={1}>
        <PageBanner pageName="Our Programs" pageTitle="Program Details" />

        <section className="py-16! sm:py-20! lg:py-24! bg-white dark:bg-[#0f172a]!">
          <div className="container mx-auto px-4! sm:px-6! lg:max-w-7xl">
            <div className="animate-pulse">
              <div className="h-[240px] sm:h-[320px] md:h-[400px] rounded-2xl! sm:rounded-3xl! bg-slate-100 dark:bg-slate-800! mb-8! sm:mb-10!" />
              <div className="h-8! sm:h-10! w-2/3 rounded bg-slate-100 dark:bg-slate-800! mb-5!" />
              <div className="h-4! sm:h-5! w-full rounded bg-slate-100 dark:bg-slate-800! mb-3!" />
              <div className="h-4! sm:h-5! w-5/6 rounded bg-slate-100 dark:bg-slate-800!" />
            </div>
          </div>
        </section>
      </DanboxLayout>
    );
  }

  /* ---------------- Error State ---------------- */
  if (error || !project) {
    return (
      <DanboxLayout header={1}>
        <PageBanner pageName="Our Programs" pageTitle="Program Details" />

        <section className="py-16! sm:py-20! lg:py-24! bg-white dark:bg-[#0f172a]!">
          <div className="container mx-auto px-4! sm:px-6! lg:max-w-7xl text-center">
            <div className="py-12! sm:py-16! md:py-20!">
              <h1 className="text-2xl! sm:text-3xl! font-bold! text-slate-900! dark:text-white! mb-4!">
                Program Not Found
              </h1>
              <p className="text-sm! sm:text-base! text-slate-500! dark:text-slate-400!">
                {error || "The requested program could not be found."}
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

  const cleanDetails = project.Details?.replace(/<[^>]*>?/gm, "") || "";

  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName={project.CategoryName || "Our Programs"}
        pageTitle={project.Title || "Program Details"}
      />

      <section className="relative py-16! sm:py-20! lg:py-24! xl:py-28! bg-white dark:bg-[#0f172a]! overflow-hidden">
        {/* Decorative blur */}
        <div
          className="absolute top-0 right-0 w-[240px] sm:w-[360px] md:w-[480px] h-[240px] sm:h-[360px] md:h-[480px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          style={{ backgroundColor: `${PRIMARY}08` }}
        />

        <div className="container relative mx-auto px-4! sm:px-6! lg:max-w-7xl">
          {/* ---------- Hero Grid ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8! sm:gap-10! md:gap-12! lg:gap-16! xl:gap-20! items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-2xl! sm:rounded-3xl! lg:rounded-[2rem]! bg-slate-100 dark:bg-slate-800! shadow-xl"
            >
              <img
                src={image}
                alt={project.Title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Title & Subtitle */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="w-full"
            >
              <h1
                className="
                  font-black text-slate-900! dark:text-white!
                  leading-[1.05]! tracking-tight!
                  text-3xl!
                  sm:text-4xl!
                  md:text-5xl!
                  lg:text-5xl!
                  xl:text-6xl!
                  break-words
                "
              >
                {project.Title}
                <span style={{ color: PRIMARY }}>.</span>
              </h1>

              {project.Subtitle && (
                <p
                  className="
                    mt-4! sm:mt-5! md:mt-6!
                    font-medium text-slate-500! dark:text-slate-400!
                    leading-relaxed!
                    text-base!
                    sm:text-lg!
                    lg:text-lg!
                    xl:text-xl!
                  "
                >
                  {project.Subtitle}
                </p>
              )}
            </motion.div>
          </div>

          {/* ---------- Details Section ---------- */}
          {cleanDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-14! sm:mt-16! md:mt-20! lg:mt-24! xl:mt-28! max-w-4xl w-full"
            >
              {/* Accent line + label */}
              <div className="flex items-center gap-3! sm:gap-4! mb-5! sm:mb-6!">
                <div
                  className="h-[2px] w-8! sm:w-10! rounded-full shrink-0"
                  style={{ backgroundColor: PRIMARY }}
                />
                <span
                  className="text-[10px]! sm:text-[11px]! font-semibold! uppercase! tracking-[0.2em]! sm:tracking-[0.25em]!"
                  style={{ color: PRIMARY }}
                >
                  About This Program
                </span>
              </div>

              <h2
                className="
        font-black text-slate-900! dark:text-white!
        mb-6! sm:mb-8!
        text-2xl!
        sm:text-3xl!
        md:text-4xl!
        break-words
      "
              >
                Program Details
                <span style={{ color: PRIMARY }}>.</span>
              </h2>

              {/* Rich HTML content with dark mode overrides */}
              <div
                className="
        text-slate-600! dark:text-slate-300!
        text-sm!
        sm:text-base!
        md:text-lg!
        leading-relaxed
        w-full max-w-full overflow-hidden break-words

        /* Kill inline styles from rich-text editor */
        [&_*]:!bg-transparent
        [&_*]:[color:inherit]!
        [&_*]:max-w-full!
        [&_*]:break-words!

        [&_h1]:text-xl [&_h1]:sm:text-2xl [&_h1]:md:text-3xl [&_h1]:font-bold [&_h1]:text-slate-900! dark:[&_h1]:text-white! [&_h1]:mt-6! [&_h1]:mb-3!
        [&_h2]:text-lg [&_h2]:sm:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900! dark:[&_h2]:text-white! [&_h2]:mt-6! [&_h2]:mb-3!
        [&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:md:text-xl [&_h3]:font-bold [&_h3]:text-slate-900! dark:[&_h3]:text-white! [&_h3]:mt-5! [&_h3]:mb-2!
        [&_p]:mb-4!
        [&_ul]:list-disc [&_ul]:pl-5! [&_ul]:sm:pl-6! [&_ul]:mb-4! [&_ul]:space-y-1
        [&_ol]:list-decimal [&_ol]:pl-5! [&_ol]:sm:pl-6! [&_ol]:mb-4! [&_ol]:space-y-1
        [&_li]:text-slate-600! dark:[&_li]:text-slate-300!
        [&_strong]:text-slate-900! dark:[&_strong]:text-white! [&_strong]:font-bold
        [&_a]:text-[#f86048] [&_a]:underline [&_a]:break-all
        [&_img]:rounded-xl! [&_img]:sm:rounded-2xl! [&_img]:my-5! [&_img]:sm:my-6! [&_img]:w-full [&_img]:max-w-full! [&_img]:h-auto
        [&_blockquote]:border-l-4 [&_blockquote]:border-[#f86048] [&_blockquote]:pl-4! [&_blockquote]:sm:pl-5! [&_blockquote]:italic [&_blockquote]:my-5! [&_blockquote]:sm:my-6!
        
        /* Table fix for mobile */
        [&_table]:w-full [&_table]:max-w-full! [&_table]:my-5 [&_table]:text-sm [&_table]:sm:text-base
        [&_table]:block [&_table]:sm:table [&_table]:overflow-x-auto
        [&_table]:border-collapse
        [&_th]:border [&_th]:border-slate-300 [&_th]:px-2! [&_th]:py-1! [&_th]:sm:px-3! [&_th]:sm:py-2! [&_th]:text-left [&_th]:whitespace-nowrap
        [&_td]:border [&_td]:border-slate-300 [&_td]:px-2! [&_td]:py-1! [&_td]:sm:px-3! [&_td]:sm:py-2! [&_td]:break-words

        /* Pre/code blocks shouldn't overflow */
        [&_pre]:overflow-x-auto [&_pre]:max-w-full!
        [&_code]:break-words
      "
                dangerouslySetInnerHTML={{
                  __html: project.Details,
                }}
              />
            </motion.div>
          )}
        </div>
      </section>
    </DanboxLayout>
  );
};

export default CoreProgramDetails;
