"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";

const PRIMARY = "#f86048";

const BackgroundPage = () => {
  const journeySteps = [
    {
      year: "1985",
      phase: "The Foundation",
      icon: "fa-seedling",
      desc: "Founded by Fazlul Haque (Hoque Saheb) to save coastal communities from natural disasters and poverty, encouraged by Mohammad Saidur Rahman (BDPC).",
    },
    {
      year: "1987-1991",
      phase: "Early Growth & WASH",
      icon: "fa-faucet",
      desc: "Received first OXFAM fund in 1987 for capacity building. Partnered with NGO Forum in 1991 for DWSS and established a VSC center in 1994.",
    },
    {
      year: "1993-1997",
      phase: "Strategic Alliances",
      icon: "fa-handshake",
      desc: "Established partnership with PKSF (1993) for microfinance. Launched Non-Formal Primary Education (NFPE) with BRAC support in 1997.",
    },
    {
      year: "2014-2018",
      phase: "Expansion & Elderly Care",
      icon: "fa-heart",
      desc: "Launched Samriddi Project (2014) and Elderly People Livelihood Program (2017). Started 'Housing for All' with Bangladesh Bank support.",
    },
    {
      year: "2020-2022",
      phase: "Modern Resilience",
      icon: "fa-shield-virus",
      desc: "Implemented COVID-19 Refinancing loans (2020). Launched BDRWASH, RAISE, and CDSP-Bridging projects in 2022 with World Bank & IFAD.",
    },
  ];

  return (
    <DanboxLayout>
      <PageBanner pageName="Our Background" pageTitle="A Legacy of Resilience" />

      <section className="py-24 lg:py-32 bg-white dark:bg-[#0f172a] overflow-hidden">
        <div className="container mx-auto px-6 lg:max-w-7xl">
          
          {/* 1. Header with Impact Quote */}
          <div className="grid lg:grid-cols-12 gap-12 mb-32 items-end">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-16 h-[2px]" style={{ backgroundColor: PRIMARY }}></div>
                <span className="font-black uppercase tracking-[0.3em] text-xs" style={{ color: PRIMARY }}>
                  Since 1985
                </span>
              </motion.div>
              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                Sagarika Samaj <br /> Unnayan Sangstha<span style={{ color: PRIMARY }}>.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 border-l-4 pl-8" style={{ borderColor: PRIMARY }}>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed italic">
                "Founded to protect the marginalized across Noakhali, Laxmipur, and Feni from the dual threats of poverty and coastal disasters."
              </p>
            </div>
          </div>

          {/* 2. The Modern Vertical Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* The Vertical Line */}
            <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800 -translate-x-1/2 hidden lg:block" />

            <div className="space-y-24 relative">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${
                    index % 2 === 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 px-0 lg:px-12 text-center lg:text-left">
                    <div className={`p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 shadow-xl relative transition-transform hover:-translate-y-2 ${index % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}>
                      <h4 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: PRIMARY }}>{step.year}</h4>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{step.phase}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Icon / Center Point */}
                  <div className="absolute left-[-20px] lg:left-1/2 top-0 lg:top-1/2 -translate-y-1/2 lg:-translate-x-1/2 z-20">
                    <div className="w-12 h-12 rounded-full border-4 border-white dark:border-[#0f172a] shadow-xl flex items-center justify-center text-white text-sm" style={{ backgroundColor: PRIMARY }}>
                      <i className={`fas ${step.icon}`}></i>
                    </div>
                  </div>

                  {/* Spacer for Desktop */}
                  <div className="hidden lg:block lg:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3. Ongoing Initiatives - Editorial Grid */}
          <div className="mt-48">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: PRIMARY }}>Our Current Impact</span>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-2">Key Initiatives<span style={{ color: PRIMARY }}>.</span></h3>
              </div>
              <p className="max-w-xs text-slate-500 text-sm">Targeted programs delivering sustainable development through international collaboration.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "GRIHAON Loan", desc: "A Bangladesh Bank-funded housing initiative offering 6% interest over 5 years for secure shelter.", icon: "fa-home" },
                { title: "BDRWASH", desc: "In partnership with the World Bank, improving health through climate-resilient water and sanitation.", icon: "fa-hand-holding-water" },
                { title: "RAISE Project", desc: "A PKSF-backed project enhancing youth employment and recovery in the informal economic sector.", icon: "fa-chart-line" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-10 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-2xl relative group overflow-hidden"
                >
                  <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                     <i className={`fas ${item.icon} text-9xl text-slate-900`}></i>
                  </div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-white" style={{ backgroundColor: PRIMARY }}>
                    <i className={`fas ${item.icon} text-xl`}></i>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. Strategic Partners - Dark Brand Panel */}
          <div className="mt-48 rounded-[40px] bg-slate-900 p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f86048]/10 blur-[120px] rounded-full" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/3">
                <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: PRIMARY }}>Global Synergy</span>
                <h3 className="text-3xl font-black text-white mt-4 mb-6 leading-tight">Strategic <br /> Partners.</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our impact is scaled through a network of national and international donors who share our vision for a resilient Bangladesh.
                </p>
              </div>
              <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
                {["PKSF", "WORLD BANK", "AIIB", "IFAD", "OXFAM", "BRAC", "NGO FORUM", "PKSF"].map((partner, pIdx) => (
                  <div key={pIdx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center backdrop-blur-md transition-all hover:bg-white hover:text-slate-900 text-white font-black text-[10px] tracking-widest text-center">
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </DanboxLayout>
  );
};

export default BackgroundPage;