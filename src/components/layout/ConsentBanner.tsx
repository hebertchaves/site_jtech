import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Lang, t } from "../../lib/i18n"
import {
  shouldShowConsentBanner,
  saveConsentPreferences,
  ConsentPreferences,
} from "../../lib/consent"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface ConsentBannerProps {
  lang: Lang
}

export function ConsentBanner({ lang }: ConsentBannerProps) {
  const [show, setShow] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    setShow(shouldShowConsentBanner())
  }, [])

  if (!show) return null

  const handleAcceptAll = () => {
    const allConsent: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    saveConsentPreferences(allConsent)
    setShow(false)
  }

  const handleRejectAll = () => {
    const minimalConsent: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    saveConsentPreferences(minimalConsent)
    setShow(false)
  }

  const handleSavePreferences = () => {
    saveConsentPreferences(preferences)
    setShow(false)
  }

  const consentText = {
    pt: {
      title: "Privacidade e Cookies",
      description:
        "Usamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo. Você pode gerenciar suas preferências abaixo.",
      necessary: "Necessários",
      necessaryDesc: "Essenciais para o funcionamento do site",
      analytics: "Analíticos",
      analyticsDesc: "Nos ajudam a entender como você usa o site",
      marketing: "Marketing",
      marketingDesc: "Utilizados para mostrar anúncios relevantes",
      acceptAll: "Aceitar Todos",
      rejectAll: "Rejeitar Todos",
      customize: "Personalizar",
      save: "Salvar Preferências",
    },
    es: {
      title: "Privacidad y Cookies",
      description:
        "Usamos cookies para mejorar su experiencia, analizar el tráfico y personalizar contenido. Puede gestionar sus preferencias abajo.",
      necessary: "Necesarias",
      necessaryDesc: "Esenciales para el funcionamiento del sitio",
      analytics: "Analíticas",
      analyticsDesc: "Nos ayudan a entender cómo usa el sitio",
      marketing: "Marketing",
      marketingDesc: "Utilizadas para mostrar anuncios relevantes",
      acceptAll: "Aceptar Todas",
      rejectAll: "Rechazar Todas",
      customize: "Personalizar",
      save: "Guardar Preferencias",
    },
    en: {
      title: "Privacy and Cookies",
      description:
        "We use cookies to improve your experience, analyze traffic and personalize content. You can manage your preferences below.",
      necessary: "Necessary",
      necessaryDesc: "Essential for the site to function",
      analytics: "Analytics",
      analyticsDesc: "Help us understand how you use the site",
      marketing: "Marketing",
      marketingDesc: "Used to show relevant ads",
      acceptAll: "Accept All",
      rejectAll: "Reject All",
      customize: "Customize",
      save: "Save Preferences",
    },
    fr: {
      title: "Confidentialité et Cookies",
      description:
        "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Vous pouvez gérer vos préférences ci-dessous.",
      necessary: "Nécessaires",
      necessaryDesc: "Essentiels au fonctionnement du site",
      analytics: "Analytiques",
      analyticsDesc: "Nous aident à comprendre comment vous utilisez le site",
      marketing: "Marketing",
      marketingDesc: "Utilisés pour afficher des publicités pertinentes",
      acceptAll: "Accepter Tout",
      rejectAll: "Rejeter Tout",
      customize: "Personnaliser",
      save: "Enregistrer les Préférences",
    },
  }

  const text = consentText[lang]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={handleRejectAll}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-12">
          <h3 className="text-lg mb-2">{text.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{text.description}</p>

          {showDetails && (
            <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Checkbox checked disabled />
                <div className="flex-1">
                  <Label>{text.necessary}</Label>
                  <p className="text-xs text-gray-600">{text.necessaryDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  checked={preferences.analytics}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked as boolean })
                  }
                />
                <div className="flex-1">
                  <Label>{text.analytics}</Label>
                  <p className="text-xs text-gray-600">{text.analyticsDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  checked={preferences.marketing}
                  onCheckedChange={(checked) =>
                    setPreferences({ ...preferences, marketing: checked as boolean })
                  }
                />
                <div className="flex-1">
                  <Label>{text.marketing}</Label>
                  <p className="text-xs text-gray-600">{text.marketingDesc}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAcceptAll} variant="default">
              {text.acceptAll}
            </Button>
            <Button onClick={handleRejectAll} variant="outline">
              {text.rejectAll}
            </Button>
            {!showDetails ? (
              <Button onClick={() => setShowDetails(true)} variant="ghost">
                {text.customize}
              </Button>
            ) : (
              <Button onClick={handleSavePreferences} variant="dark">
                {text.save}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}