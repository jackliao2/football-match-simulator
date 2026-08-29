export type PrimeEditorial = { caseFor: string; counterCase: string }

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
  },
  messi: {
    caseFor: "Messi's 2010/11 role joins individual output to collective control. From false nine he could leave the centre-backs, overload midfield and still arrive as the main scorer. The choice therefore says more than 'best statistics': it identifies the season when his movement made an already historic midfield almost impossible to assign defensively.",
    counterCase: "The 2014/15 argument is that Messi had become the broader attacker. He could begin from the right, create for Suárez and Neymar, carry transitions and decide settled possessions. Readers who value versatility against different defensive schemes may see the MSN season as the fuller version of the player.",
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
}

export function getPrimeEditorial(slug: string): PrimeEditorial | undefined {
  return PRIME_EDITORIAL[slug]
}
