import { Lang } from "../lib/i18n"

export interface CoverageRegion {
  id: string
  name: Record<Lang, string>
  states: string[]
  coordinates: {
    lat: number
    lng: number
  }
}

export const coverageRegions: CoverageRegion[] = [
  {
    id: "1",
    name: {
      pt: "Sudeste",
      es: "Sureste",
      en: "Southeast",
      fr: "Sud-Est",
    },
    states: ["SP", "RJ", "MG", "ES"],
    coordinates: {
      lat: -22.9068,
      lng: -43.1729,
    },
  },
  {
    id: "2",
    name: {
      pt: "Sul",
      es: "Sur",
      en: "South",
      fr: "Sud",
    },
    states: ["PR", "SC", "RS"],
    coordinates: {
      lat: -25.4284,
      lng: -49.2733,
    },
  },
  {
    id: "3",
    name: {
      pt: "Nordeste",
      es: "Nordeste",
      en: "Northeast",
      fr: "Nord-Est",
    },
    states: ["BA", "CE", "PE", "RN", "PB", "SE", "AL", "MA", "PI"],
    coordinates: {
      lat: -12.9714,
      lng: -38.5014,
    },
  },
  {
    id: "4",
    name: {
      pt: "Centro-Oeste",
      es: "Centro-Oeste",
      en: "Midwest",
      fr: "Centre-Ouest",
    },
    states: ["GO", "DF", "MT", "MS"],
    coordinates: {
      lat: -15.7939,
      lng: -47.8828,
    },
  },
  {
    id: "5",
    name: {
      pt: "Norte",
      es: "Norte",
      en: "North",
      fr: "Nord",
    },
    states: ["AM", "PA", "AC", "RO", "RR", "AP", "TO"],
    coordinates: {
      lat: -3.1190,
      lng: -60.0217,
    },
  },
]
