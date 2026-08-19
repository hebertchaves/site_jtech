import { ConsentPreferences } from "./consent"

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

// Google Consent Mode v2 — o dataLayer carrega o estado do consentimento para
// que as tags dentro do GTM respeitem cada categoria. Sem isso, a caixinha
// "Marketing e personalização" do banner não governaria nada: o código do site
// só verificava a categoria "analytics".
function gtag(...args: unknown[]): void {
  window.dataLayer = window.dataLayer || []
  // Consent Mode exige o objeto `arguments`, não um array
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments as unknown as Record<string, unknown>)
  void args
}

/**
 * Nega tudo por padrão. Deve rodar antes de qualquer tag do Google carregar.
 */
export function setDefaultConsent(): void {
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  })
}

/**
 * Reflete a escolha do usuário nas tags do Google.
 */
export function updateConsentMode(preferences: ConsentPreferences): void {
  const marketing = preferences.marketing ? "granted" : "denied"
  gtag("consent", "update", {
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    analytics_storage: preferences.analytics ? "granted" : "denied",
  })
}

export function initializeGTM(): void {
  const gtmId = import.meta.env.VITE_GTM_ID
  if (!gtmId || gtmId === "GTM-XXXXXXX") return

  if (document.getElementById("gtm-script")) return

  window.dataLayer = window.dataLayer || []

  // GTM Script
  const script = document.createElement("script")
  script.id = "gtm-script"
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `
  document.head.appendChild(script)

  // GTM NoScript fallback
  const noscript = document.createElement("noscript")
  const iframe = document.createElement("iframe")
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
  iframe.height = "0"
  iframe.width = "0"
  iframe.style.display = "none"
  iframe.style.visibility = "hidden"
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)
}

export function pushDataLayer(event: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}

export function pushToDataLayer(event: string, data?: Record<string, unknown>): void {
  pushDataLayer({ event, ...data })
}
