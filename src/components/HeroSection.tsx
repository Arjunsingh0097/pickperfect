import HeroQuoteForm from "@/components/HeroQuoteForm";

const HERO_HEADING_STYLE = {
  fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
  fontWeight: 800,
  fontSize: "clamp(2rem, 5vw, 56px)",
  lineHeight: "1.2",
  letterSpacing: "-1px",
};

type HeroSectionProps = {
  data?: {
    title?: string;
    subtitle?: string;
    brandText?: string;
    highlightText?: string;
    infoBox?: string;
  };
  /** Solid background color (e.g. #B0D4DB). When set, no background image is used. */
  backgroundColor?: string | null;
};

const defaults = {
  title: "Compare removalist",
  subtitle: "quotes with",
  brandText: "Pick Perfect",
  highlightText:
    "Submit your move details once and receive multiple quotes from moving companies in Brisbane, Melbourne, and Perth. Compare your options at your own pace. No hassle, no chasing calls.",
  infoBox:
    "Compare moving quotes at your own pace.\nNo hassle, no chasing calls.",
};

export default function HeroSection({ data, backgroundColor = "#B0D4DB" }: HeroSectionProps) {
  const hero = data ?? {};
  const bg = backgroundColor ?? "#B0D4DB";

  return (
    <section
      id="home"
      className="relative flex min-h-[600px] w-full flex-col lg:min-h-[700px] scroll-mt-20"
      style={{ backgroundColor: bg }}
    >
      <div className="relative z-10 flex flex-1 items-center w-full">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[40%_60%] xl:gap-x-24">
            {/* Left: quote form */}
            <div className="order-2 lg:order-1 flex justify-start lg:block">
              <HeroQuoteForm />
            </div>
            {/* Right: heading + copy + info box */}
            <div className="order-1 lg:order-2 space-y-6 font-sans w-full max-w-[636px] lg:justify-self-end">
              <h1
                className="text-deep"
                style={HERO_HEADING_STYLE}
              >
                <span className="inline">{hero.title ?? defaults.title}</span>
                <br />
                <span className="inline">
                  <span className="text-deep">{hero.subtitle ?? defaults.subtitle}</span>{" "}
                  <span className="text-teal">{hero.brandText ?? defaults.brandText}</span>
                </span>
              </h1>
              <p
                className="text-lg leading-relaxed lg:text-xl"
                style={{ color: "#0D3842", fontWeight: 500, fontSize: "20px", lineHeight: "32px" }}
              >
                {hero.highlightText ?? defaults.highlightText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
