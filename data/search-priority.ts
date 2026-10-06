export type SearchPriorityRecord = {
  heading: string
  summary: string
  columns: string[]
  rows: string[][]
  note: string
  sources: Array<{ label: string; url: string }>
  faqs: Array<{ q: string; a: string }>
}

export const PRIORITY_REVIEW_DATE = "2026-10-06"
export const PRIORITY_REVIEW_LABEL = "6 October 2026"
const europeanHonours = {
  label: "UEFA: European Cup and Champions League honours",
  url: "https://www.uefa.com/uefachampionsleague/news/0275-1541637ad1db-88aeeefefefd-1000--all-time-european-cup-honours-board/",
}

// Historical records are separate from the selected players and ratings used by the engine.
export const SEARCH_PRIORITY_RECORDS: Record<string, SearchPriorityRecord> = {
  "/teams/chelsea/2004-05": {
    heading: "Chelsea 2004/05 season record",
    summary: "Chelsea won the Premier League under José Mourinho with 95 points and only 15 goals conceded. The season also brought the League Cup; the Champions League run ended in the semi-finals against Liverpool.",
    columns: ["Competition / measure", "Historical result"],
    rows: [
      ["Premier League", "Champions — 95 points"],
      ["League defeats", "1"],
      ["League goals conceded", "15"],
      ["Team league clean sheets", "25"],
      ["League Cup", "Winners"],
      ["Champions League", "Semi-finalists"],
    ],
    note: "Chelsea's 25 team clean sheets include matches kept by different goalkeepers; Petr Čech's individual league total was 24. The selected XI below is a season model, not a match-by-match appearance ranking or the club's complete registration list.",
    sources: [{ label: "Premier League: the 2004/05 title season", url: "https://www.premierleague.com/en/news/2737934" }, { label: "Premier League: club and goalkeeper records", url: "https://www.premierleague.com/en/stats/records" }],
    faqs: [
      { q: "What did Chelsea win in 2004/05?", a: "Chelsea won the Premier League with 95 points and the League Cup. They reached the Champions League semi-finals, where Liverpool eliminated them." },
      { q: "Is this Chelsea 04/05 lineup the same for every match?", a: "No. Mourinho rotated the team, and injuries changed the available players. The simulator uses a representative 4-3-3; Gallas, Joe Cole and Guðjohnsen are among the alternatives to its selected XI." },
    ],
  },
  "/national-teams/netherlands/1988": {
    heading: "Netherlands Euro 1988 final starting XI",
    summary: "The Netherlands won Euro 1988 by beating the Soviet Union 2–0 in Munich on 25 June. Gullit and Van Basten scored. These eleven players started the final under Rinus Michels.",
    columns: ["Unit", "Final starters"],
    rows: [
      ["Goalkeeper", "Hans van Breukelen"],
      ["Defence", "Berry van Aerle, Frank Rijkaard, Ronald Koeman, Adri van Tiggelen"],
      ["Midfield", "Gerald Vanenburg, Jan Wouters, Erwin Koeman, Arnold Mühren"],
      ["Attack", "Ruud Gullit (captain), Marco van Basten"],
    ],
    note: "This is the final XI, not the full tournament squad. Van Basten began the opening match on the bench and finished the tournament as top scorer with five goals. The simulator's formation below is a simplified tactical model.",
    sources: [{ label: "UEFA: 1988 final report and line-ups", url: "https://www.uefa.com/uefaeuro/history/news/0253-0d7b2f78ca99-40f24ef873fd-1000--van-basten-volley-crowns-netherlands-euro-1988-final-win-ag/" }, { label: "UEFA: Euro 1988 tournament guide", url: "https://www.uefa.com/uefaeuro/history/news/025b-0ed955722c3e-d9f74ab7998d-1000--euro-1988-all-you-need-to-know/" }],
    faqs: [
      { q: "Who started for the Netherlands in the Euro 1988 final?", a: "Van Breukelen; Van Aerle, Rijkaard, Ronald Koeman, Van Tiggelen; Vanenburg, Wouters, Erwin Koeman, Mühren; Gullit and Van Basten. Rinus Michels coached the team, and Gullit captained it." },
      { q: "Was Netherlands 1988 a World Cup-winning team?", a: "No. This team won the 1988 European Championship, beating the Soviet Union 2–0 in the final. It is a different tournament and squad from the Netherlands' 1974 World Cup finalists." },
    ],
  },
  "/national-teams/france/2018": {
    heading: "France 2018 World Cup: complete 23-player squad",
    summary: "Didier Deschamps selected these 23 players for Russia 2018. France won the final 4–2 against Croatia. Shirt numbers and tournament positions below follow FIFA's squad list.",
    columns: ["Shirt", "Player", "Position"],
    rows: [
      ["1", "Hugo Lloris", "Goalkeeper"], ["2", "Benjamin Pavard", "Defender"],
      ["3", "Presnel Kimpembe", "Defender"], ["4", "Raphaël Varane", "Defender"],
      ["5", "Samuel Umtiti", "Defender"], ["6", "Paul Pogba", "Midfielder"],
      ["7", "Antoine Griezmann", "Forward"], ["8", "Thomas Lemar", "Forward"],
      ["9", "Olivier Giroud", "Forward"], ["10", "Kylian Mbappé", "Forward"],
      ["11", "Ousmane Dembélé", "Forward"], ["12", "Corentin Tolisso", "Midfielder"],
      ["13", "N'Golo Kanté", "Midfielder"], ["14", "Blaise Matuidi", "Midfielder"],
      ["15", "Steven Nzonzi", "Midfielder"], ["16", "Steve Mandanda", "Goalkeeper"],
      ["17", "Adil Rami", "Defender"], ["18", "Nabil Fekir", "Forward"],
      ["19", "Djibril Sidibé", "Defender"], ["20", "Florian Thauvin", "Forward"],
      ["21", "Lucas Hernandez", "Defender"], ["22", "Benjamin Mendy", "Defender"],
      ["23", "Alphonse Areola", "Goalkeeper"],
    ],
    note: "Final starters: Lloris; Pavard, Varane, Umtiti, Hernandez; Kanté, Pogba; Mbappé, Griezmann, Matuidi; Giroud. The complete historical list above is separate from the smaller playable squad and our estimated ratings below.",
    sources: [{ label: "FIFA: Russia 2018 squad lists (PDF, archived copy)", url: "https://media-files.abidjan.net/document/docs/Liste-des-joueurs.pdf#page=11" }, { label: "FFF: France–Croatia final teamsheet", url: "https://www.fff.fr/selection/matchs/1266-france-croatie.html" }],
    faqs: [
      { q: "Who was in France's 2018 World Cup squad?", a: "France's 23-player squad comprised three goalkeepers, eight defenders, five midfielders and seven forwards in FIFA's registration categories. Lloris captained Deschamps' team, with Griezmann, Mbappé, Pogba and Kanté among its leading players. The complete numbered list is shown above." },
      { q: "Who started for France in the 2018 World Cup final?", a: "Lloris; Pavard, Varane, Umtiti, Hernandez; Kanté, Pogba; Mbappé, Griezmann, Matuidi; Giroud. France beat Croatia 4–2. Nzonzi, Tolisso and Fekir came on as substitutes." },
    ],
  },
  "/compare/ac-milan-vs-inter-milan": {
    heading: "AC Milan or Inter: what does better mean?",
    summary: "AC Milan lead on European Cup / Champions League wins, seven to Inter's three. For the selected seasons, Inter 2009/10 won a treble, while Milan 1988/89 won the European Cup. A club record and a single-season achievement answer different questions.",
    columns: ["Measure", "AC Milan", "Inter Milan"],
    rows: [
      ["European Cup / Champions League titles", "7", "3"],
      ["Selected peak season", "1988/89", "2009/10"],
      ["Selected season's league title", "No", "Yes"],
      ["Selected season's European Cup", "Yes", "Yes"],
      ["League, domestic cup and European Cup treble", "No in 1988/89", "Yes in 2009/10"],
    ],
    note: "European title totals checked on 6 October 2026. This is not a total of every trophy, a derby head-to-head record or a current-form prediction. The peak-team verdict is our assessment; the simulator tests only the two named squads.",
    sources: [europeanHonours, { label: "UEFA: Inter's 2010 treble", url: "https://www.uefa.com/uefachampionsleague/news/0250-0c50f4b42c3a-0fbc1831ccbe-1000--inter-join-exclusive-treble-club/" }],
    faqs: [
      { q: "Who has more Champions League titles, AC Milan or Inter?", a: "Counting the European Cup and Champions League together, AC Milan have seven titles and Inter have three, checked on 6 October 2026. This comparison does not count other international or domestic competitions." },
      { q: "Is AC Milan or Inter better right now?", a: "Current strength needs current results, available players and a named fixture. This page compares historical achievements and Milan 1988/89 with Inter 2009/10; those records alone cannot answer today's form question." },
    ],
  },
  "/compare/barcelona-vs-real-madrid": {
    heading: "Barcelona or Real Madrid: history versus peak team",
    summary: "Real Madrid lead the European Cup / Champions League record, 15 titles to Barcelona's five. Our single-season preference is Barcelona 2010/11; Madrid 2016/17 are the opposing peak. That preference is a tactical judgment, separate from the trophy count.",
    columns: ["Measure", "Barcelona", "Real Madrid"],
    rows: [
      ["European Cup / Champions League titles", "5", "15"],
      ["Selected peak season", "2010/11", "2016/17"],
      ["Selected season's league title", "Yes", "Yes"],
      ["Selected season's Champions League final", "3–1 vs Manchester United", "4–1 vs Juventus"],
      ["Selected midfield", "Xavi, Iniesta, Busquets", "Modrić, Kroos, Casemiro"],
    ],
    note: "European title totals checked on 6 October 2026, including the pre-1992 European Cup. This page compares historical records and selected seasons. For current form or the next Clásico, recent results and team news are needed.",
    sources: [europeanHonours],
    faqs: [
      { q: "Who has more Champions League titles, Barcelona or Real Madrid?", a: "Including the European Cup era, Real Madrid have 15 titles and Barcelona have five, checked on 6 October 2026. Our preference for Barcelona 2010/11 as a single-season peak does not change that historical record." },
      { q: "Is prime Barcelona better than prime Real Madrid?", a: "Our editorial pick is Barcelona 2010/11 for midfield control and Messi's false-nine role. Madrid 2016/17 offer elite finishing, midfield balance and squad depth. The hypothetical matchup lets you compare those two seasons under the same model." },
    ],
  },
  "/compare/manchester-united-vs-liverpool": {
    heading: "Manchester United or Liverpool: compare the honours",
    summary: "Both clubs have 20 English top-flight league titles. Liverpool lead European Cup / Champions League wins six to United's three. United's Ferguson-era league dominance is a different criterion from the all-time league total or European record.",
    columns: ["Measure", "Manchester United", "Liverpool"],
    rows: [
      ["English top-flight league titles", "20", "20"],
      ["European Cup / Champions League titles", "3", "6"],
      ["Selected peak season", "2007/08", "2018/19"],
      ["Selected season's league title", "Yes", "No — 97 points, runners-up"],
      ["Selected season's Champions League", "Winners", "Winners"],
    ],
    note: "Title totals checked on 6 October 2026. Top-flight league titles include the First Division and Premier League; European titles include both names of that competition. These are selected categories, not an overall major-trophy total or a current-form ranking.",
    sources: [{ label: "Manchester United: official trophy room", url: "https://www.manutd.com/en/club/history/trophy-room" }, { label: "Liverpool: official honours", url: "https://www.liverpoolfc.com/history/honours" }, { label: "Liverpool: 2018/19 league finish", url: "https://www.liverpoolfc.com/news/first-team/350091-liverpool-wolves-premier-league-match-report" }],
    faqs: [
      { q: "Do Manchester United or Liverpool have more league titles?", a: "Both have 20 English top-flight league titles, checked on 6 October 2026. This includes First Division and Premier League championships. Liverpool lead their European Cup / Champions League comparison six to three." },
      { q: "Which Manchester United and Liverpool teams are compared here?", a: "Manchester United 2007/08 and Liverpool 2018/19. Both won the Champions League; United also won the league, while Liverpool finished second with 97 points. Their matchup compares Ronaldo, Rooney and Tévez with Salah, Mané and Firmino." },
    ],
  },
}
