import { Lang } from "../lib/i18n"
import { PolicySection } from "./legal-content"

// Conteúdo dos Termos de Serviço — exibido em TermsPage.
// Texto oficial nos 4 idiomas do site. As seções são numeradas automaticamente
// na renderização, então os títulos aqui não levam número.

export const termsUpdatedAt: Record<Lang, string> = {
  pt: "16 de abril de 2026",
  es: "16 de abril de 2026",
  en: "April 16, 2026",
  fr: "16 avril 2026",
}

export const termsSections: PolicySection[] = [
  {
    title: {
      pt: "Aceitação dos Termos",
      es: "Aceptación de los Términos",
      en: "Acceptance of Terms",
      fr: "Acceptation des Conditions",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Ao acessar e utilizar este site, você declara que leu, compreendeu e concorda com estes Termos de Serviço. Caso não concorde com qualquer condição aqui estabelecida, recomendamos que não utilize este site. Estes Termos aplicam-se exclusivamente ao uso deste site institucional e não se estendem às soluções, sistemas e serviços da Jtech, que são regidos por contratos específicos de prestação de serviço e licenciamento.",
          es: "Al acceder y utilizar este sitio, usted declara que ha leído, comprendido y aceptado estos Términos de Servicio. Si no está de acuerdo con alguna de las condiciones aquí establecidas, le recomendamos que no utilice este sitio. Estos Términos se aplican exclusivamente al uso de este sitio institucional y no se extienden a las soluciones, sistemas y servicios de Jtech, que se rigen por contratos específicos de prestación de servicios y licenciamiento.",
          en: "By accessing and using this website, you declare that you have read, understood and agree to these Terms of Service. If you do not agree with any condition set out herein, we recommend that you do not use this website. These Terms apply exclusively to the use of this institutional website and do not extend to Jtech’s solutions, systems and services, which are governed by specific service and licensing agreements.",
          fr: "En accédant à ce site et en l’utilisant, vous déclarez avoir lu, compris et accepté les présentes Conditions de Service. Si vous n’acceptez pas l’une des conditions énoncées ici, nous vous recommandons de ne pas utiliser ce site. Les présentes Conditions s’appliquent exclusivement à l’utilisation de ce site institutionnel et ne s’étendent pas aux solutions, systèmes et services de Jtech, régis par des contrats spécifiques de prestation de services et de licence.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Uso do Site",
      es: "Uso del Sitio",
      en: "Use of the Website",
      fr: "Utilisation du Site",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "O usuário compromete-se a utilizar este site de forma lícita, ética e em conformidade com a legislação vigente, abstendo-se de:",
          es: "El usuario se compromete a utilizar este sitio de forma lícita, ética y conforme a la legislación vigente, absteniéndose de:",
          en: "The user undertakes to use this website in a lawful and ethical manner and in compliance with applicable law, refraining from:",
          fr: "L’utilisateur s’engage à utiliser ce site de manière licite, éthique et conforme à la législation en vigueur, en s’abstenant de :",
        },
      },
      {
        type: "ul",
        items: [
          {
            text: {
              pt: "Violar qualquer norma legal ou regulatória aplicável;",
              es: "Violar cualquier norma legal o regulatoria aplicable;",
              en: "Violating any applicable legal or regulatory rule;",
              fr: "Enfreindre toute norme légale ou réglementaire applicable ;",
            },
          },
          {
            text: {
              pt: "Infringir direitos de propriedade intelectual de terceiros;",
              es: "Infringir derechos de propiedad intelectual de terceros;",
              en: "Infringing third-party intellectual property rights;",
              fr: "Porter atteinte aux droits de propriété intellectuelle de tiers ;",
            },
          },
          {
            text: {
              pt: "Inserir ou disseminar conteúdo ilícito, ofensivo, prejudicial ou que contenha vírus;",
              es: "Insertar o difundir contenido ilícito, ofensivo, perjudicial o que contenga virus;",
              en: "Uploading or disseminating unlawful, offensive or harmful content, or content containing viruses;",
              fr: "Insérer ou diffuser des contenus illicites, offensants, préjudiciables ou contenant des virus ;",
            },
          },
          {
            text: {
              pt: "Comprometer a segurança, estabilidade ou o pleno funcionamento da plataforma.",
              es: "Comprometer la seguridad, estabilidad o el pleno funcionamiento de la plataforma.",
              en: "Compromising the security, stability or full operation of the platform.",
              fr: "Compromettre la sécurité, la stabilité ou le bon fonctionnement de la plateforme.",
            },
          },
        ],
      },
    ],
  },
  {
    title: {
      pt: "Propriedade Intelectual",
      es: "Propiedad Intelectual",
      en: "Intellectual Property",
      fr: "Propriété Intellectuelle",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Todo o conteúdo disponível neste site — incluindo textos, imagens, gráficos, marcas, logotipos, interfaces, vídeos e códigos — é de propriedade exclusiva da Jtech ou de seus licenciadores, estando protegido pelas leis brasileiras e internacionais de propriedade intelectual. É vedada a reprodução, distribuição, modificação ou utilização desse conteúdo sem autorização prévia, expressa e por escrito da Jtech.",
          es: "Todo el contenido disponible en este sitio —incluidos textos, imágenes, gráficos, marcas, logotipos, interfaces, vídeos y códigos— es de propiedad exclusiva de Jtech o de sus licenciantes, y está protegido por las leyes brasileñas e internacionales de propiedad intelectual. Queda prohibida la reproducción, distribución, modificación o utilización de dicho contenido sin autorización previa, expresa y por escrito de Jtech.",
          en: "All content available on this website — including texts, images, graphics, trademarks, logos, interfaces, videos and code — is the exclusive property of Jtech or its licensors and is protected by Brazilian and international intellectual property laws. Reproduction, distribution, modification or use of this content without Jtech’s prior express written authorization is prohibited.",
          fr: "L’ensemble du contenu disponible sur ce site — y compris les textes, images, graphiques, marques, logos, interfaces, vidéos et codes — est la propriété exclusive de Jtech ou de ses concédants de licence et est protégé par les lois brésiliennes et internationales sur la propriété intellectuelle. Toute reproduction, distribution, modification ou utilisation de ce contenu sans l’autorisation préalable, expresse et écrite de Jtech est interdite.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Informações e Conteúdo",
      es: "Información y Contenido",
      en: "Information and Content",
      fr: "Informations et Contenu",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "As informações disponibilizadas neste site possuem caráter meramente informativo e institucional. Embora a Jtech dedique esforços constantes para manter as informações atualizadas e precisas, não há garantia de que o conteúdo esteja permanentemente completo ou livre de erros pontuais. O conteúdo aqui exposto não constitui aconselhamento técnico, regulatório, jurídico ou fiscal, devendo sua aplicação considerar as particularidades e normativas de cada organização.",
          es: "La información disponible en este sitio tiene carácter meramente informativo e institucional. Aunque Jtech dedica esfuerzos constantes para mantener la información actualizada y precisa, no se garantiza que el contenido esté permanentemente completo o libre de errores puntuales. El contenido aquí expuesto no constituye asesoramiento técnico, regulatorio, jurídico ni fiscal, y su aplicación debe considerar las particularidades y normativas de cada organización.",
          en: "The information provided on this website is merely informative and institutional in nature. Although Jtech makes ongoing efforts to keep the information up to date and accurate, there is no guarantee that the content is permanently complete or free of occasional errors. The content presented here does not constitute technical, regulatory, legal or tax advice, and its application must take into account the particularities and regulations of each organization.",
          fr: "Les informations mises à disposition sur ce site ont un caractère purement informatif et institutionnel. Bien que Jtech s’efforce en permanence de maintenir les informations à jour et exactes, il n’est pas garanti que le contenu soit en permanence complet ou exempt d’erreurs ponctuelles. Le contenu présenté ici ne constitue pas un conseil technique, réglementaire, juridique ou fiscal, et son application doit tenir compte des particularités et des réglementations propres à chaque organisation.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Links para Sites de Terceiros",
      es: "Enlaces a Sitios de Terceros",
      en: "Links to Third-Party Websites",
      fr: "Liens vers des Sites Tiers",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Este site pode conter links para sites de terceiros visando a conveniência do usuário. A Jtech não possui controle sobre tais portais e não se responsabiliza pelos conteúdos, políticas de privacidade ou práticas de terceiros. A navegação em sites externos é de inteira responsabilidade do usuário.",
          es: "Este sitio puede contener enlaces a sitios de terceros para la conveniencia del usuario. Jtech no tiene control sobre dichos portales y no se responsabiliza por los contenidos, políticas de privacidad o prácticas de terceros. La navegación en sitios externos es de entera responsabilidad del usuario.",
          en: "This website may contain links to third-party websites for the user’s convenience. Jtech has no control over such portals and is not responsible for the content, privacy policies or practices of third parties. Browsing external websites is the user’s sole responsibility.",
          fr: "Ce site peut contenir des liens vers des sites tiers pour la commodité de l’utilisateur. Jtech n’exerce aucun contrôle sur ces portails et décline toute responsabilité quant aux contenus, politiques de confidentialité ou pratiques de tiers. La navigation sur des sites externes relève de l’entière responsabilité de l’utilisateur.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Limitação de Responsabilidade",
      es: "Limitación de Responsabilidad",
      en: "Limitation of Liability",
      fr: "Limitation de Responsabilité",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "A Jtech não se responsabiliza por danos diretos ou indiretos decorrentes:",
          es: "Jtech no se responsabiliza por daños directos o indirectos derivados:",
          en: "Jtech is not liable for direct or indirect damages arising from:",
          fr: "Jtech décline toute responsabilité pour les dommages directs ou indirects résultant :",
        },
      },
      {
        type: "ul",
        items: [
          {
            text: {
              pt: "Do uso ou da incapacidade de uso deste site;",
              es: "Del uso o de la imposibilidad de uso de este sitio;",
              en: "The use of or inability to use this website;",
              fr: "De l’utilisation ou de l’impossibilité d’utiliser ce site ;",
            },
          },
          {
            text: {
              pt: "De eventuais indisponibilidades técnicas, interrupções ou falhas de conexão;",
              es: "De eventuales indisponibilidades técnicas, interrupciones o fallos de conexión;",
              en: "Any technical unavailability, interruptions or connection failures;",
              fr: "D’éventuelles indisponibilités techniques, interruptions ou défaillances de connexion ;",
            },
          },
          {
            text: {
              pt: "De decisões tomadas com base nas informações disponibilizadas no site.",
              es: "De decisiones tomadas con base en la información disponible en el sitio.",
              en: "Decisions made based on the information provided on the website.",
              fr: "De décisions prises sur la base des informations mises à disposition sur le site.",
            },
          },
        ],
      },
      {
        type: "p",
        text: {
          pt: "O uso das informações para fins estratégicos ou operacionais é de inteira responsabilidade do usuário.",
          es: "El uso de la información para fines estratégicos u operativos es de entera responsabilidad del usuario.",
          en: "The use of this information for strategic or operational purposes is the user’s sole responsibility.",
          fr: "L’utilisation des informations à des fins stratégiques ou opérationnelles relève de l’entière responsabilité de l’utilisateur.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Modificações dos Termos",
      es: "Modificaciones de los Términos",
      en: "Changes to the Terms",
      fr: "Modification des Conditions",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "A Jtech reserva-se o direito de atualizar estes Termos de Serviço a qualquer momento, mediante publicação da nova versão no site. Recomenda-se a consulta periódica deste documento. O uso contínuo do site após as alterações implica a aceitação automática dos novos termos.",
          es: "Jtech se reserva el derecho de actualizar estos Términos de Servicio en cualquier momento, mediante la publicación de la nueva versión en el sitio. Se recomienda la consulta periódica de este documento. El uso continuado del sitio tras las modificaciones implica la aceptación automática de los nuevos términos.",
          en: "Jtech reserves the right to update these Terms of Service at any time by publishing the new version on the website. Periodic review of this document is recommended. Continued use of the website after such changes implies automatic acceptance of the new terms.",
          fr: "Jtech se réserve le droit de mettre à jour les présentes Conditions de Service à tout moment, par la publication de la nouvelle version sur le site. Il est recommandé de consulter régulièrement ce document. La poursuite de l’utilisation du site après les modifications vaut acceptation automatique des nouvelles conditions.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Privacidade e Proteção de Dados",
      es: "Privacidad y Protección de Datos",
      en: "Privacy and Data Protection",
      fr: "Confidentialité et Protection des Données",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "O tratamento de dados pessoais realizado através deste site (como em formulários de contato) segue rigorosamente a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Para mais detalhes sobre como coletamos e protegemos seus dados, consulte nossa {link}.",
          es: "El tratamiento de datos personales realizado a través de este sitio (como en los formularios de contacto) cumple rigurosamente la Ley General de Protección de Datos de Brasil (Ley nº 13.709/2018). Para más detalles sobre cómo recopilamos y protegemos sus datos, consulte nuestra {link}.",
          en: "The processing of personal data carried out through this website (such as in contact forms) strictly follows the Brazilian General Data Protection Law (Law No. 13,709/2018). For more details on how we collect and protect your data, see our {link}.",
          fr: "Le traitement des données personnelles effectué via ce site (notamment dans les formulaires de contact) respecte rigoureusement la Loi générale brésilienne sur la protection des données (Loi nº 13.709/2018). Pour plus de détails sur la manière dont nous collectons et protégeons vos données, consultez notre {link}.",
        },
        link: {
          route: "privacy",
          label: {
            pt: "Política de Privacidade",
            es: "Política de Privacidad",
            en: "Privacy Policy",
            fr: "Politique de Confidentialité",
          },
        },
      },
    ],
  },
  {
    title: {
      pt: "Lei Aplicável e Foro",
      es: "Ley Aplicable y Fuero",
      en: "Governing Law and Jurisdiction",
      fr: "Loi Applicable et Juridiction Compétente",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São José/SC para dirimir quaisquer controvérsias oriundas deste documento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.",
          es: "Estos Términos se rigen por las leyes de la República Federativa de Brasil. Se elige el fuero de la comarca de São José/SC para dirimir cualquier controversia derivada de este documento, con renuncia expresa a cualquier otro, por más privilegiado que sea.",
          en: "These Terms are governed by the laws of the Federative Republic of Brazil. The courts of the judicial district (comarca) of São José/SC are hereby elected to settle any disputes arising from this document, with express waiver of any other, however privileged it may be.",
          fr: "Les présentes Conditions sont régies par les lois de la République fédérative du Brésil. Le for de la circonscription judiciaire (comarca) de São José/SC est élu pour trancher tout litige découlant du présent document, avec renonciation expresse à tout autre, aussi privilégié soit-il.",
        },
      },
    ],
  },
  {
    title: {
      pt: "Contato",
      es: "Contacto",
      en: "Contact",
      fr: "Contact",
    },
    blocks: [
      {
        type: "p",
        text: {
          pt: "Em caso de dúvidas sobre estes Termos de Serviço, entre em contato com nosso departamento jurídico:",
          es: "En caso de dudas sobre estos Términos de Servicio, contacte con nuestro departamento jurídico:",
          en: "If you have any questions about these Terms of Service, contact our legal department:",
          fr: "Pour toute question concernant les présentes Conditions de Service, contactez notre service juridique :",
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
]
