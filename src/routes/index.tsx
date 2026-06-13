import { createFileRoute } from "@tanstack/react-router";
import { RaidCalculator } from "../components/RaidCalculator";

export const Route = createFileRoute("/")({
  component: RaidCalculator,
});
