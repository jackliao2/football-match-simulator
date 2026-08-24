import type { HistoricalTeam } from "@/types"
import { EXPANDED_PLAYER_NATIONS } from "@/data/player-nations-expanded"

const TEAM_FLAG: Record<string, string> = {
  brazil: "BR",
  argentina: "AR",
  france: "FR",
  spain: "ES",
  germany: "DE",
  italy: "IT",
  netherlands: "NL",
  england: "EN",
  portugal: "PT",
  croatia: "HR",
  uruguay: "UY",
  belgium: "BE",
  hungary: "HU",
  colombia: "CO",
  denmark: "DK",
  mexico: "MX",
  usa: "US",
  japan: "JP",
  "south-korea": "KR",
  morocco: "MA",
  senegal: "SN",
  sweden: "SE",
  greece: "GR",
  turkey: "TR",
  chile: "CL",
  wales: "WA",
  nigeria: "NG",
  cameroon: "CM",
  czechia: "CZ",
}

const BY_NATION: Record<string, string[]> = {
  ES: [
    "Andrés Iniesta", "Xavi", "Sergio Busquets", "Carles Puyol", "Gerard Piqué",
    "Víctor Valdés", "David Villa", "Pedro", "Jordi Alba", "Sergi Roberto",
    "Cesc Fàbregas", "David Silva", "Iker Casillas", "Sergio Ramos", "Xabi Alonso",
    "Fernando Torres", "Joan Capdevila", "Jesús Navas", "Juan Mata", "Pepe Reina",
    "Raúl Albiol", "Carlos Marchena", "Álvaro Arbeloa", "Isco", "Nacho",
    "Iker Casillas", "Asier Illarramendi", "Jesé", "Kiko Casilla", "Diego López",
    "José Manuel Pinto", "Andreu Fontàs", "Jeffrén", "Marc Bartra", "Rafinha",
    "Pedro", "Bojan Krkić", "Cesc Fàbregas",
  ],
  AR: [
    "Lionel Messi", "Ángel Di María", "Javier Mascherano", "Gonzalo Montiel",
    "Emiliano Martínez", "Cristian Romero", "Nicolás Otamendi", "Nicolás Tagliafico",
    "Rodrigo De Paul", "Enzo Fernández", "Alexis Mac Allister", "Julián Álvarez",
    "Lautaro Martínez", "Leandro Paredes", "Marcos Acuña", "Lisandro Martínez",
    "Papu Gómez", "Germán Pezzella", "Exequiel Palacios", "Franco Armani",
    "Diego Maradona", "Jorge Valdano", "Jorge Burruchaga", "Oscar Ruggeri",
    "José Luis Brown", "José Luis Cuciuffo", "Nery Pumpido", "Sergio Batista",
    "Héctor Enrique", "Julio Olarticoechea", "Ricardo Giusti", "Pedro Pasculli",
    "Claudio Borghi", "Oscar Garré", "Daniel Passarella", "Ricardo Bochini",
    "Carlos Tapia", "Luis Islas", "Héctor Zelada", "Marcelo Trobbiani",
    "Javier Zanetti", "Esteban Cambiasso", "Diego Milito", "Lionel Scaloni",
    "Ramón Díaz",
  ],
  BR: [
    "Dani Alves", "Kaká", "Ronaldinho", "Ronaldo", "Rivaldo", "Roberto Carlos",
    "Cafu", "Marcos", "Lúcio", "Edmílson", "Roque Júnior", "Gilberto Silva",
    "Kléberson", "Denílson", "Edílson", "Juninho Paulista", "Belletti",
    "Anderson Polga", "Ricardinho", "Dida", "Luizão", "Pelé", "Jairzinho",
    "Tostão", "Rivelino", "Gérson", "Clodoaldo", "Carlos Alberto", "Brito",
    "Piazza", "Everaldo", "Félix", "Edu", "Paulo Cézar Caju", "Roberto",
    "Fontana", "Baldocchi", "Marco Antônio", "Ado", "Leão", "Zé Maria",
    "Casemiro", "Marcelo", "Thiago Silva", "Alisson", "Ederson", "Fabinho",
    "Roberto Firmino", "Neymar", "Philippe Coutinho", "Thiago Alcântara",
    "Anderson", "Adriano", "Maxwell", "Sylvinho", "Rafael Márquez",
  ],
  FR: [
    "Thierry Henry", "Zinedine Zidane", "Lilian Thuram", "Marcel Desailly",
    "Laurent Blanc", "Bixente Lizarazu", "Didier Deschamps", "Emmanuel Petit",
    "Youri Djorkaeff", "Stéphane Guivarc'h", "David Trezeguet", "Robert Pirès",
    "Patrick Vieira", "Alain Boghossian", "Frank Leboeuf", "Vincent Candela",
    "Christian Karembeu", "Bernard Lama", "Christophe Dugarry", "Hugo Lloris",
    "Antoine Griezmann", "Kylian Mbappé", "Paul Pogba", "N'Golo Kanté",
    "Olivier Giroud", "Blaise Matuidi", "Samuel Umtiti", "Benjamin Pavard",
    "Lucas Hernández", "Presnel Kimpembe", "Djibril Sidibé", "Ousmane Dembélé",
    "Nabil Fekir", "Corentin Tolisso", "Steven Nzonzi", "Steve Mandanda",
    "Florian Thauvin", "Karim Benzema", "Patrice Evra", "Franck Ribéry",
    "Eric Abidal", "Gaël Clichy", "Djibril Cissé", "Nicolas Anelka",
    "William Gallas", "Claude Makélélé", "Kingsley Coman", "Benjamin Mendy",
  ],
  DE: [
    "Manuel Neuer", "Toni Kroos", "Mesut Özil", "Bastian Schweinsteiger",
    "Philipp Lahm", "Jérôme Boateng", "Mats Hummels", "Thomas Müller",
    "Miroslav Klose", "Sami Khedira", "Benedikt Höwedes", "André Schürrle",
    "Mario Götze", "Christoph Kramer", "Per Mertesacker", "Shkodran Mustafi",
    "Lukas Podolski", "Julian Draxler", "Roman Weidenfeller", "Erik Durm",
    "Joshua Kimmich", "Leon Goretzka", "Serge Gnabry", "Niklas Süle",
    "İlkay Gündoğan", "Mesut Özil", "Leroy Sané", "Antonio Rüdiger",
    "Marc-André ter Stegen", "Thomas Vermaelen", "Mario Gomez", "Holger Badstuber",
    "Toni Kroos", "Ilkay Gundogan",
    "Jürgen Klinsmann", "Lothar Matthäus", "Andreas Brehme", "Rudi Völler",
    "Pierre Littbarski", "Guido Buchwald", "Bodo Illgner", "Jürgen Kohler",
    "Thomas Häßler", "Andreas Möller", "Karl-Heinz Riedle", "Stefan Reuter",
  ],
  IT: [
    "Andrea Pirlo", "Paolo Maldini", "Alessandro Nesta", "Gennaro Gattuso",
    "Filippo Inzaghi", "Alessandro Del Piero", "Francesco Totti", "Gianluigi Buffon",
    "Fabio Cannavaro", "Marco Materazzi", "Gianluca Zambrotta", "Fabio Grosso",
    "Simone Perrotta", "Luca Toni", "Mauro Camoranesi", "Alberto Gilardino",
    "Vincenzo Iaquinta", "Daniele De Rossi", "Massimo Oddo", "Andrea Barzagli",
    "Gianluca Pessotto", "Angelo Peruzzi", "Massimo Ambrosini", "Daniele Bonera",
    "Cristian Brocchi", "Francesco Toldo", "Gianluca Zambrotta", "Buffon",
    "Gianluigi Buffon", "Gennaro Gattuso", "Clarence Seedorf",
    "Giuseppe Bergomi", "Riccardo Ferri", "Andrea Mandorlini", "Giuseppe Baresi",
    "Nicola Berti", "Aldo Serena", "Alessandro Bianchi", "Pietro Fanna",
    "Corrado Verdelli", "Astutillo Malgioglio", "Gianfranco Matteoli",
    "Massimo Ciocci", "Enrico Cucchi", "Walter Zenga",
  ],
  NL: [
    "Johan Cruyff", "Johan Neeskens", "Rob Rensenbrink", "Johnny Rep",
    "Ruud Krol", "Wim Jansen", "Willem van Hanegem", "Arie Haan", "Wim Rijsbergen",
    "Wim Suurbier", "Jan Jongbloed", "Piet Keizer", "Theo de Jong",
    "René van de Kerkhof", "Willy van de Kerkhof", "Piet Schrijvers", "Ruud Geels",
    "Wietze Veenstra", "Arjen Robben", "Wesley Sneijder", "Rafael van der Vaart",
    "Virgil van Dijk", "Georginio Wijnaldum", "Memphis Depay", "Frenkie de Jong",
    "Edwin van der Sar", "Raimond van der Gouw", "Dirk Kuyt", "Nigel de Jong",
    "Robin van Persie", "Dennis Bergkamp",
  ],
  PT: [
    "Cristiano Ronaldo", "Pepe", "Fábio Coentrão", "Deco", "Ricardo Carvalho",
    "Nani", "Rui Costa", "Figo", "Ricardo Quaresma", "Rúben Dias", "Bernardo Silva",
    "João Cancelo", "Rui Patrício",
  ],
  EN: [
    "Wayne Rooney", "David Beckham", "Paul Scholes", "Gary Neville", "Phil Neville",
    "Rio Ferdinand", "John O'Shea", "Michael Carrick", "Ashley Cole", "Sol Campbell",
    "Steven Gerrard", "Frank Lampard", "John Terry", "Joe Gomez", "Jordan Henderson",
    "Trent Alexander-Arnold", "Harry Kane", "Raheem Sterling", "Kyle Walker",
    "John Stones", "Phil Foden", "Jack Grealish", "Cole Palmer", "Kalvin Phillips",
    "James Milner", "Adam Lallana", "Alex Oxlade-Chamberlain", "Harry Kewell",
    "Andy Cole", "Teddy Sheringham", "Nicky Butt", "Wes Brown", "David May",
    "Ray Parlour", "Martin Keown", "Stuart Taylor", "Steve Finnan", "Jamie Carragher",
    "Scott Carson", "Stephen Warnock", "Josemi", "Owen Hargreaves", "Jermain Defoe",
    "Michael Owen", "Alan Shearer", "Paul Ince", "David Seaman", "Tony Adams",
    "Lee Dixon", "Nigel Winterburn", "Ian Wright", "Chris Waddle", "Paul Gascoigne",
    "Glenn Hoddle", "Peter Beardsley", "Gary Lineker", "John Barnes", "Chris Woods",
    "Des Walker", "Mark Wright", "Stuart Pearce", "David Platt", "Paul Parker",
    "Tony Dorigo", "Nigel Clough", "Andy Sinton", "Ian Walker", "Tim Flowers",
    "Gareth Southgate", "Sol Campbell", "Rio Ferdinand", "Ledley King",
    "Jermaine Jenas", "Scott Parker", "Gareth Barry", "Frank Lampard",
    "Steven Gerrard", "Joe Cole", "Shaun Wright-Phillips", "Jermain Defoe",
    "Peter Crouch", "Emile Heskey", "Darren Bent", "Theo Walcott", "Aaron Lennon",
    "Ashley Young", "James Milner", "Leighton Baines", "Glen Johnson",
    "Phil Jagielka", "Joleon Lescott", "Gary Cahill", "Chris Smalling",
    "Phil Jones", "Luke Shaw", "Dele Alli", "Eric Dier", "Danny Rose",
    "Kieran Trippier", "Jordan Pickford", "Nick Pope", "Declan Rice",
    "Mason Mount", "Bukayo Saka", "Jude Bellingham", "Harry Maguire",
    "John Stones", "Kyle Walker", "Marcus Rashford", "Jack Grealish",
    "Phil Foden", "Trent Alexander-Arnold", "Reece James", "Conor Gallagher",
    "Rico Lewis", "Cole Palmer", "Divock Origi", "Louis Saha",
  ],
  WA: ["Ryan Giggs", "Gareth Bale", "Aaron Ramsey", "Joe Allen", "Wayne Hennessey"],
  IE: ["Roy Keane", "Denis Irwin", "Shay Given", "Robbie Keane", "John O'Shea"],
  SCT: ["Kenny Dalglish", "Darren Fletcher", "Scott McTominay"],
  SE: ["Fredrik Ljungberg", "Henning Berg", "Olof Mellberg", "Zlatan Ibrahimović", "Patrik Andersson"],
  NO: ["Ole Gunnar Solskjær", "Ronny Johnsen", "John Arne Riise", "Erling Haaland", "Tomasz Kuszczak"],
  DK: ["Peter Schmeichel", "Christian Eriksen", "Dennis Rommedahl"],
  FI: ["Sami Hyypiä", "Jari Litmanen"],
  BE: ["Eden Hazard", "Thibaut Courtois", "Kevin De Bruyne", "Romelu Lukaku", "Vincent Kompany", "Axel Witsel"],
  CH: ["Xherdan Shaqiri", "Granit Xhaka", "Yann Sommer"],
  AT: ["David Alaba", "Marko Arnautović"],
  PL: ["Robert Lewandowski", "Wojciech Szczęsny", "Jakub Błaszczykowski", "Jerzy Dudek"],
  CZ: ["Milan Baroš", "Vladimír Šmicer", "Petr Čech", "Tomáš Rosický", "Pavel Nedvěd"],
  HR: [
    "Luka Modrić", "Ivan Rakitić", "Mario Mandžukić", "Ivan Perišić", "Mateo Kovačić",
    "Dejan Lovren", "Vedran Ćorluka", "Darijo Srna",
  ],
  RS: ["Nemanja Vidić", "Dejan Stanković", "Branislav Ivanović", "Nemanja Matić", "Dušan Tadić"],
  BA: ["Edin Džeko", "Miralem Pjanić"],
  SI: ["Samir Handanović", "Josip Iličić"],
  MK: ["Goran Pandev"],
  HU: ["Balázs Dzsudzsák"],
  RO: ["Gheorghe Hagi", "Cristian Chivu", "Adrian Mutu"],
  GR: ["Giorgos Karagounis", "Sokratis Papastathopoulos"],
  TR: ["Hakan Şükür", "Arda Turan", "Nuri Şahin"],
  RU: ["Andrey Arshavin", "Igor Akinfeev"],
  UA: ["Anatoliy Tymoshchuk", "Andriy Shevchenko", "Andriy Yarmolenko"],
  GE: ["Kakha Kaladze"],
  UY: ["Luis Suárez", "Diego Forlán", "Edinson Cavani", "Diego Godín", "Fernando Muslera"],
  CO: ["James Rodríguez", "Radamel Falcao", "Juan Cuadrado"],
  CL: ["Alexis Sánchez", "Arturo Vidal", "Claudio Bravo", "Gary Medel"],
  MX: ["Javier Hernández", "Rafael Márquez", "Hirving Lozano"],
  US: ["Landen Donovan", "Clint Dempsey"],
  CA: ["Alphonso Davies"],
  CR: ["Keylor Navas", "Bryan Ruiz"],
  JP: ["Shinji Kagawa", "Keisuke Honda"],
  KR: ["Park Ji-sung", "Son Heung-min"],
  AU: ["Harry Kewell", "Mark Viduka", "Tim Cahill"],
  EG: ["Mohamed Salah"],
  SN: ["Sadio Mané", "Kalidou Koulibaly"],
  CI: ["Yaya Touré", "Didier Drogba", "Kolo Touré", "Wilfried Zaha"],
  CM: ["Samuel Eto'o", "Rigobert Song", "Alex Song"],
  ML: ["Seydou Keita", "Mahamadou Diarra", "Djimi Traoré"],
  GN: ["Naby Keïta"],
  GH: ["Michael Essien", "Asamoah Gyan", "Sulley Muntari"],
  NG: ["Nwankwo Kanu", "Jay-Jay Okocha", "Joseph Yobo", "John Obi Mikel", "Alex Iwobi"],
  MA: ["Hakim Ziyech", "Achraf Hakimi"],
  DZ: ["Riyad Mahrez", "Islam Slimani"],
  TN: ["Wahbi Khazri"],
  CD: ["Dieumerci Mbokani"],
  AO: ["Manucho"],
  ZA: ["Benni McCarthy", "Lucas Radebe"],
  IR: ["Ali Daei"],
  SA: ["Salem Al-Dawsari"],
  AL: ["Lorik Cana"],
  XK: ["Xherdan Shaqiri"],
  BR2: [],
  PE: ["Paolo Guerrero", "Jefferson Farfán"],
  PY: ["Roque Santa Cruz", "Oscar Cardozo"],
  EC: ["Antonio Valencia", "Enner Valencia"],
  VE: ["Salomón Rondón"],
  BO: ["Marcelo Martins"],
  GT: ["Carlos Ruiz"],
  HN: ["David Suazo"],
  PA: ["Luis Tejada"],
  CU: [],
  PR: [],
  TT: ["Dwight Yorke", "Shaka Hislop"],
  JM: ["Raheem Sterling", "Ricardo Gardner"],
  BB: [],
  GY: [],
  SR: ["Clarence Seedorf", "Edgar Davids", "Jimmy Floyd Hasselbaink"],
  CW: ["Georginio Wijnaldum"],
  BY: ["Alexander Hleb"],
  LV: ["Maris Verpakovskis"],
  LT: ["Tomas Danilevičius"],
  EE: ["Ragnar Klavan"],
  IS: ["Gylfi Sigurðsson", "Eidur Gudjohnsen"],
  FO: [],
  LU: [],
  MT: [],
  CY: [],
  BG: ["Dimitar Berbatov", "Martin Petrov"],
  MD: [],
  AM: ["Henrikh Mkhitaryan"],
  AZ: [],
  KZ: [],
  UZ: [],
  KG: [],
  TJ: [],
  TM: [],
  MN: [],
  TW: [],
  HK: [],
  SG: [],
  MY: [],
  TH: [],
  VN: [],
  ID: [],
  PH: [],
  IN: [],
  PK: [],
  BD: [],
  LK: [],
  NP: [],
  MM: [],
  KH: [],
  LA: [],
  BN: [],
  TL: [],
  NZ: ["Winston Reid"],
  FJ: [],
  PG: [],
  SB: [],
  VU: [],
  WS: [],
  TO: [],
  KI: [],
  TV: [],
  NR: [],
  PW: [],
  FM: [],
  MH: [],
  CK: [],
  NU: [],
  TK: [],
  AS: [],
  GU: [],
  MP: [],
  VI: [],
  PR2: [],
  IL: ["Yossi Benayoun"],
  JO: [],
  LB: [],
  SY: [],
  IQ: [],
  YE: [],
  OM: [],
  AE: [],
  QA: [],
  KW: [],
  BH: [],
  AF: [],
  PK2: [],
  PS: [],
  LY: [],
  SD: [],
  SS: [],
  ET: [],
  ER: [],
  DJ: [],
  SO: [],
  KE: [],
  TZ: [],
  UG: [],
  RW: [],
  BI: [],
  MZ: [],
  ZW: [],
  ZM: [],
  MW: [],
  NA: [],
  BW: [],
  SZ: [],
  LS: [],
  MG: [],
  MU: [],
  SC: [],
  KM: [],
  YT: [],
  RE: [],
  CV: [],
  GW: [],
  SL: [],
  LR: [],
  TG: ["Emmanuel Adebayor"],
  BJ: [],
  NE: [],
  BF: [],
  MR: [],
  GM: [],
  ST: [],
  GQ: [],
  GA: ["Pierre-Emerick Aubameyang"],
  CG: [],
  CF: [],
  TD: [],
  CM2: [],
  SK: ["Marek Jankulovski"],
  CZ2: [],
  PL2: [],
  LT2: [],
  LV2: [],
  EE2: [],
  FI2: [],
  SE2: [],
  NO2: [],
  DK2: [],
  IS2: [],
  IE2: [],
  GB: [],
  UK: [],
  XI: [],
  CAT: [],
  EU: [],
}

const PLAYER_NATION: Record<string, string> = {}
for (const [code, names] of Object.entries(BY_NATION)) {
  for (const name of names) {
    if (!PLAYER_NATION[name]) PLAYER_NATION[name] = code.length === 2 ? code : code.slice(0, 2)
  }
}

PLAYER_NATION["Clarence Seedorf"] = "NL"
PLAYER_NATION["Edgar Davids"] = "NL"
PLAYER_NATION["Georginio Wijnaldum"] = "NL"
PLAYER_NATION["Alphonso Davies"] = "CA"
PLAYER_NATION["Keylor Navas"] = "CR"
PLAYER_NATION["Park Ji-sung"] = "KR"
PLAYER_NATION["Harry Kewell"] = "AU"
PLAYER_NATION["Mohamed Salah"] = "EG"
PLAYER_NATION["Sadio Mané"] = "SN"
PLAYER_NATION["Samuel Eto'o"] = "CM"
PLAYER_NATION["Yaya Touré"] = "CI"
PLAYER_NATION["Kolo Touré"] = "CI"
PLAYER_NATION["Seydou Keita"] = "ML"
PLAYER_NATION["Djimi Traoré"] = "ML"
PLAYER_NATION["Naby Keïta"] = "GN"
PLAYER_NATION["Sulley Muntari"] = "GH"
PLAYER_NATION["Nwankwo Kanu"] = "NG"
PLAYER_NATION["Riyad Mahrez"] = "DZ"
PLAYER_NATION["Erling Haaland"] = "NO"
PLAYER_NATION["Kevin De Bruyne"] = "BE"
PLAYER_NATION["Virgil van Dijk"] = "NL"
PLAYER_NATION["Luis Suárez"] = "UY"
PLAYER_NATION["James Rodríguez"] = "CO"
PLAYER_NATION["Claudio Bravo"] = "CL"
PLAYER_NATION["Rafael Márquez"] = "MX"
PLAYER_NATION["Xherdan Shaqiri"] = "CH"
PLAYER_NATION["David Alaba"] = "AT"
PLAYER_NATION["Robert Lewandowski"] = "PL"
PLAYER_NATION["Luka Modrić"] = "HR"
PLAYER_NATION["Ivan Rakitić"] = "HR"
PLAYER_NATION["Nemanja Vidić"] = "RS"
PLAYER_NATION["Goran Pandev"] = "MK"
PLAYER_NATION["Cristian Chivu"] = "RO"
PLAYER_NATION["Anatoliy Tymoshchuk"] = "UA"
PLAYER_NATION["Kakha Kaladze"] = "GE"
PLAYER_NATION["Alexander Hleb"] = "BY"
PLAYER_NATION["Dwight Yorke"] = "TT"
PLAYER_NATION["Marek Jankulovski"] = "CZ"
PLAYER_NATION["Jerzy Dudek"] = "PL"
PLAYER_NATION["Pepe"] = "PT"
PLAYER_NATION["Cristiano Ronaldo"] = "PT"
PLAYER_NATION["Nani"] = "PT"
PLAYER_NATION["Ricardo Quaresma"] = "PT"
PLAYER_NATION["Rúben Dias"] = "PT"
PLAYER_NATION["Bernardo Silva"] = "PT"
PLAYER_NATION["Thiago Alcântara"] = "ES"
PLAYER_NATION["Diego Forlán"] = "UY"
PLAYER_NATION["Edinson Cavani"] = "UY"
PLAYER_NATION["Walter Samuel"] = "AR"
PLAYER_NATION["Esteban Cambiasso"] = "AR"
PLAYER_NATION["Javier Zanetti"] = "AR"
PLAYER_NATION["Diego Milito"] = "AR"
PLAYER_NATION["Javier Mascherano"] = "AR"
PLAYER_NATION["Ángel Di María"] = "AR"
PLAYER_NATION["Lionel Messi"] = "AR"
PLAYER_NATION["Sergio Agüero"] = "AR"
PLAYER_NATION["Carlos Tevez"] = "AR"
PLAYER_NATION["Gonzalo Higuaín"] = "AR"
PLAYER_NATION["Paulo Dybala"] = "AR"
PLAYER_NATION["Martín Cáceres"] = "UY"
PLAYER_NATION["Diego Godín"] = "UY"
PLAYER_NATION["Fernando Muslera"] = "UY"
PLAYER_NATION["Edinson Cavani"] = "UY"
PLAYER_NATION["Luis Suárez"] = "UY"
PLAYER_NATION["Diego Forlán"] = "UY"
PLAYER_NATION["Cristian Rodríguez"] = "UY"
PLAYER_NATION["Maxi Pereira"] = "UY"
PLAYER_NATION["Egidio Arévalo"] = "UY"
PLAYER_NATION["Sebastián Coates"] = "UY"
PLAYER_NATION["José María Giménez"] = "UY"
PLAYER_NATION["Federico Valverde"] = "UY"
PLAYER_NATION["Darwin Núñez"] = "UY"
PLAYER_NATION["Arrascaeta"] = "UY"
PLAYER_NATION["Nahitan Nández"] = "UY"
PLAYER_NATION["Lucas Torreira"] = "UY"
PLAYER_NATION["Ronald Araújo"] = "UY"
PLAYER_NATION["Maximiliano Gómez"] = "UY"
PLAYER_NATION["Giorgian de Arrascaeta"] = "UY"
PLAYER_NATION["Thiago Motta"] = "IT"
PLAYER_NATION["Júlio César"] = "BR"
PLAYER_NATION["Maicon"] = "BR"
PLAYER_NATION["Lúcio"] = "BR"
PLAYER_NATION["Philippe Coutinho"] = "BR"
PLAYER_NATION["Alisson"] = "BR"
PLAYER_NATION["Ederson"] = "BR"
PLAYER_NATION["Fabinho"] = "BR"
PLAYER_NATION["Roberto Firmino"] = "BR"
PLAYER_NATION["Casemiro"] = "BR"
PLAYER_NATION["Marcelo"] = "BR"
PLAYER_NATION["Dani Alves"] = "BR"
PLAYER_NATION["Thiago Silva"] = "BR"
PLAYER_NATION["David Luiz"] = "BR"
PLAYER_NATION["Willian"] = "BR"
PLAYER_NATION["Oscar"] = "BR"
PLAYER_NATION["Hulk"] = "BR"
PLAYER_NATION["Fred"] = "BR"
PLAYER_NATION["Paulinho"] = "BR"
PLAYER_NATION["Fernandinho"] = "BR"
PLAYER_NATION["Gabriel Jesus"] = "BR"
PLAYER_NATION["Richarlison"] = "BR"
PLAYER_NATION["Vinícius Júnior"] = "BR"
PLAYER_NATION["Rodrygo"] = "BR"
PLAYER_NATION["Endrick"] = "BR"
PLAYER_NATION["João Pedro"] = "BR"
PLAYER_NATION["Savinho"] = "BR"
PLAYER_NATION["Estêvão"] = "BR"
PLAYER_NATION["Andrey Santos"] = "BR"
PLAYER_NATION["Gerson"] = "BR"
PLAYER_NATION["Bruno Guimarães"] = "BR"
PLAYER_NATION["Lucas Paquetá"] = "BR"
PLAYER_NATION["Éder Militão"] = "BR"
PLAYER_NATION["Marquinhos"] = "BR"
PLAYER_NATION["Bremer"] = "BR"
PLAYER_NATION["Danilo"] = "BR"
PLAYER_NATION["Alex Sandro"] = "BR"
PLAYER_NATION["Alex Telles"] = "BR"
PLAYER_NATION["Renan Lodi"] = "BR"
PLAYER_NATION["Guilherme Arana"] = "BR"
PLAYER_NATION["Weverton"] = "BR"
PLAYER_NATION["Bento"] = "BR"
PLAYER_NATION["John"] = "BR"
PLAYER_NATION["Léo Jardim"] = "BR"
PLAYER_NATION["Raphael Veiga"] = "BR"
PLAYER_NATION["Arrascaeta"] = "UY"
PLAYER_NATION["Giorgian de Arrascaeta"] = "UY"
PLAYER_NATION["Neymar"] = "BR"
PLAYER_NATION["Ronaldo"] = "BR"
PLAYER_NATION["Ronaldinho"] = "BR"
PLAYER_NATION["Rivaldo"] = "BR"
PLAYER_NATION["Kaká"] = "BR"
PLAYER_NATION["Pelé"] = "BR"
PLAYER_NATION["Zinedine Zidane"] = "FR"
PLAYER_NATION["Thierry Henry"] = "FR"
PLAYER_NATION["Karim Benzema"] = "FR"
PLAYER_NATION["Kylian Mbappé"] = "FR"
PLAYER_NATION["Antoine Griezmann"] = "FR"
PLAYER_NATION["N'Golo Kanté"] = "FR"
PLAYER_NATION["Paul Pogba"] = "FR"
PLAYER_NATION["Hugo Lloris"] = "FR"
PLAYER_NATION["Raphaël Varane"] = "FR"
PLAYER_NATION["Samuel Umtiti"] = "FR"
PLAYER_NATION["Presnel Kimpembe"] = "FR"
PLAYER_NATION["Ousmane Dembélé"] = "FR"
PLAYER_NATION["Kingsley Coman"] = "FR"
PLAYER_NATION["Christopher Nkunku"] = "FR"
PLAYER_NATION["Aurélien Tchouaméni"] = "FR"
PLAYER_NATION["Eduardo Camavinga"] = "FR"
PLAYER_NATION["Dayot Upamecano"] = "FR"
PLAYER_NATION["William Saliba"] = "FR"
PLAYER_NATION["Ibrahima Konaté"] = "FR"
PLAYER_NATION["Jules Koundé"] = "FR"
PLAYER_NATION["Theo Hernández"] = "FR"
PLAYER_NATION["Lucas Hernández"] = "FR"
PLAYER_NATION["Mike Maignan"] = "FR"
PLAYER_NATION["Alphonse Areola"] = "FR"
PLAYER_NATION["Brice Samba"] = "FR"
PLAYER_NATION["Randal Kolo Muani"] = "FR"
PLAYER_NATION["Marcus Thuram"] = "FR"
PLAYER_NATION["Bradley Barcola"] = "FR"
PLAYER_NATION["Désiré Doué"] = "FR"
PLAYER_NATION["Warren Zaïre-Emery"] = "FR"
PLAYER_NATION["Manu Koné"] = "FR"
PLAYER_NATION["Adrien Rabiot"] = "FR"
PLAYER_NATION["Youssouf Fofana"] = "FR"
PLAYER_NATION["Boubacar Kamara"] = "FR"
PLAYER_NATION["Mattéo Guendouzi"] = "FR"
PLAYER_NATION["Maxence Lacroix"] = "FR"
PLAYER_NATION["Castello Lukeba"] = "FR"
PLAYER_NATION["Malo Gusto"] = "FR"
PLAYER_NATION["Jonathan Clauss"] = "FR"
PLAYER_NATION["Benjamin Pavard"] = "FR"
PLAYER_NATION["Jules Koundé"] = "FR"
PLAYER_NATION["William Saliba"] = "FR"
PLAYER_NATION["Dayot Upamecano"] = "FR"
PLAYER_NATION["Ibrahima Konaté"] = "FR"
PLAYER_NATION["Lucas Hernández"] = "FR"
PLAYER_NATION["Theo Hernández"] = "FR"
PLAYER_NATION["Ferland Mendy"] = "FR"
PLAYER_NATION["Lucas Digne"] = "FR"
PLAYER_NATION["Benjamin Mendy"] = "FR"
PLAYER_NATION["Djibril Sidibé"] = "FR"
PLAYER_NATION["Bacary Sagna"] = "FR"
PLAYER_NATION["Patrice Evra"] = "FR"
PLAYER_NATION["Eric Abidal"] = "FR"
PLAYER_NATION["Gaël Clichy"] = "FR"
PLAYER_NATION["William Gallas"] = "FR"
PLAYER_NATION["Lilian Thuram"] = "FR"
PLAYER_NATION["Marcel Desailly"] = "FR"
PLAYER_NATION["Laurent Blanc"] = "FR"
PLAYER_NATION["Bixente Lizarazu"] = "FR"
PLAYER_NATION["Robert Pirès"] = "FR"
PLAYER_NATION["Patrick Vieira"] = "FR"
PLAYER_NATION["Claude Makélélé"] = "FR"
PLAYER_NATION["Franck Ribéry"] = "FR"
PLAYER_NATION["Samir Nasri"] = "FR"
PLAYER_NATION["Yoann Gourcuff"] = "FR"
PLAYER_NATION["Hatem Ben Arfa"] = "FR"
PLAYER_NATION["Karim Benzema"] = "FR"
PLAYER_NATION["Olivier Giroud"] = "FR"
PLAYER_NATION["André-Pierre Gignac"] = "FR"
PLAYER_NATION["Loïc Rémy"] = "FR"
PLAYER_NATION["Mathieu Valbuena"] = "FR"
PLAYER_NATION["Blaise Matuidi"] = "FR"
PLAYER_NATION["Moussa Sissoko"] = "FR"
PLAYER_NATION["Lassana Diarra"] = "FR"
PLAYER_NATION["Alou Diarra"] = "FR"
PLAYER_NATION["Rio Mavuba"] = "FR"
PLAYER_NATION["Jérémy Toulalan"] = "FR"
PLAYER_NATION["Jérémy Mathieu"] = "FR"
PLAYER_NATION["Adil Rami"] = "FR"
PLAYER_NATION["Raphaël Varane"] = "FR"
PLAYER_NATION["Mapou Yanga-Mbiwa"] = "FR"
PLAYER_NATION["Eliaquim Mangala"] = "FR"
PLAYER_NATION["Kurt Zouma"] = "FR"
PLAYER_NATION["Samuel Umtiti"] = "FR"
PLAYER_NATION["Aymeric Laporte"] = "ES"
PLAYER_NATION["Nathan Aké"] = "NL"
PLAYER_NATION["Manuel Akanji"] = "CH"
PLAYER_NATION["Rodri"] = "ES"
PLAYER_NATION["Pedro"] = "ES"
PLAYER_NATION["David Villa"] = "ES"
PLAYER_NATION["Fernando Torres"] = "ES"
PLAYER_NATION["Cesc Fàbregas"] = "ES"
PLAYER_NATION["David Silva"] = "ES"
PLAYER_NATION["Santi Cazorla"] = "ES"
PLAYER_NATION["Juan Mata"] = "ES"
PLAYER_NATION["Andrés Iniesta"] = "ES"
PLAYER_NATION["Xavi"] = "ES"
PLAYER_NATION["Sergio Busquets"] = "ES"
PLAYER_NATION["Sergio Ramos"] = "ES"
PLAYER_NATION["Gerard Piqué"] = "ES"
PLAYER_NATION["Carles Puyol"] = "ES"
PLAYER_NATION["Iker Casillas"] = "ES"
PLAYER_NATION["Pepe Reina"] = "ES"
PLAYER_NATION["David de Gea"] = "ES"
PLAYER_NATION["Unai Simón"] = "ES"
PLAYER_NATION["Robert Sánchez"] = "ES"
PLAYER_NATION["Kepa Arrizabalaga"] = "ES"
PLAYER_NATION["Álvaro Morata"] = "ES"
PLAYER_NATION["Ferran Torres"] = "ES"
PLAYER_NATION["Ansu Fati"] = "ES"
PLAYER_NATION["Pedri"] = "ES"
PLAYER_NATION["Gavi"] = "ES"
PLAYER_NATION["Lamine Yamal"] = "ES"
PLAYER_NATION["Nico Williams"] = "ES"
PLAYER_NATION["Mikel Oyarzabal"] = "ES"
PLAYER_NATION["Dani Olmo"] = "ES"
PLAYER_NATION["Fabián Ruiz"] = "ES"
PLAYER_NATION["Mikel Merino"] = "ES"
PLAYER_NATION["Martín Zubimendi"] = "ES"
PLAYER_NATION["Rodri"] = "ES"
PLAYER_NATION["Aymeric Laporte"] = "ES"
PLAYER_NATION["Aymeric Laporte"] = "ES"
PLAYER_NATION["Robin Le Normand"] = "ES"
PLAYER_NATION["Dani Vivian"] = "ES"
PLAYER_NATION["Dani Carvajal"] = "ES"
PLAYER_NATION["Jesús Navas"] = "ES"
PLAYER_NATION["Marc Cucurella"] = "ES"
PLAYER_NATION["Alejandro Grimaldo"] = "ES"
PLAYER_NATION["Óscar Mingueza"] = "ES"
PLAYER_NATION["Pau Cubarsí"] = "ES"
PLAYER_NATION["Aymeric Laporte"] = "ES"
PLAYER_NATION["Josemi"] = "ES"
PLAYER_NATION["Fernando Morientes"] = "ES"
PLAYER_NATION["Luis García"] = "ES"
PLAYER_NATION["Pepe Reina"] = "ES"
PLAYER_NATION["Xabi Alonso"] = "ES"
PLAYER_NATION["Cesc Fàbregas"] = "ES"
PLAYER_NATION["David Silva"] = "ES"
PLAYER_NATION["Santi Cazorla"] = "ES"
PLAYER_NATION["Juan Mata"] = "ES"
PLAYER_NATION["Pedro"] = "ES"
PLAYER_NATION["David Villa"] = "ES"
PLAYER_NATION["Fernando Torres"] = "ES"
PLAYER_NATION["Fernando Llorente"] = "ES"
PLAYER_NATION["Álvaro Negredo"] = "ES"
PLAYER_NATION["Diego Costa"] = "ES"
PLAYER_NATION["Paco Alcácer"] = "ES"
PLAYER_NATION["Iago Aspas"] = "ES"
PLAYER_NATION["Gerard Moreno"] = "ES"
PLAYER_NATION["Joselu"] = "ES"
PLAYER_NATION["Mikel Oyarzabal"] = "ES"
PLAYER_NATION["Ferran Torres"] = "ES"
PLAYER_NATION["Ansu Fati"] = "ES"
PLAYER_NATION["Lamine Yamal"] = "ES"
PLAYER_NATION["Nico Williams"] = "ES"
PLAYER_NATION["Dani Olmo"] = "ES"
PLAYER_NATION["Pedri"] = "ES"
PLAYER_NATION["Gavi"] = "ES"
PLAYER_NATION["Fabián Ruiz"] = "ES"
PLAYER_NATION["Mikel Merino"] = "ES"
PLAYER_NATION["Martín Zubimendi"] = "ES"
PLAYER_NATION["Rodri"] = "ES"
PLAYER_NATION["Sergio Busquets"] = "ES"
PLAYER_NATION["Sergio Ramos"] = "ES"
PLAYER_NATION["Gerard Piqué"] = "ES"
PLAYER_NATION["Carles Puyol"] = "ES"
PLAYER_NATION["Jordi Alba"] = "ES"
PLAYER_NATION["Jordi Alba"] = "ES"
PLAYER_NATION["Dani Alves"] = "BR"
PLAYER_NATION["Javier Mascherano"] = "AR"
PLAYER_NATION["Lionel Messi"] = "AR"
PLAYER_NATION["Luis Suárez"] = "UY"
PLAYER_NATION["Neymar"] = "BR"
PLAYER_NATION["Ivan Rakitić"] = "HR"
PLAYER_NATION["Sergio Busquets"] = "ES"
PLAYER_NATION["Andrés Iniesta"] = "ES"
PLAYER_NATION["Xavi"] = "ES"
PLAYER_NATION["Claudio Bravo"] = "CL"
PLAYER_NATION["Marc-André ter Stegen"] = "DE"
PLAYER_NATION["Jordi Alba"] = "ES"
PLAYER_NATION["Javier Mascherano"] = "AR"
PLAYER_NATION["Gerard Piqué"] = "ES"
PLAYER_NATION["Dani Alves"] = "BR"
PLAYER_NATION["Jeremy Mathieu"] = "FR"
PLAYER_NATION["Marc Bartra"] = "ES"
PLAYER_NATION["Sergi Roberto"] = "ES"
PLAYER_NATION["Rafinha"] = "BR"
PLAYER_NATION["Pedro"] = "ES"
PLAYER_NATION["Adriano"] = "BR"
PLAYER_NATION["Thomas Vermaelen"] = "BE"
PLAYER_NATION["Yaya Touré"] = "CI"
PLAYER_NATION["Seydou Keita"] = "ML"
PLAYER_NATION["Alexander Hleb"] = "BY"
PLAYER_NATION["Bojan Krkić"] = "ES"
PLAYER_NATION["Sylvinho"] = "BR"
PLAYER_NATION["José Manuel Pinto"] = "ES"
PLAYER_NATION["Martín Cáceres"] = "UY"
PLAYER_NATION["Ibrahim Afellay"] = "NL"
PLAYER_NATION["Maxwell"] = "BR"
PLAYER_NATION["Andreu Fontàs"] = "ES"
PLAYER_NATION["Jeffrén"] = "VE"
PLAYER_NATION["Rafael Márquez"] = "MX"
PLAYER_NATION["Eric Abidal"] = "FR"
PLAYER_NATION["Thierry Henry"] = "FR"
PLAYER_NATION["Samuel Eto'o"] = "CM"
PLAYER_NATION["Lionel Messi"] = "AR"
PLAYER_NATION["Andrés Iniesta"] = "ES"
PLAYER_NATION["Xavi"] = "ES"
PLAYER_NATION["Sergio Busquets"] = "ES"
PLAYER_NATION["Carles Puyol"] = "ES"
PLAYER_NATION["Gerard Piqué"] = "ES"
PLAYER_NATION["Dani Alves"] = "BR"
PLAYER_NATION["Víctor Valdés"] = "ES"
PLAYER_NATION["David Villa"] = "ES"
PLAYER_NATION["Pedro"] = "ES"
PLAYER_NATION["Javier Mascherano"] = "AR"
PLAYER_NATION["Seydou Keita"] = "ML"
PLAYER_NATION["Adriano"] = "BR"
PLAYER_NATION["Maxwell"] = "BR"
PLAYER_NATION["Ibrahim Afellay"] = "NL"
PLAYER_NATION["Bojan Krkić"] = "ES"
PLAYER_NATION["José Manuel Pinto"] = "ES"
PLAYER_NATION["Andreu Fontàs"] = "ES"
PLAYER_NATION["Jeffrén"] = "VE"
PLAYER_NATION["Claudio Bravo"] = "CL"
PLAYER_NATION["Marc-André ter Stegen"] = "DE"
PLAYER_NATION["Luis Suárez"] = "UY"
PLAYER_NATION["Neymar"] = "BR"
PLAYER_NATION["Ivan Rakitić"] = "HR"
PLAYER_NATION["Jordi Alba"] = "ES"
PLAYER_NATION["Jeremy Mathieu"] = "FR"
PLAYER_NATION["Marc Bartra"] = "ES"
PLAYER_NATION["Sergi Roberto"] = "ES"
PLAYER_NATION["Rafinha"] = "BR"
PLAYER_NATION["Thomas Vermaelen"] = "BE"
PLAYER_NATION["Cristiano Ronaldo"] = "PT"
PLAYER_NATION["Karim Benzema"] = "FR"
PLAYER_NATION["Gareth Bale"] = "WA"
PLAYER_NATION["Luka Modrić"] = "HR"
PLAYER_NATION["Xabi Alonso"] = "ES"
PLAYER_NATION["Ángel Di María"] = "AR"
PLAYER_NATION["Marcelo"] = "BR"
PLAYER_NATION["Pepe"] = "PT"
PLAYER_NATION["Sergio Ramos"] = "ES"
PLAYER_NATION["Dani Carvajal"] = "ES"
PLAYER_NATION["Iker Casillas"] = "ES"
PLAYER_NATION["Raphaël Varane"] = "FR"
PLAYER_NATION["Isco"] = "ES"
PLAYER_NATION["Álvaro Morata"] = "ES"
PLAYER_NATION["Asier Illarramendi"] = "ES"
PLAYER_NATION["Fábio Coentrão"] = "PT"
PLAYER_NATION["Sami Khedira"] = "DE"
PLAYER_NATION["Diego López"] = "ES"
PLAYER_NATION["Álvaro Arbeloa"] = "ES"
PLAYER_NATION["Jesé"] = "ES"
PLAYER_NATION["Keylor Navas"] = "CR"
PLAYER_NATION["Casemiro"] = "BR"
PLAYER_NATION["Toni Kroos"] = "DE"
PLAYER_NATION["Marco Asensio"] = "ES"
PLAYER_NATION["Mateo Kovačić"] = "HR"
PLAYER_NATION["James Rodríguez"] = "CO"
PLAYER_NATION["Lucas Vázquez"] = "ES"
PLAYER_NATION["Nacho"] = "ES"
PLAYER_NATION["Kiko Casilla"] = "ES"
PLAYER_NATION["Peter Schmeichel"] = "DK"
PLAYER_NATION["Gary Neville"] = "EN"
PLAYER_NATION["Jaap Stam"] = "NL"
PLAYER_NATION["Ronny Johnsen"] = "NO"
PLAYER_NATION["Denis Irwin"] = "IE"
PLAYER_NATION["David Beckham"] = "EN"
PLAYER_NATION["Roy Keane"] = "IE"
PLAYER_NATION["Paul Scholes"] = "EN"
PLAYER_NATION["Ryan Giggs"] = "WA"
PLAYER_NATION["Dwight Yorke"] = "TT"
PLAYER_NATION["Andy Cole"] = "EN"
PLAYER_NATION["Ole Gunnar Solskjær"] = "NO"
PLAYER_NATION["Teddy Sheringham"] = "EN"
PLAYER_NATION["Nicky Butt"] = "EN"
PLAYER_NATION["Phil Neville"] = "EN"
PLAYER_NATION["Jesper Blomqvist"] = "SE"
PLAYER_NATION["Henning Berg"] = "NO"
PLAYER_NATION["David May"] = "EN"
PLAYER_NATION["Raimond van der Gouw"] = "NL"
PLAYER_NATION["Wes Brown"] = "EN"
PLAYER_NATION["Edwin van der Sar"] = "NL"
PLAYER_NATION["Rio Ferdinand"] = "EN"
PLAYER_NATION["Nemanja Vidić"] = "RS"
PLAYER_NATION["Patrice Evra"] = "FR"
PLAYER_NATION["Cristiano Ronaldo"] = "PT"
PLAYER_NATION["Michael Carrick"] = "EN"
PLAYER_NATION["Wayne Rooney"] = "EN"
PLAYER_NATION["Carlos Tevez"] = "AR"
PLAYER_NATION["Owen Hargreaves"] = "EN"
PLAYER_NATION["Anderson"] = "BR"
PLAYER_NATION["Nani"] = "PT"
PLAYER_NATION["Park Ji-sung"] = "KR"
PLAYER_NATION["John O'Shea"] = "IE"
PLAYER_NATION["Louis Saha"] = "FR"
PLAYER_NATION["Tomasz Kuszczak"] = "PL"
PLAYER_NATION["Gerard Piqué"] = "ES"
PLAYER_NATION["Jens Lehmann"] = "DE"
PLAYER_NATION["Lauren"] = "CM"
PLAYER_NATION["Sol Campbell"] = "EN"
PLAYER_NATION["Kolo Touré"] = "CI"
PLAYER_NATION["Ashley Cole"] = "EN"
PLAYER_NATION["Fredrik Ljungberg"] = "SE"
PLAYER_NATION["Patrick Vieira"] = "FR"
PLAYER_NATION["Gilberto Silva"] = "BR"
PLAYER_NATION["Robert Pirès"] = "FR"
PLAYER_NATION["Dennis Bergkamp"] = "NL"
PLAYER_NATION["Thierry Henry"] = "FR"
PLAYER_NATION["José Antonio Reyes"] = "ES"
PLAYER_NATION["Sylvain Wiltord"] = "FR"
PLAYER_NATION["Nwankwo Kanu"] = "NG"
PLAYER_NATION["Edu"] = "BR"
PLAYER_NATION["Ray Parlour"] = "EN"
PLAYER_NATION["Martin Keown"] = "EN"
PLAYER_NATION["Gaël Clichy"] = "FR"
PLAYER_NATION["Pascal Cygan"] = "FR"
PLAYER_NATION["Stuart Taylor"] = "EN"
PLAYER_NATION["Jerzy Dudek"] = "PL"
PLAYER_NATION["Steve Finnan"] = "IE"
PLAYER_NATION["Jamie Carragher"] = "EN"
PLAYER_NATION["Sami Hyypiä"] = "FI"
PLAYER_NATION["Djimi Traoré"] = "ML"
PLAYER_NATION["Luis García"] = "ES"
PLAYER_NATION["Steven Gerrard"] = "EN"
PLAYER_NATION["Xabi Alonso"] = "ES"
PLAYER_NATION["John Arne Riise"] = "NO"
PLAYER_NATION["Milan Baroš"] = "CZ"
PLAYER_NATION["Harry Kewell"] = "AU"
PLAYER_NATION["Dietmar Hamann"] = "DE"
PLAYER_NATION["Djibril Cissé"] = "FR"
PLAYER_NATION["Vladimír Šmicer"] = "CZ"
PLAYER_NATION["Igor Bišćan"] = "HR"
PLAYER_NATION["Antonio Núñez"] = "ES"
PLAYER_NATION["Stephen Warnock"] = "EN"
PLAYER_NATION["Scott Carson"] = "EN"
PLAYER_NATION["Josemi"] = "ES"
PLAYER_NATION["Fernando Morientes"] = "ES"
PLAYER_NATION["Alisson"] = "BR"
PLAYER_NATION["Trent Alexander-Arnold"] = "EN"
PLAYER_NATION["Joël Matip"] = "CM"
PLAYER_NATION["Virgil van Dijk"] = "NL"
PLAYER_NATION["Andrew Robertson"] = "SCT"
PLAYER_NATION["Fabinho"] = "BR"
PLAYER_NATION["Jordan Henderson"] = "EN"
PLAYER_NATION["Georginio Wijnaldum"] = "NL"
PLAYER_NATION["Mohamed Salah"] = "EG"
PLAYER_NATION["Roberto Firmino"] = "BR"
PLAYER_NATION["Sadio Mané"] = "SN"
PLAYER_NATION["Joe Gomez"] = "EN"
PLAYER_NATION["Dejan Lovren"] = "HR"
PLAYER_NATION["Naby Keïta"] = "GN"
PLAYER_NATION["James Milner"] = "EN"
PLAYER_NATION["Xherdan Shaqiri"] = "CH"
PLAYER_NATION["Divock Origi"] = "BE"
PLAYER_NATION["Alex Oxlade-Chamberlain"] = "EN"
PLAYER_NATION["Adam Lallana"] = "EN"
PLAYER_NATION["Adrián"] = "ES"
PLAYER_NATION["Dida"] = "BR"
PLAYER_NATION["Massimo Oddo"] = "IT"
PLAYER_NATION["Alessandro Nesta"] = "IT"
PLAYER_NATION["Paolo Maldini"] = "IT"
PLAYER_NATION["Marek Jankulovski"] = "CZ"
PLAYER_NATION["Gennaro Gattuso"] = "IT"
PLAYER_NATION["Andrea Pirlo"] = "IT"
PLAYER_NATION["Massimo Ambrosini"] = "IT"
PLAYER_NATION["Clarence Seedorf"] = "NL"
PLAYER_NATION["Kaká"] = "BR"
PLAYER_NATION["Filippo Inzaghi"] = "IT"
PLAYER_NATION["Cafu"] = "BR"
PLAYER_NATION["Kakha Kaladze"] = "GE"
PLAYER_NATION["Alberto Gilardino"] = "IT"
PLAYER_NATION["Ronaldo"] = "BR"
PLAYER_NATION["Yoann Gourcuff"] = "FR"
PLAYER_NATION["Serginho"] = "BR"
PLAYER_NATION["Daniele Bonera"] = "IT"
PLAYER_NATION["Željko Kalac"] = "AU"
PLAYER_NATION["Cristian Brocchi"] = "IT"
PLAYER_NATION["Júlio César"] = "BR"
PLAYER_NATION["Maicon"] = "BR"
PLAYER_NATION["Lúcio"] = "BR"
PLAYER_NATION["Walter Samuel"] = "AR"
PLAYER_NATION["Javier Zanetti"] = "AR"
PLAYER_NATION["Esteban Cambiasso"] = "AR"
PLAYER_NATION["Thiago Motta"] = "IT"
PLAYER_NATION["Wesley Sneijder"] = "NL"
PLAYER_NATION["Samuel Eto'o"] = "CM"
PLAYER_NATION["Goran Pandev"] = "MK"
PLAYER_NATION["Diego Milito"] = "AR"
PLAYER_NATION["Cristian Chivu"] = "RO"
PLAYER_NATION["Iván Córdoba"] = "CO"
PLAYER_NATION["Dejan Stanković"] = "RS"
PLAYER_NATION["Patrick Vieira"] = "FR"
PLAYER_NATION["Sulley Muntari"] = "GH"
PLAYER_NATION["Mario Balotelli"] = "IT"
PLAYER_NATION["Marco Materazzi"] = "IT"
PLAYER_NATION["Francesco Toldo"] = "IT"
PLAYER_NATION["Ricardo Quaresma"] = "PT"
PLAYER_NATION["Manuel Neuer"] = "DE"
PLAYER_NATION["Philipp Lahm"] = "DE"
PLAYER_NATION["Jérôme Boateng"] = "DE"
PLAYER_NATION["Dante"] = "BR"
PLAYER_NATION["David Alaba"] = "AT"
PLAYER_NATION["Javi Martínez"] = "ES"
PLAYER_NATION["Bastian Schweinsteiger"] = "DE"
PLAYER_NATION["Arjen Robben"] = "NL"
PLAYER_NATION["Thomas Müller"] = "DE"
PLAYER_NATION["Franck Ribéry"] = "FR"
PLAYER_NATION["Mario Mandžukić"] = "HR"
PLAYER_NATION["Toni Kroos"] = "DE"
PLAYER_NATION["Luiz Gustavo"] = "BR"
PLAYER_NATION["Mario Gomez"] = "DE"
PLAYER_NATION["Xherdan Shaqiri"] = "CH"
PLAYER_NATION["Holger Badstuber"] = "DE"
PLAYER_NATION["Anatoliy Tymoshchuk"] = "UA"
PLAYER_NATION["Claudio Pizarro"] = "PE"
PLAYER_NATION["Tom Starke"] = "DE"
PLAYER_NATION["Diego Contento"] = "DE"
PLAYER_NATION["Benjamin Pavard"] = "FR"
PLAYER_NATION["Alphonso Davies"] = "CA"
PLAYER_NATION["Joshua Kimmich"] = "DE"
PLAYER_NATION["Leon Goretzka"] = "DE"
PLAYER_NATION["Serge Gnabry"] = "DE"
PLAYER_NATION["Kingsley Coman"] = "FR"
PLAYER_NATION["Robert Lewandowski"] = "PL"
PLAYER_NATION["Thiago Alcântara"] = "ES"
PLAYER_NATION["Ivan Perišić"] = "HR"
PLAYER_NATION["Philippe Coutinho"] = "BR"
PLAYER_NATION["Niklas Süle"] = "DE"
PLAYER_NATION["Lucas Hernández"] = "FR"
PLAYER_NATION["Corentin Tolisso"] = "FR"
PLAYER_NATION["Sven Ulreich"] = "DE"
PLAYER_NATION["Ederson"] = "BR"
PLAYER_NATION["Kyle Walker"] = "EN"
PLAYER_NATION["Rúben Dias"] = "PT"
PLAYER_NATION["Manuel Akanji"] = "CH"
PLAYER_NATION["John Stones"] = "EN"
PLAYER_NATION["Rodri"] = "ES"
PLAYER_NATION["Bernardo Silva"] = "PT"
PLAYER_NATION["Kevin De Bruyne"] = "BE"
PLAYER_NATION["İlkay Gündoğan"] = "DE"
PLAYER_NATION["Jack Grealish"] = "EN"
PLAYER_NATION["Erling Haaland"] = "NO"
PLAYER_NATION["Phil Foden"] = "EN"
PLAYER_NATION["Riyad Mahrez"] = "DZ"
PLAYER_NATION["Julián Álvarez"] = "AR"
PLAYER_NATION["Nathan Aké"] = "NL"
PLAYER_NATION["Aymeric Laporte"] = "ES"
PLAYER_NATION["Rico Lewis"] = "EN"
PLAYER_NATION["Kalvin Phillips"] = "EN"
PLAYER_NATION["Stefan Ortega"] = "DE"
PLAYER_NATION["Cole Palmer"] = "EN"
PLAYER_NATION["Lauren"] = "CM"
PLAYER_NATION["Edu"] = "BR"
PLAYER_NATION["Pascal Cygan"] = "FR"
PLAYER_NATION["Jeremy Mathieu"] = "FR"
PLAYER_NATION["Jesper Blomqvist"] = "SE"
PLAYER_NATION["Henning Berg"] = "NO"
PLAYER_NATION["Ibrahim Afellay"] = "NL"
PLAYER_NATION["Maxwell"] = "BR"
PLAYER_NATION["Jeffrén"] = "VE"
PLAYER_NATION["Martín Cáceres"] = "UY"
PLAYER_NATION["Rafinha"] = "BR"
PLAYER_NATION["Adriano"] = "BR"
PLAYER_NATION["Thomas Vermaelen"] = "BE"
PLAYER_NATION["Joël Matip"] = "CM"
PLAYER_NATION["Andrew Robertson"] = "SCT"
PLAYER_NATION["Divock Origi"] = "BE"
PLAYER_NATION["Adrián"] = "ES"
PLAYER_NATION["Željko Kalac"] = "AU"
PLAYER_NATION["Iván Córdoba"] = "CO"
PLAYER_NATION["Mario Balotelli"] = "IT"
PLAYER_NATION["Claudio Pizarro"] = "PE"
PLAYER_NATION["Diego Contento"] = "IT"
PLAYER_NATION["Dante"] = "BR"
PLAYER_NATION["Luiz Gustavo"] = "BR"
PLAYER_NATION["Javi Martínez"] = "ES"
PLAYER_NATION["Thiago Alcântara"] = "ES"
PLAYER_NATION["Philippe Coutinho"] = "BR"
PLAYER_NATION["Lucas Hernández"] = "FR"
PLAYER_NATION["Corentin Tolisso"] = "FR"
PLAYER_NATION["Manuel Akanji"] = "CH"
PLAYER_NATION["Nathan Aké"] = "NL"
PLAYER_NATION["Julián Álvarez"] = "AR"
PLAYER_NATION["Stefan Ortega"] = "DE"
PLAYER_NATION["Rico Lewis"] = "EN"
PLAYER_NATION["Kalvin Phillips"] = "EN"
PLAYER_NATION["Cole Palmer"] = "EN"
PLAYER_NATION["Phil Foden"] = "EN"
PLAYER_NATION["Jack Grealish"] = "EN"
PLAYER_NATION["Kevin De Bruyne"] = "BE"
PLAYER_NATION["Bernardo Silva"] = "PT"
PLAYER_NATION["Rodri"] = "ES"
PLAYER_NATION["John Stones"] = "EN"
PLAYER_NATION["Rúben Dias"] = "PT"
PLAYER_NATION["Kyle Walker"] = "EN"
PLAYER_NATION["Ederson"] = "BR"
PLAYER_NATION["Erling Haaland"] = "NO"
PLAYER_NATION["İlkay Gündoğan"] = "DE"
PLAYER_NATION["Riyad Mahrez"] = "DZ"
PLAYER_NATION["Nahuel Molina"] = "AR"
PLAYER_NATION["Tom Starke"] = "DE"
PLAYER_NATION["Sven Ulreich"] = "DE"
PLAYER_NATION["Steve Finnan"] = "IE"
PLAYER_NATION["Jaap Stam"] = "NL"
PLAYER_NATION["Jesper Blomqvist"] = "SE"
PLAYER_NATION["Arjen Robben"] = "NL"
PLAYER_NATION["Wesley Sneijder"] = "NL"
PLAYER_NATION["Serginho"] = "BR"
PLAYER_NATION["Dante"] = "BR"
PLAYER_NATION["Luiz Gustavo"] = "BR"
PLAYER_NATION["Diego Contento"] = "DE"
PLAYER_NATION["Benedikt Höwedes"] = "DE"
PLAYER_NATION["Miroslav Klose"] = "DE"
PLAYER_NATION["Mario Götze"] = "DE"
PLAYER_NATION["André Schürrle"] = "DE"
PLAYER_NATION["Christoph Kramer"] = "DE"
PLAYER_NATION["Per Mertesacker"] = "DE"
PLAYER_NATION["Shkodran Mustafi"] = "DE"
PLAYER_NATION["Lukas Podolski"] = "DE"
PLAYER_NATION["Julian Draxler"] = "DE"
PLAYER_NATION["Roman Weidenfeller"] = "DE"
PLAYER_NATION["Erik Durm"] = "DE"
PLAYER_NATION["Mats Hummels"] = "DE"
PLAYER_NATION["Simone Perrotta"] = "IT"
PLAYER_NATION["Mauro Camoranesi"] = "IT"
PLAYER_NATION["Vincenzo Iaquinta"] = "IT"
PLAYER_NATION["Daniele De Rossi"] = "IT"
PLAYER_NATION["Andrea Barzagli"] = "IT"
PLAYER_NATION["Alessandro Del Piero"] = "IT"
PLAYER_NATION["Francesco Totti"] = "IT"
PLAYER_NATION["Luca Toni"] = "IT"
PLAYER_NATION["Fabio Cannavaro"] = "IT"
PLAYER_NATION["Fabio Grosso"] = "IT"
PLAYER_NATION["Gianluca Zambrotta"] = "IT"
PLAYER_NATION["Gianluigi Buffon"] = "IT"
PLAYER_NATION["Joan Capdevila"] = "ES"
PLAYER_NATION["Jeremy Mathieu"] = "FR"
PLAYER_NATION["Bojan Krkić"] = "ES"
PLAYER_NATION["Andreu Fontàs"] = "ES"
PLAYER_NATION["José Manuel Pinto"] = "ES"
PLAYER_NATION["Sylvinho"] = "BR"
PLAYER_NATION["Ibrahim Afellay"] = "NL"

const EXTRA_NATIONS: Record<string, string> = {
  "Damien Duff": "IE",
  "Geremi": "CM",
  "Mateja Kežman": "RS",
  "Alexei Smertin": "RU",
  "Carlo Cudicini": "IT",
  "Jiri Jarosik": "CZ",
  "Tiago": "PT",
  "Paulo Ferreira": "PT",
  "José Bosingwa": "PT",
  "Salomon Kalou": "CI",
  "Florent Malouda": "FR",
  "Raul Meireles": "PT",
  "Ross Turnbull": "EN",
  "Daniel Sturridge": "EN",
  "Wayne Bridge": "EN",
  "Eidur Gudjohnsen": "IS",
  "Leonardo Bonucci": "IT",
  "Giorgio Chiellini": "IT",
  "Claudio Marchisio": "IT",
  "Stephan Lichtsteiner": "CH",
  "Marko Pjaca": "HR",
  "Stefano Sturaro": "IT",
  "Neto": "BR",
  "Medhi Benatia": "MA",
  "Tomás Rincón": "VE",
  "Alex Sandro": "BR",
  "Michael Reiziger": "NL",
  "Danny Blind": "NL",
  "Frank de Boer": "NL",
  "Winston Bogarde": "NL",
  "Frank Rijkaard": "NL",
  "Edgar Davids": "NL",
  "Finidi George": "NG",
  "Patrick Kluivert": "NL",
  "Marc Overmars": "NL",
  "Ronald de Boer": "NL",
  "Peter van Vossen": "NL",
  "Fred Grim": "NL",
  "John van den Brom": "NL",
  "Michel Kreek": "NL",
  "Marco Reus": "DE",
  "Sven Bender": "DE",
  "Marcel Schmelzer": "DE",
  "Neven Subotić": "RS",
  "Kevin Großkreutz": "DE",
  "Julian Schieber": "DE",
  "Sebastian Kehl": "DE",
  "Mitchell Langerak": "AU",
  "Felipe Santana": "BR",
  "Moritz Leitner": "DE",
  "Łukasz Piszczek": "PL",
  "Vítor Baía": "PT",
  "Jorge Costa": "PT",
  "Nuno Valente": "PT",
  "Costinha": "PT",
  "Maniche": "PT",
  "Dmitri Alenichev": "RU",
  "Derlei": "BR",
  "Benni McCarthy": "ZA",
  "Edgaras Jankauskas": "LT",
  "Pedro Mendes": "PT",
  "Ricardo Costa": "PT",
  "Carlos Alberto": "BR",
  "Nuno": "PT",
  "Bruno Moraes": "BR",
  "Pedro Emanuel": "AO",
  "Deco": "PT",
  "Juanfran": "ES",
  "Miranda": "BR",
  "Filipe Luís": "BR",
  "Arda Turan": "TR",
  "Gabi": "ES",
  "Koke": "ES",
  "Raúl García": "ES",
  "Mario Suárez": "ES",
  "Adrián López": "ES",
  "Emiliano Insúa": "AR",
  "Cristian Rodríguez": "UY",
  "Daniel Aranzubia": "ES",
  "Giovanni Galli": "IT",
  "Mauro Tassotti": "IT",
  "Alessandro Costacurta": "IT",
  "Franco Baresi": "IT",
  "Angelo Colombo": "IT",
  "Carlo Ancelotti": "IT",
  "Roberto Donadoni": "IT",
  "Ruud Gullit": "NL",
  "Marco van Basten": "NL",
  "Alberigo Evani": "IT",
  "Daniele Massaro": "IT",
  "Pietro Paolo Virdis": "IT",
  "Filippo Galli": "IT",
  "Graziano Mannari": "IT",
  "Christian Lantignotti": "IT",
  "Francesco Antonioli": "IT",
  "Ramires": "BR",
  "David Luiz": "BR",
  "Nicolas Anelka": "FR",
  "Emmanuel Petit": "FR",
  "Steve Bould": "EN",
  "Gilles Grimandi": "FR",
  "Alex Manninger": "AT",
  "Christopher Wreh": "LR",
  "Walter Zenga": "IT",
  "Giuseppe Bergomi": "IT",
  "Riccardo Ferri": "IT",
  "Andrea Mandorlini": "IT",
  "Giuseppe Baresi": "IT",
  "Ramón Díaz": "AR",
  "Aldo Serena": "IT",
  "Leroy Sané": "DE",
  "Fabian Delph": "EN",
  "Sergio Agüero": "AR",
  "Pavel Nedvěd": "CZ",
  "David Trezeguet": "FR",
  "Paolo Montero": "UY",
  "Marcelo Salas": "CL",
  "Antonio Conte": "IT",
  "Ciro Ferrara": "IT",
  "Hakim Ziyech": "MA",
  "Dušan Tadić": "RS",
  "André Onana": "CM",
  "Noussair Mazraoui": "MA",
  "Nicolás Tagliafico": "AR",
  "Kasper Dolberg": "DK",
  "Lasse Schöne": "DK",
  "Sergiño Dest": "US",
  "Ryan Babel": "NL",
  "Joël Veltman": "NL",
  "Perr Schuurs": "NL",
  "Radamel Falcao": "CO",
  "Hulk": "BR",
  "Hélton": "BR",
  "Cristian Săpunaru": "RO",
  "Rolando": "PT",
  "Fredy Guarín": "CO",
  "Fernando": "BR",
  "James Rodríguez": "CO",
  "Jan Oblak": "SI",
  "João Félix": "PT",
  "Marcos Llorente": "ES",
  "Héctor Herrera": "MX",
  "Stefan Savić": "ME",
  "José María Giménez": "UY",
  "Renan Lodi": "BR",
  "Saúl Ñíguez": "ES",
  "Geoffrey Kondogbia": "CF",
  "Hugo Lloris": "FR",
  "Christian Eriksen": "DK",
  "Son Heung-min": "KR",
  "Victor Wanyama": "KE",
  "Mousa Dembélé": "BE",
  "Erik Lamela": "AR",
  "Lucas Moura": "BR",
  "Davinson Sánchez": "CO",
  "Paulo Gazzaniga": "AR",
  "Moussa Sissoko": "FR",
  "Kylian Mbappé": "FR",
  "Neymar": "BR",
  "Marco Verratti": "IT",
  "Thiago Motta": "IT",
  "Alphonse Areola": "FR",
  "Layvin Kurzawa": "FR",
  "Javier Pastore": "AR",
  "Giovani Lo Celso": "AR",
  "Kevin Trapp": "DE",
  "Achraf Hakimi": "MA",
  "Nuno Mendes": "PT",
  "Vitinha": "PT",
  "Fabián Ruiz": "ES",
  "Hugo Ekitike": "FR",
  "Nordi Mukiele": "FR",
  "Warren Zaïre-Emery": "FR",
  "Diego Maradona": "AR",
  "Bruno Giordano": "IT",
  "Andrea Carnevale": "IT",
  "Fernando De Napoli": "IT",
  "Salvatore Bagni": "IT",
  "Victor Osimhen": "NG",
  "Khvicha Kvaratskhelia": "GE",
  "Piotr Zieliński": "PL",
  "Stanislav Lobotka": "SK",
  "André-Frank Zambo Anguissa": "CM",
  "Min-jae Kim": "KR",
  "Amir Rrahmani": "XK",
  "Mathías Olivera": "UY",
  "Hirving Lozano": "MX",
  "Eljif Elmas": "MK",
  "Mário Rui": "PT",
  "Juan Jesus": "BR",
  "Tanguy Ndombele": "FR",
  "Lucas Barrios": "PY",
  "Shinji Kagawa": "JP",
  "António da Silva": "BR",
  "Mohamed Zidan": "EG",
  "Patrick Owomoyela": "DE",
  "Lamine Yamal": "ES",
  "Pau Cubarsí": "ES",
  "Alejandro Balde": "ES",
  "Fermín López": "ES",
  "Marc Casadó": "ES",
  "Pablo Torre": "ES",
  "Iñaki Peña": "ES",
  "Ferran Torres": "ES",
  "Dani Olmo": "ES",
  "Pedri": "ES",
  "Gavi": "ES",
  "Frenkie de Jong": "NL",
  "Jules Koundé": "FR",
  "Wojciech Szczęsny": "PL",
  "Robert Lewandowski": "PL",
  "Raphinha": "BR",
  "Dean Huijsen": "ES",
  "Arda Güler": "TR",
  "Endrick": "BR",
  "Fran García": "ES",
  "Andriy Lunin": "UA",
  "Éder Militão": "BR",
  "Vinícius Júnior": "BR",
  "Rodrygo": "BR",
  "Eduardo Camavinga": "FR",
  "Aurélien Tchouaméni": "FR",
  "Federico Valverde": "UY",
  "Jude Bellingham": "EN",
  "Trent Alexander-Arnold": "EN",
  "Thibaut Courtois": "BE",
  "Brahim Díaz": "ES",
  "Benjamin Šeško": "SI",
  "Amad Diallo": "CI",
  "Patrick Dorgu": "DK",
  "Bryan Mbeumo": "CM",
  "Leny Yoro": "FR",
  "Altay Bayındır": "TR",
  "Viktor Gyökeres": "SE",
  "Myles Lewis-Skelly": "EN",
  "Noni Madueke": "EN",
  "Jurriën Timber": "NL",
  "David Raya": "ES",
  "Martin Ødegaard": "NO",
  "Declan Rice": "EN",
  "Bukayo Saka": "EN",
  "Gabriel Martinelli": "BR",
  "Mikel Merino": "ES",
  "Riccardo Calafiori": "IT",
  "William Saliba": "FR",
  "Alexander Isak": "SE",
  "Jeremie Frimpong": "NL",
  "Giorgi Mamardashvili": "GE",
  "Florian Wirtz": "DE",
  "Dominik Szoboszlai": "HU",
  "Alexis Mac Allister": "AR",
  "Ryan Gravenberch": "NL",
  "Luis Díaz": "CO",
  "Cody Gakpo": "NL",
  "Kostas Tsimikas": "GR",
  "Santiago Giménez": "MX",
  "Strahinja Pavlović": "RS",
  "Samuel Chukwueze": "NG",
  "Christian Pulisic": "US",
  "Youssouf Fofana": "FR",
  "Tijjani Reijnders": "NL",
  "Kyle Walker": "EN",
  "Malick Thiaw": "DE",
  "Yunus Musah": "US",
  "Henrikh Mkhitaryan": "AM",
  "Marcus Thuram": "FR",
  "Nicolò Barella": "IT",
  "Hakan Çalhanoğlu": "TR",
  "Federico Dimarco": "IT",
  "Alessandro Bastoni": "IT",
  "Benjamin Pavard": "FR",
  "Yann Sommer": "CH",
  "Mehdi Taremi": "IR",
  "Carlos Augusto": "BR",
  "Josep Martínez": "ES",
  "Marko Arnautović": "AT",
  "Davide Frattesi": "IT",
  "João Palhinha": "PT",
  "Alphonso Davies": "CA",
  "Konrad Laimer": "AT",
  "Michael Olise": "FR",
  "Aleksandar Pavlović": "DE",
  "Raphaël Guerreiro": "PT",
  "Sven Ulreich": "DE",
  "Savinho": "BR",
  "Rico Lewis": "EN",
  "Omar Marmoush": "EG",
  "Jérémy Doku": "BE",
  "İlkay Gündoğan": "DE",
  "Manuel Akanji": "CH",
  "Mateo Kovačić": "HR",
  "Kevin De Bruyne": "BE",
  "Stefan Ortega": "DE",
  "Erling Haaland": "NO",
  "Phil Foden": "EN",
  "Joško Gvardiol": "HR",
  "Liam Delap": "EN",
  "Pedro Neto": "PT",
  "Cole Palmer": "EN",
  "Moisés Caicedo": "EC",
  "Enzo Fernández": "AR",
  "Marc Cucurella": "ES",
  "Levi Colwill": "EN",
  "Wesley Fofana": "FR",
  "Reece James": "EN",
  "Robert Sánchez": "ES",
  "Nicolas Jackson": "SN",
  "Jadon Sancho": "EN",
  "Malo Gusto": "FR",
  "Romeo Lavia": "BE",
  "Tosin Adarabioyo": "EN",
  "João Pedro": "BR",
  "Filip Jørgensen": "DK",
  "Dušan Vlahović": "RS",
  "Kenan Yıldız": "TR",
  "Francisco Conceição": "PT",
  "Timothy Weah": "US",
  "Khéphren Thuram": "FR",
  "Andrea Cambiaso": "IT",
  "Nicolò Savona": "IT",
  "Michele Di Gregorio": "IT",
  "Douglas Luiz": "BR",
  "Weston McKennie": "US",
  "Samuel Mbangula": "BE",
  "Carlo Pinsoglio": "IT",
  "Mika Godts": "BE",
  "Bertrand Traoré": "BF",
  "Anton Gaaei": "DK",
  "Youri Baas": "NL",
  "Jorrel Hato": "NL",
  "Remko Pasveer": "NL",
  "Kenneth Taylor": "NL",
  "Davy Klaassen": "NL",
  "Brian Brobbey": "NL",
  "Kristian Hlynsson": "IS",
  "Dies Janse": "NL",
  "Jay Gorter": "NL",
  "Chuba Akpom": "EN",
  "Owen Wijndal": "NL",
  "Wout Weghorst": "NL",
  "Steven Berghuis": "NL",
  "Jamie Bynoe-Gittens": "EN",
  "Serhou Guirassy": "GN",
  "Karim Adeyemi": "DE",
  "Julian Brandt": "DE",
  "Felix Nmecha": "DE",
  "Marcel Sabitzer": "AT",
  "Ramy Bensebaini": "DZ",
  "Nico Schlotterbeck": "DE",
  "Waldemar Anton": "DE",
  "Julian Ryerson": "NO",
  "Gregor Kobel": "CH",
  "Maximilian Beier": "DE",
  "Pascal Groß": "DE",
  "Yan Couto": "BR",
  "Alexander Meyer": "DE",
  "Giovanni Reyna": "US",
  "Samu Omorodion": "ES",
  "Wenderson Galeno": "BR",
  "Pepê": "BR",
  "Alan Varela": "AR",
  "Stephen Eustáquio": "CA",
  "Vasco Sousa": "PT",
  "Francisco Moura": "PT",
  "Zé Pedro": "PT",
  "Nehuén Pérez": "AR",
  "João Mário": "PT",
  "Danny Namaso": "EN",
  "Iván Jaime": "ES",
  "Martim Fernandes": "PT",
  "Cláudio Ramos": "PT",
  "Gonçalo Borges": "PT",
  "Marko Grujić": "RS",
  "Zaidu Sanusi": "NG",
  "Alexander Sørloth": "NO",
  "Giuliano Simeone": "AR",
  "Pablo Barrios": "ES",
  "Javi Galán": "ES",
  "Samuel Lino": "BR",
  "Conor Gallagher": "EN",
  "Rodrigo Riquelme": "ES",
  "Juan Musso": "AR",
  "Angel Correa": "AR",
  "Julián Álvarez": "AR",
  "Nahuel Molina": "AR",
  "Robin Le Normand": "ES",
  "Dominic Solanke": "EN",
  "Brennan Johnson": "WA",
  "Destiny Udogie": "IT",
  "Pape Matar Sarr": "SN",
  "Yves Bissouma": "ML",
  "James Maddison": "EN",
  "Pedro Porro": "ES",
  "Micky van de Ven": "NL",
  "Guglielmo Vicario": "IT",
  "Dejan Kulusevski": "SE",
  "Radu Drăgușin": "RO",
  "Wilson Odobert": "FR",
  "Fraser Forster": "EN",
  "Willian Pacho": "EC",
  "João Neves": "PT",
  "Désiré Doué": "FR",
  "Lee Kang-in": "KR",
  "Matvey Safonov": "RU",
  "Bradley Barcola": "FR",
  "Ousmane Dembélé": "FR",
  "Randal Kolo Muani": "FR",
  "Gonçalo Ramos": "PT",
  "David Neres": "BR",
  "Scott McTominay": "SC",
  "Billy Gilmour": "SC",
  "Matteo Politano": "IT",
  "Leonardo Spinazzola": "IT",
  "Alessandro Buongiorno": "IT",
  "Alex Meret": "IT",
  "Giovanni Di Lorenzo": "IT",
  "Cyril Ngonge": "BE",
  "Giacomo Raspadori": "IT",
  "Pierluigi Gollini": "IT",
  "Michael Folorunsho": "IT",
  "Frank Anguissa": "CM",
  "Romelu Lukaku": "BE",
  "André": "BR",
  "Bruno Guimarães": "BR",
  "Lucas Paquetá": "BR",
  "Guilherme Arana": "BR",
  "João Gomes": "BR",
  "Nico Williams": "ES",
  "Álvaro Morata": "ES",
  "Unai Simón": "ES",
  "Martín Zubimendi": "ES",
  "Mikel Oyarzabal": "ES",
  "Aymeric Laporte": "ES",
  "Kai Havertz": "DE",
  "Jamal Musiala": "DE",
  "Robert Andrich": "DE",
  "David Raum": "DE",
  "Niclas Füllkrug": "DE",
  "Jonathan Tah": "DE",
  "Chris Führich": "DE",
  "Oliver Baumann": "DE",
  "Deniz Undav": "DE",
  "Mateo Retegui": "IT",
  "Riccardo Orsolini": "IT",
  "Sandro Tonali": "IT",
  "Manuel Locatelli": "IT",
  "Federico Chiesa": "IT",
  "Moise Kean": "IT",
  "Lorenzo Pellegrini": "IT",
  "Gianluca Mancini": "IT",
  "Xavi Simons": "NL",
  "Memphis Depay": "NL",
  "Bart Verbruggen": "NL",
  "Denzel Dumfries": "NL",
  "Nathan Aké": "NL",
  "Jerdy Schouten": "NL",
  "Mark Flekken": "NL",
  "Donyell Malen": "NL",
  "Harry Kane": "EN",
  "Jordan Pickford": "EN",
  "John Stones": "EN",
  "Anthony Gordon": "EN",
  "Marc Guéhi": "EN",
  "Kobbie Mainoo": "EN",
  "Ollie Watkins": "EN",
  "Dean Henderson": "EN",
  "Ezri Konsa": "EN",
  "Cristiano Ronaldo": "PT",
  "Rafael Leão": "PT",
  "Bernardo Silva": "PT",
  "Bruno Fernandes": "PT",
  "Rúben Neves": "PT",
  "Rúben Dias": "PT",
  "Diogo Dalot": "PT",
  "Diogo Costa": "PT",
  "António Silva": "PT",
  "João Cancelo": "PT",
  "Rui Silva": "PT",
  "Ante Budimir": "HR",
  "Ivan Perišić": "HR",
  "Luka Modrić": "HR",
  "Mario Pašalić": "HR",
  "Marcelo Brozović": "HR",
  "Josip Šutalo": "HR",
  "Martin Erlić": "HR",
  "Josip Stanišić": "HR",
  "Dominik Livaković": "HR",
  "Andrej Kramarić": "HR",
  "Lovro Majer": "HR",
  "Luka Sučić": "HR",
  "Borna Sosa": "HR",
  "Ivica Ivušić": "HR",
  "Marco Pašalić": "HR",
  "Petar Sučić": "HR",
  "Facundo Pellistri": "UY",
  "Darwin Núñez": "UY",
  "Maximiliano Araújo": "UY",
  "Manuel Ugarte": "UY",
  "Rodrigo Bentancur": "UY",
  "Nahitan Nández": "UY",
  "Sergio Rochet": "UY",
  "Giorgian de Arrascaeta": "UY",
  "Sebastián Cáceres": "UY",
  "Nicolas De la Cruz": "UY",
  "Cristian Olivera": "UY",
  "Mathías Villasanti": "PY",
  "Loïs Openda": "BE",
  "Leandro Trossard": "BE",
  "Amadou Onana": "BE",
  "Youri Tielemans": "BE",
  "Maxim De Cuyper": "BE",
  "Wout Faes": "BE",
  "Zeno Debast": "BE",
  "Thomas Meunier": "BE",
  "Koen Casteels": "BE",
  "Charles De Ketelaere": "BE",
  "Arthur Theate": "BE",
  "Timothy Castagne": "BE",
  "Matz Sels": "BE",
  "Dodi Lukebakio": "BE",
  "Orel Mangala": "BE",
  "Barnabás Varga": "HU",
  "Roland Sallai": "HU",
  "Dániel Gazdag": "HU",
  "Ádám Nagy": "HU",
  "András Schäfer": "HU",
  "Milos Kerkez": "HU",
  "Willi Orbán": "HU",
  "Botond Balogh": "HU",
  "Bendegúz Bolla": "HU",
  "Péter Gulácsi": "HU",
  "Martin Ádám": "HU",
  "Callum Styles": "HU",
  "Attila Szalai": "HU",
  "Dénes Dibusz": "HU",
  "Kevin Csoboth": "HU",
  "Zsolt Nagy": "HU",
  "Loïc Négo": "HU",
  "Jhon Durán": "CO",
  "Jhon Arias": "CO",
  "Richard Ríos": "CO",
  "Jefferson Lerma": "CO",
  "Johan Mojica": "CO",
  "Jhon Lucumí": "CO",
  "Santiago Arias": "CO",
  "Camilo Vargas": "CO",
  "Rafael Santos Borré": "CO",
  "Juan Fernando Quintero": "CO",
  "Yaser Asprilla": "CO",
  "Carlos Cuesta": "CO",
  "Álvaro Montero": "CO",
  "Mateus Uribe": "CO",
  "Luis Sinisterra": "CO",
  "Mikkel Damsgaard": "DK",
  "Rasmus Højlund": "DK",
  "Andreas Skov Olsen": "DK",
  "Pierre-Emile Højbjerg": "DK",
  "Morten Hjulmand": "DK",
  "Victor Kristiansen": "DK",
  "Jannik Vestergaard": "DK",
  "Andreas Christensen": "DK",
  "Joachim Andersen": "DK",
  "Kasper Schmeichel": "DK",
  "Joakim Mæhle": "DK",
  "Alexander Bah": "DK",
  "Frederik Rønnow": "DK",
  "Jonas Wind": "DK",
  "Christian Nørgaard": "DK",
  "Anders Dreyer": "DK",
  "Nico González": "AR",
  "Alberto Méndez": "DE",
  "Alessio Tacchinardi": "IT",
  "Alessandro Birindelli": "IT",
  "Mark Iuliano": "IT",
  "Marco Di Vaio": "IT",
  "Gianluigi Lentini": "IT",
  "Antonio Chimenti": "IT",
  "Matthijs de Ligt": "NL",
  "Daley Blind": "NL",
  "Donny van de Beek": "NL",
  "Klaas-Jan Huntelaar": "NL",
  "Kostas Lamprou": "GR",
  "Álvaro Pereira": "UY",
  "João Moutinho": "PT",
  "Silvestre Varela": "PT",
  "Fernando Belluschi": "AR",
  "Souza": "BR",
  "Jorge Fucile": "UY",
  "Walter": "BR",
  "Betinho": "PT",
  "Toby Alderweireld": "BE",
  "Yannick Carrasco": "BE",
  "Ángel Correa": "AR",
  "Thomas Lemar": "FR",
  "Mario Hermoso": "ES",
  "Šime Vrsaljko": "HR",
  "Ivo Grbić": "HR",
  "Jan Vertonghen": "BE",
  "Ben Davies": "WA",
  "Vincent Janssen": "NL",
  "Michel Vorm": "NL",
  "Harry Winks": "EN",
  "Gianluigi Donnarumma": "IT",
  "Juan Bernat": "ES",
  "Carlos Soler": "ES",
  "Claudio Garella": "IT",
  "Giuseppe Bruscolotti": "IT",
  "Moreno Ferrario": "IT",
  "Alessandro Renica": "IT",
  "Giovanni Francini": "IT",
  "Francesco Romano": "IT",
  "Luigi Caffarelli": "IT",
  "Tito Bigliardi": "AR",
  "Raffaele Di Fusco": "IT",
  "Costanzo Celestini": "IT",
  "Giuseppe Volpecina": "IT",
  "Francesco Baiano": "IT",
  "Iñigo Martínez": "ES",
  "Gabriel": "BR",
  "Thomas Partey": "GH",
  "Ben White": "EN",
  "Wataru Endo": "JP",
  "Fikayo Tomori": "EN",
  "Tammy Abraham": "EN",
  "Ruben Loftus-Cheek": "EN",
  "Davide Calabria": "IT",
  "Marco Sportiello": "IT",
  "Francesco Acerbi": "IT",
  "Stefan de Vrij": "NL",
  "Federico Gatti": "IT",
  "Arkadiusz Milik": "PL",
  "Emre Can": "DE",
  "César Azpilicueta": "ES",
  "Timo Werner": "DE",
}

for (const [name, code] of Object.entries({ ...EXTRA_NATIONS, ...EXPANDED_PLAYER_NATIONS })) {
  if (!PLAYER_NATION[name]) PLAYER_NATION[name] = code
}

const CODE_ALIAS: Record<string, string> = {
  SCT: "SC",
  WAL: "WA",
  ENG: "EN",
  NIR: "NI",
}

export function nationOf(name: string, team?: Pick<HistoricalTeam, "kind" | "clubId">): string {
  const mapped = PLAYER_NATION[name]
  const code = mapped ? (CODE_ALIAS[mapped] ?? mapped) : undefined
  if (code && code.length === 2) return code
  if (team?.kind === "nation") return TEAM_FLAG[team.clubId] ?? "XX"
  return "XX"
}
