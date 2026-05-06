import { Lang } from "../lib/i18n"

export interface Metric {
  id: string
  value: string
  label: Record<Lang, string>
  icon: string
}

export const metrics: Metric[] = [
  {
    id: "1",
    value: "500+",
    label: {
      pt: "Projetos Entregues",
      es: "Proyectos Entregados",
      en: "Projects Delivered",
      fr: "Projets Livrés",
    },
    icon: "CheckCircle",
  },
  {
    id: "2",
    value: "25+",
    label: {
      pt: "Anos de Experiência",
      es: "Años de Experiencia",
      en: "Years of Experience",
      fr: "Années d'Expérience",
    },
    icon: "Award",
  },
  {
    id: "3",
    value: "98%",
    label: {
      pt: "Satisfação do Cliente",
      es: "Satisfacción del Cliente",
      en: "Client Satisfaction",
      fr: "Satisfaction Client",
    },
    icon: "Star",
  },
  {
    id: "4",
    value: "150+",
    label: {
      pt: "Clientes Ativos",
      es: "Clientes Activos",
      en: "Active Clients",
      fr: "Clients Actifs",
    },
    icon: "Users",
  },
]
