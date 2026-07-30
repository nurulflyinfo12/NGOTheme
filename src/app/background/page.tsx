"use client";
import { motion } from "framer-motion";

import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";

const BackgroundPage = () => {
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

  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName="Established 1985"
        pageTitle="Sagarika Samaj Unnayan Sangstha (SSUS)"
      />
      <section className="pt-24! pb-24! bg-white! dark:bg-[#0f172a]! overflow-hidden">
        <div className="container mx-auto px-6! lg:px-16!">
          {/* Header */}
          <div className="max-w-5xl mb-20!">
            <div className="flex items-center gap-3 mb-4!">
              <div className="w-12 h-1 bg-[#f86048] rounded"></div>
              <span className="text-[#f86048] font-bold uppercase tracking-widest text-xs">
                Established 1985
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold! text-slate-900! dark:text-white! mb-6!">
              Sagarika Samaj Unnayan Sangstha (SSUS)
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <p className="text-slate-700 dark:text-gray-300 text-lg leading-relaxed!">
                Founded by <strong>Fazlul Haque (Hoque Saheb)</strong>, SSUS was
                created to protect disadvantaged people of
                <strong> Noakhali, Laxmipur, and Feni</strong> from poverty and
                disasters.
              </p>

              <p className="text-slate-700 dark:text-gray-300 text-lg leading-relaxed!">
                Our activities range from <strong>Microfinance</strong> and
                <strong> Primary Education</strong> to international development
                initiatives such as <strong>BDRWASH</strong> and
                <strong> RAISE</strong>.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative overflow-x-auto pb-16! no-scrollbar">
            <div className="flex min-w-[1400px] justify-between items-center relative px-10! py-10!">
              {/* timeline line */}
              <div className="absolute top-1/2 left-0 w-full h-[3px]! bg-[#f86048]! -translate-y-1/2"></div>

              {journeySteps.map((step, index) => (
                <div
                  key={index}
                  className="relative z-10 w-80 flex flex-col items-center"
                >
                  {/* Top block */}
                  <div className="h-48 flex flex-col justify-end items-center mb-8!">
                    {step.topDesc ? (
                      <div className="bg-white! dark:bg-gray-800! p-4! rounded-xl shadow-lg border! border-yellow-100! dark:border-gray-700! text-center max-w-[260px]">
                        <p className="text-xs! text-slate-600! dark:text-gray-300!">
                          {step.topDesc}
                        </p>
                      </div>
                    ) : (
                      <span className="text-4xl! font-black! text-slate-800! dark:text-white! opacity-70!">
                        {step.year.split("-")[0]}
                      </span>
                    )}
                  </div>

                  {/* Circle */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="w-56! h-56! rounded-full border-2! border-yellow-300! bg-white! dark:bg-gray-800! shadow-xl flex flex-col items-center justify-center text-center p-8!"
                  >
                    <div className="w-16! h-16! bg-yellow-50! dark:bg-gray-700! rounded-xl flex items-center justify-center mb-4!">
                      <i className={`fas ${step.icon} text-[#f86048]! text-3xl`}></i>
                    </div>

                    <h4 className="text-[13px] font-black! uppercase tracking-widest! text-slate-900! dark:text-white!">
                      {step.phase}
                    </h4>

                    <div className="mt-2! text-[#f86048]! font-bold! text-sm!">
                      {step.year}
                    </div>
                  </motion.div>

                  {/* Arrow */}
                  {index < journeySteps.length - 1 && (
                    <div className="absolute top-1/2 -right-10 -translate-y-1/2">
                      <i className="fas fa-arrow-right text-[#f86048] text-2xl animate-pulse"></i>
                    </div>
                  )}

                  {/* Bottom block */}
                  <div className="h-48! mt-8! flex flex-col justify-start items-center">
                    {step.bottomDesc ? (
                      <div className="bg-yellow-50! dark:bg-gray-800! p-4! rounded-xl! text-center max-w-[260px]">
                        <p className="text-xs text-slate-700 dark:text-gray-300">
                          {step.bottomDesc}
                        </p>
                      </div>
                    ) : (
                      <span className="text-4xl font-black! text-slate-800! dark:text-white! opacity-70">
                        {step.year.includes("-")
                          ? step.year.split("-")[1]
                          : step.year}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Initiatives */}
          <div className="mt-28!">
            <div className="text-center mb-16!">
              <h3 className="text-3xl! font-extrabold text-slate-900! dark:text-white!">
                Key Ongoing Initiatives
              </h3>
              <p className="text-slate-600! dark:text-gray-300! mt-2!">
                Sustainable development through specialized programs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "GRIHAON Loan",
                  desc: "Bangladesh Bank funded housing program with 6% interest and 5-year duration.",
                  icon: "fa-home",
                },
                {
                  title: "BDRWASH",
                  desc: "World Bank funded sanitation and health project.",
                  icon: "fa-hand-holding-water",
                },
                {
                  title: "RAISE Project",
                  desc: "PKSF funded initiative supporting informal sector employment.",
                  icon: "fa-chart-line",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="p-8! bg-white! dark:bg-gray-800! border! border-yellow-100! dark:border-gray-700! rounded-3xl shadow-sm hover:shadow-xl transition"
                >
                  <div className="w-14! h-14! bg-yellow-50! dark:bg-gray-700! rounded-xl flex items-center justify-center mb-6!">
                    <i className={`fas ${item.icon} text-[#f86048] text-2xl`}></i>
                  </div>

                  <h4 className="text-xl font-bold! text-slate-900! dark:text-white! mb-3!">
                    {item.title}
                  </h4>

                  <p className="text-slate-600! dark:text-gray-300! text-sm! leading-relaxed!">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="mt-28! p-14! bg-yellow-50! dark:bg-gray-800! border! border-yellow-100! dark:border-gray-700! rounded-[40px]! relative">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="max-w-md text-center lg:text-left">
                <div className="flex items-center gap-3 justify-center lg:justify-start mb-4!">
                  <div className="w-8 h-1 bg-[#f86048]!"></div>
                  <span className="text-[#f86048]! font-bold! text-xs uppercase tracking-widest!">
                    Collaboration
                  </span>
                </div>

                <h3 className="text-3xl font-extrabold! text-slate-900! dark:text-white! mb-4!">
                  Strategic Partners
                </h3>

                <p className="text-slate-700 dark:text-gray-300">
                  Our development impact is supported by strong alliances with
                  national and international partners.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-end max-w-2xl">
                {[
                  "PKSF",
                  "WORLD BANK",
                  "AIIB",
                  "IFAD",
                  "OXFAM",
                  "BRAC",
                  "NGO FORUM",
                ].map((partner, pIdx) => (
                  <div
                    key={pIdx}
                    className="px-6! py-3! bg-white! dark:bg-gray-700! border! border-yellow-200! dark:border-gray-600! rounded-xl text-xs! font-bold text-[#f86048]! dark:text-[#f86048]! tracking-widest! hover:bg-[#f86048]! hover:text-white! transition"
                  >
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