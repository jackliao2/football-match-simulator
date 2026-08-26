import { readFile } from "node:fs/promises"
import process from "node:process"
import nextEnv from "@next/env"

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const problems = []

function problem(message) {
  problems.push(message)
  console.error(`✗ ${message}`)
}

function ok(message) {
  console.log(`✓ ${message}`)
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
if (!siteUrl) {
  problem("NEXT_PUBLIC_SITE_URL is missing")
} else {
  try {
    const parsed = new URL(siteUrl)
    if (parsed.protocol !== "https:") problem("NEXT_PUBLIC_SITE_URL must use HTTPS")
    else if (
      parsed.hostname === "example.com" ||
      parsed.hostname === "localhost" ||
      parsed.hostname.endsWith(".vercel.app")
    ) {
      problem("NEXT_PUBLIC_SITE_URL must be the owned production domain")
    } else {
      ok(`Production URL: ${parsed.origin}`)
    }
  } catch {
    problem("NEXT_PUBLIC_SITE_URL is not a valid URL")
  }
}

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
if (!contactEmail || !contactEmail.includes("@") || contactEmail.endsWith("@example.com")) {
  problem("NEXT_PUBLIC_CONTACT_EMAIL must be a working production inbox")
} else {
  ok(`Contact inbox: ${contactEmail}`)
}

const now = new Date()
const expectedSeasonStart = now.getUTCMonth() >= 6 ? now.getUTCFullYear() : now.getUTCFullYear() - 1
const currentClubs = await readFile(new URL("../data/teams/current-clubs.ts", import.meta.url), "utf8")
const seasonStarts = [...currentClubs.matchAll(/season:\s*"(\d{4})-\d{2}"/g)].map((match) =>
  Number(match[1]),
)
const newestSeasonStart = Math.max(...seasonStarts)
if (!Number.isFinite(newestSeasonStart) || newestSeasonStart < expectedSeasonStart) {
  problem(
    `Current club catalogue is stale: found ${newestSeasonStart || "none"}, expected ${expectedSeasonStart}-${String(expectedSeasonStart + 1).slice(-2)}`,
  )
} else {
  ok(`Current club catalogue starts in ${newestSeasonStart}`)
}

if (problems.length > 0) {
  console.error(`\nLaunch readiness: ${problems.length} blocker${problems.length === 1 ? "" : "s"}`)
  process.exitCode = 1
} else {
  console.log("\nLaunch readiness: passed")
}
