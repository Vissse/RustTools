/**
 * Centralized SEO config + helpers.
 *
 * SITE_URL is the one place the production origin is defined. It drives
 * canonical URLs, og:url, the sitemap and robots.txt, so it MUST match the
 * origin the site is actually served from — including the `www.` prefix, since
 * www and apex are different origins to a crawler. Keep it without a trailing
 * slash.
 */
import type { Metadata } from "next";

export const SITE_URL = "https://www.rust-tools.eu";

export const SITE_NAME = "RustTools";

/**
 * Default share image: the 1200×630 PNG rendered by app/opengraph-image.tsx.
 *
 * Next only wires that file convention into the segment it lives in (verified
 * in the build output — nested routes got no og:image at all), so every route's
 * metadata points at the root route explicitly.
 *
 * `?v=` is a manual cache buster. Scrapers cache share images aggressively;
 * bump it whenever opengraph-image.tsx changes or Discord and X will keep
 * serving the old card.
 *
 * (The previous default was an SVG. Discord, X, Facebook and Slack all refuse
 * to render SVG, so every share produced a blank preview.)
 */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image?v=1`;

type SeoInput = {
  /** Page title, shown as-is. Brand suffix is appended automatically. */
  title: string;
  description: string;
  /** Route path, e.g. "/recycling". Used for canonical + og:url. */
  path: string;
  image?: string;
  /** Defaults to "website". */
  type?: "website" | "article";
  /** Set false for thin/placeholder pages that shouldn't be in the index. */
  index?: boolean;
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
  index = true,
}: SeoInput): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
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
 * Every crawlable route, with sitemap priority and how often the page's content
 * realistically changes. Single source of truth for sitemap.xml.
 *
 * Pages deliberately absent: the three placeholder guides (noindex until they
 * have content), /privacy, /contact and /changelog (no search intent), and
 * /app. A sitemap listing pages you don't want ranked wastes crawl budget.
 */
export const ROUTES: {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/calculators", priority: 0.9, changeFrequency: "weekly" },
  { path: "/raid", priority: 0.9, changeFrequency: "weekly" },
  { path: "/recycling", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cupboard", priority: 0.8, changeFrequency: "monthly" },
  { path: "/furnace", priority: 0.8, changeFrequency: "monthly" },
  { path: "/decay", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shops", priority: 0.8, changeFrequency: "monthly" },
  { path: "/genetics", priority: 0.7, changeFrequency: "monthly" },
  { path: "/salvaging", priority: 0.7, changeFrequency: "monthly" },
  { path: "/skinning", priority: 0.7, changeFrequency: "monthly" },
  { path: "/giant-excavator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.8, changeFrequency: "weekly" },
  { path: "/guides/farming", priority: 0.7, changeFrequency: "monthly" },
];

/** schema.org structured data describing the site, rendered in the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    description:
      "Free calculators and guides for the survival game Rust: raid cost, recycler yields, base upkeep, smelting, decay, genetics and more.",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/** Organization node, referenced by the WebSite and per-page nodes. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/filled_icon.png`,
  };
}

/**
 * Breadcrumb trail for a page. The calculators and guides already render a
 * visible breadcrumb; this exposes the same trail to Google, which uses it to
 * replace the raw URL in the result snippet.
 *
 * `trail` excludes Home (added here) and includes the current page last.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/**
 * A single calculator, described as a free web application. This is what makes
 * a tool eligible for the richer "free / web-based" treatment on queries like
 * "rust raid calculator" rather than being read as a generic article.
 */
export function calculatorJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_URL}${path}#app`,
    name,
    description,
    url: `${SITE_URL}${path}`,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: { "@type": "VideoGame", name: "Rust" },
  };
}

/**
 * The full structured-data set for a calculator route: the breadcrumb trail
 * that matches the visible one in CalcShell, plus the WebApplication node.
 *
 * Deliberately no FAQPage — schema is only emitted for content a visitor can
 * actually see on the page, and the calculators carry no FAQ copy.
 */
export function calculatorPageJsonLd({
  name,
  path,
  crumb,
  description,
}: {
  name: string;
  path: string;
  crumb: string;
  description: string;
}) {
  return [
    breadcrumbJsonLd([
      { name: "Calculators", path: "/calculators" },
      { name: crumb, path },
    ]),
    calculatorJsonLd({ name, description, path }),
  ];
}
