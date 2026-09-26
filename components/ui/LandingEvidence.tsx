import type { LandingEvidence as Evidence } from "@/data/search-landing-evidence"

export function LandingEvidence({ evidence, showScope = true }: { evidence: Evidence; showScope?: boolean }) {
  return (
    <section className="result-panel p-4 sm:p-5" aria-labelledby="historical-evidence">
      <h2 id="historical-evidence" className="section-title">{evidence.heading}</h2>
      {showScope ? <p className="mt-3 text-sm leading-7 text-muted">{evidence.scope}</p> : null}
      <dl className="mt-4 grid gap-4">
        {evidence.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-semibold text-text">{fact.label}</dt>
            <dd className="mt-1 text-sm leading-7 text-muted">{fact.text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-6 text-muted">
        Historical sources: {evidence.sources.map((source, index) => (
          <span key={source.url}>
            {index > 0 ? " · " : ""}
            <a href={source.url} className="text-gold hover:text-gold-2">{source.label}</a>
          </span>
        ))}
      </p>
    </section>
  )
}
