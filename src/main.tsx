import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { PostHogProvider } from '@posthog/react'
import { routeTree } from './routeTree.gen'
import './styles/global.css'
import { ErrorPage } from './components/ErrorPage'
import { initAnalytics, capturePageview, posthog } from './lib/analytics'

initAnalytics()

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultErrorComponent: ErrorPage,
})

// Client-side routing has no full page loads after the first, so capture a
// pageview on every resolved navigation (plus the initial load).
capturePageview(router.state.location.pathname)
router.subscribe('onResolved', () => {
  capturePageview(router.state.location.pathname)
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <RouterProvider router={router} />
    </PostHogProvider>
  </StrictMode>
)
