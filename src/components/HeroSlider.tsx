"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PRIMARY = "#f86048";

export const HeroSlider1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      img: "/assets/img/hero/hero-1.webp",
      mission: "Women Empowerment • Economic Growth",
      h1: "Empowering Coastal \n Communities Since 1985",
    },
    {
      img: "/assets/img/hero/hero-2.webp",
      mission: "Disaster Resilience • Social Welfare",
      h1: "Building Resilience \n Against Natural Disasters",
    },
    {
      img: "/assets/img/hero/hero-4.webp",
      mission: "Education • Poverty Alleviation",
      h1: "Creating Sustainable \n Livelihoods For All",
    },
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[95vh] min-h-[580px] w-full overflow-hidden bg-white dark:bg-[#0f172a]">
      {/* Background Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0"
          style={{ opacity: activeIndex === i ? 1 : 0 }}
        >
          <motion.div
            initial={{ scale: 1.1 }}
            // animate={activeIndex === i ? { scale: 1 } : { scale: 1.1 }}
            // transition={{ duration: 10, ease: "linear" }}
            className="h-full w-full"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute inset-0 bg-slate-950/20" />
          </motion.div>
        </div>
      ))}

      {/* Content */}
      <div className="container relative z-10 mx-auto h-full px-4 sm:px-6 lg:max-w-7xl">
        <div className="flex h-full items-center py-12 md:py-0">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              {slides.map((slide, i) =>
                activeIndex === i ? (
                  <div key={i} className="flex flex-col">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-6 flex items-center gap-3"
                    >
                      <span
                        className="h-[2px] w-12"
                        style={{ backgroundColor: PRIMARY }}
                      />
                      <span className="text-[12px]! sm:text[142px]! md:text-[18px]! lg:text-[20px]! font-bold uppercase tracking-[0.3em] text-white/90">
                        {slide.mission}
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="whitespace-pre-line text-[30px]! leading-[1.15] sm:text-4xl! md:text-5xl! lg:text-6xl! xl:text-7xl! font-black text-white"
                    >
                      {slide.h1}
                      <span style={{ color: PRIMARY }}>.</span>
                    </motion.h1>
                  </div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={goPrev}
        className="absolute hidden md:block left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-3 sm:p-4 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 lg:left-8"
      >
        ←
      </button>
      <button
        onClick={goNext}
        className="absolute hidden md:block  right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-3 sm:p-4 text-white backdrop-blur-md transition-all hover:bg-black/50 hover:scale-110 lg:right-8"
      >
        →
      </button> */}

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 z-20 h-32 w-full bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent" />

      {/* Custom Dots */}
      <div className="absolute bottom-12 left-6 z-30 flex flex-col gap-3 lg:left-12">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-8 w-1 rounded-full transition-all duration-500 ${
              activeIndex === index ? "h-12" : "bg-white/30"
            }`}
            style={{ backgroundColor: activeIndex === index ? PRIMARY : "" }}
          />
        ))}
      </div>
    </section>
  );
};