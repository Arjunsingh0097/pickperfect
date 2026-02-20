"use client";

import { useState } from "react";
import Link from "next/link";
import ImageWithBasePath from "@/components/ImageWithBasePath";
import { QuoteModalTrigger } from "@/components/QuoteModalTrigger";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About us" },
  { href: "#faq", label: "FAQ" },
  { href: "#how-it-works", label: "How it works" },
];

// Nav link style: 18px, weight 400, line-height 27px, letter-spacing 0.2px, color #0D3842
const navLinkClass =
  "text-deep font-normal text-lg leading-[27px] tracking-[0.2px] transition hover:text-teal-dark";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white px-6"
      style={{
        height: 109,
        borderBottom: "1px solid rgba(191, 219, 247, 0.3)",
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between md:grid md:grid-cols-3 md:justify-between">
        {/* Logo - left */}
        <Link href="/" className="flex h-full shrink-0 items-center no-underline outline-none focus:outline-none focus:ring-0">
          <ImageWithBasePath
            src="/images/latestlogo.png"
            alt="Pick Perfect"
            width={280}
            height={72}
            priority
            className="h-16 w-auto max-h-full border-0 sm:h-20"
          />
        </Link>

        {/* Desktop nav - center */}
        <nav className="hidden justify-center md:flex" aria-label="Main">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={navLinkClass}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop CTA + Mobile menu button - right */}
        <div className="flex shrink-0 justify-end">
          <QuoteModalTrigger
            className="hidden md:inline-flex h-14 items-center justify-center rounded-full px-6 font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#145561] focus:ring-offset-2"
            style={{
              backgroundColor: "#145561",
              boxShadow:
                "0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          >
            Get a quote
          </QuoteModalTrigger>
          <button
            type="button"
            className="text-2xl text-deep md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col gap-0 px-6 py-6" aria-label="Main">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 ${navLinkClass}`}
              >
                {link.label}
              </a>
            ))}
            <QuoteModalTrigger
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex h-14 items-center justify-center rounded-full px-6 font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#145561] focus:ring-offset-2"
              style={{
                backgroundColor: "#145561",
                boxShadow:
                  "0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              Get a quote
            </QuoteModalTrigger>
          </nav>
        </div>
      )}
    </header>
  );
}
