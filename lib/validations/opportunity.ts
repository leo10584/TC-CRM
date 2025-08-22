import { z } from "zod"

export const opportunityCreateSchema = z.object({
  accountId: z.string().min(1, "Account is required"),
  name: z.string().min(1, "Opportunity name is required"),
  value: z.number().min(0, "Value must be positive"),
  currency: z.string().default("INR"),
  stage: z
    .enum(["qualification", "needs_analysis", "proposal", "negotiation", "closed_won", "closed_lost"])
    .default("qualification"),
  closeDate: z.string().min(1, "Expected close date is required"),
  probability: z.number().min(0).max(100).default(25),
  vertical: z.enum(["Pharma", "Biotech", "MedDevice", "CRO", "Hospital"]),
  description: z.string().optional(),
  competitorInfo: z.string().optional(),
})

export type OpportunityCreateInput = z.infer<typeof opportunityCreateSchema>

export const opportunityUpdateSchema = opportunityCreateSchema.partial()
export type OpportunityUpdateInput = z.infer<typeof opportunityUpdateSchema>
