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

const PublicationsPage = () => {
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
      description: "নিয়োগ বিজ্ঞপ্তি",
      fileId: "1tyDLiua1LRDt3QiKqIt1Jbs5d6etF7di",
      date: "2026",
      type: "Job Circular",
    },

  ];

  const annualReports = [
    {
      id: 1,
      title: "Annual Report 2025",
      description: "Annual performance and financial report for the year 2025.",
      fileId: "1ptFofvk1DiAt3KJ2XrxfrpOCsJTHAQBO",
      date: "2025",
      type: "Annual Report",
    },
    {
      id: 2,
      title: "SSUS Annual Report 2024",
      description: "Annual performance and financial report for the year 2024.",
      fileId: "1Garq6N5fXZ9FTZYOWprces0y_-IfD38S",
      date: "2024",
      type: "Annual Report",
    },
    {
      id: 3,
      title: "Annual Report 2023",
      description: "Annual performance and financial report for the year 2023.",
      fileId: "13nMB6Fkb7CU6WnGA-s4OH2SM3-UyqPUz",
      date: "2023",
      type: "Annual Report",
    },

  ];


  const brochures = [
    {
      id: 1,
      title: "Profile of Sagarika",
      description: "Sagarika Samaj Unnayan Sangstha-June 2026",
      fileId: "1ZG6HxR6RaNwTetfjq9FpcGbTjTWIUcFd",
      type: "Brochure",
    },
    {
      id: 2,
      title: "Baby Tormuj",
      description: "Baby Tormuj (Watermelon) cultivation guide.",
      fileId: "1w9DWr4_h98baHi7zdAQT3RPcCnQXbRzf",
      type: "Brochure",
    },
    {
      id: 3,
      title: "Color Broyler",
      description: "Color Broyler poultry farming guide.",
      fileId: "1I9iN5mxjtrS5WCz-2iekuK1j5sDRJNwa",
      type: "Brochure",
    },
    {
      id: 4,
      title: "Pangus",
      description: "Pangus fish farming guide.",
      fileId: "1DvW3IyM0yLckFGrr3-1zAxtfO_yDX19x",
      type: "Brochure",
    },
    {
      id: 5,
      title: "SAGORIKA Leaflet",
      description: "Organization overview leaflet.",
      fileId: "1sOv-uaUXaOyigzZTAob9JIH_KXqSSWuD",
      type: "Brochure",
    },
    {
      id: 6,
      title: "TRICO COMPOT",
      description: "Trichocompost production guide.",
      fileId: "1WSX_O5rxEnxscVKp01j6GfFPr-VMJ_da",
      type: "Brochure",
    },
  ];

  const newsletters = [

    {
      id: 1,
      title: "Newsletter Jan to March 26",
      description: "Newsletter (January to March 26).",
      fileId: "1pCKPDtUqNZGcYur-0vg5kyHWmYDdfOP_",
      date: "2023",
      type: "Newsletter",
    },
    {
      id: 2,
      title: "Newsletter July to December 2025",
      description: "Newsletter (July to December 2025).",
      fileId: "16dQedqZYv6j1ozo1YJufIx2xZ4JWbbMh",
      date: "2025",
      type: "Newsletter",
    },
    {
      id: 3,
      title: "OCT-DEC 2024",
      description: "Newsletter (October - December 2024).",
      fileId: "1oKsEX7PWsgDIOsz5XikD2WfhxrNc9zu3",
      date: "2024",
      type: "Newsletter",
    },
    {
      id: 4,
      title: "OCT-DEC 2022",
      description: "Newsletter (October - December 2022).",
      fileId: "1oKsEX7PWsgDIOsz5XikD2WfhxrNc9zu3",
      date: "2024",
      type: "Newsletter",
    },
  ];

  const Others = [
    {
      id: 1,
      title: "Report on Dr. Md. Jasim Uddin's Visit",
      description: "Visit report of Dr. Md. Jasim Uddin, Additional Managing Director-2, PKSF on 6-7 February 2023.",
      fileId: "1ssVjtsshbRsUeBEFzOcj6sjcfA6CYo_q",
      date: "February 2023",
      type: "Visit Report",
    },
  ];


  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Publications" pageTitle="Annual Reports & Publications" />
      {/* Annual Repoets  */}
      <section className="py-10! bg-white dark:bg-[#0f172a]!">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          <h2 className="text-4xl font-black! text-center mb-12! text-gray-900! dark:text-white!">
            Annual Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {annualReports.map((pub, idx) => (
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
                      onClick={() => openPdfModal(getPreviewUrl(pub.fileId))}
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

      {/*BROCHURES */}
      <section className="py-10! bg-gray-50! dark:bg-slate-900!">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          <h2 className="text-4xl! font-black! text-center mb-12! text-gray-900! dark:text-white!">
            Brochures & Leaflets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brochures.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white! dark:bg-gray-800! rounded-2xl shadow-lg! hover:shadow-xl! transition-all duration-300 p-6 flex flex-col"
              >
                <div className="text-amber-600! mb-6!">
                  <i className="fas fa-book-open text-5xl"></i>
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase font-bold! text-gray-400!">{item.type}</span>
                  <h3 className="text-xl font-black! text-gray-900! dark:text-white! mt-2! mb-3!">{item.title}</h3>
                  <p className="text-sm text-gray-500! dark:text-gray-300! mb-6!">{item.description}</p>
                </div>
                <div className="flex items-center justify-end border-t! border-gray-100! dark:border-gray-700! pt-4! mt-auto!">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPdfModal(getPreviewUrl(item.fileId))}
                    >
                      View
                    </button>
                    <a
                      href={getDownloadUrl(item.fileId)}
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

      {/* NEWSLETTERS */}
      <section className="py-10! bg-white dark:bg-[#0f172a]!">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          <h2 className="text-4xl! font-black text-center mb-12! text-gray-900! dark:text-white!">
            Newsletters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsletters.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white! dark:bg-gray-800! rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6! flex flex-col"
              >
                <div className="text-emerald-600! mb-6!">
                  <i className="fas fa-newspaper text-5xl"></i>
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase font-bold! text-gray-400!">{item.type}</span>
                  <h3 className="text-xl font-black! text-gray-900! dark:text-white! mt-2! mb-3!">{item.title}</h3>
                  <p className="text-sm text-gray-500! dark:text-gray-300! mb-6!">{item.description}</p>
                </div>
                <div className="flex items-center justify-end border-t! border-gray-100! dark:border-gray-700! pt-4! mt-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPdfModal(getPreviewUrl(item.fileId))}
                    >
                      View
                    </button>
                    <a
                      href={getDownloadUrl(item.fileId)}
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

      {/* OTHERS */}
      <section className="py-10! bg-gray-50! dark:bg-[#0f172a]!">
        <div className="container mx-auto px-6! lg:max-w-7xl">
          <h2 className="text-4xl font-black text-center mb-12! text-gray-900! dark:text-white!">
            Others
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Others.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white! dark:bg-gray-800! rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
              >
                <div className="text-purple-600! mb-6!">
                  <i className="fas fa-file-alt text-5xl"></i>
                </div>
                <div className="flex-1">
                  <span className="text-xs! uppercase font-bold! text-gray-400!">{item.type}</span>
                  <h3 className="text-xl font-black! text-gray-900! dark:text-white! mt-2! mb-3!">{item.title}</h3>
                  <p className="text-sm text-gray-500! dark:text-gray-300! mb-6!">{item.description}</p>
                </div>
                <div className="flex items-center justify-end border-t! border-gray-100! dark:border-gray-700! pt-4! mt-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openPdfModal(getPreviewUrl(item.fileId))}
                    >
                      View
                    </button>
                    <a
                      href={getDownloadUrl(item.fileId)}
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

export default PublicationsPage;




// "use client";

// import { motion } from "framer-motion";
// import PageBanner from "@/components/PageBanner";
// import DanboxLayout from "@/layout/DanboxLayout";

// const PRIMARY = "#f86048";

// const PublicationsPage = () => {
//   const annualReports = [
//     {
//       id: 1,
//       title: "Annual Report 2025",
//       description: "Annual performance and financial report for the year 2025.",
//       file: "/assets/annualreport/Annual Report 2025.pdf",
//       date: "2025",
//       type: "Annual Report",
//     },
//     {
//       id: 2,
//       title: "SSUS Annual Report 2024",
//       description: "Annual performance and financial report for the year 2024.",
//       file: "/assets/annualreport/SSUS Annual Report 2024.pdf",
//       date: "2024",
//       type: "Annual Report",
//     },
//     {
//       id: 3,
//       title: "Annual Report 2023",
//       description: "Annual performance and financial report for the year 2023.",
//       file: "/assets/annualreport/Annual Report 2023.pdf",
//       date: "2023",
//       type: "Annual Report",
//     },
//     {
//       id: 4,
//       title: "Annual Report 2022",
//       description: "Annual performance and financial report for the year 2022.",
//       file: "/assets/annualreport/Annual Report 2022.pdf",
//       date: "2022",
//       type: "Annual Report",
//     },
//     {
//       id: 5,
//       title: "Annual Report 2021",
//       description: "Annual performance and financial report for the year 2021.",
//       file: "/assets/annualreport/Annual Report 2021.pdf",
//       date: "2021",
//       type: "Annual Report",
//     },
//   ];

//   const brochures = [
//     {
//       id: 1,
//       title: "Baby Tormuj",
//       description: "Baby Tormuj (Watermelon) cultivation guide.",
//       file: "/assets/brochure/Baby Tormuj Edited.pdf",
//       type: "Brochure",
//     },
//     {
//       id: 2,
//       title: "Color Broyler",
//       description: "Color Broyler poultry farming guide.",
//       file: "/assets/brochure/Color Broylar Edited.pdf",
//       type: "Brochure",
//     },
//     {
//       id: 3,
//       title: "Diagnostic Brusior",
//       description: "Diagnostic services brochure.",
//       file: "/assets/brochure/Diagnostic Brusior 1.pdf",
//       type: "Brochure",
//     },
//     {
//       id: 4,
//       title: "Fish Farming & Pona Seller",
//       description: "Fish farming and fingerling selling guide.",
//       file: "/assets/brochure/Fish farming & Pona seller SSUS.pdf",
//       type: "Brochure",
//     },
//     {
//       id: 5,
//       title: "Pangus",
//       description: "Pangus fish farming guide.",
//       file: "/assets/brochure/Pangus_SSUS.pdf",
//       type: "Brochure",
//     },
//     {
//       id: 6,
//       title: "SAGORIKA Leaflet",
//       description: "Organization overview leaflet.",
//       file: "/assets/brochure/SAGORIKA  leaflet.pdf",
//       type: "Brochure",
//     },
//     {
//       id: 7,
//       title: "Training Center",
//       description: "Training center facilities brochure.",
//       file: "/assets/brochure/Training Center Brochure.pdf",
//       type: "Brochure",
//     },
//     {
//       id: 8,
//       title: "TRICO COMPOT",
//       description: "Trichocompost production guide.",
//       file: "/assets/brochure/TRICO COMPOT Edited.pdf",
//       type: "Brochure",
//     },
//   ];

//   const newsletters = [
//     {
//       id: 1,
//       title: "Newsletter Jan - March 2024",
//       description: "Quarterly newsletter (January - March 2024).",
//       file: "/assets/newsleater/News latter (jan-March)2024.pdf",
//       date: "2024",
//       type: "Newsletter",
//     },
//     {
//       id: 2,
//       title: "Newsletter January - March 2023",
//       description: "Quarterly newsletter (January - March 2023).",
//       file: "/assets/newsleater/Newsletter (January - March)2023.pdf",
//       date: "2023",
//       type: "Newsletter",
//     },
//     {
//       id: 3,
//       title: "Newsletter July - September 2022",
//       description: "Quarterly newsletter (July - September 2022).",
//       file: "/assets/newsleater/Newsletter (July-september)2022.pdf",
//       date: "2022",
//       type: "Newsletter",
//     },
//     {
//       id: 4,
//       title: "Newsletter April - June",
//       description: "Quarterly newsletter (April - June).",
//       file: "/assets/newsleater/Newsletter April -June pdf.pdf",
//       date: "2022",
//       type: "Newsletter",
//     },
//     {
//       id: 5,
//       title: "Newsletter Jan to March 26",
//       description: "Newsletter (January to March 26).",
//       file: "/assets/newsleater/Newsletter Jan to March 26 PDF.pdf",
//       date: "2023",
//       type: "Newsletter",
//     },
//     {
//       id: 6,
//       title: "Newsletter July to December 2025",
//       description: "Newsletter (July to December 2025).",
//       file: "/assets/newsleater/Newsletter July to December 2025.pdf",
//       date: "2025",
//       type: "Newsletter",
//     },
//     {
//       id: 7,
//       title: "OCT-DEC 2024",
//       description: "Newsletter (October - December 2024).",
//       file: "/assets/newsleater/OCT-DEC 24.pdf",
//       date: "2024",
//       type: "Newsletter",
//     },
//     {
//       id: 8,
//       title: "OCT-DEC 2024",
//       description: "Newsletter (October - December 2022).",
//       file: "/assets/newsleater/Newsletter(october and december)2022.pdf",
//       date: "2024",
//       type: "Newsletter",
//     },
//   ];

//   const Others = [
//     {
//       id: 1,
//       title: "Activities of Grihayon at SSUS",
//       description:
//         "A newsletter highlighting SSUS Grihayon activities, including the housing program, stakeholder meeting, and field visit conducted in January 2024.",
//       file: "/assets/others/Activities of Grihayon at SSUS.pdf",
//       date: "2024",
//       type: "Newsletter",
//     },
//     {
//       id: 2,
//       title: "Report on Dr. Md. Jasim Uddin's Visit",
//       description: "Visit report of Dr. Md. Jasim Uddin, Additional Managing Director-2, PKSF on 6-7 February 2023.",
//       file: "/assets/others/Report on Dr. Md Jasim Uddin's Visit at SSUS.pdf",
//       date: "February 2023",
//       type: "Visit Report",
//     },
//   ];

//   return (
//     <DanboxLayout>
//       <PageBanner pageName="Publications" pageTitle="Annual Reports & Publications" />

//       {/* ====================== ANNUAL REPORTS ====================== */}
//       <section className="py-10 bg-white dark:bg-[#0f172a]">
//         <div className="container mx-auto px-6 lg:max-w-7xl">
//           <h2 className="text-4xl font-black text-center mb-12! text-gray-900 dark:text-white">
//             Annual Reports
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {annualReports.map((pub, idx) => (
//               <motion.div
//                 key={pub.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
//               >
//                 <div className="text-red-500 mb-6">
//                   <i className="fas fa-file-pdf text-5xl"></i>
//                 </div>
//                 <div className="flex-1">
//                   <span className="text-xs uppercase font-bold text-gray-400">{pub.type}</span>
//                   <h3 className="text-xl font-black text-gray-900 dark:text-white mt-2 mb-3">{pub.title}</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">{pub.description}</p>
//                 </div>
//                 <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
//                   <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{pub.date}</span>
//                   <div className="flex gap-3">
//                     <a
//                       href={pub.file}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-xs px-4 py-2 rounded-lg border text-blue-600 border-blue-200 hover:bg-blue-50 transition"
//                     >
//                       View
//                     </a>
//                     <a
//                       href={pub.file}
//                       download
//                       className="text-xs px-4 py-2 rounded-lg text-white transition hover:opacity-90"
//                       style={{ backgroundColor: PRIMARY }}
//                     >
//                       Download
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ====================== BROCHURES ====================== */}
//       <section className="py-10 bg-gray-50 dark:bg-slate-900">
//         <div className="container mx-auto px-6 lg:max-w-7xl">
//           <h2 className="text-4xl font-black text-center mb-12! text-gray-900 dark:text-white">
//             Brochures & Leaflets
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {brochures.map((item, idx) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
//               >
//                 <div className="text-amber-600 mb-6">
//                   <i className="fas fa-book-open text-5xl"></i>
//                 </div>
//                 <div className="flex-1">
//                   <span className="text-xs uppercase font-bold text-gray-400">{item.type}</span>
//                   <h3 className="text-xl font-black text-gray-900 dark:text-white mt-2 mb-3">{item.title}</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">{item.description}</p>
//                 </div>
//                 <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
//                   <div></div>
//                   <div className="flex gap-3">
//                     <a
//                       href={item.file}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-xs px-4 py-2 rounded-lg border text-blue-600 border-blue-200 hover:bg-blue-50 transition"
//                     >
//                       View
//                     </a>
//                     <a
//                       href={item.file}
//                       download
//                       className="text-xs px-4 py-2 rounded-lg text-white transition hover:opacity-90"
//                       style={{ backgroundColor: PRIMARY }}
//                     >
//                       Download
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ====================== NEWSLETTERS ====================== */}
//       <section className="py-10 bg-white dark:bg-[#0f172a]">
//         <div className="container mx-auto px-6 lg:max-w-7xl">
//           <h2 className="text-4xl font-black text-center mb-12! text-gray-900 dark:text-white">
//             Newsletters
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {newsletters.map((item, idx) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
//               >
//                 <div className="text-emerald-600 mb-6">
//                   <i className="fas fa-newspaper text-5xl"></i>
//                 </div>
//                 <div className="flex-1">
//                   <span className="text-xs uppercase font-bold text-gray-400">{item.type}</span>
//                   <h3 className="text-xl font-black text-gray-900 dark:text-white mt-2 mb-3">{item.title}</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">{item.description}</p>
//                 </div>
//                 <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
//                   <div></div>
//                   <div className="flex gap-3">
//                     <a
//                       href={item.file}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-xs px-4 py-2 rounded-lg border text-blue-600 border-blue-200 hover:bg-blue-50 transition"
//                     >
//                       View
//                     </a>
//                     <a
//                       href={item.file}
//                       download
//                       className="text-xs px-4 py-2 rounded-lg text-white transition hover:opacity-90"
//                       style={{ backgroundColor: PRIMARY }}
//                     >
//                       Download
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ====================== OTHERS ====================== */}
//       <section className="py-10 bg-white dark:bg-[#0f172a]">
//         <div className="container mx-auto px-6 lg:max-w-7xl">
//           <h2 className="text-4xl font-black text-center mb-12! text-gray-900 dark:text-white">
//             Others
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {Others.map((item, idx) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
//               >
//                 <div className="text-purple-600 mb-6">
//                   <i className="fas fa-file-alt text-5xl"></i>
//                 </div>
//                 <div className="flex-1">
//                   <span className="text-xs uppercase font-bold text-gray-400">{item.type}</span>
//                   <h3 className="text-xl font-black text-gray-900 dark:text-white mt-2 mb-3">{item.title}</h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">{item.description}</p>
//                 </div>
//                 <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
//                   <div></div>
//                   <div className="flex gap-3">
//                     <a
//                       href={item.file}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-xs px-4 py-2 rounded-lg border text-blue-600 border-blue-200 hover:bg-blue-50 transition"
//                     >
//                       View
//                     </a>
//                     <a
//                       href={item.file}
//                       download
//                       className="text-xs px-4 py-2 rounded-lg text-white transition hover:opacity-90"
//                       style={{ backgroundColor: PRIMARY }}
//                     >
//                       Download
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </DanboxLayout>
//   );
// };

// export default PublicationsPage;