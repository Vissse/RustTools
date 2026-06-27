'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initAnalytics, capturePageview } from '@/lib/analytics'

/**
 * Drives PostHog from the App Router. Initialization is deferred to browser idle
 * time so it never blocks first paint, and posthog-js is dynamically imported
 * (inside initAnalytics) so it stays out of the critical bundle. A pageview is
 * captured for the initial load and on every client-side route change.
 *
 * Fully inert when NEXT_PUBLIC_POSTHOG_KEY is unset (all helpers are no-ops).
 */
export function AnalyticsProvider() {
  const pathname = usePathname()

  // One-time init, deferred off the critical path. Capture the first pageview
  // only once init resolves (capturePageview is a no-op until then).
  useEffect(() => {
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number
    }
    const schedule =
      w.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
    schedule(() => {
      void initAnalytics().then(() => capturePageview(window.location.pathname))
    })
  }, [])

  // Subsequent navigations.
  useEffect(() => {
    capturePageview(pathname)
  }, [pathname])

  return null
}
