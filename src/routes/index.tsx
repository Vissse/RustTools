import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "RustTools — Master Your Wipe",
      description: "Precise calculators and in-depth strategy guides giving you the ultimate advantage. Survive longer, raid smarter.",
      path: "/",
    }),
  component: lazyRouteComponent(
    () => import("../components/Home"),
    "Home",
  ),
});
