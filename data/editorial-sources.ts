type HistoricalSource = { label: string; url: string }

// These records support historical facts, not the simulator's estimated ratings.
export const EDITORIAL_SOURCES: Record<string, HistoricalSource[]> = {
  "real-madrid-2013-14": [
    { label: "UEFA: 2014 final and Ramos's stoppage-time equaliser", url: "https://www.uefa.com/uefachampionsleague/news/0250-0c51093bd4a7-41ccc377a75c-1000--madrid-finally-fulfil-decima-dream/" },
    { label: "UEFA: Madrid 3–0 Dortmund, 2014 quarter-final first leg", url: "https://www.uefa.com/uefachampionsleague/match/2011872--real-madrid-vs-dortmund/" },
  ],
  "real-madrid-2016-17": [{ label: "UEFA: 2016/17 Champions League season", url: "https://www.uefa.com/uefachampionsleague/history/seasons/2017/" }],
  "barcelona-2010-11": [{ label: "UEFA: 2010/11 Champions League season", url: "https://www.uefa.com/uefachampionsleague/history/seasons/2011/" }],
  "tottenham-2018-19": [
    { label: "UEFA: 2019 final starting line-ups (PDF)", url: "https://www.uefa.com/newsfiles/UCL/2019/2025486_LU.pdf" },
    { label: "UEFA: Ajax 2–3 Tottenham, 2019 semi-final", url: "https://www.uefa.com/uefachampionsleague/news/025d-0f575d3136e5-a7a6ad998126-1000--watch-later-ajax-vs-spurs/" },
  ],
  "ajax-2018-19": [{ label: "UEFA: Ajax–Tottenham goals and match events", url: "https://www.uefa.com/uefachampionsleague/match/2027159--ajax-vs-tottenham/events/" }],
  "juventus-2002-03": [{ label: "UEFA: Milan's 2003 final shootout victory", url: "https://www.uefa.com/uefachampionsleague/news/0253-0d7b3011dd29-b3eede70c2ce-1000/" }],
  "paris-saint-germain-2017-18": [{ label: "UEFA: 2017/18 Champions League technical report (PDF)", url: "https://www.uefa.com/MultimediaFiles/Download/Publications/uefaorg/General/02/56/86/48/2568648_DOWNLOAD.pdf" }],
  "italy-2021": [{ label: "UEFA: Italy 1–1 Spain, 2021 semi-final", url: "https://www.uefa.com/uefaeuro/history/news/026b-12b19306ec6a-4aaeee9fb2ca-1000--italy-1-1-spain-pens-4-2-azzurri-hold-nerve-to-reach-euro-/" }],
  "argentina-1986": [{ label: "FIFA: Argentina 3–2 West Germany, 1986 final", url: "https://www.fifa.com/en/articles/relive-the-1986-fifa-world-cup-mexico-with-full-match-replays-exclusive-videos-interviews-features" }],
  "argentina-2022": [{ label: "FIFA: 2022 final official match report (PDF)", url: "https://fdp.fifa.org/assetspublic/ce44/r2864/pdf/FullTimeMatchReport-English.pdf" }],
  "germany-1990": [{ label: "FIFA: Germany's route through the 1990 tournament", url: "https://inside.fifa.com/en/news/worldcupathome-germany-v-netherlands-1990-3071466" }],
  "germany-2014": [{ label: "FIFA: Brazil–Germany, 2014 semi-final", url: "https://www.fifa.com/de/tournaments/mens/worldcup/articles/brasilien-deutschland-wm-2014" }],
  "brazil-1994": [{ label: "FIFA: Taffarel on the 1994 World Cup and penalty saves", url: "https://www.fifa.com/id/tournaments/mens/worldcup/articles/taffarel-saya-sangat-bangga-brasil-memenangkan-piala-dunia-untuk-senna" }],
  "ac-milan-1988-89": [{ label: "UEFA: Milan's 1988/89 European Cup campaign", url: "https://www.uefa.com/uefachampionsleague/news/0252-0cda61ca82aa-10643d9167f1-1000/" }],
  "ac-milan-2006-07": [{ label: "UEFA: Milan 2–1 Liverpool, 2007 final", url: "https://www.uefa.com/uefachampionsleague/match/300099--milan-vs-liverpool/" }],
  "liverpool-2004-05": [
    { label: "UEFA: the 2005 Istanbul final", url: "https://www.uefa.com/uefachampionsleague/news/0253-0d045053cc3e-58573aba544d-1000--2005-final-highlights-liverpool-3-3-milan-3-2-pens/" },
    { label: "UEFA: Milan's 2007 final win", url: "https://www.uefa.com/uefachampionsleague/match/300099--milan-vs-liverpool/" },
  ],
  "borussia-dortmund-2012-13": [{ label: "UEFA: Götze ruled out of the 2013 final", url: "https://www.uefa.com/uefachampionsleague/news/0209-0e1408b05e71-af8602410075-1000--dortmund-denied-gotze-for-saturday-s-final/" }],
  "inter-milan-2009-10": [{ label: "UEFA: Inter's 2009/10 Champions League season", url: "https://www.uefa.com/uefachampionsleague/history/seasons/2010/" }],
  "inter-milan-1988-89": [{ label: "Inter: the 1988/89 title-winning squad", url: "https://www.inter.it/en/club/palmares/serie-a?season=1988-1989" }],
  "spain-2010": [{ label: "UEFA: Spain's 2010 World Cup final", url: "https://www.uefa.com/european-qualifiers/news/0253-0d7c93af1ed8-28be4efeaa14-1000--iniesta-earns-spain-world-cup-crown/" }],
}
