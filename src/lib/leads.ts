import { Lang, t } from "./i18n"
import { getAttribution, UTMParams } from "./utm"
import { LEADS_TRANSPORT, N8N_LEADS_WEBHOOK_URL, ENVIRONMENT } from "./endpoints"
import { getConsentPreferences } from "./consent"

/** Código de erro devolvido quando o transporte de leads está congelado. */
export const LEAD_TRANSPORT_DISABLED = "lead_transport_disabled"

export interface LeadPayload {
  name: string
  email: string
  company?: string
  role?: string
  phone?: string
  message?: string

  // Lead context
  form_type: "newsletter" | "ebook" | "contact" | "pre_whatsapp"
  form_name: string

  // Business context
  product_interest?: string

  // Tracking context
  language: string
  page_path: string          // clean route (hash path without utm query)
  landing_full_url: string   // full href
  referrer?: string
  timestamp: string          // ISO

  // Consent snapshot
  consent_snapshot: {
    necessary: boolean
    analytics: boolean
    marketing: boolean
  }

  // Environment
  environment: string

  // UTMs
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

// What the UI must provide (minimal). We auto-enrich the rest.
export type LeadInput = Omit<
  LeadPayload,
  | "language"
  | "page_path"
  | "landing_full_url"
  | "referrer"
  | "timestamp"
  | "consent_snapshot"
  | "environment"
  | keyof UTMParams
>

export async function submitLead(
  data: LeadInput,
  lang: Lang
): Promise<{ success: boolean; error?: string }> {
  const attribution = getAttribution()
  const consent = getConsentPreferences() || { necessary: true, analytics: false, marketing: false }

  const payload: LeadPayload = {
    ...data,
    language: lang,
    page_path: getCleanPagePath(),
    landing_full_url: window.location.href,
    referrer: document.referrer || undefined,
    timestamp: new Date().toISOString(),
    consent_snapshot: {
      necessary: !!consent.necessary,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
    },
    environment: ENVIRONMENT,
    ...attribution,
  }

  if (LEADS_TRANSPORT === "disabled") {
    return submitDisabled(payload)
  }

  if (LEADS_TRANSPORT === "n8n_webhook") {
    return submitToN8N(payload)
  }

  return submitMock(payload)
}

/**
 * Transporte congelado: os workflows do n8n ainda não foram publicados.
 * Não dispara requisição (o endpoint de teste devolve 404) e devolve um código
 * de erro estável, para a UI mostrar "indisponível" em vez de "tente de novo" —
 * repetir o envio não mudaria o resultado.
 */
async function submitDisabled(
  payload: LeadPayload
): Promise<{ success: boolean; error?: string }> {
  console.warn(
    "[leads] Envio desativado (LEADS_TRANSPORT=disabled). Lead não registrado:",
    { form_type: payload.form_type, form_name: payload.form_name }
  )
  return { success: false, error: LEAD_TRANSPORT_DISABLED }
}

function getCleanPagePath(): string {
  // For hash routing: "#/pt/solucoes/sansys-water?utm_source=..."
  // We want "/pt/solucoes/sansys-water" (no query)
  const hash = window.location.hash || ""
  const withoutHash = hash.replace(/^#/, "")
  const [pathPart] = withoutHash.split("?")
  return pathPart || "/"
}

async function submitToN8N(payload: LeadPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 12000)

    const response = await fetch(N8N_LEADS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    window.clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting lead:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

async function submitMock(payload: LeadPayload): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log("Lead submitted (MOCK):", payload)
  return { success: true }
}

export async function submitPreWhatsAppLead(
  data: Omit<LeadInput, "form_type" | "form_name"> & { source?: string },
  lang: Lang = "pt"
): Promise<{ success: boolean; error?: string }> {
  return submitLead(
    { ...data, form_type: "pre_whatsapp", form_name: data.source ?? "pre-whatsapp" },
    lang
  )
}

/**
 * Mensagem para o usuário a partir do erro devolvido por submitLead.
 * Nunca expõe detalhe técnico (status HTTP, stack) na interface.
 */
export function leadErrorMessage(lang: Lang, error?: string): string {
  return error === LEAD_TRANSPORT_DISABLED
    ? t(lang, "contact.error.unavailable")
    : t(lang, "contact.error")
}
