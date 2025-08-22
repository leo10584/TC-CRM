"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { OpportunityForm } from "@/components/forms/opportunity-form"
import type { OpportunityCreateInput } from "@/lib/validations/opportunity"
import { useToast } from "@/hooks/use-toast"

export default function NewOpportunityPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: OpportunityCreateInput) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      console.log("Creating opportunity:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Opportunity Created",
        description: "Your opportunity has been created successfully.",
      })

      // Navigate to opportunities list
      router.push("/opps")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create opportunity. Please try again.",
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
            <Link href="/opps">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New Opportunity</h1>
            <p className="text-muted-foreground">Create a new sales opportunity</p>
          </div>
        </div>

        <OpportunityForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </MainLayout>
  )
}
