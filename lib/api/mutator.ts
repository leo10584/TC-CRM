import { getAccessToken } from "@auth0/nextjs-auth0"

export const customInstance = async (config: RequestInit & { url: string }): Promise<any> => {
  const { url, ...requestConfig } = config

  // Get access token for API calls
  let accessToken = ""
  try {
    if (typeof window === "undefined") {
      // Server-side
      const { accessToken: token } = await getAccessToken()
      accessToken = token || ""
    } else {
      // Client-side - get from session
      const response = await fetch("/api/auth/token")
      if (response.ok) {
        const data = await response.json()
        accessToken = data.accessToken || ""
      }
    }
  } catch (error) {
    console.warn("Failed to get access token:", error)
  }

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"
  const fullUrl = url.startsWith("http") ? url : `${baseURL}${url}`

  const response = await fetch(fullUrl, {
    ...requestConfig,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...requestConfig.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(`API Error: ${response.status} - ${errorData}`)
  }

  return response.json()
}
