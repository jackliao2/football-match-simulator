import type { SearchPriorityRecord } from "./search-priority"

const europeanHonours = {
  label: "UEFA: European Cup / Champions League honours (updated 30 May 2026)",
  url: "https://www.uefa.com/uefachampionsleague/news/0275-1541637ad1db-88aeeefefefd-1000--all-time-european-cup-honours-board/",
}

// Reviewed on 28 October 2026. Facts here do not derive from simulation ratings.
export const REVIEWED_COMPARISON_RECORDS: Record<string, SearchPriorityRecord> = {
  "/compare/ac-milan-vs-inter-milan": {
    heading: "AC Milan or Inter: European record and selected seasons",
    summary: "Milan lead European Cup / Champions League wins 7–3. Inter 2009/10 won the league, Coppa Italia and Champions League treble; Milan 1988/89 won the European Cup but did not retain the league title. These are two different tests of achievement.",
    columns: ["Measure", "AC Milan", "Inter Milan"],
    rows: [
      ["European Cup / Champions League titles", "7", "3"],
      ["Selected season", "1988/89", "2009/10"],
      ["Selected season's league title", "No", "Yes"],
      ["Selected season's European final", "4–0 vs Steaua Bucureşti", "2–0 vs Bayern"],
      ["League, domestic cup and European Cup treble", "No in 1988/89", "Yes in 2009/10"],
    ],
    note: "European totals include the competition before and after its 1992/93 renaming and were checked on 28 October 2026. They do not count every trophy or derby result. The tactical verdict is our assessment; scores and probabilities below describe the selected squads under our simulation model.",
    sources: [
      europeanHonours,
      { label: "UEFA: Milan's 1989 final", url: "https://www.uefa.com/uefachampionsleague/news/0252-0cda61ca82aa-10643d9167f1-1000/" },
      { label: "AC Milan: why 1988/89 was not a league-title season", url: "https://www.acmilan.com/en/news/articles/history/2026-02-11/time-machine-pisa-v-ac-milan" },
      { label: "UEFA: Inter's 2010 treble", url: "https://www.uefa.com/uefachampionsleague/news/0250-0c50f4b42c3a-0fbc1831ccbe-1000--inter-join-exclusive-treble-club/" },
      { label: "UEFA: Inter's 2010 final", url: "https://www.uefa.com/uefachampionsleague/news/0250-0c50f3d5ca9e-54139392820e-1000--milito-ends-inter-s-long-wait/" },
    ],
    faqs: [
      { q: "Who has more European Cups, AC Milan or Inter?", a: "AC Milan lead seven to three, including both the European Cup and Champions League eras, checked on 28 October 2026. This is one competition's honours, not a count of all trophies or a current-form verdict." },
      { q: "Does Inter's treble prove they beat Milan 1988/89?", a: "No. It establishes Inter 2009/10's wider trophy achievement. Milan 1988/89 won the European Cup with a different tactical approach. Our matchup uses season selections and estimated ratings; its result is hypothetical." },
    ],
  },
  "/compare/manchester-united-vs-liverpool": {
    heading: "United and Liverpool: honours and the two selected seasons",
    summary: "The clubs are level on 20 English top-flight titles; Liverpool lead European Cup / Champions League wins 6–3. Both selected teams were European champions, but only United 2007/08 also won the league that season.",
    columns: ["Measure", "Manchester United", "Liverpool"],
    rows: [
      ["English top-flight league titles", "20", "20"],
      ["European Cup / Champions League titles", "3", "6"],
      ["Selected season", "2007/08", "2018/19"],
      ["Selected season's league outcome", "Champions", "Runners-up — 97 points"],
      ["Selected season's European final", "1–1 vs Chelsea after extra time; won 6–5 on penalties", "2–0 vs Tottenham"],
    ],
    note: "Honours checked on 28 October 2026. League totals include the First Division and Premier League; European totals include the pre-1992 European Cup. These are selected categories. Our representative season lineups are not a complete squad list or necessarily an exact final teamsheet, and model probabilities are not historical results.",
    sources: [
      { label: "Manchester United: official trophy room", url: "https://www.manutd.com/en/club/history/trophy-room" },
      { label: "Liverpool: official honours", url: "https://www.liverpoolfc.com/history/honours" },
      { label: "UEFA: United's 2008 final", url: "https://www.uefa.com/uefachampionsleague/news/0252-0cdc403104e6-3dbb13e3b784-1000--2007-08-fate-favours-triumphant-united/" },
      { label: "UEFA: Liverpool's 2019 final", url: "https://www.uefa.com/uefachampionsleague/news/0252-0e99c19b0df2-c2e63df5c79b-1000/" },
      { label: "Premier League: Liverpool's 97-point finish", url: "https://www.premierleague.com/en/news/1212668" },
    ],
    faqs: [
      { q: "Do Manchester United or Liverpool have more league titles?", a: "Both have 20 top-flight English titles, checked on 28 October 2026. Liverpool lead European Cup / Champions League wins six to three. Neither figure is an overall major-trophy total." },
      { q: "Did both selected teams win a league and European double?", a: "United 2007/08 did. Liverpool 2018/19 won the Champions League but finished second in the Premier League with 97 points, one behind Manchester City. The tactical comparison and simulation concern those two seasons." },
    ],
  },
  "/compare/barcelona-vs-real-madrid": {
    heading: "Barcelona and Real Madrid: history versus peak preference",
    summary: "Real Madrid lead European Cup / Champions League wins 15–5. Barcelona 2010/11 and Madrid 2016/17 both won their league and the Champions League. Our preference for Barcelona's midfield control is an editorial judgment about these two teams.",
    columns: ["Measure", "Barcelona", "Real Madrid"],
    rows: [
      ["European Cup / Champions League titles", "5", "15"],
      ["Selected season", "2010/11", "2016/17"],
      ["Selected season's league title", "Yes", "Yes"],
      ["Selected season's European final", "3–1 vs Manchester United", "4–1 vs Juventus"],
      ["Selected midfield", "Xavi, Iniesta, Busquets", "Modrić, Kroos, Casemiro"],
    ],
    note: "European totals were checked on 28 October 2026 and include the pre-1992 European Cup. Madrid's 2017 title defence was the first in the Champions League era, not the first in the competition's full history. The peak preference and any model probability answer a different question from historical honours or today's form.",
    sources: [
      europeanHonours,
      { label: "UEFA: Barcelona's 2011 final and league title", url: "https://www.uefa.com/uefachampionsleague/news/0250-0c50f8161545-f1d22c5e52ca-1000--barcelona-crowned-as-messi-and-villa-see-off-united/" },
      { label: "UEFA: Madrid's 2017 final and title defence", url: "https://www.uefa.com/uefachampionsleague/news/0250-0c5117c008df-de0901ea6dae-1000/" },
      { label: "LaLiga: Madrid's 2016/17 league title", url: "https://www.laliga.com/en-GB/news/the-keys-that-made-real-madrid-champions" },
    ],
    faqs: [
      { q: "Who has more European Cups, Barcelona or Real Madrid?", a: "Real Madrid lead 15 to five, including both the European Cup and Champions League eras, checked on 28 October 2026. That is the historical criterion used here, not a comparison of every trophy or present form." },
      { q: "Why is Barcelona 2010/11 the editorial peak pick?", a: "We favour the combinations created by Messi dropping towards Xavi and Iniesta, supported by Busquets. Madrid 2016/17 offer finishing, midfield balance and depth. Both won league-and-European doubles; the preference is our tactical reading, while the simulation tests the selected squads under one model." },
    ],
  },
  "/compare/real-madrid-vs-atletico-madrid": {
    heading: "The five competitive Madrid derbies in 2013/14",
    summary: "Atlético won the league with 90 points and took four points from the league derbies. Real won their Copa del Rey semi-final 5–0 on aggregate and the Champions League final 4–1 after extra time. A single final score does not describe the whole season.",
    columns: ["Date", "Competition", "Historical result"],
    rows: [
      ["28 September 2013", "La Liga", "Real Madrid 0–1 Atlético"],
      ["5 February 2014", "Copa del Rey semi-final, first leg", "Real Madrid 3–0 Atlético"],
      ["11 February 2014", "Copa del Rey semi-final, second leg", "Atlético 0–2 Real Madrid"],
      ["2 March 2014", "La Liga", "Atlético 2–2 Real Madrid"],
      ["24 May 2014", "Champions League final", "Real Madrid 4–1 Atlético after extra time; 1–1 after regulation"],
    ],
    note: "Results are for the 2013/14 season, not calendar-year 2014 or the clubs' all-time head-to-head. Regulation includes added time: Ramos equalised before extra time began. The season models do not reproduce Lisbon's exact availability: Alonso was suspended, and Costa started but left injured early. Simulated scores and probabilities are estimates for those models.",
    sources: [
      { label: "LaLiga: Atlético's league championship", url: "https://www.laliga.com/en-GB/news/special-mention-atletico-madrid-2013-14-liga-bbva-champions" },
      { label: "LaLiga: 28 September 2013 derby", url: "https://www.laliga.com/noticias/real-madrid-atletico" },
      { label: "UEFA: 5 February cup first leg", url: "https://www.uefa.com/news-media/news/025e-0f90b5215be9-4a8d388c3a4f-1000--madrid-and-barcelona-close-on-final-meeting/" },
      { label: "UEFA: 11 February cup second leg", url: "https://www.uefa.com/news-media/news/0212-0e88b64f52bb-8c60b2315ba1-1000--madrid-and-fiorentina-reach-cup-finals/" },
      { label: "UEFA: 2 March 2014 derby", url: "https://www.uefa.com/news-media/news/0213-0e892f79bc8c-7db724edaa28-1000--ronaldo-rescues-derby-point-for-madrid/" },
      { label: "UEFA: the final, extra time and Costa's injury", url: "https://www.uefa.com/uefachampionsleague/news/0250-0c51093bd4a7-41ccc377a75c-1000/" },
      { label: "UEFA: Alonso's final suspension", url: "https://www.uefa.com/uefachampionsleague/news/0251-0e99b2382f3a-7aaf0f99afd5-1000--champions-league-100-club-xabi-alonso/" },
    ],
    faqs: [
      { q: "Who won the 2013/14 Madrid derby comparison?", a: "Atlético won one league derby and drew the other, taking four points to Real's one, and became league champions. Real won both cup semi-final legs and the European final. The answer depends on the competition being compared." },
      { q: "Was Real Madrid's 2014 final a 4–1 win after 90 minutes?", a: "No. It was 1–1 after regulation, including Ramos's added-time equaliser. Bale, Marcelo and Ronaldo scored in extra time for a 4–1 final score. The simulator's season squads are not the exact teams available for that match." },
    ],
  },
}
