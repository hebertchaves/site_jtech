import { Calendar, Clock, User } from "lucide-react"
import { useState, useEffect } from "react"
import { marked } from "marked"
import { Lang, t } from "../lib/i18n"
import { Post } from "../data/posts"
import { Container } from "../components/layout/Container"
import { ScrollToTop } from "../components/ScrollToTop"
import { PreviewBadge } from "../components/PreviewBadge"
import { getContentProvider } from "../providers"
import { getRoute } from "../lib/routes"

interface PostPageProps {
  lang: Lang
  slug: string
}

// breaks: true → single Enter vira <br>, como o usuário espera ao editar no Strapi
marked.use({ breaks: true })

/**
 * Render content that may be plain text, HTML, or Markdown.
 * - If it contains HTML tags → render as HTML directly
 * - Otherwise → parse as Markdown (with breaks: true) then render as HTML
 */
function renderContent(raw: string): string {
  if (!raw) return ""
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(raw)
  if (hasHtmlTags) return raw
  return marked.parse(raw) as string
}

export function PostPage({ lang, slug }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const provider = getContentProvider()

        const previewMode =
          "isPreviewMode" in provider &&
          typeof provider.isPreviewMode === "function" &&
          provider.isPreviewMode()

        setIsPreview(previewMode)

        const data = await provider.getPostBySlug(lang, slug)
        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
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

  if (!post) {
    return (
      <Container className="py-20">
        <h1 className="text-3xl mb-4">{t(lang, "common.error")}</h1>
        <p className="text-gray-600">Conteúdo não encontrado.</p>
      </Container>
    )
  }

  const title   = post.title[lang]   || post.title.pt   || post.title.en   || ""
  const excerpt = post.excerpt[lang] || post.excerpt.pt  || post.excerpt.en || ""
  const rawContent = post.content[lang] || post.content.pt || post.content.en || ""

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <article className="pt-32 pb-20">
      {/* Preview Badge */}
      {isPreview && <PreviewBadge />}

      {/* POST HEADER */}
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min
                </span>
              )}
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl mb-0">{title}</h1>
            {excerpt && <p className="text-2xl text-gray-600">{excerpt}</p>}
          </div>

          {/* FEATURED IMAGE */}
          {post.image && (
            <div className="relative h-96 rounded-lg overflow-hidden mb-12">
              <img
                src={post.image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* POST CONTENT */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-600 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#E30613] prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-[#E30613] prose-blockquote:pl-4 prose-blockquote:text-gray-500 prose-blockquote:italic prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: renderContent(rawContent) }}
          />

          {/* BACK LINK */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <a
              href={`#/${lang}${getRoute("allPosts", lang)}`}
              className="text-[#E30613] hover:underline"
            >
              ← {t(lang, "content.posts.back_to_all") || "Voltar para Todos os Artigos"}
            </a>
          </div>
        </div>
      </Container>

      <ScrollToTop showThreshold={200} />
    </article>
  )
}
