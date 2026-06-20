import { createFileRoute } from "@tanstack/react-router";
import { DecayCalculator } from "../components/DecayCalculator";

export const Route = createFileRoute("/decay")({
  component: DecayCalculator,
});
