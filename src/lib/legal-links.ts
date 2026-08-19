import { Lang } from "./i18n"

// Documentos legais hospedados no portal da Veolia América Latina.
// O portal publica apenas as versões pt e es; en/fr reutilizam a versão pt.
const VEOLIA = "https://www.latinoamerica.veolia.com"

type LegalDoc = "privacy" | "legalNotice" | "cookies"

export const legalLinks: Record<LegalDoc, Record<Lang, string>> = {
  privacy: {
    pt: `${VEOLIA}/pt/politica-de-privacidade`,
    es: `${VEOLIA}/es/politica-de-privacidad`,
    en: `${VEOLIA}/pt/politica-de-privacidade`,
    fr: `${VEOLIA}/pt/politica-de-privacidade`,
  },
  legalNotice: {
    pt: `${VEOLIA}/pt/aviso-legal`,
    es: `${VEOLIA}/es/aviso-legal`,
    en: `${VEOLIA}/pt/aviso-legal`,
    fr: `${VEOLIA}/pt/aviso-legal`,
  },
  cookies: {
    pt: `${VEOLIA}/pt/politica-de-cookies`,
    es: `${VEOLIA}/es/politica-de-cookies`,
    en: `${VEOLIA}/pt/politica-de-cookies`,
    fr: `${VEOLIA}/pt/politica-de-cookies`,
  },
}

export function getLegalLink(doc: LegalDoc, lang: Lang): string {
  return legalLinks[doc][lang]
}
