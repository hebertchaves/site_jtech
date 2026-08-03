import { Lang } from "../lib/i18n"

// Estrutura dos módulos core exibidos na dobra "Principais Módulos" (acordeão),
// compartilhada pelos produtos que possuem essa dobra
// (water-core-modules.ts, waste-core-modules.ts).

export interface CoreModuleTopic {
  title: Record<Lang, string>
  description: Record<Lang, string>
}

export interface CoreModule {
  id: string
  name: Record<Lang, string>
  /** Parágrafo de abertura do módulo — opcional */
  intro?: Record<Lang, string>
  /** Cards com título + descrição */
  topics?: CoreModuleTopic[]
  /** Lista simples de bullets — alternativa a `topics` */
  bullets?: Record<Lang, string>[]
}
