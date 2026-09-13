"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useHeroSection, ApiHeroSection } from "@/hooks/useHeroSection";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

// Robust Helper: Handles malformed/stringified JSON arrays and raw URL strings
const parseImageUrls = (imageUrls?: any[]): string[] => {
  if (!imageUrls || imageUrls.length === 0) return [];

  // 1. Join array elements into a single raw text block in case the server split a stringified array across indices
  const rawString = Array.isArray(imageUrls) ? imageUrls.join(",") : String(imageUrls);

  // 2. Extract anything that looks like a valid HTTP(S) or root relative URL
  const urlRegex = /(https?:\/\/[^\s"',\]]+|\/[^\s"',\]]+)/g;
  const matches = rawString.match(urlRegex) || [];

  // 3. Clean up trailing backslashes, quotes, or brackets
  const cleaned = matches.map((url) =>
    url.replace(/[\\\]"' border]+$/g, "").replace(/\\/g, "")
  );

  // Deduplicate URLs
  const uniqueUrls = Array.from(new Set(cleaned));

  return uniqueUrls.map((url) => {
    if (url.startsWith("http")) return url;
    return api.getFileUrl(url);
  });
};

export const HeroSlider1 = () => {
  const { heroSections, loading, fetchHeroSections } = useHeroSection();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchHeroSections();
  }, [fetchHeroSections]);

  // Transform API response into slide items
  const slides = useMemo(() => {
    if (heroSections.length === 0) {
      return [
        {
          img: "/assets/img/hero/hero-1.webp",
          mission: "Women Empowerment • Economic Growth",
          h1: "Empowering Coastal \n Communities Since 1985",
          details: "",
        },
      ];
    }

    const compiledSlides: {
      img: string;
      mission: string;
      h1: string;
      details?: string;
    }[] = [];

    heroSections.forEach((hero) => {
      const extractedImages = parseImageUrls(hero.ImageUrls);
      const bgImages =
        extractedImages.length > 0
          ? extractedImages
          : ["/assets/img/hero/hero-1.webp"];

      bgImages.forEach((imgUrl) => {
        compiledSlides.push({
          img: imgUrl,
          mission: hero.Quote || "Strategic Initiatives",
          h1: hero.HeroTitle,
          details: hero.HeroDetails,
        });
      });
    });

    return compiledSlides;
  }, [heroSections]);

  // Auto slide interval
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="relative h-[95vh] min-h-[580px] w-full overflow-hidden bg-white dark:bg-[#0f172a]">
      {/* Background Image Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeIndex === i ? 1 : 0 }}
        >
          <motion.div
            initial={{ scale: 1.08 }}
            animate={activeIndex === i ? { scale: 1 } : { scale: 1.08 }}
            transition={{ duration: 7, ease: "easeOut" }}
            className="h-full w-full"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-slate-950/20" />
          </motion.div>
        </div>
      ))}

      {/* Hero Text Content */}
      <div className="container relative z-10 mx-auto h-full px-4 sm:px-6 lg:max-w-7xl">
        <div className="flex h-full items-center py-12 md:py-0">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              {slides.map((slide, i) =>
                activeIndex === i ? (
                  <div key={i} className="flex flex-col">
                    {/* Mission Tag / Quote */}
                    {slide.mission && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 flex items-center gap-3"
                      >
                        <span
                          className="h-[2px] w-12 rounded-full"
                          style={{ backgroundColor: PRIMARY }}
                        />
                        <span className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.25em] text-white/90">
                          {slide.mission}
                        </span>
                      </motion.div>
                    )}

                    {/* Main Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="whitespace-pre-line text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight"
                    >
                      {slide.h1}
                      <span style={{ color: PRIMARY }}>.</span>
                    </motion.h1>

                    {/* Hero Description Details */}
                    {slide.details && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed line-clamp-3"
                      >
                        {slide.details}
                      </motion.p>
                    )}
                  </div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 z-20 h-32 w-full bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />

      {/* Slider Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 left-6 z-30 flex flex-col gap-3 lg:left-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "h-10 bg-[#f86048]"
                  : "h-6 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};