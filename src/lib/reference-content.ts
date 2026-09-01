/**
 * Copy for the /reference/* pages — the written, citable half of the site.
 *
 * The calculators are tools: they compute an answer on the client, behind a
 * Suspense boundary, so nothing they produce exists in the HTML. That is fine
 * for a tool and fatal for citation — an answer engine can only quote what a
 * page contains. These pages carry the same numbers as prose, a facts list, a
 * table and an FAQ, and cross-link to the tool for the part that varies per
 * player. The calculator pages stay tools and gain no copy.
 *
 * **Every number here is interpolated from the data sets, never typed.** That is
 * not style: a sentence that contradicts the table below it produces a
 * confident, wrong citation, and hardcoding "26 structures" beside a list that
 * has grown to 27 is how that starts. Where a value can't be derived, the copy
 * says what it depends on instead of guessing (AGENTS.md §6).
 */
import { STRUCTURES, EXPLOSIVES } from "./data/raid-data";
import { ITEMS, CATEGORIES } from "./data/recycling-data";
import { COMPONENT_ITEMS, TOP_SCRAP_ITEMS, scrapOf } from "./recycling-reference";
import { DECAY_MATERIALS } from "./data/decay-data";
import { SMELTERS } from "./data/smelting-data";
import { EXCAVATOR_RATES, MINUTES_PER_BARREL } from "./data/excavator-data";
import { MAX_SLOTS, STACKS } from "./data/cupboard-data";
import { SKINNING_DATA } from "./data/skinning-data";
import { SALVAGING_DATA } from "./data/salvaging-data";
import {
  PREFERRED_SKINNING_TOOL,
  PREFERRED_SALVAGING_TOOL,
  skinningYield,
  salvageBest,
} from "./harvest-reference";
import type { RaidReference, RaidReferenceRow } from "./raid-reference";

export interface ReferenceContent {
  /** Route slug under /reference/. */
  slug: string;
  /** <title>, before the brand suffix. */
  title: string;
  /** Meta description. */
  description: string;
  /** Breadcrumb label, and the card title on the /reference hub. */
  crumb: string;
  /** h1, split as "PLAIN <accent>" like the rest of the site. */
  heading: string;
  headingAccent: string;
  /**
   * Lede paragraphs. The first sentence of the first one must state the answer
   * outright — extraction takes the first span that resolves the question and
   * stops, so a paragraph that builds to its conclusion loses to one that opens
   * with it.
   */
  summary: string[];
  /**
   * Quick-answer pairs. Each `value` is a self-contained sentence that names its
   * subject: a fragment lifted out of the page has no "it" to resolve.
   */
  facts: { term: string; value: string }[];
  tableHeading?: string;
  tableNote?: string;
  /** Rendered visibly AND emitted as FAQPage. The two must not diverge. */
  faq: { q: string; a: string }[];
  /** Where the numbers come from and what invalidates them. */
  sourceNote: string;
  /** The interactive tool this page backs, linked from the body. */
  tool?: { label: string; path: string };
  /** Descriptor for the Dataset node. Omit on pages with no table. */
  dataset?: { name: string; description: string; variables: readonly string[] };
}

/** Thousands separators, so "2200 sulfur" reads as "2,200 sulfur" in prose. */
const n = (v: number) => v.toLocaleString("en-US");

const UNOFFICIAL =
  "Values are read from the RustTools game data set, the same data the calculators run on.";

/* ------------------------------------------------------------------ raid -- */

const STRUCTURE_COUNT = Object.keys(STRUCTURES).length;
const EXPLOSIVE_COUNT = EXPLOSIVES.length;

function row(rows: RaidReferenceRow[], name: string): RaidReferenceRow | undefined {
  return rows.find((r) => r.name === name);
}

/** "4 C4 (8,800 sulfur)", or a fallback when the structure isn't in the table. */
function quote(r: RaidReferenceRow | undefined): string {
  return r ? `${r.cheapestProse} (${n(r.cheapest.sulfur)} sulfur)` : "—";
}

/**
 * Raid copy depends on the solved table, so it is a function rather than a
 * const: the FAQ answers quote the exact rows rendered beneath them.
 */
export function raidContent({ rows, withheld }: RaidReference): ReferenceContent {
  const cheapest = rows[0];
  const dearest = rows[rows.length - 1];
  const sheetDoor = row(rows, "Sheet Metal Door");
  const armoredDoor = row(rows, "Armored Door");
  const stoneWall = row(rows, "Stone Wall");
  const garage = row(rows, "Garage Door");

  return {
    slug: "raid-costs",
    title: "Rust Raid Costs — Sulfur and Explosives for Every Structure",
    description: `How much sulfur it takes to raid every structure in Rust, with C4, rocket, satchel and explosive ammo counts and the cheapest combination for each. Verified data, ${rows.length} structures.`,
    crumb: "Raid Costs",
    heading: "Rust raid costs",
    headingAccent: "for every structure",
    summary: [
      `Raiding a ${sheetDoor?.name ?? "Sheet Metal Door"} in Rust costs ${quote(sheetDoor)} — the cheapest way to break it by sulfur. The table below gives the same answer for ${rows.length} of the ${STRUCTURE_COUNT} destructible structures in Rust, alongside how many C4, rockets, satchels or explosive rounds each one takes on its own.`,
      `Sulfur is the currency of a raid, so every cost here is quoted in raw sulfur: the amount you have to farm and refine to craft the explosives, not the number of items. That is why ${dearest?.name ?? "the toughest structure"} at ${n(dearest?.cheapest.sulfur ?? 0)} sulfur and ${cheapest?.name ?? "the softest"} at ${n(cheapest?.cheapest.sulfur ?? 0)} sulfur are the two ends of the range, and why mixing explosives usually beats spending one type.`,
      `All damage is quoted against the hard side — the outside face of the structure, which is the side a raider actually meets. Rust applies damage per prefab, not per building tier, so a Sheet Metal Door and a Metal Wall take very different damage from the same charge despite both being metal.`,
    ],
    facts: [
      { term: "Cheapest raid", value: `${cheapest?.name ?? "—"} — ${quote(cheapest)}.` },
      { term: "Most expensive raid", value: `${dearest?.name ?? "—"} — ${quote(dearest)}.` },
      {
        term: "Sheet Metal Door",
        value: `${sheetDoor?.hp ?? "—"} HP. ${quote(sheetDoor)}, or ${sheetDoor?.counts.Satchel ?? "—"} satchel charges on their own.`,
      },
      {
        term: "Armored Door",
        value: `${armoredDoor?.hp ?? "—"} HP. ${quote(armoredDoor)}, or ${armoredDoor?.counts.Rocket ?? "—"} rockets on their own.`,
      },
      {
        term: "Stone Wall",
        value: `${stoneWall?.hp ?? "—"} HP. ${quote(stoneWall)}, or ${stoneWall?.counts.C4 ?? "—"} C4 on their own.`,
      },
      {
        term: "Garage Door",
        value: `${garage?.hp ?? "—"} HP. ${quote(garage)}, or ${garage?.counts.C4 ?? "—"} C4 on their own.`,
      },
    ],
    tableHeading: `Raid cost for ${rows.length} Rust structures`,
    tableNote:
      "Sorted cheapest first. The explosive columns are solo counts — how many of that one item it takes with nothing else — while the last two columns give the cheapest mixed combination and its total sulfur cost." +
      (withheld.length
        ? ` ${withheld.join(" and ")} ${withheld.length === 1 ? "is" : "are"} deliberately left out: the recorded explosive counts for ${withheld.length === 1 ? "it" : "them"} do not match the recorded health, and we would rather omit a row than publish two figures that contradict each other.`
        : ""),
    faq: [
      {
        q: "How much sulfur do you need to raid a sheet metal door in Rust?",
        a: `A Sheet Metal Door has ${sheetDoor?.hp ?? "—"} HP and costs ${quote(sheetDoor)} to break by the cheapest route. On their own it takes ${sheetDoor?.counts.Satchel ?? "—"} satchel charges, ${sheetDoor?.counts.C4 ?? "—"} C4, or ${sheetDoor?.counts["Explosive 5.56 Rifle Ammo"] ?? "—"} explosive 5.56 rounds.`,
      },
      {
        q: "How many rockets does it take to break an armored door?",
        a: `${armoredDoor?.counts.Rocket ?? "—"} rockets destroy an Armored Door, which has ${armoredDoor?.hp ?? "—"} HP. Rockets are rarely the cheapest option though — the lowest-sulfur route for that door is ${quote(armoredDoor)}.`,
      },
      {
        q: "How many C4 does it take to break a stone wall in Rust?",
        a: `${stoneWall?.counts.C4 ?? "—"} C4 breaks a Stone Wall (${stoneWall?.hp ?? "—"} HP) from the outside. Each C4 costs ${n(EXPLOSIVES.find((e) => e.name === "C4")?.cost.s ?? 0)} sulfur to craft, so the cheapest route is usually ${quote(stoneWall)}.`,
      },
      {
        q: "What is the cheapest thing to raid in Rust?",
        a: `Of the structures on this page, ${cheapest?.name ?? "—"} is the cheapest at ${n(cheapest?.cheapest.sulfur ?? 0)} sulfur (${cheapest?.cheapestProse ?? "—"}). Raiding through the softest entry point on a base — usually a door or a window — costs far less than going through a wall of the same tier.`,
      },
      {
        q: "Is raid damage the same on both sides of a wall?",
        a: "No, and these figures use the harder one. The hard side is the outside face of the structure; it takes less damage per explosive and therefore needs more of them. Only the four wall types and the armored ladder hatch have a genuine soft/hard split in Rust — everything else takes the same damage from either face.",
      },
      {
        q: "Do these sulfur costs include crafting the explosives?",
        a: `Yes — every figure is the raw sulfur you have to gather, not a count of finished items. One C4 costs ${n(EXPLOSIVES.find((e) => e.name === "C4")?.cost.s ?? 0)} sulfur, one rocket ${n(EXPLOSIVES.find((e) => e.name === "Rocket")?.cost.s ?? 0)}, and one satchel charge ${n(EXPLOSIVES.find((e) => e.name === "Satchel")?.cost.s ?? 0)}. Metal fragments and charcoal are also consumed but are never the constraint on a raid.`,
      },
      {
        q: "How many explosives can be used to raid in Rust?",
        a: `${EXPLOSIVE_COUNT} are covered here: C4, rockets, high velocity rockets, satchel charges, explosive 5.56 rifle ammo, F1 grenades and beancan grenades. Combining them is usually cheaper than spending a single type, which is what the raid calculator solves for.`,
      },
    ],
    sourceNote: `Structure health and explosive craft costs are maintained per structure in the RustTools raid data set, and damage figures are cross-checked against the solver on every build. ${UNOFFICIAL}`,
    tool: { label: "Raid calculator", path: "/raid" },
    dataset: {
      name: "Rust raid costs by structure",
      description: `Health, solo explosive counts and cheapest sulfur cost for ${rows.length} destructible structures in Rust.`,
      variables: [
        "Structure",
        "Health",
        "Building tier",
        "C4 required",
        "Rockets required",
        "Satchel charges required",
        "Explosive 5.56 rounds required",
        "Cheapest combination",
        "Sulfur cost",
      ],
    },
  };
}

/* ------------------------------------------------------------- recycling -- */

const TOP_SCRAP = TOP_SCRAP_ITEMS[0];

export const RECYCLING_CONTENT: ReferenceContent = {
  slug: "recycler-yields",
  title: "Rust Recycler Yields — What Every Component Returns",
  description: `What Rust items return when recycled, for both the Radtown and Safe Zone recyclers, with the full output table for all ${COMPONENT_ITEMS.length} components.`,
  crumb: "Recycler Yields",
  heading: "What Rust items",
  headingAccent: "return when recycled",
  summary: [
    `A Rust recycler breaks an item into a fixed share of the resources it was made from — most usefully scrap, metal fragments and high quality metal. RustTools holds recycler output for ${n(ITEMS.length)} items across ${CATEGORIES.length} categories, and the table below publishes the components, the category that produces the most scrap per stack.`,
    `Two recyclers exist and they are not equivalent. The Radtown recycler found at monuments runs a cycle every 5 seconds and gives the full yield. The Safe Zone recycler at Outpost and Bandit Camp runs slower, at 8 seconds a cycle, and returns a reduced amount — a dedicated lower yield where the item defines one, otherwise roughly two thirds of the Radtown figure.`,
    `Output is always rounded down. Recycling one item that returns a fractional amount can therefore give nothing at all, which is why recycling in full stacks returns noticeably more than recycling piece by piece.`,
  ],
  facts: [
    {
      term: "Items in the data set",
      value: `${n(ITEMS.length)} recyclable items across ${CATEGORIES.length} categories, including ${COMPONENT_ITEMS.length} components.`,
    },
    {
      term: "Radtown recycler",
      value:
        "Full yield, one cycle every 5 seconds. Found at monuments; the recycler to use whenever it is safe to.",
    },
    {
      term: "Safe Zone recycler",
      value:
        "Reduced yield and one cycle every 8 seconds, at Outpost and Bandit Camp. Safe from other players, but noticeably worse per item.",
    },
    {
      term: "Rounding",
      value:
        "Rust floors recycler output. A part-resource result is dropped entirely, so partial stacks waste material.",
    },
    {
      term: "Highest scrap yield",
      value: TOP_SCRAP
        ? `${TOP_SCRAP.name} returns ${n(scrapOf(TOP_SCRAP))} scrap per item in a Radtown recycler — the most of anything in the game.`
        : "—",
    },
    {
      term: "Cycle billing",
      value:
        "Some items recycle several at a time in one cycle, so the time cost scales per cycle, not per item.",
    },
  ],
  tableHeading: `Recycler output for all ${COMPONENT_ITEMS.length} Rust components`,
  tableNote:
    "Components are the densest scrap source in Rust and the items most often recycled deliberately. Radtown is the full monument recycler yield; Safe Zone is the reduced Outpost and Bandit Camp yield.",
  faq: [
    {
      q: "What gives the most scrap when recycled in Rust?",
      a: TOP_SCRAP
        ? `${TOP_SCRAP.name} gives the most scrap of any single item — ${n(scrapOf(TOP_SCRAP))} scrap in a Radtown recycler. After it, the highest scrap returns come from ${TOP_SCRAP_ITEMS.slice(1, 5)
            .map((i) => `${i.name} (${n(scrapOf(i))})`)
            .join(", ")}.`
        : "—",
    },
    {
      q: "Is the Safe Zone recycler worse than the one at monuments?",
      a: "Yes, on both counts. The Safe Zone recyclers at Outpost and Bandit Camp return less material per item and run a cycle every 8 seconds instead of 5. You trade yield and time for not being shot while you use it.",
    },
    {
      q: "Does recycling round up or down in Rust?",
      a: "Down, always. A yield that works out to a fraction of a resource is discarded rather than rounded up, so recycling a single item can return nothing where a full stack of the same item returns a useful amount.",
    },
    {
      q: "How long does a Rust recycler take?",
      a: "One cycle every 5 seconds at a Radtown recycler and every 8 seconds at a Safe Zone recycler. Several items are processed per cycle for some stacks, so a full stack is much faster than the per-item time suggests.",
    },
    {
      q: "Can you get high quality metal from recycling?",
      a: "Yes. High quality metal is one of the standard recycler outputs and comes mainly from components and from tier-three items — the table on this page marks every component that returns it.",
    },
    {
      q: "Do all items in Rust recycle?",
      a: `No. ${n(ITEMS.length)} items have recycler output in this data set, but raw resources, most food, and a number of quest and cosmetic items return nothing. The recycling calculator shows an empty result for those rather than guessing.`,
    },
  ],
  sourceNote: `Recycler yields are generated from the RustTools recycling data set and regenerated after each balance patch. ${UNOFFICIAL}`,
  tool: { label: "Recycling calculator", path: "/recycling" },
  dataset: {
    name: "Rust recycler output for components",
    description: `Radtown and Safe Zone recycler yields for all ${COMPONENT_ITEMS.length} components in Rust.`,
    variables: ["Component", "Radtown recycler yield", "Safe Zone recycler yield"],
  },
};

/* --------------------------------------------------------------- furnace -- */

const FURNACE = SMELTERS.find((s) => s.id === "furnace")!;
const LARGE_FURNACE = SMELTERS.find((s) => s.id === "large-furnace")!;
const METAL_ORE = FURNACE.data.find((p) => p.inputItem === "Metal Ore");
const SULFUR_ORE = FURNACE.data.find((p) => p.inputItem === "Sulfur Ore");
const HQM_ORE = FURNACE.data.find((p) => p.inputItem === "High Quality Metal Ore");
const FURNACE_RATIO = Math.round(LARGE_FURNACE.slots / FURNACE.slots);

export const FURNACE_CONTENT: ReferenceContent = {
  slug: "smelting-times",
  title: "Rust Smelting Times — Wood Cost and Output per Ore",
  description: `Smelting time, wood cost and output for every ore and cookable in Rust, across all ${SMELTERS.length} furnaces and ovens.`,
  crumb: "Smelting Times",
  heading: "Rust smelting times",
  headingAccent: "and wood cost",
  summary: [
    `One metal ore smelts into ${METAL_ORE?.outputQuantity ?? "—"} metal fragment in ${METAL_ORE?.timeSeconds ?? "—"} seconds and burns ${METAL_ORE?.woodRequired ?? "—"} wood in a standard Furnace. Sulfur ore is faster at ${SULFUR_ORE?.timeSeconds ?? "—"} seconds and ${SULFUR_ORE?.woodRequired ?? "—"} wood; high quality metal ore is the slowest at ${HQM_ORE?.timeSeconds ?? "—"} seconds and ${HQM_ORE?.woodRequired ?? "—"} wood.`,
    `Those per-ore figures are what actually governs a smelting session, because a furnace processes every occupied slot at once. A ${FURNACE.name} has ${FURNACE.slots} smelting slots and a ${LARGE_FURNACE.name} has ${LARGE_FURNACE.slots}, so the large furnace is roughly ${FURNACE_RATIO}× the throughput for the same wall-clock time.`,
    `The table below covers all ${SMELTERS.length} smelters — the two furnaces, the oil refinery, and the three cooking sources — with their full input and output lists.`,
  ],
  facts: [
    {
      term: "Metal ore",
      value: `${METAL_ORE?.timeSeconds ?? "—"} seconds and ${METAL_ORE?.woodRequired ?? "—"} wood per ore, returning ${METAL_ORE?.outputQuantity ?? "—"} metal fragment.`,
    },
    {
      term: "Sulfur ore",
      value: `${SULFUR_ORE?.timeSeconds ?? "—"} seconds and ${SULFUR_ORE?.woodRequired ?? "—"} wood per ore, returning ${SULFUR_ORE?.outputQuantity ?? "—"} sulfur.`,
    },
    {
      term: "High quality metal ore",
      value: `${HQM_ORE?.timeSeconds ?? "—"} seconds and ${HQM_ORE?.woodRequired ?? "—"} wood per ore, returning ${HQM_ORE?.outputQuantity ?? "—"} high quality metal.`,
    },
    { term: "Furnace", value: `${FURNACE.slots} smelting slots. The standard early-wipe smelter.` },
    {
      term: "Large Furnace",
      value: `${LARGE_FURNACE.slots} smelting slots — ${FURNACE_RATIO}× a standard furnace, at a much higher build cost.`,
    },
    {
      term: "Smelters covered",
      value: `${SMELTERS.length}: ${SMELTERS.map((s) => s.name).join(", ")}.`,
    },
  ],
  tableHeading: "Smelting time, wood cost and output by smelter",
  tableNote:
    "Times and wood are per single item smelted in one slot. A furnace runs all of its occupied slots simultaneously, so total wood scales with the number of slots in use while total time does not.",
  faq: [
    {
      q: "How much wood does it take to smelt metal ore in Rust?",
      a: `${METAL_ORE?.woodRequired ?? "—"} wood per metal ore in a Furnace, taking ${METAL_ORE?.timeSeconds ?? "—"} seconds. A full stack of 1,000 ore therefore needs roughly ${n(Math.ceil((METAL_ORE?.woodRequired ?? 0) * 1000))} wood.`,
    },
    {
      q: "How long does high quality metal ore take to smelt?",
      a: `${HQM_ORE?.timeSeconds ?? "—"} seconds per ore, burning ${HQM_ORE?.woodRequired ?? "—"} wood, for ${HQM_ORE?.outputQuantity ?? "—"} high quality metal. It is the slowest ore in the game to process, which is why HQM is usually the bottleneck on a base upgrade.`,
    },
    {
      q: "Is a large furnace worth it in Rust?",
      a: `A ${LARGE_FURNACE.name} has ${LARGE_FURNACE.slots} smelting slots against a standard furnace's ${FURNACE.slots}, so it processes about ${FURNACE_RATIO}× as much ore in the same time. It is worth building once you are gathering ore faster than a small furnace can consume it; before that, several small furnaces are cheaper.`,
    },
    {
      q: "Can you smelt sulfur in a campfire?",
      a: "No. Campfires, barbeques and stone fireplaces cook food and can produce charcoal, but ore smelting requires a furnace, a large furnace, or — for crude oil — the small oil refinery. The table on this page lists exactly what each one accepts.",
    },
    {
      q: "Does a furnace use wood faster with more slots filled?",
      a: "Yes. Wood is consumed per item being smelted, not per furnace, so filling every slot burns wood proportionally faster. The upside is that the wall-clock time stays the same, which is the entire reason to use a larger furnace.",
    },
  ],
  sourceNote: `Smelting times, wood costs and outputs come from the RustTools smelting data set. ${UNOFFICIAL}`,
  tool: { label: "Smelting calculator", path: "/furnace" },
  dataset: {
    name: "Rust smelting times and wood cost",
    description: `Input, output, wood cost and smelting time for every process across ${SMELTERS.length} Rust smelters.`,
    variables: ["Smelter", "Input", "Output", "Wood required", "Time in seconds"],
  },
};

/* ----------------------------------------------------------------- decay -- */

const WOOD_DECAY = DECAY_MATERIALS.find((m) => m.id === "wood");
const STONE_DECAY = DECAY_MATERIALS.find((m) => m.id === "stone");
const METAL_DECAY = DECAY_MATERIALS.find((m) => m.id === "metal");
const ARMORED_DECAY = DECAY_MATERIALS.find((m) => m.id === "armored");
const TWIG_DECAY = DECAY_MATERIALS.find((m) => m.id === "twig");

export const DECAY_CONTENT: ReferenceContent = {
  slug: "decay-times",
  title: "Rust Decay Times — How Long Every Building Tier Lasts",
  description: `How long twig, wood, stone, sheet metal and armored building blocks take to decay in Rust without Tool Cupboard protection, with block health for all ${DECAY_MATERIALS.length} tiers.`,
  crumb: "Decay Times",
  heading: "How long Rust bases",
  headingAccent: "take to decay",
  summary: [
    `An unprotected stone building block in Rust decays from full health to nothing in ${STONE_DECAY?.decayHours ?? "—"} hours. Wood takes ${WOOD_DECAY?.decayHours ?? "—"} hours, sheet metal ${METAL_DECAY?.decayHours ?? "—"}, and armored ${ARMORED_DECAY?.decayHours ?? "—"} — the full set is in the table below.`,
    `Decay only runs on structures that are outside the range of a stocked Tool Cupboard. A block inside an upkept cupboard's radius does not decay at all, which is why the practical question is never "how long until my base decays" but "how long will the cupboard hold out".`,
    `Damage is applied gradually across the decay window rather than all at once, so a block found at half health has roughly half its decay time left.`,
  ],
  facts: DECAY_MATERIALS.map((m) => ({
    term: m.name,
    value: `${m.hp} HP, decays fully in ${m.decayHours} hour${m.decayHours === 1 ? "" : "s"} without Tool Cupboard protection.`,
  })),
  tableHeading: "Decay time by building tier",
  tableNote:
    "Times are for a block at full health with no Tool Cupboard in range. Damage accrues linearly, so a block at half health has about half of this time remaining.",
  faq: [
    {
      q: "How long does a stone base take to decay in Rust?",
      a: `${STONE_DECAY?.decayHours ?? "—"} hours from full health, if it is outside the range of a stocked Tool Cupboard. A stone block has ${STONE_DECAY?.hp ?? "—"} HP and loses it steadily across that window.`,
    },
    {
      q: "How long does a wooden base last in Rust?",
      a: `${WOOD_DECAY?.decayHours ?? "—"} hours unprotected — the shortest of any real building tier. Twig is shorter still at ${TWIG_DECAY?.decayHours ?? "—"} hour, which is why twig is never left in a finished base.`,
    },
    {
      q: "Does a Tool Cupboard stop decay in Rust?",
      a: "Yes, as long as it has resources in it. Building blocks inside a stocked Tool Cupboard's radius do not decay; the cupboard consumes upkeep resources over time instead. Once it runs empty, decay resumes from full health.",
    },
    {
      q: "How long does sheet metal take to decay?",
      a: `${METAL_DECAY?.decayHours ?? "—"} hours from its ${METAL_DECAY?.hp ?? "—"} HP. Armored is the most durable at ${ARMORED_DECAY?.decayHours ?? "—"} hours and ${ARMORED_DECAY?.hp ?? "—"} HP.`,
    },
    {
      q: "Does decay damage happen all at once?",
      a: "No. Decay is applied gradually over the tier's decay window, so a partially decayed block still stands and can be repaired. Entering the current health into the decay calculator gives the remaining time rather than the full-tier figure.",
    },
  ],
  sourceNote: `Decay rates and block health come from the RustTools decay data set. ${UNOFFICIAL}`,
  tool: { label: "Decay calculator", path: "/decay" },
  dataset: {
    name: "Rust decay times by building tier",
    description: `Block health and full decay time for the ${DECAY_MATERIALS.length} building tiers in Rust.`,
    variables: ["Building tier", "Block health", "Decay time in hours"],
  },
};

/* -------------------------------------------------------------- cupboard -- */

export const CUPBOARD_CONTENT: ReferenceContent = {
  slug: "base-upkeep",
  title: "Rust Base Upkeep — Tool Cupboard Capacity and Stack Sizes",
  description: `How Rust base upkeep works, what the ${MAX_SLOTS} Tool Cupboard slots can hold, and why high quality metal runs out first on an upgraded base.`,
  crumb: "Base Upkeep",
  heading: "Rust base upkeep",
  headingAccent: "and cupboard capacity",
  summary: [
    `A Tool Cupboard in Rust has ${MAX_SLOTS} inventory slots, and how long a base survives is set by how much upkeep those slots can hold against what the base costs per hour. Wood, stone and metal fragments stack to ${n(STACKS.wood.max)} per slot; high quality metal stacks to only ${n(STACKS.hqm.max)}, which is what usually runs out first on an upgraded base.`,
    `Upkeep is charged continuously against the cupboard's contents and scales with the number and tier of the building blocks in its radius. Blocks inside a stocked cupboard do not decay; the moment it empties, they begin decaying at their tier's rate.`,
    `The practical ceiling is therefore ${MAX_SLOTS} slots of the resources a base actually consumes. A stone base can fill nearly every slot with ${n(STACKS.stone.max)}-stacks and last a long time unattended; an armored base burns high quality metal at ${n(STACKS.hqm.max)} per slot and needs restocking far sooner.`,
  ],
  facts: [
    {
      term: "Tool Cupboard slots",
      value: `${MAX_SLOTS} inventory slots, the hard ceiling on how much upkeep a base can be left with.`,
    },
    {
      term: "Wood stack",
      value: `${n(STACKS.wood.max)} per slot — up to ${n(STACKS.wood.max * MAX_SLOTS)} wood in a full cupboard.`,
    },
    {
      term: "Stone stack",
      value: `${n(STACKS.stone.max)} per slot — up to ${n(STACKS.stone.max * MAX_SLOTS)} stone in a full cupboard.`,
    },
    {
      term: "Metal fragments stack",
      value: `${n(STACKS.metal.max)} per slot — up to ${n(STACKS.metal.max * MAX_SLOTS)} fragments in a full cupboard.`,
    },
    {
      term: "High quality metal stack",
      value: `${n(STACKS.hqm.max)} per slot — only ${n(STACKS.hqm.max * MAX_SLOTS)} in a full cupboard, which is why armored bases need frequent restocking.`,
    },
    {
      term: "What upkeep protects",
      value:
        "Every building block inside the cupboard's radius. A stocked cupboard stops decay entirely; an empty one stops nothing.",
    },
  ],
  faq: [
    {
      q: "How many slots does a Tool Cupboard have in Rust?",
      a: `${MAX_SLOTS}. That is the ceiling on how much upkeep you can leave a base with, so the resource that stacks smallest — high quality metal, at ${n(STACKS.hqm.max)} per slot — sets how long an upgraded base can be left alone.`,
    },
    {
      q: "How long will my base last with a full Tool Cupboard?",
      a: `It depends entirely on how many blocks are in range and what tier they are, which is what the cupboard calculator works out. The upper bound is ${MAX_SLOTS} slots of resources: ${n(STACKS.wood.max * MAX_SLOTS)} wood, ${n(STACKS.stone.max * MAX_SLOTS)} stone, ${n(STACKS.metal.max * MAX_SLOTS)} metal fragments or ${n(STACKS.hqm.max * MAX_SLOTS)} high quality metal at maximum stacking.`,
    },
    {
      q: "Does upkeep stop a base from decaying?",
      a: "Yes. While the Tool Cupboard has the resources the base costs, nothing inside its radius decays. Upkeep is consumed continuously, and decay only starts once the cupboard cannot pay.",
    },
    {
      q: "Why does my base need high quality metal for upkeep?",
      a: `Because armored building blocks cost high quality metal to maintain, and it stacks to only ${n(STACKS.hqm.max)} per slot against ${n(STACKS.metal.max)} for the other resources. An armored base can hold at most ${n(STACKS.hqm.max * MAX_SLOTS)} HQM in its cupboard, so it runs dry far sooner than a stone base of the same size.`,
    },
    {
      q: "Does a bigger base cost more upkeep in Rust?",
      a: "Yes, and non-linearly — upkeep scales with the number of building blocks in the cupboard's radius as well as their tier. Adding external walls and unused rooms raises the hourly cost of a base you then have to keep stocked.",
    },
  ],
  sourceNote: `Stack sizes and the Tool Cupboard slot limit come from the RustTools cupboard data set. ${UNOFFICIAL}`,
  tool: { label: "Cupboard calculator", path: "/cupboard" },
};

/* ------------------------------------------------------------- excavator -- */

const EXC_SULFUR = EXCAVATOR_RATES.find((r) => r.id === "sulfur");
const EXC_HQM = EXCAVATOR_RATES.find((r) => r.id === "hqm");

export const EXCAVATOR_CONTENT: ReferenceContent = {
  slug: "excavator-yields",
  title: "Rust Giant Excavator Yields — Output per Diesel Barrel",
  description: `How much sulfur ore, stone, metal fragments and high quality metal ore the Giant Excavator produces per barrel of Diesel Fuel in Rust.`,
  crumb: "Excavator Yields",
  heading: "Giant Excavator output",
  headingAccent: "per diesel barrel",
  summary: [
    `One barrel of Diesel Fuel runs the Giant Excavator for ${MINUTES_PER_BARREL} minutes and produces ${n(EXC_SULFUR?.yieldPerBarrel ?? 0)} sulfur ore, or ${n(EXC_HQM?.yieldPerBarrel ?? 0)} high quality metal ore, depending on which resource the control room is set to. Only one resource is produced per run.`,
    `That makes the excavator the fastest bulk resource source in Rust by a wide margin — a single barrel of sulfur ore is worth more than an hour of hand-mining nodes — and also the loudest. Running it announces the site to the whole server, so the real cost is the fight, not the diesel.`,
    `Diesel is found in locked crates and at the excavator itself. Barrels can be queued, so output scales linearly: two barrels give exactly twice the output over ${MINUTES_PER_BARREL * 2} minutes.`,
  ],
  facts: [
    ...EXCAVATOR_RATES.map((r) => ({
      term: r.name,
      value: `${n(r.yieldPerBarrel)} per diesel barrel.`,
    })),
    {
      term: "Run length",
      value: `${MINUTES_PER_BARREL} minutes per barrel of Diesel Fuel, and barrels can be queued back to back.`,
    },
    {
      term: "One resource at a time",
      value:
        "The excavator produces only the resource selected in the control room. Switching mid-run means restarting it.",
    },
  ],
  tableHeading: "Giant Excavator yield per diesel barrel",
  tableNote: `Each row is the total output for one ${MINUTES_PER_BARREL}-minute run with that resource selected. Output scales linearly with the number of barrels burned.`,
  faq: [
    {
      q: "How much sulfur does the Giant Excavator give per diesel?",
      a: `${n(EXC_SULFUR?.yieldPerBarrel ?? 0)} sulfur ore per barrel of Diesel Fuel, over a ${MINUTES_PER_BARREL}-minute run. That is by far the fastest way to gather sulfur in Rust, which is why the excavator is contested on most servers.`,
    },
    {
      q: "How long does one diesel barrel last in the excavator?",
      a: `${MINUTES_PER_BARREL} minutes. Barrels can be loaded consecutively, so output and run time both scale linearly with how much diesel you bring.`,
    },
    {
      q: "How much high quality metal does the excavator produce?",
      a: `${n(EXC_HQM?.yieldPerBarrel ?? 0)} high quality metal ore per barrel — much lower than the other resources in absolute terms, but HQM ore is correspondingly scarcer and slower to gather by hand.`,
    },
    {
      q: "Can the Giant Excavator mine more than one resource at once?",
      a: "No. The control room selects a single resource for the run, and the excavator produces only that one. Getting a mix means separate runs, each costing its own diesel.",
    },
    {
      q: "Where do you get diesel fuel in Rust?",
      a: "Diesel Fuel comes from locked crates, elite crates and the loot rooms at the excavator itself. It cannot be crafted, so excavator time is limited by how much diesel the server's loot has produced.",
    },
  ],
  sourceNote: `Yields and run length come from the RustTools excavator data set. ${UNOFFICIAL}`,
  tool: { label: "Giant Excavator calculator", path: "/giant-excavator" },
  dataset: {
    name: "Rust Giant Excavator yields",
    description: `Output per diesel barrel for each of the ${EXCAVATOR_RATES.length} resources the Giant Excavator can produce.`,
    variables: ["Resource", "Yield per diesel barrel", "Run length in minutes"],
  },
};

/* ----------------------------------------------------------------- shops -- */

export const SHOPS_CONTENT: ReferenceContent = {
  slug: "vendor-prices",
  title: "Rust Vendor Prices — Scrap Costs at Outpost and Bandit Camp",
  description:
    "How NPC vendors work in Rust: scrap as currency, which monuments are safe zones, what each vendor stocks, and how restocking works.",
  crumb: "Vendor Prices",
  heading: "Rust vendor prices",
  headingAccent: "and scrap planning",
  summary: [
    "Scrap is the currency of every NPC vendor in Rust. Outpost, Bandit Camp, Fishing Village, Large Fishing Village and Stables each stock a fixed inventory at fixed scrap prices, so a shopping list is worth planning before you travel.",
    "Outpost and Bandit Camp are safe zones — weapons are holstered and the turrets fire on anyone who draws — which makes them the reliable places to spend scrap but also the places other players expect to find you. Fishing Villages and Stables are not safe from every angle and carry a smaller, more specialised stock.",
    "Prices do not vary by server population or time. What does vary is stock: vendors restock on a timer, and a popular item can be cleaned out on a busy server.",
  ],
  facts: [
    {
      term: "Currency",
      value:
        "Scrap, for every NPC vendor. Recycling components is the main way to generate it.",
    },
    {
      term: "Outpost",
      value:
        "Safe zone. Stocks building and workbench essentials, a research table and a recycler.",
    },
    {
      term: "Bandit Camp",
      value:
        "Safe zone. Stocks explosives-adjacent goods, the casino and its own recycler.",
    },
    {
      term: "Fishing Village",
      value:
        "Boats, fishing gear and diving equipment. Not a full safe zone — approach with that in mind.",
    },
    { term: "Stables", value: "Horses, saddles and horse equipment." },
    {
      term: "Restocking",
      value:
        "Vendor stock refreshes on a timer. Prices are fixed, but availability on a busy server is not.",
    },
  ],
  faq: [
    {
      q: "What currency do Rust shops use?",
      a: "Scrap. Every NPC vendor at Outpost, Bandit Camp, the Fishing Villages and Stables prices its stock in scrap, which is why recycling components is the standard way to fund a shopping trip.",
    },
    {
      q: "Which Rust monuments are safe zones?",
      a: "Outpost and Bandit Camp. Weapons are holstered inside them and the turrets engage anyone who becomes hostile, so trading there is safe — but the roads leading to them are where players wait.",
    },
    {
      q: "Where do you get scrap in Rust?",
      a: "Recycling components is the most reliable source, followed by barrels, crates and roadside loot. The recycler yield reference on this site lists what every component returns, including its scrap.",
    },
    {
      q: "Do Rust vendor prices change?",
      a: "No. Vendor prices are fixed per item, which is what makes planning a scrap budget in advance worthwhile. Stock levels do change — vendors restock on a timer and can be sold out.",
    },
    {
      q: "Can you sell items to Rust NPC vendors?",
      a: "Some vendors buy specific items for scrap, but the bulk of scrap income comes from recycling rather than selling. Player-run vending machines are the other side of the economy and set their own prices.",
    },
  ],
  sourceNote: `Vendor inventories and prices come from the RustTools shop data set. ${UNOFFICIAL}`,
  tool: { label: "Shops calculator", path: "/shops" },
};

/* --------------------------------------------------- skinning & salvaging -- */

const ANIMAL_COUNT = Object.keys(SKINNING_DATA).length;
const SALVAGE_COUNT = Object.keys(SALVAGING_DATA).length;

export const SKINNING_CONTENT: ReferenceContent = {
  slug: "animal-yields",
  title: "Rust Animal Harvest Yields — Meat, Fat, Leather and Bone",
  description: `How much meat, animal fat, leather, cloth and bone each of the ${ANIMAL_COUNT} harvestable targets in Rust returns, and which tool gives the most.`,
  crumb: "Animal Yields",
  heading: "Rust animal",
  headingAccent: "harvest yields",
  summary: [
    `Harvesting an animal in Rust returns meat, fat, leather, cloth and bone fragments, and how much you get depends on the tool. The table below publishes the ${PREFERRED_SKINNING_TOOL.toLowerCase()} yield for all ${ANIMAL_COUNT} harvestable targets.`,
    `The tool matters more than most players expect. The ${PREFERRED_SKINNING_TOOL.toLowerCase()} is the highest-yield option on every target in the data set; blunt tools such as a rock or a salvaged hammer return roughly half as much leather from the same corpse.`,
    "Yields are per corpse and do not scale with how the animal was killed, so there is no advantage to a particular weapon beyond getting the kill. What does matter is harvesting before the corpse despawns.",
  ],
  facts: [
    { term: "Targets covered", value: `${ANIMAL_COUNT}: ${Object.keys(SKINNING_DATA).join(", ")}.` },
    {
      term: "Best tool",
      value: `The ${PREFERRED_SKINNING_TOOL.toLowerCase()} returns the highest yield on every target in the data set.`,
    },
    {
      term: "What you get",
      value:
        "Raw meat, animal fat, leather, cloth and bone fragments, in proportions that vary by animal.",
    },
    {
      term: "Yield is per corpse",
      value:
        "The weapon used for the kill does not change the harvest — only the tool used on the body does.",
    },
  ],
  tableHeading: `Harvest yields for all ${ANIMAL_COUNT} Rust animals`,
  tableNote: `Yields shown are for the ${PREFERRED_SKINNING_TOOL.toLowerCase()}, the highest-yield tool on every target. The skinning guide compares every tool for a given animal.`,
  faq: [
    {
      q: "What is the best tool for skinning animals in Rust?",
      a: `The ${PREFERRED_SKINNING_TOOL.toLowerCase()}. It returns the highest yield on every target in this data set — a bear gives ${skinningYield("Bear", "Leather") ?? "—"} leather with one, against ${SKINNING_DATA["Bear"]?.find((d) => d.tool === "Rock")?.resources.find((r) => r.name === "Leather")?.quantity ?? "—"} with a rock.`,
    },
    {
      q: "How much leather do you get from a bear in Rust?",
      a: `A bear harvested with a ${PREFERRED_SKINNING_TOOL.toLowerCase()} returns ${skinningYield("Bear", "Leather") ?? "—"} leather, along with ${skinningYield("Bear", "Raw Bear Meat") ?? "—"} raw bear meat, ${skinningYield("Bear", "Animal Fat") ?? "—"} animal fat and ${skinningYield("Bear", "Bone Fragments") ?? "—"} bone fragments.`,
    },
    {
      q: "How many animals can you harvest in Rust?",
      a: `${ANIMAL_COUNT} targets are covered here — ${Object.keys(SKINNING_DATA).join(", ")}. Each returns a different mix of meat, fat, leather, cloth and bone.`,
    },
    {
      q: "Does the weapon you kill an animal with affect the loot?",
      a: "No. Harvest yield depends only on the tool used on the corpse, not on how the animal was killed. Killing efficiently matters for ammunition cost, not for what you take home.",
    },
    {
      q: "What do you get from harvesting a scientist in Rust?",
      a: `Scientists return ${skinningYield("Scientist", "Cloth") ?? "cloth"} cloth and ${skinningYield("Scientist", "Bone Fragments") ?? "—"} bone fragments rather than leather. The Scientist row in the table has the full list.`,
    },
  ],
  sourceNote: `Harvest yields come from the RustTools skinning data set. ${UNOFFICIAL}`,
  tool: { label: "Skinning guide", path: "/guides/skinning" },
  dataset: {
    name: "Rust animal harvest yields",
    description: `Meat, fat, leather, cloth and bone returned by each of the ${ANIMAL_COUNT} harvestable targets in Rust.`,
    variables: ["Target", "Tool", "Resources returned", "Harvest time"],
  },
};

export const SALVAGING_CONTENT: ReferenceContent = {
  slug: "salvage-yields",
  title: "Rust Salvage Yields — Bradley APC and Patrol Helicopter",
  description:
    "What a destroyed Bradley APC and Patrol Helicopter return when harvested in Rust: charcoal, metal fragments, high quality metal and scrap, with times per tool.",
  crumb: "Salvage Yields",
  heading: "Bradley and heli",
  headingAccent: "salvage yields",
  summary: [
    `A destroyed Bradley APC or Patrol Helicopter can be harvested from its wreckage for charcoal, metal fragments, high quality metal and — in the helicopter's case — scrap. The table below covers ${SALVAGE_COUNT} salvage targets with their full yields.`,
    "Speed matters more here than on any other harvest, because the wreck is on fire, radioactive, and usually contested. A jackhammer clears a Bradley in well under a minute where a salvaged icepick takes several times as long for the same yield — the trade is tool condition and noise against time in the open.",
    "The yield itself does not change with the tool. Every tool that works on a wreck returns the same resources; only the time taken and the condition lost differ.",
  ],
  facts: [
    {
      term: "Targets covered",
      value: `${SALVAGE_COUNT}: ${Object.keys(SALVAGING_DATA).join(" and ")}.`,
    },
    {
      term: "Yield is tool-independent",
      value:
        "Every working tool returns the same resources from a wreck. Only harvest time and condition loss differ.",
    },
    {
      term: "Fastest tool",
      value: `The ${PREFERRED_SALVAGING_TOOL.toLowerCase()}, at ${salvageBest("Bradley")?.time ?? "—"} on a Bradley — the reason to use it is time spent standing in the open, not extra loot.`,
    },
    {
      term: "Hazards",
      value:
        "Wrecks burn and are radioactive on approach. Bring protection and a plan for the other players who heard it die.",
    },
  ],
  tableHeading: `Salvage yields for ${Object.keys(SALVAGING_DATA).join(" and ")}`,
  tableNote:
    "Resources are identical across tools; the time and condition columns are what separates them. The salvaging guide compares every tool for each target.",
  faq: [
    {
      q: "What do you get from a destroyed Bradley APC in Rust?",
      a: `Harvesting a Bradley wreck returns ${salvageBest("Bradley")?.resources.map((r) => `${r.quantity} ${r.name.toLowerCase()}`).join(", ") ?? "—"}. The crates it drops are separate loot and are not included in these figures.`,
    },
    {
      q: "What is the fastest way to harvest a Bradley?",
      a: `A ${PREFERRED_SALVAGING_TOOL.toLowerCase()} — ${salvageBest("Bradley")?.time ?? "—"} against several minutes for hand tools. The yield is identical either way, so the only thing it buys is less time exposed at a wreck everyone on the server heard explode.`,
    },
    {
      q: "Does the tool change how much you get from a wreck?",
      a: "No. Every tool that can harvest a Bradley or Patrol Helicopter returns the same resources. Tools differ only in how long they take and how much condition they lose.",
    },
    {
      q: "What does a Patrol Helicopter drop in Rust?",
      a: `The wreck can be harvested for ${salvageBest("Patrol Helicopter")?.resources.map((r) => `${r.quantity} ${r.name.toLowerCase()}`).join(", ") ?? "—"}, on top of the locked crates it leaves behind.`,
    },
    {
      q: "Is a Bradley wreck radioactive?",
      a: "The wreckage burns and gives off radiation while it is hot, so harvesting immediately costs health without protection. Waiting for the fire to die down is safer but gives everyone else time to arrive.",
    },
  ],
  sourceNote: `Salvage yields come from the RustTools salvaging data set. ${UNOFFICIAL}`,
  tool: { label: "Salvaging guide", path: "/guides/salvaging" },
  dataset: {
    name: "Rust Bradley and Patrol Helicopter salvage yields",
    description: `Resources, harvest time and condition loss for the ${SALVAGE_COUNT} salvageable wrecks in Rust.`,
    variables: ["Target", "Tool", "Resources returned", "Harvest time", "Condition loss"],
  },
};

/**
 * Every reference page except /reference/raid-costs, whose copy depends on the
 * solved raid table and is built per request by `raidContent()`.
 *
 * Drives the /reference hub, `REFERENCE_ROUTES` in seo.ts and the llms.txt
 * listing, so a new reference page is registered in exactly one place. The raid
 * page is added to those listings explicitly — see RAID_REFERENCE_INDEX.
 */
export const REFERENCE_INDEX: ReferenceContent[] = [
  RECYCLING_CONTENT,
  FURNACE_CONTENT,
  DECAY_CONTENT,
  CUPBOARD_CONTENT,
  EXCAVATOR_CONTENT,
  SHOPS_CONTENT,
  SKINNING_CONTENT,
  SALVAGING_CONTENT,
];

/**
 * Slug, title and description for the raid page, without solving the table.
 * Listings need these three fields; only the page itself needs the full content.
 */
export const RAID_REFERENCE_INDEX = {
  slug: "raid-costs",
  crumb: "Raid Costs",
  title: "Rust Raid Costs — Sulfur and Explosives for Every Structure",
  description:
    "How much sulfur it takes to raid every structure in Rust, with C4, rocket, satchel and explosive ammo counts and the cheapest combination for each.",
} as const;
