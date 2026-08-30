import type { HistoricalTeam } from "@/types"

const EDITORIAL: Record<string, string> = {
  "barcelona-2008-09|real-madrid-2016-17": "Guardiola's first treble side against Zidane's third consecutive Champions League winners. Barcelona 2008/09 invented a new way of occupying the pitch; Madrid 2016/17 specialised in surviving every kind of night and still finding Ronaldo. The argument is control versus a team that did not need control to win.",
  "ac-milan-1988-89|barcelona-2010-11": "Sacchi's Milan tried to compress the pitch until opponents had nowhere clean to play; Guardiola's Barcelona used Messi's false-nine movement to make that space appear anyway. Baresi stepping out against Messi, with Rijkaard screening behind Gullit and Van Basten, is the argument at the heart of this match.",
  "barcelona-2010-11|real-madrid-2016-17": "Barcelona's most controlled Guardiola side meets Madrid's deepest Champions League team. The question is whether Xavi, Busquets and Iniesta can keep the match in midfield before Ronaldo and Bale turn one broken press into open grass.",
  "ajax-1994-95|barcelona-2010-11": "Two descendants of the same football school meet at different stages of its evolution. Van Gaal's young Ajax could press, rotate and attack with width; Guardiola's Barcelona refined those ideas around Messi, Xavi and Iniesta.",
  "ac-milan-1988-89|real-madrid-2016-17": "Milan's offside line and coordinated press face a Madrid side built to survive pressure and punish the first bad step. Baresi and Maldini must control Ronaldo without giving Kroos and Modrić time to change the point of attack.",
  "barcelona-2010-11|manchester-united-1998-99": "Ferguson's treble winners could turn a losing match in minutes; Barcelona tried to deny opponents those minutes altogether. United's wide delivery and two-striker threat offer a route that does not require winning the midfield passing contest.",
  "arsenal-2003-04|manchester-city-2022-23": "The Invincibles' speed through Henry and Pires meets Guardiola's treble-winning positional machine. Arsenal need the game to open; City want Rodri and Stones to close the central lanes before Haaland attacks the box.",
  "arsenal-2003-04|manchester-united-2007-08": "Vieira's Invincibles meet the most balanced United side of the Ronaldo era. Arsenal can carry the ball through pressure, but Ferdinand and Vidić give United the recovery pace and penalty-box control needed to release Ronaldo, Rooney and Tevez.",
  "ac-milan-1988-89|liverpool-2018-19": "Klopp's Liverpool attack the spaces beside a back line; Sacchi's Milan made those spaces move as one unit. The match turns on whether Liverpool's full-backs can deliver before Milan's press forces play back inside.",
  "bayern-munich-2012-13|real-madrid-2016-17": "Bayern's treble side could overwhelm opponents from both wings, while Madrid's 2016/17 team carried elite answers from the starting XI and the bench. Lahm and Alaba advancing leaves exactly the transition space Ronaldo wants.",
  "barcelona-2010-11|inter-milan-2009-10": "This is the rematch between Guardiola's control and Mourinho's resistance, now using Barcelona's stronger 2010/11 version. Inter do not need much of the ball, but they need Sneijder's first pass and Milito's hold-up play to be nearly perfect.",
  "arsenal-2003-04|chelsea-2004-05": "The unbeaten champions meet the side that took the league from them a year later. Arsenal offer more freedom and transition flair; Mourinho's Chelsea bring the stronger defensive record and a midfield designed to remove space from Henry.",
  "barcelona-2010-11|santos-1962": "Pelé's Santos cannot be reduced to one famous name: Coutinho, Pepe and an adventurous structure made them repeat world champions. Barcelona supply the modern pressing test, but Santos have the individual invention to escape a match that becomes unscripted.",
  "argentina-1986|brazil-1970": "Brazil 1970 spread creation across a gifted front five; Argentina 1986 concentrated the decisive moments around Maradona. Brazil have more routes to goal, while Argentina possess the one player most capable of breaking the shape by himself.",
  "brazil-1970|spain-2010": "Brazil's expressive front five meet the World Cup side that controlled matches through possession and rest defence. Spain can slow the rhythm, but Pelé and Jairzinho threaten precisely when a controlled game suddenly becomes individual.",
  "brazil-2002|france-2018": "Two pragmatic world champions with devastating transition attacks. France have the pace and midfield legs to protect space; Brazil have Ronaldo, Rivaldo and Ronaldinho combining behind wing-backs who can turn defence into a five-man attack.",
  "argentina-1986|argentina-2022": "Maradona's Mexico side and Messi's Qatar champions solved tournaments in different ways. The 1986 team placed more creation on one player; Scaloni's group changed shape, found goals around Messi and survived several kinds of match.",
  "france-1998|france-2018": "Deschamps appears on both sides of the argument: midfield ballast in 1998, manager of the transition-heavy 2018 champions. The older defence is harder to move; the newer attack is far more dangerous when Mbappé sees open field.",
  "germany-2014|spain-2010": "The two defining World Cup midfields of the era meet with different intentions. Spain use possession to reduce risk; Germany move the ball forward earlier and bring more runners beyond the striker.",
  "brazil-1982|netherlands-1974": "Two beloved teams that did not win the World Cup meet without the burden of the result that ended them. Cruyff's movement tests Brazil's spacing, while Zico, Sócrates and Falcão can punish the aggressive positions Total Football requires.",
  "brazil-1970|hungary-1954": "The most celebrated World Cup winners face the team whose defeat changed how greatness is remembered. Hungary's movement and early pressing were decades ahead; Brazil bring a deeper collection of one-on-one match-winners.",
  "brazil-2002|italy-2006": "Ronaldo's redemption side meets the strongest defensive champion of the next World Cup. Italy can crowd the central forwards, but Brazil's wing-backs force that compact block to defend the entire width of the pitch.",
  "brazil-1958|brazil-1970": "Pelé at 17 meets Pelé as the organiser of the game's most famous front five. The 1958 side have Garrincha's isolation threat; 1970 offer more coordinated routes through midfield and attack.",
  "france-1984|netherlands-1988": "Platini's European champions meet the only Dutch side to turn their talent into a major trophy. France own the denser creative midfield, while Gullit and Van Basten give the Netherlands more power close to goal.",
  "france-2018|italy-2006": "Italy's veteran defensive craft faces France's younger transition power. Cannavaro and Buffon can keep the box quiet, but Mbappé makes every Italian advance a decision about how much space to risk.",
  "england-1966|germany-1990": "Two world champions built on defensive authority and midfield leadership. England have home-era attacking combinations around Charlton; Germany bring a more modern sweeper system and Matthäus driving through the centre.",
}

export type MatchupFeature = {
  title: string
  context: string
  hinge: string
  reading: string
}

const FEATURES: Record<string, MatchupFeature> = {
  "barcelona-2008-09|real-madrid-2016-17": {
    title: "The first Pep midfield against a side that never needed the ball",
    context: "Barcelona 2008/09 are the origin story of the modern possession argument: Messi beginning to play as a false nine, Xavi and Iniesta circulating until the press broke, and a treble that made the method look inevitable. Madrid 2016/17 are the counter-argument from the next decade. Zidane's side could lose territory for long spells, keep a route to Ronaldo, and still win a Champions League knockout night after the match had seemed to slip away.",
    hinge: "Busquets receiving on the half-turn is the first test. If he can play through Casemiro, Xavi and Iniesta pin Kroos and Modrić into a defensive match and Messi receives between Madrid's lines. If that first connection is broken, Marcelo and Carvajal are already high enough for Bale and Ronaldo to attack the space behind Alves and Abidal. The full-back duel decides whether Barcelona's control becomes a siege or a trap.",
    reading: "A Barcelona win should look territorial: long spells around the Madrid box and a goal after the press has been moved, not a transition race. A Madrid win is more likely to feel stolen — a regain, two vertical passes and elite finishing. Do not read a Barcelona possession advantage as the result; the 2016/17 side were built to stay alive while losing the ball.",
  },
  "ac-milan-1988-89|barcelona-2010-11": {
    title: "Can the greatest press close a false nine?",
    context: "This is more than an argument between two famous possession teams. Milan's reputation was built on collective distances: the back four stepped together, Rijkaard protected the centre and the forwards began the press. Barcelona's answer was to remove the obvious centre-forward altogether. Messi dropping away from Baresi asks whether Milan hold the line, follow him, or hand him to midfield.",
    hinge: "The dangerous moment comes after Barcelona escape the first pressure. If Xavi or Iniesta can turn, Pedro and Villa attack the space behind Milan's advancing full-backs. Milan need Gullit and Donadoni to make Barcelona defend toward their own goal, because Van Basten is far harder to control when the cross arrives before the block is set.",
    reading: "A Barcelona win would usually look territorial: long spells around Milan's box and a decisive pass after the press has been moved. A Milan win is more likely to feel sudden — a regain, two forward passes and elite finishing. The model should reward Barcelona's control without pretending Sacchi's side would passively wait for it.",
  },
  "barcelona-2010-11|real-madrid-2016-17": {
    title: "Control against a team that survived every kind of night",
    context: "This is not simply Messi against Ronaldo. Barcelona 2010/11 are selected because their midfield could dictate where a match happened; Madrid 2016/17 are selected because they could win without requiring one perfect game state. Zidane had passing quality, aerial power, transition speed and a bench capable of changing the final half-hour.",
    hinge: "Busquets is the pressure point. If he receives cleanly behind Madrid's first line, Xavi and Iniesta can pin Kroos and Modrić into a defensive match. If Casemiro disrupts that first connection, Madrid can release Ronaldo before Barcelona's full-backs recover. Marcelo's position is equally risky: he can create Madrid's spare man or leave Messi and Pedro attacking the channel behind him.",
    reading: "Barcelona are likelier to make the match look one-sided before the score is one-sided. Madrid are likelier to remain alive while losing territory. That is why a small Barcelona possession advantage is not enough to settle the page; shots after turnovers, set pieces and the final 25 minutes matter more than a simple pass count.",
  },
  "ajax-1994-95|barcelona-2010-11": {
    title: "The same football language, spoken by different generations",
    context: "Van Gaal's Ajax were not a rough draft of Guardiola's Barcelona. They were European champions in their own right, using a young, physically secure side that could stretch the pitch through Overmars and Finidi while Litmanen arrived between the lines. Barcelona compressed more of the creative burden into a central triangle completed by Messi's movement.",
    hinge: "Rijkaard and Blind must decide who steps toward Messi without opening a lane for Iniesta. At the other end, Ajax need Kluivert to occupy the centre-backs so their wide players can attack Barcelona's aggressive full-back positions. The contest may be decided by which team can keep its width without becoming disconnected from midfield.",
    reading: "The familiar labels can hide the difference. Ajax are taller, more direct and more willing to finish an attack early; Barcelona are better at recycling until the defence loses its reference points. An Ajax win should not be modelled as a lucky counter alone — their press and spacing give them a credible way to control passages too.",
  },
  "ac-milan-1988-89|real-madrid-2016-17": {
    title: "Madrid's many routes meet Milan's single moving line",
    context: "Milan want the pitch compressed and every defender making the same decision. Madrid want the match to keep offering new questions: Ronaldo attacking the far post, Benzema leaving the centre, Marcelo creating on the left and Ramos arriving when the game becomes aerial. It is a test of collective precision against attacking variety.",
    hinge: "The offside line is the spectacle and the risk. Kroos and Modrić can delay a pass until Ronaldo bends his run beyond Tassotti, while Benzema's movement may pull Costacurta away from the cover position. Milan's best protection is not retreating; it is making those passes hurried through the work of Gullit, Rijkaard and Ancelotti.",
    reading: "Milan have the stronger chance if the game stays connected from front to back. Madrid benefit from broken phases, second balls and repeated crosses late in the match. A draw deep into the second half tilts the tactical problem toward Zidane because his side were unusually comfortable changing personnel without losing threat.",
  },
  "barcelona-2010-11|manchester-united-1998-99": {
    title: "Can United turn survival into one of those finishes?",
    context: "Ferguson's treble winners are remembered for late drama, but the side had a repeatable mechanism behind it: width from Beckham and Giggs, two strikers occupying the box, and midfield runners attacking second balls. Barcelona try to remove the repeated attack entirely by keeping United far from crossing positions.",
    hinge: "Beckham against Barcelona's left side is the route United cannot abandon. If he receives early enough to cross before Piqué and Mascherano settle, Yorke and Cole can force a kind of defending Barcelona prefer to avoid. Barcelona's counter is the Xavi–Messi connection around Keane, dragging a central midfielder away before Iniesta attacks the space left behind.",
    reading: "United do not need equal possession to have an equal threat, but they do need enough territory to make corners and wide free kicks accumulate. Barcelona's cleaner wins should come through preventing that pressure from ever forming. The final score can be close even when the two teams are trying to play entirely different matches.",
  },
  "arsenal-2003-04|manchester-city-2022-23": {
    title: "What happens when the Invincibles finally find open grass?",
    context: "City's treble side are built to make transitions rare. Rodri anchors possession, Stones steps into midfield and the rest defence stays close enough to stop the first outlet. Arsenal's most frightening quality is exactly that outlet: Vieira or Gilberto winning the ball and Henry accelerating into a channel before the opponent can reset.",
    hinge: "Arsenal need Henry starting away from Dias rather than wrestling with him centrally. Pires can then arrive inside while Ashley Cole supplies the width. City will try to pin those same players back through Bernardo, De Bruyne and the threat of Haaland. The position of Arsenal's left side may tell us which team has imposed the game.",
    reading: "City should produce more controlled entries and Arsenal the more volatile chances. If the simulator gives Arsenal many settled attacks against a packed box, it has misunderstood their best weapon. If it gives City possession without Haaland occupying Campbell and Touré, it has missed why the 2022/23 version was different from earlier Guardiola teams.",
  },
  "arsenal-2003-04|manchester-united-2007-08": {
    title: "Power through midfield, speed around it",
    context: "The Invincibles could dominate physically without becoming a direct-only side. Vieira carried through pressure, Bergkamp connected the attack and Henry chose when to move outside the centre-backs. United 2007/08 answer with a defence comfortable in space and a front three whose positions were deliberately difficult to pin down.",
    hinge: "Ferdinand's reading against Henry is the headline, but the match may turn one line earlier. If Carrick and Scholes can play around Vieira's pressure, Ronaldo receives while Arsenal's shape is expanding. If Vieira drives beyond them, United's wide forwards must chase back or leave Evra and Brown defending two players.",
    reading: "Arsenal's best version is a flowing match in which their carries keep United retreating. United prefer sharper, shorter attacks and can threaten without committing the same number forward. Neither side should be reduced to pace: the quality of the first midfield pass decides whose pace becomes usable.",
  },
  "ac-milan-1988-89|liverpool-2018-19": {
    title: "Can full-back creation outrun an organised press?",
    context: "Liverpool's width came less from traditional wingers than from Robertson and Alexander-Arnold, with Mané and Salah attacking nearer the goal. Milan's structure is designed to stop exactly that chain of clean progression. The question is whether Liverpool can switch play before Milan's block slides as one.",
    hinge: "Firmino dropping toward Rijkaard creates the central choice. Follow him and Salah can attack the gap; leave him and Liverpool gain a free connector. Milan's response is to make Liverpool's centre-backs pass under pressure, then attack quickly enough that the full-backs cannot recover into the famous narrow distances.",
    reading: "Liverpool's crossing volume matters only if the deliveries arrive from advanced positions. Milan will accept harmless balls from deep and trust Baresi and Costacurta. Milan's own chances may be fewer, but Van Basten and Gullit mean they do not need the same shot volume to make those chances decisive.",
  },
  "bayern-munich-2012-13|real-madrid-2016-17": {
    title: "Two complete Champions League squads, one battle for the flanks",
    context: "Bayern's treble side combined relentless wide attacks with enough midfield strength to stop opponents escaping. Madrid's 2016/17 squad had the deeper set of answers and a forward line built for knockout football. Both can cross, counter and control; the difference is how they create the first imbalance.",
    hinge: "Lahm and Robben against Marcelo's side is the obvious overload, while Alaba and Ribéry can force Carvajal deep on the other flank. Every Bayern advance, however, increases the distance Ronaldo can attack on the turnover. Javi Martínez must decide whether to protect that space or join the pressure on Kroos and Modrić.",
    reading: "Bayern should look stronger when the game is played in waves around Madrid's box. Madrid become more dangerous as the match loses structure and substitutions stretch the pitch. A high possession figure for Bayern is evidence of territory, not automatically evidence that Ronaldo has been controlled.",
  },
  "barcelona-2010-11|inter-milan-2009-10": {
    title: "A stronger Barcelona revisit Mourinho's perfect resistance",
    context: "Inter's 2010 semi-final is already part of the history between these ideas, but this page uses Barcelona's more mature 2010/11 side. Guardiola had a clearer false-nine structure and greater control around Messi. Mourinho still has the defensive distances, experience and transition players needed to make control feel sterile.",
    hinge: "Sneijder's first touch after the regain is Inter's most important action. If Busquets or Mascherano close him immediately, Milito becomes isolated and Barcelona restart the attack. If he turns, Eto'o and Pandev can run into the spaces left by Alves and Abidal while Milito fixes the centre-backs.",
    reading: "Inter's route is narrow but not accidental: protect the box, survive the cutback zones and make the first forward pass count. Barcelona need patience without predictability. An early goal changes more here than in most matchups, because Inter are built to defend a lead and far less comfortable chasing one.",
  },
  "arsenal-2003-04|chelsea-2004-05": {
    title: "The unbeaten champions against the defence that replaced them",
    context: "These teams belong to consecutive league seasons, which makes the comparison unusually concrete. Arsenal offer greater attacking freedom and a more fluid left side; Chelsea offer the best defensive platform of the Premier League era and a midfield constructed to deny the spaces in which Bergkamp and Henry combine.",
    hinge: "Makelele's position is the centre of the board. If Bergkamp draws him away, Lampard and Tiago must protect the centre-backs; if he holds, Arsenal may have to build through Pires and Ashley Cole. Chelsea's counterattack then asks Lauren to handle Duff or Robben without the protection Arsenal normally get from sustained possession.",
    reading: "Arsenal need circulation with acceleration, not possession for its own sake. Chelsea are comfortable letting the match look quiet because Drogba can turn one direct ball into territory and Lampard arrives for the second phase. The matchup should remain low-margin even when Arsenal appear the more expressive team.",
  },
  "barcelona-2010-11|santos-1962": {
    title: "How do you translate Pelé's Santos into a modern press?",
    context: "The historical distance is part of the appeal and the difficulty. Santos were repeat world champions, not a touring exhibition side built around one star. Pelé, Coutinho and Pepe combined improvisation with established relationships, while Barcelona bring a level of coordinated pressing and positional spacing that did not exist in the same form in 1962.",
    hinge: "Santos need the first pass after Barcelona lose the ball to escape the central trap. Pelé can drop toward midfield, but that risks leaving Coutinho alone against the centre-backs. Barcelona must decide whether Busquets follows Pelé or protects the lane behind him, a choice made harder by the Brazilian's ability to turn and carry.",
    reading: "The model treats ratings relative to each era, otherwise the exercise becomes a sports-science comparison rather than a football one. Barcelona should own more rehearsed control; Santos should retain the individual and combination quality to punish any sequence that becomes loose. Certainty would be the least credible output.",
  },
  "argentina-1986|brazil-1970": {
    title: "One supreme organiser against a front five of creators",
    context: "Argentina's title run concentrated responsibility around Maradona without becoming a one-man team. Burruchaga, Valdano and a hard-working midfield gave his freedom a structure. Brazil distributed invention across Pelé, Jairzinho, Rivellino, Tostão and Gérson, making it harder to remove creativity with one defensive plan.",
    hinge: "Brazil's full-backs can push Argentina's wide midfielders deep, but every advance leaves Maradona a larger space for the first dribble. Argentina need Valdano's running to stop Brazil surrounding Maradona with several players. Brazil need Clodoaldo and Piazza to delay him long enough for the shape to recover.",
    reading: "Brazil have more independent routes to a goal and should create the broader attacking distribution. Argentina's route is more concentrated but can still be decisive because Maradona changes territory by himself. The simulation should show Brazil's depth without treating a narrow Argentina win as an impossible upset.",
  },
  "brazil-1970|spain-2010": {
    title: "Can possession make Brazil wait?",
    context: "Spain's World Cup winners controlled risk better than they chased scorelines; Brazil's champions made controlled matches feel suddenly abundant. Spain can keep the ball away from Pelé and Jairzinho for long periods, but their own patient structure gives Brazil time to organise unless Iniesta or Villa breaks a line.",
    hinge: "Busquets and Xabi Alonso must protect the space behind Spain's attacking full-backs. Brazil can release Jairzinho quickly, while Carlos Alberto's overlap creates a second runner on the same side. Spain's answer is to force those players backward through long possessions involving Xavi, Iniesta and the advancing full-back.",
    reading: "A low-scoring first half favours Spain's preferred rhythm but does not remove Brazil's individual threat. Brazil are more likely to turn one goal into an open game; Spain are more likely to turn it into another exercise in control. The scoreline distribution matters more than simply asking which midfield completes more passes.",
  },
  "brazil-2002|france-2018": {
    title: "Two champions who never confused possession with control",
    context: "Both sides could concede the ball without conceding the match. Brazil built around Ronaldo, Rivaldo and Ronaldinho with wing-backs supplying the width. France protected central space through Kanté and Pogba, then released Mbappé into the kind of open field most defenders cannot survive.",
    hinge: "Roberto Carlos and Cafu are both weapons and potential invitations. If they advance together, Mbappé and Griezmann can attack outside Brazil's three centre-backs. If they stay cautious, Brazil lose the width that lets the three forwards combine centrally. Pogba's ability to find the first long pass determines whether France can exploit the risk.",
    reading: "This matchup may produce fewer passes than its collection of stars suggests. Both teams are comfortable waiting for the opponent to expose a transition. Brazil possess the more intricate front combination; France have the clearer recovery speed. The first team forced to chase is also the first team pushed away from its ideal plan.",
  },
  "argentina-1986|argentina-2022": {
    title: "Two captains, two different ways to build around genius",
    context: "The easy framing is Maradona against Messi, but the supporting structures deserve the comparison. Bilardo's 1986 side gave Maradona enormous creative responsibility inside a physically resilient tournament team. Scaloni's 2022 group adjusted formations, found midfield balance and shared decisive moments around Messi rather than asking him to carry every phase.",
    hinge: "The 2022 midfield can crowd Maradona with De Paul, Enzo Fernández and Mac Allister, but doing so leaves Burruchaga and Valdano space to run. The 1986 defence faces the opposite problem: Messi can drop away while Álvarez attacks the line, forcing the spare defender to choose between the pass and the runner.",
    reading: "The older side should show a higher concentration of chances around Maradona; the newer side should spread recoveries, carries and secondary scoring more widely. A result here is not a ranking of the two captains. It is a comparison of how successfully two champion teams converted exceptional freedom into collective balance.",
  },
  "france-1998|france-2018": {
    title: "Deschamps the midfielder meets Deschamps the manager",
    context: "France 1998 won through defensive authority, midfield depth and set-piece strength before their attack fully convinced. France 2018 were younger, faster and unusually comfortable allowing an opponent to have harmless possession. The two sides share pragmatism but express it at different speeds.",
    hinge: "Thuram and Lizarazu must contain Mbappé without giving Griezmann room between midfield and defence. The 2018 side, meanwhile, must defend Zidane's set pieces and late arrivals while keeping Kanté close enough to stop him receiving on the turn. Pogba's longer passing can bypass the older midfield battle entirely.",
    reading: "The 1998 team should reduce the number of clean chances and make dead balls disproportionately important. The 2018 team should create the more dangerous open-field attacks. If possession stays even, that says little; the location of turnovers and which France get to defend facing forward say far more.",
  },
  "germany-2014|spain-2010": {
    title: "The midfield that inherited possession against the one that defined it",
    context: "Spain's 2010 champions used possession as protection, often winning by a single goal while making the opponent's attacks disappear. Germany 2014 absorbed many of those positional lessons but played forward sooner, with more runners arriving around a flexible centre-forward structure.",
    hinge: "Kroos and Schweinsteiger need to escape the pressure of Xavi, Iniesta and Busquets without leaving Özil detached ahead of them. Spain must watch Müller drifting away from the nominal forward line, especially when Lahm or Höwedes create the extra passing angle. The spare midfielder changes from moment to moment.",
    reading: "Spain are likelier to control the rhythm; Germany are likelier to turn a regained ball into several bodies near goal. The simulator should not mistake Germany's greater directness for weaker technique or Spain's possession for constant attacking pressure. This is a contest over when, not whether, to accelerate.",
  },
  "brazil-1982|netherlands-1974": {
    title: "The beautiful side that lost meets the other beautiful side that lost",
    context: "Neither team needs a trophy to justify the page. The Netherlands changed how space and roles were understood; Brazil assembled a midfield and forward group whose technique still defines romantic football. Their defeats also reveal the risks: aggressive positioning can leave the match exposed when control breaks.",
    hinge: "Cruyff's movement asks Brazil's defenders to leave their zones, while Neeskens attacks the opening created. Brazil's answer is not simply to track runners; Zico, Sócrates and Falcão can keep the Dutch press occupied by circulating through players comfortable receiving under pressure. The first broken press may create a chance at either end.",
    reading: "This should be one of the less stable matchups in the catalogue. Both teams can dominate a sequence and still be vulnerable immediately afterward. A tidy low-event simulation would undersell why people remember them. The uncertainty is part of the historical comparison, not noise to be edited away.",
  },
  "brazil-1970|hungary-1954": {
    title: "The standard for winners against the standard for teams that did not win",
    context: "Hungary arrived at the 1954 final unbeaten for years and had already transformed attacking movement; Brazil 1970 became the image against which World Cup winners are still judged. This match asks whether Hungary's structural head start can withstand a deeper collection of Brazilian one-on-one and passing talent.",
    hinge: "Hidegkuti dropping away from centre-forward can pull Brazil's defensive reference apart and release Puskás or Kocsis into the gap. Brazil can respond by making Hungary defend wider than they prefer, with Jairzinho and Rivellino stretching the line before Pelé connects the centre.",
    reading: "Hungary deserve more than the role of brave underdog: their movement and scoring record give them a credible attacking case. Brazil have the greater number of players capable of solving a defended situation alone. The comparison should reward innovation on both sides while recognising that 1970 Brazil finished their tournament story.",
  },
  "brazil-2002|italy-2006": {
    title: "Can Italy close the box without surrendering the wings?",
    context: "Italy's 2006 defence survived different opponents through concentration, positioning and Buffon behind them. Brazil's 2002 structure makes compact defending uncomfortable because Ronaldo and Rivaldo occupy the centre while Cafu and Roberto Carlos demand attention across the full width.",
    hinge: "Cannavaro wants Ronaldo receiving with his back to goal, but Ronaldinho's passing can release him before the defensive line is set. Italy's own route runs through Pirlo: if he escapes Brazil's first pressure, Totti and the wide runners can attack outside the three centre-backs before the wing-backs recover.",
    reading: "Brazil should create the greater variety of attacking positions; Italy should reduce how many become clean shots. Set pieces and goalkeeper performance carry extra weight in a matchup built around elite penalty-box defending. One Brazil goal may force Italy into a more expansive game than Lippi would choose at 0–0.",
  },
  "brazil-1958|brazil-1970": {
    title: "Pelé the teenage finisher against Pelé the complete organiser",
    context: "The same name sits at the centre of two different champions. In 1958 Pelé arrived as an explosive young scorer alongside Garrincha and Vavá. By 1970 he connected a front line full of creators, choosing when to drop, combine and appear in the box rather than carrying the same role throughout.",
    hinge: "Garrincha is the matchup the 1970 side cannot reproduce or casually contain. His isolation threat can pin Everaldo and pull cover away from the centre. The later team answer with more sources of progression: Gérson's passing, Rivellino's left foot and Jairzinho's runs make it harder to direct the attack toward one side.",
    reading: "The 1958 team should have the sharper single-wing threat and a more direct penalty-box presence. The 1970 team should circulate with greater variety and make defensive attention travel further. Comparing the two Pelés is useful only when their different jobs are kept visible.",
  },
  "france-1984|netherlands-1988": {
    title: "Platini's midfield kingdom against Gullit and Van Basten",
    context: "France's European champions crowded the pitch with creators and allowed Platini to arrive as the tournament's decisive scorer. The Netherlands had a more forceful front pairing, with Gullit's power and movement complementing Van Basten's finishing, supported by a midfield capable of controlling the ball.",
    hinge: "Rijkaard must decide how aggressively to follow Platini when the French captain moves beyond the forwards. If he steps out, Tigana and Giresse can combine through the space; if he holds, Platini may receive facing goal. France face a different problem containing Gullit when he leaves the forward line to build momentum.",
    reading: "France should show the denser passing combinations and more midfield arrivals. The Netherlands should produce the greater penalty-box and aerial threat. The matchup can swing without a large statistical edge because both teams contain a player capable of turning a half-chance into the defining image.",
  },
  "france-2018|italy-2006": {
    title: "Mbappé's open field against Cannavaro's closed box",
    context: "Italy were veteran masters of protecting the central route to goal. France were designed to make the opponent expose that route by carrying the ball forward and then striking into the space left behind. It is a matchup between defensive craft and transition speed rather than a simple old-versus-new comparison.",
    hinge: "Italy need Pirlo's first pass to move France's midfield before Kanté can close the regain. France need Griezmann to occupy the space around Pirlo and De Rossi so Mbappé receives outside the centre-backs rather than into their cover. Zambrotta's willingness to advance can either create Italy's outlet or open France's favourite lane.",
    reading: "Italy are capable of making France's attacks look less dangerous than their speed suggests, especially if Buffon controls the space behind the line. France can make Italy's patient build-up feel risky. Expect the model's best explanation to come from transition shots and clean-sheet rates, not possession alone.",
  },
  "england-1966|germany-1990": {
    title: "Home-era combinations against a mature sweeper system",
    context: "England's champions balanced Charlton's carrying and shooting with two forwards and a narrow working midfield. Germany's 1990 winners brought a later tactical vocabulary: Matthäus driving from midfield, wing-backs supplying width and Augenthaler managing space as the spare defender.",
    hinge: "Charlton must find room beyond Germany's midfield without running directly into the sweeper. Germany, in turn, need Matthäus to advance without allowing Ball and Peters to attack the space he leaves. The wing-backs can stretch England's narrow shape, but their high positions may also give England a clearer route toward the two strikers.",
    reading: "Germany should have the structural advantage in width and the cleaner method for carrying possession forward. England retain a strong box presence and several routes from midfield into shooting positions. Historical home advantage is not added to the ratings here; this is the teams on a neutral imagined pitch.",
  },
}

function key(a: string, b: string) {
  return [a, b].sort().join("|")
}

export function matchupEditorial(home: HistoricalTeam, away: HistoricalTeam): string {
  return EDITORIAL[key(home.id, away.id)] ?? `${home.manager}'s ${home.clubName} ${home.displaySeason} bring ${home.formation} and ${home.styleTags.slice(0, 2).join(" with ").toLowerCase()}. ${away.manager}'s ${away.clubName} ${away.displaySeason} answer with ${away.formation} and ${away.styleTags.slice(0, 2).join(" with ").toLowerCase()}; the matchup is decided by which side can impose that identity without exposing its weakest transition.`
}

export function matchupFeature(home: HistoricalTeam, away: HistoricalTeam): MatchupFeature | undefined {
  return FEATURES[key(home.id, away.id)]
}
