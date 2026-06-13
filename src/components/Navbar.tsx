import { Link } from "@tanstack/react-router";

/** Shared top navigation bar. Active state follows the current route. */
export function Navbar() {
  return (
    <nav className="top-navbar">
      <div className="nav-group left">
        <Link to="/" className="nav-item" activeProps={{ className: "active" }}>
          Raid Calculator
        </Link>
        <Link
          to="/recycling"
          className="nav-item"
          activeProps={{ className: "active" }}
        >
          Recycling Calculator
        </Link>
      </div>

      <div className="nav-brand">
        <span className="brand-logo">⛊</span>
        <span className="brand-name">
          RUST<span>TOOLS</span>
        </span>
      </div>

      <div className="nav-group right">
        <Link
          to="/cupboard"
          className="nav-item"
          activeProps={{ className: "active" }}
        >
          Cupboard Calculator
        </Link>
        <a href="#" className="nav-item">
          Incoming
        </a>
      </div>
    </nav>
  );
}
