import type { ReactNode } from "react";

type Variant = "raid" | "recycling" | "cupboard";

interface CalcShellProps {
  /** Page title accent + main, e.g. titleAccent="RAID" title="CALCULATOR". */
  pageTitle: ReactNode;
  headerAccent: string;
  headerRest: string;
  variant: Variant;
  version?: string;
  children: ReactNode;
}

/**
 * The framed calculator panel shared by all three pages: page title, rivets,
 * header bar, status dot, metal rule, and the calc body container. `variant`
 * drives the page-specific layout/styling via the data-variant attribute.
 */
export function CalcShell({
  pageTitle,
  headerAccent,
  headerRest,
  variant,
  version = "V1.0",
  children,
}: CalcShellProps) {
  return (
    <>
      <h1 className="page-title">{pageTitle}</h1>

      <div className="calc-wrap" data-variant={variant}>
        <span className="rivet tl" />
        <span className="rivet tr" />
        <span className="rivet bl" />
        <span className="rivet br" />

        <div className="calc-header">
          <div className="header-left">
            <div className="header-bar" />
            <span className="header-title">
              {headerAccent} <span>{headerRest}</span>
            </span>
            <span className="header-ver">{version}</span>
          </div>
          <div className="header-status">
            <span className="status-lbl">SYSTEM ONLINE</span>
            <span className="status-dot" />
          </div>
        </div>
        <div className="metal-rule" />

        <div className="calc-body">{children}</div>
      </div>
    </>
  );
}
