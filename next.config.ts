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
  async redirects() {
    return NATION_IDS.flatMap((id) => [
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
    ])
  },
}

export default nextConfig
