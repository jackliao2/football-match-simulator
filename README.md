# Football Match Simulator

Historical football database + match simulator. Pick a legendary team, pick a season, and settle the debate.

This is **not** a management game, card game, or generic football chatbot. Historical teams are reusable entities with squad pages that also rank for club + year + squad searches.

Live intent:

- Search: `real madrid 2017 squad` → `/teams/real-madrid/2016-17`
- Play: `football match simulator` → homepage / `/simulate`

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Local TypeScript simulation engine
- Optional OpenAI-compatible AI commentary

No database is required for the MVP. Team data lives in TypeScript seed files and can move to PostgreSQL later.

## Product loop

1. Land on a historical team page
2. Click **Simulate this team**
3. Play a seeded match
4. Simulate again, run 100 matches, or share the match URL

## Architecture

```text
Historical Team Database
        ↓
Simulation Engine
        ↓
Structured Match JSON
        ↓
AI Commentary Layer (optional)
        ↓
UI Match Report
```

The engine decides the score, xG, shots, scorers, cards and events. AI never decides a winner. If the AI API is missing or fails, a local template report is used.

## Adding a historical team

1. Create or edit a club file under `data/teams/`.
2. Use `makeTeam()` and `pl()` from `data/build-team.ts`.
3. Set `clubId`, `season` (`2008-09`), `displaySeason` (`2008/09`), formation, ratings, style tags, achievements and a factual summary.
4. `startingXI` must be 11 player ids, ordered **attack → defence → goalkeeper**, left to right, matching `lib/formations.ts`.
5. Export the team from `data/teams/index.ts`.
6. If it is a new club, add it to `data/clubs.ts`.
7. Optional: add a Prime candidate in `data/prime.ts` and a default rival in `data/matchups.ts`.

Ratings are **era-relative**. Do not make modern teams automatically stronger. A 95-attack 1970 side should compete with a 95-attack 2022 side.

Do not add club crests, player photos, official kits, league logos or copied FIFA/Football Manager ratings.

## Simulation model

Location: `lib/simulation/`

- Seeded RNG so the same `matchId` always reproduces the same match
- Offensive strength vs opponent resistance
- Expected goals, clamped to `0.25 … 3.8`
- Poisson goals
- Weighted scorers / assists from the starting XI
- Monte Carlo (`simulateMany`) for 100-match runs and VS pages

Shareable match URLs look like:

```text
/match/barcelona-2008-09-vs-real-madrid-2016-17-a71d92
```

## Optional AI commentary

Set any OpenAI-compatible endpoint:

```env
AI_API_KEY=
AI_BASE_URL=https://api.x.ai/v1
AI_MODEL=grok-4.6
```

`XAI_API_KEY` is accepted as a fallback. Commentary is generated only after the user asks for a report (`POST /api/commentary`). Historical pages never call AI.

## SEO rules

- One strong page per club-season: `/teams/{club}/{season}`
- Do **not** create thin duplicates for squad / lineup / team / formation variants
- Prime pages (`/prime/barcelona`) are discovery pages, not the product category
- VS pages explain the matchup and show model probabilities; they do not present one random score as fact

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Disclaimer

Independent football simulation project. Not affiliated with or endorsed by any club, league, federation or player.
