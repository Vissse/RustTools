/**
 * Rust mission directory data.
 *
 * Hand-maintained — there is no generator for this file. Mission availability
 * varies with map, server config and Facepunch updates, so treat this as the
 * documented vanilla set.
 *
 * `giver` is the coarse group the board filters by (5 groups); `provider` is
 * the specific NPC location shown on the card (7 distinct labels, e.g. both
 * "Fishing Village" and "Large Fishing Village" fall under `fishing_village`).
 *
 * Reward icons: `icon` is the basename of a file that exists in
 * /public/images/recycle/*.webp — verified present. Rewards with no matching
 * icon (the teas, Grubs, Fish Pie) intentionally omit it and render as a plain
 * chip. Two missions pay out something that isn't an item at all; those use
 * `rewardNote` instead of `rewards`.
 */

export type MissionGiver =
  | 'bandit_camp'
  | 'outpost'
  | 'fishing_village'
  | 'ranch'
  | 'floating_city'

export type Reward = {
  name: string
  /** Shown only when greater than 1 — a lone Hatchet reads better than "1 Hatchet". */
  quantity?: number
  /** Basename in /images/recycle/. Omitted when no asset exists for the item. */
  icon?: string
}

export type Mission = {
  name: string
  giver: MissionGiver
  /** Specific NPC location label, e.g. "Large Fishing Village". */
  provider: string
  location: string
  objective: string
  /** Missions that must be completed first. Empty = available immediately. */
  prerequisites: string[]
  rewards?: Reward[]
  /** Non-item payout (spawn point, random loot table) shown as prose. */
  rewardNote?: string
}

export const GIVER_GROUPS: { id: MissionGiver; label: string }[] = [
  { id: 'bandit_camp', label: 'Bandit Camp' },
  { id: 'outpost', label: 'Outpost' },
  { id: 'fishing_village', label: 'Fishing Villages' },
  { id: 'ranch', label: 'Ranch & Barn' },
  { id: 'floating_city', label: 'Floating City' },
]

/**
 * Accepted values of the board's `?giver=` search param. A literal tuple because
 * nuqs's parseAsStringLiteral needs one to narrow the parsed type, which also
 * makes an unknown value in a hand-edited URL fall back to "all".
 *
 * `satisfies` rejects a typo here; keep it in sync with GIVER_GROUPS above.
 */
export const GIVER_FILTERS = [
  'all',
  'bandit_camp',
  'outpost',
  'fishing_village',
  'ranch',
  'floating_city',
] as const satisfies readonly ('all' | MissionGiver)[]

export type GiverFilter = (typeof GIVER_FILTERS)[number]

/** Sorted alphabetically by name — the board numbers cards in this order. */
export const MISSIONS: Mission[] = [
  {
    name: 'An Important Broadcast',
    giver: 'fishing_village',
    provider: 'Fishing Village',
    location: 'Underwater Labs',
    objective:
      'Visit Underwater lab and play the Fishing Village radio station on the boombox.',
    prerequisites: [],
    rewards: [
      { name: 'Scrap', quantity: 100, icon: 'scrap' },
      { name: 'Double Diving Tank', icon: 'diving.tank.double' },
    ],
  },
  {
    name: 'Beep in the Deep',
    giver: 'outpost',
    provider: 'Outpost',
    location: 'Deep Sea Islands',
    objective:
      'Sail to a deep sea island and locate buried treasure with a metal detector.',
    prerequisites: [],
    rewards: [{ name: 'Scrap', quantity: 100, icon: 'scrap' }],
  },
  {
    name: 'Boar Hunt',
    giver: 'ranch',
    provider: 'Ranch',
    location: 'Forest biome',
    objective: 'Track and kill a boar, then return to the hunter.',
    prerequisites: [],
    rewards: [
      { name: 'Scrap', quantity: 150, icon: 'scrap' },
      { name: 'Basic Ore Tea' },
    ],
  },
  {
    name: 'Collect Vood',
    giver: 'bandit_camp',
    provider: 'Bandit Camp',
    location: 'Forest',
    objective: 'Harvest wood in the forest and report back to the lumberjack.',
    prerequisites: ['Lost Bottles'],
    rewards: [
      { name: 'Crossbow', icon: 'crossbow' },
      { name: 'Wooden Arrows', quantity: 15, icon: 'arrow.wooden' },
      { name: 'Scrap', quantity: 75, icon: 'scrap' },
    ],
  },
  {
    name: 'Deer Hunt',
    giver: 'ranch',
    provider: 'Large Barn',
    location: 'Forest biome',
    objective: 'Hunt and kill three deer, then return to the hunter.',
    prerequisites: [],
    rewards: [
      { name: 'Scrap', quantity: 150, icon: 'scrap' },
      { name: 'Basic Scrap Tea' },
    ],
  },
  {
    name: 'Go Fish',
    giver: 'fishing_village',
    provider: 'Large Fishing Village',
    location: 'Coastline',
    objective: 'Catch three fish and deliver them to the fisherman.',
    prerequisites: ['Tackle the Day'],
    rewards: [
      { name: 'Kayak', icon: 'kayak' },
      { name: 'Paddle', icon: 'paddle' },
      { name: 'Scrap', quantity: 75, icon: 'scrap' },
    ],
  },
  {
    name: 'Gone Killing',
    giver: 'floating_city',
    provider: 'Floating City',
    location: 'Open ocean',
    objective: 'Eliminate 8 scientists patrolling on RHIB boats.',
    prerequisites: [],
    rewards: [
      { name: 'Rocket Launcher', icon: 'rocket.launcher' },
      { name: 'High Velocity Rockets', quantity: 6, icon: 'ammo.rocket.hv' },
    ],
  },
  {
    name: 'Keeping Afloat',
    giver: 'bandit_camp',
    provider: 'Bandit Camp',
    location: 'Deep Sea → Floating City',
    objective:
      'Gather 3000 wood and deliver it to a contact in the floating city.',
    prerequisites: [],
    rewards: [{ name: 'Scrap', quantity: 300, icon: 'scrap' }],
  },
  {
    name: 'Lost Bottles',
    giver: 'bandit_camp',
    provider: 'Bandit Camp',
    location: 'Forest',
    objective: 'Find the lumberjack’s lost vodka bottle and return it.',
    prerequisites: [],
    rewards: [{ name: 'Hatchet', icon: 'hatchet' }],
  },
  {
    name: 'Oil Rig Raid',
    giver: 'outpost',
    provider: 'Outpost',
    location: 'Oil Rig',
    objective:
      'Infiltrate oil rig, retrieve a soda can, and optionally open a locked crate.',
    prerequisites: [],
    rewards: [{ name: 'Scrap', quantity: 200, icon: 'scrap' }],
  },
  {
    name: 'Oiled Up',
    giver: 'fishing_village',
    provider: 'Fishing Village',
    location: 'Open ocean',
    objective: 'Break 8 oil barrels at sea and return with 100 crude oil.',
    prerequisites: ['Tackle the Day', 'Go Fish'],
    rewards: [
      { name: 'Scrap', quantity: 250, icon: 'scrap' },
      { name: 'Fish Pie', quantity: 3 },
    ],
  },
  {
    name: 'Outpost Validation',
    giver: 'outpost',
    provider: 'Outpost',
    location: 'Safe Zone',
    objective:
      'Recover documents from a marked location and return them to the scientist.',
    prerequisites: [],
    rewardNote: 'Permanent Outpost spawn point',
  },
  {
    name: 'Shark Hunt',
    giver: 'fishing_village',
    provider: 'Large Fishing Village',
    location: 'Dive sites',
    objective: 'Hunt sharks threatening nearby divers.',
    prerequisites: [],
    rewards: [
      { name: 'Jackhammer', icon: 'jackhammer' },
      { name: 'Medical Syringe', quantity: 3, icon: 'syringe.medical' },
      { name: 'Scrap', quantity: 50, icon: 'scrap' },
    ],
  },
  {
    name: 'Tackle the Day',
    giver: 'fishing_village',
    provider: 'Large Fishing Village',
    location: 'Coastline',
    objective: 'Recover the fisherman’s lost tackle from the shoreline.',
    prerequisites: [],
    rewards: [
      { name: 'Handmade Fishing Rod', icon: 'fishingrod.handmade' },
      { name: 'Grubs', quantity: 15 },
      { name: 'Basic Harvesting Tea' },
    ],
  },
  {
    name: 'Underwater Bounty',
    giver: 'fishing_village',
    provider: 'Large Fishing Village',
    location: 'Dive sites',
    objective: 'Search dive sites and untie 10 underwater crates.',
    prerequisites: [],
    rewards: [
      { name: 'Pump Shotgun', icon: 'shotgun.pump' },
      { name: 'Buckshot', quantity: 12, icon: 'ammo.shotgun' },
      { name: 'Scrap', quantity: 100, icon: 'scrap' },
    ],
  },
  {
    name: 'Vagabond Treasure',
    giver: 'ranch',
    provider: 'Ranch',
    location: 'Random map location',
    objective: 'Locate hidden treasure for random Tier 2 loot.',
    prerequisites: [],
    rewardNote: 'Random Tier 2 loot + possible Scrap & HQM',
  },
  {
    name: 'Wildlife Cull',
    giver: 'bandit_camp',
    provider: 'Bandit Camp',
    location: 'Forest biome',
    objective: 'Kill three animals and report back to the lumberjack.',
    prerequisites: ['Lost Bottles', 'Collect Vood'],
    rewards: [
      { name: 'Lumberjack Hoodie', icon: 'lumberjack.hoodie' },
      { name: 'Pants', icon: 'pants' },
      { name: 'Bucket Helmet', icon: 'bucket.helmet' },
      { name: 'Basic Wood Tea' },
    ],
  },
]

/**
 * Progression chains, in completion order. Rendered by the progression panel;
 * every mission after the first in a chain lists the previous one as a
 * prerequisite.
 */
export const PROGRESSION_CHAINS: { provider: string; steps: string[] }[] = [
  {
    provider: 'Bandit Camp',
    steps: ['Lost Bottles', 'Collect Vood', 'Wildlife Cull'],
  },
  {
    provider: 'Fishing Village',
    steps: ['Tackle the Day', 'Go Fish', 'Oiled Up'],
  },
]

/** Headline counts — derived so they can never drift from the table above. */
export const MISSION_COUNT = MISSIONS.length

export const PROVIDER_COUNT = new Set(MISSIONS.map((m) => m.provider)).size

export const REWARD_ENTRY_COUNT = MISSIONS.reduce(
  (n, m) => n + (m.rewards?.length ?? 0) + (m.rewardNote ? 1 : 0),
  0,
)

export const LINKED_MISSION_COUNT = MISSIONS.filter(
  (m) => m.prerequisites.length > 0,
).length

/**
 * Rendered as the page's FAQ section *and* emitted as FAQPage structured data
 * by the route — both read from here so the markup and the schema can't drift.
 */
export const MISSION_FAQ: { q: string; a: string }[] = [
  {
    q: 'What are missions in Rust?',
    a: 'Rust missions are objectives offered by certain NPCs. Players complete the requested task and return to the mission provider, or satisfy the listed completion condition, to receive the available reward.',
  },
  {
    q: 'Where can I find mission givers in Rust?',
    a: 'Mission providers are commonly associated with safe-zone monuments such as fishing villages, ranches, barns, Outpost, and Bandit Camp. The available providers depend on the current map and server configuration.',
  },
  {
    q: 'Do Rust missions have prerequisites?',
    a: 'Some missions require an earlier mission or another condition to be completed first. Check the prerequisite listed for a mission before traveling to its provider.',
  },
  {
    q: 'What rewards can Rust missions provide?',
    a: 'Mission rewards vary by objective and provider. Rewards can include equipment, resources, consumables, scrap, transportation-related items, or other useful progression items.',
  },
  {
    q: 'Why is a Rust mission unavailable?',
    a: 'The mission provider may not be present on the map, a prerequisite may not be complete, or the server may have changed or disabled the mission system. Custom and modded servers can behave differently from standard servers.',
  },
  {
    q: 'Do Rust missions reset after a server wipe?',
    a: "Mission availability and player progression can be affected by the server's wipe settings. Map wipes, blueprint wipes, plugins, and administrator configuration can produce different results between servers.",
  },
]
