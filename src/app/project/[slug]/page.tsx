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
  // Read slug param
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

  // Show skeleton loading while fetching
  if (loading) {
    return (
      <DanboxLayout header={1}>
        <PageBanner pageName="Program Details" pageTitle="Loading..." />
        <div className="container mx-auto px-6 py-20 max-w-5xl space-y-8 animate-pulse">
          <div className="h-96 w-full bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
          <div className="h-10 w-2/3 bg-slate-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-24 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
        </div>
      </DanboxLayout>
    );
  }

  // Only trigger 404 if loading is complete and no project was returned
  if (!project) {
    return notFound();
  }

  const imageSrc = project.Photo ? api.getFileUrl(project.Photo) : "";
  const categoryLabel = project.SubcategoryName || project.CategoryName || "Core Program";

  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName="Program Details"
        pageTitle={project.Title || "Program Overview"}
      />

      <section className="relative py-20 lg:py-28 bg-white dark:bg-[#0f172a]! overflow-hidden text-slate-900 dark:text-slate-100! transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f86048]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="mb-8">
            <Link
              href="/core-programs"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#f86048] dark:text-slate-400 dark:hover:text-[#f86048] transition-colors"
            >
              <ArrowLeft size={16} /> Back to Core Programs
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {imageSrc && (
              <div className="relative h-[360px] sm:h-[480px] w-full rounded-[2.5rem] overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-xl bg-slate-900">
                <img
                  src={imageSrc}
                  alt={project.Title || "Program Image"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-white bg-slate-950/70 backdrop-blur-md border border-white/10 shadow-lg inline-flex items-center gap-1.5">
                    <Tag size={12} style={{ color: PRIMARY }} />
                    {categoryLabel}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-8 h-[2px] rounded-full"
                  style={{ backgroundColor: PRIMARY }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: PRIMARY }}
                >
                  {project.CategoryName || "Strategic Program"}
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white! leading-tight tracking-tight">
                {project.Title}
              </h1>

              {project.Subtitle && (
                <p className="text-slate-600 dark:text-slate-300 text-lg font-medium leading-relaxed border-l-4 pl-4 py-1" style={{ borderColor: PRIMARY }}>
                  {project.Subtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
              {project.Location ? (
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">
                      Coverage Area
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {project.Location}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">
                      Status
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Active Pillar
                    </span>
                  </div>
                </div>
              )}

              {project.Date && (
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">
                      Execution Date
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {new Date(project.Date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              )}

              {project.Time && (
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY }}
                  >
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">
                      Schedule / Duration
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {project.Time}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {project.Details && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Program Overview & Impact
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: project.Details }}
                  className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed font-normal p-0!"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </DanboxLayout>
  );
}