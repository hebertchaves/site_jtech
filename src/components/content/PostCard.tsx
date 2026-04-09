import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Lang, t, buildPath } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"
import type { Post } from "../../data/posts"

interface PostCardProps {
  post: Post
  lang: Lang
}

export function PostCard({ post, lang }: PostCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {!imgError && post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-4xl font-bold opacity-20">J</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-[#E30613] text-white text-xs font-semibold px-2 py-1 rounded">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#0B0B0B] text-lg leading-snug mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <a
          href={buildPath(lang, getRoute("post", lang, { slug: post.slug }))}
          className="inline-flex items-center gap-1 text-[#E30613] font-semibold text-sm hover:underline mt-auto"
        >
          {t(lang, "common.readmore")} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  )
}
