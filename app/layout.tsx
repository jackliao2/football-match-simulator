import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, Press_Start_2P } from "next/font/google"
import { SiteFooter } from "@/components/ui/SiteFooter"
import { SiteHeader } from "@/components/ui/SiteHeader"
import { defaultMetadata } from "@/lib/seo"
import "./globals.css"

const display = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = defaultMetadata

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070907",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} h-full`}>
      <body className="flex min-h-full flex-col font-mono antialiased">
        <SiteHeader />
        <div className="page-frame">
          <aside className="page-rail" aria-hidden="true" />
          <main className="min-w-0 flex-1 px-3 py-3 sm:px-4 sm:py-4">{children}</main>
          <aside className="page-rail" aria-hidden="true" />
        </div>
        <SiteFooter />
      </body>
    </html>
  )
}
