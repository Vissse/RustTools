import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/guides/farming")({
  head: () =>
    seo({
      title: "Rust Farming Guide — Seeds, Genetics, and Breeding",
      description:
        "Learn how to build a fully functional and highly efficient farm in Rust. Master irrigation, lighting, advanced gene crossbreeding and animal farming.",
      path: "/guides/farming",
    }),
  component: lazyRouteComponent(
    () => import("../components/guides/FarmingGuide"),
    "FarmingGuide",
  ),
});
