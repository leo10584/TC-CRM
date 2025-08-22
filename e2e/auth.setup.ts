import { test as setup } from "@playwright/test"

const authFile = "playwright/.auth/user.json"

setup("authenticate", async ({ page }) => {
  // Mock authentication for testing
  await page.goto("/")

  // In a real scenario, you would:
  // 1. Navigate to Auth0 login
  // 2. Fill in credentials
  // 3. Complete authentication flow
  // 4. Save authentication state

  // For now, we'll mock the authenticated state
  await page.evaluate(() => {
    localStorage.setItem("auth0.is.authenticated", "true")
    localStorage.setItem(
      "auth0.user",
      JSON.stringify({
        sub: "auth0|123456789",
        email: "test@tatvacare.com",
        name: "Test User",
        roles: ["sales_rep"],
      }),
    )
  })

  await page.context().storageState({ path: authFile })
})
