import { writeFileSync } from "fs"

const rows = [
  "................",
  "...g........g...",
  "..g.gggggggg.g..",
  "..g.gGGGGGGg.g..",
  "..g.gGwwwwGg.g..",
  "..g.gGGGGGGg.g..",
  "...g.gggggg.g...",
  "....gggggggg....",
  "......gGGg......",
  "......gggg......",
  "......gggg......",
  ".....gggggg.....",
  "....gGGGGGGg....",
  "...gggggggggg...",
  "................",
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
        g: "#d4b45a",
        G: "#f3dc8a",
        w: "#fff3c4",
      },
      rows,
    },
    null,
    2,
  )}\n`,
)
console.log(rows.join("\n"))
