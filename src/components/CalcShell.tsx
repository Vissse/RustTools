import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

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
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      {/* Breadcrumbs — first element on the page, stacked above the header. */}
      <div className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link to="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          to="/calculators"
          className="hover:text-text-bright transition-colors"
        >
          Calculators
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">{crumbLabel}</span>
      </div>

      {/* Page header — sits directly under the breadcrumb, left-aligned. */}
      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight m-0 text-text-bright leading-none font-display uppercase">
          {headerAccent} <span className="text-rust">{headerRest}</span>
        </h1>
      </header>

      {/* Separator — matches the hubs. */}
      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up" />

      {/*
        The legacy calc-wrap is kept purely because global.css targets
        .calc-wrap[data-variant="..."] .calc-body for the grid layouts.
        All heavy styling (borders, backgrounds) was removed from it in CSS.
      */}
      <div className="calc-wrap animate-fade-in-up" data-variant={variant}>
        <div className="calc-body">{children}</div>
      </div>
    </div>
  )
}
