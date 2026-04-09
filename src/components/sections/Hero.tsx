import { ReactNode, useState, useEffect } from "react"
import { Container } from "../layout/Container"
import { cn } from "../../lib/utils"
import { calculateBannerOffset } from "../../lib/banner-alignment"

interface HeroProps {
  title: string | ReactNode
  subtitle?: string
  children?: ReactNode
  className?: string
  dark?: boolean
  image?: string
  imageAlt?: string
}

export function Hero({ title, subtitle, children, className, dark, image, imageAlt }: HeroProps) {
  const [bannerOffset, setBannerOffset] = useState(0)

  // Calcular o offset do logo no header para alinhar o título
  useEffect(() => {
    const updateOffset = () => {
      setBannerOffset(calculateBannerOffset())
    }

    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  return (
    <section
      className={cn(
        "relative pt-32 pb-20 min-h-[500px] flex items-center overflow-hidden",
        dark ? "bg-[#0B0B0B] text-white" : "bg-[#0B0B0B] text-white",
        className
      )}
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
      role={image ? "img" : undefined}
      aria-label={image && imageAlt ? imageAlt : undefined}
    >
      {/* Overlay escuro - igual ao da home */}
      {image && <div className="absolute inset-0 bg-black/0"></div>}
      
      {/* Container principal */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white">
              {typeof title === 'string' ? title : title}
            </h1>
            {subtitle && (
              <p className="text-base md:text-lg text-white mb-[0.6rem]">
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}