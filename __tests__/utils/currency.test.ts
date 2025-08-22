import { describe, it, expect } from "vitest"
import { formatINR, formatINRCompact } from "@/lib/utils/currency"

describe("Currency Utils", () => {
  describe("formatINR", () => {
    it("formats Indian currency correctly", () => {
      expect(formatINR(1000)).toBe("₹1,000")
      expect(formatINR(100000)).toBe("₹1,00,000")
      expect(formatINR(1000000)).toBe("₹10,00,000")
      expect(formatINR(10000000)).toBe("₹1,00,00,000")
    })

    it("handles decimal values", () => {
      expect(formatINR(1000.5)).toBe("₹1,000.50")
      expect(formatINR(100000.99)).toBe("₹1,00,000.99")
    })

    it("handles zero and negative values", () => {
      expect(formatINR(0)).toBe("₹0")
      expect(formatINR(-1000)).toBe("-₹1,000")
    })
  })

  describe("formatINRCompact", () => {
    it("formats large numbers with compact notation", () => {
      expect(formatINRCompact(1000)).toBe("₹1K")
      expect(formatINRCompact(100000)).toBe("₹1L")
      expect(formatINRCompact(1000000)).toBe("₹10L")
      expect(formatINRCompact(10000000)).toBe("₹1Cr")
      expect(formatINRCompact(100000000)).toBe("₹10Cr")
    })

    it("handles decimal precision in compact format", () => {
      expect(formatINRCompact(1500000)).toBe("₹15L")
      expect(formatINRCompact(12500000)).toBe("₹1.25Cr")
    })
  })
})
