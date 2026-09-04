export type PrimeEditorialSection = {
  heading: string
  paragraphs: string[]
}

export type PrimeEditorial = {
  caseFor: string
  counterCase: string
  sections?: PrimeEditorialSection[]
}

const PRIME_EDITORIAL: Record<string, PrimeEditorial> = {
  barcelona: {
    caseFor: "The 2010/11 choice rests on control rather than trophy arithmetic. Barcelona's first treble side were more physically explosive and the MSN team attacked space more brutally, but neither governed elite matches through the Messi–Xavi–Iniesta–Busquets structure with quite the same certainty. Wembley supplies the performance that makes the tactical case visible rather than theoretical.",
    counterCase: "The strongest counterargument is 2014/15. Suárez gave Barcelona a true centre-forward, Neymar threatened the opposite side and Messi could create from deeper positions, so the team had more ways to win when possession was disrupted. Choose that season if adaptability and front-three danger matter more than positional purity.",
  },
  "real-madrid": {
    caseFor: "Madrid 2016/17 combined the midfield balance of Casemiro, Kroos and Modrić with Ronaldo's conversion into the decisive penalty-box forward. The league title matters because it shows week-to-week depth, while retaining the Champions League shows that the same squad could solve knockout ties without relying on one emotional run.",
    counterCase: "La Décima remains the romantic and transition-football countercase. Di María's carrying changed the midfield, Bale still had devastating open-field speed and Ramos supplied the moment that altered the club's European decade. A reader weighting peak counter-attacking force may reasonably prefer 2013/14.",
  },
  "manchester-united": {
    caseFor: "The 2007/08 selection is about balance in every line. Ferdinand and Vidić protected a mobile attack, Carrick and Scholes could play through pressure, and Ronaldo's goals did not require United to become a one-player side. They won England and Europe while adapting between possession, counterattack and deep knockout defending.",
    counterCase: "The 1998/99 team own the harder achievement and a deeper cultural claim. Their wide delivery, two-striker rotations and ability to change matches from the bench produced a treble no later United side matched. If prime means the season that most completely expressed Ferguson's club, 1999 can still be the answer.",
    sections: [
      {
        heading: "First decide what ‘prime’ means",
        paragraphs: [
          "Manchester United do not have one uncontested peak because the two best answers measure different things. The 1998/99 side completed the achievement no English club had managed before: league, FA Cup and European Cup in one season. The 2007/08 side did not win the treble, but it was stronger defensively, more flexible without the ball and built around Cristiano Ronaldo at the most destructive point of his United career.",
          "That distinction matters. Calling 1999 the defining United season is not the same as calling it Ferguson’s strongest starting XI. Our verdict separates historical greatness from probable playing strength instead of using the trophy count as a shortcut for both.",
        ],
      },
      {
        heading: "Why 1998/99 remains the emotional answer",
        paragraphs: [
          "The treble side carried danger from more places. Beckham and Giggs supplied width, Keane and Scholes attacked from midfield, and the Yorke–Cole partnership could be replaced by Sheringham and Solskjær without turning United into a lesser version of the same plan. The comeback away to Juventus was the clearest footballing proof: United recovered from two early goals and played their way back into the tie rather than waiting for another miracle.",
          "Its weakness in this comparison is control. The season is remembered through decisive escapes because opponents could reach United’s goal and force volatile matches. That made the team irresistible to watch and exceptionally hard to kill, but it also means the treble story can sometimes obscure how often Ferguson had to repair games in motion.",
        ],
      },
      {
        heading: "Why 2007/08 is the stronger football team",
        paragraphs: [
          "Nine years later, United could win several kinds of match. Ronaldo, Rooney and Tevez pressed, rotated and attacked space without behaving like a fixed front three. Behind them, Carrick’s positioning and Scholes’s passing gave the side an exit against pressure; Ferdinand and Vidić combined recovery speed, aerial authority and penalty-area defending. Ronaldo scored 42 goals in all competitions, yet the structure did not simply wait for him to rescue it.",
          "The Champions League run showed the range of that structure. United could attack Roma at speed, survive long defensive stretches against Barcelona and manage the Moscow final against Chelsea. The league title adds the week-to-week case: this was not only a cup side catching fire for three spring nights.",
        ],
      },
      {
        heading: "The verdict, with the argument left open",
        paragraphs: [
          "If one match had to be played against another elite historical side, we would select 2007/08. The defence is more secure, the attack has greater one-on-one power and the team can counter without surrendering every route through midfield. That is why it receives the higher simulator rating here.",
          "If the question is which season most completely represents Manchester United, choose 1998/99. Academy players, wing play, late goals, a comeback in Turin and the final turn in Barcelona form a club story that a marginally stronger XI cannot replace. Playing peak: 2007/08. Defining peak: 1998/99.",
        ],
      },
    ],
  },
  messi: {
    caseFor: "Messi's 2010/11 role joins individual output to collective control. From false nine he could leave the centre-backs, overload midfield and still arrive as the main scorer. The choice therefore says more than 'best statistics': it identifies the season when his movement made an already historic midfield almost impossible to assign defensively.",
    counterCase: "The 2014/15 argument is that Messi had become the broader attacker. He could begin from the right, create for Suárez and Neymar, carry transitions and decide settled possessions. Readers who value versatility against different defensive schemes may see the MSN season as the fuller version of the player.",
    sections: [
      {
        heading: "There are several correct versions of peak Messi",
        paragraphs: [
          "A serious answer has to separate four questions: Messi’s best season inside the best team, his greatest scoring year, his most complete attacking role and his best late-career tournament. Those questions point to different dates. This page chooses 2010/11 for the cleanest union of individual level, tactical influence and collective dominance, not because every statistical record belongs to that season.",
          "The candidate cards below are playable Barcelona squads in this simulator. They are not a claim that 2008/09, 2010/11 and 2014/15 are the only seasons in the debate. In particular, leaving 2011/12 and 2018/19 unexplained would make any Messi-prime article incomplete.",
        ],
      },
      {
        heading: "2010/11: the false nine at the centre of everything",
        paragraphs: [
          "By 2010/11, Messi was neither a conventional right winger nor a striker waiting between centre-backs. Dropping from the front line placed an extra player beside Xavi, Iniesta and Busquets, but following him opened the space that Pedro and David Villa attacked. Defenders faced a bad choice before Messi even received the ball: step into midfield and expose the channel, or hold the line and let him turn.",
          "The Wembley final against Manchester United is the best single-match exhibit. Messi’s goal matters, but so does the geography of the performance: he received between midfield and defence, accelerated through central spaces and helped Barcelona keep returning the match to the areas they controlled. This was peak Messi as the organising problem an opponent could never fully solve.",
        ],
      },
      {
        heading: "2011/12 and 2012: the statistical peak",
        paragraphs: [
          "The strongest numbers-based answer comes one season later. Messi scored 73 goals for Barcelona in all competitions in 2011/12 and 91 for club and country across the 2012 calendar year. If ‘prime’ means the greatest volume of goals ever produced by an elite creator, that is the answer and it should be stated plainly.",
          "Why do we still prefer 2010/11 for this page’s main verdict? Barcelona lost the league and Champions League in 2011/12, while the earlier side joined Messi’s brilliance to a more complete collective peak. That does not reduce the individual feat; it explains why a best-player-season question and a best-version-inside-a-team question can split.",
        ],
      },
      {
        heading: "2014/15 and 2018/19: the complete attacker",
        paragraphs: [
          "In 2014/15, Suárez occupied the centre and Neymar threatened from the left, allowing Messi to begin on the right and choose when to create, carry or arrive to finish. The Champions League semi-final against Bayern displayed that range: control from deeper positions, the one-on-one destruction of Jérôme Boateng and the pass that released Neymar. This is the best counter-case for versatility against more varied game states.",
          "By 2018/19, Messi carried even more of Barcelona’s progression and chance creation. The team was less complete, which is precisely why that season belongs in the discussion: the individual could dominate matches as scorer, passer and set-piece specialist without the old Xavi–Iniesta platform. It may be his greatest one-man Barcelona season even if the campaign ended at Anfield.",
        ],
      },
      {
        heading: "Our answer depends on the wording",
        paragraphs: [
          "Best Messi season in the best functioning team: 2010/11. Greatest scoring campaign: 2011/12, with the 2012 calendar record alongside it. Broadest version in a devastating front three: 2014/15. Most demanding creative carry at Barcelona: 2018/19. Best international ending: 2022 with Argentina.",
          "For a historical match simulator, 2010/11 is the most useful definition of prime because the player and the team amplify one another. It is not a refusal to choose; it is a precise answer to a precise version of the question.",
        ],
      },
    ],
  },
  brazil: {
    caseFor: "Brazil 1970 pair a perfect tournament with a front line in which creation did not belong to one player. Pelé connected, Jairzinho scored in every match, Gérson passed through pressure and Carlos Alberto supplied width from behind. The final against Italy remains an unusually clear demonstration of the team's range.",
    counterCase: "Brazil 1958 offer the Garrincha countercase and the arrival of Pelé; 2002 offer greater modern defensive structure behind Ronaldo, Rivaldo and Ronaldinho. The 1970 verdict depends on treating collective attacking fluency as the highest form of dominance, not assuming the oldest famous footage automatically wins.",
  },
  argentina: {
    caseFor: "Argentina 2022 are the collective choice because Scaloni altered shapes and personnel across the tournament without losing the team's emotional centre. Messi remained decisive, but Álvarez, Di María, De Paul, Mac Allister and Martínez each solved different phases. Their path required recovery from an opening defeat and control of several volatile knockout matches.",
    counterCase: "Mexico 1986 is the stronger individual-performance case. Maradona carried a larger share of progression and creation, then produced the tournament's defining actions against England and Belgium. If prime means the highest level reached by one player inside a winning national team, the older side should lead.",
  },
  chelsea: {
    caseFor: "Chelsea 2004/05 were built for repeatability. Čech, Terry, Carvalho and Makelele closed the centre, Lampard supplied goals without weakening midfield, and wide attackers turned regains into immediate territory. Fifteen league goals conceded is not just a record; it describes how little opponents were allowed to make the match their own.",
    counterCase: "The 2012 side have the greater European ending and a legitimate case based on resilience under extreme pressure. They eliminated Barcelona and beat Bayern in Munich while rarely controlling the ball. That makes them an extraordinary cup story, but not automatically the strongest Chelsea across a full season.",
  },
  "ac-milan": {
    caseFor: "Sacchi's 1988/89 Milan are chosen because excellence and influence meet in the same side. Baresi led an aggressive line, the press compressed the pitch and the Dutch trio supplied elite technique and power ahead of it. The 5–0 semi-final against Madrid and 4–0 final make the tactical reputation concrete.",
    counterCase: "Ancelotti's 2006/07 team offer a different sort of mastery: Pirlo controlling from deep, Kaká carrying the attack and Maldini and Nesta managing space through experience. They were not as dominant domestically, but their Champions League run can be preferred if knockout intelligence carries the greatest weight.",
  },
  spain: {
    caseFor: "Spain 2012 represent the mature end of the international possession cycle. Without a fixed striker they could still create superiorities through midfield, press immediately after losing the ball and finish the tournament by dismantling Italy. The 4–0 final answers the criticism that control always had to mean caution.",
    counterCase: "The 2010 team own the World Cup and a clearer attacking reference in David Villa. Their run was tense, defensively secure and decided repeatedly by narrow margins. If prime is inseparable from winning the sport's greatest tournament, Johannesburg remains the answer regardless of the later team's extra polish.",
  },
  england: {
    caseFor: "England 1966 combine the only winning achievement with a functioning tournament structure. Ramsey's narrow midfield allowed Charlton to advance, Moore organised possession from defence and Hurst and Hunt gave the team a real box presence. The home setting helped, but it does not erase the tactical coherence.",
    counterCase: "The 2004 squad win the names-on-paper argument: Rooney, Beckham, Gerrard, Lampard, Scholes, Terry, Ferdinand and Cole. Their failure to balance those midfielders is precisely why talent alone cannot decide a prime. Italia 90 and Euro 96 also carry emotional claims without the final proof of 1966.",
  },
  liverpool: {
    caseFor: "Liverpool 2018/19 could win more than one kind of match. The press started from Salah, Mané and Firmino rather than from a slogan; Trent and Robertson supplied the width that let the midfield stay compact; van Dijk and Alisson turned a previously fragile defence into the platform for 97 league points. Madrid against Tottenham was a final they controlled, not a final they escaped.",
    counterCase: "2004/05 have the night that still travels. A fifth-placed league side beat Milan from 3–0 down because Gerrard, Alonso and a goalkeeper who guessed right refused to accept the score. If prime means the season that most completely expresses Liverpool as a European myth, Istanbul leads — and it should, as a story. It should not automatically lead as a starting XI.",
    sections: [
      {
        heading: "Two European Cups, two jobs",
        paragraphs: [
          "Liverpool’s modern prime is a fork, not a ranking of trophies. Both of these sides won the Champions League. Only one of them spent a league season looking like the best team in England. 2004/05 were 37 points behind Chelsea and still came home from Istanbul with the cup. 2018/19 lost the league by a point to a 98-point City side and still won Europe without needing a miracle at 3–0 down.",
          "Paisley’s 1970s teams are not in this simulator, which is a limit worth stating. This page compares the two Liverpools we can actually play. It is not a claim that 1984 never happened.",
        ],
      },
      {
        heading: "Why Istanbul is the cultural answer",
        paragraphs: [
          "The 2005 final is the reason people who do not follow the Premier League still know Gerrard’s name. Dudek’s save from Shevchenko, the three goals in six minutes, the shootout: it is a complete folk tale. Hamann coming on to sit in front of the defence is the tactical detail the film often skips. Alonso’s penalty rebound is the other.",
          "The league table is the limit. Fifth is fifth. Baroš and Kewell were not Salah and Mané. A simulator that keeps giving 2004/05 the same territorial control as 2018/19 is flattening a cup run into a false dynasty.",
        ],
      },
      {
        heading: "Why 2018/19 is the stronger team",
        paragraphs: [
          "Klopp’s side could press a back line into a mistake and still defend a lead. Firmino’s work without the ball let Salah finish rather than drop. van Dijk’s recovery runs made a high line survivable. The Barcelona night — 4–0 at Anfield after 3–0 down from the first leg — looks like Istanbul until you watch the rest of the season: this team did that sort of thing while also taking 97 points.",
          "The Madrid final against Tottenham was 2–0 and never a shootout. That is the point. Prime, for a football team rather than a story, is the version that does not need chaos to be itself.",
        ],
      },
      {
        heading: "The verdict, with the argument left open",
        paragraphs: [
          "If one match had to be played against another elite historical side, pick 2018/19. The defence is better, the press is coordinated, and the attack has three finishers instead of one captain dragging a cup run.",
          "If the question is which season most completely represents Liverpool in Europe, pick 2004/05. The club’s idea of itself is still that night in orange. Playing peak: 2018/19. Defining night: Istanbul.",
        ],
      },
    ],
  },
}

export function getPrimeEditorial(slug: string): PrimeEditorial | undefined {
  return PRIME_EDITORIAL[slug]
}
