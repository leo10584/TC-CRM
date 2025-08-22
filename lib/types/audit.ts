export interface AuditEntry {
  id: string
  entityType: string
  entityId: string
  action: string
  userId: string
  userName: string
  timestamp: string
  changes: Record<string, { from: any; to: any }>
  metadata?: Record<string, any>
  ipAddress?: string
  userAgent?: string
}

export interface AuditFilter {
  entityType?: string
  entityId?: string
  userId?: string
  action?: string
  dateFrom?: string
  dateTo?: string
}

export type EntityType = "opportunity" | "quote" | "rfp" | "contact" | "account" | "user" | "system"

export type AuditAction =
  | "created"
  | "updated"
  | "deleted"
  | "viewed"
  | "exported"
  | "sent"
  | "signed"
  | "approved"
  | "rejected"
