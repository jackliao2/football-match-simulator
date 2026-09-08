"use client"

export function SearchBox({ defaultQuery }: { defaultQuery: string }) {
  return (
    <form action="/search" method="get" role="search" className="search-form">
      <label className="search-label" htmlFor="site-search">
        Search squads
      </label>
      <div className="search-row">
        <input
          id="site-search"
          name="q"
          type="search"
          defaultValue={defaultQuery}
          placeholder="Chelsea 04/05, Brazil 1970, prime Barça…"
          autoComplete="off"
          autoFocus={defaultQuery.length === 0}
        />
        <button type="submit" className="rail-btn rail-btn-primary">
          Search
        </button>
      </div>
    </form>
  )
}
