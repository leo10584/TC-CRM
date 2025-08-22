"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, Eye, Search } from "lucide-react"
import type { AuditEntry, AuditFilter } from "@/lib/types/audit"

interface AuditLogViewerProps {
  entityType?: string
  entityId?: string
}

export function AuditLogViewer({ entityType, entityId }: AuditLogViewerProps) {
  const [filters, setFilters] = useState<AuditFilter>({
    entityType,
    entityId,
  })
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null)
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  // Mock audit data
  const auditEntries: AuditEntry[] = [
    {
      id: "1",
      entityType: "opportunity",
      entityId: "opp-001",
      action: "updated",
      userId: "user-1",
      userName: "Rajesh Kumar",
      timestamp: "2024-01-15T10:30:00Z",
      changes: {
        stage: { from: "Qualification", to: "Needs Analysis" },
        value: { from: 500000, to: 750000 },
      },
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: "2",
      entityType: "quote",
      entityId: "quote-001",
      action: "created",
      userId: "user-2",
      userName: "Priya Sharma",
      timestamp: "2024-01-15T09:15:00Z",
      changes: {
        status: { from: null, to: "draft" },
        total: { from: null, to: 850000 },
      },
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
    {
      id: "3",
      entityType: "quote",
      entityId: "quote-001",
      action: "sent",
      userId: "user-2",
      userName: "Priya Sharma",
      timestamp: "2024-01-15T11:45:00Z",
      changes: {
        status: { from: "draft", to: "sent" },
        sentDate: { from: null, to: "2024-01-15T11:45:00Z" },
      },
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  ]

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-green-100 text-green-800"
      case "updated":
        return "bg-blue-100 text-blue-800"
      case "deleted":
        return "bg-red-100 text-red-800"
      case "sent":
        return "bg-purple-100 text-purple-800"
      case "signed":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting audit logs with filters:", filters)
  }

  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), "MMM dd, yyyy HH:mm:ss")
  }

  const renderChangeValue = (value: any) => {
    if (value === null) return <span className="text-gray-400">null</span>
    if (typeof value === "boolean") return value ? "true" : "false"
    if (typeof value === "number") return value.toLocaleString()
    return String(value)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Audit Trail
            {entityType && entityId && (
              <Badge variant="outline">
                {entityType}:{entityId}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by user, action, or entity..."
                className="pl-10"
                onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Entity Type</label>
            <Select
              value={filters.entityType || "all"}
              onValueChange={(value) => setFilters({ ...filters, entityType: value || undefined })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="opportunity">Opportunity</SelectItem>
                <SelectItem value="quote">Quote</SelectItem>
                <SelectItem value="rfp">RFP</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
                <SelectItem value="account">Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Action</label>
            <Select
              value={filters.action || "all"}
              onValueChange={(value) => setFilters({ ...filters, action: value || undefined })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All actions</SelectItem>
                <SelectItem value="created">Created</SelectItem>
                <SelectItem value="updated">Updated</SelectItem>
                <SelectItem value="deleted">Deleted</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Date From</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40 bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "MMM dd, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Audit Entries */}
        <div className="space-y-3">
          {auditEntries.map((entry) => (
            <div key={entry.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getActionColor(entry.action)}>{entry.action}</Badge>
                    <span className="text-sm font-medium">
                      {entry.entityType}:{entry.entityId}
                    </span>
                    <span className="text-sm text-gray-500">by {entry.userName}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{formatTimestamp(entry.timestamp)}</div>
                  <div className="text-sm">
                    {Object.entries(entry.changes).map(([field, change]) => (
                      <div key={field} className="mb-1">
                        <span className="font-medium">{field}:</span>{" "}
                        <span className="text-red-600">{renderChangeValue(change.from)}</span>
                        {" → "}
                        <span className="text-green-600">{renderChangeValue(change.to)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedEntry(entry)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Audit Entry Details</DialogTitle>
                    </DialogHeader>
                    {selectedEntry && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Entity:</strong> {selectedEntry.entityType}:{selectedEntry.entityId}
                          </div>
                          <div>
                            <strong>Action:</strong> {selectedEntry.action}
                          </div>
                          <div>
                            <strong>User:</strong> {selectedEntry.userName}
                          </div>
                          <div>
                            <strong>Timestamp:</strong> {formatTimestamp(selectedEntry.timestamp)}
                          </div>
                          <div>
                            <strong>IP Address:</strong> {selectedEntry.ipAddress}
                          </div>
                          <div className="col-span-2">
                            <strong>User Agent:</strong>
                            <div className="text-xs text-gray-600 mt-1 break-all">{selectedEntry.userAgent}</div>
                          </div>
                        </div>
                        <div>
                          <strong>Changes:</strong>
                          <div className="mt-2 space-y-2">
                            {Object.entries(selectedEntry.changes).map(([field, change]) => (
                              <div key={field} className="bg-gray-50 p-3 rounded">
                                <div className="font-medium text-sm">{field}</div>
                                <div className="text-sm mt-1">
                                  <div className="text-red-600">From: {renderChangeValue(change.from)}</div>
                                  <div className="text-green-600">To: {renderChangeValue(change.to)}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
