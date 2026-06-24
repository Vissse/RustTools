import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { PostHogProvider } from "@posthog/react";
import { routeTree } from "./routeTree.gen";
import "./styles/global.css";
import { ErrorPage } from "./components/ErrorPage";
import { initAnalytics, capturePageview, posthog } from "./lib/analytics";

// OPTIMALIZACE PRO GECKO: Inicializace analytiky přesunuta do fronty makrouloh (idle callback / setTimeout),
// aby neblokovala parsování DOM a první plynulé vykreslení (First Paint) kalkulačky.
if (typeof window !== "undefined") {
  const scheduleInitialization =
    window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
  scheduleInitialization(() => {
    initAnalytics();
    // První pageview zachytíme asynchronně po plynulém náběhu aplikace
    capturePageview(window.location.pathname);
  });
}

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: ErrorPage,
});

// OPTIMALIZACE: Odběr navigace upraven tak, aby analytika běžela v passive/non-blocking režimu.
// Využíváme microtask/setTimeout k uvolnění exekučního vlákna pro plynulý přechod routeru v Firefoxu.
router.subscribe("onResolved", () => {
  const currentPath = router.state.location.pathname;
  setTimeout(() => {
    capturePageview(currentPath);
  }, 0);
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <RouterProvider router={router} />
    </PostHogProvider>
  </StrictMode>,
);
