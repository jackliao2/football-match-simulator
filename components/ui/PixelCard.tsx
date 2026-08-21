import type { ReactNode } from "react"

export function PixelCard({
  children,
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode
  className?: string
  as?: "section" | "div" | "article"
}) {
  return (
    <Tag
      className={`border-2 border-line bg-panel pixel-border ${className}`}
    >
      {children}
    </Tag>
  )
}

export function PixelCardHeader({ children }: { children: ReactNode }) {
  return (
    <div className="border-b-2 border-line bg-panel-2 px-4 py-3 font-display text-[10px] uppercase tracking-[0.18em] text-gold">
      {children}
    </div>
  )
}
