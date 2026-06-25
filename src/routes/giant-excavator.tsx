import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/giant-excavator")({
  head: () =>
    seo({
      title: "Rust Giant Excavator Calculator — Output & Fuel",
      description:
        "Calculate Giant Excavator output and diesel fuel use in Rust to plan your mining runs at the monument.",
      path: "/giant-excavator",
    }),
  // Sdílené odkazy: zachovej libovolné search params (stav kalkulačky v URL).
  validateSearch: (search: Record<string, unknown>) => search,
  component: lazyRouteComponent(
    () => import("../components/GiantExcavatorCalculator"),
    "GiantExcavatorCalculator",
  ),
});
