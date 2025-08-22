"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SearchPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Global Search</h1>
          <p className="text-muted-foreground">Search across opportunities, quotes, accounts, and contacts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p>Search functionality will be implemented in a later task</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
