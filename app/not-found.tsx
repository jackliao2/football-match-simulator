import Link from "next/link"

export default function NotFound() {
  return (
    <div className="grid gap-3 py-16 text-center">
      <p className="font-display text-[9px] uppercase tracking-[0.28em] text-gold">404</p>
      <h1 className="font-mono text-xl font-semibold tracking-tight sm:text-3xl">Page not found</h1>
      <p className="font-mono text-sm text-muted">That route is not in the historical database.</p>
      <div className="flex justify-center gap-5 font-mono text-sm">
        <Link href="/" className="text-gold hover:text-gold-2">
          Home
        </Link>
        <Link href="/teams" className="text-muted hover:text-gold">
          Teams
        </Link>
      </div>
    </div>
  )
}
