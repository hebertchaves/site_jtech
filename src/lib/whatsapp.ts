import { Lang } from "./i18n"
import { getAttribution } from "./utm"
import { ENVIRONMENT } from "./endpoints"

// Substituir pelo número oficial da Jtech
const WHATSAPP_NUMBER = "5511999999999"

export interface WhatsAppMessageData {
  product?: string
  page: string
  language: Lang
  name?: string
}

function cleanPagePath(): string {
  const { pathname, hash } = window.location
  return `${pathname}${hash || ""}`
}

export function buildWhatsAppMessage(
  data: WhatsAppMessageData,
  lang: Lang
): string {
  const attribution = getAttribution()
  const pagePath = cleanPagePath()
  const timestamp = new Date().toISOString()

  const baseMessage = {
    pt: `Olá! Meu nome é ${data.name || "[Nome]"}.
Tenho interesse em ${data.product || "suas soluções"}.
Gostaria de receber mais informações.`,

    es: `¡Hola! Mi nombre es ${data.name || "[Nombre]"}.
Estoy interesado(a) en ${data.product || "sus soluciones"}.
Me gustaría recibir más información.`,

    en: `Hello! My name is ${data.name || "[Name]"}.
I'm interested in ${data.product || "your solutions"}.
I would like more information.`,

    fr: `Bonjour! Je m'appelle ${data.name || "[Nom]"}.
Je suis intéressé(e) par ${data.product || "vos solutions"}.
J’aimerais recevoir plus d’informations.`,
  }

  const technicalBlock = `

———
📍 Página: ${pagePath}
🌎 Idioma: ${lang}
📦 Produto: ${data.product || "N/A"}
🕒 Timestamp: ${timestamp}
🌱 UTM Source: ${attribution.utm_source || "N/A"}
📣 UTM Campaign: ${attribution.utm_campaign || "N/A"}
🖥 Ambiente: ${ENVIRONMENT}
`

  return baseMessage[lang] + technicalBlock
}

export function getWhatsAppURL(
  messageData: WhatsAppMessageData,
  lang: Lang
): string {
  const message = buildWhatsAppMessage(messageData, lang)
  const encodedMessage = encodeURIComponent(message)

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function openWhatsApp(
  messageData: WhatsAppMessageData,
  lang: Lang
): void {
  const url = getWhatsAppURL(messageData, lang)
  window.open(url, "_blank", "noopener,noreferrer")
}
