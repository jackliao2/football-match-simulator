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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/es/:path*",
        headers: [{ key: "Content-Language", value: "es" }],
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
