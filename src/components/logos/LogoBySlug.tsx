import { SansysWaterLogo } from "./SansysWaterLogo"
import { SansysPayLogo } from "./SansysPayLogo"
import { SansysFlowLogo } from "./SansysFlowLogo"
import { SansysHubLogo } from "./SansysHubLogo"
import { SansysBILogo } from "./SansysBILogo"
import { SansysWasteLogo } from "./SansysWasteLogo"
import { SansysAgencyLogo } from "./SansysAgencyLogo"
import { SansysAntifraudeLogo } from "./SansysAntifraudeLogo"
import { SansysCriticaLeituraLogo } from "./SansysCriticaLeituraLogo"
import { SansysOmnichannelLogo } from "./SansysOmnichannelLogo"
import { SansysReaderLogo } from "./SansysReaderLogo"
import { SansysSmartMeterLogo } from "./SansysSmartMeterLogo"
import { SansysGISLogo } from "./SansysGISLogo"

interface LogoBySlugProps {
  slug: string
  className?: string
  variant?: "default" | "white" | "dark"
}

const LOGO_MAP: Record<string, React.ComponentType<{ className?: string; variant?: string }>> = {
  "sansys-water": SansysWaterLogo,
  "sansys-pay": SansysPayLogo,
  "sansys-flow": SansysFlowLogo,
  "sansys-hub": SansysHubLogo,
  "sansys-bi": SansysBILogo,
  "sansys-waste": SansysWasteLogo,
  "sansys-agency": SansysAgencyLogo,
  "sansys-antifraude": SansysAntifraudeLogo,
  "sansys-critica-leitura": SansysCriticaLeituraLogo,
  "sansys-omnichannel": SansysOmnichannelLogo,
  "sansys-reader": SansysReaderLogo,
  "sansys-smart-meter": SansysSmartMeterLogo,
  "sansys-gis": SansysGISLogo,
}

export function LogoBySlug({ slug, className, variant = "default" }: LogoBySlugProps) {
  const LogoComponent = LOGO_MAP[slug]

  if (!LogoComponent) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded ${className || "w-24 h-8"}`}>
        <span className="text-xs text-gray-500 font-medium">{slug}</span>
      </div>
    )
  }

  return <LogoComponent className={className} variant={variant} />
}
