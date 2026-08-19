import { Lang } from "../lib/i18n"

// Conteúdo do banner de consentimento de cookies (4 idiomas).
// Duas camadas, como o aviso da Veolia América Latina:
//   1ª — aviso curto + Aceitar / Recusar / Mais informações
//   2ª — finalidades do tratamento e categorias com opt-out individual
// Links dos documentos legais em src/lib/legal-links.ts.

export interface ConsentCategoryText {
  name: string
  description: string
}

export interface ConsentText {
  title: string
  /** Primeira camada — aviso curto, mostrado antes de "Mais informações". */
  shortDescription: string
  /** Segunda camada — detalhamento do tratamento de dados. */
  description: string
  purposesTitle: string
  purposes: string[]
  partnersNote: string
  categoriesTitle: string
  necessary: ConsentCategoryText
  analytics: ConsentCategoryText
  marketing: ConsentCategoryText
  alwaysOn: string
  linksTitle: string
  linkPrivacy: string
  linkLegalNotice: string
  linkCookies: string
  acceptAll: string
  rejectAll: string
  customize: string
  save: string
  close: string
}

export const consentContent: Record<Lang, ConsentText> = {
  pt: {
    title: "Privacidade e Cookies",
    shortDescription:
      "Usamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo. Você pode gerenciar suas preferências em “Mais informações”.",
    description:
      "Com o seu consentimento, nós e nossos parceiros usamos cookies e tecnologias semelhantes para armazenar, acessar e tratar dados pessoais — como suas visitas a este site, endereços IP e identificadores de cookies. Você pode aceitar tudo, recusar ou escolher finalidade por finalidade.",
    purposesTitle: "Realizamos o seguinte tratamento de dados:",
    purposes: [
      "Armazenar informações em um dispositivo e/ou acessá-las",
      "Cookies necessários ao funcionamento do site",
      "Medição de audiência e desenvolvimento de serviços",
      "Conteúdo e publicidade personalizados e medição de desempenho",
    ],
    partnersNote:
      "Você pode retirar seu consentimento ou alterar suas escolhas a qualquer momento em “Preferências de cookies”, no rodapé do site.",
    categoriesTitle: "Você permite",
    necessary: {
      name: "Cookies necessários",
      description:
        "Essenciais para o funcionamento do site e para a segurança da navegação. Não podem ser desativados em nossos sistemas.",
    },
    analytics: {
      name: "Medição de audiência",
      description:
        "Permitem entender como o site é usado — páginas visitadas, origem do tráfego e desempenho — para melhorarmos o conteúdo e a navegação.",
    },
    marketing: {
      name: "Marketing e personalização",
      description:
        "Usados para exibir conteúdo e anúncios relevantes, dentro e fora do site, e para medir o desempenho dessas campanhas.",
    },
    alwaysOn: "Sempre ativos",
    linksTitle: "Saiba mais:",
    linkPrivacy: "Política de Privacidade",
    linkLegalNotice: "Aviso Legal",
    linkCookies: "Política de Cookies",
    acceptAll: "Aceitar e fechar",
    rejectAll: "Recusar e fechar",
    customize: "Mais informações",
    save: "Salvar preferências",
    close: "Fechar",
  },
  es: {
    title: "Privacidad y Cookies",
    shortDescription:
      "Usamos cookies para mejorar su experiencia, analizar el tráfico y personalizar contenido. Puede gestionar sus preferencias en “Más información”.",
    description:
      "Con su consentimiento, nosotros y nuestros socios usamos cookies y tecnologías similares para almacenar, acceder y tratar datos personales — como sus visitas a este sitio web, las direcciones IP y los identificadores de cookies. Puede aceptarlo todo, rechazarlo o elegir finalidad por finalidad.",
    purposesTitle: "Realizamos el siguiente tratamiento de datos:",
    purposes: [
      "Almacenar la información en un dispositivo y/o acceder a ella",
      "Cookies necesarias para el funcionamiento del sitio web",
      "Medición de audiencia y desarrollo de servicios",
      "Contenido y publicidad personalizados y medición de su rendimiento",
    ],
    partnersNote:
      "Puede retirar su consentimiento o cambiar sus opciones en cualquier momento en “Preferencias de cookies”, en el pie de página del sitio.",
    categoriesTitle: "Usted permite",
    necessary: {
      name: "Cookies necesarias",
      description:
        "Esenciales para el funcionamiento del sitio y la seguridad de la navegación. No pueden desactivarse en nuestros sistemas.",
    },
    analytics: {
      name: "Medición de audiencia",
      description:
        "Permiten entender cómo se usa el sitio — páginas visitadas, origen del tráfico y rendimiento — para mejorar el contenido y la navegación.",
    },
    marketing: {
      name: "Marketing y personalización",
      description:
        "Se usan para mostrar contenido y anuncios relevantes, dentro y fuera del sitio, y para medir el rendimiento de esas campañas.",
    },
    alwaysOn: "Siempre activas",
    linksTitle: "Más información:",
    linkPrivacy: "Política de Privacidad",
    linkLegalNotice: "Aviso Legal",
    linkCookies: "Política de Cookies",
    acceptAll: "Aceptar y cerrar",
    rejectAll: "Rechazar y cerrar",
    customize: "Más información",
    save: "Guardar preferencias",
    close: "Cerrar",
  },
  en: {
    title: "Privacy and Cookies",
    shortDescription:
      "We use cookies to improve your experience, analyze traffic and personalize content. You can manage your preferences under “More information”.",
    description:
      "With your consent, we and our partners use cookies and similar technologies to store, access and process personal data — such as your visits to this website, IP addresses and cookie identifiers. You can accept everything, reject it, or choose purpose by purpose.",
    purposesTitle: "We carry out the following data processing:",
    purposes: [
      "Store and/or access information on a device",
      "Cookies necessary for the website to function",
      "Audience measurement and service development",
      "Personalised content and advertising, and performance measurement",
    ],
    partnersNote:
      "You can withdraw your consent or change your choices at any time under “Cookie preferences”, in the site footer.",
    categoriesTitle: "You allow",
    necessary: {
      name: "Necessary cookies",
      description:
        "Essential for the website to function and for safe browsing. They cannot be switched off in our systems.",
    },
    analytics: {
      name: "Audience measurement",
      description:
        "Help us understand how the site is used — pages visited, traffic sources and performance — so we can improve content and navigation.",
    },
    marketing: {
      name: "Marketing and personalisation",
      description:
        "Used to show relevant content and ads, on and off this website, and to measure how those campaigns perform.",
    },
    alwaysOn: "Always on",
    linksTitle: "Learn more:",
    linkPrivacy: "Privacy Policy",
    linkLegalNotice: "Legal Notice",
    linkCookies: "Cookie Policy",
    acceptAll: "Accept and close",
    rejectAll: "Reject and close",
    customize: "More information",
    save: "Save preferences",
    close: "Close",
  },
  fr: {
    title: "Confidentialité et Cookies",
    shortDescription:
      "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Vous pouvez gérer vos préférences via « Plus d’informations ».",
    description:
      "Avec votre consentement, nous et nos partenaires utilisons des cookies et technologies similaires pour stocker, consulter et traiter des données personnelles — telles que vos visites sur ce site, les adresses IP et les identifiants de cookies. Vous pouvez tout accepter, tout refuser ou choisir finalité par finalité.",
    purposesTitle: "Nous effectuons les traitements de données suivants :",
    purposes: [
      "Stocker des informations sur un appareil et/ou y accéder",
      "Cookies nécessaires au fonctionnement du site",
      "Mesure d’audience et développement de services",
      "Contenus et publicités personnalisés et mesure de leur performance",
    ],
    partnersNote:
      "Vous pouvez retirer votre consentement ou modifier vos choix à tout moment via « Préférences cookies », dans le pied de page du site.",
    categoriesTitle: "Vous autorisez",
    necessary: {
      name: "Cookies nécessaires",
      description:
        "Indispensables au fonctionnement du site et à la sécurité de la navigation. Ils ne peuvent pas être désactivés dans nos systèmes.",
    },
    analytics: {
      name: "Mesure d’audience",
      description:
        "Permettent de comprendre comment le site est utilisé — pages consultées, origine du trafic et performance — afin d’améliorer le contenu et la navigation.",
    },
    marketing: {
      name: "Marketing et personnalisation",
      description:
        "Utilisés pour afficher des contenus et publicités pertinents, sur ce site et ailleurs, et pour mesurer la performance de ces campagnes.",
    },
    alwaysOn: "Toujours actifs",
    linksTitle: "En savoir plus :",
    linkPrivacy: "Politique de Confidentialité",
    linkLegalNotice: "Mentions Légales",
    linkCookies: "Politique de Cookies",
    acceptAll: "Accepter et fermer",
    rejectAll: "Refuser et fermer",
    customize: "Plus d’informations",
    save: "Enregistrer les préférences",
    close: "Fermer",
  },
}
