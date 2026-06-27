/**
 * Centralized SEO config + helper.
 *
 * Change SITE_URL in this one place once the production domain is decided.
 * It is used for canonical URLs, og:url, the sitemap and robots.txt.
 * Keep it without a trailing slash.
 */
import type { Metadata } from "next";

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
  type?: "website" | "article";
};

/**
 * Builds a Next.js `Metadata` object for a route's `metadata` export, with the
 * brand-suffixed title, description, canonical, and Open Graph / Twitter cards.
 * Returns absolute canonical/og URLs derived from SITE_URL.
 */
export function seoMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: SeoInput): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
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

/** schema.org structured data describing the app, rendered in the root layout. */
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
