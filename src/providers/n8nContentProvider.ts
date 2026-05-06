import { Lang } from "../lib/i18n"
import { Post } from "../data/posts"
import { Ebook } from "../data/ebooks"
import { ContentProvider } from "./contentProvider"
import { N8N_CONTENT_WEBHOOK_URL } from "../lib/endpoints"

export class N8NContentProvider implements ContentProvider {
  async getPosts(lang: Lang): Promise<Post[]> {
    try {
      const response = await fetch(`${N8N_CONTENT_WEBHOOK_URL}/posts?lang=${lang}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error("Error fetching posts from n8n:", error)
      return []
    }
  }

  async getPostBySlug(lang: Lang, slug: string): Promise<Post | null> {
    try {
      const response = await fetch(`${N8N_CONTENT_WEBHOOK_URL}/posts/${slug}?lang=${lang}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`Error fetching post ${slug} from n8n:`, error)
      return null
    }
  }

  async getEbooks(lang: Lang): Promise<Ebook[]> {
    try {
      const response = await fetch(`${N8N_CONTENT_WEBHOOK_URL}/ebooks?lang=${lang}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error("Error fetching ebooks from n8n:", error)
      return []
    }
  }

  async getEbookBySlug(lang: Lang, slug: string): Promise<Ebook | null> {
    try {
      const response = await fetch(`${N8N_CONTENT_WEBHOOK_URL}/ebooks/${slug}?lang=${lang}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          return null
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ebook ${slug} from n8n:`, error)
      return null
    }
  }
}
