import { Link } from '@tanstack/react-router'

/** Shared top navigation bar. Active state follows the current route. */
export function Navbar() {
  return (
    <nav className="top-navbar">
      <div className="nav-group left">
        {/* Dropdown obal */}
        <div className="nav-dropdown-wrapper">
          <span className="nav-item">
            <span className="!mt-1">Calculators</span>
            <svg
              className="dropdown-arrow"
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

          {/* Samotné dropdown menu */}
          <div className="nav-dropdown-menu">
            <Link
              to="/"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
            >
              Raid Calculator
            </Link>
            <Link
              to="/recycling"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
            >
              Recycling Calculator
            </Link>
            <Link
              to="/cupboard"
              className="dropdown-item"
              activeProps={{ className: 'active' }}
            >
              Cupboard Calculator
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-brand">
        <img className="brand-logo" src="/images/icon.svg" alt="RustTools logo" />
        <span className="brand-name">
          RUST<span>TOOLS</span>
        </span>
      </div>
      <div className="nav-group right">
        <a href="#" className="nav-item !mt-1">
          Incoming
        </a>
      </div>
    </nav>
  )
}
