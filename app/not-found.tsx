import { PixelButton } from "@/components/ui/PixelButton"

export default function NotFound() {
  return (
    <div className="grid gap-4 py-16 text-center">
      <p className="font-display text-xs text-gold">404</p>
      <h1 className="font-display text-lg uppercase tracking-wide">Page not found</h1>
      <p className="text-sm text-muted">That route is not in the historical database.</p>
      <div className="flex justify-center gap-3">
        <PixelButton href="/" variant="primary">
          Home
        </PixelButton>
        <PixelButton href="/teams">Teams</PixelButton>
      </div>
    </div>
  )
}
