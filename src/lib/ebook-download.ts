import { Lang } from "./i18n"
import { CONTENT_TRANSPORT } from "./endpoints"

// O link de download dos e-books não vem mais na resposta pública da API:
// o campo é `private` no Strapi. Ele só é devolvido por este endpoint, e só
// depois de um cadastro válido — é o que torna o gating real.

const LOCALE_MAP: Record<Lang, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
  fr: "fr",
}

export interface EbookDownloadRequest {
  name: string
  email: string
  consentGiven: boolean
  consentText?: string
}

export type EbookDownloadResult =
  | { success: true; downloadUrl: string }
  | { success: false; error: "invalid" | "unavailable" | "network" }

function getCmsUrl(): string {
  return import.meta.env.VITE_CMS_URL || "http://localhost:1337"
}

export async function requestEbookDownload(
  lang: Lang,
  slug: string,
  data: EbookDownloadRequest,
  /** Link do mock local — usado apenas quando o site roda sem Strapi. */
  mockDownloadUrl?: string
): Promise<EbookDownloadResult> {
  // Em modo mock não há backend para liberar o link. CONTENT_TRANSPORT é
  // constante de build ("strapi" em produção), então este ramo é eliminado
  // no bundle publicado.
  if (CONTENT_TRANSPORT === "mock") {
    return mockDownloadUrl
      ? { success: true, downloadUrl: mockDownloadUrl }
      : { success: false, error: "unavailable" }
  }

  try {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)

    const response = await fetch(
      `${getCmsUrl()}/api/ebooks/${encodeURIComponent(slug)}/download`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale: LOCALE_MAP[lang] }),
        signal: controller.signal,
      }
    )

    window.clearTimeout(timeout)

    if (response.status === 400) return { success: false, error: "invalid" }
    if (!response.ok) return { success: false, error: "unavailable" }

    const body = await response.json()
    if (!body?.downloadUrl) return { success: false, error: "unavailable" }

    return { success: true, downloadUrl: body.downloadUrl }
  } catch (error) {
    console.error("Erro ao solicitar download do e-book:", error)
    return { success: false, error: "network" }
  }
}
