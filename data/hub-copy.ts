export type HubCopy = {
  kicker: string
  title: string
  lead: string
  description: string
}

/** Unique hub titles/leads so /teams/{club} and /national-teams/{nation} are not hash-rotated templates. */
export const HUB_COPY: Record<string, HubCopy> = {
  barcelona: {
    kicker: "La Liga",
    title: "Barcelona squads: Guardiola, MSN, and the years we built",
    lead: "2008/09 invented the method. 2010/11 finished it at Wembley. 2014/15 was MSN winning another treble. The current dataset sits beside those sides without pretending to be them.",
    description:
      "Barcelona historical squads: Guardiola's trebles, Luis Enrique's MSN, and a modelled current XI. Open a season for the lineup, then simulate it.",
  },
  "real-madrid": {
    kicker: "La Liga",
    title: "Real Madrid squads: La Décima and the three-in-a-row",
    lead: "2013/14 is Ancelotti's Décima. 2016/17 is Zidane's third straight European Cup, with a bench that could change a knockout night. Those are different Madrid machines.",
    description:
      "Real Madrid playable seasons: the 2014 Décima side and Zidane's 2016/17 winners. Lineups, ratings, and a simulator — not a trophy dump.",
  },
  "atletico-madrid": {
    kicker: "La Liga",
    title: "Atlético Madrid: Simeone's league-winning blocks",
    lead: "2013/14 took the title from Barcelona and Madrid in the same winter. 2020/21 did it again with a different striker. Both pages are low-block sides, not a single recycled XI.",
    description:
      "Atlético Madrid squads under Simeone: 2013/14 champions and the 2020/21 sequel. Open a season for the XI, then run them against anyone.",
  },
  sevilla: {
    kicker: "La Liga",
    title: "Sevilla 2006/07: the first UEFA Cup of a dynasty",
    lead: "Ramos, Alves, Kanouté and a European night that stopped being a one-off. This hub is that side, not a complete Europa League museum.",
    description:
      "Sevilla 2006/07 squad: Alves, Kanouté, Navas and the UEFA Cup winners you can actually simulate.",
  },
  valencia: {
    kicker: "La Liga",
    title: "Valencia 2003/04: Benítez's league and UEFA Cup",
    lead: "Albelda and Baraja as the screen, Aimar as the spark, a double that still sits next to later Mestalla sides without being them.",
    description:
      "Valencia 2003/04: Benítez's Liga and UEFA Cup. Albelda, Baraja, Aimar — the double, not a later Mestalla side.",
  },
  "athletic-bilbao": {
    kicker: "La Liga",
    title: "Athletic Bilbao 1983/84: Clemente's Basque double",
    lead: "Goikoetxea, Zubizarreta, and a league-and-cup that still defines the club more than any later rebuild.",
    description:
      "Athletic Bilbao 1983/84: Clemente's double. Goikoetxea, Zubizarreta — Basque XI, not a later rebuild.",
  },
  "manchester-united": {
    kicker: "Premier League",
    title: "Manchester United squads: the treble and Moscow",
    lead: "1998/99 turned losing matches in minutes. 2007/08 had Ronaldo, Rooney and a Champions League won on penalties in Moscow. They are not the same Ferguson team with a new kit.",
    description:
      "Manchester United historical squads: 1998/99 treble winners and 2007/08 Moscow. Lineups, ratings, simulate either Ferguson peak.",
  },
  liverpool: {
    kicker: "Premier League",
    title: "Liverpool squads: Istanbul and the 2019 European Cup",
    lead: "2004/05 is the comeback that still distorts every later argument. 2018/19 is Klopp's full-press Champions League. Pick the question before you pick the shirt.",
    description:
      "Liverpool squads: Benítez's Istanbul side and Klopp's 2018/19 winners. Open a season, then simulate it against any era.",
  },
  arsenal: {
    kicker: "Premier League",
    title: "Arsenal squads: the Invincibles and Wenger's first double",
    lead: "1997/98 is the first Double, Overmars and Anelka still arriving. 2003/04 is the unbeaten league. Henry's Arsenal is two different machines.",
    description:
      "Arsenal historical squads: Wenger's 1997/98 Double and the 03/04 Invincibles. Lineups, ratings, simulate either side.",
  },
  chelsea: {
    kicker: "Premier League",
    title: "Chelsea squads: Mourinho's first title and Munich 2012",
    lead: "2004/05 parked, pressed in their own half, and took the league. 2011/12 won a Champions League in Bayern's stadium. Do not merge those two Chelses.",
    description:
      "Chelsea 04/05 and Chelsea 11/12: Mourinho's title XI and Di Matteo's knockout side. Separate seasons, same badge.",
  },
  "manchester-city": {
    kicker: "Premier League",
    title: "Manchester City squads: 100 points, then the treble",
    lead: "2017/18 was the video-game league season. 2022/23 added Europe and Haaland. Guardiola twice, two different tests.",
    description:
      "Manchester City squads: the 100-point 2017/18 side and the 2022/23 treble. Simulate either Guardiola peak.",
  },
  tottenham: {
    kicker: "Premier League",
    title: "Tottenham squads: 86 points, then a European final",
    lead: "2016/17 is Pochettino's league peak. 2018/19 reached Madrid. Kane and Son in two different arguments.",
    description:
      "Tottenham 2016/17 and 2018/19: Pochettino's 86-point side and the Champions League finalists. Playable XIs.",
  },
  everton: {
    kicker: "Premier League",
    title: "Everton 84/85: Kendall's title and Cup Winners' Cup",
    lead: "Southall, Sheedy, Sharp — a Merseyside side that briefly owned England in daylight, not a later Goodison rebuild.",
    description:
      "Everton 1984/85 squad, also searched as Everton 84/85: Kendall's champions. Lineup, ratings, simulate them.",
  },
  "leeds-united": {
    kicker: "Premier League",
    title: "Leeds United 1973/74: Revie's last title machine",
    lead: "Bremner and Giles as the engine, Hunter as the bite, Lorimer as the shot. The last First Division before the club's later weather.",
    description:
      "Leeds United 1973/74 squad: Revie's last title side. Bremner, Giles, Hunter — playable starting XI and ratings.",
  },
  "nottingham-forest": {
    kicker: "Premier League",
    title: "Nottingham Forest 1979/80: Clough retains the European Cup",
    lead: "Shilton, Robertson, Francis — a provincial miracle made to look ordinary, then done again in Madrid.",
    description:
      "Nottingham Forest 1979/80 squad: Clough's second European Cup. Lineup, ratings, simulate the retainers.",
  },
  newcastle: {
    kicker: "Premier League",
    title: "Newcastle 1995/96: Keegan's Entertainers",
    lead: "Ferdinand, Ginola, Beardsley, and a title race that still hurts. Not a later Premier League Newcastle.",
    description:
      "Newcastle 1995/96 squad: Keegan's Entertainers. Ferdinand, Ginola, Beardsley — simulate the title chase XI.",
  },
  "aston-villa": {
    kicker: "Premier League",
    title: "Aston Villa 1981/82: European Cup in Rotterdam",
    lead: "Withe, Cowans, Mortimer — a Midlands night that still sits in the cabinet, not a later Premier League Villa.",
    description:
      "Aston Villa 1981/82: Barton's Rotterdam winners. Withe, Cowans, a Midlands European Cup — not a later Premier League Villa.",
  },
  "ac-milan": {
    kicker: "Serie A",
    title: "AC Milan squads: Sacchi's press and Ancelotti's Athens",
    lead: "1988/89 compressed the pitch until opponents had nowhere clean to play. 2006/07 won the return in Athens with Pirlo and Kaká. Two European Cups, two ideas.",
    description:
      "AC Milan historical squads: Sacchi 1988/89 and Ancelotti 2006/07. Dutch trio or Christmas tree — simulate either.",
  },
  "inter-milan": {
    kicker: "Serie A",
    title: "Inter Milan squads: the record scudetto and the treble",
    lead: "1988/89 was Trapattoni's Matthäus–Klinsmann–Brehme title. 2009/10 was Mourinho winning Europe the hard way. The derby of Inter primes is not one decade.",
    description:
      "Inter Milan squads: 1988/89 record champions and Mourinho's 2010 treble. Lineups, ratings, simulate either peak.",
  },
  juventus: {
    kicker: "Serie A",
    title: "Juventus squads: Nedvěd's Ballon d'Or, then Cardiff",
    lead: "2002/03 is Lippi with Del Piero and Nedvěd. 2016/17 is Allegri's BBC defence and a Champions League final. Different Italian machines.",
    description:
      "Juventus 2002/03 and 2016/17: Lippi's Nedvěd side and Allegri's finalists. Open a season, then simulate it.",
  },
  napoli: {
    kicker: "Serie A",
    title: "Napoli squads: Maradona's first scudetto and 2023",
    lead: "1986/87 made a city the league. 2022/23 won it again with Kvaratskhelia and Osimhen, without needing that myth. Do not merge the two titles.",
    description:
      "Napoli 1986/87 and 2022/23: Maradona's first scudetto and Spalletti's sequel. Separate XIs, same city.",
  },
  "as-roma": {
    kicker: "Serie A",
    title: "Roma 2000/01: Capello, Totti, Batistuta",
    lead: "Totti as the idea, Batistuta as the finish, Cafu as the overlap. A Scudetto that still belongs to that exact midfield, not a later Roma.",
    description:
      "Roma 2000/01 squad: Capello's Scudetto winners. Totti, Batistuta, Cafu — lineup, ratings, simulate them.",
  },
  lazio: {
    kicker: "Serie A",
    title: "Lazio 1999/00: last-day Scudetto, Verón and Nedvěd",
    lead: "Eriksson's title on the final Sunday. Nesta as the wall, Salas as the finish, a Coppa in the same cabinet.",
    description:
      "Lazio 1999/00 squad: Eriksson's champions. Verón, Nedvěd, Nesta — playable Serie A XI.",
  },
  "bayern-munich": {
    kicker: "Bundesliga",
    title: "Bayern Munich squads: the 2013 treble and Flick's sextuple",
    lead: "Heynckes 2012/13 demolished Barcelona and won everything available. Flick 2019/20 did the pandemic sextuple. Width in two different decades.",
    description:
      "Bayern Munich 2012/13 and 2019/20: Heynckes' treble and Flick's sextuple. Simulate either German peak.",
  },
  "borussia-dortmund": {
    kicker: "Bundesliga",
    title: "Borussia Dortmund: Klopp's title, then the 2013 final",
    lead: "2010/11 is the domestic origin. 2012/13 is Lewandowski, Reus, and a Champions League final against Bayern. Kagawa's year and Reus's year are different football.",
    description:
      "Borussia Dortmund 2010/11 and 2012/13: Klopp's first title and the Wembley finalists. Gegenpress, playable.",
  },
  "bayer-leverkusen": {
    kicker: "Bundesliga",
    title: "Bayer Leverkusen 2023/24: Alonso's unbeaten title",
    lead: "Wirtz as the brain, Grimaldo as the left blade, a Bundesliga that stopped looking like Bayern's by default.",
    description:
      "Bayer Leverkusen 2023/24 squad: Xabi Alonso's unbeaten champions. Wirtz, Grimaldo, Xhaka — simulate them.",
  },
  "borussia-monchengladbach": {
    kicker: "Bundesliga",
    title: "Gladbach 1974/75: Weisweiler, Heynckes, Simonsen",
    lead: "When they were the German idea, not a footnote under Bayern. Heynckes finishing, Vogts captaining.",
    description:
      "Borussia Mönchengladbach 1974/75 squad: Weisweiler's champions. Playable Bundesliga XI and ratings.",
  },
  "paris-saint-germain": {
    kicker: "Ligue 1",
    title: "PSG squads: Neymar–Mbappé–Cavani, then Messi's year",
    lead: "2017/18 was Emery's league machine. 2022/23 added Messi to Neymar and Mbappé. Expensive in two different ways; Europe followed neither.",
    description:
      "Paris Saint-Germain 2017/18 and 2022/23: Cavani's trio and the Messi season. Lineups, ratings, simulate either.",
  },
  marseille: {
    kicker: "Ligue 1",
    title: "Marseille 1992/93: the European Cup in Munich",
    lead: "Desailly as the wall, Abedi Pelé as the spark, Boli's header. A French European Cup that still has an asterisk and a night.",
    description:
      "Marseille 1992/93 squad: Goethals' European Cup winners. Desailly, Pelé, Boli — simulate Munich.",
  },
  lyon: {
    kicker: "Ligue 1",
    title: "Lyon 2005/06: Juninho and a fifth straight title",
    lead: "Houllier's year in a run that made Ligue 1 look solved. Diarra screening, Juninho from the dead-ball.",
    description:
      "Lyon 2005/06 squad: Houllier's fifth straight champions. Juninho, Diarra, Malouda — playable XI.",
  },
  monaco: {
    kicker: "Ligue 1",
    title: "Monaco 2016/17: Mbappé exploding, a title on the break",
    lead: "Jardim, Falcao, Bernardo, and a teenager who left the league looking slow. Not a later Monaco.",
    description:
      "Monaco 2016/17 squad: Jardim's Ligue 1 winners. Mbappé, Falcao, Silva — simulate the title side.",
  },
  porto: {
    kicker: "Liga Portugal",
    title: "Porto squads: Mourinho's European Cup, then Villas-Boas",
    lead: "2003/04 won the Champions League from a mid-table Portuguese budget. 2010/11 won the Europa League. Both Dragões, not the same idea.",
    description:
      "Porto 2003/04 and 2010/11: Mourinho's European Cup and Villas-Boas' Europa League. Simulate either.",
  },
  benfica: {
    kicker: "Liga Portugal",
    title: "Benfica 1961/62: Eusébio, Guttmann, Amsterdam",
    lead: "A European Cup retained against Real Madrid. Coluna as the brain, Eusébio as the thunder.",
    description:
      "Benfica 1961/62 squad: Guttmann's retained European Cup. Eusébio, Coluna — lineup and ratings.",
  },
  sporting: {
    kicker: "Liga Portugal",
    title: "Sporting 2001/02: Jardel, João Pinto, a skinny winger",
    lead: "Bölöni's title. A teenage Ronaldo on the right, already leaving the page toward Manchester.",
    description:
      "Sporting 2001/02 squad: Bölöni's champions. Jardel, João Pinto, young Ronaldo — simulate them.",
  },
  ajax: {
    kicker: "Eredivisie",
    title: "Ajax squads: Van Gaal's children, then Ten Hag's Bernabéu",
    lead: "1994/95 went unbeaten in Europe as a young side. 2018/19 knocked Madrid out of their own stadium. Same school, different century.",
    description:
      "Ajax 1994/95 and 2018/19: Van Gaal's European Cup and Ten Hag's semi-finalists. Simulate either generation.",
  },
  psv: {
    kicker: "Eredivisie",
    title: "PSV 1987/88: Hiddink's European Cup on penalties",
    lead: "Koeman passing, Kieft finishing, Van Breukelen in goal. Eindhoven's European night, not Amsterdam's.",
    description:
      "PSV 1987/88 squad: Hiddink's European Cup winners. Lineup, ratings, simulate the penalty night.",
  },
  feyenoord: {
    kicker: "Eredivisie",
    title: "Feyenoord 1969/70: the first Dutch European Cup",
    lead: "Happel, Van Hanegem, Kindvall, Moulijn. Rotterdam before Ajax 95 became the default Dutch memory.",
    description:
      "Feyenoord 1969/70 squad: Happel's European Cup. Van Hanegem, Kindvall — playable XI.",
  },
  celtic: {
    kicker: "Scotland",
    title: "Celtic 1966/67: Lisbon Lions, all from 30 miles",
    lead: "Stein, Johnstone, Gemmell overlapping, Chalmers finishing. A European Cup won by a local side, not a later Celtic.",
    description:
      "Celtic 1966/67 squad: Stein's Lisbon Lions. European Cup XI, ratings, simulate them.",
  },
  rangers: {
    kicker: "Scotland",
    title: "Rangers 1992/93: McCoist, Laudrup, nine-in-a-row years",
    lead: "Smith's domestic machine. Goram as the wall, a Glasgow story that is not Lisbon.",
    description:
      "Rangers 1992/93 squad: Walter Smith's title side. McCoist, Laudrup, Goram — simulate them.",
  },
  "red-star": {
    kicker: "Rest of Europe",
    title: "Red Star 1990/91: European Cup in Bari",
    lead: "Prosinečki, Savićević, Pančev — a penalty shootout against Marseille that still gets put on grainy tape.",
    description:
      "Red Star 1990/91: Petrović's European Cup in Bari. Prosinečki, Savićević, Pančev — penalties against Marseille.",
  },
  steaua: {
    kicker: "Rest of Europe",
    title: "Steaua 1985/86: Duckadam's four saves in Seville",
    lead: "Belodedici as the sweeper, Hagi as the spark, a European Cup won without scoring in the final.",
    description:
      "Steaua 1985/86 squad: Jenei's European Cup. Duckadam, Hagi — simulate Seville.",
  },
  galatasaray: {
    kicker: "Rest of Europe",
    title: "Galatasaray 1999/00: UEFA Cup in Copenhagen",
    lead: "Terim, Hagi, Şükür, Taffarel. A Turkish European night that was not a footnote.",
    description:
      "Galatasaray 1999/00 squad: Terim's UEFA Cup winners. Hagi, Şükür — lineup and ratings.",
  },
  santos: {
    kicker: "South America",
    title: "Santos 1962: Pelé's club side that looked like a country",
    lead: "Coutinho, Pepe, an Intercontinental Cup. Not a modern Santos roster with the same badge.",
    description:
      "Santos 1962: Pelé, Coutinho, Pepe. Libertadores and Intercontinental — a club side that looked like a country.",
  },
  flamengo: {
    kicker: "South America",
    title: "Flamengo 1981: Zico's universe, a world title in Tokyo",
    lead: "Júnior overlapping, Nunes finishing, a Brazilian club night that still travels.",
    description:
      "Flamengo 1981 squad: Zico, Júnior, Nunes. World champions — simulate them against any era.",
  },
  "boca-juniors": {
    kicker: "South America",
    title: "Boca 2003: Riquelme's pause, a world title in Tokyo",
    lead: "Palermo finishing, Córdoba at the back. Bianchi's Boca as a club side, not just an Argentina shirt.",
    description:
      "Boca Juniors 2003 squad: Bianchi's world champions. Riquelme, Palermo — playable XI.",
  },
  "river-plate": {
    kicker: "South America",
    title: "River 2018: Gallardo, Madrid, a Libertadores in exile",
    lead: "Quintero's freeze-frame, Pratto's run. The Superclásico final played in Spain.",
    description:
      "River Plate 2018 squad: Gallardo's Libertadores winners. Quintero, Pratto — simulate Madrid.",
  },

  brazil: {
    kicker: "World Cups",
    title: "Brazil national teams: 1970, the 3Rs, and the nearly sides",
    lead: "1970 is the attacking argument. 2002 is the knockout machine. 1958 and 1962 are Pelé's first two. 1982 never lifted the trophy and still gets shouted about. Ratings stay in their year.",
    description:
      "Brazil World Cup squads: 1958, 1962, 1970, 1982, 1994, 2002. Open a year for the XI, then simulate Seleção vs anyone.",
  },
  argentina: {
    kicker: "World Cups",
    title: "Argentina: Maradona in Mexico, Messi in Qatar",
    lead: "1986 concentrated the decisive moments around one player. 2022 shared the load and still finished the job. Those are different Albiceleste ideas.",
    description:
      "Argentina 1986 and 2022 World Cup squads: Maradona's Mexico and Messi's Qatar. Simulate either winning XI.",
  },
  uruguay: {
    kicker: "World Cups",
    title: "Uruguay: Maracanazo 1950, then Tabárez in 2010",
    lead: "1950 still defines how a smaller country wrecks a host. 2010 is Suárez, Forlán, a semi-final. Two nuisances, sixty years apart.",
    description:
      "Uruguay 1950 and 2010: Maracanazo winners and Tabárez's semi-finalists. National-team XIs, playable.",
  },
  colombia: {
    kicker: "World Cups",
    title: "Colombia: Valderrama's 1994, James's 2014",
    lead: "Two tournaments, two playmakers. Not a complete Copa archive — the nights people still type.",
    description:
      "Colombia 1994 and 2014 World Cup squads: Valderrama and James Rodríguez. Simulate either Golden generation.",
  },
  chile: {
    kicker: "Copa América",
    title: "Chile 2015: Sampaoli's press, a first Copa at home",
    lead: "Vidal as the engine, Alexis as the blade. A home tournament won by hunting, not a later Chile.",
    description:
      "Chile 2015 squad: Sampaoli's Copa América winners. Pressing XI, ratings, simulate them.",
  },
  france: {
    kicker: "World Cups & Euros",
    title: "France: Platini, Zidane at home, Mbappé in Russia",
    lead: "1984 is the Carré Magique. 1998 is Jacquet's home World Cup. 2018 is Deschamps winning as manager. Same federation, three footballs.",
    description:
      "France 1984, 1998 and 2018: Platini's Euros, Zidane's home World Cup, Mbappé's Russia. Simulate any of them.",
  },
  spain: {
    kicker: "World Cups & Euros",
    title: "Spain: tiki-taka at a World Cup, then 2012",
    lead: "2010 is Johannesburg. 2012 is the Euros encore. Del Bosque twice; the midfield was the event.",
    description:
      "Spain 2010 and 2012: World Cup and Euros winners. Xavi, Iniesta, Casillas — simulate either tiki-taka side.",
  },
  germany: {
    kicker: "World Cups",
    title: "Germany: Beckenbauer 1990, Löw 2014",
    lead: "1990 is West Germany, sweeper, Matthäus through the middle. 2014 is a 7–1 and a positional World Cup. Klinsmann 2006 is the home-tournament chapter.",
    description:
      "Germany 1990 and 2014 World Cup squads: Beckenbauer's winners and Löw's Brazil tournament. Playable XIs.",
  },
  italy: {
    kicker: "World Cups & Euros",
    title: "Italy: Berlin 2006, then Mancini's Euros",
    lead: "2006 is Cannavaro, Pirlo, a shootout after Zidane's red. 2021 is a different Azzurri, Wembley, a European Championship.",
    description:
      "Italy 2006 and 2021: Lippi's World Cup and Mancini's Euros. Defensive craft in two decades — simulate either.",
  },
  netherlands: {
    kicker: "World Cups & Euros",
    title: "Netherlands: Total Football 1974, the 1988 trophy",
    lead: "1974 changed how coaches talk about space and lost the final. 1988 actually lifted one. 2010 is the Johannesburg finalists. Do not merge Cruyff and Van Basten.",
    description:
      "Netherlands 1974, 1988 and 2010: Michels, Van Basten's Euros, the 2010 finalists. Simulate Total Football or the winners.",
  },
  england: {
    kicker: "World Cups",
    title: "England: 1966 at Wembley, a modelled 2026 cycle",
    lead: "Ramsey's wingless wonders remain the only World Cup. 2026 is a modelled starting XI — Kane, Bellingham, Saka — not an official FIFA list. Later tournament pages sit noindex until they have a dossier.",
    description:
      "England 1966 World Cup squad and a modelled England 2026 XI. Open a year for the lineup, then simulate it.",
  },
  portugal: {
    kicker: "Euros",
    title: "Portugal 2016: Santos, Éder, a Euros won ugly",
    lead: "Not the 2004 home final they lost. The tournament they actually finished in France, with Ronaldo leaving the final early.",
    description:
      "Portugal 2016 Euros squad: European champions. Ronaldo, Pepe, a playable knockout XI.",
  },
  croatia: {
    kicker: "World Cups",
    title: "Croatia 2018: Modrić, extra time, a World Cup final",
    lead: "Dalić's Moscow finalists — not Šuker's 1998 bronze, not a 2026 cycle. A midfield that arrived already tired and still reached the last night.",
    description:
      "Croatia 2018 World Cup squad: finalists. Modrić, Rakitić, Mandžukić — simulate the Moscow side.",
  },
  belgium: {
    kicker: "World Cups",
    title: "Belgium 2018: the golden generation's semi-final",
    lead: "De Bruyne, Hazard, Lukaku — a World Cup that still asks whether that midfield was wasted. 1986 is the older near-miss.",
    description:
      "Belgium 2018 World Cup squad: Hazard, De Bruyne, Lukaku. Golden generation XI, ratings, playable.",
  },
  hungary: {
    kicker: "World Cups",
    title: "Hungary 1954: Mighty Magyars, a final they were supposed to win",
    lead: "Puskás, Hidegkuti, a defeat that changed how greatness is remembered. Not a later Hungary.",
    description:
      "Hungary 1954 World Cup squad: the Mighty Magyars. Puskás, Hidegkuti — simulate the finalists.",
  },
  denmark: {
    kicker: "Euros",
    title: "Denmark 1992: late invite, European champions",
    lead: "Møller Nielsen, Schmeichel, the Laudrup question. A Euros won after a fax, not a later Danish cycle.",
    description:
      "Denmark 1992 Euros squad: shock European champions. Schmeichel, the starting XI you can simulate.",
  },
  sweden: {
    kicker: "World Cups",
    title: "Sweden 1994: bronze, Dahlin, Brolin, Ravelli",
    lead: "A World Cup third place in the United States that still outranks later Swedish summers.",
    description:
      "Sweden 1994 World Cup squad: bronze medallists. Dahlin, Brolin, Ravelli — playable XI.",
  },
  greece: {
    kicker: "Euros",
    title: "Greece 2004: Rehhagel, Charisteas, Lisbon",
    lead: "Zagorakis as captain, a Euros won the ugly way that still looks like a miracle. Not a later Greek side.",
    description:
      "Greece 2004 Euros squad: Rehhagel's winners. Charisteas, Zagorakis — simulate Lisbon.",
  },
  turkey: {
    kicker: "World Cups",
    title: "Turkey 2002: Şükür, bronze, a third-place that still sings",
    lead: "Güneş, Rüştü, a World Cup that was not a cameo. Semi-finalists, then bronze.",
    description:
      "Turkey 2002 World Cup squad: bronze medallists. Şükür, Rüştü — lineup, ratings, playable.",
  },
  czechia: {
    kicker: "Euros",
    title: "Czechia 1996: Poborský's lob, a Euros final in England",
    lead: "Nedvěd as the engine, Berger as the left foot. Uhrin's side, not a later Czech tournament.",
    description:
      "Czechia 1996 Euros squad: finalists. Poborský, Nedvěd — simulate Wembley.",
  },
  wales: {
    kicker: "Euros",
    title: "Wales 2016: Bale, Ramsey, a run to the last four",
    lead: "Coleman's summer. Williams as the wall. Not a later Wales, and not a World Cup page we have not built.",
    description:
      "Wales 2016 Euros squad: semi-finalists. Bale, Ramsey, Williams — playable XI.",
  },
  mexico: {
    kicker: "World Cups",
    title: "Mexico 1986: Hugo Sánchez, a home quarter-final",
    lead: "Bora, Negrete's volley, a World Cup on home grass that reached the last eight.",
    description:
      "Mexico 1986 World Cup squad: home quarter-finalists. Sánchez, Negrete — simulate them.",
  },
  usa: {
    kicker: "World Cups",
    title: "United States 2002: Donovan, a quarter-final in Korea",
    lead: "Arena, Reyna, Friedel. A knockout that still surprises people who only remember later cycles.",
    description:
      "USA 2002 World Cup squad: quarter-finalists. Donovan, Reyna — playable national-team XI.",
  },
  morocco: {
    kicker: "World Cups",
    title: "Morocco 2022: first African World Cup semi-final",
    lead: "Regragui, Amrabat as the screen, Hakimi as the outlet, Bono as the wall.",
    description:
      "Morocco 2022 World Cup squad: semi-finalists. Hakimi, Amrabat, Bono — simulate the Atlas XI.",
  },
  senegal: {
    kicker: "World Cups",
    title: "Senegal 2002: they beat France, then the last eight",
    lead: "Metsu, Diouf, Fadiga, Papa Bouba Diop. A first World Cup that was not a cameo.",
    description:
      "Senegal 2002: they beat France 1–0, then the last eight. Diouf, Fadiga, Papa Bouba Diop — Metsu's first World Cup.",
  },
  nigeria: {
    kicker: "World Cups",
    title: "Nigeria 1994: Super Eagles, Yekini, Okocha",
    lead: "Westerhof's World Cup that announced Nigeria. Finidi as the width. Not a later Super Eagles.",
    description:
      "Nigeria 1994 World Cup squad: Yekini, Okocha, Finidi. Playable Super Eagles XI.",
  },
  cameroon: {
    kicker: "World Cups",
    title: "Cameroon 1990: Milla, a quarter-final that rattled Italy",
    lead: "N'Kono, Omam-Biyik, a World Cup that changed who Europe thought could win.",
    description:
      "Cameroon 1990 World Cup squad: quarter-finalists. Milla, N'Kono — simulate Italia 90.",
  },
  japan: {
    kicker: "World Cups",
    title: "Japan 2002: first knockout round on home grass",
    lead: "Troussier, Nakata, Nakamura, Inamoto. Co-hosts who stopped being a footnote.",
    description:
      "Japan 2002 World Cup squad: home knockout side. Nakata, Inamoto — playable XI.",
  },
  "south-korea": {
    kicker: "World Cups",
    title: "South Korea 2002: Hiddink, a semi-final that still owns a country",
    lead: "Park as the engine, Hong as captain, Lee Woon-jae. Co-hosts, not a later Taegeuk page.",
    description:
      "South Korea 2002 World Cup squad: semi-finalists. Park Ji-sung, Hong Myung-bo — simulate them.",
  },
}
