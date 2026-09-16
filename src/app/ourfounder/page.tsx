"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageBanner from "@/components/PageBanner";
import Link from "next/link";
import DanboxLayout from "@/layout/DanboxLayout";

const PRIMARY = "#f86048";

export default function FounderPage() {
  return (
    <DanboxLayout header={1}>
      <main className="bg-white dark:bg-[#0f172a]! font-bangla">
        <PageBanner pageName="Our Founder" pageTitle="সংস্থার প্রতিষ্ঠাতা" />

        <section className="py-20! lg:py-32!">
          <div className="container mx-auto px-6! lg:max-w-7xl!">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 lg:sticky lg:top-32"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/assets/img/founders/founder.webp"
                    alt="মরহুম মোঃ ফজলুল হক (হক সাহেব)"
                    fill
                    className="object-fill"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t! from-black/60! via-transparent to-transparent" />
                </div>

                <div
                  className="mt-8! h-1! w-24! rounded-full"
                  style={{ backgroundColor: PRIMARY }}
                />
                <blockquote className="mt-6! text-xl! italic! text-gray-600! dark:text-gray-400! leading-relaxed">
                  "সংস্থার প্রতিষ্ঠাতা মরহুম মোঃ ফজলুল হক (হক সাহেব) স্বরণে-"
                </blockquote>
              </motion.div>

              <div className="lg:col-span-7 space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl! font-bold! text-gray-900! dark:text-white! mb-6!">
                    সাগরিকা সমাজ উন্নয়ন সংস্থার প্রতিষ্ঠাতা পরিচালক
                  </h2>
                  <p className="text-lg! text-gray-600! dark:text-gray-300! leading-relaxed!">
                    মরহুম মোঃ ফজলুল হক (হক সাহেব) জন্ম-০২ জানুয়ারি ১৯৩২ইং,
                    মৃত্যু-৮ নভেম্বর ১৯৯৫ইং
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose! prose-lg! text-gray-600! dark:text-gray-400! leading-relaxed! space-y-6!"
                >
                  <p>
                    বিশিষ্ট সমাজসেবক মানবদরদী মরহুম মোঃ ফজলুল হক (হক সাহেব)
                    দারিদ্র পীড়িত ও প্রাকৃতিক দুর্যোগে ভ্রান্তিগ্রস্থ অসহায়
                    মানুষের সহায়তা প্রদানের উদ্দেশ্যে ১৯৮৫ সালে সাগরিকা সমাজ
                    উন্নয়ন সংস্থা প্রতিষ্ঠা করেন।
                  </p>
                  <p>
                    তিনি ১৯৭০ সনে সংঘটিত প্রলয়ংকরী ঘূর্ণীঝড় ও জলোচ্ছ্বাসে অসংখ্য
                    মৃতের দাফন ও সৎকার করেছেন এবং এলাকার মানুষকে সংগঠিত করে
                    খাদ্য, বস্ত্র ও আশ্রয়হীন মানুষকে নিঃস্বার্থভাবে সহায়তা
                    প্রদান করেছেন।
                  </p>
                  <p>
                    তিনি দীর্ঘ ১৫ বছর যাবৎ বাংলাদেশ রেডক্রিসেন্ট সোসাইটির
                    দুর্যোগ ঘূর্ণীঝড় কর্মসূচীর (সিপিপি) তৎকালীন নোয়াখালী সদর
                    থানা টিম লীডার হিসেবে দক্ষতার সাথে দায়িত্ব পালন করেন।
                    সিপিপি'র গ্রাম ও ইউনিয়ন ভিত্তিক স্বেচ্ছাসেবক ইউনিট গঠন ও
                    সফলভাবে পরিচালনা করেছেন।
                  </p>
                  <p>
                    তিনি সিপিপি স্বেচ্ছাসেবক সদস্যদের খুবই প্রিয়ভাজন ও সর্বজন
                    শ্রদ্ধেয় ছিলেন। তিনি চরবাটা খাসের হাট হাই স্কুল পরিচালনা
                    কমিটি, খাসের হাট জামে মসজিদ পরিচালনা কমিটি ও খাসের হাট বাজার
                    কমিটির সভাপতি, সৈকত ডিগ্রি কলেজের প্রতিষ্ঠাতা সদস্য, চরবাটা
                    বালিকা উচ্চ বিদ্যালয় প্রতিষ্ঠায় সহযোগিতাসহ সামাজিক বিভিন্ন
                    কর্মকান্ডের সাথে সম্পৃক্ত থেকে প্রতিষ্ঠান সমূহ ও এলাকার
                    উন্নয়নে অগ্রণী ভূমিকা পালন করেছেন।
                  </p>
                  <p>
                    তিনি আমাদের স্বাধীনতা সংগ্রাম ও ১৯৭১ সনে মহান মুক্তিযুদ্ধে
                    একজন অন্যতম সংগঠক হিসেবে এলাকা মুক্তিযোদ্ধা ইউনিট ও
                    মুক্তিকামী জনগণকে সংগঠিতকরণের ক্ষেত্রে গুরুত্বপূর্ণ অবদান
                    রাখেন।
                  </p>
                  <p>
                    হক সাহেব তাঁর সমমনা কিছু সঙ্গী ও কর্মরত স্বেচ্ছাসেবী
                    কর্মীবৃন্দদের নিয়ে সাগরিকা সমাজ উন্নয়ন সংস্থা প্রতিষ্ঠার
                    প্রারম্ভিক সময় থেকে তাঁর বলিষ্ঠ নেতৃত্বে সংস্থাটিকে একটি
                    কার্যকর ও উন্নয়নমুখী সংগঠনে পরিণত করার প্রচেষ্টায় নিয়োজিত
                    ছিলেন। ৮ নভেম্বর, ১৯৯৫ খ্রিঃ তারিখে দিবাগত রাত্রে সংস্থার
                    প্রতিষ্ঠাতা জনাব মরহুম মোঃ ফজলুল হক (হক সাহেব) মৃত্যুবরণ
                    করেন।
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border-l-4 pl-8"
                  style={{ borderColor: PRIMARY }}
                >
                  <h3 className="text-2xl! font-bold! mb-4! dark:text-white!">
                    উত্তরাধিকার
                  </h3>
                  <p className="text-gray-600! dark:text-gray-300! leading-relaxed! mb-6!">
                    আজও তাঁর প্রতিষ্ঠিত সংস্থা হাজারো পরিবারের জীবনমান উন্নয়নে
                    কাজ করে যাচ্ছে। তাঁর স্বপ্ন ও আদর্শ আজও আমাদের অনুপ্রেরণা।
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DanboxLayout>
  );
}

// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import PageBanner from "@/components/PageBanner";
// import Link from "next/link";
// import DanboxLayout from "@/layout/DanboxLayout";
// const PRIMARY = "#f86048";

// export default function FounderPage() {
//   return (
//     <DanboxLayout>
//       <main className="bg-white dark:bg-[#0f172a]">

//         <PageBanner
//           pageName="Our Founder"
//           pageTitle="The Visionary Behind SSUS"
//         />

//         <section className="py-20 lg:py-32">
//           <div className="container mx-auto px-6 lg:max-w-7xl">
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="lg:col-span-5 lg:sticky lg:top-32"
//               >
//                 <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
//                   <Image
//                     src="/assets/img/founders/founder.webp"
//                     alt="Md. Fazlul Hoque"
//                     fill
//                     className="object-fill"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                   {/* <div className="absolute bottom-8 left-8 text-white">
//                     <p className="text-sm font-medium uppercase tracking-widest opacity-80">
//                       Founder, SSUS
//                     </p>
//                     <h3 className="text-2xl font-bold">Md. Fazlul Hoque</h3>
//                     <p className="text-emerald-400 font-medium">
//                       1985 — Present Legacy
//                     </p>
//                   </div> */}
//                 </div>

//                 <div
//                   className="mt-8 h-1 w-24 rounded-full"
//                   style={{ backgroundColor: PRIMARY }}
//                 />
//                 <blockquote className="mt-6 text-xl italic text-gray-600 dark:text-gray-400 leading-relaxed">
//                   "সংস্থার প্রতিষ্ঠাতা মরহুম মোঃ ফজলুল হক (হক সাহেব) স্বরণে-"
//                 </blockquote>
//               </motion.div>

//               <div className="lg:col-span-7 space-y-12">

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                 >
//                   <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
//                     Remembering "Hoque Saheb"
//                   </h2>
//                   <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
//                     Md. Fazlul Hoque, widely known as{" "}
//                     <span className="font-semibold text-gray-900 dark:text-white">
//                       “Hoque Saheb,”
//                     </span>{" "}
//                     was a respected social worker who dedicated his life to the
//                     coastal regions of Noakhali. In 1985, he turned a vision of
//                     social equality into a reality by establishing Sagarika
//                     Samaj Unnayan Sangstha (SSUS).
//                   </p>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   className="grid grid-cols-1 md:grid-cols-2 gap-8"
//                 >
//                   <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
//                     <h4
//                       className="font-bold text-xl mb-4"
//                       style={{ color: PRIMARY }}
//                     >
//                       The Vision
//                     </h4>
//                     <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
//                       <li className="flex items-center gap-2">
//                         <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
//                         Poverty Alleviation
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
//                         Women’s Empowerment
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
//                         Disaster Preparedness
//                       </li>
//                     </ul>
//                   </div>

//                   <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
//                     <h4
//                       className="font-bold text-xl mb-4"
//                       style={{ color: PRIMARY }}
//                     >
//                       The Inspiration
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
//                       With the early support of global leaders like **Oxfam**,
//                       Hoque Saheb launched the first development activities in
//                       Noakhali, proving that local leadership can drive
//                       international-standard change.
//                     </p>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   className="border-l-4 pl-8"
//                   style={{ borderColor: PRIMARY }}
//                 >
//                   <h3 className="text-2xl font-bold mb-4">A Lasting Legacy</h3>
//                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
//                     Today, his foundation supports thousands of families through
//                     microfinance, disaster risk reduction, and education. What
//                     began as a local mission has grown into a recognized
//                     development organization serving the marginalized
//                     communities of coastal Bangladesh.
//                   </p>
//                   <Link
//                     href="/our-projects"
//                     className="inline-flex items-center font-bold gap-2 transition-all hover:gap-4"
//                     style={{ color: PRIMARY }}
//                   >
//                     See how we continue his work
//                     <span>→</span>
//                   </Link>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </DanboxLayout>
//   );
// }
