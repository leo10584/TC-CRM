import { z } from "zod"

export const userRoleSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Role name is required"),
  description: z.string().optional(),
  permissions: z.array(z.string()),
  isActive: z.boolean().default(true),
})

export const userManagementSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.string().min(1, "Role is required"),
  department: z.string().optional(),
  isActive: z.boolean().default(true),
})

export const systemSettingsSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyAddress: z.string().min(1, "Company address is required"),
  gstNumber: z.string().min(15, "Valid GST number is required"),
  defaultCurrency: z.string().default("INR"),
  defaultTaxRate: z.number().min(0).max(100),
  emailSettings: z.object({
    smtpHost: z.string().optional(),
    smtpPort: z.number().optional(),
    smtpUser: z.string().optional(),
    smtpPassword: z.string().optional(),
    fromEmail: z.string().email().optional(),
    fromName: z.string().optional(),
  }),
  auditRetentionDays: z.number().min(30).max(2555), // 7 years max
  requireApprovalThreshold: z.number().min(0),
})

export type UserRole = z.infer<typeof userRoleSchema>
export type UserManagement = z.infer<typeof userManagementSchema>
export type SystemSettings = z.infer<typeof systemSettingsSchema>
