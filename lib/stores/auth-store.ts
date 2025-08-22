import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  roles: string[]
  territory?: string
  vertical?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  hasRole: (role: string) => boolean
  canAccessTerritory: (territory: string) => boolean
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      hasRole: (role) => {
        const { user } = get()
        return user?.roles.includes(role) || user?.roles.includes("admin") || false
      },
      canAccessTerritory: (territory) => {
        const { user } = get()
        if (!user) return false
        if (user.roles.includes("admin")) return true
        return user.territory === territory
      },
    }),
    { name: "auth-store" },
  ),
)
