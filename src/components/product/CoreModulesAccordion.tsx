import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { Lang } from "../../lib/i18n"
import { CoreModule } from "../../data/core-modules"

interface CoreModulesAccordionProps {
  lang: Lang
  /** Título da dobra já traduzido (aceita HTML) */
  title: string
  modules: CoreModule[]
  /** Índice do módulo aberto; -1 = todos fechados */
  openIndex: number
  onToggle: (index: number) => void
}

/**
 * Dobra "Principais Módulos" — acordeão usado pelos produtos que detalham
 * seus módulos core (Sansys Water, Sansys Waste).
 *
 * O conteúdo de cada módulo aceita dois formatos, conforme os dados:
 * `topics` (cards com título + descrição) ou `bullets` (lista simples).
 * O <section> e seu fundo ficam na página, que varia por produto.
 */
export function CoreModulesAccordion({
  lang,
  title,
  modules,
  openIndex,
  onToggle,
}: CoreModulesAccordionProps) {
  return (
    <>
      <h2
        className="mb-12 text-center text-[#E30613] text-5xl font-normal pt-16"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="max-w-[1200px] mx-auto bg-white/70 px-4 divide-y divide-gray-200 border-y border-gray-200">
        {modules.map((mod, idx) => {
          const isOpen = openIndex === idx
          return (
            <div key={mod.id}>
              <button
                type="button"
                onClick={() => onToggle(isOpen ? -1 : idx)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-xl font-semibold transition-colors ${
                    isOpen ? "text-[#E30613]" : "text-gray-900 group-hover:text-[#E30613]"
                  }`}
                >
                  {mod.name[lang]}
                </span>
                <ChevronDown
                  className={`h-6 w-6 flex-shrink-0 text-[#E30613] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pt-1">
                      {mod.intro && (
                        <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">
                          {mod.intro[lang]}
                        </p>
                      )}

                      {mod.topics && mod.topics.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mod.topics.map((topic, tIdx) => (
                            <div
                              key={tIdx}
                              className="bg-white rounded-lg p-5 border-l-4 border-[#E30613] shadow-sm"
                            >
                              <h3 className="text-base font-semibold mb-1 text-gray-900">
                                {topic.title[lang]}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {topic.description[lang]}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {mod.bullets && mod.bullets.length > 0 && (
                        <ul className="space-y-3 max-w-3xl">
                          {mod.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-4">
                              <span className="text-[#E30613] text-2xl flex-shrink-0 leading-none mt-0.5">
                                •
                              </span>
                              <p className="text-gray-700 leading-relaxed">{bullet[lang]}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </>
  )
}
