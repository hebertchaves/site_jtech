// Transport configuration
// "disabled" = nenhum lead é enviado (fluxo do n8n ainda não publicado)
// "n8n_webhook" = envia para N8N_LEADS_WEBHOOK_URL
// "mock" = apenas loga no console (desenvolvimento)
//
// Vem da variável de ambiente para que ligar o envio seja uma troca de
// configuração no deploy, não uma alteração de código. Sem a variável, ou com
// "n8n_webhook" sem URL configurada, fica desligado — publicar pela metade
// faria cada visitante ver uma mensagem de falha.
type LeadsTransport = "n8n_webhook" | "mock" | "disabled"

function resolveLeadsTransport(): LeadsTransport {
  const configured = import.meta.env.VITE_LEADS_TRANSPORT as LeadsTransport | undefined
  if (configured !== "n8n_webhook" && configured !== "mock") return "disabled"
  if (configured === "n8n_webhook" && !import.meta.env.VITE_N8N_LEAD_WEBHOOK) {
    console.warn("[endpoints] VITE_LEADS_TRANSPORT=n8n_webhook sem VITE_N8N_LEAD_WEBHOOK — envio desligado.")
    return "disabled"
  }
  return configured
}

export const LEADS_TRANSPORT: LeadsTransport = resolveLeadsTransport()
// "strapi" = usa StrapiContentProvider (requer Strapi rodando)
// "mock"   = usa dados estáticos locais (para Figma ou sem backend)
export const CONTENT_TRANSPORT: "strapi" | "mock" = "strapi"

// n8n Webhook URL — endereço de produção do fluxo de leads, publicado no n8n.
// Deve conter /webhook/, nunca /webhook-test/: o endereço de teste só responde
// enquanto alguém está com o editor do n8n aberto.
// É esse fluxo que registra a conversão na RD Station, usando o form_name do
// payload como conversion_identifier.
export const N8N_LEADS_WEBHOOK_URL = import.meta.env.VITE_N8N_LEAD_WEBHOOK ?? ""

// Strapi CMS URL - Configured via VITE_CMS_URL environment variable
// Default: http://localhost:1337 (dev) or https://conteudo.jtech.com.br (prod)

// Analytics configuration
export const ANALYTICS_TOOL: "hotjar" | "clarity" = "hotjar"

// GTM Container ID - Replace with your actual GTM ID
export const GTM_CONTAINER_ID = "GTM-XXXXXXX"

// Google Analytics 4 Measurement ID - Replace with your actual GA4 ID
export const GA4_MEASUREMENT_ID = "G-XXXXXXXXXX"

// Google Ads Conversion ID - Replace with your actual Ads ID
export const GOOGLE_ADS_ID = "AW-XXXXXXXXXX"

// Hotjar Site ID - Replace with your actual Hotjar ID
export const HOTJAR_SITE_ID = 0

// Microsoft Clarity Project ID - Replace with your actual Clarity ID
export const CLARITY_PROJECT_ID = ""

export const ENVIRONMENT = "production" as const