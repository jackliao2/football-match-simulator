import Script from "next/script"

export function adsenseClient(): string | undefined {
  const value = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim()
  return value || undefined
}

export function AdSense() {
  const client = adsenseClient()
  if (!client) return null
  return (
    <Script
      id="adsense-loader"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
