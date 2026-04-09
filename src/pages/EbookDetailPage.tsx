import { useState, useEffect } from "react"
import { Download, FileText, ArrowLeft } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { getRoute } from "../lib/routes"
import { Ebook } from "../data/ebooks"
import { submitLead } from "../lib/leads"
import { trackFormSubmit } from "../lib/analytics"
import { createConsentData, validateConsent } from "../lib/lgpd"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { ScrollToTop } from "../components/ScrollToTop"
import { PreviewBadge } from "../components/PreviewBadge"
import { EbookConsentCheckbox } from "../components/forms/EbookConsentCheckbox"
import { getContentProvider } from "../providers"

interface EbookDetailPageProps {
  lang: Lang
  slug: string
}

export function EbookDetailPage({ lang, slug }: EbookDetailPageProps) {
  const [ebook, setEbook] = useState<Ebook | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPreview, setIsPreview] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [formLoading, setFormLoading] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    const fetchEbook = async () => {
      setLoading(true)
      try {
        const provider = getContentProvider()
        
        // Check if in preview mode
        const previewMode = 'isPreviewMode' in provider && 
                           typeof provider.isPreviewMode === 'function' &&
                           provider.isPreviewMode()
        
        setIsPreview(previewMode)
        
        const data = await provider.getEbookBySlug(lang, slug)
        setEbook(data)
      } catch (error) {
        console.error('Error fetching ebook:', error)
        setEbook(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEbook()
  }, [lang, slug])

  if (loading) {
    return (
      <Container className="py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jtech-red"></div>
        </div>
      </Container>
    )
  }

  if (!ebook) {
    return (
      <Container className="py-20">
        <h1 className="text-3xl mb-4">{t(lang, "common.error")}</h1>
        <p className="text-gray-600">E-book não encontrado.</p>
      </Container>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // ✅ LGPD: Validate consent before submission
    const validation = validateConsent(consentGiven)
    if (!validation.valid) {
      alert(validation.error)
      return
    }
    
    setFormLoading(true)

    try {
      // ✅ LGPD: Create consent data
      const consentData = createConsentData(lang)
      
      // Submit lead with consent information
      await submitLead(
        {
          name: formData.name,
          email: formData.email,
          form_type: "ebook",
          product_interest: ebook.title[lang],
          // ✅ LGPD: Include consent data
          ...consentData,
        },
        lang
      )

      trackFormSubmit("ebook", "Ebook Download Form")
      
      alert(`Download iniciado: ${ebook.title[lang]}`)
      
      setModalOpen(false)
      setFormData({ name: "", email: "" })
      setConsentGiven(false) // Reset consent
    } catch (error) {
      console.error("Error submitting ebook form:", error)
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <>
      {/* Preview Badge */}
      {isPreview && <PreviewBadge />}
      
      {/* ====================================
          EBOOK DETAIL SECTION
          Detalhes completos do e-book
          ==================================== */}
      <div className="pt-32 pb-20">
        <Container>
          {/* Botão voltar */}
          <Button
            variant="ghost"
            onClick={() => {
              const ebooksPath = getRoute("ebooks", lang)
              window.location.hash = `#/${lang}${ebooksPath}`
            }}
            className="p-0 text-[#E30613] hover:text-[#C10511] hover:bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t(lang, "content.ebooks.backtolist")}
          </Button>

          {/* ====================================
              EBOOK INFO SECTION
              Informações e imagem do e-book
              ==================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Ebook Image */}
            <div className="relative h-[600px] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={ebook.heroImage || ebook.image}
                alt={ebook.title[lang]}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ebook Info */}
            <div>
              <h1 className="text-4xl mb-4">{ebook.title[lang]}</h1>
              
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <FileText className="h-5 w-5" />
                <span>{ebook.pages} páginas</span>
              </div>

              <p className="text-2xl text-gray-600 mb-8">{ebook.description[lang]}</p>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <p className="text-gray-700">{ebook.content[lang]}</p>
                </CardContent>
              </Card>

              <Button
                size="lg"
                onClick={() => setModalOpen(true)}
                className="w-full"
              >
                <Download className="mr-2 h-5 w-5" />
                {t(lang, "common.download")}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* ====================================
          DOWNLOAD MODAL
          Modal de captura de lead para download
          ==================================== */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download E-book</DialogTitle>
            <DialogDescription>
              Preencha seus dados para fazer o download de "{ebook.title[lang]}"
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{t(lang, "contact.form.name")} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">{t(lang, "contact.form.email")} *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <EbookConsentCheckbox
              lang={lang}
              checked={consentGiven}
              onCheckedChange={setConsentGiven}
              required={true}
            />

            <Button type="submit" className="w-full" disabled={formLoading}>
              {formLoading ? t(lang, "common.loading") : t(lang, "common.download")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}