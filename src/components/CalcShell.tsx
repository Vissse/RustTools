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
  children: ReactNode
}

/**
 * The redesigned calculator shell that perfectly mimics the guides' layout.
 * It uses the same breadcrumbs and hero header, and wraps the children
 * in the legacy `.calc-wrap` + `.calc-body` divs so the existing grid 
 * layouts in global.css still function properly.
 */
export function CalcShell({
  headerAccent,
  headerRest,
  variant,
  children,
}: CalcShellProps) {
  const capitalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1)
  
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 lg:py-32 text-text font-sans">
      {/* Hero Section with Absolute Breadcrumbs */}
      <header className="mb-12 border-b border-border pb-6 relative flex items-end justify-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        
        {/* Breadcrumbs positioned absolutely to the bottom left to rest on the separator */}
        <div className="absolute left-0 bottom-2 text-lg font-display uppercase text-text-dim flex items-center space-x-2 tracking-widest z-50">
          <Link to="/" className="hover:text-text-bright transition-colors">Home</Link>
          <span>/</span>
          <Link to="/calculators" className="hover:text-text-bright transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-rust font-medium">{capitalizedVariant}</span>
        </div>

        {/* Centered Title */}
        <div className="relative z-10 inline-block">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-text-bright leading-none font-display uppercase m-0">
            {headerAccent} <span className="text-rust">{headerRest}</span>
          </h1>
        </div>
      </header>

      {/* 
        The legacy calc-wrap is kept purely because global.css 
        targets .calc-wrap[data-variant="..."] .calc-body for the grid layouts. 
        All heavy styling (borders, backgrounds) was removed from it in CSS. 
      */}
      <div className="calc-wrap animate-fade-in-up" style={{ animationDelay: '200ms' }} data-variant={variant}>
        <div className="calc-body">
          {children}
        </div>
      </div>
    </div>
  )
}
