/**
 * LGPD Compliance Utilities
 * 
 * Helpers para garantir conformidade com LGPD (Lei Geral de Proteção de Dados)
 */

/**
 * Versão atual do texto de consentimento
 * Incrementar quando houver mudanças significativas no texto legal
 */
export const CONSENT_TEXT_VERSION = "v1-2026-03-03"

/**
 * Texto de consentimento padrão (multi-idioma)
 */
export const CONSENT_TEXT = {
  pt: "Concordo em receber comunicações da Jtech e estou ciente da Política de Privacidade",
  en: "I agree to receive communications from Jtech and I am aware of the Privacy Policy",
  es: "Acepto recibir comunicaciones de Jtech y soy consciente de la Política de Privacidad",
  fr: "J'accepte de recevoir des communications de Jtech et je suis conscient de la Politique de Confidentialité"
}

/**
 * Get current timestamp in ISO format
 */
export function getConsentTimestamp(): string {
  return new Date().toISOString()
}

/**
 * Get client IP address (best effort)
 * Note: This is client-side, so IP is not fully reliable
 * For production, capture IP server-side (n8n webhook or backend)
 */
export function getClientIP(): string {
  // Client-side não tem acesso direto ao IP real
  // Retorna placeholder que será substituído no backend
  return 'CLIENT_IP_PLACEHOLDER'
}

/**
 * Create consent data object for lead submission
 */
export interface ConsentData {
  consentGiven: boolean
  consentAt: string
  consentTextVersion: string
  consentIP: string
  consentText?: string
}

export function createConsentData(lang: string): ConsentData {
  return {
    consentGiven: true,
    consentAt: getConsentTimestamp(),
    consentTextVersion: CONSENT_TEXT_VERSION,
    consentIP: getClientIP(),
    consentText: CONSENT_TEXT[lang as keyof typeof CONSENT_TEXT] || CONSENT_TEXT.pt
  }
}

/**
 * Validate consent before form submission
 */
export function validateConsent(consentGiven: boolean): { valid: boolean; error?: string } {
  if (!consentGiven) {
    return {
      valid: false,
      error: "Você precisa concordar com os termos para continuar"
    }
  }
  
  return { valid: true }
}
