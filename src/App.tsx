import { useState, useEffect, useRef } from "react"
import { Lang, getCurrentLangFromHash, defaultLang } from "./lib/i18n"
import { matchRoute } from "./lib/routes"
import { captureUTMParams } from "./lib/utm"
import { initializeGTM, setDefaultConsent, updateConsentMode } from "./lib/gtm"
import {
  initializeAnalytics,
  trackPageView,
  setupScrollTracking,
  resetScrollTracking,
} from "./lib/analytics"
import { getConsentPreferences } from "./lib/consent"

// Layout
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import { ConsentBanner } from "./components/layout/ConsentBanner"

// Pages
import HomePage from "./pages/HomePage"
import { AboutPage } from "./pages/AboutPage"
import { SolutionsPage } from "./pages/SolutionsPage"
import { ContentPage } from "./pages/ContentPage"
import { AllPostsPage } from "./pages/AllPostsPage"
import { PostPage } from "./pages/PostPage"
import { EbooksPage } from "./pages/EbooksPage"
import { EbookDetailPage } from "./pages/EbookDetailPage"
import { PreviewPage } from "./pages/PreviewPage"
import { ContactPage } from "./pages/ContactPage"

export default function App() {
  const [currentLang, setCurrentLang] = useState<Lang>(defaultLang)
  const [currentPage, setCurrentPage] = useState<string>("home")
  const [params, setParams] = useState<Record<string, string>>({})

  // Prevent duplicated initialization (Analytics/Scroll)
  const analyticsInitializedRef = useRef(false)
  const cleanupScrollRef = useRef<null | (() => void)>(null)

  useEffect(() => {
    // Consent Mode: nega tudo antes de qualquer tag do Google subir
    setDefaultConsent()

    // O GTM sobe em toda visita, logo após o consent default — é o modelo padrão
    // do Google. Ele próprio não grava cookie: quem decide o que cada tag pode
    // armazenar são os sinais do Consent Mode v2 acima, atualizados no aceite.
    // Condicionar a carga ao aceite zerava o dado de quem ignora o banner e
    // deixava o contêiner invisível para o Tag Assistant.
    initializeGTM()

    // Capture UTMs on load (hash router case)
    captureUTMParams()

    // Hotjar e Clarity não entendem Consent Mode — seguem presos ao aceite.
    const enableAnalyticsIfAllowed = () => {
      const preferences = getConsentPreferences()
      if (preferences?.analytics && !analyticsInitializedRef.current) {
        initializeAnalytics()
        cleanupScrollRef.current = setupScrollTracking()
        analyticsInitializedRef.current = true
      }
    }

    const disableAnalyticsIfRevoked = () => {
      const preferences = getConsentPreferences()
      if (preferences && !preferences.analytics && analyticsInitializedRef.current) {
        cleanupScrollRef.current?.()
        cleanupScrollRef.current = null
        analyticsInitializedRef.current = false
      }
    }

    const handleConsentUpdate = () => {
      const preferences = getConsentPreferences()
      if (preferences) updateConsentMode(preferences)
      enableAnalyticsIfAllowed()
      disableAnalyticsIfRevoked()
    }

    window.addEventListener("consentUpdated", handleConsentUpdate)

    // Initial check — aplica a escolha já salva de visitas anteriores
    const savedPreferences = getConsentPreferences()
    if (savedPreferences) updateConsentMode(savedPreferences)
    enableAnalyticsIfAllowed()

    return () => {
      window.removeEventListener("consentUpdated", handleConsentUpdate)
      cleanupScrollRef.current?.()
    }
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || `#/${defaultLang}/`
      const lang = getCurrentLangFromHash()
      const match = matchRoute(hash)

      setCurrentLang(lang)

      if (!match) {
        setCurrentPage("home")
        setParams({})
      } else {
        setCurrentPage(match.page)
        setParams(match.params)
      }

      // Track page view (functions are consent-gated in lib/analytics.ts)
      trackPageView(hash, lang)

      // Reset scroll tracking for new page
      resetScrollTracking()

      // Scroll to top on navigation
      window.scrollTo(0, 0)
    }

    // Initial load
    handleHashChange()

    // Hash changes
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage lang={currentLang} />
      case "about":
        return <AboutPage lang={currentLang} />
      case "solutions":
        return <SolutionsPage lang={currentLang} />
      case "solutionDetail":
        return <SolutionsPage lang={currentLang} />
      case "content":
        return <ContentPage lang={currentLang} />
      case "allPosts":
        return <AllPostsPage lang={currentLang} />
      case "post":
        return <PostPage lang={currentLang} slug={params.slug || ""} />
      case "postPreview":
      case "ebookPreview":
        return <PreviewPage />
      case "ebooks":
        return <EbooksPage lang={currentLang} />
      case "ebookDetail":
        return <EbookDetailPage lang={currentLang} slug={params.slug || ""} />
      case "contact":
        return <ContactPage lang={currentLang} />
      default:
        return <HomePage lang={currentLang} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={currentLang} />

      <main className="flex-1">{renderPage()}</main>

      <Footer lang={currentLang} />

      <ConsentBanner lang={currentLang} />
    </div>
  )
}
