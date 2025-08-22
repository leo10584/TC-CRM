import { describe, it, expect } from "vitest"
import { calculateGST, calculateTotalWithGST, isInterState } from "@/lib/utils/gst"

describe("GST Utils", () => {
  describe("calculateGST", () => {
    it("calculates intra-state GST (CGST + SGST)", () => {
      const result = calculateGST(100000, 18, false)

      expect(result.cgst).toBe(9000)
      expect(result.sgst).toBe(9000)
      expect(result.igst).toBe(0)
      expect(result.totalTax).toBe(18000)
    })

    it("calculates inter-state GST (IGST)", () => {
      const result = calculateGST(100000, 18, true)

      expect(result.cgst).toBe(0)
      expect(result.sgst).toBe(0)
      expect(result.igst).toBe(18000)
      expect(result.totalTax).toBe(18000)
    })

    it("handles different GST rates", () => {
      const result5 = calculateGST(100000, 5, false)
      expect(result5.totalTax).toBe(5000)

      const result12 = calculateGST(100000, 12, false)
      expect(result12.totalTax).toBe(12000)

      const result28 = calculateGST(100000, 28, false)
      expect(result28.totalTax).toBe(28000)
    })
  })

  describe("calculateTotalWithGST", () => {
    it("calculates total amount including GST", () => {
      const total = calculateTotalWithGST(100000, 18)
      expect(total).toBe(118000)
    })
  })

  describe("isInterState", () => {
    it("identifies inter-state transactions", () => {
      expect(isInterState("Karnataka", "Tamil Nadu")).toBe(true)
      expect(isInterState("Maharashtra", "Gujarat")).toBe(true)
    })

    it("identifies intra-state transactions", () => {
      expect(isInterState("Karnataka", "Karnataka")).toBe(false)
      expect(isInterState("Tamil Nadu", "Tamil Nadu")).toBe(false)
    })

    it("handles case insensitive state names", () => {
      expect(isInterState("karnataka", "KARNATAKA")).toBe(false)
      expect(isInterState("tamil nadu", "Tamil Nadu")).toBe(false)
    })
  })
})
