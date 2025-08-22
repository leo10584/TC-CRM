"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { FileText, Mail, Phone, Calendar, DollarSign, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"

interface TimelineEvent {
  id: string
  type: "note" | "email" | "call" | "meeting" | "stage_change" | "quote" | "task"
  title: string
  description?: string
  actor: {
    name: string
    initials: string
  }
  timestamp: Date
  metadata?: Record<string, any>
}

interface OpportunityTimelineProps {
  events: TimelineEvent[]
}

export function OpportunityTimeline({ events }: OpportunityTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "note":
        return MessageSquare
      case "email":
        return Mail
      case "call":
        return Phone
      case "meeting":
        return Calendar
      case "stage_change":
        return CheckCircle
      case "quote":
        return DollarSign
      case "task":
        return AlertCircle
      default:
        return FileText
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "note":
        return "text-blue-600"
      case "email":
        return "text-green-600"
      case "call":
        return "text-purple-600"
      case "meeting":
        return "text-orange-600"
      case "stage_change":
        return "text-primary"
      case "quote":
        return "text-yellow-600"
      case "task":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => {
            const Icon = getEventIcon(event.type)
            const isLast = index === events.length - 1

            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`p-2 rounded-full bg-background border-2 ${getEventColor(event.type)}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  {!isLast && <div className="w-px h-8 bg-border mt-2" />}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">{event.actor.initials}</AvatarFallback>
                    </Avatar>
                    <span>{event.actor.name}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(event.timestamp, { addSuffix: true })}</span>
                  </div>

                  {event.metadata && (
                    <div className="text-xs text-muted-foreground">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
