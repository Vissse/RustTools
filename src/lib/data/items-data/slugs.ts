/**
 * URL-slug mapping for item category and item detail pages.
 *
 * Routes are nested — /items/[category]/[item] — so an item's slug only
 * needs to be unique within its own category, not globally.
 */
import { ITEM_CATEGORIES, ITEMS_DATA, type ItemCategory } from './index';

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface CategorySlugEntry {
  slug: string;
  category: ItemCategory;
}

/** Every category is already a single word, so its slug is just lowercase. */
export const CATEGORY_SLUG_ENTRIES: CategorySlugEntry[] = ITEM_CATEGORIES.map((category) => ({
  slug: toSlug(category),
  category,
}));

export const CATEGORY_SLUGS: string[] = CATEGORY_SLUG_ENTRIES.map((e) => e.slug);

const categoryBySlug = new Map(CATEGORY_SLUG_ENTRIES.map((e) => [e.slug, e.category]));

export function getCategoryBySlug(slug: string): ItemCategory | undefined {
  return categoryBySlug.get(slug);
}

export interface ItemSlugEntry {
  slug: string;
  name: string;
  subcategory?: string;
  image?: string;
}

/** Items in one category, each paired with its slug (unique within that category). */
export const ITEMS_BY_CATEGORY_SLUG: Record<string, ItemSlugEntry[]> = Object.fromEntries(
  CATEGORY_SLUG_ENTRIES.map(({ slug, category }) => {
    const seen = new Set<string>();
    const items = ITEMS_DATA[category].map(({ name, subcategory, image }) => {
      const base = toSlug(name);
      const itemSlug = seen.has(base) ? `${base}-2` : base;
      seen.add(itemSlug);
      return { slug: itemSlug, name, subcategory, image };
    });
    return [slug, items];
  }),
);

export function getItemInCategory(categorySlug: string, itemSlug: string): ItemSlugEntry | undefined {
  return ITEMS_BY_CATEGORY_SLUG[categorySlug]?.find((e) => e.slug === itemSlug);
}

/** Every (category, item) slug pair — fed into the item route's `generateStaticParams`. */
export const ITEM_STATIC_PARAMS: { category: string; item: string }[] = CATEGORY_SLUG_ENTRIES.flatMap(
  ({ slug }) => ITEMS_BY_CATEGORY_SLUG[slug].map((e) => ({ category: slug, item: e.slug })),
);
