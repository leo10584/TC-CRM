"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { opportunityCreateSchema, type OpportunityCreateInput } from "@/lib/validations/opportunity"

interface OpportunityFormProps {
  onSubmit: (data: OpportunityCreateInput) => void
  isLoading?: boolean
  initialData?: Partial<OpportunityCreateInput>
}

export function OpportunityForm({ onSubmit, isLoading, initialData }: OpportunityFormProps) {
  const t = useTranslations("opportunities")

  const form = useForm<OpportunityCreateInput>({
    resolver: zodResolver(opportunityCreateSchema),
    defaultValues: {
      currency: "INR",
      stage: "qualification",
      probability: 25,
      ...initialData,
    },
  })

  const handleSubmit = (data: OpportunityCreateInput) => {
    onSubmit(data)
  }

  const stages = [
    { value: "qualification", label: t("stages.qualification"), probability: 25 },
    { value: "needs_analysis", label: t("stages.needs_analysis"), probability: 40 },
    { value: "proposal", label: t("stages.proposal"), probability: 60 },
    { value: "negotiation", label: t("stages.negotiation"), probability: 80 },
    { value: "closed_won", label: t("stages.closed_won"), probability: 100 },
    { value: "closed_lost", label: t("stages.closed_lost"), probability: 0 },
  ]

  const verticals = [
    { value: "Pharma", label: t("verticals.pharma") },
    { value: "Biotech", label: t("verticals.biotech") },
    { value: "MedDevice", label: t("verticals.meddevice") },
    { value: "CRO", label: t("verticals.cro") },
    { value: "Hospital", label: t("verticals.hospital") },
  ]

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" placeholder="Enter opportunity name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountId">{t("account")}</Label>
              <Input id="accountId" placeholder="Select or enter account" {...form.register("accountId")} />
              {form.formState.errors.accountId && (
                <p className="text-sm text-destructive">{form.formState.errors.accountId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vertical">Healthcare Vertical</Label>
              <Select value={form.watch("vertical")} onValueChange={(value) => form.setValue("vertical", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vertical" />
                </SelectTrigger>
                <SelectContent>
                  {verticals.map((vertical) => (
                    <SelectItem key={vertical.value} value={vertical.value}>
                      {vertical.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.vertical && (
                <p className="text-sm text-destructive">{form.formState.errors.vertical.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the opportunity"
                rows={3}
                {...form.register("description")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sales Information */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="value">{t("value")} (₹)</Label>
              <Input
                id="value"
                type="number"
                placeholder="Enter opportunity value"
                {...form.register("value", { valueAsNumber: true })}
              />
              {form.formState.errors.value && (
                <p className="text-sm text-destructive">{form.formState.errors.value.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">{t("stage")}</Label>
              <Select
                value={form.watch("stage")}
                onValueChange={(value) => {
                  form.setValue("stage", value as any)
                  const stage = stages.find((s) => s.value === value)
                  if (stage) {
                    form.setValue("probability", stage.probability)
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.value} value={stage.value}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.stage && (
                <p className="text-sm text-destructive">{form.formState.errors.stage.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="probability">Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                {...form.register("probability", { valueAsNumber: true })}
              />
              {form.formState.errors.probability && (
                <p className="text-sm text-destructive">{form.formState.errors.probability.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="closeDate">Expected Close Date</Label>
              <Input id="closeDate" type="date" {...form.register("closeDate")} />
              {form.formState.errors.closeDate && (
                <p className="text-sm text-destructive">{form.formState.errors.closeDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="competitorInfo">Competitor Information</Label>
              <Textarea
                id="competitorInfo"
                placeholder="Known competitors and their positioning"
                rows={3}
                {...form.register("competitorInfo")}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Opportunity"}
        </Button>
      </div>
    </form>
  )
}
