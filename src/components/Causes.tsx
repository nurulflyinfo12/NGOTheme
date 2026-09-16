"use client";
import { sliderProps } from "@/utility/sliderProps";
// import Image from "next/image";
// // import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { useKeyInitiatives } from "@/hooks/useKeyInitiatives";
import { api } from "@/utility/api";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const PRIMARY = "#f86048";

export const Causes1 = () => {
  const { initiatives, loading, fetchInitiatives } = useKeyInitiatives();

  useEffect(() => {
    fetchInitiatives();
  }, [fetchInitiatives]);

  /* ---------------- Helpers ---------------- */
  const cleanAndDecodeHtml = (htmlString: string) => {
    if (!htmlString) return "";

    if (typeof window !== "undefined") {
      const doc = new DOMParser().parseFromString(htmlString, "text/html");
      return doc.body.textContent || doc.body.innerText || "";
    }

    return htmlString
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .trim();
  };

  /* ---------------- Animation Variants ---------------- */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="relative py-16! sm:py-20! lg:py-24! bg-slate-50 dark:bg-[#0f172a]! overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[320px]! sm:w-[420px]! md:w-[520px]! h-[320px]! sm:h-[420px]! md:h-[520px]! bg-[#f86048]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[280px]! sm:w-[360px]! h-[280px]! sm:h-[360px]! bg-slate-200/40 dark:bg-slate-800/30! rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container relative mx-auto px-4! sm:px-6! lg:max-w-7xl">
        {/* ---------------- Section Header ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-2xl mx-auto mb-12! sm:mb-16! lg:mb-20!"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span
              className="h-[2px] w-8! sm:w-10! rounded-full"
              style={{ backgroundColor: PRIMARY }}
            />
            <span
              className="text-[10px]! sm:text-[11px]! font-black! uppercase! tracking-[0.28em]!"
              style={{ color: PRIMARY }}
            >
              Help The People
            </span>
            <span
              className="h-[2px] w-8! sm:w-10! rounded-full"
              style={{ backgroundColor: PRIMARY }}
            />
          </motion.div>

          <h2 className="text-3xl! sm:text-4xl! md:text-5xl! lg:text-6xl! font-black! text-slate-900! dark:text-white! leading-[0.95]! tracking-tight!">
            Our Key Initiatives
            <span style={{ color: PRIMARY }}>.</span>
          </h2>

          <p className="mt-4! sm:mt-5! text-sm! sm:text-base! text-slate-500! dark:text-slate-400! leading-relaxed max-w-xl mx-auto">
            Strategic programs designed to create lasting change across coastal
            communities.
          </p>
        </motion.div>
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6! sm:gap-8!">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-slate-800/60! rounded-3xl! p-5! sm:p-6! border border-slate-200/80 dark:border-slate-800! animate-pulse"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4! sm:gap-6!">
                  <div className="w-full sm:w-2/5 h-44! sm:h-40! bg-slate-200 dark:bg-slate-700! rounded-2xl! shrink-0" />
                  <div className="flex-1 w-full space-y-3">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700! rounded-lg w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700! rounded w-full" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-700! rounded w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6! sm:gap-7! lg:gap-8!"
          >
            <AnimatePresence mode="popLayout">
              {initiatives
                ?.filter((item) => item.IsActive)
                .map((item, i) => {
                  const imageSrc = item.Photo
                    ? api.getFileUrl(item.Photo)
                    : "/assets/img/factbg.webp";

                  const cleanDescription = cleanAndDecodeHtml(item.Details);

                  return (
                    <motion.article
                      key={item.InitiativeID || i}
                      variants={cardVariants}
                      layout
                      whileHover={{
                        y: -6,
                        transition: {
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }}
                      className="
                        group relative
                        bg-white dark:bg-slate-900/80!
                        rounded-3xl!
                        border border-slate-200/80 dark:border-slate-800!
                        hover:border-[#f86048]/40!
                        overflow-hidden
                        transition-all duration-500
                        hover:shadow-2xl hover:shadow-[#f86048]/10
                        dark:hover:shadow-none!
                        flex flex-col
                      "
                    >
                      <div
                        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                        style={{
                          background: `linear-gradient(90deg, ${PRIMARY}, #ff9a80, ${PRIMARY})`,
                        }}
                      />

                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-10" />

                      <div className="flex flex-col sm:flex-row items-stretch gap-0 sm:gap-0 flex-1">
                        <div className="relative w-full sm:w-2/5 shrink-0 overflow-hidden bg-slate-900 dark:bg-slate-950!">
                          <div className="relative w-full aspect-video sm:aspect-auto sm:h-full sm:min-h-[220px]">
                            <Image
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 30vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              src={imageSrc}
                              alt={item.Title || "Key Initiative"}
                              unoptimized
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-slate-950/0 sm:to-slate-950/40" />

                            <div className="absolute top-4! left-4! z-10">
                              <span
                                className="
                                  inline-flex items-center justify-center
                                  w-9! h-9! sm:w-10! sm:h-10!
                                  rounded-xl!
                                  text-sm! sm:text-base!
                                  font-black!
                                  text-white!
                                  shadow-lg
                                  backdrop-blur-md
                                  border border-white/20!
                                "
                                style={{ backgroundColor: PRIMARY }}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between p-5! sm:p-6! lg:p-7!">
                          <div>
                            <h3 className="text-lg! sm:text-xl! lg:text-2xl! font-black! text-slate-900! dark:text-white! leading-snug! mb-3! group-hover:text-[#f86048] transition-colors duration-300 line-clamp-2 break-words">
                              {item.Title}
                            </h3>
                            <p className="text-sm! sm:text-[15px]! text-slate-600! dark:text-slate-400! leading-relaxed! line-clamp-3 break-words">
                              {cleanDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export const Causes2 = () => {
  const causesData: {
    img: string;
    category: string;
    title: string;
    progress: number;
    raised: string;
    goal: string;
  }[] = [
    {
      img: "/assets/img/causes/04.jpg",
      category: "Water",
      title: "Rebecca's New Album Aid for the Needy",
      progress: 70,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/05.jpg",
      category: "Foods",
      title: "Charity Showcases Nation's Kindness",
      progress: 90,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/06.jpg",
      category: "Medical",
      title: "Provide Healthy Meals to an Impoverished Rural Child",
      progress: 55,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/07.jpg",
      category: "Water",
      title: "Rebecca's New Album Aid for the Needy",
      progress: 80,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/04.jpg",
      category: "Water",
      title: "Rebecca's New Album Aid for the Needy",
      progress: 70,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/05.jpg",
      category: "Foods",
      title: "Charity Showcases Nation's Kindness",
      progress: 90,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/06.jpg",
      category: "Medical",
      title: "Provide Healthy Meals to an Impoverished Rural Child",
      progress: 55,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      img: "/assets/img/causes/07.jpg",
      category: "Water",
      title: "Rebecca's New Album Aid for the Needy",
      progress: 80,
      raised: "$4,407",
      goal: "$10.000",
    },
  ];
  return (
    <section className="causes-section fix section-bg section-padding">
      <div className="container">
        <div className="section-title-area">
          <div className="section-title">
            <span className="sub-title color-2 wow fadeInUp">
              <i className="far fa-heart" /> Recent Causes
            </span>
            <h2 className="mt-char-animation">
              Introducing Our <br /> Campaigns
            </h2>
          </div>
          <div className="array-button">
            <button className="array-prev">
              <i className="fas fa-long-arrow-left" />
            </button>
            <button className="array-next">
              <i className="fas fa-long-arrow-right" />
            </button>
          </div>
        </div>
        <div className="causes-wrapper">
          <Swiper {...sliderProps.causes1} className="swiper causes-slider-2">
            <div className="swiper-wrapper">
              {causesData.map((cause, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="causes-card-items card-style-2">
                    <div className="causes-image">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        src={cause.img}
                        alt={cause.title}
                      />
                      <div className="post-cat">{cause.category}</div>
                    </div>
                    <div className="causes-content">
                      <h3>
                        <Link href="/causes-details">{cause.title}</Link>
                      </h3>
                      <div className="progress-items">
                        <span className="point">{cause.progress}%</span>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{ width: `${cause.progress}%` }}
                          />
                        </div>
                        <div className="progress-goals">
                          <span>
                            Raised <b>{cause.raised}</b>
                          </span>
                          <span>
                            Goal <b>{cause.goal}</b>
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/donation-details"
                        className="theme-btn transparent-btn-2"
                      >
                        <i className="far fa-heart" /> Donate Now
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export const Causes3 = () => {
  const causes: {
    delay: string;
    bgImage: string;
    category: string;
    author: string;
    title: string;
    raised: number;
    goal: number;
  }[] = [
    {
      delay: ".3s",
      bgImage: "/assets/img/causes/01.jpg",
      category: "Water",
      author: "Miranda H.",
      title: "Because Everyone Deserves Clean Water",
      raised: 70,
      goal: 3000,
    },
    {
      delay: ".5s",
      bgImage: "/assets/img/causes/02.jpg",
      category: "Health",
      author: "Miranda H.",
      title: "Free And Cost-Effective Health Care for the poor",
      raised: 9500,
      goal: 20000,
    },
    {
      delay: ".7s",
      bgImage: "/assets/img/causes/03.jpg",
      category: "Foods",
      author: "Miranda H.",
      title: "Our Donation Is Hope For Poor Children's",
      raised: 3000,
      goal: 7000,
    },
  ];

  return (
    <section className="causes-section fix section-padding fix section-bg">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title wow fadeInUp">
            <i className="far fa-heart" />
            Trending Cause
          </span>
          <h2 className="mt-char-animation">
            It’s About Impact, <br />
            <span>Good</span> History
          </h2>
        </div>
        <div className="row">
          {causes.map((cause, index) => (
            <div
              key={index}
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay={cause.delay}
            >
              <div className="causes-box-items">
                <div
                  className="causes-image bg-cover"
                  style={{ backgroundImage: `url(${cause.bgImage})` }}
                />
                <div className="cause-content">
                  <div className="cause-meta">
                    <Link href="/causes" className="cause-cat">
                      {cause.category}
                    </Link>
                    <a href="#" className="cause-author">
                      <i className="fal fa-user" /> By {cause.author}
                    </a>
                  </div>
                  <h4>
                    <Link href="/causes-details">{cause.title}</Link>
                  </h4>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      data-wow-duration=".9s"
                      role="progressbar"
                      style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                      aria-valuenow={cause.raised}
                      aria-valuemin={0}
                      aria-valuemax={cause.goal}
                    />
                  </div>
                  <div className="cause-amount d-flex justify-content-between">
                    <div className="price-raised">
                      <i className="far fa-heart" />
                      <span>{cause.raised}</span> Raised
                    </div>
                    <div className="price-goal">
                      <i className="far fa-analytics" />
                      <span>${cause.goal}</span> Goal
                    </div>
                    <div className="read-cause-link">
                      <Link href="/causes-details">
                        <i className="fal fa-share" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Causes4 = () => {
  const causes: {
    title: string;
    description: string;
    image: string;
    progress: number;
    raised: string;
    goal: string;
  }[] = [
    {
      title: "Raise Fund For Clean & Healthy Food",
      description:
        "There are only a few times in each of our lives that we get to witness.",
      image: "/assets/img/causes/01.png",
      progress: 70,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      title: "Give African Child A Good Education",
      description:
        "There are only a few times in each of our lives that we get to witness.",
      image: "/assets/img/causes/02.png",
      progress: 90,
      raised: "$4,407",
      goal: "$10.000",
    },
    {
      title: "Raise Fund For Clean & Healthy Food",
      description:
        "There are only a few times in each of our lives that we get to witness.",
      image: "/assets/img/causes/03.png",
      progress: 55,
      raised: "$4,407",
      goal: "$10.000",
    },
  ];

  return (
    <section className="causes-section-2 fix section-padding fix section-bg">
      <div className="container">
        <div className="section-title">
          <span className="sub-title color-2 wow fadeInUp">
            <i className="far fa-heart" />
            Help The People
          </span>
          <h2 className="mt-char-animation">
            Our <span>Popular</span> Causes
          </h2>
        </div>
        <Swiper {...sliderProps.causes2} className="swiper causes-slider">
          <div className="swiper-wrapper">
            {causes.map((cause, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="causes-card-items">
                  <div className="causes-image">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                      src={cause.image}
                      alt="img"
                    />
                  </div>
                  <div className="causes-content">
                    <h3>
                      <Link href="/donation-details">{cause.title}</Link>
                    </h3>
                    <p>{cause.description}</p>
                    <div className="progress-items">
                      <span className="point">{cause.progress}%</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          data-wow-duration=".9s"
                          role="progressbar"
                          style={{ width: `${cause.progress}%` }}
                          aria-valuenow={cause.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <div className="progress-goals">
                        <span>
                          Raised <b> {cause.raised}</b>
                        </span>
                        <span>
                          Goal <b> {cause.goal}</b>
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/donation-details"
                      className="theme-btn transparent-btn-2"
                    >
                      <i className="far fa-heart" /> Donate Now
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export const Causes5 = () => {
  const events: {
    category: string;
    date: string;
    title: string;
    location: string;
    image: string;
  }[] = [
    {
      category: "Water Day",
      date: "24th January 2024",
      title: "2024 Water Full Day Main Conference",
      location: "M12/A Miranda Hall Town Hall Street New York, United States",
      image: "/assets/img/event/event-card-bg.webp",
    },
    {
      category: "Friendship Day",
      date: "24th May 2024",
      title: "How We Can Be A Good Friends",
      location: "M12/A Miranda Hall Town Hall Street New York, United States",
      image: "/assets/img/event/event-card-bg.webp",
    },
    {
      category: "Teachers Day",
      date: "24th January 2024",
      title: "Teachers Presentation Day of 2024",
      location: "M12/A Miranda Hall Town Hall Street New York, United States",
      image: "/assets/img/event/event-card-bg.webp",
    },
  ];

  return (
    <section className="event-section fix section-padding fix section-bg">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title color-2 wow fadeInUp">
            <i className="far fa-heart" />
            Events
          </span>
          <h2 className="mt-char-animation">Upcoming Events</h2>
        </div>
        <div className="row">
          {events.map((event, index) => {
            const delay = (0.3 + index * 0.2).toFixed(1) + "s";
            return (
              <div
                key={index}
                className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay={delay}
              >
                <div
                  className="event-box-items bg-cover"
                  style={{ backgroundImage: `url(${event.image})` }}
                >
                  <div className="cat-name">
                    <Link href="/events">{event.category}</Link>
                  </div>
                  <span>{event.date}</span>
                  <h3>
                    <Link href="/event-details">{event.title}</Link>
                  </h3>
                  <p>
                    <i className="fal fa-map-marker-alt" /> {event.location}
                  </p>
                  <Link href="/event-details" className="buy-ticket">
                    <i className="fal fa-chair" /> Book Your Seat
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CausesCard = ({
  id,
  delay,
  image,
  category,
  author,
  title,
  progress,
  raised,
  goal,
}: {
  id: number;
  delay: string;
  image: string;
  category: string;
  author: string;
  title: string;
  progress: number;
  raised: number;
  goal: number;
}) => (
  <div
    key={id}
    className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
    data-wow-delay={delay}
  >
    <div className="causes-box-items box-shadow">
      <div
        className="causes-image bg-cover"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="cause-content">
        <div className="cause-meta">
          <Link href="/causes" className="cause-cat">
            {category}
          </Link>
          <a href="#" className="cause-author">
            <i className="fal fa-user" />
            By {author}
          </a>
        </div>
        <h4>
          <Link href="/causes-details">{title}</Link>
        </h4>
        <div className="progress">
          <div
            className="progress-bar"
            data-wow-duration=".9s"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="cause-amount d-flex justify-content-between">
          <div className="price-raised">
            <i className="far fa-heart" />
            <span>{raised}</span> Raised
          </div>
          <div className="price-goal">
            <i className="far fa-analytics" />
            <span>${goal}</span> Goal
          </div>
          <div className="read-cause-link">
            <Link href="/causes-details">
              <i className="fal fa-share" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const CausesTab = () => {
  const tabs: {
    key: string;
    label: string;
    active?: boolean;
    delay?: string;
  }[] = [
    { key: "categories", label: "All Categories", active: true, delay: ".3s" },
    { key: "education", label: "Education", delay: ".5s" },
    { key: "madicine", label: "Medicine", delay: ".7s" },
    { key: "food", label: "Foods", delay: ".9s" },
    { key: "water", label: "Water", delay: "1.1s" },
  ];

  const tabContentItems: Record<
    string,
    {
      id: number;
      category: string;
      image: string;
      title: string;
      raised: number;
      goal: number;
      progress: number;
      author: string;
      delay: string;
    }[]
  > = {
    categories: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 55,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 2,
        category: "Foods",
        image: "/assets/img/causes/02.jpg",
        title: "Our Donation Is Hope For Poor Children's",
        raised: 220,
        goal: 6000,
        progress: 45,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 3,
        category: "Healthy",
        image: "/assets/img/causes/03.jpg",
        title: "Raise Fund For Clean & Healthy Water",
        raised: 70,
        goal: 3000,
        progress: 70,
        author: "Miranda H.",
        delay: ".7s",
      },
      {
        id: 4,
        category: "Education",
        image: "/assets/img/causes/03.jpg",
        title: "Emergency Response And Schools Food",
        raised: 1220,
        goal: 8000,
        progress: 90,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 5,
        category: "Education",
        image: "/assets/img/causes/01.jpg",
        title: "Children Education Needs For Change The World.",
        raised: 6400,
        goal: 9000,
        progress: 80,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 6,
        category: "Health",
        image: "/assets/img/causes/02.jpg",
        title: "Free And Cost-Effective Health Care",
        raised: 350,
        goal: 2000,
        progress: 85,
        author: "Miranda H.",
        delay: ".7s",
      },
      {
        id: 7,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Everyone Deserves Pure Clean Water",
        raised: 800,
        goal: 4500,
        progress: 70,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 8,
        category: "Education",
        image: "/assets/img/causes/02.jpg",
        title: "Fundraising For Early Childhood Rise",
        raised: 70,
        goal: 3000,
        progress: 55,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 9,
        category: "Education",
        image: "/assets/img/causes/03.jpg",
        title: "Children Education Needs For Change The World.",
        raised: 70,
        goal: 3000,
        progress: 65,
        author: "Miranda H.",
        delay: ".7s",
      },
    ],
    education: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Everyone in the world Clean Water",
        raised: 70,
        goal: 3000,
        progress: 90,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 2,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 50,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 3,
        category: "Water",
        image: "/assets/img/causes/03.jpg",
        title: "Deserves Basic Education for the poor",
        raised: 670,
        goal: 6000,
        progress: 90,
        author: "Miranda H.",
        delay: ".7s",
      },
      {
        id: 4,
        category: "Water",
        image: "/assets/img/causes/03.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 760,
        goal: 6600,
        progress: 70,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 5,
        category: "Foods",
        image: "/assets/img/causes/01.jpg",
        title: "Everyone Want to eating foods",
        raised: 700,
        goal: 2000,
        progress: 60,
        author: "Miranda H.",
        delay: ".5s",
      },
    ],
    madicine: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 40,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 2,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 80,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 3,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 88,
        author: "Miranda H.",
        delay: ".5s",
      },
    ],
    food: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 44,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 2,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 90,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 3,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 60,
        author: "Miranda H.",
        delay: ".7s",
      },
      {
        id: 4,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 50,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 5,
        category: "Water",
        image: "/assets/img/causes/03.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 90,
        author: "Miranda H.",
        delay: ".7s",
      },
    ],
    water: [
      {
        id: 1,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 90,
        author: "Miranda H.",
        delay: ".3s",
      },
      {
        id: 2,
        category: "Water",
        image: "/assets/img/causes/01.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 60,
        author: "Miranda H.",
        delay: ".5s",
      },
      {
        id: 3,
        category: "Water",
        image: "/assets/img/causes/02.jpg",
        title: "Because Everyone Deserves Clean Water",
        raised: 70,
        goal: 3000,
        progress: 70,
        author: "Miranda H.",
        delay: ".7s",
      },
    ],
  };
  return (
    <section className="causes-section fix section-padding fix">
      <div className="container">
        <Tab.Container defaultActiveKey={"categories"}>
          <div className="cuases-tab-header">
            <Nav as={"ul"} className="nav mb-4" role="tablist">
              {tabs.map((tab) => (
                <Nav.Item
                  key={tab.key}
                  as="li"
                  className="nav-item wow fadeInUp"
                  data-wow-delay={tab.delay}
                  role="presentation"
                >
                  <Nav.Link
                    as="a"
                    href={`#${tab.key}`}
                    eventKey={tab.key}
                    data-bs-toggle="tab"
                    className="nav-link"
                    role="tab"
                  >
                    {tab.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          <Tab.Content className="tab-content">
            {Object.entries(tabContentItems).map(([key, events]) => (
              <Tab.Pane key={key} eventKey={key} className="tab-pane fade">
                <div className="row">
                  {events.map((event) => (
                    <CausesCard
                      key={event.id}
                      id={event.id}
                      delay={event.delay}
                      image={event.image}
                      category={event.category}
                      author={event.author}
                      title={event.title}
                      progress={event.progress}
                      raised={event.raised}
                      goal={event.goal}
                    />
                  ))}
                </div>
              </Tab.Pane>
            ))}
            <div className="page-nav-wrap mt-5 text-center">
              <ul>
                <li>
                  <a className="page-numbers" href="#">
                    <i className="fal fa-long-arrow-left" />
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    01
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    02
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    ..
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    10
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    11
                  </a>
                </li>
                <li>
                  <a className="page-numbers" href="#">
                    <i className="fal fa-long-arrow-right" />
                  </a>
                </li>
              </ul>
            </div>
          </Tab.Content>
        </Tab.Container>
      </div>
    </section>
  );
};
