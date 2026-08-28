import { absoluteUrl } from "@/lib/site"

export const LOCALES = ["es", "pt-br"] as const
export type Locale = (typeof LOCALES)[number]
export type LocalizedSection = "simulate" | "teams" | "national-teams" | "vs"

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale)
}

export function localizedPath(locale: Locale, path = "/") {
  return `/${locale}${path === "/" ? "" : path}`
}

export function languageAlternates(path = "/") {
  return {
    en: absoluteUrl(path),
    es: absoluteUrl(localizedPath("es", path)),
    "pt-BR": absoluteUrl(localizedPath("pt-br", path)),
    "x-default": absoluteUrl(path),
  }
}

export const LOCALIZED_COPY = {
  es: {
    language: "Español",
    nav: { simulate: "Simular", teams: "Clubes", nations: "Selecciones", dreams: "Duelos" },
    home: {
      kicker: "Simulador de partidos de fútbol",
      title: "Leyendas. Épocas. Un partido imposible.",
      tagline: ["Elige un equipo", "Elige una época", "Resuelve el debate"],
      lead: "Elige dos equipos de temporadas distintas. Simula el marcador, los goleadores, el xG y cien versiones del mismo duelo.",
      metaTitle: "Simulador de Partidos de Fútbol | LegendaryMatch",
      metaDescription: "Simulador de fútbol online con equipos de distintas épocas. Enfrenta al Barcelona 2009, Brasil 1970, Real Madrid 2017 y más; descubre marcadores y probabilidades.",
    },
    simulate: {
      title: "Simula cualquier partido de fútbol",
      lead: "Elige dos plantillas de las temporadas disponibles. El motor calcula el resultado; el análisis experto con IA explica el duelo sin decidir al ganador.",
    },
    teams: { title: "Clubes legendarios por temporada", lead: "Plantillas de temporadas históricas y recientes listas para entrar en el simulador." },
    nations: { title: "Selecciones que marcaron una época", lead: "Campeones del mundo y grandes generaciones frente a cualquier club o país disponible." },
    dreams: { title: "Partidos soñados", lead: "Duelos que nunca ocurrieron en su mejor momento, simulados cientos de veces." },
    sections: { dream: "Duelos populares", clubs: "Clubes legendarios", nations: "Selecciones legendarias" },
    links: { all: "Ver todos", simulate: "Abrir el simulador" },
    howTitle: "Cómo funciona el simulador",
    how: [
      ["01", "Elige dos plantillas", "Selecciona un club histórico, una campeona del mundo o una temporada reciente con su once real."],
      ["02", "Juega una noche posible", "El motor combina valoraciones, estilo y una semilla para generar marcador, xG, goleadores y eventos."],
      ["03", "Pon a prueba el debate", "Repite el partido, ejecuta cien simulaciones o usa el análisis experto para entender la táctica."],
    ],
    aboutTitle: "Un simulador para partidos que el tiempo hizo imposibles",
    aboutBody: "LegendaryMatch no intenta reescribir resultados históricos ni predecir apuestas. Convierte plantillas concretas —con temporada, entrenador, formación y jugadores— en enfrentamientos hipotéticos que se pueden repetir y comparar.",
    faqTitle: "Preguntas sobre el simulador",
    faq: [
      ["¿Cómo funciona el simulador?", "Las valoraciones, el estilo, la química y una semilla generan el marcador, el xG, los goleadores y los eventos. La IA solo explica el enfrentamiento."],
      ["¿Puedo enfrentar equipos de épocas distintas?", "Sí. Puedes jugar con Brasil 1970 contra España 2010 o Barcelona 2008/09 contra Real Madrid 2016/17."],
      ["¿Qué significan las 100 simulaciones?", "Muestran la distribución de victorias, empates y marcadores posibles. No convierten un duelo hipotético en una certeza."],
      ["¿Predice partidos reales?", "No. Es una experiencia contrafactual para comparar equipos históricos, no un pronóstico ni una herramienta de apuestas."],
      ["¿Por qué cambia el resultado al repetir?", "Cada nueva semilla representa otra noche posible. Un gran equipo no gana siempre; usa cien partidos para ver la distribución."],
      ["¿Qué hace el análisis experto con IA?", "Lee las plantillas, los entrenadores, las formaciones y la evidencia de cien simulaciones para explicar el duelo. El motor decide los números primero."],
    ],
  },
  "pt-br": {
    language: "Português (Brasil)",
    nav: { simulate: "Simular", teams: "Clubes", nations: "Seleções", dreams: "Duelos" },
    home: {
      kicker: "Simulador de partidas de futebol",
      title: "Lendas. Eras. Um jogo impossível.",
      tagline: ["Escolha um time", "Escolha uma era", "Resolva o debate"],
      lead: "Escolha dois times de temporadas diferentes. Simule o placar, os gols, o xG e cem versões do mesmo confronto.",
      metaTitle: "Simulador de Jogos de Futebol | LegendaryMatch",
      metaDescription: "Simulador de futebol online com times de diferentes épocas. Coloque Barcelona 2009, Brasil 1970, Real Madrid 2017 e outros frente a frente.",
    },
    simulate: {
      title: "Simule qualquer partida de futebol",
      lead: "Escolha dois elencos de qualquer época. O motor calcula o resultado; a análise especializada por IA explica o duelo sem escolher o vencedor.",
    },
    teams: { title: "Clubes lendários por temporada", lead: "Elencos de temporadas históricas e recentes prontos para entrar no simulador." },
    nations: { title: "Seleções que marcaram época", lead: "Campeões mundiais e grandes gerações contra qualquer clube ou país disponível." },
    dreams: { title: "Jogos dos sonhos", lead: "Confrontos que nunca aconteceram no auge, simulados centenas de vezes." },
    sections: { dream: "Duelos populares", clubs: "Clubes lendários", nations: "Seleções lendárias" },
    links: { all: "Ver todos", simulate: "Abrir o simulador" },
    howTitle: "Como funciona o simulador",
    how: [
      ["01", "Escolha dois elencos", "Selecione um clube histórico, uma campeã mundial ou uma temporada recente com seu time real."],
      ["02", "Jogue uma noite possível", "O motor combina notas, estilo e uma semente para gerar placar, xG, gols e acontecimentos."],
      ["03", "Teste o debate", "Repita a partida, rode cem simulações ou use a análise especializada para entender a tática."],
    ],
    aboutTitle: "Um simulador para jogos que o tempo tornou impossíveis",
    aboutBody: "LegendaryMatch não tenta reescrever resultados históricos nem prever apostas. Ele transforma elencos específicos —com temporada, treinador, formação e jogadores— em confrontos hipotéticos que podem ser repetidos e comparados.",
    faqTitle: "Perguntas sobre o simulador",
    faq: [
      ["Como funciona o simulador?", "Notas, estilo, entrosamento e uma semente geram placar, xG, gols e eventos. A IA apenas explica o confronto."],
      ["Posso enfrentar times de épocas diferentes?", "Sim. Você pode jogar Brasil 1970 contra Espanha 2010 ou Barcelona 2008/09 contra Real Madrid 2016/17."],
      ["O que significam as 100 simulações?", "Elas mostram a distribuição de vitórias, empates e placares possíveis. Não transformam um duelo hipotético em certeza."],
      ["Ele prevê partidas reais?", "Não. É uma experiência contrafactual para comparar times históricos, não um palpite ou uma ferramenta de apostas."],
      ["Por que o resultado muda quando repito?", "Cada nova semente representa outra noite possível. Um grande time não vence sempre; use cem partidas para ver a distribuição."],
      ["O que a análise especializada por IA faz?", "Ela lê os elencos, treinadores, formações e a evidência de cem simulações para explicar o duelo. O motor produz os números primeiro."],
    ],
  },
} as const
