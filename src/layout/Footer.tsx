"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('/assets/img/footerbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-[#0f172a]/85"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{
              staggerChildren: 0.15,
              delayChildren: 0.2,
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"
          >
            {/* Column 1: Brand & Social */}
            <motion.div
              variants={fadeUpVariants}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-4 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              >
                <Link href="/" className="inline-block">
                  <Image
                    src="/assets/img/logo/Sagorika.webp"
                    width={160}
                    height={50}
                    alt="Sagarika Logo"
                  />
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-gray-300 text-sm leading-relaxed! max-w-xs"
              >
                Working for sustainable development, education, and poverty alleviation in coastal communities of Bangladesh.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                className="flex gap-3 pt-2!"
              >
                {["facebook-f", "twitter", "instagram", "linkedin-in"].map(
                  (icon, i) => (
                    <motion.div
                      key={icon}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.8 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f86048]! transition-all duration-300"
                      >
                        <i className={`fab fa-${icon} text-white text-sm`} />
                      </Link>
                    </motion.div>
                  ),
                )}
              </motion.div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div
              variants={fadeLeftVariants}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-2 md:col-span-1"
            >
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="text-base font-semibold mb-6! uppercase tracking-wider! text-white!"
              >
                Quick Links
              </motion.h4>
              <ul className="space-y-3">
                {usefulLinks.map((item, i) => (
                  <motion.li
                    key={item.text}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={item.link}
                      className="text-gray-300! hover:text-[#f86048]! transition-colors duration-300 text-sm inline-block"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {item.text}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Legal */}
            <motion.div
              variants={fadeLeftVariants}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-2 md:col-span-1"
            >
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="text-base font-semibold mb-6! uppercase tracking-wider! text-white!"
              >
                Legal
              </motion.h4>
              <ul className="space-y-3">
                {["Terms of Use", "Privacy Policy"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + i * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href="#"
                      className="text-gray-300! hover:text-[#f86048]! transition-colors duration-300 text-sm inline-block"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {item}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Head Office */}
            <motion.div
              variants={fadeRightVariants}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="lg:col-span-4 md:col-span-2"
            >
              <motion.h4
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                className="text-base font-semibold mb-6! uppercase tracking-wider text-white"
              >
                Head Office
              </motion.h4>
              <div className="space-y-5">
                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(248, 96, 72, 0.3)" }}
                    transition={{ duration: 0.3 }}
                    className="w-9 h-9 rounded-lg bg-[#f86048]/15 flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <i className="fal fa-map-marker-alt text-[#f86048] text-sm" />
                  </motion.div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Vill+Po : Charbata, Upazilla: Subarnachar.
                    <br />
                    Dist: Noakhali, Bangladesh.
                  </p>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.85, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(248, 96, 72, 0.3)" }}
                    transition={{ duration: 0.3 }}
                    className="w-9 h-9 rounded-lg bg-[#f86048]/15 flex items-center justify-center shrink-0"
                  >
                    <i className="fal fa-phone-alt text-[#f86048]! text-sm" />
                  </motion.div>
                  <a
                    href="tel:+8801865041206"
                    className="text-gray-300! hover:text-[#f86048]! transition-colors duration-300 text-sm font-medium"
                  >
                    +880-1865-041206
                  </a>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(248, 96, 72, 0.3)" }}
                    transition={{ duration: 0.3 }}
                    className="w-9 h-9 rounded-lg bg-[#f86048]/15 flex items-center justify-center shrink-0"
                  >
                    <i className="fal fa-envelope text-[#f86048] text-sm" />
                  </motion.div>
                  <a
                    href="mailto:matin_ssus@yahoo.com"
                    className="text-gray-300! hover:text-[#f86048]! transition-colors duration-300 text-sm font-medium"
                  >
                    matin_ssus@yahoo.com
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Copyright Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.4, ease: "easeOut" }}
                className="text-gray-400 text-center md:text-left"
              >
                © {new Date().getFullYear()}{" "}
                <span className="text-white font-medium">
                  Sagarika Samaj Unnayan Sangastha
                </span>
                . All Rights Reserved.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
                className="text-gray-400"
              >
                Developed By:{" "}
                <Link
                  href="https://flyinfosoftbd.com/"
                  className="text-white hover:text-[#f86048] transition-colors duration-300 font-medium"
                >
                  Flyinfosoft Technologies Limited
                </Link>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const usefulLinks = [
  { link: "/about", text: "About Us" },
  { link: "#", text: "Our Causes" },
  { link: "#", text: "Upcoming Events" },
  { link: "#", text: "Latest News" },
];

export default Footer;



// import Image from "next/image";
// import Link from "next/link";

// const Footer = () => {
//   return (
//     <footer className="bg-[#0f172a]! text-white">
//       {/* bg image given */}
//       {/* path "/assets/img/footerbg.jpg" */}
//       {/* Top Section: Branding & Newsletter/Contact CTA */}
//       <div className="max-w-7xl mx-auto pt-16! pb-12! px-6!">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
//           {/* Column 1: Brand & Initiative */}
//           <div className="lg:col-span-4 space-y-6">
//             <Link href="/" className="inline-block">
//               <Image
//                 src="/assets/img/logo/Sagorika.webp"
//                 width={160}
//                 height={50}
//                 alt="logo"
//               />
//             </Link>

//             <div className="flex gap-4">
//               {["facebook-f", "twitter", "instagram", "linkedin-in"].map(
//                 (icon) => (
//                   <Link
//                     key={icon}
//                     href="#"
//                     className="w-10 h-10 rounded-full bg-white/10! flex items-center justify-center hover:bg-[#f86048]! transition-all duration-300"
//                   >
//                     <i className={`fab fa-${icon} text-white`} />
//                   </Link>
//                 ),
//               )}
//             </div>
//           </div>

//           {/* Column 2: Useful Links */}
//           <div className="lg:col-span-2 md:col-span-4">
//             <h4 className="text-lg font-bold mb-6! uppercase tracking-wider! text-white">
//               Quick Links
//             </h4>
//             <ul className="space-y-4">
//               {usefulLinks.map((item) => (
//                 <li key={item.text}>
//                   <Link href={item.link} className="text-white">
//                     {item.text}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3: Legal */}
//           <div className="lg:col-span-2 md:col-span-4">
//             <h4 className="text-lg font-bold mb-6! uppercase tracking-wider! text-white">
//               Legal
//             </h4>
//             <ul className="space-y-4 text--300">
//               <li>
//                 <Link href="#" className="text-white">
//                   Terms of Use
//                 </Link>
//               </li>
//               <li>
//                 <Link href="#" className="text-white ">
//                   Privacy Policy
//                 </Link>
//               </li>
//               {/* <li>
//                 <Link href="#" className="text-white ">
//                   Cookie Policy
//                 </Link>
//               </li> */}
//             </ul>
//           </div>

//           {/* Column 4: Head Office & Contact */}
//           <div className="lg:col-span-4 md:col-span-4">
//             <h4 className="text-lg font-bold mb-6! uppercase tracking-wider! text-white">
//               Head Office
//             </h4>
//             <div className="space-y-5">
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
//                   <i className="fal fa-map-marker-alt text-[#f86048]" />
//                 </div>
//                 <p className="text-gray-300 leading-snug">
//                   Vill+Po : Charbata, Upazilla: Subarnachar. <br />
//                   Dist: Noakhali, Bangladesh.
//                 </p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
//                   <i className="fal fa-phone-alt text-[#f86048]" />
//                 </div>
//                 <a
//                   href="tel:+8801865041206"
//                   className="text-white font-medium hover:text-blue-400 transition-colors"
//                 >
//                   +880-1865-041206
//                 </a>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
//                   <i className="fal fa-envelope text-[#f86048]" />
//                 </div>
//                 <a
//                   href="mailto:matin_ssus@yahoo.com"
//                   className="text-white font-medium hover:text-blue-400 transition-colors"
//                 >
//                   matin_ssus@yahoo.com
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Copyright Section */}
//       <div className="border-t! border-white/10! bg-black/20!">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex flex-col md:row md:flex-row justify-between items-center gap-4 text-sm">
//             <p className="text-gray-400 text-center md:text-left">
//               © {new Date().getFullYear()}{" "}
//               <span className="text-white font-semibold">
//                 Sagarika Samaj Unnayan Sangastha
//               </span>
//               . All Rights Reserved.
//             </p>
//             <p className="text-gray-400">
//               Developed By :
//               <Link
//                 href="#"
//                 className="text-white hover:text-blue-400 ml-1 font-medium transition-colors"
//               >
//                 Flyinfosoft Techologies Limited
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// const usefulLinks = [
//   { link: "/about", text: "About Us" },
//   { link: "#", text: "Our Causes" },
//   { link: "#", text: "Upcoming Events" },
//   { link: "#", text: "Latest News" },
// ];

// export default Footer;
