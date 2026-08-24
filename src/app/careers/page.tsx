"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";

const PRIMARY = "#f86048";

const getPreviewUrl = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;

const getDownloadUrl = (id: string) =>
  `https://drive.google.com/uc?export=download&id=${id}`;

const Careers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");

  const openPdfModal = (file: string) => {
    setSelectedPdf(file);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf("");
  };

  const JobCircular = [
    {
      id: 1,
      title: "শিক্ষানবিশ শাখা ব্যবসা",
      description: "শিক্ষানবিশ শাখা ব্যবসা",
      fileId: "14Y1Z6ADQNYPHx7qTTjR-TY5dGNtppYW0",
      date: "2026",
      type: "Job Circular",
    },
    {
      id: 2,
      title: "শাখা ব্যবস্থাপক - Sagarika Samaj",
      description: "শাখা ব্যবস্থাপক - Sagarika Samaj",
      fileId: "1Ol-VizxlKKmkmuLyf7WeJyws35JXCY2m",
      date: "2026",
      type: "Job Circular",
    },
    {
      id: 3,
      title: "ক্রেডিট অফিসার (অভিজ্ঞ)",
      description: "ক্রেডিট অফিসার (অভিজ্ঞ)- Published: 19 Aug 2026",
      fileId: "1X3wgAOW4ch2MONErio6kSKxZ3cZapqEJ",
      date: "2026",
      type: "Job Circular",
    },
    {
      id: 4,
      title: "ক্রেডিট অফিসার - অভিজ্ঞ",
      description: "ক্রেডিট অফিসার (অভিজ্ঞ)- Application Deadline : 06 Sep 2026",
      fileId: "1aQcPuBk73gZlnNkna2hqTI6Vs0yJXqST",
      date: "2026",
      type: "Job Circular",
    },
    {
      id: 5,
      title: "এলাকা ব্যবস্থাপক - Sagarika Samaj",
      description: "এলাকা ব্যবস্থাপক - Sagarika Samaj - Published: 19 Aug 2026",
      fileId: "1gThdIAW9-WwwQcaVh8tBGn8iCMy7xhLV",
      date: "2026",
      type: "Job Circular",
    },
    {
      id: 6,
      title: "নিয়োগ বিজ্ঞপ্তি",
      description: "এলাকা ব্যবস্থাপক, শাখা ব্যবস্থাপক, শিক্ষানবিশ শাখা ব্যবস্থাপক, ক্রেডিট অফিসার (অভিজ্ঞ), ক্রেডিট অফিসার (অভিজ্ঞতা ছাড়া)",
      fileId: "1XIs_ZgABZGy7wBioMJaZLx-_mzpuG6IE",
      date: "2026",
      type: "Job Circular",
    },

  ];


  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Careers" pageTitle="Jobs & Careers" />

      {/* Job Circular */}
      <section className="py-10! bg-white dark:bg-[#0f172a]!">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          <h2 className="text-4xl font-black! text-center mb-12! text-gray-900! dark:text-white!">
            Job Circular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {JobCircular.map((pub, idx) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white! dark:bg-gray-800! rounded-2xl shadow-lg hover:shadow-xl! transition-all duration-300 p-6! flex flex-col"
              >
                <div className="text-red-500 mb-6!">
                  <i className="fas fa-file-pdf text-5xl"></i>
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase font-bold text-gray-400!">{pub.type}</span>
                  <h3 className="text-xl! font-black! text-gray-900! dark:text-white! mt-2! mb-3!">{pub.title}</h3>
                  <p className="text-sm! text-gray-500! dark:text-gray-300! mb-6!">{pub.description}</p>
                </div>
                <div className="flex items-center justify-between border-t! border-gray-100! dark:border-gray-700! pt-4! mt-auto1">
                  <span className="text-sm! font-semibold! text-gray-700! dark:text-gray-300!">{pub.date}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(getPreviewUrl(pub.fileId), "_blank")}
                    >
                      View
                    </button>
                    <a
                      href={getDownloadUrl(pub.fileId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark:text-white!"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeModal}>
          <div className="bg-white! dark:bg-gray-9001 rounded-2xl! w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4! border-b! dark:border-gray-7001">
              <h3 className="text-lg font-semibold text-gray-900! dark:text-white!">Document Viewer</h3>
              <button
                onClick={closeModal}
                className="text-gray-500! hover:text-gray-700! dark:text-gray-400! dark:hover:text-white! text-3xl! leading-none!"
              >
                ×
              </button>
            </div>
            <div className="flex-1 p-2! bg-gray-100! dark:bg-gray-800!">
              <iframe
                src={`${selectedPdf}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full rounded-xl"
                title="PDF Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </DanboxLayout>
  );
};

export default Careers;