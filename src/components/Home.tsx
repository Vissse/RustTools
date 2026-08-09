import Link from "next/link";

/**
 * Landing page.
 *
 * The hero is deliberately minimal. Everything below it exists for crawlers as
 * much as for readers: before it was added, the homepage shipped ~20 words of
 * text and two internal links, which gave Google almost nothing to rank on and
 * left every calculator route reachable only through /calculators. The link
 * grid puts each tool one hop from the root and states what it does in the
 * words people search for.
 */

const CALCULATORS = [
  {
    href: "/raid",
    name: "Raid Calculator",
    blurb:
      "The cheapest way through any wall or door, by sulfur cost or explosive count.",
  },
  {
    href: "/recycling",
    name: "Recycling Calculator",
    blurb:
      "Exact recycler output for every item, for both Radtown and safe zone machines.",
  },
  {
    href: "/cupboard",
    name: "Cupboard Calculator",
    blurb:
      "How long your base stays protected from what you leave in the Tool Cupboard.",
  },
  {
    href: "/furnace",
    name: "Smelting Calculator",
    blurb: "Smelting time, wood cost and charcoal for every furnace and oven.",
  },
  {
    href: "/decay",
    name: "Decay Calculator",
    blurb: "How long a structure survives without upkeep, by building material.",
  },
  {
    href: "/shops",
    name: "Shops Calculator",
    blurb: "Scrap prices at Outpost, Bandit Camp and the Fishing Villages.",
  },
  {
    href: "/genetics",
    name: "Genetics Calculator",
    blurb: "The best crop gene combination you can breed from your seeds.",
  },
  {
    href: "/skinning",
    name: "Skinning Calculator",
    blurb: "Meat, fat, leather and bone yields per animal and per tool.",
  },
  {
    href: "/salvaging",
    name: "Salvaging Calculator",
    blurb: "What a destroyed Bradley APC or Patrol Helicopter returns.",
  },
  {
    href: "/giant-excavator",
    name: "Giant Excavator Calculator",
    blurb: "Excavator output and diesel consumption before you commit the fuel.",
  },
];

export function Home() {
  return (
    <div className="w-full font-sans text-text">
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-[5rem] md:text-[12rem] font-bold tracking-tighter text-text-bright leading-none font-display uppercase mb-16 md:mb-24 animate-fade-in-up">
            MASTER<br />
            YOUR <span className="text-rust">WIPE</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 animate-fade-in-up">
            <Link
              href="/calculators"
              className="text-2xl md:text-5xl text-text-dim font-display uppercase tracking-[0.2em] hover:text-rust transition-colors"
            >
              Calculators
            </Link>

            <Link
              href="/guides"
              className="text-2xl md:text-5xl text-text-dim font-display uppercase tracking-[0.2em] hover:text-rust transition-colors"
            >
              Guides
            </Link>
          </div>
        </div>
      </div>

      <section className="w-full max-w-[1400px] mx-auto px-6 pb-24">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-bright leading-none font-display uppercase mb-6">
          Free <span className="text-rust">Rust calculators</span>
        </h2>
        <div className="max-w-3xl space-y-4 mb-12">
          <p className="text-base leading-relaxed text-text-dim">
            RustTools is a set of free calculators and guides for the survival
            game Rust. Work out the cheapest raid before you farm the sulfur,
            check what a box of loot returns from a recycler, size your Tool
            Cupboard so the base is still standing when you get back, and plan a
            smelt down to the wood it will burn.
          </p>
          <p className="text-base leading-relaxed text-text-dim">
            Everything runs in the browser, needs no account, and is built on
            current game data rather than a wiki table from three wipes ago.
            Every tool keeps its state in the URL, so you can send a raid plan or
            a smelting estimate straight to your team.
          </p>
        </div>

        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((calc) => (
            <li key={calc.href}>
              <Link href={calc.href} className="group block">
                <span className="block font-display uppercase tracking-wide text-xl text-text-bright group-hover:text-rust transition-colors">
                  {calc.name}
                </span>
                <span className="block text-sm leading-relaxed text-text-dim mt-1">
                  {calc.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-bright leading-none font-display uppercase mt-20 mb-6">
          Rust <span className="text-rust">guides</span>
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-text-dim">
          Longer-form tips and tricks for players who want more than a number:{" "}
          <Link href="/guides/farming" className="text-rust hover:underline">
            the farming and genetics guide
          </Link>{" "}
          covers irrigation, lighting and gene crossbreeding end to end. More
          guides — base building patterns, monument puzzles and console binds —
          are in progress on the{" "}
          <Link href="/guides" className="text-rust hover:underline">
            guides hub
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
