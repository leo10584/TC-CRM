"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatINRCompact } from "@/lib/utils/currency"
import { Building2, Calendar, User } from "lucide-react"

export default function PipelinePage() {
  // Mock pipeline data
  const stages = [
    {
      name: "Qualification",
      opportunities: [
        {
          id: "1",
          name: "Apollo Hospitals - Clinical Trial Platform",
          account: "Apollo Hospitals",
          value: 850000,
          owner: "Rajesh Kumar",
          closeDate: "2024-02-15",
          vertical: "Hospital",
        },
        {
          id: "2",
          name: "Biocon - Research Data Management",
          account: "Biocon",
          value: 1200000,
          owner: "Priya Sharma",
          closeDate: "2024-02-20",
          vertical: "Biotech",
        },
      ],
    },
    {
      name: "Needs Analysis",
      opportunities: [
        {
          id: "3",
          name: "Cipla - Supply Chain Optimization",
          account: "Cipla",
          value: 950000,
          owner: "Amit Patel",
          closeDate: "2024-02-10",
          vertical: "Pharma",
        },
      ],
    },
    {
      name: "Proposal",
      opportunities: [
        {
          id: "4",
          name: "Fortis - Patient Management System",
          account: "Fortis Healthcare",
          value: 1500000,
          owner: "Sneha Reddy",
          closeDate: "2024-01-30",
          vertical: "Hospital",
        },
      ],
    },
    {
      name: "Negotiation",
      opportunities: [
        {
          id: "5",
          name: "Max Healthcare - Medical Device Integration",
          account: "Max Healthcare",
          value: 2200000,
          owner: "Vikram Singh",
          closeDate: "2024-01-25",
          vertical: "Hospital",
        },
      ],
    },
    {
      name: "Closed Won",
      opportunities: [
        {
          id: "6",
          name: "Dr. Reddy's - Regulatory Compliance",
          account: "Dr. Reddy's Laboratories",
          value: 1800000,
          owner: "Meera Joshi",
          closeDate: "2024-01-15",
          vertical: "Pharma",
        },
      ],
    },
  ]

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

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales Pipeline</h1>
            <p className="text-muted-foreground">Track opportunities through your sales process</p>
          </div>
          <Button>
            <Building2 className="mr-2 h-4 w-4" />
            New Opportunity
          </Button>
        </div>

        {/* Pipeline Board */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <div key={stage.name} className="flex-shrink-0 w-80">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    {stage.name}
                    <Badge variant="secondary">{stage.opportunities.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stage.opportunities.map((opp) => (
                    <Card key={opp.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium text-sm leading-tight">{opp.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{opp.account}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{formatINRCompact(opp.value)}</span>
                          <Badge className={getVerticalColor(opp.vertical)}>{opp.vertical}</Badge>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {opp.owner}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(opp.closeDate).toLocaleDateString("en-IN")}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {stage.opportunities.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No opportunities</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Pipeline Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {stages.reduce((acc, stage) => acc + stage.opportunities.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Opportunities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {formatINRCompact(
                    stages.reduce(
                      (acc, stage) => acc + stage.opportunities.reduce((stageAcc, opp) => stageAcc + opp.value, 0),
                      0,
                    ),
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Total Pipeline Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {formatINRCompact(
                    stages
                      .find((s) => s.name === "Closed Won")
                      ?.opportunities.reduce((acc, opp) => acc + opp.value, 0) || 0,
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Won This Month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24.5%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
