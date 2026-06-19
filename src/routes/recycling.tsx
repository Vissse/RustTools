import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/recycling")({
  component: lazyRouteComponent(
    () => import("../components/RecyclingCalculator"),
    "RecyclingCalculator",
  ),
});
