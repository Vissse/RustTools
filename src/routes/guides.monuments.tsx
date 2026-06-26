import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/guides/monuments")({
  head: () =>
    seo({
      title: "Monument Puzzles | RustTools",
      description: "Step-by-step walkthroughs for every keycard puzzle and monument puzzle in the game.",
      path: "/guides/monuments"
    }),
  component: lazyRouteComponent(
    () => import("../components/guides/MonumentsGuide"),
    "MonumentsGuide"
  )
});
