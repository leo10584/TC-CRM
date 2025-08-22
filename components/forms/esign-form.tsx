"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { esignCreateSchema, type EsignCreateInput } from "@/lib/validations/email"
import { Plus, X, PenTool } from "lucide-react"

interface EsignFormProps {
  onSubmit: (data: EsignCreateInput) => void
  isLoading?: boolean
  quoteId?: string
  initialRecipients?: Array<{ name: string; email: string }>
}

export function EsignForm({ onSubmit, isLoading, quoteId, initialRecipients = [] }: EsignFormProps) {
  const form = useForm<EsignCreateInput>({
    resolver: zodResolver(esignCreateSchema),
    defaultValues: {
      quoteId: quoteId || "",
      provider: "DocuSign",
      recipients:
        initialRecipients.length > 0
          ? initialRecipients.map((r, index) => ({ ...r, role: "signer" as const, order: index + 1 }))
          : [{ name: "", email: "", role: "signer" as const, order: 1 }],
      subject: "Please review and sign the attached quote",
      reminderDays: 3,
      expirationDays: 30,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipients",
  })

  const handleSubmit = (data: EsignCreateInput) => {
    onSubmit(data)
  }

  const addRecipient = () => {
    append({
      name: "",
      email: "",
      role: "signer",
      order: fields.length + 1,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create E-Signature Envelope</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Provider Selection */}
          <div className="space-y-2">
            <Label htmlFor="provider">E-Signature Provider</Label>
            <Select value={form.watch("provider")} onValueChange={(value) => form.setValue("provider", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DocuSign">DocuSign</SelectItem>
                <SelectItem value="Adobe">Adobe Sign</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.provider && (
              <p className="text-sm text-destructive">{form.formState.errors.provider.message}</p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Enter email subject..." {...form.register("subject")} />
            {form.formState.errors.subject && (
              <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Enter a message for the recipients..."
              rows={3}
              {...form.register("message")}
            />
          </div>

          {/* Recipients */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Recipients</Label>
              <Button type="button" variant="outline" size="sm" onClick={addRecipient}>
                <Plus className="h-4 w-4 mr-1" />
                Add Recipient
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Recipient {index + 1}</Badge>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input placeholder="Enter recipient name" {...form.register(`recipients.${index}.name`)} />
                      {form.formState.errors.recipients?.[index]?.name && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.recipients[index]?.name?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter recipient email"
                        {...form.register(`recipients.${index}.email`)}
                      />
                      {form.formState.errors.recipients?.[index]?.email && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.recipients[index]?.email?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select
                        value={form.watch(`recipients.${index}.role`)}
                        onValueChange={(value) => form.setValue(`recipients.${index}.role`, value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="signer">Signer</SelectItem>
                          <SelectItem value="approver">Approver</SelectItem>
                          <SelectItem value="cc">CC (Copy)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Signing Order</Label>
                      <Input
                        type="number"
                        min="1"
                        {...form.register(`recipients.${index}.order`, { valueAsNumber: true })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {form.formState.errors.recipients && (
              <p className="text-sm text-destructive">{form.formState.errors.recipients.message}</p>
            )}
          </div>

          {/* Settings */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reminderDays">Reminder Frequency (days)</Label>
              <Input
                id="reminderDays"
                type="number"
                min="1"
                max="30"
                {...form.register("reminderDays", { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground">How often to send reminder emails to recipients</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expirationDays">Expiration (days)</Label>
              <Input
                id="expirationDays"
                type="number"
                min="1"
                max="365"
                {...form.register("expirationDays", { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground">How many days until the envelope expires</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <PenTool className="mr-2 h-4 w-4" />
              {isLoading ? "Creating..." : "Create Envelope"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
