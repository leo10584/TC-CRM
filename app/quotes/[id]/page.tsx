"use client"
import { Send, FileText, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
import type { EmailComposeInput, EsignCreateInput } from "@/lib/validations/email"
import { useToast } from "@/hooks/use-toast"

interface QuotePageProps {
  params: {
    id: string
  }
}

export default function QuotePage({ params }: QuotePageProps) {
  const { toast } = useToast()
  const [showEmailCompose, setShowEmailCompose] = useState(false)
  const [showEsignForm, setShowEsignForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock quote data
  const quote = {
    id: params.id,
    number: "Q-2024-001",
    opportunityName: "Apollo Hospitals - Clinical Trial Platform",
    account: {
      name: "Apollo Hospitals",
      address: "21, Greams Lane, Off Greams Road, Chennai - 600006",
      gstNumber: "33AAAAA0000A1Z5",
    },
    status: "sent",
    createdDate: "2024-01-10",
    validUntil: "2024-02-10",
    sentDate: "2024-01-12",
    viewedDate: "2024-01-13",
    owner: "Rajesh Kumar",
    contacts: [
      {
        name: "Dr. Priya Menon",
        email: "priya.menon@apollohospitals.com",
      },
      {
        name: "Suresh Reddy",
        email: "suresh.reddy@apollohospitals.com",
      },
    ],
    lines: [
      {
        id: "1",
        description: "Clinical Trial Management Platform",
        quantity: 1,
        uom: "license",
        unitPrice: 500000,
        gstRate: 18,
        optional: false,
      },
      {
        id: "2",
        description: "Implementation Services",
        quantity: 40,
        uom: "hours",
        unitPrice: 5000,
        gstRate: 18,
        optional: false,
      },
      {
        id: "3",
        description: "Training & Support",
        quantity: 20,
        uom: "hours",
        unitPrice: 3000,
        gstRate: 18,
        optional: true,
      },
    ],
    discountsPct: 5,
    isInterState: false,
    terms: "Payment terms: 30% advance, 70% on delivery. Validity: 30 days. All prices are exclusive of taxes.",
    totals: {
      subtotal: 760000,
      discountAmount: 38000,
      taxableAmount: 722000,
      cgst: 64980,
      sgst: 64980,
      igst: 0,
      totalTax: 129960,
      grandTotal: 851960,
    },
  }

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
        return CheckCircle
      case "awaiting_approval":
        return Clock
      default:
        return FileText
    }
  }

  const handleSendEmail = async (data: EmailComposeInput) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      console.log("Sending email:", data)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Email Sent",
        description: "Your quote has been sent successfully.",
      })

      setShowEmailCompose(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateEsign = async (data: EsignCreateInput) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      console.log("Creating e-sign envelope:", data)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "E-Sign Envelope Created",
        description: "Your e-signature envelope has been created and sent.",
      })

      setShowEsignForm(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create e-sign envelope. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const StatusIcon = getStatusIcon(quote.status)

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Quote Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quote {quote.number}</h1>
          <p className="text-gray-600 mt-1">{quote.opportunityName}</p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}
          >
            <StatusIcon className="h-4 w-4" />
            {quote.status.replace("_", " ").toUpperCase()}
          </div>
        </div>
      </div>

      {/* Quote Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowEmailCompose(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Send className="h-4 w-4" />
          Send Quote
        </button>
        <button
          onClick={() => setShowEsignForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="h-4 w-4" />
          Send for E-Sign
        </button>
      </div>

      {/* Quote Details */}
      <div className="bg-white rounded-lg border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Quote Information</h3>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-gray-600">Created:</span> {quote.createdDate}
              </div>
              <div>
                <span className="text-gray-600">Valid Until:</span> {quote.validUntil}
              </div>
              <div>
                <span className="text-gray-600">Owner:</span> {quote.owner}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
            <div className="space-y-1 text-sm">
              <div className="font-medium">{quote.account.name}</div>
              <div className="text-gray-600">{quote.account.address}</div>
              <div>
                <span className="text-gray-600">GST:</span> {quote.account.gstNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Quote Line Items */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Line Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Unit Price</th>
                  <th className="text-right py-2">GST %</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {quote.lines.map((line) => (
                  <tr key={line.id} className="border-b">
                    <td className="py-2">
                      {line.description}
                      {line.optional && <span className="text-orange-600 text-xs ml-2">(Optional)</span>}
                    </td>
                    <td className="text-right py-2">
                      {line.quantity} {line.uom}
                    </td>
                    <td className="text-right py-2">₹{line.unitPrice.toLocaleString("en-IN")}</td>
                    <td className="text-right py-2">{line.gstRate}%</td>
                    <td className="text-right py-2">₹{(line.quantity * line.unitPrice).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quote Totals */}
        <div className="border-t pt-6 mt-6">
          <div className="flex justify-end">
            <div className="w-80 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{quote.totals.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount ({quote.discountsPct}%):</span>
                <span>-₹{quote.totals.discountAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxable Amount:</span>
                <span>₹{quote.totals.taxableAmount.toLocaleString("en-IN")}</span>
              </div>
              {!quote.isInterState ? (
                <>
                  <div className="flex justify-between">
                    <span>CGST (9%):</span>
                    <span>₹{quote.totals.cgst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST (9%):</span>
                    <span>₹{quote.totals.sgst.toLocaleString("en-IN")}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <span>IGST (18%):</span>
                  <span>₹{quote.totals.igst.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-base border-t pt-2">
                <span>Grand Total:</span>
                <span>₹{quote.totals.grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="border-t pt-6 mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
          <p className="text-sm text-gray-600">{quote.terms}</p>
        </div>
      </div>

      {/* Email Compose Modal */}
      {showEmailCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Send Quote</h2>
              {/* EmailCompose component would go here */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowEmailCompose(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleSendEmail({
                      to: quote.contacts.map((c) => c.email),
                      subject: `Quote ${quote.number} - ${quote.opportunityName}`,
                      body: `Please find attached the quote for ${quote.opportunityName}.`,
                      attachments: [`quote-${quote.id}.pdf`],
                    })
                  }
                  disabled={isLoading}
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E-Sign Form Modal */}
      {showEsignForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Send for E-Signature</h2>
              {/* EsignForm component would go here */}
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowEsignForm(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleCreateEsign({
                      documentName: `Quote ${quote.number}`,
                      signers: quote.contacts.map((c) => ({
                        name: c.name,
                        email: c.email,
                        role: "signer",
                      })),
                      message: `Please review and sign the attached quote for ${quote.opportunityName}.`,
                    })
                  }
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Creating..." : "Send for Signature"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
