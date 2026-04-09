import { useState, useEffect } from "react"
import { Lang } from "../../lib/i18n"
import { LGPD_TEXTS } from "../../lib/lgpd"
import {
  hasConsentDecision,
  acceptAllConsent,
  rejectAllConsent,
  setConsentPreferences,
} from "../../lib/consent"
import { getRoute } from "../../lib/routes"
import { buildPath } from "../../lib/i18n"

interface ConsentBannerProps {
  lang: Lang
}

export function ConsentBanner({ lang }: ConsentBannerProps) {
  const [visible, setVisible] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(true)

  const texts = LGPD_TEXTS[lang] || LGPD_TEXTS.pt

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasConsentDecision()) {
        setVisible(true)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  const handleAcceptAll = () => {
    acceptAllConsent()
    setVisible(false)
  }

  const handleRejectAll = () => {
    rejectAllConsent()
    setVisible(false)
  }

  const handleSavePreferences = () => {
    setConsentPreferences({ analytics, marketing })
    setVisible(false)
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0B] text-white shadow-2xl"
      role="dialog"
      aria-label="Consentimento de cookies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {!showCustomize ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold mb-1">{texts.title}</p>
              <p className="text-sm text-white/70 leading-relaxed">{texts.description}{" "}
                <a
                  href={buildPath(lang, getRoute("privacy", lang))}
                  className="text-[#E30613] hover:underline"
                >
                  {texts.privacyLink}
                </a>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 flex-shrink-0">
              <button
                onClick={() => setShowCustomize(true)}
                className="px-4 py-2 text-sm border border-white/30 rounded hover:bg-white/10 transition-colors"
              >
                {texts.customize}
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm border border-white/30 rounded hover:bg-white/10 transition-colors"
              >
                {texts.rejectAll}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm bg-[#E30613] hover:bg-[#C10511] rounded font-semibold transition-colors"
              >
                {texts.acceptAll}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="font-semibold">{texts.customize}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded"
                />
                <div>
                  <p className="font-medium text-sm">{texts.analytics}</p>
                  <p className="text-xs text-white/60">{texts.analyticsDesc}</p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded"
                />
                <div>
                  <p className="font-medium text-sm">{texts.marketing}</p>
                  <p className="text-xs text-white/60">{texts.marketingDesc}</p>
                </div>
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCustomize(false)}
                className="px-4 py-2 text-sm border border-white/30 rounded hover:bg-white/10 transition-colors"
              >
                {LGPD_TEXTS.pt.rejectAll}
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm bg-[#E30613] hover:bg-[#C10511] rounded font-semibold transition-colors"
              >
                {texts.save}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
