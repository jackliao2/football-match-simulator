import type { TeamEditorial } from "@/data/team-editorial"

function d(intro: string, sections: TeamEditorial["sections"]): TeamEditorial {
  return { intro, sections }
}

export const CLUB_TEAM_EDITORIAL: Record<string, TeamEditorial> = {
  "barcelona-2008-09": d(
    "Barcelona 2008/09 were Guardiola’s first first-team, and the season that made positional play look like a finished product rather than a coaching fad. Messi was still listed as a right-sided attacker for much of the year; the treble arrived before the false-nine version became doctrine.",
    [
      {
        heading: "What they actually won",
        paragraphs: [
          "League, Copa del Rey and Champions League in the same campaign. The European run went through Lyon, Bayern and Chelsea before Manchester United in Rome. The 2–0 in the final was not a smash-and-grab: Xavi and Iniesta occupied the middle of the pitch until United’s press had nowhere left to jump.",
          "The first half of the league season still had roughness — Eto’o finishing chances that later Messi teams would create for themselves, Henry drifting inside from the left. By spring the side looked inevitable. That is why this page is the origin story, not the peak of control.",
        ],
      },
      {
        heading: "How the XI was built",
        paragraphs: [
          "Busquets replaced Yaya Touré as the first passer. Piqué arrived from Manchester United and immediately played as a stepping centre-back rather than a stopper. Alves provided the width that Messi abandoned when he came inside. The 4-3-3 was a real shape, not a slogan: Abidal and Alves were full-backs with opposite jobs.",
          "Eto’o’s movement into the channels is the detail later memory erases. He occupied Vidic in Rome; Messi received between the lines. Iniesta’s goal in Stamford Bridge the round before was the other signature — a team that could wait until the 93rd minute without changing idea.",
        ],
      },
      {
        heading: "Where they sit in the model",
        paragraphs: [
          "Attack and midfield are both elite; the defence is excellent without being Sacchi-level compact. Chemistry is high because this XI had already played together through a full league winter. In simulations they should look like a side that wants the ball and punishes a broken press, not a counter-attacking treble team.",
          "Run them against later Madrid or against Sacchi’s Milan if the argument is control versus compression. Run them against their own 2010/11 successors if the argument is which Guardiola season was actually stronger.",
        ],
      },
    ],
  ),
  "barcelona-2010-11": d(
    "Barcelona 2010/11 are the side this site picks when the question is the best football team ever. Not because they won more trophies than 2008/09 — they did not — but because Messi’s false nine, the Xavi–Iniesta–Busquets triangle and the Wembley final made the method look complete against the strongest available opponent.",
    [
      {
        heading: "The idea, finished",
        paragraphs: [
          "Villa stretched the left, Pedro held the right, and Messi received in the space a conventional striker would have occupied. That forced United’s centre-backs, and later almost everyone else, to decide whether to step out and leave a hole or sit and let him turn. Most chose badly.",
          "The league title was won at a canter; the Champions League went through Arsenal, Shakhtar, Real Madrid and United. The 5–0 Clásico in November 2010 is the domestic statement. Wembley is the European one: 3–1 against a Ferguson side that had just beaten Chelsea and Schalke without looking fragile.",
        ],
      },
      {
        heading: "What changed from the treble year",
        paragraphs: [
          "Eto’o and Henry were gone. Villa arrived as a true wide forward who could still finish. Mascherano began to cover when Piqué stepped in. The midfield was even more certain of the first pass. The team pressed higher and needed the ball even more than in 2009.",
          "The cost is a slightly narrower attacking range. There is less of Eto’o’s brutal channel running. If a simulation becomes a transition race, 2014/15 MSN have more answers. If it becomes a siege of the opponent’s box, this is the Barcelona that should look most like themselves.",
        ],
      },
      {
        heading: "How to read a result against them",
        paragraphs: [
          "A win for this side should look territorial: long spells, a goal after the press has been moved, not a two-pass break. A loss should look stolen — a set piece, a rare turnover, a night when Busquets is jumped and nobody covers.",
          "That is the standard we use on the best-team page and on the prime Barcelona dossier. Trophy arithmetic still favours 2008/09 and 2014/15 in different ways. Control favours 2010/11.",
        ],
      },
    ],
  ),
  "barcelona-2014-15": d(
    "Barcelona 2014/15 were not Guardiola’s side with three new forwards. Luis Enrique kept the positional foundations, then gave the team a more direct escape route: win the ball, find Messi early and let Suárez and Neymar attack the space before the opponent could rebuild.",
    [
      {
        heading: "The season in one line",
        paragraphs: [
          "This was Barcelona’s second treble and the only season in which the Messi–Suárez–Neymar front three won the Champions League. They beat the champions of England, France, Germany and Italy during the European campaign, then completed the treble against Juventus in Berlin.",
          "The achievement was not simply that MSN scored heavily. Barcelona recovered from an unsettled first half of the season, found a clearer division of responsibilities after January and finished with a side capable of controlling possession or attacking an open field.",
        ],
      },
      {
        heading: "How MSN actually fitted together",
        paragraphs: [
          "Suárez moving permanently into the centre changed the geometry. He pinned centre-backs, ran behind them and created the space Messi used after drifting in from the right. Neymar held the opposite side high enough that defences could not overload Messi without leaving a second elite dribbler isolated against a full-back.",
          "Messi remained the best scorer and creator, but he no longer had to perform every action from the same starting position. He could receive beside Rakitić, combine with Dani Alves, carry through midfield or switch the attack toward Neymar. Suárez supplied the violent central movement that the earlier false-nine teams deliberately avoided.",
        ],
      },
      {
        heading: "The matches that define the team",
        paragraphs: [
          "The Champions League semi-final first leg against Bayern is the iconic performance: a tense match broken open by Messi, first from the edge of the area and then by beating Jérôme Boateng before lifting the ball over Manuel Neuer. Neymar’s late third goal showed the other side of the attack—one pass, open grass, tie transformed.",
          "The Berlin final supplied a fuller portrait. Rakitić scored early, Juventus forced Barcelona through a difficult second-half spell, Suárez restored the lead and Neymar finished the counterattack in stoppage time. The side did not need the final to remain a demonstration of uninterrupted possession; it could absorb momentum and strike again.",
        ],
      },
      {
        heading: "Where this side ranks",
        paragraphs: [
          "Barcelona 2010/11 remain the stronger choice for positional control and may still be the club’s highest collective level. Barcelona 2014/15 have the better claim to attacking range. They could construct slowly, isolate a winger, attack directly through Suárez or turn a defensive clearance into a three-man break.",
          "That is why this team is rated high in attack but lower than the Wembley side in midfield control. In cross-era simulations, the 2014/15 team should feel more dangerous when a match becomes stretched—and slightly more available to an opponent who can play through the first pressure.",
        ],
      },
    ],
  ),
  "real-madrid-2016-17": d(
    "Madrid 2016/17 are the strongest counter-argument to possession orthodoxy in this catalogue. Zidane’s side could lose the ball for long spells, keep a route to Ronaldo, and still win a Champions League knockout night after the match had seemed to slip away. They also won the league. Depth was the method, not a footnote.",
    [
      {
        heading: "The three-peat, year two",
        paragraphs: [
          "This was the middle season of three consecutive European Cups, and the only one that also took La Liga. The squad rotated without looking like a cup team hiding from the league. Isco, Asensio, Morata and James were not passengers; they were how Zidane survived April.",
          "The Champions League knockout path ran through Napoli, Bayern and Atlético before Juventus in Cardiff. Ronaldo’s hat-trick in Munich is the famous clip. The quieter skill was Casemiro screening the space Marcelo left, and Kroos playing the first pass under a press that never quite arrived.",
        ],
      },
      {
        heading: "How they actually played",
        paragraphs: [
          "4-3-3 on paper, with Ronaldo as a left-sided goalscorer rather than a creator, Bale attacking the opposite channel, and Benzema dropping to combine. Modrić carried; Kroos organised; Casemiro broke the first counter. Ramos and Varane defended transitions more often than they defended sieges.",
          "They did not need 60% of the ball. They needed the first three passes after a regain to find Ronaldo or Bale facing play. That is why simulations against Guardiola’s Barcelona should not be read as a possession contest. Madrid can be ‘losing’ the match on territory and still be the more likely scorers of the next goal.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "The 2013/14 Décima side had a more explosive Di María–Bale–Ronaldo transition trident and Ancelotti’s extra midfield control through Modrić and Alonso. This 2016/17 group is the more complete squad over a season. Choose Décima if the argument is a single devastating attack; choose this page if the argument is winning the next round after a bad night.",
          "In the model they should look dangerous on the break and stubborn without the ball. A 0–0 for 70 minutes is on-brand. A 4–1 after the opponent overcommits is also on-brand.",
        ],
      },
    ],
  ),
  "real-madrid-2013-14": d(
    "The Décima side. Ancelotti’s 2013/14 Madrid finally won the tenth European Cup, and they did it with a front three — Ronaldo, Bale, Benzema — that could ruin a defence in one transition. Di María’s work-rate in midfield is the forgotten engine of the Lisbon final.",
    [
      {
        heading: "Lisbon, and the league they did not win",
        paragraphs: [
          "Atlético took the title. Madrid took the Champions League the hard way: a 4–1 first-leg hole against Dortmund repaired in the Bernabéu, then a 1–0 extra-time win over Atlético after Ramos equalised in the 93rd minute. That sequence is the personality of the team: they could look beaten and still have a route.",
          "Ronaldo’s 17 Champions League goals that season remain the scoring headline. Bale’s Copa del Rey winner against Barcelona was the domestic signature. The XI was not a possession machine; it was a vertical machine with enough midfield quality not to drown.",
        ],
      },
      {
        heading: "Shape",
        paragraphs: [
          "Alonso sat, Modrić carried, Di María shuttled. Carvajal and Coentrão/Marcelo gave the width. Pepe and Ramos defended the space behind a high-ish line that was never as aggressive as Sacchi or Guardiola. Diego López and then Casillas split the season in goal — a reminder that even a Décima squad had an unresolved problem.",
          "In simulations they should feel faster than Zidane’s 2016/17 side and slightly less controlled. If the opponent cannot live with Ronaldo and Bale running at a back four, this is the Madrid that should win. If the opponent can pin Alonso and force Madrid to construct slowly, later Zidane teams have more answers.",
        ],
      },
    ],
  ),
  "manchester-united-1998-99": d(
    "The treble is the achievement no English club had managed before, and it still distorts the argument. Ferguson’s 1998/99 side were not his strongest XI — 2007/08 were more complete — but they were the side that solved every April and May problem in front of them, twice in stoppage time in Barcelona.",
    [
      {
        heading: "How the treble actually happened",
        paragraphs: [
          "The league went to the last day. The FA Cup final was a professional 2–0 against Newcastle. The Champions League final against Bayern was a match United were losing until Sheringham and Solskjær scored in added time. That is not a tactical treatise. It is a squad with enough substitutes and enough nerve to keep attacking a set-piece.",
          "Keane and Scholes missed the final through suspension. Giggs, Beckham, Cole, Yorke and Dwight Yorke’s partnership with Cole were the attacking constants. The defence — Stam, Neville, Irwin, Johnsen — was good without being the 2008 Ferdinand–Vidić wall.",
        ],
      },
      {
        heading: "What the model should show",
        paragraphs: [
          "High chemistry, high tempo, less positional control than later Barcelona or Sacchi Milan. They score in a variety of ways: crosses, second balls, late runs. A simulation that ends 2–1 to United after the opponent led is more on-brand than a 4–0 exhibition.",
          "Use the prime United page if the argument is Ferguson’s strongest team rather than Ferguson’s greatest achievement. Both claims belong on this site; they are not the same claim.",
        ],
      },
    ],
  ),
  "manchester-united-2007-08": d(
    "Peak Ronaldo in a Ferguson team that could defend. The 2007/08 Champions League winners had Ferdinand and Vidić behind a midfield that could sit or step, and three forwards — Ronaldo, Rooney, Tevez — who all pressed. This is the United we treat as the stronger XI, even though 1999 owns the treble.",
    [
      {
        heading: "Moscow, and the league they also won",
        paragraphs: [
          "They took the Premier League, then beat Chelsea on penalties in a rain-soaked Luzhniki final after a 1–1 draw. Ronaldo headed the opener; Lampard equalised. Van der Sar saved Anelka’s penalty. It was not a possession lecture. It was a heavyweight fight between two English sides at their closest.",
          "Ronaldo’s 42-goal season is the individual peak. The collective peak is a back four that rarely looked frantic and a midfield in which Carrick’s passing and Hargreaves’s running let Scholes play. Giggs and Nani rotated the left.",
        ],
      },
      {
        heading: "Reading them in a simulation",
        paragraphs: [
          "They should look balanced: dangerous on the break through Ronaldo, stubborn without the ball, capable of winning a match that stays 0–0 for an hour. Against Guardiola’s Barcelona they are the opponent who can still score first. Against 1999 United they should usually look like the better football team even when the romance sits with the treble.",
          "The limit is creation from deep against a press that never breaks. Carrick was excellent; he was not Xavi. If a match becomes a siege of United’s box, the 2008 side survive more often than they dominate.",
        ],
      },
    ],
  ),
  "arsenal-2003-04": d(
    "The Invincibles. Wenger’s 2003/04 Arsenal went through a 38-game Premier League season without losing, with a 4-4-2 that still looks like a bet on quality in both lines rather than a modern rest-defence diagram. Henry was the sharp end; Vieira and Gilberto were the reason it did not collapse.",
    [
      {
        heading: "Unbeaten does not mean untouched",
        paragraphs: [
          "They drew 12 league matches. They were knocked out of Europe by Chelsea in the quarter-finals. The unbeaten league run is the monument, not a claim that this was the most complete club side of the decade. It is still one of the two or three best Premier League teams ever assembled.",
          "Henry’s 30 league goals sat on service from Pires and Ljungberg and on Bergkamp’s disguised passing. Campbell and Toure handled the first balls. Cole and Lauren were attacking full-backs before that became a coaching module.",
        ],
      },
      {
        heading: "How they play in the engine",
        paragraphs: [
          "High attack, high chemistry, a midfield that can control without monopolising the ball the way Barcelona later did. They should look excellent in open matches and slightly more human against a low block that refuses to be drawn. The 4-4-2 will be stretched by a modern 4-3-3 if the wide forwards track nobody — which is why City 2022/23 is the interesting pairing.",
          "Do not treat an Invincibles win in a simulation as proof they would go unbeaten in another era. Treat it as the model agreeing that this XI had very few cheap defensive minutes.",
        ],
      },
    ],
  ),
  "liverpool-2004-05": d(
    "Istanbul. Benítez’s 2004/05 Liverpool were not a league force — they finished fifth — and they still produced the most famous European comeback in the club’s history. The squad on this page is the campaign group, not only the six who started the final.",
    [
      {
        heading: "The final is the story; the squad is wider",
        paragraphs: [
          "Milan led 3–0 at half-time in the Atatürk. Gerrard, Šmicer and Alonso made it 3–3. Dudek saved from Shevchenko in extra time and in the shootout. That night is why the page exists. It is not why the ratings are modest compared with Sacchi’s Milan or Klopp’s 2019 side.",
          "The European run also went through Olympiacos, Leverkusen, Juventus and Chelsea. Carragher’s defensive year, Alonso’s range, and Gerrard playing as a connector rather than a pure 10 are the structural facts. Baros and Kewell rotated a thin attack.",
        ],
      },
      {
        heading: "What a simulation should not do",
        paragraphs: [
          "It should not replay 3–0 down as destiny. The model has no script for miracles. Across many runs this Liverpool are underdogs against the 2007 Milan side they beat, and underdogs against almost every other team in the dream-match card. That is historically honest.",
          "Use them when the argument is nerve, organisation and a world-class 8. Use 2018/19 when the argument is Liverpool as a complete attacking machine.",
        ],
      },
    ],
  ),
  "liverpool-2018-19": d(
    "Klopp’s Champions League winners, one year before the league title. The 2018/19 front three of Salah, Mané and Firmino pressed as a unit, Alexander-Arnold and Robertson were the width, and Van Dijk made a high line look like a settled idea rather than a gamble.",
    [
      {
        heading: "Madrid, after Barcelona",
        paragraphs: [
          "They overturned a 3–0 first-leg deficit against Barcelona at Anfield, then beat Tottenham 2–0 in Madrid with a first-minute penalty and a late Origi goal. The league was lost to City by a point after a 97-point season. This was a nearly-treble side that took the European prize.",
          "Alisson’s arrival and Van Dijk’s first full season changed the team’s ceiling. Fabinho sat; Wijnaldum and Henderson ran. The 4-3-3 was a press, a rest-defence and a crossing pattern at the same time.",
        ],
      },
      {
        heading: "In the model",
        paragraphs: [
          "High press, high tempo, high width. They should look exhausting to play against and slightly more open than a Guardiola or Sacchi side if the first press is broken. Against Sacchi’s Milan the interesting question is whether Liverpool’s full-backs become a strength or a 2-v-1 problem.",
          "They are stronger than 2004/05 in almost every rating except the romance of Istanbul. That is the point of keeping both pages.",
        ],
      },
    ],
  ),
  "ac-milan-1988-89": d(
    "Sacchi’s Milan compressed the pitch until opponents had nowhere clean to play. Baresi stepped out, Rijkaard screened, Gullit and Van Basten finished, and the 4-4-2 became a pressing machine rather than a British template. This is the most influential club side in the catalogue.",
    [
      {
        heading: "The European Cup, and the idea",
        paragraphs: [
          "They won the 1989 final 4–0 against Steaua in Barcelona — Gullit and Van Basten scoring two each — after a semi-final against Real Madrid that still gets shown in coaching courses. The 5–0 second leg in the Bernabéu was the statement that Italian defending had learned to attack space as a group.",
          "The league was more complicated: Napoli and then others kept Serie A from being a procession. Sacchi’s method was never only about winning every winter Saturday. It was about making the pitch smaller than the opponent wanted it to be.",
        ],
      },
      {
        heading: "Why they still matter in a simulator",
        paragraphs: [
          "High press, elite defence, elite chemistry, a front two rather than a front three. Against Guardiola’s Barcelona the argument is compression versus occupation: can Baresi step into Messi without leaving Van Basten’s runners a lane the other way?",
          "They should look like a side that wins ugly 1–0s and occasional 4–0s, not a side that needs 65% possession. If a simulation gives them the ball for long spells, read it as the opponent breaking, not as Sacchi converting to tiki-taka.",
        ],
      },
    ],
  ),
  "ac-milan-2006-07": d(
    "Ancelotti’s Athens winners. Kaká at his most unplayable, a midmund of Pirlo, Gattuso and Seedorf that could play any tempo, and a defence of Nesta, Maldini and a young Bonera/Kaladze rotation that still had authority. They beat Liverpool in the final three years after Istanbul.",
    [
      {
        heading: "Revenge, and a league they did not dominate",
        paragraphs: [
          "The 2–1 in Athens — Inzaghi twice, Kuyt once — closed a circle. The path went through Bayern and Manchester United. Kaká’s performance against United at Old Trafford in the semi-final first leg is the individual peak of the campaign.",
          "Serie A that year was still in the shadow of Calciopoli. This page is a European Cup team, not a domestic dynasty. That is already a difference from Sacchi 1989 and from later treble sides.",
        ],
      },
      {
        heading: "Kaká as the hinge",
        paragraphs: [
          "He received on the half-turn and ran through the first two lines before a defence could set. Pirlo’s passing made the run possible; Gattuso and Ambrosini made the rest-defence possible. Inzaghi existed to finish the last pass, not to build.",
          "In simulations they should look more technically fluent than 2005 Liverpool and slightly less compact than Sacchi. If the opponent cannot stop Kaká receiving between midfield and defence, Milan should win more than they draw.",
        ],
      },
    ],
  ),
  "inter-milan-2009-10": d(
    "Mourinho’s treble. Inter 2009/10 are the last Italian side to win the Champions League, and they did it by beating Barcelona over two legs with a plan that looked like a crime against possession until Sneijder, Milito and a reduced XI made it look like a method.",
    [
      {
        heading: "The Camp Nou night",
        paragraphs: [
          "Ten men for most of the second leg, a 3–1 first-leg lead, and a 1–0 defeat that still sent Inter through. That tie is why this team belongs next to Guardiola’s Barcelona in the dream-match list. The final in Madrid was a 2–0 against Bayern: Milito twice, professional, almost calm.",
          "They also won Serie A and the Coppa. Zanetti, Lucio, Samuel and Maicon were a heavy back line. Cambiasso and Motta sat. Eto’o tracked like a midfielder. Pandev and Pizarro rotated a thin bench by modern super-club standards.",
        ],
      },
      {
        heading: "How the model treats a low block with teeth",
        paragraphs: [
          "Lower possession than almost every other treble side in the database, high defensive ratings, high chemistry. They should look comfortable without the ball and ruthless on the first break. A simulation against 2010/11 Barcelona is the point of the page — not because the model will replay 2010, but because the tactical argument is still live.",
          "They are not a side you pick to dominate a 100-match sample against every giant. They are a side you pick when the question is whether control always wins.",
        ],
      },
    ],
  ),
  "bayern-munich-2012-13": d(
    "Heynckes’ treble. Bayern 2012/13 won the Bundesliga by a street, smashed Barcelona 7–0 on aggregate in the Champions League semi-final, and beat Dortmund at Wembley. Robben, Ribéry, Müller and a midfield of Schweinsteiger, Martínez and Kroos made width into a weapon rather than a decoration.",
    [
      {
        heading: "The most complete treble of the modern German era",
        paragraphs: [
          "They took the league with games to spare, the DFB-Pokal, and the European Cup. The 4–0 in the Allianz against Barcelona — Robben, Gómez, Müller, Müller — was a tactical mugging of a side that had owned the previous five years of European arguments. Wembley was 2–1, Robben in the 89th minute, against Klopp’s Dortmund.",
          "Neuer’s sweeper-keeping, Alaba and Lahm as inverted full-backs in different moments, and Dante/Boateng as a partnership that could play. This was not a one-man attack. It was a squad that could rotate Müller, Gómez and Mandžukić without changing personality.",
        ],
      },
      {
        heading: "In simulations",
        paragraphs: [
          "High press, high width, high attack, excellent defence. They should look like a side that wins 3–1 more often than 1–0. Against Madrid 2016/17 the interesting clash is Bayern’s territorial squeeze versus Madrid’s transition. Against Barcelona 2011 it is revenge as a thought experiment, not a replay of 2013.",
          "Flick’s 2019/20 sextuple side is the other Bayern peak in the database. This 2012/13 team is the one we treat as the cleaner treble and the more complete defensive unit.",
        ],
      },
    ],
  ),
  "manchester-city-2022-23": d(
    "Guardiola’s treble. Haaland’s goals, Rodri’s control, Stones stepping into midfield, and a Champions League final against Inter that was much tighter than the domestic procession. This is the modern Premier League’s most complete season, and the Invincibles’ most serious later rival.",
    [
      {
        heading: "Three trophies, one tactical trick",
        paragraphs: [
          "Stones inverting next to Rodri let City play a 3-2-4-1 / 2-3-5 hybrid without substituting a defender. Gündoğan arrived in the box. De Bruyne created from the right half-space when fit. Haaland finished the cut-backs that previous City sides had sometimes over-elaborated.",
          "The league was a title race with Arsenal until spring. The FA Cup final was 2–1 against United. The Champions League went through Bayern and Real Madrid before Inter in Istanbul. Rodri’s final goal was the least theatrical winning moment of a theatrical season.",
        ],
      },
      {
        heading: "Against older English sides",
        paragraphs: [
          "The Arsenal 2003/04 pairing exists because both went through a league campaign looking inevitable. City have the better rest-defence and the more repeatable chance creation; Arsenal have Henry in a way Haaland is not asked to drop and combine. The model should not treat them as the same 4-4-2 in different kits.",
          "City should look like a possession side that still scores the first transition. If a simulation becomes end-to-end, Haaland’s runs are the difference. If it becomes a positional chess match, Rodri is.",
        ],
      },
    ],
  ),
  "chelsea-2004-05": d(
    "Mourinho’s first Chelsea. The 2004/05 title was won with a defence that conceded 15 league goals, Makelele as a named job, and Drogba still becoming Drogba. It is the Premier League’s great anti-romance: a new owner, a new coach, a machine.",
    [
      {
        heading: "The 15-goal defence",
        paragraphs: [
          "Cech, Carvalho, Terry, Gallas and a midfield screen of Makelele with Lampard arriving. They took 95 points. They did not win the Champions League — Liverpool ended that in the semi-final — which is why this page is a league monument rather than a European one.",
          "Robben and Duff stretched the sides. Cole arrived mid-project. The football was direct when it needed to be and patient when the opponent sat. It was never ornamental.",
        ],
      },
      {
        heading: "The argument with the Invincibles",
        paragraphs: [
          "Arsenal 2003/04 went unbeaten; Chelsea 2004/05 conceded almost nothing. Those are different kinds of dominance. In a simulation Chelsea should look harder to score against and slightly less likely to produce a 5–1 away. Lampard’s late box arrivals are the attacking pattern the engine should keep finding.",
          "The 2011/12 Champions League winners are a different Chelsea: older, more chaotic, more European. This page is the first-title machine.",
        ],
      },
    ],
  ),
  "ajax-1994-95": d(
    "Van Gaal’s children. Ajax 1994/95 won the Champions League with a starting XI whose average age still looks like a development squad, except the development squad contained Kluivert, Seedorf, Davids, the De Boers, Van der Sar and a Litmanen who played as a disguised 10.",
    [
      {
        heading: "Vienna, and the league they also owned",
        paragraphs: [
          "Kluivert’s 85th-minute winner against Milan in the final is the clip. The 5–2 aggregate demolition of Bayern in the semi-final is the statement. They went unbeaten in the Eredivisie. The method was a 3-4-3 / 4-3-3 hybrid with overlapping centre-backs and a press that started from the front.",
          "It was also perishable. Within three years the side had been raided. That is part of the legend and part of the limit: this was a peak that could not be staffed the same way twice.",
        ],
      },
      {
        heading: "Against later possession giants",
        paragraphs: [
          "The Barcelona 2010/11 pairing exists because both sides treated the pitch as territory to occupy. Ajax have more verticality through Kluivert and Overmars; Barcelona have Messi. In the model Ajax should look brave, technically secure, and slightly more open if the first press fails — Van der Sar was outstanding, the rest-defence was young.",
          "They are not a nostalgia novelty. They are a genuine European Cup winner with a tactical idea that still reads clearly on a ratings sheet.",
        ],
      },
    ],
  ),
  "santos-1962": d(
    "Pelé’s Santos at the point where club and country blurred. The 1962 side were Intercontinental Cup winners, repeat Copa Libertadores champions, and a touring football exhibition that still has to be modelled as a team rather than a one-man myth.",
    [
      {
        heading: "More than one name",
        paragraphs: [
          "Coutinho’s partnership with Pelé, Pepe on the left, Zito in midfield, Gilmar in goal. The 1962 Libertadores and the Intercontinental Cup against Benfica — Pelé destroying the European champions over two legs — are the results that justify a page. The friendlies around the world are why memory inflated the myth still further.",
          "Squad records from the era are thinner than a 2011 UEFA list. The XI on this site is a representative attacking side from that cycle, not a claim that the same eleven played every Wednesday in the Paulista.",
        ],
      },
      {
        heading: "How an older attacking team meets a modern press",
        paragraphs: [
          "The Barcelona pairing is the test: can individual invention survive a coordinated 2011 press? Santos should look dangerous whenever the match becomes unscripted and more fragile when it becomes a positional squeeze. Pelé’s rating is era-relative on purpose — greatness in 1962, not a 100-metre time.",
          "Read a Santos win as the model finding space for that attacking talent. Read a Santos loss as the press winning. Both are historically plausible thoughts. Neither is a documentary.",
        ],
      },
    ],
  ),
}
