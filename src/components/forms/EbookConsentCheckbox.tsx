import { Lang, t } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"
import { buildPath } from "../../lib/i18n"

interface EbookConsentCheckboxProps {
  lang: Lang
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
}

export function EbookConsentCheckbox({
  lang,
  checked,
  onChange,
  id = "ebook-consent",
}: EbookConsentCheckboxProps) {
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#E30613] focus:ring-[#E30613] cursor-pointer"
        required
      />
      <label htmlFor={id} className="text-sm text-gray-600 cursor-pointer leading-snug">
        {t(lang, "contact.form.privacy.text")}{" "}
        <a
          href={buildPath(lang, getRoute("privacy", lang))}
          className="text-[#E30613] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(lang, "contact.form.privacy.link")}
        </a>
      </label>
    </div>
  )
}
