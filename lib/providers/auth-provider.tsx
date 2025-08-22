"use client"

import type React from "react"

import { UserProvider } from "@auth0/nextjs-auth0/client"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect } from "react"
import { useAuthStore } from "@/lib/stores/auth-store"

function AuthStateSync() {
  const { user, isLoading } = useUser()
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    setLoading(isLoading)

    if (user) {
      // Extract roles and other claims from Auth0 user
      const roles = user["https://tatvacare.com/roles"] || []
      const territory = user["https://tatvacare.com/territory"]
      const vertical = user["https://tatvacare.com/vertical"]

      setUser({
        id: user.sub!,
        email: user.email!,
        name: user.name!,
        roles,
        territory,
        vertical,
      })
    } else {
      setUser(null)
    }
  }, [user, isLoading, setUser, setLoading])

  return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <AuthStateSync />
      {children}
    </UserProvider>
  )
}
