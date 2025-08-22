export interface EmailMessage {
  id: string
  from: string
  to: string[]
  cc?: string[]
  bcc?: string[]
  subject: string
  bodyHtml: string
  bodyText?: string
  sentAt: Date
  isRead: boolean
  isTracked: boolean
  opens: number
  clicks: number
  attachments?: EmailAttachment[]
  threadId: string
  inReplyTo?: string
  messageId: string
}

export interface EmailAttachment {
  id: string
  filename: string
  contentType: string
  size: number
  url: string
}

export interface EmailThread {
  id: string
  entityType: "opportunity" | "quote" | "account" | "contact"
  entityId: string
  subject: string
  participants: string[]
  messageCount: number
  lastMessageAt: Date
  isRead: boolean
  messages: EmailMessage[]
}

export interface EsignEnvelope {
  id: string
  provider: "DocuSign" | "Adobe"
  quoteId: string
  status: "created" | "sent" | "delivered" | "completed" | "declined" | "expired"
  subject: string
  message?: string
  createdAt: Date
  sentAt?: Date
  completedAt?: Date
  expiresAt: Date
  recipients: EsignRecipient[]
  documentUrl?: string
  certificateUrl?: string
  providerEnvelopeId: string
}

export interface EsignRecipient {
  id: string
  name: string
  email: string
  role: "signer" | "cc" | "approver"
  status: "created" | "sent" | "delivered" | "signed" | "declined"
  order: number
  signedAt?: Date
  declinedAt?: Date
  declineReason?: string
}
