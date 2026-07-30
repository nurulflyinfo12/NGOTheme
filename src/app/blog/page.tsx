"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import DanboxLayout from "@/layout/DanboxLayout";
import PageBanner from "@/components/PageBanner";
import blogs from "@/app/data/blogs.json";

const PRIMARY = "#f86048";

const BlogPage = () => {
  // First blog as featured
  const featuredPost = blogs[0];
  // Remaining blogs
  const otherPosts = blogs.slice(1);

  return (
    <DanboxLayout>
      <PageBanner pageName="Journal" pageTitle="Insights & Stories" />

      <section className="py-16! md:py-24! lg:py-32! bg-white dark:bg-[#0f172a]! overflow-hidden">
        <div className="container mx-auto px-4! sm:px-6! lg:max-w-7xl!">

          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-[2rem]! md:rounded-[3rem]! overflow-hidden! bg-slate-900! mb-20! md:mb-32!"
            >
              <div className="flex flex-col! lg:flex-row! min-h-[500px]! md:min-h-[600px]! lg:min-h-[650px]!">
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-24 flex flex-col justify-center relative z-20">
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="w-12 h-[2px]"
                      style={{ backgroundColor: PRIMARY }}
                    ></div>
                    <span className="text-[10px]! font-black! uppercase! tracking-[0.4em]! text-white/60!">
                      Editor's Choice
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-3x!l md:text-4xl! lg:text-6xl! font-black! text-white mb-6! md:mb-8! leading-tight! tracking-tighter! hover:text-[#f86048]! transition-colors">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-slate-400! text-base! md:text-lg! mb-10! md:mb-12! leading-relaxed! max-w-md!">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6! sm:gap-8!">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <button
                        className="px-8! py-3.5! rounded-2xl! font-black! uppercase! tracking-widest! text-xs! text-white! transition-all! hover:scale-105! active:scale-95! w-full sm:w-auto"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        Read Article
                      </button>
                    </Link>
                    <div className="flex flex-col">
                      <span className="text-[10px]! uppercase! font-black! tracking-widest! text-slate-500!">
                        Published
                      </span>
                      <span className="text-sm! font-bold! text-white!">
                        {featuredPost.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2! relative min-h-[320px]! md:min-h-[400px]! lg:min-h-auto! overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-transparent transition-colors! duration-700! z-10" />
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                  />

                  <div className="absolute top-6! left-6! md:top-12! md:right-12! z-20">
                    <span className="px-5! py-2! bg-white/10! backdrop-blur-md! border! border-white/20! rounded-full! text-[10px]! font-black! uppercase! tracking-widest! text-white!">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12! md:mb-16! gap-4!">
            <h3 className="text-3xl! md:text-4xl! font-black! text-slate-900! dark:text-white! tracking-tighter!">
              Latest Publications<span style={{ color: PRIMARY }}>.</span>
            </h3>
            <div className="hidden! md:block! h-[1px]! flex-1! bg-slate-100! dark:bg-slate-800! mx-6! mb-3!" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total {blogs.length} Stories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {otherPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mb-8 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span
                        className="px-4 py-1.5 text-white text-[10px] font-black uppercase rounded-lg shadow-xl"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="px-2">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                    <span style={{ color: PRIMARY }}>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>5 Min Read</span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-[#f86048] transition-colors">
                      {post.title}
                    </h4>
                  </Link>

                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white group/link"
                  >
                    Continue Reading
                    <span className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center transition-all group-hover/link:bg-[#f86048] group-hover/link:text-white">
                      <i className="far fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </DanboxLayout>
  );
};

export default BlogPage;