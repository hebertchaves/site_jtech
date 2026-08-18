import { Lang } from "../lib/i18n"
import { routes } from "../lib/routes"

// Estrutura compartilhada pelos documentos legais do site
// (privacy-policy.ts e terms-of-service.ts), renderizada por LegalDocument.

export interface PolicyItem {
  label?: Record<Lang, string>
  text: Record<Lang, string>
}

// Link interno embutido em um parágrafo: o texto marca a posição da âncora
// com o token {link}.
export interface PolicyLink {
  route: keyof typeof routes
  label: Record<Lang, string>
}

export type PolicyBlock =
  | { type: "p"; text: Record<Lang, string>; link?: PolicyLink }
  | { type: "ul"; items: PolicyItem[] }
  | { type: "lines"; lines: Record<Lang, string>[] }

export interface PolicySection {
  title: Record<Lang, string>
  blocks: PolicyBlock[]
}
