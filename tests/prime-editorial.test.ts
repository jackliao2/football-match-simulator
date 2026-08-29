import { describe, expect, it } from "vitest"
import { getPrimeEditorial } from "@/data/prime-editorial"
import { primeEntities } from "@/data/prime"

describe("prime editorial", () => {
  it("gives every published prime page a substantial case and counter-case", () => {
    for (const entity of primeEntities) {
      const editorial = getPrimeEditorial(entity.slug)
      expect(editorial, entity.slug).toBeDefined()
      expect(editorial!.caseFor.length).toBeGreaterThan(250)
      expect(editorial!.counterCase.length).toBeGreaterThan(200)
    }
  })
})
