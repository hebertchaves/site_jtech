import { Mail, Phone, MapPin } from "lucide-react"
import { Lang, t } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"
import { Container } from "./Container"
import { Button } from "../ui/button"

interface FooterProps {
  lang: Lang
}

// Componentes SVG customizados para ícones de redes sociais
const FacebookIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

export function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const companyLinks = [
    { name: t(lang, "nav.home"), href: `#/${lang}/` },
    { name: t(lang, "nav.about"), href: `#/${lang}${getRoute("about", lang)}` },
    { name: t(lang, "nav.solutions"), href: `#/${lang}${getRoute("solutions", lang)}` },
    { name: t(lang, "nav.content"), href: `#/${lang}${getRoute("content", lang)}` },
    { name: t(lang, "nav.contact"), href: `#/${lang}${getRoute("contact", lang)}` },
  ]

  const solutionsLinks = [
    { name: "Sansys Water", href: `#/${lang}/solucoes/sansys-water` },
    { name: "Sansys Waste", href: `#/${lang}/solucoes/sansys-waste` },
    { name: "Sansys Pay", href: `#/${lang}/solucoes/sansys-pay` },
    { name: "Sansys Agency", href: `#/${lang}/solucoes/sansys-agency` },
    { name: "Sansys Reader", href: `#/${lang}/solucoes/sansys-reader` },
  ]

  const legalLinks = [
    { name: t(lang, "footer.privacy"), href: `#/${lang}${getRoute("privacy", lang)}` },
    { name: t(lang, "footer.terms"), href: `#/${lang}${getRoute("terms", lang)}` },
  ]

  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/jtechsistemas", ariaLabel: "Facebook" },
    { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/jtechsistemas", ariaLabel: "Instagram" },
    { name: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/company/jtechsistemas", ariaLabel: "LinkedIn" },
    { name: "YouTube", icon: YoutubeIcon, href: "https://www.youtube.com/@jtechsistemas", ariaLabel: "YouTube" },
  ]

  return (
    <footer className="bg-[#0B0B0B] text-white relative">
      {/* Overlay sólido para garantir que nenhum background anterior interfira */}
      <div className="absolute inset-0 bg-[#0B0B0B] z-0"></div>
      
      <Container className="py-16 relative z-10">
        {/* Section: Brand + Navigation Columns */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12">
          {/* BLOCO 1 - Left aligned (Brand) */}
          <div className="flex-shrink-0">
            <div className="mb-6">
              <a href={`#/${lang}/`} className="inline-block">
                <svg className="h-8 w-auto" viewBox="0 0 181.2 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#fff" d="M140.5,22.7c2.2,0,4.1.9,5.5,2.3l4.3-4.3c-2.5-2.5-6-4.1-9.8-4.1-7.7,0-13.9,6.2-13.9,13.9s6.2,13.9,13.9,13.9,7.3-1.6,9.8-4.1l-4.3-4.3c-1.4,1.4-3.4,2.3-5.5,2.3-4.3,0-7.8-3.5-7.8-7.8s3.5-7.8,7.8-7.8Z"/>
                  <path fill="#fff" d="M121.4,20.2c-2.5-2.5-6-4.1-9.8-4.1-7.7,0-13.9,6.2-13.9,13.9s6.2,13.9,13.9,13.9,7.3-1.6,9.8-4.1l-4.3-4.3c-1.4,1.4-3.4,2.3-5.5,2.3s-2-.2-2.9-.6l14.9-14.9-2.2-2.2ZM104.3,32.9c-.4-.9-.6-1.9-.6-2.9,0-4.3,3.5-7.8,7.8-7.8s2,.2,2.9.6l-10.2,10.2Z"/>
                  <path fill="#fff" d="M167.3,16.6c-2.9,0-5.6.9-7.8,2.4V3.9h-6.1v40.2h6.1v-13.6c0-4.3,3.5-7.8,7.8-7.8s7.8,3.5,7.8,7.8h0v13.6h6.1v-13.6h0c0-7.7-6.2-13.9-13.9-13.9Z"/>
                  <path fill="#fff" d="M86.8,3.8h-6.1v26.2c0,7.7,6.2,13.9,13.9,13.9v-6.1c-4.3,0-7.8-3.5-7.8-7.8v-7.8h7.8v-6.1h-7.8V3.8Z"/>
                  <path fill="#fff" d="M68.5,30c0,4.3-3.5,7.8-7.8,7.8v6.1c7.7,0,13.9-6.2,13.9-13.9V3.8h-6.1v26.2Z"/>
                  <path fill="#fff" d="M36.4,0H0v36.4c0,6.4,5.2,11.6,11.6,11.6h36.4V11.6c0-6.4-5.2-11.6-11.6-11.6ZM46.7,46.7H11.6c-5.7,0-10.3-4.6-10.3-10.3V1.3h35.2c5.7,0,10.3,4.6,10.3,10.3v35.2Z"/>
                  <path fill="#fff" d="M15.2,9.4c-1.9,0-3.5,1.5-3.5,3.5s1.5,3.5,3.5,3.5,3.5-1.5,3.5-3.5-1.5-3.5-3.5-3.5Z"/>
                  <path fill="#fff" d="M36.2,2.4H2.1v34.1c0,2.2.8,4.2,2,5.8,1.7,2.1,4.3,3.4,7.2,3.4h34.1V11.6c0-5.1-4.1-9.2-9.2-9.2ZM43.3,42.3h-5.8c-4.9,0-8.9-4-8.9-8.9v-8.2h8.9v-6.9h-8.9v-8.9h-6.9v24c0,3.8,1.4,7.4,3.7,10.1h-10.5c2.3-2.7,3.7-6.3,3.7-10.1v-15.1h-6.9v15.1c0,3.6-2.2,6.8-5.3,8.1-1.4-1.3-2.2-3.1-2.2-5.1V4.5h32c3.9,0,7.1,3.2,7.1,7.1v30.7Z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-xs">
              {t(lang, "footer.tagline").split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#E30613] transition-colors duration-300"
                    aria-label={social.ariaLabel}
                  >
                    <IconComponent />
                  </a>
                )
              })}
            </div>
          </div>

          {/* BLOCO 2 - Right aligned (Navigation Columns) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10 flex-shrink-0">
            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {t(lang, "footer.company")}
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block hover:translate-x-1 transition-transform"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {t(lang, "footer.solutions")}
              </h3>
              <ul className="space-y-3">
                {solutionsLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block hover:translate-x-1 transition-transform"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal + Client Area Combined */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {t(lang, "footer.legal")}
              </h3>
              <ul className="space-y-3 mb-6">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block hover:translate-x-1 transition-transform"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div>
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  {t(lang, "footer.clientarea")}
                </h3>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#E30613] hover:bg-[#C10511] transition-all duration-300 hover:scale-105"
                  onClick={() => window.open('https://suporte.jtech.com.br/pt-BR/support/login', '_blank')}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Jtech | {t(lang, "footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  )
}