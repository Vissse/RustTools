import { Link } from "@tanstack/react-router";

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
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <div className="footer-brand-top">
          <img
            className="brand-logo"
            src="/images/icon.svg"
            alt="RustTools logo"
          />
          <span className="brand-name">
            RUST<span>TOOLS</span>
          </span>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} RustTools. All rights reserved.
        </p>
      </div>

      <nav className="footer-links" aria-label="Footer">
        {FOOTER_CATEGORIES.map((category) => (
          <div className="footer-col" key={category.title}>
            <h3 className="footer-col-title">{category.title}</h3>
            {category.links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="footer-link"
                activeProps={{ className: "active" }}
                activeOptions={{ exact: to === "/" }}
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
