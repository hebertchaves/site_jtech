import { useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { getSolutionBySlug, isProduct } from "../lib/solutions"
import { Hero } from "../components/sections/Hero"
import { PreWhatsAppModal } from "../components/forms/PreWhatsAppModal"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ScrollToTop } from "../components/ScrollToTop"

interface SolutionDetailPageProps {
  lang: Lang
  slug: string
}

export function SolutionDetailPage({ lang, slug }: SolutionDetailPageProps) {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  
  // Busca em produtos e módulos
  const solution = getSolutionBySlug(slug)

  if (!solution) {
    return (
      <Container className="py-20">
        <h1 className="text-3xl mb-4">{t(lang, "common.error")}</h1>
        <p className="text-gray-600">Produto não encontrado.</p>
      </Container>
    )
  }

  const solutionType = isProduct(solution) ? 'Produto' : 'Módulo'

  return (
    <>
      {/* ====================================
          HERO SECTION
          Banner principal da solução/produto
          ==================================== */}
      <Hero
        title={solution.name[lang]}
        subtitle={solution.shortDescription[lang]}
        image={solution.image}
        imageAlt={`Interface do ${solution.name[lang]} para gestão de saneamento`}
      />

      {/* ====================================
          PRODUCT DETAILS SECTION
          Detalhes e benefícios do produto
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="mb-0 font-extralight">Sobre o {solutionType}</h2>
              <p className="text-gray-600 text-2xl mb-6">{solution.description[lang]}</p>
              
              <Button
                size="lg"
                onClick={() => setWhatsappModalOpen(true)}
              >
                {t(lang, "home.hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {solution.features[lang].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#E30613] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* ====================================
          APPLICATIONS SECTION
          Aplicações práticas da solução
          ==================================== */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="mb-8 text-center font-extralight">Aplicações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {solution.applications[lang].map((app, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-700">{app}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ====================================
          CTA SECTION
          Call to action para contato
          ==================================== */}
      <section className="py-20 bg-[#0B0B0B] text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6 font-extralight">
              Interessado em {solution.name[lang]}?
            </h2>
            <Button
              size="lg"
              variant="default"
              onClick={() => setWhatsappModalOpen(true)}
            >
              {t(lang, "home.cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Container>
      </section>

      <PreWhatsAppModal
        lang={lang}
        productInterest={solution.name[lang]}
        open={whatsappModalOpen}
        onOpenChange={setWhatsappModalOpen}
      />

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}