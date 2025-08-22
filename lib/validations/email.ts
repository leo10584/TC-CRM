import { z } from "zod"

export const emailComposeSchema = z.object({
  to: z.array(z.string().email("Invalid email address")).min(1, "At least one recipient is required"),
  cc: z.array(z.string().email("Invalid email address")).optional(),
  bcc: z.array(z.string().email("Invalid email address")).optional(),
  subject: z.string().min(1, "Subject is required"),
  bodyHtml: z.string().min(1, "Email body is required"),
  attachments: z.array(z.string()).optional(),
  trackOpens: z.boolean().default(true),
  trackClicks: z.boolean().default(true),
})

export type EmailComposeInput = z.infer<typeof emailComposeSchema>

export const esignCreateSchema = z.object({
  quoteId: z.string().min(1, "Quote is required"),
  provider: z.enum(["DocuSign", "Adobe"], {
    required_error: "Please select an e-sign provider",
  }),
  recipients: z
    .array(
      z.object({
        name: z.string().min(1, "Recipient name is required"),
        email: z.string().email("Invalid email address"),
        role: z.enum(["signer", "cc", "approver"]).default("signer"),
        order: z.number().default(1),
      }),
    )
    .min(1, "At least one recipient is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().optional(),
  reminderDays: z.number().min(1).max(30).default(3),
  expirationDays: z.number().min(1).max(365).default(30),
})

export type EsignCreateInput = z.infer<typeof esignCreateSchema>
