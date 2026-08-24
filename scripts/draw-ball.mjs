import { writeFileSync } from "fs"

const S = 32
const PALETTE = {
  ".": null,
  o: "#2f2818",
  g: "#d4b45a",
  G: "#f3dc8a",
  w: "#f3ead0",
  s: "#d4cbb0",
  d: "#14120e",
}

function inPoly(x, y, pts) {
  let n = 0
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const yi = pts[i][1]
    const yj = pts[j][1]
    const xi = pts[i][0]
    const xj = pts[j][0]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) n += 1
  }
  return n % 2 === 1
}

function pentagon(cx, cy, r, rot) {
  const pts = []
  for (let i = 0; i < 5; i += 1) {
    const a = rot + (i * 2 * Math.PI) / 5
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
  }
  return pts
}

const rows = Array.from({ length: S }, () => Array(S).fill("."))
const cx = 15.5
const cy = 15.5
const r = 14.2

for (let y = 0; y < S; y += 1) {
  for (let x = 0; x < S; x += 1) {
    const dx = x - cx
    const dy = y - cy
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d > r + 0.55) continue
    if (d > r - 0.55) {
      rows[y][x] = "o"
      continue
    }
    if (d > r - 1.7) {
      rows[y][x] = dy < -4 && dx < 0 ? "G" : "g"
      continue
    }
    rows[y][x] = dx + dy > 8 ? "s" : "w"
  }
}

const main = pentagon(15.5, 12.2, 5.1, -Math.PI / 2)
for (let y = 0; y < S; y += 1) {
  for (let x = 0; x < S; x += 1) {
    if (rows[y][x] === "." || rows[y][x] === "o") continue
    if (inPoly(x + 0.5, y + 0.5, main)) rows[y][x] = "d"
  }
}

const tips = [
  pentagon(7.5, 18.5, 2.4, 0.35),
  pentagon(23.5, 18.5, 2.4, -0.35),
]
for (const poly of tips) {
  for (let y = 0; y < S; y += 1) {
    for (let x = 0; x < S; x += 1) {
      if (rows[y][x] === "w" || rows[y][x] === "s") {
        if (inPoly(x + 0.5, y + 0.5, poly)) rows[y][x] = "d"
      }
    }
  }
}

const out = {
  size: S,
  palette: Object.fromEntries(Object.entries(PALETTE).filter(([k]) => k !== ".")),
  rows: rows.map((row) => row.join("")),
}

writeFileSync(new URL("../data/brand-mark.json", import.meta.url), `${JSON.stringify(out, null, 2)}\n`)
console.log(out.rows.join("\n"))
