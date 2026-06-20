import { createFileRoute } from "@tanstack/react-router";
import { GeneticsCalculator } from "../components/GeneticsCalculator";

export const Route = createFileRoute("/genetics")({
  component: GeneticsCalculator,
});
