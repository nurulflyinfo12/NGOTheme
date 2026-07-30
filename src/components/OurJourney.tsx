"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";

const OurJourney = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const journeySteps = [
    {
      year: "1985",
      phase: "The Foundation",
      icon: "fa-seedling",
      topDesc: "",
      bottomDesc:
        "Founded by Fazlul Haque (Hoque Saheb) to save coastal communities from natural disasters and poverty, encouraged by Mohammad Saidur Rahman (BDPC).",
    },
    {
      year: "1987-1991",
      phase: "Early Growth & WASH",
      icon: "fa-faucet",
      topDesc:
        "Received first OXFAM fund in 1987 for capacity building. Partnered with NGO Forum in 1991 for DWSS and established a VSC center in 1994.",
      bottomDesc: "",
    },
    {
      year: "1993-1997",
      phase: "Strategic Alliances",
      icon: "fa-handshake",
      topDesc: "",
      bottomDesc:
        "Established partnership with PKSF (1993) for microfinance. Launched Non-Formal Primary Education (NFPE) with BRAC support in 1997.",
    },
    {
      year: "2014-2018",
      phase: "Expansion & Elderly Care",
      icon: "fa-heart",
      topDesc:
        "Launched Samriddi Project (2014) and Elderly People Livelihood Program (2017). Started 'Housing for All' with Bangladesh Bank support.",
      bottomDesc: "",
    },
    {
      year: "2020-2022",
      phase: "Modern Resilience",
      icon: "fa-shield-virus",
      topDesc: "",
      bottomDesc:
        "Implemented COVID-19 Refinancing loans (2020). Launched BDRWASH, RAISE, and CDSP-Bridging projects in 2022 with World Bank & IFAD.",
    },
  ];

  // Enhanced desktop animation variants with scale and spring
  const desktopVariants = [
    {
      hidden: { opacity: 0, y: -80, scale: 0.8 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
    {
      hidden: { opacity: 0, y: -80, scale: 0.8 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
    {
      hidden: { opacity: 0, y: -80, scale: 0.8 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
    {
      hidden: { opacity: 0, y: 80, scale: 0.8 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
    {
      hidden: { opacity: 0, y: 80, scale: 0.8 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
  ];

  // Desktop delays for staggered spring animation
  const desktopDelays = [0, 0.25, 0.5, 0.15, 0.4];

  // Enhanced mobile animation variants with slide and fade
  const mobileVariants = {
    hidden: { opacity: 0, x: -80, rotateY: 15 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
  };

  // Header animation variants - FIXED
  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  };

  // Line drawing animation
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
    },
  };

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

  return (
    <>
      <section
        ref={sectionRef}
        className="pt-16 pb-16 md:pt-24 md:pb-24 bg-slate-50 dark:bg-[#0f172a]! overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with enhanced animation */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-8 md:mb-10!"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={isVisible ? { width: "3rem" } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="h-1 bg-[#f86048] rounded"
              ></motion.div>
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
                className="text-[#f86048] font-bold uppercase tracking-widest text-xs"
              >
                Established 1985
              </motion.span>
              <motion.div 
                initial={{ width: 0 }}
                animate={isVisible ? { width: "3rem" } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="h-1 bg-[#f86048] rounded"
              ></motion.div>
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 100 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white!"
            >
              Our Journey
            </motion.h2>
          </motion.div>

          {/* Horizontal Timeline - Desktop & Tablet */}
          <div className="hidden md:block relative overflow-x-auto pb-12 no-scrollbar">
            <div className="flex min-w-[1100px] lg:min-w-[1250px] justify-between items-center relative px-4 py-12">
              {/* Timeline Line with drawing animation */}
              <motion.div 
                variants={lineVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
                className="absolute top-1/2 left-0 w-full h-[3px] bg-[#f86048] -translate-y-1/2 origin-left"
                style={{ transformOrigin: 'left center' }}
              ></motion.div>

              {journeySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={desktopVariants[index]}
                  transition={{
                    duration: 1,
                    delay: desktopDelays[index],
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                  }}
                  className="relative z-10 w-64 lg:w-72 flex flex-col items-center"
                >
                  {/* Top Description with reveal animation */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: desktopDelays[index] + 0.3 }}
                    className="h-40 flex flex-col justify-end items-center mb-8! text-center"
                  >
                    {step.topDesc ? (
                      <motion.div 
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white dark:bg-slate-800! p-4 rounded-2xl shadow border border-slate-100 dark:border-slate-700! max-w-[240px]"
                      >
                        <p className="text-xs text-slate-600 dark:text-slate-400! leading-relaxed!">
                          {step.topDesc}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={isVisible ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: desktopDelays[index] + 0.4, type: "spring", stiffness: 200 }}
                        className="text-4xl font-black text-slate-700 dark:text-slate-300! opacity-70"
                      >
                        {step.year.split("-")[0]}
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Main Circle with enhanced hover and pulse */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isVisible ? {
                      boxShadow: [
                        "0 0 0 0 rgba(248, 96, 72, 0.4)",
                        "0 0 0 15px rgba(248, 96, 72, 0)",
                        "0 0 0 0 rgba(248, 96, 72, 0.4)"
                      ]
                    } : {}}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        delay: desktopDelays[index] + 1,
                      }
                    }}
                    className="w-40 lg:w-52 h-40 lg:h-52 rounded-full border-4 border-[#f86048]/20 bg-white dark:bg-slate-800! shadow-xl flex flex-col items-center justify-center text-center p-4 lg:p-6 hover:border-[#f86048]/40 transition-colors cursor-pointer"
                  >
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className="w-12 lg:w-16 h-12 lg:h-16 bg-[#f86048]/10 rounded-2xl flex items-center justify-center mb-3! lg:mb-4!"
                    >
                      <i className={`fas ${step.icon} text-[#f86048] text-2xl lg:text-4xl`}></i>
                    </motion.div>

                    <motion.h4 
                      initial={{ opacity: 0, y: 10 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: desktopDelays[index] + 0.6 }}
                      className="text-xs lg:text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white!"
                    >
                      {step.phase}
                    </motion.h4>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: desktopDelays[index] + 0.8, type: "spring", stiffness: 200 }}
                      className="mt-2 text-[#f86048] font-bold text-base lg:text-lg"
                    >
                      {step.year}
                    </motion.div>
                  </motion.div>

                  {/* Bottom Description with reveal animation */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: desktopDelays[index] + 0.3 }}
                    className="h-40 mt-8 flex flex-col justify-start items-center text-center"
                  >
                    {step.bottomDesc ? (
                      <motion.div 
                        whileHover={{ scale: 1.05, y: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white dark:bg-slate-800! p-4 rounded-2xl shadow border border-slate-100 dark:border-slate-700! max-w-[240px]"
                      >
                        <p className="text-xs text-slate-600 dark:text-slate-400! leading-relaxed!">
                          {step.bottomDesc}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={isVisible ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: desktopDelays[index] + 0.4, type: "spring", stiffness: 200 }}
                        className="text-4xl font-black text-slate-700 dark:text-slate-300! opacity-70"
                      >
                        {step.year.includes("-") ? step.year.split("-")[1] : step.year}
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Arrow with fade animation */}
                  {index < journeySteps.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: desktopDelays[index] + 1, type: "spring", stiffness: 200 }}
                      className="absolute top-[190px] -right-6 hidden lg:block"
                    >
                      <i className="fas fa-arrow-right text-[#f86048] text-2xl" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vertical Timeline - Mobile */}
          <div className="md:hidden relative">
            {/* Vertical Line with grow animation */}
            <motion.div 
              initial={{ height: 0 }}
              animate={isVisible ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute left-8 top-0 w-[3px] bg-[#f86048]"
              style={{ transformOrigin: 'top center' }}
            ></motion.div>

            <div className="space-y-12">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={mobileVariants}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.25,
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                  }}
                  className="relative pl-20"
                >
                  {/* Year Circle on Line with pulse */}
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    animate={isVisible ? {
                      boxShadow: [
                        "0 0 0 0 rgba(248, 96, 72, 0.4)",
                        "0 0 0 10px rgba(248, 96, 72, 0)",
                        "0 0 0 0 rgba(248, 96, 72, 0.4)"
                      ]
                    } : {}}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.25 + 1,
                      }
                    }}
                    className="absolute left-0 top-0 w-16 h-16 rounded-full border-4 border-[#f86048]/20 bg-white dark:bg-slate-800! shadow-lg flex items-center justify-center z-10"
                  >
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-10 h-10 bg-[#f86048]/10 rounded-full flex items-center justify-center"
                    >
                      <i className={`fas ${step.icon} text-[#f86048] text-xl`}></i>
                    </motion.div>
                  </motion.div>

                  {/* Content Card with lift effect */}
                  <motion.div
                    whileHover={{ scale: 1.03, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white dark:bg-slate-800! rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700! p-5"
                  >
                    <div className="flex items-center justify-between mb-3!">
                      <h4 className="text-sm font-bold uppercase tracking-widest! text-slate-900 dark:text-white!">
                        {step.phase}
                      </h4>
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={isVisible ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.25 + 0.5, type: "spring", stiffness: 200 }}
                        className="text-[#f86048] font-bold text-sm"
                      >
                        {step.year}
                      </motion.span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400! leading-relaxed!">
                      {step.topDesc || step.bottomDesc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurJourney;





// "use client";
// import { motion } from "framer-motion";

// import PageBanner from "@/components/PageBanner";
// import DanboxLayout from "@/layout/DanboxLayout";

// const OurJourney = () => {
//   const journeySteps = [
//     {
//       year: "1985",
//       phase: "The Foundation",
//       icon: "fa-seedling",
//       topDesc: "",
//       bottomDesc:
//         "Founded by Fazlul Haque (Hoque Saheb) to save coastal communities from natural disasters and poverty, encouraged by Mohammad Saidur Rahman (BDPC).",
//     },
//     {
//       year: "1987-1991",
//       phase: "Early Growth & WASH",
//       icon: "fa-faucet",
//       topDesc:
//         "Received first OXFAM fund in 1987 for capacity building. Partnered with NGO Forum in 1991 for DWSS and established a VSC center in 1994.",
//       bottomDesc: "",
//     },
//     {
//       year: "1993-1997",
//       phase: "Strategic Alliances",
//       icon: "fa-handshake",
//       topDesc: "",
//       bottomDesc:
//         "Established partnership with PKSF (1993) for microfinance. Launched Non-Formal Primary Education (NFPE) with BRAC support in 1997.",
//     },
//     {
//       year: "2014-2018",
//       phase: "Expansion & Elderly Care",
//       icon: "fa-heart",
//       topDesc:
//         "Launched Samriddi Project (2014) and Elderly People Livelihood Program (2017). Started 'Housing for All' with Bangladesh Bank support.",
//       bottomDesc: "",
//     },
//     {
//       year: "2020-2022",
//       phase: "Modern Resilience",
//       icon: "fa-shield-virus",
//       topDesc: "",
//       bottomDesc:
//         "Implemented COVID-19 Refinancing loans (2020). Launched BDRWASH, RAISE, and CDSP-Bridging projects in 2022 with World Bank & IFAD.",
//     },
//   ];

//   return (
//     <>
//       <section className="pt-24! pb-24! bg-slate-50! dark:bg-[#0f172a]! overflow-hidden">
//         <div className="px-6! lg:px-16!">
//           {/* Header */}
//           <div className="text-center container">
//             <div className="flex items-center justify-center gap-3 mb-4!">
//               <div className="w-12 h-1 bg-[#f86048] rounded"></div>
//               <span className="text-[#f86048] font-bold uppercase tracking-widest text-xs">
//                 Established 1985
//               </span>
//               <div className="w-12 h-1 bg-[#f86048] rounded"></div>
//             </div>

//             <h2 className="text-4xl md:text-5xl font-extrabold! text-slate-900! dark:text-white! mb-6!">
//               Our Journey
//             </h2>

//             {/* <div className="grid md:grid-cols-2 gap-8">
//               <p className="text-slate-700 dark:text-gray-300 text-lg leading-relaxed!">
//                 Founded by <strong>Fazlul Haque (Hoque Saheb)</strong>, SSUS was
//                 created to protect disadvantaged people of
//                 <strong> Noakhali, Laxmipur, and Feni</strong> from poverty and
//                 disasters.
//               </p>

//               <p className="text-slate-700 dark:text-gray-300 text-lg leading-relaxed!">
//                 Our activities range from <strong>Microfinance</strong> and
//                 <strong> Primary Education</strong> to international development
//                 initiatives such as <strong>BDRWASH</strong> and
//                 <strong> RAISE</strong>.
//               </p>
//             </div> */}
//           </div>

//           {/* Timeline */}
//           <div className="px-56!">
//           <div className="relative overflow-x-auto pb-16! no-scrollbar">
//             <div className="flex min-w-[1400px] justify-between items-center relative px-10! py-10!">
//               {/* timeline line */}
//               <div className="absolute top-1/2 left-0 w-full h-[3px]! bg-[#f86048]! -translate-y-1/2"></div>

//               {journeySteps.map((step, index) => (
//                 <div
//                   key={index}
//                   className="relative z-10 w-80 flex flex-col items-center"
//                 >
//                   {/* Top block */}
//                   <div className="h-48 flex flex-col justify-end items-center mb-8!">
//                     {step.topDesc ? (
//                       <div className="bg-white! dark:bg-gray-800! p-4! rounded-xl shadow-lg border! border-yellow-100! dark:border-gray-700! text-center max-w-[260px]">
//                         <p className="text-xs! text-slate-600! dark:text-gray-300!">
//                           {step.topDesc}
//                         </p>
//                       </div>
//                     ) : (
//                       <span className="text-4xl! font-black! text-slate-800! dark:text-white! opacity-70!">
//                         {step.year.split("-")[0]}
//                       </span>
//                     )}
//                   </div>

//                   {/* Circle */}
//                   <motion.div
//                     whileHover={{ scale: 1.08 }}
//                     className="w-56! h-56! rounded-full border-2! border-yellow-300! bg-white! dark:bg-gray-800! shadow-xl flex flex-col items-center justify-center text-center p-8!"
//                   >
//                     <div className="w-16! h-16! bg-yellow-50! dark:bg-gray-700! rounded-xl flex items-center justify-center mb-4!">
//                       <i className={`fas ${step.icon} text-[#f86048]! text-3xl`}></i>
//                     </div>

//                     <h4 className="text-[13px] font-black! uppercase tracking-widest! text-slate-900! dark:text-white!">
//                       {step.phase}
//                     </h4>

//                     <div className="mt-2! text-[#f86048]! font-bold! text-sm!">
//                       {step.year}
//                     </div>
//                   </motion.div>

//                   {/* Arrow */}
//                   {index < journeySteps.length - 1 && (
//                     <div className="absolute top-1/2 -right-10 -translate-y-1/2">
//                       <i className="fas fa-arrow-right text-[#f86048] text-2xl animate-pulse"></i>
//                     </div>
//                   )}

//                   {/* Bottom block */}
//                   <div className="h-48! mt-8! flex flex-col justify-start items-center">
//                     {step.bottomDesc ? (
//                       <div className="bg-yellow-50! dark:bg-gray-800! p-4! rounded-xl! text-center max-w-[260px]">
//                         <p className="text-xs text-slate-700 dark:text-gray-300">
//                           {step.bottomDesc}
//                         </p>
//                       </div>
//                     ) : (
//                       <span className="text-4xl font-black! text-slate-800! dark:text-white! opacity-70">
//                         {step.year.includes("-")
//                           ? step.year.split("-")[1]
//                           : step.year}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default OurJourney;