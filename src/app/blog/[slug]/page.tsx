"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DanboxLayout from "@/layout/DanboxLayout";
import blogs from "@/app/data/blogs.json";
import { notFound } from "next/navigation";

interface BlogParams {
  params: Promise<{
    slug: string;
  }>;
}

const BlogDetails = ({ params }: BlogParams) => {
  const { slug } = React.use(params);
  const containerRef = useRef(null);
  const blog = blogs.find((item) => item.slug === slug);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  if (!blog) {
    notFound();
  }

  return (
    <DanboxLayout>
      <div
        ref={containerRef}
        className="bg-white min-h-screen selection:bg-yellow-200"
      >
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">
          <motion.div
            style={{ opacity, scale }}
            className="absolute inset-0 z-0"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover opacity-60 grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="h-px w-12 bg-yellow-400" />
                  <span className="text-yellow-400 font-black uppercase tracking-[0.3em] text-[10px]">
                    {blog.category}
                  </span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                  {blog.title.split(" ").map((word, i) => (
                    <span key={i} className="inline-block mr-4">
                      {word}
                    </span>
                  ))}
                </h1>

                <div className="flex flex-wrap gap-12 text-zinc-400">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-1 font-bold text-zinc-500">
                      Author
                    </p>
                    <p className="text-white font-medium">{blog.author}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-1 font-bold text-zinc-500">
                      Published
                    </p>
                    <p className="text-white font-medium">{blog.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest mb-1 font-bold text-zinc-500">
                      Reading Time
                    </p>
                    <p className="text-white font-medium">{blog.readTime}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </section>

        <section className="relative z-20 -mt-20">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-t-[40px] shadow-2xl overflow-hidden p-8 md:p-20 border-x border-t border-zinc-100">
              <div className="max-w-3xl mx-auto">
                <div className="mb-16">
                  <p className="text-2xl md:text-3xl font-medium text-zinc-600 leading-relaxed italic border-l-4 border-yellow-400 pl-8">
                    This piece explores the intricate layers of{" "}
                    {blog.category.toLowerCase()} through the lens of modern
                    innovation and design excellence.
                  </p>
                </div>

                <article
                  className="prose prose-zinc prose-lg md:prose-2xl max-w-none 
                  prose-headings:text-zinc-950 prose-headings:font-black prose-headings:tracking-tighter
                  prose-p:text-zinc-600 prose-p:leading-[1.8]
                  prose-strong:text-zinc-900 prose-strong:font-bold
                  prose-img:rounded-3xl prose-img:shadow-2xl
                  prose-blockquote:border-yellow-400 prose-blockquote:bg-zinc-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
                >
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>

                <div className="mt-20 pt-10 border-t border-zinc-100">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-400 mb-6">
                    Topics Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#000",
                          color: "#fff",
                        }}
                        className="px-6 py-2 bg-zinc-100 text-zinc-900 text-[11px] font-black uppercase tracking-wider rounded-full cursor-pointer transition-colors"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-24 p-8 md:p-12 bg-yellow-400 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-sm">
                    <h3 className="text-2xl font-black text-black mb-2">
                      Enjoyed this story?
                    </h3>
                    <p className="text-black/70 font-medium">
                      Join our weekly digest for more insights on design and
                      technology.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-black text-white rounded-2xl font-bold text-sm tracking-tight"
                  >
                    Subscribe Now
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DanboxLayout>
  );
};

export default BlogDetails;
