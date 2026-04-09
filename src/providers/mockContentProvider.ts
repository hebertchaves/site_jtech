import { Lang } from "../lib/i18n"
import { Post, posts, getPostBySlug } from "../data/posts"
import { Ebook, ebooks, getEbookBySlug } from "../data/ebooks"
import { ContentProvider } from "./contentProvider"

export class MockContentProvider implements ContentProvider {
  async getPosts(lang: Lang): Promise<Post[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    return posts
  }

  async getPostBySlug(lang: Lang, slug: string): Promise<Post | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return getPostBySlug(slug) || null
  }

  async getEbooks(lang: Lang): Promise<Ebook[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return ebooks
  }

  async getEbookBySlug(lang: Lang, slug: string): Promise<Ebook | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return getEbookBySlug(slug) || null
  }
}