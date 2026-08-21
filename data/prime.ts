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
]

export function getPrimeEntity(slug: string): PrimeEntity | undefined {
  return primeEntities.find((entity) => entity.slug === slug)
}
