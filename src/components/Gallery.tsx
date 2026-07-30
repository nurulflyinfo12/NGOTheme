"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gallery from "@/app/data/gallery.json";

const ITEMS_PER_PAGE = 9;
const PRIMARY = "#f86048";


export const Gallery1 = () => {
  // const galleryData: {
  //   img: string;
  //   delay: string;
  // }[] = [
  //   {
  //     img: "/assets/img/gallery/gallery-6.jpg",
  //     delay: ".2s",
  //   },
  //   {
  //     img: "/assets/img/gallery/gallery-7.jpg",
  //     delay: ".4s",
  //   },
  //   {
  //     img: "/assets/img/gallery/gallery-8.jpg",
  //     delay: ".6s",
  //   },
  //   {
  //     img: "/assets/img/gallery/gallery-9.jpg",
  //     delay: ".8s",
  //   },
  //   {
  //     img: "/assets/img/gallery/gallery-10.jpg",
  //     delay: ".9s",
  //   },
  // ];

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
    <>
      <section className="py-24! lg:py-15! bg-white dark:bg-[#0f172a]! overflow-hidden">
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
                  className={`px-5! sm:px-6! py-2.5! rounded-full! text-xs! font-black! uppercase! tracking-wide! transition-all duration-500! border-2! whitespace-nowrap ${activeFilter === cat
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
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95! backdrop-blur-xl p-6 lg:p-12! cursor-zoom-out"
            >
              <motion.button
                className="absolute top-4 right-4 lg:top-10 lg:right-10 text-2xl lg:text-4xl text-white! hover:text-[#f86048]! transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fal fa-times"></i>
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-5xl w-full bg-slate-900! rounded-[2rem] sm:rounded-[3rem]! overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] cursor-default"
              >
                <div className="flex flex-col lg:flex-row h-full max-h-[85vh]">
                  <div className="lg:w-2/3 bg-black max-h-[40vh] lg:max-h-full">
                    <img
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="lg:w-1/3 p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-slate-900 lg:border-l! border-white/5!">
                    <span
                      className="text-xs font-black! uppercase tracking-[0.4em]! mb-4!"
                      style={{ color: PRIMARY }}
                    >
                      {selectedImage.category}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-black! text-white! leading-tight! mb-6!">
                      {selectedImage.title}
                    </h3>
                    <div
                      className="h-1 w-12 rounded-full mb-8!"
                      style={{ backgroundColor: PRIMARY }}
                    ></div>
                    <p className="text-slate-400! text-sm! leading-relaxed! mb-10!">
                      Visual documentation of our ongoing efforts in coastal
                      resilience and community empowerment.
                    </p>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="w-fit! px-8! py-3! rounded-xl! border! border-white/10! text-white text-[10px]! font-black uppercase tracking-widest! hover:bg-white! hover:text-slate-900! transition-all"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-10! right-10! select-none pointer-events-none opacity-[0.02]! dark:opacity-[0.05]! hidden lg:block">
          <h1 className="text-[15rem] font-black leading-none! uppercase tracking-tighter!">
            Gallery
          </h1>
        </div>
      </section>
      {/* <div className="gallery-section fix section-padding pt-0">
      <div className="container-fluid">
        <div className="gallery-wrappper">
          {galleryData.map((item, index) => (
            <div
              key={index}
              className="gallery-image wow fadeInUp"
              data-wow-delay={item.delay}
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "300px", height: "auto" }}
                src={item.img}
                alt="img"
              />
              <div className="gallery-content">
                <a href={item.img} className="img-popup">
                  <i className="far fa-search text-white" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> */}
    </>
  );
};

export const Gallery2 = () => {
  const galleryItems: {
    image: string;
    category: string;
    title: string;
  }[] = [
      {
        image: "/assets/img/gallery/gallery-1.jpg",
        category: "Charity",
        title: "Education",
      },
      {
        image: "/assets/img/gallery/gallery-2.jpg",
        category: "Charity",
        title: "Education",
      },
      {
        image: "/assets/img/gallery/gallery-3.jpg",
        category: "Charity",
        title: "Education",
      },
      {
        image: "/assets/img/gallery/gallery-4.jpg",
        category: "Charity",
        title: "Education",
      },
      {
        image: "/assets/img/gallery/gallery-5.jpg",
        category: "Charity",
        title: "Education",
      },
    ];

  return (
    <div className="gallery-section fix section-padding">
      <div className="container-fluid">
        <div className="gallery-wrappper">
          {galleryItems.map((item, index) => {
            const delay = (0.2 + index * 0.2).toFixed(1) + "s";
            return (
              <div
                key={index}
                className="gallery-image wow fadeInUp"
                data-wow-delay={delay}
              >
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "320px", height: "auto" }}
                  src={item.image}
                  alt="img"
                />

                <div className="gallery-content">
                  <p>{item.category}</p>
                  <h4>{item.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
