"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatINR } from "@/lib/utils/currency"
import { calculateGST } from "@/lib/utils/gst"
import type { QuoteLineInput } from "@/lib/validations/quote"
import type { QuoteTotalsType } from "@/lib/types/quote"

interface QuoteTotalsProps {
  lines: (QuoteLineInput & { id: string })[]
  discountsPct: number
  isInterState: boolean
}

export function QuoteTotalsComponent({ lines, discountsPct, isInterState }: QuoteTotalsProps) {
  const calculateTotals = (): QuoteTotalsType => {
    const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0)
    const discountAmount = (subtotal * discountsPct) / 100
    const taxableAmount = subtotal - discountAmount

    let totalCGST = 0
    let totalSGST = 0
    let totalIGST = 0

    lines.forEach((line) => {
      const lineAmount = line.quantity * line.unitPrice * (1 - discountsPct / 100)
      const gstBreakdown = calculateGST(lineAmount, line.gstRate, isInterState)

      totalCGST += gstBreakdown.cgst
      totalSGST += gstBreakdown.sgst
      totalIGST += gstBreakdown.igst
    })

    const totalTax = totalCGST + totalSGST + totalIGST
    const grandTotal = taxableAmount + totalTax

    return {
      subtotal,
      discountAmount,
      taxableAmount,
      cgst: totalCGST,
      sgst: totalSGST,
      igst: totalIGST,
      totalTax,
      grandTotal,
    }
  }

  const totals = calculateTotals()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>{formatINR(totals.subtotal)}</span>
        </div>

        {discountsPct > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({discountsPct}%):</span>
            <span>-{formatINR(totals.discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span>Taxable Amount:</span>
          <span>{formatINR(totals.taxableAmount)}</span>
        </div>

        <Separator />

        {/* GST Breakdown */}
        <div className="space-y-2">
          <div className="text-sm font-medium">GST Breakdown:</div>

          {isInterState ? (
            <div className="flex justify-between text-sm pl-4">
              <span>IGST:</span>
              <span>{formatINR(totals.igst)}</span>
            </div>
          ) : (
            <>
              <div className="flex justify-between text-sm pl-4">
                <span>CGST:</span>
                <span>{formatINR(totals.cgst)}</span>
              </div>
              <div className="flex justify-between text-sm pl-4">
                <span>SGST:</span>
                <span>{formatINR(totals.sgst)}</span>
              </div>
            </>
          )}

          <div className="flex justify-between text-sm font-medium">
            <span>Total Tax:</span>
            <span>{formatINR(totals.totalTax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold text-primary">
          <span>Grand Total:</span>
          <span>{formatINR(totals.grandTotal)}</span>
        </div>

        {/* Tax Type Indicator */}
        <div className="text-xs text-muted-foreground text-center">
          {isInterState
            ? "Inter-state transaction (IGST applicable)"
            : "Intra-state transaction (CGST + SGST applicable)"}
        </div>
      </CardContent>
    </Card>
  )
}

export { QuoteTotalsComponent as QuoteTotals }
