import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge"
import createIntlMiddleware from "next-intl/middleware"

const intlMiddleware = createIntlMiddleware({
  locales: ["en-IN"],
  defaultLocale: "en-IN",
})

export default withMiddlewareAuthRequired(intlMiddleware)

export const config = {
  matcher: [
    // Skip all internal paths (_next, api/auth)
    "/((?!_next|api/auth|favicon.ico|.*\\.).*)",
  ],
}
