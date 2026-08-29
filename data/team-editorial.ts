export type TeamEditorial = {
  intro: string
  sections: Array<{ heading: string; paragraphs: string[] }>
}

const TEAM_EDITORIAL: Record<string, TeamEditorial> = {
  "barcelona-2014-15": {
    intro: "Barcelona 2014/15 were not Guardiola’s side with three new forwards. Luis Enrique kept the positional foundations, then gave the team a more direct escape route: win the ball, find Messi early and let Suárez and Neymar attack the space before the opponent could rebuild.",
    sections: [
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
        heading: "The midfield was different from peak tiki-taka",
        paragraphs: [
          "Busquets still controlled the first pass and Iniesta still escaped pressure, but Ivan Rakitić was essential to the new balance. His running covered the right side when Messi moved inward, connected with Alves and gave Barcelona a midfielder comfortable arriving into space rather than only circulating around it.",
          "That made the team less symmetrical and less interested in endless control than the 2010/11 side. It also made them harder to trap in one type of match. When opponents pressed high, Barcelona could bypass a line and release three forwards who were exceptional in transition.",
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
          "That is why this team is rated 98 in attack but lower than the Wembley side in midfield control. In cross-era simulations, the 2014/15 team should feel more dangerous when a match becomes stretched—and slightly more available to an opponent who can play through the first pressure.",
        ],
      },
    ],
  },
}

export function getTeamEditorial(teamId: string): TeamEditorial | undefined {
  return TEAM_EDITORIAL[teamId]
}
