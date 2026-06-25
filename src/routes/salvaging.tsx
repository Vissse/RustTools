import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/salvaging")({
  head: () =>
    seo({
      title: "Rust Salvaging Calculator — Bradley & Heli Yields",
      description:
        "Check how much charcoal, metal fragments, and HQM you get by salvaging destroyed Bradleys and Patrol Helicopters in Rust.",
      path: "/salvaging",
    }),
  component: lazyRouteComponent(
    () => import("../components/SalvagingCalculator"),
    "SalvagingCalculator",
  ),
});
