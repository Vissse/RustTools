import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/shops")({
  head: () =>
    seo({
      title: "Rust Shops Calculator — Bandit Camp, Outpost & Fishing Village",
      description:
        "Calculate scrap costs for items at the Bandit Camp, Outpost, and Fishing Village in Rust. Track your scrap balance, purchases, and exchange rates.",
      path: "/shops",
    }),
  // Sdílené odkazy: zachovej libovolné search params (stav kalkulačky v URL).
  validateSearch: (search: Record<string, unknown>) => search,
  component: lazyRouteComponent(
    () => import("../components/ShopCalculator"),
    "ShopCalculator",
  ),
});
