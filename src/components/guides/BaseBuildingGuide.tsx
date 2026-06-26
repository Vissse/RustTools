import { Link } from "@tanstack/react-router";
import { ReqCard, Step, Tip, ImagePlaceholder } from "./GuideComponents";

export function BaseBuildingGuide() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20 lg:py-32 text-text font-sans">
      {/* Breadcrumbs */}
      <div className="text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest">
        <Link to="/" className="hover:text-text-bright transition-colors">Home</Link>
        <span>/</span>
        <Link to="/guides" className="hover:text-text-bright transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-rust font-medium">Base Building Patterns</span>
      </div>

      {/* Hero Section */}
      <header className="mb-20 border-b border-border pb-16 relative">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
            The Ultimate <span className="text-rust">Base Building</span> Guide
          </h1>
          <p className="text-2xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
            Unraidable Footprints and Pixel Gaps
          </p>
        </div>
      </header>

      {/* Introduction */}
      <div className="mb-24">
        <p className="text-text leading-loose text-xl font-light max-w-4xl">
          In this guide, you will learn the absolute fundamentals of Rust base building, progressing from starter shacks to advanced bunker designs. Discover the most effective base footprints, honeycombing techniques, and unraidable bunker mechanics.
        </p>
      </div>

      {/* Requirements Box */}
      <div className="mb-48 md:mb-56 relative pt-12">
        {/* Oranžová čára do ztracena */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-rust to-transparent" />
        
        <h2 className="text-2xl font-bold text-text-bright uppercase font-display mb-8 tracking-wide">Requirements</h2>
        <div className="flex flex-col gap-5">
          <ReqCard title="Resources" desc="Wood, Stone, Metal Fragments, High Quality Metal." />
          <ReqCard title="Tool Cupboard" desc="Secures your base from decaying and prevents others from building." />
          <ReqCard title="Doors & Locks" desc="Sheet Metal Doors and Key Locks or Code Locks." />
          <ReqCard title="Building Plan" desc="Crafted with 20 wood, used for placing foundations and walls." />
        </div>
      </div>

      {/* Steps (Timeline Layout) */}
      <div className="mb-32 mt-40">
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-text-bright tracking-tight font-display uppercase border-b border-border pb-6">
          Step-by-Step Process
        </h2>
        
        <div className="flex flex-col gap-24 md:gap-32">
          
          {/* STEP 1 */}
          <Step number={1} title="The Starter 2x1">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              The 2x1 is the fundamental building block of Rust. It's cheap, fast to build, and provides enough space to get your first furnaces smelting. Place two square foundations, surround them with walls, and add an airlock (triangle foundation) at the front.
            </p>
            <ImagePlaceholder label="Screenshot of a basic stone 2x1 base with a wooden door airlock" />
          </Step>

          {/* STEP 2 */}
          <Step number={2} title="Airlocks and Door Placement">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Never have a single door leading directly outside. Always build an airlock using a triangle foundation. Place two doors facing inward so that when both are open, they block players from walking straight into your base.
            </p>
          </Step>

          {/* STEP 3 */}
          <Step number={3} title="Honeycombing Your Core">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Honeycombing means adding an extra layer of walls (usually triangle foundations) around your main loot rooms to increase the explosive cost for raiders. Upgrade your core to Sheet Metal and your honeycomb to Stone to balance upkeep costs.
            </p>
            <ImagePlaceholder label="Top-down diagram of a 2x1 surrounded by triangle honeycombing" />
          </Step>

          {/* STEP 4 */}
          <Step number={4} title="Implementing a Bunker" isLast>
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Bunkers use building mechanics to completely seal off your loot room with an Armored floor or wall when you log off, requiring zero doors. The most common is the roof bunker or stability bunker. When you log back in, you break a soft-side twig half-wall to open the bunker.
            </p>
          </Step>

        </div>
      </div>

      {/* Pro-Tips (Social Proof / Warning Layout) */}
      <div className="border-t border-border pt-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-bright tracking-tight font-display uppercase mb-4">Pro-Tips & Common Mistakes</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Tip title="Soft Side Walls" type="warning">
            Walls have a hard side and a soft side. Always make sure the smooth (hard) side faces outward. The soft side can be easily picked down with tools in minutes!
          </Tip>
          <Tip title="Upkeep Tax" type="info">
            The larger your base, the higher percentage of upkeep you pay. A massive zerg base pays up to 33% of its cost daily, while a small base only pays 10%.
          </Tip>
        </div>
      </div>

    </div>
  );
}
