export function OvrStamp({
  value,
  size = "lg",
  align = "right",
}: {
  value: number
  size?: "md" | "lg" | "xl"
  align?: "left" | "right"
}) {
  const number =
    size === "xl"
      ? "text-4xl sm:text-6xl"
      : size === "lg"
        ? "text-3xl sm:text-5xl"
        : "text-2xl sm:text-3xl"
  return (
    <div className={`flex flex-col leading-none ${align === "left" ? "items-start" : "items-end"}`}>
      <span className={`font-display tracking-tight text-gold ${number}`}>{value}</span>
      <span className="mt-1 font-display text-[8px] tracking-[0.28em] text-muted">OVR</span>
    </div>
  )
}
