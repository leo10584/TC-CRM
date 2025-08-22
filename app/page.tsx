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

  // Mock recent activities
  const recentActivities = [
    {
      id: "1",
      type: "rfp",
      title: "New RFP from Apollo Hospitals",
      description: "Clinical trial management system requirement",
      time: "2 hours ago",
      status: "new",
    },
    {
      id: "2",
      type: "quote",
      title: "Quote sent to Fortis Healthcare",
      description: "Pharma supply chain solution - ₹8.5L",
      time: "4 hours ago",
      status: "sent",
    },
    {
      id: "3",
      type: "opportunity",
      title: "Opportunity moved to Negotiation",
      description: "Max Healthcare - Medical device integration",
      time: "6 hours ago",
      status: "negotiation",
    },
    {
      id: "4",
      type: "esign",
      title: "Contract signed by Cipla",
      description: "Biotech research platform - ₹12.3L",
      time: "1 day ago",
      status: "signed",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "rfp":
        return FileText
      case "quote":
        return PenTool
      case "opportunity":
        return Building2
      case "esign":
        return Users
      default:
        return FileText
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "sent":
        return "bg-yellow-100 text-yellow-800"
      case "negotiation":
        return "bg-orange-100 text-orange-800"
      case "signed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your pipeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type)
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to get you started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <FileText className="h-4 w-4" />
                Create New RFP
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <Building2 className="h-4 w-4" />
                Add Opportunity
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <PenTool className="h-4 w-4" />
                Generate Quote
              </Button>
              <Button className="w-full justify-start gap-2 bg-transparent" variant="outline">
                <BarChart3 className="h-4 w-4" />
                View Pipeline
              </Button>
            </CardContent>
          </Card>
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

        {/* Pipeline Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
            <CardDescription>Opportunities by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              {[
                { stage: "Qualification", count: 12, value: formatINRCompact(2800000) },
                { stage: "Needs Analysis", count: 8, value: formatINRCompact(3200000) },
                { stage: "Proposal", count: 6, value: formatINRCompact(2100000) },
                { stage: "Negotiation", count: 4, value: formatINRCompact(1900000) },
                { stage: "Closed Won", count: 3, value: formatINRCompact(2500000) },
              ].map((stage) => (
                <div key={stage.stage} className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">{stage.count}</div>
                  <div className="text-sm font-medium">{stage.stage}</div>
                  <div className="text-xs text-muted-foreground">{stage.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
