const site = (process.env.INDEXABILITY_SITE_URL || "https://legendarymatch.com").replace(/\/$/, "")
const concurrency = 20

const sitemapResponse = await fetch(`${site}/sitemap.xml?indexability-audit=1`)
if (!sitemapResponse.ok) throw new Error(`Could not read sitemap: ${sitemapResponse.status}`)

const sitemap = await sitemapResponse.text()
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
if (urls.length === 0) throw new Error("The sitemap contains no URLs")

const issues = []
for (let offset = 0; offset < urls.length; offset += concurrency) {
  const batch = urls.slice(offset, offset + concurrency)
  const results = await Promise.all(batch.map(async (url) => {
    try {
      const separator = url.includes("?") ? "&" : "?"
      const response = await fetch(`${url}${separator}indexability-audit=1`, { redirect: "follow" })
      const html = await response.text()
      const canonical = html.match(/<link rel="canonical" href="([^"]+)/)?.[1]
      const robots = html.match(/<meta name="robots" content="([^"]+)/)?.[1]
      if (response.status !== 200 || robots?.includes("noindex") || canonical !== url) {
        return { url, status: response.status, canonical, robots }
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
