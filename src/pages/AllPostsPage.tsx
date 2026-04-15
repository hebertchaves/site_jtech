import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { getRoute } from "../lib/routes"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { calculateBannerOffset } from "../lib/banner-alignment"
import { ScrollToTop } from "../components/ScrollToTop"
import { getContentProvider } from "../providers"
import { EmptyCategory } from "../components/EmptyCategory"
import { 
  extractCategoriesFromPosts, 
  getCategoriesWithAll,
  filterPostsByCategory,
  parseHashParams,
  buildHashUrl,
  getCategoryBySlug,
  type Category
} from "../lib/categories"
import type { Post } from "../data/posts"

interface AllPostsPageProps {
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

export function AllPostsPage({ lang }: AllPostsPageProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [bannerOffset, setBannerOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  // Buscar posts do CMS
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        console.log('[AllPostsPage] Fetching all posts...')
        const provider = getContentProvider()
        const postsData = await provider.getPosts(lang, 100)
        console.log('[AllPostsPage] Posts fetched:', postsData.length)
        
        setPosts(postsData)
        setFilteredPosts(postsData)
        
        // ✅ DINAMICAMENTE GERAR CATEGORIAS DOS POSTS REAIS
        const dynamicCategories = getCategoriesWithAll(
          postsData, 
          lang, 
          t(lang, "content.category.all") || "Todos"
        )
        console.log('[AllPostsPage] Dynamic categories:', dynamicCategories)
        setCategories(dynamicCategories)
        
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [lang])

  // Ler categoria da URL ao carregar a página
  useEffect(() => {
    const params = parseHashParams(window.location.hash)
    if (params.category) {
      console.log('[AllPostsPage] Category from URL:', params.category)
      setSelectedCategory(params.category)
    } else {
      setSelectedCategory("all")
    }
  }, [])

  // Filtrar posts por categoria e busca
  useEffect(() => {
    let result = [...posts]

    // ✅ Filtro de categoria usando sistema centralizado
    result = filterPostsByCategory(result, selectedCategory)
    console.log('[AllPostsPage] After category filter:', selectedCategory, '→', result.length, 'posts')

    // Filtro de busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(post => {
        const title = typeof post.title === 'object' ? post.title[lang] : post.title
        const excerpt = typeof post.excerpt === 'object' ? post.excerpt[lang] : post.excerpt
        const category = post.category || ""
        
        return (
          title?.toLowerCase().includes(query) ||
          excerpt?.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query)
        )
      })
    }

    setFilteredPosts(result)
    setCurrentPage(1) // Reset para primeira página ao filtrar
  }, [selectedCategory, searchQuery, posts, lang])

  // Calcular offset do banner
  useEffect(() => {
    const updateOffset = () => {
      setBannerOffset(calculateBannerOffset())
    }
    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  // Paginação
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const navigateToPost = (slug: string) => {
    const postBasePath = getRoute("content", lang)
    window.location.hash = `#/${lang}${postBasePath}/${slug}`
  }

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug === selectedCategory ? "all" : categorySlug)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch {
      return dateString
    }
  }

  return (
    <>
      {/* ====================================
          HERO SECTION
          Banner principal da página de Blog
          ==================================== */}
      <section
        className="relative bg-[#0B0B0B] text-white pt-32 pb-20 min-h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-blog-todo-conteudo.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Profissionais em ambiente de trabalho utilizando dispositivos digitais, representando o acesso a conteúdos, artigos e materiais da Jtech sobre tecnologia no saneamento"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white">
                {t(lang, "content.posts.all_title") || "Todos os Artigos"}
              </h1>
              <p className="text-base md:text-lg text-white">
                {t(lang, "content.posts.all_subtitle") || "Explore nosso conteúdo completo sobre tecnologia, inovação e saneamento"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================
          FILTERS SECTION
          Filtros de categoria e busca de posts
          ==================================== */}
      <section className="py-8 bg-white border-b">
        <Container>
          {/* Filtros de categoria + busca na mesma linha */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 mr-2 flex-shrink-0">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{t(lang, "content.posts.filter_by") || "Filtrar por"}:</span>
            </div>
            {categories.map((cat) => (
              <Button
                key={cat.slug}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(cat.slug)}
                className={
                  selectedCategory === cat.slug
                    ? "bg-[#E30613] hover:bg-[#C10511] text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
                }
              >
                {cat.name}
                {cat.count !== undefined && cat.count > 0 && (
                  <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                    selectedCategory === cat.slug
                      ? "bg-white/20"
                      : "bg-gray-100"
                  }`}>
                    {cat.count}
                  </span>
                )}
              </Button>
            ))}

            {/* Busca */}
            <div className="relative ml-auto flex-shrink-0 w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={t(lang, "content.posts.search_placeholder") || "Buscar artigos..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ====================================
          POSTS GRID SECTION
          Grid de posts com paginação
          ==================================== */}
      <section className="py-16 bg-gray-50">
        <Container>
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E30613]"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            // ✅ NOVO: Estado vazio inteligente (categoria sem conteúdo)
            selectedCategory !== "all" && !searchQuery ? (
              <EmptyCategory
                lang={lang}
                selectedCategoryName={
                  getCategoryBySlug(categories, selectedCategory)?.name || selectedCategory
                }
                availableCategories={categories}
                onCategorySelect={(slug) => setSelectedCategory(slug)}
                onClearFilters={() => setSelectedCategory("all")}
              />
            ) : (
              // Estado vazio de busca sem resultado
              <div className="text-center py-20">
                <p className="text-xl text-gray-500 mb-4">
                  {t(lang, "content.posts.no_results") || "Nenhum artigo encontrado"}
                </p>
                {(selectedCategory !== "all" || searchQuery) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("all")
                      setSearchQuery("")
                    }}
                    className="border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white"
                  >
                    {t(lang, "content.posts.clear_filters") || "Limpar filtros"}
                  </Button>
                )}
              </div>
            )
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentPosts.map((post, idx) => (
                  <div
                    key={post.id || idx}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col"
                    onClick={() => navigateToPost(post.slug)}
                  >
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={post.image}
                        alt={typeof post.title === 'object' ? post.title[lang] : post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#E30613] text-white text-xs px-3 py-1 rounded-full">
                          {post.category || "Artigo"}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span>{formatDate(post.publishedAt)}</span>
                        {post.readTime && (
                          <>
                            <span>•</span>
                            <span>{post.readTime} min</span>
                          </>
                        )}
                      </div>

                      <h3 className="text-xl mb-2 line-clamp-2 group-hover:text-[#E30613] transition-colors">
                        {typeof post.title === 'object' ? post.title[lang] : post.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {typeof post.excerpt === 'object' ? post.excerpt[lang] : post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500">{post.author || "Jtech"}</span>
                        <span className="text-[#E30613] text-sm group-hover:underline">
                          {t(lang, "content.readmore") || "Ler mais"} →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINAÇÃO */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-gray-300"
                  >
                    ← {t(lang, "common.previous") || "Anterior"}
                  </Button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-[#E30613] hover:bg-[#C10511]"
                            : "border-gray-300 hover:bg-gray-50"
                        }
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-gray-300"
                  >
                    {t(lang, "common.next") || "Próximo"} →
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      <ScrollToTop showThreshold={200} />
    </>
  )
}