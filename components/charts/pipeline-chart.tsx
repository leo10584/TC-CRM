"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    stage: "Qualification",
    count: 12,
    value: 2800000,
  },
  {
    stage: "Needs Analysis",
    count: 8,
    value: 3200000,
  },
  {
    stage: "Proposal",
    count: 6,
    value: 2100000,
  },
  {
    stage: "Negotiation",
    count: 4,
    value: 1900000,
  },
  {
    stage: "Closed Won",
    count: 3,
    value: 2500000,
  },
]

const chartConfig = {
  count: {
    label: "Opportunities",
    color: "hsl(var(--chart-1))",
  },
  value: {
    label: "Value (₹)",
    color: "hsl(var(--chart-2))",
  },
}

export function PipelineChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stage" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar yAxisId="left" dataKey="count" fill="var(--color-count)" name="Opportunities" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="value" fill="var(--color-value)" name="Value (₹)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
