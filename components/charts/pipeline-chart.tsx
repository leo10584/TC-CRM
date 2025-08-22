"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

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

export function PipelineChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="stage" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="count" fill="#059669" name="Opportunities" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="value" fill="#10b981" name="Value (₹)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}