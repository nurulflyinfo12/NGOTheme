"use client";
import { useState, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { useCareer } from "@/hooks/useCareer";
import { api } from "@/utility/api";
import { motion, AnimatePresence } from "framer-motion";
const PRIMARY = "#f86048";

const Careers = () => {
  const { careers, loading, fetchCareers } = useCareer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const openPdfModal = (fileUrl: string) => {
    setSelectedPdf(fileUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf("");
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "2026";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "2026";
    }
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Careers" pageTitle="Jobs & Careers" />

      {/* Job Circular */}
      <section className="py-10! bg-white dark:bg-[#0f172a]!">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          <h2 className="text-4xl font-black! text-center mb-12! text-gray-900! dark:text-white!">
            Job Circular
          </h2>

          {loading ? (
            /* Skeleton Loading Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="bg-white! dark:bg-gray-800! rounded-2xl p-6 shadow-lg animate-pulse space-y-4"
                >
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {careers
                ?.filter((item) => item.IsActive)
                .map((pub, idx) => {
                  const fileUrl = pub.FileUpload
                    ? api.getFileUrl(pub.FileUpload)
                    : "#";

                  return (
                    <motion.div
                      key={pub.CareerID || idx}
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
                        <span className="text-xs uppercase font-bold text-gray-400!">
                          {pub.Category || "Job Circular"}
                        </span>
                        <h3 className="text-xl! font-black! text-gray-900! dark:text-white! mt-2! mb-3!">
                          {pub.Title}
                        </h3>
                        <p className="text-sm! text-gray-500! dark:text-gray-300! mb-6!">
                          {pub.Subtitle}
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t! border-gray-100! dark:border-gray-700! pt-4! mt-auto1">
                        <span className="text-sm! font-semibold! text-gray-700! dark:text-gray-300!">
                          {formatDate(pub.SetDate)}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openPdfModal(fileUrl)}
                            className="text-sm font-semibold text-[#f86048] hover:underline"
                          >
                            View
                          </button>
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold dark:text-white! hover:underline"
                            download
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          )}
        </div>
      </section>

      {/* MODERN PDF MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 md:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                    <i className="fas fa-file-pdf text-lg"></i>
                  </div>
                </div>

                {/* Modal Action Controls */}
                <div className="flex items-center gap-2">
                  <a
                    href={selectedPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    <i className="fas fa-external-link-alt text-xs"></i>
                    Open in New Tab
                  </a>

                  <a
                    href={selectedPdf}
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-white bg-[#f86048] hover:bg-[#e24e37] rounded-xl transition-colors shadow-sm"
                  >
                    <i className="fas fa-download text-xs"></i>
                    Download
                  </a>

                  <button
                    onClick={closeModal}
                    className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all ml-1"
                    aria-label="Close modal"
                  >
                    <i className="fas fa-times text-base"></i>
                  </button>
                </div>
              </div>

              {/* PDF Viewer Body */}
              <div className="flex-1 p-3 bg-slate-100 dark:bg-slate-950/60 relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm font-medium -z-0">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-[#f86048] fa-spinner fa-spin"></i>{" "}
                    Loading Document...
                  </span>
                </div>
                <iframe
                  src={`${selectedPdf}#toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full rounded-xl border-0 relative z-10 shadow-inner"
                  title="PDF Viewer"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DanboxLayout>
  );
};

export default Careers;
