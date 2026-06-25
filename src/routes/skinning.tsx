import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/skinning")({
  head: () =>
    seo({
      title: "Rust Skinning Calculator — Animal & Entity Yields",
      description:
        "Check how much meat, fat, leather, and bone fragments you get by skinning animals in Rust with different tools.",
      path: "/skinning",
    }),
  component: lazyRouteComponent(
    () => import("../components/SkinningCalculator"),
    "SkinningCalculator",
  ),
});
