export async function copyOrShare({
  url,
  title,
  text,
}: {
  url: string
  title: string
  text: string
}): Promise<"shared" | "copied" | "prompted"> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title, text, url })
      return "shared"
    } catch (error) {
      const name = error instanceof Error ? error.name : ""
      if (name === "AbortError") return "shared"
    }
  }

  try {
    await navigator.clipboard.writeText(url)
    return "copied"
  } catch {
    window.prompt("Copy this match URL", url)
    return "prompted"
  }
}

export function matchShareCopy(
  homeName: string,
  homeSeason: string,
  homeScore: number,
  awayName: string,
  awaySeason: string,
  awayScore: number,
) {
  const headline = `${homeName} ${homeSeason} ${homeScore}-${awayScore} ${awayName} ${awaySeason}`
  return {
    title: headline,
    text: `${headline} — would you have called it?`,
  }
}
