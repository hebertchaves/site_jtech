import {
  CheckCircle,
  Award,
  Star,
  Users,
  TrendingUp,
  Building,
  Globe,
  Zap,
} from "lucide-react"
import { Lang, t } from "../../lib/i18n"
import { metrics, Metric } from "../../data/metrics"
import { Container } from "../layout/Container"

interface MetricsSectionProps {
  lang: Lang
}

const iconMap = {
  CheckCircle,
  Award,
  Star,
  Users,
  TrendingUp,
  Building,
  Globe,
  Zap,
}

export function MetricsSection({ lang }: MetricsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-center mb-12">{t(lang, "home.metrics.title")}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric) => {
            const Icon = iconMap[metric.icon as keyof typeof iconMap] || CheckCircle
            
            return (
              <div key={metric.id} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#E30613] flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl mb-2 text-[#0B0B0B]">{metric.value}</div>
                <div className="text-gray-600">{metric.label[lang]}</div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
