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
 * The date the game data on this site was last checked against Rust.
 *
 * Answer engines weight recency heavily for game data, because a balance patch
 * invalidates every number on the page. This is the one place that date is
 * written: it drives the visible "verified" line under each tool, `dateModified`
 * in structured data, and `<lastmod>` in the sitemap.
 *
 * It is a hand-maintained claim, not a build timestamp — bump it when the data
 * is actually re-checked (see AGENTS.md §6), never automatically. Stamping every
 * URL with the deploy time, which the sitemap used to do, tells a crawler the
 * whole site changed on a CSS tweak and is treated as noise.
 */
export const DATA_VERIFIED_ISO = "2026-08-01";

/** Human-readable form of DATA_VERIFIED_ISO, for the visible provenance line. */
export const DATA_VERIFIED_LABEL = "August 2026";

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
 * Pages deliberately absent: the placeholder guides and /genetics (noindex until
 * they have content), /world (noindex — it is a one-card shell over
 * /world/monuments), /privacy, /contact and /changelog (no search intent), and
 * /app. A sitemap listing pages you don't want ranked wastes crawl budget.
 *
 * Every `path` must be a real folder under `app/`. `/salvaging` and `/skinning`
 * used to be listed here and 404'd — the pages live under `/guides/`. Publishing
 * dead URLs in a sitemap is worse than omitting them: an answer engine that
 * fetches one and gets a 404 discounts the whole host.
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
  { path: "/giant-excavator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.8, changeFrequency: "weekly" },
  { path: "/guides/farming", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides/missions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/guides/skinning", priority: 0.7, changeFrequency: "monthly" },
  { path: "/guides/salvaging", priority: 0.7, changeFrequency: "monthly" },
  { path: "/world/monuments", priority: 0.8, changeFrequency: "monthly" },
  // The written reference pages. These carry the site's actual prose and data
  // tables, so they rank above most of the calculators they back.
  { path: "/reference", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reference/raid-costs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reference/recycler-yields", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reference/smelting-times", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reference/decay-times", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reference/base-upkeep", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reference/excavator-yields", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reference/vendor-prices", priority: 0.7, changeFrequency: "monthly" },
  { path: "/reference/animal-yields", priority: 0.8, changeFrequency: "monthly" },
  { path: "/reference/salvage-yields", priority: 0.7, changeFrequency: "monthly" },
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
 * FAQ block for a page that renders a visible list of questions and answers.
 * Only emit this when the same Q&A is actually on the page — Google treats
 * schema that isn't visible to the user as a violation.
 */
export function faqJsonLd(entries: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.q,
      acceptedAnswer: { "@type": "Answer", text: e.a },
    })),
  };
}

/**
 * An ordered list of pages, for a hub that links to them.
 *
 * The value is in what it says about the page's role: a hub carrying an ItemList
 * is a directory of N specific things, not another article that happens to
 * mention them. Retrieval systems use that to pick the hub when a question is
 * "what monuments are there" and a leaf page when it is about one of them.
 */
export function itemListJsonLd({
  name,
  description,
  items,
}: {
  name: string;
  description: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
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
    dateModified: DATA_VERIFIED_ISO,
  };
}

/**
 * The reference table a calculator page renders, described as a Dataset.
 *
 * This is the node that makes the page's numbers addressable rather than
 * decorative: it names what the table measures, what it covers, and when it was
 * last checked, so a retrieval system can tell "a page that mentions raid costs"
 * apart from "a page that *contains* the raid cost table". `variableMeasured`
 * carries the column names, which is what a model matches a question against.
 */
export function datasetJsonLd({
  name,
  description,
  path,
  anchor,
  variables,
}: {
  name: string;
  description: string;
  path: string;
  /** Fragment id of the heading the table sits under, e.g. "reference". */
  anchor: string;
  /** Column / measured-property names, in table order. */
  variables: readonly string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${SITE_URL}${path}#dataset`,
    name,
    description,
    url: `${SITE_URL}${path}#${anchor}`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    creator: { "@id": `${SITE_URL}/#organization` },
    about: { "@type": "VideoGame", name: "Rust" },
    variableMeasured: variables.map((v) => ({
      "@type": "PropertyValue",
      name: v,
    })),
    dateModified: DATA_VERIFIED_ISO,
  };
}

/**
 * The full structured-data set for a calculator route: the breadcrumb trail
 * that matches the visible one in CalcShell, plus the WebApplication node.
 *
 * Deliberately no FAQPage and no Dataset — schema is only emitted for content a
 * visitor can actually see, and the calculators carry no copy. Their written
 * counterparts live under /reference/, and the schema lives there with them.
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

/**
 * The full structured-data set for a /reference/* page: breadcrumb, the FAQ it
 * visibly renders, and — where it publishes one — the Dataset describing its
 * table. Together these say what the page *is*: a dated, sourced reference whose
 * numbers are on the page, rather than a tool that could produce them.
 */
export function referencePageJsonLd({
  slug,
  crumb,
  faq,
  dataset,
}: {
  slug: string;
  crumb: string;
  faq: { q: string; a: string }[];
  dataset?: { name: string; description: string; variables: readonly string[] };
}) {
  const path = `/reference/${slug}`;
  return [
    breadcrumbJsonLd([
      { name: "Reference", path: "/reference" },
      { name: crumb, path },
    ]),
    faqJsonLd(faq),
    ...(dataset
      ? [
          datasetJsonLd({
            name: dataset.name,
            description: dataset.description,
            path,
            anchor: "table",
            variables: dataset.variables,
          }),
        ]
      : []),
  ];
}
