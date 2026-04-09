import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

interface ScrollToTopProps {
  showThreshold?: number // Pixel offset para mostrar o botão
}

export function ScrollToTop({ showThreshold = 100 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Detectar direção do scroll
      if (currentScrollY > lastScrollY) {
        setIsScrollingDown(true) // Descendo
      } else {
        setIsScrollingDown(false) // Subindo
      }
      
      setLastScrollY(currentScrollY)
      
      // Mostrar botão apenas quando:
      // 1. Passou do threshold (menu desapareceu)
      // 2. Está scrollando para baixo
      if (currentScrollY > showThreshold && currentScrollY > lastScrollY) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, showThreshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer group"
          aria-label="Scroll to top"
          style={{
            filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))'
          }}
        >
          {/* Mouse SVG com animação - 63px */}
          <svg
            width="63"
            height="63"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Corpo do mouse */}
            <rect
              x="8"
              y="4"
              width="8"
              height="14"
              rx="4"
              stroke="#E30613"
              strokeWidth="1.5"
              fill="white"
              className="transition-all group-hover:fill-[#FEE2E2]"
            />
            
            {/* Botão de scroll com animação de piscar - formato de pílula/bastão */}
            <motion.rect
              x="10.75"
              y="6"
              width="2.5"
              height="5"
              rx="1.25"
              fill="#E30613"
              animate={{
                opacity: [1, 0.3, 1],
                y: [0, 2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Seta para cima (aparece no hover) */}
            <motion.path
              d="M12 20L12 14M12 14L9 17M12 14L15 17"
              stroke="#E30613"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </svg>
          
          {/* Texto de hint (opcional) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-3 py-1.5 rounded pointer-events-none"
          >
            Voltar ao topo
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}