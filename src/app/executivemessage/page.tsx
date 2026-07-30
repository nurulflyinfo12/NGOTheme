"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";

const PRIMARY = "#f86048";

const EDMessage = () => {
  return (
    <DanboxLayout header={1}>
      <main className="bg-white dark:bg-[#0f172a]!">
        <PageBanner
          pageName="Executive Director"
          pageTitle="A Message from our Leadership"
        />

        <section className="py-12! md:py-20! lg:py-32! relative overflow-visible">
          <div className="container mx-auto px-4! sm:px-6! lg:max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Left column – Image + Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-2/5"
              >
                <div className="relative group mx-auto max-w-[340px] sm:max-w-[380px] lg:max-w-none">
                  
                  {/* Offset border decoration - Responsive */}
                  <div
                    className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 
                               w-full h-full border-2 rounded-2xl z-0 transition-transform 
                               group-hover:translate-x-2 group-hover:translate-y-2"
                    style={{ borderColor: PRIMARY }}
                  />

                  {/* Image container */}
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4]">
                    <Image
                      src="/assets/img/directors/saifull.webp"
                      alt="Executive Director"
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Name Card - Fully Responsive Overlapping */}
                  <div
                    className="
                      absolute -bottom-6 left-4 right-4 
                      sm:-bottom-8 sm:left-6 sm:right-6
                      lg:-bottom-10 lg:left-6 lg:right-6
                      bg-white! dark:bg-slate-800! 
                      p-5 sm:p-6 
                      shadow-xl rounded-xl border-t-4 z-20
                    "
                    style={{ borderTopColor: PRIMARY }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900! dark:text-white!">
                      Md. Saiful Islam
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-gray-500! uppercase tracking-widest! mt-1!">
                      Executive Director, SSUS
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right column – Text content */}
              <div className="w-full lg:w-3/5! pt-4! lg:pt-0!">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-[0.3em]!"
                    style={{ color: PRIMARY }}
                  >
                    Leading with Purpose
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900! dark:text-white! mt-4! mb-8! leading-tight!">
                    Driving Change in the <br className="hidden sm:block" />
                    Coastal Heart of Bangladesh
                    <span style={{ color: PRIMARY }}>.</span>
                  </h2>

                  <div className="space-y-6 text-[17px] sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    <p
                      className="font-medium text-gray-900 dark:text-white italic border-l-4 pl-6"
                      style={{ borderColor: PRIMARY }}
                    >
                      "Our work is not just about survival; it is about
                      providing the tools for people to thrive with dignity."
                    </p>

                    <p>
                      For nearly four decades, Sagarika Samaj Unnayan Sangstha
                      (SSUS) has stood as a beacon of hope for the vulnerable
                      communities of coastal Noakhali.
                    </p>

                    <p>
                      What started as a vision by our founder, Md. Fazlul Hoque,
                      has evolved into a movement that empowers thousands of
                      families today.
                    </p>

                    <p>
                      In an era where climate change and economic instability
                      disproportionately affect our coastal regions, our mission
                      has never been more critical.
                    </p>

                    <p>
                      We are committed to building disaster resilience, fostering
                      economic growth through sustainable livelihoods, and
                      ensuring that women are at the forefront of social
                      transformation.
                    </p>

                    <p>
                      As we look toward the future, we remain grounded in our
                      grassroots values while embracing modern innovations in
                      development.
                    </p>

                    <p>
                      To our partners, donors, and the communities we serve:
                      thank you for being part of this journey. Together, we are
                      turning challenges into opportunities.
                    </p>
                  </div>

                  <div className="mt-12! pt-12! border-t! border-gray-100! dark:border-gray-800!">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="font-bold text-gray-900! dark:text-white! text-lg!">
                          Md. Saiful Islam
                        </p>
                        <p className="text-sm! text-gray-500!">
                          Executive Director
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DanboxLayout>
  );
};

export default EDMessage;