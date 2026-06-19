import { Link } from '@tanstack/react-router'

/** Shared top navigation bar. Active state follows the current route. */
export function Navbar() {
  return (
    <nav className="top-navbar">
      <div className="nav-group left">
        {/* Dropdown obal */}
        <div className="nav-dropdown-wrapper">
          <span className="nav-item">
            Calculators <span className="dropdown-arrow">▼</span>
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
        <span className="brand-logo">⛊</span>
        <span className="brand-name">
          RUST<span>TOOLS</span>
        </span>
      </div>
      <div className="nav-group right">
        <a href="#" className="nav-item">
          Incoming
        </a>
      </div>
    </nav>
  )
}
