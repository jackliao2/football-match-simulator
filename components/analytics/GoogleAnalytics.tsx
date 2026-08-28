import Script from "next/script"
import { AnalyticsConsent } from "@/components/analytics/AnalyticsConsent"
import { PageViewTracker } from "@/components/analytics/PageViewTracker"

const GA_ID = "G-9WG39B5BHH"

export function GoogleAnalytics() {
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="ga4-config" strategy="afterInteractive">{`
      window.gtag('js', new Date());
      window.gtag('config', '${GA_ID}', { send_page_view: false, anonymize_ip: true });
    `}</Script>
    <PageViewTracker measurementId={GA_ID} />
    <AnalyticsConsent />
  </>
}
