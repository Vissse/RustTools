"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Below this width the nav collapses into the hamburger menu (see global.css). */
const MOBILE_QUERY = "(max-width: 1200px)";

/** Top-level nav entry for a section that isn't live yet: dimmed, with a lock. */
function SoonItem({ label }: { label: string }) {
  return (
    <div className="nav-dropdown-wrapper">
      <span className="nav-item soon" aria-disabled="true" title="Coming soon">
        <span className="mt-1">{label}</span>
        <span className="soon-badge">SOON</span>
      </span>
    </div>
  );
}

const DropArrow = () => (
  <svg
    className="dropdown-arrow"
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

  // On mobile, a top-level entry with a submenu acts as an accordion toggle
  // rather than navigating to its hub page — so the user can pick a specific
  // calculator/guide. On desktop the submenu opens on hover, so let the link
  // navigate as normal.
  const handleSectionClick = (e: MouseEvent, section: string) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia(MOBILE_QUERY).matches
    ) {
      e.preventDefault();
      setOpenSection((s) => (s === section ? null : section));
    } else {
      close();
    }
  };

  return (
    <nav className={`top-navbar${open ? " open" : ""}`}>
      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>

      <div className="nav-group left">
        {/* 1. Položka: Calculators Dropdown */}
        <div
          className={`nav-dropdown-wrapper${openSection === "calculators" ? " expanded" : ""}`}
        >
          <Link
            href="/calculators"
            className={`nav-item${isActive("/calculators") ? " guides-active" : ""}`}
            onClick={(e) => handleSectionClick(e, "calculators")}
            aria-expanded={openSection === "calculators"}
          >
            <span className="mt-1">Calculators</span>
            <DropArrow />
          </Link>
          <div className="nav-dropdown-menu">
            <Link
              href="/raid"
              className={`dropdown-item${isActive("/raid") ? " active" : ""}`}
              onClick={close}
            >
              Raid Calculator
            </Link>
            <Link
              href="/recycling"
              className={`dropdown-item${isActive("/recycling") ? " active" : ""}`}
              onClick={close}
            >
              Recycling Calculator
            </Link>
            <Link
              href="/cupboard"
              className={`dropdown-item${isActive("/cupboard") ? " active" : ""}`}
              onClick={close}
            >
              Cupboard Calculator
            </Link>
            <Link
              href="/giant-excavator"
              className={`dropdown-item${isActive("/giant-excavator") ? " active" : ""}`}
              onClick={close}
            >
              Giant Excavator Calculator
            </Link>
            <Link
              href="/genetics"
              className={`dropdown-item${isActive("/genetics") ? " active" : ""}`}
              onClick={close}
            >
              Genetics Calculator
            </Link>
            <Link
              href="/furnace"
              className={`dropdown-item${isActive("/furnace") ? " active" : ""}`}
              onClick={close}
            >
              Furnace Calculator
            </Link>
            <Link
              href="/decay"
              className={`dropdown-item${isActive("/decay") ? " active" : ""}`}
              onClick={close}
            >
              Decay Calculator
            </Link>
            <Link
              href="/shops"
              className={`dropdown-item${isActive("/shops") ? " active" : ""}`}
              onClick={close}
            >
              Shop Calculator
            </Link>
            <Link
              href="/skinning"
              className={`dropdown-item${isActive("/skinning") ? " active" : ""}`}
              onClick={close}
            >
              Skinning Calculator
            </Link>
            <Link
              href="/salvaging"
              className={`dropdown-item${isActive("/salvaging") ? " active" : ""}`}
              onClick={close}
            >
              Salvaging Calculator
            </Link>
          </div>
        </div>

        <span className="nav-separator" />

        {/* 3. Položka: World */}
        <SoonItem label="World" />

        <span className="nav-separator" />

        {/* 4. Položka: Guides */}
        <div
          className={`nav-dropdown-wrapper${openSection === "guides" ? " expanded" : ""}`}
        >
          <Link
            href="/guides"
            className={`nav-item${isActive("/guides") ? " guides-active" : ""}`}
            onClick={(e) => handleSectionClick(e, "guides")}
            aria-expanded={openSection === "guides"}
          >
            <span className="mt-1">Guides</span>
            <DropArrow />
          </Link>
          <div className="nav-dropdown-menu">
            <Link
              href="/guides/farming"
              className={`dropdown-item${isActive("/guides/farming") ? " active" : ""}`}
              onClick={close}
            >
              Farming
            </Link>
            <Link
              href="/guides/base-building"
              className={`dropdown-item${isActive("/guides/base-building") ? " active" : ""}`}
              onClick={close}
            >
              Base Building
            </Link>
            <Link
              href="/guides/monuments"
              className={`dropdown-item${isActive("/guides/monuments") ? " active" : ""}`}
              onClick={close}
            >
              Monument Puzzles
            </Link>
            <Link
              href="/guides/binds"
              className={`dropdown-item${isActive("/guides/binds") ? " active" : ""}`}
              onClick={close}
            >
              Console Binds
            </Link>
          </div>
        </div>
      </div>

      <Link href="/" className="nav-brand min-w-[234px]" onClick={close}>
        <img
          className="brand-logo min-w-10.5!"
          src="/images/icon.svg"
          alt="RustTools logo"
        />
        <span className="brand-name">
          RUST<span>TOOLS</span>
        </span>
      </Link>

      <div className="nav-group right">
        {/* 1. Položka: Items */}
        <SoonItem label="Items" />

        <span className="nav-separator" />

        {/* 2. Položka: App */}
        <div className="nav-dropdown-wrapper">
          <Link
            href="/app"
            className={`nav-item${isActive('/app') ? ' guides-active' : ''}`}
            onClick={close}
          >
            <span className="mt-1">App</span>
          </Link>
        </div>

        <span className="nav-separator" />

        {/* 3. Položka: Skins */}
        <SoonItem label="Skins" />
      </div>
    </nav>
  );
}
