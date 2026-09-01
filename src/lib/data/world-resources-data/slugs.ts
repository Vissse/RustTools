import { WORLD_RESOURCES_DATA, type WorldResourceEntry } from './index';

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface WorldResourceSlugEntry extends WorldResourceEntry {
  slug: string;
}

const seen = new Set<string>();

export const WORLD_RESOURCE_SLUG_ENTRIES: WorldResourceSlugEntry[] = WORLD_RESOURCES_DATA.map((resource) => {
  const base = toSlug(resource.name);
  const slug = seen.has(base) ? `${base}-2` : base;
  seen.add(slug);
  return { ...resource, slug };
});

export const WORLD_RESOURCE_SLUGS: string[] = WORLD_RESOURCE_SLUG_ENTRIES.map((e) => e.slug);

const bySlug = new Map(WORLD_RESOURCE_SLUG_ENTRIES.map((e) => [e.slug, e]));

export function getWorldResourceBySlug(slug: string): WorldResourceSlugEntry | undefined {
  return bySlug.get(slug);
}
