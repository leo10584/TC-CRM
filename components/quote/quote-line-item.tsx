"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { formatINR } from "@/lib/utils/currency"
import { Trash2, GripVertical } from "lucide-react"
import type { QuoteLineInput } from "@/lib/validations/quote"

interface QuoteLineItemProps {
  line: QuoteLineInput & { id: string }
  onUpdate: (id: string, updates: Partial<QuoteLineInput>) => void
  onRemove: (id: string) => void
  canRemove?: boolean
}

export function QuoteLineItem({ line, onUpdate, onRemove, canRemove = true }: QuoteLineItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const lineTotal = line.quantity * line.unitPrice

  const handleUpdate = (field: keyof QuoteLineInput, value: any) => {
    onUpdate(line.id, { [field]: value })
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-start gap-4">
        <div className="mt-2">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
        </div>

        <div className="flex-1 space-y-4">
          {/* Product Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Product/Service</Label>
              <Input
                value={line.description}
                onChange={(e) => handleUpdate("description", e.target.value)}
                placeholder="Enter product or service description"
              />
            </div>
            <div className="space-y-2">
              <Label>Unit of Measure</Label>
              <Input
                value={line.uom}
                onChange={(e) => handleUpdate("uom", e.target.value)}
                placeholder="e.g., units, hours, licenses"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input
                type="number"
                min="1"
                value={line.quantity}
                onChange={(e) => handleUpdate("quantity", Number.parseFloat(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label>Unit Price (₹)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={line.unitPrice}
                onChange={(e) => handleUpdate("unitPrice", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label>GST Rate (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={line.gstRate}
                onChange={(e) => handleUpdate("gstRate", Number.parseFloat(e.target.value) || 18)}
              />
            </div>
            <div className="space-y-2">
              <Label>Line Total</Label>
              <div className="h-10 px-3 py-2 border rounded-md bg-muted text-sm font-medium">
                {formatINR(lineTotal)}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id={`optional-${line.id}`}
                checked={line.optional}
                onCheckedChange={(checked) => handleUpdate("optional", checked)}
              />
              <Label htmlFor={`optional-${line.id}`} className="text-sm">
                Optional item
              </Label>
            </div>

            {canRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(line.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
