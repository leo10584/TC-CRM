import type React from "react"
import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}))

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en-IN",
}))

// Mock Auth0
vi.mock("@auth0/nextjs-auth0/client", () => ({
  useUser: () => ({
    user: {
      sub: "auth0|123",
      email: "test@example.com",
      name: "Test User",
    },
    isLoading: false,
    error: null,
  }),
  UserProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock API calls
global.fetch = vi.fn()
