function publisherId(): string | undefined {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim()
  if (!client) return undefined
  return client.replace(/^ca-/, "")
}

export function GET() {
  const publisher = publisherId()
  if (!publisher) {
    return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } })
  }
  const body = `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
