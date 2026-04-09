import { useState, useEffect } from "react"
import { Play, Plus } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { getRoute } from "../lib/routes"
import { buildHashUrl, extractCategoriesFromPosts, normalizeToSlug, type Category } from "../lib/categories"
import { CONTENT_FILTER_CONFIGS } from "../lib/content-taxonomy"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { submitLead } from "../lib/leads"
import { trackFormSubmit } from "../lib/analytics"
import { calculateBannerOffset } from "../lib/banner-alignment"
import { ScrollToTop } from "../components/ScrollToTop"
import { getContentProvider } from "../providers"
import type { Post } from "../data/posts"
import type { Ebook } from "../data/ebooks"

interface ContentPageProps {
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

export function ContentPage({ lang }: ContentPageProps) {
  const [newsletterData, setNewsletterData] = useState({ name: "", email: "", company: "" })
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null)
  const [bannerOffset, setBannerOffset] = useState(0)
  
  // Estado para dados do CMS
  const [posts, setPosts] = useState<Post[]>([])
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Buscar posts e ebooks do CMS
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      try {
        const provider = getContentProvider()
        
        const [postsData, ebooksData] = await Promise.all([
          provider.getPosts(lang),
          provider.getEbooks(lang)
        ])
        
        setPosts(postsData.slice(0, 3)) // Mostrar apenas 3 posts iniciais
        setEbooks(ebooksData.slice(0, 3)) // Mostrar apenas 3 ebooks
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [lang])

  // Calcular o offset do logo no header para alinhar o título
  useEffect(() => {
    const updateOffset = () => {
      setBannerOffset(calculateBannerOffset())
    }

    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  const categories: Category[] = [
    { 
      name: t(lang, "content.categories.jtech"), 
      slug: "jtech",  // ✅ Corresponde a POST_CATEGORIES.JTECH = "Jtech"
      image: "https://conteudo.sansys.app/site/img/jtech-conteudos-categoria-jtech.webp" 
    },
    { 
      name: t(lang, "content.categories.saneamento"), 
      slug: "saneamento",  // ✅ CORRIGIDO: Corresponde a POST_CATEGORIES.SANEAMENTO = "Saneamento"
      image: "https://conteudo.sansys.app/site/img/jtech-conteudos-categoria-saneamento.webp" 
    },
    { 
      name: t(lang, "content.categories.novidades"), 
      slug: "novidades",  // ✅ CORRIGIDO: Corresponde a POST_CATEGORIES.NOVIDADES = "Novidades"
      image: "https://conteudo.sansys.app/site/img/jtech-conteudos-categoria-novidades.webp" 
    },
    { 
      name: t(lang, "content.categories.tecnologia"), 
      slug: "tecnologia",  // ✅ CORRIGIDO: Corresponde a POST_CATEGORIES.TECNOLOGIA = "Tecnologia"
      image: "https://conteudo.sansys.app/site/img/jtech-conteudos-categoria-tecnologia.webp" 
    },
  ]

  const videos = [
    { thumbnail: "https://conteudo.sansys.app/site/img/jtech-conteudo-tecnologia.webp", videoUrl: "https://www.youtube.com/live/kU9Ug3t9thE" },
    { thumbnail: "https://conteudo.sansys.app/site/img/jtech-conteudo-corporativo.webp", videoUrl: "https://www.youtube.com/watch?v=euZ3-0wLFDY&t=1s" },
    { thumbnail: "https://conteudo.sansys.app/site/img/jtech-conteudo-colaboração.webp", videoUrl: "https://mail.google.com/mail/u/0/#chat/dm/6jpqNsAAAAE" },
  ]

  // Funções de navegação
  const navigateToPost = (slug: string) => {
    // ✅ Rota correta: usa getRoute para traduzir corretamente /conteudo/:slug
    const postBasePath = getRoute("content", lang)
    window.location.hash = `#/${lang}${postBasePath}/${slug}`
  }

  const navigateToEbook = (slug: string) => {
    // ✅ Rota correta: /ebooks/:slug (plural, não singular)
    const ebookBasePath = getRoute("ebooks", lang)
    window.location.hash = `#/${lang}${ebookBasePath}/${slug}`
  }

  const navigateToAllPosts = () => {
    // ✅ Navegar para a página de todos os artigos
    const allPostsPath = getRoute("allPosts", lang)
    window.location.hash = `#/${lang}${allPostsPath}`
  }

  const navigateToAllEbooks = () => {
    // ✅ Rota correta: /ebooks (traduzido)
    const ebooksPath = getRoute("ebooks", lang)
    window.location.hash = `#/${lang}${ebooksPath}`
  }

  const handleCategoryFilter = (categorySlug: string) => {
    // ✅ Navegar para página AllPostsPage com filtro de categoria
    const allPostsPath = getRoute("allPosts", lang)
    const url = buildHashUrl(`/${lang}${allPostsPath}`, { category: categorySlug })
    window.location.hash = url
  }

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank')
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterLoading) return

    setNewsletterLoading(true)
    setNewsletterMsg(null)

    try {
      const res = await submitLead(
        {
          name: newsletterData.name,
          email: newsletterData.email,
          company: newsletterData.company,
          form_type: "newsletter",
          form_name: "newsletter_content_page",
        },
        lang
      )

      if (!res.success) {
        setNewsletterMsg(res.error || t(lang, "contact.error"))
        return
      }

      trackFormSubmit("newsletter", "newsletter_content_page")
      setNewsletterMsg(t(lang, "contact.success"))
      setNewsletterData({ name: "", email: "", company: "" })
    } catch (err) {
      console.error("Newsletter submit error:", err)
      setNewsletterMsg(t(lang, "contact.error"))
    } finally {
      setNewsletterLoading(false)
    }
  }

  return (
    <>
      {/* ====================================
          HERO SECTION
          Banner principal da página de Conteúdo
          ==================================== */}
      <section 
        className="relative bg-[#0B0B0B] text-white pt-32 pb-20 min-h-[500px] flex items-center"
        style={{
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-blog-conteudos.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Fundo tecnológico representando conteúdos digitais, conhecimento e inovação em saneamento"
      >
        {/* Container principal */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
            <div className="max-w-2xl">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white"
                style={{ lineHeight: '1.1' }}
                dangerouslySetInnerHTML={{ __html: t(lang, "content.hero.title") }}
              />
              <p 
                className="text-base md:text-lg text-white"
                dangerouslySetInnerHTML={{ __html: t(lang, "content.hero.subtitle") }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          CATEGORY FILTERS SECTION
          Filtros de categorias de conteúdo
          ==================================== */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="mb-8 text-center font-extralight">
            {t(lang, "content.categories.intro").split("inspirar e informar você").length > 1 ? (
              <>
                {t(lang, "content.categories.intro").split("inspirar e informar você")[0]}
                <span className="font-bold">inspirar e informar você</span>
                {t(lang, "content.categories.intro").split("inspirar e informar você")[1]}
              </>
            ) : t(lang, "content.categories.intro").split("inspire and inform you").length > 1 ? (
              <>
                {t(lang, "content.categories.intro").split("inspire and inform you")[0]}
                <span className="font-bold">inspire and inform you</span>
                {t(lang, "content.categories.intro").split("inspire and inform you")[1]}
              </>
            ) : t(lang, "content.categories.intro").split("inspirar e informarle").length > 1 ? (
              <>
                {t(lang, "content.categories.intro").split("inspirar e informarle")[0]}
                <span className="font-bold">inspirar e informarle</span>
                {t(lang, "content.categories.intro").split("inspirar e informarle")[1]}
              </>
            ) : t(lang, "content.categories.intro").split("vous inspirer et vous informer").length > 1 ? (
              <>
                {t(lang, "content.categories.intro").split("vous inspirer et vous informer")[0]}
                <span className="font-bold">vous inspirer et vous informer</span>
                {t(lang, "content.categories.intro").split("vous inspirer et vous informer")[1]}
              </>
            ) : (
              t(lang, "content.categories.intro")
            )}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCategoryFilter(cat.slug)
                }}
                className={`relative rounded-lg overflow-hidden cursor-pointer group border-0 p-0 ${
                  selectedCategory === cat.slug ? 'ring-4 ring-[#E30613]' : ''
                }`}
                style={{ height: '192px', width: '100%', background: 'none' }}
              >
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                  style={{ zIndex: 0 }}
                />
                <div className="absolute inset-0 group-hover:bg-black/30 transition-all flex items-center justify-center pointer-events-none" style={{ zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                  <span className="text-white text-2xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{cat.name}</span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* ====================================
          LATEST POSTS SECTION
          Últimos artigos publicados
          ==================================== */}
      <section className="py-16 bg-gray-50">
        <Container>
          {/* Título com linha decorativa */}
          <div className="mb-12">
            <div className="inline-block">
              <h2 className="text-4xl font-extralight">
                {t(lang, "content.posts.title")}
              </h2>
              <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{t(lang, "common.loading") || "Carregando..."}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum post encontrado.</p>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {posts.map((post, idx) => (
                  <div
                    key={post.id || idx}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-3 gap-0 cursor-pointer group"
                    onClick={() => navigateToPost(post.slug)}
                  >
                    <div className="md:col-span-1 relative overflow-hidden h-64 md:h-auto">
                      <ImageWithFallback
                        src={post.image}
                        alt={typeof post.title === 'object' ? post.title[lang] : post.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="absolute top-4 left-4 bg-[#E30613] text-white text-xs px-3 py-1 rounded-full">
                        {post.category || post.badge || "Artigo"}
                      </span>
                    </div>
                    <div className="md:col-span-2 p-6 flex flex-col justify-start">
                      <h4 className="text-2xl mb-3 line-clamp-2">
                        {typeof post.title === 'object' ? post.title[lang] : post.title}
                      </h4>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {typeof post.excerpt === 'object' ? post.excerpt[lang] : (post.excerpt || post.text)}
                      </p>
                      <div>
                        <Button 
                          variant="outline" 
                          className="border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigateToPost(post.slug)
                          }}
                        >
                          {t(lang, "content.readmore")}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button 
                  onClick={(e) => {
                    e.preventDefault()
                    navigateToAllPosts()
                  }}
                  className="text-[#E30613] hover:text-[#C10511] cursor-pointer text-2xl transition-colors"
                  dangerouslySetInnerHTML={{ __html: t(lang, "content.posts.viewall") }}
                />
              </div>
            </>
          )}
        </Container>
      </section>

      {/* ====================================
          VIDEOS SECTION
          Inovação em Movimento - Vídeos do YouTube
          ==================================== */}
      <section 
        className="py-16 text-white bg-top-forced" 
        style={{
          backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-modulos.webp)',
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0B0B0B',
          backgroundAttachment: 'scroll'
        }}
        role="img"
        aria-label="Fundo abstrato com elementos gráficos representando módulos e soluções tecnológicas"
      >
        <Container>
          {/* Título com linha decorativa - centralizado */}
          <div className="mb-12 text-center flex flex-col items-center">
            <div className="inline-block">
              <h2 className="text-white text-4xl md:text-5xl">
                {t(lang, "content.videos.title").split("movimento").length > 1 ? (
                  <>
                    {t(lang, "content.videos.title").split("movimento")[0]}
                    <span className="font-bold">movimento</span>
                  </>
                ) : t(lang, "content.videos.title").split("motion").length > 1 ? (
                  <>
                    {t(lang, "content.videos.title").split("motion")[0]}
                    <span className="font-bold">motion</span>
                  </>
                ) : t(lang, "content.videos.title").split("movimiento").length > 1 ? (
                  <>
                    {t(lang, "content.videos.title").split("movimiento")[0]}
                    <span className="font-bold">movimiento</span>
                  </>
                ) : t(lang, "content.videos.title").split("mouvement").length > 1 ? (
                  <>
                    {t(lang, "content.videos.title").split("mouvement")[0]}
                    <span className="font-bold">mouvement</span>
                  </>
                ) : (
                  t(lang, "content.videos.title")
                )}
              </h2>
              <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
            </div>
          </div>

          <p className="text-white text-center text-lg max-w-3xl mb-12 mx-auto">
            {t(lang, "content.videos.subtitle")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {videos.map((video, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden cursor-pointer group bg-black"
              >
                <ImageWithFallback
                  src={video.thumbnail}
                  alt={`${t(lang, "content.videos.alt")} ${idx + 1}`}
                  className="w-full h-64 object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#E30613] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" onClick={() => handleVideoClick(video.videoUrl)}>
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg">
              {t(lang, "content.videos.youtube")}{" "}
              <a 
                href="https://www.youtube.com/@jtechsistemas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-[#E30613] hover:text-[#C10511] transition-colors underline"
              >
                YouTube
              </a>!
            </p>
          </div>
        </Container>
      </section>

      {/* ====================================
          EBOOKS SECTION
          E-books disponíveis para download
          ==================================== */}
      <section className="py-16 bg-gray-50">
        <Container>
          {/* Título com linha decorativa */}
          <div className="mb-6">
            <div className="inline-block">
              <h2 className="text-gray-700 text-4xl">
                <span className="font-bold">E-Books</span>
              </h2>
              <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
            </div>
          </div>

          <h3 className="text-gray-700 font-bold text-2xl mb-4">{t(lang, "content.ebooks.subtitle")}</h3>
          <p className="text-gray-700 text-lg mb-12">
            {t(lang, "content.ebooks.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    <h4 className="text-lg mb-4">
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

          <div className="text-center">
            <Button variant="outline" className="border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white" onClick={navigateToAllEbooks}>
              {t(lang, "content.ebooks.viewall")}
            </Button>
          </div>
        </Container>
      </section>

      {/* ====================================
          NEWSLETTER SECTION
          Assinatura de newaletter Jtech 
          ==================================== */}
      <section 
        className="py-16" 
        style={{
          backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-newsletter.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        role="img"
        aria-label="Fundo tecnológico com conexões de dados e visualizações de saneamento"
      >
        <Container>
          {/* Título com linha decorativa - centralizado */}
          <div className="mb-12 text-center flex flex-col items-center">
            <div className="inline-block">
              <h2 className="text-gray-700 text-4xl">
                {t(lang, "content.newsletter.title").split("Newsletter").length > 1 ? (
                  <>
                    {t(lang, "content.newsletter.title").split("Newsletter")[0]}
                    <span className="font-bold">Newsletter</span>
                  </>
                ) : (
                  t(lang, "content.newsletter.title")
                )}
              </h2>
              <div className="h-[2px] bg-[#E30613] w-[70%]"></div>
            </div>
          </div>

          {/* Card com conteúdo */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
              {/* Coluna de formulário */}
              <div className="p-8 lg:p-12">
                <p className="text-gray-700 text-lg mb-6">
                  {t(lang, "content.newsletter.subtitle").split(".").length > 1 ? (
                    <>
                      <span className="font-bold">
                        {t(lang, "content.newsletter.subtitle").split(".")[0]}.
                      </span>
                      {" " + t(lang, "content.newsletter.subtitle").split(".").slice(1).join(".")}
                      {" "}
                      <span className="font-bold text-[#E30613]">{t(lang, "content.newsletter.email_highlight")}</span>.
                    </>
                  ) : (
                    <>
                      {t(lang, "content.newsletter.subtitle")} <span className="font-bold text-[#E30613]">{t(lang, "content.newsletter.email_highlight")}</span>.
                    </>
                  )}
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <Input
                    placeholder={t(lang, "prewhatsapp.name")}
                    value={newsletterData.name}
                    onChange={(e) => setNewsletterData({ ...newsletterData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder={t(lang, "content.newsletter.email")}
                    value={newsletterData.email}
                    onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
                    required
                  />
                  <Input
                    placeholder={t(lang, "prewhatsapp.company")}
                    value={newsletterData.company}
                    onChange={(e) => setNewsletterData({ ...newsletterData, company: e.target.value })}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#E30613] hover:bg-[#C10511]"
                    disabled={newsletterLoading}
                  >
                    {newsletterLoading ? t(lang, "contact.form.sending") : t(lang, "content.newsletter.cta")}
                  </Button>
                </form>

                {newsletterMsg && (
                  <p className="mt-4 text-sm text-gray-700">{newsletterMsg}</p>
                )}
              </div>

              {/* Coluna de imagem - sem padding para tocar as bordas */}
              <div className="relative h-full min-h-[400px] lg:min-h-0">
                <ImageWithFallback
                  src="https://conteudo.sansys.app/site/img/jtech-newsletter-conteudo-digital-atualizacoes-saneamento.webp"
                  alt={t(lang, "content.newsletter.image")}
                  className="absolute inset-0 w-full h-full object-cover"
                />
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