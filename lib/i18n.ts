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
      title: "Barcelona 2010/11 contra Madrid 2016/17, en un simulador",
      tagline: ["Barcelona 2010/11", "Madrid 2016/17", "Una noche simulada"],
      lead: "Barcelona 2010/11 contra Madrid 2016/17, o Brasil 1970 contra España 2010. Marcador, goleadores, xG y cien noches del mismo duelo.",
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
      ["01", "Elige Barça 2010/11 o Brasil 1970", "Cada carta es una temporada con once — el Barça de Guardiola, el Madrid de Zidane, una campeona del mundo — no un escudo con un deslizador."],
      ["02", "Juega una noche", "El motor combina esas valoraciones y una semilla para generar marcador, xG, goleadores y eventos. Repetir el duelo es otra noche posible."],
      ["03", "Lee las cien repeticiones", "Un 2–1 es una noche. Cien marcadores alternativos son el patrón más amplio, y la lectura opcional de IA no vota."],
    ],
    aboutTitle: "Un simulador para que Barça 2010/11 juegue contra Madrid 2016/17",
    aboutBody: "LegendaryMatch no reescribe el 27 de mayo ni pronostica apuestas. Convierte temporadas concretas —Barça 2010/11, Madrid 2016/17, Brasil 1970— en duelos que se pueden repetir y comparar.",
    faqTitle: "Barça 2010/11, Brasil 1970, y lo que suele preguntarse",
    faq: [
      ["¿Cómo funciona el simulador?", "Para Barça 2010/11 contra Madrid 2016/17, las valoraciones, el estilo y una semilla escriben el marcador. La IA solo explica el duelo."],
      ["¿Puedo enfrentar equipos de épocas distintas?", "Sí. Puedes jugar con Brasil 1970 contra España 2010 o Barcelona 2008/09 contra Real Madrid 2016/17."],
      ["¿Qué significan las 100 simulaciones del análisis experto?", "En Barça contra Madrid muestran la distribución de victorias, empates y marcadores. No convierten un duelo hipotético en una certeza."],
      ["¿Predice partidos reales?", "No. Barça 2010/11 no se cruzó con Madrid 2016/17. Es un juego contrafactual, no un pronóstico ni una herramienta de apuestas."],
      ["¿Por qué cambia el resultado al repetir?", "El Barça de Guardiola no gana todas las noches al Madrid de Zidane. Cada semilla es otra noche posible; cien partidos muestran la distribución."],
      ["¿Qué hace el análisis experto con IA?", "Lee esas dos plantillas y la evidencia de cien simulaciones. El motor decide el marcador de Barça contra Madrid primero."],
      ["¿Ganaría el Barcelona 2010/11 al Madrid 2016/17?", "Eso lo escribe el motor, no un chatbot. Abre el simulador con esas dos temporadas, o lee el duelo en inglés con cuatrocientas repeticiones. Una noche no cierra el debate; cien noches muestran la distribución."],
    ],
  },
  "pt-br": {
    language: "Português (Brasil)",
    nav: { simulate: "Simular", teams: "Clubes", nations: "Seleções", dreams: "Duelos" },
    home: {
      kicker: "Simulador de partidas de futebol",
      title: "Barcelona 2010/11 contra Madrid 2016/17, num simulador",
      tagline: ["Barcelona 2010/11", "Madrid 2016/17", "Uma noite simulada"],
      lead: "Barcelona 2010/11 contra Madrid 2016/17, ou Brasil 1970 contra Espanha 2010. Placar, gols, xG e cem noites do mesmo duelo.",
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
      ["01", "Escolha Barça 2010/11 ou Brasil 1970", "Cada carta é uma temporada com onze — o Barça de Guardiola, o Madrid de Zidane, uma campeã mundial — não um escudo com um controle."],
      ["02", "Jogue uma noite", "O motor combina aquelas notas e uma semente no placar, xG, gols e eventos. Repetir o duelo é outra noite possível."],
      ["03", "Leia as cem repetições", "Um 2–1 é uma noite. Cem placares alternativos são o padrão mais amplo, e a leitura opcional de IA não vota."],
    ],
    aboutTitle: "Um simulador para o Barça 2010/11 jogar contra o Madrid 2016/17",
    aboutBody: "LegendaryMatch não reescreve 27 de maio nem prevê apostas. Transforma temporadas concretas —Barça 2010/11, Madrid 2016/17, Brasil 1970— em duelos que se pode repetir e comparar.",
    faqTitle: "Barça 2010/11, Brasil 1970, e o que as pessoas perguntam",
    faq: [
      ["Como funciona o simulador?", "Para Barça 2010/11 contra Madrid 2016/17, notas, estilo e uma semente escrevem o placar. A IA só explica o duelo."],
      ["Posso enfrentar times de épocas diferentes?", "Sim. Você pode jogar Brasil 1970 contra Espanha 2010 ou Barcelona 2008/09 contra Real Madrid 2016/17."],
      ["O que significam as 100 simulações da análise?", "No Barça contra Madrid elas mostram a distribuição de vitórias, empates e placares. Não transformam um duelo hipotético em certeza."],
      ["Ele prevê partidas reais?", "Não. Barça 2010/11 não enfrentou Madrid 2016/17. É um jogo contrafactual, não um palpite ou uma ferramenta de apostas."],
      ["Por que o resultado muda quando repito?", "O Barça de Guardiola não vence todas as noites o Madrid de Zidane. Cada semente é outra noite possível; cem jogos mostram a distribuição."],
      ["O Barcelona 2010/11 ganharia do Madrid 2016/17?", "Isso o motor escreve, não um chatbot. Abra o simulador com aquelas duas temporadas, ou leia o duelo em inglês com quatrocentas repetições. Uma noite não fecha o debate; cem noites mostram a distribuição."],
    ],
  },
} as const
