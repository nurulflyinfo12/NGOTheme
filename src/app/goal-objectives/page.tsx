"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";

const PRIMARY = "#f86048";

const GoalObjectivesPage = () => {
  const objectives = [
    {
      title: "Disaster Management",
      desc: "Providing help and support to dwellers in coastal regions regarding natural disasters and all forms of emergencies.",
      icon: "fa-cloud-showers-heavy",
    },
    {
      title: "Micro Finance",
      desc: "Organizing micro-credit programs for landless households to create self-employment and sustainable family savings.",
      icon: "fa-hand-holding-usd",
    },
    {
      title: "Women Empowerment",
      desc: "Building strong women empowerment in society, supporting government policies, and promoting marriage without dowry.",
      icon: "fa-female",
    },
    {
      title: "Public Health",
      desc: "Collaborating with the Government Health Department to control population growth and improve public health services.",
      icon: "fa-heartbeat",
    },
    {
      title: "Education & Welfare",
      desc: "Establishing appropriate child education centers and supporting orphans through the Social Welfare department.",
      icon: "fa-book-reader",
    },
    {
      title: "Social Inclusion",
      desc: "Activating people with disabilities through group organization, self-employment, and technological connectivity.",
      icon: "fa-wheelchair",
    },
  ];

  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Goal & Objectives" pageTitle="Our Strategic Vision" />

      <section className="relative py-24 lg:py-32 bg-white! dark:bg-[#0f172a]! overflow-hidden">
        <div className="container mx-auto px-6 lg:max-w-7xl relative z-10">

          <div className="max-w-4xl mx-auto text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-black uppercase tracking-[0.4em]! mb-6! block" style={{ color: PRIMARY }}>
                Our Primary Goal
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900! dark:text-white! leading-[1.1]! tracking-tighter!">
                “To enhance the livelihoods of the poor and animate them towards{" "}
                <span style={{ color: PRIMARY }}>sustainable development</span>.”
              </h2>
              <div className="mt-10! flex justify-center">
                <div className="h-1.5 w-24 rounded-full" style={{ backgroundColor: PRIMARY }}></div>
              </div>
            </motion.div>
          </div>

          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em]!" style={{ color: PRIMARY }}>Strategy</span>
                <h3 className="text-4xl font-black! text-slate-900! dark:text-white! mt-2!">Core Objectives.</h3>
              </div>
              <p className="max-w-xs text-slate-500! dark:text-slate-400! text-sm!">
                The pillars of our organizational mission and coastal action plan.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-10! bg-white! dark:bg-slate-800! border! border-slate-100! dark:border-slate-700! rounded-[2.5rem]! shadow-2xl shadow-slate-200/50! dark:shadow-none! group relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-[0.03]! group-hover:scale-150 transition-transform duration-700" style={{ backgroundColor: PRIMARY }} />

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 text-white! shadow-lg transition-transform group-hover:rotate-12" style={{ backgroundColor: PRIMARY }}>
                  <i className={`fal ${item.icon} text-2xl`}></i>
                </div>

                <h4 className="text-2xl font-black! mb-4! text-slate-900 dark:text-white! group-hover:text-[#f86048]! transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-600! dark:text-slate-400! leading-relaxed! text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24 p-8! md:p-12 lg:p-20 bg-slate-900! rounded-[2rem] md:rounded-[3rem]! relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-[#f86048]/10! blur-[100px]! rounded-full" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
              <div className="lg:w-3/5 w-full">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 md:mb-8 text-white leading-tight">
                  Our Integrated <br className="hidden sm:block" />
                  <span style={{ color: PRIMARY }}>Main View</span>
                </h3>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed! italic border-l-4! pl-6! md:pl-8!"
                  style={{ borderColor: PRIMARY }}>
                  To empower men and women of coastal dwellers in establishing human rights, disaster management, education, and sustainable socio-economic development through modern technology and training.
                </p>
              </div>

              <div className="lg:w-2/5 w-full grid grid-cols-1! md:grid-cols-1! xl:grid-cols-2! gap-4 md:gap-6">
                <div className="bg-white/5! border! border-white/10! p-6 md:p-8 rounded-3xl text-center backdrop-blur-sm group hover:bg-white! transition-all duration-500">
                  <span className="block text-2xl md:text-3xl font-black text-white group-hover:text-[#f86048]! transition-colors">
                    Modern
                  </span>
                  <span className="text-[10px] uppercase text-slate-500! font-bold tracking-[0.2em]!">
                    Technology
                  </span>
                </div>

                <div className="bg-white/5! border! border-white/10! p-6 md:p-8 rounded-3xl text-center backdrop-blur-sm group hover:bg-white! transition-all duration-500">
                  <span className="block text-2xl md:text-3xl font-black text-white! group-hover:text-[#f86048]! transition-colors">
                    Human
                  </span>
                  <span className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]!">
                    Rights
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.02]! dark:opacity-[0.05]! hidden lg:block">
          <h1 className="text-[20rem]! font-black leading-none! uppercase tracking-tighter!">IMPACT</h1>
        </div>
      </section>
    </DanboxLayout>
  );
};

export default GoalObjectivesPage;