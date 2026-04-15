// Transport configuration
export const LEADS_TRANSPORT: "n8n_webhook" | "mock" = "n8n_webhook"
// "strapi" = usa StrapiContentProvider (requer Strapi rodando)
// "mock"   = usa dados estáticos locais (para Figma ou sem backend)
export const CONTENT_TRANSPORT: "strapi" | "mock" = "strapi"

// n8n Webhook URLs - Replace with your actual n8n instance URLs
export const N8N_LEADS_WEBHOOK_URL = "https://SEU_N8N/webhook/jtech/leads"
export const N8N_CONTENT_WEBHOOK_URL = "https://SEU_N8N/webhook/jtech/content"

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