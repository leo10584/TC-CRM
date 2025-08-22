"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { month: "Jan", revenue: 1200000, target: 1500000 },
  { month: "Feb", revenue: 1800000, target: 1600000 },
  { month: "Mar", revenue: 1400000, target: 1700000 },
  { month: "Apr", revenue: 2200000, target: 1800000 },
  { month: "May", revenue: 1900000, target: 1900000 },
  { month: "Jun", revenue: 2500000, target: 2000000 },
]

export function RevenueTrendChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#059669"
            strokeWidth={3}
            dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}