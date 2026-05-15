import { Lang } from "./i18n"

// Substituir pelo número oficial da Jtech
const WHATSAPP_NUMBER = "5548992256034"

export interface WhatsAppMessageData {
  name?: string
  email?: string
  company?: string
  role?: string
  phone?: string
  page: string
  language: Lang
}

export function buildWhatsAppMessage(
  data: WhatsAppMessageData,
  lang: Lang
): string {
  const messages: Record<Lang, string> = {
    pt: `Olá!
Gostaria de receber mais informações sobre as soluções da Jtech

Meu nome: ${data.name || ""}
Meu e-mail: ${data.email || ""}
Minha empresa: ${data.company || ""}
Meu Cargo: ${data.role || ""}
Meu telefone: ${data.phone || ""}`,

    es: `¡Hola!
Me gustaría recibir más información sobre las soluciones de Jtech

Mi nombre: ${data.name || ""}
Mi correo: ${data.email || ""}
Mi empresa: ${data.company || ""}
Mi cargo: ${data.role || ""}
Mi teléfono: ${data.phone || ""}`,

    en: `Hello!
I would like to receive more information about Jtech’s solutions

My name: ${data.name || ""}
My email: ${data.email || ""}
My company: ${data.company || ""}
My role: ${data.role || ""}
My phone: ${data.phone || ""}`,

    fr: `Bonjour!
Je souhaite recevoir plus d’informations sur les solutions Jtech

Mon nom: ${data.name || ""}
Mon email: ${data.email || ""}
Mon entreprise: ${data.company || ""}
Mon poste: ${data.role || ""}
Mon téléphone: ${data.phone || ""}`,
  }

  return messages[lang] ?? messages.pt
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
