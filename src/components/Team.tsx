"use client";

import Image from "next/image";
import { Mail, Share2, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TeamMember {
  image: string;
  role: string;
  name: string;
  delay: string;
}

const teamMembers: TeamMember[] = [
  {
    image: "/assets/img/directors/founder.webp",
    role: "Founder",
    name: "Md. Fazlul Hoque (Hoque Saheb)",
    delay: ".1s",
  },
  {
    image: "/assets/img/directors/EXExecutive.webp",
    role: "EX Executive Director",
    name: "Md. Ruhul Matin",
    delay: ".2s",
  },
  {
    image: "/assets/img/directors/saifull.webp",
    role: "Executive Director",
    name: "Md. Saiful Islam",
    delay: ".3s",
  },
];

export const Team1 = () => {
  const PRIMARY_COLOR = "#e86958";
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Container stagger animation - FIXED
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
    },
  };

  // Card animation variants - FIXED (removed transition from inside)
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      scale: 0.92,
      rotateX: 5,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
    },
  };

  // Content reveal variants - FIXED
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20! md:py-28! bg-white dark:bg-[#0f172a]! overflow-hidden"
    >
      <div className="container mx-auto px-4! sm:px-6! lg:px-8!">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center! mb-16! md:mb-24!">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: 0.1, 
              type: "spring", 
              stiffness: 150,
              damping: 12,
            }}
            className="inline-flex items-center gap-3 px-6! py-3! rounded-3xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold! tracking-widest! text-slate-600 dark:text-slate-400 mb-6!"
            style={{ color: PRIMARY_COLOR }}
          >
            <motion.div
              animate={isVisible ? { 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.2, 1.2, 1.2, 1],
              } : {}}
              transition={{ 
                duration: 1.2, 
                delay: 1, 
                times: [0, 0.2, 0.5, 0.8, 1],
                ease: "easeInOut",
              }}
            >
              <Award className="w-5 h-5" />
            </motion.div>
            LEADERSHIP TEAM
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.3, 
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="text-[32px]! md:text-[60px]! font-bold text-slate-900 dark:text-white! tracking-tighter! leading-none! mb-6!"
          >
            <span className="inline-block">
              The Visionaries Driving{" "}
            </span>
            <motion.span
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={isVisible ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.7, 
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ color: PRIMARY_COLOR }}
              className="inline-block"
            >
              Excellence
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-xl! text-slate-600! dark:text-slate-400! max-w-2xl mx-auto"
          >
            Seasoned leaders with decades of experience dedicated to sustainable
            development and community empowerment.
          </motion.p>
        </div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{
            staggerChildren: 0.15,
            delayChildren: 0.3,
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{
                duration: 0.9,
                delay: index * 0.2,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              }}
              className="group relative bg-white dark:bg-slate-800! rounded-3xl! overflow-hidden shadow-lg hover:shadow-2xl! border border-slate-100! dark:border-slate-700! transition-shadow duration-500"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full h-full"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain"
                  />
                </motion.div>

                {/* Premium Overlay */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100"
                />

                {/* Top Right Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 30, rotate: -15 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.2 + index * 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="absolute top-6 right-6 px-4! py-1.5! text-xs font-bold rounded-2xl bg-white/95! dark:bg-slate-900/95! backdrop-blur-md! shadow-lg opacity-0 group-hover:opacity-100 flex items-center gap-2"
                  style={{ color: PRIMARY_COLOR }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Award size={15} />
                  </motion.div>
                  LEGACY
                </motion.div>

                {/* Shine effect */}
                <motion.div
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: "200%", opacity: 0.3 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                />
              </div>

              {/* Content */}
              <div className="p-9! text-center relative">
                {/* Top accent line */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={isVisible ? { width: "3rem", opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1 + index * 0.2, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block h-0.5 bg-gradient-to-r! from-transparent via-[#e86958]! to-transparent mb-6!"
                />

                {/* Role */}
                <motion.p
                  variants={fadeUpVariants}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="uppercase text-xs font-semibold tracking-[2.5px]! text-slate-500 dark:text-slate-400! mb-2!"
                >
                  {member.role}
                </motion.p>

                {/* Name */}
                <motion.h3
                  variants={fadeUpVariants}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="text-2xl font-semibold text-slate-900 dark:text-white! leading-tight! mb-2! relative inline-block"
                >
                  <span className="group-hover:text-[#e86958]! transition-colors duration-300">
                    {member.name}
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e86958] origin-left"
                    style={{ transformOrigin: "left" }}
                  />
                </motion.h3>

                {/* Bottom Accent Line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isVisible ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ 
                    duration: 0.7, 
                    delay: 1.3 + index * 0.2, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="mt-8! h-px w-full bg-gradient-to-r! from-transparent! via-slate-200! dark:via-slate-700! to-transparent!"
                  style={{ transformOrigin: "center" }}
                />
              </div>

              {/* Card glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-3xl ring-2 ring-[#e86958]/20 pointer-events-none opacity-0 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



 // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Coordinator (Finance)",
  //   name: "AKM Fakhrul Islam",
  //   delay: ".3s",
  //   socials: [{ icon: "fas fa-envelope", link: "mailto:fislamssus@gmail.com" }],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Coordinator (Program)",
  //   name: "Md. Zulfiqar Ali",
  //   delay: ".4s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:zulfikerssus@gmail.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Credit Coordinator",
  //   name: "Md. Alauddin",
  //   delay: ".5s",
  //   socials: [
  //     {
  //       icon: "fas fa-envelope",
  //       link: "mailto:coordinatoragrashorssus@gmail.com",
  //     },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Manager (Monitoring and Documents)",
  //   name: "Jamal Uddin Siddiki",
  //   delay: ".6s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:jusbulbul62@gmail.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Manager (Administration)",
  //   name: "Md. Hannan Mollah",
  //   delay: ".7s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:hannanmollah@yahoo.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Regional Manager (Head Office) Region -1",
  //   name: "Md. Gias Uddin",
  //   delay: ".8s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:region1ssus@gmail.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Regional Manager (Noakhali South) Region -2",
  //   name: "Md. Saiful Alam",
  //   delay: ".9s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:region2ssus@gmail.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Associate Manager (ME)",
  //   name: "Sultan Mahmud Rana",
  //   delay: "1s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:sultanssus1010@gmail.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Area Manager, Ramgati Area",
  //   name: "Md. Rezaul Islam",
  //   delay: "1.1s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:ramgatiareassus@gmail.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Area Manager, Feni area",
  //   name: "Mohammadullah Chowdhury",
  //   delay: "1.2s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:fenisadarareassus@gmail.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Area Manager, Noakhali Sadar",
  //   name: "Md. Sakhawat Ullah",
  //   delay: "1.3s",
  //   socials: [
  //     {
  //       icon: "fas fa-envelope",
  //       link: "mailto:noakhalisadarareassus@gmail.com",
  //     },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Area Manager, Begumganj Area",
  //   name: "Jamaul Uddin",
  //   delay: "1.4s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:begumgonjareassus@gmail.com" },
  //   ],
  // },
  // {
  //   image: "/assets/img/logo/Sagorika.webp",
  //   role: "Area Manager, Hatia Region",
  //   name: "Md. Jahirul Islam",
  //   delay: "1.5s",
  //   socials: [
  //     { icon: "fas fa-envelope", link: "mailto:hatiyaareassus@gmail.com" },
  //   ],
  // },