"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/about", label: "O nama" },
  { href: "/doctors", label: "Lekari" },
  { href: "/appointments", label: "Zakazivanje" },
  { href: "/contact", label: "Kontakt" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (val) => {
    const next = typeof val === "boolean" ? val : !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="relative flex items-center justify-between w-full">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 shrink-0"
        onClick={() => toggleMenu(false)}
      >
        <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
        <span className="text-xl font-extrabold text-blue-700 tracking-tight">
          Medi<span className="text-cyan-500">Time</span>
        </span>
      </Link>

      {/* Desktop linkovi */}
      <ul className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                isActive(link.href)
                  ? "text-blue-700"
                  : "text-slate-600 hover:text-blue-700"
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-blue-700 rounded-full transition-all duration-200 ${
                isActive(link.href) ? "w-4" : "w-0 group-hover:w-4"
              }`} />
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop akcije */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/admin/login"
          className="px-4 py-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-700 transition-colors"
        >
          Admin
        </Link>
      </div>

      {/* Hamburger dugme — mobile */}
      <button
        onClick={() => toggleMenu()}
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
        aria-label="Otvori meni"
      >
        {menuOpen ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Mobilni meni */}
      {menuOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen min-h-screen md:hidden z-50 bg-white shadow-xl border-t border-slate-100 flex flex-col">
          <div className="max-w-7xl mx-auto w-full px-4 pt-3 pb-6 flex flex-col gap-1">

              {/* Linkovi */}
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => toggleMenu(false)}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-blue-700 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive(link.href) ? (
                    <svg className="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </Link>
              ))}

              {/* Separator + Admin */}
              <div className="mt-3 pt-4 border-t border-slate-100 flex items-center justify-between px-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-slate-400">Pon–Pet 08–20h</span>
                  <a href="tel:+38111000000" className="text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors">
                    +381 11 000 000
                  </a>
                </div>
                <Link
                  href="/admin/login"
                  onClick={() => toggleMenu(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-500 border border-slate-200 rounded-full hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  Admin
                </Link>
              </div>
            </div>
        </div>
      )}
    </nav>
  );
}
