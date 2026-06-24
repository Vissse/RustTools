import { useState } from 'react'
import { Link } from '@tanstack/react-router'

/** Top-level nav entry for a section that isn't live yet: dimmed, with a lock. */
function SoonItem({ label }: { label: string }) {
  return (
    <div className="nav-dropdown-wrapper">
      <span className="nav-item soon" aria-disabled="true" title="Coming soon">
        <span className="!mt-1">{label}</span>
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
          <span className="nav-item">
            <span className="!mt-1">Calculators</span>
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
          </span>
          <div className="nav-dropdown-menu">
            <Link
              to="/"
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
            >
              Shops Calculator
            </Link>
          </div>
        </div>

        {/* <span className="nav-separator" /> */}

        {/* 2. Položka: World */}
        {/* <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="!mt-1">World</span>
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
        <SoonItem label="Guides" />
      </div>

      <div className="nav-brand">
        <img
          className="brand-logo"
          src="/images/icon.svg"
          alt="RustTools logo"
        />
        <span className="brand-name">
          RUST<span>TOOLS</span>
        </span>
      </div>

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
            <span className="!mt-1">Social Media</span>
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
