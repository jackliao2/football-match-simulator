import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Match replays must be crawlable so search engines can read their noindex.
        disallow: ["/api/"],
      },
      {
        userAgent: ["SemrushBot", "AhrefsBot", "MJ12bot", "DotBot"],
        allow: "/",
        disallow: ["/api/"],
        crawlDelay: 10,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
