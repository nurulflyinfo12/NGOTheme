"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import award from "@/app/data/award.json";
import { ChevronLeft, ChevronRight, Award, X, Maximize2 } from "lucide-react";

const PRIMARY = "#f86048";

const OurAward = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Extract unique categories for a mini filter bar
  const categories = ["All", ...Array.from(new Set(award.map((item) => item.category)))];

  const filteredAwards =
    activeFilter === "All"
      ? award
      : award.filter((item) => item.category === activeFilter);

  // Reset index if filter changes and out of bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // Auto slide
  useEffect(() => {
    if (filteredAwards.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredAwards.length, currentIndex]);

  const handleNext = () => {
    if (filteredAwards.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredAwards.length);
  };

  const handlePrev = () => {
    if (filteredAwards.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredAwards.length) % filteredAwards.length);
  };

  const currentItem = filteredAwards[currentIndex];

  return (
    <section className="relative py-20 lg:py-32 bg-slate-50 dark:bg-[#0f172a]! overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#f86048]/10 to-transparent blur-[120px] pointer-events-none rounded-full!" />

      <div className="container mx-auto px-6 lg:max-w-7xl relative z-10">
        
        {/* Header section with integrated mini filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16! border-b! border-slate-200/60! dark:border-slate-800/60! pb-8!">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} style={{ color: PRIMARY }} />
              <span className="text-xs font-black uppercase tracking-[0.25em]! text-slate-400 dark:text-slate-500!">
                PROUD MOMENTS
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white! tracking-tight!">
              Awards & Recognition<span style={{ color: PRIMARY }}>.</span>
            </h2>
          </div>

          {/* Unique pills style filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-xl transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-slate-950! text-white dark:bg-white! dark:text-slate-950! shadow-lg shadow-slate-950/10"
                    : "bg-white text-slate-600 dark:bg-slate-900! dark:text-slate-400! hover:bg-slate-100! dark:hover:bg-slate-800!"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Showcase Slider */}
        {filteredAwards.length > 0 ? (
          <div className="bg-white dark:bg-slate-900! rounded-[1rem]! p-6! lg:p-12! shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100! dark:border-slate-800/80! min-h-[500px] flex flex-col justify-between relative">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
              
              {/* Left Column: Text Metadata Info */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem?.id || currentIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    <span className="inline-flex items-center text-xs font-extrabold tracking-widest! text-[#f86048]! uppercase bg-[#f86048]/10! px-3! py-1.5! rounded-lg">
                      {currentItem?.category}
                    </span>
                    <h3 className="text-3xl! lg:text-4xl! font-black text-slate-900! dark:text-white! leading-tight! tracking-tight!">
                      {currentItem?.title}
                    </h3>
                    {/* <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                      {currentItem?.description || "Recognized for excellence and innovation within our design and production engineering pipelines."}
                    </p> */}
                  </motion.div>
                </AnimatePresence>

                {/* Left side integrated compact controls */}
                <div className="flex items-center gap-6 pt-6">
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700! dark:text-slate-300! hover:bg-[#f86048]! hover:text-white! dark:hover:bg-[#f86048]! dark:hover:text-white! transition-all duration-300"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-11 h-11 rounded-xl bg-slate-100! dark:bg-slate-800! flex items-center justify-center text-slate-700! dark:text-slate-300! hover:bg-[#f86048]! hover:text-white! dark:hover:bg-[#f86048]! dark:hover:text-white! transition-all duration-300"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  
                  {/* Visual Pagination Index */}
                  <span className="text-xs font-mono tracking-widest! font-bold text-slate-400!">
                    {(currentIndex + 1).toString().padStart(2, '0')} / {filteredAwards.length.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Right Column: Frame Visual Graphic */}
              <div className="lg:col-span-7">
                <div className="relative h-[320px] md:h-[420px] w-full rounded-2xl! md:rounded-[2rem]! overflow-hidden group shadow-lg shadow-slate-900/10">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentItem?.id || currentIndex}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0.8 }),
                        center: { x: 0, opacity: 1 },
                        exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0.8 })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={currentItem?.image}
                        alt={currentItem?.title}
                        fill
                        className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                        priority
                        quality={95}
                      />
                      <div className="absolute inset-0 bg-slate-950/10 dark:bg-slate-950/30 transition-opacity group-hover:opacity-40" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Modern Overlay Action Indicator */}
                  <button
                    onClick={() => setSelectedImage(currentItem)}
                    className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 w-12 h-12 rounded-xl! bg-white/90! dark:bg-slate-900/90! backdrop-blur-md! flex items-center justify-center text-slate-900! dark:text-white! transition-all duration-300 shadow-xl z-20"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Linear Timeline Indicator Track */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 flex bg-slate-100! dark:bg-slate-800! overflow-hidden rounded-b-[2.5rem]!">
              {filteredAwards.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-full cursor-pointer transition-all duration-500 ease-out flex-1 border-r! border-white/20! dark:border-slate-900/40! ${
                    idx === currentIndex ? "bg-[#f86048]" : "bg-transparent! hover:bg-slate-200! dark:hover:bg-slate-700!"
                  }`}
                />
              ))}
            </div>

          </div>
        ) : (
          <div className="text-center py-20! text-slate-400!">
            No items found matching this filter.
          </div>
        )}
      </div>

      {/* Modern Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-6!"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all z-50 border border-white/10"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
            >
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="w-full max-h-[80vh] object-contain mx-auto"
                quality={100}
              />
              <div className="bg-slate-900! p-6! border-t! border-slate-800! text-left">
                <span className="text-xs text-[#f86048]! uppercase tracking-wider! font-extrabold">{selectedImage.category}</span>
                <h4 className="text-lg font-bold text-white mt-1">{selectedImage.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurAward;