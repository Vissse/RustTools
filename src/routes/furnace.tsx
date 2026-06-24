import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/furnace")({
  head: () =>
    seo({
      title: "Rust Furnace Calculator — Smelting Ratios & Times",
      description:
        "Plan your smelting in Rust: calculate furnace ratios, fuel and time to refine ore into metal, sulfur and high quality metal.",
      path: "/furnace",
    }),
  component: lazyRouteComponent(
    () => import("../components/FurnaceCalculator"),
    "FurnaceCalculator",
  ),
});
