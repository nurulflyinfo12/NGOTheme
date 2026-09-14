"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import { usePublication, ApiPublication } from "@/hooks/usePublication";
import { api } from "@/utility/api";

const PRIMARY = "#f86048";

const PublicationsPage = () => {
  const { publications, loading, fetchPublications } = usePublication();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");

  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  const openPdfModal = (fileUrl: string) => {
    setSelectedPdf(fileUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdf("");
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  /* ---------------- Filters ---------------- */
  const activePublications = publications.filter((pub) => pub.IsActive);

  const filterByCategory = (categoryName: string) =>
    activePublications.filter(
      (pub) => pub.Category?.toLowerCase() === categoryName.toLowerCase()
    );

  const annualReports = filterByCategory("Annual Reports");
  const brochures = filterByCategory("Brochures & Leaflets");
  const newsletters = filterByCategory("Newsletters");
  const others = filterByCategory("Others");

  /* ---------------- Card Renderer ---------------- */
  const renderPublicationCards = (
    items: ApiPublication[],
    iconClass: string,
    iconColorClass: string
  ) => {
    if (items.length === 0) {
      return (
        <div className="col-span-full text-center py-8 text-gray-400 dark:text-slate-500!">
          No records found for this section.
        </div>
      );
    }

    return items.map((pub, idx) => {
      const fileUrl = pub.FileUpload ? api.getFileUrl(pub.FileUpload) : "#";

      return (
        <motion.div
          key={pub.PublicationID || idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="bg-white! dark:bg-gray-800! rounded-2xl shadow-lg hover:shadow-xl! transition-all duration-300 p-6! flex flex-col"
        >
          {/* Icon */}
          <div className={`${iconColorClass} mb-6!`}>
            <i className={`${iconClass} text-5xl`} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <span className="text-xs uppercase font-bold text-gray-400! dark:text-slate-500!">
              {pub.Category}
            </span>
            <h3 className="text-xl! font-black! text-gray-900! dark:text-white! mt-2! mb-3!">
              {pub.Title}
            </h3>
            {pub.Subtitle && (
              <p className="text-sm! text-gray-500! dark:text-gray-300! mb-6!">
                {pub.Subtitle}
              </p>
            )}
          </div>

          {/* ---------- Footer (FIXED ALIGNMENT) ---------- */}
          <div className="flex items-center justify-between gap-3 border-t! border-gray-100! dark:border-gray-700! pt-4! mt-auto min-h-[44px]">
            {/* Date — fixed height fallback so empty date doesn't shift layout */}
            <span className="text-sm! font-semibold! leading-none! text-gray-700! dark:text-gray-300!">
              {formatDate(pub.SetDate) || "\u00A0"}
            </span>

            {/* Actions — both aligned center, same line-height, button defaults removed */}
            <div className="flex items-center gap-4 shrink-0 text-sm! font-semibold! leading-none!">
              <button
                type="button"
                onClick={() => openPdfModal(fileUrl)}
                className="
                  text-[#f86048] hover:underline
                  bg-transparent border-0 p-0 m-0
                  cursor-pointer leading-none!
                  text-sm! font-semibold!
                "
              >
                View
              </button>

              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="
                  text-slate-700 dark:text-white!
                  hover:underline no-underline
                  leading-none! text-sm! font-semibold!
                "
              >
                Download
              </a>
            </div>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <DanboxLayout header={1}>
      <PageBanner
        pageName="Publications"
        pageTitle="Annual Reports & Publications"
      />

      {loading ? (
        <div className="py-20 text-center text-gray-500 dark:text-slate-400! font-medium">
          Loading publications...
        </div>
      ) : (
        <>
          {/* ---------- ANNUAL REPORTS ---------- */}
          {annualReports.length > 0 && (
            <section className="py-10! bg-white dark:bg-[#0f172a]!">
              <div className="container mx-auto px-6! lg:max-w-7xl">
                <h2 className="text-4xl! font-black! text-center mb-12! text-gray-900! dark:text-white!">
                  Annual Reports
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {renderPublicationCards(
                    annualReports,
                    "fas fa-file-pdf",
                    "text-red-500"
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ---------- BROCHURES & LEAFLETS ---------- */}
          {brochures.length > 0 && (
            <section className="py-10! bg-gray-50! dark:bg-slate-900!">
              <div className="container mx-auto px-6! lg:max-w-7xl">
                <h2 className="text-4xl! font-black! text-center mb-12! text-gray-900! dark:text-white!">
                  Brochures &amp; Leaflets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {renderPublicationCards(
                    brochures,
                    "fas fa-book-open",
                    "text-amber-600!"
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ---------- NEWSLETTERS ---------- */}
          {newsletters.length > 0 && (
            <section className="py-10! bg-white dark:bg-[#0f172a]!">
              <div className="container mx-auto px-6! lg:max-w-7xl">
                <h2 className="text-4xl! font-black! text-center mb-12! text-gray-900! dark:text-white!">
                  Newsletters
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {renderPublicationCards(
                    newsletters,
                    "fas fa-newspaper",
                    "text-emerald-600!"
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ---------- OTHERS ---------- */}
          {others.length > 0 && (
            <section className="py-10! bg-gray-50! dark:bg-[#0f172a]!">
              <div className="container mx-auto px-6! lg:max-w-7xl">
                <h2 className="text-4xl! font-black! text-center mb-12! text-gray-900! dark:text-white!">
                  Others
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {renderPublicationCards(
                    others,
                    "fas fa-file-alt",
                    "text-purple-600!"
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ---------- PDF MODAL ---------- */}
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
              className="bg-white dark:bg-slate-900! rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800!"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800! bg-slate-50/50 dark:bg-slate-900/50!">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                    <i className="fas fa-file-pdf text-lg" />
                  </div>
                  <span className="hidden sm:inline text-sm font-bold text-slate-700 dark:text-slate-300!">
                    PDF Preview
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300! bg-slate-100 dark:bg-slate-800! hover:bg-slate-200 dark:hover:bg-slate-700! rounded-xl transition-colors"
                  >
                    <i className="fas fa-external-link-alt text-xs" />
                    Open in New Tab
                  </a>

                  <a
                    href={selectedPdf}
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-white! bg-[#f86048] hover:bg-[#e24e37] rounded-xl transition-colors shadow-sm"
                  >
                    <i className="fas fa-download text-xs" />
                    Download
                  </a>

                  <button
                    onClick={closeModal}
                    className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800! hover:bg-red-500 hover:text-white! dark:hover:bg-red-500! text-slate-500 dark:text-slate-400! flex items-center justify-center transition-all ml-1"
                    aria-label="Close modal"
                  >
                    <i className="fas fa-times text-base" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 p-3 bg-slate-100 dark:bg-slate-950/60! relative">
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

export default PublicationsPage;