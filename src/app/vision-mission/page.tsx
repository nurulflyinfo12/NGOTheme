"use client";

import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { motion } from "framer-motion";

const PRIMARY = "#f86048";

const VisionMissionPage = () => {
  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName="Vision & Mission"
        pageTitle="আমাদের উদ্দেশ্য ও অঙ্গীকার"
      />

      <section className="relative py-16! md:py-20! lg:py-32! overflow-hidden bg-white! dark:bg-[#0f172a]! font-bangla">
        <div className="container mx-auto px-5! sm:px-6! lg:max-w-7xl! relative z-10">
          <div className="max-w-5xl mx-auto space-y-16! md:space-y-24! lg:space-y-32!">
            
            {/* Vision Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <div
                  className="relative p-8! sm:p-12! md:p-16! rounded-3xl! group shadow-2xl"
                  style={{ backgroundColor: `${PRIMARY}05` }}
                >
                  <div
                    className="absolute -inset-4 border-2 rounded-2xl transition-all duration-500 group-hover:-inset-6"
                    style={{ borderColor: PRIMARY }}
                  />

                  <h1 className="text-4xl! md:text-7xl! font-black! text-slate-900! dark:text-white! leading-[1.2]! tracking-tighter! text-center! relative z-10">
                    আমাদের <br />
                    <span style={{ color: PRIMARY }}>ভিশন</span>
                    <span style={{ color: `${PRIMARY}` }}>.</span>
                  </h1>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7! pl-0 lg:pl-6!"
              >
                <h2 className="text-3xl! sm:text-4xl! md:text-5xl! font-extrabold! text-slate-900 dark:text-white! leading-[1.3]! mb-6! md:mb-8!">
                  নারী-পুরুষের সমতা ভিত্তিক সমাজ প্রতিষ্ঠা
                </h2>
                <p className="text-gray-600! dark:text-gray-400! text-base! sm:text-lg! lg:text-xl! leading-relaxed!">
                  নারী-পুরুষের সমতা ভিত্তিক সমাজ প্রতিষ্ঠা এবং দরিদ্র ও ভূমিহীন পরিবারের আর্থ-সামাজিক উন্নয়ন।
                </p>
              </motion.div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full h-px bg-gray-100! dark:bg-gray-800!" />
              <div className="absolute bg-white! dark:bg-[#0f172a]! px-6">
                <div
                  className="animate-pulse h-3 w-3 rounded-full"
                  style={{ backgroundColor: PRIMARY }}
                />
              </div>
            </div>

            {/* Mission Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 order-2 lg:order-1"
              >
                <h2 className="text-3xl! sm:text-4xl! md:text-5xl! font-extrabold! text-slate-900 dark:text-white! leading-[1.2]! mb-8! md:mb-12!">
                  আমাদের মিশন
                </h2>

                <p className="text-gray-600! dark:text-gray-400! text-base! sm:text-lg leading-relaxed! mb-10">
                  লক্ষ্যভুক্ত নারী-পুরুষদের সংগঠিতকরণের মাধ্যমে চাহিদাভিত্তিক কর্মসূচি প্রণয়ন ও বাস্তবায়ন।
                </p>

                {/* Aim / লক্ষ্য */}
                <div className="mt-12">
                  <h3 className="text-2xl! font-bold! text-slate-900 dark:text-white! mb-4! flex items-center gap-3">
                    <span style={{ color: PRIMARY }}>লক্ষ্য</span>
                  </h3>
                  <p className="text-gray-600! dark:text-gray-400! text-base! sm:text-lg! leading-relaxed!">
                    প্রত্যন্ত চরাঞ্চলের দুঃস্থ ও অনগ্রসর দরিদ্র জনগোষ্ঠী বিশেষ করে নারীদেরকে উৎপাদনমুখী কর্মকাণ্ডে সম্পৃক্তকরণ, অন্তর্ভুক্তিকরণ এবং তাদের সামর্থ্য ও সক্ষমতা বৃদ্ধির মাধ্যমে আর্থ-সামাজিক অবস্থা ও অবস্থানের উন্নয়ন।
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-5! order-1! lg:order-2!"
              >
                <div
                  className="relative! p-8! sm:p-12! md:p-16! rounded-3xl! group shadow-2xl overflow-hidden!"
                  style={{ backgroundColor: `${PRIMARY}05` }}
                >
                  <div
                    className="absolute -inset-4 border-2 rounded-2xl transition-all duration-500 group-hover:-inset-6"
                    style={{ borderColor: PRIMARY }}
                  />

                  <div
                    className="absolute top-1! md:top-6! right-2! md:right-6! bg-white! dark:bg-slate-800! p-2! md:p-4! rounded-xl! shadow-lg! z-20! border-t-2!"
                    style={{ borderTopColor: PRIMARY }}
                  >
                    <p
                      className="text-[14px]! sm:text-xl! font-black!"
                      style={{ color: PRIMARY }}
                    >
                      Est. 1985
                    </p>
                    <p className="text-[10px]! font-bold! uppercase! tracking-wider! text-gray-400!">
                      Founded
                    </p>
                  </div>

                  <h1 className="text-4xl! md:text-7xl! font-black! text-slate-900! dark:text-white! leading-[1.2]! tracking-tighter! relative z-10 pt-12! sm:pt-16!">
                    আমাদের <br />
                    <span style={{ color: PRIMARY }}>মিশন</span>
                    <span style={{ color: `${PRIMARY}20` }}>.</span>
                  </h1>
                </div>
              </motion.div>
            </div>

            {/* Main Objectives Section */}
            <div className="mt-20!">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold! text-slate-900! dark:text-white! text-center mb-12!">
                মূল উদ্দেশ্যসমূহ
              </h2>

              <div className="grid md:grid-cols-2 gap-6! md:gap-8!">
                {[
                  "নারী কল্যাণ, শিশু কল্যাণ ও যুব কল্যাণমূলক সকল ধরনের কাজের প্রচেষ্টা অব্যাহত রাখা এবং শিশু শিক্ষার উপযুক্ত শিশু শিক্ষা কেন্দ্র স্থাপনসহ শিক্ষার মান উন্নয়নে কাজ করা।",
                  "সচেতনতামূলক বিভিন্ন প্রশিক্ষণ এবং অর্থনৈতিক সহায়তা প্রদানের মাধ্যমে জনগণের সামাজিক ও অর্থনৈতিক উন্নয়ন সাধন করা।",
                  "সামাজিক পর্যায়ে সংগঠন গঠনের মাধ্যমে দরিদ্র নারী-পুরুষের মধ্যে একতার মনোভাব জাগিয়ে তাদের মধ্যে সচেতনতা জাগত করা।",
                  "নারী-পুরুষের সম্পর্ক উন্নয়নের মাধ্যমে নারী-পুরুষের মধ্যে বিদ্যমান বৈষম্য হ্রাস করা।",
                  "সঠিক আয়-বৃদ্ধিমূলক প্রকল্প, ক্ষুদ্রঋণ এবং প্রয়োজনীয় অন্যান্য সহায়তা প্রদান ও বাস্তবায়নের মাধ্যমে দরিদ্র জনগোষ্ঠী, বিশেষ করে নারীদের জীবনযাত্রার মান উন্নত করা সংগাম চালিয়ে যাওয়া।",
                  "গ্রামীণ জনগোষ্ঠীর প্রাথমিক স্বাস্থ্য পরিচর্যা, পানি, স্যানিটেশন এবং পরিবেশ উন্নয়ন করা।",
                  "তৃণমূল পর্যায়ের জনগোষ্ঠীর দুর্যোগ মোকাবেলা ও জলবায়ু প্রতিক্রিয়ায় অভিযোজনে তাদের সক্ষমতা বৃদ্ধি করা।",
                  "স্থানীয় সম্পদের সুষ্ঠু ব্যবহারের মাধ্যমে কৃষি ও ভূমি উন্নয়ন করা এবং প্রান্তিক দরিদ্র জনগোষ্ঠীর খাদ্য ও পুষ্টি অবস্থার উন্নয়ন।",
                  // "অসামাজিক ও ক্ষতিকর কার্যক্রম (যেমন—মাদক ব্যবহার, অনলাইনে মোবাইল ও কম্পিউটারের অপব্যবহার) রোধে সচেতনতামূলক কার্যক্রম পরিচালনা করা।",
                  // "পিছিয়ে পড়া জনগোষ্ঠীর (ভিক্ষুক, বিশেষ শ্রেণি/গোষ্ঠী যেমন—হরিজন সম্প্রদায়, গৃহস্থ্য কর্মী, কৃষি শ্রমিক, যৌনকর্মী ইত্যাদি) জীবনমান উন্নয়নে সামাজিক সচেতনতা গড়ে তোলা এবং কর্মসংস্থানের সুযোগ সৃষ্টি।",
                  // "সব ধরনের প্রতিবন্ধীদের জীবনযাত্রার মান উন্নয়নে সামাজিক সচেতনতা গড়ে তোলা, শিক্ষা ও কর্মসংস্থানের সুযোগ সৃষ্টির ক্ষেত্রে সহযোগিতা প্রদান।",
                  // "সমাজের সর্বস্তরে স্বচ্ছতা, জবাবদিহিতা, শুদ্ধাচার এবং মর্যাদাকর মানবজীবন প্রতিষ্ঠার সংগ্রাম পরিচালনা করা।"
                ].map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 bg-gray-50! dark:bg-slate-800/50! p-6 rounded-2xl border border-gray-100! dark:border-slate-700!"
                  >
                    <div
                      className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white! font-bold text-sm mt-1!"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-gray-600! dark:text-gray-400! leading-relaxed!">
                      {objective}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] dark:opacity-[0.1]! hidden xl:block">
          <h1 className="text-[14rem]! font-black! leading-none! uppercase tracking-tighter!">
            SSUS
          </h1>
        </div>
      </section>
    </DanboxLayout>
  );
};

export default VisionMissionPage;



// "use client";

// import PageBanner from "@/components/PageBanner";
// import DanboxLayout from "@/layout/DanboxLayout";
// import { motion } from "framer-motion";

// const PRIMARY = "#f86048";

// const VisionMissionPage = () => {
//   return (
//     <DanboxLayout>
//       <PageBanner
//         pageName="Vision & Mission"
//         pageTitle="Our Purpose & Commitment"
//       />

//       <section className="relative py-16 md:py-20 lg:py-32 overflow-hidden bg-white dark:bg-[#0f172a]">
//         <div className="container mx-auto px-5 sm:px-6 lg:max-w-7xl relative z-10">
//           <div className="max-w-5xl mx-auto space-y-16 md:space-y-24 lg:space-y-32">
            
//             {/* Vision Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
//               <motion.div
//                 initial={{ opacity: 0, x: -40 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-5"
//               >
//                 <div
//                   className="relative p-8 sm:p-12 md:p-16 rounded-3xl group shadow-2xl"
//                   style={{ backgroundColor: `${PRIMARY}05` }}
//                 >
//                   <div
//                     className="absolute -inset-4 border-2 rounded-2xl transition-all duration-500 group-hover:-inset-6"
//                     style={{ borderColor: PRIMARY }}
//                   />

//                   <h1 className="text-4xl! md:text-7xl! font-black text-slate-900 dark:text-white leading-[1]! tracking-tighter! text-center! relative z-10">
//                     Our <br />
//                     <span style={{ color: PRIMARY }}>Vision</span>
//                     <span style={{ color: `${PRIMARY}20` }}>.</span>
//                   </h1>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, x: 40 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-7! pl-0 lg:pl-6!"
//               >
//                 <h2 className="text-3xl! sm:text-4xl! md:text-5xl! font-extrabold text-slate-900 dark:text-white leading-[1.15]! mb-6! md:mb-8!">
//                   Building an Inclusive & Resilient Coastal Society
//                 </h2>
//                 <p
//                   className="text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed italic border-l-4 pl-6 sm:pl-8"
//                   style={{ borderColor: PRIMARY }}
//                 >
//                   Sagarika envisions a cooperative society where women and men
//                   enjoy equal rights and opportunities, ensuring sustainable
//                   socio-economic development for marginalized families,
//                   alongside effective disaster management.
//                 </p>
//               </motion.div>
//             </div>

//             <div className="relative flex items-center justify-center">
//               <div className="w-full h-px bg-gray-100 dark:bg-gray-800" />
//               <div className="absolute bg-white dark:bg-[#0f172a] px-6">
//                 <div
//                   className="animate-pulse h-3 w-3 rounded-full"
//                   style={{ backgroundColor: PRIMARY }}
//                 />
//               </div>
//             </div>

//             {/* Mission Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-7 order-2 lg:order-1"
//               >
//                 <h2 className="text-3xl! sm:text-4xl! md:text-5xl! font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-8! md:mb-12!">
//                   Empowering Communities Through Participation & Equality
//                 </h2>

//                 <div className="space-y-8 md:space-y-10">
//                   <div className="flex items-start gap-5 md:gap-6">
//                     <div
//                       className="flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center mt-1 text-white font-black shadow-lg text-lg"
//                       style={{ backgroundColor: PRIMARY }}
//                     >
//                       1
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed pt-1">
//                       We strive to ensure active participation of target
//                       communities in socio-economic development through
//                       mobilization of local resources and implementation of
//                       demand-driven livelihood activities.
//                     </p>
//                   </div>
//                   <div className="flex items-start gap-5 md:gap-6">
//                     <div
//                       className="flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center mt-1 text-white font-black shadow-lg text-lg"
//                       style={{ backgroundColor: PRIMARY }}
//                     >
//                       2
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed pt-1">
//                       Our mission focuses on reducing gender discrimination,
//                       strengthening women’s empowerment within family and
//                       society, and creating a supportive environment for
//                       vulnerable populations.
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-5! order-1! lg:order-2!"
//               >
//                 <div
//                   className="relative! p-8! sm:p-12! md:p-16! rounded-3xl! group shadow-2xl overflow-hidden!"
//                   style={{ backgroundColor: `${PRIMARY}05` }}
//                 >
//                   <div
//                     className="absolute! -inset-4! border-2! rounded-2xl! transition-all! duration-500 group-hover:-inset-6!"
//                     style={{ borderColor: PRIMARY }}
//                   />

//                   <div
//                     className="absolute top-1! md:top-6! right-2! md:right-6! bg-white! dark:bg-slate-800! p-2! md:p-4! rounded-xl! shadow-lg! z-20! border-t-2!"
//                     style={{ borderTopColor: PRIMARY }}
//                   >
//                     <p
//                       className="text-[14px]! sm:text-xl! font-black!"
//                       style={{ color: PRIMARY }}
//                     >
//                       Est. 1985
//                     </p>
//                     <p className="text-[10px]! font-bold! uppercase! tracking-wider! text-gray-400!">
//                       Founded
//                     </p>
//                   </div>

//                   <h1 className="text-4xl! md:text-7xl! font-black! text-slate-900! dark:text-white leading-[1]! tracking-tighter! relative z-10 pt-12! sm:pt-16!">
//                     Our <br />
//                     <span style={{ color: PRIMARY }}>Mission</span>
//                     <span style={{ color: `${PRIMARY}20` }}>.</span>
//                   </h1>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] dark:opacity-[0.05] hidden xl:block">
//           <h1 className="text-[14rem]! font-black leading-none uppercase tracking-tighter">
//             SSUS
//           </h1>
//         </div>
//       </section>
//     </DanboxLayout>
//   );
// };

// export default VisionMissionPage;