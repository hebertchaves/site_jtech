import { useState } from "react"
import { ArrowRight, CheckCircle, Droplets, AlertTriangle, TrendingDown, MapPin, Gauge, Activity } from "lucide-react"
import { Lang, t } from "../../lib/i18n"
import { getProductBySlug } from "../../data/products"
import { Hero } from "../../components/sections/Hero"
import { PreWhatsAppModal } from "../../components/forms/PreWhatsAppModal"
import { Container } from "../../components/layout/Container"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ScrollToTop } from "../../components/ScrollToTop"
import { LogoBySlug } from "../../components/logos"

interface SansysWaterPageProps {
  lang: Lang
}

/**
 * PÁGINA CUSTOMIZADA: SANSYS WATER
 * 
 * Esta página tem seções exclusivas de gestão de água:
 * - Seção de Gestão de Rede Hídrica
 * - Seção de Controle de Perdas
 * - Seção de Monitoramento em Tempo Real
 * - Seção de Análise Preditiva
 */
export function SansysWaterPage({ lang }: SansysWaterPageProps) {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  
  const product = getProductBySlug("sansys-water")
  
  if (!product) {
    return (
      <Container className="py-20">
        <h1 className="text-3xl mb-4">Produto não encontrado</h1>
      </Container>
    )
  }

  // Conteúdo customizado por idioma
  const customContent = {
    networkManagement: {
      pt: "Gestão Inteligente de Rede Hídrica",
      es: "Gestión Inteligente de Red Hídrica",
      en: "Intelligent Water Network Management",
      fr: "Gestion Intelligente du Réseau Hydrique",
    },
    networkManagementDesc: {
      pt: "Controle completo da sua infraestrutura de distribuição de água com tecnologia avançada",
      es: "Control completo de su infraestructura de distribución de agua con tecnología avanzada",
      en: "Complete control of your water distribution infrastructure with advanced technology",
      fr: "Contrôle complet de votre infrastructure de distribution d'eau avec technologia avancée",
    },
    lossControl: {
      pt: "Controle de Perdas",
      es: "Control de Pérdidas",
      en: "Loss Control",
      fr: "Contrôle des Pertes",
    },
    lossControlDesc: {
      pt: "Reduza perdas físicas e comerciais com detecção inteligente de vazamentos e fraudes",
      es: "Reduzca pérdidas físicas y comerciales con detección inteligente de fugas y fraudes",
      en: "Reduce physical and commercial losses with intelligent leak and fraud detection",
      fr: "Réduisez les pertes physiques et commerciales avec détection intelligente de fuites et fraudes",
    },
    realTimeMonitoring: {
      pt: "Monitoramento em Tempo Real",
      es: "Monitoreo en Tiempo Real",
      en: "Real-Time Monitoring",
      fr: "Surveillance en Temps Réel",
    },
  }

  return (
    <>
      <ScrollToTop />
      
      {/* ====================================
          HERO SECTION - Customizado
          ==================================== */}
      <Hero
        title={product.name[lang]}
        subtitle={product.shortDescription[lang]}
        image={product.image}
        imageAlt="Interface de software para gestão inteligente de rede hídrica e distribuição de água"
      />

      {/* ====================================
          LOGO + DESCRIÇÃO PRINCIPAL
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <LogoBySlug slug="sansys-water" className="h-16" />
            </div>
            <p className="text-gray-600 text-xl leading-relaxed">
              {product.description[lang]}
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                onClick={() => setWhatsappModalOpen(true)}
              >
                {t(lang, "home.hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          SEÇÃO EXCLUSIVA: GESTÃO DE REDE HÍDRICA
          Apenas no Sansys Water
          ==================================== */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <Container>
          <h2 className="mb-4 text-center font-extralight">{customContent.networkManagement[lang]}</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            {customContent.networkManagementDesc[lang]}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mapeamento de Rede */}
            <Card className="text-center hover:shadow-xl transition-shadow border-blue-100">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg mb-3">
                  {lang === 'pt' && "Mapeamento de Rede"}
                  {lang === 'es' && "Mapeo de Red"}
                  {lang === 'en' && "Network Mapping"}
                  {lang === 'fr' && "Cartographie du Réseau"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'pt' && "Visualize toda infraestrutura: tubulações, válvulas, reservatórios e setores"}
                  {lang === 'es' && "Visualice toda la infraestructura: tuberías, válvulas, reservorios y sectores"}
                  {lang === 'en' && "Visualize entire infrastructure: pipes, valves, reservoirs and sectors"}
                  {lang === 'fr' && "Visualisez toute l'infrastructure: tuyaux, vannes, réservoirs et secteurs"}
                </p>
              </CardContent>
            </Card>

            {/* Setorização */}
            <Card className="text-center hover:shadow-xl transition-shadow border-blue-100">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg mb-3">
                  {lang === 'pt' && "Setorização"}
                  {lang === 'es' && "Sectorización"}
                  {lang === 'en' && "Sectorization"}
                  {lang === 'fr' && "Sectorisation"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'pt' && "Divida a rede em DMC (Distritos de Medição e Controle) para análise detalhada"}
                  {lang === 'es' && "Divida la red en DMC (Distritos de Medición y Control) para análisis detallado"}
                  {lang === 'en' && "Divide network into DMAs (District Metered Areas) for detailed analysis"}
                  {lang === 'fr' && "Divisez le réseau en secteurs de mesure pour analyse détaillée"}
                </p>
              </CardContent>
            </Card>

            {/* Balanço Hídrico */}
            <Card className="text-center hover:shadow-xl transition-shadow border-blue-100">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gauge className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg mb-3">
                  {lang === 'pt' && "Balanço Hídrico"}
                  {lang === 'es' && "Balance Hídrico"}
                  {lang === 'en' && "Water Balance"}
                  {lang === 'fr' && "Bilan Hydrique"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'pt' && "Calcule automaticamente volumes produzidos, consumidos e perdidos"}
                  {lang === 'es' && "Calcule automáticamente volúmenes producidos, consumidos y perdidos"}
                  {lang === 'en' && "Automatically calculate produced, consumed and lost volumes"}
                  {lang === 'fr' && "Calculez automatiquement les volumes produits, consommés et perdus"}
                </p>
              </CardContent>
            </Card>

            {/* Pressão de Rede */}
            <Card className="text-center hover:shadow-xl transition-shadow border-blue-100">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg mb-3">
                  {lang === 'pt' && "Gestão de Pressão"}
                  {lang === 'es' && "Gestión de Presión"}
                  {lang === 'en' && "Pressure Management"}
                  {lang === 'fr' && "Gestion de Pression"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'pt' && "Monitore e controle pressão em tempo real para reduzir perdas e rompimentos"}
                  {lang === 'es' && "Monitoree y controle presión en tiempo real para reducir pérdidas y roturas"}
                  {lang === 'en' && "Monitor and control pressure in real-time to reduce losses and breaks"}
                  {lang === 'fr' && "Surveillez et contrôlez la pression en temps réel pour réduire pertes et ruptures"}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* ====================================
          SEÇÃO EXCLUSIVA: CONTROLE DE PERDAS
          Apenas no Sansys Water
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 font-extralight">{customContent.lossControl[lang]}</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {customContent.lossControlDesc[lang]}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-[#E30613]" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      {lang === 'pt' && "Detecção de Vazamentos"}
                      {lang === 'es' && "Detección de Fugas"}
                      {lang === 'en' && "Leak Detection"}
                      {lang === 'fr' && "Détection de Fuites"}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {lang === 'pt' && "Algoritmos de machine learning identificam padrões anormais de consumo e indicam possíveis vazamentos com precisão"}
                      {lang === 'es' && "Algoritmos de machine learning identificam patrones anormales de consumo e indicam posibles fugas com precisión"}
                      {lang === 'en' && "Machine learning algorithms identify abnormal consumption patterns and indicate possible leaks accurately"}
                      {lang === 'fr' && "Algorithmes de machine learning identifient les modèles de consommation anormaux et indiquent fuites possibles avec précision"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      {lang === 'pt' && "Redução de Perdas Não Faturadas"}
                      {lang === 'es' && "Reducción de Pérdidas No Facturadas"}
                      {lang === 'en' && "Non-Revenue Water Reduction"}
                      {lang === 'fr' && "Réduction des Pertes Non Facturées"}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {lang === 'pt' && "Identifique consumos não medidos, ligações clandestinas e fraudes através de análise de dados e inspeções direcionadas"}
                      {lang === 'es' && "Identifique consumos no medidos, conexiones clandestinas y fraudes a través de análisis de datos e inspecciones dirigidas"}
                      {lang === 'en' && "Identify unmeasured consumption, illegal connections and fraud through data analysis and targeted inspections"}
                      {lang === 'fr' && "Identifiez consommation non mesurée, connexions illégales et fraudes via analyse de données et inspections ciblées"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gauge className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      {lang === 'pt' && "Análise de Performance"}
                      {lang === 'es' && "Análisis de Rendimento"}
                      {lang === 'en' && "Performance Analysis"}
                      {lang === 'fr' && "Analyse de Performance"}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {lang === 'pt' && "Acompanhe indicadores de eficiência: IPD (Índice de Perdas de Distribuição), IPF (Índice de Perdas de Faturamento) e muito mais"}
                      {lang === 'es' && "Acompañe indicadores de eficiencia: IPD (Índice de Pérdidas de Distribución), IPF (Índice de Pérdidas de Facturación) y más"}
                      {lang === 'en' && "Track efficiency indicators: Distribution Loss Index, Billing Loss Index and more"}
                      {lang === 'fr' && "Suivez indicateurs d'efficacité: Indice de Pertes de Distribution, Indice de Pertes de Facturation et plus"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-200">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <h4 className="text-sm text-gray-500 mb-4">
                  {lang === 'pt' && "Dashboard de Perdas"}
                  {lang === 'es' && "Dashboard de Pérdidas"}
                  {lang === 'en' && "Loss Dashboard"}
                  {lang === 'fr' && "Tableau de Bord des Pertes"}
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span className="text-sm text-gray-700">
                      {lang === 'pt' && "Perdas Físicas"}
                      {lang === 'es' && "Pérdidas Físicas"}
                      {lang === 'en' && "Physical Losses"}
                      {lang === 'fr' && "Pertes Physiques"}
                    </span>
                    <span className="text-lg text-red-600">23%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                    <span className="text-sm text-gray-700">
                      {lang === 'pt' && "Perdas Comerciais"}
                      {lang === 'es' && "Pérdidas Comerciais"}
                      {lang === 'en' && "Commercial Losses"}
                      {lang === 'fr' && "Pertes Commerciales"}
                    </span>
                    <span className="text-lg text-orange-600">12%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="text-sm text-gray-700">
                      {lang === 'pt' && "Eficiência"}
                      {lang === 'es' && "Eficiencia"}
                      {lang === 'en' && "Efficiency"}
                      {lang === 'fr' && "Efficacité"}
                    </span>
                    <span className="text-lg text-green-600">65%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          CARACTERÍSTICAS PRINCIPAIS
          ==================================== */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="mb-12 text-center font-extralight">
            {lang === 'pt' && "Características Principais"}
            {lang === 'es' && "Características Principais"}
            {lang === 'en' && "Main Features"}
            {lang === 'fr' && "Caractéristiques Principais"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features[lang].map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <CheckCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ====================================
          SEÇÃO EXCLUSIVA: RESULTADOS
          Apenas no Sansys Water
          ==================================== */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-6 font-extralight text-white">
              {lang === 'pt' && "Resultados Comprovados"}
              {lang === 'es' && "Resultados Comprobados"}
              {lang === 'en' && "Proven Results"}
              {lang === 'fr' && "Résultats Prouvés"}
            </h2>
            <p className="text-white/90 text-xl mb-12 leading-relaxed">
              {lang === 'pt' && "Companhias de saneamento que adotaram o Sansys Water obtiveram resultados expressivos"}
              {lang === 'es' && "Compañías de saneamiento que adoptaron Sansys Water obtuvieron resultados expresivos"}
              {lang === 'en' && "Sanitation companies that adopted Sansys Water achieved significant results"}
              {lang === 'fr' && "Compagnies d'assainissement ayant adopté Sansys Water ont obtenu résultats significatifs"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-5xl mb-2">40%</div>
                <p className="text-white/80">
                  {lang === 'pt' && "Redução de perdas"}
                  {lang === 'es' && "Reducción de pérdidas"}
                  {lang === 'en' && "Loss reduction"}
                  {lang === 'fr' && "Réduction des pertes"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-5xl mb-2">50%</div>
                <p className="text-white/80">
                  {lang === 'pt' && "Aumento na detecção de vazamentos"}
                  {lang === 'es' && "Aumento en deteção de fugas"}
                  {lang === 'en' && "Increase in leak detection"}
                  {lang === 'fr' && "Augmentation détection fuites"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-5xl mb-2">30%</div>
                <p className="text-white/80">
                  {lang === 'pt' && "Economia de água tratada"}
                  {lang === 'es' && "Ahorro de agua tratada"}
                  {lang === 'en' && "Treated water savings"}
                  {lang === 'fr' && "Économie d'eau traitée"}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-600 hover:bg-gray-100 border-white"
                onClick={() => setWhatsappModalOpen(true)}
              >
                {t(lang, "home.hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          APLICAÇÕES
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="mb-12 text-center font-extralight">
            {lang === 'pt' && "Aplicações"}
            {lang === 'es' && "Aplicaciones"}
            {lang === 'en' && "Applications"}
            {lang === 'fr' && "Applications"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.applications[lang].map((app, index) => (
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
          CTA FINAL
          ==================================== */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 font-extralight">
              {lang === 'pt' && "Reduza perdas e aumente eficiência"}
              {lang === 'es' && "Reduzca pérdidas y aumente eficiencia"}
              {lang === 'en' && "Reduce losses and increase efficiency"}
              {lang === 'fr' && "Réduisez pertes et augmentez efficacité"}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {lang === 'pt' && "Fale com nossos especialistas e descubra como o Sansys Water pode transformar sua gestão de água"}
              {lang === 'es' && "Hable con nuestros especialistas y descubra cómo Sansys Water puede transformar su gestión de agua"}
              {lang === 'en' && "Talk to our specialists and discover how Sansys Water can transform your water management"}
              {lang === 'fr' && "Parlez à nos spécialistes et découvrez comment Sansys Water peut transformer votre gestion de l'eau"}
            </p>
            <Button
              size="lg"
              onClick={() => setWhatsappModalOpen(true)}
            >
              {t(lang, "home.hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Modal WhatsApp */}
      <PreWhatsAppModal
        open={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        lang={lang}
      />
    </>
  )
}