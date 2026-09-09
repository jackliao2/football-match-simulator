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
      "Barcelona squads: Guardiola's 2008/09 treble, the 2010/11 false nine at Wembley, Luis Enrique's MSN. The current dataset sits beside them without being them.",
  },
  "real-madrid": {
    kicker: "La Liga",
    title: "Real Madrid squads: La Décima and the three-in-a-row",
    lead: "2013/14 is Ancelotti's Décima. 2016/17 is Zidane's third straight European Cup, with a bench that could change a knockout night. Those are different Madrid machines.",
    description:
      "Real Madrid 2013/14 is Ancelotti's Décima. 2016/17 is Zidane's third straight European Cup. Two machines, not a trophy dump.",
  },
  "atletico-madrid": {
    kicker: "La Liga",
    title: "Atlético Madrid: Simeone's league-winning blocks",
    lead: "2013/14 took the title from Barcelona and Madrid in the same winter. 2020/21 did it again with a different striker. Both pages are low-block sides, not a single recycled XI.",
    description:
      "Atlético 2013/14 took the title from Barcelona and Madrid. 2020/21 did it again with a different striker. Two low-block sides, not one recycled XI.",
  },
  sevilla: {
    kicker: "La Liga",
    title: "Sevilla 2006/07: the first UEFA Cup of a dynasty",
    lead: "Ramos, Alves, Kanouté and a European night that stopped being a one-off. This hub is that side, not a complete Europa League museum.",
    description:
      "Sevilla 2006/07: Ramos, Alves, Kanouté and the first UEFA Cup of a dynasty — not a complete Europa League museum.",
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
      "Manchester United 1998/99 treble and 2007/08 Moscow. Two Ferguson peaks, not the same team with a new kit.",
  },
  liverpool: {
    kicker: "Premier League",
    title: "Liverpool squads: Istanbul and the 2019 European Cup",
    lead: "2004/05 is the comeback that still distorts every later argument. 2018/19 is Klopp's full-press Champions League. Pick the question before you pick the shirt.",
    description:
      "Liverpool 2004/05 is Istanbul. 2018/19 is Klopp's full-press Champions League. Pick the question before you pick the shirt.",
  },
  arsenal: {
    kicker: "Premier League",
    title: "Arsenal squads: the Invincibles and Wenger's first double",
    lead: "1997/98 is the first Double, Overmars and Anelka still arriving. 2003/04 is the unbeaten league. Henry's Arsenal is two different machines.",
    description:
      "Arsenal 1997/98 is Wenger's first Double. 2003/04 is the unbeaten league. Henry's Arsenal is two different machines.",
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
      "Manchester City 2017/18 was the 100-point league season. 2022/23 added Europe and Haaland. Guardiola twice, two different tests.",
  },
  tottenham: {
    kicker: "Premier League",
    title: "Tottenham squads: 86 points, then a European final",
    lead: "2016/17 is Pochettino's league peak. 2018/19 reached Madrid. Kane and Son in two different arguments.",
    description:
      "Tottenham 2016/17 is Pochettino's 86-point league peak. 2018/19 reached Madrid. Kane and Son in two different arguments.",
  },
  everton: {
    kicker: "Premier League",
    title: "Everton 84/85: Kendall's title and Cup Winners' Cup",
    lead: "Southall, Sheedy, Sharp — a Merseyside side that briefly owned England in daylight, not a later Goodison rebuild.",
    description:
      "Everton 1984/85: Kendall's title and Cup Winners' Cup. Southall, Sheedy, Sharp — Merseyside that briefly owned England.",
  },
  "leeds-united": {
    kicker: "Premier League",
    title: "Leeds United 1973/74: Revie's last title machine",
    lead: "Bremner and Giles as the engine, Hunter as the bite, Lorimer as the shot. The last First Division before the club's later weather.",
    description:
      "Leeds 1973/74: Revie's last title. Bremner and Giles as the engine, Hunter as the bite — the last First Division before the later weather.",
  },
  "nottingham-forest": {
    kicker: "Premier League",
    title: "Nottingham Forest 1979/80: Clough retains the European Cup",
    lead: "Shilton, Robertson, Francis — a provincial miracle made to look ordinary, then done again in Madrid.",
    description:
      "Forest 1979/80: Clough retaining the European Cup in Madrid. Shilton, Robertson, Francis — not the first-win side.",
  },
  newcastle: {
    kicker: "Premier League",
    title: "Newcastle 1995/96: Keegan's Entertainers",
    lead: "Ferdinand, Ginola, Beardsley, and a title race that still hurts. Not a later Premier League Newcastle.",
    description:
      "Newcastle 1995/96: Keegan's Entertainers. Ferdinand, Ginola, Beardsley, and a title race that still hurts.",
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
      "AC Milan 1988/89 compressed the pitch. 2006/07 won Athens with Pirlo and Kaká. Two European Cups, two ideas.",
  },
  "inter-milan": {
    kicker: "Serie A",
    title: "Inter Milan squads: the record scudetto and the treble",
    lead: "1988/89 was Trapattoni's Matthäus–Klinsmann–Brehme title. 2009/10 was Mourinho winning Europe the hard way. The derby of Inter primes is not one decade.",
    description:
      "Inter 1988/89 is Trapattoni's record scudetto. 2009/10 is Mourinho's treble. The derby of Inter primes is not one decade.",
  },
  juventus: {
    kicker: "Serie A",
    title: "Juventus squads: Nedvěd's Ballon d'Or, then Cardiff",
    lead: "2002/03 is Lippi with Del Piero and Nedvěd. 2016/17 is Allegri's BBC defence and a Champions League final. Different Italian machines.",
    description:
      "Juventus 2002/03 is Lippi with Nedvěd's Ballon d'Or. 2016/17 is Allegri's BBC defence and Cardiff. Different Italian machines.",
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
      "Roma 2000/01: Capello, Totti, Batistuta, Cafu. A Scudetto that still belongs to that midfield, not a later Roma.",
  },
  lazio: {
    kicker: "Serie A",
    title: "Lazio 1999/00: last-day Scudetto, Verón and Nedvěd",
    lead: "Eriksson's title on the final Sunday. Nesta as the wall, Salas as the finish, a Coppa in the same cabinet.",
    description:
      "Lazio 1999/00: Eriksson's last-day Scudetto. Verón, Nedvěd, Nesta as the wall — a Coppa in the same cabinet.",
  },
  "bayern-munich": {
    kicker: "Bundesliga",
    title: "Bayern Munich squads: the 2013 treble and Flick's sextuple",
    lead: "Heynckes 2012/13 demolished Barcelona and won everything available. Flick 2019/20 did the pandemic sextuple. Width in two different decades.",
    description:
      "Bayern 2012/13 is Heynckes winning everything available. 2019/20 is Flick's pandemic sextuple. Width in two different decades.",
  },
  "borussia-dortmund": {
    kicker: "Bundesliga",
    title: "Borussia Dortmund: Klopp's title, then the 2013 final",
    lead: "2010/11 is the domestic origin. 2012/13 is Lewandowski, Reus, and a Champions League final against Bayern. Kagawa's year and Reus's year are different football.",
    description:
      "Dortmund 2010/11 is Klopp's domestic origin. 2012/13 is Lewandowski, Reus, and a Champions League final against Bayern.",
  },
  "bayer-leverkusen": {
    kicker: "Bundesliga",
    title: "Bayer Leverkusen 2023/24: Alonso's unbeaten title",
    lead: "Wirtz as the brain, Grimaldo as the left blade, a Bundesliga that stopped looking like Bayern's by default.",
    description:
      "Leverkusen 2023/24: Alonso's unbeaten title. Wirtz as the brain, Grimaldo as the left blade — a Bundesliga that stopped looking like Bayern's.",
  },
  "borussia-monchengladbach": {
    kicker: "Bundesliga",
    title: "Gladbach 1974/75: Weisweiler, Heynckes, Simonsen",
    lead: "When they were the German idea, not a footnote under Bayern. Heynckes finishing, Vogts captaining.",
    description:
      "Gladbach 1974/75: Weisweiler, Heynckes, Simonsen. When they were the German idea, not a footnote under Bayern.",
  },
  "paris-saint-germain": {
    kicker: "Ligue 1",
    title: "PSG squads: Neymar–Mbappé–Cavani, then Messi's year",
    lead: "2017/18 was Emery's league machine. 2022/23 added Messi to Neymar and Mbappé. Expensive in two different ways; Europe followed neither.",
    description:
      "PSG 2017/18 was Emery's league machine. 2022/23 added Messi to Neymar and Mbappé. Expensive in two different ways; Europe followed neither.",
  },
  marseille: {
    kicker: "Ligue 1",
    title: "Marseille 1992/93: the European Cup in Munich",
    lead: "Desailly as the wall, Abedi Pelé as the spark, Boli's header. A French European Cup that still has an asterisk and a night.",
    description:
      "Marseille 1992/93: Desailly as the wall, Abedi Pelé as the spark, Boli's header in Munich. A French European Cup with an asterisk and a night.",
  },
  lyon: {
    kicker: "Ligue 1",
    title: "Lyon 2005/06: Juninho and a fifth straight title",
    lead: "Houllier's year in a run that made Ligue 1 look solved. Diarra screening, Juninho from the dead-ball.",
    description:
      "Lyon 2005/06: Houllier's fifth straight title. Juninho from the dead-ball, Diarra screening — Ligue 1 looking solved.",
  },
  monaco: {
    kicker: "Ligue 1",
    title: "Monaco 2016/17: Mbappé exploding, a title on the break",
    lead: "Jardim, Falcao, Bernardo, and a teenager who left the league looking slow. Not a later Monaco.",
    description:
      "Monaco 2016/17: Jardim, Falcao, Bernardo, and a teenager who left the league looking slow. Not a later Monaco.",
  },
  porto: {
    kicker: "Liga Portugal",
    title: "Porto squads: Mourinho's European Cup, then Villas-Boas",
    lead: "2003/04 won the Champions League from a mid-table Portuguese budget. 2010/11 won the Europa League. Both Dragões, not the same idea.",
    description:
      "Porto 2003/04 won the Champions League from a mid-table budget. 2010/11 won the Europa League. Both Dragões, not the same idea.",
  },
  benfica: {
    kicker: "Liga Portugal",
    title: "Benfica 1961/62: Eusébio, Guttmann, Amsterdam",
    lead: "A European Cup retained against Real Madrid. Coluna as the brain, Eusébio as the thunder.",
    description:
      "Benfica 1961/62: Eusébio as the thunder, Coluna as the brain, a European Cup retained against Real Madrid in Amsterdam.",
  },
  sporting: {
    kicker: "Liga Portugal",
    title: "Sporting 2001/02: Jardel, João Pinto, a skinny winger",
    lead: "Bölöni's title. A teenage Ronaldo on the right, already leaving the page toward Manchester.",
    description:
      "Sporting 2001/02: Bölöni's title. Jardel, João Pinto, a teenage Ronaldo already leaving the page toward Manchester.",
  },
  ajax: {
    kicker: "Eredivisie",
    title: "Ajax squads: Van Gaal's children, then Ten Hag's Bernabéu",
    lead: "1994/95 went unbeaten in Europe as a young side. 2018/19 knocked Madrid out of their own stadium. Same school, different century.",
    description:
      "Ajax 1994/95 went unbeaten in Europe as a young side. 2018/19 knocked Madrid out of their own stadium. Same school, different century.",
  },
  psv: {
    kicker: "Eredivisie",
    title: "PSV 1987/88: Hiddink's European Cup on penalties",
    lead: "Koeman passing, Kieft finishing, Van Breukelen in goal. Eindhoven's European night, not Amsterdam's.",
    description:
      "PSV 1987/88: Hiddink's European Cup on penalties. Koeman passing, Kieft finishing — Eindhoven's night, not Amsterdam's.",
  },
  feyenoord: {
    kicker: "Eredivisie",
    title: "Feyenoord 1969/70: the first Dutch European Cup",
    lead: "Happel, Van Hanegem, Kindvall, Moulijn. Rotterdam before Ajax 95 became the default Dutch memory.",
    description:
      "Feyenoord 1969/70: Happel's first Dutch European Cup. Van Hanegem, Kindvall, Moulijn — Rotterdam before Ajax 95 became the default.",
  },
  celtic: {
    kicker: "Scotland",
    title: "Celtic 1966/67: Lisbon Lions, all from 30 miles",
    lead: "Stein, Johnstone, Gemmell overlapping, Chalmers finishing. A European Cup won by a local side, not a later Celtic.",
    description:
      "Celtic 1966/67: Stein's Lisbon Lions, all from 30 miles. Johnstone, Gemmell overlapping, Chalmers finishing — not a later Celtic.",
  },
  rangers: {
    kicker: "Scotland",
    title: "Rangers 1992/93: McCoist, Laudrup, nine-in-a-row years",
    lead: "Smith's domestic machine. Goram as the wall, a Glasgow story that is not Lisbon.",
    description:
      "Rangers 1992/93: Walter Smith's domestic machine. McCoist, Laudrup, Goram as the wall — a Glasgow story that is not Lisbon.",
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
      "Steaua 1985/86: Duckadam's four saves in Seville. Belodedici as the sweeper, Hagi as the spark — a European Cup without a final goal.",
  },
  galatasaray: {
    kicker: "Rest of Europe",
    title: "Galatasaray 1999/00: UEFA Cup in Copenhagen",
    lead: "Terim, Hagi, Şükür, Taffarel. A Turkish European night that was not a footnote.",
    description:
      "Galatasaray 1999/00: Terim's UEFA Cup in Copenhagen. Hagi, Şükür, Taffarel — a Turkish European night that was not a footnote.",
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
      "Flamengo 1981: Zico's universe, Júnior overlapping, Nunes finishing. A world title in Tokyo that still travels.",
  },
  "boca-juniors": {
    kicker: "South America",
    title: "Boca 2003: Riquelme's pause, a world title in Tokyo",
    lead: "Palermo finishing, Córdoba at the back. Bianchi's Boca as a club side, not just an Argentina shirt.",
    description:
      "Boca 2003: Bianchi, Riquelme's pause, Palermo finishing. A world title in Tokyo as a club side, not just an Argentina shirt.",
  },
  "river-plate": {
    kicker: "South America",
    title: "River 2018: Gallardo, Madrid, a Libertadores in exile",
    lead: "Quintero's freeze-frame, Pratto's run. The Superclásico final played in Spain.",
    description:
      "River 2018: Gallardo's Libertadores in exile. Quintero's freeze-frame, Pratto's run — the Superclásico final played in Spain.",
  },

  brazil: {
    kicker: "World Cups",
    title: "Brazil national teams: 1970, the 3Rs, and the nearly sides",
    lead: "1970 is the attacking argument. 2002 is the knockout machine. 1958 and 1962 are Pelé's first two. 1982 never lifted the trophy and still gets shouted about. Ratings stay in their year.",
    description:
      "Brazil World Cup sides: 1970 is the attacking argument, 2002 the knockout machine, 1982 the nearly side that still gets shouted about. Ratings stay in their year.",
  },
  argentina: {
    kicker: "World Cups",
    title: "Argentina: Maradona in Mexico, Messi in Qatar",
    lead: "1986 concentrated the decisive moments around one player. 2022 shared the load and still finished the job. Those are different Albiceleste ideas.",
    description:
      "Argentina 1986 concentrated the decisive moments around Maradona. 2022 shared the load and still finished the job. Different Albiceleste ideas.",
  },
  uruguay: {
    kicker: "World Cups",
    title: "Uruguay: Maracanazo 1950, then Tabárez in 2010",
    lead: "1950 still defines how a smaller country wrecks a host. 2010 is Suárez, Forlán, a semi-final. Two nuisances, sixty years apart.",
    description:
      "Uruguay 1950 still defines how a smaller country wrecks a host. 2010 is Suárez, Forlán, a semi-final. Two nuisances, sixty years apart.",
  },
  colombia: {
    kicker: "World Cups",
    title: "Colombia: Valderrama's 1994, James's 2014",
    lead: "Two tournaments, two playmakers. Not a complete Copa archive — the nights people still type.",
    description:
      "Colombia 1994 is Valderrama. 2014 is James. Two tournaments, two playmakers — not a complete Copa archive.",
  },
  chile: {
    kicker: "Copa América",
    title: "Chile 2015: Sampaoli's press, a first Copa at home",
    lead: "Vidal as the engine, Alexis as the blade. A home tournament won by hunting, not a later Chile.",
    description:
      "Chile 2015: Sampaoli's press, Vidal as the engine, Alexis as the blade. A first Copa at home won by hunting, not a later Chile.",
  },
  france: {
    kicker: "World Cups & Euros",
    title: "France: Platini, Zidane at home, Mbappé in Russia",
    lead: "1984 is the Carré Magique. 1998 is Jacquet's home World Cup. 2018 is Deschamps winning as manager. Same federation, three footballs.",
    description:
      "France 1984 is the Carré Magique. 1998 is Jacquet's home World Cup. 2018 is Deschamps winning as manager. Same federation, three footballs.",
  },
  spain: {
    kicker: "World Cups & Euros",
    title: "Spain: tiki-taka at a World Cup, then 2012",
    lead: "2010 is Johannesburg. 2012 is the Euros encore. Del Bosque twice; the midfield was the event.",
    description:
      "Spain 2010 is Johannesburg. 2012 is the Euros encore. Del Bosque twice; the midfield was the event.",
  },
  germany: {
    kicker: "World Cups",
    title: "Germany: Beckenbauer 1990, Löw 2014",
    lead: "1990 is West Germany, sweeper, Matthäus through the middle. 2014 is a 7–1 and a positional World Cup. Klinsmann 2006 is the home-tournament chapter.",
    description:
      "Germany 1990 is West Germany, sweeper, Matthäus. 2014 is a 7–1 and a positional World Cup. Klinsmann 2006 is the home chapter.",
  },
  italy: {
    kicker: "World Cups & Euros",
    title: "Italy: Berlin 2006, then Mancini's Euros",
    lead: "2006 is Cannavaro, Pirlo, a shootout after Zidane's red. 2021 is a different Azzurri, Wembley, a European Championship.",
    description:
      "Italy 2006 is Cannavaro, Pirlo, a shootout after Zidane's red. 2021 is Mancini's Euros at Wembley. Defensive craft in two decades.",
  },
  netherlands: {
    kicker: "World Cups & Euros",
    title: "Netherlands: Total Football 1974, the 1988 trophy",
    lead: "1974 changed how coaches talk about space and lost the final. 1988 actually lifted one. 2010 is the Johannesburg finalists. Do not merge Cruyff and Van Basten.",
    description:
      "Netherlands 1974 changed how coaches talk about space and lost the final. 1988 actually lifted one. Do not merge Cruyff and Van Basten.",
  },
  england: {
    kicker: "World Cups",
    title: "England: 1966 at Wembley, a modelled 2026 cycle",
    lead: "Ramsey's wingless wonders remain the only World Cup. 2026 is a modelled starting XI — Kane, Bellingham, Saka — not an official FIFA list. Later tournament pages sit noindex until they have a dossier.",
    description:
      "England 1966 at Wembley remains the only World Cup. 2026 is a modelled XI — Kane, Bellingham, Saka — not an official FIFA list.",
  },
  portugal: {
    kicker: "Euros",
    title: "Portugal 2016: Santos, Éder, a Euros won ugly",
    lead: "Not the 2004 home final they lost. The tournament they actually finished in France, with Ronaldo leaving the final early.",
    description:
      "Portugal 2016: Santos, Éder, a Euros won ugly in France. Not the 2004 home final they lost. Ronaldo left the final early.",
  },
  croatia: {
    kicker: "World Cups",
    title: "Croatia 2018: Modrić, extra time, a World Cup final",
    lead: "Dalić's Moscow finalists — not Šuker's 1998 bronze, not a 2026 cycle. A midfield that arrived already tired and still reached the last night.",
    description:
      "Croatia 2018: Modrić, extra time, a World Cup final in Moscow. Not Šuker's 1998 bronze, not a 2026 cycle.",
  },
  belgium: {
    kicker: "World Cups",
    title: "Belgium 2018: the golden generation's semi-final",
    lead: "De Bruyne, Hazard, Lukaku — a World Cup that still asks whether that midfield was wasted. 1986 is the older near-miss.",
    description:
      "Belgium 2018: De Bruyne, Hazard, Lukaku — a World Cup that still asks whether that midfield was wasted. 1986 is the older near-miss.",
  },
  hungary: {
    kicker: "World Cups",
    title: "Hungary 1954: Mighty Magyars, a final they were supposed to win",
    lead: "Puskás, Hidegkuti, a defeat that changed how greatness is remembered. Not a later Hungary.",
    description:
      "Hungary 1954: Mighty Magyars, Puskás, Hidegkuti, a final they were supposed to win. A defeat that changed how greatness is remembered.",
  },
  denmark: {
    kicker: "Euros",
    title: "Denmark 1992: late invite, European champions",
    lead: "Møller Nielsen, Schmeichel, the Laudrup question. A Euros won after a fax, not a later Danish cycle.",
    description:
      "Denmark 1992: late invite, Schmeichel, a Euros won after a fax. Møller Nielsen's shock, not a later Danish cycle.",
  },
  sweden: {
    kicker: "World Cups",
    title: "Sweden 1994: bronze, Dahlin, Brolin, Ravelli",
    lead: "A World Cup third place in the United States that still outranks later Swedish summers.",
    description:
      "Sweden 1994: bronze in the United States. Dahlin, Brolin, Ravelli — a third place that still outranks later Swedish summers.",
  },
  greece: {
    kicker: "Euros",
    title: "Greece 2004: Rehhagel, Charisteas, Lisbon",
    lead: "Zagorakis as captain, a Euros won the ugly way that still looks like a miracle. Not a later Greek side.",
    description:
      "Greece 2004: Rehhagel, Charisteas in Lisbon, Zagorakis as captain. A Euros won the ugly way that still looks like a miracle.",
  },
  turkey: {
    kicker: "World Cups",
    title: "Turkey 2002: Şükür, bronze, a third-place that still sings",
    lead: "Güneş, Rüştü, a World Cup that was not a cameo. Semi-finalists, then bronze.",
    description:
      "Turkey 2002: Şükür, Rüştü, bronze. Güneş's World Cup that was not a cameo — semi-finalists, then third.",
  },
  czechia: {
    kicker: "Euros",
    title: "Czechia 1996: Poborský's lob, a Euros final in England",
    lead: "Nedvěd as the engine, Berger as the left foot. Uhrin's side, not a later Czech tournament.",
    description:
      "Czechia 1996: Poborský's lob, Nedvěd as the engine, a Euros final in England. Uhrin's side, not a later Czech tournament.",
  },
  wales: {
    kicker: "Euros",
    title: "Wales 2016: Bale, Ramsey, a run to the last four",
    lead: "Coleman's summer. Williams as the wall. Not a later Wales, and not a World Cup page we have not built.",
    description:
      "Wales 2016: Bale, Ramsey, Williams as the wall. Coleman's run to the last four — not a later Wales, and not a World Cup page we have not built.",
  },
  mexico: {
    kicker: "World Cups",
    title: "Mexico 1986: Hugo Sánchez, a home quarter-final",
    lead: "Bora, Negrete's volley, a World Cup on home grass that reached the last eight.",
    description:
      "Mexico 1986: Hugo Sánchez, Negrete's volley, a home quarter-final. Bora's World Cup on home grass.",
  },
  usa: {
    kicker: "World Cups",
    title: "United States 2002: Donovan, a quarter-final in Korea",
    lead: "Arena, Reyna, Friedel. A knockout that still surprises people who only remember later cycles.",
    description:
      "United States 2002: Donovan, Reyna, Friedel. Arena's quarter-final in Korea that still surprises later cycles.",
  },
  morocco: {
    kicker: "World Cups",
    title: "Morocco 2022: first African World Cup semi-final",
    lead: "Regragui, Amrabat as the screen, Hakimi as the outlet, Bono as the wall.",
    description:
      "Morocco 2022: first African World Cup semi-final. Regragui, Amrabat as the screen, Hakimi as the outlet, Bono as the wall.",
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
      "Nigeria 1994: Westerhof's Super Eagles. Yekini, Okocha, Finidi as the width — a World Cup that announced Nigeria.",
  },
  cameroon: {
    kicker: "World Cups",
    title: "Cameroon 1990: Milla, a quarter-final that rattled Italy",
    lead: "N'Kono, Omam-Biyik, a World Cup that changed who Europe thought could win.",
    description:
      "Cameroon 1990: Milla, N'Kono, Omam-Biyik. A quarter-final that rattled Italy and changed who Europe thought could win.",
  },
  japan: {
    kicker: "World Cups",
    title: "Japan 2002: first knockout round on home grass",
    lead: "Troussier, Nakata, Nakamura, Inamoto. Co-hosts who stopped being a footnote.",
    description:
      "Japan 2002: Troussier, Nakata, Inamoto. Co-hosts who reached the knockout round on home grass and stopped being a footnote.",
  },
  "south-korea": {
    kicker: "World Cups",
    title: "South Korea 2002: Hiddink, a semi-final that still owns a country",
    lead: "Park as the engine, Hong as captain, Lee Woon-jae. Co-hosts, not a later Taegeuk page.",
    description:
      "South Korea 2002: Hiddink, Park as the engine, Hong as captain. Co-hosts, a semi-final that still owns a country.",
  },
}
