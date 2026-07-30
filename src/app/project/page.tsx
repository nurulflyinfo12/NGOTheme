"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DanboxLayout from "@/layout/DanboxLayout";
import PageBanner from "@/components/PageBanner";
import projects from "@/app/data/project.json";

const PRIMARY = "#f86048";

interface Project {
  slug: string;
  title: string;
  fullName?: string;
  category: string;
  src: string;
}

const AllProjects = () => {
  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Portfolio" pageTitle="Global Initiatives" />

      <section className="py-24 lg:py-32 bg-white dark:bg-[#0f172a]! overflow-hidden text-slate-900 dark:text-slate-100! relative transition-colors duration-300">
        {/* Soft Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f86048]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-20! gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-5!"
              >
                <div
                  className="w-10 h-[2px] rounded-full"
                  style={{ backgroundColor: PRIMARY }}
                />
                <span
                  className="font-semibold uppercase tracking-[0.28em]! text-[11px]"
                  style={{ color: PRIMARY }}
                >
                  Impact Tracking
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black dark:text-white! tracking-tight! leading-[1.08]!"
              >
                Ongoing Strategic <br className="hidden sm:inline" />
                Operations
                <span style={{ color: PRIMARY }}>.</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-md"
            >
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed! border-l-2 border-[#f86048] pl-5 py-1 font-medium">
                Managing a diverse portfolio of coastal development and technical
                innovation projects aimed at long-term community resilience.
              </p>
            </motion.div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {(projects as Project[]).map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="h-full"
              >
                <Link
                  // href={`/projects/${project.slug}`}
                  href="#"
                  className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-[#f86048] rounded-[2.5rem]"
                >
                  <div className="h-full flex flex-col bg-white dark:bg-slate-900/90! rounded-[2.5rem] overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-2xl hover:shadow-[#f86048]/10 hover:border-[#f86048]/30 transition-all duration-500 hover:-translate-y-2 relative">

                    {/* Media Container */}
                    <div className="relative h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Category Pill */}
                      <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest! text-white bg-slate-950/70 backdrop-blur-md border border-white/10 shadow-lg">
                          {project.category}
                        </span>
                      </div>

                      {/* Top Right Index Marker */}
                      <div className="absolute bottom-6 right-6 z-20">
                        <span className="text-3xl font-black text-white/30 dark:text-white/20! group-hover:text-white/60 transition-colors">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Gradient Transition overlay to card body */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                    </div>

                    {/* Content Body */}
                    <div className="p-8 lg:p-9 flex-1 flex flex-col justify-between relative z-10">
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white! group-hover:text-[#f86048]! transition-colors duration-300 leading-snug mb-2!">
                          {project.title}
                        </h3>
                        {project.fullName && (
                          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wider uppercase leading-relaxed">
                            {project.fullName}
                          </p>
                        )}
                      </div>

                      {/* Card Footer Line */}
                      <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800/80! flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400!">
                            Active Operation
                          </span>
                        </div>

                        {/* Interactive Circle Arrow */}
                        {/* <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-[#f86048] flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm">
                          <i className="far fa-arrow-right text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div> */}
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </DanboxLayout>
  );
};

export default AllProjects;