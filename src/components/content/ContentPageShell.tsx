import type { ReactNode } from 'react'
import Link from 'next/link'

interface ContentPageShellProps {
  /** Breadcrumb trail (Home is prepended automatically). */
  breadcrumbs: { label: string; href: string }[]
  /** Accent (colored) part of the page title. */
  headerAccent: string
  /** Rest of the page title (white). */
  headerRest: string
  /** Optional hero image path. */
  heroImage?: string
  /** Optional hero image alt text. */
  heroAlt?: string
  children: ReactNode
}

/**
 * Shared shell for content/wiki-style pages (monuments, items, animals).
 *
 * Follows the same visual language as CalcShell: breadcrumb above, large
 * two-tone h1, glass panel body — but without the calculator-specific
 * constraints (no fixed height, no grid variants).
 *
 * Server component. Place inside the route page.tsx.
 */
export function ContentPageShell({
  breadcrumbs,
  headerAccent,
  headerRest,
  heroImage,
  heroAlt,
  children,
}: ContentPageShellProps) {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-20 text-text font-sans">
      {/* Breadcrumb */}
      <nav className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        {breadcrumbs.map((crumb) => (
          <span key={crumb.href} className="contents">
            <span>/</span>
            <Link
              href={crumb.href}
              className="hover:text-text-bright transition-colors"
            >
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>

      {/* Page header */}
      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight m-0 text-text-bright leading-none font-display uppercase">
          {headerAccent} <span className="text-rust">{headerRest}</span>
        </h1>
      </header>

      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up" />

      {/* Hero image — if provided */}
      {heroImage && (
        <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 animate-fade-in-up relative">
          <img
            src={heroImage}
            alt={heroAlt ?? ''}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Content body — glass panel */}
      <div className="w-full relative z-[1] overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] transition-all duration-300 p-6 md:p-10 before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-80 animate-fade-in-up">
        {children}
      </div>
    </div>
  )
}
