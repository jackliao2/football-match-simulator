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
    explore: "Explorar", legal: "Información", simulator: "Simulador", teams: "Clubes", nations: "Selecciones", dreams: "Partidos soñados", terms: "Términos", privacy: "Privacidad", contact: "Contacto",
  } : locale === "pt-br" ? {
    about: "Projeto independente de simulação de futebol. Não é afiliado, patrocinado ou endossado por nenhum clube, liga, federação ou jogador.",
    explore: "Explorar", legal: "Informações", simulator: "Simulador", teams: "Clubes", nations: "Seleções", dreams: "Jogos dos sonhos", terms: "Termos", privacy: "Privacidade", contact: "Contato",
  } : {
    about: SITE.disclaimer, explore: "Explore", legal: "Information", simulator: "Simulator", teams: "Teams", nations: "Nations", dreams: "Dream matches", terms: "Terms", privacy: "Privacy", contact: "Contact",
  }
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-logo"><span>Legendary</span><i />Match</p>
          <p>{copy.about}</p>
          <span className="site-footer-status"><i /> Independent simulation · 2026</span>
        </div>
        <div className="site-footer-nav">
          <div>
            <p>{copy.explore}</p>
            <Link href={`${prefix}/simulate`}>{copy.simulator}</Link><Link href={`${prefix}/teams`}>{copy.teams}</Link><Link href={`${prefix}/national-teams`}>{copy.nations}</Link><Link href={`${prefix}/vs`}>{copy.dreams}</Link><Link href="/prime">Prime</Link>
          </div>
          <div>
            <p>{copy.legal}</p>
            <Link href="/terms">{copy.terms}</Link><Link href="/privacy">{copy.privacy}</Link><Link href="/contact">{copy.contact}</Link><a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
