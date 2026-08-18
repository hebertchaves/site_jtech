import { Lang, t } from "../lib/i18n"
import { LegalDocument } from "../components/legal/LegalDocument"
import { termsSections, termsUpdatedAt } from "../data/terms-of-service"

interface TermsPageProps {
  lang: Lang
}

/**
 * Termos de Serviço do site.
 * Conteúdo (4 idiomas) em src/data/terms-of-service.ts
 */
export function TermsPage({ lang }: TermsPageProps) {
  return (
    <LegalDocument
      lang={lang}
      title={t(lang, "terms.title")}
      updatedLabel={t(lang, "terms.updated")}
      updatedAt={termsUpdatedAt[lang]}
      sections={termsSections}
    />
  )
}
