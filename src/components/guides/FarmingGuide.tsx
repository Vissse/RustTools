import Link from 'next/link'

import { ReqCard, Step, Tip, ImagePlaceholder, Reveal } from './GuideComponents'

export function FarmingGuide() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      {/* Breadcrumbs */}
      <div className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-text-bright transition-colors">
          Guides
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">Farming</span>
      </div>

      {/* Hero Section */}
      <header className="guide-hero animate-fade-in-up">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
            The Ultimate <span className="text-rust">Rust Farming</span> Guide
          </h1>
          <p className="text-2xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
            From Seeds to Perfect Genetics
          </p>
        </div>
      </header>

      {/* Introduction */}
      <Reveal className="guide-intro">
        <p className="text-text leading-loose text-xl font-light max-w-4xl">
          In this guide, you will learn how to build a fully functional and
          highly efficient farm in Rust. You will discover everything from
          proper irrigation and lighting to advanced gene crossbreeding and
          animal farming.
        </p>
      </Reveal>

      {/* Requirements Box */}
      <Reveal className="guide-reqs-box">
        {/* Oranžová čára do ztracena */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-rust to-transparent" />

        <h2 className="guide-reqs-title">Requirements</h2>
        <div className="guide-reqs-list">
          <ReqCard title="Seeds" desc="Hemp, corn, pumpkins, or berries." />
          <ReqCard title="Planters" desc="Wood and tarps for Large Planters." />
          <ReqCard
            title="Water Source"
            desc="Swamp, river, or Rain Catchers."
          />
          <ReqCard
            title="Equipment"
            desc="Pumps, hoses, sprinklers, power, UV lamps."
          />
          <ReqCard title="Composter" desc="For producing fertilizer." />
        </div>
      </Reveal>

      {/* Steps (Timeline Layout) */}
      <div className="section-gap">
        <Reveal>
          <h2 className="guide-steps-title">Step-by-Step Process</h2>
        </Reveal>

        <div className="guide-steps-list">
          {/* STEP 1 */}
          <Step number={1} title="Choosing and Placing Planters">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              While you can plant seeds in natural soil, it is highly
              inefficient. For large-scale farming, the{' '}
              <strong className="text-text-bright font-medium">
                Large Planter
              </strong>{' '}
              is your best option, holding 9 plants and 9 liters of water. For
              micro-farms or filling tight spaces, use the cheap and
              space-saving Plant Pot.
            </p>
            <ImagePlaceholder label="Screenshot showing the ideal layout of several Large Planters placed tightly together on square foundations" />
          </Step>

          {/* STEP 2 */}
          <Step number={2} title="Setting up Perfect Lighting">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              To keep the light level at 100%, you need to craft a UV grow lamp
              (or use a standard ceiling lamp). The lamp's coverage is a
              hemisphere that extends about two floors down and one square
              foundation to the sides. If you place one lamp exactly between
              four planters, or hang it on the intersection of four foundations,
              you can light up multiple planters at once.
            </p>
          </Step>

          {/* STEP 3 */}
          <Step number={3} title="Building the Irrigation System">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Plants constantly consume water, but you don't water the plant
              directly—you fill the planter itself. The optimal water level for
              100% happiness is to keep the planter filled to about{' '}
              <strong className="text-text-bright font-medium">60–65%</strong>{' '}
              of its total capacity.
            </p>
            <ul className="list-disc list-inside text-text leading-loose text-lg font-light space-y-4 mb-10 ml-2">
              <li>Place a water pump into a fresh water source.</li>
              <li>Connect it directly to a sprinkler using a hose.</li>
              <li>
                Place the sprinkler in the center of a four-planter block to
                distribute water evenly.
              </li>
            </ul>
            <ImagePlaceholder label="Logical diagram or screenshot showing a Water Pump connected via hose to a Sprinkler hanging perfectly above the intersection of four Large Planters" />
          </Step>

          {/* STEP 4 */}
          <Step number={4} title="Providing Fertilizer">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Even with perfect water and light, soil needs fertilizer to
              achieve 100% plant happiness.
            </p>
            <ul className="list-disc list-inside text-text leading-loose text-lg font-light space-y-4 ml-2">
              <li>Craft a Composter.</li>
              <li>
                Gather horse dung by keeping a horse and feeding it (1 dung = 10
                fertilizer).
              </li>
              <li>
                The soil consumes exactly one fertilizer per sapling per growth
                cycle.
              </li>
            </ul>
          </Step>

          {/* STEP 5 */}
          <Step number={5} title="Temperature Control (Biome Dependent)">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Plants can experience discomfort from incorrect temperatures. To
              control this, use an electric heater. Heaters warm all seedlings
              within a radius of just over one square and heat perfectly through
              walls.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-panel p-8 border-l-[4px] border-l-[#8b9264] border border-border relative overflow-hidden">
                <h4 className="text-text-bright font-bold mb-2 text-xl font-display tracking-wide uppercase">
                  Forest & Desert
                </h4>
                <p className="text-text-dim text-base leading-relaxed">
                  Turn the heater on only at night to prevent freezing.
                </p>
              </div>
              <div className="bg-panel p-8 border-l-[4px] border-l-[#8bafc8] border border-border relative overflow-hidden">
                <h4 className="text-text-bright font-bold mb-2 text-xl font-display tracking-wide uppercase">
                  Winter Biome
                </h4>
                <p className="text-text-dim text-base leading-relaxed">
                  Run the heater 24/7 to counter the permanent cold.
                </p>
              </div>
            </div>
          </Step>

          {/* STEP 6 */}
          <Step number={6} title="Breeding Perfect Genetics">
            <p className="text-text leading-loose text-lg font-light mb-10 max-w-3xl">
              Genetics dictate your farm's true efficiency. Every plant has six
              gene slots that become visible in the UI at the sapling stage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl">
              <div className="flex flex-col gap-5">
                <div className="text-[#8b9264] font-bold tracking-widest uppercase text-xs">
                  Good Genes
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <Gene type="good" letter="Y" size="sm" />
                    <span className="text-sm text-text-bright">
                      Y (Yield - increases harvest and clones)
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Gene type="good" letter="G" size="sm" />
                    <span className="text-sm text-text-bright">
                      G (Growth speed)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="text-red-cost font-bold tracking-widest uppercase text-xs">
                  Bad Genes
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <Gene type="bad" letter="W" size="sm" />
                    <span className="text-sm text-text-dim">
                      W (Increased water consumption)
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Gene type="bad" letter="X" size="sm" />
                    <span className="text-sm text-text-dim">
                      X (Empty slot)
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Gene type="bad" letter="H" size="sm" />
                    <span className="text-sm text-text-dim">
                      H (Temperature tolerance)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-text leading-loose text-lg font-light mb-10 max-w-3xl">
              Your goal is to reach the crossbreed stage and mix neighboring
              plants to achieve the perfect ratio, such as{' '}
              <strong className="text-text-bright font-medium">3G 3Y</strong> or{' '}
              <strong className="text-text-bright font-medium">2G 4Y</strong>.
              Once you breed the perfect plant, you can clone it endlessly.
            </p>

            <div className="bg-bg border border-border p-8 max-w-max guide-center-block text-center mb-10">
              <div className="text-text-dim uppercase text-xs tracking-widest mb-6 font-bold">
                Perfect Clone Example (3G 3Y)
              </div>
              <div className="flex gap-2 justify-center">
                <Gene type="good" letter="Y" />
                <Gene type="good" letter="G" />
                <Gene type="good" letter="Y" />
                <Gene type="good" letter="G" />
                <Gene type="good" letter="Y" />
                <Gene type="good" letter="Y" />
              </div>
            </div>

            <ImagePlaceholder label="Detailed view of a plant's UI highlighting the optimal green genes in the 'Genetics' row" />
          </Step>

          {/* STEP 7 */}
          <Step number={7} title="Animal Farming (Bonus)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-text-bright font-medium mb-4 text-xl">
                  Chickens
                </h4>
                <p className="text-text leading-loose text-base font-light">
                  Craft a Chicken Coop, insert wild eggs, and wait for them to
                  hatch. Keep your chickens in a good mood by feeding them,
                  providing water, giving them sunlight, and petting them.
                </p>
              </div>
              <div>
                <h4 className="text-text-bright font-medium mb-4 text-xl">
                  Bees
                </h4>
                <p className="text-text leading-loose text-base font-light">
                  Harvest a wild beehive to get a core. Place the core inside a
                  crafted beehive outdoors with a roof over it. Bees will
                  continuously produce honeycombs, which can be converted to
                  honey.
                </p>
              </div>
            </div>
          </Step>

          {/* STEP 8 */}
          <Step number={8} title="Cooking Teas and Pies" isLast>
            <p className="text-text leading-loose text-lg font-light mb-10 max-w-3xl">
              Once you have harvested berries, corn, and eggs, set up a Cooking
              Table. The table will automatically suggest recipes based on your
              ingredients. Here you can brew teas and bake pies that provide
              massive buffs for farming, resource gathering, and PVP combat.
            </p>
            <ImagePlaceholder label="Open Cooking Table UI showing the process of brewing tea from berries" />
          </Step>
        </div>
      </div>

      {/* Pro-Tips (Social Proof / Warning Layout) */}
      <div className="guide-tips-section">
        <Reveal className="guide-tips-header">
          <h2 className="guide-tips-title">Pro-Tips & Common Mistakes</h2>
        </Reveal>

        <div className="guide-tips-grid">
          <Tip title="Overwatering the Planters" type="warning">
            Filling planters to 100% capacity with water drops plant happiness.
            Keep the volume strictly between 50% and 75% (ideally around 60%).
          </Tip>
          <Tip title="Losing Your Perfect Clones" type="info">
            Never store all of your perfect genetic clones in one chest. Always
            make backups and hide a couple of clones in a hidden loot stash.
          </Tip>
          <Tip title="Wrong Biome for Bees" type="warning">
            Never set up a major bee farm in the desert biome. The massive
            temperature drops at night will completely halt their honeycomb
            production.
          </Tip>
          <Tip title="Using the Mixing Table" type="info">
            Don't waste time and space on the Mixing Table for food buffs. The
            Cooking Table has more recipes, built-in grills, and is much easier
            to use.
          </Tip>
        </div>
      </div>

      {/* Pre-footer CTA */}
      <Reveal className="guide-footer-section">
        {/* Fading horizontal separator */}
        <div className="guide-footer-separator" />

        <h2 className="guide-footer-title">What's Next?</h2>
        <p className="guide-footer-text">
          Ready to put your new farming knowledge to the test? Use our
          specialized calculators to determine exactly what genetics you need to
          crossbreed.
        </p>
        <div className="guide-footer-buttons">
          <Link
            href="/genetics"
            className="px-8 py-4 bg-rust-dim border border-rust text-text-bright font-display uppercase tracking-[0.1em] text-2xl hover:bg-rust transition-all active:scale-95 flex items-center gap-3"
          >
            Open Genetics Calculator
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="/guides"
            className="px-8 py-4 bg-panel border border-border text-text-bright font-display uppercase tracking-[0.1em] text-2xl hover:border-rust/50 hover:text-rust transition-all active:scale-95"
          >
            Explore All Guides
          </Link>
        </div>
      </Reveal>
    </div>
  )
}

function Gene({
  type,
  letter,
  size = 'lg',
}: {
  type: 'good' | 'bad'
  letter: string
  size?: 'sm' | 'lg'
}) {
  const isGood = type === 'good'
  const colorClasses = isGood
    ? 'bg-[#8b9264]/10 border-[#8b9264]/50 text-[#8b9264]'
    : 'bg-red-cost/10 border-red-cost/50 text-red-cost'

  const sizeClasses = size === 'lg' ? 'w-14 h-20 text-4xl' : 'w-8 h-10 text-xl'

  return (
    <div
      className={`flex items-center justify-center font-bold font-display border-[2px] ${colorClasses} ${sizeClasses}`}
    >
      <span className="mt-1">{letter}</span>
    </div>
  )
}
