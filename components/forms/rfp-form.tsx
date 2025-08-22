"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { rfpCreateSchema, type RfpCreateInput } from "@/lib/validations/rfp"
import { Plus, X, Upload, FileText } from "lucide-react"

interface RfpFormProps {
  onSubmit: (data: RfpCreateInput) => void
  isLoading?: boolean
}

export function RfpForm({ onSubmit, isLoading }: RfpFormProps) {
  const t = useTranslations("rfp")
  const [scopeItem, setScopeItem] = useState("")

  const form = useForm<RfpCreateInput>({
    resolver: zodResolver(rfpCreateSchema),
    defaultValues: {
      channel: "web",
      scopeItems: [],
      priority: "medium",
      currency: "INR",
    },
  })

  const {
    fields: scopeFields,
    append: appendScope,
    remove: removeScope,
  } = useFieldArray({
    control: form.control,
    name: "scopeItems",
  })

  const addScopeItem = () => {
    if (scopeItem.trim()) {
      appendScope(scopeItem.trim())
      setScopeItem("")
    }
  }

  const handleSubmit = (data: RfpCreateInput) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="channel">{t("channel")}</Label>
              <Select value={form.watch("channel")} onValueChange={(value) => form.setValue("channel", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">{t("channels.email")}</SelectItem>
                  <SelectItem value="web">{t("channels.web")}</SelectItem>
                  <SelectItem value="partner">{t("channels.partner")}</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.channel && (
                <p className="text-sm text-destructive">{form.formState.errors.channel.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={form.watch("priority")} onValueChange={(value) => form.setValue("priority", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedBudget">Expected Budget (₹)</Label>
              <Input
                id="expectedBudget"
                type="number"
                placeholder="Enter expected budget"
                {...form.register("expectedBudget", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedTimeline">Expected Timeline</Label>
              <Input id="expectedTimeline" placeholder="e.g., 3-6 months" {...form.register("expectedTimeline")} />
            </div>
          </CardContent>
        </Card>

        {/* Account & Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account & Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input id="accountName" placeholder="Enter account name" {...form.register("accountName")} />
              {form.formState.errors.accountName && (
                <p className="text-sm text-destructive">{form.formState.errors.accountName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input id="contactName" placeholder="Enter contact name" {...form.register("contactName")} />
              {form.formState.errors.contactName && (
                <p className="text-sm text-destructive">{form.formState.errors.contactName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="Enter contact email"
                {...form.register("contactEmail")}
              />
              {form.formState.errors.contactEmail && (
                <p className="text-sm text-destructive">{form.formState.errors.contactEmail.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input id="contactPhone" placeholder="Enter contact phone" {...form.register("contactPhone")} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RFP Details */}
      <Card>
        <CardHeader>
          <CardTitle>RFP Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">{t("summary")}</Label>
            <Textarea
              id="summary"
              placeholder="Provide a detailed summary of the RFP requirements"
              rows={4}
              {...form.register("summary")}
            />
            {form.formState.errors.summary && (
              <p className="text-sm text-destructive">{form.formState.errors.summary.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t("scopeItems")}</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add scope item"
                value={scopeItem}
                onChange={(e) => setScopeItem(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addScopeItem())}
              />
              <Button type="button" onClick={addScopeItem} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {scopeFields.map((field, index) => (
                <Badge key={field.id} variant="secondary" className="gap-1">
                  {field.value}
                  <button type="button" onClick={() => removeScope(index)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {form.formState.errors.scopeItems && (
              <p className="text-sm text-destructive">{form.formState.errors.scopeItems.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
              <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create RFP"}
        </Button>
      </div>
    </form>
  )
}
