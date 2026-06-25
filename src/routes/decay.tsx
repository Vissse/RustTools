import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/decay")({
  head: () =>
    seo({
      title: "Rust Decay Calculator — Building Decay Time by Material",
      description:
        "Work out how long a Rust structure survives without upkeep. Pick the building material and HP to see the full decay time.",
      path: "/decay",
    }),
  // Sdílené odkazy: zachovej libovolné search params (stav kalkulačky v URL).
  validateSearch: (search: Record<string, unknown>) => search,
  // OPTIMALIZACE PRO RYCHLOST NAČÍTÁNÍ: Změněno ze synchronního importu na lazy load.
  // Obrovská datová pole pro decay se načtou až při návštěvě této konkrétní záložky.
  component: lazyRouteComponent(
    () => import("../components/DecayCalculator"),
    "DecayCalculator",
  ),
});
