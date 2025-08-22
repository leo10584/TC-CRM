"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { formatDistanceToNow } from "date-fns"
import { Reply, ReplyAll, Forward, Paperclip, Eye, MousePointer, ChevronDown, ChevronUp } from "lucide-react"
import type { EmailThread } from "@/lib/types/email"

interface EmailThreadProps {
  thread: EmailThread
  onReply?: (messageId: string) => void
  onReplyAll?: (messageId: string) => void
  onForward?: (messageId: string) => void
}

export function EmailThreadComponent({ thread, onReply, onReplyAll, onForward }: EmailThreadProps) {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set([thread.messages[0]?.id]))

  const toggleMessage = (messageId: string) => {
    const newExpanded = new Set(expandedMessages)
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId)
    } else {
      newExpanded.add(messageId)
    }
    setExpandedMessages(newExpanded)
  }

  const getInitials = (email: string) => {
    return email.split("@")[0].substring(0, 2).toUpperCase()
  }

  const formatEmailList = (emails: string[]) => {
    if (emails.length <= 2) {
      return emails.join(", ")
    }
    return `${emails.slice(0, 2).join(", ")} +${emails.length - 2} more`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{thread.subject}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {thread.messageCount} messages • {formatEmailList(thread.participants)}
            </p>
          </div>
          <Badge variant={thread.isRead ? "secondary" : "default"}>{thread.isRead ? "Read" : "Unread"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {thread.messages.map((message, index) => {
          const isExpanded = expandedMessages.has(message.id)
          const isLast = index === thread.messages.length - 1

          return (
            <div key={message.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{getInitials(message.from)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{message.from}</span>
                      <span className="text-xs text-muted-foreground">to {formatEmailList(message.to)}</span>
                      {message.cc && message.cc.length > 0 && (
                        <span className="text-xs text-muted-foreground">cc {formatEmailList(message.cc)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(message.sentAt, { addSuffix: true })}
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => toggleMessage(message.id)}>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 space-y-3">
                      {/* Email tracking info */}
                      {message.isTracked && (
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {message.opens} opens
                          </div>
                          <div className="flex items-center gap-1">
                            <MousePointer className="h-3 w-3" />
                            {message.clicks} clicks
                          </div>
                          <Badge variant={message.isRead ? "secondary" : "destructive"} className="text-xs">
                            {message.isRead ? "Read" : "Unread"}
                          </Badge>
                        </div>
                      )}

                      {/* Email body */}
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: message.bodyHtml }}
                      />

                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium flex items-center gap-1">
                            <Paperclip className="h-4 w-4" />
                            Attachments ({message.attachments.length})
                          </div>
                          <div className="grid gap-2 md:grid-cols-2">
                            {message.attachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center gap-2 p-2 border rounded text-sm">
                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate">{attachment.filename}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {(attachment.size / 1024).toFixed(1)} KB
                                  </div>
                                </div>
                                <Button size="sm" variant="ghost">
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Message actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" onClick={() => onReply?.(message.id)}>
                          <Reply className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onReplyAll?.(message.id)}>
                          <ReplyAll className="h-4 w-4 mr-1" />
                          Reply All
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onForward?.(message.id)}>
                          <Forward className="h-4 w-4 mr-1" />
                          Forward
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {!isLast && <Separator />}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
