import type { ReactNode } from "react"

export function ResultPanel({
  kicker,
  title,
  aside,
  children,
  id,
}: {
  kicker: string
  title?: string
  aside?: ReactNode
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className="result-panel">
      <header className="flex items-end justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="min-w-0">
          <p className="font-display text-[8px] uppercase tracking-[0.22em] text-gold">{kicker}</p>
          {title ? (
            <h2 className="mt-1 font-mono text-lg font-semibold tracking-tight text-text sm:text-xl">{title}</h2>
          ) : null}
        </div>
        {aside ? <div className="shrink-0 font-mono text-xs text-muted">{aside}</div> : null}
      </header>
      {children}
    </section>
  )
}
