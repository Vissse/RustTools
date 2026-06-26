import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/raid")({
  head: () =>
    seo({
      title: "Rust Raid Calculator — Cheapest Way to Raid Any Base",
      description:
        "Pick a structure and the explosives you have, and the Rust Raid Calculator finds the cheapest combo to break it by sulfur, with the full resource cost.",
      path: "/raid",
    }),
  component: lazyRouteComponent(
    () => import("../components/RaidCalculator"),
    "RaidCalculator",
  ),
});
