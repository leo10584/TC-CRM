"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ProductSelector } from "@/components/quote/product-selector"
import { QuoteLineItem } from "@/components/quote/quote-line-item"
import { QuoteTotals } from "@/components/quote/quote-totals"
import { quoteCreateSchema, type QuoteCreateInput, type QuoteLineInput } from "@/lib/validations/quote"
import type { Product, QuoteTemplate } from "@/lib/types/quote"
import { FileText } from "lucide-react"

interface QuoteFormProps {
  onSubmit: (data: QuoteCreateInput) => void
  isLoading?: boolean
  initialData?: Partial<QuoteCreateInput>
  opportunityId?: string
}

export function QuoteForm({ onSubmit, isLoading, initialData, opportunityId }: QuoteFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<QuoteTemplate | null>(null)

  const form = useForm<QuoteCreateInput>({
    resolver: zodResolver(quoteCreateSchema),
    defaultValues: {
      currency: "INR",
      discountsPct: 0,
      isInterState: false,
      requiresApproval: false,
      oppId: opportunityId || "",
      lines: [],
      ...initialData,
    },
  })

  const {
    fields: lineFields,
    append: appendLine,
    remove: removeLine,
    update: updateLine,
  } = useFieldArray({
    control: form.control,
    name: "lines",
  })

  // Mock templates data
  const templates: QuoteTemplate[] = [
    {
      id: "template-1",
      name: "Clinical Trial Management",
      description: "Standard template for clinical trial solutions",
      category: "Healthcare",
      defaultTerms: "Payment terms: 30% advance, 70% on delivery. Validity: 30 days.",
      defaultValidityDays: 30,
      products: ["prod-1", "prod-4", "prod-5"],
    },
    {
      id: "template-2",
      name: "Pharma Compliance Suite",
      description: "Template for pharmaceutical compliance solutions",
      category: "Pharma",
      defaultTerms: "Payment terms: 50% advance, 50% on go-live. Validity: 45 days.",
      defaultValidityDays: 45,
      products: ["prod-3", "prod-4", "prod-5"],
    },
    {
      id: "template-3",
      name: "Custom Implementation",
      description: "Flexible template for custom solutions",
      category: "Custom",
      defaultTerms: "Payment terms: As per agreement. Validity: 60 days.",
      defaultValidityDays: 60,
      products: [],
    },
  ]

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(template)
      form.setValue("templateId", templateId)
      form.setValue("terms", template.defaultTerms)

      // Set validity date
      const validUntil = new Date()
      validUntil.setDate(validUntil.getDate() + template.defaultValidityDays)
      form.setValue("validUntil", validUntil.toISOString().split("T")[0])
    }
  }

  const handleProductSelect = (product: Product) => {
    const newLine: QuoteLineInput = {
      productId: product.id,
      description: product.name,
      quantity: 1,
      uom: product.uom,
      unitPrice: product.basePrice,
      optional: false,
      gstRate: product.gstRate,
    }
    appendLine(newLine)
  }

  const handleLineUpdate = (index: number, updates: Partial<QuoteLineInput>) => {
    const currentLine = lineFields[index]
    updateLine(index, { ...currentLine, ...updates })
  }

  const handleSubmit = (data: QuoteCreateInput) => {
    onSubmit(data)
  }

  const watchedLines = form.watch("lines")
  const watchedDiscount = form.watch("discountsPct")
  const watchedIsInterState = form.watch("isInterState")

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Quote Details */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quote Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="templateId">Quote Template</Label>
                  <Select value={form.watch("templateId")} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-xs text-muted-foreground">{template.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.templateId && (
                    <p className="text-sm text-destructive">{form.formState.errors.templateId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input id="validUntil" type="date" {...form.register("validUntil")} />
                  {form.formState.errors.validUntil && (
                    <p className="text-sm text-destructive">{form.formState.errors.validUntil.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="discountsPct">Discount (%)</Label>
                  <Input
                    id="discountsPct"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    {...form.register("discountsPct", { valueAsNumber: true })}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="isInterState"
                    checked={form.watch("isInterState")}
                    onCheckedChange={(checked) => form.setValue("isInterState", checked)}
                  />
                  <Label htmlFor="isInterState">Inter-state transaction (IGST)</Label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="requiresApproval"
                  checked={form.watch("requiresApproval")}
                  onCheckedChange={(checked) => form.setValue("requiresApproval", checked)}
                />
                <Label htmlFor="requiresApproval">Requires pricing approval</Label>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Line Items</CardTitle>
                <ProductSelector onSelectProduct={handleProductSelect} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {lineFields.map((field, index) => (
                <QuoteLineItem
                  key={field.id}
                  line={{ ...field, id: field.id }}
                  onUpdate={(id, updates) => handleLineUpdate(index, updates)}
                  onRemove={() => removeLine(index)}
                  canRemove={lineFields.length > 1}
                />
              ))}

              {lineFields.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No line items</h3>
                  <p className="mb-4">Add products or services to your quote</p>
                  <ProductSelector onSelectProduct={handleProductSelect} />
                </div>
              )}

              {form.formState.errors.lines && (
                <p className="text-sm text-destructive">{form.formState.errors.lines.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Terms and Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Terms & Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terms">Terms & Conditions</Label>
                <Textarea id="terms" rows={4} placeholder="Enter terms and conditions" {...form.register("terms")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Internal notes (not visible to customer)"
                  {...form.register("notes")}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quote Summary */}
        <div className="space-y-6">
          <QuoteTotals
            lines={watchedLines.map((line, index) => ({ ...line, id: `line-${index}` }))}
            discountsPct={watchedDiscount}
            isInterState={watchedIsInterState}
          />

          {/* Actions */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button type="button" variant="outline" className="w-full bg-transparent">
                Save as Draft
              </Button>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Creating..." : "Create Quote"}
              </Button>
              {form.watch("requiresApproval") && (
                <p className="text-xs text-muted-foreground text-center">
                  This quote will require approval before sending
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
