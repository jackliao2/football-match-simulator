import type { TeamEditorial } from "@/data/team-editorial"

function d(intro: string, sections: TeamEditorial["sections"]): TeamEditorial {
  return { intro, sections }
}

export const EXPANDED_CLUB_TEAM_EDITORIAL: Record<string, TeamEditorial> = {
  "bayern-munich-2019-20": d(
    "Bayern 2019/20 are a treble side assembled in mid-season. Hansi Flick replaced Niko Kovač in November, tightened the press, and by the Lisbon bubble they were putting eight past Barcelona. It is not the 2012/13 Jupp Heynckes machine in a later kit. It is a vertical, wide, Lewandowski-led surge that won everything available after the restart.",
    [
      {
        heading: "Lisbon, not a slow build",
        paragraphs: [
          "The Champions League knockout round was a single-site tournament. Chelsea were beaten 4–1, Barcelona 8–2, Lyon 3–0, PSG 1–0. Coman’s header in the final is the clip; Gnabry, Müller and a Lewandowski season of 55 goals in all competitions are the mechanism. Davies turned the left flank into a footrace nobody in that bubble wanted.",
          "Kimmich and Goretzka gave the press a first line that actually recovered the ball. Thiago still had the pause when a game needed to breathe. Treat this as a control side in the 2010/11 Barcelona sense and the simulation will lie. They should look like a team that wins the ball and immediately occupies the box.",
        ],
      },
      {
        heading: "Two Bavarian peaks",
        paragraphs: [
          "On this site 2012/13 remains the cleaner argument for dominance across a whole European winter. 2019/20 is the argument for a finishing machine that arrived late and still took the treble. Run them against each other if the question is Heynckes versus Flick. Run this one against PSG-shaped or Messi-shaped opponents if the question is whether a high-tempo 4-2-3-1 can bully a possession giant.",
          "Do not flatten both Bayerns into ‘German efficiency’. This XI lives on width, second balls and Lewandowski’s first touch in the area. The earlier one lived on Robben, Ribéry and a midfield that could also keep the ball for twenty passes.",
        ],
      },
    ],
  ),
  "juventus-2016-17": d(
    "Allegri’s 2016/17 Juventus won a sixth straight Scudetto, the Coppa, and then ran into the Madrid of Ronaldo and Casemiro in Cardiff. The 3-5-2 with Buffon and the BBC behind Higuaín and Dybala is the last Juventus side on this catalogue that still feels like a European finalist rather than a domestic habit. They have no older indexed page. This is the one.",
    [
      {
        heading: "Cardiff, after a domestic machine",
        paragraphs: [
          "Mandžukić headed them in front in the final. Ronaldo answered, then Casemiro from distance, then Ronaldo again. 1–4 is the score that memory keeps. The league season underneath it was 91 points and a defence that still had Barzagli, Bonucci and Chiellini in the same back three, with Alves and Alex Sandro as the width.",
          "Higuaín had arrived from Napoli as the closer. Dybala was the invention between the lines. Pjanić took the first pass; Khedira ran through the second ball. It is a side that wants to be compact and then vertical, not a possession lecture.",
        ],
      },
      {
        heading: "Against the Madrid that beat them",
        paragraphs: [
          "The pairing on this site is with Real Madrid 2016/17 because that is the match that actually happened. In a simulation Juventus should look stubborn, aerial, and dangerous on the first cross. Madrid should look like the side that can score the second and third goals once the block stretches. If Juventus win, it should look like a set piece and Buffon, not like they suddenly became Guardiola.",
          "Prime Juventus, for a lot of older arguments, is still the 2002/03 Nedvěd side. This page is the modern answer: the last great BBC night, and the night it was not enough.",
        ],
      },
    ],
  ),
  "atletico-madrid-2013-14": d(
    "Simeone’s 2013/14 Atlético stole a Liga title from Madrid and Barcelona, then lost a Champions League final in extra time after Ramos headed in at 93 minutes. Courtois, Godín, Costa, Gabi, Koke: a 4-4-2 that treated the ball as a thing you won back, not a thing you admired. First league since 1996. First European final of the Simeone era.",
    [
      {
        heading: "The last-day title, the extra-time wound",
        paragraphs: [
          "Godín’s header at the Camp Nou on the final Sunday made it 1–1 and made them champions on 90 points. Chelsea were beaten in the Champions League semi-final. In Lisbon, Costa started the final half-fit and did not last. Ramos equalised in the last minute of normal time; Bale finished the extra-time break. 1–4 after that is the scoreboard, not the match they played for 92 minutes.",
          "Villa still had a finishing season in him. Arda and Koke were the wide supply. Gabi and Tiago were the screen. The press was real: not a slogan, a first-second hunt that made better technicians play in a hurry.",
        ],
      },
      {
        heading: "How to read them in the model",
        paragraphs: [
          "They should look ugly in the best way: lowish block, early fouls, Costa holding the centre-back, set pieces as a genuine plan. They should not look like a 46-percent possession side that has accidentally become Pep. Against Real Madrid 2013/14 — the pairing this site already uses — the interesting question is whether the block survives the tenth corner.",
          "Later Atlético sides on the catalogue are still Simeone. This is the one that actually took the league off the two giants in the same winter.",
        ],
      },
    ],
  ),
  "porto-2003-04": d(
    "Mourinho’s Porto won the 2004 Champions League without a galaxy. Deco ran the tempo, Carvalho organised the back four, Derlei and McCarthy finished, and Manchester United were beaten at Old Trafford with Costinha’s header. The final in Gelsenkirchen was 3–0 against Monaco. It is the last European Cup that still looks like a scouting department beating a payroll.",
    [
      {
        heading: "The nights that made the method",
        paragraphs: [
          "United in the last sixteen is the origin of the Mourinho myth in England: a 1–1 first leg, then Costinha at the Stretford End. Lyon in the quarter-final, Deportivo in the semi. In the final Carlos Alberto, Deco and Alenichev scored; Vítor Baía was rarely the story because the distances in front of him were correct.",
          "Maniche, Costinha and a 4-3-1-2 that could become a block without a meeting. Ferreira and Valente as full-backs who defended first. Chemistry is the point of the rating: this XI had already won the UEFA Cup the year before and knew the idea.",
        ],
      },
      {
        heading: "Why they belong next to bigger names",
        paragraphs: [
          "A simulator padded only with Galácticos would miss the actual 2004 champion. In simulations they should look compact, set-piece dangerous and happy to wait. They should not look like a 90-possession side. Run them against later Chelsea or Madrid if the argument is whether Mourinho’s first European idea still travels. Run them against Monaco-shaped opponents if you want the final that happened.",
          "Porto 2010/11 under Villas-Boas is a different, more attacking machine. This page is the original: the one that made a young coach look inevitable.",
        ],
      },
    ],
  ),
  "borussia-dortmund-2012-13": d(
    "Klopp’s 2012/13 Dortmund pressed Europe until Wembley. Lewandowski scored four against Real Madrid in the semi-final first leg; Reus and Götze occupied the pockets; Hummels passed out of the first pressure. They lost the final 2–1 to the Bayern they had been chasing all spring. It is a peak without the trophy. That is why it is here.",
    [
      {
        heading: "Westfalen, then Wembley",
        paragraphs: [
          "4–1 against Madrid at home, with Lewandowski taking the night personally, is the signature. The return in the Bernabéu was a 0–2 that still went through. At Wembley Mandžukić scored, Gündoğan equalised from the spot, Robben finished in the 89th minute. Götze, already sold to Bayern, was an unused extra-time ghost.",
          "Błaszczykowski, Piszczek, Schmelzer and a Bender–Gündoğan double pivot that could hunt for ninety minutes. Weidenfeller was not Neuer; the press was supposed to make that irrelevant. Sometimes it did. In London it did not.",
        ],
      },
      {
        heading: "Press versus the treble Bayern",
        paragraphs: [
          "On this site they sit next to sides that actually lifted the cup. In a simulation they should look vertical, high-tempo and slightly more fragile at the back than 2012/13 Bayern. If they win, it should look like a turnover and Lewandowski. If they lose, it should look like the press jumping one time too many.",
          "The 2010/11 title side is the domestic origin story. This is the European one. Do not merge them: Kagawa’s year and Reus’s year are different football.",
        ],
      },
    ],
  ),
  "napoli-1986-87": d(
    "Bianchi’s 1986/87 Napoli won the club’s first Scudetto, added the Coppa, and made Maradona the entire idea of a city. Giordano and Carnevale finished what he invented. It is not a tactical textbook. It is a 4-3-1-2 that ran through one number ten until the north of Italy had to admit the south had the league.",
    [
      {
        heading: "The first title, with one brain",
        paragraphs: [
          "Maradona’s season was creation and set pieces and the thing a zonal lecture still cannot diagram. Bagni and De Napoli were the runners who made the 10 possible. Garella was not a Galáctico in goal; Ferrara was already arriving at the back. The double mattered in Naples because the league had always belonged to someone else.",
          "They were not invincible. They were inevitable enough. Treating this as a complete eleven in the Milan 1988/89 sense is how you miss the point: the ratings are high in attack and chemistry because the idea was shared, not because every position was world-class.",
        ],
      },
      {
        heading: "How a simulation should feel",
        paragraphs: [
          "They should look like a street side with a genius: slower than a modern press, lethal on the second ball into Maradona, dangerous from dead balls. They should not look like a 4-3-3 that controls territory for an hour. Against later Napoli 2022/23 the interesting clash is two titles forty years apart — one built on a 10 from another planet, one built on Kvaratskhelia and Osimhen without needing that myth.",
          "If you want Maradona the World Cup, open Argentina 1986. If you want Maradona the club religion, this is the page.",
        ],
      },
    ],
  ),
  "manchester-city-2017-18": d(
    "Guardiola’s first title at Manchester City was a 100-point, 106-goal Premier League season. De Bruyne and Silva supplied, Agüero finished, Sané and Sterling stretched the pitch until full-backs looked prehistoric. It is not the 2022/23 treble side. It is the year the league table stopped looking like a contest.",
    [
      {
        heading: "The video-game winter",
        paragraphs: [
          "32 wins, 100 points, a first line of Sterling–Agüero–Sané that created the wide overloads later City sides turned into doctrine. Fernandinho was still the defensive midfielder who could also pass. Ederson’s long throw had already become a pass. Walker arrived to turn the right side into a sprint.",
          "Europe did not follow. Liverpool beat them in the quarter-final: 3–0 at Anfield, 2–1 at the Etihad. That is why this page is a league machine, not a Champions League argument. Treating 100 points as a European peak is how you lose the 2018/19 Liverpool debate on purpose.",
        ],
      },
      {
        heading: "Two City primes",
        paragraphs: [
          "On this site 2022/23 is the complete English treble. 2017/18 is the first time Guardiola’s positional play looked solved in the Premier League without Haaland. In simulations this XI should look like a chance factory with slightly more human defending than the treble team. Against Liverpool 2018/19 — the pairing already in the catalogue — the clash is the one Europe actually staged a year later, with the league-season version of City.",
          "Delph at left-back is the honesty in the XI. Kompany was still there. The idea was already bigger than the personnel at the back.",
        ],
      },
    ],
  ),
  "nottingham-forest-1979-80": d(
    "Clough’s Forest retained the European Cup in Madrid. Shilton as the wall, Robertson as the supply from the left, Francis as the finish, and a provincial club that made defending a European title look like a habit. The 1–0 against Hamburg was a John Robertson goal. The miracle was that it looked ordinary.",
    [
      {
        heading: "Madrid, the second time",
        paragraphs: [
          "1979 had been Malmö and Trevor Francis. 1980 was Hamburg and a tighter, meaner night. Lloyd and Burns headed everything. McGovern organised. Anderson overlapped because Robertson already occupied the left. Birtles worked the channels when Francis was marked.",
          "They were not a dynasty in the Milan sense. They were a manager’s idea held together by goalkeeping and wide play. English clubs were about to be thrown out of Europe; this was the last Forest night that still belongs on a European Cup page.",
        ],
      },
      {
        heading: "Against later English Europe",
        paragraphs: [
          "The pairing instinct on this site is Liverpool 2004/05 or Villa 1981/82: English sides that won the cup without being the strongest league team on earth. In a simulation Forest should look direct, set-piece stubborn and happy at 1–0. They should not look like a Pep possession side in claret. If they win, Shilton and Robertson should be the reasons, not a 90th-minute shootout of superstars.",
          "Leeds 1973/74 is the other English machine in the catalogue. Forest are the punchline that the establishment did not write.",
        ],
      },
    ],
  ),
  "celtic-1966-67": d(
    "Stein’s Lisbon Lions won the European Cup with a squad drawn from within thirty miles of Glasgow. Johnstone on the right, Gemmell overlapping, Chalmers finishing, and a 2–1 against Herrera’s Inter that turned catenaccio into a rumour. First British side to lift the trophy. Still the Celtic page that matters.",
    [
      {
        heading: "Lisbon, 25 May 1967",
        paragraphs: [
          "Inter scored from the spot through Mazzola. Gemmell equalised with a hit from outside the box. Chalmers won it late. Simpson, Craig, McNeill, Clark, Gemmell; Murdoch, Auld; Johnstone, Wallace, Chalmers, Lennox. The story that they all came from the same city is not marketing copy. It is the squad list.",
          "They pressed a defensive champion until the idea cracked. That is the football, not the folklore. A simulator that only indexed later payrolls would miss the actual 1967 champion.",
        ],
      },
      {
        heading: "How they should play in the model",
        paragraphs: [
          "High tempo for 1967, wide, full-backs as attackers, a defence that is brave rather than a 2010s high line. Against Manchester United 1998/99 the pairing is two British European Cups decades apart. Celtic should look like runners and wingers. United should look like a modern squad with Cole and Yorke. Both results are arguable. Neither is a laboratory.",
          "Rangers 1992/93 is the domestic rival in the catalogue. This page is the one that left Scotland and came back with the cup.",
        ],
      },
    ],
  ),
  "ajax-2018-19": d(
    "Ten Hag’s 2018/19 Ajax knocked Real Madrid out 4–1 at the Bernabéu, took a domestic double, and then lost a Champions League semi-final in extra time after Lucas Moura’s hat-trick in Amsterdam. De Ligt, De Jong, Ziyech, Tadić: an academy night that belonged in the 1990s except it happened in front of phones.",
    [
      {
        heading: "Madrid, then the slip",
        paragraphs: [
          "The 4–1 in Spain was Ziyech, Tadić and a defence that played out under Bale and Benzema without panic. Onana’s passing, Blind as a centre-back who could start attacks, Mazraoui and Tagliafico as the width. Van de Beek arrived in the box like a striker. They beat Juventus in the quarter-final too.",
          "The semi-final first leg was 1–0 in London. The return was 2–3 after extra time: Van de Beek, De Ligt, then three from Lucas. They were seconds from a final and then they were not. That is the whole European story.",
        ],
      },
      {
        heading: "Against the Tottenham that beat them",
        paragraphs: [
          "The pairing on this site is Tottenham 2018/19 because that is the match. In a simulation Ajax should look like a press-and-pass side with teenage certainty. Spurs should look like a counter and a set piece and Son. Do not flatten both into ‘fun 2019 Champions League’. One of them had the ball; the other had the last goal.",
          "Ajax 1994/95 remains the club’s indexed European peak. This page is the echo that almost became a sequel.",
        ],
      },
    ],
  ),
  "tottenham-2018-19": d(
    "Pochettino’s 2018/19 Tottenham reached a Champions League final without winning a trophy. Ajax were beaten in extra time in Amsterdam; Liverpool were waiting in Madrid. Kane was not fit to start the final. Lucas Moura, who had scored the hat-trick that got them there, started instead. It is a cup run, and a great one. It is not a league champion in a later kit.",
    [
      {
        heading: "Amsterdam, then the Wanda",
        paragraphs: [
          "1–0 down from the first leg, 2–3 after extra time in the second: Lucas at 55, 59 and 96 minutes. Eriksen still had the switch of play. Son ran the channels. Sissoko and Winks were the legs that made a 4-2-3-1 possible when the press had to become a block. Lloris kept the nights alive long enough for the forwards.",
          "The final was 0–2. Salah from the spot, Origi later. Kane on the bench until it was gone. Treating Madrid as proof this was Spurs’ strongest league XI is how you lose the 2016/17 86-point argument on purpose.",
        ],
      },
      {
        heading: "Cup steel against a league peak",
        paragraphs: [
          "On this site they sit against Liverpool 2018/19 because that final happened, and against Ajax 2018/19 because that semi-final happened. In a simulation they should look dangerous in transition and slightly short of a control midfield. They should not look like City 2017/18 with white shirts.",
          "If you want the Spurs that nearly won England, open 2016/17. If you want the Spurs that finally reached a European Cup final, this is the page.",
        ],
      },
    ],
  ),
  "marseille-1992-93": d(
    "Goethals’ Marseille beat Milan 1–0 in Munich with Boli’s header and became the first French European Cup winners. Desailly as the wall, Abedi Pelé as the spark, Völler and Bokšić as the finish. The French league title from that spring was later stripped over the VA-OM bribery scandal. The European night in Munich is still in the cabinet. Both facts belong on the page.",
    [
      {
        heading: "Munich, and the asterisk at home",
        paragraphs: [
          "Boli’s header just before half-time is the goal. Barthez was young. Deschamps organised. Sauzée passed. Angloma overlapped. It was not a smash-and-grab against an ageing Milan; it was a compact, direct French side that refused to be impressed by the Dutch generation in Italy.",
          "The domestic title was voided after the Valenciennes affair. A simulator that printed only the trophy list would be lying in the other direction. They won Europe on the pitch. They did not get to keep the league they tried to buy.",
        ],
      },
      {
        heading: "Against the Milan they beat",
        paragraphs: [
          "The pairing on this site is Milan 1988/89, the Sacchi peak rather than the 1993 finalists, because that is the argument people actually want. In a simulation Marseille should look physical, aerial and happy at 1–0. Milan should look like the press. If Marseille win, it should look like a set piece and Desailly, not like they out-passed the 1989 side for an hour.",
          "French football’s European drought ended in Munich. The hangover was the scandal. Read both.",
        ],
      },
    ],
  ),
}

export const EXPANDED_NATION_TEAM_EDITORIAL: Record<string, TeamEditorial> = {
  "spain-2012": d(
    "Del Bosque’s 2012 Spain closed the tiki-taka era with a 4–0 in the European Championship final against Italy. Fàbregas as the false nine, Xavi and Iniesta as the brain, Silva and Alba arriving from the sides, and a third straight major tournament title. It is not the 2010 World Cup side in orange. It is the same idea with even more midfield and even less of a conventional striker.",
    [
      {
        heading: "Kiev, after a tournament of control",
        paragraphs: [
          "Silva, Alba, Torres and Mata scored in the final. Italy had already beaten them in the group; the final was a different organism. Alonso and Busquets sat; Xavi took the first pass; Iniesta found the third. Casillas was rarely the story because the distances were correct. Villa was injured. The false nine was not a tweak. It was the XI.",
          "They can look sterile in memory because the football was sterile on purpose. Possession at 96 in this model is a warning, not a boast: they will keep the ball until the opponent’s press has nowhere left to jump. That is the 2012 version of dominance.",
        ],
      },
      {
        heading: "2010 versus 2012",
        paragraphs: [
          "On this site 2010 remains the World Cup answer. 2012 is the Euros answer and, for some arguments, the more complete midfield. Against Italy 2006 — a pairing already in the catalogue — the clash is two tournament winners with opposite ideas: a false nine against a deep block that once won a World Cup the ugly way. Spain should look like the ball never coming back. Italy should look like a chance from a restart.",
          "If Spain lose a simulation, it should look like a rare counter and a set piece, not like they forgot how to pass.",
        ],
      },
    ],
  ),
  "belgium-2018": d(
    "Martínez’s 2018 Belgium were the golden generation that won a World Cup bronze and nothing that sits in the cabinet as a star. They beat Brazil 2–1 in Kazan, lost a semi-final to France, then beat England 2–0 in the third-place match. Hazard, De Bruyne, Lukaku, Courtois: a 3-4-2-1 that could counter anyone and still could not find a final.",
    [
      {
        heading: "Kazan, then Saint Petersburg",
        paragraphs: [
          "Fernandinho’s own goal and De Bruyne’s strike put Brazil out. Courtois made the night possible. In the semi-final Umtiti’s header was enough for France; Belgium had the ball and not the box. Meunier and Hazard finished the England match that nobody wanted to call a final.",
          "Alderweireld, Kompany and Vertonghen as a back three. Witsel as the screen. Chadli and Meunier as the wing-backs. Fellaini as the emergency plan. Chemistry is lower than the talent list because this was a tournament XI, not a club that trained together every day.",
        ],
      },
      {
        heading: "Talent against a champion",
        paragraphs: [
          "The pairing on this site is France 2018 because that semi-final is the argument. In a simulation Belgium should look like a chance factory on the break, with De Bruyne as the switch and Lukaku as the target. France should look like the more complete knockout organism. If Belgium win, it should look like Hazard isolating a full-back, not like they became Spain 2012.",
          "They belong here because the football was real. A catalogue of only winners would drop the best Belgium side most living fans actually watched.",
        ],
      },
    ],
  ),
  "portugal-2016": d(
    "Santos’ 2016 Portugal won the Euros the unfashionable way. Three group draws, Ronaldo carried off in the final, Éder scoring in extra time against the hosts in Paris. It is a low-tempo, compact 4-4-2 that treated the tournament as a series of problems to survive. It is not the 2004 home finalists in a later kit. It is the one that actually lifted the trophy.",
    [
      {
        heading: "Paris, after a month of draws",
        paragraphs: [
          "Iceland, Austria, Hungary: three group games, three draws, still through. Croatia in extra time, Poland on penalties, Wales 2–0 in the semi-final with Ronaldo and Nani. In the final Payet’s challenge took Ronaldo out of the match. The idea did not change. Patrício, Pepe, Fonte, William. Nani stayed high. Éder, on as a battering ram, hit the winner in the 109th minute.",
          "Moutinho, Adrien, João Mário and Guerreiro were not a glamorous midfield. They were distances. Quaresma was the wild card. Chemistry is high because the stubbornness was shared.",
        ],
      },
      {
        heading: "How to read a defensive champion",
        paragraphs: [
          "In simulations they should look slow, compact and dangerous on the first ball into Ronaldo. They should not look like a 90-possession side. Against France 2018 — a pairing already in the catalogue — you are not restaging the 2016 final; you are asking whether Santos’ block still bothers a later French machine. Against Wales 2016 you are restaging the semi-final that did happen.",
          "If Portugal win, it should look like 1–0 and a set piece. If they lose, it should look like the block stretching, not like Ronaldo forgot how to head.",
        ],
      },
    ],
  ),
  "brazil-1994": d(
    "Parreira’s 1994 Brazil won a World Cup in the American heat without the old samba label. Romário as the cutting edge, Bebeto as the partner, Dunga as the spine, and a 0–0 final in Pasadena that went to penalties against Italy. Taffarel saved; Baresi and Baggio missed. The fourth star arrived the ugly way. That is the point of the page.",
    [
      {
        heading: "Pasadena, after Romário’s tournament",
        paragraphs: [
          "They beat the United States in the last sixteen, Netherlands 3–2 in the quarter-final, Sweden in the semi-final. Romário’s finishing was the difference in matches that refused to become 1970. Jorginho and Branco as full-backs; Mauro Silva next to Dunga; Mazinho in a midfield that hunted more than it embroidered. Raí started the tournament; the closer was the striker.",
          "The final was a chess match against Baresi and Maldini. Extra time solved nothing. Baresi missed the first Italy penalty. Massaro scored; then Baggio put the last one over. Brazil were world champions again. Nobody called it pretty. Everybody called it done.",
        ],
      },
      {
        heading: "Two Brazils, two ideas",
        paragraphs: [
          "On this site 1970 remains the national-team answer for attacking play. 2002 is the Ronaldo–Rivaldo–Ronaldinho tournament. 1994 is the one that won by defending distances in 40-degree heat. In simulations they should look compact, counter-punching and finished by Romário. They should not look like a 4-2-4 from 1958.",
          "Against Italy 1994 you are restaging the final. Against 1970 Brazil you are asking whether the ugly champions could live with the beautiful ones. Both questions are the reason the squad is in the catalogue.",
        ],
      },
    ],
  ),
  "italy-2021": d(
    "Mancini’s 2021 Italy won the Euros at Wembley, unbeaten, with Chiesa breaking games open and Donnarumma winning the shootout. Shaw scored after two minutes; Bonucci equalised; England missed the last penalties. It is a 4-3-3 that could keep the ball through Verratti, Jorginho and Barella without pretending to be Spain 2012. First major title since 2006.",
    [
      {
        heading: "Wembley, after a month of nerve",
        paragraphs: [
          "They opened the tournament by putting Switzerland and Turkey away, then survived a knockout path through Austria, Belgium and Spain. Chiesa’s extra-time strike against Spain is the other signature besides the final. Spinazzola was lost to injury along the way. Immobile was the league closer who became a tournament runner. Insigne still had the left-foot finish.",
          "Chiellini and Bonucci were the old wall in a younger side. Di Lorenzo and Emerson were the full-backs. Locatelli had the group-stage night. The unbeaten run into the tournament was a club-side habit wearing Italy shirts.",
        ],
      },
      {
        heading: "Against the England that hosted them",
        paragraphs: [
          "The pairing on this site is England 2021 because that final happened in that stadium. In a simulation Italy should look like a midfield that wants the ball and a forward line that attacks the first transition. England should look like wide overloads and a set piece. If Italy win, Donnarumma and Chiesa should be involved. If they lose, it should look like the 2nd-minute version of the final lasting ninety.",
          "Italy 2006 remains the World Cup page. This is the Euros page. Do not flatten both into ‘defensive Italy’. Mancini’s side actually wanted to play.",
        ],
      },
    ],
  ),
  "uruguay-1950": d(
    "López’s 1950 Uruguay walked into the Maracanã, heard 200,000 people assume the World Cup was already Brazil’s, and won 2–1. Friaça scored. Schiaffino equalised. Ghiggia scored the winner. Obdulio Varela was the captain who told the noise to wait. It was not a knockout final on paper — a final pool — but it is the final every history book means.",
    [
      {
        heading: "The Maracanazo, as a football match",
        paragraphs: [
          "Brazil needed a draw. Uruguay needed to win. Máspoli kept the first hour alive. Varela fouled, organised and refused the parade. Schiaffino’s equaliser was a footballer’s goal in a cathedral built for a coronation. Ghiggia’s winner at the near post is the last word: a winger, a near-post finish, a stadium that went quiet.",
          "Míguez, Morán, Andrade, Gambetta. A small country with a method that travelled. They had already beaten Spain and Sweden in the pool. The Brazil match is the one that ate the rest.",
        ],
      },
      {
        heading: "Against later Brazilian gods",
        paragraphs: [
          "The pairing on this site is Brazil 1970 because that is the argument people want: the wound versus the masterpiece. In a simulation Uruguay 1950 should look direct, stubborn and dangerous on the right. Brazil 1970 should look like combinations that do not care about the occasion. If Uruguay win, it should look like a break and a winger. If they lose, it should look like 1970 doing what 1950 Brazil could not.",
          "They belong here because the sport’s most famous silence is still a result, not a metaphor.",
        ],
      },
    ],
  ),
}
