import Link from "next/link"
import type { ReactNode } from "react"

export function PageHeader({
  kicker,
  title,
  lead,
  crumbs,
  children,
}: {
  kicker?: string
  title: string
  lead?: string
  crumbs?: Array<{ href: string; label: string }>
  children?: ReactNode
}) {
  return (
    <header className="grid gap-2">
      {crumbs && crumbs.length > 0 ? (
        <p className="font-mono text-xs text-muted">
          {crumbs.map((crumb, index) => (
            <span key={crumb.href}>
              {index > 0 ? <span className="px-2 text-line-hi">/</span> : null}
              <Link href={crumb.href} className="hover:text-gold">
                {crumb.label}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
      {kicker ? (
        <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold">{kicker}</p>
      ) : null}
      <h1 className="font-mono text-xl font-semibold tracking-tight text-text sm:text-3xl">{title}</h1>
      {lead ? <p className="max-w-2xl font-mono text-sm leading-6 text-muted">{lead}</p> : null}
      {children}
    </header>
  )
}
