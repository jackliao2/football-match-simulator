import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HistoricalTeamView } from "@/components/teams/HistoricalTeamView"
import { clubSeasonTeams, getTeamByClubSeason } from "@/data/teams"
import { teamMetadata } from "@/lib/seo"

export const dynamicParams = false

export function generateStaticParams() {
  return clubSeasonTeams().map((team) => ({ club: team.clubId, season: team.season }))
}

export async function generateMetadata({
  params,
}: PageProps<"/teams/[club]/[season]">): Promise<Metadata> {
  const { club, season } = await params
  const team = getTeamByClubSeason(club, season)
  if (!team || team.kind === "nation") return { title: "Historical Team" }
  return teamMetadata(team)
}

export default async function HistoricalTeamPage({
  params,
}: PageProps<"/teams/[club]/[season]">) {
  const { club, season } = await params
  const team = getTeamByClubSeason(club, season)
  if (!team || team.kind === "nation") notFound()
  return <HistoricalTeamView team={team} />
}
