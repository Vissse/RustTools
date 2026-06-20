import { createFileRoute } from "@tanstack/react-router";
import { GiantExcavatorCalculator } from "../components/GiantExcavatorCalculator";

export const Route = createFileRoute("/giant-excavator")({
  component: GiantExcavatorCalculator,
});
