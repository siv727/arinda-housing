import { useState, useEffect } from "react";

const Navbar = ({ userType }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll animation
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setOpen(false); // close mobile menu after click
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 border-b transition-all ${
        scrolled
          ? "border-[#EAD1C7] bg-white/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <a
            href="/landing"
            className="logo font-bold text-xl text-[#F35E27] cursor-pointer hover:opacity-80 transition-opacity"
          >
            Arinda
          </a>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center space-x-12 text-sm">
          <li>
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="hover:text-[#F35E27] transition-colors"
            >
              <i className="fa-regular fa-house pr-2"></i>Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, "#about")}
              className="hover:text-[#F35E27] transition-colors"
            >
              <i className="fa-regular fa-lightbulb pr-2"></i>About
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
              className="hover:text-[#F35E27] transition-colors"
            >
              <i className="fa-regular fa-list-ol pr-2"></i>How It Works
            </a>
          </li>
          <li>
            <a
              href="#download-app"
              onClick={(e) => handleSmoothScroll(e, "#download-app")}
              className="hover:text-[#F35E27] transition-colors"
            >
              <i className="fa-regular fa-mobile pr-2"></i>Download App
            </a>
          </li>
        </ul>

        <div className="hidden md:block">
          {userType === "tenant" ? (
            <a
              href="/tenant/login"
              className="font-semibold bg-gradient-to-r text-white p-3 rounded-full px-6 from-[#F35E27]  to-[#ff8f4e] hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
          ) : (
            <a
              href="/landlord/login"
              className="font-semibold bg-gradient-to-r text-white p-3 rounded-full px-6 from-[#F35E27] to-[#ff8f4e] hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F35E27]"
          >
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`${
          open ? "block" : "hidden"
        } md:hidden bg-white/30 backdrop-blur-md border-b border-t border-black`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="block hover:text-[#F35E27] transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "#about")}
            className="block hover:text-[#F35E27] transition-colors"
          >
            About
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, "#how-it-works")}
            className="block hover:text-[#F35E27] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#download-app"
            onClick={(e) => handleSmoothScroll(e, "#download-app")}
            className="block hover:text-[#F35E27] transition-colors"
          >
            Download App
          </a>
          <a
            href={userType === "tenant" ? "/tenant/login" : "/landlord/login"}
            className="inline-block font-semibold bg-gradient-to-r text-white p-3 rounded-full px-6 from-[#F35E27] to-[#ff8f4e] hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
