"use client";
import { sliderProps } from "@/utility/sliderProps";
import Image from "next/image";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";

export const Event1 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const eventsData: {
    img: string;
    date: string;
    time: string;
    location: string;
    title: string;
    link: string;
    description: string;
  }[] = [
      {
        img: "/assets/img/microfinance/micro2.webp",
        date: "20 Mar 2026",
        time: "10:00 AM",
        location: "SSUS Head Office, Charbata, Noakhali",
        title: "Microfinance Awareness Workshop",
        link: "event-details",
        description:
          "An informative session on microfinance programs empowering coastal families in Bangladesh.",
      },
      {
        img: "/assets/img/factbg.webp",
        date: "25 Mar 2026",
        time: "11:00 AM",
        location: "Community Hall, Subarnachar",
        title: "Disaster Preparedness Training",
        link: "event-details",
        description:
          "Training session for local communities on cyclone and flood preparedness and response.",
      },
      {
        img: "/assets/img/factbg.webp",
        date: "30 Mar 2026",
        time: "09:30 AM",
        location: "Lakshmipur School Grounds",
        title: "Clean Water & Sanitation Campaign",
        link: "event-details",
        description:
          "Launching awareness and practical support for safe drinking water and sanitation in coastal villages.",
      },
      {
        img: "/assets/img/factbg.webp",
        date: "05 Apr 2026",
        time: "10:00 AM",
        location: "SSUS Training Center, Noakhali",
        title: "Women Empowerment & Vocational Training",
        link: "event-details",
        description:
          "A program to educate and train women in skills development, legal awareness, and small business management.",
      },
    ];

  // Animation classes for each card position
  const cardAnimations = [
    "translate-y-[-100px] opacity-0", // Card 0 - Top Left
    "translate-y-[-100px] opacity-0", // Card 1 - Top Right
    "translate-y-[100px] opacity-0",  // Card 2 - Bottom Left
    "translate-y-[100px] opacity-0",  // Card 3 - Bottom Right
  ];

  // Animation delays for staggered effect (slower)
  const cardDelays = ["0ms", "500ms", "400ms", "650ms"];

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white dark:bg-[#0f172a]! py-16 lg:py-24 overflow-hidden"
    >
      <div className="">
        {/* Section Header */}
        <div className="container mx-auto px-4 sm:px-6 text-center mb-12! lg:mb-16!">
          <span className="inline-flex items-center gap-2 text-[#f86048] font-semibold tracking-widest! uppercase text-xs sm:text-sm">
            <i className="far fa-heart" />
            OUR EVENTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white! mt-2!">
            Upcoming SSUS Events
          </h2>
          <p className="text-slate-600 dark:text-slate-400! mt-3! max-w-2xl mx-auto text-base sm:text-lg">
            Join us in making a meaningful impact in our coastal communities
          </p>
        </div>

        <div className="container-fluid mx-auto px-4! sm:px-6! lg:px-8! xl:px-60!">
          {/* 2-Column Grid - Responsive */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            {eventsData.map((event, i) => (
              <div
                key={i}
                className={`group bg-white dark:bg-slate-800! rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60! shadow-sm hover:shadow-xl hover:border-[#f86048]/40 flex flex-col sm:flex-row transition-all duration-[1200ms] ease-out
                  ${isVisible ? "translate-y-0 translate-x-0 opacity-100" : cardAnimations[i]}`}
                style={{
                  transitionDelay: cardDelays[i],
                  transitionProperty: "all",
                  transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                {/* Left Side: Image - Full width on mobile, side on sm+ */}
                <div className="relative w-full sm:w-2/5 h-56 sm:h-auto sm:min-h-[200px] shrink-0 overflow-hidden">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95! backdrop-blur-sm text-center px-1.5! py-1.5! rounded-[10px]! shadow-md border border-slate-100 dark:border-slate-800!">
                    <div className="text-[10px] text-[#f86048] font-bold tracking-wider! uppercase leading-none!">
                      {event.date.split(" ")[1]}
                    </div>
                    <div className="text-lg font-black text-slate-900 dark:text-white! leading-none!">
                      {event.date.split(" ")[0]}
                    </div>
                  </div>
                </div>

                {/* Right Side: Content - Full width on mobile, side on sm+ */}
                <div className="w-full sm:w-3/5 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    {/* Meta Details */}
                    <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
                      <div className="flex items-center gap-1.5">
                        <i className="far fa-clock text-[#f86048]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <i className="far fa-map-marker-alt text-[#f86048] flex-shrink-0" />
                        <span className="line-clamp-1 truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2! line-clamp-2 transition-colors duration-200">
                      <Link href={event.link} className="dark:text-white! group-hover:text-[#f86048]!">
                        {event.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300! text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4!">
                      {event.description}
                    </p>
                  </div>

                  {/* Footer Link */}
                  <div className="pt-3! border-t border-slate-100 dark:border-slate-700/50!">
                    <Link
                      href={event.link}
                      className="inline-flex items-center gap-2 text-[#f86048]! font-semibold text-xs sm:text-sm hover:gap-3 transition-all duration-300"
                    >
                      Event Details
                      <i className="far fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
// export const Event1 = () => {
//   const eventsData: {
//     img: string;
//     date: string;
//     time: string;
//     location: string;
//     title: string;
//     link: string;
//     description: string;
//     delay: string;
//   }[] = [
//     {
//       img: "/assets/img/microfinance/micro2.webp",
//       date: "20 Mar 2026",
//       time: "10:00 AM",
//       location: "SSUS Head Office, Charbata, Noakhali",
//       title: "Microfinance Awareness Workshop",
//       link: "event-details",
//       description:
//         "An informative session on microfinance programs empowering coastal families in Bangladesh.",
//       delay: ".3s",
//     },
//     {
//       img: "/assets/img/factbg.webp",
//       date: "25 Mar 2026",
//       time: "11:00 AM",
//       location: "Community Hall, Subarnachar",
//       title: "Disaster Preparedness Training",
//       link: "event-details",
//       description:
//         "Training session for local communities on cyclone and flood preparedness and response.",
//       delay: ".5s",
//     },
//     {
//       img: "/assets/img/factbg.webp",
//       date: "30 Mar 2026",
//       time: "09:30 AM",
//       location: "Lakshmipur School Grounds",
//       title: "Clean Water & Sanitation Campaign",
//       link: "event-details",
//       description:
//         "Launching awareness and practical support for safe drinking water and sanitation in coastal villages.",
//       delay: ".3s",
//     },
//     {
//       img: "/assets/img/factbg.webp",
//       date: "05 Apr 2026",
//       time: "10:00 AM",
//       location: "SSUS Training Center, Noakhali",
//       title: "Women Empowerment & Vocational Training",
//       link: "event-details",
//       description:
//         "A program to educate and train women in skills development, legal awareness, and small business management.",
//       delay: ".5s",
//     },
//   ];

//   return (
//     <section className="event-section-4 fix section-padding bg-white dark:bg-[#0f172a]!">
//       <div className="container">
//         <div className="section-title text-center">
//           <span className="sub-title color-2 wow fadeInUp">
//             <i className="far fa-heart" />
//             Our Events
//           </span>
//           <h2 className="mt-char-animation dark:text-white!">Upcoming SSUS Events</h2>
//         </div>
//       </div>
//       <div className="container-fluid">
//         <div className="row">
//           {eventsData.map((event, i) => (
//             <div
//               className="col-xl-6 wow fadeInUp"
//               data-wow-delay={event.delay}
//               key={i}
//             >
//               <div className="event-card-items bg-white! dark:bg-slate-800! dark:border-slate-700! border border-slate-200!">
//                 <div className="event-image">
//                   <Image
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     style={{
//                       width: "285px",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                     src={event.img}
//                     alt="img"
//                   />
//                 </div>
//                 <div className="event-content p-6! dark:text-slate-200!">
//                   <ul className="space-y-2">
//                     <li className="flex items-center gap-2 text-slate-600! dark:text-slate-400!">
//                       <i className="fal fa-calendar-alt" />
//                       {event.date}
//                     </li>
//                     <li className="flex items-center gap-2 text-slate-600! dark:text-slate-400!">
//                       <i className="far fa-clock" />
//                       {event.time}
//                     </li>
//                     <li className="flex items-center gap-2 text-slate-600 dark:text-slate-400!">
//                       <i className="far fa-map-marker-alt" />
//                       {event.location}
//                     </li>
//                   </ul>
//                   <h3 className="mt-4 mb-3">
//                     <Link 
//                       href={event.link} 
//                       className="text-slate-800 hover:text-blue-600! dark:text-white! dark:hover:text-blue-400! transition-colors"
//                     >
//                       {event.title}
//                     </Link>
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-400! mb-4!">
//                     {event.description}
//                   </p>
//                   <Link 
//                     href={event.link} 
//                     className="link-btn inline-flex items-center gap-2 text-blue-600 hover:text-blue-700! dark:text-blue-400! dark:hover:text-blue-300! font-medium"
//                   >
//                     Read More <i className="far fa-long-arrow-right" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };



export const Event2 = () => {
  const eventsData: {
    img: string;
    date: string;
    time: string;
    location: string;
    title: string;
    description: string;
    delay: string;
  }[] = [
      {
        img: "/assets/img/event/02.webp",
        date: "13 Nov 2024",
        time: "10:00 PM",
        location: "66 Broklyant, New York India",
        title: "How to build a loyal community offline",
        description:
          "Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio. Mauris et mollis quam. Nullam fringilla erat id ante commodo sodales.",
        delay: ".3s",
      },
      {
        img: "/assets/img/event/08.webp",
        date: "13 Nov 2024",
        time: "10:00 PM",
        location: "66 Broklyant, New York India",
        title: "Start a campaign to reach your creative",
        description:
          "Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio. Mauris et mollis quam. Nullam fringilla erat id ante commodo sodales.",
        delay: ".5s",
      },
    ];
  return (
    <section className="event-section fix section-padding">
      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title color-2 wow fadeInUp">
            <i className="far fa-heart" /> Our Events
          </span>
          <h2 className="mt-char-animation">
            Be ready for our upcoming <br /> charity events
          </h2>
        </div>
        <div className="row">
          {eventsData.map((event, index) => (
            <div
              key={index}
              className="col-lg-6 wow fadeInUp"
              data-wow-delay={event.delay}
            >
              <div className="event-box-items-2">
                <div className="event-image">
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    src={event.img}
                    alt={event.title}
                  />
                </div>
                <div className="event-content">
                  <ul>
                    <li>
                      <i className="fal fa-calendar-alt" /> {event.date}
                    </li>
                    <li>
                      <i className="far fa-clock" /> {event.time}
                    </li>
                    <li>
                      <i className="far fa-map-marker-alt" /> {event.location}
                    </li>
                  </ul>
                  <h3>
                    <Link href="/event-details">{event.title}</Link>
                  </h3>
                  <p>{event.description}</p>
                  <Link
                    href="/event-details"
                    className="theme-btn transparent-btn-2"
                  >
                    <i className="far fa-heart" /> Join Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Event3 = () => {
  const events: {
    bgImage: string;
    date: string;
    month: string;
    colorClass?: string;
    category: string;
    title: string;
    time: string;
    author: string;
  }[] = [
      {
        bgImage: "/assets/img/event/01.webp",
        date: "11",
        month: "July",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/04.webp",
        date: "11",
        month: "July",
        colorClass: "color-2",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/05.webp",
        date: "11",
        month: "July",
        colorClass: "color-3",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/06.webp",
        date: "11",
        month: "July",
        colorClass: "color-4",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/07.webp",
        date: "11",
        month: "July",
        colorClass: "color-5",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/01.webp",
        date: "11",
        month: "July",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/04.webp",
        date: "11",
        month: "July",
        colorClass: "color-2",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/05.webp",
        date: "11",
        month: "July",
        colorClass: "color-3",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/06.webp",
        date: "11",
        month: "July",
        colorClass: "color-4",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
      {
        bgImage: "/assets/img/event/07.webp",
        date: "11",
        month: "July",
        colorClass: "color-5",
        category: "School",
        title: "Need To Playing For This Worlds",
        time: "13:00 - 18:00",
        author: "Shikhon Islam",
      },
    ];

  return (
    <section className="event-section">
      <Swiper {...sliderProps.event} className="swiper event-slider">
        <div className="swiper-wrapper">
          {events.map((event, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="event-single-items">
                <div
                  className="event-image bg-cover"
                  style={{ backgroundImage: `url(${event.bgImage})` }}
                >
                  <div className="event-content">
                    <div className="sub-content">
                      <div className={`event-date ${event.colorClass || ""}`}>
                        <span>{event.date}</span>
                        {event.month}
                      </div>
                      <div className="event-title">
                        <Link href="events" className="event-cat">
                          {event.category}
                        </Link>
                        <h4>
                          <Link href="/event-details">{event.title}</Link>
                        </h4>
                      </div>
                    </div>
                    <ul className="post-date">
                      <li>
                        <i className="fal fa-clock" /> {event.time}
                      </li>
                      <li>
                        <i className="fal fa-user" /> {event.author}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

const EventCard = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => (
  <div className="event-card-main-items">
    <div className="event-card-items-2">
      <div className="event-image">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ height: "auto", width: "100%" }}
          src={image}
          alt="img"
        />
        <div className="event-time-address">
          <span>
            <i className="fal fa-calendar-alt" />
            24th June 2024
          </span>
          <span>
            <i className="fal fa-map-marker-alt" />
            NY, London
          </span>
        </div>
      </div>
      <div className="event-content-itmes">
        <div className="event-content">
          <div className="event-title-top">
            <h3>
              <Link href="/event-details">{title}</Link>
            </h3>
            <p>{description}</p>
          </div>
          <div className="list-items">
            <ul>
              <li>
                <i className="fas fa-check" /> A place in history
              </li>
              <li>
                <i className="fas fa-check" /> It's about impact, goodness
              </li>
            </ul>
            <ul>
              <li>
                <i className="fas fa-check" /> More goodness in the world
              </li>
              <li>
                <i className="fas fa-check" /> The world we live
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Link href="/event-details" className="theme-btn">
      <i className="fal fa-home me-2" />
      Book A Seat
    </Link>
  </div>
);

export const EventPage = () => {
  const tabs: {
    key: string;
    label: string;
    delay: string;
  }[] = [
      { key: "categories", label: "All Categories", delay: ".3s" },
      { key: "water", label: "Water Day", delay: ".5s" },
      { key: "festival", label: "Festival", delay: ".7s" },
      { key: "proevent", label: "ProEvent", delay: ".7s" },
      { key: "trending", label: "Trending", delay: ".7s" },
    ];

  const eventData: Record<
    string,
    {
      image: string;
      title: string;
    }[]
  > = {
    categories: [
      {
        image: "/assets/img/event/e1.webp",
        title: "Project Management In The Voluntary Sector",
      },
      {
        image: "/assets/img/event/e2.webp",
        title: "10 Ways To Help Others That Will Lead You",
      },
      {
        image: "/assets/img/event/e3.webp",
        title: "Helping The Church To Serve Others",
      },
      {
        image: "/assets/img/event/e4.webp",
        title: "Rebuilding Collapse Primary School",
      },
      {
        image: "/assets/img/event/e5.webp",
        title: "Changing Leadership In A Changing World",
      },
      {
        image: "/assets/img/event/e6.webp",
        title: "Charity Program In The Dhaka",
      },
    ],
    water: [
      {
        image: "/assets/img/event/e1.webp",
        title: "Project Management In The Voluntary Sector",
      },
      {
        image: "/assets/img/event/e2.webp",
        title: "10 Ways To Help Others That Will Lead You",
      },
      {
        image: "/assets/img/event/e5.webp",
        title: "Changing Leadership In A Changing World",
      },
      {
        image: "/assets/img/event/e6.webp",
        title: "Charity Program In The Dhaka",
      },
    ],
    festival: [
      {
        image: "/assets/img/event/e2.webp",
        title: "10 Ways To Help Others That Will Lead You",
      },
      {
        image: "/assets/img/event/e3.webp",
        title: "Helping The Church To Serve Others",
      },
      {
        image: "/assets/img/event/e4.webp",
        title: "Rebuilding Collapse Primary School",
      },
      {
        image: "/assets/img/event/e5.webp",
        title: "Changing Leadership In A Changing World",
      },
    ],
    proevent: [
      {
        image: "/assets/img/event/e1.webp",
        title: "Project Management In The Voluntary Sector",
      },
      {
        image: "/assets/img/event/e2.webp",
        title: "10 Ways To Help Others That Will Lead You",
      },
      {
        image: "/assets/img/event/e6.webp",
        title: "Charity Program In The Dhaka",
      },
    ],
    trending: [
      {
        image: "/assets/img/event/e4.webp",
        title: "Rebuilding Collapse Primary School",
      },
      {
        image: "/assets/img/event/e5.webp",
        title: "Changing Leadership In A Changing World",
      },
      {
        image: "/assets/img/event/e6.webp",
        title: "Charity Program In The Dhaka",
      },
    ],
  };
  const description =
    "Your $40.00 monthly donation can give 12 people clean water every year. 100% funds water projects.";

  return (
    <section className="event-section-4 fix section-padding">
      <div className="container">
        <Tab.Container defaultActiveKey="categories">
          <div className="event-tab-header">
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
            {Object.entries(eventData).map(([key, events]) => (
              <Tab.Pane key={key} eventKey={key} className="tab-pane fade">
                <div className="row">
                  <div className="col-xl-12">
                    {events.map((event, index) => (
                      <EventCard
                        key={index}
                        image={event.image}
                        title={event.title}
                        description={description}
                      />
                    ))}
                  </div>
                </div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
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
      </div>
    </section>
  );
};
