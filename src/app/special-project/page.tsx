"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import DanboxLayout from "@/layout/DanboxLayout";
import PageBanner from "@/components/PageBanner";
import { useProjects, ApiProject } from "@/hooks/useProjects";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

interface SpecialProgramsProps {
  categorySlug?: string;
}

const SpecialPrograms = ({
  categorySlug = "special-program",
}: SpecialProgramsProps) => {
  const { projects, loading, fetchProjectsByCategorySlug, fetchProjects } =
    useProjects();

  useEffect(() => {
    async function loadData() {
      const res = await fetchProjectsByCategorySlug(categorySlug);

      if (!res || res.length === 0) {
        await fetchProjects();
      }
    }
    loadData();
  }, [categorySlug, fetchProjectsByCategorySlug, fetchProjects]);

  const groupedProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const accents = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
    const groupsMap: { [key: string]: ApiProject[] } = {};

    projects.forEach((proj) => {
      const groupKey =
        proj.SubcategoryName || proj.CategoryName || "Core Program Initiatives";
      if (!groupsMap[groupKey]) {
        groupsMap[groupKey] = [];
      }
      groupsMap[groupKey].push(proj);
    });

    return Object.keys(groupsMap).map((title, idx) => {
      const firstItemWithPhoto = groupsMap[title].find((item) => item.Photo);
      return {
        title,
        accent: accents[idx % accents.length],
        heroPhoto: firstItemWithPhoto?.Photo
          ? api.getFileUrl(firstItemWithPhoto.Photo)
          : "/assets/img/factbg.webp",
        items: groupsMap[title],
      };
    });
  }, [projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40, y: 20 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName="Strategic Initiatives"
        pageTitle="Specialized Impact"
      />

      <section className="relative py-24! lg:py-32! bg-white dark:bg-[#0f172a]! overflow-hidden">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end! mb-24 lg:mb-32! gap-10">
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
                className="flex items-center gap-4 mb-6"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="h-[2px]!"
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
                  className="font-black! uppercase tracking-[0.3em]! text-[10px]!"
                  style={{ color: PRIMARY }}
                >
                  Our Mission in Action
                </motion.span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="text-4xl sm:text-5xl lg:text-7xl font-black! text-slate-900! dark:text-white! leading-[0.9]! tracking-wide!"
              >
                Holistic Growth for Coastal Resilience
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
              className="max-w-xs text-slate-500! dark:text-slate-400! text-sm! leading-relaxed! italic! border-l-2! pl-6!"
              style={{ borderColor: PRIMARY }}
            >
              Targeted interventions designed to bridge the gap in healthcare,
              education, and disaster management.
            </motion.p>
          </div>

          {/* Loading Skeletons */}
          {loading ? (
            <div className="space-y-12 animate-pulse">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="h-96 w-full rounded-[2.5rem] bg-slate-100 dark:bg-slate-800!"
                />
              ))}
            </div>
          ) : groupedProjects.length === 0 ? (
            <div className="text-center py-20 text-slate-400 dark:text-slate-500! font-medium">
              No special program initiatives found.
            </div>
          ) : (
            /* Grouped Section Layout */
            <div className="space-y-24 lg:space-y-40!">
              {groupedProjects.map((group, idx) => (
                <div
                  key={group.title || idx}
                  className={`flex flex-col ${
                    idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-12 lg:gap-24 items-center`}
                >
                  {/* Left Visual Image Card */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      x: idx % 2 === 0 ? -60 : 60,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                    }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className="w-full lg:w-1/2 relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="aspect-[4/5] rounded-[2rem] lg:rounded-[4rem]! overflow-hidden shadow-2xl relative group bg-slate-900 dark:bg-slate-950!"
                    >
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          duration: 1,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        src={group.heroPhoto}
                        alt={group.title}
                        className="w-full h-full object-cover scale-110 group-hover:scale-100!"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t! from-slate-900/80 via-transparent to-transparent" />

                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.6,
                          ease: "easeOut",
                        }}
                        className="absolute top-4 left-4 lg:top-10 lg:left-10"
                      >
                        <motion.span
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255,255,255,0.2)",
                          }}
                          className="px-6! py-2! bg-white/10! backdrop-blur-xl! border! border-white/20! rounded-2xl! text-[10px]! font-black text-white! uppercase! tracking-[0.3em]! inline-block"
                        >
                          Section 0{idx + 1}
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Right Content Column */}
                  <div className="w-full lg:w-1/2! space-y-8 lg:space-y-12!">
                    {/* Section Main Category Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.7,
                        delay: 0.3,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                    >
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black! text-slate-900! dark:text-white! tracking-wide!">
                        {group.title}
                        <span className="ml-2 text-slate-300 dark:text-slate-700!">
                          /
                        </span>
                      </h3>
                    </motion.div>

                    {/* Outer Card Container */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className="p-8 sm:p-10 bg-slate-50 dark:bg-slate-900/60! rounded-[3rem] border border-slate-100 dark:border-slate-800! space-y-8"
                    >
                      {group.items.map((item, i) => {
                        const itemPhoto = item.Photo
                          ? api.getFileUrl(item.Photo)
                          : "";

                        return (
                          <motion.div
                            key={item.ProjectID || i}
                            variants={itemVariants}
                            className="group flex flex-col sm:flex-row items-start gap-5 transition-all"
                          >
                            {/* Info Area */}
                            <div className="flex-1 min-w-0 space-y-1">
                              {/* Title */}
                              <h4 className="font-extrabold text-slate-900 dark:text-white! text-lg sm:text-xl leading-snug group-hover:text-[#f86048] transition-colors">
                                {item.Title}
                              </h4>

                              {/* Subtitle */}
                              {item.Subtitle && (
                                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300!">
                                  {item.Subtitle}
                                </p>
                              )}

                              {/* HTML Details Description */}
                              {item.Details && (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.Details,
                                  }}
                                  className="
                                    text-xs text-slate-500 dark:text-slate-400!
                                    leading-relaxed pt-1

                                    /* Kill inline styles from rich-text editor */
                                    [&_*]:!bg-transparent
                                    [&_*]:[color:inherit]!

                                    [&_h1]:text-sm [&_h1]:font-bold [&_h1]:text-slate-900 dark:[&_h1]:text-white! [&_h1]:mt-3 [&_h1]:mb-2
                                    [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white! [&_h2]:mt-3 [&_h2]:mb-2
                                    [&_h3]:text-xs [&_h3]:font-bold [&_h3]:text-slate-900 dark:[&_h3]:text-white! [&_h3]:mt-2 [&_h3]:mb-1
                                    [&_p]:mb-2
                                    [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_ul]:space-y-0.5
                                    [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2 [&_ol]:space-y-0.5
                                    [&_li]:text-slate-500 dark:[&_li]:text-slate-400!
                                    [&_strong]:text-slate-900 dark:[&_strong]:text-white! [&_strong]:font-bold
                                    [&_a]:text-[#f86048] [&_a]:underline
                                  "
                                />
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </DanboxLayout>
  );
};

export default SpecialPrograms;