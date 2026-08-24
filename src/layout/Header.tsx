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

// const Logo = ({
//   logo = "/assets/img/logo/Sagorika.webp",
//   className = "header-logo",
// }: {
//   logo?: string;
//   className?: string;
// }) => (
//   <Link href="/" className={className}>
//     <Image
//       src={logo}
//       width={100}
//       height={100}
//       alt="logo-img"
//       className="w-[50px]! h-[50px]! md:w-[80px]! md:h-[80px]! lg:w-[100px]! lg:h-[100px]! object-contain"
//     />
//   </Link>
// );


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
  <header id="header-sticky" className="header-4">
    <div className="container">
      <div className="mega-menu-wrapper">
        <div className="header-main style-2">
          <div className="header-left">
            <div className="logo">
              <Logo />
              <Logo className="header-logo-2" logo="/assets/img/logo/Sagorika.webp" />
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
    <div className="header-top-section-3">
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
    <header id="header-sticky" className="header-3">
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
        <div id="header-sticky" className="header-1">
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
        <div className="header-top-section-2">
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
        <div id="header-sticky" className="header-2">
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

// ==================== UPDATED NAV WITH ACTIVE STATE ====================
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
            <Link href="/">Home</Link>
          </li>

          <li className={`has-dropdown ${isActive("/ourbranch") || isActive("/ourstaff") || isActive("/ourleadership") || isActive("/executivemessage") ? "active" : ""}`}>
            <Link href="/">
              About Us
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu">
              <li className={isActive("/ourbranch") ? "active" : ""}>
                <Link href="/ourbranch">Our Branches</Link>
              </li>
              <li className={isActive("/ourstaff") ? "active" : ""}>
                <Link href="/ourstaff">Our Staff</Link>
              </li>
              <li className={isActive("/ourleadership") ? "active" : ""}>
                <Link href="/ourleadership">Our Leadership</Link>
              </li>
              <li className={isActive("/executivemessage") ? "active" : ""}>
                <Link href="/executivemessage">Executive Director Message</Link>
              </li>
            </ul>
          </li>

          <li className={`has-dropdown ${isActive("/ourfounder") || isActive("/edmessage") || isActive("/vision-mission") || isActive("/background") || isActive("/goal-objectives") ? "active" : ""}`}>
            <Link href="/">
              We are Sagarika
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu">
              <li className={isActive("/ourfounder") ? "active" : ""}>
                <Link href="/ourfounder">About Our Founder</Link>
              </li>
              {/* <li className={isActive("/edmessage") ? "active" : ""}>
                <Link href="/edmessage">Executive Director Message</Link>
              </li> */}
              <li className={isActive("/vision-mission") ? "active" : ""}>
                <Link href="/vision-mission">Vision & Mission</Link>
              </li>
              <li className={isActive("/background") ? "active" : ""}>
                <Link href="/background">Our Background</Link>
              </li>
              <li className={isActive("/goal-objectives") ? "active" : ""}>
                <Link href="/goal-objectives">Goal & Objectives </Link>
              </li>
            </ul>
          </li>

          <li className={`has-dropdown ${isActive("/core-programs") || isActive("/project") || isActive("/special-project") ? "active" : ""}`}>
            <Link href="/">
              Sagarika's Activities
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu">
              <li className={isActive("/core-programs") ? "active" : ""}>
                <Link href="/core-programs">Core Program</Link>
              </li>
              <li className={isActive("/project") ? "active" : ""}>
                <Link href="/project">Project</Link>
              </li>
              <li className={isActive("/special-project") ? "active" : ""}>
                <Link href="/special-project">Special Project</Link>
              </li>
            </ul>
          </li>

          <li className={`has-dropdown ${isActive("/gallery") || isActive("/video") ? "active" : ""}`}>
            <Link href="/">
              Media
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu">
              <li className={isActive("/gallery") ? "active" : ""}>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li className={isActive("/video") ? "active" : ""}>
                <Link href="/video">Video</Link>
              </li>
            </ul>
          </li>

          {/* <li className={isActive("/blog") ? "active" : ""}>
            <Link href="/blog">Blog</Link>
          </li> */}

          <li className={isActive("/publication") ? "active" : ""}>
            <Link href="/publication">Publication</Link>
          </li>

          <li className={isActive("/careers") ? "active" : ""}>
            <Link href="/careers">Careers</Link>
          </li>

          <li className={isActive("/contact") ? "active" : ""}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
// =====================================================================

const SearchPopup = ({ open, close }: { open: boolean; close: () => void }) => (
  <div className="search-wrap" style={{ display: open ? "block" : "none" }}>
    <div className="search-inner">
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
      <div className={`offcanvas__info ${open ? "info-open" : ""}`}>
        <div className="offcanvas__wrapper">
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo">
                <Logo logo="/assets/img/logo/Sagorika.webp" className="w-36 h-auto" />   {/* ← Changed this line only */}
              </div>
              <div className="offcanvas__close">
                <button onClick={close}>
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            <p className="text d-none d-xl-block">
              Nullam dignissim, ante scelerisque the is euismod fermentum odio
              sem semper the is erat, a feugiat leo urna eget eros. Duis Aenean
              a imperdiet risus.
            </p>
            <MobileNav />
            <div className="offcanvas__contact">
              <h4>Contact Info</h4>
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
                      className={`offcanvas__contact-icon ${i > 0 ? "mr-15" : ""
                        }`}
                    >
                      <i className={item.icon} />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a
                        href={item.link}
                        target={item.link === "#" ? "_blank" : undefined}
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

// MOBILE NAV WITH ACTIVE HIGHLIGHT 
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
              <Link href="/">Home</Link>
            </li>
            {/* about us  */}
            <li className={`has-dropdown ${isActive("/ourbranch") || isActive("/ourstaff") || isActive("/ourleadership") || isActive("/executivemessage") ? "active" : ""}`}>
              <Link href="/about">
                About Us
                <i className="fas fa-angle-down" />
              </Link>

              <ul className="submenu" style={showMenu("sagarika")}>
                <li className={isActive("/ourbranch") ? "active" : ""}>
                  <Link href="/ourbranch">Our Branches</Link>
                </li>
                <li className={isActive("/ourstaff") ? "active" : ""}>
                  <Link href="/ourstaff">Our Staff</Link>
                </li>
                <li className={isActive("/ourleadership") ? "active" : ""}>
                  <Link href="/ourleadership">Our Leadership</Link>
                </li>
                <li className={isActive("/executivemessage") ? "active" : ""}>
                  <Link href="/executivemessage">Executive Director Message</Link>
                </li>
              </ul>

              <a
                href="#"
                className="mean-expand"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("sagarika");
                }}
              >
                <i className="far fa-plus" />
              </a>
            </li>

            {/* We are Sagarika */}
            <li className={`has-dropdown ${isActive("/ourfounder") || isActive("/edmessage") || isActive("/vision-mission") || isActive("/background") || isActive("/goal-objectives") ? "active" : ""}`}>
              <Link href="/about">
                We are Sagarika
                <i className="fas fa-angle-down" />
              </Link>

              <ul className="submenu" style={showMenu("sagarika")}>
                <li className={isActive("/ourfounder") ? "active" : ""}>
                  <Link href="/ourfounder">About Our Founder</Link>
                </li>
                {/* <li className={isActive("/edmessage") ? "active" : ""}>
                  <Link href="/edmessage">Executive Director Message</Link>
                </li> */}
                <li className={isActive("/vision-mission") ? "active" : ""}>
                  <Link href="/vision-mission">Vision & Mission</Link>
                </li>
                <li className={isActive("/background") ? "active" : ""}>
                  <Link href="/background">Our Background</Link>
                </li>
                <li className={isActive("/goal-objectives") ? "active" : ""}>
                  <Link href="/goal-objectives">Goal & Objectives</Link>
                </li>
              </ul>

              <a
                href="#"
                className="mean-expand"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("sagarika");
                }}
              >
                <i className="far fa-plus" />
              </a>
            </li>

            {/* Activities */}
            <li className={`has-dropdown ${isActive("/core-programs") || isActive("/project") || isActive("/special-project") ? "active" : ""}`}>
              <Link href="/">
                Sagarika's Activities
                <i className="fas fa-angle-down" />
              </Link>

              <ul className="submenu" style={showMenu("activities")}>
                <li className={isActive("/core-programs") ? "active" : ""}>
                  <Link href="/core-programs">Core Program</Link>
                </li>
                <li className={isActive("/project") ? "active" : ""}>
                  <Link href="/project">Project</Link>
                </li>
                <li className={isActive("/special-project") ? "active" : ""}>
                  <Link href="/special-project">Special Project</Link>
                </li>
              </ul>

              <a
                href="#"
                className="mean-expand"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("activities");
                }}
              >
                <i className="far fa-plus" />
              </a>
            </li>

            {/* Media */}
            <li className={`has-dropdown ${isActive("/gallery") || isActive("/video") ? "active" : ""}`}>
              <Link href="/">
                Media
                <i className="fas fa-angle-down" />
              </Link>

              <ul className="submenu" style={showMenu("media")}>
                <li className={isActive("/gallery") ? "active" : ""}>
                  <Link href="/gallery">Gallery</Link>
                </li>
                <li className={isActive("/video") ? "active" : ""}>
                  <Link href="/video">Video</Link>
                </li>
              </ul>

              <a
                href="#"
                className="mean-expand"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu("media");
                }}
              >
                <i className="far fa-plus" />
              </a>
            </li>

            {/* <li className={isActive("/blog") ? "active" : ""}>
              <Link href="/blog">Blog</Link>
            </li> */}

            <li className={isActive("/publication") ? "active" : ""}>
              <Link href="/publication">Publication</Link>
            </li>

            <li className={`mean-last ${isActive("/contact") ? "active" : ""}`}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};



// "use client";
// import { useStickyHeader } from "@/utility";
// import Image from "next/image";
// import Link from "next/link";
// import { Fragment, useState } from "react";
// import { usePathname } from "next/navigation";   // ← Added

// const Header = ({ header }: { header?: number }) => {
//   useStickyHeader();
//   const headers = { 1: Header1, 2: Header2, 3: Header3, 4: Header4 };
//   const HeaderComponent = headers[header as keyof typeof headers] || Header3;
//   const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
//   return (
//     <Fragment>
//       <HeaderComponent open={() => setToggleMobileMenu(true)} />
//       <MobileMenu
//         open={toggleMobileMenu}
//         close={() => setToggleMobileMenu(false)}
//       />
//     </Fragment>
//   );
// };

// export default Header;

// const Logo = ({
//   logo = "Sagorika.png",
//   className = "header-logo",
// }: {
//   logo?: string;
//   className?: string;
// }) => (
//   <Link href="/" className={className}>
//     <Image
//       src={`/assets/img/logo/${logo}`}
//       width={100}
//       height={100}
//       alt="logo-img"
//     />
//   </Link>
// );

// const SocialIcons = ({ label = "Follow Us:" }: { label?: string }) => (
//   <div className="social-icon d-flex align-items-center">
//     <span>{label}</span>
//     {["facebook-f", "twitter", "linkedin-in", "youtube"].map((icon) => (
//       <a href="#" key={icon}>
//         <i className={`fab fa-${icon}`} />
//       </a>
//     ))}
//   </div>
// );

// const ContactList = ({
//   items,
// }: {
//   items: { icon: string; content: string | React.ReactNode }[];
// }) => (
//   <ul className="contact-list">
//     {items.map((item, i) => (
//       <li key={i}>
//         <i className={item.icon} />
//         {item.content}
//       </li>
//     ))}
//   </ul>
// );

// const Header1 = ({ open }: { open: () => void }) => (
//   <header id="header-sticky" className="header-4">
//     <div className="container">
//       <div className="mega-menu-wrapper">
//         <div className="header-main style-2">
//           <div className="header-left">
//             <div className="logo">
//               <Logo />
//               <Logo className="header-logo-2" logo="Sagorika.png" />
//             </div>
//           </div>
//           <div className="header-right d-flex justify-content-end align-items-center">
//             <div className="mean__menu-wrapper">
//               <Nav />
//             </div>
//             <div className="header__hamburger d-xl-none my-auto">
//               <div className="sidebar__toggle" onClick={open}>
//                 <i className="fas fa-bars" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </header>
// );

// const Header2 = ({ open }: { open: () => void }) => (
//   <Fragment>
//     <div className="header-top-section-3">
//       <div className="container">
//         <div className="header-top-wrapper-2 style-3">
//           <ContactList
//             items={[
//               {
//                 icon: "fal fa-map-marker-alt",
//                 content: "Main Street, Melbourne, Australia",
//               },
//               {
//                 icon: "far fa-envelope",
//                 content: (
//                   <a href="mailto:matin_ssus@yahoo.com" className="link">
//                     matin_ssus@yahoo.com
//                   </a>
//                 ),
//               },
//             ]}
//           />
//           <SocialIcons label="Follow Us On:" />
//         </div>
//       </div>
//     </div>
//     <header id="header-sticky" className="header-3">
//       <div className="container">
//         <div className="mega-menu-wrapper">
//           <div className="header-main style-2">
//             <div className="header-left">
//               <div className="logo">
//                 <Logo logo="Sagorika.png" />
//               </div>
//               <div className="mean__menu-wrapper">
//                 <Nav />
//               </div>
//             </div>
//             <div className="header-right d-flex justify-content-end align-items-center">
//               <div className="author-icon">
//                 <div className="icon">
//                   <i className="fa fa-regular fa-phone" />
//                 </div>
//                 <div className="content">
//                   <span>Call Us Now</span>
//                   <h5>
//                     <a href="tel:+2085550112">+000 (123) 456 88</a>
//                   </h5>
//                 </div>
//               </div>
//               <div className="header-button">
//                 <Link href="causes" className="theme-btn">
//                   Donate Now
//                   <i className="ps-2 far fa-heart" />
//                 </Link>
//               </div>
//               <div className="header__hamburger d-xl-none my-auto">
//                 <div className="sidebar__toggle" onClick={open}>
//                   <i className="fas fa-bars" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   </Fragment>
// );

// const Header3 = ({ open }: { open: () => void }) => {
//   const [toggle, setToggle] = useState(false);
//   return (
//     <Fragment>
//       <SearchPopup open={toggle} close={() => setToggle(false)} />
//       <header className="header-section-1">
//         <div className="header-top-section fix">
//           <div className="container-fluid">
//             <div className="header-top-wrapper style-2">
//               <ContactList
//                 items={[
//                   {
//                     icon: "far fa-envelope",
//                     content: (
//                       <a href="mailto:matin_ssus@yahoo.com" className="link">
//                         matin_ssus@yahoo.com
//                       </a>
//                     ),
//                   },
//                   {
//                     icon: "fa fa-regular fa-phone",
//                     content: <a href="tel:2086660112"> +880-1865-041206</a>,
//                   },
//                 ]}
//               />
//               <div className="top-right">
//                 <SocialIcons />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div id="header-sticky" className="header-1">
//           <div className="main-logo">
//             <Logo />
//           </div>
//           <div className="container-fluid">
//             <div className="mega-menu-wrapper">
//               <div className="header-main">
//                 <div className="logo d-none">
//                   <Logo logo="Sagorika.png" />
//                 </div>
//                 <div className="header-left">
//                   <div className="mean__menu-wrapper">
//                     <Nav />
//                   </div>
//                 </div>
//                 <div className="header-right d-flex justify-content-end align-items-center">
//                   <a
//                     href="#0"
//                     className="search-trigger search-icon"
//                     onClick={() => setToggle(true)}
//                   >
//                     <i className="fa-light fa-magnifying-glass"></i>
//                   </a>
//                   <div className="header-button">
//                     <Link href="/contact" className="theme-btn">
//                       Donate Now
//                       <i className="ps-2 far fa-heart" />
//                     </Link>
//                   </div>
//                   <div className="header__hamburger d-xl-none my-auto">
//                     <div className="sidebar__toggle" onClick={open}>
//                       <i className="fas fa-bars" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </Fragment>
//   );
// };

// const Header4 = ({ open }: { open: () => void }) => {
//   const [toggle, setToggle] = useState(false);
//   return (
//     <Fragment>
//       <SearchPopup open={toggle} close={() => setToggle(false)} />
//       <header className="header-section-2">
//         <div className="header-top-section-2">
//           <div className="container">
//             <div className="header-top-wrapper-2">
//               <ContactList
//                 items={[
//                   {
//                     icon: "fal fa-map-marker-alt",
//                     content: "Main Street, Melbourne, Australia",
//                   },
//                   {
//                     icon: "far fa-envelope",
//                     content: (
//                       <a href="mailto:matin_ssus@yahoo.com" className="link">
//                         matin_ssus@yahoo.com
//                       </a>
//                     ),
//                   },
//                 ]}
//               />
//               <SocialIcons label="Follow Us On:" />
//             </div>
//           </div>
//         </div>
//         <div id="header-sticky" className="header-2">
//           <div className="container">
//             <div className="mega-menu-wrapper">
//               <div className="header-main style-2">
//                 <div className="header-left">
//                   <div className="logo">
//                     <Logo logo="Sagorika.png" />
//                   </div>
//                 </div>
//                 <div className="header-right d-flex justify-content-end align-items-center">
//                   <div className="mean__menu-wrapper">
//                     <Nav />
//                   </div>
//                   <a
//                     href="#0"
//                     className="search-trigger search-icon"
//                     onClick={() => setToggle(true)}
//                   >
//                     <i className="fa-light fa-magnifying-glass"></i>
//                   </a>
//                   <div className="header-button">
//                     <Link href="/contact" className="theme-btn">
//                       Donate Now
//                       <i className="ps-2 far fa-heart" />
//                     </Link>
//                   </div>
//                   <div className="header__hamburger d-xl-none my-auto">
//                     <div className="sidebar__toggle" onClick={open}>
//                       <i className="fas fa-bars" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </Fragment>
//   );
// };

// // ==================== UPDATED NAV WITH ACTIVE STATE ====================
// const Nav = () => {
//   const pathname = usePathname();   // ← Added

//   const isActive = (path: string) => {
//     if (path === "/") return pathname === "/";
//     return pathname?.startsWith(path);
//   };

//   return (
//     <div className="main-menu d-none d-xl-block">
//       <nav id="mobile-menu">
//         <ul>
//           <li className={isActive("/") ? "active" : ""}>
//             <Link href="/">Home</Link>
//           </li>

//           <li className={`has-dropdown ${isActive("/ourfounder") || isActive("/edmessage") || isActive("/vision-mission") || isActive("/background") || isActive("/goal-objectives") ? "active" : ""}`}>
//             <Link href="/">
//               We are Sagarika
//               <i className="fas fa-angle-down" />
//             </Link>
//             <ul className="submenu">
//               <li className={isActive("/ourfounder") ? "active" : ""}>
//                 <Link href="/ourfounder">About Our Founder</Link>
//               </li>
//               <li className={isActive("/edmessage") ? "active" : ""}>
//                 <Link href="/edmessage">Executive Director Message</Link>
//               </li>
//               <li className={isActive("/vision-mission") ? "active" : ""}>
//                 <Link href="/vision-mission">Vision & Mission</Link>
//               </li>
//               <li className={isActive("/background") ? "active" : ""}>
//                 <Link href="/background">Our Background</Link>
//               </li>
//               <li className={isActive("/goal-objectives") ? "active" : ""}>
//                 <Link href="/goal-objectives">Goal & Objectives </Link>
//               </li>
//             </ul>
//           </li>

//           <li className={`has-dropdown ${isActive("/core-programs") || isActive("/project") || isActive("/special-project") ? "active" : ""}`}>
//             <Link href="/">
//               Sagarika's Activities
//               <i className="fas fa-angle-down" />
//             </Link>
//             <ul className="submenu">
//               <li className={isActive("/core-programs") ? "active" : ""}>
//                 <Link href="/core-programs">Core Program</Link>
//               </li>
//               <li className={isActive("/project") ? "active" : ""}>
//                 <Link href="/project">Project</Link>
//               </li>
//               <li className={isActive("/special-project") ? "active" : ""}>
//                 <Link href="/special-project">Special Project</Link>
//               </li>
//             </ul>
//           </li>

//           <li className={`has-dropdown ${isActive("/gallery") || isActive("/video") ? "active" : ""}`}>
//             <Link href="/">
//               Media
//               <i className="fas fa-angle-down" />
//             </Link>
//             <ul className="submenu">
//               <li className={isActive("/gallery") ? "active" : ""}>
//                 <Link href="/gallery">Gallery</Link>
//               </li>
//               <li className={isActive("/video") ? "active" : ""}>
//                 <Link href="/video">Video</Link>
//               </li>
//             </ul>
//           </li>

//           <li className={isActive("/blog") ? "active" : ""}>
//             <Link href="/blog">Blog</Link>
//           </li>

//           <li className={isActive("/publication") ? "active" : ""}>
//             <Link href="/publication">Publication</Link>
//           </li>

//           <li className={isActive("/contact") ? "active" : ""}>
//             <Link href="/contact">Contact</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };
// // =====================================================================

// const SearchPopup = ({ open, close }: { open: boolean; close: () => void }) => (
//   <div className="search-wrap" style={{ display: open ? "block" : "none" }}>
//     <div className="search-inner">
//       <i className="fa fa-light fa-xmark search-close" onClick={close}></i>
//       <div className="search-cell">
//         <form method="get">
//           <div className="search-field-holder">
//             <input
//               type="search"
//               className="main-search-input"
//               placeholder="Search..."
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );

// const MobileMenu = ({ open, close }: { open: boolean; close: () => void }) => (
//   <Fragment>
//     <div className="fix-area">
//       <div className={`offcanvas__info ${open ? "info-open" : ""}`}>
//         <div className="offcanvas__wrapper">
//           <div className="offcanvas__content">
//             <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
//               <div className="offcanvas__logo">
//                 <Logo logo="Sagorika.png" className="" />
//               </div>
//               <div className="offcanvas__close">
//                 <button onClick={close}>
//                   <i className="fas fa-times" />
//                 </button>
//               </div>
//             </div>
//             <p className="text d-none d-xl-block">
//               Nullam dignissim, ante scelerisque the is euismod fermentum odio
//               sem semper the is erat, a feugiat leo urna eget eros. Duis Aenean
//               a imperdiet risus.
//             </p>
//             <MobileNav />
//             <div className="offcanvas__contact">
//               <h4>Contact Info</h4>
//               <ul>
//                 {[
//                   {
//                     icon: "fal fa-map-marker-alt",
//                     link: "#",
//                     text: "Head Office: Vill+Po : Charbata, Upazilla: Subarnachar, Dist: Noakhali.",
//                   },
//                   {
//                     icon: "far fa-phone",
//                     link: "tel:+8801865041206",
//                     text: "+880-1865-041206",
//                   },
//                   {
//                     icon: "fal fa-envelope",
//                     link: "mailto:matin_ssus@yahoo.com",
//                     text: "matin_ssus@yahoo.com",
//                   },
//                   {
//                     icon: "fal fa-clock",
//                     link: "#",
//                     text: "©2026 All Right Reserved By: Sagarika Samaj Unnayan Sangastha.",
//                   },
//                 ].map((item, i) => (
//                   <li key={i} className="d-flex align-items-center">
//                     <div
//                       className={`offcanvas__contact-icon ${
//                         i > 0 ? "mr-15" : ""
//                       }`}
//                     >
//                       <i className={item.icon} />
//                     </div>
//                     <div className="offcanvas__contact-text">
//                       <a
//                         href={item.link}
//                         target={item.link === "#" ? "_blank" : undefined}
//                       >
//                         {item.text}
//                       </a>
//                     </div>
//                   </li>
//                 ))}
//               </ul>

//               <div className="header-button mt-4">
//                 <Link href="/contact" className="theme-btn text-center">
//                   <span>
//                     Get A Quote
//                     <i className="fa-solid fa-arrow-right-long" />
//                   </span>
//                 </Link>
//               </div>

//               <SocialIcons label="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div
//       className={`offcanvas__overlay ${open ? "overlay-open" : ""}`}
//       onClick={close}
//     ></div>
//   </Fragment>
// );

// const MobileNav = () => {
//   const [activeMenu, setActiveMenu] = useState("");

//   const toggleMenu = (menu: string) => {
//     setActiveMenu(activeMenu === menu ? "" : menu);
//   };

//   const showMenu = (menu: string) => ({
//     display: activeMenu === menu ? "block" : "none",
//   });

//   return (
//     <div className="mobile-menu fix mb-3 mean-container">
//       <div className="mean-bar">
//         <nav className="mean-nav">
//           <ul>
//             <li>
//               <Link href="/">Home</Link>
//             </li>

//             {/* We are Sagarika */}
//             <li className="has-dropdown">
//               <Link href="/about">
//                 We are Sagarika
//                 <i className="fas fa-angle-down" />
//               </Link>

//               <ul className="submenu" style={showMenu("sagarika")}>
//                 <li>
//                   <Link href="/ourfounder">About Our Founder</Link>
//                 </li>
//                 <li>
//                   <Link href="/edmessage">Executive Director Message</Link>
//                 </li>
//                 <li>
//                   <Link href="/vision-mission">Vision & Mission</Link>
//                 </li>
//                 <li>
//                   <Link href="/background">Our Background</Link>
//                 </li>
//                 <li>
//                   <Link href="/goal-objectives">Goal & Objectives</Link>
//                 </li>
//               </ul>

//               <a
//                 href="#"
//                 className="mean-expand"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleMenu("sagarika");
//                 }}
//               >
//                 <i className="far fa-plus" />
//               </a>
//             </li>

//             {/* Activities */}
//             <li className="has-dropdown">
//               <Link href="/">
//                 Sagarika's Activities
//                 <i className="fas fa-angle-down" />
//               </Link>

//               <ul className="submenu" style={showMenu("activities")}>
//                 <li>
//                   <Link href="/core-programs">Core Program</Link>
//                 </li>
//                 <li>
//                   <Link href="/project">Project</Link>
//                 </li>
//                 <li>
//                   <Link href="/special-project">Special Project</Link>
//                 </li>
//               </ul>

//               <a
//                 href="#"
//                 className="mean-expand"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleMenu("activities");
//                 }}
//               >
//                 <i className="far fa-plus" />
//               </a>
//             </li>

//             {/* Media */}
//             <li className="has-dropdown">
//               <Link href="/">
//                 Media
//                 <i className="fas fa-angle-down" />
//               </Link>

//               <ul className="submenu" style={showMenu("media")}>
//                 <li>
//                   <Link href="/gallery">Gallery</Link>
//                 </li>
//                 <li>
//                   <Link href="/video">Video</Link>
//                 </li>
//               </ul>

//               <a
//                 href="#"
//                 className="mean-expand"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   toggleMenu("media");
//                 }}
//               >
//                 <i className="far fa-plus" />
//               </a>
//             </li>

//             <li>
//               <Link href="/blog">Blog</Link>
//             </li>

//             <li>
//               <Link href="/publication">Publication</Link>
//             </li>

//             <li className="mean-last">
//               <Link href="/contact">Contact</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };