import { ContentProvider } from "./contentProvider"
import { MockContentProvider } from "./mockContentProvider"
import { N8NContentProvider } from "./n8nContentProvider"
import { StrapiContentProvider } from "./strapiContentProvider"
import { CONTENT_TRANSPORT } from "../lib/endpoints"

export function getContentProvider(): ContentProvider {
  console.log('[getContentProvider] CONTENT_TRANSPORT:', CONTENT_TRANSPORT)
  
  if (CONTENT_TRANSPORT === "n8n") {
    console.log('[getContentProvider] Using N8NContentProvider')
    return new N8NContentProvider()
  }
  
  if (CONTENT_TRANSPORT === "strapi") {
    console.log('[getContentProvider] Using StrapiContentProvider')
    return new StrapiContentProvider()
  }
  
  console.log('[getContentProvider] Using MockContentProvider')
  return new MockContentProvider()
}

export const contentProvider = getContentProvider()