"use client";
import { useState } from "react";

const ContactPage = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();           
    e.stopPropagation();

    console.log("Form submission prevented - No reload");
    
  };

  return (
    <>
      {/* Contact Info Section */}
      <section className="contact-page-wrap section-padding">
        <div className="container">
          <div className="row g-3 sm:g-4">
            {/* Email Card */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="single-contact-card card1 group bg-white/10 backdrop-blur-2xl border border-white/10 hover:border-blue-400 rounded-3xl p-5 sm:p-7 lg:p-10 h-full transition-all duration-500 hover:scale-105 ">
                <div className="top-part">
                  <div className="icon w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl shadow-xl shadow-blue-500/40 transition-transform group-hover:rotate-12">
                    <i className="fal fa-envelope" />
                  </div>
                  <div className="title mt-4 sm:mt-6 lg:mt-8">
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold">Email Address</h4>
                    <span className="text-blue-500 text-sm sm:text-base lg:text-lg">Send mail anytime</span>
                  </div>
                </div>
                <div className="bottom-part mt-auto pt-6 sm:pt-8 lg:pt-12 flex items-center justify-between gap-2">
                  <div className="info">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium break-all">matin_ssus@yahoo.com</p>
                  </div>
                  <div className="icon w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl !bg-gray-100 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                    <i className="fal fa-arrow-right !font-extrabold text-amber-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="single-contact-card card2 group bg-white/10 backdrop-blur-2xl border border-white/10 hover:border-emerald-400 rounded-3xl p-5 sm:p-7 lg:p-10 h-full transition-all duration-500 hover:scale-105 ">
                <div className="top-part">
                  <div className="icon w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl shadow-xl shadow-emerald-500/40 transition-transform group-hover:rotate-12">
                    <i className="fal fa-phone" />
                  </div>
                  <div className="title mt-4 sm:mt-6 lg:mt-8">
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold">Phone Number</h4>
                    <span className="text-emerald-500 text-sm sm:text-base lg:text-lg">Call us anytime</span>
                  </div>
                </div>
                <div className="bottom-part mt-auto pt-6 sm:pt-8 lg:pt-12 flex items-center justify-between gap-2">
                  <div className="info">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium">+880-1865-041206</p>
                  </div>
                  <div className="icon w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl !bg-gray-100 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                    <i className="fal fa-arrow-right !font-extrabold text-amber-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="col-lg-6 col-md-6 col-12">
              <div className="single-contact-card card3 group bg-white/10 backdrop-blur-2xl border border-white/10 hover:border-amber-400 rounded-3xl p-5 sm:p-7 lg:p-10 h-full transition-all duration-500 hover:scale-105">
                <div className="top-part">
                  <div className="icon w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl shadow-xl shadow-amber-500/40 transition-transform group-hover:rotate-12">
                    <i className="fal fa-map-marker-alt" />
                  </div>
                  <div className="title mt-4 sm:mt-6 lg:mt-8">
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold">Office Address</h4>
                    <span className="text-amber-500 text-sm sm:text-base lg:text-lg">Visit us anytime</span>
                  </div>
                </div>
                <div className="bottom-part mt-auto pt-6 sm:pt-8 lg:pt-12 flex items-center justify-between gap-2">
                  <div className="info">
                    <p className="text-sm sm:text-base lg:text-lg">Vill+Po: Charbata, Upazilla: Subarnachar</p>
                    <p className="text-sm sm:text-base lg:text-lg">Dist: Noakhali, Bangladesh</p>
                  </div>
                  <div className="icon w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl !bg-gray-100 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                    <i className="fal fa-arrow-right !font-extrabold text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map - unchanged */}
          <div className="office-google-map-wrapper mt-8 sm:mt-10 lg:mt-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2730351753885!2d91.12138147507969!3d22.635921679446685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754aca395e4d413%3A0x7b083d44b1b07e44!2sSagarika%20Samaj%20Unnayan%20Sangstha!5e1!3m2!1sen!2sbd!4v1772615134106!5m2!1sen!2sbd"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section-2 section-padding pt-0">
        <div className="container">
          <div className="main-contact-form-items">
            <div className="section-title text-center">
              <span className="sub-title color-2 inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-50 rounded-full text-sm sm:text-base">
                <i className="fal fa-pen" /> Write Here
              </span>
              <h2 className="mt-char-animation text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 sm:mt-5">Get In Touch</h2>
            </div>

            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="mt-3 sm:mt-4"
              noValidate
            >
              <div className="row g-3 sm:g-4">
                <div className="col-lg-6">
                  <div className="form-clt">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name*"
                      required
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-7 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-clt">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email*"
                      required
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-7 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-clt">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone*"
                      required
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-7 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-clt">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject*"
                      required
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 lg:px-7 rounded-xl sm:rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-clt">
                    <textarea
                      name="message"
                      placeholder="Write Message*"
                      required
                      className="w-full px-4 py-4 sm:px-6 sm:py-5 lg:px-7 rounded-2xl sm:rounded-3xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 bg-white outline-none transition-all h-32 sm:h-36 lg:h-40 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="col-lg-12 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="theme-btn px-6 py-3 sm:px-8 sm:py-4 lg:px-10 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Your Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;