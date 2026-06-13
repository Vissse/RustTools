import { createFileRoute } from "@tanstack/react-router";
import { RecyclingCalculator } from "../components/RecyclingCalculator";

export const Route = createFileRoute("/recycling")({
  component: RecyclingCalculator,
});
