export interface Product {
  id: string
  name: string
  description: string
  category: string
  basePrice: number
  gstRate: number
  uom: string
  isActive: boolean
}

export interface QuoteTemplate {
  id: string
  name: string
  description: string
  category: string
  defaultTerms: string
  defaultValidityDays: number
  products: string[]
}

export interface QuoteTotals {
  subtotal: number
  discountAmount: number
  taxableAmount: number
  cgst: number
  sgst: number
  igst: number
  totalTax: number
  grandTotal: number
}

export interface QuoteStatus {
  status: "draft" | "awaiting_approval" | "approved" | "sent" | "signed" | "declined"
  approvedBy?: string
  approvedAt?: Date
  sentAt?: Date
  viewedAt?: Date
  signedAt?: Date
}
