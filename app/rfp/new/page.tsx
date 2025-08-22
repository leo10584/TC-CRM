"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { RfpForm } from "@/components/forms/rfp-form"
import { useToast } from "@/hooks/use-toast"

export default function NewRFPPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      console.log("Creating RFP:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "RFP Created",
        description: "Your RFP has been created successfully and will be triaged shortly.",
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create RFP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">New RFP</h1>
            <p className="text-muted-foreground">Create a new Request for Proposal</p>
          </div>
        </div>

        <RfpForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </MainLayout>
  )
}