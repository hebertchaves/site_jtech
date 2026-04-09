import { useState } from "react"
import { Plus } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { getRoute } from "../lib/routes"
import { ebooks, Ebook } from "../data/ebooks"
import { Hero } from "../components/sections/Hero"
import { Container } from "../components/layout/Container"
import { submitLead } from "../lib/leads"
import { trackFormSubmit } from "../lib/analytics"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { ScrollToTop } from "../components/ScrollToTop"

function ImageWithFallback(props: any) {
  const [currentSrc, setCurrentSrc] = useState(props.src)
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  const handleError = () => {
    // Se a imagem atual é .webp, tentar .png
    if (currentSrc.endsWith('.webp')) {
      const pngSrc = currentSrc.replace(/\.webp$/, '.png')
      setCurrentSrc(pngSrc)
    } else {
      // Se já tentou .png ou não é webp, mostrar placeholder
      setDidError(true)
    }
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={currentSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}

interface EbooksPageProps {
  lang: Lang
}

export function EbooksPage({ lang }: EbooksPageProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(false)

  const navigateToEbook = (slug: string) => {
    const detailRoute = getRoute("ebookDetail", lang, { slug })
    window.location.hash = `#/${lang}${detailRoute}`
  }

  const handleDownload = (ebook: Ebook) => {
    setSelectedEbook(ebook)
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitLead(
        {
          name: formData.name,
          email: formData.email,
          form_type: "ebook",
          product_interest: selectedEbook?.title[lang],
        },
        lang
      )

      trackFormSubmit("ebook", "Ebook Download Form")
      
      alert(`Download iniciado: ${selectedEbook?.title[lang]}`)
      
      setModalOpen(false)
      setFormData({ name: "", email: "" })
    } catch (error) {
      console.error("Error submitting ebook form:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ====================================
          HERO SECTION
          Banner principal da página de E-books
          ==================================== */}
      <Hero
        title={t(lang, "content.ebooks.title")}
        subtitle="Recursos gratuitos para transformar seu conhecimento"
        dark
        image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600"
        imageAlt="Biblioteca com livros organizados representando conhecimento e recursos educacionais"
      />

      {/* ====================================
          EBOOKS GRID SECTION
          Grid de e-books disponíveis para download
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ebooks.map((ebook, idx) => {
              return (
                <div key={ebook.id || idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={ebook.thumbnailImage || ebook.image}
                      alt={typeof ebook.title === 'object' ? ebook.title[lang] : ebook.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg mb-4 min-h-[60px]">
                      {typeof ebook.title === 'object' ? ebook.title[lang] : ebook.title}
                    </h4>
                    <Button className="w-full bg-[#E30613] hover:bg-[#C10511]" onClick={() => navigateToEbook(ebook.slug)}>
                      {t(lang, "content.ebooks.download")} <Plus className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download E-book</DialogTitle>
            <DialogDescription>
              Preencha seus dados para fazer o download de "{selectedEbook?.title[lang]}"
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t(lang, "common.loading") : t(lang, "common.download")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}