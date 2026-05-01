import { useState, useEffect } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Lightbulb, Users, Heart, Shield, Leaf } from "lucide-react"
import { Lang, t, buildPath } from "../lib/i18n"
import { getPostBySlug } from "../data/posts"
import { PreWhatsAppModal } from "../components/forms/PreWhatsAppModal"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { calculateBannerOffset } from "../lib/banner-alignment"
import { ScrollToTop } from "../components/ScrollToTop"
import { LogoBySlug } from "../components/logos"
import { hasVariantSupport } from "../lib/logo-variants"
import { getRoute } from "../lib/routes"

interface HomePageProps {
  lang: Lang
}

// ImageWithFallback component with .webp → .png fallback
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

export default function HomePage({ lang }: HomePageProps) {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
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

  const [productTab, setProductTab] = useState<"produtos" | "modulos">("produtos")
  const [productCarouselIndex, setProductCarouselIndex] = useState(2) // Será ajustado dinamicamente baseado em cloneCount
  const [isTransitioning, setIsTransitioning] = useState(true) // Controla se a transição CSS está ativa
  const [visibleCards, setVisibleCards] = useState(5) // Quantidade de cards visíveis (sempre ímpar)
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null) // Track qual card está em hover
  const [isCentralCardHovered, setIsCentralCardHovered] = useState(false) // Track hover do card central
  const [isAutoPlaying, setIsAutoPlaying] = useState(true) // Controla o autoplay
  const [isMobile, setIsMobile] = useState(false) // Detecta se é mobile

  // Detectar tamanho da tela e ajustar quantidade de cards visíveis
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth
      let newVisibleCards = 5
      const mobile = width < 768
      setIsMobile(mobile)
      
      if (width < 640) { // Mobile
        newVisibleCards = 1
      } else if (width < 1024) { // Tablet
        newVisibleCards = 3
      } else { // Desktop
        newVisibleCards = 5
      }
      
      if (newVisibleCards !== visibleCards) {
        const newCloneCount = Math.floor(newVisibleCards / 2)
        setVisibleCards(newVisibleCards)
        // Resetar índice para o primeiro real sem transição
        setIsTransitioning(false)
        setProductCarouselIndex(newCloneCount)
        requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      }
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [visibleCards])

  const produtos = [
    { name: "Sansys Pay", slug: "sansys-pay" },
    { name: "Sansys Agency", slug: "sansys-agency" },
    { name: "Sansys Flow", slug: "sansys-flow" },
    { name: "Sansys Hub", slug: "sansys-hub" },
    { name: "Sansys Water", slug: "sansys-water" },
    { name: "Sansys Waste", slug: "sansys-waste" },
    { name: "Sansys Reader", slug: "sansys-reader" },
    { name: "Sansys GIS", slug: "sansys-gis" },
  ]

  const modulos = [
    { name: t(lang, "modules.smart_meter"), slug: "sansys-smart-meter" },
    { name: t(lang, "modules.omnichannel"), slug: "sansys-omnichannel" },
    { name: t(lang, "modules.bi"), slug: "sansys-bi" },
    { name: t(lang, "modules.antifraude"), slug: "sansys-antifraude" },
    { name: t(lang, "modules.critica_leitura"), slug: "sansys-critica-leitura" },
  ]

  // Selecionar array baseado na aba ativa
  const currentItems = productTab === "produtos" ? produtos : modulos

  // Calcular quantidade de clones baseado em visibleCards
  const cloneCount = Math.floor(visibleCards / 2)
  
  // Array expandido com clones para loop infinito
  const extendedProdutos = [
    ...currentItems.slice(-cloneCount), // Últimos clones no início
    ...currentItems,                     // Array original
    ...currentItems.slice(0, cloneCount) // Primeiros clones no final
  ]

  const diferenciais = [
    { icon: Lightbulb, title: t(lang, "home.differentials.innovation.title"), text: t(lang, "home.differentials.innovation.text") },
    { icon: Users, title: t(lang, "home.differentials.focus.title"), text: t(lang, "home.differentials.focus.text") },
    { icon: Heart, title: t(lang, "home.differentials.people.title"), text: t(lang, "home.differentials.people.text"), highlighted: true },
    { icon: Shield, title: t(lang, "home.differentials.ethics.title"), text: t(lang, "home.differentials.ethics.text") },
    { icon: Leaf, title: t(lang, "home.differentials.sustainability.title"), text: t(lang, "home.differentials.sustainability.text") },
  ]

  // Alturas variadas para os cards (diferença entre 20px e 50px)
  const cardHeights = [280, 300, 330, 310, 320]

  const metricas = [
    { numero: "+2.5mil", label: t(lang, "home.metrics.users") },
    { numero: "+800", label: t(lang, "home.metrics.resources") },
    { numero: "+350mil", label: t(lang, "home.metrics.revenue") },
    { numero: "+150", label: t(lang, "home.metrics.clients") },
    { numero: "+2.5mil", label: t(lang, "home.metrics.support") },
  ]

  const blogPostSlugs = [
    "inovacao-sustentabilidade-saneamento",
    "inteligencia-artificial-big-data-gestao-agua",
    "gestao-agua-inovacao-crise-hidrica",
  ]

  const blogPosts = blogPostSlugs.map((slug) => {
    const post = getPostBySlug(slug)
    return {
      badge: t(lang, "home.content.blog.badge"),
      title: post?.title[lang] || post?.title.pt || "",
      excerpt: post?.excerpt[lang] || post?.excerpt.pt || "",
      image: post?.image || "",
      slug,
    }
  })

  const nextProduct = () => {
    setProductCarouselIndex((prev) => prev + 1)
  }

  const prevProduct = () => {
    setProductCarouselIndex((prev) => prev - 1)
  }

  // Efeito para resetar quando trocar de aba
  useEffect(() => {
    setIsTransitioning(false)
    setProductCarouselIndex(cloneCount)
    setHoveredCardIndex(null)
    setIsCentralCardHovered(false)
    setIsAutoPlaying(true) // Reinicia o autoplay ao trocar de tab
    requestAnimationFrame(() => {
      setIsTransitioning(true)
    })
  }, [productTab])

  // Efeito para resetar o índice quando chegar nos clones (loop infinito)
  useEffect(() => {
    const firstReal = cloneCount
    const lastReal = cloneCount + currentItems.length - 1
    
    // Aguarda a transição CSS terminar (500ms) antes de fazer o teleport
    const timeoutId = setTimeout(() => {
      if (productCarouselIndex > lastReal) {
        // Chegou no clone final, teleporta pro início real instantaneamente
        setIsTransitioning(false)
        setProductCarouselIndex(firstReal)
        // Reativa transição no próximo frame
        requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      } else if (productCarouselIndex < firstReal) {
        // Chegou no clone inicial, teleporta pro final real instantaneamente
        setIsTransitioning(false)
        setProductCarouselIndex(lastReal)
        // Reativa transição no próximo frame
        requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [productCarouselIndex, currentItems.length, cloneCount])

  // Efeito para posicionar no Sansys Water quando mudar para tab Produtos
  useEffect(() => {
    if (productTab === "produtos") {
      // Sansys Water está no índice 4 do array produtos
      const sansysWaterIndex = 4
      setTimeout(() => {
        setIsTransitioning(false)
        setProductCarouselIndex(cloneCount + sansysWaterIndex)
        requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      }, 50) // Pequeno delay para garantir que o reset da tab aconteceu primeiro
    }
  }, [productTab, cloneCount])

  // Autoplay - avança automaticamente a cada 5 segundos
  useEffect(() => {
    if (!isAutoPlaying) return

    const intervalId = setInterval(() => {
      setProductCarouselIndex((prev) => prev + 1)
    }, 5000) // 5 segundos

    return () => clearInterval(intervalId)
  }, [isAutoPlaying])

  return (
    <>
      {/* ====================================
          HERO SECTION
          Banner principal com chamada para ação
          ==================================== */}
      <section 
        className="relative bg-[#0B0B0B] text-white pt-32 pb-20 min-h-[500px] flex items-center"
        style={{
          backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-hero-tecnologia-dados-saneamento.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        role="img"
        aria-label="Fundo tecnológico com conexões de dados e visualizações de saneamento"
      >
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/0"></div>
        
        {/* Container principal */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white font-extralight [&>strong]:font-bold">
                {t(lang, "home.hero.title1")}<br />
                {t(lang, "home.hero.title2")} <strong>{t(lang, "home.hero.title3")}</strong><br />
                <strong>{t(lang, "home.hero.title4")}</strong>
              </h1>
              <Button 
                size="lg" 
                className="bg-[#E30613] hover:bg-[#C10511]"
                onClick={() => setWhatsappModalOpen(true)}
              >
                {t(lang, "home.hero.cta")} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          PRODUCTS SECTION
          Linha de produtos Sansys com carrossel
          ==================================== */}
      <section 
        className="py-20" 
        style={{
          backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-solucoes-saneamento.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        role="img"
        aria-label="Fundo tecnológico com conexões de dados e visualizações de saneamento"
      >
        <Container>
          <div className="text-center mb-8">
            <h2 className="mb-0 font-extralight [&>span]:font-bold" dangerouslySetInnerHTML={{ __html: t(lang, "home.products.title") }} />
            <p className="text-gray-600 text-2xl">{t(lang, "home.products.subtitle")}</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-5">
            <Button
              size="xl"
              variant={productTab === "produtos" ? "default" : "outline"}
              onClick={() => setProductTab("produtos")}
              className="rounded-md"
            >
              {t(lang, "home.products.tab.products")}
            </Button>
            <Button
              size="xl"
              variant={productTab === "modulos" ? "default" : "outline"}
              onClick={() => setProductTab("modulos")}
              className="rounded-md"
            >
              {t(lang, "home.products.tab.modules")}
            </Button>
          </div>

          {/* Carrossel de produtos */}
          <div className="relative py-8" style={{ minHeight: '55vh' }}>
            {/* Container com 100% */}
            <div className="mx-auto w-full">
              <div className="flex items-center justify-center gap-6 relative">
                {/* Seta esquerda - sempre visível por cima */}
                <button
                  onClick={() => {
                    prevProduct()
                    setIsAutoPlaying(false) // Pausa temporariamente
                    setTimeout(() => setIsAutoPlaying(true), 10000) // Retoma após 10s
                  }}
                  className="absolute left-0 flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#E30613] flex items-center justify-center hover:bg-[#E30613] transition-all group bg-gray-50 cursor-pointer"
                  style={{ zIndex: 50 }}
                  aria-label={t(lang, "home.products.prev")}
                >
                  <ChevronLeft className="h-6 w-6 text-[#E30613] group-hover:text-white" />
                </button>

                {/* Container dos cards com overflow hidden */}
                <div className="relative flex-1 overflow-hidden py-12 mx-16">
                  <div 
                    className="flex items-center justify-start ease-out"
                    style={{ 
                      transform: (() => {
                        // Calcular posição acumulada até o card central
                        let offset = 0
                        for (let i = 0; i < productCarouselIndex; i++) {
                          // Cada card lateral tem 184px
                          offset += 184
                          // Gap padrão de 1rem (16px)
                          offset += 16
                          // Se é adjacente ao central (i+1 === productCarouselIndex), adiciona margin extra
                          if (i + 1 === productCarouselIndex) {
                            offset += 24 // 1.5rem
                          }
                        }
                        // Adiciona metade do card central (200px / 2 = 100px) para centralizar
                        offset += 100
                        return `translateX(calc(50% - ${offset}px))`
                      })(),
                      gap: '1rem',
                      transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
                    }}
                  >
                    {/* Cards com slot fixo + scale transform */}
                    {extendedProdutos.map((produto, idx) => {
                      const isCentral = idx === productCarouselIndex
                      const isHovered = hoveredCardIndex === idx
                      const isAdjacentToCentral = Math.abs(idx - productCarouselIndex) === 1
                      
                      // Calcular scale baseado no estado
                      let scale = 1
                      let baseW = 184 // Cards laterais
                      
                      if (isCentral) {
                        baseW = 200 // Card central usa 200px base para obter 240px com scale 1.20
                        scale = isMobile ? 0.96 : 1.20 // Mobile: 192px / Desktop: 240px
                      } else if (isHovered) {
                        scale = isMobile ? 0.84 : 1.04 // Mobile: ~155px / Desktop: ~191px
                      }
                      
                      return (
                        <div
                          key={`product-${idx}`}
                          className="flex-shrink-0"
                          style={{ 
                            width: `${baseW}px`, // SLOT FIXO - varia entre 184px e 200px
                            marginLeft: isAdjacentToCentral && idx > productCarouselIndex ? '1.5rem' : '0',
                            marginRight: isAdjacentToCentral && idx < productCarouselIndex ? '1.5rem' : '0',
                          }}
                          onMouseEnter={() => {
                            if (!isCentral) {
                              setHoveredCardIndex(idx)
                            }
                            setIsAutoPlaying(false) // Pausa o autoplay
                          }}
                          onMouseLeave={() => {
                            setHoveredCardIndex(null)
                            setIsAutoPlaying(true) // Retoma o autoplay
                          }}
                        >
                          {/* Card visual interno que cresce com scale */}
                          <div
                            className={`group bg-transparent rounded-md cursor-pointer ${
                              isCentral
                                ? "border-2 border-gray-300 bg-gray-50 pointer-events-auto p-8"
                                : "border-2 border-transparent hover:border-gray-300 hover:shadow-lg hover:bg-[#fcfcfc] p-6"
                            }`}
                            style={{
                              transform: (isCentral && isCentralCardHovered) || isHovered
                                ? `scale(${scale}) translateY(-10px)` 
                                : `scale(${scale})`,
                              transformOrigin: "center",
                              transition: "transform 250ms ease-out, box-shadow 250ms ease-out, background-color 250ms ease-out, border-color 250ms ease-out",
                              boxShadow: isCentral 
                                ? (isCentralCardHovered ? "0 20px 30px rgba(0, 0, 0, 0.15)" : "0 10px 15px rgba(0, 0, 0, 0.1)")
                                : isHovered 
                                  ? "0 15px 20px rgba(0, 0, 0, 0.12)" 
                                  : undefined,
                              zIndex: isCentral || isHovered ? 20 : 1,
                              position: "relative"
                            }}
                            onMouseEnter={() => {
                              if (isCentral) {
                                setIsCentralCardHovered(true)
                              }
                            }}
                            onMouseLeave={() => {
                              if (isCentral) {
                                setIsCentralCardHovered(false)
                              }
                            }}
                            onClick={() => {
                              if (!isCentral) {
                                setProductCarouselIndex(idx)
                              } else {
                                // Usar getRoute para garantir tradução correta da URL
                                const solutionsPath = getRoute("solutions", lang)
                                window.location.hash = `#/${lang}${solutionsPath}/${produto.slug}`
                              }
                            }}
                          >
                            <div className="flex flex-col items-center justify-center" style={{ aspectRatio: '1 / 1' }}>
                              {/* Logo dinâmico por produto */}
                              <LogoBySlug 
                                slug={produto.slug}
                                className={`transition-all ${isCentral ? "h-12 opacity-100" : "h-10 opacity-40 group-hover:opacity-100"}`}
                                color={
                                  // Slugs com suporte a variant colorido não usam prop `color`
                                  !hasVariantSupport(produto.slug)
                                    ? (isCentral ? "#a4a6a5" : "#9CA3AF")
                                    : undefined
                                }
                                variant={
                                  // Slugs com suporte a variant colorido
                                  hasVariantSupport(produto.slug)
                                    ? ((isCentral && isCentralCardHovered) || isHovered ? "colored" : "default")
                                    : undefined
                                }
                              />

                              {/* Botão Saiba mais - aparece apenas no hover ou quando é central */}
                              <Button
                                variant="outline"
                                size="sm"
                                className={`mt-6 transition-all text-xs ${
                                  isCentral 
                                    ? "opacity-100 border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white" 
                                    : "opacity-0 group-hover:opacity-100 border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  const solutionsPath = getRoute("solutions", lang)
                                  window.location.hash = `#/${lang}${solutionsPath}/${produto.slug}`
                                }}
                              >
                                {t(lang, "home.products.cta")}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Seta direita - sempre visível por cima */}
                <button
                  onClick={() => {
                    nextProduct()
                    setIsAutoPlaying(false) // Pausa temporariamente
                    setTimeout(() => setIsAutoPlaying(true), 10000) // Retoma após 10s
                  }}
                  className="absolute right-0 flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#E30613] flex items-center justify-center hover:bg-[#E30613] transition-all group bg-gray-50 cursor-pointer"
                  style={{ zIndex: 50 }}
                  aria-label={t(lang, "home.products.next")}
                >
                  <ChevronRight className="h-6 w-6 text-[#E30613] group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          DIFFERENTIALS SECTION
          Nosso diferencial - valores e pilares
          ==================================== */}
      <section 
        className="py-16 text-white bg-top-forced" 
        style={{
          backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp)',
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0B0B0B',
          backgroundAttachment: 'scroll'
        }}
        role="img"
        aria-label="Fundo abstrato tecnológico representando inovação e saneamento inteligente"
      >
        <Container>
          {/* Título com linha decorativa */}
          <div className="mb-12">
            <div className="inline-block">
              <h2 className="text-[#E30613] font-normal text-4xl md:text-5xl">
                {t(lang, "home.differentials.title")}
              </h2>
              <div className="h-[2px] bg-white w-[70%]"></div>
            </div>
          </div>

          {/* Cards em grid responsivo com wrap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
            {diferenciais.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="rounded-lg backdrop-blur-sm relative overflow-hidden"
                  style={{ 
                    minHeight: `${cardHeights[idx]}px`, 
                    padding: '1.25rem',
                    background: 'radial-gradient(circle at right bottom, rgba(25, 25, 25, 0.1) 0%, rgba(40, 40, 40, 0.3) 65%, rgba(80, 80, 80, 0.4) 100%)'
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <div className="h-[2px] bg-[#E30613] w-[70%] mb-4"></div>
                  <p className="text-white/90 text-sm leading-relaxed">{item.text}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ====================================
          IMPACT & COVERAGE SECTION
          Impacto no mercado + Nossa abrangência
          ==================================== */}
      <section className="py-16" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 70%, #e8e8e8 100%)' }}>
        <Container>
          <div style={{ marginBottom: '5rem' }}>
            <div className="inline-block">
              <h2 className="font-bold text-left">{t(lang, "home.metrics.title")}</h2>
              <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
            </div>
          </div>

          {/* Indicadores em uma única linha com responsividade */}
          <div className="flex flex-wrap justify-between items-start mb-16">
            {/* Métrica 1 - Usuários ativos */}
            <div className="flex items-start">
              <span 
                className="text-5xl"
                style={{ 
                  color: '#E30613',
                  fontWeight: 900,
                  lineHeight: 1,
                  marginRight: '0.1em'
                }}
              >
                +
              </span>
              <div>
                <div
                  className="text-5xl"
                  style={{
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'radial-gradient(circle at bottom right, #ACAFAF 0%, #717577 70%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  4.5 mil
                </div>
                <div className="text-gray-600 text-xl leading-tight mt-2">
                  {t(lang, "home.metrics.users.line1")}<br />{t(lang, "home.metrics.users.line2")}
                </div>
              </div>
            </div>

            {/* Métrica 2 - Recursos disponíveis */}
            <div className="flex items-start">
              <span 
                className="text-5xl"
                style={{ 
                  color: '#E30613',
                  fontWeight: 900,
                  lineHeight: 1,
                  marginRight: '0.1em'
                }}
              >
                +
              </span>
              <div>
                <div
                  className="text-5xl"
                  style={{
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'radial-gradient(circle at bottom right, #ACAFAF 0%, #717577 70%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  800
                </div>
                <div className="text-gray-600 text-xl leading-tight mt-2">
                  {t(lang, "home.metrics.resources.line1")}<br />{t(lang, "home.metrics.resources.line2")}
                </div>
              </div>
            </div>

            {/* Métrica 3 - Faturamento */}
            <div className="flex items-start">
              <span 
                className="text-5xl"
                style={{ 
                  color: '#E30613',
                  fontWeight: 900,
                  lineHeight: 1,
                  marginRight: '0.1em'
                }}
              >
                +
              </span>
              <div>
                <div
                  className="text-5xl"
                  style={{
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'radial-gradient(circle at bottom right, #ACAFAF 0%, #717577 70%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  300 mi
                </div>
                <div className="text-gray-600 text-xl leading-tight mt-2">
                  {t(lang, "home.metrics.revenue.line1")}<br />
                  {t(lang, "home.metrics.revenue.line2")}
                </div>
              </div>
            </div>
            {/* Métrica 4 - Clientes ativos */}
            <div className="flex items-start">
              <span 
                className="text-5xl"
                style={{ 
                  color: '#E30613',
                  fontWeight: 900,
                  lineHeight: 1,
                  marginRight: '0.1em'
                }}
              >
                +
              </span>
              <div>
                <div
                  className="text-5xl"
                  style={{
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'radial-gradient(circle at bottom right, #ACAFAF 0%, #717577 70%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  107
                </div>
                <div className="text-gray-600 text-xl leading-tight mt-2">
                  {t(lang, "home.metrics.clients.line1")}<br />
                  <span className="text-sm">{t(lang, "home.metrics.clients.line2")}</span>
                </div>
              </div>
            </div>

            {/* Métrica 5 - Atendimentos de suporte */}
            <div className="flex items-start">
              <span 
                className="text-5xl"
                style={{ 
                  color: '#E30613',
                  fontWeight: 900,
                  lineHeight: 1,
                  marginRight: '0.1em'
                }}
              >
                +
              </span>
              <div>
                <div
                  className="text-5xl"
                  style={{
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'radial-gradient(circle at bottom right, #ACAFAF 0%, #717577 70%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  2.8 mil
                </div>
                <div className="text-gray-600 text-xl leading-tight mt-2">
                  {t(lang, "home.metrics.support.line1")}<br />{t(lang, "home.metrics.support.line2")}
                </div>
              </div>
            </div>
          </div>

          {/* Card Nossa Abrangência */}
          <div>
            <div className="bg-white rounded-3xl p-4 md:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-start">
                {/* Coluna Esquerda - 40% */}
                <div className="lg:col-span-4 flex flex-col h-full">
                  {/* Título */}
                  <h3 className="text-gray-700 text-3xl font-bold mb-3 text-left max-w-md">
                    {t(lang, "home.coverage.title")}
                  </h3>
                  
                  {/* Texto descritivo */}
                  <p className="text-[#555555] text-2xl leading-tight mb-8 text-left max-w-md flex-1">
                    {t(lang, "home.coverage.subtitle")}
                  </p>
                  
                  {/* Bandeiras dos países */}
                  <div className="flex gap-3 items-center max-w-md">
                    {/* Bandeira Brasil */}
                    <div className="shadow-sm overflow-hidden" style={{ width: '60px', height: '40px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="60" height="40" style={{ transform: 'rotate(180deg)' }}>
                        <rect width="60" height="40" fill="#009739"/>
                        <path d="M30,4 L56,20 L30,36 L4,20 Z" fill="#FEDD00"/>
                        <circle cx="30" cy="20" r="7" fill="#012169"/>
                        <path d="M23,20 Q30,24 37,20" fill="none" stroke="#FFFFFF" strokeWidth="0.8"/>
                        <circle cx="30" cy="16" r="0.4" fill="#FFFFFF"/>
                        <circle cx="28" cy="18" r="0.3" fill="#FFFFFF"/>
                        <circle cx="32" cy="18" r="0.3" fill="#FFFFFF"/>
                        <circle cx="27" cy="21" r="0.3" fill="#FFFFFF"/>
                        <circle cx="33" cy="21" r="0.3" fill="#FFFFFF"/>
                        <circle cx="30" cy="23" r="0.4" fill="#FFFFFF"/>
                      </svg>
                    </div>
                    
                    {/* Bandeira Equador */}
                    <div className="shadow-sm overflow-hidden" style={{ width: '60px', height: '40px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="60" height="40">
                        <rect width="60" height="20" fill="#FFD100"/>
                        <rect y="20" width="60" height="10" fill="#0033A0"/>
                        <rect y="30" width="60" height="10" fill="#DA0010"/>
                        <ellipse cx="30" cy="20" rx="6" ry="7" fill="#FFD100" stroke="#000000" strokeWidth="0.3"/>
                        <rect x="27" y="18" width="6" height="4" fill="#0033A0"/>
                        <circle cx="30" cy="23" r="1.5" fill="#DA0010"/>
                      </svg>
                    </div>
                    
                    {/* Bandeira Peru */}
                    <div className="shadow-sm overflow-hidden" style={{ width: '60px', height: '40px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="60" height="40" preserveAspectRatio="none">
                        <rect width="13.33" height="40" fill="#D91023"/>
                        <rect x="13.33" width="13.34" height="40" fill="#FFFFFF"/>
                        <rect x="26.67" width="13.33" height="40" fill="#D91023"/>
                        <ellipse cx="20" cy="20" rx="4" ry="5" fill="#FFFFFF" stroke="#D91023" strokeWidth="0.4"/>
                        <rect x="18.5" y="18" width="3" height="3" fill="#D91023"/>
                        <circle cx="20" cy="22" r="1" fill="#FFD100"/>
                      </svg>
                    </div>
                    
                    {/* Bandeira Nova Zelândia */}
                    <div className="shadow-sm overflow-hidden" style={{ width: '60px', height: '40px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="60" height="40">
                        <rect width="60" height="40" fill="#00247D"/>
                        <rect x="0" y="8" width="26" height="4" fill="#FFFFFF"/>
                        <rect x="10" y="0" width="4" height="20" fill="#FFFFFF"/>
                        <rect x="0" y="9" width="26" height="2" fill="#CF142B"/>
                        <rect x="11" y="0" width="2" height="20" fill="#CF142B"/>
                        <path d="M0,0 L10,8 L14,8 L14,10 L4,2 L0,2 Z" fill="#FFFFFF"/>
                        <path d="M26,0 L26,2 L16,10 L12,10 L22,2 L26,2 Z" fill="#FFFFFF"/>
                        <path d="M0,20 L0,18 L10,10 L14,10 L4,18 L0,18 Z" fill="#FFFFFF"/>
                        <path d="M26,20 L16,12 L12,12 L22,20 Z" fill="#FFFFFF"/>
                        <path d="M0,0 L12,9 L14,9 L0,0 Z" fill="#CF142B"/>
                        <path d="M26,0 L14,9 L12,9 L26,0 Z" fill="#CF142B"/>
                        <path d="M0,20 L12,11 L14,11 L0,20 Z" fill="#CF142B"/>
                        <path d="M26,20 L14,11 L12,11 L26,20 Z" fill="#CF142B"/>
                        <path d="M48,13 L48.8,15.2 L51,15.2 L49.1,16.6 L49.9,18.8 L48,17.4 L46.1,18.8 L46.9,16.6 L45,15.2 L47.2,15.2 Z" fill="#FFFFFF" stroke="#CF142B" strokeWidth="0.2"/>
                        <path d="M44,8 L44.6,9.6 L46.2,9.6 L44.8,10.6 L45.4,12.2 L44,11.2 L42.6,12.2 L43.2,10.6 L41.8,9.6 L43.4,9.6 Z" fill="#FFFFFF" stroke="#CF142B" strokeWidth="0.2"/>
                        <path d="M44,22 L44.6,23.6 L46.2,23.6 L44.8,24.6 L45.4,26.2 L44,25.2 L42.6,26.2 L43.2,24.6 L41.8,23.6 L43.4,23.6 Z" fill="#FFFFFF" stroke="#CF142B" strokeWidth="0.2"/>
                        <path d="M38,15 L38.5,16.2 L39.7,16.2 L38.6,17 L39.1,18.2 L38,17.4 L36.9,18.2 L37.4,17 L36.3,16.2 L37.5,16.2 Z" fill="#FFFFFF" stroke="#CF142B" strokeWidth="0.2"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Coluna Direita - 60% - Mapa-múndi pontilhado */}
                <div className="lg:col-span-6">
                  <ImageWithFallback
                    src="https://conteudo.sansys.app/site/img/jtech-nossa-abrangencia.webp"
                    alt="Mapa mundo pontilhado com destaque nos continentes américa e oceania"
                    className="w-full h-auto rounded-lg"
                    style={{ maxHeight: '300px', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          CONTENT SECTION
          Blog posts e e-books em destaque
          ==================================== */}
      <section 
        className="py-16 bg-[#0B0B0B] text-white flex items-end bg-top-forced" 
        style={{
          backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-conteudos-digitais.webp)',
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          minHeight: '130vh'
        }}
        role="img"
        aria-label="Fundo com elementos gráficos modernos representando conteúdos digitais e inovação tecnológica"
      >
        <Container>
          <div className="mb-12 text-center">
            <h2 className="font-extralight mb-4 text-white" style={{ whiteSpace: 'pre-line' }}>
              {t(lang, "home.content.section.title")}
            </h2>
            <div className="mx-auto h-[2px] bg-[#E30613]" style={{ width: '40%', maxWidth: '400px' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {blogPosts.map((post, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer transform hover:scale-[1.02] flex flex-col h-full"
                onClick={() => (window.location.hash = buildPath(lang, getRoute("post", lang, { slug: post.slug })))}
              >
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover flex-shrink-0"
                />
                <div className="p-6 bg-white flex flex-col flex-1">
                  <span className="inline-block bg-[#E30613] text-white text-xs px-3 py-1 rounded-full mb-3 self-start">
                    {post.badge}
                  </span>
                  <h3 className="text-xl mb-4 text-gray-700">{post.title}</h3>
                  <p className="text-gray-700 text-sm">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#E30613] hover:text-[#C10511] hover:bg-transparent p-0 h-auto mt-auto self-start"
                  >
                    {t(lang, "common.readmore")} →
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-[#E30613] hover:bg-[#C10511]"
              onClick={() => (window.location.hash = buildPath(lang, getRoute("content", lang)))}
            >
              {t(lang, "home.content.cta")}
            </Button>
          </div>
        </Container>
      </section>

      <PreWhatsAppModal
        lang={lang}
        open={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
      />

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}