import { REVIEWED_CLUB_RECORDS } from "@/data/reviewed-club-records"
import { REVIEWED_NATIONAL_RECORDS } from "@/data/reviewed-national-records"
import { REVIEWED_COMPARISON_RECORDS } from "@/data/reviewed-comparison-records"

export type SearchPriorityRecord = {
  heading: string
  summary: string
  columns: string[]
  rows: string[][]
  note: string
  sources: Array<{ label: string; url: string }>
  faqs: Array<{ q: string; a: string }>
}

export const PRIORITY_REVIEW_DATE = "2026-10-28"
export const PRIORITY_REVIEW_LABEL = "28 October 2026"

// Verified historical records, separate from model selections and estimated ratings.
export const SEARCH_PRIORITY_RECORDS: Record<string, SearchPriorityRecord> = {
  ...REVIEWED_CLUB_RECORDS,
  ...REVIEWED_NATIONAL_RECORDS,
  ...REVIEWED_COMPARISON_RECORDS,
}
