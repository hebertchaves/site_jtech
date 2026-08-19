export type ConsentCategory = "necessary" | "analytics" | "marketing"

export interface ConsentPreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const CONSENT_STORAGE_KEY = "jtech_consent_preferences"

export function getConsentPreferences(): ConsentPreferences | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (e) {
    console.error("Failed to get consent preferences:", e)
    return null
  }
}

export function saveConsentPreferences(preferences: ConsentPreferences): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences))
    
    // Trigger event for analytics scripts to listen to
    window.dispatchEvent(new CustomEvent("consentUpdated", { detail: preferences }))
  } catch (e) {
    console.error("Failed to save consent preferences:", e)
  }
}

export function hasConsent(category: ConsentCategory): boolean {
  const preferences = getConsentPreferences()
  
  if (!preferences) {
    return false
  }
  
  return preferences[category] === true
}

export function shouldShowConsentBanner(): boolean {
  return getConsentPreferences() === null
}

export function hasConsentDecision(): boolean {
  return getConsentPreferences() !== null
}

export function acceptAllConsent(): void {
  saveConsentPreferences({ necessary: true, analytics: true, marketing: true })
}

export function rejectAllConsent(): void {
  saveConsentPreferences({ necessary: true, analytics: false, marketing: false })
}

export function setConsentPreferences(prefs: { analytics: boolean; marketing: boolean }): void {
  saveConsentPreferences({ necessary: true, ...prefs })
}

// Evento usado para reabrir o painel de preferências depois que o usuário já
// decidiu (exigência de LGPD/GDPR: consentimento revogável a qualquer momento).
// Disparado pelo link "Preferências de cookies" no rodapé.
export const OPEN_CONSENT_EVENT = "openConsentPreferences"

export function openConsentPreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT))
}
