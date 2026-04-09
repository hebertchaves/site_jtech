import { useState, useEffect } from "react"
import { MapPin, ThumbsUp, TrendingUp, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Lang, t } from "../lib/i18n"
import { submitLead } from "../lib/leads"
import { trackFormSubmit } from "../lib/analytics"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Checkbox } from "../components/ui/checkbox"
import { calculateBannerOffset } from "../lib/banner-alignment"
import { ScrollToTop } from "../components/ScrollToTop"

interface ContactPageProps {
  lang: Lang
}

type ContactReason = "customer" | "sales" | "other" | null

export function ContactPage({ lang }: ContactPageProps) {
  const [selectedReason, setSelectedReason] = useState<ContactReason>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    acceptPrivacy: false,
  })
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [bannerOffset, setBannerOffset] = useState(0)

  // Calcular o offset do logo no header para alinhar o título
  useEffect(() => {
    const updateOffset = () => {
      setBannerOffset(calculateBannerOffset())
    }

    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptPrivacy) {
      alert(t(lang, "contact.form.privacy.required"))
      return
    }

    if (loading) return
    setLoading(true)
    setSuccessMsg(null)

    try {
      const res = await submitLead(
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `[${selectedReason}] ${formData.message}`,
          form_type: "contact",
          form_name: `contact_${selectedReason}`,
        },
        lang
      )

      if (!res.success) {
        alert(res.error || t(lang, "contact.error"))
        return
      }

      trackFormSubmit("contact", `contact_${selectedReason}`)

      setSuccessMsg(t(lang, "contact.success"))

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        acceptPrivacy: false,
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      alert(t(lang, "contact.error"))
    } finally {
      setLoading(false)
    }
  }

  const reasonOptions = [
    {
      value: "customer" as ContactReason,
      icon: ThumbsUp,
      title: t(lang, "contact.reason.customer"),
      subtitle: t(lang, "contact.reason.customer.subtitle"),
    },
    {
      value: "sales" as ContactReason,
      icon: TrendingUp,
      title: t(lang, "contact.reason.sales"),
      subtitle: t(lang, "contact.reason.sales.subtitle"),
    },
    {
      value: "other" as ContactReason,
      icon: MessageCircle,
      title: t(lang, "contact.reason.other"),
      subtitle: t(lang, "contact.reason.other.subtitle"),
    },
  ]

  return (
    <>
      {/* ====================================
          HERO SECTION
          Banner de contato
          ==================================== */}
      <section
        className="relative bg-[#0B0B0B] text-white pt-32 pb-20 min-h-[500px] flex items-center"
        style={{
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-contato-suporte-atendimento-cliente-saneamento.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Fundo tecnológico representando suporte, atendimento ao cliente e comunicação no setor de saneamento"
      >
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/0"></div>

        {/* Container principal */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
            <div className="max-w-2xl">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white"
                dangerouslySetInnerHTML={{ __html: t(lang, "contact.hero.title") }}
              />
              <p 
                className="text-base md:text-lg text-white"
                dangerouslySetInnerHTML={{ __html: t(lang, "contact.hero.subtitle") }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          CONTACT FORM SECTION
          Formulário de contato com seleção de motivo
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="inline-block mb-0">
              <h2 className="mb-0 text-center font-extralight">
                {t(lang, "contact.form.intro")}{" "}
                <strong>{t(lang, "contact.form.intro.cta")}</strong>
              </h2>
              <div className="h-[2px] bg-[#E30613] w-[35%] mx-auto"></div>
            </div>

            <h3 className="text-2xl text-center mb-12 text-gray-700" style={{ marginTop: '3rem' }}>
              {t(lang, "contact.reason.select")}
            </h3>

            {/* Cards de motivo - sempre visíveis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {reasonOptions.map((option) => {
                const Icon = option.icon
                const isSelected = selectedReason === option.value
                const isOtherSelected = selectedReason && selectedReason !== option.value
                
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedReason(option.value)}
                    className={`
                      bg-gray-50 border-2 rounded-lg p-6 transition-all text-left
                      ${isSelected 
                        ? 'border-[#E30613] shadow-lg opacity-100' 
                        : 'border-gray-200 hover:border-[#E30613] hover:shadow-lg'
                      }
                      ${isOtherSelected ? 'opacity-40 hover:opacity-100' : 'opacity-100'}
                    `}
                  >
                    <Icon className="h-10 w-10 text-[#E30613] mb-4" />
                    <h3 className="text-xl mb-2">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.subtitle}</p>
                  </button>
                )
              })}
            </div>

            {/* Formulário - aparece abaixo dos cards quando algum é selecionado */}
            <AnimatePresence mode="wait">
              {selectedReason && (
                <motion.div
                  key={selectedReason} // Força re-render quando muda a seleção
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* Header contextual mostrando o tipo de contato selecionado */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-[#E30613]">
                    <div className="flex items-center gap-3">
                      {selectedReason === "customer" && <ThumbsUp className="h-5 w-5 text-[#E30613]" />}
                      {selectedReason === "sales" && <TrendingUp className="h-5 w-5 text-[#E30613]" />}
                      {selectedReason === "other" && <MessageCircle className="h-5 w-5 text-[#E30613]" />}
                      <div>
                        <p className="text-sm text-gray-600">
                          {t(lang, "contact.form.sending.to")}
                        </p>
                        <p className="font-medium text-gray-900">
                          {selectedReason === "customer" && t(lang, "contact.reason.customer")}
                          {selectedReason === "sales" && t(lang, "contact.reason.sales")}
                          {selectedReason === "other" && t(lang, "contact.reason.other")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                    <div>
                      <Input
                        placeholder={t(lang, "contact.form.name")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder={t(lang, "contact.form.email")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        placeholder={t(lang, "contact.form.company")}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Textarea
                        placeholder={t(lang, "contact.form.message")}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="privacy"
                        checked={formData.acceptPrivacy}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, acceptPrivacy: checked as boolean })
                        }
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
                        {t(lang, "contact.form.privacy.text")}{" "}
                        <a
                          href={`#/${lang}/politica-de-privacidade`}
                          className="text-[#E30613] underline"
                        >
                          {t(lang, "contact.form.privacy.link")}
                        </a>
                        .
                      </label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#0B0B0B] hover:bg-gray-900"
                      disabled={loading}
                    >
                      {loading ? t(lang, "contact.form.sending") : t(lang, "contact.form.submit")}
                    </Button>

                    {successMsg && (
                      <p className="text-center text-green-600">{successMsg}</p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Endereço - sempre visível */}
            <div className="bg-gray-50 rounded-lg p-6 flex items-start gap-4">
              <MapPin className="h-6 w-6 text-[#E30613] flex-shrink-0 mt-1" />
              <p className="text-gray-700" style={{ whiteSpace: 'pre-line' }}>
                {t(lang, "contact.address.full")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}