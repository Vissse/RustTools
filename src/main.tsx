import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './styles/global.css'
import { ErrorPage } from './components/ErrorPage'
import { initAnalytics, capturePageview } from './lib/analytics'

// OPTIMALIZACE PRO GECKO: Inicializace analytiky přesunuta do fronty makrouloh (idle callback / setTimeout),
// aby neblokovala parsování DOM a první plynulé vykreslení (First Paint) kalkulačky.
// posthog-js se navíc načítá dynamickým importem (až uvnitř initAnalytics), takže
// nikdy není součástí kritického entry bundlu.
if (typeof window !== 'undefined') {
  const scheduleInitialization =
    window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
  scheduleInitialization(() => {
    // První pageview zachytíme až po dokončení (asynchronní) inicializace.
    void initAnalytics().then(() =>
      capturePageview(window.location.pathname),
    )
  })
}

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultErrorComponent: ErrorPage,
})

// OPTIMALIZACE: Odběr navigace upraven tak, aby analytika běžela v passive/non-blocking režimu.
// Využíváme microtask/setTimeout k uvolnění exekučního vlákna pro plynulý přechod routeru v Firefoxu.
router.subscribe('onResolved', () => {
  const currentPath = router.state.location.pathname
  setTimeout(() => {
    capturePageview(currentPath)
  }, 0)
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
