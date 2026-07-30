'use client'

import Image from "next/image";
import Link from "next/link";
import Counter from "./Counter";
import { motion } from "framer-motion";

const PRIMARY = "#f86048";

export const About1 = () => {
  return (
    <>
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
                    মরহুম মোঃ ফজলুল হক (হক সাহেব) জন্ম-০২ জানুয়ারি ১৯৩২ইং, মৃত্যু-৮ নভেম্বর ১৯৯৫ইং
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="prose! prose-lg! text-gray-600! dark:text-gray-400! leading-relaxed! space-y-6!"
                >
                  <p>
                    বিশিষ্ট সমাজসেবক মানবদরদী মরহুম মোঃ ফজলুল হক (হক সাহেব) দারিদ্র পীড়িত ও প্রাকৃতিক দুর্যোগে ভ্রান্তিগ্রস্থ অসহায় মানুষের সহায়তা প্রদানের উদ্দেশ্যে ১৯৮৫ সালে সাগরিকা সমাজ উন্নয়ন সংস্থা প্রতিষ্ঠা করেন।
                  </p>
                  <p>
                    তিনি ১৯৭০ সনে সংঘটিত প্রলয়ংকরী ঘূর্ণীঝড় ও জলোচ্ছ্বাসে অসংখ্য মৃতের দাফন ও সৎকার করেছেন এবং এলাকার মানুষকে সংগঠিত করে খাদ্য, বস্ত্র ও আশ্রয়হীন মানুষকে নিঃস্বার্থভাবে সহায়তা প্রদান করেছেন।
                  </p>
                  <p>
                    তিনি দীর্ঘ ১৫ বছর যাবৎ বাংলাদেশ রেডক্রিসেন্ট সোসাইটির দুর্যোগ ঘূর্ণীঝড় কর্মসূচীর (সিপিপি) তৎকালীন নোয়াখালী সদর থানা টিম লীডার হিসেবে দক্ষতার সাথে দায়িত্ব পালন করেন। সিপিপি'র গ্রাম ও ইউনিয়ন ভিত্তিক স্বেচ্ছাসেবক ইউনিট গঠন ও সফলভাবে পরিচালনা করেছেন।
                  </p>
                  <p>
                    তিনি সিপিপি স্বেচ্ছাসেবক সদস্যদের খুবই প্রিয়ভাজন ও সর্বজন শ্রদ্ধেয় ছিলেন। তিনি চরবাটা খাসের হাট হাই স্কুল পরিচালনা কমিটি, খাসের হাট জামে মসজিদ পরিচালনা কমিটি ও খাসের হাট বাজার কমিটির সভাপতি, সৈকত ডিগ্রি কলেজের প্রতিষ্ঠাতা সদস্য, চরবাটা বালিকা উচ্চ বিদ্যালয় প্রতিষ্ঠায় সহযোগিতাসহ সামাজিক বিভিন্ন কর্মকান্ডের সাথে সম্পৃক্ত থেকে প্রতিষ্ঠান সমূহ ও এলাকার উন্নয়নে অগ্রণী ভূমিকা পালন করেছেন।
                  </p>
                  <p>
                    তিনি আমাদের স্বাধীনতা সংগ্রাম ও ১৯৭১ সনে মহান মুক্তিযুদ্ধে একজন অন্যতম সংগঠক হিসেবে এলাকা মুক্তিযোদ্ধা ইউনিট ও মুক্তিকামী জনগণকে সংগঠিতকরণের ক্ষেত্রে গুরুত্বপূর্ণ অবদান রাখেন।
                  </p>
                  <p>
                    হক সাহেব তাঁর সমমনা কিছু সঙ্গী ও কর্মরত স্বেচ্ছাসেবী কর্মীবৃন্দদের নিয়ে সাগরিকা সমাজ উন্নয়ন সংস্থা প্রতিষ্ঠার প্রারম্ভিক সময় থেকে তাঁর বলিষ্ঠ নেতৃত্বে সংস্থাটিকে একটি কার্যকর ও উন্নয়নমুখী সংগঠনে পরিণত করার প্রচেষ্টায় নিয়োজিত ছিলেন। ৮ নভেম্বর, ১৯৯৫ খ্রিঃ তারিখে দিবাগত রাত্রে সংস্থার প্রতিষ্ঠাতা জনাব মরহুম মোঃ ফজলুল হক (হক সাহেব) মৃত্যুবরণ করেন।
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border-l-4 pl-8"
                  style={{ borderColor: PRIMARY }}
                >
                  <h3 className="text-2xl! font-bold! mb-4! dark:text-white!">উত্তরাধিকার</h3>
                  <p className="text-gray-600! dark:text-gray-300! leading-relaxed! mb-6!">
                    আজও তাঁর প্রতিষ্ঠিত সংস্থা হাজারো পরিবারের জীবনমান উন্নয়নে কাজ করে যাচ্ছে। তাঁর স্বপ্ন ও আদর্শ আজও আমাদের অনুপ্রেরণা।
                  </p>
                  <Link
                    href="/project"
                    className="inline-flex items-center font-bold gap-2 transition-all hover:gap-4"
                    style={{ color: PRIMARY }}
                  >
                    তাঁর কাজ কীভাবে এগিয়ে নিয়ে যাচ্ছি দেখুন
                    <span>→</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>


    {/* <section className="about-section-3 fix section-padding">
      <div className="container">
        <div className="about-wrapper-3">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="about-image-items-2">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-7 wow fadeInUp" data-wow-delay=".3s">
                    <div className="about-image">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "100%" }}
                        src="/assets/img/about/08.webp"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="col-lg-5 wow fadeInUp" data-wow-delay=".5s">
                    <div className="about-experience">
                      <h2>
                        <span className="count">25</span>+
                      </h2>
                      <h6>Years Of Experience</h6>
                      <div className="thumb">
                        <Image
                          width={135}
                          height={55}
                          sizes="100vw"
                          src="/assets/img/client.png"
                          alt="img"
                        />
                      </div>
                      <h6>Globally Clients</h6>
                    </div>
                    <div className="about-img">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        src="/assets/img/about/09.webp"
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title">
                  <span className="sub-title color-2 wow fadeInUp">
                    <i className="far fa-heart" />
                    About Us
                  </span>
                  <h2 className="mt-char-animation">
                    We've Funded{" "}
                    <span className="count">
                      <Counter end={44} />
                    </span>
                    <span>k</span> Dollars Over
                  </h2>
                </div>
                <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                  There are only a few times in each of our lives that we get to
                  witness a truly historic global ccomplishment: Ending
                  smallpox, tearing.Your $40.00 monthly donation can give 12
                  people.
                </p>
                <div className="d-flex align-items-center flex-wrap mb-5">
                  <ul
                    className="checked-list wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <li>
                      <i className="far fa-check" /> A place in history
                    </li>
                    <li>
                      <i className="far fa-check" />
                      It’s about impact, goodness
                    </li>
                  </ul>
                  <ul
                    className="checked-list wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <li>
                      <i className="far fa-check" /> A place in history
                    </li>
                    <li>
                      <i className="far fa-check" />
                      It’s about impact, goodness
                    </li>
                  </ul>
                </div>
                <Link
                  href="causes"
                  className="theme-btn wow fadeInUp"
                  data-wow-delay=".7s"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> */}
    </>
  );
};

export const About2 = ({ containerClass }: { containerClass?: string }) => {
  const aboutImages: {
    img: string;
    delay: string;
  }[] = [
    {
      img: "/assets/img/about/05.webp",
      delay: ".3s",
    },
    {
      img: "/assets/img/about/06.webp",
      delay: ".5s",
    },
    {
      img: "/assets/img/about/07.webp",
      delay: ".7s",
    },
  ];
  return (
    <section className={`about-section-2 fix ${containerClass}`}>
      <div className="container">
        <div className="org-logo-wrap text-center">
          <div className="org-logo wow fadeInUp" data-wow-delay=".3s">
            <Image
              width={99}
              height={108}
              sizes="100vw"
              style={{ width: "auto", height: "auto" }}
              src="/assets/img/about-logo.png"
              alt="img"
            />
          </div>
        </div>
        <div className="section-title text-center">
          <span className="sub-title color-2 wow fadeInUp">
            <i className="far fa-heart" />
            Life Changing Video
          </span>
          <h2 className="mt-char-animation">
            Access to clean water <span className="color-2">changed the</span>{" "}
            <br />
            <span>lives</span> of Hadjara, Umu, Natalia
          </h2>
        </div>
        <div className="row">
          {aboutImages.map((item, index) => (
            <div
              key={index}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={item.delay}
            >
              <div className="about-image-items">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  src={item.img}
                  alt="img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const About3 = () => {
  return (
    <section className="about-section section-padding pt-0">
      <div className="container">
        <div className="about-wrapper">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="about-image-items">
                <div
                  className="about-image-1 wow fadeInUp"
                  data-wow-delay=".3s"
                >
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    src="/assets/img/about/01.webp"
                    alt="img"
                  />
                  <div
                    className="about-image-2 wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      src="/assets/img/about/02.webp"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="counter-box wow fadeInUp" data-wow-delay=".6s">
                  <h2>
                    <span className="count">
                      <Counter end={32} />
                    </span>
                    +
                  </h2>
                  <p>Years Of Experience</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title">
                  <span className="sub-title color-2 wow fadeInUp">
                    <i className="far fa-heart" />
                    About Us
                  </span>
                  <h2 className="mt-char-animation">
                    We’ve Funded{" "}
                    <span className="count">
                      <Counter end={44} />
                    </span>
                    <span>k </span>
                    Dollars Over
                  </h2>
                </div>
                <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                  Your $40.00 monthly donation can give 12 people clean water
                  every <br /> year. 100% funds water projects.
                </p>
                <ul className="checked-list wow fadeInUp" data-wow-delay=".3s">
                  <li>A place in history</li>
                  <li>It’s about impact, goodness</li>
                  <li>More goodness in the world</li>
                  <li>
                    The world we live in right now
                    <br />
                    can be hard
                  </li>
                </ul>
                <div className="about-button wow fadeInUp" data-wow-delay=".5s">
                  <Link href="about" className="theme-btn transparent-btn-2">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const About4 = () => {
  return (
    <section className="about-section section-padding pt-0">
      <div className="container">
        <div className="about-wrapper-2">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="about-image-items">
                <div className="video-box">
                  <a
                    href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I"
                    className="video-buttton ripple video-popup"
                  >
                    <i className="fas fa-play" />
                  </a>
                </div>
                <div className="row g-4 align-items-center">
                  <div
                    className="col-lg-6 col-md-6 wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <div className="about-image-1">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        src="/assets/img/about/03.webp"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div
                    className="col-lg-6 col-md-6 wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <div className="about-image-2">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        src="/assets/img/about/04.webp"
                        alt="img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title">
                  <span className="sub-title color-2 wow fadeInUp">
                    <i className="far fa-heart" />
                    About Us
                  </span>
                  <h2 className="mt-char-animation">
                    We’ve Funded{" "}
                    <span className="count">
                      <Counter end={44} />
                    </span>
                    <span>k </span>
                    Dollars Over
                  </h2>
                </div>
                <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                  Your $40.00 monthly donation can give 12 people clean water
                  every <br /> year. 100% funds water projects.
                </p>
                <div className="list-area">
                  <div className="list-items">
                    <i className="fas fa-check" />
                    <div className="content">
                      <h5>Quick Fundraising</h5>
                      <p>Charity Navigator's Giving you support multiple</p>
                    </div>
                  </div>
                  <div className="list-items">
                    <i className="fas fa-check" />
                    <div className="content">
                      <h5>Join Our Team</h5>
                      <p>Charity Navigator's Giving you support multiple</p>
                    </div>
                  </div>
                </div>
                <div className="about-button wow fadeInUp" data-wow-delay=".5s">
                  <Link href="/about" className="theme-btn transparent-btn-2">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
