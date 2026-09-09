import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Advocat in Türkiye — Ruslana Pasecinic",
    short_name: "Advocat in Türkiye",
    description: "Lawyer in Türkiye · Адвокат в Турции",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e7",
    theme_color: "#0c211b",
    lang: "tr",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}