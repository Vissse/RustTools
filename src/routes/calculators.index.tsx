import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/calculators/")({
  head: () =>
    seo({
      title: "Rust Calculators & Tools",
      description: "Optimize your gameplay with our precision tools. Calculate raid costs, smelting times, and resource yields to dominate the wipe.",
      path: "/calculators"
    }),
  component: lazyRouteComponent(
    () => import("../components/calculators/CalculatorsHub"),
    "CalculatorsHub"
  )
});
