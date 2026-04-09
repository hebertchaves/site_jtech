import { Lang } from "./i18n"
import { Post } from "../data/posts"
import { Ebook } from "../data/ebooks"

/**
 * Strapi API Response Interfaces
 */
export interface StrapiMedia {
  id: number
  attributes: {
    name: string
    url: string
    formats?: {
      thumbnail?: { url: string }
      small?: { url: string }
      medium?: { url: string }
      large?: { url: string }
    }
  }
}

export interface StrapiPostAttributes {
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  readTime?: number
  locale: string
  image?: {
    data: StrapiMedia | null
  }
  category?: {
    data: {
      id: number
      attributes: {
        name: string
        slug: string
      }
    } | null
  }
  author?: {
    data: {
      id: number
      attributes: {
        name: string
        slug: string
      }
    } | null
  }
}

export interface StrapiPost {
  id: number
  attributes: StrapiPostAttributes
}

export interface StrapiEbookAttributes {
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
  image?: {
    data: StrapiMedia | null
  }
  thumbnailImage?: {
    data: StrapiMedia | null
  }
  heroImage?: {
    data: StrapiMedia | null
  }
}

export interface StrapiEbook {
  id: number
  attributes: StrapiEbookAttributes
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
 * Frontend expects multilingual Record<Lang, string> for title/excerpt/content,
 * but we fetch per locale from Strapi, so we just populate the requested lang.
 */
export function transformStrapiPost(strapiPost: StrapiPost, lang: Lang): Post {
  const attr = strapiPost.attributes
  
  // Create empty multilingual objects
  const title: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  const excerpt: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  const content: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  
  // Populate only the current lang (we don't fetch all translations)
  title[lang] = attr.title || ''
  excerpt[lang] = attr.excerpt || ''
  content[lang] = attr.content || ''
  
  return {
    id: strapiPost.id.toString(),
    slug: attr.slug,
    title,
    excerpt,
    content,
    category: attr.category?.data?.attributes.name || '',
    author: attr.author?.data?.attributes.name || '',
    publishedAt: attr.publishedAt || new Date().toISOString(),
    image: getStrapiMediaURL(attr.image?.data?.attributes.url),
    readTime: attr.readTime || 5,
  }
}

/**
 * Transform single Strapi Ebook to frontend Ebook
 */
export function transformStrapiEbook(strapiEbook: StrapiEbook, lang: Lang): Ebook {
  const attr = strapiEbook.attributes
  
  // Create empty multilingual objects
  const title: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  const description: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  const content: Record<Lang, string> = { pt: '', en: '', es: '', fr: '' }
  
  // Populate only the current lang
  title[lang] = attr.title || ''
  description[lang] = attr.description || ''
  content[lang] = attr.content || ''
  
  // Get image URLs with fallback logic
  const thumbnailUrl = getStrapiMediaURL(attr.thumbnailImage?.data?.attributes.url)
  const heroUrl = getStrapiMediaURL(attr.heroImage?.data?.attributes.url)
  const imageUrl = getStrapiMediaURL(attr.image?.data?.attributes.url)
  
  return {
    id: strapiEbook.id.toString(),
    slug: attr.slug,
    title,
    description,
    content,
    category: attr.category || '',
    pages: attr.pages || 1,
    image: imageUrl, // Legacy fallback
    thumbnailImage: thumbnailUrl || imageUrl, // Fallback to legacy image
    heroImage: heroUrl || imageUrl, // Fallback to legacy image
    downloadUrl: attr.downloadUrl,
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