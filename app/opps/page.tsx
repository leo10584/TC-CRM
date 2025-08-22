"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatINRCompact } from "@/lib/utils/currency"
import { Building2, Search, Plus, Calendar, User, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const [verticalFilter, setVerticalFilter] = useState("all")

  // Mock opportunities data
  const opportunities = [
    {
      id: "1",
      name: "Apollo Hospitals - Clinical Trial Platform",
      account: "Apollo Hospitals",
      value: 850000,
      stage: "qualification",
      probability: 25,
      owner: "Rajesh Kumar",
      closeDate: "2024-02-15",
      vertical: "Hospital",
      lastActivity: "2024-01-10",
    },
    {
      id: "2",
      name: "Biocon - Research Data Management",
      account: "Biocon",
      value: 1200000,
      stage: "needs_analysis",
      probability: 40,
      owner: "Priya Sharma",
      closeDate: "2024-02-20",
      vertical: "Biotech",
      lastActivity: "2024-01-09",
    },
    {
      id: "3",
      name: "Cipla - Supply Chain Optimization",
      account: "Cipla",
      value: 950000,
      stage: "proposal",
      probability: 60,
      owner: "Amit Patel",
      closeDate: "2024-02-10",
      vertical: "Pharma",
      lastActivity: "2024-01-08",
    },
    {
      id: "4",
      name: "Fortis - Patient Management System",
      account: "Fortis Healthcare",
      value: 1500000,
      stage: "negotiation",
      probability: 80,
      owner: "Sneha Reddy",
      closeDate: "2024-01-30",
      vertical: "Hospital",
      lastActivity: "2024-01-07",
    },
    {
      id: "5",
      name: "Max Healthcare - Medical Device Integration",
      account: "Max Healthcare",
      value: 2200000,
      stage: "negotiation",
      probability: 80,
      owner: "Vikram Singh",
      closeDate: "2024-01-25",
      vertical: "Hospital",
      lastActivity: "2024-01-06",
    },
  ]

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "qualification":
        return "bg-blue-100 text-blue-800"
      case "needs_analysis":
        return "bg-yellow-100 text-yellow-800"
      case "proposal":
        return "bg-orange-100 text-orange-800"
      case "negotiation":
        return "bg-purple-100 text-purple-800"
      case "closed_won":
        return "bg-green-100 text-green-800"
      case "closed_lost":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getVerticalColor = (vertical: string) => {
    switch (vertical) {
      case "Pharma":
        return "bg-blue-100 text-blue-800"
      case "Biotech":
        return "bg-green-100 text-green-800"
      case "Hospital":
        return "bg-purple-100 text-purple-800"
      case "MedDevice":
        return "bg-orange-100 text-orange-800"
      case "CRO":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.account.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = stageFilter === "all" || opp.stage === stageFilter
    const matchesVertical = verticalFilter === "all" || opp.vertical === verticalFilter

    return matchesSearch && matchesStage && matchesVertical
  })

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Opportunities</h1>
            <p className="text-muted-foreground">Manage your sales opportunities</p>
          </div>
          <Button asChild>
            <Link href="/opps/new">
              <Plus className="mr-2 h-4 w-4" />
              New Opportunity
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="qualification">Qualification</SelectItem>
                  <SelectItem value="needs_analysis">Needs Analysis</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed_won">Closed Won</SelectItem>
                  <SelectItem value="closed_lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>

              <Select value={verticalFilter} onValueChange={setVerticalFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by vertical" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Verticals</SelectItem>
                  <SelectItem value="Pharma">Pharmaceutical</SelectItem>
                  <SelectItem value="Biotech">Biotechnology</SelectItem>
                  <SelectItem value="Hospital">Hospital</SelectItem>
                  <SelectItem value="MedDevice">Medical Device</SelectItem>
                  <SelectItem value="CRO">CRO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities List */}
        <div className="grid gap-4">
          {filteredOpportunities.map((opp) => (
            <Card key={opp.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <Link href={`/opps/${opp.id}`} className="hover:underline">
                          <h3 className="font-semibold text-lg">{opp.name}</h3>
                        </Link>
                        <p className="text-muted-foreground">{opp.account}</p>

                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {opp.owner}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(opp.closeDate).toLocaleDateString("en-IN")}
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            {opp.probability}%
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{formatINRCompact(opp.value)}</div>
                        <div className="flex gap-2 mt-2">
                          <Badge className={getStageColor(opp.stage)}>{opp.stage.replace("_", " ")}</Badge>
                          <Badge className={getVerticalColor(opp.vertical)}>{opp.vertical}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || stageFilter !== "all" || verticalFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first opportunity to get started"}
              </p>
              <Button asChild>
                <Link href="/opps/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Opportunity
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
