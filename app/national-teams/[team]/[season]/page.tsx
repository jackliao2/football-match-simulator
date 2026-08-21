import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HistoricalTeamView } from "@/components/teams/HistoricalTeamView"
import { getTeamByClubSeason, nationSeasonTeams } from "@/data/teams"
import { teamMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return nationSeasonTeams().map((item) => ({ team: item.clubId, season: item.season }))
}

export async function generateMetadata({
  params,
}: PageProps<"/national-teams/[team]/[season]">): Promise<Metadata> {
  const { team, season } = await params
  const historical = getTeamByClubSeason(team, season)
  if (!historical || historical.kind !== "nation") return { title: "National Team" }
  return teamMetadata(historical)
}

export default async function NationalTeamSeasonPage({
  params,
}: PageProps<"/national-teams/[team]/[season]">) {
  const { team, season } = await params
  const historical = getTeamByClubSeason(team, season)
  if (!historical || historical.kind !== "nation") notFound()
  return <HistoricalTeamView team={historical} />
}
