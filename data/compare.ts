export type ClubCompare = {
  slug: string
  leftClubId: string
  rightClubId: string
  leftPeakId: string
  rightPeakId: string
  title: string
  description: string
  keywords: string[]
  lead: string
  verdictHeading: string
  verdict: [string, string]
  rows: Array<[string, string, string]>
}

function keywords(left: string, right: string, extra: string[] = []): string[] {
  const l = left.toLowerCase()
  const r = right.toLowerCase()
  return [
    `${l} or ${r} which is better`,
    `which is better ${l} or ${r}`,
    `${r} or ${l} which is better`,
    `who is better ${l} or ${r}`,
    `who is better ${r} or ${l}`,
    `${l} or ${r} who is better`,
    `${r} or ${l} who is better`,
    `is ${l} better than ${r}`,
    `is ${r} better than ${l}`,
    `prime ${l} vs prime ${r}`,
    `${l} vs ${r} all time`,
    ...extra,
  ]
}

export const CLUB_COMPARES: ClubCompare[] = [
  {
    slug: "barcelona-vs-real-madrid",
    leftClubId: "barcelona",
    rightClubId: "real-madrid",
    leftPeakId: "barcelona-2010-11",
    rightPeakId: "real-madrid-2016-17",
    title: "Barcelona or Real Madrid — Which Is Better?",
    description:
      "Barcelona or Real Madrid: compare their all-time case, greatest eras and prime teams, then simulate Barcelona 2010/11 vs Real Madrid 2016/17.",
    keywords: keywords("Barcelona", "Real Madrid", [
      "prime el clasico",
      "barcelona or real madrid which is better",
    ]),
    lead: "The answer changes with the question. Real Madrid owns the stronger all-time European case. Barcelona’s best modern side reached the higher tactical peak. Here is the distinction before we send their prime teams into the simulator.",
    verdictHeading: "Real Madrid all-time; Barcelona at their modern peak",
    verdict: [
      "If “better” means the greater club across history, our answer is Real Madrid. Their European record spans generations rather than one dynasty, and the club repeatedly rebuilt winning teams around different stars and tactical identities.",
      "If it means the best single version of either club, we choose Barcelona 2010/11. Guardiola’s side controlled territory and possession with a clarity that influenced the sport beyond its own trophy cabinet.",
    ],
    rows: [
      ["European longevity", "All-time", "Football identity"],
      ["2016/17 depth", "Prime squad", "2010/11 control"],
      ["Ronaldo in knockout ties", "Decider", "Messi between the lines"],
      ["Multiple winning cycles", "Legacy", "Greater tactical influence"],
    ],
  },
  {
    slug: "manchester-united-vs-liverpool",
    leftClubId: "manchester-united",
    rightClubId: "liverpool",
    leftPeakId: "manchester-united-2007-08",
    rightPeakId: "liverpool-2018-19",
    title: "Manchester United or Liverpool — Which Is Better?",
    description:
      "Manchester United or Liverpool: compare English football’s defining rivalry across history, then simulate United 2007/08 vs Liverpool 2018/19.",
    keywords: keywords("Manchester United", "Liverpool"),
    lead: "United have the larger modern trophy haul and the Ferguson era as a complete dynasty. Liverpool’s European nights and Klopp peak still win a different argument.",
    verdictHeading: "United across the modern era; Liverpool on the biggest nights",
    verdict: [
      "If the question is the greater English club from the 1990s onward, Manchester United have the stronger case: league dominance, a Champions League win in Moscow, and a squad that mixed stars without a soft unit.",
      "Liverpool’s answer is European gravitas and the 2018/19 side that pressed as a team. Istanbul 2005 still sits in a different category from domestic consistency. Simulate the peaks rather than collapsing both clubs into one number.",
    ],
    rows: [
      ["Ferguson dynasty", "Modern era", "European nights"],
      ["2007/08 balance", "Prime squad", "2018/19 press"],
      ["Ronaldo–Rooney–Tevez", "Attack", "Salah–Mané–Firmino"],
      ["League titles", "Trophy case", "Champions League folklore"],
    ],
  },
  {
    slug: "manchester-united-vs-manchester-city",
    leftClubId: "manchester-united",
    rightClubId: "manchester-city",
    leftPeakId: "manchester-united-1998-99",
    rightPeakId: "manchester-city-2022-23",
    title: "Manchester United or Manchester City — Which Is Better?",
    description:
      "Manchester United or Manchester City: treble history versus Guardiola’s treble, then simulate United 1998/99 vs City 2022/23.",
    keywords: keywords("Manchester United", "Manchester City", ["manchester derby which is better"]),
    lead: "City’s 2022/23 treble is the cleaner modern statement. United’s 1998/99 treble still carries the longer institutional case.",
    verdictHeading: "City at their peak; United as a historical club",
    verdict: [
      "As a single-season footballing machine, Manchester City 2022/23 is the stronger side: Haaland’s finishing, Rodri’s control and a Champions League finally added to domestic serial winning.",
      "As a club across decades, United still hold the larger English case. The 1998/99 treble is the comparison City invited — and the simulator is the honest way to test those two specific XIs.",
    ],
    rows: [
      ["Institutional history", "All-time", "Recent dominance"],
      ["1998/99 treble", "Prime squad", "2022/23 treble"],
      ["Yorke–Cole–Beckham", "Attack", "Haaland–De Bruyne"],
      ["Ferguson longevity", "Manager era", "Guardiola control"],
    ],
  },
  {
    slug: "manchester-united-vs-arsenal",
    leftClubId: "manchester-united",
    rightClubId: "arsenal",
    leftPeakId: "manchester-united-1998-99",
    rightPeakId: "arsenal-2003-04",
    title: "Manchester United or Arsenal — Which Is Better?",
    description:
      "Manchester United or Arsenal: Ferguson’s treble winners against the Invincibles. Compare the clubs, then simulate 1998/99 vs 2003/04.",
    keywords: keywords("Manchester United", "Arsenal"),
    lead: "United won more often. Arsenal 2003/04 went a league season unbeaten. Those are not the same claim.",
    verdictHeading: "United as a club; the Invincibles as a league statement",
    verdict: [
      "Manchester United remain the larger Premier League institution: more titles in the Ferguson years, a treble, and the habit of winning ugly as well as beautifully.",
      "Arsenal’s unbeaten 2003/04 league season is the cleanest domestic run in the argument. Wenger’s side does not erase United’s trophy case, but it is the version of Arsenal that belongs on the same pitch as 1998/99.",
    ],
    rows: [
      ["More titles", "Club case", "Unbeaten league"],
      ["1998/99 treble", "Prime squad", "2003/04 Invincibles"],
      ["Yorke and Cole", "Attack", "Henry and Bergkamp"],
      ["Ferguson years", "Longevity", "Wenger’s first peak"],
    ],
  },
  {
    slug: "liverpool-vs-manchester-city",
    leftClubId: "liverpool",
    rightClubId: "manchester-city",
    leftPeakId: "liverpool-2018-19",
    rightPeakId: "manchester-city-2022-23",
    title: "Liverpool or Manchester City — Which Is Better?",
    description:
      "Liverpool or Manchester City: Klopp’s Champions League winners against Guardiola’s treble side. Compare the clubs and simulate the peaks.",
    keywords: keywords("Liverpool", "Manchester City"),
    lead: "City collected more league titles in the Guardiola years. Liverpool 2018/19 still feels like the side that could hurt them most.",
    verdictHeading: "City as a serial winner; Liverpool as the rival peak",
    verdict: [
      "Manchester City 2022/23 is the stronger all-round club season: a treble, a deeper squad and a midfield that could control or accelerate.",
      "Liverpool’s 2018/19 team is the counter-case — a Champions League won by a press that turned the pitch into a trap. The club argument is City’s recent haul; the matchup argument is still live.",
    ],
    rows: [
      ["Guardiola titles", "Recent era", "Klopp’s European peak"],
      ["2022/23 treble", "Prime squad", "2018/19 press"],
      ["Squad depth", "Bench", "Front-three cohesion"],
      ["League serials", "Trophy case", "Madrid 2019"],
    ],
  },
  {
    slug: "liverpool-vs-everton",
    leftClubId: "liverpool",
    rightClubId: "everton",
    leftPeakId: "liverpool-2018-19",
    rightPeakId: "everton-1984-85",
    title: "Liverpool or Everton — Which Is Better?",
    description:
      "Liverpool or Everton: the Merseyside argument across history, then a simulated meeting of Liverpool 2018/19 and Everton 1984/85.",
    keywords: keywords("Liverpool", "Everton", ["merseyside derby which is better"]),
    lead: "Liverpool are the larger European club. Everton’s mid-1980s side is the version that still belongs in a greatest-Everton conversation.",
    verdictHeading: "Liverpool as a European giant; Everton at their 1980s peak",
    verdict: [
      "Across European trophies and global reach, Liverpool are the bigger club. That is not a close call once the question is all-time rather than a single decade.",
      "Everton 1984/85 is the honest peak to test: a league-winning, cup-winning side that still asks whether a Merseyside derby of primes would be as one-sided as the modern gap suggests.",
    ],
    rows: [
      ["European Cup nights", "All-time", "1980s domestic peak"],
      ["2018/19 press", "Prime squad", "1984/85 steel"],
      ["Global support", "Reach", "Local identity"],
      ["More major trophies", "Cabinet", "Howard Kendall era"],
    ],
  },
  {
    slug: "arsenal-vs-chelsea",
    leftClubId: "arsenal",
    rightClubId: "chelsea",
    leftPeakId: "arsenal-2003-04",
    rightPeakId: "chelsea-2004-05",
    title: "Arsenal or Chelsea — Which Is Better?",
    description:
      "Arsenal or Chelsea: Invincibles versus Mourinho’s first title side. Compare London’s modern rivals, then simulate 2003/04 vs 2004/05.",
    keywords: keywords("Arsenal", "Chelsea"),
    lead: "Arsenal’s unbeaten league is the purer footballing statement. Chelsea’s 2004/05 side was built to stop them and to win the title.",
    verdictHeading: "Chelsea as a title machine; Arsenal as the Invincibles",
    verdict: [
      "Chelsea 2004/05 were the more complete title-winning machine: a record defensive season, Drogba’s presence and a midfield that could choke a game.",
      "Arsenal 2003/04 remain the side people mean when they argue about beautiful Premier League football. The London argument is not one club forever — it is which peak you value.",
    ],
    rows: [
      ["Unbeaten league", "Identity", "Defensive record"],
      ["2003/04 XI", "Prime squad", "2004/05 XI"],
      ["Henry", "Match-winner", "Drogba"],
      ["Wenger’s football", "Style", "Mourinho control"],
    ],
  },
  {
    slug: "arsenal-vs-tottenham",
    leftClubId: "arsenal",
    rightClubId: "tottenham",
    leftPeakId: "arsenal-2003-04",
    rightPeakId: "tottenham-2018-19",
    title: "Arsenal or Tottenham — Which Is Better?",
    description:
      "Arsenal or Tottenham: North London’s club case, then a simulated meeting of the Invincibles and Pochettino’s 2018/19 finalists.",
    keywords: keywords("Arsenal", "Tottenham", ["north london derby which is better"]),
    lead: "Arsenal have the trophy case. Tottenham’s 2018/19 Champions League run is the peak that still asks to be taken seriously.",
    verdictHeading: "Arsenal as a club; Tottenham at their European peak",
    verdict: [
      "If the question is the greater North London club, Arsenal win on league titles, cups and the Invincibles as a unique domestic season.",
      "Tottenham 2018/19 is the version that reached a Champions League final with Kane, Son and a press that punched above the club’s recent trophy drought. Simulate that peak rather than pretending the gap is only about silverware.",
    ],
    rows: [
      ["More titles", "Club case", "2019 European run"],
      ["Invincibles", "Prime squad", "Pochettino finalists"],
      ["Henry", "Star", "Kane and Son"],
      ["Wembley identity", "History", "Recent peak"],
    ],
  },
  {
    slug: "chelsea-vs-tottenham",
    leftClubId: "chelsea",
    rightClubId: "tottenham",
    leftPeakId: "chelsea-2011-12",
    rightPeakId: "tottenham-2018-19",
    title: "Chelsea or Tottenham — Which Is Better?",
    description:
      "Chelsea or Tottenham: a London club comparison, then Chelsea’s 2012 Champions League winners against Tottenham’s 2018/19 finalists.",
    keywords: keywords("Chelsea", "Tottenham"),
    lead: "Chelsea have the European trophy. Tottenham’s 2018/19 side was the more coherent attacking team over a season.",
    verdictHeading: "Chelsea on trophies; Tottenham on a peak league-to-Europe season",
    verdict: [
      "Chelsea’s 2011/12 Champions League is the kind of night Tottenham have not yet matched. As a club, Chelsea’s 2000s and 2010s haul is larger.",
      "Tottenham 2018/19 still deserve the simulated meeting: a Champions League final reached with a clearer league identity than Chelsea’s knockout run. Trophy case and peak football are different tests.",
    ],
    rows: [
      ["Munich 2012", "European night", "Madrid 2019 final"],
      ["Drogba era", "Prime squad", "Kane–Son press"],
      ["More cups", "Cabinet", "Coherent league season"],
      ["Abramovich years", "Era", "Pochettino years"],
    ],
  },
  {
    slug: "ac-milan-vs-inter-milan",
    leftClubId: "ac-milan",
    rightClubId: "inter-milan",
    leftPeakId: "ac-milan-1988-89",
    rightPeakId: "inter-milan-2009-10",
    title: "Who Is Better, AC Milan or Inter Milan?",
    description:
      "Who is better, AC Milan or Inter Milan? Compare Sacchi’s European Cup side with Mourinho’s treble winners, then simulate the Derby della Madonnina at their peaks.",
    keywords: keywords("AC Milan", "Inter Milan", [
      "who is better inter milan or ac milan",
      "is inter milan better than ac milan",
      "ac milan or inter milan who is better",
      "milan or inter which is better",
      "derby della madonnina",
    ]),
    lead: "Milan have the deeper European identity. Inter 2009/10 is the modern treble that still stands up in any Milan debate.",
    verdictHeading: "Milan across European history; Inter in 2010",
    verdict: [
      "AC Milan 1988/89 is one of the most influential club sides ever built. Baresi, the Dutch trio and Sacchi’s press changed how elite teams defended space.",
      "Inter’s 2009/10 treble is the counter: a Champions League won the hard way, plus Serie A and the Coppa. The derby of primes is not a history lecture — it is a matchup.",
    ],
    rows: [
      ["Sacchi influence", "All-time idea", "2010 treble"],
      ["1988/89 XI", "Prime squad", "Mourinho 2009/10"],
      ["Van Basten", "Star", "Milito and Sneijder"],
      ["More European Cups", "Cabinet", "Unique modern treble"],
    ],
  },
  {
    slug: "juventus-vs-ac-milan",
    leftClubId: "juventus",
    rightClubId: "ac-milan",
    leftPeakId: "juventus-2016-17",
    rightPeakId: "ac-milan-1988-89",
    title: "Juventus or AC Milan — Which Is Better?",
    description:
      "Juventus or AC Milan: Italian giants compared, then Juventus 2016/17 against Sacchi’s Milan in the simulator.",
    keywords: keywords("Juventus", "AC Milan"),
    lead: "Milan’s European Cup history is the heavier all-time case. Juventus 2016/17 is the modern Serie A machine that still asks to be tested.",
    verdictHeading: "Milan in Europe; Juventus as a league dynasty",
    verdict: [
      "AC Milan’s European Cup nights, especially Sacchi’s side, outrank Juventus on the biggest club stage.",
      "Juventus 2016/17 — Buffon, Chiellini, Dybala — were a Champions League finalist built on defensive authority. The club argument is Milan in Europe; the peak-team argument is playable.",
    ],
    rows: [
      ["Serie A serials", "All-time", "European Cups"],
      ["Allegri 2016/17", "Prime squad", "Sacchi Milan"],
      ["Dybala and Higuain", "Attack", "Dutch trio"],
      ["Defensive culture", "Legacy", "Tactical influence"],
    ],
  },
  {
    slug: "juventus-vs-inter-milan",
    leftClubId: "juventus",
    rightClubId: "inter-milan",
    leftPeakId: "juventus-2016-17",
    rightPeakId: "inter-milan-2009-10",
    title: "Juventus or Inter — Which Is Better?",
    description:
      "Juventus or Inter Milan: two Italian giants, then a simulated meeting of Juve 2016/17 and Inter’s 2010 treble winners.",
    keywords: keywords("Juventus", "Inter"),
    lead: "Inter 2009/10 have the treble. Juventus have the longer recent league run. Pick the question before you pick the club.",
    verdictHeading: "Inter’s treble; Juventus’ league machine",
    verdict: [
      "Inter 2009/10 is the stronger single-season European case: a Champions League won away from home comforts, plus the domestic double.",
      "Juventus 2016/17 represent a different Italian idea — a side that expected to win Serie A and still reached a European final. The rivalry is bigger than one decade.",
    ],
    rows: [
      ["2010 treble", "Peak season", "Serie A run"],
      ["Mourinho", "Manager night", "Allegri control"],
      ["Sneijder", "Creator", "Pirlo then Dybala"],
      ["Madrid 2010", "European night", "Cardiff 2017"],
    ],
  },
  {
    slug: "bayern-munich-vs-borussia-dortmund",
    leftClubId: "bayern-munich",
    rightClubId: "borussia-dortmund",
    leftPeakId: "bayern-munich-2012-13",
    rightPeakId: "borussia-dortmund-2012-13",
    title: "Bayern Munich or Borussia Dortmund — Which Is Better?",
    description:
      "Bayern or Dortmund: Germany’s defining club rivalry, then the 2012/13 Champions League final pairing in the simulator.",
    keywords: keywords("Bayern Munich", "Borussia Dortmund", ["der klassiker which is better"]),
    lead: "Bayern are the greater German club. Dortmund 2012/13 is the version that still makes the Klassiker of primes feel like a final.",
    verdictHeading: "Bayern as a club; Dortmund in 2012/13",
    verdict: [
      "Bayern 2012/13 is one of the most complete treble sides ever assembled. Width, press and a demolition of Barcelona still define the Heynckes peak.",
      "Dortmund’s Klopp side of the same season is the honest rival: a Champions League finalist with Lewandowski, Reus and a counter-press that invented a generation. The club case is Bayern; the matchup is the 2013 final replayed with full squads.",
    ],
    rows: [
      ["Treble 2013", "Club peak", "Klopp’s finalists"],
      ["Squad depth", "XI", "Gegenpress"],
      ["Ribéry and Robben", "Width", "Reus and Götze"],
      ["More Bundesliga titles", "History", "Yellow Wall identity"],
    ],
  },
  {
    slug: "real-madrid-vs-atletico-madrid",
    leftClubId: "real-madrid",
    rightClubId: "atletico-madrid",
    leftPeakId: "real-madrid-2013-14",
    rightPeakId: "atletico-madrid-2013-14",
    title: "Real Madrid or Atlético Madrid — Which Is Better?",
    description:
      "Real Madrid or Atlético: the Madrid derby as a club question, then La Décima against Simeone’s 2013/14 league winners.",
    keywords: keywords("Real Madrid", "Atletico Madrid", ["madrid derby which is better"]),
    lead: "Real Madrid are the larger European club. Atlético 2013/14 is the season that stole a league from both Madrid and Barcelona.",
    verdictHeading: "Madrid in Europe; Atlético in 2013/14",
    verdict: [
      "Real Madrid’s European record is not a derby argument. La Décima is the peak that still defines the club’s modern identity.",
      "Atlético 2013/14 won La Liga with a block and a counter that made bigger squads look impatient. That is the version worth simulating against Madrid’s 2013/14 side — the actual neighbours of that season.",
    ],
    rows: [
      ["European Cups", "All-time", "2014 league title"],
      ["La Décima", "Prime squad", "Simeone’s block"],
      ["Ronaldo", "Star", "Costa and Godín"],
      ["Bernabéu nights", "Stage", "Wanda-era steel"],
    ],
  },
  {
    slug: "ajax-vs-feyenoord",
    leftClubId: "ajax",
    rightClubId: "feyenoord",
    leftPeakId: "ajax-1994-95",
    rightPeakId: "feyenoord-1969-70",
    title: "Ajax or Feyenoord — Which Is Better?",
    description:
      "Ajax or Feyenoord: the Netherlands’ oldest club argument, then Van Gaal’s 1994/95 Ajax against Feyenoord’s 1970 European Cup winners.",
    keywords: keywords("Ajax", "Feyenoord"),
    lead: "Ajax have the greater academy-to-Europe story. Feyenoord 1969/70 still own the first Dutch European Cup.",
    verdictHeading: "Ajax as a European idea; Feyenoord as the first Dutch champions of Europe",
    verdict: [
      "Ajax 1994/95 is the modern Dutch peak most people mean: a young European Cup side that looked like a national style in club colours.",
      "Feyenoord’s 1970 winners are the historical first. The De Klassieker of primes is two different Dutch centuries meeting, not a current Eredivisie table.",
    ],
    rows: [
      ["Academy pipeline", "Identity", "Rotterdam steel"],
      ["1994/95 XI", "Prime squad", "1969/70 winners"],
      ["Van Gaal", "Coach", "Ernst Happel"],
      ["More European Cups", "Cabinet", "First Dutch winners"],
    ],
  },
  {
    slug: "porto-vs-benfica",
    leftClubId: "porto",
    rightClubId: "benfica",
    leftPeakId: "porto-2003-04",
    rightPeakId: "benfica-1961-62",
    title: "Porto or Benfica — Which Is Better?",
    description:
      "Porto or Benfica: Portugal’s club giants, then Mourinho’s 2004 Champions League winners against Eusébio’s Benfica.",
    keywords: keywords("Porto", "Benfica"),
    lead: "Benfica’s 1960s European Cups are the older claim. Porto 2003/04 is the modern Portuguese side that still shocks Europe in memory.",
    verdictHeading: "Benfica in the 1960s; Porto in 2004",
    verdict: [
      "Benfica 1961/62 belong in any conversation about early European Cup greatness. Eusébio’s side is the historical peak of the Lisbon club.",
      "Porto 2003/04 won the Champions League as underdogs with a compact, aggressive Mourinho team. Portuguese club history is not one winner — it is two peaks a generation apart.",
    ],
    rows: [
      ["1960s Europe", "All-time night", "2004 underdogs"],
      ["Eusébio", "Star", "Deco and Carvalho"],
      ["Lisbon identity", "Club", "Dragão pragmatism"],
      ["Early European Cups", "Cabinet", "Mourinho’s blueprint"],
    ],
  },
  {
    slug: "celtic-vs-rangers",
    leftClubId: "celtic",
    rightClubId: "rangers",
    leftPeakId: "celtic-1966-67",
    rightPeakId: "rangers-1992-93",
    title: "Celtic or Rangers — Which Is Better?",
    description:
      "Celtic or Rangers: the Old Firm as a club question, then the Lisbon Lions against Rangers’ early-1990s side.",
    keywords: keywords("Celtic", "Rangers", ["old firm which is better"]),
    lead: "Celtic’s Lisbon Lions remain the European statement. Rangers’ 1990s nine-in-a-row era is the domestic counter-case.",
    verdictHeading: "Celtic in Europe; Rangers as a domestic dynasty",
    verdict: [
      "Celtic 1966/67 won the European Cup with a squad of local players. That night still sits above any Old Firm league table.",
      "Rangers 1992/93 were a domestic machine in a different Scottish era. The club argument depends on whether Europe or the league is the test; the simulator can at least test the squads.",
    ],
    rows: [
      ["Lisbon 1967", "European night", "Nine-in-a-row era"],
      ["Stein’s Lions", "Prime squad", "1992/93 Rangers"],
      ["Local XI", "Identity", "Domestic control"],
      ["European Cup", "Cabinet", "League serials"],
    ],
  },
  {
    slug: "boca-juniors-vs-river-plate",
    leftClubId: "boca-juniors",
    rightClubId: "river-plate",
    leftPeakId: "boca-juniors-2000",
    rightPeakId: "river-plate-2018",
    title: "Boca Juniors or River Plate — Which Is Better?",
    description:
      "Boca or River: Superclásico as a club debate, then Boca 2000 against River 2018 in the football match simulator.",
    keywords: keywords("Boca Juniors", "River Plate", ["superclasico which is better"]),
    lead: "Boca 2000 still feel like the club’s European-night peak. River 2018 were a Copa Libertadores machine under Gallardo.",
    verdictHeading: "Two Argentine peaks, not one capital ranking",
    verdict: [
      "Boca Juniors 2000 — Bianchi, Palermo, a Libertadores identity — is the Boca people mean when they talk about the club at full volume.",
      "River Plate 2018 under Gallardo is the modern River: a Libertadores won in a final that defined a generation. Superclásico history is not settled by one simulator night, but the primes can still meet.",
    ],
    rows: [
      ["Bianchi era", "Boca peak", "Gallardo era"],
      ["2000 Libertadores", "Prime squad", "2018 Libertadores"],
      ["Bombonera", "Stage", "Monumental"],
      ["Popular identity", "Club feel", "Academy-to-Europe pipeline"],
    ],
  },
  {
    slug: "paris-saint-germain-vs-marseille",
    leftClubId: "paris-saint-germain",
    rightClubId: "marseille",
    leftPeakId: "paris-saint-germain-2022-23",
    rightPeakId: "marseille-1992-93",
    title: "PSG or Marseille — Which Is Better?",
    description:
      "PSG or Marseille: Le Classique as a club question, then Messi–Mbappé–Neymar PSG against Marseille’s 1993 European champions.",
    keywords: keywords("PSG", "Marseille", ["paris saint-germain or marseille"]),
    lead: "Marseille have the European Cup. PSG have the modern French hegemony and a star-stacked 2022/23 squad.",
    verdictHeading: "Marseille in 1993; PSG as a modern giant",
    verdict: [
      "Marseille 1992/93 remain the only French side to win the European Cup. That fact still weighs more than a decade of Ligue 1 control.",
      "PSG 2022/23 are the stronger peak squad on talent: Messi, Mbappé and Neymar in the same attack. The club argument is history versus recent resource; the matchup is exactly that tension.",
    ],
    rows: [
      ["1993 European Cup", "Historic night", "Star attack"],
      ["Goethals’ side", "Prime squad", "2022/23 PSG"],
      ["French pioneer", "Identity", "Qatar-era depth"],
      ["One European Cup", "Cabinet", "Domestic serials"],
    ],
  },
  {
    slug: "barcelona-vs-manchester-united",
    leftClubId: "barcelona",
    rightClubId: "manchester-united",
    leftPeakId: "barcelona-2010-11",
    rightPeakId: "manchester-united-2007-08",
    title: "Barcelona or Manchester United — Which Is Better?",
    description:
      "Barcelona or Manchester United: two global clubs, then Guardiola’s 2010/11 side against Ferguson’s 2007/08 Champions League winners.",
    keywords: keywords("Barcelona", "Manchester United"),
    lead: "Barcelona 2010/11 is the higher tactical peak. United 2007/08 is the Premier League side that still belongs in that conversation.",
    verdictHeading: "Barcelona at the modern peak; United as a complete English champion",
    verdict: [
      "Barcelona 2010/11 controlled the Wembley final against a very good United side. That night is still the cleanest public demonstration of the club’s greatest team.",
      "Manchester United 2007/08 were league and Champions League winners with Ronaldo, Rooney and a defence that could survive a storm. The club comparison is two institutions; the honest test is those two XIs.",
    ],
    rows: [
      ["Wembley 2011", "Signature night", "Moscow 2008"],
      ["Positional play", "Idea", "Counter and width"],
      ["Messi false nine", "Star", "Ronaldo 2008"],
      ["Tactical influence", "Legacy", "Ferguson longevity"],
    ],
  },
  {
    slug: "real-madrid-vs-bayern-munich",
    leftClubId: "real-madrid",
    rightClubId: "bayern-munich",
    leftPeakId: "real-madrid-2016-17",
    rightPeakId: "bayern-munich-2012-13",
    title: "Real Madrid or Bayern Munich — Which Is Better?",
    description:
      "Real Madrid or Bayern: Europe’s serial winners compared, then Zidane’s 2016/17 Madrid against Heynckes’ 2012/13 treble side.",
    keywords: keywords("Real Madrid", "Bayern Munich"),
    lead: "Madrid have more European Cups. Bayern 2012/13 is the more complete single-season German machine.",
    verdictHeading: "Madrid across Europe; Bayern’s 2013 treble",
    verdict: [
      "Real Madrid’s European Cup record is the all-time club case. The 2016/17 side added league and Champions League with a midfield that could control or explode.",
      "Bayern 2012/13 won everything available and looked physically unplayable. The rivalry is two different ways to be a European giant — simulate the peaks instead of counting only stars on the badge.",
    ],
    rows: [
      ["More European Cups", "All-time", "2013 treble"],
      ["2016/17 depth", "Prime squad", "Heynckes press"],
      ["Ronaldo knockouts", "Decider", "Robben and Ribéry"],
      ["Knockout habit", "Identity", "Domestic control"],
    ],
  },
  {
    slug: "liverpool-vs-ac-milan",
    leftClubId: "liverpool",
    rightClubId: "ac-milan",
    leftPeakId: "liverpool-2004-05",
    rightPeakId: "ac-milan-2006-07",
    title: "Liverpool or AC Milan — Which Is Better?",
    description:
      "Liverpool or AC Milan: Istanbul and Athens as club memory, then Benítez’s 2005 winners against Ancelotti’s 2007 Milan.",
    keywords: keywords("Liverpool", "AC Milan", ["istanbul 2005"]),
    lead: "These clubs already wrote the script. The comparison is which peak you trust when the night is not already in the archive.",
    verdictHeading: "Two European Cup identities, one unfinished argument",
    verdict: [
      "Liverpool 2004/05 is immortal for Istanbul. That night is not a rating — it is a comeback that still distorts every later conversation.",
      "Milan 2006/07 won the return in Athens with a more controlled Ancelotti side. As clubs, both are European aristocracy. As squads, the simulator can run the rematch without the folklore doing all the work.",
    ],
    rows: [
      ["Istanbul 2005", "Folklore", "Athens 2007"],
      ["Benítez block", "Prime squad", "Ancelotti control"],
      ["Gerrard", "Leader", "Kaká"],
      ["European Cup habit", "Identity", "Italian European school"],
    ],
  },
  {
    slug: "napoli-vs-juventus",
    leftClubId: "napoli",
    rightClubId: "juventus",
    leftPeakId: "napoli-1986-87",
    rightPeakId: "juventus-2016-17",
    title: "Napoli or Juventus — Which Is Better?",
    description:
      "Napoli or Juventus: Maradona’s scudetto side against Allegri’s 2016/17 Juventus. Compare the clubs, then simulate the peaks.",
    keywords: keywords("Napoli", "Juventus"),
    lead: "Juventus have the larger Italian trophy case. Napoli 1986/87 is the Maradona season that still defines the club.",
    verdictHeading: "Juventus as an institution; Napoli in the Maradona years",
    verdict: [
      "Juventus remain the bigger Italian club on league titles and recent Champions League presence. 2016/17 is a fair peak: a final in Cardiff and a defence that expected to win Serie A.",
      "Napoli 1986/87 is not trying to be Juventus. It is Maradona’s first scudetto, a southern Italian landmark, and the version of Napoli that belongs in any who-would-win argument.",
    ],
    rows: [
      ["More scudetti", "Club case", "1987 landmark"],
      ["2016/17 XI", "Prime squad", "Maradona Napoli"],
      ["Buffon", "Spine", "Maradona"],
      ["Northern machine", "Identity", "City club peak"],
    ],
  },
  {
    slug: "sporting-vs-benfica",
    leftClubId: "sporting",
    rightClubId: "benfica",
    leftPeakId: "sporting-2001-02",
    rightPeakId: "benfica-1961-62",
    title: "Sporting or Benfica — Which Is Better?",
    description:
      "Sporting or Benfica: Lisbon’s derby as a club question, then Sporting 2001/02 against Eusébio’s Benfica.",
    keywords: keywords("Sporting", "Benfica", ["lisbon derby which is better"]),
    lead: "Benfica have the European Cups. Sporting’s 2001/02 league side is a modern Lisbon peak with a different kind of claim.",
    verdictHeading: "Benfica in Europe; Sporting as a Lisbon rival peak",
    verdict: [
      "Benfica 1961/62 are the historical heavyweight: early European Cup winners and the version of the club the rest of Europe still recognises.",
      "Sporting 2001/02 won the league in a different Portuguese century. The derby is not settled by 1962 alone — but Benfica’s European nights remain the larger all-time case.",
    ],
    rows: [
      ["European Cups", "All-time", "2002 league"],
      ["Eusébio", "Star", "Early-2000s Sporting"],
      ["Lisbon giant", "Status", "Academy reputation"],
      ["1960s Europe", "Peak night", "Domestic challenge"],
    ],
  },
  {
    slug: "ajax-vs-psv",
    leftClubId: "ajax",
    rightClubId: "psv",
    leftPeakId: "ajax-1994-95",
    rightPeakId: "psv-1987-88",
    title: "Ajax or PSV — Which Is Better?",
    description:
      "Ajax or PSV: Dutch giants compared, then Van Gaal’s 1994/95 Ajax against PSV’s 1988 European Cup winners.",
    keywords: keywords("Ajax", "PSV"),
    lead: "Ajax have the more famous academy-to-Europe story. PSV 1987/88 still own a European Cup of their own.",
    verdictHeading: "Ajax as a style; PSV in 1988",
    verdict: [
      "Ajax 1994/95 is the Dutch club side most often placed among the greatest: youth, positional play and a European Cup.",
      "PSV 1987/88 won Europe with a different Eindhoven toughness. The Netherlands has more than one European champion — the simulator can treat them as peers for a night.",
    ],
    rows: [
      ["1995 European Cup", "Famous peak", "1988 European Cup"],
      ["Van Gaal youth", "Prime squad", "Gullit-era PSV core"],
      ["Total Football heirs", "Idea", "Compact winners"],
      ["Academy brand", "Identity", "Eindhoven steel"],
    ],
  },
  {
    slug: "flamengo-vs-santos",
    leftClubId: "flamengo",
    rightClubId: "santos",
    leftPeakId: "flamengo-1981",
    rightPeakId: "santos-1962",
    title: "Flamengo or Santos — Which Is Better?",
    description:
      "Flamengo or Santos: Brazilian club giants, then Zico’s 1981 Flamengo against Pelé’s 1962 Santos.",
    keywords: keywords("Flamengo", "Santos"),
    lead: "Santos 1962 is Pelé at club altitude. Flamengo 1981 is the Zico side that still defines the Rio club in Europe.",
    verdictHeading: "Santos with Pelé; Flamengo with Zico",
    verdict: [
      "Santos 1962 belongs in any greatest-club-team conversation because of Pelé and the Intercontinental Cup era. That is the historical heavyweight.",
      "Flamengo 1981 — Zico, a Libertadores, a world-club night — is the Flamengo people mean. Brazilian club history is not a single badge; it is these two peaks in particular.",
    ],
    rows: [
      ["Pelé", "All-time star", "Zico"],
      ["1962 Santos", "Prime squad", "1981 Flamengo"],
      ["Intercontinental era", "Stage", "Libertadores night"],
      ["Santos identity", "Club", "Rio giant"],
    ],
  },
  {
    slug: "chelsea-vs-liverpool",
    leftClubId: "chelsea",
    rightClubId: "liverpool",
    leftPeakId: "chelsea-2004-05",
    rightPeakId: "liverpool-2018-19",
    title: "Chelsea or Liverpool — Which Is Better?",
    description:
      "Chelsea or Liverpool: Mourinho’s first title side against Klopp’s Champions League winners. Compare the clubs and simulate the peaks.",
    keywords: keywords("Chelsea", "Liverpool"),
    lead: "Liverpool have the deeper European folklore. Chelsea 2004/05 were the Premier League’s most complete defensive champion of that decade.",
    verdictHeading: "Liverpool in Europe; Chelsea as a 2000s title machine",
    verdict: [
      "Liverpool’s European Cup nights, including 2018/19, still outrank Chelsea on the biggest club stage.",
      "Chelsea 2004/05 were built to win the league by control and steel. The 2012 Champions League sits in a different Chelsea chapter. For a peak-vs-peak night, 2004/05 versus 2018/19 is the cleanest pairing.",
    ],
    rows: [
      ["European Cups", "Folklore", "2005 title machine"],
      ["2018/19 press", "Prime squad", "Mourinho 2004/05"],
      ["Front three", "Attack", "Drogba and Duff"],
      ["Anfield nights", "Identity", "Abramovich first peak"],
    ],
  },
]

export function getClubCompare(slug: string): ClubCompare | undefined {
  return CLUB_COMPARES.find((pair) => pair.slug === slug)
}

export function reverseCompareSlug(pair: ClubCompare): string {
  return `${pair.rightClubId}-vs-${pair.leftClubId}`
}

export function resolveClubCompare(slug: string): ClubCompare | undefined {
  return CLUB_COMPARES.find(
    (pair) =>
      pair.slug === slug ||
      reverseCompareSlug(pair) === slug ||
      `${pair.leftClubId}-vs-${pair.rightClubId}` === slug,
  )
}

export function compareParamSlugs(): string[] {
  const slugs = new Set<string>()
  for (const pair of CLUB_COMPARES) {
    slugs.add(pair.slug)
    slugs.add(reverseCompareSlug(pair))
    slugs.add(`${pair.leftClubId}-vs-${pair.rightClubId}`)
  }
  return [...slugs]
}
