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
    candidates: [
      {
        teamId: "real-madrid-2013-14",
        argument: "La Décima. BBC on the break, Di María everywhere, Ramos in extra time.",
      },
      {
        teamId: "real-madrid-2016-17",
        argument: "Zidane's complete side. League and Europe, Casemiro-Kroos-Modrić, Ronaldo still scoring.",
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
    candidates: [
      {
        teamId: "manchester-united-1998-99",
        argument: "The treble. Camp Nou, injury time, the most famous ending in club football.",
      },
      {
        teamId: "manchester-united-2007-08",
        argument: "Peak Ronaldo, Rooney and Tevez, Vidić and Ferdinand, a European Cup in Moscow.",
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
    kind: "club",
    title: "When Was Brazil's Prime?",
    description:
      "1958, 1970, 1994 or 2002? Pelé twice, Romário in the heat, or the three R's. All of them are playable.",
    seoTitle: "Prime Brazil — When Was Brazil's Prime?",
    seoDescription:
      "When was Brazil's prime? Compare 1958, 1970, 1994 and 2002, then simulate each World Cup squad.",
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
    ],
  },
  {
    slug: "argentina",
    name: "Argentina",
    kind: "club",
    title: "When Was Argentina's Prime?",
    description:
      "Maradona in Mexico, or Messi in Qatar. Two captains, two World Cups, one endless argument.",
    seoTitle: "Prime Argentina — When Was Argentina's Prime?",
    seoDescription:
      "When was Argentina's prime? Compare the 1986 Maradona side and the 2022 Messi World Cup winners, then simulate each squad.",
    candidates: [
      {
        teamId: "argentina-1986",
        argument: "The Hand of God, the Goal of the Century, and a World Cup built around one player.",
      },
      {
        teamId: "argentina-2022",
        argument: "Messi's tournament. Lusail, penalties, and the ending the story needed.",
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
    kind: "club",
    title: "When Was Spain's Prime?",
    description:
      "The 2010 World Cup in South Africa, or the 2012 Euros side that beat Italy 4–0 in the final. Tiki-taka at two peaks.",
    seoTitle: "Prime Spain — When Was Spain's Prime?",
    seoDescription:
      "When was Spain's prime? Compare the 2010 World Cup winners and the 2012 Euros side, then simulate each tiki-taka squad.",
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
    kind: "club",
    title: "When Was England's Prime?",
    description:
      "1966 at Wembley, the golden generation of 2004, or Southgate's 2018 run. More than one England is playable — including sides that never lifted a trophy.",
    seoTitle: "Prime England — When Was England's Prime?",
    seoDescription:
      "When was England's prime? Compare 1966, Italia 90, Euro 96, the 2004 golden generation, 2018 and 2021, then simulate each squad.",
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
