import { Lang } from "../lib/i18n"

// Módulos principais (core) do Sansys Water — exibidos na dobra "Principais Módulos"
// (acordeão) da página de soluções. Conteúdo nos 4 idiomas do site.

export interface CoreModuleTopic {
  title: Record<Lang, string>
  description: Record<Lang, string>
}

export interface CoreModule {
  id: string
  name: Record<Lang, string>
  intro: Record<Lang, string>
  topics: CoreModuleTopic[]
}

export const waterCoreModules: CoreModule[] = [
  {
    id: "medicao",
    name: {
      pt: "Medição",
      es: "Medición",
      en: "Metering",
      fr: "Mesure",
    },
    intro: {
      pt: "Otimiza o ciclo completo, desde a geração da massa de leitura, distribuição nos coletores, até a emissão simultânea das faturas. Monitoramento em tempo real via GPS, rotas georreferenciadas e gráficos de evolução. Reduz os custos operacionais e aumenta a precisão na captura de consumo em campo.",
      es: "Optimiza el ciclo completo, desde la generación de la masa de lectura, distribución en los colectores, hasta la emisión simultánea de las facturas. Monitoreo en tiempo real vía GPS, rutas georreferenciadas y gráficos de evolución. Reduce los costos operativos y aumenta la precisión en la captura de consumo en campo.",
      en: "Optimizes the complete cycle, from generating the reading batch and distributing it among field readers to the simultaneous issuance of invoices. Real-time monitoring via GPS, georeferenced routes and evolution charts. Reduces operating costs and increases accuracy in field consumption capture.",
      fr: "Optimise le cycle complet, de la génération du lot de relevés et sa distribution aux agents de terrain jusqu'à l'émission simultanée des factures. Surveillance en temps réel via GPS, itinéraires géoréférencés et graphiques d'évolution. Réduit les coûts opérationnels et augmente la précision de la capture de consommation sur le terrain.",
    },
    topics: [
      {
        title: {
          pt: "Ciclo de leitura completo e integrado",
          es: "Ciclo de lectura completo e integrado",
          en: "Complete and integrated reading cycle",
          fr: "Cycle de relevé complet et intégré",
        },
        description: {
          pt: "Geração de massa, distribuição automática em coletores e emissão simultânea de faturas nas unidades consumidoras.",
          es: "Generación de masa, distribución automática en colectores y emisión simultánea de facturas en las unidades consumidoras.",
          en: "Batch generation, automatic distribution to field readers and simultaneous invoice issuance at consumer units.",
          fr: "Génération du lot, distribution automatique aux agents et émission simultanée des factures aux unités de consommation.",
        },
      },
      {
        title: {
          pt: "Monitoramento em tempo real",
          es: "Monitoreo en tiempo real",
          en: "Real-time monitoring",
          fr: "Surveillance en temps réel",
        },
        description: {
          pt: "Acompanhamento de rotas georreferenciadas via GPS e transmissão GPRS instantânea de dados.",
          es: "Seguimiento de rutas georreferenciadas vía GPS y transmisión GPRS instantánea de datos.",
          en: "Tracking of georeferenced routes via GPS and instant GPRS data transmission.",
          fr: "Suivi d'itinéraires géoréférencés via GPS et transmission GPRS instantanée des données.",
        },
      },
      {
        title: {
          pt: "Eficiência operacional",
          es: "Eficiencia operativa",
          en: "Operational efficiency",
          fr: "Efficacité opérationnelle",
        },
        description: {
          pt: "Geração de massa de leitura, distribuição automática e emissão simultânea de faturas.",
          es: "Generación de masa de lectura, distribución automática y emisión simultánea de facturas.",
          en: "Reading batch generation, automatic distribution and simultaneous invoice issuance.",
          fr: "Génération du lot de relevés, distribution automatique et émission simultanée des factures.",
        },
      },
      {
        title: {
          pt: "Gestão dinâmica de rotas",
          es: "Gestión dinámica de rutas",
          en: "Dynamic route management",
          fr: "Gestion dynamique des itinéraires",
        },
        description: {
          pt: "Visualização de gráficos de evolução, zoom de mapas e histórico completo dos trajetos percorridos.",
          es: "Visualización de gráficos de evolución, zoom de mapas e historial completo de los trayectos recorridos.",
          en: "Evolution chart visualization, map zoom and complete history of routes traveled.",
          fr: "Visualisation de graphiques d'évolution, zoom des cartes et historique complet des trajets parcourus.",
        },
      },
    ],
  },
  {
    id: "faturamento",
    name: {
      pt: "Faturamento",
      es: "Facturación",
      en: "Billing",
      fr: "Facturation",
    },
    intro: {
      pt: "Integra leitura e faturamento com total segurança. Estrutura tarifária flexível, permitindo a personalização de preços conforme a realidade de cada cliente. Além disso, permite o acompanhamento de todo o processo: da leitura à emissão final da fatura.",
      es: "Integra lectura y facturación con total seguridad. Estructura tarifaria flexible, permitiendo la personalización de precios según la realidad de cada cliente. Además, permite el seguimiento de todo el proceso: de la lectura a la emisión final de la factura.",
      en: "Integrates reading and billing with full security. A flexible tariff structure allows price customization according to each client's reality. It also enables tracking of the entire process: from reading to the final invoice issuance.",
      fr: "Intègre relevé et facturation en toute sécurité. Structure tarifaire flexible permettant la personnalisation des prix selon la réalité de chaque client. Il permet également le suivi de tout le processus : du relevé à l'émission finale de la facture.",
    },
    topics: [
      {
        title: {
          pt: "Integração total com módulo de medição",
          es: "Integración total con módulo de medición",
          en: "Full integration with the metering module",
          fr: "Intégration totale avec le module de mesure",
        },
        description: {
          pt: "Sincronização perfeita entre leitura e faturamento para fluxo operacional contínuo.",
          es: "Sincronización perfecta entre lectura y facturación para un flujo operativo continuo.",
          en: "Perfect synchronization between reading and billing for a continuous operational flow.",
          fr: "Synchronisation parfaite entre relevé et facturation pour un flux opérationnel continu.",
        },
      },
      {
        title: {
          pt: "Estrutura tarifária flexível",
          es: "Estructura tarifaria flexible",
          en: "Flexible tariff structure",
          fr: "Structure tarifaire flexible",
        },
        description: {
          pt: "Personalização completa de tabelas de preços adaptadas à realidade específica de cada cliente.",
          es: "Personalización completa de tablas de precios adaptadas a la realidad específica de cada cliente.",
          en: "Full customization of price tables adapted to each client's specific reality.",
          fr: "Personnalisation complète des grilles tarifaires adaptées à la réalité spécifique de chaque client.",
        },
      },
      {
        title: {
          pt: "Segurança e precisão nos cálculos",
          es: "Seguridad y precisión en los cálculos",
          en: "Security and accuracy in calculations",
          fr: "Sécurité et précision des calculs",
        },
        description: {
          pt: "Parametrização avançada que garante a cobrança correta de água, esgoto e demais serviços sem erros.",
          es: "Parametrización avanzada que garantiza el cobro correcto de agua, alcantarillado y demás servicios sin errores.",
          en: "Advanced parameterization that ensures correct charging of water, sewage and other services without errors.",
          fr: "Paramétrage avancé garantissant la facturation correcte de l'eau, de l'assainissement et des autres services sans erreurs.",
        },
      },
      {
        title: {
          pt: "Adaptabilidade comercial",
          es: "Adaptabilidad comercial",
          en: "Commercial adaptability",
          fr: "Adaptabilité commerciale",
        },
        description: {
          pt: "Funcionalidades facilitadoras para implementar novas regras de faturamento conforme estratégias e demandas do negócio.",
          es: "Funcionalidades facilitadoras para implementar nuevas reglas de facturación según las estrategias y demandas del negocio.",
          en: "Enabling features to implement new billing rules according to business strategies and demands.",
          fr: "Fonctionnalités facilitant la mise en œuvre de nouvelles règles de facturation selon les stratégies et besoins de l'entreprise.",
        },
      },
    ],
  },
  {
    id: "arrecadacao",
    name: {
      pt: "Arrecadação",
      es: "Recaudación",
      en: "Collection",
      fr: "Encaissement",
    },
    intro: {
      pt: "Maximiza a arrecadação com múltiplos canais digitais: e-mail, WhatsApp, SMS e app. Permite o controle eficiente de recebimentos, cálculo automático de multas e juros, além de monitoramento por agentes. Sua integração total com faturamento garante fluxo otimizado.",
      es: "Maximiza la recaudación con múltiples canales digitales: e-mail, WhatsApp, SMS y app. Permite el control eficiente de los cobros, cálculo automático de multas e intereses, además del monitoreo por agentes. Su integración total con facturación garantiza un flujo optimizado.",
      en: "Maximizes collection with multiple digital channels: email, WhatsApp, SMS and app. It enables efficient control of receipts, automatic calculation of fines and interest, as well as monitoring by agents. Its full integration with billing ensures an optimized flow.",
      fr: "Maximise l'encaissement avec de multiples canaux numériques : e-mail, WhatsApp, SMS et application. Il permet un contrôle efficace des encaissements, le calcul automatique des amendes et intérêts, ainsi que le suivi par des agents. Son intégration totale avec la facturation assure un flux optimisé.",
    },
    topics: [
      {
        title: {
          pt: "Múltiplos canais de pagamento digital",
          es: "Múltiples canales de pago digital",
          en: "Multiple digital payment channels",
          fr: "Multiples canaux de paiement numérique",
        },
        description: {
          pt: "E-mail, WhatsApp, SMS e notificações no app da agência virtual para máxima conveniência do cliente.",
          es: "E-mail, WhatsApp, SMS y notificaciones en la app de la agencia virtual para máxima conveniencia del cliente.",
          en: "Email, WhatsApp, SMS and notifications in the virtual agency app for maximum customer convenience.",
          fr: "E-mail, WhatsApp, SMS et notifications dans l'app de l'agence virtuelle pour une commodité maximale du client.",
        },
      },
      {
        title: {
          pt: "Faturas digitais inteligentes",
          es: "Facturas digitales inteligentes",
          en: "Smart digital invoices",
          fr: "Factures numériques intelligentes",
        },
        description: {
          pt: "Geração e envio automático de documentos digitais, reduzindo custos e acelerando recebimentos.",
          es: "Generación y envío automático de documentos digitales, reduciendo costos y acelerando los cobros.",
          en: "Automatic generation and sending of digital documents, reducing costs and speeding up receipts.",
          fr: "Génération et envoi automatique de documents numériques, réduisant les coûts et accélérant les encaissements.",
        },
      },
      {
        title: {
          pt: "Controle eficiente de recebimentos",
          es: "Control eficiente de cobros",
          en: "Efficient receipts control",
          fr: "Contrôle efficace des encaissements",
        },
        description: {
          pt: "Monitoramento completo de pagamentos parcelados ou à vista com cálculo automático de multas e juros.",
          es: "Monitoreo completo de pagos en cuotas o al contado con cálculo automático de multas e intereses.",
          en: "Complete monitoring of installment or single payments with automatic calculation of fines and interest.",
          fr: "Suivi complet des paiements échelonnés ou comptants avec calcul automatique des amendes et intérêts.",
        },
      },
      {
        title: {
          pt: "Integração total com faturamento",
          es: "Integración total con facturación",
          en: "Full integration with billing",
          fr: "Intégration totale avec la facturation",
        },
        description: {
          pt: "Sistema sincronizado que otimiza todo o ciclo de cobrança e arrecadação.",
          es: "Sistema sincronizado que optimiza todo el ciclo de cobro y recaudación.",
          en: "Synchronized system that optimizes the entire billing and collection cycle.",
          fr: "Système synchronisé qui optimise tout le cycle de facturation et d'encaissement.",
        },
      },
    ],
  },
  {
    id: "contabilidade",
    name: {
      pt: "Contabilidade",
      es: "Contabilidad",
      en: "Accounting",
      fr: "Comptabilité",
    },
    intro: {
      pt: "Automatiza a contabilidade com total integração entre faturamento e arrecadação. Lançamentos contábeis precisos conforme plano de contas, conciliação automática e relatórios por rubrica. Compatível com SAP, TOTVS e Oracle. Elimina erros manuais e oferece visão financeira unificada.",
      es: "Automatiza la contabilidad con total integración entre facturación y recaudación. Asientos contables precisos según el plan de cuentas, conciliación automática e informes por rubro. Compatible con SAP, TOTVS y Oracle. Elimina errores manuales y ofrece una visión financiera unificada.",
      en: "Automates accounting with full integration between billing and collection. Accurate accounting entries according to the chart of accounts, automatic reconciliation and reports by category. Compatible with SAP, TOTVS and Oracle. Eliminates manual errors and provides a unified financial view.",
      fr: "Automatise la comptabilité avec une intégration totale entre facturation et encaissement. Écritures comptables précises selon le plan comptable, rapprochement automatique et rapports par rubrique. Compatible avec SAP, TOTVS et Oracle. Élimine les erreurs manuelles et offre une vision financière unifiée.",
    },
    topics: [
      {
        title: {
          pt: "Automatização contábil completa",
          es: "Automatización contable completa",
          en: "Complete accounting automation",
          fr: "Automatisation comptable complète",
        },
        description: {
          pt: "Lançamentos automáticos conforme plano de contas, eliminando tarefas manuais e reduzindo erros operacionais.",
          es: "Asientos automáticos según el plan de cuentas, eliminando tareas manuales y reduciendo errores operativos.",
          en: "Automatic entries according to the chart of accounts, eliminating manual tasks and reducing operational errors.",
          fr: "Écritures automatiques selon le plan comptable, éliminant les tâches manuelles et réduisant les erreurs opérationnelles.",
        },
      },
      {
        title: {
          pt: "Integração faturamento-contabilidade",
          es: "Integración facturación-contabilidad",
          en: "Billing-accounting integration",
          fr: "Intégration facturation-comptabilité",
        },
        description: {
          pt: "Sincronização fluida entre módulos proporciona visão financeira clara e atualizada em tempo real.",
          es: "La sincronización fluida entre módulos proporciona una visión financiera clara y actualizada en tiempo real.",
          en: "Smooth synchronization between modules provides a clear, real-time financial view.",
          fr: "La synchronisation fluide entre modules offre une vision financière claire et actualisée en temps réel.",
        },
      },
      {
        title: {
          pt: "Relatórios gerenciais precisos",
          es: "Informes gerenciales precisos",
          en: "Accurate management reports",
          fr: "Rapports de gestion précis",
        },
        description: {
          pt: "Conciliação de contas a receber, demonstrativos por rubrica (água, esgoto, serviços) e informações direcionadas ao departamento contábil.",
          es: "Conciliación de cuentas por cobrar, estados por rubro (agua, alcantarillado, servicios) e información dirigida al departamento contable.",
          en: "Reconciliation of accounts receivable, statements by category (water, sewage, services) and information directed to the accounting department.",
          fr: "Rapprochement des comptes clients, états par rubrique (eau, assainissement, services) et informations destinées au service comptable.",
        },
      },
      {
        title: {
          pt: "Compatibilidade com sistemas líderes",
          es: "Compatibilidad con sistemas líderes",
          en: "Compatibility with leading systems",
          fr: "Compatibilité avec les systèmes leaders",
        },
        description: {
          pt: "Integração com SAP, TOTVS, JD Edwards e Oracle para gestão financeira unificada e intercâmbio de dados sem complicações.",
          es: "Integración con SAP, TOTVS, JD Edwards y Oracle para una gestión financiera unificada e intercambio de datos sin complicaciones.",
          en: "Integration with SAP, TOTVS, JD Edwards and Oracle for unified financial management and hassle-free data exchange.",
          fr: "Intégration avec SAP, TOTVS, JD Edwards et Oracle pour une gestion financière unifiée et un échange de données sans complications.",
        },
      },
    ],
  },
  {
    id: "cobranca",
    name: {
      pt: "Cobrança",
      es: "Cobranza",
      en: "Debt recovery",
      fr: "Recouvrement",
    },
    intro: {
      pt: "Otimiza a cobrança com procedimentos graduais: comunicados educativos, corte em 3 níveis e parcelamento flexível. Integra SPC, dívida ativa e empresas de cobrança. Possibilita a criação de campanhas personalizadas e carnês alternativos para recuperar receita mantendo relacionamento positivo com o cliente.",
      es: "Optimiza la cobranza con procedimientos graduales: comunicados educativos, corte en 3 niveles y refinanciación flexible. Integra SPC, deuda activa y empresas de cobranza. Posibilita la creación de campañas personalizadas y talonarios alternativos para recuperar ingresos manteniendo una relación positiva con el cliente.",
      en: "Optimizes debt recovery with gradual procedures: educational notices, 3-level cutoff and flexible installments. Integrates the credit bureau (SPC), active debt and collection agencies. Enables the creation of personalized campaigns and alternative payment booklets to recover revenue while maintaining a positive customer relationship.",
      fr: "Optimise le recouvrement avec des procédures progressives : avis pédagogiques, coupure à 3 niveaux et échelonnement flexible. Intègre les organismes de crédit (SPC), la dette active et les sociétés de recouvrement. Permet la création de campagnes personnalisées et de carnets de paiement alternatifs pour récupérer les revenus tout en maintenant une relation positive avec le client.",
    },
    topics: [
      {
        title: {
          pt: "Sistema de corte gradativo em 3 níveis",
          es: "Sistema de corte gradual en 3 niveles",
          en: "Gradual 3-level cutoff system",
          fr: "Système de coupure progressive à 3 niveaux",
        },
        description: {
          pt: "Dispõe de diferentes tipos de corte: Educativo, Cavalete e Ramal, com procedimentos progressivos que garantem eficiência na recuperação de débitos sem prejudicar o relacionamento.",
          es: "Dispone de diferentes tipos de corte: Educativo, Caballete y Ramal, con procedimientos progresivos que garantizan eficiencia en la recuperación de deudas sin perjudicar la relación.",
          en: "Offers different types of cutoff: Educational, Standpipe and Branch, with progressive procedures that ensure efficiency in debt recovery without harming the relationship.",
          fr: "Propose différents types de coupure : Pédagogique, Potence et Branchement, avec des procédures progressives qui garantissent l'efficacité du recouvrement sans nuire à la relation.",
        },
      },
      {
        title: {
          pt: "Parcelamento e negociação flexíveis",
          es: "Refinanciación y negociación flexibles",
          en: "Flexible installments and negotiation",
          fr: "Échelonnement et négociation flexibles",
        },
        description: {
          pt: "Facilita pagamentos em parcelas mensais com diretrizes personalizadas e múltiplas formas de pagamento.",
          es: "Facilita pagos en cuotas mensuales con directrices personalizadas y múltiples formas de pago.",
          en: "Facilitates monthly installment payments with customized guidelines and multiple payment methods.",
          fr: "Facilite les paiements en mensualités avec des directives personnalisées et de multiples moyens de paiement.",
        },
      },
      {
        title: {
          pt: "Integração com órgãos de proteção",
          es: "Integración con organismos de protección al crédito",
          en: "Integration with credit protection agencies",
          fr: "Intégration avec les organismes de protection du crédit",
        },
        description: {
          pt: "Inclusão automática em SPC e registro em dívida ativa com gestão completa de livro, notificação e certidão.",
          es: "Inclusión automática en SPC y registro en deuda activa con gestión completa de libro, notificación y certificado.",
          en: "Automatic inclusion in the credit bureau (SPC) and registration in active debt with complete management of ledger, notification and certificate.",
          fr: "Inscription automatique au fichier de crédit (SPC) et enregistrement en dette active avec gestion complète du registre, notification et certificat.",
        },
      },
      {
        title: {
          pt: "Múltiplos canais de cobrança",
          es: "Múltiples canales de cobranza",
          en: "Multiple collection channels",
          fr: "Multiples canaux de recouvrement",
        },
        description: {
          pt: "Integração com empresas especializadas (Pascaloto, Quero Quitar), campanhas personalizadas e carnês alternativos para maximizar a arrecadação.",
          es: "Integración con empresas especializadas (Pascaloto, Quero Quitar), campañas personalizadas y talonarios alternativos para maximizar la recaudación.",
          en: "Integration with specialized companies (Pascaloto, Quero Quitar), personalized campaigns and alternative payment booklets to maximize collection.",
          fr: "Intégration avec des sociétés spécialisées (Pascaloto, Quero Quitar), campagnes personnalisées et carnets de paiement alternatifs pour maximiser l'encaissement.",
        },
      },
    ],
  },
  {
    id: "operacional-mobile",
    name: {
      pt: "Operacional + Mobile",
      es: "Operativo + Mobile",
      en: "Operations + Mobile",
      fr: "Opérationnel + Mobile",
    },
    intro: {
      pt: "Programa, executa e monitora serviços em tempo real. Controla equipes, materiais e estoque automaticamente. Versão mobile com GPS, fotos georreferenciadas e transmissão instantânea para otimizar tempo em campo.",
      es: "Programa, ejecuta y monitorea servicios en tiempo real. Controla equipos, materiales y stock automáticamente. Versión mobile con GPS, fotos georreferenciadas y transmisión instantánea para optimizar el tiempo en campo.",
      en: "Schedules, executes and monitors services in real time. Automatically controls teams, materials and inventory. Mobile version with GPS, georeferenced photos and instant transmission to optimize field time.",
      fr: "Planifie, exécute et surveille les services en temps réel. Contrôle automatiquement les équipes, les matériaux et le stock. Version mobile avec GPS, photos géoréférencées et transmission instantanée pour optimiser le temps sur le terrain.",
    },
    topics: [
      {
        title: {
          pt: "Programação e execução integrada",
          es: "Programación y ejecución integrada",
          en: "Integrated scheduling and execution",
          fr: "Planification et exécution intégrées",
        },
        description: {
          pt: "Planejamento completo de serviços com priorização automática, monitoramento de prazos e classificação de criticidade.",
          es: "Planificación completa de servicios con priorización automática, monitoreo de plazos y clasificación de criticidad.",
          en: "Complete service planning with automatic prioritization, deadline monitoring and criticality classification.",
          fr: "Planification complète des services avec priorisation automatique, suivi des délais et classification de criticité.",
        },
      },
      {
        title: {
          pt: "Operacional mobile em tempo real",
          es: "Operativo mobile en tiempo real",
          en: "Real-time mobile operations",
          fr: "Opérationnel mobile en temps réel",
        },
        description: {
          pt: "Transmissão instantânea de ordens de serviço, GPS georreferenciado, fotos antes/durante/depois e status de execução via Google Maps.",
          es: "Transmisión instantánea de órdenes de servicio, GPS georreferenciado, fotos antes/durante/después y estado de ejecución vía Google Maps.",
          en: "Instant transmission of service orders, georeferenced GPS, before/during/after photos and execution status via Google Maps.",
          fr: "Transmission instantanée des ordres de service, GPS géoréférencé, photos avant/pendant/après et statut d'exécution via Google Maps.",
        },
      },
      {
        title: {
          pt: "Gestão completa de recursos",
          es: "Gestión completa de recursos",
          en: "Complete resource management",
          fr: "Gestion complète des ressources",
        },
        description: {
          pt: "Controle automático de equipes (homem/hora), materiais com baixa em estoque, veículos e retrabalhos em um único sistema.",
          es: "Control automático de equipos (hombre/hora), materiales con baja en stock, vehículos y retrabajos en un único sistema.",
          en: "Automatic control of teams (man/hour), materials with inventory write-off, vehicles and rework in a single system.",
          fr: "Contrôle automatique des équipes (homme/heure), des matériaux avec sortie de stock, des véhicules et des reprises dans un seul système.",
        },
      },
      {
        title: {
          pt: "Monitoramento e produtividade",
          es: "Monitoreo y productividad",
          en: "Monitoring and productivity",
          fr: "Suivi et productivité",
        },
        description: {
          pt: "Acompanhamento em tempo real de deslocamentos e performance de equipes, o que ajuda a eliminar a ociosidade e melhorar a integração com terceirizados.",
          es: "Seguimiento en tiempo real de desplazamientos y desempeño de equipos, lo que ayuda a eliminar la ociosidad y mejorar la integración con terceros.",
          en: "Real-time tracking of displacements and team performance, helping to eliminate idle time and improve integration with outsourced teams.",
          fr: "Suivi en temps réel des déplacements et de la performance des équipes, ce qui aide à éliminer les temps morts et à améliorer l'intégration avec les sous-traitants.",
        },
      },
    ],
  },
  {
    id: "atendimento",
    name: {
      pt: "Atendimento",
      es: "Atención",
      en: "Customer service",
      fr: "Service client",
    },
    intro: {
      pt: "Centraliza os atendimentos com acesso completo ao cliente em única tela, além de monitorar cada atendimento via protocolo. Suporta WhatsApp e chat, garantindo agilidade, eficiência e relacionamento de qualidade com histórico completo dos clientes.",
      es: "Centraliza la atención con acceso completo al cliente en una única pantalla, además de monitorear cada atención vía protocolo. Soporta WhatsApp y chat, garantizando agilidad, eficiencia y una relación de calidad con historial completo de los clientes.",
      en: "Centralizes customer service with complete access to the customer on a single screen, while monitoring each interaction via protocol. Supports WhatsApp and chat, ensuring agility, efficiency and quality relationships with a complete customer history.",
      fr: "Centralise le service client avec un accès complet au client sur un seul écran, tout en surveillant chaque interaction via un protocole. Prend en charge WhatsApp et le chat, garantissant agilité, efficacité et une relation de qualité avec un historique client complet.",
    },
    topics: [
      {
        title: {
          pt: "Acesso centralizado a informações",
          es: "Acceso centralizado a la información",
          en: "Centralized access to information",
          fr: "Accès centralisé à l'information",
        },
        description: {
          pt: "Todos os dados do cliente (cadastro, faturamento, consumo, serviços, cobrança) em uma única tela para atendimento ágil.",
          es: "Todos los datos del cliente (registro, facturación, consumo, servicios, cobranza) en una única pantalla para una atención ágil.",
          en: "All customer data (registration, billing, consumption, services, collection) on a single screen for agile service.",
          fr: "Toutes les données du client (dossier, facturation, consommation, services, recouvrement) sur un seul écran pour un service rapide.",
        },
      },
      {
        title: {
          pt: "Histórico completo de relacionamento",
          es: "Historial completo de relación",
          en: "Complete relationship history",
          fr: "Historique complet de la relation",
        },
        description: {
          pt: "Acesso a atendimentos anteriores, reclamações, parcelamentos e informações técnicas de ligações para contexto total.",
          es: "Acceso a atenciones anteriores, reclamaciones, refinanciaciones e información técnica de las conexiones para un contexto total.",
          en: "Access to previous interactions, complaints, installment plans and technical connection information for full context.",
          fr: "Accès aux interactions précédentes, réclamations, échelonnements et informations techniques des branchements pour un contexte total.",
        },
      },
      {
        title: {
          pt: "Monitoramento e controle de qualidade",
          es: "Monitoreo y control de calidad",
          en: "Monitoring and quality control",
          fr: "Suivi et contrôle de la qualité",
        },
        description: {
          pt: "Geração automática de protocolos para cada atendimento, rastreabilidade total e análise de produtividade.",
          es: "Generación automática de protocolos para cada atención, trazabilidad total y análisis de productividad.",
          en: "Automatic protocol generation for each interaction, full traceability and productivity analysis.",
          fr: "Génération automatique de protocoles pour chaque interaction, traçabilité totale et analyse de la productivité.",
        },
      },
      {
        title: {
          pt: "Múltiplos canais de comunicação",
          es: "Múltiples canales de comunicación",
          en: "Multiple communication channels",
          fr: "Multiples canaux de communication",
        },
        description: {
          pt: "Atendimento integrado via WhatsApp, chat e telefone para máxima conveniência e satisfação do cliente.",
          es: "Atención integrada vía WhatsApp, chat y teléfono para máxima conveniencia y satisfacción del cliente.",
          en: "Integrated service via WhatsApp, chat and phone for maximum customer convenience and satisfaction.",
          fr: "Service intégré via WhatsApp, chat et téléphone pour une commodité et une satisfaction maximales du client.",
        },
      },
    ],
  },
  {
    id: "gerencial",
    name: {
      pt: "Gerencial",
      es: "Gerencial",
      en: "Management",
      fr: "Pilotage",
    },
    intro: {
      pt: "Consolida dados de todos os módulos com BI avançado, dashboards e indicadores personalizados. Cria relatórios customizados em tempo real, define metas e semáforos automáticos, além de gerar indicadores SINISA para conformidade regulatória e decisões estratégicas.",
      es: "Consolida datos de todos los módulos con BI avanzado, dashboards e indicadores personalizados. Crea informes personalizados en tiempo real, define metas y semáforos automáticos, además de generar indicadores SINISA para el cumplimiento regulatorio y decisiones estratégicas.",
      en: "Consolidates data from all modules with advanced BI, dashboards and custom indicators. Creates customized real-time reports, defines goals and automatic traffic-light alerts, and generates SINISA indicators for regulatory compliance and strategic decisions.",
      fr: "Consolide les données de tous les modules avec un BI avancé, des tableaux de bord et des indicateurs personnalisés. Crée des rapports personnalisés en temps réel, définit des objectifs et des alertes automatiques, et génère des indicateurs SINISA pour la conformité réglementaire et les décisions stratégiques.",
    },
    topics: [
      {
        title: {
          pt: "Consolidação de dados integrada",
          es: "Consolidación de datos integrada",
          en: "Integrated data consolidation",
          fr: "Consolidation des données intégrée",
        },
        description: {
          pt: "Acesso gerencial a informações de todos os módulos do sistema em perspectiva unificada e estratégica.",
          es: "Acceso gerencial a la información de todos los módulos del sistema en una perspectiva unificada y estratégica.",
          en: "Management access to information from all system modules in a unified, strategic perspective.",
          fr: "Accès managérial aux informations de tous les modules du système dans une perspective unifiée et stratégique.",
        },
      },
      {
        title: {
          pt: "Analytics inteligente com IA",
          es: "Analítica inteligente con IA",
          en: "Smart analytics with AI",
          fr: "Analytique intelligente avec IA",
        },
        description: {
          pt: "Criação de relatórios customizados com inteligência artificial, análises avançadas e visualizações em tempo real para decisões baseadas em dados.",
          es: "Creación de informes personalizados con inteligencia artificial, análisis avanzados y visualizaciones en tiempo real para decisiones basadas en datos.",
          en: "Creation of customized reports with artificial intelligence, advanced analytics and real-time visualizations for data-driven decisions.",
          fr: "Création de rapports personnalisés avec intelligence artificielle, analyses avancées et visualisations en temps réel pour des décisions basées sur les données.",
        },
      },
      {
        title: {
          pt: "Indicadores e metas personalizadas",
          es: "Indicadores y metas personalizadas",
          en: "Custom indicators and goals",
          fr: "Indicateurs et objectifs personnalisés",
        },
        description: {
          pt: "Definição de parâmetros manuais e automáticos com semáforos customizados e acompanhamento contínuo de performance.",
          es: "Definición de parámetros manuales y automáticos con semáforos personalizados y seguimiento continuo del desempeño.",
          en: "Definition of manual and automatic parameters with customized traffic-light alerts and continuous performance tracking.",
          fr: "Définition de paramètres manuels et automatiques avec alertes personnalisées et suivi continu de la performance.",
        },
      },
      {
        title: {
          pt: "Conformidade regulatória SINISA",
          es: "Cumplimiento regulatorio SINISA",
          en: "SINISA regulatory compliance",
          fr: "Conformité réglementaire SINISA",
        },
        description: {
          pt: "Geração automática de indicadores federais para consolidação e envio de informações conforme programa SINISA.",
          es: "Generación automática de indicadores federales para la consolidación y envío de información conforme al programa SINISA.",
          en: "Automatic generation of federal indicators for consolidating and submitting information in accordance with the SINISA program.",
          fr: "Génération automatique d'indicateurs fédéraux pour la consolidation et l'envoi d'informations conformément au programme SINISA.",
        },
      },
    ],
  },
  {
    id: "gis",
    name: {
      pt: "GIS",
      es: "GIS",
      en: "GIS",
      fr: "GIS",
    },
    intro: {
      pt: "Integra redes, instalações e cadastro comercial em plataforma web. Geoprocessamento avançado com mapas temáticos, ordens de serviço georreferenciadas e análises espaciais. Otimiza planejamento, manutenção e atendimento, além de possuir um suporte completo de migração de dados CAD, papel e rotas.",
      es: "Integra redes, instalaciones y catastro comercial en una plataforma web. Geoprocesamiento avanzado con mapas temáticos, órdenes de servicio georreferenciadas y análisis espaciales. Optimiza la planificación, el mantenimiento y la atención, además de contar con un soporte completo de migración de datos CAD, papel y rutas.",
      en: "Integrates networks, facilities and commercial registry on a web platform. Advanced geoprocessing with thematic maps, georeferenced service orders and spatial analysis. Optimizes planning, maintenance and service, and provides complete support for migrating data from CAD, paper and routes.",
      fr: "Intègre réseaux, installations et cadastre commercial sur une plateforme web. Géotraitement avancé avec cartes thématiques, ordres de service géoréférencés et analyses spatiales. Optimise la planification, la maintenance et le service, et offre un support complet de migration des données CAD, papier et itinéraires.",
    },
    topics: [
      {
        title: {
          pt: "Integração nativa de dados espaciais",
          es: "Integración nativa de datos espaciales",
          en: "Native spatial data integration",
          fr: "Intégration native des données spatiales",
        },
        description: {
          pt: "Captura, armazenamento e visualização de informações geográficas totalmente integradas ao cadastro comercial e técnico.",
          es: "Captura, almacenamiento y visualización de información geográfica totalmente integrada al catastro comercial y técnico.",
          en: "Capture, storage and visualization of geographic information fully integrated with the commercial and technical registry.",
          fr: "Capture, stockage et visualisation d'informations géographiques entièrement intégrées au cadastre commercial et technique.",
        },
      },
      {
        title: {
          pt: "Geoprocessamento avançado web",
          es: "Geoprocesamiento avanzado web",
          en: "Advanced web geoprocessing",
          fr: "Géotraitement web avancé",
        },
        description: {
          pt: "Mapas temáticos, análises conjuntas de infraestrutura e performance do sistema com interface robusta e intuitiva.",
          es: "Mapas temáticos, análisis conjuntos de infraestructura y rendimiento del sistema con una interfaz robusta e intuitiva.",
          en: "Thematic maps, combined infrastructure analysis and system performance with a robust, intuitive interface.",
          fr: "Cartes thématiques, analyses conjointes d'infrastructure et performance du système avec une interface robuste et intuitive.",
        },
      },
      {
        title: {
          pt: "Ordens de serviço georreferenciadas",
          es: "Órdenes de servicio georreferenciadas",
          en: "Georeferenced service orders",
          fr: "Ordres de service géoréférencés",
        },
        description: {
          pt: "Croquis automáticos com localização exata entregues às equipes de campo via integração com módulo operacional.",
          es: "Croquis automáticos con ubicación exacta entregados a los equipos de campo vía integración con el módulo operativo.",
          en: "Automatic sketches with exact location delivered to field teams via integration with the operations module.",
          fr: "Croquis automatiques avec localisation exacte remis aux équipes de terrain via l'intégration avec le module opérationnel.",
        },
      },
      {
        title: {
          pt: "Suporte completo de migração",
          es: "Soporte completo de migración",
          en: "Complete migration support",
          fr: "Support complet de migration",
        },
        description: {
          pt: "Extração e transformação de dados de múltiplas fontes (CAD, papel, rotas) com carga automática no banco geográfico.",
          es: "Extracción y transformación de datos de múltiples fuentes (CAD, papel, rutas) con carga automática en la base de datos geográfica.",
          en: "Extraction and transformation of data from multiple sources (CAD, paper, routes) with automatic loading into the geographic database.",
          fr: "Extraction et transformation de données de multiples sources (CAD, papier, itinéraires) avec chargement automatique dans la base géographique.",
        },
      },
    ],
  },
]
