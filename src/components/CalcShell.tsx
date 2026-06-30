import type { ReactNode } from 'react'
import Link from 'next/link'
import { ShareButton } from './ShareButton'

type Variant = 'raid' | 'recycling' | 'cupboard'

interface CalcShellProps {
  /** Legacy props kept for compatibility with parent components */
  pageTitle?: ReactNode
  headerAccent: string
  headerRest: string
  variant: Variant
  version?: string
  /**
   * Breadcrumb label for this page. Defaults to "<headerAccent> <headerRest>"
   * in Title Case. The `variant` prop can't be used for the label because it
   * only drives the grid layout (e.g. the Furnace page passes variant="recycling"),
   * which previously made its breadcrumb read "Recycling".
   */
  crumb?: string
  children: ReactNode
}

const titleCase = (s: string) =>
  s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())

/**
 * Shared calculator shell. Matches the Guides/Calculators hubs exactly: the
 * breadcrumb is the first thing on the page, with the page header stacked
 * directly beneath it (both left-aligned), followed by a separator.
 */
export function CalcShell({
  headerAccent,
  headerRest,
  variant,
  crumb,
  children,
}: CalcShellProps) {
  const crumbLabel = crumb ?? titleCase(`${headerAccent} ${headerRest}`.trim())

  return (
    <div className="w-full max-w-[1400px] mx-auto px-0 sm:px-6 py-20 text-text font-sans">
      {/* Breadcrumbs — first element on the page, stacked above the header. */}
      <div className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/calculators"
          className="hover:text-text-bright transition-colors"
        >
          Calculators
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">{crumbLabel}</span>
      </div>

      {/* Page header — sits directly under the breadcrumb. The title is
          left-aligned; the Share button is pinned to the right and copies the
          current URL (calculator state lives in the query string via nuqs). */}
      <header className="mb-8 animate-fade-in-up flex items-end justify-between gap-6 flex-wrap">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight m-0 text-text-bright leading-none font-display uppercase">
          {headerAccent} <span className="text-rust">{headerRest}</span>
        </h1>
        <ShareButton />
      </header>

      {/* Separator — matches the hubs. */}
      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up" />

      {/* Shell visual + per-variant layout (was global.css .calc-wrap / .calc-body
          + the [data-variant="…"] rules; now applied inline by variant). */}
      <div
        className={`w-full max-w-[1400px] relative z-[1] overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] transition-all duration-300 p-6 max-md:p-3 before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-80 animate-fade-in-up ${
          variant === 'raid'
            ? 'max-h-screen max-[1280px]:max-h-none max-[1280px]:overflow-visible'
            : 'h-[85vh] flex flex-col max-md:h-auto max-md:max-h-none'
        }`}
      >
        <div
          className={
            variant === 'raid'
              ? 'relative z-[1] grid grid-cols-3 max-[1024px]:grid-cols-1 min-[1025px]:max-[1280px]:grid-cols-2'
              : variant === 'recycling'
                ? 'relative z-[1] flex flex-1 overflow-hidden max-md:flex-col-reverse max-md:overflow-visible'
                : 'relative z-[1] flex flex-1 overflow-hidden max-md:flex-col max-md:overflow-visible'
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}
