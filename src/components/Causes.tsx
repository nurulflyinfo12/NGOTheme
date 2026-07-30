"use client";
import { sliderProps } from "@/utility/sliderProps";
// import Image from "next/image";
// // import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect, useRef, TouchEvent } from "react";

// export const Causes1 = () => {
//   const causesData: {
//     img: string;
//     title: string;
//     description: string;
//     progress: number;
//     raised: string;
//     goal: string;
//     delay: string;
//   }[] = [
//     {
//       img: "/assets/img/microfinance/micro1.webp",
//       title: "Micro Finance Programme",
//       description:
//         "Providing microcredit and income generating opportunities to poor families for poverty reduction and women empowerment.",
//       progress: 85,
//       raised: "৳50,000,000",
//       goal: "৳60,000,000",
//       delay: ".3s",
//     },
//     {
//       img: "/assets/img/waterdistribution/1.webp",
//       title: "Rural WASH for Human Capital Development",
//       description:
//         "Increasing access to safe water, sanitary latrines, and hygiene practices to achieve SDG Goal 6 in rural communities.",
//       progress: 65,
//       raised: "৳12,000,000",
//       goal: "৳20,000,000",
//       delay: ".5s",
//     },
//     {
//       img: "/assets/img/factbg.webp",
//       title: "Disaster Management & Climate Adaptation",
//       description:
//         "Supporting disaster preparedness, climate resilience, and emergency response for vulnerable coastal communities.",
//       progress: 55,
//       raised: "৳8,500,000",
//       goal: "৳15,000,000",
//       delay: ".3s",
//     },
//     {
//       img: "/assets/img/scolarship/hh.jpg.jpg",
//       title: "Education Scholarship Program",
//       description:
//         "Providing scholarships to meritorious students from extremely poor families of microcredit beneficiaries.",
//       progress: 70,
//       raised: "৳6,000,000",
//       goal: "৳10,000,000",
//       delay: ".5s",
//     },
//     {
//       img: "/assets/img/factbg.webp",
//       title: "Adolescent Girl Empowerment Programme",
//       description:
//         "Building awareness and leadership among adolescent girls through training, clubs, and community engagement.",
//       progress: 60,
//       raised: "৳3,500,000",
//       goal: "৳7,000,000",
//       delay: ".3s",
//     },
//     {
//       img: "/assets/img/factbg.webp",
//       title: "Sustainable Microenterprise & Resilient Transformation (SMART)",
//       description:
//         "Supporting microenterprises in agribusiness, manufacturing, and services with climate-resilient technologies.",
//       progress: 40,
//       raised: "৳5,000,000",
//       goal: "৳12,000,000",
//       delay: ".5s",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
//   const [direction, setDirection] = useState<number>(0);
//   const [slidesPerView, setSlidesPerView] = useState<number>(2);
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const touchStartX = useRef<number>(0);
//   const touchEndX = useRef<number>(0);

//   // Detect screen size using media query
//   useEffect(() => {
//     const mobileQuery = window.matchMedia("(max-width: 767px)");
//     const tabletQuery = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
//     const desktopQuery = window.matchMedia("(min-width: 1280px)");

//     const updateSlidesPerView = () => {
//       if (mobileQuery.matches) {
//         setSlidesPerView(1);
//       } else if (tabletQuery.matches) {
//         setSlidesPerView(1);
//       } else {
//         setSlidesPerView(2);
//       }
//     };

//     updateSlidesPerView();

//     mobileQuery.addEventListener("change", updateSlidesPerView);
//     tabletQuery.addEventListener("change", updateSlidesPerView);
//     desktopQuery.addEventListener("change", updateSlidesPerView);

//     return () => {
//       mobileQuery.removeEventListener("change", updateSlidesPerView);
//       tabletQuery.removeEventListener("change", updateSlidesPerView);
//       desktopQuery.removeEventListener("change", updateSlidesPerView);
//     };
//   }, []);

//   const totalSlides = Math.ceil(causesData.length / slidesPerView);
//   const maxIndex = totalSlides - 1;

//   const nextSlide = () => {
//     setDirection(1);
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setDirection(-1);
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   };

//   const goToSlide = (index: number) => {
//     setDirection(index > currentIndex ? 1 : -1);
//     setCurrentIndex(index);
//   };

//   // Auto-play
//   useEffect(() => {
//     if (!isAutoPlaying) return;
    
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [currentIndex, isAutoPlaying, maxIndex]);

//   // Touch handlers
//   const handleTouchStart = (e: TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e: TouchEvent) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     const diff = touchStartX.current - touchEndX.current;
//     const threshold = 50;

//     if (Math.abs(diff) > threshold) {
//       if (diff > 0) {
//         nextSlide();
//       } else {
//         prevSlide();
//       }
//     }
//   };

//   // Get current visible slides
//   const getVisibleSlides = () => {
//     const start = currentIndex * slidesPerView;
//     const end = start + slidesPerView;
//     return causesData.slice(start, end);
//   };

//   // Animation variants with absolute positioning to prevent layout shift
//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 300 : -300,
//       opacity: 0,
//       position: "absolute" as const,
//       width: "100%",
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       position: "relative" as const,
//       width: "100%",
//     },
//     exit: (direction: number) => ({
//       x: direction > 0 ? -300 : 300,
//       opacity: 0,
//       position: "absolute" as const,
//       width: "100%",
//     }),
//   };

//   return (
//     <section className="causes-section fix section-bg section-padding py-16! sm:py-20! lg:py-28! bg-slate-50! dark:bg-[#0f172a]! overflow-hidden">
//       <div className="container mx-auto px-4! sm:px-6! lg:px-8! xl:max-w-7xl!">
//         <div className="section-title text-center mb-12! md:mb-16!">
//           <span className="sub-title color-2 wow fadeInUp inline-flex items-center gap-2 text-[#f86048]! font-semibold! uppercase! tracking-widest! text-sm! mb-4!">
//             <i className="far fa-heart" />
//             Help The People
//           </span>
//           <h2 className="text-3xl! sm:text-4xl! md:text-5xl! font-extrabold! text-slate-900! dark:text-white!">
//             Our Key Initiatives
//           </h2>
//         </div>

//         {/* Slider Container */}
//         <div
//           ref={sliderRef}
//           className="relative"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           onMouseEnter={() => setIsAutoPlaying(false)}
//           onMouseLeave={() => setIsAutoPlaying(true)}
//         >
//           {/* Navigation Arrows */}
//           <div className="flex justify-end gap-3 mb-6!">
//             <button
//               onClick={() => {
//                 prevSlide();
//                 setIsAutoPlaying(false);
//               }}
//               className="w-10! h-10! sm:w-12! sm:h-12! rounded-full border! border-slate-300! dark:border-slate-600! flex items-center justify-center hover:bg-[#f86048]! hover:border-[#f86048]! hover:text-white! transition-all group"
//               aria-label="Previous slide"
//             >
//               <i className="far fa-arrow-left group-hover:text-white!"></i>
//             </button>
//             <button
//               onClick={() => {
//                 nextSlide();
//                 setIsAutoPlaying(false);
//               }}
//               className="w-10! h-10! sm:w-12! sm:h-12! rounded-full border! border-slate-300! dark:border-slate-600! flex items-center justify-center hover:bg-[#f86048]! hover:border-[#f86048]! hover:text-white! transition-all group"
//               aria-label="Next slide"
//             >
//               <i className="far fa-arrow-right group-hover:text-white!"></i>
//             </button>
//           </div>

//           {/* Fixed height container to prevent layout shift */}
//           <div className="overflow-hidden relative" style={{ minHeight: "400px" }}>
//             <AnimatePresence initial={false} custom={direction} mode="popLayout">
//               <motion.div
//                 key={currentIndex}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.3 },
//                 }}
//                 className={`grid gap-6! ${
//                   slidesPerView === 1 
//                     ? 'grid-cols-1' 
//                     : 'grid-cols-1 xl:grid-cols-2'
//                 }`}
//                 style={{ width: "100%" }}
//               >
//                 {getVisibleSlides().map((item, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.15 }}
//                     className="popular-causes-card-items bg-white! dark:bg-slate-800! rounded-2xl! border! border-slate-100! dark:border-slate-700! p-4! sm:p-6! transition-all hover:shadow-xl! h-full!"
//                   >
//                     {/* Card inner layout */}
//                     <div className="flex flex-col lg:flex-row items-center gap-4! sm:gap-6! h-full!">
//                       {/* Image container */}
//                       <div className="w-full lg:w-1/2 shrink-0">
//                         <div className="relative aspect-[4/3] overflow-hidden rounded-xl!">
//                           <Image
//                             width={0}
//                             height={0}
//                             sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
//                             className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
//                             src={item.img}
//                             alt="cause"
//                           />
//                         </div>
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1">
//                         <h4 className="text-lg! sm:text-xl! font-semibold! mb-2! sm:mb-3! text-slate-900! dark:text-white!">
//                           {item.title}
//                         </h4>
//                         <p className="text-sm! sm:text-base! text-gray-600! dark:text-slate-400! mb-4! sm:mb-6! line-clamp-3">
//                           {item.description}
//                         </p>

//                         {/* Progress bar */}
//                         <div className="mb-4!">
//                           <div className="flex justify-between items-center mb-2!">
//                             <span className="text-sm! font-medium! text-[#f86048]!">
//                               {item.progress}%
//                             </span>
//                             <span className="text-xs! text-slate-500! dark:text-slate-400!">
//                               Raised: <b className="dark:text-white!">{item.raised}</b>
//                             </span>
//                           </div>
//                           <div className="w-full bg-gray-200! dark:bg-slate-700! rounded-full! h-2! overflow-hidden">
//                             <motion.div
//                               initial={{ width: 0 }}
//                               whileInView={{ width: `${item.progress}%` }}
//                               viewport={{ once: true }}
//                               transition={{ duration: 1, delay: 0.5 }}
//                               className="bg-[#f86048]! h-full! rounded-full!"
//                             />
//                           </div>
//                           <div className="flex justify-between text-xs! mt-2! text-slate-600! dark:text-slate-400!">
//                             <span>Goal: <b className="dark:text-white!">{item.goal}</b></span>
//                           </div>
//                         </div>

//                         <Link
//                           href="/donation-details"
//                           className="inline-flex items-center gap-2! px-4! sm:px-6! py-2! sm:py-3! bg-[#f86048]! hover:bg-[#e04e3a]! text-white! rounded-full! transition-all! text-sm! font-semibold! hover:gap-3!"
//                         >
//                           <i className="far fa-heart" /> Donate Now
//                         </Link>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Progress Dots */}
//           <div className="mt-8! sm:mt-10! flex items-center justify-center gap-2!">
//             {Array.from({ length: totalSlides }).map((_, index: number) => (
//               <button
//                 key={index}
//                 onClick={() => {
//                   goToSlide(index);
//                   setIsAutoPlaying(false);
//                 }}
//                 className="relative h-1.5! rounded-full! transition-all! duration-300! overflow-hidden"
//                 style={{
//                   width: index === currentIndex ? "40px" : "12px",
//                   backgroundColor: index === currentIndex ? "#f86048" : "#cbd5e1",
//                 }}
//                 aria-label={`Go to slide ${index + 1}`}
//               >
//                 {index === currentIndex && isAutoPlaying && (
//                   <motion.div
//                     className="absolute inset-0 bg-white/30"
//                     initial={{ width: "0%" }}
//                     animate={{ width: "100%" }}
//                     transition={{ duration: 4, ease: "linear" }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export const Causes1 = () => {
  const causesData: {
    img: string;
    title: string;
    description: string;
    progress: number;
    raised: string;
    goal: string;
    delay: string;
  }[] = [
    {
      img: "/assets/img/microfinance/micro1.webp",
      title: "Micro Finance Programme",
      description:
        "Providing microcredit and income generating opportunities to poor families for poverty reduction and women empowerment.",
      progress: 85,
      raised: "৳50,000,000",
      goal: "৳60,000,000",
      delay: ".3s",
    },
    {
      img: "/assets/img/waterdistribution/1.webp",
      title: "Rural WASH for Human Capital Development",
      description:
        "Increasing access to safe water, sanitary latrines, and hygiene practices to achieve SDG Goal 6 in rural communities.",
      progress: 65,
      raised: "৳12,000,000",
      goal: "৳20,000,000",
      delay: ".5s",
    },
    {
      img: "/assets/img/factbg.webp",
      title: "Disaster Management & Climate Adaptation",
      description:
        "Supporting disaster preparedness, climate resilience, and emergency response for vulnerable coastal communities.",
      progress: 55,
      raised: "৳8,500,000",
      goal: "৳15,000,000",
      delay: ".3s",
    },
    {
      img: "/assets/img/scolarship/hh.jpg.jpg",
      title: "Education Scholarship Program",
      description:
        "Providing scholarships to meritorious students from extremely poor families of microcredit beneficiaries.",
      progress: 70,
      raised: "৳6,000,000",
      goal: "৳10,000,000",
      delay: ".5s",
    },
    {
      img: "/assets/img/factbg.webp",
      title: "Adolescent Girl Empowerment Programme",
      description:
        "Building awareness and leadership among adolescent girls through training, clubs, and community engagement.",
      progress: 60,
      raised: "৳3,500,000",
      goal: "৳7,000,000",
      delay: ".3s",
    },
    {
      img: "/assets/img/factbg.webp",
      title: "Sustainable Microenterprise & Resilient Transformation (SMART)",
      description:
        "Supporting microenterprises in agribusiness, manufacturing, and services with climate-resilient technologies.",
      progress: 40,
      raised: "৳5,000,000",
      goal: "৳12,000,000",
      delay: ".5s",
    },
  ];

  return (
    <section className="causes-section fix section-bg section-padding bg-slate-50 dark:bg-[#0f172a]!">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title color-2 wow fadeInUp">
            <i className="far fa-heart" />
            Help The People
          </span>
          <h2 className="mt-char-animation dark:text-white!">Our Key Initiatives</h2>
        </div>

        {/* Main grid: 2 cards per row on xl+, 1 on smaller */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {causesData.map((item, i) => (
            <div
              key={i}
              className="wow fadeInUp popular-causes-card-items bg-white dark:bg-slate-800! rounded-2xl border border-slate-100 dark:border-slate-700! p-4! transition-all hover:shadow-lg!"
              data-wow-delay={item.delay}
            >
              {/* Card inner layout: stack on mobile, side‑by‑side on lg+ */}
              <div className="flex flex-col lg:flex-row items-center gap-4">
                {/* Image container */}
                <div className="w-full lg:w-1/2 shrink-0">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto rounded-lg"
                    src={item.img}
                    alt="cause"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2! text-slate-900 dark:text-white!">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-slate-400! mb-4!">
                    {item.description}
                  </p>

                  {/* Progress and button (uncomment when needed) */}
                  {/* 
                  <div className="mb-4">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.progress}%
                    </span>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-slate-600 dark:text-slate-400">
                      <span>Raised <b className="dark:text-white">{item.raised}</b></span>
                      <span>Goal <b className="dark:text-white">{item.goal}</b></span>
                    </div>
                  </div>
                  <Link
                    href="/donation-details"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full transition"
                  >
                    <i className="far fa-heart" /> Donate Now
                  </Link>
                  */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Causes2 = () => {
  const causesData: {
    img: string;
    category: string;
    title: string;
    progress: number;
    raised: string;
    goal: string;
  }[] = [
    {
      img: "/assets/img/causes/04.jpg",
      category: "Water",
      title: "Rebecca's New Album Aid for the Needy",
      progress: 70,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/05.jpg",
      category: "Foods",
      title: "Charity Showcases Nation's Kindness",
      progress: 90,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/06.jpg",
      category: "Medical",
      title: "Provide Healthy Meals to an Impoverished Rural Child",
      progress: 55,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/07.jpg",
      category: "Water",
      title: "Rebecca's New Album Aid for the Needy",
      progress: 80,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/04.jpg",
      category: "Water",
      title: "Rebecca's New Album Aid for the Needy",
      progress: 70,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/05.jpg",
      category: "Foods",
      title: "Charity Showcases Nation's Kindness",
      progress: 90,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/06.jpg",
      category: "Medical",
      title: "Provide Healthy Meals to an Impoverished Rural Child",
      progress: 55,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/07.jpg",
      category: "Water",
      title: "Rebecca's New Album Aid for the Needy",
      progress: 80,
      raised: "$4,407",
      goal: "$10.000",
    },
  ];
  return (
    <section className="causes-section fix section-bg section-padding">
      <div className="container">
        <div className="section-title-area">
          <div className="section-title">
            <span className="sub-title color-2 wow fadeInUp">
              <i className="far fa-heart" /> Recent Causes
            </span>
            <h2 className="mt-char-animation">
              Introducing Our <br /> Campaigns
            </h2>
          </div>
          <div className="array-button">
            <button className="array-prev">
              <i className="fas fa-long-arrow-left" />
            </button>
            <button className="array-next">
              <i className="fas fa-long-arrow-right" />
            </button>
          </div>
        </div>
        <div className="causes-wrapper">
          <Swiper {...sliderProps.causes1} className="swiper causes-slider-2">
            <div className="swiper-wrapper">
              {causesData.map((cause, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="causes-card-items card-style-2">
                    <div className="causes-image">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        src={cause.img}
                        alt={cause.title}
                      />
                      <div className="post-cat">{cause.category}</div>
                    </div>
                    <div className="causes-content">
                      <h3>
                        <Link href="/causes-details">{cause.title}</Link>
                      </h3>
                      <div className="progress-items">
                        <span className="point">{cause.progress}%</span>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: `${cause.progress}%` }}
                          />
                        </div>
                        <div className="progress-goals">
                          <span>
                            Raised <b>{cause.raised}</b>
                          </span>
                          <span>
                            Goal <b>{cause.goal}</b>
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/donation-details"
                        className="theme-btn transparent-btn-2"
                      >
                        <i className="far fa-heart" /> Donate Now
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export const Causes3 = () => {
  const causes: {
    delay: string;
    bgImage: string;
    category: string;
    author: string;
    title: string;
    raised: number;
    goal: number;
  }[] = [
    {
      delay: ".3s",
      bgImage: "/assets/img/causes/01.jpg",
      category: "Water",
      author: "Miranda H.",
      title: "Because Everyone Deserves Clean Water",
      raised: 70,
      goal: 3000,
    },
    {
      delay: ".5s",
      bgImage: "/assets/img/causes/02.jpg",
      category: "Health",
      author: "Miranda H.",
      title: "Free And Cost-Effective Health Care for the poor",
      raised: 9500,
      goal: 20000,
    },
    {
      delay: ".7s",
      bgImage: "/assets/img/causes/03.jpg",
      category: "Foods",
      author: "Miranda H.",
      title: "Our Donation Is Hope For Poor Children's",
      raised: 3000,
      goal: 7000,
    },
  ];

  return (
    <section className="causes-section fix section-padding fix section-bg">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">
            <i className="far fa-heart" />
            Trending Cause
          </span>
          <h2 className="mt-char-animation">
            It’s About Impact, <br />
            <span>Good</span> History
          </h2>
        </div>
        <div className="row">
          {causes.map((cause, index) => (
            <div
              key={index}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={cause.delay}
            >
              <div className="causes-box-items">
                <div
                  className="causes-image bg-cover"
                  style={{ backgroundImage: `url(${cause.bgImage})` }}
                />
                <div className="cause-content">
                  <div className="cause-meta">
                    <Link href="/causes" className="cause-cat">
                      {cause.category}
                    </Link>
                    <a href="#" className="cause-author">
                      <i className="fal fa-user" /> By {cause.author}
                    </a>
                  </div>
                  <h4>
                    <Link href="/causes-details">{cause.title}</Link>
                  </h4>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      data-wow-duration=".9s"
                      role="progressbar"
                      style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                      aria-valuenow={cause.raised}
                      aria-valuemin={0}
                      aria-valuemax={cause.goal}
                    />
                  </div>
                  <div className="cause-amount d-flex justify-content-between">
                    <div className="price-raised">
                      <i className="far fa-heart" />
                      <span>{cause.raised}</span> Raised
                    </div>
                    <div className="price-goal">
                      <i className="far fa-analytics" />
                      <span>${cause.goal}</span> Goal
                    </div>
                    <div className="read-cause-link">
                      <Link href="/causes-details">
                        <i className="fal fa-share" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Causes4 = () => {
  const causes: {
    title: string;
    description: string;
    image: string;
    progress: number;
    raised: string;
    goal: string;
  }[] = [
    {
      title: "Raise Fund For Clean & Healthy Food",
      description:
        "There are only a few times in each of our lives that we get to witness.",
      image: "/assets/img/causes/01.png",
      progress: 70,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      title: "Give African Child A Good Education",
      description:
        "There are only a few times in each of our lives that we get to witness.",
      image: "/assets/img/causes/02.png",
      progress: 90,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      title: "Raise Fund For Clean & Healthy Food",
      description:
        "There are only a few times in each of our lives that we get to witness.",
      image: "/assets/img/causes/03.png",
      progress: 55,
      raised: "$4,407",
      goal: "$10.000",
    },
  ];

  return (
    <section className="causes-section-2 fix section-padding fix section-bg">
      <div className="container">
        <div className="section-title">
          <span className="sub-title color-2 wow fadeInUp">
            <i className="far fa-heart" />
            Help The People
          </span>
          <h2 className="mt-char-animation">
            Our <span>Popular</span> Causes
          </h2>
        </div>
        <Swiper {...sliderProps.causes2} className="swiper causes-slider">
          <div className="swiper-wrapper">
            {causes.map((cause, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="causes-card-items">
                  <div className="causes-image">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      src={cause.image}
                      alt="img"
                    />
                  </div>
                  <div className="causes-content">
                    <h3>
                      <Link href="/donation-details">{cause.title}</Link>
                    </h3>
                    <p>{cause.description}</p>
                    <div className="progress-items">
                      <span className="point">{cause.progress}%</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          data-wow-duration=".9s"
                          role="progressbar"
                          style={{ width: `${cause.progress}%` }}
                          aria-valuenow={cause.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <div className="progress-goals">
                        <span>
                          Raised <b> {cause.raised}</b>
                        </span>
                        <span>
                          Goal <b> {cause.goal}</b>
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/donation-details"
                      className="theme-btn transparent-btn-2"
                    >
                      <i className="far fa-heart" /> Donate Now
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export const Causes5 = () => {
  const events: {
    category: string;
    date: string;
    title: string;
    location: string;
    image: string;
  }[] = [
    {
      category: "Water Day",
      date: "24th January 2024",
      title: "2024 Water Full Day Main Conference",
      location: "M12/A Miranda Hall Town Hall Street New York, United States",
      image: "/assets/img/event/event-card-bg.webp",
    },
    {
      category: "Friendship Day",
      date: "24th May 2024",
      title: "How We Can Be A Good Friends",
      location: "M12/A Miranda Hall Town Hall Street New York, United States",
      image: "/assets/img/event/event-card-bg.webp",
    },
    {
      category: "Teachers Day",
      date: "24th January 2024",
      title: "Teachers Presentation Day of 2024",
      location: "M12/A Miranda Hall Town Hall Street New York, United States",
      image: "/assets/img/event/event-card-bg.webp",
    },
  ];

  return (
    <section className="event-section fix section-padding fix section-bg">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title color-2 wow fadeInUp">
            <i className="far fa-heart" />
            Events
          </span>
          <h2 className="mt-char-animation">Upcoming Events</h2>
        </div>
        <div className="row">
          {events.map((event, index) => {
            const delay = (0.3 + index * 0.2).toFixed(1) + "s";
            return (
              <div
                key={index}
                className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay={delay}
              >
                <div
                  className="event-box-items bg-cover"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  <div className="cat-name">
                    <Link href="/events">{event.category}</Link>
                  </div>
                  <span>{event.date}</span>
                  <h3>
                    <Link href="/event-details">{event.title}</Link>
                  </h3>
                  <p>
                    <i className="fal fa-map-marker-alt" /> {event.location}
                  </p>
                  <Link href="/event-details" className="buy-ticket">
                    <i className="fal fa-chair" /> Book Your Seat
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CausesCard = ({
  id,
  delay,
  image,
  category,
  author,
  title,
  progress,
  raised,
  goal,
}: {
  id: number;
  delay: string;
  image: string;
  category: string;
  author: string;
  title: string;
  progress: number;
  raised: number;
  goal: number;
}) => (
  <div
    key={id}
    className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
    data-wow-delay={delay}
  >
    <div className="causes-box-items box-shadow">
      <div
        className="causes-image bg-cover"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="cause-content">
        <div className="cause-meta">
          <Link href="/causes" className="cause-cat">
            {category}
          </Link>
          <a href="#" className="cause-author">
            <i className="fal fa-user" />
            By {author}
          </a>
        </div>
        <h4>
          <Link href="/causes-details">{title}</Link>
        </h4>
        <div className="progress">
          <div
            className="progress-bar"
            data-wow-duration=".9s"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="cause-amount d-flex justify-content-between">
          <div className="price-raised">
            <i className="far fa-heart" />
            <span>{raised}</span> Raised
          </div>
          <div className="price-goal">
            <i className="far fa-analytics" />
            <span>${goal}</span> Goal
          </div>
          <div className="read-cause-link">
            <Link href="/causes-details">
              <i className="fal fa-share" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CausesTab = () => {
  const tabs: {
    key: string;
    label: string;
    active?: boolean;
    delay?: string;
  }[] = [
    { key: "categories", label: "All Categories", active: true, delay: ".3s" },
    { key: "education", label: "Education", delay: ".5s" },
    { key: "madicine", label: "Medicine", delay: ".7s" },
    { key: "food", label: "Foods", delay: ".9s" },
    { key: "water", label: "Water", delay: "1.1s" },
  ];

  const tabContentItems: Record<
    string,
    {
      id: number;
      category: string;
      image: string;
      title: string;
      raised: number;
      goal: number;
      progress: number;
      author: string;
      delay: string;
    }[]
  > = {
    categories: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 55,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 2,
        category: "Foods",
        image: "/assets/img/causes/02.jpg",
        title: "Our Donation Is Hope For Poor Children's",
        raised: 220,
        goal: 6000,
        progress: 45,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 3,
        category: "Healthy",
        image: "/assets/img/causes/03.jpg",
        title: "Raise Fund For Clean & Healthy Water",
        raised: 70,
        goal: 3000,
        progress: 70,
        author: "Miranda H.",
        delay: ".7s",
      },
      {
        id: 4,
        category: "Education",
        image: "/assets/img/causes/03.jpg",
        title: "Emergency Response And Schools Food",
        raised: 1220,
        goal: 8000,
        progress: 90,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 5,
        category: "Education",
        image: "/assets/img/causes/01.jpg",
        title: "Children Education Needs For Change The World.",
        raised: 6400,
        goal: 9000,
        progress: 80,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 6,
        category: "Health",
        image: "/assets/img/causes/02.jpg",
        title: "Free And Cost-Effective Health Care",
        raised: 350,
        goal: 2000,
        progress: 85,
        author: "Miranda H.",
        delay: ".7s",
      },
      {
        id: 7,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Everyone Deserves Pure Clean Water",
        raised: 800,
        goal: 4500,
        progress: 70,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 8,
        category: "Education",
        image: "/assets/img/causes/02.jpg",
        title: "Fundraising For Early Childhood Rise",
        raised: 70,
        goal: 3000,
        progress: 55,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 9,
        category: "Education",
        image: "/assets/img/causes/03.jpg",
        title: "Children Education Needs For Change The World.",
        raised: 70,
        goal: 3000,
        progress: 65,
        author: "Miranda H.",
        delay: ".7s",
      },
    ],
    education: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Everyone in the world Clean Water",
        raised: 70,
        goal: 3000,
        progress: 90,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 2,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 50,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 3,
        category: "Water",
        image: "/assets/img/causes/03.jpg",
        title: "Deserves Basic Education for the poor",
        raised: 670,
        goal: 6000,
        progress: 90,
        author: "Miranda H.",
        delay: ".7s",
      },
      {
        id: 4,
        category: "Water",
        image: "/assets/img/causes/03.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 760,
        goal: 6600,
        progress: 70,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 5,
        category: "Foods",
        image: "/assets/img/causes/01.jpg",
        title: "Everyone Want to eating foods",
        raised: 700,
        goal: 2000,
        progress: 60,
        author: "Miranda H.",
        delay: ".5s",
      },
    ],
    madicine: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 40,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 2,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 80,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 3,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 88,
        author: "Miranda H.",
        delay: ".5s",
      },
    ],
    food: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 44,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 2,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 90,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 3,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 60,
        author: "Miranda H.",
        delay: ".7s",
      },
      {
        id: 4,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 50,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 5,
        category: "Water",
        image: "/assets/img/causes/03.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 90,
        author: "Miranda H.",
        delay: ".7s",
      },
    ],
    water: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 90,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 2,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 60,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 3,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 70,
        author: "Miranda H.",
        delay: ".7s",
      },
    ],
  };
  return (
    <section className="causes-section fix section-padding fix">
      <div className="container">
        <Tab.Container defaultActiveKey={"categories"}>
          <div className="cuases-tab-header">
            <Nav as={"ul"} className="nav mb-4" role="tablist">
              {tabs.map((tab) => (
                <Nav.Item
                  key={tab.key}
                  as="li"
                  className="nav-item wow fadeInUp"
                  data-wow-delay={tab.delay}
                  role="presentation"
                >
                  <Nav.Link
                    as="a"
                    href={`#${tab.key}`}
                    eventKey={tab.key}
                    data-bs-toggle="tab"
                    className="nav-link"
                    role="tab"
                  >
                    {tab.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          <Tab.Content className="tab-content">
            {Object.entries(tabContentItems).map(([key, events]) => (
              <Tab.Pane key={key} eventKey={key} className="tab-pane fade">
                <div className="row">
                  {events.map((event) => (
                    <CausesCard
                      key={event.id}
                      id={event.id}
                      delay={event.delay}
                      image={event.image}
                      category={event.category}
                      author={event.author}
                      title={event.title}
                      progress={event.progress}
                      raised={event.raised}
                      goal={event.goal}
                    />
                  ))}
                </div>
              </Tab.Pane>
            ))}
            <div className="page-nav-wrap mt-5 text-center">
              <ul>
                <li>
                  <a className="page-numbers" href="#">
                    <i className="fal fa-long-arrow-left" />
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    01
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    02
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    ..
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    10
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    11
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    <i className="fal fa-long-arrow-right" />
                  </a>
                </li>
              </ul>
            </div>
          </Tab.Content>
        </Tab.Container>
      </div>
    </section>
  );
};
