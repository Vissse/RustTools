"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Below this width the nav collapses into the hamburger menu. */
const MOBILE_QUERY = "(max-width: 1200px)";

const CALC_ITEMS = [
  { href: "/raid", label: "Raid Calculator" },
  { href: "/recycling", label: "Recycling Calculator" },
  { href: "/cupboard", label: "Cupboard Calculator" },
  { href: "/giant-excavator", label: "Giant Excavator Calculator" },
  { href: "/genetics", label: "Genetics Calculator" },
  { href: "/furnace", label: "Furnace Calculator" },
  { href: "/decay", label: "Decay Calculator" },
  { href: "/shops", label: "Shop Calculator" },
  { href: "/skinning", label: "Skinning Calculator" },
  { href: "/salvaging", label: "Salvaging Calculator" },
];
const GUIDE_ITEMS = [
  { href: "/guides/farming", label: "Farming" },
  { href: "/guides/base-building", label: "Base Building" },
  { href: "/guides/monuments", label: "Monument Puzzles" },
  { href: "/guides/binds", label: "Console Binds" },
];

const DropArrow = () => (
  <svg
    className="w-2.5 h-2.5 opacity-60 mt-[3px] transition-transform duration-300 flex-shrink-0 group-hover/dd:rotate-180 group-hover/dd:opacity-100 group-hover/dd:text-rust group-[.expanded]/dd:rotate-180 group-[.expanded]/dd:opacity-100 group-[.expanded]/dd:text-rust"
    width="10"
    height="10"
    viewBox="0 0 12 12"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M2.5 4.5 L6 7.5 L9.5 4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Top-level nav entry for a section that isn't live yet: dimmed, with a lock. */
function SoonItem({ label }: { label: string }) {
  return (
    <div className="group/dd relative flex items-center h-full after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-[15px] max-[1200px]:after:hidden max-[1200px]:block max-[1200px]:w-full max-[1200px]:h-auto">
      <span
        className="font-display text-[clamp(18px,1.5vw,20px)] font-semibold no-underline uppercase tracking-[0.15em] px-[5px] pt-[18px] pb-[15px] relative transition-all duration-200 flex items-center gap-[5px] max-[1200px]:w-full max-[1200px]:px-1 max-[1200px]:py-[14px] max-[1200px]:justify-between cursor-default opacity-[0.45] text-text-dim"
        aria-disabled="true"
        title="Coming soon"
      >
        <span className="mt-1">{label}</span>
        <span className="ml-2 flex-none text-[9px] font-bold tracking-[0.1em] px-1 py-0.5 rounded-[3px] border border-white/10 bg-white/5 text-text-dim leading-none">
          SOON
        </span>
      </span>
    </div>
  );
}

interface NavDropdownProps {
  href: string;
  label: string;
  section: string;
  items: { href: string; label: string }[];
  expanded: boolean;
  isActive: (href: string) => boolean;
  onTitleClick: (e: MouseEvent, section: string) => void;
  onItemClick: () => void;
}

/** Top-level entry with a hover (desktop) / accordion (mobile) submenu. */
function NavDropdown({
  href,
  label,
  section,
  items,
  expanded,
  isActive,
  onTitleClick,
  onItemClick,
}: NavDropdownProps) {
  return (
    <div className={`group/dd relative flex items-center h-full after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-[15px] max-[1200px]:after:hidden max-[1200px]:block max-[1200px]:w-full max-[1200px]:h-auto${expanded ? " expanded" : ""}`}>
      <Link
        href={href}
        className={`font-display text-[clamp(18px,1.5vw,20px)] font-semibold no-underline uppercase tracking-[0.15em] px-[5px] pt-[18px] pb-[15px] relative transition-all duration-200 flex items-center gap-[5px] max-[1200px]:w-full max-[1200px]:px-1 max-[1200px]:py-[14px] max-[1200px]:justify-between cursor-pointer ${isActive(href) ? "text-rust" : "text-text-dim hover:text-text-bright"}`}
        onClick={(e) => onTitleClick(e, section)}
        aria-expanded={expanded}
      >
        <span className="mt-1">{label}</span>
        <DropArrow />
      </Link>
      <div className="absolute top-[calc(100%+5px)] left-0 min-w-[260px] bg-[rgba(19,18,16,0.97)] backdrop-blur-[12px] border border-white/5 border-t-0 rounded-md p-2 flex flex-col gap-1 shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0 invisible -translate-y-[15px] scale-[0.98] origin-top transition-all duration-[250ms] z-[100] pointer-events-none before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:z-10 before:pointer-events-none before:rounded-t-md group-hover/dd:opacity-100 group-hover/dd:visible group-hover/dd:translate-y-0 group-hover/dd:scale-100 group-hover/dd:pointer-events-auto max-[1200px]:static max-[1200px]:opacity-100 max-[1200px]:visible max-[1200px]:translate-y-0 max-[1200px]:scale-100 max-[1200px]:pointer-events-auto max-[1200px]:min-w-0 max-[1200px]:bg-transparent max-[1200px]:backdrop-blur-none max-[1200px]:border-0 max-[1200px]:rounded-none max-[1200px]:shadow-none max-[1200px]:p-0 max-[1200px]:pb-2 max-[1200px]:pl-4 max-[1200px]:gap-0.5 max-[1200px]:hidden group-[.expanded]/dd:max-[1200px]:flex">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={`font-display text-base font-medium tracking-[0.1em] no-underline uppercase px-3.5 py-2.5 rounded relative block whitespace-nowrap transition-all duration-200 ${isActive(it.href) ? "text-rust bg-[rgba(206,66,43,0.08)] pl-[18px] before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-[linear-gradient(to_bottom,transparent_0%,var(--rust)_30%,var(--rust)_70%,transparent_100%)] before:rounded-[2px]" : "text-text-dim bg-transparent hover:bg-white/[0.03] hover:text-text-bright hover:pl-5"}`}
            onClick={onItemClick}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** Shared top navigation bar. Active state follows the current route. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  // Which section's submenu is expanded in the mobile accordion (null = none).
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();
  // Matches TanStack Router's default fuzzy active matching: a link is active on
  // its own route and any descendant (so "/guides" stays lit on "/guides/farming").
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  const close = () => {
    setOpen(false);
    setOpenSection(null);
  };

  // On mobile, the first tap on a top-level entry expands its submenu accordion
  // (so the user can pick a specific calculator/guide) instead of navigating.
  // A second tap — while that section is already expanded — navigates to its
  // hub page. On desktop the submenu opens on hover, so the link always
  // navigates as normal.
  const handleSectionClick = (e: MouseEvent, section: string) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia(MOBILE_QUERY).matches &&
      openSection !== section
    ) {
      // Closed → expand this section, don't navigate yet.
      e.preventDefault();
      setOpenSection(section);
    } else {
      // Desktop, or a second tap on the open section → navigate to the hub.
      close();
    }
  };

  return (
    <nav className={`group w-full max-w-[1400px] bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] border-t-0 border-b-0 rounded-b-2xl flex items-center justify-between px-6 relative z-[1000] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] after:z-10 after:pointer-events-none max-[1200px]:flex-wrap max-[1200px]:px-4 max-[1200px]:py-2 max-[1200px]:gap-x-3 max-[1200px]:gap-y-0${open ? " open" : ""}`}>
      <button
        type="button"
        className="hidden flex-col justify-center gap-[5px] w-[42px] h-[42px] p-0 cursor-pointer max-[1200px]:flex max-[1200px]:order-3"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="block w-6 h-0.5 bg-text-bright rounded-[2px] transition-all duration-200 group-[.open]:translate-y-[7px] group-[.open]:rotate-45" />
        <span className="block w-6 h-0.5 bg-text-bright rounded-[2px] transition-all duration-200 group-[.open]:opacity-0" />
        <span className="block w-6 h-0.5 bg-text-bright rounded-[2px] transition-all duration-200 group-[.open]:-translate-y-[7px] group-[.open]:-rotate-45" />
      </button>

      <div className="flex gap-5 flex-1 max-[1200px]:order-4 max-[1200px]:flex-[1_1_100%] max-[1200px]:flex-col max-[1200px]:gap-0 max-[1200px]:hidden group-[.open]:max-[1200px]:flex group-[.open]:max-[1200px]:mt-2 group-[.open]:max-[1200px]:pt-1 group-[.open]:max-[1200px]:border-t group-[.open]:max-[1200px]:border-border-2">
        <NavDropdown
          href="/calculators"
          label="Calculators"
          section="calculators"
          items={CALC_ITEMS}
          expanded={openSection === "calculators"}
          isActive={isActive}
          onTitleClick={handleSectionClick}
          onItemClick={close}
        />

        <span className="w-px h-6 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] self-center mx-1 max-[1200px]:hidden" />

        <SoonItem label="World" />

        <span className="w-px h-6 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] self-center mx-1 max-[1200px]:hidden" />

        <NavDropdown
          href="/guides"
          label="Guides"
          section="guides"
          items={GUIDE_ITEMS}
          expanded={openSection === "guides"}
          isActive={isActive}
          onTitleClick={handleSectionClick}
          onItemClick={close}
        />
      </div>

      <Link
        href="/"
        className="flex items-center justify-center gap-2.5 flex-none px-[30px] min-w-[234px] max-[1200px]:order-1 max-[1200px]:flex-auto max-[1200px]:justify-start max-[1200px]:py-2 max-[1200px]:px-0"
        onClick={close}
      >
        <img
          className="w-[42px] h-[42px] min-w-[42px] object-contain block drop-shadow-[0_0_8px_var(--rust-glow)]"
          src="/images/icon.svg"
          alt="RustTools logo"
        />
        <span className="font-display text-[clamp(24px,5vw,28px)] font-bold tracking-normal text-text-bright uppercase leading-none mt-1">
          RUST<span className="text-rust">TOOLS</span>
        </span>
      </Link>

      <div className="flex gap-5 flex-1 max-[1200px]:order-4 max-[1200px]:flex-[1_1_100%] max-[1200px]:flex-col max-[1200px]:gap-0 max-[1200px]:hidden group-[.open]:max-[1200px]:flex justify-end max-[1200px]:justify-start">
        <SoonItem label="Items" />

        <span className="w-px h-6 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] self-center mx-1 max-[1200px]:hidden" />

        <div className="group/dd relative flex items-center h-full after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-[15px] max-[1200px]:after:hidden max-[1200px]:block max-[1200px]:w-full max-[1200px]:h-auto">
          <Link
            href="/app"
            className={`font-display text-[clamp(18px,1.5vw,20px)] font-semibold no-underline uppercase tracking-[0.15em] px-[5px] pt-[18px] pb-[15px] relative transition-all duration-200 flex items-center gap-[5px] max-[1200px]:w-full max-[1200px]:px-1 max-[1200px]:py-[14px] max-[1200px]:justify-between cursor-pointer ${isActive("/app") ? "text-rust" : "text-text-dim hover:text-text-bright"}`}
            onClick={close}
          >
            <span className="mt-1">App</span>
          </Link>
        </div>

        <span className="w-px h-6 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] self-center mx-1 max-[1200px]:hidden" />

        <SoonItem label="Skins" />
      </div>
    </nav>
  );
}
