const site = (process.env.INDEXABILITY_SITE_URL || "https://legendarymatch.com").replace(/\/$/, "")
const concurrency = Math.max(1, Math.min(10, Number(process.env.INDEXABILITY_CONCURRENCY) || 4))

async function auditFetch(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) })
      if ((response.status === 429 || response.status >= 500) && attempt < 2) {
        await response.body?.cancel()
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)))
        continue
      }
      return response
    } catch (error) {
      if (attempt === 2) throw error
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)))
    }
  }
}

const sitemapResponse = await auditFetch(`${site}/sitemap.xml?indexability-audit=1`)
if (!sitemapResponse.ok) throw new Error(`Could not read sitemap: ${sitemapResponse.status}`)

const sitemap = await sitemapResponse.text()
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
if (urls.length === 0) throw new Error("The sitemap contains no URLs")

const issues = []
if (new Set(urls).size !== urls.length) issues.push({ error: "Duplicate sitemap URLs" })
const incoming = new Map(urls.map((url) => [new URL(url).href, new Set()]))
for (let offset = 0; offset < urls.length; offset += concurrency) {
  const batch = urls.slice(offset, offset + concurrency)
  const results = await Promise.all(batch.map(async (url) => {
    try {
      const separator = url.includes("?") ? "&" : "?"
      const response = await auditFetch(`${url}${separator}indexability-audit=1`)
      const html = await response.text()
      const canonical = html.match(/<link rel="canonical" href="([^"]+)/)?.[1]
      const robots = html.match(/<meta name="robots" content="([^"]+)/)?.[1]
      const headerRobots = response.headers.get("x-robots-tag") || ""
      const finalUrl = new URL(response.url)
      finalUrl.searchParams.delete("indexability-audit")
      for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
        try {
          const target = new URL(match[1].replaceAll("&amp;", "&"), url)
          target.hash = ""
          target.search = ""
          if (target.href !== new URL(url).href) incoming.get(target.href)?.add(url)
        } catch { /* Ignore non-HTTP link targets. */ }
      }
      if (response.status !== 200 || /noindex/i.test(`${robots || ""} ${headerRobots}`) || !canonical || new URL(canonical).href !== new URL(url).href || finalUrl.href !== new URL(url).href) {
        return { url, status: response.status, canonical, robots, headerRobots, finalUrl: finalUrl.href }
      }
    } catch (error) {
      return { url, error: error instanceof Error ? error.message : String(error) }
    }
    return null
  }))
  issues.push(...results.filter(Boolean))
}

if (issues.length > 0) {
  console.error(JSON.stringify(issues, null, 2))
  throw new Error(`Indexability audit failed for ${issues.length} of ${urls.length} sitemap URLs`)
}

console.log(`Indexability audit passed for ${urls.length} sitemap URLs on ${site}.`)
const orphans = [...incoming].filter(([, sources]) => sources.size === 0).map(([url]) => url)
console.log(`Pages with no inbound links from other sitemap pages: ${orphans.length}.`)
if (orphans.length) console.log(JSON.stringify(orphans, null, 2))
