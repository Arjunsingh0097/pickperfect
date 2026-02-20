import ImageWithBasePath from "@/components/ImageWithBasePath";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-[#e0e5e8] bg-[#f8f9fa] px-12 py-8 lg:px-24 xl:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8">
          <Link href="/" className="shrink-0 pr-6">
            <ImageWithBasePath
              src="/images/mainlogo_company.png"
              alt="Pick Perfect"
              width={180}
              height={46}
              className="h-12 w-auto sm:h-14"
            />
          </Link>
          <span className="h-4 w-px bg-teal-dark/30 shrink-0" aria-hidden />
          <p className="text-sm text-teal-dark/90 min-w-0">
            Compare removalist quotes across Brisbane, Melbourne & Perth.
          </p>
          <span className="hidden sm:block h-4 w-px bg-teal-dark/30 shrink-0" aria-hidden />
          <nav className="flex items-center gap-x-6 text-sm text-teal-dark" aria-label="Footer">
            <Link href="#about" className="transition hover:text-deep whitespace-nowrap">
              About
            </Link>
            <Link href="#faq" className="transition hover:text-deep whitespace-nowrap">
              FAQ
            </Link>
            <Link href="#how-it-works" className="transition hover:text-deep whitespace-nowrap">
              How it works
            </Link>
          </nav>
          <span className="hidden sm:block h-4 w-px bg-teal-dark/30 shrink-0" aria-hidden />
          <p className="text-xs text-teal-dark/70 whitespace-nowrap">
            © {new Date().getFullYear()} Pick Perfect
          </p>
        </div>
      </div>
    </footer>
  );
}
