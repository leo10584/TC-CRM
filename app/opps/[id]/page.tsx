"use client"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OpportunityTimeline } from "@/components/opportunity/opportunity-timeline"
import { formatINRCompact } from "@/lib/utils/currency"
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  Building2,
  FileText,
  PenTool,
} from "lucide-react"
import Link from "next/link"

interface OpportunityPageProps {
  params: {
    id: string
  }
}

export default function OpportunityPage({ params }: OpportunityPageProps) {
  // Mock opportunity data
  const opportunity = {
    id: params.id,
    name: "Apollo Hospitals - Clinical Trial Platform",
    account: {
      id: "acc-1",
      name: "Apollo Hospitals",
      industry: "Healthcare",
      vertical: "Hospital",
    },
    value: 850000,
    stage: "qualification",
    probability: 25,
    owner: {
      id: "user-1",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@tatvacare.com",
    },
    closeDate: "2024-02-15",
    createdDate: "2024-01-05",
    description:
      "Implementation of a comprehensive clinical trial management platform for Apollo Hospitals to streamline their research operations and improve patient enrollment processes.",
    competitorInfo:
      "Competing against Medidata and Oracle Health Sciences. Apollo is looking for a more cost-effective solution with better local support.",
    contacts: [
      {
        id: "contact-1",
        name: "Dr. Priya Menon",
        title: "Head of Clinical Research",
        email: "priya.menon@apollohospitals.com",
        phone: "+91 98765 43210",
        isPrimary: true,
      },
      {
        id: "contact-2",
        name: "Suresh Reddy",
        title: "IT Director",
        email: "suresh.reddy@apollohospitals.com",
        phone: "+91 98765 43211",
        isPrimary: false,
      },
    ],
  }

  // Mock timeline events
  const timelineEvents = [
    {
      id: "1",
      type: "note" as const,
      title: "Initial discovery call completed",
      description:
        "Discussed current pain points and requirements. Apollo is looking to replace their legacy system within 6 months.",
      actor: { name: "Rajesh Kumar", initials: "RK" },
      timestamp: new Date("2024-01-10T10:00:00"),
    },
    {
      id: "2",
      type: "email" as const,
      title: "Follow-up email sent",
      description: "Sent detailed product overview and case studies from similar hospital implementations.",
      actor: { name: "Rajesh Kumar", initials: "RK" },
      timestamp: new Date("2024-01-08T14:30:00"),
    },
    {
      id: "3",
      type: "meeting" as const,
      title: "Stakeholder meeting scheduled",
      description: "Meeting with Dr. Priya Menon and IT team scheduled for next week.",
      actor: { name: "Rajesh Kumar", initials: "RK" },
      timestamp: new Date("2024-01-07T09:15:00"),
      metadata: {
        "Meeting Date": "2024-01-15",
        Attendees: "Dr. Priya Menon, Suresh Reddy, Rajesh Kumar",
      },
    },
    {
      id: "4",
      type: "stage_change" as const,
      title: "Opportunity moved to Qualification",
      description: "Initial qualification criteria met. Budget confirmed at ₹8.5L.",
      actor: { name: "System", initials: "SY" },
      timestamp: new Date("2024-01-05T16:45:00"),
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

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/opps">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{opportunity.name}</h1>
              <p className="text-muted-foreground">{opportunity.account.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button>
              <PenTool className="mr-2 h-4 w-4" />
              Create Quote
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Value</span>
              </div>
              <div className="text-2xl font-bold text-primary">{formatINRCompact(opportunity.value)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Probability</span>
              </div>
              <div className="text-2xl font-bold">{opportunity.probability}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Close Date</span>
              </div>
              <div className="text-2xl font-bold">
                {new Date(opportunity.closeDate).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Stage</span>
              </div>
              <Badge className={getStageColor(opportunity.stage)}>{opportunity.stage.replace("_", " ")}</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Competitor Information</h4>
                    <p className="text-sm text-muted-foreground">{opportunity.competitorInfo}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Owner:</span>
                      <p className="font-medium">{opportunity.owner.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <p className="font-medium">{new Date(opportunity.createdDate).toLocaleDateString("en-IN")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Account:</span>
                      <p className="font-medium">{opportunity.account.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Industry:</span>
                      <p className="font-medium">{opportunity.account.industry}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Vertical:</span>
                      <Badge className="bg-purple-100 text-purple-800">{opportunity.account.vertical}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <OpportunityTimeline events={timelineEvents} />
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {opportunity.contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{contact.name}</h4>
                          {contact.isPrimary && <Badge variant="secondary">Primary</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{contact.title}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {contact.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {contact.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes">
            <Card>
              <CardHeader>
                <CardTitle>Quotes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No quotes yet</h3>
                  <p className="mb-4">Create your first quote for this opportunity</p>
                  <Button>
                    <PenTool className="mr-2 h-4 w-4" />
                    Create Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
