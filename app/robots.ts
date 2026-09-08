import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/match/"],
      },
      {
        userAgent: ["SemrushBot", "AhrefsBot", "MJ12bot", "DotBot"],
        allow: "/",
        disallow: ["/api/", "/match/"],
        crawlDelay: 10,
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  }
}
