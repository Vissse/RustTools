'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Footer link menu, grouped into categories rendered as columns. */
const FOOTER_CATEGORIES = [
  {
    title: "Raiding & Base",
    links: [
      { to: "/", label: "Raid" },
      { to: "/cupboard", label: "Cupboard" },
      { to: "/decay", label: "Decay" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/recycling", label: "Recycling" },
      { to: "/furnace", label: "Furnace" },
      { to: "/giant-excavator", label: "Giant Excavator" },
    ],
  },
  {
    title: "Farming & Trade",
    links: [
      { to: "/genetics", label: "Genetics" },
      { to: "/shops", label: "Shops" },
    ],
  },
] as const;

/** Site-wide footer: brand on the left, page links filling out to the right. */
export function Footer() {
  const pathname = usePathname();
  // "/" matches exactly (it would otherwise prefix-match every route); the rest
  // match their own route and any descendant.
  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/");

  return (
    <footer className="w-full max-w-[1400px] bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] border-t-0 border-b-0 rounded-t-2xl flex items-start justify-between gap-6 px-10 py-12 relative z-10 shadow-[0_-16px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:z-10 before:pointer-events-none max-[1200px]:flex-col max-[1200px]:items-center max-[1200px]:text-center max-[1200px]:gap-7 max-[1200px]:px-5 max-[1200px]:py-10 site-footer">
      <div className="flex flex-col gap-3.5 flex-none max-[1200px]:items-center">
        <div className="flex items-center gap-2.5">
          <img
            className="w-9.5 h-9.5 object-contain block drop-shadow-[0_0_8px_var(--rust-glow)]"
            src="/images/icon.svg"
            alt="RustTools logo"
          />
          <span className="font-display text-[22px] font-bold tracking-normal text-text-bright uppercase leading-none mt-1">
            RUST<span className="text-rust">TOOLS</span>
          </span>
        </div>
        <p className="font-ui text-xs tracking-[0.04em] text-text-dim">
          © {new Date().getFullYear()} RustTools. All rights reserved.
        </p>
        <p className="font-ui tracking-[0.04em] mt-2 text-xs text-text-dim max-w-xs">
          RustTools is an unofficial fan-made project. Not affiliated with, authorized, or endorsed by Facepunch Studios.
        </p>
      </div>

      <nav
        className="flex flex-wrap justify-end gap-x-14 gap-y-6 flex-1 max-[1200px]:justify-center max-[1200px]:gap-x-12 max-[1200px]:gap-y-7"
        aria-label="Footer"
      >
        {FOOTER_CATEGORIES.map((category) => (
          <div
            className="flex flex-col items-start gap-3 max-[1200px]:items-center max-[1200px]:text-center"
            key={category.title}
          >
            <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-text-bright mb-0.5">
              {category.title}
            </h3>
            {category.links.map(({ to, label }) => (
              <Link
                key={to}
                href={to}
                className={`font-display text-sm font-medium no-underline uppercase tracking-[0.12em] transition-all duration-200 ${isActive(to) ? "text-rust [text-shadow:0_0_12px_var(--rust-glow)]" : "text-text-dim hover:text-text-bright"}`}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </footer>
  );
}
