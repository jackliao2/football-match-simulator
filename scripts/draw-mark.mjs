import { writeFileSync } from "fs"

function inShield(x, y) {
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

function onEdge(x, y) {
  if (!inShield(x, y)) return false
  return !inShield(x - 1, y) || !inShield(x + 1, y) || !inShield(x, y - 1) || !inShield(x, y + 1)
}

function inStar(x, y) {
  if (y === 3 && x === 8) return true
  if (y === 4 && x >= 7 && x <= 9) return true
  if (y === 5 && x >= 4 && x <= 11) return true
  if (y === 6 && x >= 5 && x <= 10) return true
  if (y === 7 && ((x >= 5 && x <= 6) || (x >= 9 && x <= 10))) return true
  if (y === 8 && ((x >= 4 && x <= 5) || (x >= 10 && x <= 11))) return true
  if (y === 9 && (x === 4 || x === 11)) return true
  return false
}

const rows = []
for (let y = 0; y < 16; y += 1) {
  let row = ""
  for (let x = 0; x < 16; x += 1) {
    if (!inShield(x, y)) row += "."
    else if (onEdge(x, y)) row += y <= 3 ? "G" : "g"
    else if (inStar(x, y)) row += y <= 5 ? "G" : "g"
    else row += y <= 4 ? "P" : "p"
  }
  rows.push(row)
}

writeFileSync(
  new URL("../data/brand-mark.json", import.meta.url),
  `${JSON.stringify(
    {
      size: 16,
      palette: {
        g: "#d4b45a",
        G: "#f3dc8a",
        p: "#102410",
        P: "#183418",
      },
      rows,
    },
    null,
    2,
  )}\n`,
)
console.log(rows.join("\n"))
