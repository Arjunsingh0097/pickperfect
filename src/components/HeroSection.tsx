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
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[60%_40%] xl:gap-x-24">
            {/* Left: heading + copy */}
            <div className="order-1 space-y-6 font-sans w-full max-w-[636px]">
              <h1 className="text-deep" style={HERO_HEADING_STYLE}>
                {hero.title ?? defaults.title}
                <br />
                {hero.subtitle ?? defaults.subtitle}{" "}
                <span className="text-teal whitespace-nowrap">{hero.brandText ?? defaults.brandText}</span>
              </h1>
              <p
                className="text-lg leading-relaxed lg:text-xl"
                style={{ color: "#0D3842", fontWeight: 500, fontSize: "20px", lineHeight: "32px" }}
              >
                {hero.highlightText ?? defaults.highlightText}
              </p>
            </div>
            {/* Right: quote form */}
            <div className="order-2 flex justify-start lg:block">
              <HeroQuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
