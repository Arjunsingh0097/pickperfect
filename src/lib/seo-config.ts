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
  title: "Compare Removalist Quotes | Pick Perfect",
  metaDescription:
    "Submit one request and receive multiple removalist quotes across Brisbane, Melbourne, and Perth. Compare options and choose with confidence.",
  slug: "compare-quotes",
  jsonLdSchema: JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.pickperfect.com/#website",
        url: "https://www.pickperfect.com",
        name: "Pick Perfect",
        description:
          "Compare removalist quotes across Brisbane, Melbourne, and Perth. Submit one request and receive multiple quotes.",
        publisher: { "@id": "https://www.pickperfect.com/#organization" },
        inLanguage: "en-AU",
      },
      {
        "@type": "Organization",
        "@id": "https://www.pickperfect.com/#organization",
        name: "Pick Perfect",
        url: "https://www.pickperfect.com",
        logo: "https://www.pickperfect.com/images/logo.png",
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
