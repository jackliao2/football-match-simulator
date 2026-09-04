import type { TeamEditorial } from "@/data/team-editorial"

function d(intro: string, sections: TeamEditorial["sections"]): TeamEditorial {
  return { intro, sections }
}

export const NATION_TEAM_EDITORIAL: Record<string, TeamEditorial> = {
  "brazil-1970": d(
    "Brazil 1970 in Mexico remain the national-team answer on this site. Six wins from six, a front line that turned individual freedom into collective football, and a 4–1 final against Italy that still gets used as a definition of attacking play rather than a scoreline.",
    [
      {
        heading: "The tournament, not the myth",
        paragraphs: [
          "They beat Czechoslovakia, England, Romania, Peru, Uruguay and Italy. The 1–0 against Ramsey’s England — Jairzinho’s winner after a Gordon Banks save from Pelé that is more famous than the goal — is the proof they could win a tight match. The 4–1 in the Azteca is the proof they could open one.",
          "Pelé, Tostão, Jairzinho, Rivelino and Gérson were not a front four in a modern diagram. Carlos Alberto’s overlapping run for the fourth goal in the final is the emblem: a right-back arriving as a winger because the rest of the team had already pulled Italy apart.",
        ],
      },
      {
        heading: "Era-relative, on purpose",
        paragraphs: [
          "This page does not deduct points because 1970 training, pitches and sports science were different. The ratings ask how dominant they were in their football. They were dominant. A simulation against Spain 2010 is a clash of two complete ideas, not a footrace.",
          "If Brazil win, it should look like combinations in the final third and a full-back untracked. If Spain win, it should look like the ball never coming back. Both results are worth arguing. Neither is a ruling on who would win in a laboratory.",
        ],
      },
    ],
  ),
  "brazil-1958": d(
    "A 17-year-old Pelé and a Garrincha who did not need a tactical manual. Brazil 1958 in Sweden were the first Brazilian world champions, and the side that turned the 4-2-4 into a tournament-winning shape rather than a rumour from Rio.",
    [
      {
        heading: "Sweden, and the birth of a template",
        paragraphs: [
          "Pelé scored twice in the final, Vavá twice, Zagallo once. The 5–2 against the hosts was a statement after a cautious group. Didi organised; Nilton Santos and Djalma Santos were overlapping full-backs before European coaching language had a word for it.",
          "Garrincha’s dribbling from the right is the other half of the origin story. Later Brazil sides are compared to this one whether they like it or not. The 1970 team is more complete; this one is the first time the rest of the world had to admit the method travelled.",
        ],
      },
      {
        heading: "In the model",
        paragraphs: [
          "High attack, high chemistry, a defence that is excellent for 1958 rather than a 2014 high line. Against 1970 Brazil they should look like the younger, slightly less certain sibling. Against later European champions they should look like a problem of one-v-ones that a zonal lecture does not automatically solve.",
        ],
      },
    ],
  ),
  "brazil-1982": d(
    "Telê Santana’s Brazil did not win the World Cup, and they still occupy a place in the catalogue that some champions do not. Sócrates, Zico, Falcão and Éder played as if the midfield were a concert hall. Italy ended it 3–2 in the 1982 second group stage, with Paolo Rossi scoring three.",
    [
      {
        heading: "The defeat that made the legend",
        paragraphs: [
          "They had already beaten the Soviet Union, Scotland and New Zealand, then Argentina. The Italy match is the one that is taught: Brazil attacked, Italy punished the space, and a generation decided that beauty had been mugged. The truth is narrower. Brazil needed a draw and refused to take it.",
          "That refusal is why they belong in a simulator. They are a high-risk, high-creation midfield with a defence that can be got at. They are not a trophy page. They are an argument about what a national team is for.",
        ],
      },
      {
        heading: "Against Total Football, against later winners",
        paragraphs: [
          "The Netherlands 1974 pairing is two nearly-sides who changed the sport more than some winners. Brazil 1982 should look more individually inventive in the final third; the Dutch should look more coordinated without the ball. Against 2002 Brazil they are the romance; 2002 are the tournament professionals.",
        ],
      },
    ],
  ),
  "brazil-2002": d(
    "Ronaldo, Rivaldo, Ronaldinho — and a Scolari team that was much more organised than the nickname. Brazil 2002 won the World Cup in Japan and South Korea with a 3-4-3 / 3-5-2 hybrid, Cafu and Roberto Carlos as wing-backs, and a restored Ronaldo who scored both in the final against Germany.",
    [
      {
        heading: "The tournament professionals",
        paragraphs: [
          "They beat Turkey, China, Costa Rica, Belgium, England, Turkey again and Germany. The quarter-final against England — Ronaldinho’s long free-kick, then a red card, then a professional close-out — is the personality of the side. They could play. They could also manage a match.",
          "Marcos in goal, Lúcio and Edmílson in the back three, Gilberto Silva sitting. The attacking talent was obvious. The structure is why they won a knockout tournament while 1982 did not.",
        ],
      },
      {
        heading: "Versus later France, versus 1970",
        paragraphs: [
          "France 2018 are the other modern World Cup machine in the database: deeper, more athletic, less romantic. Brazil 2002 should look more open in attack and slightly more vulnerable to a counter through the wing-back spaces. Against 1970 they are the later, more physical cousins. The model will not settle which Brazil is ‘the Brazil’.",
        ],
      },
    ],
  ),
  "argentina-1986": d(
    "Maradona’s Mexico. Bilardo’s 1986 Argentina were not a beautiful midfield lecture; they were a 3-5-2 built to get the ball to the best player in the world and to survive without him when he needed a rest. They won the World Cup, and two of the five goals against England still structure every argument about him.",
    [
      {
        heading: "The tournament shape",
        paragraphs: [
          "Brown, Cuciuffo and Ruggeri at the back; Olarticoechea and the overlapping side; Batista sitting; Burruchaga arriving; Valdano finishing. Maradona scored or made almost everything that mattered. The 2–1 against West Germany in the final — Brown, Valdano, then Burruchaga after Rummenigge and Völler had equalised — is a complete match, not a one-man show.",
          "The England quarter-final is the memory: a handball and a dribble. The Belgium semi-final was two more Maradona goals. The squad around him was better than the joke version of history allows.",
        ],
      },
      {
        heading: "1986 against 2022",
        paragraphs: [
          "Scaloni’s winners are the other Argentine monument. 1986 should look more dependent on one receiver; 2022 should look more like a squad that can win a match when Messi is doubled. Both are World Cup winners. The pairing exists because the country has two answers and they are not the same team in different shirts.",
        ],
      },
    ],
  ),
  "argentina-2022": d(
    "Scaloni’s Qatar. Messi’s last World Cup became a final that went to penalties against France after a 2–2 that felt like two different matches taped together. The squad behind him — Fernández, De Paul, Mac Allister, Álvarez, Di María in the final — is why this is a team page, not a farewell tour.",
    [
      {
        heading: "From the Saudi shock to Lusail",
        paragraphs: [
          "They lost the opening game to Saudi Arabia, then won a World Cup. That sequence is the personality: fragile for a night, then stubborn for a month. The Netherlands quarter-final went to penalties. Croatia in the semi-final was a 3–0 professional job. The final was chaos after Mbappé’s hat-trick forced extra time.",
          "Romero and Otamendi were a heavy centre-back pairing. Molina and Acuña / Tagliafico gave the sides. Dibu Martínez’s shootout work is part of the trophy, not a footnote.",
        ],
      },
      {
        heading: "Messi as false nine, Álvarez as runner",
        paragraphs: [
          "Álvarez’s movement let Messi receive facing play. Di María’s final performance from the left was the extra attacker 1986 did not need because Maradona occupied that space himself. In simulations against 1986, 2022 should look more repeatable across 100 matches; 1986 should look more capable of a single unstoppable night.",
        ],
      },
    ],
  ),
  "spain-2010": d(
    "Del Bosque’s tiki-taka world champions. Spain 2010 won a World Cup in South Africa with a midfield of Xavi, Iniesta, Busquets and Xabi Alonso, a false-nine variation through Villa, and a final that was 1–0 in extra time against the Netherlands rather than a 4–0 exhibition.",
    [
      {
        heading: "Winning ugly with a beautiful method",
        paragraphs: [
          "They lost the opening game to Switzerland, then went through Portugal, Paraguay, Germany and the Netherlands by 1–0s. Iniesta’s extra-time winner in Johannesburg is the image. The method was the midfield: recover, circulate, wait until a full-back jumped.",
          "Casillas, Puyol, Piqué, Ramos and Capdevila were a defence that conceded almost nothing in the knockout rounds. Villa finished the chances that the midfield finally created. Torres started the final and was not the point of the team.",
        ],
      },
      {
        heading: "Spain against Brazil 1970, against Germany 2014",
        paragraphs: [
          "1970 Brazil are the attacking opposite number: more direct, more individual, less interested in a 1–0. 2014 Germany are the later European machine that beat Brazil 7–1 and won the final against Argentina. Spain 2010 should look like the most controlling national side in the database. If they lose a simulation, it should be to a set piece or a rare transition, not because they ‘could not pass’.",
        ],
      },
    ],
  ),
  "france-1998": d(
    "Jacquet’s home World Cup. France 1998 had Zidane as the creator, a back line of Thuram, Blanc, Desailly and Lizarazu, and a 3–0 final against Brazil that still surprises people who remember Ronaldo as unplayable. They were a tournament team built on defensive certainty plus two headers from their number 10.",
    [
      {
        heading: "The hosts, properly",
        paragraphs: [
          "They beat Italy on penalties in the quarter-final, Croatia in the semi (Thuram’s only two international goals), and Brazil in the final. Zidane scored twice from corners; Petit added a third. The 4-3-3 / 4-2-3-1 had Petit and Deschamps sitting so Zidane could play.",
          "Henry and Thierry’s pace from the left, Djorkaeff connecting, Barthez in goal. It was not 1984 Platini-as-the-entire-idea. It was a squad.",
        ],
      },
      {
        heading: "1998 against 2018",
        paragraphs: [
          "Deschamps played in 1998 and coached 2018. The later side is more athletic and more stacked in attack. 1998 should look more dependent on Zidane receiving between the lines and on set pieces. Both are world champions. The pairing is a French argument, not a simulator gimmick.",
        ],
      },
    ],
  ),
  "france-2018": d(
    "Deschamps’ Russia winners. Griezmann dropping, Mbappé running, Kanté covering the grass that modern midfields are asked to cover, and a 4–2 final against Croatia that was more controlled than the score suggests until the last half-hour opened.",
    [
      {
        heading: "A squad that could change personality",
        paragraphs: [
          "They beat Argentina 4–3 in a knockout match that looked like a video game, then Belgium 1–0 in a semi-final that looked like a coaching course. Pogba and Kanté together let Matuidi track. Umtiti and Varane were a pair that could play. Lloris still had to make the saves a final demands.",
          "Mbappé’s tournament is the headline. The structure is why they did not go out in the round of 16 the way talented French sides sometimes do.",
        ],
      },
      {
        heading: "Against 1998, against 2002 Brazil",
        paragraphs: [
          "2018 should look faster and more repeatable across many simulations. 1998 should look more like a midfield concert when Zidane is found. Against Brazil 2002 the shared 3-4-3-ish width of Cafu/Roberto Carlos versus Pavard/Hernández is the interesting geometry, not a generic ‘who has better attackers’ shout.",
        ],
      },
    ],
  ),
  "france-1984": d(
    "Platini’s Euros. France 1984 won the tournament on home soil with a midfield of Platini, Giresse, Tigana and Fernandez that still gets used as a definition of a carré magique. They scored freely, and Platini finished as top scorer with nine goals in five games.",
    [
      {
        heading: "The tournament of the number 10",
        paragraphs: [
          "The 3–2 extra-time semi-final against Portugal in Marseille — Platini’s winner — is the match. The 2–0 final against Spain in Paris closed it. Battiston, Amoros and a defence that was adequate rather than 1998-solid sat behind a midfield that did not need them to be heroes every minute.",
          "This is a European championship side, not a World Cup winner. 1982 had already ended in Seville. 1986 would end in a semi-final against West Germany. 1984 is the peak of that generation’s trophy cabinet.",
        ],
      },
      {
        heading: "Against Gullit’s Netherlands",
        paragraphs: [
          "1988 Netherlands are the pairing: the other great 1980s European championship side, built on a different kind of power. France should look more intricate in possession; the Dutch should look more direct through Van Basten. The model is there to test the argument, not to reprint a final that never happened.",
        ],
      },
    ],
  ),
  "germany-2014": d(
    "Löw’s Brazil tournament. Germany 2014 won the World Cup with a 7–1 semi-final that still does not look real on a page, then a 1–0 extra-time final against Argentina in the Maracanã. Kroos, Schweinsteiger, Khedira/Kroos rotations and Müller as a space-finder were the method; Götze finished it.",
    [
      {
        heading: "The 7–1 is not the whole team",
        paragraphs: [
          "They also had to beat Algeria in extra time and France in a quarter-final that was 1–0 and tense. The Brazil semi-final was a collapse of a host, not a template you should expect in a simulator against a competent opponent. Neuer’s sweeper-keeping against Algeria is as characteristic as the four first-half goals in Belo Horizonte.",
          "Lahms as a right-back/midfielder, Howedes at left-back in the final, Klose as the record scorer coming off the bench. It was a squad with answers.",
        ],
      },
      {
        heading: "Germany against Spain 2010",
        paragraphs: [
          "Spain had knocked them out in 2010. 2014 Germany are the more complete tournament athletes; Spain are the more controlling midfield. In simulations Germany should look stronger if the match becomes transitional. Spain should look stronger if it becomes a 600-pass siege. Both can win a 1–0.",
        ],
      },
    ],
  ),
  "germany-1990": d(
    "Beckenbauer’s West Germany. The 1990 World Cup in Italy was won 1–0 against Argentina with a late Brehme penalty, after a team that looked physically inevitable through the knockout rounds. Matthäus, Klinsmann, Völler and a back line that did not panic are the spine.",
    [
      {
        heading: "A final that was ugly on purpose",
        paragraphs: [
          "Argentina had Maradona and two red cards. Germany had control and a set-piece. The 1–0 is not a showcase; it is a tournament-winning personality. The 4–1 against Yugoslavia and the 1–0 against England on penalties in the semi-final are the rest of the picture.",
          "This is a different German idea from 2014: fewer positional tricks, more duels, more Matthäus carrying the ball through the middle of the pitch.",
        ],
      },
      {
        heading: "Against England 1966",
        paragraphs: [
          "The pairing is two World Cup winners who still argue about 1966 and 1990 in opposite directions. 1966 England should look more like a home-tournament block; 1990 Germany should look more like a midfield that can travel. The model does not replay Wembley. It asks whether those two peaks, as rated here, still produce a tight match.",
        ],
      },
    ],
  ),
  "italy-2006": d(
    "Lippi’s Berlin. Italy 2006 won the World Cup in a penalty shootout against France after Zidane’s red card, with a defence of Cannavaro, Zambrotta, Grosso and a midfield that could sit (Pirlo, Gattuso, De Rossi) or strike (Totti, Del Piero, Iaquinta, Toni, Gilardino in rotation).",
    [
      {
        heading: "A knockout team",
        paragraphs: [
          "They drew 1–1 with France after 90 and 120. Grosso’s extra-time winner against Germany in the semi-final is the romantic Italian goal of the tournament. The Australia round of 16 was a late penalty. This was not a group-stage procession. It was a side that knew how to stay in a match.",
          "Buffon’s tournament, Cannavaro’s year as the organiser of a back line, Pirlo’s passing under a press. Calciopoli hung over the clubs; the national team played as if the noise were somewhere else.",
        ],
      },
      {
        heading: "Italy against France 2018, against Brazil 2002",
        paragraphs: [
          "2006 Italy should look extremely hard to score against and only moderately explosive. Against 2018 France they are the older, denser block. Against 2002 Brazil they are the anti-wing-back test: can Cafu and Roberto Carlos be trapped? The pairing with 2002 is also a final that never happened between two actual world champions.",
        ],
      },
    ],
  ),
  "netherlands-1974": d(
    "Michels’ Total Football at a World Cup. The Netherlands 1974 did not win the final — West Germany beat them 2–1 in Munich after Cruyff had been fouled for an early penalty — and they still changed how coaches talk about space. The 4-3-3 rotated until full-backs were wingers and centres were full-backs.",
    [
      {
        heading: "The final they lost, the football they left",
        paragraphs: [
          "They beat Uruguay, Bulgaria, Argentina, East Germany and Brazil in a 2–0 semi-final that was a statement against the reigning idea of the Seleção. Then they took the lead in the final and lost control of the occasion. Neeskens, Rep, Rensenbrink and a back line that included Krol and Suurbier were the structure around Cruyff.",
          "Losing the final is why they are grouped with 1982 Brazil as influential nearly-sides. It is also why a simulator is useful: the football was good enough that the trophy is not the only evidence.",
        ],
      },
      {
        heading: "1974 against 1988, against Brazil 1982",
        paragraphs: [
          "1988 is the Dutch side that actually won a tournament. 1974 should look more revolutionary and slightly more open. Against Brazil 1982 both want the ball in the opponent’s half; Brazil have more individual dribblers, the Dutch more coordinated rotation. A 2–2 in the model would not be a cop-out.",
        ],
      },
    ],
  ),
  "netherlands-1988": d(
    "The one Dutch trophy. Van Basten’s volley in the 1988 Euros final against the Soviet Union is the image; the 2–1 against West Germany in Hamburg is the exorcism. Gullit, Rijkaard, Van Basten and a 4-4-2 that could press in a way 1974 only sketched.",
    [
      {
        heading: "A short tournament, a complete idea",
        paragraphs: [
          "They lost to the Soviet Union in the group, then beat England, Ireland, West Germany and the Soviets again. Koeman’s penalty and Van Basten’s winner against Germany were national politics as sport. The final volley from an impossible angle is the clip that survives people who never saw the rest.",
          "This is a Euros winner, not a World Cup winner. 1990 would be a disappointment. The 1988 peak is still the national side we put against Platini’s France.",
        ],
      },
      {
        heading: "Power against the carré magique",
        paragraphs: [
          "Gullit as a moving centre-forward/10 hybrid, Van Basten as the finisher, Rijkaard as the reason the rest-defence existed. Against France 1984 they should look more physically decisive in both boxes. France should look more fluent in the middle of the pitch. Pick a criterion before you pick a winner.",
        ],
      },
    ],
  ),
  "england-1966": d(
    "Ramsey’s wingless wonders. England 1966 won a World Cup at Wembley with a 4-4-2 that omitted traditional wingers, a final that went to extra time against West Germany, and a third goal that is still being argued about in slow motion. Moore, Charlton, Hurst and Banks are the names; the shape is the idea.",
    [
      {
        heading: "The tournament at home",
        paragraphs: [
          "They beat Mexico, France, Argentina, Portugal and West Germany. Eusébio’s Portugal were the semi-final test; Charlton scored twice. The final was 2–2 after 90 minutes, then Hurst completed a hat-trick. Cohen and Wilson were full-backs in a system that asked the wide midfielders to work both ways.",
          "It is a home World Cup. That matters historically and does not disappear in a simulator — we do not add a Wembley bonus — but it is why the achievement is sometimes discounted by people who were not there.",
        ],
      },
      {
        heading: "England against Germany 1990",
        paragraphs: [
          "1990 West Germany knocked England out on penalties in Turin and then won the tournament. The 1966 pairing asks the opposite peak question. England 1966 should look compact and set-piece dangerous. Germany 1990 should look more comfortable in open play through Matthäus. A tight match is the historically literate expectation.",
        ],
      },
    ],
  ),
  "england-2026": d(
    "England 2026 is the current-cycle national side in this catalogue: Tuchel as manager, Kane as the finish, Bellingham as the runner, Saka as the edge. It is a playable World Cup-year dataset, not the official 26-man FIFA list. Use it to argue England against Brazil 2002 or France 2018 with a named XI rather than a vibes rating.",
    [
      {
        heading: "Who is actually in the modelled XI",
        paragraphs: [
          "The starting shape is a 4-3-3. Pickford; James, Stones, Guéhi, Lewis; Palmer, Rice, Bellingham; Saka, Kane, Foden. That is a control midfield with two wide creators and a centre-forward who still occupies both centre-backs. The bench carries Watkins, Gordon, Mainoo, Trent and Colwill so the page is a squad, not eleven names and a shrug.",
          "People searching England squad 2026, England 2026 national team or England World Cup 2026 players usually want this list: who starts, who is on the bench, what the formation is. They are not looking for a live injury bulletin. If the official tournament squad later differs, this page stays a 2026-cycle snapshot the simulator can actually run.",
        ],
      },
      {
        heading: "How it should play in the model",
        paragraphs: [
          "Rice screens, Bellingham arrives, Saka isolates a full-back, Kane finishes cut-backs. Against Brazil 2026 the interesting clash is England’s half-space combinations versus Brazil’s wide overloads. Against France 2018 it is a later English generation testing Kanté-era compactness.",
          "Do not treat this as 1966 with better boots. 1966 is a World Cup winner; 2026 is an unplayed tournament. The ratings are era-relative on purpose: Bellingham at 92 is greatness in 2026, not a claim that he outranks Bobby Charlton on a time machine.",
        ],
      },
    ],
  ),
  "senegal-2002": d(
    "Senegal’s first World Cup began with the defending champions. Papa Bouba Diop scored the only goal against France in Seoul, and a country that had never been at the tournament suddenly had a night everyone else had to explain. They reached the quarter-finals. They did not win it. The page is for that run, not for a later Senegal with Mané.",
    [
      {
        heading: "France, Sweden, Turkey",
        paragraphs: [
          "Group A was France, Denmark, Uruguay. The 1–0 on the opening night was not a smash-and-grab in the folklore sense — Diouf and Fadiga kept forcing France backwards, and Barthez’s night never settled. They drew 1–1 with Denmark and 3–3 with Uruguay, then beat Sweden 2–1 in extra time in the round of 16. Henri Camara scored twice. Turkey ended it in the quarter-final with İlhan Mansız’s golden goal.",
          "Bruno Metsu’s side played on the front foot more than later African tournament teams who sat in a block and countered. Aliou Cissé, still a player then, sat in front of the defence. Coly and Daf were full-backs asked to run. This is not Morocco 2022. It is a first World Cup that attacked the hosts of 1998 and got away with it.",
        ],
      },
      {
        heading: "What the model should and should not do",
        paragraphs: [
          "In the simulator they should look fast in transition and a little open if the first press fails. Sylva is not a wall the way Bono was twenty years later. Against France 1998 — the side they beat a version of — the historically literate expectation is a match that can turn on a set piece and a mistake, not a 3–0 procession either way.",
          "People landing here from a Senegal 2002 search usually want Diouf, Fadiga, Diop and the France result. They are on the page. The later Lions of Teranga, with Mané and a deeper squad, are a different national team and are not this XI with better boots.",
        ],
      },
    ],
  ),
  "croatia-2018": d(
    "Croatia played 90 minutes of a World Cup final and three extra times to get there. That is the 2018 side: Modrić as the organiser, Rakitić as the second brain, Mandžukić as the battering ram, and a goalkeeper in Subašić who kept winning penalty shootouts until France did not need one. They lost 4–2 in Moscow. They still belong in any serious ‘who nearly won a World Cup’ argument.",
    [
      {
        heading: "The long way to Luzhniki",
        paragraphs: [
          "They beat Argentina 3–0 in the group and still had to go through Denmark and Russia on penalties, then England in extra time in the semi-final. Perišić equalised; Mandžukić won it. By the final the legs were going. An own goal, Perišić’s strike, then Pogba and Mbappé pulled France clear before Mandžukić’s late reply. Modrić still left Russia with the Golden Ball and, months later, the Ballon d’Or.",
          "A squad of four million people does not get a pass for losing a final. It does get credit for surviving a knockout path that would have ended most tournament sides a round earlier. Brozović screened; Rebić ran channels; Vida and Lovren headed everything. The midfield was the team.",
        ],
      },
      {
        heading: "Finalists, not 2018 France",
        paragraphs: [
          "On this site the pairing is often France 2018 because that is the match that actually happened. Croatia should look like a side that wants the ball in Modrić’s feet and becomes dangerous when Perišić attacks the far post. They should not look like a 4–2 smash. If the model keeps giving France the first transition, that is historically fair.",
          "Croatia 1998, with Šuker and Boban, is a different generation and a third-place finish. 2018 is the final. Searches for Croatia World Cup squad 2018, Modrić 2018 and the England semi-final should land here rather than on a 2026 cycle page.",
        ],
      },
    ],
  ),
  "hungary-1954": d(
    "The Mighty Magyars. Hungary 1954 arrived at the World Cup in Switzerland as the best team in the world, beat West Germany 8–3 in the group, and then lost the final 3–2 to the same opponent. Puskás, Hidegkuti, Kocsis and a 3-2-3-2 that confused man-marking are the reason they are still in every serious all-time conversation.",
    [
      {
        heading: "The final they were not supposed to lose",
        paragraphs: [
          "Puskás played the final half-fit. Hidegkuti’s deep centre-forward role had already broken England 6–3 at Wembley a year earlier. Kocsis headed everything. Grosics in goal, Czibor on the left. The 8–3 group game convinced the world the final was a formality. It was not.",
          "They belong here because the football was real, not because the trophy was collected. A simulator that only included winners would be a worse catalogue.",
        ],
      },
      {
        heading: "Hungary against Brazil 1970",
        paragraphs: [
          "Two attacking national sides from different decades, both convinced the pitch should be occupied by movers rather than statues. Brazil 1970 have the tournament they finished. Hungary 1954 have the tactical shock they delivered to England and the wound of Bern. In the model Hungary should look like a chance factory with a slightly more human defence. Brazil should look like the more complete knockout organism.",
        ],
      },
    ],
  ),
}
