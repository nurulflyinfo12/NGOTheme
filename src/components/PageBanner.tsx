"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const PRIMARY = "#f86048";

const PageBanner = ({
  pageName = "About Us",
  pageTitle,
  pageImage = "/assets/img/factbg.webp",
}: {
  pageName: string;
  pageTitle?: string;
  pageImage?: string;
}) => {
  return (
    <section className="relative flex min-h-[450px] items-center overflow-hidden bg-white dark:bg-[#0f172a] pt-32 pb-20">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <Image
            src={pageImage}
            alt="Banner Background"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent dark:from-[#0f172a]! dark:via-[#0f172a]/70! dark:to-transparent!" />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto px-6! lg:max-w-7xl">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: PRIMARY }}
              ></span>
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: PRIMARY }}
              ></span>
            </span>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400">
              Our Mission: Empowerment • Growth • Resilience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl! md:text-7xl! font-black tracking-tight text-gray-900! dark:text-white! leading-[1.1] mb-8"
          >
            {pageTitle ? pageTitle : pageName}
            <span style={{ color: PRIMARY }}>.</span>
          </motion.h1>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex mt-10 items-center gap-3 text-sm font-medium"
          >
            <Link
              href="/"
              className="text-gray-500! dark:text-gray-400! hover:text-gray-900! dark:hover:text-white! transition-colors"
            >
              Home
            </Link>

            <svg
              className="h-4 w-4 text-gray-300 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="9 5l7 7-7 7"
              />
            </svg>

            <span style={{ color: PRIMARY }} className="font-bold">
              {pageName}
            </span>
          </motion.nav>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent z-10" />

      {/* <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/90 via-40% to-transparent dark:from-[#0f172a] dark:via-[#0f172a]/90 dark:via-40% to-transparent z-10" /> */}
    </section>
  );
};

export default PageBanner;
