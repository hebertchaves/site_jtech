import { Lang } from "../lib/i18n"
import { PolicySection } from "./legal-content"

// Conteúdo da Política de Privacidade (LGPD) — exibido em PrivacyPage.
// Texto oficial nos 4 idiomas do site. As seções são numeradas automaticamente
// na renderização, então os títulos aqui não levam número.

export const privacyUpdatedAt: Record<Lang, string> = {
  pt: "16 de abril de 2026",
  es: "16 de abril de 2026",
  en: "April 16, 2026",
  fr: "16 avril 2026",
}

export const privacySections: PolicySection[] = [
  {
    title: {
      pt: "Introdução",
      es: "Introducción",
      en: "Introduction",
      fr: "Introduction",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "A Jtech Sistemas (“Jtech”, “nós”, “nosso”, “nossa”) está comprometida com a proteção de dados pessoais e com a privacidade dos usuários deste site. Esta Política descreve como coletamos, utilizamos, armazenamos e protegemos seus dados, em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).",
          es: "Jtech Sistemas (“Jtech”, “nosotros”, “nuestro”, “nuestra”) está comprometida con la protección de los datos personales y con la privacidad de los usuarios de este sitio. Esta Política describe cómo recopilamos, utilizamos, almacenamos y protegemos sus datos, en estricto cumplimiento de la Ley General de Protección de Datos de Brasil (Ley nº 13.709/2018 — LGPD).",
          en: "Jtech Sistemas (“Jtech”, “we”, “us”, “our”) is committed to protecting personal data and the privacy of this website’s users. This Policy describes how we collect, use, store and protect your data, in strict compliance with the Brazilian General Data Protection Law (Law No. 13,709/2018 — LGPD).",
          fr: "Jtech Sistemas (« Jtech », « nous », « notre », « nos ») s’engage à protéger les données personnelles et la vie privée des utilisateurs de ce site. La présente Politique décrit comment nous collectons, utilisons, stockons et protégeons vos données, en stricte conformité avec la Loi générale brésilienne sur la protection des données (Loi nº 13.709/2018 — LGPD).",
        },
      },
    ],
  },
  {
    title: {
      pt: "Controlador dos Dados",
      es: "Responsable del Tratamiento",
      en: "Data Controller",
      fr: "Responsable du Traitement",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "A Jtech Sistemas atua como controladora dos dados pessoais coletados neste site, sendo responsável pelas decisões sobre o tratamento dessas informações.",
          es: "Jtech Sistemas actúa como responsable de los datos personales recopilados en este sitio, siendo responsable de las decisiones sobre el tratamiento de esa información.",
          en: "Jtech Sistemas acts as the controller of the personal data collected on this website and is responsible for the decisions regarding the processing of this information.",
          fr: "Jtech Sistemas agit en qualité de responsable du traitement des données personnelles collectées sur ce site et prend les décisions relatives au traitement de ces informations.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Dados Coletados",
      es: "Datos Recopilados",
      en: "Data We Collect",
      fr: "Données Collectées",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Podemos coletar as seguintes informações fornecidas voluntariamente pelo usuário:",
          es: "Podemos recopilar la siguiente información proporcionada voluntariamente por el usuario:",
          en: "We may collect the following information voluntarily provided by the user:",
          fr: "Nous pouvons collecter les informations suivantes, fournies volontairement par l’utilisateur :",
        },
      },
      {
        type: "ul",
        items: [
          {
            label: {
              pt: "Identificação",
              es: "Identificación",
              en: "Identification",
              fr: "Identification",
            },
            text: {
              pt: "Nome, e-mail, telefone, empresa e cargo;",
              es: "Nombre, correo electrónico, teléfono, empresa y cargo;",
              en: "Name, email, phone, company and job title;",
              fr: "Nom, e-mail, téléphone, entreprise et fonction ;",
            },
          },
          {
            label: {
              pt: "Comunicação",
              es: "Comunicación",
              en: "Communication",
              fr: "Communication",
            },
            text: {
              pt: "Conteúdo de mensagens enviadas via formulários e preferências de comunicação.",
              es: "Contenido de los mensajes enviados a través de formularios y preferencias de comunicación.",
              en: "Content of messages sent through forms and communication preferences.",
              fr: "Contenu des messages envoyés via les formulaires et préférences de communication.",
            },
          },
        ],
      },
      {
        type: "p",
        text: {
          pt: "Além disso, coletamos dados de forma automática para garantir a segurança e o desempenho do site:",
          es: "Además, recopilamos datos de forma automática para garantizar la seguridad y el rendimiento del sitio:",
          en: "In addition, we automatically collect data to ensure the security and performance of the website:",
          fr: "En outre, nous collectons automatiquement des données afin de garantir la sécurité et la performance du site :",
        },
      },
      {
        type: "p",
        text: {
          pt: "Endereço IP, data e hora de acesso, informações de navegação e dados técnicos do dispositivo.",
          es: "Dirección IP, fecha y hora de acceso, información de navegación y datos técnicos del dispositivo.",
          en: "IP address, date and time of access, browsing information and technical device data.",
          fr: "Adresse IP, date et heure d’accès, informations de navigation et données techniques de l’appareil.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Uso de Cookies",
      es: "Uso de Cookies",
      en: "Use of Cookies",
      fr: "Utilisation des Cookies",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Utilizamos cookies para diferentes finalidades:",
          es: "Utilizamos cookies para diferentes finalidades:",
          en: "We use cookies for different purposes:",
          fr: "Nous utilisons des cookies à différentes fins :",
        },
      },
      {
        type: "ul",
        items: [
          {
            label: {
              pt: "Essenciais",
              es: "Esenciales",
              en: "Essential",
              fr: "Essentiels",
            },
            text: {
              pt: "Necessários para o funcionamento básico e segurança do site;",
              es: "Necesarios para el funcionamiento básico y la seguridad del sitio;",
              en: "Necessary for the basic operation and security of the website;",
              fr: "Nécessaires au fonctionnement de base et à la sécurité du site ;",
            },
          },
          {
            label: {
              pt: "Analíticos",
              es: "Analíticos",
              en: "Analytics",
              fr: "Analytiques",
            },
            text: {
              pt: "Para entender como o site é utilizado e melhorar sua performance;",
              es: "Para entender cómo se utiliza el sitio y mejorar su rendimiento;",
              en: "To understand how the website is used and improve its performance;",
              fr: "Pour comprendre comment le site est utilisé et améliorer ses performances ;",
            },
          },
          {
            label: {
              pt: "Marketing",
              es: "Marketing",
              en: "Marketing",
              fr: "Marketing",
            },
            text: {
              pt: "Para personalizar comunicações (apenas mediante seu consentimento).",
              es: "Para personalizar comunicaciones (solo con su consentimiento).",
              en: "To personalize communications (only with your consent).",
              fr: "Pour personnaliser les communications (uniquement avec votre consentement).",
            },
          },
        ],
      },
      {
        type: "p",
        text: {
          pt: "Você pode gerenciar suas preferências de cookies a qualquer momento por meio do nosso banner de consentimento.",
          es: "Puede gestionar sus preferencias de cookies en cualquier momento a través de nuestro banner de consentimiento.",
          en: "You can manage your cookie preferences at any time through our consent banner.",
          fr: "Vous pouvez gérer vos préférences en matière de cookies à tout moment via notre bandeau de consentement.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Finalidades do Tratamento",
      es: "Finalidades del Tratamiento",
      en: "Purposes of Processing",
      fr: "Finalités du Traitement",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Seus dados são utilizados para:",
          es: "Sus datos se utilizan para:",
          en: "Your data is used to:",
          fr: "Vos données sont utilisées pour :",
        },
      },
      {
        type: "ul",
        items: [
          {
            text: {
              pt: "Responder a solicitações de suporte, orçamentos e contatos comerciais;",
              es: "Responder a solicitudes de soporte, presupuestos y contactos comerciales;",
              en: "Respond to support requests, quotes and commercial inquiries;",
              fr: "Répondre aux demandes d’assistance, aux devis et aux contacts commerciaux ;",
            },
          },
          {
            text: {
              pt: "Enviar comunicações institucionais, informativos e materiais educativos (quando autorizado);",
              es: "Enviar comunicaciones institucionales, boletines y materiales educativos (cuando esté autorizado);",
              en: "Send institutional communications, newsletters and educational materials (when authorized);",
              fr: "Envoyer des communications institutionnelles, des newsletters et des contenus éducatifs (lorsque cela est autorisé) ;",
            },
          },
          {
            text: {
              pt: "Melhorar a experiência de navegação e a usabilidade do site;",
              es: "Mejorar la experiencia de navegación y la usabilidad del sitio;",
              en: "Improve the browsing experience and usability of the website;",
              fr: "Améliorer l’expérience de navigation et l’ergonomie du site ;",
            },
          },
          {
            text: {
              pt: "Cumprir obrigações legais ou ordens judiciais.",
              es: "Cumplir obligaciones legales u órdenes judiciales.",
              en: "Comply with legal obligations or court orders.",
              fr: "Respecter les obligations légales ou les décisions de justice.",
            },
          },
        ],
      },
    ],
  },
  {
    title: {
      pt: "Base Legal",
      es: "Base Legal",
      en: "Legal Basis",
      fr: "Base Légale",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "O tratamento de dados na Jtech é realizado com base nas seguintes hipóteses legais da LGPD:",
          es: "El tratamiento de datos en Jtech se realiza con base en las siguientes hipótesis legales de la LGPD:",
          en: "Data processing at Jtech is carried out based on the following legal bases under the LGPD:",
          fr: "Le traitement des données chez Jtech repose sur les bases légales suivantes prévues par la LGPD :",
        },
      },
      {
        type: "ul",
        items: [
          {
            label: {
              pt: "Consentimento",
              es: "Consentimiento",
              en: "Consent",
              fr: "Consentement",
            },
            text: {
              pt: "Quando você autoriza expressamente o uso dos dados;",
              es: "Cuando usted autoriza expresamente el uso de los datos;",
              en: "When you expressly authorize the use of your data;",
              fr: "Lorsque vous autorisez expressément l’utilisation de vos données ;",
            },
          },
          {
            label: {
              pt: "Execução de Medidas Pré-Contratuais",
              es: "Ejecución de Medidas Precontractuales",
              en: "Pre-contractual Measures",
              fr: "Exécution de Mesures Précontractuelles",
            },
            text: {
              pt: "Para responder a cotações e propostas solicitadas por você;",
              es: "Para responder a cotizaciones y propuestas solicitadas por usted;",
              en: "To respond to quotes and proposals requested by you;",
              fr: "Pour répondre aux devis et propositions que vous avez demandés ;",
            },
          },
          {
            label: {
              pt: "Cumprimento de Obrigação Legal",
              es: "Cumplimiento de Obligación Legal",
              en: "Compliance with a Legal Obligation",
              fr: "Respect d’une Obligation Légale",
            },
            text: {
              pt: "Quando o tratamento é exigido por lei;",
              es: "Cuando el tratamiento es exigido por ley;",
              en: "When processing is required by law;",
              fr: "Lorsque le traitement est exigé par la loi ;",
            },
          },
          {
            label: {
              pt: "Legítimo Interesse",
              es: "Interés Legítimo",
              en: "Legitimate Interest",
              fr: "Intérêt Légitime",
            },
            text: {
              pt: "Para melhoria dos nossos serviços e segurança, desde que respeitados os direitos fundamentais do titular.",
              es: "Para la mejora de nuestros servicios y seguridad, siempre que se respeten los derechos fundamentales del titular.",
              en: "To improve our services and security, provided that the data subject’s fundamental rights are respected.",
              fr: "Pour améliorer nos services et notre sécurité, sous réserve du respect des droits fondamentaux de la personne concernée.",
            },
          },
        ],
      },
    ],
  },
  {
    title: {
      pt: "Compartilhamento de Dados",
      es: "Compartición de Datos",
      en: "Data Sharing",
      fr: "Partage des Données",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Não comercializamos seus dados. Podemos compartilhá-los com parceiros e prestadores de serviço estritamente necessários para a operação, tais como:",
          es: "No comercializamos sus datos. Podemos compartirlos con socios y proveedores de servicios estrictamente necesarios para la operación, tales como:",
          en: "We do not sell your data. We may share it with partners and service providers strictly necessary for our operations, such as:",
          fr: "Nous ne commercialisons pas vos données. Nous pouvons les partager avec des partenaires et prestataires de services strictement nécessaires à notre exploitation, tels que :",
        },
      },
      {
        type: "ul",
        items: [
          {
            text: {
              pt: "Provedores de hospedagem, infraestrutura de nuvem e serviços de segurança;",
              es: "Proveedores de alojamiento, infraestructura en la nube y servicios de seguridad;",
              en: "Hosting providers, cloud infrastructure and security services;",
              fr: "Fournisseurs d’hébergement, d’infrastructure cloud et de services de sécurité ;",
            },
          },
          {
            text: {
              pt: "Ferramentas de análise (Analytics), plataformas de CRM e automação de marketing.",
              es: "Herramientas de análisis (Analytics), plataformas de CRM y automatización de marketing.",
              en: "Analytics tools, CRM platforms and marketing automation.",
              fr: "Outils d’analyse (Analytics), plateformes CRM et automatisation marketing.",
            },
          },
        ],
      },
      {
        type: "p",
        text: {
          pt: "Exigimos que todos os nossos parceiros adotem padrões de segurança e confidencialidade compatíveis com esta Política.",
          es: "Exigimos que todos nuestros socios adopten estándares de seguridad y confidencialidad compatibles con esta Política.",
          en: "We require all our partners to adopt security and confidentiality standards compatible with this Policy.",
          fr: "Nous exigeons de tous nos partenaires qu’ils adoptent des normes de sécurité et de confidentialité compatibles avec la présente Politique.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Transferência Internacional",
      es: "Transferencia Internacional",
      en: "International Transfer",
      fr: "Transfert International",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Para serviços em nuvem (cloud computing), seus dados podem ser processados em servidores localizados fora do Brasil. Nessas situações, asseguramos que os países de destino possuam legislação de proteção de dados adequada ou que o provedor ofereça garantias contratuais de proteção equivalentes à LGPD.",
          es: "Para los servicios en la nube (cloud computing), sus datos pueden ser procesados en servidores ubicados fuera de Brasil. En esas situaciones, aseguramos que los países de destino cuenten con legislación de protección de datos adecuada o que el proveedor ofrezca garantías contractuales de protección equivalentes a la LGPD.",
          en: "For cloud computing services, your data may be processed on servers located outside Brazil. In such cases, we ensure that the destination countries have adequate data protection legislation or that the provider offers contractual guarantees equivalent to the LGPD.",
          fr: "Pour les services d’informatique en nuage (cloud computing), vos données peuvent être traitées sur des serveurs situés hors du Brésil. Dans ces cas, nous nous assurons que les pays de destination disposent d’une législation adéquate en matière de protection des données ou que le prestataire offre des garanties contractuelles équivalentes à la LGPD.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Direitos do Titular",
      es: "Derechos del Titular",
      en: "Data Subject Rights",
      fr: "Droits de la Personne Concernée",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Como titular, você possui os seguintes direitos:",
          es: "Como titular, usted posee los siguientes derechos:",
          en: "As a data subject, you have the following rights:",
          fr: "En tant que personne concernée, vous disposez des droits suivants :",
        },
      },
      {
        type: "ul",
        items: [
          {
            text: {
              pt: "Confirmar a existência do tratamento e acessar seus dados;",
              es: "Confirmar la existencia del tratamiento y acceder a sus datos;",
              en: "Confirm the existence of processing and access your data;",
              fr: "Confirmer l’existence du traitement et accéder à vos données ;",
            },
          },
          {
            text: {
              pt: "Corrigir dados incompletos ou desatualizados;",
              es: "Corregir datos incompletos o desactualizados;",
              en: "Correct incomplete or outdated data;",
              fr: "Rectifier des données incomplètes ou obsolètes ;",
            },
          },
          {
            text: {
              pt: "Solicitar a anonimização, bloqueio ou exclusão de dados desnecessários;",
              es: "Solicitar la anonimización, bloqueo o eliminación de datos innecesarios;",
              en: "Request the anonymization, blocking or deletion of unnecessary data;",
              fr: "Demander l’anonymisation, le blocage ou la suppression de données non nécessaires ;",
            },
          },
          {
            text: {
              pt: "Revogar o consentimento a qualquer momento;",
              es: "Revocar el consentimiento en cualquier momento;",
              en: "Withdraw consent at any time;",
              fr: "Retirer votre consentement à tout moment ;",
            },
          },
          {
            text: {
              pt: "Solicitar a portabilidade dos dados.",
              es: "Solicitar la portabilidad de los datos.",
              en: "Request data portability.",
              fr: "Demander la portabilité des données.",
            },
          },
        ],
      },
      {
        type: "p",
        text: {
          pt: "Para exercer esses direitos, entre em contato através do e-mail: privacidade@jtech.com.br.",
          es: "Para ejercer estos derechos, contáctenos a través del correo electrónico: privacidade@jtech.com.br.",
          en: "To exercise these rights, contact us at: privacidade@jtech.com.br.",
          fr: "Pour exercer ces droits, contactez-nous à l’adresse : privacidade@jtech.com.br.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Segurança e Retenção",
      es: "Seguridad y Retención",
      en: "Security and Retention",
      fr: "Sécurité et Conservation",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Adotamos medidas técnicas e organizacionais (como criptografia e controle de acesso) para proteger seus dados. As informações são mantidas apenas pelo tempo necessário para cumprir as finalidades descritas ou para atender a obrigações legais de guarda de documentos.",
          es: "Adoptamos medidas técnicas y organizativas (como cifrado y control de acceso) para proteger sus datos. La información se conserva solo durante el tiempo necesario para cumplir las finalidades descritas o para atender obligaciones legales de conservación de documentos.",
          en: "We adopt technical and organizational measures (such as encryption and access control) to protect your data. Information is retained only for as long as necessary to fulfill the purposes described or to comply with legal document retention obligations.",
          fr: "Nous adoptons des mesures techniques et organisationnelles (telles que le chiffrement et le contrôle d’accès) pour protéger vos données. Les informations ne sont conservées que le temps nécessaire à la réalisation des finalités décrites ou au respect des obligations légales de conservation des documents.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Encarregado de Dados (DPO)",
      es: "Encargado de Datos (DPO)",
      en: "Data Protection Officer (DPO)",
      fr: "Délégué à la Protection des Données (DPO)",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Para dúvidas sobre esta Política ou sobre como seus dados são tratados, entre em contato conosco:",
          es: "Para dudas sobre esta Política o sobre cómo se tratan sus datos, contáctenos:",
          en: "For questions about this Policy or about how your data is processed, contact us:",
          fr: "Pour toute question concernant la présente Politique ou le traitement de vos données, contactez-nous :",
        },
      },
      {
        type: "lines",
        lines: [
          {
            pt: "E-mail: juridico@jtech.com.br",
            es: "Correo electrónico: juridico@jtech.com.br",
            en: "Email: juridico@jtech.com.br",
            fr: "E-mail : juridico@jtech.com.br",
          },
          {
            pt: "Telefone: +55 (48) 3381-0900",
            es: "Teléfono: +55 (48) 3381-0900",
            en: "Phone: +55 (48) 3381-0900",
            fr: "Téléphone : +55 (48) 3381-0900",
          },
          {
            pt: "Endereço: Av. Marechal Castelo Branco, 65 - Campinas - São José/SC - Ed. Kennedy Tower - Torre A - Sala 1201 - Cep: 88101-020.",
            es: "Dirección: Av. Marechal Castelo Branco, 65 - Campinas - São José/SC - Ed. Kennedy Tower - Torre A - Sala 1201 - Cep: 88101-020.",
            en: "Address: Av. Marechal Castelo Branco, 65 - Campinas - São José/SC - Ed. Kennedy Tower - Torre A - Sala 1201 - Cep: 88101-020.",
            fr: "Adresse : Av. Marechal Castelo Branco, 65 - Campinas - São José/SC - Ed. Kennedy Tower - Torre A - Sala 1201 - Cep: 88101-020.",
          },
        ],
      },
    ],
  },
  {
    title: {
      pt: "Alterações",
      es: "Cambios",
      en: "Changes",
      fr: "Modifications",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Esta Política poderá ser atualizada periodicamente para refletir melhorias em nossos processos de privacidade ou mudanças legislativas. Recomendamos a consulta regular a este documento.",
          es: "Esta Política podrá ser actualizada periódicamente para reflejar mejoras en nuestros procesos de privacidad o cambios legislativos. Recomendamos la consulta regular de este documento.",
          en: "This Policy may be updated periodically to reflect improvements in our privacy processes or legislative changes. We recommend consulting this document regularly.",
          fr: "La présente Politique pourra être mise à jour périodiquement afin de refléter les améliorations de nos processus de confidentialité ou les évolutions législatives. Nous vous recommandons de consulter régulièrement ce document.",
        },
      },
    ],
  },
]
