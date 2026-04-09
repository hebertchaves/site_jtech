import { useState } from "react"
import { ArrowRight, CheckCircle, CreditCard, Smartphone, Banknote, BarChart3, Shield, Users } from "lucide-react"
import { Lang, t } from "../../lib/i18n"
import { getProductBySlug } from "../../data/products"
import { Hero } from "../../components/sections/Hero"
import { PreWhatsAppModal } from "../../components/forms/PreWhatsAppModal"
import { Container } from "../../components/layout/Container"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ScrollToTop } from "../../components/ScrollToTop"
import { LogoBySlug } from "../../components/logos"

interface SansysPayPageProps {
  lang: Lang
}

/**
 * PÁGINA CUSTOMIZADA: SANSYS PAY
 * 
 * Esta página tem seções exclusivas que não aparecem em outros produtos:
 * - Seção de Canais de Pagamento (PIX, Boleto, Cartão)
 * - Seção de Integração Bancária
 * - Seção de ROI e Redução de Inadimplência
 * - Portal do Cliente com screenshot
 */
export function SansysPayPage({ lang }: SansysPayPageProps) {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  
  const product = getProductBySlug("sansys-pay")
  
  if (!product) {
    return (
      <Container className="py-20">
        <h1 className="text-3xl mb-4">Produto não encontrado</h1>
      </Container>
    )
  }

  // Conteúdo customizado por idioma
  const customContent = {
    paymentChannels: {
      pt: "Canais de Pagamento",
      es: "Canales de Pago",
      en: "Payment Channels",
      fr: "Canaux de Paiement",
    },
    paymentChannelsDesc: {
      pt: "Ofereça múltiplas formas de pagamento para seus clientes",
      es: "Ofrezca múltiples formas de pago a sus clientes",
      en: "Offer multiple payment methods to your customers",
      fr: "Offrez plusieurs méthodes de paiement à vos clients",
    },
    bankingIntegration: {
      pt: "Integração Bancária",
      es: "Integración Bancaria",
      en: "Banking Integration",
      fr: "Intégration Bancaire",
    },
    bankingIntegrationDesc: {
      pt: "Conecte-se automaticamente com os principais bancos brasileiros para conciliação bancária em tempo real",
      es: "Conéctese automáticamente con los principales bancos brasileños para conciliación bancaria en tempo real",
      en: "Automatically connect with major Brazilian banks for real-time bank reconciliation",
      fr: "Connectez-vous automatiquement aux principales banques brésiliennes pour un rapprochement bancaire en temps réel",
    },
    roiTitle: {
      pt: "Redução de Inadimplência",
      es: "Reducción de Morosidad",
      en: "Delinquency Reduction",
      fr: "Réduction des Impayés",
    },
    roiDesc: {
      pt: "Empresas que adotaram o Sansys Pay reduziram a inadimplência em até 35% no primeiro ano",
      es: "Empresas que adoptaron Sansys Pay redujeron la morosidad hasta un 35% en el primer año",
      en: "Companies that adopted Sansys Pay reduced delinquency by up to 35% in the first year",
      fr: "Les entreprises ayant adopté Sansys Pay ont réduit les impayés jusqu'à 35% la première année",
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
        imageAlt="Dashboard de análise de pagamentos e gestão financeira de serviços de saneamento"
      />

      {/* ====================================
          LOGO + DESCRIÇÃO PRINCIPAL
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex justify-center mb-6">
              <LogoBySlug slug="sansys-pay" className="h-16" />
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
          SEÇÃO EXCLUSIVA: CANAIS DE PAGAMENTO
          Apenas no Sansys Pay
          ==================================== */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="mb-4 text-center font-extralight">{customContent.paymentChannels[lang]}</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            {customContent.paymentChannelsDesc[lang]}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PIX */}
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-[#E30613]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-[#E30613]" />
                </div>
                <h3 className="text-xl mb-3">PIX</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'pt' && "Pagamento instantâneo 24/7 com confirmação automática e conciliação em tempo real"}
                  {lang === 'es' && "Pago instantáneo 24/7 con confirmación automática y conciliación en tempo real"}
                  {lang === 'en' && "24/7 instant payment with automatic confirmation and real-time reconciliation"}
                  {lang === 'fr' && "Paiement instantané 24h/24 avec confirmation automatique et rapprochement en temps réel"}
                </p>
              </CardContent>
            </Card>

            {/* Boleto Bancário */}
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-[#E30613]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Banknote className="w-8 h-8 text-[#E30613]" />
                </div>
                <h3 className="text-xl mb-3">
                  {lang === 'pt' && "Boleto Bancário"}
                  {lang === 'es' && "Boleto Bancario"}
                  {lang === 'en' && "Bank Slip"}
                  {lang === 'fr' && "Bordereau Bancaire"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'pt' && "Emissão automática com código de barras, QR Code e registro eletrônico nos bancos"}
                  {lang === 'es' && "Emisión automática con código de barras, QR Code y registro electrónico en bancos"}
                  {lang === 'en' && "Automatic generation with barcode, QR Code and electronic bank registration"}
                  {lang === 'fr' && "Génération automatique avec code-barres, QR Code et enregistrement bancaire électronique"}
                </p>
              </CardContent>
            </Card>

            {/* Cartão de Crédito/Débito */}
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-[#E30613]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-[#E30613]" />
                </div>
                <h3 className="text-xl mb-3">
                  {lang === 'pt' && "Cartão de Crédito/Débito"}
                  {lang === 'es' && "Tarjeta de Crédito/Débito"}
                  {lang === 'en' && "Credit/Debit Card"}
                  {lang === 'fr' && "Carte de Crédit/Débit"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {lang === 'pt' && "Pagamento recorrente com tokenização segura e parcelamento flexível"}
                  {lang === 'es' && "Pago recurrente con tokenización segura y parcelación flexible"}
                  {lang === 'en' && "Recurring payment with secure tokenization and flexible installments"}
                  {lang === 'fr' && "Paiement récurrent avec tokenisation sécurisée et versements flexibles"}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* ====================================
          CARACTERÍSTICAS PRINCIPAIS
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="mb-12 text-center font-extralight">
            {lang === 'pt' && "Características Principais"}
            {lang === 'es' && "Características Principais"}
            {lang === 'en' && "Main Features"}
            {lang === 'fr' && "Caractéristiques Principales"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features[lang].map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <CheckCircle className="h-6 w-6 text-[#E30613] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ====================================
          SEÇÃO EXCLUSIVA: INTEGRAÇÃO BANCÁRIA
          Apenas no Sansys Pay
          ==================================== */}
      <section className="py-16 bg-[#0B0B0B] text-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 font-extralight text-white">{customContent.bankingIntegration[lang]}</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {customContent.bankingIntegrationDesc[lang]}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#E30613] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">
                      {lang === 'pt' && "Conciliação Automática"}
                      {lang === 'es' && "Conciliación Automática"}
                      {lang === 'en' && "Automatic Reconciliation"}
                      {lang === 'fr' && "Rapprochement Automatique"}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {lang === 'pt' && "Identifique pagamentos em segundos com matching inteligente"}
                      {lang === 'es' && "Identifique pagos en segundos com matching inteligente"}
                      {lang === 'en' && "Identify payments in seconds with intelligent matching"}
                      {lang === 'fr' && "Identifiez les paiements en quelques secondes avec un matching intelligent"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BarChart3 className="w-6 h-6 text-[#E30613] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">
                      {lang === 'pt' && "Relatórios Financeiros"}
                      {lang === 'es' && "Informes Financieros"}
                      {lang === 'en' && "Financial Reports"}
                      {lang === 'fr' && "Rapports Financiers"}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {lang === 'pt' && "Dashboards em tempo real com DRE, fluxo de caixa e análise de recebimentos"}
                      {lang === 'es' && "Dashboards en tiempo real con DRE, flujo de caja y análisis de recaudaciones"}
                      {lang === 'en' && "Real-time dashboards with income statement, cash flow and revenue analysis"}
                      {lang === 'fr' && "Tableaux de bord en temps réel avec compte de résultat, trésorerie et analyse des recettes"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#E30613] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">
                      {lang === 'pt' && "Portal do Cliente"}
                      {lang === 'es' && "Portal del Cliente"}
                      {lang === 'en' && "Customer Portal"}
                      {lang === 'fr' && "Portail Client"}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {lang === 'pt' && "2ª via de fatura, histórico de pagamentos e negociação de débitos"}
                      {lang === 'es' && "2ª copia de factura, historial de pagos y negociación de deudas"}
                      {lang === 'en' && "Duplicate invoice, payment history and debt negotiation"}
                      {lang === 'fr' && "Duplicata de facture, historique des paiements et négociation de dettes"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-8 border border-white/10">
              <div className="aspect-video bg-gradient-to-br from-[#E30613]/20 to-[#E30613]/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-20 h-20 text-[#E30613] mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">
                    {lang === 'pt' && "Interface do sistema bancário"}
                    {lang === 'es' && "Interfaz del sistema bancario"}
                    {lang === 'en' && "Banking system interface"}
                    {lang === 'fr' && "Interface du système bancaire"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          SEÇÃO EXCLUSIVA: ROI / RESULTADOS
          Apenas no Sansys Pay
          ==================================== */}
      <section className="py-16 bg-gradient-to-r from-[#E30613] to-[#c00511] text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="mb-6 font-extralight text-white">{customContent.roiTitle[lang]}</h2>
            <p className="text-white/90 text-xl mb-12 leading-relaxed">
              {customContent.roiDesc[lang]}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-5xl mb-2">35%</div>
                <p className="text-white/80">
                  {lang === 'pt' && "Redução de inadimplência"}
                  {lang === 'es' && "Reducción de morosidad"}
                  {lang === 'en' && "Delinquency reduction"}
                  {lang === 'fr' && "Réduction des impayés"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-5xl mb-2">60%</div>
                <p className="text-white/80">
                  {lang === 'pt' && "Redução de custos operacionais"}
                  {lang === 'es' && "Reducción de costos operacionales"}
                  {lang === 'en' && "Operational cost reduction"}
                  {lang === 'fr' && "Réduction des coûts opérationnels"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-5xl mb-2">24/7</div>
                <p className="text-white/80">
                  {lang === 'pt' && "Disponibilidade de pagamento"}
                  {lang === 'es' && "Disponibilidad de pago"}
                  {lang === 'en' && "Payment availability"}
                  {lang === 'fr' && "Disponibilité de paiement"}
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-[#E30613] hover:bg-gray-100 border-white"
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
      <section className="py-16 bg-gray-50">
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
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6 font-extralight">
              {lang === 'pt' && "Transforme sua gestão de pagamentos"}
              {lang === 'es' && "Transforme su gestión de pagos"}
              {lang === 'en' && "Transform your payment management"}
              {lang === 'fr' && "Transformez votre gestion des paiements"}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {lang === 'pt' && "Fale com nossos especialistas e descubra como o Sansys Pay pode reduzir sua inadimplência"}
              {lang === 'es' && "Hable con nuestros especialistas y descubra cómo Sansys Pay puede reducir su morosidad"}
              {lang === 'en' && "Talk to our specialists and discover how Sansys Pay can reduce your delinquency"}
              {lang === 'fr' && "Parlez à nos spécialistes et découvrez comment Sansys Pay peut réduire vos impayés"}
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