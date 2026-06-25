import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Rust Raid Calculator — Cheapest Way to Raid Any Base",
      description:
        "Pick a structure and the explosives you have, and the Rust Raid Calculator finds the cheapest combo to break it by sulfur, with the full resource cost.",
      path: "/",
    }),
  // Sdílené odkazy: zachovej libovolné search params (stav kalkulačky v URL).
  validateSearch: (search: Record<string, unknown>) => search,
  component: lazyRouteComponent(
    () => import("../components/RaidCalculator"),
    "RaidCalculator",
  ),
});
