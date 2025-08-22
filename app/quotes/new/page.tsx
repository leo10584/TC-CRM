"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { QuoteForm } from "@/components/forms/quote-form"
import type { QuoteCreateInput } from "@/lib/validations/quote"
import { useToast } from "@/hooks/use-toast"

export default function NewQuotePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const opportunityId = searchParams.get("oppId")

  const handleSubmit = async (data: QuoteCreateInput) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      console.log("Creating quote:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Quote Created",
        description: data.requiresApproval
          ? "Your quote has been created and is awaiting approval."
          : "Your quote has been created successfully.",
      })

      // Navigate to quotes list
      router.push("/quotes")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create quote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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
            <h1 className="text-3xl font-bold text-foreground">New Quote</h1>
            <p className="text-muted-foreground">Create a new sales quote</p>
          </div>
        </div>

        <QuoteForm onSubmit={handleSubmit} isLoading={isLoading} opportunityId={opportunityId || undefined} />
      </div>
    </MainLayout>
  )
}
