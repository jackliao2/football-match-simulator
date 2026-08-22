import type { ReactNode } from "react"

const tones = {
  gold: "arcade-btn arcade-btn-gold",
  steel: "arcade-btn arcade-btn-steel",
  ghost: "arcade-btn arcade-btn-ghost",
} as const

export function ArcadeButton({
  children,
  tone = "steel",
  className = "",
  type,
  onClick,
  disabled,
}: {
  children: ReactNode
  tone?: keyof typeof tones
  className?: string
  type?: "button" | "submit"
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type={type ?? "button"}
      className={`${tones[tone]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="arcade-btn-face">{children}</span>
    </button>
  )
}
