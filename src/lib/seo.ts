/**
 * Centralized SEO config + helper.
 *
 * Change SITE_URL in this one place once the production domain is decided.
 * It is used for canonical URLs, og:url, the sitemap and robots.txt.
 * Keep it without a trailing slash.
 */
export const SITE_URL = "https://rust-tools.com";

export const SITE_NAME = "RustTools";

/** Default social-share image. Replace with a 1200×630 PNG for best results
 *  (most social/chat scrapers — Discord, X, Facebook — don't render SVG). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/icon.svg`;

type SeoInput = {
  /** Page title, shown as-is. Brand suffix is appended automatically. */
  title: string;
  description: string;
  /** Route path, e.g. "/recycling". Used for canonical + og:url. */
  path: string;
  image?: string;
  /** Defaults to "website". */
  type?: string;
};

type MetaDescriptor =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string };

/**
 * Builds the `meta` + `links` arrays for a TanStack Router route `head`.
 * Returns absolute canonical/og URLs derived from SITE_URL.
 */
export function seo({ title, description, path, image, type = "website" }: SeoInput): {
  meta: MetaDescriptor[];
  links: { rel: string; href: string }[];
} {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },

      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: ogImage },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/**
 * Every crawlable route, with sitemap priority. Single source of truth for
 * the generated sitemap.xml — keep in sync when adding a page.
 */
export const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/recycling", priority: 0.9 },
  { path: "/cupboard", priority: 0.9 },
  { path: "/decay", priority: 0.8 },
  { path: "/furnace", priority: 0.8 },
  { path: "/genetics", priority: 0.7 },
  { path: "/giant-excavator", priority: 0.7 },
];

/** schema.org structured data describing the app, injected into index.html. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    description:
      "Free calculators for the survival game Rust: raid cost, recycler yields, base upkeep, smelting, decay, genetics and more.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
