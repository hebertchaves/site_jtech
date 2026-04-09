import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Lang, t, supportedLangs, buildPath } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"

interface HeaderProps {
  lang: Lang
}

const NAV_ITEMS = [
  { key: "nav.home", route: "home" as const },
  { key: "nav.about", route: "about" as const },
  { key: "nav.solutions", route: "solutions" as const },
  { key: "nav.content", route: "content" as const },
  { key: "nav.contact", route: "contact" as const },
]

const LANG_LABELS: Record<Lang, string> = {
  pt: "PT",
  es: "ES",
  en: "EN",
  fr: "FR",
}

export function Header({ lang }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setLangOpen(false)
  }, [lang])

  const handleLangChange = (newLang: Lang) => {
    const currentPath = window.location.hash.replace(/^#\/[a-z]{2}/, "") || "/"
    window.location.hash = `#/${newLang}${currentPath}`
    setLangOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#0B0B0B]/95 backdrop-blur-sm shadow-lg" : "bg-[#0B0B0B]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href={`#/${lang}/`}
            className="flex-shrink-0"
            aria-label="Jtech - Início"
            data-logo
          >
            <img
              src="https://conteudo.sansys.app/site/img/jtech-logo-white.svg"
              alt="Jtech"
              className="h-8 w-auto"
              onError={(e) => {
                const el = e.currentTarget
                el.style.display = "none"
                const fallback = document.createElement("span")
                fallback.className = "text-white font-bold text-xl"
                fallback.textContent = "Jtech"
                el.parentNode?.appendChild(fallback)
              }}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={buildPath(lang, getRoute(item.route, lang))}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 py-1"
              >
                {t(lang, item.key)}
              </a>
            ))}
          </nav>

          {/* Right side: Language + Mobile */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium py-1 transition-colors"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                {LANG_LABELS[lang]}
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 bg-white rounded shadow-lg overflow-hidden z-20 min-w-[60px]">
                    {supportedLangs.map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLangChange(l)}
                        className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                          l === lang
                            ? "bg-[#E30613] text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {LANG_LABELS[l]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0B0B0B] border-t border-white/10">
          <nav className="px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={buildPath(lang, getRoute(item.route, lang))}
                className="text-white/80 hover:text-white text-base font-medium py-2 border-b border-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(lang, item.key)}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
