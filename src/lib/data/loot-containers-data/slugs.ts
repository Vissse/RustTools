import { LOOT_CONTAINERS_DATA, type LootContainerEntry } from './index';

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface LootContainerSlugEntry extends LootContainerEntry {
  slug: string;
}

const seen = new Set<string>();

export const LOOT_CONTAINER_SLUG_ENTRIES: LootContainerSlugEntry[] = LOOT_CONTAINERS_DATA.map((entry) => {
  const base = toSlug(entry.name);
  const slug = seen.has(base) ? `${base}-2` : base;
  seen.add(slug);
  return { ...entry, slug };
});

export const LOOT_CONTAINER_SLUGS: string[] = LOOT_CONTAINER_SLUG_ENTRIES.map((e) => e.slug);

const bySlug = new Map(LOOT_CONTAINER_SLUG_ENTRIES.map((e) => [e.slug, e]));

export function getLootContainerBySlug(slug: string): LootContainerSlugEntry | undefined {
  return bySlug.get(slug);
}
