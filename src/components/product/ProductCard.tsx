import { ArrowRight } from "lucide-react"
import { Lang, t, buildPath } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"
import { LogoBySlug } from "../logos/LogoBySlug"
import type { Product } from "../../data/products"

interface ProductCardProps {
  product: Product
  lang: Lang
  featured?: boolean
}

export function ProductCard({ product, lang, featured = false }: ProductCardProps) {
  return (
    <article
      className={`group relative rounded-lg p-6 flex flex-col h-full transition-all duration-500 overflow-hidden ${
        featured
          ? "bg-[#0B0B0B] text-white shadow-xl scale-105"
          : "bg-white border border-gray-200 hover:shadow-2xl hover:-translate-y-2 hover:border-[#E30613]/20"
      }`}
    >
      {/* Glow effect on hover */}
      {!featured && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#E30613]/0 via-[#E30613]/5 to-[#E30613]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      <div className="mb-4 relative">
        <LogoBySlug slug={product.slug} variant={featured ? "white" : "default"} />
      </div>
      <h3
        className={`font-bold text-lg mb-2 transition-colors duration-300 ${
          featured
            ? "text-white"
            : "text-gray-600 group-hover:text-[#E30613]"
        }`}
      >
        {product.name}
      </h3>
      <p className={`text-sm leading-relaxed mb-4 flex-1 ${featured ? "text-white/70" : "text-gray-600"}`}>
        {product.tagline}
      </p>
      <div className="flex flex-wrap gap-1 mb-4">
        {product.badges.slice(0, 2).map((badge) => (
          <span
            key={badge}
            className={`text-xs px-2 py-0.5 rounded-full ${
              featured
                ? "bg-white/10 text-white/80"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {badge}
          </span>
        ))}
      </div>
      <a
        href={buildPath(lang, getRoute("solutionDetail", lang, { slug: product.slug }))}
        className={`inline-flex items-center gap-1 text-sm font-semibold transition-colors ${
          featured
            ? "text-[#E30613] hover:text-red-400"
            : "text-[#E30613] hover:text-[#C10511]"
        }`}
      >
        {t(lang, "common.learnmore")}
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </a>
    </article>
  )
}
