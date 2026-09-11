import type { NextConfig } from "next"

const NATION_IDS = [
  "brazil",
  "argentina",
  "france",
  "spain",
  "germany",
  "italy",
  "netherlands",
]

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
]

const EDGE_CACHE_HEADERS = [
  { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
  { key: "CDN-Cache-Control", value: "public, max-age=300" },
]

const HTML_CACHE_SOURCES = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/methodology",
  "/best-football-team-ever",
  "/search",
  "/teams",
  "/teams/:path*",
  "/national-teams",
  "/national-teams/:path*",
  "/compare",
  "/compare/:path*",
  "/vs",
  "/vs/:path*",
  "/prime",
  "/prime/:path*",
  "/es",
  "/es/:path*",
  "/pt-br",
  "/pt-br/:path*",
]

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      {
        source: "/match/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      {
        source: "/simulate",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      ...HTML_CACHE_SOURCES.map((source) => ({
        source,
        headers: EDGE_CACHE_HEADERS,
      })),
      {
        source: "/es",
        headers: [{ key: "Content-Language", value: "es" }],
      },
      {
        source: "/es/:path*",
        headers: [{ key: "Content-Language", value: "es" }],
      },
      {
        source: "/pt-br",
        headers: [{ key: "Content-Language", value: "pt-BR" }],
      },
      {
        source: "/pt-br/:path*",
        headers: [{ key: "Content-Language", value: "pt-BR" }],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "www.legendarymatch.com" }],
        destination: "https://legendarymatch.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.legendarymatch.com" }],
        destination: "https://legendarymatch.com/:path*",
        permanent: true,
      },
      ...NATION_IDS.flatMap((id) => [
      {
        source: `/teams/${id}`,
        destination: `/national-teams/${id}`,
        permanent: true,
      },
      {
        source: `/teams/${id}/:season`,
        destination: `/national-teams/${id}/:season`,
        permanent: true,
      },
      ]),
    ]
  },
}

export default nextConfig
