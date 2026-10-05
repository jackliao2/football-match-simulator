# SEO and historical content corrections — 5 October 2026

This release corrects historical claims that had spread into season dossiers,
metadata and related cards. It also repairs localized search navigation and
clarifies the simulator's different sample sizes.

## Changes

- Correct Real Madrid 2013/14's knockout route and 4–1 final, Ramos's
  stoppage-time equaliser, Milan 1989's semi-final venue, Milan's 2007 rematch,
  Juventus 2003's shootout, PSG 2018's scores, Ajax and Tottenham's 2019
  semi-final, Tottenham's final line-up, Italy 2021, Argentina 1986/2022,
  Germany 1990/2014, Brazil 1994 and Spain 2010.
- Remove next-season arrival Jürgen Klinsmann from Inter 1988/89's players
  and representative XI. Ramón Díaz partners Aldo Serena; Alessandro Bianchi
  fills the vacated midfield place. Correct the dossier, hub and metadata.
- Add official historical records to 20 season dossiers. Prime pages expose
  available candidate-season records without presenting editorial rankings or
  model ratings as official statistics.
- Share `BATCH_RUNS = 1000` and `AI_FORECAST_RUNS = 100` between runtime and
  English, Spanish and Portuguese explanations. The AI endpoint deliberately
  produces a separate 100-match forecast; it does not explain or overwrite
  the user's 1,000-match batch. Static matchup articles retain their own
  100/400-run samples.
- Point localized navigation at the existing `/search`. Preserve old
  `/es/search` and `/pt-br/search` links with permanent redirects, including
  their query parameters.
- Shorten comparison search titles that previously repeated long verdicts.
  Keep the full editorial verdict on the page. Reverse comparison aliases
  use permanent redirects.
- Replace the Messi-prime search-demand introduction with an explanation of
  candidate roles. Describe recent squads as model snapshots rather than
  live rosters.
- Update sitemap/content dates for specifically reviewed pages. Preserve
  existing noindex policies and unrelated working-tree files.

## Validation and delivery status

Final lint and type checks pass, and all 100 regression tests pass, including
the new Inter era and XI integrity regression. Lint reports two existing
unused-variable warnings. `git diff --check` passes. The production build
successfully generates all 365 routes.

Production verification after release checks the 232 sitemap pages,
localized navigation and old search redirects (including `?q=`), reverse
comparison redirects, corrected title/body text, historical source links and
the explicit 1,000-match batch versus separate 100-match AI explanation.

## Scope

These changes resolve confirmed audit findings, not every historical fact in
the catalogue. Core Web Vitals measurements, additional evidence for remaining
dossiers and fully translated indexable localized catalogues remain separate
work. No blanket noindex removal or unmeasured performance rewrite is included.
