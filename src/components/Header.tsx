"use client";

import { useState } from "react";
import Link from "next/link";
import ImageWithBasePath from "@/components/ImageWithBasePath";
import { QuoteModalTrigger } from "@/components/QuoteModalTrigger";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About us" },
  { href: "#how-it-works", label: "How it works" },
];

// Nav link style: 18px, weight 400, line-height 27px, letter-spacing 0.2px, color #0D3842
const navLinkClass =
  "text-deep font-normal text-lg leading-[27px] tracking-[0.2px] transition hover:text-teal-dark";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white px-6 shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        {/* Logo - larger logo, header height fixed at h-16 */}
        <Link href="/" className="flex h-full items-center no-underline outline-none focus:outline-none focus:ring-0">
          <ImageWithBasePath
            src="/images/logo_main.png"
            alt="Pick Perfect"
            width={280}
            height={72}
            priority
            className="h-12 w-auto max-h-full sm:h-14"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={navLinkClass}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <QuoteModalTrigger className="hidden md:inline-flex rounded-full bg-deep px-6 py-2.5 font-medium text-white transition hover:bg-teal-dark focus:outline-none focus:ring-2 focus:ring-deep focus:ring-offset-2">
          Get a Quote
        </QuoteModalTrigger>

        {/* Mobile menu button */}
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
              className="mt-4 inline-flex justify-center rounded-full bg-deep px-6 py-3 font-medium text-white"
            >
              Get a Quote
            </QuoteModalTrigger>
          </nav>
        </div>
      )}
    </header>
  );
}
