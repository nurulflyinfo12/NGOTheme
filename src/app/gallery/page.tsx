"use client";

import React, { useState, useEffect } from "react";
import DanboxLayout from "@/layout/DanboxLayout";
import PageBanner from "@/components/PageBanner";
import { motion, AnimatePresence } from "framer-motion";
import gallery from "@/app/data/gallery.json";

const ITEMS_PER_PAGE = 9;
const PRIMARY = "#f86048";

const GalleryPage = () => {
  const categories = ["All", ...new Set(gallery.map((g) => g.category))];
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filteredItems =
    activeFilter === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeFilter);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeFilter]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Media Gallery" pageTitle="Our Impact in Focus" />

      <section className="py-24! lg:py-32! bg-white dark:bg-[#0f172a]! overflow-hidden">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start! md:items-end! mb-12! md:mb-16! gap-8 md:gap-12">
            <div className="max-w-2xl w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-4!"
              >
                <div
                  className="w-12! h-[2px]!"
                  style={{ backgroundColor: PRIMARY }}
                ></div>
                <span
                  className="font-black! uppercase tracking-[0.3em]! text-xs!"
                  style={{ color: PRIMARY }}
                >
                  Visual Archive
                </span>
              </motion.div>

              <h2 className="text-2xl! sm:text-3xl! md:text-4xl! lg:text-5xl! font-black! text-slate-900! dark:text-white! leading-[1.05]! tracking-wide!">
                Capturing Moments <br className="hidden lg:block" /> of Change
                <span style={{ color: PRIMARY }}>.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 justify-start md:justify-end w-full! md:w-auto!">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5! sm:px-6! py-2.5! rounded-full! text-xs! font-black! uppercase! tracking-wide! transition-all duration-500! border-2! whitespace-nowrap ${
                    activeFilter === cat
                      ? "bg-slate-900! border-slate-900! text-[#f86048]! dark:bg-white! dark:text-slate-900! shadow-lg!"
                      : "bg-transparent! border-slate-100! text-slate-400! hover:border-[#f86048]! hover:text-[#f86048]! dark:border-slate-800!"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.slice(0, visibleCount).map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]! bg-slate-100! dark:bg-slate-800! shadow-2xl shadow-slate-200/50! dark:shadow-none! cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110!"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t! from-slate-900! via-slate-900/20! to-transparent opacity-80 lg:opacity-0! lg:group-hover:opacity-95 transition-all duration-500">
                    <div className="absolute inset-0 p-6! sm:p-8! lg:p-10! flex flex-col justify-end transform translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px]! font-black! uppercase tracking-[0.3em]! mb-3! inline-block! px-3! py-1! bg-white/10! backdrop-blur-md! rounded-full w-fit! text-white!">
                        {item.category}
                      </span>
                      <h4 className="text-2xl font-black! text-white! leading-tight! mb-6!">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visibleCount < filteredItems.length && (
            <div className="mt-24! text-center">
              <button
                onClick={handleLoadMore}
                className="group relative px-10! sm:px-16! py-4! sm:py-5! bg-slate-900 dark:bg-white! overflow-hidden rounded-2xl transition-all hover:shadow-[0_20px_50px_rgba(248,96,72,0.3)]!"
              >
                <div className="absolute inset-0 w-0 bg-[#f86048]! transition-all duration-500 group-hover:w-full!" />
                <span className="relative z-10 text-black! dark:text-slate-900! font-black! uppercase tracking-wide! text-xs group-hover:text-white! transition-colors">
                  Explore More Photos
                </span>
              </button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900/98 via-slate-950/98 to-black/98 backdrop-blur-2xl"
            >
              {/* Close Button - Top Right */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ type: "spring", damping: 15 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 lg:top-8 lg:right-8 z-50 w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-all group shadow-2xl"
              >
                <i className="fal fa-times text-xl group-hover:scale-110 transition-transform"></i>
              </motion.button>

              {/* Main Content Container */}
              <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-7xl max-h-[90vh] flex flex-col lg:flex-row gap-6 lg:gap-8"
                >
                  {/* Image Section */}
                  <div className="flex-1 relative overflow-hidden bg-black/40! backdrop-blur-sm shadow-2xl">
                    <img
                      id="fullscreen-image"
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      className="w-full h-full object-contain max-h-[50vh] lg:max-h-[80vh] "
                    />
                    
                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t! from-black/50 via-transparent to-transparent lg:hidden"></div>
                  </div>

                  {/* Information Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="lg:w-96 xl:w-[28rem] flex flex-col justify-center p-8! lg:p-10! rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
                  >
                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full border"
                        style={{
                          color: PRIMARY,
                          borderColor: PRIMARY,
                          backgroundColor: `${PRIMARY}10`,
                        }}
                      >
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: PRIMARY }}></span>
                        {selectedImage.category}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-[1.1]! mb-6!"
                    >
                      {selectedImage.title}
                    </motion.h2>

                    {/* Divider */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "5rem" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-1 rounded-full mb-8!"
                      style={{ backgroundColor: PRIMARY }}
                    ></motion.div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-slate-300 text-base lg:text-lg leading-relaxed! mb-8! font-light"
                    >
                      {selectedImage.description || "Visual documentation of our ongoing efforts in coastal resilience and community empowerment. Each image tells a story of transformation, hope, and the unwavering spirit of the communities we serve."}
                    </motion.p>

                    {/* Stats/Info Grid */}
                    {selectedImage.date && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="grid grid-cols-2 gap-4 mb-8"
                      >
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                          <span className="text-xs text-slate-400 uppercase tracking-wider! block mb-1!">Date</span>
                          <span className="text-sm font-bold text-white">{selectedImage.date}</span>
                        </div>
                        {selectedImage.location && (
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <span className="text-xs text-slate-400 uppercase tracking-wider! block mb-1!">Location</span>
                            <span className="text-sm font-bold text-white">{selectedImage.location}</span>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex gap-3"
                    >
                      {/* Full Screen Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const imgElement = document.getElementById('fullscreen-image');
                          if (imgElement) {
                            if (imgElement.requestFullscreen) {
                              imgElement.requestFullscreen();
                            } else if ((imgElement as any).webkitRequestFullscreen) {
                              (imgElement as any).webkitRequestFullscreen();
                            } else if ((imgElement as any).msRequestFullscreen) {
                              (imgElement as any).msRequestFullscreen();
                            }
                          }
                        }}
                        className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group flex items-center justify-center gap-2"
                      >
                        <i className="fal fa-expand group-hover:scale-110 transition-transform"></i>
                        <span className="text-xs font-bold uppercase tracking-wider!">Full Screen</span>
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          try {
                            if (navigator.share) {
                              await navigator.share({
                                title: selectedImage.title,
                                text: `${selectedImage.title} - ${selectedImage.category}`,
                                url: window.location.href,
                              });
                            } else {
                              await navigator.clipboard.writeText(selectedImage.image);
                              const toast = document.createElement('div');
                              toast.className = 'fixed top-6 left-1/2 transform -translate-x-1/2 bg-emerald-500/90 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-sm font-bold z-[10000] shadow-2xl';
                              toast.innerHTML = '<i class="fal fa-check-circle mr-2"></i> Image link copied to clipboard!';
                              document.body.appendChild(toast);
                              setTimeout(() => {
                                toast.style.opacity = '0';
                                toast.style.transform = 'translate(-50%, -20px)';
                                toast.style.transition = 'all 0.5s ease';
                                setTimeout(() => toast.remove(), 500);
                              }, 2000);
                            }
                          } catch (error) {
                            console.error('Error sharing:', error);
                          }
                        }}
                        className="flex-1 px-6 py-4 rounded-2xl text-white hover:opacity-90 transition-all group flex items-center justify-center gap-2 font-bold"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        <i className="fal fa-share-alt group-hover:scale-110 transition-transform"></i>
                        <span className="text-xs font-bold uppercase tracking-wider!">Share</span>
                      </button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-10! right-10! select-none pointer-events-none opacity-[0.02]! dark:opacity-[0.05]! hidden lg:block">
          <h1 className="text-[15rem] font-black leading-none! uppercase tracking-tighter!">
            Gallery
          </h1>
        </div>
      </section>
    </DanboxLayout>
  );
};

export default GalleryPage;