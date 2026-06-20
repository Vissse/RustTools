import { createFileRoute } from "@tanstack/react-router";
import { DecayCalculator } from "../components/DecayCalculator";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/decay")({
  head: () =>
    seo({
      title: "Rust Decay Calculator — Building Decay Time by Material",
      description:
        "Work out how long a Rust structure survives without upkeep. Pick the building material and HP to see the full decay time.",
      path: "/decay",
    }),
  component: DecayCalculator,
});
