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
      }
      {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug, fetchProjectById]);

  if (loading) {
    return (
      <DanboxLayout header={1}>
        <PageBanner pageName="Our Programs" pageTitle="Program Details" />

        <section className="py-24 bg-white dark:bg-[#0f172a]">
          <div className="container mx-auto px-6 lg:max-w-7xl">
            <div className="animate-pulse">
              <div className="h-[400px] rounded-3xl bg-slate-100 dark:bg-slate-800 mb-10" />
              <div className="h-10 w-2/3 rounded bg-slate-100 dark:bg-slate-800 mb-5" />
              <div className="h-5 w-full rounded bg-slate-100 dark:bg-slate-800 mb-3" />
              <div className="h-5 w-5/6 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
        </section>
      </DanboxLayout>
    );
  }

  if (error || !project) {
    return (
      <DanboxLayout header={1}>
        <PageBanner pageName="Our Programs" pageTitle="Program Details" />

        <section className="py-24 bg-white dark:bg-[#0f172a]">
          <div className="container mx-auto px-6 lg:max-w-7xl text-center">
            <div className="py-20">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Program Not Found
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {error || "The requested program could not be found."}
              </p>
            </div>
          </div>
        </section>
      </DanboxLayout>
    );
  }

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

      <section className="relative py-20 lg:py-28 bg-white dark:bg-[#0f172a] overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          style={{ backgroundColor: `${PRIMARY}08` }}
        />

        <div className="container relative mx-auto px-6 lg:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800 shadow-xl"
            >
              <img
                src={image}
                alt={project.Title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight">
                {project.Title}
                <span style={{ color: PRIMARY }}>.</span>
              </h1>

              {project.Subtitle && (
                <p className="mt-6 text-lg lg:text-xl font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  {project.Subtitle}
                </p>
              )}
            </motion.div>
          </div>

          {cleanDetails && (
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
                  About This Program
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-8">
                Program Details
                <span style={{ color: PRIMARY }}>.</span>
              </h2>

              <div
                className="prose prose-lg max-w-none dark:prose-invert text-slate-600 dark:text-slate-300"
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
