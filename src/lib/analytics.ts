/**
 * Central analytics module (PostHog).
 *
 * Components should import the helpers here rather than `posthog-js` directly.
 *
 * Configured for:
 *  - EU data residency (api_host).
 *  - Cookieless operation (`persistence: 'memory'`) so no consent banner is
 *    required — nothing is written to cookies or localStorage.
 *  - Manual pageview capture: this is a client-side-routed SPA, so automatic
 *    capture would only fire on the first load. `capturePageview` is called on
 *    every route change from main.tsx instead.
 *
 * If `VITE_POSTHOG_KEY` is absent (e.g. local dev without a key) everything is a
 * no-op and nothing is sent.
 */
import { useEffect, useRef } from "react";
import posthog from "posthog-js";

const KEY = import.meta.env.VITE_POSTHOG_KEY;
const HOST = import.meta.env.VITE_POSTHOG_HOST ?? "https://eu.i.posthog.com";

let enabled = false;

/** Stable event names for feature-usage tracking — keep these in one place to
 *  avoid typos that would split a metric across two spellings in PostHog. */
export const Feature = {
  raid: "raid_calc",
  recycling: "recycling_calc",
  genetics: "genetics_calc",
  furnace: "furnace_calc",
  cupboard: "cupboard_calc",
  decay: "decay_calc",
  shops: "shops_calc",
  giantExcavator: "giant_excavator_calc",
} as const;

export type FeatureName = (typeof Feature)[keyof typeof Feature];

/** Initialize PostHog once, at app startup. No-op when no key is configured. */
export function initAnalytics(): void {
  if (enabled || !KEY) return;
  posthog.init(KEY, {
    api_host: HOST,
    persistence: "memory", // cookieless — no consent banner needed
    capture_pageview: false, // we capture manually on route change (SPA)
    autocapture: true, // cheap "most clicked" signal
  });
  enabled = true;
}

/** Record a pageview for the current route. Called on every navigation. */
export function capturePageview(path: string): void {
  if (!enabled) return;
  posthog.capture("$pageview", {
    $current_url: window.location.href,
    path,
  });
}

/** Record that a user actually used a feature (e.g. ran a calculation). */
export function trackFeature(
  feature: FeatureName,
  props?: Record<string, unknown>,
): void {
  if (!enabled) return;
  posthog.capture("feature_used", { feature, ...props });
}

/**
 * Fire a single `feature_used` event the first time the user actually interacts
 * with a calculator on this page load. `signal` should be a primitive derived
 * from the calculator's user-controlled inputs (a count, or a `|`-joined
 * signature). The initial value is treated as the baseline, so events represent
 * real engagement rather than just landing on the page. Resets on remount
 * (i.e. on navigation back to the page), so a returning user counts again.
 */
export function useFeatureUsed(feature: FeatureName, signal: unknown): void {
  const baseline = useRef(signal);
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || Object.is(signal, baseline.current)) return;
    fired.current = true;
    trackFeature(feature);
  }, [feature, signal]);
}

export { posthog };
