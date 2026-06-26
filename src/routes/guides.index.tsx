import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/guides/")({
  head: () =>
    seo({
      title: "Rust Guides & Tutorials",
      description: "In-depth tutorials and advanced strategies to help you dominate your wipe in Rust. From basic survival to complex electrical systems.",
      path: "/guides",
    }),
  component: lazyRouteComponent(
    () => import("../components/guides/GuidesHub"),
    "GuidesHub",
  ),
});
