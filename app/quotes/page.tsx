"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatINRCompact } from "@/lib/utils/currency"
import { PenTool, Search, Plus, Calendar, User, Eye, Send, FileText } from "lucide-react"
import Link from "next/link"

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock quotes data
  const quotes = [
    {
      id: "quote-1",
      number: "Q-2024-001",
      opportunityName: "Apollo Hospitals - Clinical Trial Platform",
      account: "Apollo Hospitals",
      value: 1003000,
      status: "sent",
      owner: "Rajesh Kumar",
      createdDate: "2024-01-10",
      validUntil: "2024-02-10",
      sentDate: "2024-01-12",
      viewedDate: "2024-01-13",
    },
    {
      id: "quote-2",
      number: "Q-2024-002",
      opportunityName: "Biocon - Research Data Management",
      account: "Biocon",
      value: 1416000,
      status: "awaiting_approval",
      owner: "Priya Sharma",
      createdDate: "2024-01-09",
      validUntil: "2024-02-08",
      requiresApproval: true,
    },
    {
      id: "quote-3",
      number: "Q-2024-003",
      opportunityName: "Cipla - Supply Chain Optimization",
      account: "Cipla",
      value: 1121000,
      status: "draft",
      owner: "Amit Patel",
      createdDate: "2024-01-08",
      validUntil: "2024-02-07",
    },
    {
      id: "quote-4",
      number: "Q-2024-004",
      opportunityName: "Fortis - Patient Management System",
      account: "Fortis Healthcare",
      value: 1770000,
      status: "signed",
      owner: "Sneha Reddy",
      createdDate: "2024-01-05",
      validUntil: "2024-02-04",
      sentDate: "2024-01-07",
      signedDate: "2024-01-14",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "awaiting_approval":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "sent":
        return "bg-purple-100 text-purple-800"
      case "signed":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return Send
      case "signed":
        return FileText
      default:
        return PenTool
    }
  }

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.opportunityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.account.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quotes</h1>
            <p className="text-muted-foreground">Manage your sales quotes and proposals</p>
          </div>
          <Button asChild>
            <Link href="/quotes/new">
              <Plus className="mr-2 h-4 w-4" />
              New Quote
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
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="awaiting_approval">Awaiting Approval</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="signed">Signed</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <div className="grid gap-4">
          {filteredQuotes.map((quote) => {
            const StatusIcon = getStatusIcon(quote.status)

            return (
              <Card key={quote.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <Link href={`/quotes/${quote.id}`} className="hover:underline">
                            <h3 className="font-semibold text-lg">{quote.number}</h3>
                          </Link>
                          <p className="text-muted-foreground">{quote.opportunityName}</p>
                          <p className="text-sm text-muted-foreground">{quote.account}</p>

                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {quote.owner}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Valid until {new Date(quote.validUntil).toLocaleDateString("en-IN")}
                            </div>
                            {quote.viewedDate && (
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                Viewed {new Date(quote.viewedDate).toLocaleDateString("en-IN")}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{formatINRCompact(quote.value)}</div>
                          <div className="flex gap-2 mt-2 justify-end">
                            <Badge className={getStatusColor(quote.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {quote.status.replace("_", " ")}
                            </Badge>
                          </div>

                          {quote.status === "awaiting_approval" && (
                            <div className="mt-2">
                              <Button size="sm" variant="outline">
                                Review
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredQuotes.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <PenTool className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No quotes found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Create your first quote to get started"}
              </p>
              <Button asChild>
                <Link href="/quotes/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Quote
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
}
