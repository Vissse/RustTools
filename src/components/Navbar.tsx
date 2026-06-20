import { Link } from "@tanstack/react-router";

/** Shared top navigation bar. Active state follows the current route. */
export function Navbar() {
  return (
    <nav className="top-navbar">
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
              activeProps={{ className: "active" }}
            >
              Raid Calculator
            </Link>
            <Link
              to="/recycling"
              className="dropdown-item"
              activeProps={{ className: "active" }}
            >
              Recycling Calculator
            </Link>
            <Link
              to="/cupboard"
              className="dropdown-item"
              activeProps={{ className: "active" }}
            >
              Cupboard Calculator
            </Link>
          </div>
        </div>

        <span className="nav-separator" />

        {/* 2. Položka: World */}
        <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="!mt-1">World</span>
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
        </div>

        <span className="nav-separator" />

        {/* 3. Položka: Skins */}
        <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="!mt-1">Skins</span>
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
        </div>

        <span className="nav-separator" />

        {/* 4. Položka: Guides */}
        <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="!mt-1">Guides</span>
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
        </div>
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
        <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="!mt-1">Items</span>
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
        </div>

        <span className="nav-separator" />

        {/* 2. Položka: App */}
        <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="!mt-1">App</span>
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
        </div>

        <span className="nav-separator" />

        {/* 3. Položka: Social Media */}
        <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="!mt-1">Social Media</span>
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
        </div>

        <span className="nav-separator" />

        {/* 4. Položka: Binds */}
        <div className="nav-dropdown-wrapper">
          <a href="#" className="nav-item">
            <span className="!mt-1">Binds</span>
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
        </div>
      </div>
    </nav>
  );
}
