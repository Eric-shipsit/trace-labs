"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

type NavbarProps = {
  variant?: "light" | "dark";
  className?: string;
};
export default function Navbar({
  variant = "light",
  className = "",
}: NavbarProps) {
  const isDark = variant === "dark";
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { data: session } = useSession();
  const isAdmin = session?.user?.admin === true;

  const logoText = "text-current";
  useEffect(() => {
    
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const navOffset = 80; // height of navbar

    const handleScroll = () => {
      let currentSection = sections[0]?.id ?? "none";

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top - navOffset <= 0) {
          currentSection = section.id;
        } else {
          break;
        }
      }
      console.log("Current section:", currentSection);
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass =
      activeSection === "hero"
      ? "fixed bg-white/10 backdrop-blur-md lg:bg-transparent text-white"
      : activeSection === "section2"
      ? "fixed bg-white/10 backdrop-blur-md text-black"
      : activeSection === "section3"
      ? "fixed bg-white/10 backdrop-blur-md text-white"
      : activeSection === "section4"
      ? "fixed bg-white/10 backdrop-blur-md text-black"
      : activeSection === "career"
      ? "text-black bg-transparent"
      : activeSection === "whoweare"
      ? "absolute left-0 top-0 z-50 w-full bg-transparent text-white"
      : "text-slate-900";

    const linkClass = (href: string) => {
      const activeText = "text-current";
      const inactiveText = "text-current opacity-80 hover:opacity-100";
      if (pathname === "/") {
        return `relative px-1 py-2 text-sm font-medium ${inactiveText}`;
      }

      const isActive =
        pathname === href || (href !== "/" && pathname.startsWith(href));

      return isActive
        ? `relative px-1 py-2 text-sm font-semibold ${activeText} after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:rounded-full ${
            isDark ? "after:bg-white" : "after:bg-slate-900"
          }`
        : `relative px-1 py-2 text-sm font-medium ${inactiveText} transition`;
    };
  return (
    <nav className={`left-0 top-0 z-50 w-full ${navbarClass} ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Mobile navbar */}
        <div className="flex items-center justify-between py-4 lg:hidden">
          <Link href="/" className={`text-lg font-semibold ${logoText}`}>
            Trace Labs
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="border-t border-gray-200 py-4 lg:hidden">
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
              {isAdmin && (
                <Link
                  href="/admin"
                  className={linkClass("/admin")}
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              {session ? (
                <Link
                  href="/"
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className={linkClass("/login")}
                >
                  Log Out
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={linkClass("/login")}
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Desktop navbar */}
        <div className="mx-auto hidden max-w-350 lg:grid lg:grid-cols-[25%_50%_25%] lg:items-center md:py-4">
          <div className="flex justify-start">
            <Link href="/" className={`whitespace-nowrap text-xl font-semibold ${logoText}`}>
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
          </div>
          <div className="flex justify-end gap-4">
            {isAdmin && (
              <Link href="/admin" className={`${linkClass("/admin")} whitespace-nowrap`}>
                Admin
              </Link>
            )}

            {session ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className={`${linkClass("/login")} whitespace-nowrap`}
              >
                Log Out
              </button>
            ) : (
              <Link href="/login" className={`${linkClass("/login")} whitespace-nowrap`}>
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}