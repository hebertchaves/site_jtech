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
 * Textos do banner de consentimento LGPD (multi-idioma)
 */
export const LGPD_TEXTS = {
  pt: {
    title: "Usamos cookies",
    description: "Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo. Veja nossa",
    privacyLink: "Política de Privacidade",
    customize: "Personalizar",
    rejectAll: "Rejeitar todos",
    acceptAll: "Aceitar todos",
    analytics: "Analíticos",
    analyticsDesc: "Nos ajudam a entender como você usa o site para melhorarmos a experiência.",
    marketing: "Marketing",
    marketingDesc: "Permitem exibir anúncios relevantes para você em outros sites.",
    save: "Salvar preferências",
  },
  en: {
    title: "We use cookies",
    description: "We use cookies to improve your experience, analyze traffic and personalize content. See our",
    privacyLink: "Privacy Policy",
    customize: "Customize",
    rejectAll: "Reject all",
    acceptAll: "Accept all",
    analytics: "Analytics",
    analyticsDesc: "Help us understand how you use the site so we can improve the experience.",
    marketing: "Marketing",
    marketingDesc: "Allow us to show you relevant ads on other sites.",
    save: "Save preferences",
  },
  es: {
    title: "Usamos cookies",
    description: "Utilizamos cookies para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Vea nuestra",
    privacyLink: "Política de Privacidad",
    customize: "Personalizar",
    rejectAll: "Rechazar todos",
    acceptAll: "Aceptar todos",
    analytics: "Analíticos",
    analyticsDesc: "Nos ayudan a entender cómo usa el sitio para mejorar la experiencia.",
    marketing: "Marketing",
    marketingDesc: "Permiten mostrar anuncios relevantes en otros sitios.",
    save: "Guardar preferencias",
  },
  fr: {
    title: "Nous utilisons des cookies",
    description: "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Voir notre",
    privacyLink: "Politique de Confidentialité",
    customize: "Personnaliser",
    rejectAll: "Tout refuser",
    acceptAll: "Tout accepter",
    analytics: "Analytiques",
    analyticsDesc: "Nous aident à comprendre comment vous utilisez le site pour améliorer l'expérience.",
    marketing: "Marketing",
    marketingDesc: "Permettent d'afficher des annonces pertinentes sur d'autres sites.",
    save: "Enregistrer les préférences",
  },
}

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
