import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface UIState {
  sidebarOpen: boolean
  theme: "light" | "dark" | "system"
  locale: string
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: "light" | "dark" | "system") => void
  setLocale: (locale: string) => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      sidebarOpen: true,
      theme: "system",
      locale: "en-IN",
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),
    }),
    { name: "ui-store" },
  ),
)
