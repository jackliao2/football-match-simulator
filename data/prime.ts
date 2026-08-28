import type { PrimeEntity } from "@/types"

export const primeEntities: PrimeEntity[] = [
  {
    slug: "barcelona",
    name: "Barcelona",
    kind: "club",
    title: "When Was Barcelona's Prime?",
    description:
      "Barcelona's modern peak is a three-way argument: Guardiola's first treble, the Wembley tiki-taka side, or the MSN treble. Each season is playable in the simulator.",
    seoTitle: "Prime Barcelona — When Was Barcelona's Prime?",
    seoDescription:
      "When was Barcelona's prime? Compare the 2008/09 treble, 2010/11 Wembley side and 2014/15 MSN team, then simulate each legendary squad.",
    verdict: "Our pick is 2010/11: not Barcelona's most explosive front three, but the season when Messi's false nine, Xavi and Iniesta made Guardiola's positional football feel most complete. The 2008/09 treble began the era; 2014/15 supplied its deadliest attack.",
    candidates: [
      {
        teamId: "barcelona-2008-09",
        argument: "The first treble. Pep's opening masterpiece, with Messi exploding into the world's best player.",
      },
      {
        teamId: "barcelona-2010-11",
        argument: "Peak tiki-taka. The Wembley Champions League final is the strongest single-night argument.",
      },
      {
        teamId: "barcelona-2014-15",
        argument: "MSN. A second treble, built on the most lethal forward line of the decade.",
      },
      {
        teamId: "barcelona-2025-26",
        argument:
          "Not a claimed prime — the current squad. Yamal, Pedri and Flick, so you can put 2025/26 next to the treble years.",
      },
    ],
  },
  {
    slug: "real-madrid",
    name: "Real Madrid",
    kind: "club",
    title: "When Was Real Madrid's Prime?",
    description:
      "Décima in 2014, or the 2016/17 side that won the league and retained the Champions League? Both are in the database.",
    seoTitle: "Prime Real Madrid — When Was Real Madrid's Prime?",
    seoDescription:
      "When was Real Madrid's prime? Compare the 2013/14 La Décima side and the 2016/17 Champions League winners, then simulate each squad.",
    verdict: "Our pick is 2016/17. La Décima carried the greater emotional weight, but Zidane's later side paired Ronaldo's knockout scoring with the Casemiro–Kroos–Modrić midfield, won La Liga and became the first team to retain the modern Champions League.",
    candidates: [
      {
        teamId: "real-madrid-2013-14",
        argument: "La Décima. BBC on the break, Di María everywhere, Ramos in extra time.",
      },
      {
        teamId: "real-madrid-2016-17",
        argument: "Zidane's complete side. League and Europe, Casemiro-Kroos-Modrić, Ronaldo still scoring.",
      },
      {
        teamId: "real-madrid-2025-26",
        argument:
          "The current squad. Mbappé, Vinícius and Bellingham — simulate them against La Décima and 2016/17.",
      },
    ],
  },
  {
    slug: "manchester-united",
    name: "Manchester United",
    kind: "club",
    title: "When Was Manchester United's Prime?",
    description:
      "The 1999 treble or the 2008 Moscow winners with peak Ronaldo. Two different United sides, both legendary.",
    seoTitle: "Prime Manchester United — When Was United's Prime?",
    seoDescription:
      "When was Manchester United's prime? Compare the 1998/99 treble winners and the 2007/08 Moscow side, then simulate each squad.",
    verdict: "The 1998/99 treble is United's defining achievement; the 2007/08 side is our pick for playing strength. Peak Ronaldo, Rooney and Tevez attacked ahead of Ferdinand and Vidić, giving Ferguson elite quality in every line.",
    candidates: [
      {
        teamId: "manchester-united-1998-99",
        argument: "The treble. Camp Nou, injury time, the most famous ending in club football.",
      },
      {
        teamId: "manchester-united-2007-08",
        argument: "Peak Ronaldo, Rooney and Tevez, Vidić and Ferdinand, a European Cup in Moscow.",
      },
      {
        teamId: "manchester-united-2025-26",
        argument: "Amorim's current rebuild. Not a prime — the 2025/26 squad you can throw at 1999 and 2008.",
      },
    ],
  },
  {
    slug: "messi",
    name: "Lionel Messi",
    kind: "player",
    title: "When Was Messi's Prime?",
    description:
      "Search demand around Messi's prime usually points at Barcelona. These three sides are the main candidates in this database.",
    seoTitle: "Messi's Prime — Which Barcelona Season?",
    seoDescription:
      "When was Messi's prime year? Compare Barcelona 2008/09, 2010/11 and 2014/15, then simulate those legendary squads.",
    verdict: "For control of an entire match, 2010/11 is the clearest answer: Messi as a false nine inside Barcelona's greatest midfield. For the broadest attacking version, 2014/15 has the counter-case, with Messi creating and finishing beside Suárez and Neymar.",
    candidates: [
      {
        teamId: "barcelona-2008-09",
        argument: "The breakout superstar season. First Ballon d'Or, first treble, the 2009 Champions League final.",
      },
      {
        teamId: "barcelona-2010-11",
        argument: "False nine, Wembley, and a claim that this was the best club team ever built around him.",
      },
      {
        teamId: "barcelona-2014-15",
        argument: "MSN. Messi as creator-finisher alongside Suárez and Neymar in another treble year.",
      },
    ],
  },
  {
    slug: "brazil",
    name: "Brazil",
    kind: "nation",
    title: "When Was Brazil's Prime?",
    description:
      "1958, 1970, 1994 or 2002? Pelé twice, Romário in the heat, or the three R's. All of them are playable.",
    seoTitle: "Prime Brazil — When Was Brazil's Prime?",
    seoDescription:
      "When was Brazil's prime? Compare 1958, 1970, 1994 and 2002, then simulate each World Cup squad.",
    verdict: "Our pick is 1970. The 1958 side announced Pelé and 2002 restored Brazil's attacking mythology, but the Mexico team joined a perfect World Cup record to a front five whose movement still defines jogo bonito.",
    candidates: [
      {
        teamId: "brazil-1958",
        argument: "The first star. Pelé at 17, Garrincha on the right, a World Cup in Sweden.",
      },
      {
        teamId: "brazil-1970",
        argument: "The aesthetic peak. Pelé, Jairzinho, Tostão and a 4–1 final against Italy.",
      },
      {
        teamId: "brazil-1994",
        argument: "Romário as the blade. A fourth star won the ugly way in Pasadena.",
      },
      {
        teamId: "brazil-2002",
        argument: "The three R's. Ronaldo's redemption World Cup, and a fifth star on the shirt.",
      },
      {
        teamId: "brazil-2026",
        argument: "Ancelotti's current side. Vinícius and Rodrygo against Pelé, Romário and the three R's.",
      },
    ],
  },
  {
    slug: "argentina",
    name: "Argentina",
    kind: "nation",
    title: "When Was Argentina's Prime?",
    description:
      "Maradona in Mexico, or Messi in Qatar. Two captains, two World Cups, one endless argument.",
    seoTitle: "Prime Argentina — When Was Argentina's Prime?",
    seoDescription:
      "When was Argentina's prime? Compare the 1986 Maradona side and the 2022 Messi World Cup winners, then simulate each squad.",
    verdict: "Argentina's two peaks answer different questions. Mexico 1986 is the strongest individual-tournament argument, built around Maradona; Qatar 2022 is our pick as the more adaptable collective, able to change shape and survive several different kinds of match.",
    candidates: [
      {
        teamId: "argentina-1986",
        argument: "The Hand of God, the Goal of the Century, and a World Cup built around one player.",
      },
      {
        teamId: "argentina-2022",
        argument: "Messi's tournament. Lusail, penalties, and the ending the story needed.",
      },
      {
        teamId: "argentina-2026",
        argument: "Scaloni's current squad. Still Messi's idea — simulate 2026 against 1986 and Qatar.",
      },
    ],
  },
  {
    slug: "chelsea",
    name: "Chelsea",
    kind: "club",
    title: "When Was Chelsea's Prime?",
    description:
      "Mourinho's 95-point first title side, or the battered 2012 team that won the Champions League in Munich. Two different Chels, both legendary.",
    seoTitle: "Prime Chelsea — When Was Chelsea's Prime?",
    seoDescription:
      "When was Chelsea's prime? Compare the 2004/05 Mourinho title winners and the 2011/12 Munich Champions League side, then simulate each squad.",
    verdict: "Our pick is 2004/05. Munich 2012 delivered the trophy Chelsea wanted most, but Mourinho's first champions were the stronger week-to-week side: 95 league points, only 15 goals conceded and a spine built to control English football.",
    candidates: [
      {
        teamId: "chelsea-2004-05",
        argument: "The 95-point machine. Čech, Terry, Makelele, Lampard — Mourinho's first English title.",
      },
      {
        teamId: "chelsea-2011-12",
        argument: "The hard way. A stubborn cup side that parked, headed, and won Europe in Munich.",
      },
    ],
  },
  {
    slug: "ac-milan",
    name: "AC Milan",
    kind: "club",
    title: "When Was AC Milan's Prime?",
    description:
      "Sacchi's pressing 1988/89 European Cup winners, or Ancelotti's Christmas-tree side that won Athens in 2007. Both are playable.",
    seoTitle: "Prime AC Milan — When Was Milan's Prime?",
    seoDescription:
      "When was AC Milan's prime? Compare Sacchi's 1988/89 European Cup winners and Ancelotti's 2006/07 Athens side, then simulate each squad.",
    verdict: "Our pick is 1988/89. Ancelotti's 2007 side had Kaká at his European peak and extraordinary experience, but Sacchi's Milan changed how elite teams pressed, defended space and moved as a unit while fielding Baresi, Maldini and the Dutch trio.",
    candidates: [
      {
        teamId: "ac-milan-1988-89",
        argument: "Sacchi's machine. Baresi, Gullit, Van Basten, and a 4–0 final against Steaua.",
      },
      {
        teamId: "ac-milan-2006-07",
        argument: "Pirlo, Kaká, Nesta and Maldini. Athens, and a European Cup won the experienced way.",
      },
    ],
  },
  {
    slug: "spain",
    name: "Spain",
    kind: "nation",
    title: "When Was Spain's Prime?",
    description:
      "The 2010 World Cup in South Africa, or the 2012 Euros side that beat Italy 4–0 in the final. Tiki-taka at two peaks.",
    seoTitle: "Prime Spain — When Was Spain's Prime?",
    seoDescription:
      "When was Spain's prime? Compare the 2010 World Cup winners and the 2012 Euros side, then simulate each tiki-taka squad.",
    verdict: "The 2010 team won Spain's greatest prize; our playing-strength pick is 2012. Del Bosque's side had deeper control, more tactical flexibility and ended the tournament by dismantling Italy 4–0 in the final.",
    candidates: [
      {
        teamId: "spain-2010",
        argument: "Iniesta in extra time. Villa as the finisher, and a World Cup won the Barcelona way.",
      },
      {
        teamId: "spain-2012",
        argument: "False nine, 4–0 in the final, and the last night of the tiki-taka era.",
      },
    ],
  },
  {
    slug: "england",
    name: "England",
    kind: "nation",
    title: "When Was England's Prime?",
    description:
      "1966 at Wembley, the golden generation of 2004, or Southgate's 2018 run. More than one England is playable — including sides that never lifted a trophy.",
    seoTitle: "Prime England — When Was England's Prime?",
    seoDescription:
      "When was England's prime? Compare 1966, Italia 90, Euro 96, the 2004 golden generation, 2018 and 2021, then simulate each squad.",
    verdict: "1966 remains the only defensible answer by achievement and is our overall pick. The 2004 squad wins the talent-on-paper argument, while 2018 restored tournament belief, but neither converted its strongest qualities into a final.",
    candidates: [
      {
        teamId: "england-1966",
        argument: "The only star. Banks, Moore, Charlton, Hurst — and a World Cup at Wembley.",
      },
      {
        teamId: "england-2004",
        argument: "Beckham, Gerrard, Lampard, Scholes, Rooney. The names still look like a final. The tournament did not.",
      },
      {
        teamId: "england-2018",
        argument: "Kane's Golden Boot, a semi-final, and the first time in a generation it felt close.",
      },
    ],
  },
]

export function getPrimeEntity(slug: string): PrimeEntity | undefined {
  return primeEntities.find((entity) => entity.slug === slug)
}
