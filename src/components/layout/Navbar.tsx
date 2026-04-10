"use client";

import { useState, useEffect } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import clsx from "clsx";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Experience", href: "experience" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-navy-mid/95 backdrop-blur-md shadow-lg shadow-black/30"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-[70px] flex items-center justify-between">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className={clsx(
                    "text-sm font-medium uppercase tracking-widest transition-colors duration-200 pb-1 border-b-2",
                    active === href
                      ? "text-orange border-orange"
                      : "text-white/80 border-transparent hover:text-orange hover:border-orange/50"
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="text-2xl font-bold text-white tracking-wider hover:text-orange transition-colors"
          >
            A<span className="text-orange">.</span>AM
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={clsx(
            "absolute top-0 left-0 h-full w-64 bg-navy-mid flex flex-col pt-[90px] px-8 gap-6 shadow-2xl transition-transform duration-300",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={clsx(
                "text-left text-base font-medium uppercase tracking-widest transition-colors",
                active === href ? "text-orange" : "text-white/80 hover:text-orange"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
