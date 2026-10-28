import type { SearchPriorityRecord } from "@/data/search-priority"

// Historical results and teamsheets; the engine's selected squads remain separate.
export const REVIEWED_CLUB_RECORDS: Record<string, SearchPriorityRecord> = {
  "/teams/chelsea/2004-05": {
    heading: "Chelsea 2004/05: season record and selection limits",
    summary: "José Mourinho’s first Chelsea season brought the Premier League and League Cup. The league figures below are team-season results; the goalkeeper’s clean sheets are listed separately.",
    columns: ["Competition / measure", "Historical result"],
    rows: [
      ["Premier League", "Champions — 95 points, one defeat"],
      ["League goals conceded", "15"],
      ["Team league clean sheets", "25"],
      ["Petr Čech’s league clean sheets", "24"],
      ["League Cup final", "Chelsea 3–2 Liverpool after extra time"],
      ["Champions League semi-final", "Lost 1–0 on aggregate to Liverpool (0–0 home, 0–1 away)"],
    ],
    note: "The simulator selects Bridge at left-back, but Gallas spent much of the actual title season there. Joe Cole and Guðjohnsen also played major attacking roles. The selected XI and playable bench are model choices, not an appearance ranking, an unchanged match XI or a complete registration list.",
    sources: [
      { label: "Premier League: 2004/05 title and defensive records", url: "https://www.premierleague.com/en/news/2737934" },
      { label: "Premier League: Čech’s 24 and Chelsea’s 25 clean sheets", url: "https://www.premierleague.com/es/news/59017" },
      { label: "Chelsea: 2005 League Cup final", url: "https://www.chelseafc.com/en/news/article/ending-the-wait---the-story-of-2004-05--the-first-of-many" },
      { label: "Chelsea: Gallas’s left-back role in the title season", url: "https://www.chelseafc.com/en/news/article/from-west-to-north-london--the-arsenal-and-chelsea-connections-" },
      { label: "UEFA: Liverpool–Chelsea semi-final result and lineup", url: "https://www.uefa.com/uefachampionsleague/match/80760/" },
    ],
    faqs: [
      { q: "What did Chelsea win in 2004/05?", a: "Chelsea won the Premier League with 95 points and the League Cup, beating Liverpool 3–2 after extra time in the cup final. Liverpool eliminated them 1–0 on aggregate in the Champions League semi-final." },
      { q: "Did Čech keep all 25 of Chelsea’s league clean sheets?", a: "No. Chelsea’s team total was 25, while Čech’s individual total was 24. Both figures refer to the 2004/05 Premier League season." },
      { q: "Why does this Chelsea 04/05 lineup use Bridge rather than Gallas?", a: "Bridge is the simulator’s selected left-back, not a claim that he was the season’s most-used option. Gallas spent much of the title-winning campaign at left-back and is in our playable squad. The fixed XI is a modelling choice; Mourinho’s actual selections changed." },
    ],
  },
  "/teams/barcelona/2008-09": {
    heading: "Barcelona 2008/09: treble and Rome final starting XI",
    summary: "Barcelona became the first Spanish club to win the league, domestic cup and European Cup treble. These are the 2009 Champions League final starters, shown separately from the simulator’s selected season XI.",
    columns: ["Record / unit", "Historical result / final starters"],
    rows: [
      ["La Liga", "Champions"],
      ["Copa del Rey final", "Barcelona 4–1 Athletic Club"],
      ["Champions League final", "Barcelona 2–0 Manchester United — Rome, 27 May 2009"],
      ["Final scorers", "Samuel Eto’o (10'), Lionel Messi (70')"],
      ["Goalkeeper", "Víctor Valdés"],
      ["Defence", "Carles Puyol, Yaya Touré, Gerard Piqué, Sylvinho"],
      ["Midfield", "Sergio Busquets, Xavi Hernández, Andrés Iniesta"],
      ["Attack", "Samuel Eto’o, Lionel Messi, Thierry Henry"],
      ["Coach / captain", "Pep Guardiola / Carles Puyol"],
    ],
    note: "Alves and Abidal were suspended for the final; Touré played at centre-back and Puyol at right-back. Our model instead selects Alves and Abidal in a season-based 4-3-3. Messi’s listed RW role is also a simplification: he already played as a false nine in the May 2009 Clásico. The treble was completed in 2008/09; the other three trophies of the 2009 sextuple came later in the calendar year.",
    sources: [
      { label: "UEFA: 2009 final report and first Spanish treble", url: "https://www.uefa.com/uefachampionsleague/news/01f3-0e78cf0b1cde-767a3469b6c3-1000/" },
      { label: "UEFA: Rome final official teamsheet", url: "https://www.uefa.com/newsfiles/UCL/2009/302813_LU.pdf" },
      { label: "UEFA: Rome final full-time report", url: "https://www.uefa.com/newsfiles/UCL/2009/302813_FR.pdf" },
      { label: "Barcelona: Messi’s false nine in May 2009", url: "https://www.fcbarcelona.com/en/news/4498371/six-clasicos-that-decided-leagues-for-fc-barcelona/amp" },
      { label: "Barcelona: six trophies across calendar year 2009", url: "https://www.fcbarcelona.com/en/news/1537648/ten-year" },
    ],
    faqs: [
      { q: "Who started for Barcelona in the 2009 Champions League final?", a: "Valdés; Puyol, Touré, Piqué, Sylvinho; Busquets, Xavi, Iniesta; Eto’o, Messi and Henry. Puyol captained Guardiola’s side. Eto’o and Messi scored in the 2–0 win over Manchester United. This is the final XI, not the simulator’s fixed season lineup." },
      { q: "Did Messi play as a false nine in 2008/09?", a: "Yes. Barcelona’s own account identifies Messi as a false nine in the 6–2 win at Real Madrid in May 2009. Listing him as RW in our model does not mean he stayed on the right throughout that season." },
      { q: "Did Barcelona win six trophies in the 2008/09 season?", a: "They won the league, Copa del Rey and Champions League treble in 2008/09. The Spanish Super Cup, UEFA Super Cup and Club World Cup followed later in calendar year 2009, completing the sextuple across the year." },
    ],
  },
}
