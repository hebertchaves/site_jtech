import { Lang } from "./i18n"
import { Post } from "../data/posts"
import { Ebook } from "../data/ebooks"

/**
 * Strapi 5 API Response Interfaces
 * Strapi 5 uses flat objects — no `.attributes` wrapper.
 */
export interface StrapiMedia {
  id: number
  documentId: string
  url: string
  name?: string
  alternativeText?: string
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
    large?: { url: string }
  }
}

export interface StrapiPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  readTime?: number
  locale: string
  image?: StrapiMedia | null
  category?: {
    id: number
    documentId: string
    name: string
    slug: string
  } | null
  author?: {
    id: number
    documentId: string
    name: string
    slug?: string
  } | null
}

export interface StrapiEbook {
  id: number
  documentId: string
  title: string
  slug: string
  description: string
  content: string
  pages: number
  category?: string
  locale: string
  downloadUrl?: string
  ctaType?: 'RD_FORM' | 'DIRECT_DOWNLOAD' | 'EXTERNAL_LINK'
  rdFormUrl?: string
  image?: StrapiMedia | null
  thumbnailImage?: StrapiMedia | null
  heroImage?: StrapiMedia | null
}

export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

/**
 * Get base Strapi URL from env
 */
export function getStrapiURL(): string {
  // ✅ FIX: Figma Code Layers compatibility - handle all edge cases
  try {
    if (typeof import.meta !== 'undefined' && 
        import.meta !== null &&
        typeof import.meta.env === 'object' && 
        import.meta.env !== null &&
        typeof import.meta.env.VITE_CMS_URL === 'string') {
      return import.meta.env.VITE_CMS_URL
    }
  } catch (error) {
    // Silently catch any errors accessing import.meta
    console.warn('Could not access import.meta.env, using fallback URL')
  }
  
  // Fallback to localhost for development
  return 'http://localhost:1337'
}

/**
 * Get full media URL
 */
export function getStrapiMediaURL(url: string | undefined): string {
  if (!url) return ''
  
  // If URL is already absolute, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // Otherwise, prepend Strapi base URL
  return `${getStrapiURL()}${url}`
}

/**
 * Map frontend locale (pt, en, es, fr) to Strapi locale (pt-BR, en, es, fr)
 */
export function mapLocaleToStrapi(lang: Lang): string {
  const localeMap: Record<Lang, string> = {
    pt: 'pt-BR',
    en: 'en',
    es: 'es',
    fr: 'fr',
  }
  return localeMap[lang]
}

/**
 * Transform single Strapi Post to frontend Post
 *
 * Strapi 5 returns flat objects — fields are directly on the item (no .attributes).
 * Frontend expects multilingual Record<Lang, string> for title/excerpt/content,
 * but we fetch per locale from Strapi, so we just populate the requested lang.
 */
export function transformStrapiPost(strapiPost: StrapiPost, lang: Lang): Post {
  // Create empty multilingual objects
  const title: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  const excerpt: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  const content: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }

  // Populate only the current lang (we don't fetch all translations)
  title[lang] = strapiPost.title || ''
  excerpt[lang] = strapiPost.excerpt || ''
  content[lang] = strapiPost.content || ''

  return {
    id: strapiPost.id.toString(),
    slug: strapiPost.slug,
    title,
    excerpt,
    content,
    category: strapiPost.category?.name || '',
    author: strapiPost.author?.name || '',
    publishedAt: strapiPost.publishedAt || new Date().toISOString(),
    image: getStrapiMediaURL(strapiPost.image?.url),
    readTime: strapiPost.readTime || 5,
  }
}

/**
 * Transform single Strapi Ebook to frontend Ebook
 *
 * Strapi 5 returns flat objects — fields are directly on the item (no .attributes).
 */
export function transformStrapiEbook(strapiEbook: StrapiEbook, lang: Lang): Ebook {
  // Create empty multilingual objects
  const title: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  const description: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  const content: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }

  // Populate only the current lang
  title[lang] = strapiEbook.title || ''
  description[lang] = strapiEbook.description || ''
  content[lang] = strapiEbook.content || ''

  // Get image URLs with fallback logic (Strapi 5: media is flat, not { data: { attributes: {} } })
  const thumbnailUrl = getStrapiMediaURL(strapiEbook.thumbnailImage?.url)
  const heroUrl = getStrapiMediaURL(strapiEbook.heroImage?.url)
  const imageUrl = getStrapiMediaURL(strapiEbook.image?.url)

  return {
    id: strapiEbook.id.toString(),
    slug: strapiEbook.slug,
    title,
    description,
    content,
    category: strapiEbook.category || '',
    pages: strapiEbook.pages || 1,
    image: imageUrl,
    thumbnailImage: thumbnailUrl || imageUrl,
    heroImage: heroUrl || imageUrl,
    downloadUrl: strapiEbook.downloadUrl,
  }
}

/**
 * Transform array of Strapi Posts
 */
export function transformStrapiPosts(strapiPosts: StrapiPost[], lang: Lang): Post[] {
  return strapiPosts.map(post => transformStrapiPost(post, lang))
}

/**
 * Transform array of Strapi Ebooks
 */
export function transformStrapiEbooks(strapiEbooks: StrapiEbook[], lang: Lang): Ebook[] {
  return strapiEbooks.map(ebook => transformStrapiEbook(ebook, lang))
}