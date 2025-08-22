"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { EsignStatus } from "@/components/esign/esign-status"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { EsignEnvelope } from "@/lib/types/email"

interface EsignPageProps {
  params: {
    envelopeId: string
  }
}

export default function EsignPage({ params }: EsignPageProps) {
  // Mock envelope data
  const envelope: EsignEnvelope = {
    id: params.envelopeId,
    provider: "DocuSign",
    quoteId: "quote-1",
    status: "sent",
    subject: "Please review and sign - Apollo Hospitals Quote Q-2024-001",
    message: "Please review the attached quote and provide your digital signature to proceed with the implementation.",
    createdAt: new Date("2024-01-12T10:00:00"),
    sentAt: new Date("2024-01-12T10:05:00"),
    expiresAt: new Date("2024-02-11T10:00:00"),
    recipients: [
      {
        id: "recipient-1",
        name: "Dr. Priya Menon",
        email: "priya.menon@apollohospitals.com",
        role: "signer",
        status: "delivered",
        order: 1,
      },
      {
        id: "recipient-2",
        name: "Suresh Reddy",
        email: "suresh.reddy@apollohospitals.com",
        role: "approver",
        status: "sent",
        order: 2,
      },
    ],
    documentUrl: "/api/documents/quote-1.pdf",
    providerEnvelopeId: "ds-envelope-123456",
  }

  const handleDownloadCertificate = () => {
    console.log("Downloading certificate...")
    // TODO: Implement certificate download
  }

  const handleDownloadDocument = () => {
    console.log("Downloading document...")
    // TODO: Implement document download
  }

  const handleResend = () => {
    console.log("Resending envelope...")
    // TODO: Implement resend functionality
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/quotes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">E-Signature Status</h1>
            <p className="text-muted-foreground">Track the signing progress of your document</p>
          </div>
        </div>

        {/* E-Sign Status */}
        <EsignStatus
          envelope={envelope}
          onDownloadCertificate={handleDownloadCertificate}
          onDownloadDocument={handleDownloadDocument}
          onResend={handleResend}
        />
      </div>
    </MainLayout>
  )
}
