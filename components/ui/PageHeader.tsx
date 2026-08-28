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
    <header className="page-header">
      {crumbs && crumbs.length > 0 ? (
        <p className="page-breadcrumbs">
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
        <p className="page-kicker">{kicker}</p>
      ) : null}
      <h1 className="page-title">{title}</h1>
      <i className="page-title-rule" aria-hidden="true" />
      {lead ? <p className="page-lead">{lead}</p> : null}
      {children}
    </header>
  )
}
