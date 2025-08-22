"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { AuditLogViewer } from "@/components/audit/audit-log-viewer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuditPageProps {
  params: {
    entityType: string
    entityId: string
  }
}

export default function AuditPage({ params }: AuditPageProps) {
  const router = useRouter()

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Audit Trail: {params.entityType.charAt(0).toUpperCase() + params.entityType.slice(1)}
            </h1>
            <p className="text-muted-foreground">
              Complete audit history for {params.entityType} {params.entityId}
            </p>
          </div>
        </div>

        <AuditLogViewer entityType={params.entityType} entityId={params.entityId} />
      </div>
    </MainLayout>
  )
}
