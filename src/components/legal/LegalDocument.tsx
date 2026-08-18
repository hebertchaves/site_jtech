import { Fragment } from "react"
import { Lang } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"
import { Container } from "../layout/Container"
import { ScrollToTop } from "../ScrollToTop"
import { PolicyBlock, PolicySection } from "../../data/legal-content"

interface LegalDocumentProps {
  lang: Lang
  title: string
  /** Rótulo traduzido de "Última atualização" */
  updatedLabel: string
  updatedAt: string
  sections: PolicySection[]
}

/**
 * Renderiza um documento legal (Política de Privacidade, Termos de Serviço)
 * a partir da estrutura de dados em src/data. As seções são numeradas
 * automaticamente pela ordem do array.
 */
export function LegalDocument({
  lang,
  title,
  updatedLabel,
  updatedAt,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <div className="pt-32 pb-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl mb-8">{title}</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                {updatedLabel}: {updatedAt}
              </p>

              {sections.map((section, index) => (
                <section key={section.title.pt}>
                  <h2>
                    {index + 1}. {section.title[lang]}
                  </h2>

                  {section.blocks.map((block, blockIndex) => (
                    <LegalBlock key={blockIndex} block={block} lang={lang} />
                  ))}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}

function LegalBlock({ block, lang }: { block: PolicyBlock; lang: Lang }) {
  if (block.type === "p") {
    if (!block.link) {
      return <p>{block.text[lang]}</p>
    }

    // O token {link} marca onde a âncora entra no parágrafo.
    const [before, after = ""] = block.text[lang].split("{link}")

    return (
      <p>
        {before}
        <a
          href={`#/${lang}${getRoute(block.link.route, lang)}`}
          className="text-[#E30613] underline"
        >
          {block.link.label[lang]}
        </a>
        {after}
      </p>
    )
  }

  if (block.type === "ul") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item.text.pt}>
            {item.label ? (
              <>
                <strong>{item.label[lang]}:</strong> {item.text[lang]}
              </>
            ) : (
              item.text[lang]
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <p>
      {block.lines.map((line, lineIndex) => (
        <Fragment key={line.pt}>
          {lineIndex > 0 && <br />}
          {line[lang]}
        </Fragment>
      ))}
    </p>
  )
}
