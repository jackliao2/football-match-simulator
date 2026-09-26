export type LandingEvidence = {
  heading: string
  scope: string
  facts: Array<{ label: string; text: string }>
  sources: Array<{ label: string; url: string }>
}

const champions = (year: number) => ({ label: `UEFA: ${year} European Cup / Champions League`, url: `https://www.uefa.com/uefachampionsleague/history/seasons/${year}/` })

// Only these revised pages receive a new modification date.
export const LANDING_REVIEW_DATE = "2026-09-26"
export const LANDING_REVIEW_LABEL = "26 September 2026"

export const SEARCH_LANDING_EVIDENCE: Record<string, LandingEvidence> = {
  "/teams/chelsea/2004-05": {
    heading: "Chelsea 2004/05: squad and season facts",
    scope: "The lineup below is our representative season XI. It is not an official teamsheet for every match or a complete registration list. Player ratings are our simulation estimates.",
    facts: [
      { label: "Premier League record", text: "Champions with 95 points, 15 goals conceded and 25 clean sheets. These are league-season figures, separate from the simulated results below." },
      { label: "How the 4-3-3 works", text: "Makélélé protects the centre-backs; Lampard attacks from midfield. Duff and Robben provide width around Drogba. Tiago connects the midfield, while Joe Cole and Guðjohnsen offer different attacking options." },
      { label: "Selection matters", text: "Bridge is the model's left-back; Gallas is another option in the squad. A season contains rotation and injuries, so this XI should not be read as an appearance ranking." },
    ],
    sources: [{ label: "Premier League: Chelsea's title-winning records", url: "https://www.premierleague.com/en/news/2737934" }],
  },
  "/national-teams/netherlands/1988": {
    heading: "Netherlands 1988: European champions",
    scope: "This is the Euro 1988 team, not a World Cup squad. The player list and formation below describe the simulator's selected squad; ratings are model estimates, not official tournament statistics.",
    facts: [
      { label: "Tournament result", text: "The Netherlands beat the Soviet Union 2–0 in the final. Ruud Gullit and Marco van Basten scored; Van Basten finished the tournament with five goals." },
      { label: "Route to the trophy", text: "After losing their opening game to the Soviet Union, the Dutch beat England and the Republic of Ireland, then West Germany 2–1 in the semi-final before winning the rematch in the final." },
      { label: "Reading the formation", text: "Gullit supports Van Basten rather than staying on a fixed line. Ronald Koeman starts attacks from defence, while the wide midfielders help connect the back line to the forwards. The model diagram simplifies those changing positions." },
    ],
    sources: [{ label: "UEFA: Euro 1988 tournament history", url: "https://www.uefa.com/uefaeuro/history/seasons/1988/" }],
  },
  "/national-teams/france/2018": {
    heading: "France 2018: World Cup squad and tactical roles",
    scope: "The squad below is the version used in this simulator, not a complete official registration list. Its XI and ratings describe our model; the tournament results are historical facts.",
    facts: [
      { label: "World Cup result", text: "France beat Croatia 4–2 in the final after a 1–0 semi-final win over Belgium. In the final, a Mario Mandžukić own goal was followed by goals from Antoine Griezmann, Paul Pogba and Kylian Mbappé." },
      { label: "Midfield balance", text: "Kanté covers space alongside Pogba. Matuidi's narrower role on the left helps the midfield defend, while Mbappé offers a more direct threat on the right. This asymmetry matters more than treating both flanks as identical." },
      { label: "Griezmann and Giroud", text: "Griezmann links midfield and attack around Giroud. Giroud's role includes occupying centre-backs and supporting combinations; Mbappé attacks the space beyond them. Our fixed formation is a starting shape, not a map of every possession." },
    ],
    sources: [{ label: "FIFA: Russia 2018 technical report (PDF)", url: "https://img.fifa.com/image/upload/evdvpfdkueqrdlbbrrus.pdf" }],
  },
  "/compare/barcelona-vs-real-madrid": {
    heading: "What the Barcelona–Madrid verdict is based on",
    scope: "The historical examples are fixed to the seasons named here. The choice of a stronger peak is an editorial judgment, not a current-form ranking or the result of an actual match between these teams.",
    facts: [
      { label: "Barcelona 2010/11", text: "Barcelona beat Manchester United 3–1 in the 2011 Champions League final. Our peak preference rests on the interaction of Messi with Xavi, Iniesta and Busquets: control through midfield, then penetration around a dropping centre-forward." },
      { label: "Real Madrid 2016/17", text: "Madrid beat Juventus 4–1 in the 2017 final and retained the Champions League. Their case is different: Ronaldo's finishing, support from Benzema and a midfield able to change the speed and direction of attacks." },
      { label: "How to compare fairly", text: "European success across multiple generations supports Madrid's historical case. Choosing Barcelona 2010/11 as a single-season peak does not overturn that record. The simulator tests the named squads under one model; it does not measure the entire history of either club." },
    ],
    sources: [champions(2011), champions(2017)],
  },
  "/compare/ac-milan-vs-inter-milan": {
    heading: "Milan's European peak versus Inter's treble",
    scope: "This comparison uses Milan 1988/89 and Inter 2009/10. Historical achievements, our tactical interpretation and hypothetical simulations are separate kinds of evidence.",
    facts: [
      { label: "Milan 1988/89", text: "Milan beat Steaua Bucureşti 4–0 in the European Cup final, with two goals each from Gullit and Van Basten. Sacchi's side combined a coordinated defensive line with pressure on the ball; that organisation is central to our assessment." },
      { label: "Inter 2009/10", text: "Inter beat Bayern 2–0 in the Champions League final through two Diego Milito goals, completing the league, domestic cup and European treble. Sneijder's distribution and Milito's movement gave their compact defensive structure an attacking outlet." },
      { label: "Different winning criteria", text: "Milan's argument here is European legacy and tactical influence; Inter's is the breadth of achievement in one season. Neither criterion proves a hypothetical head-to-head winner. Compare the selected players before using the simulator." },
    ],
    sources: [{ label: "UEFA: Milan's 1989 European Cup final", url: "https://www.uefa.com/uefachampionsleague/news/0252-0cda61ca82aa-10643d9167f1-1000/" }, champions(2010)],
  },
  "/compare/real-madrid-vs-atletico-madrid": {
    heading: "The 2013/14 Madrid derby: two different champions",
    scope: "Both model squads come from 2013/14. This is a historical season comparison, not a forecast for the next Madrid derby.",
    facts: [
      { label: "The European final", text: "Real Madrid beat Atlético 4–1 after extra time in Lisbon. The match was 1–1 after 90 minutes: Sergio Ramos equalised late, before Bale, Marcelo and Ronaldo scored in extra time. The final score alone hides how close regulation time was." },
      { label: "The league distinction", text: "Atlético won the 2013/14 Spanish league. A league campaign and one European final reward different forms of performance; Madrid's final victory does not erase Atlético's domestic achievement." },
      { label: "The tactical question", text: "Madrid's Ronaldo–Benzema–Bale attack and Di María's midfield running face Atlético's compact lines and Costa's threat in transition. Test whether Madrid can create space without leaving the counterattack open." },
    ],
    sources: [{ label: "UEFA: Madrid's 2014 final and Atlético's league title", url: "https://www.uefa.com/uefachampionsleague/news/0250-0c51093bd4a7-41ccc377a75c-1000/" }],
  },
  "/compare/manchester-united-vs-liverpool": {
    heading: "United 2007/08 versus Liverpool 2018/19",
    scope: "The historical examples below concern two selected European champions. They do not constitute an up-to-date count of every trophy won by either club.",
    facts: [
      { label: "United's selected peak", text: "United beat Chelsea on penalties in the 2008 Champions League final after a 1–1 draw. Ronaldo, Rooney and Tévez give this model attacking movement from several positions rather than a single fixed route to goal." },
      { label: "Liverpool's selected peak", text: "Liverpool beat Tottenham 2–0 in the 2019 final, with goals from Salah and Origi. Salah, Mané and Firmino form the selected forward line, supported by width from the full-backs and a coordinated press." },
      { label: "The matchup question", text: "Can United play through Liverpool's pressure and use the space behind the full-backs? Can Liverpool keep United pinned back without exposing their own defence? These are our tactical questions, not claims that a model result settles the all-time club debate." },
    ],
    sources: [champions(2008), champions(2019)],
  },
}
