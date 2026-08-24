import { writeFileSync } from "fs"

const rows = [
  "................",
  "....ggGGGGgg....",
  "...Gw......Gg...",
  "..gG........Gg..",
  ".gG...gg......Gg",
  ".Gg...gG......gG",
  "gG....gG.......G",
  "gG....gG.......G",
  "gG....gG.......G",
  "gG....gG.ggg...G",
  ".Gg...gGGGGg..gG",
  ".gG............G",
  "..gG........Gg..",
  "...gG......Gg...",
  "....ggGGGGgg....",
  "................",
]

for (const row of rows) {
  if (row.length !== 16) throw new Error(`${row} ${row.length}`)
}

writeFileSync(
  new URL("../data/brand-mark.json", import.meta.url),
  `${JSON.stringify(
    {
      size: 16,
      palette: {
        g: "#b8923e",
        G: "#e4c45e",
        w: "#fff3c4",
      },
      rows,
    },
    null,
    2,
  )}\n`,
)
console.log(rows.join("\n"))
