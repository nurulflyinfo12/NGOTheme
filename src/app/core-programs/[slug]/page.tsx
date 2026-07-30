"use client";

import { useParams } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import programs from "@/app/data/programs.json";

type Sector = {
  cat: string;
  items: string;
};

type Program = {
  title: string;
  category?: string;
  established: string;
  branches: string;
  intro: string;
  stats: string;
  sectors: Sector[];
  ceiling?: string;
  duration?: string;
  charge: string;
  installments?: string;
  src?: string;
};

const ProgramDetails = () => {
  const params = useParams();
  const slug = params.slug as string;

  const currentProgram = programs[slug as keyof typeof programs] as Program;

  if (!currentProgram) {
    return (
      <DanboxLayout>
        <div className="p-40 text-center">
          <h2 className="text-2xl font-bold text-gray-400">
            Program Not Found
          </h2>
        </div>
      </DanboxLayout>
    );
  }

  return (
    <DanboxLayout header={1}>
      <PageBanner pageName={currentProgram.title} pageImage={currentProgram.src} />

      <section className="program-details-section py-24! lg:py-32! bg-white dark:bg-[#0f172a]!">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12!">
              <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl">
                <p className="text-blue-100! text-sm uppercase tracking-widest! font-bold mb-2!">
                  প্রতিষ্ঠা
                </p>
                <h4 className="text-3xl font-bold dark:text-white!">
                  {currentProgram.established}
                </h4>
              </div>

              <div className="bg-white dark:bg-slate-800! p-8! rounded-3xl border border-gray-100 dark:border-slate-700! shadow-sm">
                <p className="text-gray-400 dark:text-gray-500! text-sm uppercase tracking-widest! font-bold mb-2!">
                  শাখা সংখ্যা
                </p>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white!">
                  {currentProgram.branches}
                </h4>
              </div>

              <div className="bg-white! dark:bg-slate-800! p-8 rounded-3xl border! border-gray-100! dark:border-slate-700! shadow-sm">
                <p className="text-gray-400 dark:text-gray-500! text-sm! uppercase tracking-widest font-bold mb-2">
                  সার্ভিস চার্জ
                </p>
                <h4 className="text-3xl font-bold text-gray-900 dark:text-white!">
                  {currentProgram.charge}
                </h4>
              </div>
            </div>

            {/* Introduction Section */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900! dark:text-white! mb-6!">
                ভূমিকা ও উদ্দেশ্য
              </h3>

              <div className="text-gray-600! dark:text-gray-300! leading-relaxed! space-y-4! text-lg">
                <p>{currentProgram.intro}</p>
                <p>{currentProgram.stats}</p>
              </div>
            </div>

            {/* Sectors Section */}
            <div className="mt-20!">
              <h3 className="text-2xl font-bold text-gray-900! dark:text-white! mb-6! border-l-4! border-blue-600! pl-4!">
                ঋণের খাত সমূহ
              </h3>

              <div className="grid gap-4">
                {currentProgram.sectors?.map((sector, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50! dark:bg-slate-800/80! p-6 rounded-2xl hover:bg-blue-50! dark:hover:bg-slate-700! transition"
                  >
                    <h5 className="font-bold text-blue-900! dark:text-blue-400! mb-1!">
                      {sector.cat}
                    </h5>
                    <p className="text-gray-600! dark:text-gray-400! text-sm">
                      {sector.items}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="mt-16! grid md:grid-cols-3 gap-6">
              {currentProgram.ceiling && (
                <div className="p-6! border! border-gray-100! dark:border-slate-700! rounded-2xl bg-white! dark:bg-slate-800!">
                  <p className="text-gray-400! dark:text-gray-500! text-sm mb-1!">ঋণের সীমা</p>
                  <h4 className="font-bold text-gray-900! dark:text-white!">
                    {currentProgram.ceiling}
                  </h4>
                </div>
              )}

              {currentProgram.duration && (
                <div className="p-6! border! border-gray-100! dark:border-slate-700! rounded-2xl bg-white! dark:bg-slate-800!">
                  <p className="text-gray-400! dark:text-gray-500! text-sm mb-1!">মেয়াদ</p>
                  <h4 className="font-bold text-gray-900! dark:text-white!">
                    {currentProgram.duration}
                  </h4>
                </div>
              )}

              {currentProgram.installments && (
                <div className="p-6! border! border-gray-100! dark:border-slate-700! rounded-2xl bg-white! dark:bg-slate-800!">
                  <p className="text-gray-400! dark:text-gray-500! text-sm mb-1!">কিস্তি</p>
                  <h4 className="font-bold text-gray-900! dark:text-white!">
                    {currentProgram.installments}
                  </h4>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </DanboxLayout>
  );
};

export default ProgramDetails;