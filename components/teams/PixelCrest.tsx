/**
 * Original 16×16 pixel shields. Colour-blocked silhouettes, not official crests.
 */

const SIZE = 16

function inShield(x: number, y: number): boolean {
  if (y <= 0) return x >= 5 && x <= 10
  if (y === 1) return x >= 4 && x <= 11
  if (y === 2) return x >= 3 && x <= 12
  if (y === 3) return x >= 2 && x <= 13
  if (y >= 4 && y <= 9) return x >= 1 && x <= 14
  if (y === 10) return x >= 2 && x <= 13
  if (y === 11) return x >= 3 && x <= 12
  if (y === 12) return x >= 4 && x <= 11
  if (y === 13) return x >= 5 && x <= 10
  if (y === 14) return x >= 6 && x <= 9
  if (y === 15) return x >= 7 && x <= 8
  return false
}

function onEdge(x: number, y: number): boolean {
  if (!inShield(x, y)) return false
  return (
    !inShield(x - 1, y) ||
    !inShield(x + 1, y) ||
    !inShield(x, y - 1) ||
    !inShield(x, y + 1)
  )
}

function fill(clubId: string, x: number, y: number): string {
  switch (clubId) {
    case "barcelona":
      if (y <= 3) return x < 8 ? "#6f1d3a" : "#08357a"
      return x % 2 === 0 ? "#004d98" : "#a50044"
    case "real-madrid":
      if (y <= 2 && (x === 5 || x === 8 || x === 11)) return "#e8c547"
      if (y === 3 && x >= 5 && x <= 11) return "#e8c547"
      return "#f4f1e6"
    case "manchester-united":
      if (y < 6 && Math.abs(x - 8) + y < 7) return "#f0c84a"
      return "#c8102e"
    case "arsenal":
      if (x <= 4) return "#f3f3f3"
      if (y >= 11 && x >= 7 && x <= 10) return "#c9a227"
      return "#db0007"
    case "liverpool":
      if (y === 7 || y === 8) return "#f0c84a"
      if (y <= 3 && Math.abs(x - 8) < 2) return "#f0c84a"
      return "#c8102e"
    case "ac-milan":
      return x < 8 ? "#d50000" : "#111111"
    case "inter-milan":
      return x % 2 === 0 ? "#001a70" : "#111111"
    case "bayern-munich":
      if (x >= 4 && x <= 11 && y >= 4 && y <= 10) {
        return (x + y) % 2 === 0 ? "#0066b2" : "#f4f4f4"
      }
      return "#dc052d"
    case "manchester-city":
      if ((x - 8) * (x - 8) + (y - 8) * (y - 8) <= 10) return "#1c2c5b"
      return "#6cabdd"
    case "brazil":
      if ((x - 8) * (x - 8) + (y - 8) * (y - 8) <= 3) return "#002776"
      if (Math.abs(x - 8) + Math.abs(y - 8) <= 5) return "#ffdf00"
      return "#009c3b"
    case "argentina":
      if (y >= 6 && y <= 9) return "#f7f7f7"
      if ((x - 8) * (x - 8) + (y - 8) * (y - 8) <= 3) return "#f6b40e"
      return "#74acdf"
    case "france":
      if (x <= 5) return "#002654"
      if (x >= 10) return "#ed2939"
      return "#f4f4f4"
    case "spain":
      if (y <= 5 || y >= 11) return "#c60b1e"
      return "#ffc400"
    case "germany":
      if (y <= 5) return "#111111"
      if (y <= 10) return "#dd0000"
      return "#ffcc00"
    case "italy":
      if (x <= 5) return "#009246"
      if (x >= 10) return "#ce2b37"
      return "#f4f4f4"
    case "netherlands":
      if (Math.abs(x - 8) < y - 2 && y < 9) return "#111111"
      return "#ff6c00"
    default:
      return "#5c8a48"
  }
}

function outline(clubId: string): string {
  if (clubId === "ac-milan" || clubId === "inter-milan") return "#d4b45a"
  if (clubId === "real-madrid") return "#c9a227"
  return "#d4b45a"
}

function buildPixels(clubId: string): string[] {
  const pixels: string[] = []
  const edge = outline(clubId)
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!inShield(x, y)) {
        pixels.push("transparent")
        continue
      }
      pixels.push(onEdge(x, y) ? edge : fill(clubId, x, y))
    }
  }
  return pixels
}

const cache = new Map<string, string[]>()

function pixelsFor(clubId: string): string[] {
  const hit = cache.get(clubId)
  if (hit) return hit
  const built = buildPixels(clubId)
  cache.set(clubId, built)
  return built
}

export function PixelCrest({
  clubId,
  size = 48,
  className = "",
}: {
  clubId: string
  size?: number
  className?: string
}) {
  const pixels = pixelsFor(clubId)
  return (
    <div
      aria-hidden
      className={`shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        display: "grid",
        gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
        imageRendering: "pixelated",
        filter: "drop-shadow(2px 2px 0 #000)",
      }}
    >
      {pixels.map((color, index) => (
        <span key={index} style={{ backgroundColor: color }} />
      ))}
    </div>
  )
}
