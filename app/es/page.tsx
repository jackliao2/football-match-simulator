import type { Metadata } from "next"
import { LocalizedPage } from "@/components/i18n/LocalizedPage"
import { languageAlternates, LOCALIZED_COPY } from "@/lib/i18n"
import { absoluteUrl } from "@/lib/site"

const copy = LOCALIZED_COPY.es.home
export const metadata: Metadata = { title: { absolute: copy.metaTitle }, description: copy.metaDescription, alternates: { canonical: "/es", languages: languageAlternates("/") }, openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: absoluteUrl("/es"), locale: "es_ES" } }
export default function Page() { return <LocalizedPage locale="es" /> }
