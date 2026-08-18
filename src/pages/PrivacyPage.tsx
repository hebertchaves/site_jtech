import { Lang, t } from "../lib/i18n"
import { LegalDocument } from "../components/legal/LegalDocument"
import { privacySections, privacyUpdatedAt } from "../data/privacy-policy"

interface PrivacyPageProps {
  lang: Lang
}

/**
 * Política de Privacidade e LGPD.
 * Conteúdo (4 idiomas) em src/data/privacy-policy.ts
 */
export function PrivacyPage({ lang }: PrivacyPageProps) {
  return (
    <LegalDocument
      lang={lang}
      title={t(lang, "privacy.title")}
      updatedLabel={t(lang, "privacy.updated")}
      updatedAt={privacyUpdatedAt[lang]}
      sections={privacySections}
    />
  )
}
