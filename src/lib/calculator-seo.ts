/**
 * On-page copy for the block underneath each calculator (see CalcSeo).
 *
 * Kept out of the page files so the wording can be reviewed and edited in one
 * place. This text is the only substantial content a crawler sees on a
 * calculator route — the widgets themselves are client components behind a
 * Suspense boundary — so it is written to read naturally while covering the
 * phrases people actually search ("rust raid calculator", "rust recycle
 * calculator", …) in headings and body copy rather than in a keyword list.
 *
 * Rule for the FAQs: every entry here is rendered visibly on the page and also
 * emitted as FAQPage structured data. Never add one that isn't shown.
 */
import type { Faq } from '@/components/CalcSeo'

export type CalcSeoContent = {
  name: string
  path: string
  crumb: string
  description: string
  intro: string[]
  steps: string[]
  faqs: Faq[]
}

/** Populated at the bottom of this file — the ItemList on /calculators is
 *  built from it, so a new calculator only has to be added in one place. */
export const CALCULATOR_SEO_INDEX: CalcSeoContent[] = []

export const RAID_SEO: CalcSeoContent = {
  name: 'Rust Raid Calculator',
  path: '/raid',
  crumb: 'Raid Calculator',
  description:
    'Work out the cheapest way to break any structure in Rust, by sulfur cost or by explosive count.',
  intro: [
    'The Rust raid calculator answers the question every raid starts with: what is the cheapest way through this wall? Pick the structure you are hitting — a sheet metal wall, an armored door, a garage door, a stone foundation — and the tools you have unlocked, and it works out which combination actually breaks it for the least sulfur.',
    'Raid costs in Rust are not linear. Rockets are fast but expensive, satchels are cheap but unreliable against higher tiers, and explosive ammo is often the sleeper pick against doors. Walls also behave differently depending on which face you hit: the soft side takes far more damage than the hard side, which is why the tool lists the same wall twice.',
    'Everything is derived from current in-game damage values, so the numbers reflect what your explosives will actually do this wipe rather than a stale wiki table.',
  ],
  steps: [
    'Choose the target structure — the material and the specific building block or door you plan to break.',
    'Select the raiding tools you have available. Anything you leave unchecked is excluded from the result.',
    'Pick your optimisation mode: cheapest by sulfur, or the fewest explosives when you are short on time or inventory space.',
    'Read off the full resource cost — sulfur, charcoal and the crafted items — and check the structural integrity panel before you commit.',
  ],
  faqs: [
    {
      q: 'How much sulfur does it take to raid a sheet metal door?',
      a: 'Select the sheet metal door as the target structure and the calculator returns the cheapest working combination along with its exact sulfur cost. The answer changes depending on which explosives you have unlocked, which is why it is calculated rather than quoted as a fixed number.',
    },
    {
      q: 'What is the difference between the soft side and the hard side of a wall?',
      a: 'Walls in Rust take substantially more damage from the inside face (the soft side) than the outside face (the hard side). The calculator lists both so you can compare the cost of going through a wall directly versus reaching a soft side first.',
    },
    {
      q: 'Should I optimise for sulfur or for the number of explosives?',
      a: 'Optimise for sulfur when you are farming the raid yourself and cost is the constraint. Optimise for the fewest explosives when inventory space or raid speed matters more — for example on an online raid where every second at the wall counts.',
    },
    {
      q: 'Does the calculator include the cost of crafting the explosives?',
      a: 'Yes. The result breaks the total down into raw resources, so the sulfur figure already accounts for what goes into crafting each rocket, satchel or C4.',
    },
    {
      q: 'Is the raid calculator free?',
      a: 'Yes, entirely free with no account needed. Your selections are stored in the URL, so you can copy the link to share a raid plan with your team.',
    },
  ],
}

export const RECYCLING_SEO: CalcSeoContent = {
  name: 'Rust Recycling Calculator',
  path: '/recycling',
  crumb: 'Recycling Calculator',
  description:
    'See exactly what any item returns when recycled in Rust, for both Radtown and Safe Zone recyclers.',
  intro: [
    'The Rust recycle calculator tells you what a stack of loot is actually worth before you carry it home. Add the components, weapons or clothing you picked up and it returns the exact scrap, metal fragments, high quality metal, cloth and other output you will get back.',
    'Recycler output is not the same everywhere. The recyclers at Outpost and Bandit Camp return less than the ones you find in Radtown monuments, so the same box of loot is worth measurably more if you carry it to the right machine. Switch between the two recycler types to compare before deciding where to run.',
    'This is the fastest way to answer the two questions that come up on every scrap run: is this worth recycling at all, and is it worth the trip to a safe zone.',
  ],
  steps: [
    'Choose the recycler type — Radtown for monument recyclers, Safe Zone for Outpost and Bandit Camp.',
    'Search for the items you looted and add them, setting the quantity for each.',
    'Read the combined output totals to see the full return across every item you added.',
    'Compare the two recycler types to decide whether the safe zone trip is worth it.',
  ],
  faqs: [
    {
      q: 'Do safe zone recyclers give less than Radtown recyclers?',
      a: 'Yes. Recyclers inside Outpost and Bandit Camp return a reduced yield compared with the recyclers found at Radtown monuments. Toggle between the two modes in the calculator to see the difference for the exact items you are carrying.',
    },
    {
      q: 'What gives the most scrap when recycled in Rust?',
      a: 'Electrical components and higher-tier weapon attachments are consistently among the best scrap-per-slot returns. Add the items you have to the calculator and sort by the output to see what is worth the inventory space on the way home.',
    },
    {
      q: 'Is it better to recycle components or keep them?',
      a: 'It depends what you are building toward. Components like gears, springs and sheet metal are often more valuable kept for crafting than converted to scrap. The calculator shows you the exact trade so you can decide per item.',
    },
    {
      q: 'How long does a recycler take?',
      a: 'A recycler processes one stack at a time on a fixed interval per item. The calculator focuses on the output rather than the timing, since in practice you queue everything and loot the machine when it finishes.',
    },
    {
      q: 'Is the recycling data up to date?',
      a: 'The yield data is generated from the current game files and regenerated after balance patches, so it tracks what the recycler actually gives you rather than historical values.',
    },
  ],
}

export const CUPBOARD_SEO: CalcSeoContent = {
  name: 'Rust Cupboard Calculator',
  path: '/cupboard',
  crumb: 'Cupboard Calculator',
  description:
    'Work out how long a Rust base stays protected from the resources in its Tool Cupboard.',
  intro: [
    'The Rust cupboard calculator turns your daily upkeep into the one number that matters: how many hours or days your base survives before it starts decaying. Enter the upkeep your Tool Cupboard shows and the resources you have, and it lays the result out across all 24 cupboard slots.',
    'Upkeep in Rust scales with what you have built. Every foundation, wall and floor adds to the hourly cost, and the cupboard drains wood, stone, metal fragments and high quality metal in proportion to the materials used. Miss the window and the base begins to decay from the outside in.',
    'Use it before a break from the game to work out exactly how much you need to leave in the box to still have a base when you get back.',
  ],
  steps: [
    'Read the hourly upkeep figure from your Tool Cupboard in game.',
    'Enter that upkeep along with the resources you plan to leave in the cupboard.',
    'Check the resulting protection time and the 24-slot layout it produces.',
    'Adjust the amounts until the protection time covers however long you will be offline.',
  ],
  faqs: [
    {
      q: 'How long does a Tool Cupboard last in Rust?',
      a: 'It depends entirely on your upkeep cost and how much you leave inside. A small base with low upkeep can stay protected for days on a single full cupboard, while a large compound can burn through the same resources in hours. Enter your upkeep to get the exact figure.',
    },
    {
      q: 'How many slots does a Tool Cupboard have?',
      a: 'A Tool Cupboard has 24 slots. The calculator lays your resources out across those slots so you can see how the stacks fill it and whether you have room for everything you want to leave.',
    },
    {
      q: 'What happens when the cupboard runs out?',
      a: 'The base stops being maintained and begins to decay. Structures lose health over time based on their building material, starting with the pieces at the outside of the base.',
    },
    {
      q: 'How do I reduce base upkeep in Rust?',
      a: 'Build fewer, larger rooms rather than sprawling designs, avoid unnecessary honeycomb layers, and remove building blocks you no longer need. Upkeep scales with the total number of pieces and the tier they are built in.',
    },
  ],
}

export const DECAY_SEO: CalcSeoContent = {
  name: 'Rust Decay Calculator',
  path: '/decay',
  crumb: 'Decay Calculator',
  description:
    'Calculate how long any Rust structure survives without upkeep, by building material and current HP.',
  intro: [
    'The Rust decay calculator tells you how long a structure lasts once it is no longer protected by a Tool Cupboard. Pick the building material and its current health and it returns the full time until the piece is destroyed.',
    'Decay rates differ sharply by tier. Twig disappears almost immediately, wood goes quickly, stone lasts considerably longer, and sheet metal and armored last longest of all. That difference is what makes decay a raiding tool as much as a maintenance concern — knowing when an abandoned base falls on its own is often more useful than knowing what it costs to breach.',
    'It is equally useful in the other direction: working out how long your own base has left after a raid took the cupboard.',
  ],
  steps: [
    'Select the building material of the structure you are checking.',
    'Enter its current HP, or leave it at full health for a fresh piece.',
    'Read the total decay time until the structure is destroyed.',
    'Compare materials to see how much longer an upgrade would buy you.',
  ],
  faqs: [
    {
      q: 'How long does a stone base take to decay in Rust?',
      a: 'Stone lasts substantially longer than wood but far less than sheet metal. Select stone and the current HP in the calculator for the exact remaining time.',
    },
    {
      q: 'Does decay start immediately when the cupboard empties?',
      a: 'Structures begin losing health once they are no longer maintained. The rate is fixed per building tier, so the countdown is predictable — which is what the calculator computes.',
    },
    {
      q: 'Does decay damage the whole base at once?',
      a: 'No. Decay applies to individual building blocks, and pieces that are exposed on the outside of the base take it first. That is why bases collapse from the outside in.',
    },
    {
      q: 'Can I stop decay without a Tool Cupboard?',
      a: 'No. Repairing a piece restores its health, but only upkeep from a stocked Tool Cupboard prevents decay from continuing.',
    },
  ],
}

export const FURNACE_SEO: CalcSeoContent = {
  name: 'Rust Furnace Calculator',
  path: '/furnace',
  crumb: 'Smelting Calculator',
  description:
    'Calculate smelting time, wood cost and output for every furnace and oven in Rust.',
  intro: [
    'The Rust furnace calculator works out how long a smelt takes and what it costs. Choose your smelter — campfire, furnace, large furnace, electric furnace or one of the refineries and ovens — pick what you are processing, and enter the amount.',
    'The result covers the full picture: total smelting time based on how the stack splits across the smelter\'s slots, the wood required to keep it burning, the charcoal you get back as a by-product, and the final output quantity. Charcoal in particular is easy to underestimate, and it is what most gunpowder production actually bottlenecks on.',
    'It handles ore into metal fragments, sulfur ore into sulfur, high quality metal ore, and cooking raw food, so the same tool covers the smelting bank and the campfire.',
  ],
  steps: [
    'Pick the smelter you are using — slot count and burn rate differ significantly between them.',
    'Select the target process, such as metal ore into metal fragments.',
    'Enter the amount you want to process.',
    'Read the total time, wood cost, charcoal by-product and final output.',
  ],
  faqs: [
    {
      q: 'How long does it take to smelt metal ore in Rust?',
      a: 'It depends on the smelter and how the stack divides across its slots — a large furnace processes far more in parallel than a standard furnace. Enter your amount and smelter type for the exact time.',
    },
    {
      q: 'How much charcoal do I get from smelting?',
      a: 'Charcoal is produced as a by-product of burning wood, so it scales with the wood consumed rather than the ore smelted. The calculator shows the expected charcoal alongside the wood cost.',
    },
    {
      q: 'Is a large furnace better than several small furnaces?',
      a: 'A large furnace processes much more at once, but it costs more to build and burns more wood. Compare the two in the calculator using the same input quantity to see which suits the amount you actually smelt per wipe.',
    },
    {
      q: 'How much wood do I need to smelt sulfur ore?',
      a: 'Select sulfur ore as the process and enter your quantity — the wood requirement is calculated from the burn time needed for that amount in your chosen smelter.',
    },
  ],
}

export const SHOPS_SEO: CalcSeoContent = {
  name: 'Rust Shops Calculator',
  path: '/shops',
  crumb: 'Shops Calculator',
  description:
    'Calculate scrap costs and track purchases at Bandit Camp, Outpost and Fishing Village in Rust.',
  intro: [
    'The Rust shops calculator prices out a safe zone run before you make it. It covers the vending machines at Outpost, Bandit Camp and the Fishing Villages, so you can total up a shopping list in scrap and know whether you have enough before you walk in.',
    'It also tracks your balance as you add purchases, which matters because safe zone prices are fixed but your scrap is not — and running out halfway through a run usually means a second trip past whoever is camping the road.',
    'Useful for planning the standard early-wipe purchases as well as the bigger buys later on.',
  ],
  steps: [
    'Choose the shop you are visiting — Outpost, Bandit Camp or Fishing Village.',
    'Add the items you intend to buy and set quantities.',
    'Enter the scrap you are carrying to track the running balance.',
    'Adjust the list until the total fits the scrap you actually have.',
  ],
  faqs: [
    {
      q: 'How much scrap do I need at Outpost?',
      a: 'It depends on your shopping list. Add the items you want to the calculator and it totals the scrap cost, so you know exactly how much to farm before the trip.',
    },
    {
      q: 'Are Bandit Camp and Outpost prices the same?',
      a: 'No, the two safe zones stock different items at different prices, and the Fishing Villages differ again. The calculator prices each shop separately.',
    },
    {
      q: 'What is the best thing to buy with scrap in Rust?',
      a: 'Early wipe, tools and the components that unblock your first workbench usually pay for themselves fastest. Later the answer shifts toward explosives and higher-tier gear.',
    },
  ],
}

export const GENETICS_SEO: CalcSeoContent = {
  name: 'Rust Genetics Calculator',
  path: '/genetics',
  crumb: 'Genetics Calculator',
  description:
    'Cross-breed plant genes in Rust to find the best crop genetics from your current seeds.',
  intro: [
    'The Rust genetics calculator finds the best gene combination you can reach from the seeds you already have. Enter the gene sets from your cloned plants and it works out which crosses produce the strongest offspring.',
    'Plant genes in Rust are six slots of G, Y, H, W, X and Y traits. Growth, yield and hardiness are what you want; water and the empty traits are what you are trying to breed out. Crossing plants favours the dominant genes, which is why a methodical approach beats planting at random.',
    'This is the difference between a farm that feeds a clan and one that never quite produces enough.',
  ],
  steps: [
    'Read the gene sets from your plants in game — you need a cloned or planted crop to see them.',
    'Enter each gene set into the calculator.',
    'Run the cross to see the best achievable combination from what you have.',
    'Clone the winning plant and repeat with the improved stock.',
  ],
  faqs: [
    {
      q: 'What are the best genes in Rust?',
      a: 'Six growth (G) genes is the theoretical ideal for speed, but in practice a mix weighted toward growth and yield with no water or empty traits is what most farms aim for. The calculator shows the best you can reach from your current seeds.',
    },
    {
      q: 'How does gene crossbreeding work in Rust?',
      a: 'When plants are grown next to each other, genes cross with a dominance order that favours certain traits. Repeatedly crossing and cloning the best results converges on a strong gene set.',
    },
    {
      q: 'Do I need a cloner to farm genetics?',
      a: 'Cloning is what makes selective breeding practical — it lets you preserve a good gene set exactly rather than gambling on seeds each generation.',
    },
  ],
}

export const GIANT_EXCAVATOR_SEO: CalcSeoContent = {
  name: 'Rust Giant Excavator Calculator',
  path: '/giant-excavator',
  crumb: 'Giant Excavator Calculator',
  description:
    'Calculate Giant Excavator output and diesel fuel consumption in Rust.',
  intro: [
    'The Giant Excavator calculator works out what a run at the monument actually returns. Set the resource the excavator is configured for and the diesel you have, and it gives you the total output and how long the machine runs.',
    'The Excavator is the highest-throughput resource source in the game, but diesel is scarce and the monument is loud, open and impossible to hide in. Knowing the return before you commit tells you whether the fuel is better spent here or somewhere quieter.',
    'Covers stone, metal fragments, high quality metal and sulfur output.',
  ],
  steps: [
    'Select the resource the excavator is set to mine.',
    'Enter how many diesel barrels you have.',
    'Read the total resource output and the run time it produces.',
    'Compare resources to decide what the fuel is best spent on.',
  ],
  faqs: [
    {
      q: 'How much does one diesel give at the Giant Excavator?',
      a: 'Each barrel of diesel runs the excavator for a fixed period, and the resource yield over that period depends on which resource the machine is configured for. Enter your barrel count for the exact totals.',
    },
    {
      q: 'Is the Giant Excavator worth it?',
      a: 'For sulfur and high quality metal it is generally the fastest source in the game, but it is a loud, exposed monument. The output figures let you weigh the return against the risk.',
    },
    {
      q: 'Where do I get diesel in Rust?',
      a: 'Diesel barrels come from the Excavator monument itself, from the Oil Rigs, and from crates at other high-tier monuments.',
    },
  ],
}

export const SALVAGING_SEO: CalcSeoContent = {
  name: 'Rust Salvaging Calculator',
  path: '/salvaging',
  crumb: 'Salvaging Calculator',
  description:
    'Calculate what a destroyed Bradley APC or Patrol Helicopter returns when salvaged in Rust.',
  intro: [
    'The Rust salvaging calculator shows what you get out of a destroyed Bradley APC or Patrol Helicopter. Both leave burning debris that has to be looted quickly, and the returns — charcoal, metal fragments and high quality metal among them — are worth knowing before you decide whether the fight is worth taking.',
    'Bradley at Launch Site and the Patrol Helicopter are both contested by definition: anyone nearby heard it die. Knowing the actual return helps you judge whether to commit to the gibs or leave them to whoever else is coming.',
  ],
  steps: [
    'Choose the target — Bradley APC or Patrol Helicopter.',
    'Set how many crates or debris piles you expect to reach.',
    'Read the expected resource return.',
  ],
  faqs: [
    {
      q: 'What do you get from Bradley in Rust?',
      a: 'A destroyed Bradley leaves crates and salvageable debris containing high-tier components, charcoal, metal fragments and high quality metal. The calculator totals the expected return.',
    },
    {
      q: 'Is killing the Patrol Helicopter worth it?',
      a: 'The loot is strong, but the fight costs ammunition and the debris burns on open ground where anyone can contest it. The output figures let you weigh that up.',
    },
  ],
}

export const SKINNING_SEO: CalcSeoContent = {
  name: 'Rust Skinning Calculator',
  path: '/skinning',
  crumb: 'Skinning Calculator',
  description:
    'See how much meat, fat, leather and bone you get from skinning each animal in Rust.',
  intro: [
    'The Rust skinning calculator shows exactly what each animal gives you and how much the tool you use changes it. Bears, boar, deer, wolves, chickens and horses all return different amounts of raw meat, animal fat, leather, cloth and bone fragments.',
    'The tool matters more than most players expect: harvesting with a bone knife or a chainsaw does not produce the same yield as hitting a corpse with a rock. If you are farming cloth or fat deliberately — for gunpowder, for low grade fuel, for medical syringes — the difference adds up quickly.',
  ],
  steps: [
    'Pick the animal you are harvesting.',
    'Select the tool you are using to skin it.',
    'Read the full breakdown of meat, fat, leather, cloth and bone.',
  ],
  faqs: [
    {
      q: 'What is the best tool for skinning animals in Rust?',
      a: 'Dedicated harvesting tools return noticeably more than improvised ones. Compare tools in the calculator against the animal you are hunting to see the exact difference.',
    },
    {
      q: 'Which animal gives the most fat in Rust?',
      a: 'Larger animals return the most animal fat, which is what low grade fuel production depends on. Compare animals in the calculator to see the per-kill returns.',
    },
    {
      q: 'How do I get bone fragments in Rust?',
      a: 'Bone fragments come from harvesting animal corpses. The yield varies by animal size and by the tool used.',
    },
  ],
}

CALCULATOR_SEO_INDEX.push(
  RAID_SEO,
  RECYCLING_SEO,
  CUPBOARD_SEO,
  FURNACE_SEO,
  DECAY_SEO,
  SHOPS_SEO,
  GENETICS_SEO,
  SKINNING_SEO,
  SALVAGING_SEO,
  GIANT_EXCAVATOR_SEO,
)
