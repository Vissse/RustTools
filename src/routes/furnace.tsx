import { createFileRoute } from "@tanstack/react-router";
import { FurnaceCalculator } from "../components/FurnaceCalculator";

export const Route = createFileRoute("/furnace")({
  component: FurnaceCalculator,
});
