import { Lang } from "../lib/i18n"

export interface Post {
  id: string
  slug: string
  title: Record<Lang, string>
  excerpt: Record<Lang, string>
  content: Record<Lang, string>
  category: string
  author: string
  publishedAt: string
  image: string
  readTime: number
}

export const posts: Post[] = [
  {
    id: "1",
    slug: "inovacao-sustentabilidade-saneamento",
    title: {
      pt: "Inovação e sustentabilidade",
      es: "Innovación y sostenibilidad",
      en: "Innovation and sustainability",
      fr: "Innovation et durabilité",
    },
    excerpt: {
      pt: "Como a tecnologia da Jtech transforma o setor de saneamento com soluções inovadoras e sustentáveis para gestão inteligente de resíduos.",
      es: "Cómo la tecnología de Jtech transforma el sector de saneamento con soluciones innovadoras y sostenibles para gestión inteligente de residuos.",
      en: "How Jtech's technology transforms the sanitation sector with innovative and sustainable solutions for intelligent waste management.",
      fr: "Comment la technologia de Jtech transforme le secteur de l'assainissement avec des solutions innovantes et durables pour la gestion intelligente des déchets.",
    },
    content: {
      pt: "A inovação e a sustentabilidade são pilares fundamentais da Jtech. Nosso compromisso é desenvolver soluções tecnológicas que não apenas otimizem a gestão de saneamento, mas também contribuam para um futuro mais sustentável. Com o Sansys Waste, oferecemos controle inteligente de resíduos que reduz desperdícios, aumenta a eficiência operacional e promove práticas ambientalmente responsáveis. A tecnologia de ponta aplicada ao saneamento básico permite que empresas e municípios alcancem metas de sustentabilidade enquanto melhoram seus indicadores de desempenho. Através de inteligência artificial, IoT e análise de dados em tempo real, transformamos desafios ambientais em oportunidades de inovação.",
      es: "La innovación y la sostenibilidad son pilares fundamentales de Jtech. Nuestro compromiso es desarrollar soluciones tecnológicas que no solo optimicen la gestión de saneamiento, sino que también contribuyan a un futuro más sostenible. Con Sansys Waste, ofrecemos control inteligente de residuos que reduce desperdicios, aumenta la eficiencia operacional y promueve prácticas ambientalmente responsables. La tecnología de punta aplicada al saneamento básico permite que empresas y municipios alcancen metas de sostenibilidad mientras mejoran sus indicadores de desempenho. A través de inteligencia artificial, IoT y análisis de datos en tiempo real, transformamos desafíos ambientales en oportunidades de innovación.",
      en: "Innovation and sustainability are fundamental pillars of Jtech. Our commitment is to develop technological solutions that not only optimize sanitation management but also contribute to a more sustainable future. With Sansys Waste, we offer intelligent waste control that reduces waste, increases operational efficiency and promotes environmentally responsible practices. Cutting-edge technology applied to basic sanitation enables companies and municipalities to achieve sustainability goals while improving their performance indicators. Through artificial intelligence, IoT and real-time data analysis, we transform environmental challenges into innovation opportunities.",
      fr: "L'innovation et la durabilité sont des piliers fondamentaux de Jtech. Notre engagement est de développer des solutions technologiques qui non seulement optimisent la gestion de l'assainissement, mais contribuent également à un avenir plus durable. Avec Sansys Waste, nous offrons un contrôle intelligent des déchets qui réduit le gaspillage, augmente l'efficacité opérationnelle et promeut des pratiques respectueuses de l'environnement. La technologie de pointe appliquée à l'assainissement de base permet aux entreprises et aux municipalités d'atteindre des objectifs de durabilité tout en améliorant leurs indicateurs de performance. Grâce à l'intelligence artificielle, l'IoT et l'analyse de données en temps réel, nous transformons les défis environnementaux en opportunités d'innovation.",
    },
    category: "Saneamento",
    author: "Equipe Jtech",
    publishedAt: "2026-03-20",
    image: "https://conteudo.sansys.app/site/img/blog-sansys-waste-controle-inteligente-residuos-sustentabilidade.webp",
    readTime: 6,
  },
  {
    id: "2",
    slug: "inteligencia-artificial-big-data-gestao-agua",
    title: {
      pt: "Artificial & Big Data",
      es: "Inteligencia Artificial & Big Data",
      en: "Artificial Intelligence & Big Data",
      fr: "Intelligence Artificielle & Big Data",
    },
    excerpt: {
      pt: "Descubra como Inteligência Artificial e Big Data revolucionam a gestão de água, trazendo previsibilidade, eficiência e controle inteligente dos recursos hídricos.",
      es: "Descubra cómo la Inteligencia Artificial y Big Data revolucionan la gestión del agua, aportando previsibilidad, eficiencia y control inteligente de los recursos hídricos.",
      en: "Discover how Artificial Intelligence and Big Data revolutionize water management, bringing predictability, efficiency and intelligent control of water resources.",
      fr: "Découvrez comment l'Intelligence Artificielle et le Big Data révolutionnent la gestion de l'eau, apportant prévisibilité, efficacité et contrôle intelligent des ressources en eau.",
    },
    content: {
      pt: "A aplicação de Inteligência Artificial e Big Data na gestão de água representa uma revolução no setor de saneamento. Com o Sansys Water, a Jtech oferece uma plataforma que integra dados de múltiplas fontes - medidores inteligentes, sensores IoT, sistemas de telemetria e registros históricos - para criar modelos preditivos avançados. Esses modelos permitem antecipar demandas de consumo, identificar padrões de uso anômalo, detectar vazamentos em tempo real e otimizar o abastecimento. A análise de grandes volumes de dados possibilita reduzir perdas de água, melhorar a eficiência da distribuição e fundamentar decisões estratégicas com base em evidências concretas. A transformação digital da gestão hídrica não é mais uma opção, mas uma necessidade para empresas que buscam excelência operacional e sustentabilidade.",
      es: "La aplicación de Inteligencia Artificial y Big Data en la gestión del agua representa una revolução en el sector de saneamiento. Con Sansys Water, Jtech ofrece una plataforma que integra datos de múltiples fuentes - medidores inteligentes, sensores IoT, sistemas de telemetría y registros históricos - para crear modelos predictivos avanzados. Estos modelos permiten anticipar demandas de consumo, identificar patrones de uso anómalo, detectar fugas en tiempo real y optimizar el abastecimiento. El análisis de grandes volúmenes de datos posibilita reducir pérdidas de agua, mejorar la eficiencia de la distribución y fundamentar decisiones estratégicas con base en evidencias concretas. La transformación digital de la gestión hídrica no es más una opción, sino una necesidad para empresas que buscan excelencia operacional y sostenibilidad.",
      en: "The application of Artificial Intelligence and Big Data in water management represents a revolution in the sanitation sector. With Sansys Water, Jtech offers a platform that integrates data from multiple sources - smart meters, IoT sensors, telemetry systems and historical records - to create advanced predictive models. These models allow anticipating consumption demands, identifying anomalous usage patterns, detecting leaks in real-time and optimizing supply. The analysis of large data volumes enables reducing water losses, improving distribution efficiency and grounding strategic decisions on concrete evidence. The digital transformation of water management is no longer an option, but a necessity for companies seeking operational excellence and sustainability.",
      fr: "L'application de l'Intelligence Artificielle et du Big Data dans la gestion de l'eau représente une révolution dans le secteur de l'assainissement. Avec Sansys Water, Jtech offre une plateforme qui intègre des données de multiples sources - compteurs intelligents, capteurs IoT, systèmes de télémétrie et registres historiques - pour créer des modèles prédictifs avancés. Ces modèles permettent d'anticiper les demandes de consommation, d'identifier les schémas d'utilisation anormaux, de détecter les fuites en temps réel et d'optimiser l'approvisionnement. L'analyse de grands volumes de données permet de réduire les pertes d'eau, d'améliorer l'efficacité de la distribution et de fonder les décisions stratégiques sur des preuves concrètes. La transformation numérique de la gestion de l'eau n'est plus une option, mais une nécessité pour les entreprises recherchant l'excellence opérationnelle et la durabilité.",
    },
    category: "Tecnologia",
    author: "Equipe Jtech",
    publishedAt: "2026-03-22",
    image: "https://conteudo.sansys.app/site/img/blog-sansys-water-inteligencia-artificial-big-data-gestao-agua.webp",
    readTime: 7,
  },
  {
    id: "3",
    slug: "gestao-agua-inovacao-crise-hidrica",
    title: {
      pt: "Gestão de Água",
      es: "Gestión del Agua",
      en: "Water Management",
      fr: "Gestion de l'Eau",
    },
    excerpt: {
      pt: "Como enfrentar a crise hídrica com gestão inteligente de água: inovação, tecnologia e práticas sustentáveis para garantir o futuro dos recursos hídricos.",
      es: "Cómo enfrentar la crisis hídrica con gestión inteligente del agua: innovación, tecnología y prácticas sostenibles para garantizar el futuro de los recursos hídricos.",
      en: "How to face the water crisis with intelligent water management: innovation, technology and sustainable practices to ensure the future of water resources.",
      fr: "Comment faire face à la crise de l'eau avec une gestion intelligente: innovation, technologie et pratiques durables pour garantir l'avenir des ressources en eau.",
    },
    content: {
      pt: "A gestão eficiente da água tornou-se uma das prioridades mais críticas do século XXI, especialmente diante dos desafios impostos pelas mudanças climáticas e pelo crescimento populacional. A Jtech desenvolveu o Sansys Water como resposta a essa necessidade urgente, oferecendo uma plataforma completa para gestão comercial e operacional dos recursos hídricos. O sistema integra medição inteligente, controle de perdas, gestão de cadastro comercial, faturamento, análise de demanda e planejamento de investimentos. Através de tecnologia de ponta, empresas de saneamento conseguem monitorar toda a cadeia de abastecimento - desde a captação até a distribuição final - identificando ineficiências, reduzindo desperdícios e garantindo a sustentabilidade hídrica. A inovação na gestão de água não é apenas uma questão operacional, mas um compromisso com as futuras gerações e com a preservação do meio ambiente.",
      es: "La gestión eficiente del agua se ha convertido en una de las prioridades más críticas del siglo XXI, especialmente ante los desafíos impuestos por los cambios climáticos y el crecimiento poblacional. Jtech desarrolló Sansys Water como respuesta a esta necesidad urgente, ofreciendo una plataforma completa para gestión comercial y operacional de los recursos hídricos. El sistema integra medición inteligente, control de pérdidas, gestión de registro comercial, facturación, análisis de demanda y planificación de inversiones. A través de tecnología de punta, empresas de saneamento consiguen monitorear toda la cadena de abastecimiento - desde la captación hasta la distribución final - identificando ineficiencias, reduciendo desperdicios y garantizando la sostenibilidad hídrica. La innovación en la gestión del agua no es solo una cuestión operacional, sino un compromiso con las futuras generaciones y con la preservación del medio ambiente.",
      en: "Efficient water management has become one of the most critical priorities of the 21st century, especially in the face of challenges posed by climate change and population growth. Jtech developed Sansys Water as a response to this urgent need, offering a complete platform for commercial and operational management of water resources. The system integrates smart metering, loss control, commercial registration management, billing, demand analysis and investment planning. Through cutting-edge technology, sanitation companies can monitor the entire supply chain - from catchment to final distribution - identifying inefficiencies, reducing waste and ensuring water sustainability. Innovation in water management is not just an operational issue, but a commitment to future generations and environmental preservation.",
      fr: "La gestion efficace de l'eau est devenue l'une des priorités les plus critiques du 21e siècle, en particulier face aux défis posés par le changement climatique et la croissance démographique. Jtech a développé Sansys Water en réponse à ce besoin urgent, offrant une plateforme complète pour la gestion commerciale et opérationnelle des ressources en eau. Le système intègre le comptage intelligent, le contrôle des pertes, la gestion de l'enregistrement commercial, la facturation, l'analyse de la demande et la planification des investissements. Grâce à une technologie de pointe, les entreprises d'assainissement peuvent surveiller toute la chaîne d'approvisionnement - de la captation à la distribution finale - identifiant les inefficacités, réduisant le gaspillage et garantissant la durabilité de l'eau. L'innovation dans la gestion de l'eau n'est pas seulement une question opérationnelle, mais un engagement envers les générations futures et la préservation de l'environnement.",
    },
    category: "Saneamento",
    author: "Equipe Jtech",
    publishedAt: "2026-03-24",
    image: "https://conteudo.sansys.app/site/img/blog-sansys-water-gestao-agua-inovacao-crise-hidrica.webp",
    readTime: 8,
  },
  {
    id: "4",
    slug: "automacao-industrial-tendencias-2026",
    title: {
      pt: "Automação Industrial: Tendências para 2026",
      es: "Automatização Industrial: Tendencias para 2026",
      en: "Industrial Automation: Trends for 2026",
      fr: "Automatisation Industrielle: Tendances pour 2026",
    },
    excerpt: {
      pt: "Descubra as principais tendências que estão moldando o futuro da automação industrial e como sua empresa pode se preparar.",
      es: "Descubra las principales tendencias que están moldeando el futuro de la automatización industrial y cómo su empresa puede prepararse.",
      en: "Discover the main trends shaping the future of industrial automation and how your company can prepare.",
      fr: "Découvrez les principales tendances qui façonnent l'avenir de l'automatisation industrielle et comment votre entreprise peut se préparer.",
    },
    content: {
      pt: "A automação industrial está passando por uma transformação significativa, impulsionada por avanços tecnológicos e novas demandas de mercado. Neste artigo, exploramos as principais tendências que definirão o setor em 2026.",
      es: "La automatización industrial está experimentando uma transformação significativa, impulsada por avances tecnológicos y nuevas demandas del mercado. En este artículo, exploramos las principales tendencias que definirán el sector en 2026.",
      en: "Industrial automation is undergoing a significant transformation, driven by technological advances and new market demands. In this article, we explore the main trends that will define the sector in 2026.",
      fr: "L'automatisation industrielle subit une transformation significative, portée par les avancées technologiques et les nouvelles demandes du marché. Dans cet article, nous explorons les principales tendances qui définiront le secteur en 2026.",
    },
    category: "Tecnologia",
    author: "João Silva",
    publishedAt: "2026-01-15",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    readTime: 5,
  },
  {
    id: "5",
    slug: "industria-40-transformacao-digital",
    title: {
      pt: "Indústria 4.0 e a Transformação Digital",
      es: "Industria 4.0 y la Transformación Digital",
      en: "Industry 4.0 and Digital Transformation",
      fr: "Industrie 4.0 et Transformation Numérique",
    },
    excerpt: {
      pt: "Entenda como a Indústria 4.0 está revolucionando processos produtivos e criando novas oportunidades de negócio.",
      es: "Comprenda cómo la Industria 4.0 está revolucionando los procesos productivos y creando nuevas oportunidades de negocio.",
      en: "Understand how Industry 4.0 is revolutionizing production processes and creating new business opportunities.",
      fr: "Comprenez comment l'Industrie 4.0 révolutionne les processus de production et crée de nouvelles opportunités commerciales.",
    },
    content: {
      pt: "A Indústria 4.0 representa uma nova era na manufatura, combinando tecnologias digitais, automação e análise de dados para criar fábricas inteligentes e processos mais eficientes.",
      es: "La Industria 4.0 representa una nueva era en la manufactura, combinando tecnologías digitales, automatización y análisis de datos para crear fábricas inteligentes y procesos más eficientes.",
      en: "Industry 4.0 represents a new era in manufacturing, combining digital technologies, automation and data analysis to create smart factories and more efficient processes.",
      fr: "L'Industrie 4.0 représente une nouvelle ère dans la fabrication, combinant technologies numériques, automatisation et analyse de données pour créer des usines intelligentes et des processus plus efficaces.",
    },
    category: "Tecnologia",
    author: "Maria Santos",
    publishedAt: "2026-02-01",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    readTime: 7,
  },
  {
    id: "6",
    slug: "manutencao-preditiva-iot",
    title: {
      pt: "Manutenção Preditiva com IoT: Reduzindo Custos",
      es: "Mantenimiento Predictivo con IoT: Reduciendo Costos",
      en: "Predictive Maintenance with IoT: Reducing Costs",
      fr: "Maintenance Prédictive avec IoT: Réduire les Coûts",
    },
    excerpt: {
      pt: "Saiba como a manutenção preditiva baseada em IoT pode reduzir custos operacionais e aumentar a disponibilidade de equipamentos.",
      es: "Sepa cómo el mantenimiento predictivo basado en IoT puede reducir costos operacionales y aumentar la disponibilidad de equipos.",
      en: "Learn how IoT-based predictive maintenance can reduce operational costs and increase equipment availability.",
      fr: "Découvrez comment la maintenance prédictive basée sur l'IoT peut réduire les coûts opérationnels et augmenter la disponibilité des équipements.",
    },
    content: {
      pt: "A manutenção preditiva utiliza sensores IoT e análise de dados para prever falhas antes que elas ocorram, permitindo intervenções planejadas e reduzindo paradas não programadas.",
      es: "El mantenimiento predictivo utiliza sensores IoT y análisis de datos para predecir fallas antes de que ocurran, permitiendo intervenciones planificadas y reduciendo paradas no programadas.",
      en: "Predictive maintenance uses IoT sensors and data analysis to predict failures before they occur, allowing planned interventions and reducing unplanned downtime.",
      fr: "La maintenance prédictive utilise des capteurs IoT et l'analyse de données pour prédire les pannes avant qu'elles ne surviennent, permettant des interventions planifiées et réduisant les temps d'arrêt non planifiés.",
    },
    category: "Saneamento",
    author: "Carlos Oliveira",
    publishedAt: "2026-02-10",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    readTime: 6,
  },
  {
    id: "7",
    slug: "jtech-lanca-design-system-sansys",
    title: {
      pt: "Jtech lança o DSS - Design System Sansys",
      es: "Jtech lanza el DSS - Design System Sansys",
      en: "Jtech launches DSS - Design System Sansys",
      fr: "Jtech lance le DSS - Design System Sansys",
    },
    excerpt: {
      pt: "Conheça o novo Design System Sansys, uma solução completa para padronização e escalabilidade de interfaces digitais.",
      es: "Conozca el nuevo Design System Sansys, una solución completa para estandarización y escalabilidad de interfaces digitais.",
      en: "Meet the new Design System Sansys, a complete solution for standardization and scalability of digital interfaces.",
      fr: "Découvrez le nouveau Design System Sansys, une solution complète pour la standardisation et l'évolutivité des interfaces numériques.",
    },
    content: {
      pt: "O Design System Sansys (DSS) é a mais recente inovação da Jtech, oferecendo componentes reutilizáveis, tokens de design e documentação completa para acelerar o desenvolvimento de produtos digitais com consistência visual e técnica.",
      es: "El Design System Sansys (DSS) es la innovación más reciente de Jtech, ofreciendo componentes reutilizables, tokens de diseño y documentación completa para acelerar el desarrollo de productos digitales con consistencia visual y técnica.",
      en: "The Design System Sansys (DSS) is Jtech's latest innovation, offering reusable components, design tokens and complete documentation to accelerate the development of digital products with visual and technical consistency.",
      fr: "Le Design System Sansys (DSS) est la dernière innovation de Jtech, offrant des composants réutilisables, des jetons de conception et une documentation complète pour accélérer le développement de produits numériques avec cohérence visuelle et technique.",
    },
    category: "Jtech",
    author: "Ana Costa",
    publishedAt: "2026-02-20",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    readTime: 4,
  },
  {
    id: "8",
    slug: "ia-transformacao-saneamento",
    title: {
      pt: "IA como ferramenta de transformação no saneamento",
      es: "IA como herramienta de transformación en saneamento",
      en: "AI as a transformation tool in sanitation",
      fr: "L'IA comme outil de transformation dans l'assainissement",
    },
    excerpt: {
      pt: "Inteligência Artificial revoluciona a gestão de recursos hídricos e tratamento de efluentes, trazendo eficiência e sustentabilidade.",
      es: "La Inteligencia Artificial revoluciona la gestión de recursos hídricos y tratamiento de efluentes, aportando eficiencia y sostenibilidad.",
      en: "Artificial Intelligence revolutionizes water resource management and effluent treatment, bringing efficiency and sustainability.",
      fr: "L'Intelligence Artificielle révolutionne la gestion des ressources en eau et le traitement des effluents, apportant efficacité et durabilité.",
    },
    content: {
      pt: "A aplicação de Inteligência Artificial no setor de saneamento básico permite otimizar processos de tratamento de água e esgoto, prever demandas, detectar vazamentos e reduzir perdas, contribuindo para uma gestão mais sustentável dos recursos hídricos.",
      es: "La aplicación de Inteligencia Artificial en el sector de saneamiento básico permite optimizar procesos de tratamiento de agua y alcantarillado, predecir demandas, detectar fugas y reducir pérdidas, contribuyendo a una gestión más sostenible de los recursos hídricos.",
      en: "The application of Artificial Intelligence in the basic sanitation sector allows optimizing water and sewage treatment processes, predicting demands, detecting leaks and reducing losses, contributing to more sustainable management of water resources.",
      fr: "L'application de l'Intelligence Artificielle dans le secteur de l'assainissement de base permet d'optimiser les processus de traitement de l'eau et des eaux usées, de prévoir les demandes, de détecter les fuites et de réduire les pertes, contribuant à une gestion plus durable des ressources en eau.",
    },
    category: "Saneamento",
    author: "Pedro Almeida",
    publishedAt: "2026-02-25",
    image: "https://images.unsplash.com/photo-1563424701-e0823e4dbf54?w=800",
    readTime: 8,
  },
  {
    id: "9",
    slug: "novidades-primeiro-semestre-2026",
    title: {
      pt: "Novidades para o 1º semestre de 2026",
      es: "Novedades para el 1er semestre de 2026",
      en: "News for the 1st half of 2026",
      fr: "Nouveautés pour le 1er semestre 2026",
    },
    excerpt: {
      pt: "Confira as principais inovações e lançamentos que a Jtech preparou para os próximos meses.",
      es: "Consulte las principales innovaciones y lanzamientos que Jtech ha preparado para los próximos meses.",
      en: "Check out the main innovations and launches that Jtech has prepared for the coming months.",
      fr: "Découvrez les principales innovations et lancements que Jtech a préparés pour les prochains mois.",
    },
    content: {
      pt: "O primeiro semestre de 2026 promete grandes avanços para a Jtech e seus clientes. Entre os destaques estão novas integrações de sistemas, expansão de soluções para cidades inteligentes, lançamento de plataforma de analytics em tempo real e parcerias estratégicas com empresas de tecnologia.",
      es: "El primer semestre de 2026 promete grandes avances para Jtech y sus clientes. Entre los aspectos destacados se encuentran nuevas integraciones de sistemas, expansión de soluções para ciudades inteligentes, lanzamiento de plataforma de analytics en tiempo real y asociaciones estratégicas con empresas de tecnología.",
      en: "The first half of 2026 promises major advances for Jtech and its clients. Highlights include new system integrations, expansion of smart city solutions, launch of real-time analytics platform and strategic partnerships with technology companies.",
      fr: "Le premier semestre 2026 promet des avancées majeures pour Jtech et ses clients. Parmi les points forts figurent de nouvelles intégrations de systèmes, l'expansion des solutions pour les villes intelligentes, le lancement d'une plateforme d'analyse en temps réel et des partenariats stratégiques avec des entreprises technologiques.",
    },
    category: "Novidades",
    author: "Equipe Jtech",
    publishedAt: "2026-03-01",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800",
    readTime: 5,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}