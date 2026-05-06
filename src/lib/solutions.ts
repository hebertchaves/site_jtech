import { Lang } from "./i18n"
import { t } from "./i18n"

export interface Solution {
  slug: string
  name: string
  category: "product" | "module"
  icon?: string
}

export const SOLUTIONS: Solution[] = [
  { slug: "sansys-water", name: "Sansys Water", category: "product" },
  { slug: "sansys-pay", name: "Sansys Pay", category: "product" },
  { slug: "sansys-waste", name: "Sansys Waste", category: "product" },
  { slug: "sansys-agency", name: "Sansys Agency", category: "product" },
  { slug: "sansys-hub", name: "Sansys Hub", category: "product" },
  { slug: "sansys-flow", name: "Sansys Flow", category: "product" },
  { slug: "sansys-reader", name: "Sansys Reader", category: "product" },
  { slug: "sansys-gis", name: "Sansys GIS", category: "product" },
  { slug: "sansys-smart-meter", name: "Sansys Smart Meter", category: "module" },
  { slug: "sansys-omnichannel", name: "Sansys Omnichannel", category: "module" },
  { slug: "sansys-bi", name: "Sansys BI", category: "module" },
  { slug: "sansys-antifraude", name: "Sansys Antifraude", category: "module" },
  { slug: "sansys-critica-leitura", name: "Sansys Crítica de Leitura", category: "module" },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}

export function isProduct(solution: Solution): boolean {
  return solution.category === "product"
}

export function getProductsForLang(lang: Lang) {
  return [
    { name: "Sansys Pay", slug: "sansys-pay" },
    { name: "Sansys Agency", slug: "sansys-agency" },
    { name: "Sansys Flow", slug: "sansys-flow" },
    { name: "Sansys Hub", slug: "sansys-hub" },
    { name: "Sansys Water", slug: "sansys-water" },
    { name: "Sansys Waste", slug: "sansys-waste" },
    { name: "Sansys Reader", slug: "sansys-reader" },
    { name: "Sansys GIS", slug: "sansys-gis" },
  ]
}

export function getModulesForLang(lang: Lang) {
  return [
    { name: t(lang, "modules.smart_meter"), slug: "sansys-smart-meter" },
    { name: t(lang, "modules.omnichannel"), slug: "sansys-omnichannel" },
    { name: t(lang, "modules.bi"), slug: "sansys-bi" },
    { name: t(lang, "modules.antifraude"), slug: "sansys-antifraude" },
    { name: t(lang, "modules.critica_leitura"), slug: "sansys-critica-leitura" },
  ]
}
