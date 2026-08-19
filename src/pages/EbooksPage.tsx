import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { getRoute } from "../lib/routes"
import { Ebook } from "../data/ebooks"
import { Hero } from "../components/sections/Hero"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { ScrollToTop } from "../components/ScrollToTop"
import { getContentProvider } from "../providers"

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
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [ebooksLoading, setEbooksLoading] = useState(true)

  useEffect(() => {
    const provider = getContentProvider()
    provider.getEbooks(lang)
      .then(setEbooks)
      .catch((err) => {
        console.error('Error fetching ebooks:', err)
        setEbooks([])
      })
      .finally(() => setEbooksLoading(false))
  }, [lang])

  const navigateToEbook = (slug: string) => {
    const detailRoute = getRoute("ebookDetail", lang, { slug })
    window.location.hash = `#/${lang}${detailRoute}`
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
          {ebooksLoading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E30613]"></div>
            </div>
          ) : ebooks.length === 0 ? (
            <p className="text-center text-gray-500 py-16">Nenhum e-book disponível no momento.</p>
          ) : (
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
          )}
        </Container>
      </section>


      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}