import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/genetics")({
  head: () =>
    seo({
      title: "Rust Genetics Calculator — Best Plant Gene Combinations",
      description:
        "Cross-breed plant genes in Rust to find the best crop genetics. Enter your gene sets and see the optimal combination.",
      path: "/genetics",
    }),
  component: lazyRouteComponent(
    () => import("../components/GeneticsCalculator"),
    "GeneticsCalculator",
  ),
});
