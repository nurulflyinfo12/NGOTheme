"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

interface CoreProgramsProps {
  categorySlug?: string;
}

const CorePrograms = ({ categorySlug = "check" }: CoreProgramsProps) => {
  const {
    projects,
    loading,
    fetchProjectsByCategorySlug,
    fetchProjects,
  } = useProjects();

  useEffect(() => {
    if (categorySlug) {
      fetchProjectsByCategorySlug(categorySlug);
    } else {
      fetchProjects();
    }
  }, [
    categorySlug,
    fetchProjectsByCategorySlug,
    fetchProjects,
  ]);

  /**
   * Prepare projects for display.
   *
   * IMPORTANT:
   * The details API requires ProjectID:
   *
   * GET /Public/GetProjectById?projectId=...
   *
   * Therefore, the URL must use ProjectID rather than
   * CategorySlug or SubCategorySlug.
   */
  const programs = projects
    .filter((item) => item.ProjectID)
    .map((item) => {
      return {
        projectId: item.ProjectID as string,
        name: item.Title || "Program",
        desc:
          item.Subtitle ||
          item.Details?.replace(/<[^>]*>?/gm, "") ||
          "Program details available",
        image: item.Photo
          ? api.getFileUrl(item.Photo)
          : "/assets/img/factbg.webp",
      };
    });

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName="Our Programs"
        pageTitle="Empowering Communities"
      />

      <section className="relative py-24 lg:py-32 bg-white dark:bg-[#0f172a]! overflow-hidden">
        {/* Background decoration */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="absolute top-0 right-0 w-[480px] h-[480px] bg-[#f86048]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.5,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-slate-200/40 dark:bg-slate-800/30! rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"
        />

        <div className="container relative mx-auto px-6 lg:max-w-7xl">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10 mb-20! lg:mb-28!">
            <div className="max-w-2xl">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-50px",
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="flex items-center gap-4 mb-5!"
              >
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: "2.5rem",
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="h-[2px] rounded-full"
                  style={{
                    backgroundColor: PRIMARY,
                  }}
                />

                <motion.span
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="font-semibold uppercase tracking-[0.28em]! text-[11px]"
                  style={{
                    color: PRIMARY,
                  }}
                >
                  Strategic Framework
                </motion.span>
              </motion.div>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-50px",
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white! leading-[0.95]! tracking-tight!"
              >
                Our Core
                <br />
                Financial Pillars

                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9,
                    type: "spring",
                    stiffness: 150,
                    damping: 10,
                  }}
                  style={{
                    color: PRIMARY,
                  }}
                >
                  .
                </motion.span>
              </motion.h2>
            </div>

            <motion.p
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                margin: "-50px",
              }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="max-w-[280px] text-slate-500 dark:text-slate-400! text-[15px] leading-relaxed! border-l-2! pl-5"
              style={{
                borderColor: PRIMARY,
              }}
            >
              Structured financial instruments designed to uplift households
              from basic stability to enterprise growth.
            </motion.p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-80 rounded-[1.75rem] bg-slate-100 dark:bg-slate-800 animate-pulse"
                />
              ))}
            </div>
          ) : programs.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20 text-slate-400 font-medium">
              No core programs found for this category.
            </div>
          ) : (
            /* Programs */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-40px",
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {programs.map((program, idx) => (
                <motion.div
                  key={program.projectId || idx}
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
                  {/*
                    IMPORTANT:
                    The URL contains ProjectID.

                    Example:
                    /core-programs/123

                    Then [slug]/page.tsx receives:
                    slug = "123"

                    and calls:
                    /Public/GetProjectById?projectId=123
                  */}
                  <Link
                    href={`/core-programs/${encodeURIComponent(
                      program.projectId
                    )}`}
                    className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#f86048]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b1120]! rounded-[1.75rem]"
                  >
                    <article className="relative h-full flex flex-col bg-white dark:bg-slate-900/80! border border-slate-100 dark:border-slate-800! rounded-[1.75rem] overflow-hidden shadow-sm shadow-slate-200/60 dark:shadow-none transition-all duration-500 hover:shadow-xl hover:shadow-[#f86048]/10 hover:border-[#f86048]/25">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                        <motion.img
                          whileHover={{
                            scale: 1.08,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.215, 0.61, 0.355, 1],
                          }}
                          src={program.image}
                          alt={program.name}
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                        {/* Shine effect */}
                        <motion.div
                          initial={{
                            x: "-100%",
                            opacity: 0,
                          }}
                          whileHover={{
                            x: "200%",
                            opacity: 0.12,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                        />

                        {/* Description on hover */}
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          whileHover={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="absolute inset-x-0 bottom-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          <p className="text-white/95 text-[13px] leading-relaxed! line-clamp-3">
                            {program.desc}
                          </p>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-between p-6 lg:p-7">
                        <div>
                          <motion.h3
                            whileHover={{
                              color: PRIMARY,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                            className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white! leading-snug! group-hover:text-[#f86048] transition-colors duration-300 line-clamp-2"
                          >
                            {program.name}
                          </motion.h3>
                        </div>

                        {/* Explore Details */}
                        <div className="mt-6 flex items-center gap-3">
                          <motion.span
                            whileHover={{
                              x: 3,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="text-[13px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-[#f86048] transition-colors duration-300"
                          >
                            Explore Details
                          </motion.span>

                          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700 group-hover:bg-[#f86048]/50 transition-colors duration-300" />

                          <motion.span
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: PRIMARY,
                              color: "#ffffff",
                            }}
                            whileTap={{
                              scale: 0.95,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 15,
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-[#f86048] group-hover:text-white transition-all duration-300"
                          >
                            <motion.i
                              animate={{
                                x: [0, 3, 0],
                              }}
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
                        initial={{
                          opacity: 0,
                        }}
                        whileHover={{
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="absolute inset-0 rounded-[1.75rem] ring-2 ring-[#f86048]/20 pointer-events-none opacity-0 group-hover:opacity-100"
                      />
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </DanboxLayout>
  );
};

export default CorePrograms;
