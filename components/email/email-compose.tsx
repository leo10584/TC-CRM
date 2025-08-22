"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { emailComposeSchema, type EmailComposeInput } from "@/lib/validations/email"
import { Send, Paperclip, X } from "lucide-react"

interface EmailComposeProps {
  onSend: (data: EmailComposeInput) => void
  onCancel: () => void
  isLoading?: boolean
  initialData?: Partial<EmailComposeInput>
}

export function EmailCompose({ onSend, onCancel, isLoading, initialData }: EmailComposeProps) {
  const [showCc, setShowCc] = useState(false)
  const [showBcc, setShowBcc] = useState(false)
  const [toInput, setToInput] = useState("")
  const [ccInput, setCcInput] = useState("")
  const [bccInput, setBccInput] = useState("")

  const form = useForm<EmailComposeInput>({
    resolver: zodResolver(emailComposeSchema),
    defaultValues: {
      to: [],
      cc: [],
      bcc: [],
      trackOpens: true,
      trackClicks: true,
      ...initialData,
    },
  })

  const addEmail = (field: "to" | "cc" | "bcc", email: string) => {
    if (email && email.includes("@")) {
      const currentEmails = form.getValues(field) || []
      if (!currentEmails.includes(email)) {
        form.setValue(field, [...currentEmails, email])
      }
    }
  }

  const removeEmail = (field: "to" | "cc" | "bcc", email: string) => {
    const currentEmails = form.getValues(field) || []
    form.setValue(
      field,
      currentEmails.filter((e) => e !== email),
    )
  }

  const handleKeyPress =
    (field: "to" | "cc" | "bcc", input: string, setInput: (value: string) => void) => (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
        addEmail(field, input.trim())
        setInput("")
      }
    }

  const handleSubmit = (data: EmailComposeInput) => {
    onSend(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compose Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* To Field */}
          <div className="space-y-2">
            <Label>To</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {form.watch("to")?.map((email) => (
                  <Badge key={email} variant="secondary" className="gap-1">
                    {email}
                    <button type="button" onClick={() => removeEmail("to", email)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Enter email addresses..."
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
                onKeyPress={handleKeyPress("to", toInput, setToInput)}
                onBlur={() => {
                  if (toInput.trim()) {
                    addEmail("to", toInput.trim())
                    setToInput("")
                  }
                }}
              />
            </div>
            {form.formState.errors.to && <p className="text-sm text-destructive">{form.formState.errors.to.message}</p>}
          </div>

          {/* CC/BCC Toggle */}
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowCc(!showCc)}>
              {showCc ? "Hide" : "Add"} CC
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowBcc(!showBcc)}>
              {showBcc ? "Hide" : "Add"} BCC
            </Button>
          </div>

          {/* CC Field */}
          {showCc && (
            <div className="space-y-2">
              <Label>CC</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {form.watch("cc")?.map((email) => (
                    <Badge key={email} variant="secondary" className="gap-1">
                      {email}
                      <button type="button" onClick={() => removeEmail("cc", email)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Enter CC email addresses..."
                  value={ccInput}
                  onChange={(e) => setCcInput(e.target.value)}
                  onKeyPress={handleKeyPress("cc", ccInput, setCcInput)}
                  onBlur={() => {
                    if (ccInput.trim()) {
                      addEmail("cc", ccInput.trim())
                      setCcInput("")
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* BCC Field */}
          {showBcc && (
            <div className="space-y-2">
              <Label>BCC</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {form.watch("bcc")?.map((email) => (
                    <Badge key={email} variant="secondary" className="gap-1">
                      {email}
                      <button
                        type="button"
                        onClick={() => removeEmail("bcc", email)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  placeholder="Enter BCC email addresses..."
                  value={bccInput}
                  onChange={(e) => setBccInput(e.target.value)}
                  onKeyPress={handleKeyPress("bcc", bccInput, setBccInput)}
                  onBlur={() => {
                    if (bccInput.trim()) {
                      addEmail("bcc", bccInput.trim())
                      setBccInput("")
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Enter email subject..." {...form.register("subject")} />
            {form.formState.errors.subject && (
              <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
            )}
          </div>

          {/* Body */}
          <div className="space-y-2">
            <Label htmlFor="bodyHtml">Message</Label>
            <Textarea id="bodyHtml" placeholder="Enter your message..." rows={8} {...form.register("bodyHtml")} />
            {form.formState.errors.bodyHtml && (
              <p className="text-sm text-destructive">{form.formState.errors.bodyHtml.message}</p>
            )}
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <Paperclip className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
              <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent">
                Choose Files
              </Button>
            </div>
          </div>

          {/* Tracking Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="trackOpens"
                checked={form.watch("trackOpens")}
                onCheckedChange={(checked) => form.setValue("trackOpens", checked)}
              />
              <Label htmlFor="trackOpens">Track email opens</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="trackClicks"
                checked={form.watch("trackClicks")}
                onCheckedChange={(checked) => form.setValue("trackClicks", checked)}
              />
              <Label htmlFor="trackClicks">Track link clicks</Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? "Sending..." : "Send Email"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
