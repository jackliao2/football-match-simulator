/**
 * Original 12×8 pixel flags. Geometric colour blocks, not official artwork.
 */

const W = 12
const H = 8

type Paint = (x: number, y: number) => string

const C = {
  white: "#f4f4f4",
  black: "#141414",
  red: "#c8102e",
  red2: "#e32219",
  blue: "#002f6c",
  blue2: "#0033a0",
  light: "#74acdf",
  green: "#009246",
  green2: "#007a3d",
  gold: "#f6d32d",
  gold2: "#d4b45a",
  orange: "#ff6c00",
  orange2: "#ff7900",
  sky: "#75aadb",
}

function hBands(colors: string[]): Paint {
  return (_x, y) => colors[Math.min(colors.length - 1, Math.floor((y / H) * colors.length))]!
}

function vBands(colors: string[]): Paint {
  return (x) => colors[Math.min(colors.length - 1, Math.floor((x / W) * colors.length))]!
}

function nordic(bg: string, cross: string, inner?: string): Paint {
  return (x, y) => {
    const onV = x === 4 || x === 5
    const onH = y === 3 || y === 4
    if (inner) {
      if (x === 4 || x === 5 || y === 3 || y === 4) return inner
      if (x === 3 || x === 6 || y === 2 || y === 5) {
        if (onV || onH || x === 3 || x === 6 || y === 2 || y === 5) {
          if ((x >= 3 && x <= 6 && (y === 2 || y === 5)) || (y >= 2 && y <= 5 && (x === 3 || x === 6))) {
            return cross
          }
        }
      }
    }
    if (onV || onH) return inner ?? cross
    return bg
  }
}

function saltire(field: string, cross: string): Paint {
  return (x, y) => {
    const d1 = Math.abs(y - (x * 7) / 11)
    const d2 = Math.abs(y - (7 - (x * 7) / 11))
    return d1 < 1.15 || d2 < 1.15 ? cross : field
  }
}

function circle(x: number, y: number, cx: number, cy: number, r2: number): boolean {
  const dx = x - cx
  const dy = y - cy
  return dx * dx + dy * dy <= r2
}

const PAINT: Record<string, Paint> = {
  EN: (x, y) => (x === 5 || x === 6 || y === 3 || y === 4 ? C.red : C.white),
  SC: saltire("#005eb8", C.white),
  WA: (x, y) => {
    if (circle(x, y, 6, 4, 4) && x >= 4 && x <= 8) return C.red
    return y < 4 ? C.green2 : C.white
  },
  IE: vBands([C.green, C.white, C.orange2]),
  NI: (x, y) => (x === 5 || x === 6 || y === 3 || y === 4 ? C.red : C.white),
  FR: vBands(["#002654", C.white, "#ed2939"]),
  ES: (x, y) => {
    if (y <= 1 || y >= 6) return "#c60b1e"
    if (x >= 4 && x <= 6 && y >= 3 && y <= 4) return C.gold2
    return "#ffc400"
  },
  DE: hBands([C.black, C.red, C.gold]),
  IT: vBands(["#009246", C.white, "#ce2b37"]),
  NL: hBands(["#ae1c28", C.white, "#21468b"]),
  BE: vBands([C.black, C.gold, C.red]),
  PT: (x, y) => {
    if (x <= 4) return "#006600"
    if (circle(x, y, 4, 4, 3)) return C.gold
    return C.red
  },
  PL: hBands([C.white, C.red]),
  AT: hBands([C.red, C.white, C.red]),
  CH: (x, y) => {
    if ((y === 3 || y === 4) && x >= 3 && x <= 8) return C.white
    if ((x === 5 || x === 6) && y >= 1 && y <= 6) return C.white
    return C.red
  },
  CZ: (x, y) => {
    if (x + y < 7 && x < 6) return "#11457e"
    return y < 4 ? C.white : C.red
  },
  SK: hBands([C.white, "#0b4ea2", C.red]),
  SI: hBands([C.white, "#0057b7", C.red]),
  HR: (x, y) => {
    if (y <= 2) return C.red
    if (y >= 5) return "#171796"
    return (x + y) % 2 === 0 ? C.red : C.white
  },
  RS: hBands([C.red, "#0c4076", C.white]),
  BA: (x, y) => {
    if (x > y + 2 && x < y + 7) return C.gold
    return "#002395"
  },
  MK: (x, y) => {
    if (circle(x, y, 6, 4, 4)) return C.gold
    if (x === 6 || y === 4 || x === y || x === 11 - y) return C.gold
    return C.red
  },
  AL: (x, y) => (circle(x, y, 6, 4, 5) && (x + y) % 2 === 0 ? C.black : C.red),
  GR: (x, y) => {
    if (x <= 4 && y <= 4) return x === 2 || y === 2 ? C.white : "#0d5eaf"
    return y % 2 === 0 ? "#0d5eaf" : C.white
  },
  TR: (x, y) => {
    if (circle(x, y, 5, 4, 6) && !circle(x, y, 6, 4, 3)) return C.white
    if (x === 8 && y >= 3 && y <= 5) return C.white
    return C.red
  },
  RO: vBands(["#002b7f", C.gold, "#ce1126"]),
  HU: hBands([C.red, C.white, C.green]),
  BG: hBands([C.white, C.green, C.red]),
  UA: hBands(["#005bbb", C.gold]),
  BY: hBands([C.red, C.red, C.green2]),
  GE: (x, y) => {
    if (x === 5 || x === 6 || y === 3 || y === 4) return C.red
    if ((x === 2 || x === 9) && (y === 1 || y === 6)) return C.red
    return C.white
  },
  AM: hBands([C.red, "#001489", C.orange]),
  RU: hBands([C.white, "#0039a6", C.red]),
  SE: nordic("#006aa7", C.gold),
  NO: nordic(C.red, C.white, "#00205b"),
  DK: nordic(C.red, C.white),
  FI: nordic(C.white, "#003580"),
  IS: nordic("#02529c", C.white, C.red),
  BR: (x, y) => {
    if (circle(x, y, 6, 4, 2)) return "#002776"
    if (Math.abs(x - 6) + Math.abs(y - 4) * 1.6 < 5.2) return C.gold
    return "#009c3b"
  },
  AR: (x, y) => {
    if (y >= 3 && y <= 4) {
      if (circle(x, y, 6, 3.5, 2)) return "#f6b40e"
      return C.white
    }
    return C.light
  },
  UY: (x, y) => {
    if (x <= 4 && y <= 3) return y === 1 && x >= 1 && x <= 3 ? C.gold : "#7ba3d0" 
    return y % 2 === 0 ? C.white : "#7ba3d0"
  },
  CO: (x, y) => {
    if (y <= 3) return C.gold
    if (y <= 5) return "#003893"
    return C.red
  },
  CL: (x, y) => {
    if (y < 4) return x <= 4 ? "#0039a6" : C.white
    return C.red
  },
  MX: (x, y) => {
    if (x <= 3) return C.green
    if (x >= 8) return C.red
    if (circle(x, y, 6, 4, 2)) return C.gold2
    return C.white
  },
  PE: vBands([C.red, C.white, C.red]),
  VE: hBands([C.gold, "#0033a0", C.red]),
  PY: hBands([C.red, C.white, "#0038a8"]),
  EC: (x, y) => {
    if (y <= 3) return C.gold
    if (y <= 5) return "#034ea2"
    return C.red
  },
  BO: hBands([C.red, C.gold, C.green]),
  US: (x, y) => {
    if (x <= 5 && y <= 3) return "#002868"
    return y % 2 === 0 ? C.red : C.white
  },
  CA: (x, y) => {
    if (x <= 2 || x >= 9) return C.red
    if (circle(x, y, 6, 4, 4) && (x === 6 || y === 3)) return C.red
    return C.white
  },
  CR: hBands(["#002b7f", C.white, C.red, C.red, C.white, "#002b7f"]),
  JM: (x, y) => {
    if (Math.abs(x - 6) <= 1 || Math.abs(y - 4) <= 0) return C.gold
    if (x + y < 7 || x + (7 - y) > 16) return "#009b3a"
    return C.black
  },
  TT: (x, y) => {
    const d = x - y
    if (d >= 2 && d <= 4) return C.black
    if (d >= 1 && d <= 5) return C.white
    return C.red
  },
  AU: (x, y) => {
    if (x <= 5 && y <= 3) return x === 2 || y === 1 ? C.red : C.blue
    if ((x === 9 && y === 5) || (x === 7 && y === 2) || (x === 10 && y === 3)) return C.white
    return "#00008b"
  },
  NZ: (x, y) => {
    if (x <= 5 && y <= 3) return x === 2 || y === 1 ? C.red : C.blue
    if ((x === 8 && y === 5) || (x === 10 && y === 3)) return C.red
    return "#00247d"
  },
  JP: (x, y) => (circle(x, y, 6, 4, 6) ? C.red : C.white),
  KR: (x, y) => {
    if (circle(x, y, 6, 4, 6)) return y < 4 ? C.red : "#003478"
    return C.white
  },
  CN: (x, y) => {
    if ((x === 2 && y === 1) || (x === 4 && y === 2) || (x === 4 && y === 0)) return C.gold
    return "#de2910"
  },
  SA: (_x, y) => (y === 4 ? C.white : "#006c35"),
  IR: hBands([C.green, C.white, C.red]),
  EG: hBands([C.red, C.white, C.black]),
  MA: (x, y) => {
    if (circle(x, y, 6, 4, 4) && !circle(x, y, 6, 4, 1)) return C.green
    return C.red
  },
  DZ: (x, y) => {
    if (x < 6) return "#006233"
    if (circle(x, y, 6, 4, 4) && !circle(x, y, 7, 4, 2)) return C.red
    return C.white
  },
  TN: (x, y) => {
    if (circle(x, y, 6, 4, 6)) return C.white
    if (circle(x, y, 6, 4, 2)) return C.red
    return C.red
  },
  NG: vBands([C.green2, C.white, C.green2]),
  GH: (x, y) => {
    if (y <= 2) return C.red
    if (y >= 5) return C.green
    if (x === 6 && y >= 3 && y <= 4) return C.black
    return C.gold
  },
  CI: vBands([C.orange, C.white, C.green]),
  CM: (x, y) => {
    if (x <= 3) return C.green
    if (x >= 8) return C.gold
    if (x === 6 && y === 3) return C.gold
    return C.red
  },
  SN: (x, y) => {
    if (x <= 3) return C.green
    if (x >= 8) return C.red
    if (x === 6 && y === 3) return C.green
    return C.gold
  },
  ML: vBands([C.green, C.gold, C.red]),
  GN: vBands([C.red, C.gold, C.green]),
  GA: hBands([C.green, C.gold, "#00209f"]),
  TG: (x, y) => {
    if (x <= 4 && y <= 3) return C.red
    return y % 2 === 0 ? C.green : C.gold
  },
  PE2: vBands([C.red, C.white, C.red]),
  SN2: vBands([C.green, C.gold, C.red]),
  ZA: (x, y) => {
    if (x + Math.abs(y - 4) < 5) return C.green
    if (y < 3) return C.red
    if (y > 4) return "#001489"
    return C.gold
  },
  KE: hBands([C.black, C.red, C.green]),
  AO: hBands([C.red, C.black]),
  CD: (x, y) => (x === y || x === y + 1 ? C.red : "#007fff"),
  GW: (x, y) => {
    if (x <= 4) return C.red
    return y < 4 ? C.gold : C.green
  },
  CV: (x, y) => (y === 4 || y === 5 ? C.red : "#003893"),
  MR: (_x, y) => (y === 1 || y === 6 ? C.red : C.green2),
  IL: (x, y) => {
    if (y <= 1 || y >= 6) return "#0038b8"
    if (x >= 4 && x <= 7 && y >= 3 && y <= 4) return "#0038b8"
    return C.white
  },
  LB: hBands([C.red, C.white, C.red]),
  QA: (x, y) => (x <= 3 ? C.white : "#8a1538"),
  AE: (x, y) => {
    if (x <= 3) return C.red
    if (y <= 2) return C.green
    if (y >= 5) return C.black
    return C.white
  },
  KW: (x, y) => {
    if (x <= 3) return C.black
    if (y <= 2) return C.green
    if (y >= 5) return C.red
    return C.white
  },
  IN: (x, y) => {
    if (y <= 2) return "#ff9933"
    if (y >= 5) return "#138808"
    if (circle(x, y, 6, 4, 2)) return "#000080"
    return C.white
  },
  PK: (x, y) => {
    if (x <= 3) return C.white
    if (circle(x, y, 7, 4, 4) && !circle(x, y, 8, 4, 2)) return C.white
    return "#01411c"
  },
  BD: (x, y) => (circle(x, y, 5, 4, 6) ? C.red : "#006a4e"),
  VN: (x, y) => (x === 6 && y >= 2 && y <= 5 || y === 3 && x >= 4 && x <= 8 ? C.gold : "#da251d"),
  TH: hBands([C.red, C.white, "#00247d", "#00247d", C.white, C.red]),
  ID: hBands([C.red, C.white]),
  MY: (x, y) => {
    if (x <= 5 && y <= 3) return "#010066"
    return y % 2 === 0 ? C.red : C.white
  },
  PH: (x, y) => {
    if (x + Math.abs(y - 4) < 5) return C.gold
    return y < 4 ? "#0038a8" : C.red
  },
  SG: (x, y) => (y < 4 ? C.red : C.white),
  HK: (_x, _y) => C.red,
  TW: (x, y) => {
    if (x <= 5 && y <= 3) return "#000095"
    return C.red
  },
  KP: hBands(["#024fa2", C.white, C.red, C.red, C.white, "#024fa2"]),
  MN: vBands([C.red, "#0066b3", C.red]),
  KZ: (_x, y) => (y === 0 || y === 7 ? C.gold : "#00afca"),
  UZ: hBands(["#1eb53a", C.white, "#0099b5"]),
  AZ: hBands(["#00b5e2", C.red, "#3f9c35"]),
  EE: hBands(["#0072ce", C.black, C.white]),
  LV: hBands(["#9e3039", C.white, "#9e3039"]),
  LT: hBands([C.gold, C.green, C.red]),
  LU: hBands([C.red, C.white, C.sky]),
  MT: vBands([C.white, C.red]),
  CY: (_x, y) => (y === 6 ? C.green : C.white),
  MD: vBands(["#003da5", C.gold, C.red]),
  ME: (_x, _y) => C.red,
  XK: (_x, y) => (y >= 5 ? C.gold : "#244aa5"),
  MC: hBands([C.red, C.white]),
  AD: vBands(["#0018a8", C.gold, C.red]),
  SM: hBands([C.white, C.sky]),
  LI: hBands(["#002b7f", C.red]),
  VA: vBands([C.gold, C.white]),
  GI: hBands([C.white, C.red]),
  FO: nordic(C.white, "#0065bd", C.red),
  GL: (x, y) => {
    if (circle(x, y, 5, 4, 6)) return y < 4 ? C.red : C.white
    return y < 4 ? C.white : C.red
  },
  AX: nordic("#0064a8", C.gold, C.red),
  GB: (x, y) => {
    if (x === 5 || x === 6 || y === 3 || y === 4) return C.red
    if (Math.abs(y - (x * 7) / 11) < 1.2 || Math.abs(y - (7 - (x * 7) / 11)) < 1.2) return C.white
    return "#012169"
  },
  XX: (x, y) => (x === 0 || y === 0 || x === 11 || y === 7 ? C.gold2 : "#243024"),
}

export const NATION_NAMES: Record<string, string> = {
  EN: "England",
  SC: "Scotland",
  WA: "Wales",
  IE: "Ireland",
  NI: "Northern Ireland",
  FR: "France",
  ES: "Spain",
  DE: "Germany",
  IT: "Italy",
  NL: "Netherlands",
  BE: "Belgium",
  PT: "Portugal",
  PL: "Poland",
  AT: "Austria",
  CH: "Switzerland",
  CZ: "Czechia",
  SK: "Slovakia",
  SI: "Slovenia",
  HR: "Croatia",
  RS: "Serbia",
  BA: "Bosnia",
  MK: "North Macedonia",
  AL: "Albania",
  GR: "Greece",
  TR: "Turkey",
  RO: "Romania",
  HU: "Hungary",
  BG: "Bulgaria",
  UA: "Ukraine",
  BY: "Belarus",
  GE: "Georgia",
  AM: "Armenia",
  RU: "Russia",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  IS: "Iceland",
  BR: "Brazil",
  AR: "Argentina",
  UY: "Uruguay",
  CO: "Colombia",
  CL: "Chile",
  MX: "Mexico",
  PE: "Peru",
  VE: "Venezuela",
  PY: "Paraguay",
  EC: "Ecuador",
  BO: "Bolivia",
  US: "United States",
  CA: "Canada",
  CR: "Costa Rica",
  JM: "Jamaica",
  TT: "Trinidad and Tobago",
  AU: "Australia",
  NZ: "New Zealand",
  JP: "Japan",
  KR: "South Korea",
  CN: "China",
  SA: "Saudi Arabia",
  IR: "Iran",
  EG: "Egypt",
  MA: "Morocco",
  DZ: "Algeria",
  TN: "Tunisia",
  NG: "Nigeria",
  GH: "Ghana",
  CI: "Ivory Coast",
  CM: "Cameroon",
  SN: "Senegal",
  ML: "Mali",
  GN: "Guinea",
  GA: "Gabon",
  TG: "Togo",
  ZA: "South Africa",
  KE: "Kenya",
  IL: "Israel",
  LB: "Lebanon",
  IN: "India",
  PK: "Pakistan",
  BD: "Bangladesh",
  VN: "Vietnam",
  TH: "Thailand",
  ID: "Indonesia",
  MY: "Malaysia",
  PH: "Philippines",
  SG: "Singapore",
  GB: "United Kingdom",
  XX: "Unknown",
}

const cache = new Map<string, string[]>()

function pixelsFor(code: string): string[] {
  const key = code.length === 2 ? code : "XX"
  const hit = cache.get(key)
  if (hit) return hit
  const paint = PAINT[key] ?? PAINT.XX
  const pixels: string[] = []
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      pixels.push(paint(x, y))
    }
  }
  cache.set(key, pixels)
  return pixels
}

export function PixelFlag({
  code,
  size = 16,
  className = "",
}: {
  code?: string
  size?: number
  className?: string
}) {
  const raw = code === "SCT" ? "SC" : code === "WAL" ? "WA" : code === "ENG" ? "EN" : code
  const iso = raw && PAINT[raw] ? raw : "XX"
  const pixels = pixelsFor(iso)
  const height = Math.round((size * H) / W)
  const label = NATION_NAMES[iso] ?? iso
  return (
    <span
      title={label}
      aria-label={label}
      className={`inline-grid shrink-0 ${className}`}
      style={{
        width: size,
        height,
        gridTemplateColumns: `repeat(${W}, 1fr)`,
        imageRendering: "pixelated",
        boxShadow: "1px 1px 0 #000",
      }}
    >
      {pixels.map((color, index) => (
        <span key={index} style={{ backgroundColor: color }} />
      ))}
    </span>
  )
}
