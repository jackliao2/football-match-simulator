export interface CommentaryProvider {
  generateMatchReport(prompt: string, payload: unknown): Promise<string>
  generate(
    prompt: string,
    payload: unknown,
    options?: { maxTokens?: number; temperature?: number },
  ): Promise<string>
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

function envInt(name: string, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(process.env[name] ?? "", 10)
  if (!Number.isFinite(parsed)) return fallback
  return Math.max(min, Math.min(max, parsed))
}

export function getAiConfig(): { apiKey: string; baseUrl: string; model: string } | null {
  const apiKey = env("AI_API_KEY") ?? env("XAI_API_KEY")
  if (!apiKey) return null
  const baseUrl = (env("AI_BASE_URL") ?? "https://ark.cn-beijing.volces.com/api/v3").replace(/\/$/, "")
  const model = env("AI_MODEL")
  if (!model) return null
  return { apiKey, baseUrl, model }
}

export function isAiConfigured(): boolean {
  return getAiConfig() !== null
}

export function getAiCacheNamespace(): string {
  const config = getAiConfig()
  if (!config) return "template"
  return `${config.baseUrl}:${config.model}`
}

export class OpenAICompatibleProvider implements CommentaryProvider {
  constructor(private readonly config: { apiKey: string; baseUrl: string; model: string }) {}

  async generate(
    prompt: string,
    payload: unknown,
    options?: { maxTokens?: number; temperature?: number },
  ): Promise<string> {
    const timeoutMs = envInt("AI_TIMEOUT_MS", 20_000, 3_000, 25_000)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)
    let response: Response
    try {
      response = await fetch(`${this.config.baseUrl}/chat/completions`, {
        method: "POST",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model,
          temperature: options?.temperature ?? 0.7,
          max_tokens: options?.maxTokens ?? 900,
          ...(process.env.AI_DISABLE_THINKING !== "false"
            ? { thinking: { type: "disabled" } }
            : {}),
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: JSON.stringify(payload) },
          ],
        }),
      })
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error(`AI provider timed out after ${timeoutMs}ms`)
      }
      throw error
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`AI provider error ${response.status}: ${body.slice(0, 240)}`)
    }

    const data = (await response.json()) as ChatCompletionsResponse
    const text = data.choices?.[0]?.message?.content?.trim()
    if (!text) throw new Error("AI provider returned an empty report")
    return text
  }

  generateMatchReport(prompt: string, payload: unknown): Promise<string> {
    return this.generate(prompt, payload, { maxTokens: 900 })
  }
}

export function createCommentaryProvider(): CommentaryProvider | null {
  const config = getAiConfig()
  if (!config) return null
  return new OpenAICompatibleProvider(config)
}
