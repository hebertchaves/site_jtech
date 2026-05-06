import { Lang } from "../lib/i18n"

export interface Ebook {
  id: string
  slug: string
  title: Record<Lang, string>
  description: Record<Lang, string>
  content: Record<Lang, string>
  category: string
  pages: number
  image: string // Legacy field - fallback para thumbnailImage
  thumbnailImage?: string // Imagem para cards/listagens
  heroImage?: string // Imagem para página de detalhes (hero/apresentação)
  downloadUrl?: string
}

export const ebooks: Ebook[] = [
  {
    id: "1",
    slug: "guia-completo-automacao-industrial",
    title: {
      pt: "Guia Completo de Automação Industrial",
      es: "Guía Completa de Automatización Industrial",
      en: "Complete Guide to Industrial Automation",
      fr: "Guide Complet de l'Automatisation Industrielle",
    },
    description: {
      pt: "Um guia abrangente sobre automação industrial, desde conceitos básicos até implementações avançadas.",
      es: "Una guía completa sobre automatização industrial, desde conceptos básicos até implementações avanzadas.",
      en: "A comprehensive guide to industrial automation, from basic concepts to advanced implementations.",
      fr: "Un guide complet sur l'automatisation industrielle, des concepts de base aux implémentations avancées.",
    },
    content: {
      pt: "Este e-book oferece uma visão completa sobre automação industrial, cobrindo tecnologias, metodologias e casos de uso práticos que podem transformar sua operação.",
      es: "Este e-book oferece uma visão completa sobre automatização industrial, cubriendo tecnologias, metodologias e casos de uso prácticos que podem transformar su operación.",
      en: "This e-book offers a complete view of industrial automation, covering technologies, methodologies and practical use cases that can transform your operation.",
      fr: "Cet e-book offre une vue complète de l'automatisation industrielle, couvrant les technologies, méthodologies et cas d'usage pratiques qui peuvent transformer votre opération.",
    },
    category: "Automação",
    pages: 45,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800",
    thumbnailImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200",
    heroImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200",
  },
  {
    id: "2",
    slug: "iot-industrial-pratico",
    title: {
      pt: "IoT Industrial na Prática",
      es: "IoT Industrial en la Práctica",
      en: "Industrial IoT in Practice",
      fr: "IoT Industriel en Pratique",
    },
    description: {
      pt: "Aprenda a implementar soluções IoT em ambientes industriais com casos reais e melhores práticas.",
      es: "Aprenda a implementar soluções IoT em ambientes industriais com casos reais e melhores práticas.",
      en: "Learn to implement IoT solutions in industrial environments with real cases and best practices.",
      fr: "Apprenez à implémenter des solutions IoT dans des environnements industriels avec des cas réels et les meilleures pratiques.",
    },
    content: {
      pt: "Descubra como implementar IoT industrial de forma eficaz, com exemplos práticos, arquiteturas de referência e lições aprendidas de projetos reais.",
      es: "Descubra cómo implementar IoT industrial de forma eficaz, com ejemplos prácticos, arquiteturas de referencia e leções aprendidas de projetos reais.",
      en: "Discover how to effectively implement industrial IoT, with practical examples, reference architectures and lessons learned from real projects.",
      fr: "Découvrez comment mettre en œuvre efficacement l'IoT industriel, avec des exemples pratiques, des architectures de référence et des leçons tirées de projets réels.",
    },
    category: "IoT",
    pages: 38,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
    thumbnailImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200",
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200",
  },
  {
    id: "3",
    slug: "seguranca-cibernetica-industrial",
    title: {
      pt: "Segurança Cibernética Industrial",
      es: "Seguridad Cibernética Industrial",
      en: "Industrial Cybersecurity",
      fr: "Cybersécurité Industrielle",
    },
    description: {
      pt: "Proteja seus sistemas industriais contra ameaças cibernéticas com estratégias e ferramentas adequadas.",
      es: "Proteja sus sistemas industriais contra amenazas cibernéticas com estrategias e herramientas adecuadas.",
      en: "Protect your industrial systems against cyber threats with appropriate strategies and tools.",
      fr: "Protégez vos systèmes industrials contre les menaces cybernétiques avec des stratégies et outils appropriés.",
    },
    content: {
      pt: "A segurança cibernética é essencial para proteger infraestruturas críticas. Este e-book apresenta as melhores práticas e ferramentas para garantir a segurança de seus sistemas.",
      es: "La seguridad cibernética es esencial para proteger infraestructuras críticas. Este e-book presenta las mejores prácticas y herramientas para garantizar la seguridad de sus sistemas.",
      en: "Cybersecurity is essential to protect critical infrastructure. This e-book presents the best practices and tools to ensure the security of your systems.",
      fr: "La cybersécurité est essentielle pour protéger les infrastructures critiques. Cet e-book présente les meilleures pratiques et outils pour garantir la sécurité de vos systèmes.",
    },
    category: "Segurança",
    pages: 52,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    thumbnailImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200",
  },
]

export function getEbookBySlug(slug: string): Ebook | undefined {
  return ebooks.find((e) => e.slug === slug)
}