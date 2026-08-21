"use server"

import { redirect } from "next/navigation"
import { getTeam } from "@/data/teams"
import { buildMatchId, createSeed } from "@/lib/match-id"

export async function startMatch(formData: FormData) {
  const home = String(formData.get("home") ?? "")
  const away = String(formData.get("away") ?? "")
  if (!getTeam(home) || !getTeam(away) || home === away) {
    redirect("/simulate")
  }
  redirect(`/match/${buildMatchId(home, away, createSeed())}`)
}
