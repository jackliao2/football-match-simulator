import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LocalizedPage } from "@/components/i18n/LocalizedPage"
import { languageAlternates, LOCALIZED_COPY, localizedPath, type LocalizedSection } from "@/lib/i18n"
import { absoluteUrl } from "@/lib/site"

const sections: LocalizedSection[] = ["simulate", "teams", "national-teams", "vs"]
function valid(value: string): value is LocalizedSection { return sections.includes(value as LocalizedSection) }
export function generateStaticParams() { return sections.map((section) => ({ section })) }
export async function generateMetadata({ params }: PageProps<"/pt-br/[section]">): Promise<Metadata> { const { section } = await params; if (!valid(section)) notFound(); const copy = LOCALIZED_COPY["pt-br"]; const item = section === "national-teams" ? copy.nations : section === "vs" ? copy.dreams : copy[section]; const path = localizedPath("pt-br", `/${section}`); return { title: item.title, description: item.lead, alternates: { canonical: path, languages: languageAlternates(`/${section}`) }, openGraph: { title: item.title, description: item.lead, url: absoluteUrl(path), locale: "pt_BR" } } }
export default async function Page({ params }: PageProps<"/pt-br/[section]">) { const { section } = await params; if (!valid(section)) notFound(); return <LocalizedPage locale="pt-br" section={section} /> }
