import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { QuoteTotals } from "@/components/quote/quote-totals"

const mockQuoteData = {
  lines: [
    {
      id: "1",
      description: "Product 1",
      quantity: 2,
      unitPrice: 50000,
      gstRate: 18,
      optional: false,
    },
    {
      id: "2",
      description: "Product 2",
      quantity: 1,
      unitPrice: 30000,
      gstRate: 18,
      optional: false,
    },
  ],
  discountsPct: 10,
  isInterState: false,
}

describe("QuoteTotals", () => {
  it("renders quote totals correctly", () => {
    render(<QuoteTotals quote={mockQuoteData} />)

    // Check subtotal
    expect(screen.getByText("₹1,30,000")).toBeInTheDocument()

    // Check discount
    expect(screen.getByText("-₹13,000")).toBeInTheDocument()

    // Check taxable amount
    expect(screen.getByText("₹1,17,000")).toBeInTheDocument()

    // Check CGST/SGST for intra-state
    expect(screen.getByText("CGST (9%)")).toBeInTheDocument()
    expect(screen.getByText("SGST (9%)")).toBeInTheDocument()
    expect(screen.getByText("₹10,530")).toBeInTheDocument() // CGST amount

    // Check grand total
    expect(screen.getByText("₹1,38,060")).toBeInTheDocument()
  })

  it("renders IGST for inter-state transactions", () => {
    const interStateQuote = { ...mockQuoteData, isInterState: true }

    render(<QuoteTotals quote={interStateQuote} />)

    expect(screen.getByText("IGST (18%)")).toBeInTheDocument()
    expect(screen.queryByText("CGST")).not.toBeInTheDocument()
    expect(screen.queryByText("SGST")).not.toBeInTheDocument()
  })

  it("handles zero discount correctly", () => {
    const noDiscountQuote = { ...mockQuoteData, discountsPct: 0 }

    render(<QuoteTotals quote={noDiscountQuote} />)

    expect(screen.getByText("-₹0")).toBeInTheDocument()
  })
})
