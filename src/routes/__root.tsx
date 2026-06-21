import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ErrorPage } from '../components/ErrorPage'
import { seo } from '../lib/seo'

export const Route = createRootRoute({
  // Site-wide head defaults. Per-route `head` (title, description, canonical)
  // is merged on top of these by TanStack Router.
  head: () => {
    // Only the `meta` fallback is taken here; the canonical `link` is left to
    // each leaf route so we never emit two <link rel="canonical"> at once
    // (links aren't deduped by rel, unlike meta which dedupes by name/property).
    const { meta } = seo({
      title: 'RustTools — Raid, Recycling & Cupboard Calculators for Rust',
      description:
        'Free calculators for the survival game Rust: work out the cheapest raid, recycler yields, base upkeep, smelting, decay and more.',
      path: '/',
    })
    return { meta: [{ name: 'robots', content: 'index, follow' }, ...meta] }
  },
  component: RootLayout,
  errorComponent: ({ error, reset }) => (
    <ErrorPage error={error} reset={reset} />
  ),
  notFoundComponent: () => (
    <ErrorPage
      title="PAGE NOT FOUND"
      error="The page you're looking for doesn't exist."
    />
  ),
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
