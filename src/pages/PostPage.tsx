import { useState, useEffect } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import { Lang, t, buildPath } from "../lib/i18n"
import { Container } from "../components/layout/Container"
import { ScrollToTop } from "../components/ScrollToTop"
import { contentProvider } from "../providers"
import { getRoute } from "../lib/routes"
import { formatDate } from "../lib/utils"
import type { Post } from "../data/posts"

interface PostPageProps {
  lang: Lang
  slug: string
}

export function PostPage({ lang, slug }: PostPageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    contentProvider.getPostBySlug(slug).then((p) => {
      setPost(p)
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">{t(lang, "common.loading")}</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-700 mb-4">{t(lang, "common.error")}</h1>
          <a href={buildPath(lang, getRoute("content", lang))} className="text-[#E30613] hover:underline">
            {t(lang, "common.back")}
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-[#0B0B0B] text-white">
        <Container className="max-w-4xl">
          <a
            href={buildPath(lang, getRoute("content", lang))}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t(lang, "common.back")}
          </a>
          <span className="inline-block bg-[#E30613] text-white text-xs px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            {post.publishedAt && (
              <span>{formatDate(post.publishedAt, lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US")}</span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min
              </span>
            )}
          </div>
        </Container>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <img src={post.coverImage} alt={post.title} className="w-full h-72 object-cover rounded-xl shadow-lg" />
        </div>
      )}

      {/* Content */}
      <article className="py-12">
        <Container className="max-w-4xl">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#0B0B0B] prose-a:text-[#E30613]"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
          />
        </Container>
      </article>

      <ScrollToTop />
    </>
  )
}
