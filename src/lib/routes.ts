import { Lang, supportedLangs, defaultLang } from "./i18n"

export const routes = {
  home: { pt: "/", es: "/", en: "/", fr: "/" },
  about: { pt: "/quem-somos", es: "/quienes-somos", en: "/about-us", fr: "/a-propos" },
  solutions: { pt: "/solucoes", es: "/soluciones", en: "/solutions", fr: "/solutions" },
  solutionDetail: {
    pt: "/solucoes/:slug",
    es: "/soluciones/:slug",
    en: "/solutions/:slug",
    fr: "/solutions/:slug",
  },
  content: { pt: "/conteudo", es: "/contenido", en: "/content", fr: "/contenu" },
  allPosts: { pt: "/artigos", es: "/articulos", en: "/articles", fr: "/articles" },
  post: {
    pt: "/conteudo/:slug",
    es: "/contenido/:slug",
    en: "/content/:slug",
    fr: "/contenu/:slug",
  },
  // Preview routes
  postPreview: {
    pt: "/conteudo/preview",
    es: "/contenido/preview",
    en: "/content/preview",
    fr: "/contenu/preview",
  },
  ebooks: { pt: "/ebooks", es: "/ebooks", en: "/ebooks", fr: "/ebooks" },
  ebookDetail: { pt: "/ebooks/:slug", es: "/ebooks/:slug", en: "/ebooks/:slug", fr: "/ebooks/:slug" },
  ebookPreview: { pt: "/ebooks/preview", es: "/ebooks/preview", en: "/ebooks/preview", fr: "/ebooks/preview" },
  contact: { pt: "/contato", es: "/contacto", en: "/contact", fr: "/contact" },
  privacy: { pt: "/privacidade", es: "/privacidad", en: "/privacy", fr: "/confidentialite" },
  terms: { pt: "/termos", es: "/terminos", en: "/terms", fr: "/conditions" },
} as const

export function getRoute(key: keyof typeof routes, lang: Lang, params?: Record<string, string>): string {
  let route: string = routes[key][lang]

  // Replace params if provided
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      route = route.replace(`:${paramKey}`, paramValue)
    })
  }

  return route
}

function isValidLang(value: string): value is Lang {
  return (supportedLangs as readonly string[]).includes(value)
}

export function matchRoute(hash: string): {
  page: keyof typeof routes
  lang: Lang
  params: Record<string, string>
} | null {
  // ✅ Separar path da query string antes de fazer matching
  const raw = (hash || "").replace(/^#/, "")
  const [pathOnly, queryString] = raw.split("?")
  const parts = pathOnly.split("/").filter(Boolean)

  if (parts.length === 0) {
    return { page: "home", lang: defaultLang, params: {} }
  }

  const first = parts[0]
  let lang: Lang = defaultLang
  let pathParts: string[] = []

  if (isValidLang(first)) {
    lang = first
    pathParts = parts.slice(1)
  } else {
    pathParts = parts
  }

  const pathWithoutLang = "/" + pathParts.join("/")
  const normalizedPath = pathWithoutLang === "/" ? "/" : pathWithoutLang

  for (const [key, routeConfig] of Object.entries(routes)) {
    const routePath = (routeConfig as any)[lang] as string | undefined
    if (!routePath) continue

    if (routePath === normalizedPath) {
      return { page: key as keyof typeof routes, lang, params: {} }
    }

    if (routePath.includes(":")) {
      const routeSegs = routePath.split("/").filter(Boolean)
      const pathSegs = normalizedPath.split("/").filter(Boolean)
      if (routeSegs.length !== pathSegs.length) continue

      const params: Record<string, string> = {}
      let ok = true

      for (let i = 0; i < routeSegs.length; i++) {
        const r = routeSegs[i]
        const p = pathSegs[i]
        if (r.startsWith(":")) params[r.slice(1)] = p
        else if (r !== p) {
          ok = false
          break
        }
      }

      if (ok) return { page: key as keyof typeof routes, lang, params }
    }
  }

  return null
}