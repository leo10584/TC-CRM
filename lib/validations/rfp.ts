import { z } from "zod"

export const rfpCreateSchema = z.object({
  channel: z.enum(["email", "web", "partner"], {
    required_error: "Please select a channel",
  }),
  accountId: z.string().optional(),
  accountName: z.string().min(1, "Account name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().optional(),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  scopeItems: z.array(z.string()).min(1, "At least one scope item is required"),
  attachments: z.array(z.string()).optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  expectedBudget: z.number().optional(),
  expectedTimeline: z.string().optional(),
})

export type RfpCreateInput = z.infer<typeof rfpCreateSchema>
