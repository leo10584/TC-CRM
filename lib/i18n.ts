import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  const locale = "en-IN" // Default locale for Indian market

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: "Asia/Kolkata",
    formats: {
      number: {
        currency: {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 2,
        },
      },
      dateTime: {
        short: {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
        medium: {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        },
      },
    },
  }
})
