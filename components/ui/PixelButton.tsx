import Link from "next/link"
import type { ReactNode } from "react"

const variants = {
  primary:
    "bg-gold text-ink border-gold hover:bg-gold-2 hover:border-gold-2",
  default:
    "bg-panel text-text border-line-hi hover:border-gold hover:text-gold",
  ghost:
    "bg-transparent text-muted border-line hover:border-line-hi hover:text-text",
} as const

const sizes = {
  sm: "px-2 py-2.5 text-[8px] sm:text-[9px]",
  md: "px-4 py-3 text-[10px] sm:text-[11px]",
  lg: "px-5 py-4 text-[11px] sm:text-xs",
  xl: "px-3 py-5 text-[11px] sm:text-[12px]",
} as const

const base =
  "inline-flex items-center justify-center gap-2 uppercase tracking-[0.14em] font-display border-2 shadow-[4px_4px_0_0_#000] transition-[transform,box-shadow,background-color,color,border-color] duration-150 hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_#000] active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0_0_#000] disabled:opacity-50 disabled:pointer-events-none text-center"

type Variant = keyof typeof variants
type Size = keyof typeof sizes

export function PixelButton({
  href,
  children,
  variant = "default",
  size = "md",
  className = "",
  type,
  onClick,
  disabled,
  name,
  value,
}: {
  href?: string
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  type?: "button" | "submit"
  onClick?: () => void
  disabled?: boolean
  name?: string
  value?: string
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button
      type={type ?? "button"}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      name={name}
      value={value}
    >
      {children}
    </button>
  )
}
