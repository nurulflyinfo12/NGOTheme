"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useHeroSection, parseSingleImageUrl } from "@/hooks/useHeroSection";

const PRIMARY = "#f86048";

export const HeroSlider1 = () => {
  const { heroSections, loading, fetchHeroSections } = useHeroSection();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchHeroSections();
  }, [fetchHeroSections]);

  // Maps API response dynamically to slides array (No static fallbacks)
  const slides = useMemo(() => {
    if (!heroSections || heroSections.length === 0) return [];

    return heroSections.map((hero) => ({
      img: parseSingleImageUrl(hero.ImageUrls),
      mission: hero.Quote || "Strategic Initiatives",
      h1: hero.HeroTitle,
      details: hero.HeroDetails || "",
    }));
  }, [heroSections]);

  // Auto-advance slides only when valid API slides are present
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

  // Loading skeleton state while fetching API response
  if (loading || slides.length === 0) {
    return (
      <section className="relative w-full overflow-hidden bg-slate-900 h-[100svh] min-h-[500px] max-h-[900px] sm:h-[95vh] sm:min-h-[580px] flex items-center">
        <div className="container relative z-10 mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 lg:max-w-7xl animate-pulse">
          <div className="max-w-4xl space-y-4">
            <div className="h-4 bg-slate-700 rounded w-1/4" />
            <div className="h-12 sm:h-16 bg-slate-700 rounded w-3/4" />
            <div className="h-6 bg-slate-700 rounded w-1/2" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0f172a] h-[100svh] min-h-[500px] max-h-[900px] sm:h-[95vh] sm:min-h-[580px]">
      {/* Background Image Slides (Purely API Powered) */}
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
              backgroundImage: slide.img ? `url(${slide.img})` : "none",
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
      <div className="container relative z-10 mx-auto h-full px-4 xs:px-5 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="flex h-full items-center py-16 sm:py-12 md:py-0">
          <div className="w-full max-w-4xl">
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
                        className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3"
                      >
                        <span
                          className="h-[2px] w-8 sm:w-12 rounded-full shrink-0"
                          style={{ backgroundColor: PRIMARY }}
                        />
                        <span className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.15em] xs:tracking-[0.2em] sm:tracking-[0.25em] text-white/90">
                          {slide.mission}
                        </span>
                      </motion.div>
                    )}

                    {/* Main Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="whitespace-pre-line font-black text-white leading-[1.1] tracking-tight break-words text-[clamp(1.5rem,5vw+1rem,4.5rem)]"
                    >
                      {slide.h1}
                      <span style={{ color: PRIMARY }}>.</span>
                    </motion.h1>

                    {/* Hero Details */}
                    {slide.details && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-4 sm:mt-6 max-w-2xl text-slate-300 leading-relaxed line-clamp-3 text-[clamp(0.875rem,1.5vw+0.5rem,1.125rem)]"
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
      <div className="absolute bottom-0 left-0 z-20 h-24 sm:h-32 w-full bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />

      {/* Slider Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 xs:bottom-8 sm:bottom-10 md:bottom-12 left-4 xs:left-5 sm:left-6 lg:left-12 z-30 flex flex-col gap-2.5 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-1.5 rounded-full transition-all duration-500 ${
                activeIndex === index
                  ? "h-8 sm:h-10 bg-[#f86048]"
                  : "h-5 sm:h-6 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};