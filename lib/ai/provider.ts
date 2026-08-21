export interface CommentaryProvider {
  generateMatchReport(prompt: string, payload: unknown): Promise<string>
}

interface ChatCompletionsResponse {
  choices?: Array<{
    message?: { content?: string }
  }>
}

function env(name: string): string | undefined {
  const value = process.env[name]
  return value && value.trim().length > 0 ? value.trim() : undefined
}

export function getAiConfig(): { apiKey: string; baseUrl: string; model: string } | null {
  const apiKey = env("AI_API_KEY") ?? env("XAI_API_KEY")
  if (!apiKey) return null
  const baseUrl = (env("AI_BASE_URL") ?? "https://api.x.ai/v1").replace(/\/$/, "")
  const model = env("AI_MODEL") ?? "grok-4.6"
  return { apiKey, baseUrl, model }
}

export function isAiConfigured(): boolean {
  return getAiConfig() !== null
}

export class OpenAICompatibleProvider implements CommentaryProvider {
  constructor(private readonly config: { apiKey: string; baseUrl: string; model: string }) {}

  async generateMatchReport(prompt: string, payload: unknown): Promise<string> {
    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.config.model,
        temperature: 0.7,
        max_tokens: 900,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: JSON.stringify(payload) },
        ],
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`AI provider error ${response.status}: ${body.slice(0, 240)}`)
    }

    const data = (await response.json()) as ChatCompletionsResponse
    const text = data.choices?.[0]?.message?.content?.trim()
    if (!text) throw new Error("AI provider returned an empty report")
    return text
  }
}

export function createCommentaryProvider(): CommentaryProvider | null {
  const config = getAiConfig()
  if (!config) return null
  return new OpenAICompatibleProvider(config)
}
