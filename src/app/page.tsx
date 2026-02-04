import Image from "next/image";
import Link from "next/link";
import { Home as HomeIcon } from "lucide-react";
import Header from "@/components/Header";
import FAQAccordion from "@/components/FAQAccordion";
import Footer from "@/components/Footer";
import HeroQuoteForm from "@/components/HeroQuoteForm";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import { QuoteModalTrigger } from "@/components/QuoteModalTrigger";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Mint band separator (from design) */}
      <div className="h-2 w-full bg-mint" aria-hidden />

      <main>
        {/* Hero */}
        <section
          id="home"
          className="bg-[#e0ebf0] px-8 py-16 lg:py-24 lg:px-16 xl:px-24"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-5 lg:gap-20">
            {/* Content first on mobile, right column on desktop */}
            <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-3">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-deep sm:text-4xl lg:text-5xl">
                Compare removalist quotes with{" "}
                <span className="text-[#6dc1d2]">Pick Perfect</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-teal-dark lg:text-lg">
                Submit your move details once and receive multiple quotes from
                moving companies in Brisbane, Melbourne, and Perth. Compare your
                options at your own pace. No hassle, no chasing calls.
              </p>
              <div className="mt-10 hidden items-start gap-4 rounded-2xl bg-white p-6 shadow-md lg:flex">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint/40 text-teal">
                  <HomeIcon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <p className="text-2xl font-bold text-teal-dark">100,000 People</p>
                  <p className="mt-1 text-sm text-teal-dark/90">
                    We have helped more than 100,000 people to find the best
                    price on removals this year
                  </p>
                </div>
              </div>
            </div>
            {/* Form second on mobile, left column on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              <HeroQuoteForm />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="scroll-mt-20 bg-teal-dark px-8 py-16 lg:py-24 lg:px-16 xl:px-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                How it works
              </h2>
              <QuoteModalTrigger className="inline-flex shrink-0 items-center justify-center rounded-xl bg-mint px-6 py-3 text-sm font-medium text-teal-dark transition hover:bg-mint/90 focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-teal-dark">
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
                      "Share details about your move, including where you're moving from and to, the property type, and your preferred moving date. This helps moving companies understand your requirements before providing quotes.",
                  },
                  {
                    num: "02",
                    title: "Receive quotes from moving companies",
                    description:
                      "Once you submit your request, it's shared with up to three removalists that service your area and move type. They will contact you directly with quotes based on the details you provided.",
                  },
                  {
                    num: "03",
                    title: "Compare and pick",
                    description:
                      "Review the quotes you receive and compare key details such as truck size, number of movers, call-out fees, hourly rates, and estimated timeframes. This helps you choose the option that works best for your move.",
                  },
                  {
                    num: "04",
                    title: "Move with confidence",
                    description:
                      "After comparing your options, pick the mover that suits your needs. There's no obligation to book, and you stay in control of the decision.",
                  },
                ].map((step) => (
                  <li key={step.num} className="flex gap-6">
                    <span className="text-2xl font-bold text-mint lg:text-3xl">
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
                  <Image
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
                <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:absolute lg:-bottom-48 lg:-right-16 lg:w-[85%]">
                  <Image
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
              <h2 className="text-3xl font-bold text-deep sm:text-4xl lg:text-[2rem]">
                About Pick Perfect
              </h2>
              <p className="mt-6 text-base leading-relaxed text-teal-dark">
                Pick Perfect is a comparison platform designed to simplify the
                moving process. We connect you with multiple removalists, helping
                you get clear quotes and understand your options, all in one
                place.
              </p>
              <p className="mt-4 text-base leading-relaxed text-teal-dark">
                Instead of spending hours contacting movers individually, you
                submit one request and receive quotes that make comparing
                services, prices, and availability straightforward. This helps
                you make a confident, informed decision with peace of mind.
              </p>
              {/* Overlapping profile circles */}
              <div className="mt-10 flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Image
                    key={i}
                    src={`https://i.pravatar.cc/112?img=${10 + i}`}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover shadow-md"
                    aria-hidden
                  />
                ))}
              </div>
            </div>
            {/* Right: Are you a moving company? */}
            <div className="rounded-2xl bg-[#e8edef] p-8 lg:p-10">
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
                  <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    Find your perfect movers
                  </h2>
                  <p className="mt-2 text-lg text-white/80">
                    Compare removalists in Brisbane, Melbourne, and Perth
                  </p>
                </div>
                <QuoteModalTrigger className="inline-flex shrink-0 items-center justify-center rounded-full bg-mint px-8 py-4 text-base font-semibold text-teal-dark transition hover:bg-mint/90 focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-teal-dark">
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
                  <a
                    key={card.city}
                    href="#contact"
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-2 focus:ring-offset-teal-dark"
                  >
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                      <span className="absolute bottom-4 left-4 rounded-lg bg-white/95 px-4 py-2.5 text-lg font-bold text-deep shadow-md backdrop-blur-sm">
                        {card.city}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's all the fuss about? - Testimonials */}
        <section
          id="testimonials"
          className="scroll-mt-20 bg-[#e8edef] px-8 py-16 lg:py-20 lg:px-16 xl:px-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-deep sm:text-4xl lg:text-5xl">
              What&apos;s all the fuss about?
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-teal-dark">
              Every day, thousands of Australians come to Pick Perfect to make
              connections with the right experts.
            </p>
            <TestimonialMarquee />
          </div>
        </section>

        {/* Frequently asked questions */}
        <section
          id="faq"
          className="scroll-mt-20 bg-teal-dark px-8 py-16 lg:py-20 lg:px-16 xl:px-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Frequently asked questions
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
              <div>
                <FAQAccordion />
              </div>
              <div className="relative min-h-[320px] w-full lg:min-h-[480px] lg:pl-4">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Interior with moving boxes and furniture"
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
