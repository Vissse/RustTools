import { createFileRoute } from "@tanstack/react-router";
import { CupboardCalculator } from "../components/CupboardCalculator";

export const Route = createFileRoute("/cupboard")({
  component: CupboardCalculator,
});
