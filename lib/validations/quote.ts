import { z } from "zod"

export const quoteLineSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  uom: z.string().default("units"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  optional: z.boolean().default(false),
  gstRate: z.number().min(0).max(100).default(18),
})

export const quoteCreateSchema = z.object({
  oppId: z.string().min(1, "Opportunity is required"),
  templateId: z.string().min(1, "Template is required"),
  lines: z.array(quoteLineSchema).min(1, "At least one line item is required"),
  currency: z.string().default("INR"),
  discountsPct: z.number().min(0).max(100).default(0),
  isInterState: z.boolean().default(false),
  validUntil: z.string().min(1, "Valid until date is required"),
  terms: z.string().optional(),
  notes: z.string().optional(),
  requiresApproval: z.boolean().default(false),
})

export type QuoteLineInput = z.infer<typeof quoteLineSchema>
export type QuoteCreateInput = z.infer<typeof quoteCreateSchema>

export const quoteUpdateSchema = quoteCreateSchema.partial()
export type QuoteUpdateInput = z.infer<typeof quoteUpdateSchema>
