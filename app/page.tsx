"use client"

import { useTranslations } from "next-intl"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatINRCompact } from "@/lib/utils/currency"
import { BarChart3, Building2, DollarSign, FileText, PenTool, TrendingUp, Users } from "lucide-react"
import { PipelineChart } from "@/components/charts/pipeline-chart"
import { RevenueTrendChart } from "@/components/charts/revenue-trend-chart"

export default function DashboardPage() {
  const t = useTranslations("dashboard")

  // Mock data for KPIs
  const kpis = [
    {
      title: t("kpis.totalOpportunities"),
      value: "47",
      change: "+12%",
      trend: "up",
      icon: Building2,
    },
    {
      title: t("kpis.pipelineValue"),
      value: formatINRCompact(12500000),
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: t("kpis.conversionRate"),
      value: "23.5%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: t("kpis.avgDealSize"),
      value: formatINRCompact(265000),
      change: "-1.2%",
      trend: "down",
      icon: BarChart3,
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-muted-foreground">{t("welcome")}</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {kpi.change} from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue vs targets</CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueTrendChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline by Stage</CardTitle>
              <CardDescription>Opportunities and values by stage</CardDescription>
            </CardHeader>
            <CardContent>
              <PipelineChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}