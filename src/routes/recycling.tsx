import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/recycling")({
  head: () =>
    seo({
      title: "Rust Recycling Calculator — Recycler Yields & Outputs",
      description:
        "Drop items into a recycler and see exactly what you get back, for both the Radtown and Safe Zone recyclers in Rust.",
      path: "/recycling",
    }),
  // Sdílené odkazy: zachovej libovolné search params (stav kalkulačky v URL).
  validateSearch: (search: Record<string, unknown>) => search,
  component: lazyRouteComponent(
    () => import("../components/RecyclingCalculator"),
    "RecyclingCalculator",
  ),
});
