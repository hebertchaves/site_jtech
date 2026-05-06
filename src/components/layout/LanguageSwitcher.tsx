import { useState, useRef, useEffect } from "react"
import { Globe, ChevronDown } from "lucide-react"
import { Lang, supportedLangs } from "../../lib/i18n"
import { matchRoute, routes, getRoute } from "../../lib/routes"

interface LanguageSwitcherProps {
  currentLang: Lang
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside as any)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside as any)
    }
  }, [isOpen])

  const switchLanguage = (newLang: Lang) => {
    const hash = window.location.hash
    const match = matchRoute(hash)
    
    if (match) {
      // Obtém a rota no novo idioma mantendo a mesma página
      let newPath = getRoute(match.page, newLang)
      
      // Se houver parâmetros (como slug), substitui na nova rota
      if (Object.keys(match.params).length > 0) {
        Object.entries(match.params).forEach(([key, value]) => {
          newPath = newPath.replace(`:${key}`, value)
        })
      }
      
      window.location.hash = `#/${newLang}${newPath}`
    } else {
      // Fallback: vai para home no novo idioma
      window.location.hash = `#/${newLang}/`
    }
    
    setIsOpen(false)
  }

  const langLabels: Record<Lang, string> = {
    pt: "PT",
    es: "ES",
    en: "EN",
    fr: "FR",
  }

  const langFullNames: Record<Lang, string> = {
    pt: "Português",
    es: "Español",
    en: "English",
    fr: "Français",
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:text-[#E30613] transition-colors cursor-pointer touch-manipulation"
        aria-label="Change language"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span>{langLabels[currentLang]}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-[10000] overflow-hidden">
          {supportedLangs.map((lang) => (
            <button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer touch-manipulation ${
                lang === currentLang ? "bg-gray-50 text-[#E30613] font-medium" : "text-gray-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{langFullNames[lang]}</span>
                <span className={`text-xs ${lang === currentLang ? 'text-[#E30613]' : 'text-gray-400'}`}>
                  {langLabels[lang]}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}