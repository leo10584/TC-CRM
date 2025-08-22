"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatINRCompact } from "@/lib/utils/currency"
import { Building2, Search, Plus, Calendar, User, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")

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
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
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

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
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
                      <Badge className="bg-blue-100 text-blue-800">{opp.stage.replace("_", " ")}</Badge>
                      <Badge className="bg-purple-100 text-purple-800">{opp.vertical}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}