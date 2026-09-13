"use client";
import { useStickyHeader } from "@/utility";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";

const Header = ({ header }: { header?: number }) => {
  useStickyHeader();
  const headers = { 1: Header1, 2: Header2, 3: Header3, 4: Header4 };
  const HeaderComponent = headers[header as keyof typeof headers] || Header3;
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  return (
    <Fragment>
      <HeaderComponent open={() => setToggleMobileMenu(true)} />
      <MobileMenu
        open={toggleMobileMenu}
        close={() => setToggleMobileMenu(false)}
      />
    </Fragment>
  );
};

export default Header;

const Logo = ({
  logo = "/assets/img/logo/Sagorika.webp",
  className = "header-logo",
}: {
  logo?: string;
  className?: string;
}) => (
  <Link href="/" className={className}>
    <Image
      src={logo}
      width={100}
      height={100}
      alt="logo-img"
      className="w-[50px]! h-[50px]! md:w-[80px]! md:h-[80px]! lg:w-[100px]! lg:h-[100px]! object-contain"
    />
  </Link>
);

const SocialIcons = ({ label = "Follow Us:" }: { label?: string }) => (
  <div className="social-icon d-flex align-items-center">
    <span>{label}</span>
    {["facebook-f", "twitter", "linkedin-in", "youtube"].map((icon) => (
      <a href="#" key={icon}>
        <i className={`fab fa-${icon}`} />
      </a>
    ))}
  </div>
);

const ContactList = ({
  items,
}: {
  items: { icon: string; content: string | React.ReactNode }[];
}) => (
  <ul className="contact-list">
    {items.map((item, i) => (
      <li key={i}>
        <i className={item.icon} />
        {item.content}
      </li>
    ))}
  </ul>
);

const Header1 = ({ open }: { open: () => void }) => (
  <header
    id="header-sticky"
    className="header-4 dark:bg-[#0f172a]! transition-colors duration-300"
  >
    <div className="container">
      <div className="mega-menu-wrapper">
        <div className="header-main style-2">
          <div className="header-left">
            <div className="logo">
              <Logo />
              <Logo
                className="header-logo-2"
                logo="/assets/img/logo/Sagorika.webp"
              />
            </div>
          </div>
          <div className="header-right d-flex justify-content-end align-items-center">
            <div className="mean__menu-wrapper">
              <Nav />
            </div>
            <div className="header__hamburger d-xl-none my-auto">
              <div className="sidebar__toggle" onClick={open}>
                <i className="fas fa-bars" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Header2 = ({ open }: { open: () => void }) => (
  <Fragment>
    <div className="header-top-section-3 dark:bg-slate-900 border-b dark:border-slate-800 transition-colors duration-300">
      <div className="container">
        <div className="header-top-wrapper-2 style-3">
          <ContactList
            items={[
              {
                icon: "fal fa-map-marker-alt",
                content: "Main Street, Melbourne, Australia",
              },
              {
                icon: "far fa-envelope",
                content: (
                  <a href="mailto:matin_ssus@yahoo.com" className="link">
                    matin_ssus@yahoo.com
                  </a>
                ),
              },
            ]}
          />
          <SocialIcons label="Follow Us On:" />
        </div>
      </div>
    </div>
    <header
      id="header-sticky"
      className="header-3 dark:bg-[#0f172a]! transition-colors duration-300"
    >
      <div className="container">
        <div className="mega-menu-wrapper">
          <div className="header-main style-2">
            <div className="header-left">
              <div className="logo">
                <Logo logo="/assets/img/logo/Sagorika.webp" />
              </div>
              <div className="mean__menu-wrapper">
                <Nav />
              </div>
            </div>
            <div className="header-right d-flex justify-content-end align-items-center">
              <div className="author-icon">
                <div className="icon">
                  <i className="fa fa-regular fa-phone" />
                </div>
                <div className="content">
                  <span>Call Us Now</span>
                  <h5>
                    <a href="tel:+2085550112">+000 (123) 456 88</a>
                  </h5>
                </div>
              </div>
              <div className="header-button">
                <Link href="causes" className="theme-btn">
                  Donate Now
                  <i className="ps-2 far fa-heart" />
                </Link>
              </div>
              <div className="header__hamburger d-xl-none my-auto">
                <div className="sidebar__toggle" onClick={open}>
                  <i className="fas fa-bars" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </Fragment>
);

const Header3 = ({ open }: { open: () => void }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      <SearchPopup open={toggle} close={() => setToggle(false)} />
      <header className="header-section-1">
        <div className="header-top-section fix">
          <div className="container-fluid">
            <div className="header-top-wrapper style-2">
              <ContactList
                items={[
                  {
                    icon: "far fa-envelope",
                    content: (
                      <a href="mailto:matin_ssus@yahoo.com" className="link">
                        matin_ssus@yahoo.com
                      </a>
                    ),
                  },
                  {
                    icon: "fa fa-regular fa-phone",
                    content: <a href="tel:2086660112"> +880-1865-041206</a>,
                  },
                ]}
              />
              <div className="top-right">
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>
        <div
          id="header-sticky"
          className="header-1 dark:bg-[#0f172a]! transition-colors duration-300"
        >
          <div className="main-logo">
            <Logo />
          </div>
          <div className="container-fluid">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="logo d-none">
                  <Logo logo="/assets/img/logo/Sagorika.webp" />
                </div>
                <div className="header-left">
                  <div className="mean__menu-wrapper">
                    <Nav />
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <a
                    href="#0"
                    className="search-trigger search-icon"
                    onClick={() => setToggle(true)}
                  >
                    <i className="fa-light fa-magnifying-glass"></i>
                  </a>
                  <div className="header-button">
                    <Link href="/contact" className="theme-btn">
                      Donate Now
                      <i className="ps-2 far fa-heart" />
                    </Link>
                  </div>
                  <div className="header__hamburger d-xl-none my-auto">
                    <div className="sidebar__toggle" onClick={open}>
                      <i className="fas fa-bars" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

const Header4 = ({ open }: { open: () => void }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      <SearchPopup open={toggle} close={() => setToggle(false)} />
      <header className="header-section-2">
        <div className="header-top-section-2 dark:bg-slate-900 border-b dark:border-slate-800 transition-colors duration-300">
          <div className="container">
            <div className="header-top-wrapper-2">
              <ContactList
                items={[
                  {
                    icon: "fal fa-map-marker-alt",
                    content: "Main Street, Melbourne, Australia",
                  },
                  {
                    icon: "far fa-envelope",
                    content: (
                      <a href="mailto:matin_ssus@yahoo.com" className="link">
                        matin_ssus@yahoo.com
                      </a>
                    ),
                  },
                ]}
              />
              <SocialIcons label="Follow Us On:" />
            </div>
          </div>
        </div>
        <div
          id="header-sticky"
          className="header-2 dark:bg-[#0f172a]! transition-colors duration-300"
        >
          <div className="container">
            <div className="mega-menu-wrapper">
              <div className="header-main style-2">
                <div className="header-left">
                  <div className="logo">
                    <Logo logo="/assets/img/logo/Sagorika.webp" />
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="mean__menu-wrapper">
                    <Nav />
                  </div>
                  <a
                    href="#0"
                    className="search-trigger search-icon"
                    onClick={() => setToggle(true)}
                  >
                    <i className="fa-light fa-magnifying-glass"></i>
                  </a>
                  <div className="header-button">
                    <Link href="/contact" className="theme-btn">
                      Donate Now
                      <i className="ps-2 far fa-heart" />
                    </Link>
                  </div>
                  <div className="header__hamburger d-xl-none my-auto">
                    <div className="sidebar__toggle" onClick={open}>
                      <i className="fas fa-bars" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

const Nav = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return (
    <div className="main-menu d-none d-xl-block">
      <nav id="mobile-menu">
        <ul>
          <li className={isActive("/") ? "active" : ""}>
            <Link href="/" className="dark:text-white!">
              Home
            </Link>
          </li>

          <li
            className={`has-dropdown ${isActive("/ourbranch") || isActive("/ourstaff") || isActive("/ourleadership") || isActive("/executivemessage") ? "active" : ""}`}
          >
            <Link href="/" className="dark:text-white!">
              About Us
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu dark:bg-slate-900! dark:border-slate-800!">
              <li className={isActive("/executivemessage") ? "active" : ""}>
                <Link
                  href="/executivemessage"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Executive Director Message
                </Link>
              </li>
              <li className={isActive("/ourleadership") ? "active" : ""}>
                <Link
                  href="/ourleadership"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Our Leadership
                </Link>
              </li>
              <li className={isActive("/ourbranch") ? "active" : ""}>
                <Link
                  href="/ourbranch"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Our Branches
                </Link>
              </li>
              <li className={isActive("/ourstaff") ? "active" : ""}>
                <Link
                  href="/ourstaff"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Our Staff
                </Link>
              </li>
            </ul>
          </li>

          <li
            className={`has-dropdown ${isActive("/ourfounder") || isActive("/edmessage") || isActive("/vision-mission") || isActive("/background") || isActive("/goal-objectives") ? "active" : ""}`}
          >
            <Link href="/" className="dark:text-white!">
              We are Sagarika
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu dark:bg-slate-900! dark:border-slate-800!">
              <li className={isActive("/ourfounder") ? "active" : ""}>
                <Link
                  href="/ourfounder"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  About Our Founder
                </Link>
              </li>
              <li className={isActive("/vision-mission") ? "active" : ""}>
                <Link
                  href="/vision-mission"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Vision & Mission
                </Link>
              </li>
              <li className={isActive("/background") ? "active" : ""}>
                <Link
                  href="/background"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Our Background
                </Link>
              </li>
              <li className={isActive("/goal-objectives") ? "active" : ""}>
                <Link
                  href="/goal-objectives"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Goal & Objectives{" "}
                </Link>
              </li>
            </ul>
          </li>

          <li
            className={`has-dropdown ${isActive("/core-programs") || isActive("/project") || isActive("/special-project") ? "active" : ""}`}
          >
            <Link href="/" className="dark:text-white!">
              Sagarika's Activities
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu dark:bg-slate-900! dark:border-slate-800!">
              <li className={isActive("/core-programs") ? "active" : ""}>
                <Link
                  href="/core-programs"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Core Program
                </Link>
              </li>
              <li className={isActive("/project") ? "active" : ""}>
                <Link
                  href="/project"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Project
                </Link>
              </li>
              <li className={isActive("/special-project") ? "active" : ""}>
                <Link
                  href="/special-project"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Special Project
                </Link>
              </li>
            </ul>
          </li>

          <li
            className={`has-dropdown ${isActive("/gallery") || isActive("/video") ? "active" : ""}`}
          >
            <Link href="/" className="dark:text-white!">
              Media
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu dark:bg-slate-900! dark:border-slate-800!">
              <li className={isActive("/gallery") ? "active" : ""}>
                <Link
                  href="/gallery"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Gallery
                </Link>
              </li>
              <li className={isActive("/video") ? "active" : ""}>
                <Link
                  href="/video"
                  className="dark:text-slate-300! dark:hover:text-white!"
                >
                  Video
                </Link>
              </li>
            </ul>
          </li>

          <li className={isActive("/publication") ? "active" : ""}>
            <Link href="/publication" className="dark:text-white!">
              Publication
            </Link>
          </li>

          <li className={isActive("/careers") ? "active" : ""}>
            <Link href="/careers" className="dark:text-white!">
              Careers
            </Link>
          </li>

          <li className={isActive("/contact") ? "active" : ""}>
            <Link href="/contact" className="dark:text-white!">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const SearchPopup = ({ open, close }: { open: boolean; close: () => void }) => (
  <div className="search-wrap" style={{ display: open ? "block" : "none" }}>
    <div className="search-inner dark:bg-slate-900/95">
      <i className="fa fa-light fa-xmark search-close" onClick={close}></i>
      <div className="search-cell">
        <form method="get">
          <div className="search-field-holder">
            <input
              type="search"
              className="main-search-input"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);

const MobileMenu = ({ open, close }: { open: boolean; close: () => void }) => (
  <Fragment>
    <div className="fix-area">
      <div
        className={`offcanvas__info ${open ? "info-open" : ""} dark:bg-[#0f172a]! dark:text-white!`}
      >
        <div className="offcanvas__wrapper dark:bg-[#0f172a]!">
          <div className="offcanvas__content dark:bg-[#0f172a]!">
            <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo">
                <Logo
                  logo="/assets/img/logo/Sagorika.webp"
                  className="w-36 h-auto"
                />
              </div>
              <div className="offcanvas__close">
                <button
                  onClick={close}
                  className="dark:text-white! dark:bg-slate-800! dark:hover:bg-[#f86048]!"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            <MobileNav />
            <div className="offcanvas__contact dark:text-white!">
              <h4 className="dark:text-white!">Contact Info</h4>
              <ul>
                {[
                  {
                    icon: "fal fa-map-marker-alt",
                    link: "#",
                    text: "Head Office: Vill+Po : Charbata, Upazilla: Subarnachar, Dist: Noakhali.",
                  },
                  {
                    icon: "far fa-phone",
                    link: "tel:+8801865041206",
                    text: "+880-1865-041206",
                  },
                  {
                    icon: "fal fa-envelope",
                    link: "mailto:matin_ssus@yahoo.com",
                    text: "matin_ssus@yahoo.com",
                  },
                  {
                    icon: "fal fa-clock",
                    link: "#",
                    text: "©2026 All Right Reserved By: Sagarika Samaj Unnayan Sangastha.",
                  },
                ].map((item, i) => (
                  <li key={i} className="d-flex align-items-center">
                    <div
                      className={`offcanvas__contact-icon ${
                        i > 0 ? "mr-15" : ""
                      }`}
                    >
                      <i className={`${item.icon} dark:text-[#f86048]!`} />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a
                        href={item.link}
                        target={item.link === "#" ? "_blank" : undefined}
                        className="dark:text-slate-300! dark:hover:text-white!"
                      >
                        {item.text}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="header-button mt-4">
                <Link href="/contact" className="theme-btn text-center">
                  <span>
                    Get A Quote
                    <i className="fa-solid fa-arrow-right-long" />
                  </span>
                </Link>
              </div>

              <SocialIcons label="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className={`offcanvas__overlay ${open ? "overlay-open" : ""}`}
      onClick={close}
    ></div>
  </Fragment>
);

const MobileNav = () => {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("");

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const showMenu = (menu: string) => ({
    display: activeMenu === menu ? "block" : "none",
  });

  return (
    <div className="mobile-menu fix mb-3 mean-container">
      <div className="mean-bar">
        <nav className="mean-nav">
          <ul>
            <li className={isActive("/") ? "active" : ""}>
              <Link href="/" className="dark:text-white!">
                Home
              </Link>
            </li>

            {/* About Us */}
            <li
              className={`has-dropdown ${isActive("/ourbranch") || isActive("/ourstaff") || isActive("/ourleadership") || isActive("/executivemessage") ? "active" : ""}`}
            >
              <Link href="/about" className="dark:text-white!">
                About Us
              </Link>

              <ul
                className="submenu dark:bg-slate-900!"
                style={showMenu("about")}
              >
                <li className={isActive("/executivemessage") ? "active" : ""}>
                  <Link
                    href="/executivemessage"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Executive Director Message
                  </Link>
                </li>
                <li className={isActive("/ourleadership") ? "active" : ""}>
                  <Link
                    href="/ourleadership"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Our Leadership
                  </Link>
                </li>
                <li className={isActive("/ourbranch") ? "active" : ""}>
                  <Link
                    href="/ourbranch"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Our Branches
                  </Link>
                </li>
                <li className={isActive("/ourstaff") ? "active" : ""}>
                  <Link
                    href="/ourstaff"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Our Staff
                  </Link>
                </li>
              </ul>

              <a
                href="#"
                className="mean-expand dark:text-white!"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("about");
                }}
              >
                <i
                  className={
                    activeMenu === "about" ? "far fa-minus" : "far fa-plus"
                  }
                />
              </a>
            </li>

            {/* We are Sagarika */}
            <li
              className={`has-dropdown ${isActive("/ourfounder") || isActive("/edmessage") || isActive("/vision-mission") || isActive("/background") || isActive("/goal-objectives") ? "active" : ""}`}
            >
              <Link href="/about" className="dark:text-white!">
                We are Sagarika
              </Link>

              <ul
                className="submenu dark:bg-slate-900!"
                style={showMenu("sagarika")}
              >
                <li className={isActive("/ourfounder") ? "active" : ""}>
                  <Link
                    href="/ourfounder"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    About Our Founder
                  </Link>
                </li>
                <li className={isActive("/vision-mission") ? "active" : ""}>
                  <Link
                    href="/vision-mission"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Vision & Mission
                  </Link>
                </li>
                <li className={isActive("/background") ? "active" : ""}>
                  <Link
                    href="/background"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Our Background
                  </Link>
                </li>
                <li className={isActive("/goal-objectives") ? "active" : ""}>
                  <Link
                    href="/goal-objectives"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Goal & Objectives
                  </Link>
                </li>
              </ul>

              <a
                href="#"
                className="mean-expand dark:text-white!"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("sagarika");
                }}
              >
                <i
                  className={
                    activeMenu === "sagarika" ? "far fa-minus" : "far fa-plus"
                  }
                />
              </a>
            </li>

            {/* Activities */}
            <li
              className={`has-dropdown ${isActive("/core-programs") || isActive("/project") || isActive("/special-project") ? "active" : ""}`}
            >
              <Link href="/" className="dark:text-white!">
                Sagarika's Activities
              </Link>

              <ul
                className="submenu dark:bg-slate-900!"
                style={showMenu("activities")}
              >
                <li className={isActive("/core-programs") ? "active" : ""}>
                  <Link
                    href="/core-programs"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Core Program
                  </Link>
                </li>
                <li className={isActive("/project") ? "active" : ""}>
                  <Link
                    href="/project"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Project
                  </Link>
                </li>
                <li className={isActive("/special-project") ? "active" : ""}>
                  <Link
                    href="/special-project"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Special Project
                  </Link>
                </li>
              </ul>

              <a
                href="#"
                className="mean-expand dark:text-white!"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("activities");
                }}
              >
                <i
                  className={
                    activeMenu === "activities" ? "far fa-minus" : "far fa-plus"
                  }
                />
              </a>
            </li>

            {/* Media */}
            <li
              className={`has-dropdown ${isActive("/gallery") || isActive("/video") ? "active" : ""}`}
            >
              <Link href="/" className="dark:text-white!">
                Media
              </Link>

              <ul
                className="submenu dark:bg-slate-900!"
                style={showMenu("media")}
              >
                <li className={isActive("/gallery") ? "active" : ""}>
                  <Link
                    href="/gallery"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Gallery
                  </Link>
                </li>
                <li className={isActive("/video") ? "active" : ""}>
                  <Link
                    href="/video"
                    className="dark:text-slate-300! dark:hover:text-white!"
                  >
                    Video
                  </Link>
                </li>
              </ul>

              <a
                href="#"
                className="mean-expand dark:text-white!"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("media");
                }}
              >
                <i
                  className={
                    activeMenu === "media" ? "far fa-minus" : "far fa-plus"
                  }
                />
              </a>
            </li>

            <li className={isActive("/publication") ? "active" : ""}>
              <Link href="/publication" className="dark:text-white!">
                Publication
              </Link>
            </li>

            <li className={`mean-last ${isActive("/contact") ? "active" : ""}`}>
              <Link href="/contact" className="dark:text-white!">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
