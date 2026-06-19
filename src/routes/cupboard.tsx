import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/cupboard")({
  component: lazyRouteComponent(
    () => import("../components/CupboardCalculator"),
    "CupboardCalculator",
  ),
});
