"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatINRCompact } from "@/lib/utils/currency"
import { Building2, Calendar, User } from "lucide-react"

export default function PipelinePage() {
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
      ],
    },
    {
      name: "Needs Analysis",
      opportunities: [
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
      name: "Proposal",
      opportunities: [],
    },
    {
      name: "Negotiation",
      opportunities: [],
    },
    {
      name: "Closed Won",
      opportunities: [],
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
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
                          <Badge className="bg-purple-100 text-purple-800">{opp.vertical}</Badge>
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
      </div>
    </MainLayout>
  )
}