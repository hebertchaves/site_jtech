/**
 * ============================================================================
 * TAXONOMIA DE CONTEÚDO - FONTE DE VERDADE
 * ============================================================================
 * 
 * Este arquivo define a arquitetura de categorias entre ContentPage e AllPostsPage.
 * 
 * REGRAS:
 * 1. ContentPage exibe 4 filtros visuais (cards com imagens)
 * 2. Cada filtro mapeia para uma ou mais categorias reais dos posts
 * 3. Posts devem usar categorias definidas aqui (não strings livres)
 * 4. Sistema gera filtros dinamicamente, mas valida contra esta taxonomia
 * 
 * MANUTENÇÃO:
 * - Para adicionar novo filtro: adicione em CONTENT_FILTERS
 * - Para adicionar nova categoria: adicione em POST_CATEGORIES
 * - Sempre mantenha o mapeamento categoryToFilter atualizado
 */

import type { Lang } from "./i18n"

/**
 * Filtros da ContentPage (cards visuais com imagens)
 * Estes são os 4 grupos principais que aparecem na página de conteúdo
 */
export const CONTENT_FILTERS = {
  JTECH: "jtech",
  SANITATION: "sanitation",
  NEWS: "news",
  TECHNOLOGY: "technology",
} as const

export type ContentFilter = typeof CONTENT_FILTERS[keyof typeof CONTENT_FILTERS]

/**
 * Categorias reais que podem ser atribuídas aos posts
 * Estas são as strings que aparecem no campo "category" dos posts
 */
export const POST_CATEGORIES = {
  JTECH: "Jtech",
  SANEAMENTO: "Saneamento",
  NOVIDADES: "Novidades",
  TECNOLOGIA: "Tecnologia",
} as const

export type PostCategory = typeof POST_CATEGORIES[keyof typeof POST_CATEGORIES]

/**
 * Configuração de cada filtro da ContentPage
 */
export interface ContentFilterConfig {
  id: ContentFilter
  slug: string
  translationKey: string
  // Categorias de posts que pertencem a este filtro
  categories: string[]
  // Imagem do card na ContentPage
  image: string
  // Ordem de exibição
  order: number
}

/**
 * Definição completa dos 4 filtros da ContentPage
 * Esta é a configuração mestra que sincroniza ContentPage ↔ AllPostsPage
 */
export const CONTENT_FILTER_CONFIGS: ContentFilterConfig[] = [
  {
    id: CONTENT_FILTERS.JTECH,
    slug: "jtech",  // ✅ Corresponde a normalizeToSlug("Jtech") = "jtech"
    translationKey: "content.category.jtech",
    categories: [POST_CATEGORIES.JTECH],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    order: 1,
  },
  {
    id: CONTENT_FILTERS.SANITATION,
    slug: "saneamento",  // ✅ CORRIGIDO: normalizeToSlug("Saneamento") = "saneamento"
    translationKey: "content.category.sanitation",
    categories: [POST_CATEGORIES.SANEAMENTO],
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    order: 2,
  },
  {
    id: CONTENT_FILTERS.NEWS,
    slug: "novidades",  // ✅ CORRIGIDO: normalizeToSlug("Novidades") = "novidades"
    translationKey: "content.category.news",
    categories: [POST_CATEGORIES.NOVIDADES],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
    order: 3,
  },
  {
    id: CONTENT_FILTERS.TECHNOLOGY,
    slug: "tecnologia",  // ✅ CORRIGIDO: normalizeToSlug("Tecnologia") = "tecnologia"
    translationKey: "content.category.technology",
    categories: [POST_CATEGORIES.TECNOLOGIA],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    order: 4,
  },
]

/**
 * Mapeia uma categoria de post para o filtro da ContentPage correspondente
 */
export function getFilterForCategory(category: string): ContentFilter | null {
  const normalizedCategory = category?.trim()
  
  for (const config of CONTENT_FILTER_CONFIGS) {
    if (config.categories.includes(normalizedCategory)) {
      return config.id
    }
  }
  
  return null
}

/**
 * Obtém a configuração de um filtro pelo slug
 */
export function getFilterConfig(slug: string): ContentFilterConfig | undefined {
  return CONTENT_FILTER_CONFIGS.find(c => c.slug === slug)
}

/**
 * Verifica se uma categoria de post é válida
 */
export function isValidCategory(category: string): boolean {
  return getFilterForCategory(category) !== null
}

/**
 * Obtém todas as categorias válidas
 */
export function getValidCategories(): string[] {
  return Object.values(POST_CATEGORIES)
}

/**
 * Normaliza uma string para slug (mantém compatibilidade)
 */
export function normalizeToSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}