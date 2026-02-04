import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const BASE = process.cwd();
const SEO_PATH = path.join(BASE, "data", "seo.json");

export type SeoConfig = {
  title: string;
  metaDescription: string;
  slug: string;
  jsonLdSchema: string;
};

const defaults: SeoConfig = {
  title: "Compare removalists and request moving quotes | Pick Perfect",
  metaDescription:
    "Request moving quotes from multiple local and interstate removalists. Compare and choose the right one with Pick Perfect, simple and free.",
  slug: "compare-quotes",
  jsonLdSchema: JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://pickperfect.com.au/#website",
        url: "https://pickperfect.com.au",
        name: "Pick Perfect",
        description:
          "Compare removalists in Brisbane, Melbourne, and Perth. Request quotes from 5+ moving companies. Simple and stress-free.",
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
  }),
};

export async function getSeoConfig(): Promise<SeoConfig> {
  try {
    const raw = await readFile(SEO_PATH, "utf8");
    const data = JSON.parse(raw) as Partial<SeoConfig>;
    return {
      title: data.title ?? defaults.title,
      metaDescription: data.metaDescription ?? defaults.metaDescription,
      slug: data.slug ?? defaults.slug,
      jsonLdSchema: data.jsonLdSchema ?? defaults.jsonLdSchema,
    };
  } catch {
    return { ...defaults };
  }
}

export async function setSeoConfig(config: Partial<SeoConfig>): Promise<SeoConfig> {
  const current = await getSeoConfig();
  const next: SeoConfig = {
    title: config.title ?? current.title,
    metaDescription: config.metaDescription ?? current.metaDescription,
    slug: config.slug ?? current.slug,
    jsonLdSchema: config.jsonLdSchema ?? current.jsonLdSchema,
  };
  await mkdir(path.dirname(SEO_PATH), { recursive: true });
  await writeFile(SEO_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}
