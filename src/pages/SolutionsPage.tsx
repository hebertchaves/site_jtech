import { useState, useEffect, useRef } from "react"
import { Play, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { PreWhatsAppModal } from "../components/forms/PreWhatsAppModal"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { calculateBannerOffset } from "../lib/banner-alignment"
import { ScrollToTop } from "../components/ScrollToTop"
import { motion, AnimatePresence } from "motion/react"

interface SolutionsPageProps {
  lang: Lang
}

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

export function SolutionsPage({ lang }: SolutionsPageProps) {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  const [moduloIndex, setModuloIndex] = useState(0)
  const [bannerOffset, setBannerOffset] = useState(0)
  const [productIndex, setProductIndex] = useState(0)

  // Calcular o offset do logo no header para alinhar o título
  useEffect(() => {
    const updateOffset = () => {
      setBannerOffset(calculateBannerOffset())
    }

    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  // Dados dos produtos
  const produtos = [
    {
      slug: "sansys-water",
      name: "sansys water",
      title: t(lang, "solutions.water.title"),
      description: t(lang, "solutions.water.description"),
      badges: [
        t(lang, "solutions.badge.specialized"),
        t(lang, "solutions.badge.integration"),
        t(lang, "solutions.badge.saas"),
        t(lang, "solutions.badge.multiplatform"),
      ],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
      link: "/sansys-water",
    },
    {
      slug: "sansys-pay",
      name: "sansys pay",
      title: t(lang, "solutions.pay.title"),
      description: t(lang, "solutions.pay.description"),
      badges: [
        t(lang, "solutions.pay.badge1"),
        t(lang, "solutions.pay.badge2"),
        t(lang, "solutions.pay.badge3"),
        t(lang, "solutions.pay.badge4"),
      ],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
      link: "/sansys-pay",
    },
    {
      slug: "sansys-waste",
      name: "sansys waste",
      title: t(lang, "solutions.waste.title"),
      description: t(lang, "solutions.waste.description"),
      badges: [
        t(lang, "solutions.waste.badge1"),
        t(lang, "solutions.waste.badge2"),
        t(lang, "solutions.waste.badge3"),
        t(lang, "solutions.waste.badge4"),
      ],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
      link: "/sansys-waste",
    },
    {
      slug: "sansys-agency",
      name: "sansys agency",
      title: t(lang, "solutions.agency.title"),
      description: t(lang, "solutions.agency.description"),
      badges: [
        t(lang, "solutions.agency.badge1"),
        t(lang, "solutions.agency.badge2"),
        t(lang, "solutions.agency.badge3"),
        t(lang, "solutions.agency.badge4"),
      ],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
      link: "/sansys-agency",
    },
    {
      slug: "sansys-hub",
      name: "sansys hub",
      title: t(lang, "solutions.hub.title"),
      description: t(lang, "solutions.hub.description"),
      badges: [
        t(lang, "solutions.hub.badge1"),
        t(lang, "solutions.hub.badge2"),
        t(lang, "solutions.hub.badge3"),
        t(lang, "solutions.hub.badge4"),
      ],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
      link: "/sansys-hub",
    },
    {
      slug: "sansys-flow",
      name: "sansys flow",
      title: t(lang, "solutions.flow.title"),
      description: t(lang, "solutions.flow.description"),
      badges: [
        t(lang, "solutions.flow.badge1"),
        t(lang, "solutions.flow.badge2"),
        t(lang, "solutions.flow.badge3"),
        t(lang, "solutions.flow.badge4"),
      ],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
      link: "/sansys-flow",
    },
    {
      slug: "sansys-reader",
      name: "sansys reader",
      title: t(lang, "solutions.reader.title"),
      description: t(lang, "solutions.reader.description"),
      badges: [
        t(lang, "solutions.reader.badge1"),
        t(lang, "solutions.reader.badge2"),
        t(lang, "solutions.reader.badge3"),
        t(lang, "solutions.reader.badge4"),
      ],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
      link: "/sansys-reader",
    },
    {
      slug: "sansys-gis",
      name: "sansys gis",
      title: t(lang, "solutions.gis.title"),
      description: t(lang, "solutions.gis.description"),
      badges: [
        t(lang, "solutions.gis.badge1"),
        t(lang, "solutions.gis.badge2"),
        t(lang, "solutions.gis.badge3"),
        t(lang, "solutions.gis.badge4"),
      ],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
      link: "/sansys-gis",
    },
  ]

  const badges = [
    t(lang, "solutions.badge.specialized"),
    t(lang, "solutions.badge.integration"),
    t(lang, "solutions.badge.saas"),
    t(lang, "solutions.badge.multiplatform"),
  ]

  const diferenciais = [
    t(lang, "solutions.differentials.item1"),
    t(lang, "solutions.differentials.item2"),
    t(lang, "solutions.differentials.item3"),
    t(lang, "solutions.differentials.item4"),
    t(lang, "solutions.differentials.item5"),
  ]

  const modulos = [
    {
      slug: "sansys-smart-meter",
      title: t(lang, "solutions.module.smartmeter.title"),
      text: t(lang, "solutions.module.smartmeter.text"),
      image: "https://conteudo.sansys.app/site/img/jtech-modulos-smart-meter.webp",
    },
    {
      slug: "sansys-omnichannel",
      title: t(lang, "solutions.module.omnichannel.title"),
      text: t(lang, "solutions.module.omnichannel.text"),
      image: "https://conteudo.sansys.app/site/img/jtech-modulos-omnichannel.webp",
    },
    {
      slug: "sansys-bi",
      title: t(lang, "solutions.module.bi.title"),
      text: t(lang, "solutions.module.bi.text"),
      image: "https://conteudo.sansys.app/site/img/jtech-modulos-business-intelligence.webp",
    },
    {
      slug: "sansys-antifraude",
      title: t(lang, "solutions.module.antifraude.title"),
      text: t(lang, "solutions.module.antifraude.text"),
      image: "https://conteudo.sansys.app/site/img/jtech-modulos-antifraude.webp",
    },
    {
      slug: "sansys-critica-leitura",
      title: t(lang, "solutions.module.criticaleitura.title"),
      text: t(lang, "solutions.module.criticaleitura.text"),
      image: "https://conteudo.sansys.app/site/img/jtech-modulos-critica-leitura.webp",
    },
  ]

  const nextModulo = () => {
    setModuloIndex((prev) => (prev + 1) % modulos.length)
  }

  const prevModulo = () => {
    setModuloIndex((prev) => (prev - 1 + modulos.length) % modulos.length)
  }

  const nextProduct = () => {
    setProductIndex((prev) => (prev + 1) % produtos.length)
  }

  const prevProduct = () => {
    setProductIndex((prev) => (prev - 1 + produtos.length) % produtos.length)
  }

  // Touch swipe handling para mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      nextProduct()
    }
    if (isRightSwipe) {
      prevProduct()
    }
    
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Scroll programático ao mudar produto em mobile
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.carousel-card')?.clientWidth || 0
      const gap = 16 // gap-4 = 16px
      carouselRef.current.scrollTo({
        left: productIndex * (cardWidth + gap),
        behavior: 'smooth'
      })
    }
  }, [productIndex])

  // Adicionar key para forçar animação ao trocar produto
  const productKey = `product-${productIndex}`

  // Auto-play para o carrossel de módulos
  useEffect(() => {
    const interval = setInterval(() => {
      setModuloIndex((prev) => (prev + 1) % modulos.length)
    }, 5000) // Troca a cada 5 segundos

    return () => clearInterval(interval)
  }, [modulos.length])

  // Calcular quais módulos mostrar (4 por vez)
  const getVisibleModulos = () => {
    const startIndex = moduloIndex
    const visibleModulos = []
    for (let i = 0; i < 4; i++) {
      const index = (startIndex + i) % modulos.length
      visibleModulos.push({ ...modulos[index], originalIndex: index })
    }
    return visibleModulos
  }

  return (
    <>
      {/* ====================================
          HERO SECTION
          Banner principal da página de Soluções
          ==================================== */}
      <section 
        className="relative bg-[#0B0B0B] text-white pt-32 pb-20 min-h-[500px] flex items-center"
        style={{
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-solucoes-tecnologia-desenvolvimento-software-saneamento.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Profissionais trabalhando com tecnologia em ambiente corporativo moderno"
      >
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/0"></div>
        
        {/* Container principal */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
            <div className="max-w-2xl">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white font-extralight [&>strong]:font-bold [&>span]:font-extralight"
                dangerouslySetInnerHTML={{ __html: t(lang, "solutions.hero.title") }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          PRODUCTS CAROUSEL SECTION
          Carrossel de produtos Sansys com detalhes
          ==================================== */}
      <section 
        className="py-22 bg-white relative min-h-[700px]"
        style={{
          backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-solucoes-saneamento.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        role="img"
        aria-label="Fundo abstrato com elementos gráficos suaves representando tecnologia e inovação"
      >
        <Container>
          {/* Desktop: Layout flexbox com setas | Mobile: Swipe com peek */}
          <div className="relative">
            {/* Setas - Apenas desktop (lg+) */}
            <button
              onClick={prevProduct}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group bg-white cursor-pointer z-10 shadow-md"
              aria-label="Produto anterior"
            >
              <ChevronLeft className="h-6 w-6 text-[#E30613] group-hover:text-white" />
            </button>

            <button
              onClick={nextProduct}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group bg-white cursor-pointer z-10 shadow-md"
              aria-label="Próximo produto"
            >
              <ChevronRight className="h-6 w-6 text-[#E30613] group-hover:text-white" />
            </button>

            {/* Container do carrossel - com overflow em mobile */}
            <div className="overflow-visible">
              {/* Mobile: Container scrollável com peek */}
              <div className="lg:hidden relative">
                {/* Setas mobile - pequenas e discretas */}
                <button
                  onClick={prevProduct}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-10 shadow-md"
                  aria-label="Produto anterior"
                >
                  <ChevronLeft className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                </button>

                <button
                  onClick={nextProduct}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-10 shadow-md"
                  aria-label="Próximo produto"
                >
                  <ChevronRight className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                </button>

                <div 
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1"
                  style={{
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  ref={carouselRef}
                >
                  {produtos.map((produto, idx) => (
                    <div
                      key={idx}
                      className={`carousel-card flex-none w-[85vw] snap-center transition-all duration-300 ${
                        idx === productIndex ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                      }`}
                      onClick={() => setProductIndex(idx)}
                    >
                      <div className="p-6 rounded-lg h-full">
                        <div className="mb-4">
                          <ImageWithFallback
                            src={`https://conteudo.sansys.app/site/img/jtech-${produto.slug}.webp`}
                            alt={`Logo ${produto.name}`}
                            className="h-10 w-auto"
                          />
                        </div>

                        <h3 className="text-xl mb-3">{produto.title}</h3>

                        <p className="text-gray-700 text-base mb-4 leading-relaxed line-clamp-4">
                          {produto.description}
                        </p>

                        <div className="mb-4">
                          <ImageWithFallback
                            src={produto.image}
                            alt={produto.title}
                            className="w-full rounded-lg aspect-video object-contain"
                            style={{ transform: 'scale(1.3)' }}
                          />
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {produto.badges.slice(0, 3).map((badge, badgeIdx) => (
                            <span
                              key={badgeIdx}
                              className="bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* Botões mobile compactos */}
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white w-full"
                            onClick={() => setWhatsappModalOpen(true)}
                          >
                            {t(lang, "solutions.cta.practice")}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#E30613] hover:bg-[#C10511] flex items-center justify-center gap-2 w-full"
                            onClick={() => {
                              const productSlug = produto.slug
                              const solutionsPath = lang === 'pt' ? 'solucoes' : lang === 'es' ? 'soluciones' : lang === 'fr' ? 'solutions' : 'solutions'
                              window.location.hash = `#/${lang}/${solutionsPath}/${productSlug}`
                            }}
                          >
                            {t(lang, "solutions.cta.know")} <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Grid layout original */}
              <div 
                key={productKey}
                className="hidden lg:block animate-fade-in p-8 rounded-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-6">
                  <div className="animate-slide-in-left">
                    <div className="mb-6">
                      <ImageWithFallback
                        src={`https://conteudo.sansys.app/site/img/jtech-${produtos[productIndex].slug}.webp`}
                        alt={`Logo ${produtos[productIndex].name}`}
                        className="h-20 w-auto"
                      />
                    </div>

                    <h3 className="text-2xl mb-4">{produtos[productIndex].title}</h3>

                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                      {produtos[productIndex].description}
                    </p>

                    {/* Badges e botão de vídeo no mesmo container */}
                    <div className="flex flex-wrap gap-3">
                      {produtos[productIndex].badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                      <button className="bg-gray-700 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
                        <Play className="h-4 w-4" />
                        {t(lang, "solutions.video.demo")}
                      </button>
                    </div>
                  </div>

                  <div className="animate-slide-in-right">
                    <ImageWithFallback
                      src={produtos[productIndex].image}
                      alt={produtos[productIndex].title}
                      className="w-full rounded-lg aspect-video object-contain"
                      style={{ transform: 'scale(1.3)' }}
                    />
                  </div>
                </div>

                {/* Botões centralizados em uma row abaixo */}
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    className="border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white min-w-[200px]"
                    onClick={() => setWhatsappModalOpen(true)}
                  >
                    {t(lang, "solutions.cta.practice")}
                  </Button>
                  <Button
                    className="bg-[#E30613] hover:bg-[#C10511] flex items-center gap-2 min-w-[200px]"
                    onClick={() => {
                      const productSlug = produtos[productIndex].slug
                      const solutionsPath = lang === 'pt' ? 'solucoes' : lang === 'es' ? 'soluciones' : lang === 'fr' ? 'solutions' : 'solutions'
                      window.location.hash = `#/${lang}/${solutionsPath}/${productSlug}`
                    }}
                  >
                    {t(lang, "solutions.cta.know")} <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicadores de posição */}
          <div className="flex justify-center gap-2 mt-8">
            {produtos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setProductIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === productIndex ? "bg-[#E30613] w-8" : "bg-gray-300"
                }`}
                aria-label={`Ir para produto ${idx + 1}`}
              />
            ))}
          </div>
        </Container>

        {/* Estilos de animação inline */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
          }
          
          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out;
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.6s ease-out;
          }

          /* Esconder scrollbar mas manter funcionalidade */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          /* Line clamp para texto truncado */
          .line-clamp-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </section>

      {/* DIFERENCIAIS */}
      <section 
        className="pt-16 bg-[#0B0B0B] text-white relative"
        style={{
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingBottom: "240px", // Estende background até a metade dos cards (164px do -mt + 76px adicional)
        }}
        role="img"
        aria-label="Fundo abstrato escuro com padrões geométricos representando diferenciais tecnológicos"
      >
        <Container className="pb-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Título com linha decorativa */}
              <div className="mb-8">
                <h2 className="text-white font-extralight">{t(lang, "solutions.differentials.title")}</h2>
                <div className="h-[2px] bg-[#E30613] w-[80px]"></div>
              </div>

              <ul className="space-y-6">
                {diferenciais.map((diferencial, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-[#E30613] text-2xl flex-shrink-0">•</span>
                    <p className="text-gray-300 leading-relaxed">
                      {diferencial}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ImageWithFallback
                src="https://conteudo.sansys.app/site/img/sansys-water-interface-gestao-comercial-operacional-saneamento.webp"
                alt={t(lang, "solutions.image.screenshots")}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          MODULES SECTION
          Principais módulos do sistema
          ==================================== */}
      <section className="bg-white relative -mt-[164px]">
        <Container>
          <h2 className="mb-12 text-center font-extralight pt-16" dangerouslySetInnerHTML={{ __html: t(lang, "solutions.modules.title") }} />

          <div className="relative pb-24">
            <div className="flex items-center justify-center gap-4">
              {/* Botões Desktop */}
              <button
                onClick={prevModulo}
                className="hidden lg:flex w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group flex-shrink-0 z-30 bg-white shadow-md"
                aria-label={t(lang, "solutions.module.prev")}
              >
                <ChevronLeft className="h-6 w-6 text-[#E30613] group-hover:text-white transition-colors" />
              </button>

              <div className="relative w-full overflow-visible py-4" style={{ maxWidth: '1200px', minHeight: '380px' }}>
                {/* Botões Mobile - pequenos e discretos */}
                <button
                  onClick={prevModulo}
                  className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-30 shadow-md"
                  aria-label={t(lang, "solutions.module.prev")}
                >
                  <ChevronLeft className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                </button>

                <button
                  onClick={nextModulo}
                  className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-30 shadow-md"
                  aria-label={t(lang, "solutions.module.next")}
                >
                  <ChevronRight className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                </button>

                <motion.div
                  key={moduloIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="flex gap-6 relative z-20"
                >
                  {getVisibleModulos().map((modulo, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        const solutionsPath = lang === 'pt' ? 'solucoes' : lang === 'es' ? 'soluciones' : lang === 'fr' ? 'solutions' : 'solutions'
                        window.location.hash = `#/${lang}/${solutionsPath}/${modulo.slug}`
                      }}
                      className="bg-white rounded-lg overflow-hidden border-2 border-gray-200 transition-all cursor-pointer hover:shadow-xl hover:bg-[#f5f5f5] hover:-translate-y-2 flex-shrink-0"
                      style={{ width: 'calc((100% - 72px) / 4)', minWidth: '250px' }}
                    >
                      <div className="relative overflow-hidden" style={{ height: '160px' }}>
                        <ImageWithFallback
                          src={modulo.image}
                          alt={modulo.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg mb-2 font-medium">{modulo.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{modulo.text}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <button
                onClick={nextModulo}
                className="hidden lg:flex w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group flex-shrink-0 z-30 bg-white shadow-md"
                aria-label={t(lang, "solutions.module.next")}
              >
                <ChevronRight className="h-6 w-6 text-[#E30613] group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA FINAL - Background começa exatamente onde os cards são divididos */}
      <section
        className="pb-20 text-white relative -mt-[299px] z-10"
        style={{
          backgroundColor: "#0B0B0B",
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-contato-suporte-atendimento-cliente-saneamento.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        role="img"
        aria-label="Fundo com elementos gráficos tecnológicos para call-to-action de contato sobre soluções Sansys"
      >
        <Container className="relative z-10 pt-[267px]">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="mb-6 font-extralight text-white [&>strong]:font-bold" dangerouslySetInnerHTML={{ __html: t(lang, "solutions.cta.final.title") }} />
            <Button
              size="lg"
              className="bg-[#E30613] hover:bg-[#C10511]"
              onClick={() => setWhatsappModalOpen(true)}
            >
              {t(lang, "solutions.cta.final.button")}
            </Button>
          </div>
        </Container>
      </section>

      <PreWhatsAppModal
        lang={lang}
        open={whatsappModalOpen}
        onOpenChange={setWhatsappModalOpen}
      />

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}