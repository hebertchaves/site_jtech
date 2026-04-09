import { Lang, t, buildPath } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"

interface FooterProps {
  lang: Lang
}

export function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const solutionLinks = [
    { name: "Sansys Water", slug: "sansys-water" },
    { name: "Sansys Pay", slug: "sansys-pay" },
    { name: "Sansys Waste", slug: "sansys-waste" },
    { name: "Sansys Agency", slug: "sansys-agency" },
    { name: "Sansys Hub", slug: "sansys-hub" },
    { name: "Sansys Flow", slug: "sansys-flow" },
  ]

  return (
    <footer className="bg-[#0B0B0B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href={`#/${lang}/`} aria-label="Jtech">
              <img
                src="https://conteudo.sansys.app/site/img/jtech-logo-white.svg"
                alt="Jtech"
                className="h-8 w-auto mb-4"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </a>
            <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">
              {t(lang, "footer.tagline")}
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t(lang, "footer.solutions")}</h3>
            <ul className="space-y-2">
              {solutionLinks.map((item) => (
                <li key={item.slug}>
                  <a
                    href={buildPath(lang, getRoute("solutionDetail", lang, { slug: item.slug }))}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t(lang, "footer.company")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={buildPath(lang, getRoute("about", lang))}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {t(lang, "footer.about")}
                </a>
              </li>
              <li>
                <a
                  href={buildPath(lang, getRoute("content", lang))}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {t(lang, "nav.content")}
                </a>
              </li>
              <li>
                <a
                  href={buildPath(lang, getRoute("contact", lang))}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {t(lang, "footer.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t(lang, "footer.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={buildPath(lang, getRoute("privacy", lang))}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {t(lang, "footer.privacy")}
                </a>
              </li>
              <li>
                <a
                  href={buildPath(lang, getRoute("terms", lang))}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {t(lang, "footer.terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Jtech. {t(lang, "footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://conteudo.sansys.app/site/img/veolia-logo-white.svg"
              alt="Parceria Veolia"
              className="h-6 w-auto opacity-50"
              onError={(e) => { e.currentTarget.style.display = "none" }}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
