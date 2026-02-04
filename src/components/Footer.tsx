import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-[#e0e5e8] bg-[#f8f9fa]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="Pick Perfect"
              width={180}
              height={46}
              className="h-10 w-auto sm:h-11"
            />
          </Link>
          <p className="max-w-sm text-sm text-teal-dark/90">
            Compare removalist quotes across Brisbane, Melbourne & Perth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm text-teal-dark">
            <Link href="#about" className="transition hover:text-deep">
              About
            </Link>
            <Link href="#faq" className="transition hover:text-deep">
              FAQ
            </Link>
            <a href="mailto:customerservice@pickperfect.com" className="transition hover:text-deep">
              Contact
            </a>
          </div>
          <p className="text-xs text-teal-dark/70">
            © {new Date().getFullYear()} Pick Perfect
          </p>
        </div>
      </div>
    </footer>
  );
}
