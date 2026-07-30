import PageBanner from "@/components/PageBanner";
import DanboxLayout from "@/layout/DanboxLayout";
import Link from "next/link";

const CausesPage = () => {
  return (
    <DanboxLayout header={1}>
      <PageBanner pageName="Events Details" />
      <section className="event-details-section py-24! lg:py-32! bg-white dark:bg-[#0f172a]! fix section-padding">
        <div className="container">
          <div className="event-details-wrapper">
            <div className="row g-5">
              <div className="col-12 col-lg-12">
                <div className="event-fetaured-thumb">
                  <img
                    src="assets/img/event/event-details.webp"
                    alt="Sagarika Samaj Unnayan Sangastha"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
              <div className="col-12 col-lg-7 col-xl-8">
                <div className="event-details-contents dark:text-white/80!">
                  <p>
                    Sagarika Samaj Unnayan Sangastha (SSUS) is a prominent non-governmental organization dedicated to the development of coastal regions in Noakhali, Laxmipur, and Feni districts of Bangladesh. Founded in 1985 by Md. Fazlul Hoque (Hoque Saheb), SSUS works to alleviate poverty, enhance disaster resilience, and empower marginalized communities through sustainable livelihood programs, microfinance, education, and climate adaptation initiatives.
                  </p>
                  <p>
                    With over 25 years of dedicated service, SSUS focuses on the socio-economic upliftment of poor and extreme poor households. The organization implements various projects including Sustainable Enterprise Development, Integrated Agriculture, Elderly People Programme, and the Recovery and Advancement of Informal Sector Employment (RAISE) Project. SSUS emphasizes women empowerment, education for underprivileged children, and disaster risk reduction in the vulnerable coastal belt.
                  </p>
                  <blockquote className="wp-block-quote dark:text-white/80!">
                    <h3 className="dark:text-white!">
                      To enhance the livelihoods of the poor and vulnerable community people with a significant way and animate them towards the sustainable development.
                    </h3>
                    <span className="dark:text-gray-300">
                      Md. Saiful Islam <span>- Executive Director, SSUS</span>
                    </span>
                  </blockquote>
                  <p>
                    SSUS has strong partnerships with organizations like PKSF, Oxfam, BRAC, and various government bodies. Key initiatives include microfinance for income generation, non-formal primary education, WASH (Water, Sanitation, and Hygiene) programs, and support for elderly people. The organization is registered with the Department of Social Welfare, NGO Affairs Bureau, and Microcredit Regulatory Authority, ensuring transparency and accountability in all its development activities.
                  </p>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <img
                        src="assets/img/event/eventd1.webp"
                        alt="Sagarika Activities"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <img
                        src="assets/img/event/eventd2.webp"
                        alt="Community Development"
                        className="img-fluid w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5 col-xl-4">
                <div className="event-details-sidebar">
                  {/* Event Details Card */}
                  <div
                    className="single-event-sidebar wow fadeInUp dark:bg-gray-800! dark:border-gray-700!"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                  >
                    <div className="sidebar-title">
                      <h3 className="dark:text-white!">Event / Organization Details</h3>
                    </div>
                    <div className="event-address-info">
                      <div className="single-address-info">
                        <div className="icon icon1">
                          <i className="fal fa-map-marker-alt" />
                        </div>
                        <div className="address">
                          <p className="dark:text-gray-300!">
                            Vill+Po: Charbata, Upazilla: Subarnachar, Dist: Noakhali, Bangladesh
                          </p>
                        </div>
                      </div>
                      <div className="single-address-info">
                        <div className="icon icon2">
                          <i className="fal fa-envelope" />
                        </div>
                        <div className="address">
                          <p className="dark:text-gray-300!">matin_ssus@yahoo.com</p>
                        </div>
                      </div>
                      <div className="single-address-info">
                        <div className="icon icon3">
                          <i className="fal fa-phone" />
                        </div>
                        <div className="address">
                          <p className="dark:text-gray-300!">
                            +880-1865-041206
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/event-details"
                        className="theme-btn transparent-btn-2"
                      >
                        Support Our Mission
                      </Link>
                    </div>
                  </div>

                  {/* Special Guest / Key Persons Card */}
                  <div className="single-event-sidebar wow fadeInUp dark:bg-gray-800! dark:border-gray-700!">
                    <div className="sidebar-title">
                      <h3 className="dark:text-white!">Key Persons</h3>
                    </div>
                    <div className="special-guest-list">
                      <div className="single-guest-info">
                        <div
                          className="profile-img"
                          style={{
                            backgroundImage:
                              'url("assets/img/event/guest1.webp")',
                          }}
                        />
                        <div className="guest-bio">
                          <h5 className="dark:text-white!">Md. Fazlul Hoque (Hoque Saheb)</h5>
                          <span className="dark:text-gray-400!">Founder</span>
                        </div>
                      </div>
                      <div className="single-guest-info">
                        <div
                          className="profile-img"
                          style={{
                            backgroundImage:
                              'url("assets/img/event/guest2.webp")',
                          }}
                        />
                        <div className="guest-bio">
                          <h5 className="dark:text-white!">Md. Saiful Islam</h5>
                          <span className="dark:text-gray-400!">Executive Director</span>
                        </div>
                      </div>
                      <div className="single-guest-info">
                        <div
                          className="profile-img"
                          style={{
                            backgroundImage:
                              'url("assets/img/event/guest3.webp")',
                          }}
                        />
                        <div className="guest-bio">
                          <h5 className="dark:text-white!">Md. Ruhul Matin</h5>
                          <span className="dark:text-gray-400!">Ex Executive Director</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div
                    className="event-map-wrap wow fadeInUp"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd"
                      className="w-100 border-0"
                      allowFullScreen={true}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DanboxLayout>
  );
};

export default CausesPage;




// import PageBanner from "@/components/PageBanner";
// import DanboxLayout from "@/layout/DanboxLayout";
// import Link from "next/link";

// const CausesPage = () => {
//   return (
//     <DanboxLayout header={1}>
//       <PageBanner pageName="Events Details" />
//       <section className="event-details-section py-24! lg:py-32! bg-white dark:bg-[#0f172a]! fix section-padding">
//         <div className="container">
//           <div className="event-details-wrapper">
//             <div className="row g-5">
//               <div className="col-12 col-lg-12">
//                 <div className="event-fetaured-thumb">
//                   <img
//                     src="assets/img/event/event-details.webp"
//                     alt="event details"
//                     className="img-fluid w-100"
//                   />
//                 </div>
//               </div>
//               <div className="col-12 col-lg-7 col-xl-8">
//                 <div className="event-details-contents dark:text-white/80!">
//                   <p>
//                     This website is part of Mitsubishi Power's continuous
//                     efforts to improve communications with existing and
//                     potential customers and other interested parties globally.
//                     Aligned with that business purpose and for most effective
//                     utilization.
//                   </p>
//                   <p>
//                     The language, at its very core, emphasised extensively on
//                     code readability. With its concise and expressive syntax, it
//                     allowed developers to express ideas and concepts without
//                     writing tons of lines code (as would be the case in
//                     lower-level languages like C or Java). Its simplicity a
//                     given, Python seamlessly integrates with other programming
//                     languages (like offloading CPU-intensive tasks to C/C++),
//                     making it an added bonus to polyglot developers.
//                   </p>
//                   <blockquote className="wp-block-quote dark:text-white/80!">
//                     <h3 className="dark:text-white!">
//                       One of the main driving points behind Python's meteoric
//                       growth.
//                     </h3>
//                     <span className="dark:text-gray-300">
//                       Miranda H. <span>-Founder</span>
//                     </span>
//                   </blockquote>
//                   <p>
//                     Among the major reasons why Python is “slow”, it really
//                     boils down to 2 — Python is interpreted as opposed to
//                     compiled, ultimately leading to slower execution times; and
//                     the fact that it is dynamically typed (data types of
//                     variables are automatically inferred by Python during
//                     execution). Take, for example, TensorFlow, a Machine
//                     Learning library available in Python. These libraries were
//                     actually written in C++ and made available in Python, sort
//                     of forming a Python “wrapper” around the C++ implementation.
//                     The same goes for Numpy and, to an extent, even Caer. One of
//                     the major reasons for Python's slowness is the presence of
//                     GIL (Global Interpreter Lock) which allows only one thread
//                     to execute at a time. While this boosts the performance of
//                     single threading, it places a limitation on parallelism
//                     where developers have to implement multiprocessing programs
//                     as opposed to multi-threaded ones, to improve speeds.
//                   </p>
//                   <div className="row">
//                     <div className="col-md-6 col-12">
//                       <img
//                         src="assets/img/event/eventd1.webp"
//                         alt="img"
//                         className="img-fluid w-100"
//                       />
//                     </div>
//                     <div className="col-md-6 col-12">
//                       <img
//                         src="assets/img/event/eventd2.webp"
//                         alt="img"
//                         className="img-fluid w-100"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-12 col-lg-5 col-xl-4">
//                 <div className="event-details-sidebar">
//                   {/* Event Details Card – added dark mode background & text */}
//                   <div
//                     className="single-event-sidebar wow fadeInUp dark:bg-gray-800! dark:border-gray-700!"
//                     style={{ visibility: "visible", animationName: "fadeInUp" }}
//                   >
//                     <div className="sidebar-title">
//                       <h3 className="dark:text-white!">Event Details</h3>
//                     </div>
//                     <div className="event-address-info">
//                       <div className="single-address-info">
//                         <div className="icon icon1">
//                           <i className="fal fa-map-marker-alt" />
//                         </div>
//                         <div className="address">
//                           <p className="dark:text-gray-300!">
//                             12/A, Miranda Halim City Town Hall, NYC
//                           </p>
//                         </div>
//                       </div>
//                       <div className="single-address-info">
//                         <div className="icon icon2">
//                           <i className="fal fa-envelope" />
//                         </div>
//                         <div className="address">
//                           <p className="dark:text-gray-300!">info@webmail.com</p>
//                         </div>
//                       </div>
//                       <div className="single-address-info">
//                         <div className="icon icon3">
//                           <i className="fal fa-phone" />
//                         </div>
//                         <div className="address">
//                           <p className="dark:text-gray-300!">
//                             908-098-098-09
//                           </p>
//                         </div>
//                       </div>
//                       <Link
//                         href="/event-details"
//                         className="theme-btn transparent-btn-2"
//                       >
//                         Book Your Seat
//                       </Link>
//                     </div>
//                   </div>

//                   {/* Special Guest Card – added dark mode background & text */}
//                   <div className="single-event-sidebar wow fadeInUp dark:bg-gray-800! dark:border-gray-700!">
//                     <div className="sidebar-title">
//                       <h3 className="dark:text-white!">Special Guest</h3>
//                     </div>
//                     <div className="special-guest-list">
//                       <div className="single-guest-info">
//                         <div
//                           className="profile-img"
//                           style={{
//                             backgroundImage:
//                               'url("assets/img/event/guest1.webp")',
//                           }}
//                         />
//                         <div className="guest-bio">
//                           <h5 className="dark:text-white!">Kinlon K. Karlo</h5>
//                           <span className="dark:text-gray-400!">Speaker</span>
//                         </div>
//                       </div>
//                       <div className="single-guest-info">
//                         <div
//                           className="profile-img"
//                           style={{
//                             backgroundImage:
//                               'url("assets/img/event/guest2.webp")',
//                           }}
//                         />
//                         <div className="guest-bio">
//                           <h5 className="dark:text-white!">Salman Khan</h5>
//                           <span className="dark:text-gray-400!">Actor</span>
//                         </div>
//                       </div>
//                       <div className="single-guest-info">
//                         <div
//                           className="profile-img"
//                           style={{
//                             backgroundImage:
//                               'url("assets/img/event/guest3.webp")',
//                           }}
//                         />
//                         <div className="guest-bio">
//                           <h5 className="dark:text-white!">Joy Roy</h5>
//                           <span className="dark:text-gray-400!">Speaker</span>
//                         </div>
//                       </div>
//                       <div className="single-guest-info">
//                         <div
//                           className="profile-img"
//                           style={{
//                             backgroundImage:
//                               'url("assets/img/event/guest4.webp")',
//                           }}
//                         />
//                         <div className="guest-bio">
//                           <h5 className="dark:text-white!">Ismail IRF</h5>
//                           <span className="dark:text-gray-400!">Actor</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Map – made iframe responsive */}
//                   <div
//                     className="event-map-wrap wow fadeInUp"
//                     style={{ visibility: "visible", animationName: "fadeInUp" }}
//                   >
//                     <iframe
//                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd"
//                       className="w-100 border-0"
//                       allowFullScreen={true}
//                       loading="lazy"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </DanboxLayout>
//   );
// };

// export default CausesPage;