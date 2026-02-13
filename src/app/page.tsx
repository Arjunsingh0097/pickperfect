import ImageWithBasePath from "@/components/ImageWithBasePath";
import Link from "next/link";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { QuoteModalTrigger } from "@/components/QuoteModalTrigger";
import CityCard from "@/components/CityCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection backgroundColor="#B0D4DB" />

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-20 px-8 py-16 lg:py-24 lg:px-16 xl:px-24"
          style={{ backgroundColor: "#145561" }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl" style={{ color: "#B0D4DB" }}>
                How it works
              </h2>
              <QuoteModalTrigger
                className="inline-flex h-14 shrink-0 items-center justify-center rounded-full px-8 font-medium text-teal-dark transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B0D4DB] focus:ring-offset-2"
                style={{
                  backgroundColor: "#B0D4DB",
                  boxShadow:
                    "0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                Get a free Quote
              </QuoteModalTrigger>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 lg:items-start">
              {/* Left: steps */}
              <div>
              <ol className="space-y-10">
                {[
                  {
                    num: "01",
                    title: "Tell us about your move",
                    description:
                      "Share details about your move, so moving companies clearly understand your requirements before sending quotes.",
                  },
                  {
                    num: "02",
                    title: "Receive quotes from moving companies",
                    description:
                      "Your request is shared with relevant movers who can review your details and send quotes.",
                  },
                  {
                    num: "03",
                    title: "Compare and pick",
                    description:
                      "Review the quotes you receive, compare the details, and choose the option that best suits your move.",
                  },
                  {
                    num: "04",
                    title: "Move with confidence",
                    description:
                      "After comparing your options, choose the mover that best suits your needs, with no obligation to book.",
                  },
                ].map((step) => (
                  <li key={step.num} className="flex gap-6">
                    <span className="text-2xl font-bold text-white lg:text-3xl">
                      {step.num}.
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white lg:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80 lg:text-base">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              </div>
              {/* Right: Overlapping image cards with pill labels */}
              <div className="relative">
              <div className="relative flex flex-col gap-6 lg:block lg:gap-0">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:block">
                  <ImageWithBasePath
                    src="/images/Howitworks(1).png"
                    alt="How it works"
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover object-top sm:h-64 lg:h-80"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-mint px-4 py-1.5 text-sm font-medium text-teal-dark">
                    Compare & Save
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:absolute lg:-bottom-32 lg:-right-16 lg:w-[85%]">
                  <ImageWithBasePath
                    src="/images/Howitworks(2).jpg"
                    alt="How it works"
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover object-top sm:h-64 lg:h-64"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-mint px-4 py-1.5 text-sm font-medium text-teal-dark">
                    No Obligation
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* About Pick Perfect & Partner with Us */}
        <section
          id="about"
          className="relative scroll-mt-20 overflow-hidden bg-white px-8 py-20 lg:py-24 lg:px-16 xl:px-24"
        >
          {/* Diagonal decorative strip */}
          <div
            className="absolute left-0 right-0 top-0 h-16 origin-bottom-left -skew-y-2 bg-mint/40"
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 lg:items-start">
            {/* Left: About Pick Perfect */}
            <div>
              <h2
                className="whitespace-nowrap font-bold"
                style={{
                  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.875rem, 8vw, 60px)",
                  lineHeight: "clamp(1.875rem, 8vw, 60px)",
                  letterSpacing: 0,
                  color: "#0D3842",
                }}
              >
                About Pick Perfect
              </h2>
              <p className="mt-6 text-base leading-relaxed text-teal-dark">
                Pick Perfect helps you compare removalists in one place, making
                the moving process simple and clear.
              </p>
              <p className="mt-4 text-base leading-relaxed text-teal-dark">
                Submit one request, receive multiple quotes, and compare
                services and prices at your own pace.
              </p>
              <div className="mt-10">
                <ImageWithBasePath
                  src="/images/circleimages.png"
                  alt="Pick Perfect community"
                  width={300}
                  height={80}
                  className="h-16 w-auto object-contain object-left sm:h-20"
                />
              </div>
            </div>
            {/* Right: Are you a moving company? */}
            <div className="mt-12 rounded-2xl bg-[#e8edef] p-8 lg:mt-24 lg:p-10">
              <h2 className="text-3xl font-bold text-deep sm:text-4xl lg:text-[2rem]">
                Are you a moving company?
              </h2>
              <p className="mt-6 text-base leading-relaxed text-teal-dark">
                We&apos;ll connect you to potential customers who are moving
                house and help you promote your business.
              </p>
              <Link
                href="#contact"
                className="mt-8 inline-block rounded-full bg-teal-dark px-8 py-4 text-base font-semibold text-white shadow-md transition hover:bg-deep focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-[#e8edef]"
              >
                Join us
              </Link>
            </div>
          </div>
        </section>

        {/* Find your perfect movers - City cards */}
        <section className="relative scroll-mt-20 overflow-hidden bg-teal-dark py-16 lg:py-20">
          <div className="px-8 lg:px-16 xl:px-24">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl" style={{ color: "#B0D4DB" }}>
                    Find your perfect movers
                  </h2>
                  <p className="mt-2 text-lg text-white/80">
                    Compare removalists in Brisbane, Melbourne and Perth
                  </p>
                </div>
                <QuoteModalTrigger
                  className="inline-flex h-14 shrink-0 items-center justify-center rounded-full px-8 font-medium text-teal-dark transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#B0D4DB] focus:ring-offset-2"
                  style={{
                    backgroundColor: "#B0D4DB",
                    boxShadow:
                      "0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Get a free Quote
                </QuoteModalTrigger>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    city: "Brisbane",
                    image: "/images/Brisbane.png",
                    alt: "Brisbane",
                  },
                  {
                    city: "Melbourne",
                    image: "/images/Melbourne.png",
                    alt: "Melbourne",
                  },
                  {
                    city: "Perth",
                    image: "/images/Perth.jpg",
                    alt: "Perth",
                  },
                ].map((card) => (
                  <CityCard
                    key={card.city}
                    city={card.city}
                    image={card.image}
                    alt={card.alt}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's all the fuss about? - Testimonials */}
        <section
          id="testimonials"
          className="scroll-mt-20 px-8 py-16 lg:py-20 lg:px-16 xl:px-24"
          style={{ backgroundColor: "#B0D4DB" }}
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-deep sm:text-4xl lg:text-5xl">
              What&apos;s all the fuss about?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-teal-dark lg:text-lg">
              Every day, thousands of Australians come to Pick Perfect to make connections with the right experts.
            </p>
            <div className="mt-10">
              <TestimonialMarquee />
            </div>
          </div>
        </section>

        {/* Frequently asked questions */}
        <section
          id="faq"
          className="scroll-mt-20 bg-teal-dark px-8 py-16 lg:py-20 lg:px-16 xl:px-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl" style={{ color: "#B0D4DB" }}>
              Frequently asked questions
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
              <div>
                <FAQAccordion />
              </div>
              <div className="relative min-h-[320px] w-full lg:min-h-[480px] lg:pl-4">
                <ImageWithBasePath
                  src="/images/faqsection_photo.png"
                  alt="FAQ section"
                  width={800}
                  height={600}
                  className="absolute inset-0 h-full w-full rounded-r-2xl rounded-bl-2xl object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
