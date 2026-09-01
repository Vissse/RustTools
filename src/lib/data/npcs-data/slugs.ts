import { NPCS_DATA, type NpcEntry } from './index';

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface NpcSlugEntry extends NpcEntry {
  slug: string;
}

const seen = new Set<string>();

export const NPC_SLUG_ENTRIES: NpcSlugEntry[] = NPCS_DATA.map((npc) => {
  const base = toSlug(npc.name);
  const slug = seen.has(base) ? `${base}-2` : base;
  seen.add(slug);
  return { ...npc, slug };
});

export const NPC_SLUGS: string[] = NPC_SLUG_ENTRIES.map((e) => e.slug);

const bySlug = new Map(NPC_SLUG_ENTRIES.map((e) => [e.slug, e]));

export function getNpcBySlug(slug: string): NpcSlugEntry | undefined {
  return bySlug.get(slug);
}
