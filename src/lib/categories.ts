/**
 * Sistema centralizado de categorias - REFATORADO
 * Agora baseado em content-taxonomy.ts (fonte de verdade)
 */

import type { Post } from "../data/posts"
import type { Lang } from "./i18n"
import { CONTENT_FILTER_CONFIGS, getFilterConfig, normalizeToSlug as taxonomyNormalizeToSlug } from "./content-taxonomy"

export interface Category {
  slug: string
  name: string
  count?: number
  image?: string
  // Metadados para futuro CMS
  metadata?: {
    description?: string
    color?: string
    icon?: string
  }
}

/**
 * Normaliza uma string para slug (re-exporta da taxonomia)
 */
export function normalizeToSlug(text: string): string {
  return taxonomyNormalizeToSlug(text)
}

/**
 * Extrai categorias únicas dos posts com contagem
 * ✅ AGORA: Valida contra a taxonomia oficial
 */
export function extractCategoriesFromPosts(posts: Post[], lang: Lang): Category[] {
  const categoryMap = new Map<string, { name: string; count: number }>()

  posts.forEach(post => {
    const categoryName = post.category?.trim()
    if (!categoryName) return

    const slug = normalizeToSlug(categoryName)
    
    if (categoryMap.has(slug)) {
      categoryMap.get(slug)!.count++
    } else {
      categoryMap.set(slug, {
        name: categoryName,
        count: 1
      })
    }
  })

  // Converter para array
  const categories: Category[] = Array.from(categoryMap.entries())
    .map(([slug, data]) => ({
      slug,
      name: data.name,
      count: data.count
    }))

  // ✅ ORDENAR pela ordem da taxonomia oficial (ContentPage)
  const orderedCategories = categories.sort((a, b) => {
    const configA = getFilterConfig(a.slug)
    const configB = getFilterConfig(b.slug)
    
    if (!configA) return 1
    if (!configB) return -1
    
    return configA.order - configB.order
  })

  return orderedCategories
}

/**
 * Adiciona categoria "Todos" no início
 */
export function getCategoriesWithAll(posts: Post[], lang: Lang, allLabel: string): Category[] {
  const categories = extractCategoriesFromPosts(posts, lang)
  
  return [
    {
      slug: "all",
      name: allLabel,
      count: posts.length
    },
    ...categories
  ]
}

/**
 * Filtra posts por categoria (com matching normalizado)
 */
export function filterPostsByCategory(posts: Post[], categorySlug: string): Post[] {
  if (categorySlug === "all" || !categorySlug) {
    return posts
  }

  return posts.filter(post => {
    if (!post.category) return false
    const postSlug = normalizeToSlug(post.category)
    return postSlug === categorySlug
  })
}

/**
 * Busca uma categoria pelo slug
 */
export function getCategoryBySlug(categories: Category[], slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

/**
 * ✅ NOVO: Obtém categorias disponíveis (com posts) vs. esperadas (da taxonomia)
 */
export function getAvailableVsExpectedCategories(posts: Post[]): {
  available: string[]
  expected: string[]
  missing: string[]
} {
  const availableCategories = [...new Set(posts.map(p => normalizeToSlug(p.category)))].filter(Boolean)
  const expectedCategories = CONTENT_FILTER_CONFIGS.map(c => c.slug)
  const missing = expectedCategories.filter(slug => !availableCategories.includes(slug))

  return {
    available: availableCategories,
    expected: expectedCategories,
    missing
  }
}

/**
 * Parse query params da URL hash
 */
export function parseHashParams(hash: string): Record<string, string> {
  const params: Record<string, string> = {}
  const queryIndex = hash.indexOf('?')
  
  if (queryIndex === -1) {
    return params
  }

  const queryString = hash.slice(queryIndex + 1)
  const pairs = queryString.split('&')
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=')
    if (key && value) {
      params[decodeURIComponent(key)] = decodeURIComponent(value)
    }
  })
  
  return params
}

/**
 * Build URL com query params
 */
export function buildHashUrl(path: string, params?: Record<string, string>): string {
  const basePath = path.startsWith('#') ? path.slice(1) : path
  
  if (!params || Object.keys(params).length === 0) {
    return `#${basePath}`
  }

  const queryString = Object.entries(params)
    .filter(([_, value]) => value != null && value !== '' && value !== 'all')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return `#${basePath}${queryString ? '?' + queryString : ''}`
}
