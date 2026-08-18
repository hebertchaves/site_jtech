import { Lang } from "../lib/i18n"
import { Post } from "../data/posts"
import { Ebook } from "../data/ebooks"

export interface ProductCTAConfig {
  productSlug: string
  rdFormUrl: string
  ctaLabel?: string
}

export interface ContentProvider {
  getPosts(lang: Lang, limit?: number): Promise<Post[]>
  getPostBySlug(lang: Lang, slug: string): Promise<Post | null>
  getEbooks(lang: Lang): Promise<Ebook[]>
  getEbookBySlug(lang: Lang, slug: string): Promise<Ebook | null>
  getProductCTAConfigs(): Promise<Record<string, ProductCTAConfig>>
}
