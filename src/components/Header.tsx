import ImageWithBasePath from "@/components/ImageWithBasePath";
import Link from "next/link";
import { QuoteModalTrigger } from "@/components/QuoteModalTrigger";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#about", label: "About us" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <ImageWithBasePath
            src="/images/logo.png"
            alt="Pick Perfect"
            width={280}
            height={72}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium text-teal-dark transition hover:text-deep ${
                link.label === "Home"
                  ? "text-deep after:absolute after:bottom-[-4px] after:left-1/2 after:h-[2px] after:w-5 after:-translate-x-1/2 after:bg-deep"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <QuoteModalTrigger className="rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-teal-dark focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2">
          Get a Quote
        </QuoteModalTrigger>
      </div>
    </header>
  );
}
