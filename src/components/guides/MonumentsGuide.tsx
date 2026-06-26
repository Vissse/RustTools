import { Link } from "@tanstack/react-router";
import { ReqCard, Step, Tip, ImagePlaceholder } from "./GuideComponents";

export function MonumentsGuide() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20 lg:py-32 text-text font-sans">
      {/* Breadcrumbs */}
      <div className="text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest">
        <Link to="/" className="hover:text-text-bright transition-colors">Home</Link>
        <span>/</span>
        <Link to="/guides" className="hover:text-text-bright transition-colors">Guides</Link>
        <span>/</span>
        <span className="text-rust font-medium">Monument Puzzles</span>
      </div>

      {/* Hero Section */}
      <header className="mb-20 border-b border-border pb-16 relative">
        <div className="relative z-10">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
            The Ultimate <span className="text-rust">Monuments</span> Guide
          </h1>
          <p className="text-2xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
            Keycards, Puzzles, and Elite Loot
          </p>
        </div>
      </header>

      {/* Introduction */}
      <div className="mb-24">
        <p className="text-text leading-loose text-xl font-light max-w-4xl">
          Discover how to safely run every monument puzzle in Rust. This guide covers the progression system from low-tier Green card puzzles all the way to high-tier Red card puzzles granting elite loot.
        </p>
      </div>

      {/* Requirements Box */}
      <div className="mb-48 md:mb-56 relative pt-12">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-rust to-transparent" />
        
        <h2 className="text-2xl font-bold text-text-bright uppercase font-display mb-8 tracking-wide">Requirements</h2>
        <div className="flex flex-col gap-5">
          <ReqCard title="Fuses" desc="Electric Fuses found in basic crates and barrels along the road." />
          <ReqCard title="Keycards" desc="Green, Blue, and Red access cards." />
          <ReqCard title="Hazmat Suit" desc="Radiation protection is mandatory for higher tier monuments." />
          <ReqCard title="Weapons" desc="Defend against AI scientists and other players." />
        </div>
      </div>

      {/* Steps (Timeline Layout) */}
      <div className="mb-32 mt-40">
        <h2 className="text-4xl md:text-5xl font-bold mb-20 text-text-bright tracking-tight font-display uppercase border-b border-border pb-6">
          Step-by-Step Progression
        </h2>
        
        <div className="flex flex-col gap-24 md:gap-32">
          
          {/* STEP 1 */}
          <Step number={1} title="Obtaining a Green Card">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Green cards are the entry level keycards. You can find them on the desk inside Gas Stations, Supermarkets, or Lighthouse monuments. These locations have zero radiation and do not require a fuse.
            </p>
            <ImagePlaceholder label="Screenshot of a Green Keycard sitting on the desk at an Oxum's Gas Station" />
          </Step>

          {/* STEP 2 */}
          <Step number={2} title="Running Green Puzzles (Getting Blue)">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Take your Green card and a Fuse to monuments like the Sewer Branch, Satellite Dish, or Harbor. Insert the fuse, flip the switch, and swipe your Green card. Inside the loot room, you will find crates and your first Blue Keycard.
            </p>
          </Step>

          {/* STEP 3 */}
          <Step number={3} title="Running Blue Puzzles (Getting Red)">
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Blue puzzles (Water Treatment, Trainyard, Airfield) are more complex and heavily irradiated. You will need a Hazmat suit, a Green Card, a Blue Card, and usually two Fuses. The final loot room contains high-tier crates and a Red Keycard.
            </p>
            <ImagePlaceholder label="Player in a Hazmat Suit swiping a Blue Keycard at the Water Treatment Plant" />
          </Step>

          {/* STEP 4 */}
          <Step number={4} title="Running Red Puzzles (Elite Loot)" isLast>
            <p className="text-text leading-loose text-lg font-light mb-8 max-w-3xl">
              Red puzzles are the ultimate challenge. Launch Site and Oil Rigs require Red cards. The Launch Site puzzle involves intense radiation, Bradley APC patrols, and navigating a massive building to reach Elite Crates on the roof.
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
          <Tip title="Fuse Timers" type="warning">
            Fuses degrade over time while plugged into an active circuit. Do not waste time—flip the switch and immediately run to the keycard door, or the fuse will break before you arrive!
          </Tip>
          <Tip title="Buying Blue Cards" type="info">
            If you struggle to find a Green card or run a puzzle, you can simply purchase a Blue Keycard from the Outpost vending machines for 100 Scrap.
          </Tip>
        </div>
      </div>

    </div>
  );
}
