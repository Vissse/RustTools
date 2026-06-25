import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/cupboard")({
  head: () =>
    seo({
      title: "Rust Cupboard Calculator — Tool Cupboard Upkeep & Decay Time",
      description:
        "Enter your daily upkeep and see how long your base stays protected, laid out across the 24 Tool Cupboard slots in Rust.",
      path: "/cupboard",
    }),
  // Sdílené odkazy: zachovej libovolné search params (stav kalkulačky v URL).
  validateSearch: (search: Record<string, unknown>) => search,
  component: lazyRouteComponent(
    () => import("../components/CupboardCalculator"),
    "CupboardCalculator",
  ),
});
