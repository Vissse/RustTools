import { useState } from 'react'
import { Link } from '@tanstack/react-router'

/** Top-level nav entry for a section that isn't live yet: dimmed, with a lock. */
function SoonItem({ label }: { label: string }) {
  return (
    <div className="nav-dropdown-wrapper">
      <span className="nav-item soon" aria-disabled="true" title="Coming soon">
        <span className="mt-1">{label}</span>
        <span className="soon-badge">SOON</span>
      </span>
    </div>
  )
}

/** Shared top navigation bar. Active state follows the current route. */
export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={`top-navbar${open ? ' open' : ''}`}>
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
        <div className="nav-dropdown-wrapper">
          <Link
            to="/calculators"
            className="nav-item"
            activeProps={{ className: 'guides-active' }}
            onClick={() => setOpen(false)}
          >
            <span className="mt-1">Calculators</span>
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
          </Link>
          <div className="nav-dropdown-menu">
            <Link
              to="/raid"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Raid Calculator
            </Link>
            <Link
              to="/recycling"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Recycling Calculator
            </Link>
            <Link
              to="/cupboard"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Cupboard Calculator
            </Link>
            <Link
              to="/giant-excavator"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Giant Excavator Calculator
            </Link>
            <Link
              to="/genetics"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Genetics Calculator
            </Link>
            <Link
              to="/furnace"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Furnace Calculator
            </Link>
            <Link
              to="/decay"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Decay Calculator
            </Link>
            <Link
              to="/shops"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Shop Calculator
            </Link>
            <Link
              to="/skinning"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Skinning Calculator
            </Link>
            <Link
              to="/salvaging"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Salvaging Calculator
            </Link>
          </div>
        </div>

        {/* <span className="nav-separator" /> */}

        {/* 2. Položka: World */}
        {/* <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="mt-1">World</span>
            <span className="nav-badge soon">Soon</span>
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
          </a>
        </div> */}

        <span className="nav-separator" />

        {/* 3. Položka: Skins */}
        <SoonItem label="Skins" />

        <span className="nav-separator" />

        {/* 4. Položka: Guides */}
        <div className="nav-dropdown-wrapper">
          <Link
            to="/guides"
            className="nav-item"
            activeProps={{ className: 'guides-active' }}
            onClick={() => setOpen(false)}
          >
            <span className="mt-1">Guides</span>
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
          </Link>
          <div className="nav-dropdown-menu">
            <Link
              to="/guides/farming"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Farming Guide
            </Link>
            <Link
              to="/guides/base-building"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Base Building
            </Link>
            <Link
              to="/guides/monuments"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
              onClick={() => setOpen(false)}
            >
              Monument Puzzles
            </Link>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="nav-brand min-w-[234px]"
        onClick={() => setOpen(false)}
      >
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
        <SoonItem label="App" />

        <span className="nav-separator" />

        {/* 3. Položka: Social Media */}
        {/* <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="mt-1">Social Media</span>
            <span className="nav-badge soon">Soon</span>
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
          </a>
        </div> */}

        {/* <span className="nav-separator" /> */}

        {/* 4. Položka: Binds */}
        <SoonItem label="Binds" />
      </div>
    </nav>
  )
}
