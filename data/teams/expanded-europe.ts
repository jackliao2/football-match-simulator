import { makeTeam, pl } from "@/data/build-team"
import type { HistoricalTeam } from "@/types"

function pack(input: Record<string, unknown>): HistoricalTeam {
  const clubName = String(input.clubName)
  const displaySeason = String(input.displaySeason)
  return makeTeam({
    seoTitle: `${clubName} ${displaySeason} Squad, Lineup, Formation & Ratings`,
    seoDescription: `${clubName} ${displaySeason} squad, starting XI and ratings. Simulate them in a football match simulator.`,
    ...(input as object),
  } as Parameters<typeof makeTeam>[0])
}

export const asRoma200001 = pack({
  clubId: "as-roma", clubName: "Roma", clubCode: "ROM", season: "2000-01", displaySeason: "2000/01", eraYear: 2000,
  formation: "3-5-2", manager: "Fabio Capello",
  attackRating: 90, midfieldRating: 86, defenseRating: 84, goalkeeperRating: 82, chemistryRating: 90,
  tempo: 74, pressing: 76, possession: 56, counterAttack: 80, width: 78, aerialThreat: 80,
  startingXI: ["gabriel-batistuta","vincenzo-montella","francesco-totti","vincent-candela","emerson","damiano-tommasi","cafu","walter-samuel","zago","jonathan-zebina","francesco-antonioli"],
  players: [
    pl("Francesco Antonioli", "ANTONIOLI", "GK", 80),
    pl("Jonathan Zebina", "ZEBINA", "CB", 76),
    pl("Zago", "ZAGO", "CB", 80),
    pl("Walter Samuel", "SAMUEL", "CB", 86, { defending: 88, physical: 90 }),
    pl("Cafu", "CAFU", "RWB", 90, { attack: 90, physical: 88 }),
    pl("Damiano Tommasi", "TOMMASI", "CM", 82),
    pl("Emerson", "EMERSON", "CM", 86, { passing: 86, physical: 88 }),
    pl("Vincent Candela", "CANDELA", "LWB", 82, { attack: 82 }),
    pl("Francesco Totti", "TOTTI", "CAM", 92, { chanceCreation: 94, passing: 90, finishing: 86, creativity: 92 }),
    pl("Vincenzo Montella", "MONTELLA", "ST", 84, { finishing: 88 }),
    pl("Gabriel Batistuta", "BATIGOL", "ST", 90, { finishing: 94, physical: 88 }),
    pl("Marco Delvecchio", "DELVECCHIO", "ST", 80),
    pl("Hidetoshi Nakata", "NAKATA", "CM", 80),
    pl("Cristiano Zanetti", "ZANETTI", "CM", 80),
    pl("Cristiano Lupatelli", "LUPATELLI", "GK", 74),
  ],
  achievements: ["Serie A champions"],
  styleTags: ["Star Forwards", "Wing-Backs", "Number 10", "Direct Attack", "Set Pieces"],
  summary: "Capello's Roma. Totti as the idea, Batistuta as the finish, Cafu as the overlap.",
})

export const lazio199900 = pack({
  clubId: "lazio", clubName: "Lazio", clubCode: "LAZ", season: "1999-00", displaySeason: "1999/00", eraYear: 1999,
  formation: "4-3-1-2", manager: "Sven-Göran Eriksson",
  attackRating: 88, midfieldRating: 88, defenseRating: 84, goalkeeperRating: 86, chemistryRating: 88,
  tempo: 76, pressing: 78, possession: 56, counterAttack: 82, width: 80, aerialThreat: 78,
  startingXI: ["marcelo-salas","simone-inzaghi","pavel-nedved","juan-sebastian-veron","diego-simeone","sergio-conceicao","giuseppe-favalli","sinisa-mihajlovic","alessandro-nesta","paolo-negro","angelo-peruzzi"],
  players: [
    pl("Angelo Peruzzi", "PERUZZI", "GK", 86),
    pl("Paolo Negro", "NEGRO", "RB", 80),
    pl("Alessandro Nesta", "NESTA", "CB", 90, { defending: 92, passing: 84 }),
    pl("Siniša Mihajlović", "MIHAJLOVIC", "CB", 86, { passing: 86, chanceCreation: 84 }),
    pl("Giuseppe Favalli", "FAVALLI", "LB", 80),
    pl("Diego Simeone", "SIMEONE", "CM", 86, { physical: 90, defending: 86 }),
    pl("Juan Sebastián Verón", "VERON", "CM", 90, { passing: 92, chanceCreation: 90 }),
    pl("Sérgio Conceição", "CONCEICAO", "RM", 84, { attack: 86 }),
    pl("Pavel Nedvěd", "NEDVED", "CAM", 90, { attack: 90, physical: 88, chanceCreation: 88 }),
    pl("Simone Inzaghi", "S.INZAGHI", "ST", 80, { finishing: 84 }),
    pl("Marcelo Salas", "SALAS", "ST", 88, { finishing: 90 }),
    pl("Roberto Mancini", "MANCINI", "ST", 82),
    pl("Dejan Stanković", "STANKOVIC", "CM", 82),
    pl("Fernando Couto", "COUTO", "CB", 80),
    pl("Luca Marchegiani", "MARCHEGIANI", "GK", 78),
  ],
  achievements: ["Serie A champions", "Coppa Italia winners"],
  styleTags: ["Star Midfield", "Set Pieces", "Two Strikers", "Chance Creation", "Athletic Midfield"],
  summary: "Eriksson's Lazio. Verón and Nedvěd as the supply, Nesta as the wall, Salas as the finish, and a last-day Scudetto.",
})

export const bayerLeverkusen202324 = pack({
  clubId: "bayer-leverkusen", clubName: "Bayer Leverkusen", clubCode: "B04", season: "2023-24", displaySeason: "2023/24", eraYear: 2023,
  formation: "3-4-2-1", manager: "Xabi Alonso",
  attackRating: 88, midfieldRating: 90, defenseRating: 86, goalkeeperRating: 84, chemistryRating: 94,
  tempo: 80, pressing: 84, possession: 62, counterAttack: 82, width: 84, aerialThreat: 72,
  startingXI: ["victor-boniface","florian-wirtz","jonas-hofmann","alejandro-grimaldo","granit-xhaka","exequiel-palacios","jeremie-frimpong","piero-hincapie","jonathan-tah","edmond-tapsoba","lukas-hradecky"],
  players: [
    pl("Lukáš Hrádecký", "HRADECKY", "GK", 84),
    pl("Edmond Tapsoba", "TAPSOBA", "CB", 84),
    pl("Jonathan Tah", "TAH", "CB", 84, { defending: 86 }),
    pl("Piero Hincapié", "HINCAPIE", "CB", 82),
    pl("Jeremie Frimpong", "FRIMPONG", "RWB", 86, { attack: 90 }),
    pl("Granit Xhaka", "XHAKA", "CM", 86, { passing: 88 }),
    pl("Exequiel Palacios", "PALACIOS", "CM", 84),
    pl("Alejandro Grimaldo", "GRIMALDO", "LWB", 86, { attack: 86, chanceCreation: 86 }),
    pl("Florian Wirtz", "WIRTZ", "CAM", 90, { chanceCreation: 92, creativity: 90 }),
    pl("Jonas Hofmann", "HOFMANN", "CAM", 82),
    pl("Victor Boniface", "BONIFACE", "ST", 86, { finishing: 86, physical: 88 }),
    pl("Patrik Schick", "SCHICK", "ST", 82),
    pl("Josip Stanišić", "STANISIC", "CB", 80),
    pl("Matej Kovar", "KOVAR", "GK", 76),
    pl("Amine Adli", "ADLI", "RW", 78),
  ],
  achievements: ["Bundesliga champions — unbeaten", "DFB-Pokal winners"],
  styleTags: ["Positional Play", "Wing-Backs", "High Press", "Chance Creation", "Control Possession"],
  summary: "Alonso's unbeaten Leverkusen. Wirtz as the brain, Grimaldo as the left blade, Xhaka as the metronome.",
})

export const borussiaMonchengladbach197475 = pack({
  clubId: "borussia-monchengladbach", clubName: "M'gladbach", clubCode: "BMG", season: "1974-75", displaySeason: "1974/75", eraYear: 1974,
  formation: "4-3-3", manager: "Hennes Weisweiler",
  attackRating: 88, midfieldRating: 86, defenseRating: 80, goalkeeperRating: 80, chemistryRating: 90,
  tempo: 82, pressing: 80, possession: 56, counterAttack: 84, width: 80, aerialThreat: 74,
  startingXI: ["henning-jensen","jupp-heynckes","allan-simonsen","rainer-bonhof","uli-stielike","herbert-wimmer","frank-schaffer","hans-klinkhammer","hans-jurgen-wittkamp","berti-vogts","wolfgang-kleff"],
  players: [
    pl("Wolfgang Kleff", "KLEFF", "GK", 80),
    pl("Berti Vogts", "VOGTS", "RB", 88, { defending: 88 }),
    pl("Hans-Jürgen Wittkamp", "WITTKAMP", "CB", 78),
    pl("Hans Klinkhammer", "KLINKHAMMER", "CB", 78),
    pl("Frank Schäffer", "SCHAFFER", "LB", 76),
    pl("Rainer Bonhof", "BONHOF", "CM", 86, { passing: 86, physical: 84 }),
    pl("Herbert Wimmer", "WIMMER", "CM", 84),
    pl("Uli Stielike", "STIELIKE", "CDM", 86, { defending: 86, passing: 84 }),
    pl("Allan Simonsen", "SIMONSEN", "RW", 88, { attack: 90, finishing: 84 }),
    pl("Jupp Heynckes", "HEYNCKES", "ST", 90, { finishing: 92, attack: 90 }),
    pl("Henning Jensen", "JENSEN", "LW", 84, { attack: 84 }),
    pl("Dietmar Danner", "DANNER", "CM", 80),
    pl("Carsten Nielsen", "NIELSEN", "CM", 76),
    pl("Wolfgang Kneib", "KNEIB", "GK", 74),
    pl("Horst Köppel", "KOPPEL", "ST", 78),
  ],
  achievements: ["Bundesliga champions", "UEFA Cup winners"],
  styleTags: ["High Tempo", "Star Forwards", "Vertical Attack", "Pressing", "Wide Play"],
  summary: "Weisweiler's Gladbach. Heynckes as the finish, Simonsen as the spark, Vogts as the captain.",
})
