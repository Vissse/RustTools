import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/guides/base-building")({
  head: () =>
    seo({
      title: "Base Building Patterns | RustTools",
      description: "Discover the most effective base footprints, honeycombing, pixel gaps, and unraidable bunker designs.",
      path: "/guides/base-building"
    }),
  component: lazyRouteComponent(
    () => import("../components/guides/BaseBuildingGuide"),
    "BaseBuildingGuide"
  )
});
