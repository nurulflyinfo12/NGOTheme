"use client";

import { motion } from "framer-motion";
import DanboxLayout from "@/layout/DanboxLayout";
import PageBanner from "@/components/PageBanner";

const PRIMARY = "#f86048";

const SpecialPrograms = () => {
  const specialActivities = [
    {
      title: "Health & Medical Support",
      accent: "#3b82f6",
      image: "/assets/img/health/health1.webp",
      items: [
        {
          name: "100% Zero Home Delivery Program",
          desc: "Promoting safe institutional delivery for pregnant women to reduce maternal and neonatal risks.",
          icon: "fa-baby",
        },
        {
          name: "Sagarika Diagnostic Center Activities",
          desc: "Providing affordable diagnostic services and specialist medical consultations for community members.",
          icon: "fa-microscope",
        },
        {
          name: "Grant Programs in Medical & Social Institutions",
          desc: "Supporting healthcare and social service institutions through financial and logistical assistance.",
          icon: "fa-hospital-user",
        },
      ],
    },
    {
      title: "Education & Cultural Development",
      accent: "#10b981",
      image: "/assets/img/education/education1.webp",
      items: [
        {
          name: "Cultural Schools & Scholarship Program",
          desc: "Encouraging cultural education while providing scholarships to meritorious students from poor families.",
          icon: "fa-graduation-cap",
        },
        {
          name: "Educational Materials for Poor Children",
          desc: "Providing books, stationery, and learning materials to children from disadvantaged households.",
          icon: "fa-book-open",
        },
        {
          name: "Martyrdom Anniversary of Bangabandhu",
          desc: "Observing national remembrance programs to promote historical awareness and patriotism.",
          icon: "fa-flag",
        },
      ],
    },
    {
      title: "Humanitarian & Social Support",
      accent: "#f59e0b",
      image: "/assets/img/jagoron/jagoron1.webp",
      items: [
        {
          name: "Eid Donation & Winter Clothes Distribution",
          desc: "Providing food support during Eid and warm clothing during winter for vulnerable communities.",
          icon: "fa-hands-holding-heart",
        },
        {
          name: "Disaster Expenditure (COVID-19) Program",
          desc: "Emergency assistance and relief activities to support communities affected by the COVID-19 pandemic.",
          icon: "fa-shield-virus",
        },
      ],
    },
  ];

  // Container stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Item card variants - FIXED: removed transition from inside visible
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -40,
      y: 20,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
    },
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Strategic Initiatives" pageTitle="Specialized Impact" />

      <section className="relative py-24! lg:py-32! bg-white dark:bg-[#0f172a]! overflow-hidden">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          {/* Editorial Header */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-end! mb-24 lg:mb-32! gap-10">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                className="flex items-center gap-4 mb-6"
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "3rem" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-[2px]!"
                  style={{ backgroundColor: PRIMARY }}
                ></motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-black! uppercase tracking-[0.3em]! text-[10px]!"
                  style={{ color: PRIMARY }}
                >
                  Our Mission in Action
                </motion.span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-4xl sm:text-5xl lg:text-7xl font-black! text-slate-900! dark:text-white! leading-[0.9]! tracking-wide!"
              >
                Holistic Growth for Coastal Resilience
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9, type: "spring", stiffness: 150, damping: 10 }}
                  style={{ color: PRIMARY }}
                >
                  .
                </motion.span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              className="max-w-xs text-slate-500! dark:text-slate-400! text-sm! leading-relaxed! italic! border-l-2! pl-6!"
              style={{ borderColor: PRIMARY }}
            >
              Targeted interventions designed to bridge the gap in healthcare, education, and disaster management.
            </motion.p>
          </div>

          {/* Activity Staggered Layout */}
          <div className="space-y-24 lg:space-y-40!">
            {specialActivities.map((group, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-24 items-center`}
              >
                {/* Visual Side: Masked Image */}
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    scale: 0.9,
                    x: idx % 2 === 0 ? -60 : 60,
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.2,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="w-full lg:w-1/2 relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="aspect-[4/5] rounded-[2rem] lg:rounded-[4rem]! overflow-hidden shadow-2xl relative group"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      src={group.image}
                      alt={group.title}
                      className="w-full h-full object-cover scale-110 group-hover:scale-100!"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t! from-slate-900/80 via-transparent to-transparent" />

                    {/* Floating Glass Tag */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                      className="absolute top-4 left-4 lg:top-10 lg:left-10"
                    >
                      <motion.span
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                        className="px-6! py-2! bg-white/10! backdrop-blur-xl! border! border-white/20! rounded-2xl! text-[10px]! font-black text-white! uppercase! tracking-[0.3em]! inline-block"
                      >
                        Section 0{idx + 1}
                      </motion.span>
                    </motion.div>

                    {/* Shine effect on hover */}
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: "200%", opacity: 0.15 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                    />
                  </motion.div>

                  {/* Decorative Blur Pill */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.2, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    className={`hidden sm:block absolute -z-10 w-48 lg:w-64 h-48 lg:h-64 blur-[80px] lg:blur-[100px]! rounded-full ${
                      idx % 2 === 0 ? "-top-10! -left-10!" : "-bottom-10! -right-10!"
                    }`}
                    style={{ backgroundColor: group.accent }}
                  ></motion.div>
                </motion.div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2! space-y-8 lg:space-y-12!">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                    className="space-y-4!"
                  >
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black! text-slate-900! dark:text-white! tracking-wide!">
                      {group.title}
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.2 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="ml-2!"
                      >
                        /
                      </motion.span>
                    </h3>
                  </motion.div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="space-y-4 lg:space-y-6"
                  >
                    {group.items.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        transition={{
                          duration: 0.7,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                        whileHover={{ 
                          x: 12,
                          transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                        }}
                        className="group flex items-start gap-6 p-6 lg:p-8! bg-slate-50! dark:bg-slate-900! rounded-[2.5rem]! border! border-transparent! hover:border-slate-100! dark:hover:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500"
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.1, 
                            rotate: 10,
                            backgroundColor: "#f86048",
                            color: "#ffffff",
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-xl lg:text-2xl group-hover:bg-[#f86048]! group-hover:text-white! transition-all duration-500 text-slate-400!"
                        >
                          <i className={`fal ${item.icon}`}></i>
                        </motion.div>
                        <div>
                          <motion.h4
                            whileHover={{ color: "#f86048" }}
                            transition={{ duration: 0.3 }}
                            className="font-black! text-slate-900 dark:text-white! text-lg lg:text-xl mb-2! group-hover:text-[#f86048]! transition-colors"
                          >
                            {item.name}
                          </motion.h4>
                          <p className="text-slate-500! dark:text-slate-400! text-sm leading-relaxed!">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DanboxLayout>
  );
};

export default SpecialPrograms;