import { ContentProvider } from "./contentProvider"
import { MockContentProvider } from "./mockContentProvider"
import { StrapiContentProvider } from "./strapiContentProvider"
import { CONTENT_TRANSPORT } from "../lib/endpoints"

export function getContentProvider(): ContentProvider {
  if (CONTENT_TRANSPORT === "strapi") {
    return new StrapiContentProvider()
  }

  return new MockContentProvider()
}

export const contentProvider = getContentProvider()