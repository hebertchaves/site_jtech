import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Lang } from "../../lib/i18n"
import {
  shouldShowConsentBanner,
  saveConsentPreferences,
  getConsentPreferences,
  ConsentPreferences,
  OPEN_CONSENT_EVENT,
} from "../../lib/consent"
import { getLegalLink } from "../../lib/legal-links"
import { consentContent } from "../../data/consent-content"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface ConsentBannerProps {
  lang: Lang
}

const MINIMAL_CONSENT: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

const FULL_CONSENT: ConsentPreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
}

export function ConsentBanner({ lang }: ConsentBannerProps) {
  const [show, setShow] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  // Opt-in: apenas os cookies necessários vêm marcados. Consentimento válido
  // sob LGPD/GDPR exige ação afirmativa — caixas pré-marcadas não valem como
  // consentimento (TJUE, caso Planet49).
  const [preferences, setPreferences] = useState<ConsentPreferences>(MINIMAL_CONSENT)
  // true quando o painel foi reaberto pelo rodapé — já existe decisão salva
  const [isRevisit, setIsRevisit] = useState(false)

  useEffect(() => {
    setShow(shouldShowConsentBanner())
  }, [])

  // Reabertura pelo link "Preferências de cookies" no rodapé: recarrega a
  // escolha salva e já abre direto no detalhamento das categorias.
  useEffect(() => {
    const handleOpen = () => {
      setPreferences(getConsentPreferences() ?? MINIMAL_CONSENT)
      setIsRevisit(!shouldShowConsentBanner())
      setShowDetails(true)
      setShow(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, handleOpen)
  }, [])

  if (!show) return null

  const text = consentContent[lang]

  const decide = (prefs: ConsentPreferences) => {
    saveConsentPreferences(prefs)
    setShowDetails(false)
    setShow(false)
  }

  // No primeiro acesso, fechar equivale a recusar tudo. Numa reabertura pelo
  // rodapé, fechar apenas cancela — a escolha já salva é preservada.
  const handleClose = () => {
    if (isRevisit) {
      setShowDetails(false)
      setShow(false)
      return
    }
    decide(MINIMAL_CONSENT)
  }

  const legalLinks = [
    { label: text.linkPrivacy, href: getLegalLink("privacy", lang) },
    { label: text.linkLegalNotice, href: getLegalLink("legalNotice", lang) },
    { label: text.linkCookies, href: getLegalLink("cookies", lang) },
  ]

  const toggleCategories = [
    {
      key: "analytics" as const,
      name: text.analytics.name,
      description: text.analytics.description,
    },
    {
      key: "marketing" as const,
      name: text.marketing.name,
      description: text.marketing.description,
    },
  ]

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9998] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-modal="false"
      aria-label={text.title}
    >
      <div className="max-w-7xl mx-auto p-6 max-h-[85vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label={text.close}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-12">
          <h3 className="text-lg font-semibold mb-2">{text.title}</h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {showDetails ? text.description : text.shortDescription}
          </p>

          {/* Segunda camada — finalidades e categorias com opt-out individual */}
          {showDetails && (
            <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-800 mb-1">{text.purposesTitle}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {text.purposes.map((purpose) => (
                    <li key={purpose}>{purpose}</li>
                  ))}
                </ul>
              </div>

              <p className="text-sm font-medium text-gray-800 pt-2 border-t border-gray-200">
                {text.categoriesTitle}
              </p>

              <div className="flex items-start gap-3">
                <Checkbox checked disabled />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Label>{text.necessary.name}</Label>
                    <span className="text-xs text-gray-500 bg-gray-200 rounded px-2 py-0.5">
                      {text.alwaysOn}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {text.necessary.description}
                  </p>
                </div>
              </div>

              {toggleCategories.map((category) => (
                <div key={category.key} className="flex items-start gap-3">
                  <Checkbox
                    id={`consent-${category.key}`}
                    checked={preferences[category.key]}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, [category.key]: checked as boolean })
                    }
                  />
                  <div className="flex-1">
                    <Label htmlFor={`consent-${category.key}`}>{category.name}</Label>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}

              <p className="text-xs text-gray-500 leading-relaxed">{text.partnersNote}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => decide(FULL_CONSENT)} variant="default">
              {text.acceptAll}
            </Button>
            <Button onClick={() => decide(MINIMAL_CONSENT)} variant="outline">
              {text.rejectAll}
            </Button>
            {!showDetails ? (
              <Button onClick={() => setShowDetails(true)} variant="ghost">
                {text.customize} →
              </Button>
            ) : (
              <Button onClick={() => decide(preferences)} variant="dark">
                {text.save}
              </Button>
            )}
          </div>

          {/* Links legais — mesmos destinos do rodapé */}
          <p className="mt-4 text-xs text-gray-500">
            {text.linksTitle}{" "}
            {legalLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 && <span className="mx-1 text-gray-300">|</span>}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E30613] hover:underline"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}
