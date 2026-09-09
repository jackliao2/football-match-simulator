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

export function languageAlternates(path = "/", locales: readonly Locale[] = LOCALES) {
  const languages: Record<string, string> = {
    en: absoluteUrl(path),
    "x-default": absoluteUrl(path),
  }
  for (const locale of locales) {
    languages[locale === "pt-br" ? "pt-BR" : locale] = absoluteUrl(localizedPath(locale, path))
  }
  return languages
}

export const LOCALIZED_COPY = {
  es: {
    language: "Español",
    nav: { simulate: "Simular", teams: "Clubes", nations: "Selecciones", dreams: "Duelos" },
    home: {
      kicker: "Simulador de partidos de fútbol",
      title: "Leyendas. Épocas. Un partido imposible.",
      tagline: ["Barcelona 2010/11", "Madrid 2016/17", "Una noche simulada"],
      lead: "Elige dos equipos de temporadas distintas. Simula el marcador, los goleadores, el xG y cien versiones del mismo duelo.",
      metaTitle: "Simulador de fútbol: Barcelona 2010/11 contra Madrid 2016/17",
      metaDescription: "Enfrenta al Barcelona 2010/11, Brasil 1970 y Madrid 2016/17. Marcador, goleadores, xG y cien noches del mismo duelo. El motor escribe el resultado; la IA solo lo explica.",
    },
    simulate: {
      title: "Juega Barcelona 2010/11 contra Madrid 2016/17",
      lead: "O Brasil 1970 contra España 2010. Cada lado es una temporada con once, no un escudo con un deslizador. El motor escribe el marcador; la IA explica el duelo después y no vota.",
      metaTitle: "Simular partidos: Barcelona 2010/11 vs Madrid 2016/17",
      metaDescription:
        "Simula Barcelona 2010/11 contra Madrid 2016/17, o Brasil 1970 contra España 2010. Marcador, goleadores, xG y cien repeticiones. El motor decide el resultado.",
    },
    teams: { title: "Guardiola, Madrid 2016/17, United 1999", lead: "Seis plantillas de cabecera. El archivo completo — más de 80 temporadas, filtros y páginas de cada club — está en inglés." },
    nations: { title: "Brasil 1970, Maradona 86, España 2010", lead: "Seis selecciones de cabecera. El archivo completo de Mundiales y Euros está en inglés." },
    dreams: { title: "Barcelona 2010/11 contra Madrid 2016/17", lead: "Una selección de duelos. El índice completo, con 400 simulaciones por enfrentamiento, está en inglés." },
    sections: { dream: "Barcelona 2010/11 contra Madrid 2016/17", clubs: "Guardiola, Madrid 2016/17, United 1999", nations: "Brasil 1970, Maradona 86, España 2010" },
    links: { all: "Ver destacados", simulate: "Abrir el simulador", englishCatalog: "Archivo completo en inglés" },
    howTitle: "Elige dos temporadas. Juega una noche. Pon a prueba el debate.",
    how: [
      ["01", "Elige dos plantillas", "Selecciona un club histórico, una campeona del mundo o una temporada reciente con su once real."],
      ["02", "Juega una noche posible", "El motor combina valoraciones, estilo y una semilla para generar marcador, xG, goleadores y eventos."],
      ["03", "Pon a prueba el debate", "Repite el partido o pide al análisis experto una lectura táctica respaldada por cien simulaciones."],
    ],
    aboutTitle: "Un simulador para partidos que el tiempo hizo imposibles",
    aboutBody: "LegendaryMatch no intenta reescribir resultados históricos ni predecir apuestas. Convierte plantillas concretas —con temporada, entrenador, formación y jugadores— en enfrentamientos hipotéticos que se pueden repetir y comparar.",
    faqTitle: "Preguntas sobre el simulador",
    faq: [
      ["¿Cómo funciona el simulador?", "Las valoraciones, el estilo, la química y una semilla generan el marcador, el xG, los goleadores y los eventos. La IA solo explica el enfrentamiento."],
      ["¿Puedo enfrentar equipos de épocas distintas?", "Sí. Puedes jugar con Brasil 1970 contra España 2010 o Barcelona 2008/09 contra Real Madrid 2016/17."],
      ["¿Qué significan las 100 simulaciones del análisis experto?", "Muestran la distribución de victorias, empates y marcadores posibles. No convierten un duelo hipotético en una certeza."],
      ["¿Predice partidos reales?", "No. Es una experiencia contrafactual para comparar equipos históricos, no un pronóstico ni una herramienta de apuestas."],
      ["¿Por qué cambia el resultado al repetir?", "Cada nueva semilla representa otra noche posible. Un gran equipo no gana siempre; el análisis experto muestra la distribución de cien partidos."],
      ["¿Qué hace el análisis experto con IA?", "Lee las plantillas, los entrenadores, las formaciones y la evidencia de cien simulaciones para explicar el duelo. El motor decide los números primero."],
      ["¿Ganaría el Barcelona 2010/11 al Madrid 2016/17?", "Eso lo escribe el motor, no un chatbot. Abre el simulador con esas dos temporadas, o lee el duelo en inglés con cuatrocientas repeticiones. Una noche no cierra el debate; cien noches muestran la distribución."],
    ],
  },
  "pt-br": {
    language: "Português (Brasil)",
    nav: { simulate: "Simular", teams: "Clubes", nations: "Seleções", dreams: "Duelos" },
    home: {
      kicker: "Simulador de partidas de futebol",
      title: "Lendas. Eras. Um jogo impossível.",
      tagline: ["Barcelona 2010/11", "Madrid 2016/17", "Uma noite simulada"],
      lead: "Escolha dois times de temporadas diferentes. Simule o placar, os gols, o xG e cem versões do mesmo confronto.",
      metaTitle: "Simulador de futebol: Barcelona 2010/11 contra Madrid 2016/17",
      metaDescription: "Coloque Barcelona 2010/11, Brasil 1970 e Madrid 2016/17 frente a frente. Placar, gols, xG e cem noites do mesmo duelo. O motor escreve o resultado; a IA só explica.",
    },
    simulate: {
      title: "Jogue Barcelona 2010/11 contra Madrid 2016/17",
      lead: "Ou Brasil 1970 contra Espanha 2010. Cada lado é uma temporada com onze, não um escudo com um controle. O motor calcula o resultado; a análise por IA explica o duelo e não escolhe o vencedor.",
      metaTitle: "Simular partidas: Barcelona 2010/11 vs Madrid 2016/17",
      metaDescription:
        "Simule Barcelona 2010/11 contra Madrid 2016/17, ou Brasil 1970 contra Espanha 2010. Placar, gols, xG e cem repetições. O motor decide o resultado.",
    },
    teams: { title: "Guardiola, Madrid 2016/17, United 1999", lead: "Seis elencos de cabeceira. O arquivo completo — mais de 80 temporadas, filtros e páginas de cada clube — está em inglês." },
    nations: { title: "Brasil 1970, Maradona 86, Espanha 2010", lead: "Seis seleções de cabeceira. O arquivo completo de Copas e Euros está em inglês." },
    dreams: { title: "Barcelona 2010/11 contra Madrid 2016/17", lead: "Uma seleção de duelos. O índice completo, com 400 simulações por confronto, está em inglês." },
    sections: { dream: "Barcelona 2010/11 contra Madrid 2016/17", clubs: "Guardiola, Madrid 2016/17, United 1999", nations: "Brasil 1970, Maradona 86, Espanha 2010" },
    links: { all: "Ver destaques", simulate: "Abrir o simulador", englishCatalog: "Arquivo completo em inglês" },
    howTitle: "Escolha duas temporadas. Jogue uma noite. Teste o argumento.",
    how: [
      ["01", "Escolha dois elencos", "Selecione um clube histórico, uma campeã mundial ou uma temporada recente com seu time real."],
      ["02", "Jogue uma noite possível", "O motor combina notas, estilo e uma semente para gerar placar, xG, gols e acontecimentos."],
      ["03", "Teste o debate", "Repita a partida ou peça à análise especializada uma leitura tática apoiada por cem simulações."],
    ],
    aboutTitle: "Um simulador para jogos que o tempo tornou impossíveis",
    aboutBody: "LegendaryMatch não tenta reescrever resultados históricos nem prever apostas. Ele transforma elencos específicos —com temporada, treinador, formação e jogadores— em confrontos hipotéticos que podem ser repetidos e comparados.",
    faqTitle: "Perguntas sobre o simulador",
    faq: [
      ["Como funciona o simulador?", "Notas, estilo, entrosamento e uma semente geram placar, xG, gols e eventos. A IA apenas explica o confronto."],
      ["Posso enfrentar times de épocas diferentes?", "Sim. Você pode jogar Brasil 1970 contra Espanha 2010 ou Barcelona 2008/09 contra Real Madrid 2016/17."],
      ["O que significam as 100 simulações da análise?", "Elas mostram a distribuição de vitórias, empates e placares possíveis. Não transformam um duelo hipotético em certeza."],
      ["Ele prevê partidas reais?", "Não. É uma experiência contrafactual para comparar times históricos, não um palpite ou uma ferramenta de apostas."],
      ["Por que o resultado muda quando repito?", "Cada nova semente representa outra noite possível. Um grande time não vence sempre; a análise especializada mostra a distribuição de cem partidas."],
      ["O Barcelona 2010/11 ganharia do Madrid 2016/17?", "Isso o motor escreve, não um chatbot. Abra o simulador com aquelas duas temporadas, ou leia o duelo em inglês com quatrocentas repetições. Uma noite não fecha o debate; cem noites mostram a distribuição."],
    ],
  },
} as const
