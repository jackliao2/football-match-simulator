"use client"

import { useState } from "react"
import Link from "next/link"
import { TeamCard } from "@/components/teams/TeamCard"
import type { HistoricalTeam } from "@/types"

type Section = { id: string; label: string; note: string; orgs: Array<{ id: string; name: string; detail: string; href: string; teams: HistoricalTeam[] }> }
type Filter = { id: string; label: string }

export function FilteredCatalog({ mode, sections }: { mode: "clubs" | "nations"; sections: Section[] }) {
  const [filter, setFilter] = useState("all")
  const filters: Filter[] = mode === "nations"
    ? [{ id: "all", label: "All eras" }, { id: "world", label: "World Cup winners" }, { id: "euros", label: "Euro winners" }, { id: "copa", label: "Copa América winners" }, { id: "finalists", label: "Finalists" }]
    : [{ id: "all", label: "All eras" }, { id: "europe", label: "European champions" }, { id: "league", label: "League champions" }, { id: "treble", label: "Treble winners" }]

  const visible = (team: HistoricalTeam) => filter === "all" || honours(team, mode).includes(filter)
  const count = sections.flatMap((section) => section.orgs.flatMap((org) => org.teams)).filter(visible).length

  return <>
    <div className="catalog-filters" role="group" aria-label="Filter squads by achievement">
      {filters.map((item) => <button key={item.id} type="button" aria-pressed={filter === item.id} className={filter === item.id ? "is-on" : ""} onClick={() => setFilter(item.id)}>{item.label}</button>)}
      <span>{count} squads</span>
    </div>
    {sections.map((section) => {
      const orgs = section.orgs.map((org) => ({ ...org, teams: org.teams.filter(visible) })).filter((org) => org.teams.length)
      if (!orgs.length) return null
      return <section key={section.id} className="grid gap-4">
        <h2 className="font-display text-xs tracking-[0.18em] text-gold uppercase">{section.label}</h2>
        <p className="catalog-note">{section.note}</p>
        {orgs.map((org) => <div key={org.id} className="grid gap-3">
          <h3 className="font-brand text-lg font-semibold tracking-wide"><Link href={org.href} className="hover:text-gold">{org.name}</Link><span className="ml-2 font-mono text-xs font-normal tracking-normal text-muted">{org.detail} · {org.teams.map((team) => team.displaySeason).join(" / ")}</span></h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{org.teams.map((team) => <TeamCard key={team.id} team={team} showSquad={false} />)}</div>
        </div>)}
      </section>
    })}
  </>
}

function honours(team: HistoricalTeam, mode: "clubs" | "nations") {
  const text = team.achievements.join(" ").toLowerCase()
  if (mode === "nations") return [
    /(?:fifa )?world cup winners/.test(text) && "world",
    /(?:uefa )?european championship winners|euros winners/.test(text) && "euros",
    /copa américa winners|copa america winners/.test(text) && "copa",
    /world cup runners-up|european championship runners-up/.test(text) && "finalists",
  ].filter(Boolean) as string[]
  const europe = /champions league winners|european cup winners/.test(text)
  const league = /league champions|league winners|la liga champions|serie a champions|bundesliga champions|premier league champions|eredivisie champions|ligue 1 champions/.test(text)
  const cup = /cup winners|copa del rey winners|fa cup winners|coppa italia winners/.test(text)
  return [europe && "europe", league && "league", europe && league && cup && "treble"].filter(Boolean) as string[]
}
