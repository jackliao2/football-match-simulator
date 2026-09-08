import type { TeamEditorial } from "@/data/team-editorial"

function d(intro: string, sections: TeamEditorial["sections"]): TeamEditorial {
  return { intro, sections }
}

export const MORE_CLUB_TEAM_EDITORIAL: Record<string, TeamEditorial> = {
  "arsenal-1997-98": d(
    "Wenger’s first Arsenal won the Double. Vieira and Petit took the middle of English midfields, Bergkamp invented, Overmars ran, Anelka finished, and Adams lifted the league at Highbury. It is not the Invincibles. It is the year the method arrived and the old back four still belonged to the club.",
    [
      {
        heading: "The first Double, with new edges",
        paragraphs: [
          "Overmars scored the title-clinching goal against Everton. The FA Cup final against Newcastle was 2–0: Overmars again, Anelka. Wright was still around; Anelka took the shirt. Petit arrived from France and immediately looked like a Premier League midfielder who had been waiting for the pitch to catch up.",
          "Seaman, Dixon, Adams, Keown, Winterburn: the defensive spine was already Highbury. Wenger did not invent that. He added a press, a diet, and a left-sided break that English full-backs had not trained for.",
        ],
      },
      {
        heading: "Before the unbeaten year",
        paragraphs: [
          "On this site 2003/04 is the Arsenal that went a league season without losing. 1997/98 is the origin: the Double that made the later side possible. In a simulation they should look vertical on the left and stubborn through Vieira. They should not look like a 78-percent possession machine.",
          "The pairing instinct is Manchester United 1998/99, the treble that followed. Arsenal should look like the first Wenger idea. United should look like the squad that actually finished the European sentence.",
        ],
      },
    ],
  ),
  "juventus-2002-03": d(
    "Lippi’s 2002/03 Juventus had Buffon, Thuram, Nedvěd in a Ballon d’Or year, Del Piero and Trezeguet as the finish. They won Serie A and then lost a Champions League final on penalties at Old Trafford after Nedvěd was suspended. It is still the Juventus page a lot of older arguments actually mean.",
    [
      {
        heading: "Manchester, without Nedvěd",
        paragraphs: [
          "The final against Milan was 0–0. Shevchenko missed in the shootout; so did others. Nedvěd had picked up a yellow in the semi-final against Madrid and sat in a suit. The league underneath it was a two-striker 4-4-2 that could wait and then run: Camoranesi and Zambrotta as the width, Davids and Tacchinardi as the bite.",
          "Buffon was already the last line of a decade. Thuram at right-back was a centre-back who could also overlap. Treat this as the 2016/17 3-5-2 in an earlier kit and the simulation will lie.",
        ],
      },
      {
        heading: "Two Juventus primes",
        paragraphs: [
          "The pairing on this site is Milan 2006/07, another Italian European night. In a simulation 2002/03 Juventus should look compact, counter-punching and finished by Trezeguet’s first touch. If they win, Nedvěd and Buffon should be involved. If they lose, it should look like a shootout or a set piece, not like they forgot how to defend.",
          "2016/17 is the BBC and Cardiff. This is Nedvěd’s year. Keep them separate.",
        ],
      },
    ],
  ),
  "inter-milan-1988-89": d(
    "Trapattoni’s 1988/89 Inter took a record Serie A title with Matthäus as the engine, Brehme as the left foot, Klinsmann as the finish, and Bergomi organising a defence that still looked like Inter. It is not Mourinho’s treble. It is the German spine in Milan, and the year the Nerazzurri actually finished in front of both neighbours.",
    [
      {
        heading: "The record winter",
        paragraphs: [
          "58 points in an 18-team, two-points-for-a-win league. Zenga in goal. Ferri and Bergomi. Berti running. Serena as the Italian closer next to Klinsmann. Matthäus took the first pass and the second ball and, when needed, the shot from the edge of the box.",
          "They were not a European Cup side that year. They were a league machine in a country that still treated the Scudetto as the main argument. That is why the page exists.",
        ],
      },
      {
        heading: "Against the Milan next door",
        paragraphs: [
          "The pairing on this site is Milan 1988/89, Sacchi’s European Cup side, because that is the Milan derby people want across a season. In a simulation Inter should look like Matthäus and a German left foot. Milan should look like the press. If Inter win, it should look like a league night. If they lose, it should look like Van Basten, not like Inter forgot how to be compact.",
          "2009/10 remains Inter’s European peak. This is the domestic one that older Inter fans still quote.",
        ],
      },
    ],
  ),
  "paris-saint-germain-2017-18": d(
    "Emery’s 2017/18 PSG won the league with Neymar, Mbappé and Cavani as a front three that looked unfair in France and then lost to Real Madrid in the last sixteen. 93 points, 95 league goals, and a European exit that is still the club’s tell. It is not the later Messi trio. It is the first fully expensive Paris idea.",
    [
      {
        heading: "Domestic procession, European wound",
        paragraphs: [
          "Neymar had arrived the summer before. Mbappé exploded. Cavani still finished. Verratti and Motta kept the ball when the stars wanted it back. Alves overlapped. Areola was not a Galáctico; the distances in front of him were supposed to make that irrelevant. In the Champions League Madrid won both legs, 2–1 and 2–1.",
          "Chemistry is the honest rating: lower than the payroll. Three forwards who could each decide a match do not automatically become a knockout organism.",
        ],
      },
      {
        heading: "How to read them in the model",
        paragraphs: [
          "They should look like a chance factory on the break and a little fragile when the first press is broken. They should not look like 2011 Barcelona with oil money. Against Barcelona 2014/15 — a pairing already in the catalogue — the clash is star forwards versus a treble machine that actually finished Europe.",
          "If PSG win, Neymar isolating a full-back should be the reason. If they lose, it should look like the 2018 Madrid version of the story: talented, and out.",
        ],
      },
    ],
  ),
  "tottenham-2016-17": d(
    "Pochettino’s 2016/17 Tottenham took 86 points, finished second, and still lifted nothing. Kane scored 29 in the league. Alli arrived between the lines. Eriksen switched play. Walker turned the right side into a sprint. It is the Spurs league peak. It is not the 2019 Champions League run in a white shirt.",
    [
      {
        heading: "86 points, no parade",
        paragraphs: [
          "Chelsea under Conte took the title. Spurs won the arguments about how football should look and lost the table. Wanyama and Dier sat; Son stretched; Lloris kept nights alive. White Hart Lane’s last season still sounded like a press.",
          "They were not invincible. They were the closest this club has come to a modern league machine. Treating the later Amsterdam hat-trick as a stronger league XI is how you lose this page on purpose.",
        ],
      },
      {
        heading: "League peak against a champion",
        paragraphs: [
          "The pairing on this site is Arsenal 2003/04 because both North London stories get flattened into ‘the good Spurs/Arsenal’. One went unbeaten. This one got 86 points and a gap. In a simulation Spurs should look high-tempo and finished by Kane. Arsenal should look like the more complete control side.",
          "If you want the Spurs that reached a European Cup final, open 2018/19. If you want the Spurs that nearly won England, this is the page.",
        ],
      },
    ],
  ),
  "aston-villa-1981-82": d(
    "Barton’s Villa won the European Cup in Rotterdam. Withe scored, Cowans passed, Mortimer organised, and Rimmer’s injury put Nigel Spink into a final he had barely been near. It is a provincial English night that still sits in the Midlands. It is not a league dynasty. It is the cup they actually lifted.",
    [
      {
        heading: "Rotterdam, 26 May 1982",
        paragraphs: [
          "Bayern were the favourite. Withe’s close-range finish is the goal. Morley had already given them a European run; Shaw worked the channels. McNaught and Evans headed everything. The idea was English and direct: win the first ball, deliver the second, do not panic at 1–0.",
          "Saunders had built the league side; Barton took the European night. A simulator that only indexed 1990s payrolls would miss the actual 1982 champion.",
        ],
      },
      {
        heading: "Against other English Europe",
        paragraphs: [
          "On this site they sit near Forest 1979/80: two Midlands clubs that won the cup without being the strongest league on earth. In a simulation Villa should look stubborn, aerial and happy at 1–0. They should not look like a Pep possession side in claret. If they win, Withe and Cowans should be the reasons.",
          "Liverpool 2004/05 is the other English European fairy tale in the catalogue. Villa’s is earlier, tighter, and still a header in Rotterdam.",
        ],
      },
    ],
  ),
  "benfica-1961-62": d(
    "Guttmann’s Benfica retained the European Cup in Amsterdam, 5–3 against Real Madrid. Eusébio as the thunder, Coluna as the brain, Águas as the closer, and a Portuguese side that beat the club which had owned the competition. Then Guttmann left after a contract fight and the curse story began. The night in Amsterdam is still real.",
    [
      {
        heading: "Amsterdam, and the Di Stéfano club",
        paragraphs: [
          "Eusébio scored twice in the final. Coluna ran the tempo. Simões and Augusto were the width. Madrid still had Puskás and Di Stéfano; 5–3 was not a smash-and-grab against a ghost. It was a young forward line that refused to be impressed by the 1950s.",
          "They had already won it the year before against Barcelona. Retention is the point of this page. A first European Cup can be a night. A second is a method.",
        ],
      },
      {
        heading: "How they should play in the model",
        paragraphs: [
          "High attack, wide, Eusébio as a first-touch problem that a zonal lecture does not automatically solve. The defence is excellent for 1962 rather than a 2010s high line. Against later Lisbon rivals or against Celtic 1966/67 the interesting clash is two small-country European Cups from the same decade.",
          "If Benfica win, it should look like a break and Eusébio. If they lose, it should look like the box getting crowded, not like 1962 football cannot travel.",
        ],
      },
    ],
  ),
  "red-star-1990-91": d(
    "Petrović’s Red Star won the European Cup in Bari on penalties against Marseille. Prosinečki as the supply, Savićević as the silk, Pančev as the finish, Belodedici as the sweeper. It is the last Yugoslav European Cup, and a night that still belongs to Belgrade even after the country that produced it came apart.",
    [
      {
        heading: "Bari, after a generation arrived at once",
        paragraphs: [
          "The final was 0–0. Stojanović saved. Pančev converted. Marseille had Papin and a French machine; Red Star had a midfield that could also play. Mihajlović’s left foot was already a set-piece weapon. Jugović ran. The idea was technical and vertical, not a parking job that lucked into a shootout.",
          "They had already knocked out Bayern and others on the road. Treating Bari as a lottery only is how you miss the football.",
        ],
      },
      {
        heading: "Why they belong next to bigger names",
        paragraphs: [
          "A catalogue of only English and Spanish payrolls would drop the actual 1991 champion. In simulations they should look like chance creation from Prosinečki and a first ball into Pančev. They should not look like a low-block miracle for ninety minutes.",
          "If they win, it should look like a midfielder’s pass. If they lose, it should look like the distances stretching, not like the names were never good enough.",
        ],
      },
    ],
  ),
  "valencia-2003-04": d(
    "Benítez’s Valencia won the league and the UEFA Cup in the same spring. Albelda and Baraja as the screen, Aimar as the spark, Ayala as the wall, Vicente as the left-sided supply. It is a Spanish title stolen from the Madrid–Barcelona duopoly, and a European night in Gothenburg against Marseille.",
    [
      {
        heading: "The double that looked like work",
        paragraphs: [
          "La Liga on 77 points. The UEFA Cup final was 2–0: Vicente from the spot, Mista. Cañizares in goal. Marchena next to Ayala. Angulo and Aimar as the invention when the block needed a third man. They were not a possession lecture. They were distances and a first pass into Vicente.",
          "The year after, Benítez left for Liverpool and took the same stubbornness to Istanbul. This page is the Spanish original.",
        ],
      },
      {
        heading: "How a simulation should feel",
        paragraphs: [
          "Compact, set-piece dangerous, finished by a runner from midfield rather than a false nine. They should not look like 2010 Barcelona in orange. Against later Spanish champions they should look like the side that actually interrupted the duopoly without needing a galaxy.",
          "If Valencia win, Albelda and Aimar should both be visible: one to stop the game, one to invent it.",
        ],
      },
    ],
  ),
}

export const MORE_NATION_TEAM_EDITORIAL: Record<string, TeamEditorial> = {
  "denmark-1992": d(
    "Møller Nielsen’s Denmark won the 1992 Euros after a late invitation when Yugoslavia were withdrawn. Schmeichel as the wall, Laudrup as the silk, Vilfort and Jensen as the finish in the final against Germany. It is the tournament shock that still reads like a short story. It is also a real XI, not a metaphor.",
    [
      {
        heading: "Called off the beach, left with the cup",
        paragraphs: [
          "They beat the Netherlands on penalties in the semi-final. The final in Gothenburg was 2–0: Jensen, Vilfort. Povlsen worked. Larsen scored in the tournament. Germany had already won a World Cup two years earlier and still could not open the block. Schmeichel’s handling made the night possible.",
          "Chemistry is the point of the rating. This was a group that had already failed to qualify on the pitch and then won the thing anyway. The stubbornness was shared.",
        ],
      },
      {
        heading: "How to read a shock champion",
        paragraphs: [
          "In simulations they should look compact, counter-punching and dangerous on the first ball into Brian Laudrup. They should not look like Spain 2012. Against Germany 1990 — a pairing already in the catalogue — you are asking whether the 1992 block still bothers the side that had just been world champions.",
          "If Denmark win, it should look like 1–0 and Schmeichel. If they lose, it should look like the block stretching, not like the fairy tale was never football.",
        ],
      },
    ],
  ),
  "greece-2004": d(
    "Rehhagel’s Greece won Euro 2004 the ugly way: a low block, Charisteas headers, Zagorakis as the captain, and a 1–0 in the Lisbon final against the hosts. They had already beaten France and the Czech Republic. It is the last great tournament shock that a lot of living fans actually watched. It is not pretty. It is a result.",
    [
      {
        heading: "Lisbon, after a month of 1–0s",
        paragraphs: [
          "Charisteas headed the final winner from a Basinas corner. Dellas had already won the semi-final against the Czechs in extra time. France went out in the quarter-final, also 1–0. Nikopolidis kept the distances. Seitaridis ran. Katsouranis and Karagounis fouled at the right times. Possession at 42 in this model is a warning: they will not keep the ball to look good.",
          "Otto Rehhagel’s idea was German compactness wearing Greek shirts. The ratings are honest about attack. The trophy is still in the cabinet.",
        ],
      },
      {
        heading: "Against pretty football",
        paragraphs: [
          "In simulations they should look like a set-piece side with a deep line. They should not accidentally become a 4-3-3 that controls territory. Against Portugal 2016 you are not restaging 2004; you are asking whether a later Portuguese champion still bothers this block. Against Spain-shaped opponents the clash is the whole point of the page.",
          "If Greece win, it should look like a header and a save. If they lose, it should look like the tenth corner finally arriving, not like 2004 was a clerical error.",
        ],
      },
    ],
  ),
  "brazil-1962": d(
    "Moreira’s Brazil retained the World Cup in Chile after Pelé went home hurt. Garrincha took the tournament, Vavá finished, Amarildo stepped in, and the 4–2-4 still travelled. It is not 1970. It is not 1958 with a sequel sticker. It is the year one winger carried a champion.",
    [
      {
        heading: "Chile, without the 17-year-old",
        paragraphs: [
          "Pelé was injured against Czechoslovakia. Garrincha scored twice in the semi-final against the hosts and was still the problem Spain and England could not solve. Vavá finished. Zagallo dropped. Didi organised. Nilton Santos and Djalma Santos overlapped because the rest of the team had already pulled the defence apart.",
          "The final against Czechoslovakia was 3–1. Amarildo, Zito, Vavá. A side that had lost its best teenager still had the method from Sweden four years earlier.",
        ],
      },
      {
        heading: "Three Brazils",
        paragraphs: [
          "On this site 1958 is the origin, 1970 is the masterpiece, 1962 is the retention. In a simulation they should look like one-v-ones from the right and a first ball into Vavá. They should not look like a 2010 Spain clone. Against 1970 Brazil they should look like the slightly less certain sibling. Against later European champions they should look like a winger problem.",
          "If Brazil 1962 win, Garrincha should be the reason. That is the whole page.",
        ],
      },
    ],
  ),
}
