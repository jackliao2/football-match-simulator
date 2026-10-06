# GSC priority-page improvements — 6 October 2026

The 5 October GSC export contains search performance through 2 October. It predates this release and cannot measure its effect.

## Problem and resulting behaviour

Six pages already receive impressions but provide incomplete answers to some of the searches they attract. Existing squad-before-simulation ordering remains; this release adds historical records above the selected model squad and direct club comparisons before the peak-team discussion.

| Page | Exported impressions / clicks / position | Added answer |
| --- | --- | --- |
| Chelsea 2004/05 | 303 / 1 / 35.81 | League and cup record; team clean sheets (25) versus Čech's personal total (24) |
| Netherlands 1988 | 129 / 0 / 13.88 | Actual Euro final XI, result and distinction from the model squad |
| France 2018 | 90 / 0 / 8.92 | Complete 23-player FIFA squad, shirt numbers, final XI and substitutes |
| AC Milan vs Inter | 175 / 0 / 9.18 | European Cups 7–3 and the selected seasons' different achievements |
| Barcelona vs Real Madrid | 93 / 1 / 7.11 | European Cups 5–15; historical record versus editorial peak preference |
| Manchester United vs Liverpool | 82 / 0 / 10.30 | League titles 20–20; European Cups 3–6; selected seasons' league finishes |

Historical sources are linked next to each table: Premier League, UEFA, FIFA, FFF and the clubs' official honours pages. Trophy figures were checked on 6 October 2026 and are dated snapshots, not live totals. France's complete historical roster is separate from the engine's smaller selected squad. No engine or player ratings change.

## SEO and presentation

- France and Netherlands metadata now describe the added information.
- Three comparison H1s name both clubs and the question answered; honours tables follow immediately.
- The same FAQ answers feed visible content and JSON-LD.
- Only these six pages receive a 6 October modification date in their Article markup, byline and sitemap. Previous review dates remain for other pages.
- HTML tables have captions, column and row headers, wrapping text and an overflow container for narrow screens.

## Verification and evaluation

Run the existing check suite, a production build, rendered-HTML checks, and the indexability audit after deployment. The baseline is 100 tests, 365 generated routes and 232 sitemap URLs.

Evaluate after recrawl using the same URLs, query groups, countries and devices. Compare a full 28-day period against the preceding 28 days. Track impressions, clicks, CTR and the share of queries reaching positions 1–3 or 4–10; a changing query mix can move the average position without equivalent changes in individual keywords. Do not interpret a handful of impressions or one week as proof of improvement or decline.
