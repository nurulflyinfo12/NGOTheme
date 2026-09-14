"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, ArrowLeft, Tag, ShieldCheck } from "lucide-react";

import DanboxLayout from "@/layout/DanboxLayout";
import PageBanner from "@/components/PageBanner";
import { useProjects, ApiProject } from "@/hooks/useProjects";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

export default function CoreProgramDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { fetchProjectById } = useProjects();
  const [project, setProject] = useState<ApiProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (slug) {
      setLoading(true);
      fetchProjectById(slug)
        .then((data) => {
          if (isMounted) {
            setProject(data || null);
          }
        })
        .catch(() => {
          if (isMounted) setProject(null);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [slug, fetchProjectById]);

  /* ---------------- Loading Skeleton ---------------- */
  if (loading) {
    return (
      <DanboxLayout header={1}>
        <PageBanner pageName="Program Details" pageTitle="Loading..." />
        <div className="container mx-auto px-4! sm:px-6! py-16! sm:py-20! max-w-5xl space-y-6! sm:space-y-8! animate-pulse">
          <div className="h-56! sm:h-72! md:h-80! lg:h-96! w-full bg-slate-100 dark:bg-slate-800! rounded-2xl! sm:rounded-[2rem]! lg:rounded-[2.5rem]!" />
          <div className="h-8! sm:h-10! w-2/3 bg-slate-200 dark:bg-slate-700! rounded-xl" />
          <div className="h-20! sm:h-24! w-full bg-slate-100 dark:bg-slate-800! rounded-xl" />
        </div>
      </DanboxLayout>
    );
  }

  if (!project) {
    return notFound();
  }

  const imageSrc = project.Photo ? api.getFileUrl(project.Photo) : "";
  const categoryLabel =
    project.SubcategoryName || project.CategoryName || "Core Program";

  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName="Program Details"
        pageTitle={project.Title || "Program Overview"}
      />

      <section className="relative py-16! sm:py-20! lg:py-24! xl:py-28! bg-white dark:bg-[#0f172a]! overflow-hidden text-slate-900! dark:text-slate-100! transition-colors duration-300">
        {/* Decorative blobs — responsive size */}
        <div className="absolute top-0 right-0 w-[280px]! sm:w-[380px]! md:w-[500px]! h-[280px]! sm:h-[380px]! md:h-[500px]! bg-[#f86048]/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[220px]! sm:w-[320px]! md:w-[400px]! h-[220px]! sm:h-[320px]! md:h-[400px]! bg-indigo-500/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4! sm:px-6! max-w-5xl relative z-10">
          

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8! sm:space-y-10! lg:space-y-12!"
          >
            {/* ---------- Hero Image ---------- */}
            {imageSrc && (
              <div className="relative h-56! sm:h-72! md:h-80! lg:h-[420px]! xl:h-[480px]! w-full rounded-2xl! sm:rounded-[2rem]! lg:rounded-[2.5rem]! overflow-hidden border border-slate-200/80 dark:border-slate-800/80! shadow-xl bg-slate-900 dark:bg-slate-950!">
                <img
                  src={imageSrc}
                  alt={project.Title || "Program Image"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Category tag — responsive position */}
                <div className="absolute top-4! left-4! sm:top-6! sm:left-6! z-20">
                  <span className="
                    px-3! py-1!
                    sm:px-4! sm:py-1.5!
                    rounded-full
                    text-[10px]! sm:text-xs!
                    font-extrabold! uppercase! tracking-widest!
                    text-white!
                    bg-slate-950/70! backdrop-blur-md
                    border border-white/10!
                    shadow-lg
                    inline-flex items-center gap-1.5
                  ">
                    <Tag size={10} className="sm:hidden!" style={{ color: PRIMARY }} />
                    <Tag size={12} className="hidden! sm:inline-block!" style={{ color: PRIMARY }} />
                    {categoryLabel}
                  </span>
                </div>
              </div>
            )}

            {/* ---------- Title Block ---------- */}
            <div className="space-y-3! sm:space-y-4!">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2.5! sm:gap-3!"
              >
                <div
                  className="w-6! sm:w-8! h-[2px] rounded-full shrink-0"
                  style={{ backgroundColor: PRIMARY }}
                />
                <span
                  className="text-[10px]! sm:text-xs! font-bold! uppercase! tracking-[0.2em]! sm:tracking-[0.25em]!"
                  style={{ color: PRIMARY }}
                >
                  {project.CategoryName || "Strategic Program"}
                </span>
              </motion.div>

              <h1 className="
                font-black
                text-slate-900! dark:text-white!
                leading-[1.1]! sm:leading-tight!
                tracking-tight!
                break-words
                text-2xl!
                sm:text-3xl!
                md:text-4xl!
                lg:text-5xl!
              ">
                {project.Title}
              </h1>

              {project.Subtitle && (
                <p
                  className="
                    text-slate-600! dark:text-slate-300!
                    font-medium leading-relaxed!
                    border-l-4 pl-3! sm:pl-4! py-1
                    text-base!
                    sm:text-lg!
                  "
                  style={{ borderColor: PRIMARY }}
                >
                  {project.Subtitle}
                </p>
              )}
            </div>

            {/* ---------- Rich HTML Details ---------- */}
            {project.Details && (
              <div className="space-y-3! sm:space-y-4!">
                <h3 className="text-lg! sm:text-xl! font-bold! text-slate-900! dark:text-white!">
                  Program Overview &amp; Impact
                </h3>

                <div
                  dangerouslySetInnerHTML={{ __html: project.Details }}
                  className="
                    max-w-none
                    text-slate-700! dark:text-slate-300!
                    leading-relaxed
                    font-normal
                    p-0!
                    text-sm!
                    sm:text-base!
                    md:text-lg!

                    /* Kill inline styles from rich-text editor */
                    [&_*]:!bg-transparent
                    [&_*]:[color:inherit]!

                    [&_h1]:text-xl! [&_h1]:sm:text-2xl! [&_h1]:md:text-3xl! [&_h1]:font-bold! [&_h1]:text-slate-900! dark:[&_h1]:text-white! [&_h1]:mt-6! [&_h1]:mb-3!
                    [&_h2]:text-lg! [&_h2]:sm:text-xl! [&_h2]:md:text-2xl! [&_h2]:font-bold! [&_h2]:text-slate-900! dark:[&_h2]:text-white! [&_h2]:mt-6! [&_h2]:mb-3!
                    [&_h3]:text-base! [&_h3]:sm:text-lg! [&_h3]:md:text-xl! [&_h3]:font-bold! [&_h3]:text-slate-900! dark:[&_h3]:text-white! [&_h3]:mt-5! [&_h3]:mb-2!
                    [&_p]:mb-4!
                    [&_ul]:list-disc [&_ul]:pl-5! [&_ul]:sm:pl-6! [&_ul]:mb-4! [&_ul]:space-y-1
                    [&_ol]:list-decimal [&_ol]:pl-5! [&_ol]:sm:pl-6! [&_ol]:mb-4! [&_ol]:space-y-1
                    [&_li]:text-slate-700! dark:[&_li]:text-slate-300!
                    [&_strong]:text-slate-900! dark:[&_strong]:text-white! [&_strong]:font-bold!
                    [&_a]:text-[#f86048] [&_a]:underline
                    [&_img]:rounded-xl! [&_img]:sm:rounded-2xl! [&_img]:my-5! [&_img]:sm:my-6! [&_img]:w-full [&_img]:h-auto
                    [&_blockquote]:border-l-4 [&_blockquote]:border-[#f86048] [&_blockquote]:pl-4! [&_blockquote]:sm:pl-5! [&_blockquote]:italic [&_blockquote]:my-5! [&_blockquote]:sm:my-6!
                    [&_table]:w-full [&_table]:my-5 [&_table]:text-sm! [&_table]:sm:text-base!
                    [&_table]:block [&_table]:sm:table [&_table]:overflow-x-auto
                  "
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </DanboxLayout>
  );
}