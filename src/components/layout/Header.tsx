import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Lang, t } from "../../lib/i18n"
import { getRoute } from "../../lib/routes"
import { Container } from "./Container"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { Button } from "../ui/button"

interface HeaderProps {
  lang: Lang
}

// ImageWithFallback component with .webp → .png fallback
function ImageWithFallback(props: any) {
  const [currentSrc, setCurrentSrc] = useState(props.src)
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  const handleError = () => {
    // Se a imagem atual é .webp, tentar .png
    if (currentSrc.endsWith('.webp')) {
      const pngSrc = currentSrc.replace(/\.webp$/, '.png')
      setCurrentSrc(pngSrc)
    } else {
      // Se já tentou .png ou não é webp, mostrar placeholder
      setDidError(true)
    }
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={currentSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}

export function Header({ lang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentPath, setCurrentPath] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Auto-hide header on scroll down, show on scroll up
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          // Atualizar estado de "scrolled" (sombra)
          setScrolled(currentScrollY > 20)
          
          // Verificar se passou da primeira section (aproximadamente 500px)
          const passedFirstSection = currentScrollY > 500
          
          if (passedFirstSection) {
            // Se passou da primeira section, controlar visibilidade baseado na direção
            if (currentScrollY > lastScrollY) {
              // Scrolling DOWN - esconder header
              setIsVisible(false)
            } else {
              // Scrolling UP - mostrar header
              setIsVisible(true)
            }
          } else {
            // Ainda na primeira section - sempre visível
            setIsVisible(true)
          }
          
          setLastScrollY(currentScrollY)
          ticking = false
        })
        
        ticking = true
      }
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Detectar a rota atual
  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(window.location.hash)
    }
    
    updatePath()
    window.addEventListener("hashchange", updatePath)
    return () => window.removeEventListener("hashchange", updatePath)
  }, [])

  const navigation = [
    { name: t(lang, "nav.about"), href: `#/${lang}${getRoute("about", lang)}` },
    { name: t(lang, "nav.solutions"), href: `#/${lang}${getRoute("solutions", lang)}` },
    { name: t(lang, "nav.content"), href: `#/${lang}${getRoute("content", lang)}` },
    { name: t(lang, "nav.contact"), href: `#/${lang}${getRoute("contact", lang)}` },
  ]

  // Função para verificar se o item está ativo
  const isActive = (href: string) => {
    return currentPath === href
  }

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[9999] transition-all duration-300 ${
          scrolled ? "shadow-lg" : ""
        }`}
        style={{ 
          backgroundColor: "rgba(11, 11, 11, 0.85)",
          top: 0,
          transform: isVisible ? "translateY(0)" : "translateY(-100%)"
        }}
      >
        <Container>
          {/* Container interno - justify-between no mobile (burger), justify-center no desktop */}
          <div className="flex items-center justify-between lg:justify-center h-20">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <a href={`#/${lang}/`} className="flex items-center">
                <svg className="h-10 w-auto" viewBox="0 0 181.2 48" xmlns="http://www.w3.org/2000/svg">
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

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8">
                {navigation.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <a
                      key={item.name}
                      href={active ? undefined : item.href}
                      onClick={(e) => active && e.preventDefault()}
                      className={`text-white text-base lowercase relative group transition-all duration-300 ${
                        active 
                          ? "translate-y-[-3px] cursor-default" 
                          : "hover:translate-y-[-3px] cursor-pointer"
                      }`}
                      style={{ fontStretch: "condensed" }}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="transition-all">
                        {item.name.toLowerCase()}
                      </span>
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#E30613] transition-all duration-300 ${
                        active 
                          ? "w-full" 
                          : "w-0 group-hover:w-full"
                      }`}></span>
                    </a>
                  )
                })}
              </nav>

              {/* CTAs and Language Switcher */}
              <div className="hidden lg:flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-[#E30613] text-white hover:bg-[#E30613] hover:text-white px-8"
                  onClick={() => window.open('https://carreirasveo.gupy.io/', '_blank')}
                >
                  {t(lang, "nav.careers")}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full bg-[#E30613] hover:bg-[#C10511] px-8"
                  onClick={() => window.open('https://suporte.jtech.com.br/pt-BR/support/login', '_blank')}
                >
                  Login
                </Button>
                <div className="text-white">
                  <LanguageSwitcher currentLang={lang} />
                </div>
              </div>
            </div>

            {/* Mobile menu button - no fluxo normal, não absolute */}
            <button
              className="lg:hidden text-white cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation - FORA do Container, ocupando tela inteira */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-[#0B0B0B] z-[9998] overflow-y-auto">
          <div className="flex flex-col items-center py-8 px-4">
            {/* Logo Block */}
            <div className="mb-7">
              <span className="text-white text-3xl">
                J<span className="text-[#E30613]">TECH</span>
              </span>
            </div>

            {/* Internal Navigation Block */}
            <nav className="flex flex-col items-center gap-6 mb-7">
              {navigation.map((item) => {
                const active = isActive(item.href)
                return (
                  <a
                    key={item.name}
                    href={active ? undefined : item.href}
                    onClick={(e) => {
                      if (active) {
                        e.preventDefault()
                      } else {
                        setMobileMenuOpen(false)
                      }
                    }}
                    className={`text-white text-xl lowercase relative group transition-all duration-300 ${
                      active ? "cursor-default" : "cursor-pointer"
                    }`}
                    style={{ fontStretch: "condensed" }}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="transition-all">
                      {item.name.toLowerCase()}
                    </span>
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-[#E30613] transition-all duration-300 ${
                      active 
                        ? "w-full" 
                        : "w-0 group-hover:w-full"
                    }`}></span>
                  </a>
                )
              })}
            </nav>

            {/* External Options Block */}
            <div className="flex flex-col items-center gap-4 mb-7 w-full max-w-xs">
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full border-[#E30613] text-[#E30613] hover:bg-[#E30613] hover:text-white"
                onClick={() => {
                  window.open('https://carreirasveo.gupy.io/', '_blank')
                  setMobileMenuOpen(false)
                }}
              >
                {t(lang, "nav.careers")}
              </Button>
              <Button
                variant="default"
                size="sm"
                className="w-full rounded-full bg-[#E30613] hover:bg-[#C10511]"
                onClick={() => {
                  window.open('https://suporte.jtech.com.br/pt-BR/support/login', '_blank')
                  setMobileMenuOpen(false)
                }}
              >
                Login
              </Button>
            </div>

            {/* Language Switcher Block */}
            <div className="border-t border-gray-800 pt-6 w-full flex justify-center">
              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}