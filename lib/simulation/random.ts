export type Rng = () => number

export function hashSeed(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function mulberry32(seed: number): Rng {
  let a = seed >>> 0
  return function rng() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function rngFromSeed(seed: string): Rng {
  return mulberry32(hashSeed(seed))
}

export function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

export function chance(rng: Rng, probability: number): boolean {
  return rng() < probability
}

export function pickWeighted<T>(rng: Rng, items: T[], weight: (item: T) => number): T {
  const weights = items.map((item) => Math.max(0, weight(item)))
  const total = weights.reduce((sum, value) => sum + value, 0)
  if (total <= 0) return items[Math.floor(rng() * items.length)]!
  let cursor = rng() * total
  for (let i = 0; i < items.length; i++) {
    cursor -= weights[i]!
    if (cursor <= 0) return items[i]!
  }
  return items[items.length - 1]!
}

export function poisson(lambda: number, rng: Rng, cap = 7): number {
  const L = Math.exp(-Math.max(0, lambda))
  let k = 0
  let p = 1
  do {
    k += 1
    p *= rng()
  } while (p > L && k <= cap + 8)
  return Math.min(cap, k - 1)
}
