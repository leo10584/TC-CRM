"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { FileText, Download, Clock, CheckCircle, XCircle, AlertCircle, Send, Eye } from "lucide-react"
import type { EsignEnvelope } from "@/lib/types/email"

interface EsignStatusProps {
  envelope: EsignEnvelope
  onDownloadCertificate?: () => void
  onDownloadDocument?: () => void
  onResend?: () => void
}

export function EsignStatus({ envelope, onDownloadCertificate, onDownloadDocument, onResend }: EsignStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "created":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "created":
        return Clock
      case "sent":
        return Send
      case "delivered":
        return Eye
      case "completed":
        return CheckCircle
      case "declined":
        return XCircle
      case "expired":
        return AlertCircle
      default:
        return FileText
    }
  }

  const getRecipientStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
        return CheckCircle
      case "declined":
        return XCircle
      case "delivered":
        return Eye
      case "sent":
        return Send
      default:
        return Clock
    }
  }

  const getRecipientStatusColor = (status: string) => {
    switch (status) {
      case "signed":
        return "text-green-600"
      case "declined":
        return "text-red-600"
      case "delivered":
        return "text-purple-600"
      case "sent":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const calculateProgress = () => {
    const totalRecipients = envelope.recipients.length
    const signedRecipients = envelope.recipients.filter((r) => r.status === "signed").length
    return (signedRecipients / totalRecipients) * 100
  }

  const StatusIcon = getStatusIcon(envelope.status)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <StatusIcon className="h-5 w-5" />
              E-Signature Envelope
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{envelope.subject}</p>
          </div>
          <Badge className={getStatusColor(envelope.status)}>{envelope.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Envelope Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground">Provider</div>
            <div className="font-medium">{envelope.provider}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Created</div>
            <div className="font-medium">{formatDistanceToNow(envelope.createdAt, { addSuffix: true })}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Expires</div>
            <div className="font-medium">{formatDistanceToNow(envelope.expiresAt, { addSuffix: true })}</div>
          </div>
          {envelope.completedAt && (
            <div>
              <div className="text-sm text-muted-foreground">Completed</div>
              <div className="font-medium">{formatDistanceToNow(envelope.completedAt, { addSuffix: true })}</div>
            </div>
          )}
        </div>

        {/* Progress */}
        {envelope.status !== "completed" && envelope.status !== "declined" && envelope.status !== "expired" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Signing Progress</span>
              <span>{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        )}

        {/* Recipients */}
        <div className="space-y-3">
          <h4 className="font-medium">Recipients</h4>
          <div className="space-y-3">
            {envelope.recipients
              .sort((a, b) => a.order - b.order)
              .map((recipient) => {
                const RecipientIcon = getRecipientStatusIcon(recipient.status)

                return (
                  <div key={recipient.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {recipient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{recipient.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {recipient.role}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{recipient.email}</div>
                      {recipient.signedAt && (
                        <div className="text-xs text-green-600">
                          Signed {formatDistanceToNow(recipient.signedAt, { addSuffix: true })}
                        </div>
                      )}
                      {recipient.declinedAt && (
                        <div className="text-xs text-red-600">
                          Declined {formatDistanceToNow(recipient.declinedAt, { addSuffix: true })}
                          {recipient.declineReason && `: ${recipient.declineReason}`}
                        </div>
                      )}
                    </div>

                    <div className={`flex items-center gap-1 ${getRecipientStatusColor(recipient.status)}`}>
                      <RecipientIcon className="h-4 w-4" />
                      <span className="text-sm capitalize">{recipient.status}</span>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Message */}
        {envelope.message && (
          <div className="space-y-2">
            <h4 className="font-medium">Message</h4>
            <p className="text-sm text-muted-foreground">{envelope.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          {envelope.documentUrl && (
            <Button variant="outline" onClick={onDownloadDocument}>
              <Download className="mr-2 h-4 w-4" />
              Download Document
            </Button>
          )}

          {envelope.certificateUrl && envelope.status === "completed" && (
            <Button variant="outline" onClick={onDownloadCertificate}>
              <FileText className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
          )}

          {(envelope.status === "expired" || envelope.status === "declined") && (
            <Button onClick={onResend}>
              <Send className="mr-2 h-4 w-4" />
              Resend
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
