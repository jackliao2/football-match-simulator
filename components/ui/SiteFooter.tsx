"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SITE } from "@/lib/site"

export function SiteFooter() {
  const pathname = usePathname()
  const locale = pathname.startsWith("/es") ? "es" : pathname.startsWith("/pt-br") ? "pt-br" : "en"
  const prefix = locale === "en" ? "" : `/${locale}`
  const copy = locale === "es" ? {
    about: "Proyecto independiente de simulación futbolística. No está afiliado, patrocinado ni respaldado por ningún club, liga, federación o jugador.",
    notice: "Todos los partidos y resultados son hipotéticos, creados únicamente para entretenimiento y análisis. No son pronósticos, consejos de apuestas ni estadísticas oficiales. Los nombres y marcas pertenecen a sus respectivos titulares y se utilizan solo con fines identificativos.",
    explore: "Explorar", legal: "Información", simulator: "Simulador", teams: "Clubes", nations: "Selecciones", dreams: "Partidos soñados", terms: "Términos", privacy: "Privacidad", contact: "Contacto", status: "Simulación independiente · 2026",
  } : locale === "pt-br" ? {
    about: "Projeto independente de simulação de futebol. Não é afiliado, patrocinado ou endossado por nenhum clube, liga, federação ou jogador.",
    notice: "Todas as partidas e resultados são hipotéticos, criados apenas para entretenimento e análise. Não são previsões, conselhos de apostas nem estatísticas oficiais. Nomes e marcas pertencem aos seus respectivos titulares e são usados somente para identificação.",
    explore: "Explorar", legal: "Informações", simulator: "Simulador", teams: "Clubes", nations: "Seleções", dreams: "Jogos dos sonhos", terms: "Termos", privacy: "Privacidade", contact: "Contato", status: "Simulação independente · 2026",
  } : {
    about: SITE.disclaimer,
    notice: "Every matchup and result is hypothetical and provided for entertainment and analysis only. Nothing here is a real-world prediction, betting advice or an official statistic. Names and trademarks belong to their respective owners and are used only for identification.",
    explore: "Explore", legal: "Information", simulator: "Simulator", teams: "Teams", nations: "Nations", dreams: "Dream matches", terms: "Terms", privacy: "Privacy", contact: "Contact", status: "Independent simulation · 2026",
  }
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-logo"><span>Legendary</span><i />Match</p>
          <p>{copy.about}</p>
          <p className="site-footer-notice">{copy.notice}</p>
          <span className="site-footer-status"><i /> {copy.status}</span>
        </div>
        <nav className="site-footer-nav" aria-label="Footer navigation">
          <div>
            <p>{copy.explore}</p>
            <Link href={`${prefix}/simulate`}>{copy.simulator}</Link><Link href={`${prefix}/teams`}>{copy.teams}</Link><Link href={`${prefix}/national-teams`}>{copy.nations}</Link><Link href={`${prefix}/vs`}>{copy.dreams}</Link><Link href="/prime">Prime</Link>
          </div>
          <div>
            <p>{copy.legal}</p>
            <Link href="/terms">{copy.terms}</Link><Link href="/privacy">{copy.privacy}</Link><Link href="/contact">{copy.contact}</Link><a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </nav>
      </div>
      <div className="site-footer-bottom">
        <span>© 2026 LegendaryMatch</span>
        <span>Fan-made · Independent · For entertainment</span>
      </div>
    </footer>
  )
}
