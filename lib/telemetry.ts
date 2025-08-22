import { WebSDK } from "@opentelemetry/sdk-web"
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web"
import { OTLPTraceExporter } from "@opentelemetry/exporter-otlp-http"

export function initTelemetry() {
  if (typeof window === "undefined") return

  const endpoint = process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT
  if (!endpoint) return

  const sdk = new WebSDK({
    traceExporter: new OTLPTraceExporter({
      url: `${endpoint}/v1/traces`,
    }),
    instrumentations: [getWebAutoInstrumentations()],
    serviceName: process.env.NEXT_PUBLIC_OTEL_SERVICE_NAME || "tatvacare-crm-web",
  })

  sdk.start()
}
