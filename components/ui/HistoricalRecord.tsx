import type { SearchPriorityRecord } from "@/data/search-priority"

export function HistoricalRecord({ record }: { record: SearchPriorityRecord }) {
  return (
    <section id="historical-record" className="result-panel scroll-mt-20 p-4 sm:p-5" aria-labelledby="historical-record-heading">
      <h2 id="historical-record-heading" className="section-title">{record.heading}</h2>
      <p className="mt-3 text-sm leading-7 text-text">{record.summary}</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm leading-6">
          <caption className="sr-only">{record.heading}</caption>
          <thead>
            <tr>{record.columns.map((column) => <th key={column} scope="col" className="border-b border-white/15 px-3 py-2 font-semibold text-gold">{column}</th>)}</tr>
          </thead>
          <tbody>
            {record.rows.map((row) => (
              <tr key={row[0]}>
                <th scope="row" className="border-b border-white/10 px-3 py-2 font-normal text-text">{row[0]}</th>
                {row.slice(1).map((cell, index) => <td key={index} className="border-b border-white/10 px-3 py-2 text-muted">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted">{record.note}</p>
      <p className="mt-3 text-xs leading-6 text-muted">
        Sources: {record.sources.map((source, index) => <span key={source.url}>{index ? " · " : ""}<a href={source.url} className="text-gold hover:text-gold-2">{source.label}</a></span>)}
      </p>
    </section>
  )
}
