"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", revenue: 1200000, target: 1500000 },
  { month: "Feb", revenue: 1800000, target: 1600000 },
  { month: "Mar", revenue: 1400000, target: 1700000 },
  { month: "Apr", revenue: 2200000, target: 1800000 },
  { month: "May", revenue: 1900000, target: 1900000 },
  { month: "Jun", revenue: 2500000, target: 2000000 },
  { month: "Jul", revenue: 2100000, target: 2100000 },
  { month: "Aug", revenue: 2800000, target: 2200000 },
  { month: "Sep", revenue: 2400000, target: 2300000 },
  { month: "Oct", revenue: 3100000, target: 2400000 },
  { month: "Nov", revenue: 2700000, target: 2500000 },
  { month: "Dec", revenue: 3200000, target: 2600000 },
]

const chartConfig = {
  revenue: {
    label: "Actual Revenue",
    color: "hsl(var(--chart-1))",
  },
  target: {
    label: "Target Revenue",
    color: "hsl(var(--chart-2))",
  },
}

export function RevenueTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-revenue)"
            strokeWidth={3}
            dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="var(--color-target)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "var(--color-target)", strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
