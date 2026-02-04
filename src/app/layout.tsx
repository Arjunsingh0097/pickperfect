import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { QuoteModalProvider } from "@/components/QuoteModalProvider";
import { getSeoConfig } from "@/lib/seo-config";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://pickperfect.com.au";

// Re-read SEO config on every request so dashboard changes appear on the landing page
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoConfig();
  const pathSegment = seo.slug ? `/${seo.slug}` : "/compare-quotes";
  const canonical = `${BASE_URL}${pathSegment}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: seo.title,
    description: seo.metaDescription,
    keywords: [
      "removalist quotes",
      "compare movers",
      "Pick Perfect",
      "moving companies Brisbane",
      "moving companies Melbourne",
      "moving companies Perth",
    ],
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.metaDescription,
      url: canonical,
      siteName: "Pick Perfect",
      type: "website",
      locale: "en_AU",
      images: [
        {
          url: `${BASE_URL}/social/og.jpg`,
          width: 1200,
          height: 630,
          alt: "Customers comparing removalist quotes on Pick Perfect",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.metaDescription,
      images: [`${BASE_URL}/social/og.jpg`],
      site: "@pickperfect",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export const viewport = {
  themeColor: "#145561",
};

function parseJsonLdSchema(raw: string): object {
  const trimmed = raw.trim();
  if (!trimmed) return {};
  try {
    return JSON.parse(trimmed) as object;
  } catch {
    return {};
  }
}

const defaultJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pickperfect.com.au/#website",
      url: "https://pickperfect.com.au",
      name: "Pick Perfect",
      description:
        "Compare removalists in Brisbane, Melbourne and Perth. Request quotes from 5+ moving companies. Simple and stress-free.",
      publisher: { "@id": "https://pickperfect.com.au/#organization" },
      inLanguage: "en-AU",
    },
    {
      "@type": "Organization",
      "@id": "https://pickperfect.com.au/#organization",
      name: "Pick Perfect",
      url: "https://pickperfect.com.au",
      logo: "https://pickperfect.com.au/images/logo.png",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seo = await getSeoConfig();
  const jsonLd = parseJsonLdSchema(seo.jsonLdSchema);
  const scriptContent =
    Object.keys(jsonLd).length > 0 ? JSON.stringify(jsonLd) : JSON.stringify(defaultJsonLd);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: scriptContent }}
        />
      </head>
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <QuoteModalProvider>{children}</QuoteModalProvider>
      </body>
    </html>
  );
}
