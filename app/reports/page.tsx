"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportFilters } from "@/components/reports/report-filters"
import { PipelineChart } from "@/components/charts/pipeline-chart"
import { RevenueTrendChart } from "@/components/charts/revenue-trend-chart"
import { Badge } from "@/components/ui/badge"
import { formatINR } from "@/lib/utils/currency"
import { BarChart3, Target, DollarSign, Calendar } from "lucide-react"

export default function ReportsPage() {
  const [filters, setFilters] = useState<any>({})

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    // TODO: Apply filters to data
    console.log("Filters applied:", newFilters)
  }

  const handleExport = (format: string) => {
    // TODO: Implement export functionality
    console.log("Exporting report as:", format)
  }

  // Mock performance metrics
  const performanceMetrics = [
    {
      title: "Total Revenue",
      value: formatINR(28500000),
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      period: "This Year",
    },
    {
      title: "Conversion Rate",
      value: "23.5%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      period: "Last 30 Days",
    },
    {
      title: "Active Opportunities",
      value: "47",
      change: "+8",
      trend: "up",
      icon: BarChart3,
      period: "Current",
    },
    {
      title: "Avg. Sales Cycle",
      value: "45 days",
      change: "-3 days",
      trend: "up",
      icon: Calendar,
      period: "Last Quarter",
    },
  ]

  // Mock top performers data
  const topPerformers = [
    { name: "Rajesh Kumar", revenue: formatINR(8500000), deals: 12, conversion: "28%" },
    { name: "Priya Sharma", revenue: formatINR(7200000), deals: 10, conversion: "25%" },
    { name: "Amit Patel", revenue: formatINR(6800000), deals: 9, conversion: "22%" },
    { name: "Sneha Reddy", revenue: formatINR(5900000), deals: 8, conversion: "20%" },
  ]

  // Mock recent deals data
  const recentDeals = [
    {
      id: "1",
      account: "Apollo Hospitals",
      value: formatINR(1250000),
      stage: "Closed Won",
      owner: "Rajesh Kumar",
      closeDate: "2024-01-15",
    },
    {
      id: "2",
      account: "Fortis Healthcare",
      value: formatINR(850000),
      stage: "Negotiation",
      owner: "Priya Sharma",
      closeDate: "2024-01-20",
    },
    {
      id: "3",
      account: "Max Healthcare",
      value: formatINR(950000),
      stage: "Proposal",
      owner: "Amit Patel",
      closeDate: "2024-01-25",
    },
  ]

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Closed Won":
        return "bg-green-100 text-green-800"
      case "Negotiation":
        return "bg-orange-100 text-orange-800"
      case "Proposal":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive sales performance, pipeline analysis, and business intelligence
          </p>
        </div>

        <ReportFilters onFiltersChange={handleFiltersChange} onExport={handleExport} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center justify-between">
                    <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change} from last period
                    </p>
                    <p className="text-xs text-muted-foreground">{metric.period}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="deals">Recent Deals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <RevenueTrendChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pipeline by Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <PipelineChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <PipelineChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pipeline Health Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-teal-600">₹12.5Cr</div>
                    <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">47</div>
                    <div className="text-sm text-muted-foreground">Active Opportunities</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">45 days</div>
                    <div className="text-sm text-muted-foreground">Avg. Sales Cycle</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={performer.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{performer.name}</div>
                          <div className="text-sm text-muted-foreground">{performer.deals} deals closed</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{performer.revenue}</div>
                        <div className="text-sm text-muted-foreground">{performer.conversion} conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <RevenueTrendChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDeals.map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{deal.account}</div>
                        <div className="text-sm text-muted-foreground">Owner: {deal.owner}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-semibold">{deal.value}</div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStageColor(deal.stage)}>{deal.stage}</Badge>
                          <span className="text-xs text-muted-foreground">{deal.closeDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
