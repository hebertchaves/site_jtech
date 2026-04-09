import { useState } from "react"
import { ArrowRight, CheckCircle, BarChart3, TrendingUp, PieChart, Activity, Database, Zap } from "lucide-react"
import { Lang, t } from "../../lib/i18n"
import { getModuleBySlug } from "../../data/modules"
import { Hero } from "../../components/sections/Hero"
import { PreWhatsAppModal } from "../../components/forms/PreWhatsAppModal"
import { Container } from "../../components/layout/Container"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ScrollToTop } from "../../components/ScrollToTop"
import { LogoBySlug } from "../../components/logos"

interface SansysBIPageProps {
  lang: Lang
}

/**
 * PÁGINA CUSTOMIZADA: SANSYS BI
 * 
 * Esta página tem seções exclusivas focadas em analytics e dashboards:
 * - Seção de Tipos de Dashboards (Operacional, Tático, Estratégico)
 * - Seção de Fontes de Dados e Integrações
 * - Seção de Indicadores e KPIs
 * - Demo visual de gráficos e relatórios
 */
export function SansysBIPage({ lang }: SansysBIPageProps) {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  
  const module = getModuleBySlug("sansys-bi")
  
  if (!module) {
    return (
      <Container className="py-20">
        <h1 className="text-3xl mb-4">Módulo não encontrado</h1>
      </Container>
    )
  }

  // Conteúdo customizado por idioma
  const customContent = {
    dashboardTypes: {
      pt: "Tipos de Dashboards",
      es: "Tipos de Dashboards",
      en: "Dashboard Types",
      fr: "Types de Tableaux de Bord",
    },
    dashboardTypesDesc: {
      pt: "Visualizações inteligentes para cada nível de decisão na sua empresa",
      es: "Visualizaciones inteligentes para cada nivel de decisão en su empresa",
      en: "Smart visualizations for each decision level in your company",
      fr: "Visualisations intelligentes pour chaque niveau de décision dans votre entreprise",
    },
    dataIntegration: {
      pt: "Integração de Dados",
      es: "Integración de Datos",
      en: "Data Integration",
      fr: "Intégration de Données",
    },
    dataIntegrationDesc: {
      pt: "Conecte-se a múltiplas fontes de dados e unifique informações em tempo real",
      es: "Conéctese a múltiplas fuentes de dados y unifique información en tiempo real",
      en: "Connect to multiple data sources and unify information in real-time",
      fr: "Connectez-vous à plusieurs sources de données et unifiez informations en temps réel",
    },
    kpiTracking: {
      pt: "Acompanhamento de KPIs",
      es: "Seguimiento de KPIs",
      en: "KPI Tracking",
      fr: "Suivi des KPIs",
    },
  }

  return (
    <>
      <ScrollToTop />
      
      {/* ====================================
          HERO SECTION - Customizado
          ==================================== */}
      <Hero
        title={module.name[lang]}
        subtitle={module.shortDescription[lang]}
        image={module.image}
        imageAlt="Dashboard de business intelligence com gráficos analíticos para tomada de decisões em saneamento"
      />

      {/* ====================================
          LOGO + DESCRIÇÃO PRINCIPAL
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <LogoBySlug slug="sansys-bi" className="h-16" />
            </div>
            <p className="text-gray-600 text-xl leading-relaxed">
              {module.description[lang]}
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
          SEÇÃO EXCLUSIVA: TIPOS DE DASHBOARDS
          Apenas no Sansys BI
          ==================================== */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <Container>
          <h2 className="mb-4 text-center font-extralight">{customContent.dashboardTypes[lang]}</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            {customContent.dashboardTypesDesc[lang]}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dashboard Operacional */}
            <Card className="hover:shadow-xl transition-shadow border-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">
                  {lang === 'pt' && "Dashboard Operacional"}
                  {lang === 'es' && "Dashboard Operacional"}
                  {lang === 'en' && "Operational Dashboard"}
                  {lang === 'fr' && "Tableau de Bord Opérationnel"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {lang === 'pt' && "Monitoramento em tempo real das operações diárias: consumos, leituras, ocorrências e chamados."}
                  {lang === 'es' && "Monitoreo en tiempo real de operaciones diarias: consumos, lecturas, ocurrencias y llamadas."}
                  {lang === 'en' && "Real-time monitoring of daily operations: consumption, readings, incidents and calls."}
                  {lang === 'fr' && "Surveillance en temps réel des opérations quotidiennes: consommation, relevés, incidents et appels."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {lang === 'pt' && "Atualização a cada 5 minutos"}
                      {lang === 'es' && "Actualización cada 5 minutos"}
                      {lang === 'en' && "Updates every 5 minutes"}
                      {lang === 'fr' && "Mise à jour toutes les 5 minutes"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {lang === 'pt' && "Alertas automáticos"}
                      {lang === 'es' && "Alertas automáticas"}
                      {lang === 'en' && "Automatic alerts"}
                      {lang === 'fr' && "Alertes automatiques"}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Dashboard Tático */}
            <Card className="hover:shadow-xl transition-shadow border-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">
                  {lang === 'pt' && "Dashboard Tático"}
                  {lang === 'es' && "Dashboard Táctico"}
                  {lang === 'en' && "Tactical Dashboard"}
                  {lang === 'fr' && "Tableau de Bord Tactique"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {lang === 'pt' && "Análise de performance por setor: perdas, inadimplência, eficiência e metas departamentais."}
                  {lang === 'es' && "Análisis de rendimiento por sector: pérdidas, morosidad, eficiencia y metas departamentales."}
                  {lang === 'en' && "Performance analysis by sector: losses, delinquency, efficiency and departmental goals."}
                  {lang === 'fr' && "Analyse de performance par secteur: pertes, impayés, efficacité et objectifs départementaux."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {lang === 'pt' && "Análise mensal e trimestral"}
                      {lang === 'es' && "Análisis mensual y trimestral"}
                      {lang === 'en' && "Monthly and quarterly analysis"}
                      {lang === 'fr' && "Analyse mensuelle et trimestrielle"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {lang === 'pt' && "Comparativo vs. meta"}
                      {lang === 'es' && "Comparativo vs. meta"}
                      {lang === 'en' && "Comparison vs. target"}
                      {lang === 'fr' && "Comparaison vs. objectif"}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Dashboard Estratégico */}
            <Card className="hover:shadow-xl transition-shadow border-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-[#E30613]" />
                </div>
                <CardTitle className="text-lg">
                  {lang === 'pt' && "Dashboard Estratégico"}
                  {lang === 'es' && "Dashboard Estratégico"}
                  {lang === 'en' && "Strategic Dashboard"}
                  {lang === 'fr' && "Tableau de Bord Stratégique"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {lang === 'pt' && "Visão executiva de longo prazo: ROI, crescimento, tendências e análise preditiva para tomada de decisão."}
                  {lang === 'es' && "Visión ejecutiva a largo plazo: ROI, crecimiento, tendencias y análisis predictivo para toma de decisiones."}
                  {lang === 'en' && "Long-term executive view: ROI, growth, trends and predictive analysis for decision-making."}
                  {lang === 'fr' && "Vision exécutive à long terme: ROI, croissance, tendances et analyse prédictive pour prise de décision."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E30613] flex-shrink-0 mt-0.5" />
                    <span>
                      {lang === 'pt' && "Análise anual e plurianual"}
                      {lang === 'es' && "Análisis anual y plurianual"}
                      {lang === 'en' && "Annual and multi-year analysis"}
                      {lang === 'fr' && "Analyse annuelle et pluriannuelle"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#E30613] flex-shrink-0 mt-0.5" />
                    <span>
                      {lang === 'pt' && "Projeções e cenários"}
                      {lang === 'es' && "Proyecciones y escenarios"}
                      {lang === 'en' && "Projections and scenarios"}
                      {lang === 'fr' && "Projections et scénarios"}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* ====================================
          SEÇÃO EXCLUSIVA: INTEGRAÇÃO DE DADOS
          Apenas no Sansys BI
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 font-extralight">{customContent.dataIntegration[lang]}</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {customContent.dataIntegrationDesc[lang]}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Database className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">
                      {lang === 'pt' && "Conectores Nativos"}
                      {lang === 'es' && "Conectores Nativos"}
                      {lang === 'en' && "Native Connectors"}
                      {lang === 'fr' && "Connecteurs Natifs"}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {lang === 'pt' && "Integração direta com Sansys Pay, Water, Agency, Reader e todos os módulos do ecossistema"}
                      {lang === 'es' && "Integración directa con Sansys Pay, Water, Agency, Reader y todos los módulos del ecosistema"}
                      {lang === 'en' && "Direct integration with Sansys Pay, Water, Agency, Reader and all ecosystem modules"}
                      {lang === 'fr' && "Intégration directe avec Sansys Pay, Water, Agency, Reader et tous les modules de l'écosystème"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">
                      {lang === 'pt' && "APIs e ETL"}
                      {lang === 'es' && "APIs y ETL"}
                      {lang === 'en' && "APIs and ETL"}
                      {lang === 'fr' && "APIs et ETL"}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {lang === 'pt' && "Conecte sistemas legados via REST API, Web Services ou processos ETL automatizados"}
                      {lang === 'es' && "Conecte sistemas legacy vía REST API, Web Services o procesos ETL automatizados"}
                      {lang === 'en' && "Connect legacy systems via REST API, Web Services or automated ETL processes"}
                      {lang === 'fr' && "Connectez systèmes legacy via REST API, Web Services ou processus ETL automatisés"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PieChart className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">
                      {lang === 'pt' && "Data Warehouse"}
                      {lang === 'es' && "Data Warehouse"}
                      {lang === 'en' && "Data Warehouse"}
                      {lang === 'fr' && "Data Warehouse"}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {lang === 'pt' && "Armazenamento otimizado com modelagem dimensional para análises históricas e tendências"}
                      {lang === 'es' && "Almacenamiento optimizado con modelado dimensional para análisis históricos y tendencias"}
                      {lang === 'en' && "Optimized storage with dimensional modeling for historical analysis and trends"}
                      {lang === 'fr' && "Stockage optimisé avec modélisation dimensionnelle pour analyses historiques et tendances"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mockup de Integração */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border-2 border-purple-200">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-sm text-gray-500 mb-6">
                  {lang === 'pt' && "Fontes de Dados Conectadas"}
                  {lang === 'es' && "Fuentes de Datos Conectadas"}
                  {lang === 'en' && "Connected Data Sources"}
                  {lang === 'fr' && "Sources de Données Connectées"}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Sansys Pay</span>
                    <span className="ml-auto text-xs text-green-600">Online</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Sansys Water</span>
                    <span className="ml-auto text-xs text-green-600">Online</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Sansys Smart Meter</span>
                    <span className="ml-auto text-xs text-green-600">Online</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">ERP Legado</span>
                    <span className="ml-auto text-xs text-blue-600">Sync...</span>
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
            {lang === 'fr' && "Caractéristiques Principales"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {module.features[lang].map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ====================================
          SEÇÃO EXCLUSIVA: KPIs E INDICADORES
          Apenas no Sansys BI
          ==================================== */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-6 font-extralight text-white">{customContent.kpiTracking[lang]}</h2>
            <p className="text-white/90 text-xl mb-12 leading-relaxed">
              {lang === 'pt' && "Mais de 150 indicadores pré-configurados específicos para saneamento"}
              {lang === 'es' && "Más de 150 indicadores preconfigurados específicos para saneamento"}
              {lang === 'en' && "Over 150 pre-configured indicators specific to sanitation"}
              {lang === 'fr' && "Plus de 150 indicateurs préconfigurés spécifiques à l'assainissement"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <BarChart3 className="w-10 h-10 mb-3 mx-auto" />
                <h4 className="mb-2">
                  {lang === 'pt' && "Financeiros"}
                  {lang === 'es' && "Financieros"}
                  {lang === 'en' && "Financial"}
                  {lang === 'fr' && "Financiers"}
                </h4>
                <p className="text-white/70 text-sm">
                  {lang === 'pt' && "Receita, inadimplência, DRE"}
                  {lang === 'es' && "Ingresos, morosidad, DRE"}
                  {lang === 'en' && "Revenue, delinquency, P&L"}
                  {lang === 'fr' && "Revenus, impayés, compte de résultat"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <TrendingUp className="w-10 h-10 mb-3 mx-auto" />
                <h4 className="mb-2">
                  {lang === 'pt' && "Operacionais"}
                  {lang === 'es' && "Operacionales"}
                  {lang === 'en' && "Operational"}
                  {lang === 'fr' && "Opérationnels"}
                </h4>
                <p className="text-white/70 text-sm">
                  {lang === 'pt' && "Perdas, eficiência, vazamentos"}
                  {lang === 'es' && "Pérdidas, eficiencia, fugas"}
                  {lang === 'en' && "Losses, efficiency, leaks"}
                  {lang === 'fr' && "Pertes, efficacité, fuites"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Activity className="w-10 h-10 mb-3 mx-auto" />
                <h4 className="mb-2">
                  {lang === 'pt' && "Comerciais"}
                  {lang === 'es' && "Comerciales"}
                  {lang === 'en' && "Commercial"}
                  {lang === 'fr' && "Commerciaux"}
                </h4>
                <p className="text-white/70 text-sm">
                  {lang === 'pt' && "Faturamento, consumo, clientes"}
                  {lang === 'es' && "Facturación, consumo, clientes"}
                  {lang === 'en' && "Billing, consumption, customers"}
                  {lang === 'fr' && "Facturation, consommation, clients"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <PieChart className="w-10 h-10 mb-3 mx-auto" />
                <h4 className="mb-2">
                  {lang === 'pt' && "Regulatórios"}
                  {lang === 'es' && "Regulatorios"}
                  {lang === 'en' && "Regulatory"}
                  {lang === 'fr' && "Réglementaires"}
                </h4>
                <p className="text-white/70 text-sm">
                  {lang === 'pt' && "SNIS, ANA, agências"}
                  {lang === 'es' && "SNIS, ANA, agencias"}
                  {lang === 'en' && "SNIS, ANA, agencies"}
                  {lang === 'fr' && "SNIS, ANA, agences"}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-purple-600 hover:bg-gray-100 border-white"
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
            {module.applications[lang].map((app, index) => (
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
              {lang === 'pt' && "Transforme dados em decisões inteligentes"}
              {lang === 'es' && "Transforme datos en decisiones inteligentes"}
              {lang === 'en' && "Transform data into intelligent decisions"}
              {lang === 'fr' && "Transformez données en décisions intelligentes"}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {lang === 'pt' && "Fale com nossos especialistas e descubra como o Sansys BI pode otimizar sua gestão"}
              {lang === 'es' && "Hable con nuestros especialistas y descubra cómo Sansys BI puede optimizar su gestión"}
              {lang === 'en' && "Talk to our specialists and discover how Sansys BI can optimize your management"}
              {lang === 'fr' && "Parlez à nos spécialistes et découvrez comment Sansys BI peut optimiser votre gestion"}
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
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        lang={lang}
      />
    </>
  )
}