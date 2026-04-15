import { Lang } from "../lib/i18n"
import { Post } from "../data/posts"
import { Ebook } from "../data/ebooks"
import { ContentProvider } from "./contentProvider"
import {
  getStrapiURL,
  mapLocaleToStrapi,
  transformStrapiPosts,
  transformStrapiEbooks,
  transformStrapiPost,
  transformStrapiEbook,
  StrapiResponse,
  StrapiPost,
  StrapiEbook,
} from "../lib/strapi-transformers"

/**
 * StrapiContentProvider - Direct Strapi 5 integration
 * 
 * Fetches content from Strapi REST API with:
 * - i18n support (locale mapping)
 * - Draft/Publish filtering
 * - Preview session support (HttpOnly cookie)
 */
export class StrapiContentProvider implements ContentProvider {
  private baseURL: string
  private isPreviewMode: boolean = false

  constructor() {
    this.baseURL = getStrapiURL()
    
    // ✅ SECURITY: No more preview token in sessionStorage
    // Preview mode is determined by presence of HttpOnly cookie (server-side)
    // We just track if user might be in preview mode (from URL params)
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      this.isPreviewMode = hash.includes('/preview?') || hash.includes('preview_session')
    }
  }

  /**
   * Build Strapi API URL with query params.
   * When baseURL is empty, paths are relative to the current origin (Vite proxy handles forwarding).
   */
  private buildURL(
    path: string,
    params: Record<string, string | number> = {}
  ): string {
    const base = this.baseURL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173')
    const url = new URL(path, base)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })

    return url.toString()
  }

  /**
   * Fetch from Strapi with cookie-based authentication
   * Includes timeout and error handling
   */
  private async fetchStrapi<T>(url: string, usePreview: boolean = false): Promise<T> {
    // ✅ TIMEOUT: Abort request after 5 seconds
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const response = await fetch(url, { 
        credentials: 'include', // ✅ Send HttpOnly cookies (preview_session)
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        if (response.status === 401 && usePreview) {
          // Preview session expired/invalid
          console.warn('Preview session expired')
          // Fallback to published content
          this.isPreviewMode = false
        }
        
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      
      // Handle timeout
      if ((error as Error).name === 'AbortError') {
        console.error('Strapi request timed out after 5s:', url)
        throw new Error('Request timeout')
      }
      
      throw error
    }
  }

  /**
   * Get latest published posts (3 for gate)
   */
  async getPosts(lang: Lang, limit: number = 3): Promise<Post[]> {
    const locale = mapLocaleToStrapi(lang)

    const url = this.buildURL('/api/posts', {
      locale,
      'sort[0]': 'publishedAt:desc',
      'pagination[limit]': limit,
      // Fields: only what's needed for listing
      'fields[0]': 'title',
      'fields[1]': 'slug',
      'fields[2]': 'excerpt',
      'fields[3]': 'publishedAt',
      // Image: only URL and alt
      'populate[image][fields][0]': 'url',
      'populate[image][fields][1]': 'alternativeText',
      'populate[image][fields][2]': 'width',
      'populate[image][fields][3]': 'height',
      // Category: only name and slug
      'populate[category][fields][0]': 'name',
      'populate[category][fields][1]': 'slug',
      // Author: only name
      'populate[author][fields][0]': 'name',
    })

    const response = await this.fetchStrapi<StrapiResponse<StrapiPost[]>>(url)
    return transformStrapiPosts(response.data, lang)
  }

  /**
   * Get post by slug
   */
  async getPostBySlug(lang: Lang, slug: string): Promise<Post | null> {
    const locale = mapLocaleToStrapi(lang)
    
    // Check if we're in preview mode
    const isPreview = this.isPreviewMode
    
    if (isPreview) {
      // Use preview endpoint
      return this.getPostPreview(lang, slug)
    }

    // Normal published fetch
    const url = this.buildURL('/api/posts', {
      'filters[slug][$eq]': slug,
      locale,
      'populate[0]': 'image',
      'populate[1]': 'category',
      'populate[2]': 'author',
    })

    try {
      const response = await this.fetchStrapi<StrapiResponse<StrapiPost[]>>(url)
      
      if (!response.data || response.data.length === 0) {
        return null
      }

      return transformStrapiPost(response.data[0], lang)
    } catch (error) {
      console.error('Error fetching post by slug:', error)
      return null
    }
  }

  /**
   * Get post preview (includes drafts)
   */
  private async getPostPreview(lang: Lang, slug: string): Promise<Post | null> {
    const locale = mapLocaleToStrapi(lang)
    
    const url = this.buildURL('/api/preview/post', {
      slug,
      locale,
    })

    try {
      const response = await this.fetchStrapi<{ data: StrapiPost }>(url, true)
      return transformStrapiPost(response.data, lang)
    } catch (error) {
      console.error('Preview token invalid, falling back to published:', error)
      
      // Fallback to published version
      const fallbackUrl = this.buildURL('/api/posts', {
        'filters[slug][$eq]': slug,
        locale,
        'populate[0]': 'image',
        'populate[1]': 'category',
        'populate[2]': 'author',
      })

      const fallbackResponse = await this.fetchStrapi<StrapiResponse<StrapiPost[]>>(fallbackUrl)
      
      if (!fallbackResponse.data || fallbackResponse.data.length === 0) {
        return null
      }

      return transformStrapiPost(fallbackResponse.data[0], lang)
    }
  }

  /**
   * Get latest published ebooks (3 for gate/listing)
   */
  async getEbooks(lang: Lang): Promise<Ebook[]> {
    const locale = mapLocaleToStrapi(lang)
    
    const url = this.buildURL('/api/ebooks', {
      locale,
      'sort[0]': 'publishedAt:desc',
      'pagination[limit]': 100,
      'fields[0]': 'title',
      'fields[1]': 'slug',
      'fields[2]': 'description',
      'fields[3]': 'pages',
      'fields[4]': 'category',
      'populate[image][fields][0]': 'url',
      'populate[image][fields][1]': 'alternativeText',
    })

    const response = await this.fetchStrapi<StrapiResponse<StrapiEbook[]>>(url)
    return transformStrapiEbooks(response.data, lang)
  }

  /**
   * Get ebook by slug
   */
  async getEbookBySlug(lang: Lang, slug: string): Promise<Ebook | null> {
    const locale = mapLocaleToStrapi(lang)
    
    // Check if we're in preview mode
    const isPreview = this.isPreviewMode
    
    if (isPreview) {
      // Use preview endpoint
      return this.getEbookPreview(lang, slug)
    }

    // Normal published fetch
    const url = this.buildURL('/api/ebooks', {
      'filters[slug][$eq]': slug,
      locale,
      'populate[image][fields][0]': 'url',
      'populate[image][fields][1]': 'alternativeText',
    })

    try {
      const response = await this.fetchStrapi<StrapiResponse<StrapiEbook[]>>(url)
      
      if (!response.data || response.data.length === 0) {
        return null
      }

      return transformStrapiEbook(response.data[0], lang)
    } catch (error) {
      console.error('Error fetching ebook by slug:', error)
      return null
    }
  }

  /**
   * Get ebook preview (includes drafts)
   */
  private async getEbookPreview(lang: Lang, slug: string): Promise<Ebook | null> {
    const locale = mapLocaleToStrapi(lang)
    
    const url = this.buildURL('/api/preview/ebook', {
      slug,
      locale,
    })

    try {
      const response = await this.fetchStrapi<{ data: StrapiEbook }>(url, true)
      return transformStrapiEbook(response.data, lang)
    } catch (error) {
      console.error('Preview token invalid, falling back to published:', error)
      
      // Fallback to published version
      const fallbackUrl = this.buildURL('/api/ebooks', {
        'filters[slug][$eq]': slug,
        locale,
        'populate[image][fields][0]': 'url',
        'populate[image][fields][1]': 'alternativeText',
      })

      const fallbackResponse = await this.fetchStrapi<StrapiResponse<StrapiEbook[]>>(fallbackUrl)
      
      if (!fallbackResponse.data || fallbackResponse.data.length === 0) {
        return null
      }

      return transformStrapiEbook(fallbackResponse.data[0], lang)
    }
  }

  /**
   * Check if in preview mode
   */
  isInPreviewMode(): boolean {
    return this.isPreviewMode
  }

  /**
   * Exit preview mode (logout)
   */
  async exitPreview(): Promise<void> {
    const logoutUrl = this.buildURL('/api/preview/logout', {})
    
    try {
      await fetch(logoutUrl, {
        method: 'POST',
        credentials: 'include', // Send cookie to be cleared
      })
      
      this.isPreviewMode = false
      console.log('Exited preview mode')
    } catch (error) {
      console.error('Error exiting preview:', error)
    }
  }
}