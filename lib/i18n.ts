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
      lead: "Elige dos equipos históricos o actuales. Simula el marcador, los goleadores, el xG y cien versiones del mismo duelo.",
      metaTitle: "Simulador de Partidos de Fútbol | LegendaryMatch",
      metaDescription: "Simulador de fútbol online con equipos históricos y actuales. Enfrenta al Barcelona 2009, Brasil 1970, Real Madrid 2017 y más; descubre marcadores y probabilidades.",
    },
    simulate: {
      title: "Simula cualquier partido de fútbol",
      lead: "Elige dos plantillas de cualquier época. El motor calcula el resultado; el análisis experto con IA explica el duelo sin decidir al ganador.",
    },
    teams: { title: "Clubes legendarios por temporada", lead: "Plantillas históricas y actuales listas para entrar en el simulador." },
    nations: { title: "Selecciones que marcaron una época", lead: "Campeones del mundo, grandes generaciones y selecciones actuales frente a cualquier club o país." },
    dreams: { title: "Partidos soñados", lead: "Duelos que nunca ocurrieron en su mejor momento, simulados cientos de veces." },
    sections: { dream: "Duelos populares", clubs: "Clubes legendarios", nations: "Selecciones legendarias" },
    links: { all: "Ver todos", simulate: "Abrir el simulador" },
    faqTitle: "Preguntas sobre el simulador",
    faq: [
      ["¿Cómo funciona el simulador?", "Las valoraciones, el estilo, la química y una semilla generan el marcador, el xG, los goleadores y los eventos. La IA solo explica el enfrentamiento."],
      ["¿Puedo enfrentar equipos de épocas distintas?", "Sí. Puedes jugar con Brasil 1970 contra España 2010 o Barcelona 2008/09 contra Real Madrid 2016/17."],
      ["¿Qué significan las 100 simulaciones?", "Muestran la distribución de victorias, empates y marcadores posibles. No convierten un duelo hipotético en una certeza."],
    ],
  },
  "pt-br": {
    language: "Português (Brasil)",
    nav: { simulate: "Simular", teams: "Clubes", nations: "Seleções", dreams: "Duelos" },
    home: {
      kicker: "Simulador de partidas de futebol",
      title: "Lendas. Eras. Um jogo impossível.",
      lead: "Escolha dois times históricos ou atuais. Simule o placar, os gols, o xG e cem versões do mesmo confronto.",
      metaTitle: "Simulador de Jogos de Futebol | LegendaryMatch",
      metaDescription: "Simulador de futebol online com times históricos e atuais. Coloque Barcelona 2009, Brasil 1970, Real Madrid 2017 e outros frente a frente.",
    },
    simulate: {
      title: "Simule qualquer partida de futebol",
      lead: "Escolha dois elencos de qualquer época. O motor calcula o resultado; a análise especializada por IA explica o duelo sem escolher o vencedor.",
    },
    teams: { title: "Clubes lendários por temporada", lead: "Elencos históricos e atuais prontos para entrar no simulador." },
    nations: { title: "Seleções que marcaram época", lead: "Campeões mundiais, grandes gerações e seleções atuais contra qualquer clube ou país." },
    dreams: { title: "Jogos dos sonhos", lead: "Confrontos que nunca aconteceram no auge, simulados centenas de vezes." },
    sections: { dream: "Duelos populares", clubs: "Clubes lendários", nations: "Seleções lendárias" },
    links: { all: "Ver todos", simulate: "Abrir o simulador" },
    faqTitle: "Perguntas sobre o simulador",
    faq: [
      ["Como funciona o simulador?", "Notas, estilo, entrosamento e uma semente geram placar, xG, gols e eventos. A IA apenas explica o confronto."],
      ["Posso enfrentar times de épocas diferentes?", "Sim. Você pode jogar Brasil 1970 contra Espanha 2010 ou Barcelona 2008/09 contra Real Madrid 2016/17."],
      ["O que significam as 100 simulações?", "Elas mostram a distribuição de vitórias, empates e placares possíveis. Não transformam um duelo hipotético em certeza."],
    ],
  },
} as const
