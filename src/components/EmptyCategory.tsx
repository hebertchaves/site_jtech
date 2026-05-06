/**
 * Componente de Estado Vazio Inteligente
 * Exibido quando uma categoria selecionada não possui posts
 */

import { Info } from "lucide-react"
import { Button } from "./ui/button"
import type { Lang } from "../lib/i18n"
import { t } from "../lib/i18n"
import type { Category } from "../lib/categories"

interface EmptyCategoryProps {
  lang: Lang
  selectedCategoryName: string
  availableCategories: Category[]
  onCategorySelect: (slug: string) => void
  onClearFilters: () => void
}

export function EmptyCategory({
  lang,
  selectedCategoryName,
  availableCategories,
  onCategorySelect,
  onClearFilters,
}: EmptyCategoryProps) {
  // Filtrar apenas categorias com conteúdo (count > 0)
  const categoriesWithContent = availableCategories.filter(cat => 
    cat.slug !== "all" && cat.count && cat.count > 0
  )

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      {/* Ícone */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Info className="w-8 h-8 text-gray-400" />
        </div>
      </div>

      {/* Mensagem principal */}
      <h3 className="text-2xl mb-3 text-gray-800">
        {t(lang, "content.posts.no_content_title") || "Nenhum conteúdo disponível"}
      </h3>
      
      <p className="text-gray-600 mb-2">
        {t(lang, "content.posts.no_content_description") || "No momento, não há artigos publicados na categoria"}{" "}
        <span className="text-[#E30613]">"{selectedCategoryName}"</span>.
      </p>
      
      <p className="text-sm text-gray-500 mb-8">
        {t(lang, "content.posts.no_content_hint") || "Explore outras categorias ou volte mais tarde para ver novos conteúdos."}
      </p>

      {/* Botão para limpar filtros */}
      <div className="flex justify-center gap-3 mb-10">
        <Button
          variant="default"
          onClick={onClearFilters}
          className="bg-[#E30613] hover:bg-[#C10511] text-white"
        >
          {t(lang, "content.posts.view_all") || "Ver todos os artigos"}
        </Button>
      </div>

      {/* Lista de categorias disponíveis */}
      {categoriesWithContent.length > 0 && (
        <div className="border-t border-gray-200 pt-8">
          <h4 className="text-sm text-gray-500 mb-4">
            {t(lang, "content.posts.available_categories") || "Categorias disponíveis"}:
          </h4>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categoriesWithContent.map(cat => (
              <Button
                key={cat.slug}
                variant="outline"
                size="sm"
                onClick={() => onCategorySelect(cat.slug)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#E30613] hover:text-[#E30613] transition-colors"
              >
                {cat.name}
                {cat.count && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-xs bg-gray-100">
                    {cat.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
