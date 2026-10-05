# Search improvements — 5 October 2026

## Scope

The supplied Google performance export ends on 2 October; the coverage export
ends on 21 September. Coverage reasons are historical snapshots, not today's
indexing status. Google URL Inspection access is needed to establish current
Google-selected canonicals, last crawls and exclusions for specific URLs.

Changes target AC Milan–Inter, Manchester United–Liverpool and Chelsea 2004/05.
Comparison pages now answer separate questions about historical criteria,
selected peak seasons and hypothetical head-to-head results before the longer
discussion. Chelsea has a compact representative-XI explanation above its squad.
No complete official roster or current-form ranking is claimed.

Team pages link to comparisons that use their exact model season. Existing
comparison-to-squad links complete the navigation in the other direction.
Only the three substantially revised pages receive 5 October modification dates
in the sitemap and article metadata. Other editorial dates are preserved.

## Indexability audit

Before release, all 232 production sitemap URLs returned 200, had matching
canonicals, and had no HTML or HTTP-header noindex directives. Every sitemap
page had an inbound anchor from another sitemap page. The initial 20-request
batch produced transport failures; the revised audit uses four concurrent
requests, bounded timeouts and retries, and passed the full set.

Run `npm run indexability:check` after deployment. This checks technical
eligibility and links; it does not prove Google has indexed or ranked a page.
The audit does not remove deliberately excluded model pages or index match URLs.

## Organic-search conversion measurement

Consent-gated GA4 events:

| Event | Meaning |
| --- | --- |
| `organic_search_landing_view` | First recognised organic search arrival in the tracked visit |
| `organic_search_simulator_started` | First single or batch simulation start in that visit |

Both include `landing_path` and `search_engine`; the start event also includes
`page_path`, home/away IDs and the caller's mode/source when supplied. Attribution
survives same-tab internal navigation and full-page navigation. It expires after
30 minutes without a page or simulation-start tracking call. A new external
arrival or tagged campaign resets prior attribution. Repeat plays emit the
existing `simulator_started` event without adding another organic conversion.

Supported referrers: Google, Bing, DuckDuckGo, Yahoo Search and Baidu. Campaign
parameters and click IDs are excluded. Missing referrers cannot be inferred as
search. This is an explicit observed-referrer funnel, not a replacement for GA4's
session attribution. Only consented visits are measured. Search query strings and
referrer URLs are not included in the new events; only page paths and engine names
are retained in session storage. Denied consent clears that attribution.

In GA4, register `landing_path` and `search_engine` as event-scoped custom
dimensions to break down the funnel by entry page and engine. Optionally mark
`organic_search_simulator_started` as a key event. Compare entry and first-start
event counts over the same period; starts are counted once per tracked visit,
including batch runs. Allow for visits crossing reporting-day boundaries.
These account-side settings have not been changed by the code release.

Review at least several complete weeks after release: non-brand clicks,
query-specific rankings, impressions and consented first-start conversion by
landing page. The small baseline is not enough to claim a stable uplift.
