import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { PreWhatsAppModal } from "../components/forms/PreWhatsAppModal"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { calculateBannerOffset } from "../lib/banner-alignment"
import { ScrollToTop } from "../components/ScrollToTop"
import { motion, AnimatePresence } from "motion/react"
import { LogoBySlug } from "../components/logos"
import { getContentProvider } from "../providers"
import { ProductCTAConfig } from "../providers/contentProvider"
import { waterCoreModules } from "../data/water-core-modules"
import { wasteCoreModules } from "../data/waste-core-modules"
import { CoreModulesAccordion } from "../components/product/CoreModulesAccordion"

interface SolutionsPageProps {
  lang: Lang
}

function ImageWithFallback(props: any) {
  const [currentSrc, setCurrentSrc] = useState(props.src)
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  const handleError = () => {
    if (currentSrc.endsWith('.webp')) {
      setCurrentSrc(currentSrc.replace(/\.webp$/, '.png'))
    } else {
      setDidError(true)
    }
  }

  return didError ? (
    <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`} style={style}>
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={currentSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}

// ─── Conteúdo detalhado por produto (PT) ─────────────────────────────────────

const LOREM_DESC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

interface ProductDetail {
  fullDescription: string
  benefitsTitle: string
  benefitsSubtitle: string
  benefits: { title: string; subtitle: string }[]
  functionalitiesTitle: string
  functionalities: string[]
  resultsTitle: string
  results: { metric: string; label: string; description: string }[]
  applicationsTitle: string
  applications: string[]
  ctaTitle: string
  ctaSubtitle: string
}

const LOREM_DETAIL: ProductDetail = {
  fullDescription: LOREM_DESC,
  benefitsTitle: 'Lorem ipsum dolor sit amet',
  benefitsSubtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  benefits: [
    { title: 'Lorem ipsum', subtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { title: 'Dolor sit amet', subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
    { title: 'Sed do eiusmod', subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Ut labore et dolore', subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.' },
  ],
  functionalitiesTitle: 'Principais funcionalidades',
  functionalities: [
    'Lorem ipsum dolor sit amet consectetur',
    'Adipiscing elit sed do eiusmod tempor',
    'Incididunt ut labore et dolore magna',
    'Ut enim ad minim veniam quis nostrud',
    'Exercitation ullamco laboris nisi ut',
    'Duis aute irure dolor in reprehenderit',
  ],
  resultsTitle: 'Resultados comprovados',
  results: [
    { metric: 'XX%', label: 'Lorem ipsum', description: 'Consectetur adipiscing elit sed do eiusmod tempor' },
    { metric: 'XXk', label: 'Dolor sit amet', description: 'Ut enim ad minim veniam quis nostrud exercitation' },
    { metric: 'XX/7', label: 'Sed eiusmod', description: 'Duis aute irure dolor in reprehenderit voluptate' },
  ],
  applicationsTitle: 'Aplicações',
  applications: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur', 'Adipiscing elit'],
  ctaTitle: 'Lorem ipsum dolor sit amet consectetur',
  ctaSubtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

function getProductDetails(lang: Lang): Record<string, ProductDetail> {
  return {
    'sansys-pay': {
      fullDescription: t(lang, 'solutions.pay.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.pay.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.pay.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.pay.detail.b1title'), subtitle: t(lang, 'solutions.pay.detail.b1sub') },
        { title: t(lang, 'solutions.pay.detail.b2title'), subtitle: t(lang, 'solutions.pay.detail.b2sub') },
        { title: t(lang, 'solutions.pay.detail.b3title'), subtitle: t(lang, 'solutions.pay.detail.b3sub') },
        { title: t(lang, 'solutions.pay.detail.b4title'), subtitle: t(lang, 'solutions.pay.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.pay.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.pay.detail.f1'),
        t(lang, 'solutions.pay.detail.f2'),
        t(lang, 'solutions.pay.detail.f3'),
        t(lang, 'solutions.pay.detail.f4'),
      ],
      // Pay não exibe as dobras Resultados / Aplicações (arrays vazios = seções ocultas)
      resultsTitle: '',
      results: [],
      applicationsTitle: '',
      applications: [],
      ctaTitle: t(lang, 'solutions.pay.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.pay.detail.ctaSub'),
    },

    'sansys-waste': {
      fullDescription: t(lang, 'solutions.waste.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.waste.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.waste.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.waste.detail.b1title'), subtitle: t(lang, 'solutions.waste.detail.b1sub') },
        { title: t(lang, 'solutions.waste.detail.b2title'), subtitle: t(lang, 'solutions.waste.detail.b2sub') },
        { title: t(lang, 'solutions.waste.detail.b3title'), subtitle: t(lang, 'solutions.waste.detail.b3sub') },
        { title: t(lang, 'solutions.waste.detail.b4title'), subtitle: t(lang, 'solutions.waste.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.waste.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.waste.detail.f1'),
        t(lang, 'solutions.waste.detail.f2'),
        t(lang, 'solutions.waste.detail.f3'),
        t(lang, 'solutions.waste.detail.f4'),
        t(lang, 'solutions.waste.detail.f5'),
        t(lang, 'solutions.waste.detail.f6'),
      ],
      resultsTitle: t(lang, 'solutions.waste.detail.resultsTitle'),
      results: [
        { metric: '30%', label: t(lang, 'solutions.waste.detail.r1label'), description: t(lang, 'solutions.waste.detail.r1desc') },
        { metric: '100%', label: t(lang, 'solutions.waste.detail.r2label'), description: t(lang, 'solutions.waste.detail.r2desc') },
        { metric: '25%', label: t(lang, 'solutions.waste.detail.r3label'), description: t(lang, 'solutions.waste.detail.r3desc') },
      ],
      applicationsTitle: t(lang, 'solutions.waste.detail.appsTitle'),
      applications: [
        t(lang, 'solutions.waste.detail.a1'),
        t(lang, 'solutions.waste.detail.a2'),
        t(lang, 'solutions.waste.detail.a3'),
        t(lang, 'solutions.waste.detail.a4'),
      ],
      ctaTitle: t(lang, 'solutions.waste.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.waste.detail.ctaSub'),
    },

    'sansys-agency': {
      fullDescription: t(lang, 'solutions.agency.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.agency.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.agency.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.agency.detail.b1title'), subtitle: t(lang, 'solutions.agency.detail.b1sub') },
        { title: t(lang, 'solutions.agency.detail.b2title'), subtitle: t(lang, 'solutions.agency.detail.b2sub') },
        { title: t(lang, 'solutions.agency.detail.b3title'), subtitle: t(lang, 'solutions.agency.detail.b3sub') },
        { title: t(lang, 'solutions.agency.detail.b4title'), subtitle: t(lang, 'solutions.agency.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.agency.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.agency.detail.f1'),
        t(lang, 'solutions.agency.detail.f2'),
        t(lang, 'solutions.agency.detail.f3'),
        t(lang, 'solutions.agency.detail.f4'),
        t(lang, 'solutions.agency.detail.f5'),
        t(lang, 'solutions.agency.detail.f6'),
      ],
      resultsTitle: t(lang, 'solutions.agency.detail.resultsTitle'),
      results: [
        { metric: '40%', label: t(lang, 'solutions.agency.detail.r1label'), description: t(lang, 'solutions.agency.detail.r1desc') },
        { metric: '95%', label: t(lang, 'solutions.agency.detail.r2label'), description: t(lang, 'solutions.agency.detail.r2desc') },
        { metric: '24/7', label: t(lang, 'solutions.agency.detail.r3label'), description: t(lang, 'solutions.agency.detail.r3desc') },
      ],
      applicationsTitle: t(lang, 'solutions.agency.detail.appsTitle'),
      applications: [
        t(lang, 'solutions.agency.detail.a1'),
        t(lang, 'solutions.agency.detail.a2'),
        t(lang, 'solutions.agency.detail.a3'),
        t(lang, 'solutions.agency.detail.a4'),
      ],
      ctaTitle: t(lang, 'solutions.agency.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.agency.detail.ctaSub'),
    },

    'sansys-flow': {
      fullDescription: t(lang, 'solutions.flow.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.flow.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.flow.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.flow.detail.b1title'), subtitle: t(lang, 'solutions.flow.detail.b1sub') },
        { title: t(lang, 'solutions.flow.detail.b2title'), subtitle: t(lang, 'solutions.flow.detail.b2sub') },
        { title: t(lang, 'solutions.flow.detail.b3title'), subtitle: t(lang, 'solutions.flow.detail.b3sub') },
        { title: t(lang, 'solutions.flow.detail.b4title'), subtitle: t(lang, 'solutions.flow.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.flow.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.flow.detail.f1'),
        t(lang, 'solutions.flow.detail.f2'),
        t(lang, 'solutions.flow.detail.f3'),
        t(lang, 'solutions.flow.detail.f4'),
        t(lang, 'solutions.flow.detail.f5'),
        t(lang, 'solutions.flow.detail.f6'),
      ],
      resultsTitle: t(lang, 'solutions.flow.detail.resultsTitle'),
      results: [
        { metric: '35%', label: t(lang, 'solutions.flow.detail.r1label'), description: t(lang, 'solutions.flow.detail.r1desc') },
        { metric: '100%', label: t(lang, 'solutions.flow.detail.r2label'), description: t(lang, 'solutions.flow.detail.r2desc') },
        { metric: '50%', label: t(lang, 'solutions.flow.detail.r3label'), description: t(lang, 'solutions.flow.detail.r3desc') },
      ],
      applicationsTitle: t(lang, 'solutions.flow.detail.appsTitle'),
      applications: [
        t(lang, 'solutions.flow.detail.a1'),
        t(lang, 'solutions.flow.detail.a2'),
        t(lang, 'solutions.flow.detail.a3'),
        t(lang, 'solutions.flow.detail.a4'),
      ],
      ctaTitle: t(lang, 'solutions.flow.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.flow.detail.ctaSub'),
    },

    'sansys-reader': {
      fullDescription: t(lang, 'solutions.reader.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.reader.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.reader.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.reader.detail.b1title'), subtitle: t(lang, 'solutions.reader.detail.b1sub') },
        { title: t(lang, 'solutions.reader.detail.b2title'), subtitle: t(lang, 'solutions.reader.detail.b2sub') },
        { title: t(lang, 'solutions.reader.detail.b3title'), subtitle: t(lang, 'solutions.reader.detail.b3sub') },
        { title: t(lang, 'solutions.reader.detail.b4title'), subtitle: t(lang, 'solutions.reader.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.reader.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.reader.detail.f1'),
        t(lang, 'solutions.reader.detail.f2'),
        t(lang, 'solutions.reader.detail.f3'),
        t(lang, 'solutions.reader.detail.f4'),
        t(lang, 'solutions.reader.detail.f5'),
        t(lang, 'solutions.reader.detail.f6'),
      ],
      resultsTitle: t(lang, 'solutions.reader.detail.resultsTitle'),
      results: [
        { metric: '98%', label: t(lang, 'solutions.reader.detail.r1label'), description: t(lang, 'solutions.reader.detail.r1desc') },
        { metric: '+30%', label: t(lang, 'solutions.reader.detail.r2label'), description: t(lang, 'solutions.reader.detail.r2desc') },
        { metric: '-60%', label: t(lang, 'solutions.reader.detail.r3label'), description: t(lang, 'solutions.reader.detail.r3desc') },
      ],
      applicationsTitle: t(lang, 'solutions.reader.detail.appsTitle'),
      applications: [
        t(lang, 'solutions.reader.detail.a1'),
        t(lang, 'solutions.reader.detail.a2'),
        t(lang, 'solutions.reader.detail.a3'),
        t(lang, 'solutions.reader.detail.a4'),
      ],
      ctaTitle: t(lang, 'solutions.reader.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.reader.detail.ctaSub'),
    },

    'sansys-bi': LOREM_DETAIL,
  }
}

// ─── Conteúdo detalhado por módulo (Sansys Water) ────────────────────────────

interface ModuleDetail {
  fullDescription: string
  benefitsTitle: string
  benefitsSubtitle: string
  benefits: { title: string; subtitle: string }[]
  functionalitiesTitle: string
  functionalities: string[]
  resultsTitle: string
  results: { metric: string; label: string; description: string }[]
  applicationsTitle: string
  applications: string[]
  ctaTitle: string
  ctaSubtitle: string
}

const LOREM_MODULE_DETAIL: ModuleDetail = {
  fullDescription: LOREM_DESC,
  benefitsTitle: 'Lorem ipsum dolor sit amet',
  benefitsSubtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  benefits: [
    { title: 'Lorem ipsum', subtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { title: 'Dolor sit amet', subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
    { title: 'Sed do eiusmod', subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Ut labore et dolore', subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.' },
  ],
  functionalitiesTitle: 'Principais funcionalidades',
  functionalities: [
    'Lorem ipsum dolor sit amet consectetur',
    'Adipiscing elit sed do eiusmod tempor',
    'Incididunt ut labore et dolore magna',
    'Ut enim ad minim veniam quis nostrud',
    'Exercitation ullamco laboris nisi ut',
    'Duis aute irure dolor in reprehenderit',
    'In voluptate velit esse cillum dolore',
    'Excepteur sint occaecat cupidatat non',
    'Proident sunt in culpa qui officia deserunt',
  ],
  resultsTitle: 'Resultados comprovados',
  results: [
    { metric: 'XX%', label: 'Lorem ipsum', description: 'Consectetur adipiscing elit sed do eiusmod tempor' },
    { metric: 'XXk', label: 'Dolor sit amet', description: 'Ut enim ad minim veniam quis nostrud exercitation' },
    { metric: 'XX/7', label: 'Sed eiusmod', description: 'Duis aute irure dolor in reprehenderit voluptate' },
  ],
  applicationsTitle: 'Aplicações',
  applications: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur', 'Adipiscing elit'],
  ctaTitle: 'Lorem ipsum dolor sit amet consectetur',
  ctaSubtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

function getModuleDetails(lang: Lang): Record<string, ModuleDetail> {
  return {
    'sansys-smart-meter': {
      fullDescription: t(lang, 'solutions.module.smartmeter.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.module.smartmeter.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.module.smartmeter.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.module.smartmeter.detail.b1title'), subtitle: t(lang, 'solutions.module.smartmeter.detail.b1sub') },
        { title: t(lang, 'solutions.module.smartmeter.detail.b2title'), subtitle: t(lang, 'solutions.module.smartmeter.detail.b2sub') },
        { title: t(lang, 'solutions.module.smartmeter.detail.b3title'), subtitle: t(lang, 'solutions.module.smartmeter.detail.b3sub') },
        { title: t(lang, 'solutions.module.smartmeter.detail.b4title'), subtitle: t(lang, 'solutions.module.smartmeter.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.module.smartmeter.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.module.smartmeter.detail.f1'),
        t(lang, 'solutions.module.smartmeter.detail.f2'),
        t(lang, 'solutions.module.smartmeter.detail.f3'),
        t(lang, 'solutions.module.smartmeter.detail.f4'),
        t(lang, 'solutions.module.smartmeter.detail.f5'),
        t(lang, 'solutions.module.smartmeter.detail.f6'),
        t(lang, 'solutions.module.smartmeter.detail.f7'),
        t(lang, 'solutions.module.smartmeter.detail.f8'),
        t(lang, 'solutions.module.smartmeter.detail.f9'),
      ],
      resultsTitle: t(lang, 'solutions.module.smartmeter.detail.resultsTitle'),
      results: [
        { metric: 'XX%', label: t(lang, 'solutions.module.smartmeter.detail.r1label'), description: t(lang, 'solutions.module.smartmeter.detail.r1desc') },
        { metric: 'XXk', label: t(lang, 'solutions.module.smartmeter.detail.r2label'), description: t(lang, 'solutions.module.smartmeter.detail.r2desc') },
        { metric: 'XX%', label: t(lang, 'solutions.module.smartmeter.detail.r3label'), description: t(lang, 'solutions.module.smartmeter.detail.r3desc') },
      ],
      applicationsTitle: t(lang, 'solutions.module.smartmeter.detail.appsTitle'),
      applications: [
        t(lang, 'solutions.module.smartmeter.detail.a1'),
        t(lang, 'solutions.module.smartmeter.detail.a2'),
        t(lang, 'solutions.module.smartmeter.detail.a3'),
        t(lang, 'solutions.module.smartmeter.detail.a4'),
      ],
      ctaTitle: t(lang, 'solutions.module.smartmeter.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.module.smartmeter.detail.ctaSub'),
    },

    'sansys-omnichannel': {
      fullDescription: t(lang, 'solutions.module.omnichannel.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.module.omnichannel.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.module.omnichannel.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.module.omnichannel.detail.b1title'), subtitle: t(lang, 'solutions.module.omnichannel.detail.b1sub') },
        { title: t(lang, 'solutions.module.omnichannel.detail.b2title'), subtitle: t(lang, 'solutions.module.omnichannel.detail.b2sub') },
        { title: t(lang, 'solutions.module.omnichannel.detail.b3title'), subtitle: t(lang, 'solutions.module.omnichannel.detail.b3sub') },
        { title: t(lang, 'solutions.module.omnichannel.detail.b4title'), subtitle: t(lang, 'solutions.module.omnichannel.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.module.omnichannel.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.module.omnichannel.detail.f1'),
        t(lang, 'solutions.module.omnichannel.detail.f2'),
        t(lang, 'solutions.module.omnichannel.detail.f3'),
        t(lang, 'solutions.module.omnichannel.detail.f4'),
        t(lang, 'solutions.module.omnichannel.detail.f5'),
        t(lang, 'solutions.module.omnichannel.detail.f6'),
        t(lang, 'solutions.module.omnichannel.detail.f7'),
        t(lang, 'solutions.module.omnichannel.detail.f8'),
        t(lang, 'solutions.module.omnichannel.detail.f9'),
      ],
      resultsTitle: t(lang, 'solutions.module.omnichannel.detail.resultsTitle'),
      results: [
        { metric: 'XX%', label: t(lang, 'solutions.module.omnichannel.detail.r1label'), description: t(lang, 'solutions.module.omnichannel.detail.r1desc') },
        { metric: 'XX%', label: t(lang, 'solutions.module.omnichannel.detail.r2label'), description: t(lang, 'solutions.module.omnichannel.detail.r2desc') },
        { metric: '24/7', label: t(lang, 'solutions.module.omnichannel.detail.r3label'), description: t(lang, 'solutions.module.omnichannel.detail.r3desc') },
      ],
      applicationsTitle: t(lang, 'solutions.module.omnichannel.detail.appsTitle'),
      applications: [
        t(lang, 'solutions.module.omnichannel.detail.a1'),
        t(lang, 'solutions.module.omnichannel.detail.a2'),
        t(lang, 'solutions.module.omnichannel.detail.a3'),
        t(lang, 'solutions.module.omnichannel.detail.a4'),
      ],
      ctaTitle: t(lang, 'solutions.module.omnichannel.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.module.omnichannel.detail.ctaSub'),
    },

    'sansys-bi': {
      fullDescription: t(lang, 'solutions.module.bi.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.module.bi.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.module.bi.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.module.bi.detail.b1title'), subtitle: t(lang, 'solutions.module.bi.detail.b1sub') },
        { title: t(lang, 'solutions.module.bi.detail.b2title'), subtitle: t(lang, 'solutions.module.bi.detail.b2sub') },
        { title: t(lang, 'solutions.module.bi.detail.b3title'), subtitle: t(lang, 'solutions.module.bi.detail.b3sub') },
        { title: t(lang, 'solutions.module.bi.detail.b4title'), subtitle: t(lang, 'solutions.module.bi.detail.b4sub') },
      ],
      // BI não exibe Funcionalidades / Aplicações (arrays vazios = seções ocultas)
      functionalitiesTitle: '',
      functionalities: [],
      resultsTitle: '',
      results: [],
      applicationsTitle: '',
      applications: [],
      ctaTitle: t(lang, 'solutions.module.bi.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.module.bi.detail.ctaSub'),
    },

    'sansys-critica-leitura': {
      fullDescription: t(lang, 'solutions.module.criticaleitura.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.module.criticaleitura.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.module.criticaleitura.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.module.criticaleitura.detail.b1title'), subtitle: t(lang, 'solutions.module.criticaleitura.detail.b1sub') },
        { title: t(lang, 'solutions.module.criticaleitura.detail.b2title'), subtitle: t(lang, 'solutions.module.criticaleitura.detail.b2sub') },
        { title: t(lang, 'solutions.module.criticaleitura.detail.b3title'), subtitle: t(lang, 'solutions.module.criticaleitura.detail.b3sub') },
        { title: t(lang, 'solutions.module.criticaleitura.detail.b4title'), subtitle: t(lang, 'solutions.module.criticaleitura.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.module.criticaleitura.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.module.criticaleitura.detail.f1'),
        t(lang, 'solutions.module.criticaleitura.detail.f2'),
        t(lang, 'solutions.module.criticaleitura.detail.f3'),
        t(lang, 'solutions.module.criticaleitura.detail.f4'),
        t(lang, 'solutions.module.criticaleitura.detail.f5'),
        t(lang, 'solutions.module.criticaleitura.detail.f6'),
        t(lang, 'solutions.module.criticaleitura.detail.f7'),
        t(lang, 'solutions.module.criticaleitura.detail.f8'),
        t(lang, 'solutions.module.criticaleitura.detail.f9'),
      ],
      resultsTitle: t(lang, 'solutions.module.criticaleitura.detail.resultsTitle'),
      results: [
        { metric: 'XX%', label: t(lang, 'solutions.module.criticaleitura.detail.r1label'), description: t(lang, 'solutions.module.criticaleitura.detail.r1desc') },
        { metric: 'XX%', label: t(lang, 'solutions.module.criticaleitura.detail.r2label'), description: t(lang, 'solutions.module.criticaleitura.detail.r2desc') },
        { metric: 'XX%', label: t(lang, 'solutions.module.criticaleitura.detail.r3label'), description: t(lang, 'solutions.module.criticaleitura.detail.r3desc') },
      ],
      applicationsTitle: t(lang, 'solutions.module.criticaleitura.detail.appsTitle'),
      applications: [
        t(lang, 'solutions.module.criticaleitura.detail.a1'),
        t(lang, 'solutions.module.criticaleitura.detail.a2'),
        t(lang, 'solutions.module.criticaleitura.detail.a3'),
        t(lang, 'solutions.module.criticaleitura.detail.a4'),
      ],
      ctaTitle: t(lang, 'solutions.module.criticaleitura.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.module.criticaleitura.detail.ctaSub'),
    },

    'sansys-antifraude': {
      fullDescription: t(lang, 'solutions.module.antifraude.detail.fullDesc'),
      benefitsTitle: t(lang, 'solutions.module.antifraude.detail.benefitsTitle'),
      benefitsSubtitle: t(lang, 'solutions.module.antifraude.detail.benefitsSubtitle'),
      benefits: [
        { title: t(lang, 'solutions.module.antifraude.detail.b1title'), subtitle: t(lang, 'solutions.module.antifraude.detail.b1sub') },
        { title: t(lang, 'solutions.module.antifraude.detail.b2title'), subtitle: t(lang, 'solutions.module.antifraude.detail.b2sub') },
        { title: t(lang, 'solutions.module.antifraude.detail.b3title'), subtitle: t(lang, 'solutions.module.antifraude.detail.b3sub') },
        { title: t(lang, 'solutions.module.antifraude.detail.b4title'), subtitle: t(lang, 'solutions.module.antifraude.detail.b4sub') },
      ],
      functionalitiesTitle: t(lang, 'solutions.module.antifraude.detail.funcsTitle'),
      functionalities: [
        t(lang, 'solutions.module.antifraude.detail.f1'),
        t(lang, 'solutions.module.antifraude.detail.f2'),
        t(lang, 'solutions.module.antifraude.detail.f3'),
        t(lang, 'solutions.module.antifraude.detail.f4'),
        t(lang, 'solutions.module.antifraude.detail.f5'),
        t(lang, 'solutions.module.antifraude.detail.f6'),
        t(lang, 'solutions.module.antifraude.detail.f7'),
        t(lang, 'solutions.module.antifraude.detail.f8'),
        t(lang, 'solutions.module.antifraude.detail.f9'),
      ],
      resultsTitle: t(lang, 'solutions.module.antifraude.detail.resultsTitle'),
      results: [
        { metric: 'XX%', label: t(lang, 'solutions.module.antifraude.detail.r1label'), description: t(lang, 'solutions.module.antifraude.detail.r1desc') },
        { metric: 'XX%', label: t(lang, 'solutions.module.antifraude.detail.r2label'), description: t(lang, 'solutions.module.antifraude.detail.r2desc') },
        { metric: 'XX%', label: t(lang, 'solutions.module.antifraude.detail.r3label'), description: t(lang, 'solutions.module.antifraude.detail.r3desc') },
      ],
      applicationsTitle: t(lang, 'solutions.module.antifraude.detail.appsTitle'),
      applications: [
        t(lang, 'solutions.module.antifraude.detail.a1'),
        t(lang, 'solutions.module.antifraude.detail.a2'),
        t(lang, 'solutions.module.antifraude.detail.a3'),
        t(lang, 'solutions.module.antifraude.detail.a4'),
      ],
      ctaTitle: t(lang, 'solutions.module.antifraude.detail.ctaTitle'),
      ctaSubtitle: t(lang, 'solutions.module.antifraude.detail.ctaSub'),
    },
  }
}

// ─── Componente principal ────────────────────────────────────────────────────

export function SolutionsPage({ lang }: SolutionsPageProps) {
  const productDetails = getProductDetails(lang)
  const moduleDetails = getModuleDetails(lang)

  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  const [activeCTAConfig, setActiveCTAConfig] = useState<ProductCTAConfig | null>(null)
  const [ctaConfigs, setCTAConfigs] = useState<Record<string, ProductCTAConfig>>({})
  const [moduloIndex, setModuloIndex] = useState(0)
  const [openCoreModule, setOpenCoreModule] = useState<number>(0)
  const [bannerOffset, setBannerOffset] = useState(0)
  const [productIndex, setProductIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateOffset = () => setBannerOffset(calculateBannerOffset())
    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  useEffect(() => {
    getContentProvider()
      .getProductCTAConfigs()
      .then(configs => {
        console.log('[CTA] configs carregados:', configs)
        setCTAConfigs(configs)
      })
      .catch(err => console.warn('[CTA] falha ao carregar configs:', err))
  }, [])

  // Navegar direto para um produto via ?produto= na URL
  useEffect(() => {
    const readProductParam = () => {
      const hash = window.location.hash
      const queryStart = hash.indexOf('?')
      if (queryStart === -1) return
      const params = new URLSearchParams(hash.slice(queryStart + 1))
      const slug = params.get('produto')
      if (!slug) return
      const idx = produtos.findIndex(p => p.slug === slug)
      if (idx !== -1) setProductIndex(idx)
    }
    readProductParam()
    window.addEventListener('hashchange', readProductParam)
    return () => window.removeEventListener('hashchange', readProductParam)
  }, [])

  // Navegar direto para um módulo via ?modulo= na URL
  useEffect(() => {
    const MODULO_SLUGS = [
      'sansys-smart-meter',
      'sansys-omnichannel',
      'sansys-bi',
      'sansys-antifraude',
      'sansys-critica-leitura',
    ]
    const readModuloParam = () => {
      const hash = window.location.hash
      const queryStart = hash.indexOf('?')
      if (queryStart === -1) return
      const params = new URLSearchParams(hash.slice(queryStart + 1))
      const slug = params.get('modulo')
      if (!slug) return
      const idx = MODULO_SLUGS.indexOf(slug)
      if (idx === -1) return
      setProductIndex(0)
      setModuloIndex(idx)
      setTimeout(() => {
        document.getElementById('secao-modulos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 800)
    }
    readModuloParam()
    window.addEventListener('hashchange', readModuloParam)
    return () => window.removeEventListener('hashchange', readModuloParam)
  }, [])

  // Scroll programático do carrossel mobile
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.carousel-card')?.clientWidth || 0
      carouselRef.current.scrollTo({ left: productIndex * (cardWidth + 16), behavior: 'smooth' })
    }
  }, [productIndex])

  const produtos = [
    {
      slug: "sansys-water",
      name: "sansys water",
      title: t(lang, "solutions.water.title"),
      description: t(lang, "solutions.water.description"),
      badges: [t(lang, "solutions.badge.specialized"), t(lang, "solutions.badge.integration"), t(lang, "solutions.badge.saas"), t(lang, "solutions.badge.multiplatform")],
      image: "/mockups/sansys-water.png",
    },
    {
      slug: "sansys-pay",
      name: "sansys pay",
      title: t(lang, "solutions.pay.title"),
      description: t(lang, "solutions.pay.description"),
      badges: [t(lang, "solutions.pay.badge1"), t(lang, "solutions.pay.badge2"), t(lang, "solutions.pay.badge3"), t(lang, "solutions.pay.badge4")],
      image: "/mockups/sansys-pay.png",
    },
    {
      slug: "sansys-waste",
      name: "sansys waste",
      title: t(lang, "solutions.waste.title"),
      description: t(lang, "solutions.waste.description"),
      badges: [t(lang, "solutions.waste.badge1"), t(lang, "solutions.waste.badge2"), t(lang, "solutions.waste.badge3"), t(lang, "solutions.waste.badge4")],
      image: "/mockups/sansys-waste.png",
    },
    {
      slug: "sansys-agency",
      name: "sansys agency",
      title: t(lang, "solutions.agency.title"),
      description: t(lang, "solutions.agency.description"),
      badges: [t(lang, "solutions.agency.badge1"), t(lang, "solutions.agency.badge2"), t(lang, "solutions.agency.badge3"), t(lang, "solutions.agency.badge4")],
      image: "/mockups/sansys-agency.png",
    },
    {
      slug: "sansys-flow",
      name: "sansys flow",
      title: t(lang, "solutions.flow.title"),
      description: t(lang, "solutions.flow.description"),
      badges: [t(lang, "solutions.flow.badge1"), t(lang, "solutions.flow.badge2"), t(lang, "solutions.flow.badge3"), t(lang, "solutions.flow.badge4")],
      image: "/mockups/sansys-flow.png",
    },
    {
      slug: "sansys-reader",
      name: "sansys reader",
      title: t(lang, "solutions.reader.title"),
      description: t(lang, "solutions.reader.description"),
      badges: [t(lang, "solutions.reader.badge1"), t(lang, "solutions.reader.badge2"), t(lang, "solutions.reader.badge3"), t(lang, "solutions.reader.badge4")],
      image: "/mockups/sansys-reader.png",
    },
  ]

  const diferenciais = [
    t(lang, "solutions.differentials.item1"),
    t(lang, "solutions.differentials.item2"),
    t(lang, "solutions.differentials.item3"),
    t(lang, "solutions.differentials.item4"),
    t(lang, "solutions.differentials.item5"),
  ]

  const modulos = [
    { slug: "sansys-smart-meter", title: t(lang, "solutions.module.smartmeter.title"), text: t(lang, "solutions.module.smartmeter.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-smart-meter.webp" },
    { slug: "sansys-omnichannel", title: t(lang, "solutions.module.omnichannel.title"), text: t(lang, "solutions.module.omnichannel.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-omnichannel.webp" },
    { slug: "sansys-bi", title: t(lang, "solutions.module.bi.title"), text: t(lang, "solutions.module.bi.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-business-intelligence.webp" },
    { slug: "sansys-antifraude", title: t(lang, "solutions.module.antifraude.title"), text: t(lang, "solutions.module.antifraude.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-antifraude.webp" },
    { slug: "sansys-critica-leitura", title: t(lang, "solutions.module.criticaleitura.title"), text: t(lang, "solutions.module.criticaleitura.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-critica-leitura.webp" },
  ]

  const nextProduct = () => setProductIndex((prev) => (prev + 1) % produtos.length)
  const prevProduct = () => setProductIndex((prev) => (prev - 1 + produtos.length) % produtos.length)
  const nextModulo = () => setModuloIndex((prev) => (prev + 1) % modulos.length)
  const prevModulo = () => setModuloIndex((prev) => (prev - 1 + modulos.length) % modulos.length)

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) nextProduct()
    if (distance < -50) prevProduct()
    setTouchStart(0)
    setTouchEnd(0)
  }

  const getVisibleModulos = () => {
    return Array.from({ length: 3 }, (_, i) => {
      const idx = (moduloIndex - 1 + i + modulos.length) % modulos.length
      return { ...modulos[idx], originalIndex: idx }
    })
  }

  const currentProduct = produtos[productIndex]
  const detail = productDetails[currentProduct.slug]
  const isWater = currentProduct.slug === 'sansys-water'
  const isWaste = currentProduct.slug === 'sansys-waste'
  const solutionsPath = lang === 'pt' ? 'solucoes' : lang === 'es' ? 'soluciones' : 'solutions'

  const openCTA = (slug: string) => {
    setActiveCTAConfig(ctaConfigs[slug] ?? null)
    setWhatsappModalOpen(true)
  }

  const ctaLabel = (slug: string, fallback: string) =>
    ctaConfigs[slug]?.ctaLabel ?? fallback

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[#0B0B0B] text-white pt-32 pb-20 min-h-[500px] flex items-center"
        style={{ backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-solucoes-tecnologia-desenvolvimento-software-saneamento.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
        role="img"
        aria-label="Profissionais trabalhando com tecnologia em ambiente corporativo moderno"
      >
        <div className="absolute inset-0 bg-black/0" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
            <div className="max-w-2xl">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white font-extralight [&>strong]:font-bold [&>span]:font-extralight"
                dangerouslySetInnerHTML={{ __html: t(lang, "solutions.hero.title") }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CARROSSEL DE PRODUTOS ─────────────────────────────────────────────── */}
      <section
        className="py-22 bg-white relative min-h-[700px]"
        style={{ backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-solucoes-saneamento.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        role="img"
        aria-label="Fundo abstrato com elementos gráficos suaves representando tecnologia e inovação"
      >
        <Container>
          <div className="relative">
            {/* Setas desktop */}
            <button onClick={prevProduct} className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group bg-white cursor-pointer z-10 shadow-md" aria-label="Produto anterior">
              <ChevronLeft className="h-6 w-6 text-[#E30613] group-hover:text-white" />
            </button>
            <button onClick={nextProduct} className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group bg-white cursor-pointer z-10 shadow-md" aria-label="Próximo produto">
              <ChevronRight className="h-6 w-6 text-[#E30613] group-hover:text-white" />
            </button>

            <div className="overflow-visible">
              {/* Mobile */}
              <div className="lg:hidden relative">
                <button onClick={prevProduct} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-10 shadow-md" aria-label="Produto anterior">
                  <ChevronLeft className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                </button>
                <button onClick={nextProduct} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-10 shadow-md" aria-label="Próximo produto">
                  <ChevronRight className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                </button>
                <div
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1"
                  style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
                  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
                  ref={carouselRef}
                >
                  {produtos.map((produto, idx) => (
                    <div key={idx} className={`carousel-card flex-none w-[85vw] snap-center transition-all duration-300 ${idx === productIndex ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} onClick={() => setProductIndex(idx)}>
                      <div className="p-6 rounded-lg h-full">
                        <div className="mb-4">
                          <ImageWithFallback src={`https://conteudo.sansys.app/site/img/jtech-${produto.slug}.webp`} alt={`Logo ${produto.name}`} className="h-10 w-auto" />
                        </div>
                        <h3 className="text-xl mb-3">{produto.title}</h3>
                        <p className="text-gray-700 text-base mb-4 leading-relaxed line-clamp-4">{produto.slug !== 'sansys-water' && productDetails[produto.slug] ? productDetails[produto.slug].fullDescription : produto.description}</p>
                        <div className="mb-4">
                          <ImageWithFallback src={produto.image} alt={produto.title} className="w-full rounded-lg aspect-video object-contain" style={{ transform: 'scale(1.3)' }} />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {produto.badges.slice(0, 3).map((badge, i) => (
                            <span key={i} className="bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full">{badge}</span>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="bg-[#E30613] hover:bg-[#C10511] text-white w-full" onClick={() => openCTA(produto.slug)}>
                            {ctaLabel(produto.slug, 'Fale com um de nossos especialistas')}
                          </Button>
                          <Button size="sm" variant="ghost" className="text-[#E30613] hover:bg-[#E30613]/10 flex items-center justify-center gap-2 w-full text-[19px] font-semibold tracking-wide" onClick={() => document.getElementById('product-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                            SAIBA MAIS <ChevronDown className="h-4 w-4 arrow-bounce" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop */}
              <div key={`product-${productIndex}`} className="hidden lg:block animate-fade-in p-8 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-6">
                  <div className="animate-slide-in-left">
                    <div className="mb-6">
                      <ImageWithFallback src={`https://conteudo.sansys.app/site/img/jtech-${currentProduct.slug}.webp`} alt={`Logo ${currentProduct.name}`} className="h-20 w-auto" />
                    </div>
                    <h3 className="text-2xl mb-4">{currentProduct.title}</h3>
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">{!isWater && detail ? detail.fullDescription : currentProduct.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {currentProduct.badges.map((badge, idx) => (
                        <span key={idx} className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full">{badge}</span>
                      ))}
                    </div>
                  </div>
                  <div className="animate-slide-in-right">
                    <ImageWithFallback src={currentProduct.image} alt={currentProduct.title} className="w-full rounded-lg aspect-video object-contain" style={{ transform: 'scale(1.3)' }} />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Button className="bg-[#E30613] hover:bg-[#C10511] text-white min-w-[200px]" onClick={() => openCTA(currentProduct.slug)}>
                    {ctaLabel(currentProduct.slug, 'Fale com um de nossos especialistas')}
                  </Button>
                  <Button variant="ghost" className="text-[#E30613] hover:bg-[#E30613]/10 flex items-center gap-2 min-w-[200px] text-[19px] font-semibold tracking-wide" onClick={() => document.getElementById('product-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                    SAIBA MAIS <ChevronDown className="h-4 w-4 arrow-bounce" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-8">
            {produtos.map((_, idx) => (
              <button key={idx} onClick={() => setProductIndex(idx)} className={`h-2 rounded-full transition-all ${idx === productIndex ? "bg-[#E30613] w-8" : "bg-gray-300 w-2"}`} aria-label={`Ir para produto ${idx + 1}`} />
            ))}
          </div>
        </Container>

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
          .animate-fade-in { animation: fadeIn 0.6s ease-out; }
          .animate-slide-in-left { animation: slideInLeft 0.6s ease-out; }
          .animate-slide-in-right { animation: slideInRight 0.6s ease-out; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
          @keyframes arrowBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
          .arrow-bounce { animation: arrowBounce 1.2s ease-in-out infinite; }
        `}</style>
      </section>

      {/* ── CONTEÚDO DINÂMICO (muda com o carrossel) ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          id="product-detail"
          key={currentProduct.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {isWater ? (
            /* ── WATER: layout original ──────────────────────────────────────── */
            <>
              {/* Diferenciais */}
              <section
                className="pt-16 bg-[#0B0B0B] text-white relative"
                style={{ backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp')", backgroundSize: "cover", backgroundPosition: "bottom", paddingBottom: "240px" }}
                role="img" aria-label="Fundo abstrato escuro com padrões geométricos representando diferenciais tecnológicos"
              >
                <Container className="pb-16">
                  <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="mb-8">
                        <h2 className="text-white font-extralight">{t(lang, "solutions.differentials.title")}</h2>
                        <div className="h-[2px] bg-[#E30613] w-[80px]" />
                      </div>
                      <ul className="space-y-6">
                        {diferenciais.map((d, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <span className="text-[#E30613] text-2xl flex-shrink-0">•</span>
                            <p className="text-gray-300 leading-relaxed">{d}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <ImageWithFallback src="https://conteudo.sansys.app/site/img/sansys-water-interface-gestao-comercial-operacional-saneamento.webp" alt={t(lang, "solutions.image.screenshots")} className="w-full rounded-lg shadow-lg" />
                    </div>
                  </div>
                </Container>
              </section>

              {/* Principais Módulos — acordeão (módulos core do Sansys Water) */}
              <section
                className="bg-white relative -mt-[164px] scroll-mt-20"
                style={{ backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-solucoes-saneamento.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
                role="img" aria-label="Fundo com textura suave para a seção de módulos principais"
              >
                <Container>
                  <CoreModulesAccordion
                    lang={lang}
                    title={t(lang, "solutions.coremodules.title")}
                    modules={waterCoreModules}
                    openIndex={openCoreModule}
                    onToggle={setOpenCoreModule}
                  />
                </Container>
              </section>

              {/* Módulos Adicionais */}
              <section id="secao-modulos" className="bg-white relative scroll-mt-20 pt-16">
                <Container>
                  <h2 className="mb-12 text-center font-extralight" dangerouslySetInnerHTML={{ __html: t(lang, "solutions.modules.title") }} />
                  <div className="relative pb-4">
                    <div className="flex items-center justify-center gap-4">
                      <button onClick={prevModulo} className="hidden lg:flex w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group flex-shrink-0 z-30 bg-white shadow-md" aria-label={t(lang, "solutions.module.prev")}>
                        <ChevronLeft className="h-6 w-6 text-[#E30613] group-hover:text-white transition-colors" />
                      </button>
                      <div className="relative w-full overflow-visible py-4" style={{ maxWidth: '1200px', minHeight: '380px' }}>
                        <button onClick={prevModulo} className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-30 shadow-md" aria-label={t(lang, "solutions.module.prev")}>
                          <ChevronLeft className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                        </button>
                        <button onClick={nextModulo} className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-30 shadow-md" aria-label={t(lang, "solutions.module.next")}>
                          <ChevronRight className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                        </button>
                        <motion.div key={moduloIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="flex gap-6 relative z-20">
                          {getVisibleModulos().map((modulo, idx) => {
                            const isActive = modulo.originalIndex === moduloIndex
                            return (
                            <div key={idx} onClick={() => {
                              setModuloIndex(modulo.originalIndex)
                              setTimeout(() => document.getElementById('module-detail-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
                            }}
                              className={`rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer flex-shrink-0 ${isActive ? 'border-[#E30613] shadow-xl scale-105 opacity-100 z-10' : 'border-gray-200 bg-white opacity-60 hover:opacity-80'}`}
                              style={{ width: 'calc((100% - 48px) / 3)', minWidth: '200px' }}
                            >
                              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                                <ImageWithFallback src={modulo.image} alt={modulo.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-4">
                                <h3 className="text-lg font-bold text-center">{modulo.title}</h3>
                              </div>
                            </div>
                          )
                          })}
                        </motion.div>
                      </div>
                      <button onClick={nextModulo} className="hidden lg:flex w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group flex-shrink-0 z-30 bg-white shadow-md" aria-label={t(lang, "solutions.module.next")}>
                        <ChevronRight className="h-6 w-6 text-[#E30613] group-hover:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </Container>
              </section>

              {/* Detalhe do módulo selecionado */}
              <AnimatePresence mode="wait">
                <motion.div
                  id="module-detail-section"
                  key={modulos[moduloIndex].slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {(() => {
                    const md = moduleDetails[modulos[moduloIndex].slug]
                    const currentModulo = modulos[moduloIndex]
                    if (!md) return null
                    return (
                      <>
                        {/* Blocos 1+2 — Descrição + Benefícios lado a lado */}
                        <section className="pt-8 pb-16 bg-white">
                          <Container>
                            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
                              {/* Coluna esquerda: logo SVG + descrição + CTA */}
                              <div className="flex flex-col gap-6">
                                <div className="flex justify-start">
                                  <LogoBySlug slug={currentModulo.slug} className="h-14 w-auto" variant="default" />
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed">{md.fullDescription}</p>
                                <div className="flex justify-center">
                                  <Button size="lg" className="bg-[#E30613] hover:bg-[#C10511]" onClick={() => openCTA(modulos[moduloIndex].slug)}>
                                    {ctaLabel(modulos[moduloIndex].slug, 'Fale com um de nossos especialistas')}
                                  </Button>
                                </div>
                              </div>
                              {/* Coluna direita: benefícios */}
                              <div>
                                <h2 className="text-2xl mb-2">{md.benefitsTitle}</h2>
                                <p className="text-gray-500 mb-6">{md.benefitsSubtitle}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {md.benefits.map((b, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-5 border-l-4 border-[#E30613] shadow-sm hover:shadow-md transition-shadow">
                                      <h3 className="text-base font-semibold mb-1 text-gray-900">{b.title}</h3>
                                      <p className="text-sm text-gray-600 leading-relaxed">{b.subtitle}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Container>
                        </section>

                        {/* Funcionalidades — oculto p/ módulos sem itens */}
                        {md.functionalities.length > 0 && (
                        <section className="py-16 bg-white">
                          <Container>
                            <div
                              className="rounded-2xl p-10 text-white"
                              style={{ backgroundColor: "#0B0B0B", backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp')", backgroundSize: "cover", backgroundPosition: "bottom" }}
                            >
                              <div className="mb-10">
                                <h2 className="text-white font-extralight text-3xl">{md.functionalitiesTitle}</h2>
                                <div className="h-[2px] bg-[#E30613] w-[80px] mt-2" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {md.functionalities.map((f, idx) => (
                                  <div key={idx} className="flex items-start gap-4">
                                    <span className="text-[#E30613] text-2xl flex-shrink-0 leading-none mt-0.5">•</span>
                                    <p className="text-gray-300 leading-relaxed">{f}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Container>
                        </section>
                        )}

                        {/* Aplicações — oculto p/ módulos sem itens */}
                        {md.applications.length > 0 && (
                        <section className="py-16 bg-white">
                          <Container>
                            <div className="mb-10">
                              <h2 className="text-3xl font-extralight">{md.applicationsTitle}</h2>
                              <div className="h-[2px] bg-[#E30613] w-[80px] mt-2" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {md.applications.map((app, idx) => (
                                <div key={idx} className="text-center py-6 px-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-[#E30613] hover:bg-red-50 transition-all">
                                  <span className="text-gray-700 font-medium">{app}</span>
                                </div>
                              ))}
                            </div>
                          </Container>
                        </section>
                        )}

                      </>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>

              {/* CTA final — fixo do produto (fora do detalhe do módulo, não muda
                  conforme o módulo selecionado no carrossel) */}
              <section
                className="py-20 text-white"
                style={{ backgroundColor: "#0B0B0B", backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-contato-suporte-atendimento-cliente-saneamento.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                role="img" aria-label="Fundo com elementos gráficos tecnológicos para call-to-action"
              >
                <Container>
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">{t(lang, 'solutions.water.detail.ctaTitle')}</h2>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">{t(lang, 'solutions.water.detail.ctaSub')}</p>
                    <Button size="lg" className="bg-[#E30613] hover:bg-[#C10511]" onClick={() => openCTA(currentProduct.slug)}>
                      {ctaLabel(currentProduct.slug, 'Entrar em contato')}
                    </Button>
                  </div>
                </Container>
              </section>
            </>
          ) : detail ? (
            /* ── DEMAIS PRODUTOS: novos blocos ───────────────────────────────── */
            <>
              {/* Bloco 1 — Benefícios (4 boxes) */}
              <section className="py-16 bg-white">
                <Container>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl mb-3">{detail.benefitsTitle}</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">{detail.benefitsSubtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detail.benefits.map((b, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-6 border-l-4 border-[#E30613] shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">{b.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{b.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>

              {/* Bloco 2 — Principais Módulos — acordeão (módulos core do Sansys Waste) */}
              {isWaste && (
              <section
                className="bg-white relative scroll-mt-20 pb-16"
                style={{ backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-solucoes-saneamento.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
                role="img" aria-label="Fundo com textura suave para a seção de módulos principais"
              >
                <Container>
                  <CoreModulesAccordion
                    lang={lang}
                    title={t(lang, "solutions.coremodules.title")}
                    modules={wasteCoreModules}
                    openIndex={openCoreModule}
                    onToggle={setOpenCoreModule}
                  />
                </Container>
              </section>
              )}

              {/* Bloco 3 — Funcionalidades (6 bullets) — oculto p/ produtos sem itens */}
              {detail.functionalities.length > 0 && (
              <section
                className="py-16 text-white"
                style={{ backgroundColor: "#0B0B0B", backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp')", backgroundSize: "cover", backgroundPosition: "bottom" }}
                role="img" aria-label="Fundo escuro para seção de funcionalidades"
              >
                <Container>
                  <div className="mb-10">
                    <h2 className="text-white font-extralight text-3xl">{detail.functionalitiesTitle}</h2>
                    <div className="h-[2px] bg-[#E30613] w-[80px] mt-2" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {detail.functionalities.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="text-[#E30613] text-2xl flex-shrink-0 leading-none mt-0.5">•</span>
                        <p className="text-gray-300 leading-relaxed">{f}</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>
              )}

              {/* Bloco 5 — Aplicações (4 boxes) — oculto p/ produtos sem itens */}
              {detail.applications.length > 0 && (
              <section className="py-16 bg-white">
                <Container>
                  <div className="mb-10">
                    <h2 className="text-3xl font-extralight">{detail.applicationsTitle}</h2>
                    <div className="h-[2px] bg-[#E30613] w-[80px] mt-2" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {detail.applications.map((app, idx) => (
                      <div key={idx} className="text-center py-6 px-4 rounded-lg border-2 border-gray-200 hover:border-[#E30613] hover:bg-red-50 transition-all">
                        <span className="text-gray-700 font-medium">{app}</span>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>
              )}

              {/* Bloco 6 — CTA Final */}
              <section
                className="py-20 text-white"
                style={{ backgroundColor: "#0B0B0B", backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-contato-suporte-atendimento-cliente-saneamento.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                role="img" aria-label="Fundo com elementos gráficos tecnológicos para call-to-action"
              >
                <Container>
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">{detail.ctaTitle}</h2>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">{detail.ctaSubtitle}</p>
                    <Button size="lg" className="bg-[#E30613] hover:bg-[#C10511]" onClick={() => openCTA(currentProduct.slug)}>
                      {ctaLabel(currentProduct.slug, 'Entrar em contato')}
                    </Button>
                  </div>
                </Container>
              </section>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <PreWhatsAppModal
        lang={lang}
        open={whatsappModalOpen}
        onClose={() => { setWhatsappModalOpen(false); setActiveCTAConfig(null) }}
        rdFormUrl={activeCTAConfig?.rdFormUrl}
      />
      <ScrollToTop showThreshold={200} />
    </>
  )
}
