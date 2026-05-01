import { useState, useEffect } from "react"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { calculateBannerOffset } from "../lib/banner-alignment"
import { ScrollToTop } from "../components/ScrollToTop"
import { LogoBySlug } from "../components/logos"
import { hasVariantSupport } from "../lib/logo-variants"
import { getRoute } from "../lib/routes"

interface AboutPageProps {
  lang: Lang
}

function ImageWithFallback(props: any) {
  const [currentSrc, setCurrentSrc] = useState(props.src)
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest} = props

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

export function AboutPage({ lang }: AboutPageProps) {
  const [bannerOffset, setBannerOffset] = useState(0)
  const [productCarouselIndex, setProductCarouselIndex] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [productTab, setProductTab] = useState<"produtos" | "modulos">("produtos")
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [visibleCards, setVisibleCards] = useState(5)
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null)

  // Calcular o offset do logo no header para alinhar o título
  useEffect(() => {
    const updateOffset = () => {
      setBannerOffset(calculateBannerOffset())
    }

    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  // Detectar tamanho da tela e ajustar quantidade de cards visíveis
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth
      let newVisibleCards = 5
      
      if (width < 640) { // Mobile
        newVisibleCards = 1
      } else if (width < 1024) { // Tablet
        newVisibleCards = 3
      } else { // Desktop
        newVisibleCards = 5
      }
      
      if (newVisibleCards !== visibleCards) {
        setVisibleCards(newVisibleCards)
        setIsTransitioning(false)
        setProductCarouselIndex(Math.floor(newVisibleCards / 2))
        requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      }
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [visibleCards])

  // Produtos Sansys
  const produtos = [
    { slug: "sansys-water", name: "Sansys Water" },
    { slug: "sansys-pay", name: "Sansys Pay" },
    { slug: "sansys-waste", name: "Sansys Waste" },
    { slug: "sansys-agency", name: "Sansys Agency" },
    { slug: "sansys-reader", name: "Sansys Reader" },
    { slug: "sansys-hub", name: "Sansys Hub" },
    { slug: "sansys-flow", name: "Sansys Flow" },
    { slug: "sansys-gis", name: "Sansys GIS" },
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

  const nextProduct = () => {
    setIsAutoPlaying(false)
    setProductCarouselIndex((prev) => {
      const next = prev + 1
      if (next >= cloneCount + currentItems.length) {
        setTimeout(() => {
          setIsTransitioning(false)
          setProductCarouselIndex(cloneCount)
          setTimeout(() => setIsTransitioning(true), 50)
        }, 500)
      }
      return next
    })
  }

  const prevProduct = () => {
    setIsAutoPlaying(false)
    setProductCarouselIndex((prev) => {
      const next = prev - 1
      if (next < cloneCount) {
        setTimeout(() => {
          setIsTransitioning(false)
          setProductCarouselIndex(cloneCount + currentItems.length - 1)
          setTimeout(() => setIsTransitioning(true), 50)
        }, 500)
      }
      return next
    })
  }

  // Resetar o índice quando a tab mudar
  useEffect(() => {
    setIsTransitioning(false)
    setProductCarouselIndex(cloneCount)
    setTimeout(() => setIsTransitioning(true), 50)
  }, [productTab, cloneCount])

  // Auto-play: avançar automaticamente a cada 3 segundos
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setProductCarouselIndex((prev) => prev + 1)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Detectar quando chega ao fim e resetar para criar loop infinito
  useEffect(() => {
    if (productCarouselIndex >= cloneCount + currentItems.length) {
      setTimeout(() => {
        setIsTransitioning(false)
        setProductCarouselIndex(cloneCount)
        setTimeout(() => setIsTransitioning(true), 50)
      }, 500)
    } else if (productCarouselIndex < cloneCount) {
      setTimeout(() => {
        setIsTransitioning(false)
        setProductCarouselIndex(cloneCount + currentItems.length - 1)
        setTimeout(() => setIsTransitioning(true), 50)
      }, 500)
    }
  }, [productCarouselIndex, cloneCount, currentItems.length])

  const metricas = [
    { numero: "+2.5mil", label: t(lang, "about.numbers.users") },
    { numero: "+800", label: t(lang, "about.numbers.resources") },
    { numero: "+350mil", label: t(lang, "about.numbers.revenue") },
    { numero: "+150", label: t(lang, "about.numbers.clients") },
    { numero: "+2.5mil", label: t(lang, "about.numbers.support") },
  ]

  return (
    <>
      {/* ====================================
          HERO SECTION
          Banner principal da página Quem Somos
          ==================================== */}
      <section 
        className="relative bg-[#0B0B0B] text-white pt-32 pb-20 min-h-[500px] flex items-center"
        style={{
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-equipe-tecnologia-inovacao-saneamento.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Equipe Jtech trabalhando em projetos de tecnologia e inovação para saneamento"
      >
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/0"></div>
        
        {/* Container principal */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
            <div className="max-w-2xl">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white [&>strong]:font-bold [&>span]:font-extralight"
                dangerouslySetInnerHTML={{ __html: t(lang, "about.hero.title") }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          WHO WE ARE SECTION
          Apresentação da empresa e história
          ==================================== */}
      <section className="py-8 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="inline-block">
              <h2 
                className="mb-0 font-extralight [&>strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: t(lang, "about.who.title") }}
              />
              <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
            </div>
            <p 
              className="text-gray-700 mb-6 leading-relaxed text-justify mt-6 [&>strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: t(lang, "about.who.text1") }}
            />

            <div className="bg-gray-50 border-l-4 border-[#E30613] p-6 rounded mb-8">
              <p 
                className="text-gray-800 leading-relaxed text-justify [&>strong]:font-bold"
                dangerouslySetInnerHTML={{ __html: t(lang, "about.who.text2") }}
              />
            </div>

            {/* Vídeo em formato widescreen */}
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <div className="relative bg-black rounded-lg overflow-hidden group cursor-pointer w-full h-full">
                <ImageWithFallback
                  src="https://conteudo.sansys.app/site/img/jtech-conteudo-institucional.webp"
                  alt="Thumbnail vídeo institucional"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#E30613] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          WHAT WE DO SECTION
          O que fazemos - atuação e serviços
          ==================================== */}
      <section className="py-8 bg-gray-200">
        <Container>
          {/* Textos com largura limitada */}
          <div className="max-w-3xl mx-auto">
            <div className="inline-block mb-8">
              <h2 
                className="mb-0 font-extralight [&>strong]:font-bold text-left"
                dangerouslySetInnerHTML={{ __html: t(lang, "about.what.title") }}
              />
              <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
            </div>

            <div className="space-y-6 mb-12">
              <p className="text-gray-700 leading-relaxed text-justify">
                {t(lang, "about.what.text1")}
              </p>

              <p className="text-gray-700 leading-relaxed text-justify">
                {t(lang, "about.what.text2")}
              </p>

              <p className="text-gray-800 leading-relaxed text-justify">
                <strong>{t(lang, "about.what.text3")}</strong>
              </p>
            </div>
          </div>

          {/* Tabs centralizados */}
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

          {/* Carrossel de produtos - largura total */}
          <div className="relative">
            {/* Container com 100% */}
            <div className="mx-auto w-full">
              <div className="flex items-center justify-center gap-6 relative">
                {/* Seta esquerda */}
                <button
                  onClick={() => {
                    prevProduct()
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 10000)
                  }}
                  className="absolute left-0 flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#E30613] flex items-center justify-center hover:bg-[#E30613] transition-all group bg-transparent cursor-pointer"
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
                      transform: `translateX(calc(50% - ${productCarouselIndex * 220}px - 110px))`,
                      gap: '20px',
                      transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
                    }}
                  >
                    {/* Cards - todos com mesmo estilo */}
                    {extendedProdutos.map((produto, idx) => {
                      const baseW = 200
                      
                      return (
                        <div
                          key={`product-${idx}`}
                          className="flex-shrink-0"
                          style={{ 
                            width: `${baseW}px`,
                          }}
                          onMouseEnter={() => {
                            setIsAutoPlaying(false)
                            setHoveredCardIndex(idx)
                          }}
                          onMouseLeave={() => {
                            setIsAutoPlaying(true)
                            setHoveredCardIndex(null)
                          }}
                        >
                          {/* Card visual */}
                          <div
                            className="group bg-transparent rounded-md cursor-pointer border-2 border-transparent hover:border-gray-300 hover:shadow-lg hover:bg-[#fcfcfc] p-6"
                            style={{
                              transform: hoveredCardIndex === idx ? "translateY(-10px)" : "translateY(0)",
                              transformOrigin: "center",
                              transition: "transform 250ms ease-out, box-shadow 250ms ease-out, background-color 250ms ease-out, border-color 250ms ease-out",
                              position: "relative"
                            }}
                            onClick={() => {
                              const solutionsPath = getRoute("solutions", lang)
                              window.location.hash = `#/${lang}${solutionsPath}/${produto.slug}`
                            }}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <LogoBySlug 
                                slug={produto.slug} 
                                className="h-12"
                                color={
                                  // Slugs com suporte a variant colorido não usam prop `color`
                                  !hasVariantSupport(produto.slug)
                                    ? "#a4a6a5"
                                    : undefined
                                }
                                variant={
                                  // Slugs com suporte a variant colorido
                                  hasVariantSupport(produto.slug)
                                    ? (hoveredCardIndex === idx ? "colored" : "default")
                                    : undefined
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Seta direita */}
                <button
                  onClick={() => {
                    nextProduct()
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 10000)
                  }}
                  className="absolute right-0 flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#E30613] flex items-center justify-center hover:bg-[#E30613] transition-all group bg-transparent cursor-pointer"
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

      {/* SECTION 4 — O QUE NOS MOTIVA */}
      <section 
        className="py-16 bg-white relative"
        style={{
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-solucoes-saneamento.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Fundo com textura suave representando o compromisso e propósito da Jtech"
      >
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="mb-8 text-[#E30613] text-5xl font-semibold">
                  {t(lang, "about.why.title").replace(" •", "")}
                </h2>

                <div className="space-y-8">
                  <div>
                    <div className="inline-block">
                      <h3 
                        className="text-2xl mb-0 [&>strong]:font-bold"
                        dangerouslySetInnerHTML={{ 
                          __html: t(lang, "about.why.purpose.title").replace(/(\S+)\s(\S+)/, '$1 <strong>$2</strong>')
                        }}
                      />
                      <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      {t(lang, "about.why.purpose.text")}
                    </p>
                  </div>

                  <div>
                    <div className="inline-block">
                      <h3 
                        className="text-2xl mb-0 [&>strong]:font-bold"
                        dangerouslySetInnerHTML={{ 
                          __html: t(lang, "about.why.future.title").replace(/(\S+)\s(\S+)/, '$1 <strong>$2</strong>')
                        }}
                      />
                      <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
                    </div>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      {t(lang, "about.why.future.text")}
                    </p>
                  </div>

                  <div>
                    <div className="inline-block">
                      <h3 
                        className="text-2xl mb-0 [&>strong]:font-bold"
                        dangerouslySetInnerHTML={{ 
                          __html: t(lang, "about.why.essence.title").replace(/(\S+)\s(\S+)/, '$1 <strong>$2</strong>')
                        }}
                      />
                      <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
                    </div>
                    <ul className="space-y-3 mt-4">
                      {[
                        t(lang, "about.why.essence.item1"),
                        t(lang, "about.why.essence.item2"),
                        t(lang, "about.why.essence.item3"),
                        t(lang, "about.why.essence.item4"),
                        t(lang, "about.why.essence.item5"),
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-[#E30613] mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <ImageWithFallback
                  src="https://conteudo.sansys.app/site/img/jtech-atendimento-cliente-tecnologia-saneamento.webp"
                  alt="Profissional utilizando headset e computador em atendimento digital, representando a gestão de atendimento ao cliente com tecnologia no setor de saneamento"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 5 — COMPROMISSO AMBIENTAL (Missão, Visão, Valores) */}
      <section 
        className="py-16 bg-[#0B0B0B] text-white relative pb-32"
        style={{
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Fundo com elementos visuais representando missão, visão e valores da empresa"
      >
        <Container>
          <div className="text-center mb-8">
            <h2 
              className="mb-6 font-extralight text-white [&>strong]:font-bold"
              dangerouslySetInnerHTML={{ 
                __html: t(lang, "about.environment.title").replace(/(\S+)$/, '<strong>$1</strong>')
              }}
            />

            <div className="max-w-2xl mx-auto mb-8">
              <ImageWithFallback
                src="https://conteudo.sansys.app/site/img/jtech-compromisso-ambinetal-saneamento.webp"
                alt="Logos da Jtech e da Veolia, representando parceria em tecnologia e soluções para o setor de saneamento"
                className="w-full"
              />
            </div>

            <div className="max-w-2xl mx-auto">
              <p className="text-gray-300 mb-6 leading-relaxed text-justify">
                {t(lang, "about.environment.text1")}
              </p>

              <p className="text-gray-300 mb-8 leading-relaxed text-justify">
                {t(lang, "about.environment.text2")}
              </p>
            </div>
          </div>
        </Container>

        {/* Card suspenso - metade na section 5 e metade na section 6 */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-10">
          <div className="bg-white rounded-lg shadow-xl" style={{ padding: '2.5rem 4rem' }}>
            <div className="max-w-md">
              {/* SVG Jtech + Veolia */}
              <svg className="w-full h-auto mb-6" viewBox="0 0 398 48" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M228.7.9c-13,0-23.5,10.3-23.5,23s10.5,23,23.5,23,23.5-10.3,23.5-23S241.7.9,228.7.9ZM228.8,37c2.9-3.2,5.8-7.5,5-11-.6-3.6-3.3-4.8-5.2-4.7-1.8,0-4.5,1.1-5.2,4.7-.8,3.5,2.1,7.8,5,11-9.2,0-16.5-7.4-16.5-16.3s7.5-16.3,16.7-16.3,16.7,7.3,16.7,16.3-7.5,16.3-16.7,16.3Z" fill="#ff0001"/>
                  <path d="M324.6,13.1c-8.7,0-12.8,4-12.8,12.4s1.5,7.9,4.2,9.8c2.1,1.5,5.5,2.4,9.1,2.4,8.2,0,12.4-4.1,12.4-12s-4.2-12.6-12.8-12.6ZM324.6,33.6c-4.7,0-6.8-2.6-6.8-8.2,0-5.7,2-8.1,6.8-8.1h0c4.6,0,6.7,2.5,6.7,8.1s-2.1,8.3-6.7,8.3Z" fill="#ff0001"/>
                  <path d="M348.4,31.9c-.9-.8-1.1-1.3-1.2-3.6v-12.1c0-1.3-1.1-2.3-2.4-2.2h-3.1v12.9c0,4,.4,5.8,1.8,7.4,1.6,1.8,4,2.7,7.7,2.7h7.4v-4.1h-4.7c-3.4,0-4.5-.2-5.4-1Z" fill="#ff0001"/>
                  <path d="M386.6,14h-3.7c-1.4,0-2.6.8-3.2,2l-9.3,21h3.8c1.4,0,2.7-.8,3.3-2l1.5-3.3h9.4l1.5,3.3c.6,1.2,1.9,2,3.3,2h3.8l-10.2-23ZM380,27.6l3.5-8.1,3.5,8.1h-7Z" fill="#ff0001"/>
                  <path d="M362,16.2v20.8h3.1c1.3,0,2.3-.9,2.4-2.2V14h-3.1c-1.3,0-2.3,1-2.4,2.2Z" fill="#ff0001"/>
                  <path d="M278.7,16l-5.8,14.2-6.2-14.1c-.6-1.2-1.9-2-3.2-2h-3.8l10.4,23h3c1.3,0,2.6-.8,3.2-1.9l9.7-21.1h-4.1c-1.4,0-2.6.8-3.2,2Z" fill="#ff0001"/>
                  <path d="M294.8,14.3h0c-.6.2-1.3.4-1.8.7-.8.4-1.5.9-2.1,1.5-.9.9-1.6,1.9-2.1,3-.9,1.8-1.3,3.8-1.2,5.8v.4c0,2,.4,4,1.2,5.8.5,1.2,1.3,2.3,2.2,3.2,0,0,.5.5.8.6.6.4,1.2.8,1.9,1,.2,0,.5.2.7.2.2,0,.4.1.4.1,1.2.3,2.5.4,3.7.4h9.3v-4.1h-7.2c-3.4,0-5.3-.7-6.2-2.6-.4-.8-.6-1.7-.7-2.7v-.2h13.5v-4h-13.5v-.2c0-.9.3-1.8.7-2.7.9-1.8,2.8-2.5,6.2-2.6h7.2v-4.1h-9.3c-1.2,0-2.4,0-3.6.3Z" fill="#ff0001"/>
                </g>
                <rect x="189" y="9" width="1.1" height="30.1" fill="#cecece"/>
                <g>
                  <g>
                    <path d="M140.4,35.7c-1.3,1.3-3.2,2.2-5.3,2.2-4.1,0-7.4-3.3-7.4-7.4s3.3-7.4,7.4-7.4,3.9.8,5.3,2.2l4.1-4.1c-2.4-2.4-5.7-3.9-9.4-3.9-7.3,0-13.2,5.9-13.2,13.2s5.9,13.2,13.2,13.2,7-1.5,9.4-3.9l-4.1-4.1Z" fill="#4a4a49"/>
                    <path d="M107.5,37.4c-1,0-1.9-.2-2.8-.5l14.2-14.2-2.1-2.1c-2.4-2.4-5.7-3.9-9.4-3.9-7.3,0-13.2,5.9-13.2,13.2s5.9,13.2,13.2,13.2,7-1.5,9.4-3.9l-4.1-4.1c-1.3,1.3-3.2,2.2-5.3,2.2ZM107.5,22.5c1,0,1.9.2,2.8.5l-9.7,9.7c-.4-.9-.5-1.8-.5-2.8,0-4.1,3.3-7.4,7.4-7.4Z" fill="#4a4a49"/>
                    <path d="M173.9,30.5c0-7.3-5.9-13.2-13.2-13.2s-5.3.8-7.4,2.3V5.2h-5.8v38.2h5.8v-12.9c0-4.1,3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4h0v12.9h5.8v-12.9h0Z" fill="#4a4a49"/>
                    <path d="M91.4,22.5v-5.8h-7.4V5h-5.8v25c0,7.3,5.9,13.2,13.2,13.2v-5.8c-4.1,0-7.4-3.3-7.4-7.4v-7.4h7.4Z" fill="#4a4a49"/>
                    <path d="M66.5,30V5h5.8v25c0,7.3-5.9,13.2-13.2,13.2v-5.8c4.1,0,7.4-3.3,7.4-7.4Z" fill="#4a4a49"/>
                  </g>
                  <g>
                    <path d="M36.1,1.1H1.2v34.9c0,6.1,5,11.1,11.1,11.1h34.9V12.2c0-6.1-5-11.1-11.1-11.1Z" fill="#4a4a49"/>
                    <path d="M12.3,43.9c-4.3,0-7.8-3.5-7.8-7.8V4.4h31.6c4.3,0,7.8,3.5,7.8,7.8v31.6H12.3Z" fill="#cb2026"/>
                    <g>
                      <path d="M37.4,41.7h0c-4.7,0-8.5-3.8-8.5-8.5v-7.9h8.5v-6.6h-8.5v-8.5h-6.6v23c0,4.2,1.7,7.9,4.4,10.7s.4.4.4.4h16.8v-2.6h-6.5Z" fill="#fff"/>
                      <path d="M12.7,18.7v14.5c0,3.8-2.5,7.1-6,8.1s-.3,0-.3,0l2.4,1.9,5.9.7s.3-.3.4-.4c2.6-2.7,4.1-6.4,4.1-10.4v-14.5h-6.6Z" fill="#fff"/>
                      <path d="M19.3,13.5c0-1.8-1.5-3.3-3.3-3.3s-3.3,1.5-3.3,3.3,1.5,3.3,3.3,3.3,3.3-1.5,3.3-3.3Z" fill="#fff"/>
                    </g>
                    <path d="M44.5,44.5H12.3c-4.7,0-8.4-3.8-8.4-8.4V3.8h32.3c4.7,0,8.4,3.8,8.4,8.4v32.3ZM5.1,5v31c0,4,3.2,7.2,7.2,7.2h31V12.2c0-4-3.2-7.2-7.2-7.2H5.1Z" fill="#fff"/>
                  </g>
                </g>
              </svg>

              <p className="text-center text-gray-700 text-sm italic">
                {t(lang, "about.environment.tagline")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — JTECH EM NÚMEROS */}
      <section className="py-16 bg-white pt-32" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 70%, #e8e8e8 100%)' }}>
        <Container>
          <div style={{ marginBottom: '5rem' }}>
            <div className="inline-block">
              <h2 className="font-bold text-left">{t(lang, "about.numbers.title")}</h2>
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

      {/* Componente de Scroll to Top com mouse animado */}
      <ScrollToTop showThreshold={200} />
    </>
  )
}