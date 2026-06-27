import { Lang } from "../lib/i18n"

export interface Product {
  id: string
  slug: string
  name: Record<Lang, string>
  category: string
  shortDescription: Record<Lang, string>
  description: Record<Lang, string>
  features: Record<Lang, string[]>
  applications: Record<Lang, string[]>
  image: string
  brochureUrl?: string
}

export const products: Product[] = [
  {
    id: "1",
    slug: "sansys-pay",
    name: {
      pt: "Sansys Pay",
      es: "Sansys Pay",
      en: "Sansys Pay",
      fr: "Sansys Pay",
    },
    category: "Gestão de Pagamentos",
    shortDescription: {
      pt: "Sistema completo de gestão de faturas e pagamentos para serviços de saneamento",
      es: "Sistema completo de gestión de facturas y pagos para servicios de saneamiento",
      en: "Complete billing and payment management system for sanitation services",
      fr: "Système complet de gestion de facturation et paiements pour services d'assainissement",
    },
    description: {
      pt: "O Sansys Pay é uma solução robusta para gestão de faturas, cobranças e recebimentos de serviços de saneamento. Oferece múltiplos canais de pagamento, controle de inadimplência e integração com sistemas bancários, proporcionando eficiência operacional e redução de custos administrativos.",
      es: "Sansys Pay es una solución robusta para la gestión de facturas, cobros y recaudación de servicios de saneamiento. Ofrece múltiples canales de pago, control de morosidad e integración con sistemas bancarios, proporcionando eficiencia operacional y reducción de costos administrativos.",
      en: "Sansys Pay is a robust solution for billing, collection and payment management for sanitation services. It offers multiple payment channels, delinquency control and integration with banking systems, providing operational efficiency and reduced administrative costs.",
      fr: "Sansys Pay est une solution robuste pour la gestion de facturation, recouvrement et paiements des services d'assainissement. Il offre plusieurs canaux de paiement, contrôle des impayés et intégration avec les systèmes bancaires, assurant efficacité opérationnelle et réduction des coûts administratifs.",
    },
    features: {
      pt: [
        "Emissão automática de faturas",
        "Múltiplos canais de pagamento (PIX, boleto, cartão)",
        "Controle de inadimplência e negociação",
        "Integração bancária e conciliação automática",
        "Portal do cliente para autoatendimento",
        "Relatórios financeiros e análise de recebimentos",
      ],
      es: [
        "Emisión automática de facturas",
        "Múltiples canales de pago (PIX, boleto, tarjeta)",
        "Control de morosidad y negociación",
        "Integración bancaria y conciliación automática",
        "Portal del cliente para autoservicio",
        "Informes financieros y análisis de recaudaciones",
      ],
      en: [
        "Automatic invoice generation",
        "Multiple payment channels (PIX, bank slip, card)",
        "Delinquency control and negotiation",
        "Banking integration and automatic reconciliation",
        "Customer self-service portal",
        "Financial reports and revenue analysis",
      ],
      fr: [
        "Émission automatique de factures",
        "Multiples canaux de paiement (PIX, bordereau, carte)",
        "Contrôle des impayés et négociation",
        "Intégration bancaire et rapprochement automatique",
        "Portail client pour libre-service",
        "Rapports financiers et analyse des recettes",
      ],
    },
    applications: {
      pt: ["Companhias de saneamento", "Concessionárias de água", "Serviços municipais", "Operadores privados"],
      es: ["Compañías de saneamiento", "Concesionarias de agua", "Servicios municipales", "Operadores privados"],
      en: ["Sanitation companies", "Water utilities", "Municipal services", "Private operators"],
      fr: ["Compagnies d'assainissement", "Services des eaux", "Services municipaux", "Opérateurs privés"],
    },
    image: "https://conteudo.sansys.app/site/img/sansys-pay-interface-pagamentos-servicos-faturamento-saneamento.webp",
  },
  {
    id: "2",
    slug: "sansys-agency",
    name: {
      pt: "Sansys Agency",
      es: "Sansys Agency",
      en: "Sansys Agency",
      fr: "Sansys Agency",
    },
    category: "Atendimento ao Cliente",
    shortDescription: {
      pt: "Plataforma integrada para gestão de atendimento e relacionamento com clientes",
      es: "Plataforma integrada para gestión de atención y relación con clientes",
      en: "Integrated platform for customer service and relationship management",
      fr: "Plateforme intégrée pour gestion du service client et relations",
    },
    description: {
      pt: "O Sansys Agency centraliza todos os canais de atendimento ao cliente em uma única plataforma. Gerencia solicitações, ordens de serviço, reclamações e histórico de interações, proporcionando atendimento de excelência e agilidade na resolução de demandas.",
      es: "Sansys Agency centraliza todos los canales de atención al cliente en una única plataforma. Gestiona solicitudes, órdenes de servicio, reclamos e historial de interacciones, proporcionando atención de excelencia y agilidad en la resolución de demandas.",
      en: "Sansys Agency centralizes all customer service channels in a single platform. It manages requests, service orders, complaints and interaction history, providing excellence in service and agility in demand resolution.",
      fr: "Sansys Agency centralise tous les canaux de service client sur une plateforme unique. Il gère les demandes, ordres de service, réclamations et historique d'interactions, offrant un service d'excellence et agilité dans la résolution des demandes.",
    },
    features: {
      pt: [
        "Atendimento multicanal (presencial, telefone, chat, e-mail)",
        "Gestão de solicitações e ordens de serviço",
        "Sistema de protocolo e acompanhamento",
        "Histórico completo de interações",
        "Dashboard de performance e SLA",
        "Integração com WhatsApp e redes sociais",
      ],
      es: [
        "Atención multicanal (presencial, teléfono, chat, email)",
        "Gestión de solicitudes y órdenes de servicio",
        "Sistema de protocolo y seguimiento",
        "Historial completo de interacciones",
        "Dashboard de rendimiento y SLA",
        "Integración con WhatsApp y redes sociales",
      ],
      en: [
        "Multi-channel service (in-person, phone, chat, email)",
        "Request and service order management",
        "Protocol and tracking system",
        "Complete interaction history",
        "Performance and SLA dashboard",
        "WhatsApp and social media integration",
      ],
      fr: [
        "Service multicanal (présentiel, téléphone, chat, email)",
        "Gestion des demandes et ordres de service",
        "Système de protocole et suivi",
        "Historique complet des interactions",
        "Tableau de bord de performance et SLA",
        "Intégration WhatsApp et réseaux sociaux",
      ],
    },
    applications: {
      pt: ["Centrais de atendimento", "Ouvidoria", "SAC", "Agências físicas e virtuais"],
      es: ["Centrales de atención", "Defensoría del pueblo", "SAC", "Agencias físicas y virtuales"],
      en: ["Contact centers", "Ombudsman", "Customer service", "Physical and virtual agencies"],
      fr: ["Centres d'appels", "Médiateur", "Service client", "Agences physiques et virtuelles"],
    },
    image: "https://conteudo.sansys.app/site/img/sansys-agency-interface-atendimento-gestao-servicos-saneamento.webp",
  },
  {
    id: "3",
    slug: "sansys-flow",
    name: {
      pt: "Sansys Flow",
      es: "Sansys Flow",
      en: "Sansys Flow",
      fr: "Sansys Flow",
    },
    category: "Telemetria e Medição",
    shortDescription: {
      pt: "Sistema de medição inteligente e telemetria para gestão eficiente do consumo",
      es: "Sistema de medición inteligente y telemetría para gestión eficiente del consumo",
      en: "Smart metering and telemetry system for efficient consumption management",
      fr: "Système de comptage intelligent et télémétrie pour gestion efficace de la consommation",
    },
    description: {
      pt: "O Sansys Flow revoluciona a medição de água com tecnologia de telemetria avançada. Permite leitura remota em tempo real, detecção de vazamentos, análise de padrões de consumo e faturamento preciso, reduzindo perdas e otimizando a gestão hídrica.",
      es: "Sansys Flow revoluciona la medición de agua con tecnología de telemetría avanzada. Permite lectura remota en tiempo real, detección de fugas, análisis de patrones de consumo y facturación precisa, reduciendo pérdidas y optimizando la gestión hídrica.",
      en: "Sansys Flow revolutionizes water metering with advanced telemetry technology. It enables real-time remote reading, leak detection, consumption pattern analysis and accurate billing, reducing losses and optimizing water management.",
      fr: "Sansys Flow révolutionne le comptage d'eau avec technologie de télémétrie avancée. Il permet la lecture à distance en temps réel, détection de fuites, analyse des habitudes de consommation et facturation précise, réduisant les pertes et optimisant la gestion hydrique.",
    },
    features: {
      pt: [
        "Leitura automática e remota em tempo real",
        "Detecção de vazamentos e fraudes",
        "Análise de padrões de consumo",
        "Alertas de consumo anormal",
        "Integração com sistema de faturamento",
        "Dashboard de monitoramento e analytics",
      ],
      es: [
        "Lectura automática y remota en tiempo real",
        "Detección de fugas y fraudes",
        "Análisis de patrones de consumo",
        "Alertas de consumo anormal",
        "Integración con sistema de facturación",
        "Dashboard de monitoreo y analytics",
      ],
      en: [
        "Automatic real-time remote reading",
        "Leak and fraud detection",
        "Consumption pattern analysis",
        "Abnormal consumption alerts",
        "Billing system integration",
        "Monitoring and analytics dashboard",
      ],
      fr: [
        "Lecture automatique et à distance en temps réel",
        "Détection de fuites et fraudes",
        "Analyse des modèles de consommation",
        "Alertes de consommation anormale",
        "Intégration avec système de facturation",
        "Tableau de bord de surveillance et analytics",
      ],
    },
    applications: {
      pt: ["Redes de abastecimento", "Medição residencial e comercial", "Gestão de perdas", "Smart cities"],
      es: ["Redes de abastecimiento", "Medición residencial y comercial", "Gestión de pérdidas", "Ciudades inteligentes"],
      en: ["Water supply networks", "Residential and commercial metering", "Loss management", "Smart cities"],
      fr: ["Réseaux d'approvisionnement", "Comptage résidentiel et commercial", "Gestion des pertes", "Villes intelligentes"],
    },
    image: "https://conteudo.sansys.app/site/img/sansys-reader-interface-leitura-medicao-coleta-dados-campo.webp",
  },
  {
    id: "5",
    slug: "sansys-water",
    name: {
      pt: "Sansys Water",
      es: "Sansys Water",
      en: "Sansys Water",
      fr: "Sansys Water",
    },
    category: "Gestão de Água e Esgoto",
    shortDescription: {
      pt: "Sistema integrado para gestão operacional de água e esgoto",
      es: "Sistema integrado para gestión operacional de agua y alcantarillado",
      en: "Integrated system for water and sewage operational management",
      fr: "Système intégré pour gestion opérationnelle de l'eau et assainissement",
    },
    description: {
      pt: "O Sansys Water é uma solução completa para gestão operacional de sistemas de abastecimento de água e coleta de esgoto. Integra monitoramento de redes, controle de qualidade, manutenção preventiva e gestão de ativos, garantindo eficiência operacional e conformidade regulatória.",
      es: "Sansys Water es una solución completa para gestión operacional de sistemas de abastecimiento de agua y recolección de alcantarillado. Integra monitoreo de redes, control de calidad, mantenimiento preventivo y gestión de activos, garantizando eficiencia operacional y conformidad regulatoria.",
      en: "Sansys Water is a complete solution for operational management of water supply and sewage collection systems. It integrates network monitoring, quality control, preventive maintenance and asset management, ensuring operational efficiency and regulatory compliance.",
      fr: "Sansys Water est une solution complète pour la gestion opérationnelle des systèmes d'approvisionnement en eau et collecte des eaux usées. Il intègre surveillance de réseaux, contrôle qualité, maintenance préventive et gestion d'actifs, garantissant efficacité opérationnelle et conformité réglementaire.",
    },
    features: {
      pt: [
        "Monitoramento em tempo real de redes",
        "Controle de qualidade da água",
        "Gestão de manutenção preventiva e corretiva",
        "Controle de pressão e vazão",
        "Gestão de ativos e infraestrutura",
        "Relatórios regulatórios e indicadores de performance",
      ],
      es: [
        "Monitoreo en tiempo real de redes",
        "Control de calidad del agua",
        "Gestión de mantenimiento preventivo y correctivo",
        "Control de presión y caudal",
        "Gestión de activos e infraestructura",
        "Informes regulatorios e indicadores de rendimiento",
      ],
      en: [
        "Real-time network monitoring",
        "Water quality control",
        "Preventive and corrective maintenance management",
        "Pressure and flow control",
        "Asset and infrastructure management",
        "Regulatory reports and performance indicators",
      ],
      fr: [
        "Surveillance en temps réel des réseaux",
        "Contrôle de qualité de l'eau",
        "Gestion de maintenance préventive et corrective",
        "Contrôle de pression et débit",
        "Gestion d'actifs et infrastructure",
        "Rapports réglementaires et indicateurs de performance",
      ],
    },
    applications: {
      pt: ["Estações de tratamento", "Redes de distribuição", "Sistemas de esgoto", "Gestão operacional"],
      es: ["Estaciones de tratamiento", "Redes de distribución", "Sistemas de alcantarillado", "Gestión operacional"],
      en: ["Treatment plants", "Distribution networks", "Sewage systems", "Operational management"],
      fr: ["Stations de traitement", "Réseaux de distribution", "Systèmes d'égouts", "Gestion opérationnelle"],
    },
    image: "https://conteudo.sansys.app/site/img/sansys-water-interface-gestao-comercial-operacional-saneamento.webp",
  },
  {
    id: "6",
    slug: "sansys-waste",
    name: {
      pt: "Sansys Waste",
      es: "Sansys Waste",
      en: "Sansys Waste",
      fr: "Sansys Waste",
    },
    category: "Gestão de Resíduos",
    shortDescription: {
      pt: "Plataforma para gestão inteligente de coleta e destinação de resíduos sólidos",
      es: "Plataforma para gestión inteligente de recolección y disposición de residuos sólidos",
      en: "Platform for intelligent solid waste collection and disposal management",
      fr: "Plateforme pour gestion intelligente de collecte et élimination des déchets solides",
    },
    description: {
      pt: "O Sansys Waste otimiza a gestão de resíduos sólidos com roteirização inteligente, rastreamento de frotas, controle de pesagem e destinação final. Proporciona redução de custos operacionais, aumento de eficiência e conformidade ambiental.",
      es: "Sansys Waste optimiza la gestión de residuos sólidos con ruteo inteligente, rastreo de flotas, control de pesaje y destino final. Proporciona reducción de costos operacionales, aumento de eficiencia y conformidad ambiental.",
      en: "Sansys Waste optimizes solid waste management with intelligent routing, fleet tracking, weighing control and final disposal. It provides operational cost reduction, increased efficiency and environmental compliance.",
      fr: "Sansys Waste optimise la gestion des déchets solides avec routage intelligent, suivi de flotte, contrôle de pesée et élimination finale. Il assure réduction des coûts opérationnels, augmentation d'efficacité et conformité environnementale.",
    },
    features: {
      pt: [
        "Roteirização inteligente de coleta",
        "Rastreamento GPS de veículos",
        "Controle de pesagem e volumes",
        "Gestão de aterros e destinação",
        "Indicadores de sustentabilidade",
        "App para coletores e cidadãos",
      ],
      es: [
        "Ruteo inteligente de recolección",
        "Rastreo GPS de vehículos",
        "Control de pesaje y volúmenes",
        "Gestión de vertederos y destino",
        "Indicadores de sostenibilidad",
        "App para recolectores y ciudadanos",
      ],
      en: [
        "Intelligent collection routing",
        "GPS vehicle tracking",
        "Weight and volume control",
        "Landfill and disposal management",
        "Sustainability indicators",
        "App for collectors and citizens",
      ],
      fr: [
        "Routage intelligent de collecte",
        "Suivi GPS des véhicules",
        "Contrôle de poids et volumes",
        "Gestion de décharges et élimination",
        "Indicateurs de durabilité",
        "App pour collecteurs et citoyens",
      ],
    },
    applications: {
      pt: ["Coleta urbana", "Aterros sanitários", "Reciclagem", "Limpeza pública"],
      es: ["Recolección urbana", "Rellenos sanitarios", "Reciclaje", "Limpieza pública"],
      en: ["Urban collection", "Sanitary landfills", "Recycling", "Public cleaning"],
      fr: ["Collecte urbaine", "Décharges sanitaires", "Recyclage", "Nettoyage public"],
    },
    image: "https://conteudo.sansys.app/site/img/sansys-waste-interface-gestao-residuos-operacoes-limpeza-urbana.webp",
  },
  {
    id: "7",
    slug: "sansys-reader",
    name: {
      pt: "Sansys Reader",
      es: "Sansys Reader",
      en: "Sansys Reader",
      fr: "Sansys Reader",
    },
    category: "Leitura de Hidrômetros",
    shortDescription: {
      pt: "Aplicativo mobile para leitura e gestão de hidrômetros em campo",
      es: "Aplicación móvil para lectura y gestión de hidrómetros en campo",
      en: "Mobile app for water meter reading and field management",
      fr: "Application mobile pour lecture et gestion de compteurs d'eau sur terrain",
    },
    description: {
      pt: "O Sansys Reader moderniza o processo de leitura de hidrômetros com aplicativo mobile intuitivo. Oferece captura por foto/OCR, rotas otimizadas, mode offline, validação inteligente e sincronização automática, aumentando produtividade e precisão.",
      es: "Sansys Reader moderniza el proceso de lectura de hidrómetros con aplicación móvil intuitiva. Ofrece captura por foto/OCR, rutas optimizadas, modo offline, validación inteligente y sincronización automática, aumentando productividad y precisión.",
      en: "Sansys Reader modernizes the water meter reading process with an intuitive mobile app. It offers photo/OCR capture, optimized routes, offline mode, intelligent validation and automatic synchronization, increasing productivity and accuracy.",
      fr: "Sansys Reader modernise le processus de lecture de compteurs avec application mobile intuitive. Il offre capture par photo/OCR, routes optimisées, mode hors ligne, validation intelligente et synchronisation automatique, augmentant productivité et précision.",
    },
    features: {
      pt: [
        "Captura de leitura por foto com OCR",
        "Rotas otimizadas para leituristas",
        "Modo offline com sincronização automática",
        "Validação inteligente de leituras",
        "Registro de ocorrências em campo",
        "Dashboard de produtividade",
      ],
      es: [
        "Captura de lectura por foto con OCR",
        "Rutas optimizadas para lectores",
        "Modo offline con sincronización automática",
        "Validación inteligente de lecturas",
        "Registro de ocurrencias en campo",
        "Dashboard de productividad",
      ],
      en: [
        "Photo reading capture with OCR",
        "Optimized routes for readers",
        "Offline mode with automatic sync",
        "Intelligent reading validation",
        "Field occurrence registration",
        "Productivity dashboard",
      ],
      fr: [
        "Capture de lecture par photo avec OCR",
        "Routes optimisées pour lecteurs",
        "Mode hors ligne avec synchro automatique",
        "Validation intelligente des lectures",
        "Enregistrement d'incidents sur terrain",
        "Tableau de bord de productivité",
      ],
    },
    applications: {
      pt: ["Leitura residencial", "Leitura comercial", "Gestão de rotas", "Produtividade de campo"],
      es: ["Lectura residencial", "Lectura comercial", "Gestión de rutas", "Productividad de campo"],
      en: ["Residential reading", "Commercial reading", "Route management", "Field productivity"],
      fr: ["Lecture résidentielle", "Lecture commerciale", "Gestion de routes", "Productivité sur terrain"],
    },
    image: "https://conteudo.sansys.app/site/img/sansys-flow-interface-automacao-processos-workflow-saneamento.webp",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}