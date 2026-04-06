"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");


useEffect(() => {
  
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navOffset = 80; // height of navbar

  const handleScroll = () => {
    let currentSection = sections[0]?.id ?? "hero";

    for (const section of sections) {
      const rect = section.getBoundingClientRect();

      if (rect.top - navOffset <= 0) {
        currentSection = section.id;
      } else {
        break;
      }
    }

    setActiveSection(currentSection);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const navbarClass =
      activeSection === "hero"
      ? "fixed bg-transparent text-white"
      : activeSection === "section2"
      ? "fixed bg-white/10 backdrop-blur-md text-black"
      : activeSection === "section3"
      ? "fixed bg-white/10 backdrop-blur-md text-white"
      : activeSection === "section4"
      ? "fixed bg-white/10 backdrop-blur-md text-black"
      : activeSection === "career"
      ? "text-black bg-t"
      : "text-slate-900";

  const linkClass = (href: string) => {
    if (pathname === "/") {
      return "";
    }
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));

    return isActive
      ? `relative px-1 py-2 text-sm font-semibold text-slate-900 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-slate-900`
      : `relative px-1 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900`;
  };
  return (
    <nav className={`left-0 top-0 z-50 w-full ${navbarClass}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Mobile navbar */}
        <div className="flex items-center justify-between py-4 md:hidden">
          <Link href="/" className="text-lg font-semibold">
            Trace Labs
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-black" />
              <span className="block h-0.5 w-5 bg-black" />
              <span className="block h-0.5 w-5 bg-black" />
            </div>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/career" className={linkClass("/career")} onClick={() => setMenuOpen(false)}>
                Career
              </Link>
              <Link href="/who-we-are" className={linkClass("/who-we-are")} onClick={() => setMenuOpen(false)}>
                Who We Are
              </Link>
              <Link href="/what-we-do" className={linkClass("/what-we-do")} onClick={() => setMenuOpen(false)}>
                What We Do
              </Link>
              <Link href="/contact-us" className={linkClass("/contact-us")} onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
              <Link href="/about" className={linkClass("/about")} onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link href="/login" className={linkClass("/login")} onClick={() => setMenuOpen(false)}>
                Log In
              </Link>
            </div>
          </div>
        )}

        {/* Desktop navbar */}
        <div className="mx-auto hidden max-w-350 md:grid md:grid-cols-[25%_50%_25%] md:items-center md:py-4">
          <div className="flex justify-start">
            <Link href="/" className="whitespace-nowrap text-xl font-semibold">
              Trace Labs
            </Link>
          </div>
          
          <div className="flex w-full max-w-2xl items-center">
            <Link href="/career" className={`${linkClass("/career")} flex-1 text-center whitespace-nowrap`}>
              Career
            </Link>
            <Link href="/who-we-are" className={`${linkClass("/who-we-are")} flex-1 text-center whitespace-nowrap`}>
              Who We Are
            </Link>
            <Link href="/what-we-do" className={`${linkClass("/what-we-do")} flex-1 text-center whitespace-nowrap`}>
              What We Do
            </Link>
            <Link href="/contact-us" className={`${linkClass("/contact-us")} flex-1 text-center whitespace-nowrap`}>
              Contact Us
            </Link>
            <Link href="/about" className={`${linkClass("/about")} flex-1 text-center whitespace-nowrap`}>
              About
            </Link>
          </div>

          <div className="flex justify-end">
            <Link href="/login" className={`${linkClass("/login")} whitespace-nowrap`}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}