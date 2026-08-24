"use client"

import { useEffect, useMemo, useState } from "react"
import { PixelCrest } from "@/components/teams/PixelCrest"
import { LEAGUES, NATION_REGIONS, clubs as clubCatalog, nations as nationCatalog, getClub } from "@/data/clubs"

export interface ClubPick {
  clubId: string
  clubName: string
  overallRating: number
}

function matchesQuery(item: ClubPick, query: string) {
  if (!query) return true
  const meta = getClub(item.clubId)
  const hay = `${item.clubName} ${meta?.code ?? ""} ${meta?.city ?? ""}`.toLowerCase()
  return hay.includes(query)
}

export function ClubPicker({
  clubs,
  nations,
  currentId,
  onSelect,
  onClose,
}: {
  clubs: ClubPick[]
  nations: ClubPick[]
  currentId: string
  onSelect: (clubId: string) => void
  onClose: () => void
}) {
  const [tab, setTab] = useState<"clubs" | "nations">(
    nations.some((item) => item.clubId === currentId) ? "nations" : "clubs",
  )
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const byId = useMemo(() => {
    const map = new Map<string, ClubPick>()
    for (const item of [...clubs, ...nations]) map.set(item.clubId, item)
    return map
  }, [clubs, nations])

  const clubGroups = useMemo(() => {
    const used = new Set<string>()
    const groups: { id: string; label: string; items: ClubPick[] }[] = LEAGUES.map((league) => {
      const items = clubCatalog
        .filter((club) => club.league === league.id)
        .map((club) => byId.get(club.id))
        .filter((item): item is ClubPick => Boolean(item && matchesQuery(item, q)))
      for (const item of items) used.add(item.clubId)
      return { id: league.id, label: league.label, items }
    }).filter((group) => group.items.length > 0)

    const rest = clubs.filter((item) => !used.has(item.clubId) && matchesQuery(item, q))
    if (rest.length > 0) groups.push({ id: "other", label: "Other", items: rest })
    return groups
  }, [byId, clubs, q])

  const nationGroups = useMemo(() => {
    const used = new Set<string>()
    const groups: { id: string; label: string; items: ClubPick[] }[] = NATION_REGIONS.map((region) => {
      const items = nationCatalog
        .filter((nation) => nation.region === region.id)
        .map((nation) => byId.get(nation.id))
        .filter((item): item is ClubPick => Boolean(item && matchesQuery(item, q)))
      for (const item of items) used.add(item.clubId)
      return { id: region.id, label: region.label, items }
    }).filter((group) => group.items.length > 0)

    const rest = nations.filter((item) => !used.has(item.clubId) && matchesQuery(item, q))
    if (rest.length > 0) groups.push({ id: "other", label: "Other", items: rest })
    return groups
  }, [byId, nations, q])

  const groups = tab === "clubs" ? clubGroups : nationGroups
  const empty = groups.length === 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-2 sm:items-center sm:p-3"
      onClick={onClose}
    >
      <div className="picker-shell" onClick={(event) => event.stopPropagation()}>
        <div className="picker-head">
          <div className="picker-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === "clubs"}
              className={tab === "clubs" ? "is-on" : ""}
              onClick={() => setTab("clubs")}
            >
              Clubs
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === "nations"}
              className={tab === "nations" ? "is-on" : ""}
              onClick={() => setTab("nations")}
            >
              Nations
            </button>
          </div>
          <input
            className="picker-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find…"
            aria-label="Filter teams"
          />
          <button type="button" className="picker-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="picker-body">
          {empty ? <p className="picker-empty">No match.</p> : null}
          {groups.map((group) => (
            <section key={group.id} className="picker-league">
              <h3>{group.label}</h3>
              <div className="picker-row">
                {group.items.map((item) => {
                  const meta = getClub(item.clubId)
                  const active = item.clubId === currentId
                  return (
                    <button
                      key={item.clubId}
                      type="button"
                      title={`${item.clubName} · ${item.overallRating}`}
                      className={`picker-cell${active ? " is-on" : ""}`}
                      onClick={() => onSelect(item.clubId)}
                    >
                      <PixelCrest clubId={item.clubId} size={22} />
                      <span className="picker-code">{meta?.code ?? item.clubName.slice(0, 3).toUpperCase()}</span>
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
