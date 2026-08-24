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
    case "chelsea":
      if (y >= 6 && y <= 9 && x >= 5 && x <= 10) return "#d4b45a"
      return "#034694"
    case "juventus":
      return x % 2 === 0 ? "#111111" : "#f4f4f4"
    case "ajax":
      if (x >= 6 && x <= 9) return "#d50032"
      return "#f4f4f4"
    case "borussia-dortmund":
      if (y >= 6 && y <= 9) return "#111111"
      return "#fde100"
    case "porto":
      if (x >= 6 && x <= 9) return "#f4f4f4"
      return "#003087"
    case "atletico-madrid":
      return x % 2 === 0 ? "#ce102d" : "#f4f4f4"
    case "tottenham":
      if (y <= 4 && Math.abs(x - 8) < 2) return "#132257"
      return "#f4f4f4"
    case "paris-saint-germain":
      if (x >= 6 && x <= 9) return "#ce102d"
      return "#002654"
    case "napoli":
      if ((x - 8) * (x - 8) + (y - 8) * (y - 8) <= 6) return "#f4f4f4"
      return "#12a0c6"
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
    case "england":
      if (x === 7 || x === 8 || y === 7 || y === 8) return "#c8102e"
      return "#f4f4f4"
    case "portugal":
      if (x <= 5) return "#006600"
      if ((x - 8) * (x - 8) + (y - 8) * (y - 8) <= 6) return "#e8c547"
      return "#ed1c24"
    case "croatia":
      return (x + y) % 2 === 0 ? "#c8102e" : "#f4f4f4"
    case "uruguay":
      if (y <= 3 && x <= 5) return "#e8c547"
      return y % 2 === 0 ? "#7baad6" : "#f4f4f4"
    case "belgium":
      if (x <= 5) return "#111111"
      if (x >= 10) return "#c8102e"
      return "#f6d32d"
    case "hungary":
      if (y <= 5) return "#c8102e"
      if (y <= 10) return "#f4f4f4"
      return "#00843d"
    case "colombia":
      if (y <= 6) return "#fcd116"
      if (y <= 10) return "#003893"
      return "#ce1126"
    case "denmark":
      if (x === 6 || x === 7 || y === 7 || y === 8) return "#f4f4f4"
      return "#c60c30"
    case "everton":
      return "#003399"
    case "leeds-united":
      if (y === 7 || y === 8) return "#1d1d1d"
      return "#f4f4f4"
    case "nottingham-forest":
      return "#dd0000"
    case "newcastle":
      return x % 2 === 0 ? "#111111" : "#f4f4f4"
    case "aston-villa":
      return x < 8 ? "#670e36" : "#95bfe5"
    case "sevilla":
      if (y <= 5) return "#f4f4f4"
      return "#d21034"
    case "valencia":
      if (x < 8) return "#ee3524"
      return "#000000"
    case "athletic-bilbao":
      return x % 2 === 0 ? "#ee2524" : "#f4f4f4"
    case "as-roma":
      if (y <= 4) return "#f0c14b"
      return y % 2 === 0 ? "#8e1f2f" : "#f4b441"
    case "lazio":
      return "#87d8f7"
    case "bayer-leverkusen":
      if (x < 8) return "#e32219"
      return "#111111"
    case "borussia-monchengladbach":
      if (y >= 6 && y <= 9) return "#111111"
      return "#00a651"
    case "marseille":
      if (y <= 4) return "#2faeea"
      return "#f4f4f4"
    case "lyon":
      if (x < 6) return "#003da5"
      if (x >= 10) return "#c8102e"
      return "#f4f4f4"
    case "monaco":
      if (y < x - 2) return "#c8102e"
      return "#f4f4f4"
    case "benfica":
      return "#e03c31"
    case "sporting":
      if (x < 8) return "#008656"
      return "#f4f4f4"
    case "psv":
      return x % 2 === 0 ? "#e03c31" : "#f4f4f4"
    case "feyenoord":
      if (y <= 5) return "#e03c31"
      if (y <= 10) return "#f4f4f4"
      return "#111111"
    case "celtic":
      if ((x + y) % 2 === 0) return "#018749"
      return "#f4f4f4"
    case "rangers":
      return "#1b4596"
    case "red-star":
      return x % 2 === 0 ? "#d50032" : "#f4f4f4"
    case "steaua":
      return "#0033a0"
    case "galatasaray":
      return x < 8 ? "#f6b40e" : "#d50032"
    case "flamengo":
      return y % 2 === 0 ? "#c8102e" : "#111111"
    case "santos":
      if (y <= 5) return "#f4f4f4"
      return "#111111"
    case "boca-juniors":
      if (y >= 6 && y <= 9) return "#f0c14b"
      return "#003da5"
    case "river-plate":
      if (Math.abs((x - 8) - (8 - y)) <= 1) return "#e03c31"
      return "#f4f4f4"
    case "sweden":
      if (x === 6 || x === 7 || y === 7 || y === 8) return "#fecc00"
      return "#006aa7"
    case "greece":
      return y % 2 === 0 ? "#0d5eaf" : "#f4f4f4"
    case "turkey":
      return "#e30a17"
    case "czechia":
      if (x + y < 10 && x < 7) return "#11457e"
      return y < 8 ? "#f4f4f4" : "#d7141a"
    case "wales":
      return y < 8 ? "#c8102e" : "#00ab39"
    case "chile":
      if (y < 8) return x <= 6 ? "#0039a6" : "#f4f4f4"
      return "#d52b1e"
    case "mexico":
      if (x <= 5) return "#006847"
      if (x >= 10) return "#ce1126"
      return "#f4f4f4"
    case "usa":
      if (x <= 6 && y <= 6) return "#002868"
      return y % 2 === 0 ? "#bf0a30" : "#f4f4f4"
    case "morocco":
      return "#c1272d"
    case "senegal":
      if (x <= 5) return "#00853f"
      if (x >= 10) return "#e31b23"
      return "#fdef42"
    case "nigeria":
      if (x <= 5 || x >= 10) return "#008751"
      return "#f4f4f4"
    case "cameroon":
      if (x <= 5) return "#007a5e"
      if (x >= 10) return "#ce1126"
      return "#fcd116"
    case "japan":
      if ((x - 8) * (x - 8) + (y - 8) * (y - 8) <= 10) return "#bc002d"
      return "#f4f4f4"
    case "south-korea":
      if ((x - 8) * (x - 8) + (y - 8) * (y - 8) <= 10) return y < 8 ? "#cd2e3a" : "#0047a0"
      return "#f4f4f4"
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
