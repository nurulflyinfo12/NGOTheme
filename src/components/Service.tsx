"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, TouchEvent } from "react";

const PRIMARY = "#f86048";

export const Service1 = () => {
  const serviceData = [
    {
      img: "/assets/img/service/1.webp",
      title: "Sustainable Enterprise Project",
      description:
        "Driving self-sufficiency in milk production through advanced sustainable farming practices.",
      tag: "Economics",
    },
    {
      img: "/assets/img/service/02.webp",
      title: "Integrated Agriculture Unit",
      description:
        "সাগরিকা সমাজ উন্নয়ন সংস্থায় 'কৃষি ও প্রাণিসম্পদ ইউনিট' এর একটি সমন্বিত উদ্যোগ।",
      tag: "Agriculture",
    },
    {
      img: "/assets/img/service/03.webp",
      title: "Learning & Innovation (LIFT)",
      description:
        "Expanding Pekin duck production to ensure protein security and poverty alleviation.",
      tag: "Innovation",
    },
    {
      img: "/assets/img/service/5.webp",
      title: "Enhancing Resources and Increasing Capacities of Poor Households towards Elimination of their Poverty-ENRICH",
      description:
        "Driving self-sufficiency in milk production through advanced sustainable farming practices.",
      tag: "Economics",
    },
    {
      img: "/assets/img/education/education1.webp",
      title: "Elderly People Programme of SSUS",
      description:
        "সাগরিকা সমাজ উন্নয়ন সংস্থায় 'কৃষি ও প্রাণিসম্পদ ইউনিট' এর একটি সমন্বিত উদ্যোগ।",
      tag: "Agriculture",
    },
    {
      img: "/assets/img/service/4.webp",
      title: "Recovery and Advancement of Informal Sector Employment (RAISE)Project",
      description:
        "Expanding Pekin duck production to ensure protein security and poverty alleviation.",
      tag: "Innovation",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(0);
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for section reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Detect screen size using media query
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
    const desktopQuery = window.matchMedia("(min-width: 1280px)");

    const updateSlidesPerView = () => {
      if (mobileQuery.matches) {
        setSlidesPerView(1);
      } else if (tabletQuery.matches) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    updateSlidesPerView();

    mobileQuery.addEventListener("change", updateSlidesPerView);
    tabletQuery.addEventListener("change", updateSlidesPerView);
    desktopQuery.addEventListener("change", updateSlidesPerView);

    return () => {
      mobileQuery.removeEventListener("change", updateSlidesPerView);
      tabletQuery.removeEventListener("change", updateSlidesPerView);
      desktopQuery.removeEventListener("change", updateSlidesPerView);
    };
  }, []);

  const totalSlides = Math.ceil(serviceData.length / slidesPerView);
  const maxIndex = totalSlides - 1;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, maxIndex]);

  // Touch handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Get current visible slides
  const getVisibleSlides = () => {
    const start = currentIndex * slidesPerView;
    const end = start + slidesPerView;
    return serviceData.slice(start, end);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
      width: "100%",
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      position: "absolute" as const,
      width: "100%",
    }),
  };

  // Card hover variants - FIXED (removed transition from inside hover)
  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -8,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-white dark:bg-[#0f172a]! overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8! sm:mb-12! md:mb-16! lg:mb-20! gap-6 sm:gap-8">
          <div className="max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-3 sm:gap-4! mb-3! sm:mb-4!"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={isVisible ? { width: "3rem" } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="h-[2px]"
                style={{ backgroundColor: PRIMARY }}
              />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                className="font-black uppercase tracking-[0.2em]! sm:tracking-[0.3em]! text-xs sm:text-sm"
                style={{ color: PRIMARY }}
              >
                Our Core Initiatives
              </motion.span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white! leading-tight! tracking-tighter!"
            >
              Strategic Solutions for Community Growth
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8, type: "spring", stiffness: 200 }}
                style={{ color: PRIMARY }}
              >
                .
              </motion.span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto"
          >
            <Link
              href="/project"
              className="group flex items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs font-black uppercase tracking-widest! text-slate-400 hover:text-slate-900 dark:text-white! transition-colors whitespace-nowrap"
            >
              View All Projects
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 dark:border-slate-700! flex items-center justify-center group-hover:bg-[#f86048] group-hover:border-[#f86048] group-hover:text-white transition-all"
              >
                <i className="far fa-arrow-right text-xs sm:text-sm" />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Slider Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          ref={sliderRef}
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Fixed height container */}
          <div className="overflow-hidden relative min-h-[440px] sm:min-h-[460px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className={`grid gap-5 lg:gap-6 ${slidesPerView === 1
                  ? "grid-cols-1"
                  : slidesPerView === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  }`}
              >
                {getVisibleSlides().map((item, i) => (
                  <motion.div
                    key={i}
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800! shadow-md hover:shadow-2xl transition-all duration-500 bg-slate-900"
                  >
                    {/* Compact Card Canvas */}
                    <div className="relative h-[420px] sm:h-[450px] w-full overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0"
                      >
                        <Image
                          fill
                          src={item.img}
                          alt={item.title}
                          className="object-cover"
                          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        />
                      </motion.div>

                      {/* Enhanced Gradient Overlay for Instant Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 z-10" />

                      {/* Top Badge & Number Header */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        className="absolute top-4 left-4 right-4 flex items-center justify-between z-20"
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 text-[#e04f37] bg-white/60 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider! shadow-sm"
                        >
                          {item.tag}
                        </motion.span>
                      </motion.div>

                      {/* Card Bottom Content Zone */}
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20 flex flex-col justify-end">
                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                          className="text-lg sm:text-xl font-bold text-white leading-snug! mb-1! group-hover:text-[#f86048]! transition-colors duration-300"
                        >
                          <Link href="/project" className="line-clamp-2 text-white hover:text-[#f86048]">
                            {item.title}
                          </Link>
                        </motion.h3>

                        {/* Expandable Content Container */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                          className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100!"
                        >
                          <div className="overflow-hidden">
                            <p className="text-xs sm:text-sm !text-white/90 leading-relaxed! line-clamp-3 mb-4">
                              {item.description}
                            </p>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Link
                                href="/project"
                                className="inline-flex items-center gap-2 px-5 py-3 !bg-[#f86048] hover:!bg-[#e04f37] !text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl w-fit"
                              >
                                Explore Details
                                <motion.i
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  className="far fa-arrow-right text-xs"
                                />
                              </Link>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Inside Slider */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                prevSlide();
                setIsAutoPlaying(false);
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-slate-200 dark:border-slate-700! bg-white/90 dark:bg-slate-900/90! backdrop-blur-sm flex items-center justify-center hover:bg-[#f86048]! hover:border-[#f86048]! hover:text-white! transition-all group shadow-lg"
              aria-label="Previous slide"
            >
              <i className="far fa-arrow-left text-xs sm:text-sm text-white dark:text-slate-300!" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                nextSlide();
                setIsAutoPlaying(false);
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#f86048]! hover:border-[#f86048]! hover:text-white! transition-all group shadow-lg"
              aria-label="Next slide"
            >
              <i className="far fa-arrow-right text-xs sm:text-sm dark:text-slate-300! text-white!" />
            </motion.button>
          </div>

          {/* Progress Dots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
            className="mt-6! sm:mt-8! md:mt-10! lg:mt-12! flex items-center justify-center gap-1.5 sm:gap-2"
          >
            {Array.from({ length: totalSlides }).map((_, index: number) => (
              <motion.button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsAutoPlaying(false);
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className="relative h-1.5 rounded-full transition-all duration-300 overflow-hidden"
                style={{
                  width: index === currentIndex ? "32px" : "10px",
                  backgroundColor: index === currentIndex ? PRIMARY : "#cbd5e1",
                }}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && isAutoPlaying && (
                  <motion.div
                    className="absolute inset-0 bg-white/40"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:block absolute bottom-0 right-5 lg:right-10 select-none pointer-events-none opacity-[0.03]! dark:opacity-[0.05]!"
      >
        <h1 className="text-[12rem] lg:text-[15rem] xl:text-[18rem] font-black leading-none uppercase tracking-tighter!">
          Projects
        </h1>
      </motion.div>
    </section>
  );
};



// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const PRIMARY = "#f86048";

// export const Service1 = () => {
//   const serviceData = [
//     {
//       img: "/assets/img/service/1.webp",
//       title: "Sustainable Enterprise Project",
//       description:
//         "Driving self-sufficiency in milk production through advanced sustainable farming practices.",
//       tag: "Economics",
//     },
//     {
//       img: "/assets/img/service/02.webp",
//       title: "Integrated Agriculture Unit",
//       description:
//         "সাগরিকা সমাজ উন্নয়ন সংস্থায় ‘কৃষি ও প্রাণিসম্পদ ইউনিট’ এর একটি সমন্বিত উদ্যোগ।",
//       tag: "Agriculture",
//     },
//     {
//       img: "/assets/img/service/03.webp",
//       title: "Learning & Innovation (LIFT)",
//       description:
//         "Expanding Pekin duck production to ensure protein security and poverty alleviation.",
//       tag: "Innovation",
//     },
//     {
//       img: "/assets/img/service/5.webp",
//       title: "Enhancing Resources and Increasing Capacities of Poor Households towards Elimination of their Poverty-ENRICH",
//       description:
//         "Driving self-sufficiency in milk production through advanced sustainable farming practices.",
//       tag: "Economics",
//     },
//     {
//       img: "/assets/img/service/6.webp",
//       title: "Elderly People Programme of SSUS",
//       description:
//         "সাগরিকা সমাজ উন্নয়ন সংস্থায় ‘কৃষি ও প্রাণিসম্পদ ইউনিট’ এর একটি সমন্বিত উদ্যোগ।",
//       tag: "Agriculture",
//     },
//     {
//       img: "/assets/img/service/4.webp",
//       title: "Recovery and Advancement of Informal Sector Employment (RAISE)Project",
//       description:
//         "Expanding Pekin duck production to ensure protein security and poverty alleviation.",
//       tag: "Innovation",
//     },
//   ];

//   return (
//     <section className="py-16! md:py-24! lg:py-32! bg-white! dark:bg-[#0f172a]! overflow-hidden!">
//       <div className="container mx-auto px-4! sm:px-6! lg:max-w-7xl!">
//         <div className="flex flex-col md:flex-row justify-between items-start! md:items-end! mb-12! md:mb-20! gap-8!">
//           <div className="max-w-2xl w-full">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               className="flex items-center gap-4 mb-4!"
//             >
//               <div
//                 className="w-12! h-[2px]!"
//                 style={{ backgroundColor: PRIMARY }}
//               ></div>
//               <span
//                 className="font-black! uppercase! tracking-[0.3em]! text-[14px]!"
//                 style={{ color: PRIMARY }}
//               >
//                 Our Core Initiatives
//               </span>
//             </motion.div>
//             <h2 className="text-2xl! sm:text-3xl! md:text-4xl! lg:text-6xl! font-black! text-slate-900! dark:text-white! leading-tight! tracking-tighter!">
//               Strategic Solutions for Community Growth
//               <span style={{ color: PRIMARY }}>.</span>
//             </h2>
//           </div>
//           <Link
//             href="/project"
//             className="group flex items-center gap-4 text-[10px]! font-black! uppercase! tracking-widest! text-slate-400! hover:text-slate-900! dark:hover:text-white! transition-colors whitespace-nowrap!"
//           >
//             View All Projects
//             <div className="w-10! h-10! rounded-full border! border-slate-100! flex items-center justify-center group-hover:bg-[#f86048]! group-hover:border-[#f86048]! group-hover:text-white! transition-all">
//               <i className="far fa-arrow-right"></i>
//             </div>
//           </Link>
//         </div>

//         {/* Updated Grid - iPad Pro will show 2 columns */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8! md:gap-x-10! md:gap-y-16!">
//           {serviceData.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="group relative"
//             >
//               <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] mb-8 bg-slate-100 dark:bg-slate-800">
//                 <Image
//                   fill
//                   src={item.img}
//                   alt={item.title}
//                   className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2"
//                 />

//                 <div className="absolute top-6 left-6 md:top-8 md:left-8">
//                   <span className="text-3xl md:text-4xl font-black opacity-20 text-white tracking-tighter">
//                     0{i + 1}
//                   </span>
//                 </div>

//                 <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
//                   <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[9px] font-black text-white uppercase tracking-widest">
//                     {item.tag}
//                   </span>
//                 </div>
//               </div>

//               <div className="px-2">
//                 <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 leading-tight transition-colors">
//                   <Link href="/" className="group-hover:text-[#f86048]! dark:text-white!">{item.title}</Link>
//                 </h3>
//                 <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
//                   {item.description}
//                 </p>

//                 <Link
//                   href="/project"
//                   className="inline-flex items-center gap-3 text-[10px]! font-black! uppercase! tracking-widest! text-slate-400! group-hover:text-[#f86048]! transition-colors"
//                 >
//                   Explore Details
//                   <span className="w-8! h-[1px]! bg-slate-! group-hover:bg-[#f86048]! group-hover:w-12! transition-all" />
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       <div className="absolute bottom-0 right-10 select-none pointer-events-none opacity-[0.02] dark:opacity-[0.05] hidden lg:block">
//         <h1 className="text-[18rem] font-black leading-none uppercase tracking-tighter">
//           Projects
//         </h1>
//       </div>
//     </section>
//   );
// };