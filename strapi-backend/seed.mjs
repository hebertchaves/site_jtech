/**
 * Jtech CMS - Seed Script (Strapi 5)
 *
 * Popula o Strapi com dados mock do frontend (posts, ebooks, autores, categorias).
 *
 * PRE-REQUISITOS:
 *   1. Strapi rodando em http://localhost:1337
 *   2. API Token com "Full access" criado em: Settings -> API Tokens
 *
 * USO:
 *   node seed.mjs --apitoken "SEU_API_TOKEN_AQUI"
 *
 * OPCOES:
 *   --apitoken  API Token Full Access (obrigatorio)
 *   --url       URL do Strapi (padrao: http://localhost:1337)
 *   --clean     Remove todos os dados antes de seeder (destrutivo)
 *
 * Como criar o API Token:
 *   1. Acesse http://localhost:1337/admin
 *   2. Settings -> API Tokens -> Create new API Token
 *   3. Name: seed-token | Type: Full access | Save
 *   4. Copie o token gerado e use com --apitoken
 */

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, arg, i, arr) => {
    if (arg.startsWith('--')) acc.push([arg.slice(2), arr[i + 1] ?? true])
    return acc
  }, [])
)

const BASE_URL  = args.url ?? 'http://localhost:1337'
const API_TOKEN = args.apitoken
const CLEAN     = args.clean === true || args.clean === 'true'

if (!API_TOKEN) {
  console.error(`
Uso: node seed.mjs --apitoken "SEU_TOKEN_AQUI"

Como obter o token:
  1. Acesse http://localhost:1337/admin
  2. Settings -> API Tokens -> Create new API Token
  3. Name: seed-token | Type: Full access | Save
  4. Copie o token gerado
`)
  process.exit(1)
}

// pt-BR é o locale base (id=1 na tabela i18n_locale).
// Conteúdo é criado em pt-BR e os demais idiomas (en, es, fr) são localizações opcionais via PUT.
const LOCALE_MAP  = { pt: 'pt-BR', en: 'en', es: 'es', fr: 'fr' }
const BASE_LOCALE = 'pt-BR'  // Locale base do Strapi (primeiro configurado)

// Seed Data

const AUTHORS = [
  { name: 'Equipe Jtech',    slug: 'equipe-jtech'   },
  { name: 'Joao Silva',      slug: 'joao-silva'     },
  { name: 'Maria Santos',    slug: 'maria-santos'   },
  { name: 'Carlos Oliveira', slug: 'carlos-oliveira'},
  { name: 'Ana Costa',       slug: 'ana-costa'      },
  { name: 'Pedro Almeida',   slug: 'pedro-almeida'  },
]

const CATEGORIES = [
  { slug: 'saneamento', translations: { pt: 'Saneamento',  en: 'Sanitation',    es: 'Saneamiento',     fr: 'Assainissement' } },
  { slug: 'tecnologia', translations: { pt: 'Tecnologia',  en: 'Technology',    es: 'Tecnologia',      fr: 'Technologie'    } },
  { slug: 'jtech',      translations: { pt: 'Jtech',       en: 'Jtech',         es: 'Jtech',           fr: 'Jtech'          } },
  { slug: 'novidades',  translations: { pt: 'Novidades',   en: 'News',          es: 'Novedades',       fr: 'Nouveautes'     } },
  { slug: 'automacao',  translations: { pt: 'Automacao',   en: 'Automation',    es: 'Automatizacion',  fr: 'Automatisation' } },
  { slug: 'iot',        translations: { pt: 'IoT',         en: 'IoT',           es: 'IoT',             fr: 'IoT'            } },
  { slug: 'seguranca',  translations: { pt: 'Seguranca',   en: 'Security',      es: 'Seguridad',       fr: 'Securite'       } },
]

const POSTS = [
  {
    slug: 'inovacao-sustentabilidade-saneamento',
    categorySlug: 'saneamento',
    authorSlug: 'equipe-jtech',
    publishedAt: '2026-03-20T12:00:00.000Z',
    readTime: 6,
    translations: {
      pt: {
        title: 'Inovacao e sustentabilidade',
        excerpt: 'Como a tecnologia da Jtech transforma o setor de saneamento com solucoes inovadoras e sustentaveis para gestao inteligente de residuos.',
        content: 'A inovacao e a sustentabilidade sao pilares fundamentais da Jtech. Nosso compromisso e desenvolver solucoes tecnologicas que nao apenas otimizem a gestao de saneamento, mas tambem contribuam para um futuro mais sustentavel.',
      },
      en: {
        title: 'Innovation and sustainability',
        excerpt: 'How Jtechs technology transforms the sanitation sector with innovative and sustainable solutions for intelligent waste management.',
        content: 'Innovation and sustainability are fundamental pillars of Jtech. Our commitment is to develop technological solutions that not only optimize sanitation management but also contribute to a more sustainable future.',
      },
      es: {
        title: 'Innovacion y sostenibilidad',
        excerpt: 'Como la tecnologia de Jtech transforma el sector de saneamento con soluciones innovadoras y sostenibles para gestion inteligente de residuos.',
        content: 'La innovacion y la sostenibilidad son pilares fundamentales de Jtech.',
      },
      fr: {
        title: 'Innovation et durabilite',
        excerpt: "Comment la technologie de Jtech transforme le secteur de l'assainissement avec des solutions innovantes et durables.",
        content: "L'innovation et la durabilite sont des piliers fondamentaux de Jtech.",
      },
    },
  },
  {
    slug: 'inteligencia-artificial-big-data-gestao-agua',
    categorySlug: 'tecnologia',
    authorSlug: 'equipe-jtech',
    publishedAt: '2026-03-22T12:00:00.000Z',
    readTime: 7,
    translations: {
      pt: {
        title: 'Artificial & Big Data',
        excerpt: 'Descubra como Inteligencia Artificial e Big Data revolucionam a gestao de agua, trazendo previsibilidade, eficiencia e controle inteligente dos recursos hidricos.',
        content: 'A aplicacao de Inteligencia Artificial e Big Data na gestao de agua representa uma revolucao no setor de saneamento.',
      },
      en: {
        title: 'Artificial Intelligence & Big Data',
        excerpt: 'Discover how Artificial Intelligence and Big Data revolutionize water management, bringing predictability, efficiency and intelligent control of water resources.',
        content: 'The application of Artificial Intelligence and Big Data in water management represents a revolution in the sanitation sector.',
      },
      es: {
        title: 'Inteligencia Artificial & Big Data',
        excerpt: 'Descubra como la Inteligencia Artificial y Big Data revolucionan la gestion del agua.',
        content: 'La aplicacion de Inteligencia Artificial y Big Data en la gestion del agua representa una revolucao en el sector.',
      },
      fr: {
        title: 'Intelligence Artificielle & Big Data',
        excerpt: "Decouvrez comment l'Intelligence Artificielle et le Big Data revolutionnent la gestion de l'eau.",
        content: "L'application de l'Intelligence Artificielle et du Big Data dans la gestion de l'eau represente une revolution.",
      },
    },
  },
  {
    slug: 'gestao-agua-inovacao-crise-hidrica',
    categorySlug: 'saneamento',
    authorSlug: 'equipe-jtech',
    publishedAt: '2026-03-24T12:00:00.000Z',
    readTime: 8,
    translations: {
      pt: {
        title: 'Gestao de Agua',
        excerpt: 'Como enfrentar a crise hidrica com gestao inteligente de agua: inovacao, tecnologia e praticas sustentaveis.',
        content: 'A gestao eficiente da agua tornou-se uma das prioridades mais criticas do seculo XXI. A Jtech desenvolveu o Sansys Water como resposta a essa necessidade urgente.',
      },
      en: {
        title: 'Water Management',
        excerpt: 'How to face the water crisis with intelligent water management: innovation, technology and sustainable practices.',
        content: 'Efficient water management has become one of the most critical priorities of the 21st century.',
      },
      es: {
        title: 'Gestion del Agua',
        excerpt: 'Como enfrentar la crisis hidrica con gestion inteligente del agua.',
        content: 'La gestion eficiente del agua se ha convertido en una de las prioridades mas criticas del siglo XXI.',
      },
      fr: {
        title: "Gestion de l'Eau",
        excerpt: "Comment faire face a la crise de l'eau avec une gestion intelligente.",
        content: "La gestion efficace de l'eau est devenue l'une des priorites les plus critiques du 21e siecle.",
      },
    },
  },
  {
    slug: 'automacao-industrial-tendencias-2026',
    categorySlug: 'tecnologia',
    authorSlug: 'joao-silva',
    publishedAt: '2026-01-15T12:00:00.000Z',
    readTime: 5,
    translations: {
      pt: {
        title: 'Automacao Industrial: Tendencias para 2026',
        excerpt: 'Descubra as principais tendencias que estao moldando o futuro da automacao industrial.',
        content: 'A automacao industrial esta passando por uma transformacao significativa, impulsionada por avancas tecnologicos e novas demandas de mercado.',
      },
      en: {
        title: 'Industrial Automation: Trends for 2026',
        excerpt: 'Discover the main trends shaping the future of industrial automation and how your company can prepare.',
        content: 'Industrial automation is undergoing a significant transformation, driven by technological advances and new market demands.',
      },
      es: {
        title: 'Automatizacion Industrial: Tendencias para 2026',
        excerpt: 'Descubra las principales tendencias que estan moldeando el futuro de la automatizacion industrial.',
        content: 'La automatizacion industrial esta experimentando una transformacion significativa.',
      },
      fr: {
        title: 'Automatisation Industrielle: Tendances pour 2026',
        excerpt: "Decouvrez les principales tendances qui facon l'avenir de l'automatisation industrielle.",
        content: "L'automatisation industrielle subit une transformation significative.",
      },
    },
  },
  {
    slug: 'industria-40-transformacao-digital',
    categorySlug: 'tecnologia',
    authorSlug: 'maria-santos',
    publishedAt: '2026-02-01T12:00:00.000Z',
    readTime: 7,
    translations: {
      pt: {
        title: 'Industria 4.0 e a Transformacao Digital',
        excerpt: 'Entenda como a Industria 4.0 esta revolucionando processos produtivos e criando novas oportunidades de negocio.',
        content: 'A Industria 4.0 representa uma nova era na manufatura, combinando tecnologias digitais, automacao e analise de dados.',
      },
      en: {
        title: 'Industry 4.0 and Digital Transformation',
        excerpt: 'Understand how Industry 4.0 is revolutionizing production processes and creating new business opportunities.',
        content: 'Industry 4.0 represents a new era in manufacturing, combining digital technologies, automation and data analysis.',
      },
      es: {
        title: 'Industria 4.0 y la Transformacion Digital',
        excerpt: 'Comprenda como la Industria 4.0 esta revolucionando los procesos productivos.',
        content: 'La Industria 4.0 representa una nueva era en la manufactura.',
      },
      fr: {
        title: 'Industrie 4.0 et Transformation Numerique',
        excerpt: "Comprenez comment l'Industrie 4.0 revolutionne les processus de production.",
        content: "L'Industrie 4.0 represente une nouvelle ere dans la fabrication.",
      },
    },
  },
  {
    slug: 'manutencao-preditiva-iot',
    categorySlug: 'saneamento',
    authorSlug: 'carlos-oliveira',
    publishedAt: '2026-02-10T12:00:00.000Z',
    readTime: 6,
    translations: {
      pt: {
        title: 'Manutencao Preditiva com IoT: Reduzindo Custos',
        excerpt: 'Saiba como a manutencao preditiva baseada em IoT pode reduzir custos operacionais.',
        content: 'A manutencao preditiva utiliza sensores IoT e analise de dados para prever falhas antes que elas ocorram.',
      },
      en: {
        title: 'Predictive Maintenance with IoT: Reducing Costs',
        excerpt: 'Learn how IoT-based predictive maintenance can reduce operational costs and increase equipment availability.',
        content: 'Predictive maintenance uses IoT sensors and data analysis to predict failures before they occur.',
      },
      es: {
        title: 'Mantenimiento Predictivo con IoT: Reduciendo Costos',
        excerpt: 'Sepa como el mantenimiento predictivo basado en IoT puede reducir costos operacionales.',
        content: 'El mantenimiento predictivo utiliza sensores IoT y analisis de datos para predecir fallas.',
      },
      fr: {
        title: "Maintenance Predictive avec IoT: Reduire les Couts",
        excerpt: "Decouvrez comment la maintenance predictive basee sur l'IoT peut reduire les couts operationnels.",
        content: "La maintenance predictive utilise des capteurs IoT pour predire les pannes avant qu'elles surviennent.",
      },
    },
  },
  {
    slug: 'jtech-lanca-design-system-sansys',
    categorySlug: 'jtech',
    authorSlug: 'ana-costa',
    publishedAt: '2026-02-20T12:00:00.000Z',
    readTime: 4,
    translations: {
      pt: {
        title: 'Jtech lanca o DSS - Design System Sansys',
        excerpt: 'Conheca o novo Design System Sansys, uma solucao completa para padronizacao e escalabilidade de interfaces digitais.',
        content: 'O Design System Sansys (DSS) e a mais recente inovacao da Jtech, oferecendo componentes reutilizaveis e documentacao completa.',
      },
      en: {
        title: 'Jtech launches DSS - Design System Sansys',
        excerpt: 'Meet the new Design System Sansys, a complete solution for standardization and scalability of digital interfaces.',
        content: "The Design System Sansys (DSS) is Jtech's latest innovation, offering reusable components and complete documentation.",
      },
      es: {
        title: 'Jtech lanza el DSS - Design System Sansys',
        excerpt: 'Conozca el nuevo Design System Sansys, una solucion completa para estandarizacion de interfaces digitales.',
        content: 'El Design System Sansys (DSS) es la innovacion mas reciente de Jtech.',
      },
      fr: {
        title: 'Jtech lance le DSS - Design System Sansys',
        excerpt: 'Decouvrez le nouveau Design System Sansys, une solution complete pour la standardisation des interfaces numeriques.',
        content: 'Le Design System Sansys (DSS) est la derniere innovation de Jtech.',
      },
    },
  },
  {
    slug: 'ia-transformacao-saneamento',
    categorySlug: 'saneamento',
    authorSlug: 'pedro-almeida',
    publishedAt: '2026-02-25T12:00:00.000Z',
    readTime: 8,
    translations: {
      pt: {
        title: 'IA como ferramenta de transformacao no saneamento',
        excerpt: 'Inteligencia Artificial revoluciona a gestao de recursos hidricos e tratamento de efluentes.',
        content: 'A aplicacao de Inteligencia Artificial no setor de saneamento basico permite otimizar processos de tratamento de agua e esgoto.',
      },
      en: {
        title: 'AI as a transformation tool in sanitation',
        excerpt: 'Artificial Intelligence revolutionizes water resource management and effluent treatment.',
        content: 'The application of Artificial Intelligence in the basic sanitation sector allows optimizing water and sewage treatment processes.',
      },
      es: {
        title: 'IA como herramienta de transformacion en saneamiento',
        excerpt: 'La Inteligencia Artificial revoluciona la gestion de recursos hidricos.',
        content: 'La aplicacion de Inteligencia Artificial en el sector de saneamiento basico permite optimizar procesos.',
      },
      fr: {
        title: "L'IA comme outil de transformation dans l'assainissement",
        excerpt: "L'Intelligence Artificielle revolutionne la gestion des ressources en eau.",
        content: "L'application de l'Intelligence Artificielle dans le secteur de l'assainissement permet d'optimiser les processus.",
      },
    },
  },
  {
    slug: 'novidades-primeiro-semestre-2026',
    categorySlug: 'novidades',
    authorSlug: 'equipe-jtech',
    publishedAt: '2026-03-01T12:00:00.000Z',
    readTime: 5,
    translations: {
      pt: {
        title: 'Novidades para o 1o semestre de 2026',
        excerpt: 'Confira as principais inovacoes e lancamentos que a Jtech preparou para os proximos meses.',
        content: 'O primeiro semestre de 2026 promete grandes avancas para a Jtech e seus clientes, com novas integracoes de sistemas e expansao de solucoes para cidades inteligentes.',
      },
      en: {
        title: 'News for the 1st half of 2026',
        excerpt: 'Check out the main innovations and launches that Jtech has prepared for the coming months.',
        content: 'The first half of 2026 promises major advances for Jtech and its clients, including new system integrations and expansion of smart city solutions.',
      },
      es: {
        title: 'Novedades para el 1er semestre de 2026',
        excerpt: 'Consulte las principales innovaciones y lanzamientos que Jtech ha preparado para los proximos meses.',
        content: 'El primer semestre de 2026 promete grandes avances para Jtech y sus clientes.',
      },
      fr: {
        title: 'Nouveautes pour le 1er semestre 2026',
        excerpt: 'Decouvrez les principales innovations et lancements que Jtech a prepares pour les prochains mois.',
        content: 'Le premier semestre 2026 promet des avancees majeures pour Jtech et ses clients.',
      },
    },
  },
]

const EBOOKS = [
  {
    slug: 'guia-completo-automacao-industrial',
    category: 'Automacao',
    pages: 45,
    ctaType: 'DIRECT_DOWNLOAD',
    downloadUrl: null,
    translations: {
      pt: { title: 'Guia Completo de Automacao Industrial', description: 'Um guia abrangente sobre automacao industrial, desde conceitos basicos ate implementacoes avancadas.', content: 'Este e-book oferece uma visao completa sobre automacao industrial, cobrindo tecnologias, metodologias e casos de uso praticos.' },
      en: { title: 'Complete Guide to Industrial Automation', description: 'A comprehensive guide to industrial automation, from basic concepts to advanced implementations.', content: 'This e-book offers a complete view of industrial automation, covering technologies, methodologies and practical use cases.' },
      es: { title: 'Guia Completa de Automatizacion Industrial', description: 'Una guia completa sobre automatizacion industrial, desde conceptos basicos hasta implementaciones avanzadas.', content: 'Este e-book oferece uma visao completa sobre automatizacion industrial.' },
      fr: { title: "Guide Complet de l'Automatisation Industrielle", description: "Un guide complet sur l'automatisation industrielle, des concepts de base aux implementations avancees.", content: "Cet e-book offre une vue complete de l'automatisation industrielle." },
    },
  },
  {
    slug: 'iot-industrial-pratico',
    category: 'IoT',
    pages: 38,
    ctaType: 'DIRECT_DOWNLOAD',
    downloadUrl: null,
    translations: {
      pt: { title: 'IoT Industrial na Pratica', description: 'Aprenda a implementar solucoes IoT em ambientes industriais com casos reais e melhores praticas.', content: 'Descubra como implementar IoT industrial de forma eficaz, com exemplos praticos e arquiteturas de referencia.' },
      en: { title: 'Industrial IoT in Practice', description: 'Learn to implement IoT solutions in industrial environments with real cases and best practices.', content: 'Discover how to effectively implement industrial IoT, with practical examples and reference architectures.' },
      es: { title: 'IoT Industrial en la Practica', description: 'Aprenda a implementar soluciones IoT em ambientes industriais com casos reais.', content: 'Descubra como implementar IoT industrial de forma eficaz.' },
      fr: { title: 'IoT Industriel en Pratique', description: 'Apprenez a implementer des solutions IoT dans des environnements industriels.', content: "Decouvrez comment mettre en oeuvre efficacement l'IoT industriel." },
    },
  },
  {
    slug: 'seguranca-cibernetica-industrial',
    category: 'Seguranca',
    pages: 52,
    ctaType: 'DIRECT_DOWNLOAD',
    downloadUrl: null,
    translations: {
      pt: { title: 'Seguranca Cibernetica Industrial', description: 'Proteja seus sistemas industriais contra ameacas ciberneticas com estrategias e ferramentas adequadas.', content: 'A seguranca cibernetica e essencial para proteger infraestruturas criticas.' },
      en: { title: 'Industrial Cybersecurity', description: 'Protect your industrial systems against cyber threats with appropriate strategies and tools.', content: 'Cybersecurity is essential to protect critical infrastructure.' },
      es: { title: 'Seguridad Cibernetica Industrial', description: 'Proteja sus sistemas industriales contra amenazas ciberneticas.', content: 'La seguridad cibernetica es esencial para proteger infraestructuras criticas.' },
      fr: { title: 'Cybersecurite Industrielle', description: 'Protegez vos systemes industriels contre les menaces cybernetiques.', content: 'La cybersecurite est essentielle pour proteger les infrastructures critiques.' },
    },
  },
]

// ─── HTTP helpers (Strapi 5 Content API with API Token) ───────────────────────

async function apiCall(method, path, body) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`,
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()

  if (text.trimStart().startsWith('<')) {
    throw new Error(`${method} ${path} -> got HTML (route not found). Status: ${res.status}`)
  }

  let json
  try {
    json = JSON.parse(text)
  } catch (e) {
    throw new Error(`${method} ${path} -> invalid JSON: ${text.substring(0, 200)}`)
  }

  if (!res.ok) {
    const msg = json?.error?.message ?? text.substring(0, 300)
    throw new Error(`${method} ${path} -> ${res.status}: ${msg}`)
  }

  return json
}

const get  = (path)       => apiCall('GET',    path, null)
const post = (path, body) => apiCall('POST',   path, body)
const put  = (path, body) => apiCall('PUT',    path, body)
const del  = (path)       => apiCall('DELETE', path, null)

// Strapi 5 Content API response format:
// List:   { data: [...], meta: { pagination: {} } }
// Single: { data: { id, documentId, ...attributes }, meta: {} }
// Relations use documentId (string)

async function findMany(collection, qs = '') {
  const url = qs ? `/api/${collection}?${qs}` : `/api/${collection}`
  const res = await get(url)
  return res?.data ?? []
}

async function createOne(collection, data, locale = null) {
  const url = locale ? `/api/${collection}?locale=${locale}` : `/api/${collection}`
  const res = await post(url, { data })
  return res?.data
}

async function deleteOne(collection, documentId) {
  return del(`/api/${collection}/${documentId}`)
}

async function addLocalization(collection, documentId, data, locale) {
  // In Strapi 5, add locale via PUT on the document with locale query param
  const { locale: _locale, ...rest } = data
  const url = `/api/${collection}/${documentId}?locale=${locale}`
  const res = await put(url, { data: rest })
  return res?.data
}

// ─── Clean ────────────────────────────────────────────────────────────────────

async function cleanAll() {
  console.log('\nLimpando dados existentes...')

  for (const col of ['posts', 'ebooks', 'categories']) {
    try {
      // Query in base locale (pt-BR) to get all documents (deleting by documentId removes all locales)
      const items = await findMany(col, 'pagination[limit]=100&locale=pt-BR')
      for (const item of items) {
        await deleteOne(col, item.documentId)
      }
      console.log(`  ${items.length} ${col} removidos`)
    } catch (e) {
      console.warn(`  Erro ao limpar ${col}: ${e.message}`)
    }
  }
  // Authors have no i18n
  try {
    const items = await findMany('authors', 'pagination[limit]=100')
    for (const item of items) {
      await deleteOne('authors', item.documentId)
    }
    console.log(`  ${items.length} authors removidos`)
  } catch (e) {
    console.warn(`  Erro ao limpar authors: ${e.message}`)
  }
}

// ─── Authors ──────────────────────────────────────────────────────────────────

async function seedAuthors() {
  console.log('\nCriando autores...')
  const map = {}  // slug -> documentId

  for (const author of AUTHORS) {
    const existing = await findMany('authors',
      `filters[slug][$eq]=${encodeURIComponent(author.slug)}&locale=${BASE_LOCALE}`)

    if (existing.length > 0) {
      map[author.slug] = existing[0].documentId
      console.log(`  (ja existe) ${author.name}`)
      continue
    }

    const created = await createOne('authors', {
      name: author.name,
      slug: author.slug,
    }, BASE_LOCALE)
    map[author.slug] = created.documentId
    console.log(`  + ${author.name}`)
  }

  return map
}

// ─── Categories ───────────────────────────────────────────────────────────────

async function seedCategories() {
  console.log('\nCriando categorias...')
  const map = {}  // slug -> documentId

  for (const cat of CATEGORIES) {
    // Check if base (pt-BR) exists
    const existing = await findMany('categories',
      `filters[slug][$eq]=${encodeURIComponent(cat.slug)}&locale=pt-BR`)

    let docId
    if (existing.length > 0) {
      docId = existing[0].documentId
      map[cat.slug] = docId
      console.log(`  (ja existe) ${cat.translations.pt}`)
    } else {
      // Create base in pt-BR (locale base)
      const created = await createOne('categories', {
        name: cat.translations.pt,
        slug: cat.slug,
      })
      docId = created.documentId
      map[cat.slug] = docId
      console.log(`  + ${cat.translations.pt} [pt-BR]`)
    }

    // Add localizations: en, es, fr (skip pt — it's the base)
    for (const [lang, name] of Object.entries(cat.translations)) {
      if (lang === 'pt') continue
      const strapiLocale = LOCALE_MAP[lang]
      try {
        await addLocalization('categories', docId, {
          name,
          slug: cat.slug,
        }, strapiLocale)
        console.log(`    -> ${strapiLocale}: ${name}`)
      } catch (e) {
        console.warn(`    Falha ${strapiLocale}: ${e.message}`)
      }
    }
  }

  return map
}

// ─── Posts ────────────────────────────────────────────────────────────────────

async function seedPosts(authorMap, categoryMap) {
  console.log('\nCriando posts...')

  for (const post_ of POSTS) {
    // Check if base (pt-BR) exists
    const existing = await findMany('posts',
      `filters[slug][$eq]=${encodeURIComponent(post_.slug)}&locale=pt-BR`)

    let docId
    if (existing.length > 0) {
      docId = existing[0].documentId
      console.log(`  (ja existe) ${post_.translations.pt.title}`)
    } else {
      const pt = post_.translations.pt
      const created = await createOne('posts', {
        title:       pt.title,
        slug:        post_.slug,
        excerpt:     pt.excerpt,
        content:     pt.content,
        readTime:    post_.readTime,
        publishedAt: post_.publishedAt,
        category:    categoryMap[post_.categorySlug],
        author:      authorMap[post_.authorSlug],
      })
      docId = created.documentId
      console.log(`  + ${pt.title} [pt-BR]`)
    }

    // Add localizations: en, es, fr (skip pt — it's the base)
    for (const [lang, data] of Object.entries(post_.translations)) {
      if (lang === 'pt') continue
      const strapiLocale = LOCALE_MAP[lang]
      try {
        await addLocalization('posts', docId, {
          title:       data.title,
          slug:        post_.slug,
          excerpt:     data.excerpt,
          content:     data.content,
          readTime:    post_.readTime,
          publishedAt: post_.publishedAt,
        }, strapiLocale)
        console.log(`    -> ${strapiLocale}: ${data.title}`)
      } catch (e) {
        console.warn(`    Falha ${strapiLocale}: ${e.message}`)
      }
    }
  }
}

// ─── Ebooks ───────────────────────────────────────────────────────────────────

async function seedEbooks() {
  console.log('\nCriando ebooks...')

  for (const ebook of EBOOKS) {
    // Check if base (pt-BR) exists
    const existing = await findMany('ebooks',
      `filters[slug][$eq]=${encodeURIComponent(ebook.slug)}&locale=pt-BR`)

    let docId
    if (existing.length > 0) {
      docId = existing[0].documentId
      console.log(`  (ja existe) ${ebook.translations.pt.title}`)
    } else {
      const pt = ebook.translations.pt
      const created = await createOne('ebooks', {
        title:       pt.title,
        slug:        ebook.slug,
        description: pt.description,
        content:     pt.content,
        pages:       ebook.pages,
        category:    ebook.category,
        ctaType:     ebook.ctaType,
        downloadUrl: ebook.downloadUrl,
        publishedAt: new Date().toISOString(),
      })
      docId = created.documentId
      console.log(`  + ${pt.title} [pt-BR]`)
    }

    // Add localizations: en, es, fr (skip pt — it's the base)
    for (const [lang, data] of Object.entries(ebook.translations)) {
      if (lang === 'pt') continue
      const strapiLocale = LOCALE_MAP[lang]
      try {
        await addLocalization('ebooks', docId, {
          title:       data.title,
          slug:        ebook.slug,
          description: data.description,
          content:     data.content,
          pages:       ebook.pages,
          category:    ebook.category,
          publishedAt: new Date().toISOString(),
        }, strapiLocale)
        console.log(`    -> ${strapiLocale}: ${data.title}`)
      } catch (e) {
        console.warn(`    Falha ${strapiLocale}: ${e.message}`)
      }
    }
  }
}

// ─── Permissions note ─────────────────────────────────────────────────────────

function printPermissionsNote() {
  console.log(`
PERMISSOES DO ROLE PUBLIC:
  Para o frontend acessar o conteudo sem autenticacao, configure manualmente:
  1. Acesse: http://localhost:1337/admin
  2. Settings -> Roles -> Public
  3. Habilite "find" e "findOne" para: Author, Category, Post, Ebook
  4. Clique em Save
`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('===============================================')
  console.log('  Jtech CMS - Seed Script')
  console.log(`  Strapi: ${BASE_URL}`)
  console.log('===============================================')

  // Validate token by making a test request
  console.log('\nValidando API Token...')
  try {
    await get('/api/authors?pagination[limit]=1')
    console.log('API Token valido')
  } catch (e) {
    if (e.message.includes('403') || e.message.includes('401')) {
      console.error(`\nToken invalido ou sem permissao: ${e.message}`)
      console.error('Verifique se o token e do tipo "Full access"')
      process.exit(1)
    }
    // 404 or empty is fine — collection exists but no data yet
    console.log('API Token valido (colecao vazia)')
  }

  if (CLEAN) {
    await cleanAll()
  }

  const authorMap   = await seedAuthors()
  const categoryMap = await seedCategories()
  await seedPosts(authorMap, categoryMap)
  await seedEbooks()

  console.log('\n===============================================')
  console.log('  Seed concluido!')
  console.log(`  ${AUTHORS.length} autores`)
  console.log(`  ${CATEGORIES.length} categorias`)
  console.log(`  ${POSTS.length} posts (4 idiomas cada)`)
  console.log(`  ${EBOOKS.length} ebooks (4 idiomas cada)`)
  console.log('===============================================')

  printPermissionsNote()
}

main().catch(err => {
  console.error('\nSeed falhou:', err.message)
  process.exit(1)
})
