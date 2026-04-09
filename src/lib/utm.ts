export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

const UTM_STORAGE_KEY = "jtech_utm_params"

const UTM_KEYS: (keyof UTMParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
]

function readUTMsFromSearch(search: string): UTMParams {
  const params: UTMParams = {}
  const sp = new URLSearchParams(search || "")

  for (const key of UTM_KEYS) {
    const v = sp.get(key)
    if (v) params[key] = v
  }

  return params
}

function mergePreferIncoming(base: UTMParams, incoming: UTMParams): UTMParams {
  // incoming overrides base
  return { ...base, ...incoming }
}

/**
 * Capture UTMs from BOTH:
 * - window.location.search  (/?utm_source=...#/pt/...)
 * - hash query              (/#/pt/?utm_source=...)
 */
export function captureUTMParams(): UTMParams {
  const fromQuery = readUTMsFromSearch(window.location.search)

  const hash = window.location.hash || ""
  const hashQuery = hash.includes("?") ? hash.split("?")[1] : ""
  const fromHash = readUTMsFromSearch(hashQuery)

  const merged = mergePreferIncoming(fromQuery, fromHash)

  if (Object.keys(merged).length > 0) {
    persistUTMParams(merged)
  }

  return merged
}

export function persistUTMParams(params: UTMParams): void {
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params))
  } catch (e) {
    console.error("Failed to persist UTM params:", e)
  }
}

export function getPersistedUTMParams(): UTMParams {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as UTMParams) : {}
  } catch (e) {
    console.error("Failed to retrieve UTM params:", e)
    return {}
  }
}

/**
 * Attribution helper:
 * - If current URL has UTMs, capture+persist and return them
 * - Else fallback to sessionStorage
 */
export function getAttribution(): UTMParams {
  const current = captureUTMParams()

  if (Object.keys(current).length === 0) {
    return getPersistedUTMParams()
  }

  return current
}
