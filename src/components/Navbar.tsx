import { useState } from 'react'
import { Link } from '@tanstack/react-router'

/** Top-level nav entry for a section that isn't live yet: dimmed, with a lock. */
function SoonItem({ label }: { label: string }) {
  return (
    <div className="nav-dropdown-wrapper">
      <span className="nav-item soon" aria-disabled="true" title="Coming soon">
        <span className="!mt-1">{label}</span>
        <svg
          className="nav-lock"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="5"
            y="11"
            width="14"
            height="9"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 11 V8 a4 4 0 0 1 8 0 v3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
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
