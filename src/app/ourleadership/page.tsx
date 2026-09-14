"use client";

import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import Image from "next/image";
import { Mail, Share2, Heart, Award, Users, Building2 } from "lucide-react";
import { motion } from "framer-motion";

interface TeamMember {
  image: string;
  role: string;
  name: string;
  delay: string;
}

interface CommitteeMember {
  empId: number;
  image: string;
  name: string;
  designation: string;
}

const PRIMARY_COLOR = "#e86958";

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

const committeeMembers: CommitteeMember[] = [
  {
    "empId": 514,
    "image": "/assets/img/directors/saifull.webp",
    "name": "Mohammad Saiful Islam (Head Office)",
    "designation": "Executive Director"
  },
  {
    "empId": 503,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Shamsul Hoque (Head Office)",
    "designation": "Deputy Director(Microfinance)"
  },
  {
    "empId": 980,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Hannan Molla (Head Office)",
    "designation": "Coordinator(Admin)"
  },
  {
    "empId": 1293,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Zulfiker Ali (Head Office)",
    "designation": "Coordinator(Program)"
  },
  {
    "empId": 1306,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Alauddin (Head Office)",
    "designation": "Credit Coordinatio (Micro-Enterprise)"
  },
  {
    "empId": 1440,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Abu Muhammad Hannan (Head Office)",
    "designation": "Manager (Audit)"
  },
  {
    "empId": 1010,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Sultan Mahmud Rana (Head Office)",
    "designation": "Manager (Micro-Enterprise)"
  },
  {
    "empId": 589,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Rezaul Islam (Head Office)",
    "designation": "Manager (Monitoring and Documentation)"
  },
  {
    "empId": 673,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "MD Zahirul Islam (Head Office)",
    "designation": "Manager (Micro-Enterprise)"
  },
  {
    "empId": 1097,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Shahidul Alam (Head Office)",
    "designation": "Fisheries officer"
  },
  {
    "empId": 1098,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Sibabrata Bhowmik (Head Office)",
    "designation": "Agriculture officer"
  },
  {
    "empId": 1259,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Anisur Rahman (Head Office)",
    "designation": "Livestock officer"
  },
  {
    "empId": 792,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Mazammal Hoque (Head Office)",
    "designation": "Accounts Officer"
  },
  {
    "empId": 833,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Jahedul Alam (Head Office)",
    "designation": "IT Manager"
  },
  {
    "empId": 508,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Raktima Chakraborty (Head Office)",
    "designation": "Accountant"
  },
  {
    "empId": 528,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "ABM Zakariya (Head Office)",
    "designation": "Accountant"
  },
  {
    "empId": 983,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Hari Kanta Das (Head Office)",
    "designation": "Accounts Officer, RAISE"
  },
  {
    "empId": 512,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Mosleh Uddin (Head Office)",
    "designation": "Assistant Administative Officer"
  },
  {
    "empId": 1294,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Sunanda Bose (Head Office)",
    "designation": "Assistant Manager HR"
  },
  {
    "empId": 1755,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Ranjan Kumar Mahanta (Head Office)",
    "designation": "Assistant Manager (Monitoring and Documentation)"
  },
  {
    "empId": 1754,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Rajib Mahmud (Head Office)",
    "designation": "Assistant Manager (Training & Social Activity)"
  },
  {
    "empId": 953,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Nazrul Islam (Head Office)",
    "designation": "Audit Officer"
  },
  {
    "empId": 1254,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Muhammad Maksudur Rahman (Head Office)",
    "designation": "Audit Officer"
  },
  {
    "empId": 1263,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Fakhrul Islam (Head Office)",
    "designation": "Audit Officer"
  },
  {
    "empId": 1342,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Azharul Islam (Head Office)",
    "designation": "Audit Officer"
  },
  {
    "empId": 662,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md.Kamal Uddin (Head Office)",
    "designation": "Audit Officer"
  },
  {
    "empId": 1490,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Safayet Hossain (Head Office)",
    "designation": "Audit Officer"
  },
  {
    "empId": 1491,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Robiul Hossain (Head Office)",
    "designation": "Audit Officer"
  },
  {
    "empId": 739,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Rahamat Ullah (Head Office)",
    "designation": "Accountant"
  },
  {
    "empId": 639,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md Abu Bokkor Siddiq (Head Office)",
    "designation": "Area Accountant"
  },
  {
    "empId": 1069,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Joydeb Chandra Majumder (Head Office)",
    "designation": "Accounts & Finance Officer, SMART"
  },
  {
    "empId": 1295,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Kazi Mohammad Mosaref Hossain (Head Office)",
    "designation": "Personal Secretary"
  },
  {
    "empId": 1296,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Kanij Farhana Nipu (Head Office)",
    "designation": "Documentation and Publication Officer"
  },
  {
    "empId": 1093,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Abul Khayer (Head Office)",
    "designation": "Logistic Officer"
  },
  {
    "empId": 1432,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Nazmul Islam Mishu (Head Office)",
    "designation": "Photographer"
  },
  {
    "empId": 1441,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md. Nurul Karim Patwary (Head Office)",
    "designation": "Assistant Accountant"
  },
  {
    "empId": 1443,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Saidul Islam (Head Office)",
    "designation": "Assistant Livestock Officer"
  },
  {
    "empId": 1554,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Md Rashedul Islam (Head Office)",
    "designation": "Assistant Fisheries Officer"
  },
  {
    "empId": 1442,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Sree Sushanta Kumar Ray (Head Office)",
    "designation": "Assistant Agriculture Officer"
  },
  {
    "empId": 504,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Jamal Uddin (Head Office)",
    "designation": "Admin Assistant"
  },
  {
    "empId": 307,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "MD Kefayet Ullah (Head Office)",
    "designation": "Case Management Officer"
  },
  {
    "empId": 308,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Riyed Hossain (Head Office)",
    "designation": "Officer(Life Skill and Enterprise Development)"
  },
  {
    "empId": 309,
    "image": "/assets/img/logo/Sagorika.webp",
    "name": "Shamsunnahar (Head Office)",
    "designation": "District Facilitator"
  }
]

const PRIMARY = "#f86048";

export default function OurLeadershipPage() {
  return (
    <DanboxLayout header={1}>
      <main className="bg-white dark:bg-[#0f172a]! font-bangla">
        <PageBanner pageName="Our Leadership" pageTitle="Our Leadership" />

        {/* General & Executive Committee Section */}
        <section className="py-16 sm:py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between lg:items-end! mb-24! gap-10">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex items-center gap-4 mb-4!"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-[2px]"
                    style={{ backgroundColor: PRIMARY }}
                  ></motion.div>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-black uppercase tracking-[0.3em]! text-[10px]!"
                    style={{ color: PRIMARY }}
                  >
                    GOVERNANCE
                  </motion.span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white! leading-[1]! tracking-wide!"
                >
                  General &{" "}
                  <motion.span
                    initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ color: PRIMARY_COLOR }}
                    className="inline-block"
                  >
                    Executive Committee
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.55, type: "spring", stiffness: 150, damping: 10 }}
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
                transition={{ duration: 0.35, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
                className="max-w-sm text-slate-500 dark:text-slate-400! text-sm! leading-relaxed! italic! border-l-2! pl-6!"
                style={{ borderColor: PRIMARY }}
              >
                SSUS has a strong and active 7-member executive body that meets monthly to review organizational performance and guide project implementation.
              </motion.p>
            </div>

            {/* Committee Members Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {committeeMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.03,
                        delayChildren: 0.05,
                      },
                    },
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
                  }}
                  className="group relative bg-white dark:bg-slate-800! rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-100 dark:border-slate-700! transition-shadow duration-500"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700!">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                      className="w-full h-full"
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100"
                    />

                    {/* Shine effect on hover */}
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: "200%", opacity: 0.15 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                    />

                    {/* Social Icons on Hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, staggerChildren: 0.04, delayChildren: 0.05 }}
                      className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100"
                    >
                      <motion.button
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all duration-300 shadow-lg"
                      >
                        <Mail className="w-4 h-4 text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="w-9 h-9 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all duration-300 shadow-lg"
                      >
                        <Share2 className="w-4 h-4 text-white" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Member Info */}
                  <div className="p-3 sm:p-4 md:p-5 text-center relative">
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(0.15 + index * 0.02, 0.45), 
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="text-[10px] sm:text-xs font-semibold uppercase tracking-[1.5px]! sm:tracking-[2px]! mb-1 sm:mb-2!"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      {member.designation}
                    </motion.p>
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(0.2 + index * 0.02, 0.5),
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white! leading-tight! group-hover:text-[#e86958]! transition-colors duration-300"
                    >
                      {member.name}
                    </motion.h3>

                    {/* Hover underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#e86958] origin-center"
                    />
                  </div>

                  {/* Card glow ring */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-2 ring-[#e86958]/30 pointer-events-none opacity-0 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Top Management Section */}
        <section className="py-16! sm:py-20! lg:py-32! bg-slate-50! dark:bg-slate-900/50! overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between lg:items-end! mb-24! gap-10">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex items-center gap-4 mb-4!"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-[2px]"
                    style={{ backgroundColor: PRIMARY }}
                  ></motion.div>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-black uppercase tracking-[0.3em]! text-[10px]!"
                    style={{ color: PRIMARY }}
                  >
                    LEADERSHIP TEAM
                  </motion.span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                  className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white! leading-[1]! tracking-wide!"
                >
                  The Visionaries Driving{" "}
                  <motion.span
                    initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ color: PRIMARY_COLOR }}
                    className="inline-block"
                  >
                    Excellence
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: 0.5, type: "spring", stiffness: 150, damping: 10 }}
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
                transition={{ duration: 0.35, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
                className="max-w-sm text-slate-500 dark:text-slate-400! text-sm! leading-relaxed! italic! border-l-2! pl-6!"
                style={{ borderColor: PRIMARY }}
              >
                Seasoned leaders with decades of experience dedicated to sustainable development and community empowerment.
              </motion.p>
            </div>

            {/* Team Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.15,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 80,
                      scale: 0.9,
                      rotateX: 3,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                    },
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
                  }}
                  className="group relative bg-white dark:bg-slate-800! rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-slate-100 dark:border-slate-700! transition-shadow duration-500"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
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
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 group-hover:opacity-100"
                    />

                    {/* Shine sweep */}
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: "200%", opacity: 0.2 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent skew-x-12 pointer-events-none"
                    />

                    {/* Top Right Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: 30, rotate: -10 }}
                      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.25,
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-2xl bg-white/95 dark:bg-slate-900/95! backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-1.5 sm:gap-2"
                      style={{ color: PRIMARY_COLOR }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Award size={14} className="sm:w-[15px] sm:h-[15px]" />
                      </motion.div>
                      LEGACY
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 md:p-9 text-center relative">
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: "3rem", opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.45 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="inline-block h-0.5 bg-gradient-to-r from-transparent via-[#e86958]! to-transparent mb-4 sm:mb-6"
                    />

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: 0.35 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="uppercase text-[10px] sm:text-xs font-semibold tracking-[2px] sm:tracking-[2.5px]! text-slate-500 dark:text-slate-400! mb-1! sm:mb-2!"
                    >
                      {member.role}
                    </motion.p>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: 0.4 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-white! leading-tight! group-hover:text-[#e86958]! transition-colors duration-300 relative inline-block"
                    >
                      {member.name}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e86958] origin-left"
                      />
                    </motion.h3>

                    {/* Bottom Accent Line */}
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileInView={{ scaleX: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.6 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="mt-6 sm:mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700! to-transparent"
                      style={{ transformOrigin: "center" }}
                    />
                  </div>

                  {/* Card glow ring */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-2 ring-[#e86958]/25 pointer-events-none opacity-0 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </DanboxLayout>
  );
}