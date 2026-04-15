import { useState } from "react"
import { Download, BookOpen } from "lucide-react"
import { Lang, t, buildPath } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"
import type { Ebook } from "../../data/ebooks"

interface EbookCardProps {
  ebook: Ebook
  lang: Lang
}

export function EbookCard({ ebook, lang }: EbookCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {!imgError && ebook.coverImage ? (
          <img
            src={ebook.coverImage}
            alt={ebook.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0B0B0B] to-gray-700">
            <BookOpen className="h-16 w-16 text-white/20" />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        {ebook.pages > 0 && (
          <p className="text-xs text-gray-400 mb-2">
            {ebook.pages} {t(lang, "ebooks.pages")}
          </p>
        )}
        <h3 className="font-bold text-gray-600 text-base leading-snug mb-2 line-clamp-3 flex-1">
          {ebook.title}
        </h3>
        <a
          href={buildPath(lang, getRoute("ebookDetail", lang, { slug: ebook.slug }))}
          className="inline-flex items-center gap-2 mt-4 bg-[#0B0B0B] hover:bg-gray-800 text-white text-sm font-semibold py-2 px-4 rounded transition-colors"
        >
          <Download className="h-4 w-4" />
          {t(lang, "ebooks.download")}
        </a>
      </div>
    </article>
  )
}
