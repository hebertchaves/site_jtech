import { useState, useEffect, useRef } from "react"
import { Play, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Lang, t } from "../lib/i18n"
import { PreWhatsAppModal } from "../components/forms/PreWhatsAppModal"
import { Container } from "../components/layout/Container"
import { Button } from "../components/ui/button"
import { calculateBannerOffset } from "../lib/banner-alignment"
import { ScrollToTop } from "../components/ScrollToTop"
import { motion, AnimatePresence } from "motion/react"
import { LogoBySlug } from "../components/logos"

interface SolutionsPageProps {
  lang: Lang
}

function ImageWithFallback(props: any) {
  const [currentSrc, setCurrentSrc] = useState(props.src)
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  const handleError = () => {
    if (currentSrc.endsWith('.webp')) {
      setCurrentSrc(currentSrc.replace(/\.webp$/, '.png'))
    } else {
      setDidError(true)
    }
  }

  return didError ? (
    <div className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`} style={style}>
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={currentSrc} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}

// ─── Conteúdo detalhado por produto (PT) ─────────────────────────────────────

const LOREM_DESC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

interface ProductDetail {
  fullDescription: string
  benefitsTitle: string
  benefitsSubtitle: string
  benefits: { title: string; subtitle: string }[]
  functionalitiesTitle: string
  functionalities: string[]
  resultsTitle: string
  results: { metric: string; label: string; description: string }[]
  applicationsTitle: string
  applications: string[]
  ctaTitle: string
  ctaSubtitle: string
}

const LOREM_DETAIL: ProductDetail = {
  fullDescription: LOREM_DESC,
  benefitsTitle: 'Lorem ipsum dolor sit amet',
  benefitsSubtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  benefits: [
    { title: 'Lorem ipsum', subtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { title: 'Dolor sit amet', subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
    { title: 'Sed do eiusmod', subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Ut labore et dolore', subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.' },
  ],
  functionalitiesTitle: 'Principais funcionalidades',
  functionalities: [
    'Lorem ipsum dolor sit amet consectetur',
    'Adipiscing elit sed do eiusmod tempor',
    'Incididunt ut labore et dolore magna',
    'Ut enim ad minim veniam quis nostrud',
    'Exercitation ullamco laboris nisi ut',
    'Duis aute irure dolor in reprehenderit',
  ],
  resultsTitle: 'Resultados comprovados',
  results: [
    { metric: 'XX%', label: 'Lorem ipsum', description: 'Consectetur adipiscing elit sed do eiusmod tempor' },
    { metric: 'XXk', label: 'Dolor sit amet', description: 'Ut enim ad minim veniam quis nostrud exercitation' },
    { metric: 'XX/7', label: 'Sed eiusmod', description: 'Duis aute irure dolor in reprehenderit voluptate' },
  ],
  applicationsTitle: 'Aplicações',
  applications: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur', 'Adipiscing elit'],
  ctaTitle: 'Lorem ipsum dolor sit amet consectetur',
  ctaSubtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

const productDetails: Record<string, ProductDetail> = {
  'sansys-pay': LOREM_DETAIL,

  'sansys-waste': {
    fullDescription: 'O Sansys Waste é a solução inteligente para gestão de resíduos e gestão de concessões, projetada para oferecer controle completo sobre o ciclo de vida dos resíduos, desde a entrada até a destinação final, promovendo sustentabilidade e vantagem competitiva.',
    benefitsTitle: 'Solução inteligente para gestão de resíduos',
    benefitsSubtitle: 'Rastreabilidade total, eficiência operacional e conformidade ambiental',
    benefits: [
      { title: 'Padronização operacional', subtitle: 'Layout e processos unificados em toda a concessão.' },
      { title: 'Precisão no faturamento', subtitle: 'Maior controle sobre toneladas tratadas e redução de fraudes.' },
      { title: 'Integração com ERP', subtitle: 'Faturamento automático e relatórios de desempenho.' },
      { title: 'Visão completa', subtitle: 'Painéis de gestão e alertas inteligentes para tomada de decisão ágil.' },
    ],
    functionalitiesTitle: 'Principais funcionalidades',
    functionalities: [
      'Roteirização inteligente de coleta',
      'Rastreamento GPS de veículos',
      'Controle de pesagem e volumes',
      'Gestão de aterros e destinação',
      'Indicadores de sustentabilidade',
      'App para coletores e cidadãos',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: '30%', label: 'Redução de fraudes', description: 'Controle preciso sobre pesagem e volumes tratados' },
      { metric: '100%', label: 'Rastreabilidade', description: 'Do início ao fim do ciclo de vida dos resíduos' },
      { metric: '25%', label: 'Eficiência operacional', description: 'Com roteirização inteligente e processos padronizados' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Coleta urbana', 'Aterros sanitários', 'Reciclagem', 'Limpeza pública'],
    ctaTitle: 'Gestão inteligente de resíduos começa aqui',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys Waste pode transformar sua gestão de resíduos.',
  },

  'sansys-agency': {
    fullDescription: 'O Sansys Agency centraliza todos os canais de atendimento ao cliente em uma única plataforma. Gerencia solicitações, ordens de serviço, reclamações e histórico de interações, proporcionando atendimento de excelência e agilidade na resolução de demandas.',
    benefitsTitle: 'Solução omnichannel para autoatendimento',
    benefitsSubtitle: 'Conectividade, eficiência operacional e personalização',
    benefits: [
      { title: 'Plataforma multicanais', subtitle: 'WhatsApp, webchat, portal, app mobile e totens, todos integrados.' },
      { title: 'Consulta de dados em tempo real', subtitle: 'Histórico de consumo, faturas, débitos e solicitações.' },
      { title: 'Experiência consistente', subtitle: 'Não há necessidade de repetir informações entre diferentes canais.' },
      { title: 'Personalização de experiência', subtitle: 'Configuração de cores, imagens e recursos de acordo com a concessionária.' },
    ],
    functionalitiesTitle: 'Principais funcionalidades',
    functionalities: [
      'Atendimento multicanal (WhatsApp, redes sociais, telefone, chat)',
      'Gestão de solicitações e ordens de serviço',
      'Sistema de protocolo e acompanhamento',
      'Histórico completo de interações',
      'Dashboard de performance e SLA',
      'Redução da demanda no atendimento presencial',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: '40%', label: 'Redução de chamadas presenciais', description: 'Autoatendimento eficiente em múltiplos canais' },
      { metric: '95%', label: 'Satisfação dos clientes', description: 'Experiência consistente e personalizada' },
      { metric: '24/7', label: 'Disponibilidade', description: 'Atendimento contínuo sem interrupções' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Centrais de atendimento', 'Ouvidoria', 'SAC', 'Agências físicas e virtuais'],
    ctaTitle: 'Autoatendimento seguro e personalizado',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys Agency pode transformar sua gestão de relacionamento com o cliente.',
  },

  'sansys-hub': LOREM_DETAIL,

  'sansys-flow': {
    fullDescription: 'O Sansys Flow foi projetado para organizar fluxos operacionais, padronizar rotinas e garantir controle completo sobre cada etapa da operação. Ele transforma atividades dispersas em processos estruturados, aumentando a eficiência, reduzindo retrabalho e trazendo mais previsibilidade para a gestão.',
    benefitsTitle: 'Solução para automação de processos',
    benefitsSubtitle: 'Padronização de rotinas, aumento de eficiência e previsibilidade na gestão',
    benefits: [
      { title: 'Modelagem de fluxos personalizados', subtitle: 'Adaptação completa aos processos específicos de cada concessão.' },
      { title: 'Visibilidade em tempo real', subtitle: 'Acompanhamento de cada etapa dos processos.' },
      { title: 'Redução de gargalos', subtitle: 'Identificação rápida de atrasos e pontos críticos.' },
      { title: 'Integração com o ecossistema Sansys', subtitle: 'Conexão direta com operação, atendimento e faturamento.' },
    ],
    functionalitiesTitle: 'Principais funcionalidades',
    functionalities: [
      'Automação de tarefas',
      'Criação de fluxos operacionais',
      'Gestão de etapas e status',
      'Integração com operação',
      'Monitoramento de indicadores',
      'Padronização de rotinas',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: '35%', label: 'Redução de retrabalho', description: 'Com fluxos estruturados e padronizados' },
      { metric: '100%', label: 'Padronização', description: 'De processos em toda a concessão' },
      { metric: '50%', label: 'Mais previsibilidade', description: 'Na gestão de operações e entregas' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Concessionárias de saneamento', 'Autarquias públicas', 'Aterros sanitários', 'Operações de resíduos'],
    ctaTitle: 'Fluxos operacionais automatizados',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys Flow pode transformar sua gestão de processos.',
  },

  'sansys-reader': {
    fullDescription: 'O Sansys Reader moderniza o processo de leitura de hidrômetros com aplicativo mobile intuitivo. Oferece captura por foto/OCR, rotas otimizadas, modo offline, validação inteligente e sincronização automática, aumentando produtividade e precisão.',
    benefitsTitle: 'Solução mobile para leitura em campo',
    benefitsSubtitle: 'Leitura com precisão, gestão de equipes e inteligência de dados',
    benefits: [
      { title: 'Aplicativo mobile', subtitle: 'Compatível com Android, para uso online ou offline.' },
      { title: 'Reconhecimento óptico de caracteres (OCR)', subtitle: 'Para captura automática dos números do hidrômetro.' },
      { title: 'Integração com crítica de leitura com IA', subtitle: 'Para prevenção de erros e fraudes.' },
      { title: 'Dashboards de inteligência de dados', subtitle: 'Para análise de desempenho, consumo e padrões de uso.' },
    ],
    functionalitiesTitle: 'Principais funcionalidades',
    functionalities: [
      'Captura de leitura por foto com OCR',
      'Rotas otimizadas para leituristas',
      'Modo offline com sincronização automática',
      'Validação inteligente de leituras',
      'Registro de ocorrências em campo',
      'Dashboard de produtividade',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: '98%', label: 'Precisão de leitura', description: 'Com OCR e validação inteligente de dados' },
      { metric: '+30%', label: 'Produtividade em campo', description: 'Rotas otimizadas e app intuitivo' },
      { metric: '-60%', label: 'Erros de leitura', description: 'Com validação automática e IA integrada' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Leitura residencial', 'Leitura comercial', 'Gestão de rotas', 'Produtividade em campo'],
    ctaTitle: 'Medição e faturamento com mais agilidade',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys Reader pode modernizar o processo de leitura na sua concessionária.',
  },

  'sansys-gis': {
    fullDescription: 'O Sansys GIS integra dados geográficos à operação, transformando eventos técnicos em decisões mais rápidas, precisas e orientadas por contexto. Ele permite visualizar, analisar e gerenciar toda a infraestrutura e os impactos operacionais em tempo real, facilitando manutenções preventivas, corretivas e serviços de emergência.',
    benefitsTitle: 'Sistema de informação geográfica para gestão de ativos e infraestrutura',
    benefitsSubtitle: 'Gestão de eventos operacionais, previsibilidade e melhor experiência para o cliente',
    benefits: [
      { title: 'Centralização de dados', subtitle: 'Redes, clientes, ativos e ocorrências em um único ambiente.' },
      { title: 'Agilidade', subtitle: 'Identificação rápida de áreas afetadas por eventos operacionais.' },
      { title: 'Integração com o campo', subtitle: 'Otimizando a gestão de frotas e o direcionamento de equipes.' },
      { title: 'Apoio à tomada de decisão', subtitle: 'Análise espacial integrada a indicadores operacionais.' },
    ],
    functionalitiesTitle: 'Principais funcionalidades',
    functionalities: [
      'Mapeamento da rede',
      'Gestão de ativos (redes, válvulas, setores)',
      'Gestão de ocorrências',
      'Análise de impacto',
      'Integração com operação de campo',
      'Monitoramento e indicadores',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: '40%', label: 'Redução no tempo de resposta', description: 'A eventos adversos na operação' },
      { metric: '100%', label: 'Visibilidade da rede', description: 'Infraestrutura e ativos mapeados em tempo real' },
      { metric: '30%', label: 'Eficiência em manutenção', description: 'Preventiva e corretiva com análise espacial' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Manutenção preventiva', 'Manutenção corretiva', 'Serviços de emergência', 'Gestão de frotas'],
    ctaTitle: 'Resposta ágil a eventos adversos',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys GIS pode agilizar seu processo de resposta a eventos adversos na operação.',
  },

  'sansys-bi': LOREM_DETAIL,
}

// ─── Conteúdo detalhado por módulo (Sansys Water) ────────────────────────────

interface ModuleDetail {
  fullDescription: string
  benefitsTitle: string
  benefitsSubtitle: string
  benefits: { title: string; subtitle: string }[]
  functionalitiesTitle: string
  functionalities: string[]
  resultsTitle: string
  results: { metric: string; label: string; description: string }[]
  applicationsTitle: string
  applications: string[]
  ctaTitle: string
  ctaSubtitle: string
}

const LOREM_MODULE_DETAIL: ModuleDetail = {
  fullDescription: LOREM_DESC,
  benefitsTitle: 'Lorem ipsum dolor sit amet',
  benefitsSubtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  benefits: [
    { title: 'Lorem ipsum', subtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { title: 'Dolor sit amet', subtitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.' },
    { title: 'Sed do eiusmod', subtitle: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.' },
    { title: 'Ut labore et dolore', subtitle: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.' },
  ],
  functionalitiesTitle: 'Principais funcionalidades',
  functionalities: [
    'Lorem ipsum dolor sit amet consectetur',
    'Adipiscing elit sed do eiusmod tempor',
    'Incididunt ut labore et dolore magna',
    'Ut enim ad minim veniam quis nostrud',
    'Exercitation ullamco laboris nisi ut',
    'Duis aute irure dolor in reprehenderit',
    'In voluptate velit esse cillum dolore',
    'Excepteur sint occaecat cupidatat non',
    'Proident sunt in culpa qui officia deserunt',
  ],
  resultsTitle: 'Resultados comprovados',
  results: [
    { metric: 'XX%', label: 'Lorem ipsum', description: 'Consectetur adipiscing elit sed do eiusmod tempor' },
    { metric: 'XXk', label: 'Dolor sit amet', description: 'Ut enim ad minim veniam quis nostrud exercitation' },
    { metric: 'XX/7', label: 'Sed eiusmod', description: 'Duis aute irure dolor in reprehenderit voluptate' },
  ],
  applicationsTitle: 'Aplicações',
  applications: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur', 'Adipiscing elit'],
  ctaTitle: 'Lorem ipsum dolor sit amet consectetur',
  ctaSubtitle: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}

const moduleDetails: Record<string, ModuleDetail> = {
  'sansys-smart-meter': {
    fullDescription: 'O Sansys Smart Meter permite a leitura automática de medidores através de tecnologias IoT, oferecendo monitoramento em tempo real de consumo, detecção de vazamentos, gestão de fraudes e análise preditiva. Suporta múltiplos protocolos de comunicação e integração, proporcionando eficiência operacional e redução de perdas comerciais.',
    benefitsTitle: 'Medição inteligente para mais precisão, agilidade e controle.',
    benefitsSubtitle: 'Monitoramento em tempo real, eficiência operacional e redução de perdas comerciais.',
    benefits: [
      { title: 'Eliminação de leitura manual', subtitle: 'Leituras automáticas a cada 10 minutos.' },
      { title: 'Integração ao Sansys Water', subtitle: 'Maior controle operacional e apoio à tomada de decisões.' },
      { title: 'Tecnologia que funciona offline', subtitle: 'A comunicação via smartphones (IoT) dispensa infraestrutura cara, como GPRS ou LoRa.' },
      { title: 'Instalação simples e ampla compatibilidade', subtitle: 'A adoção causa impacto mínimo na rotina operacional.' },
    ],
    functionalitiesTitle: 'Principais funcionalidades',
    functionalities: [
      'Leitura automática remota (AMR/AMI)',
      'Monitoramento em tempo real de consumo',
      'Detecção automática de vazamentos e anomalias',
      'Suporte a múltiplos protocolos IoT (LoRaWAN, NB-IoT, GPRS)',
      'Alertas inteligentes e notificações',
      'Análise preditiva de consumo',
      'Dashboard de visualização de dados',
      'Integração com sistemas de billing',
      'Bateria com até 8 anos de duração',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: 'XX%', label: 'Redução de perdas', description: 'Com monitoramento e detecção de vazamentos em tempo real' },
      { metric: 'XXk', label: 'Leituras automáticas', description: 'Eliminando a necessidade de visitas presenciais' },
      { metric: 'XX%', label: 'Precisão de faturamento', description: 'Com validação inteligente e dados em tempo real' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Telemetria de água', 'Gestão de redes de distribuição', 'Controle de perdas', 'Detecção de fraudes'],
    ctaTitle: 'Transforme sua operação com tecnologia inteligente',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys Smart Meter pode eliminar a leitura manual e levar mais eficiência ao seu processo!',
  },

  'sansys-omnichannel': {
    fullDescription: 'O Sansys Omnichannel unifica WhatsApp, telefone, redes sociais, aplicativo, chatbot e outros canais em uma única plataforma. Mais agilidade, controle e eficiência para a equipe, enquanto o cliente tem uma experiência integrada e mais satisfatória.',
    benefitsTitle: 'Atendimento fluido, centralizado e eficiente.',
    benefitsSubtitle: 'Mais agilidade, clareza e satisfação para o cliente final.',
    benefits: [
      { title: 'Centralização de canais', subtitle: 'Todas as interações, WhatsApp, chat, telefone, app e redes sociais, em um único lugar.' },
      { title: 'Histórico completo do cliente', subtitle: 'Evite repetições e ofereça um atendimento mais inteligente com acesso a todo o contexto da solicitação.' },
      { title: 'Redução do tempo de atendimento', subtitle: 'Triagem automatizada e agilidade na resolução de problemas com encaminhamento correto.' },
      { title: 'Integração com o Sansys Water', subtitle: 'Conecte o atendimento aos módulos de OS, faturamento, cadastro e muito mais.' },
    ],
    functionalitiesTitle: 'Principais funcionalidades',
    functionalities: [
      'Interface unificada para todos os canais',
      'Integração com WhatsApp Business API',
      'Integração com todos os canais de atendimento',
      'Chatbot inteligente com IA conversacional',
      'Gestão de filas e distribuição automática',
      'CRM integrado com histórico completo',
      'Gravação e monitoramento de interações',
      'Análise de sentimento e satisfação',
      'Relatórios de performance e SLA',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: 'XX%', label: 'Redução no tempo de atendimento', description: 'Com triagem automatizada e canais unificados' },
      { metric: 'XX%', label: 'Satisfação dos clientes', description: 'Com experiência integrada e personalizada' },
      { metric: '24/7', label: 'Disponibilidade', description: 'Atendimento contínuo em todos os canais' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Central de atendimento', 'Suporte técnico', 'SAC', 'Ouvidoria'],
    ctaTitle: 'Transforme a experiência dos seus clientes',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys Omnichannel pode garantir mais agilidade, controle e satisfação no seu atendimento ao cliente.',
  },

  'sansys-bi': LOREM_MODULE_DETAIL,

  'sansys-critica-leitura': {
    fullDescription: 'O Sansys IA Crítica de Leitura utiliza inteligência artificial e deep learning para validar automaticamente leituras de medidores. Identifica inconsistências, medidores parados e outros problemas antes do faturamento. Aprende continuamente com padrões de consumo, reduzindo reclamações e custos operacionais.',
    benefitsTitle: 'Validação inteligente para medições mais seguras',
    benefitsSubtitle: 'Redução de erros, informação precisa e faturamento confiável',
    benefits: [
      { title: 'Prevenção de refaturamento', subtitle: 'Validação da medição antes do faturamento.' },
      { title: 'Análise baseada em dados', subtitle: 'Leitura baseada no histórico do cliente.' },
      { title: 'Redução de retrabalho', subtitle: 'Leituras suspeitas são sinalizadas automaticamente, para ajuste instantâneo, evitando necessidade de novas visitas.' },
      { title: 'Integração com o Sansys Water', subtitle: 'Garantindo que apenas informações validadas avancem no processo.' },
    ],
    functionalitiesTitle: 'Principais características',
    functionalities: [
      'Validação automática com IA',
      'Detecção de leituras inconsistentes',
      'Identificação de medidores parados',
      'Análise de tendências de consumo',
      'Aprendizado contínuo (machine learning)',
      'Alertas de anomalias em tempo real',
      'Priorização de releituras',
      'Redução de reclamações pós-faturamento',
      'Proteção da receita operacional',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: 'XX%', label: 'Redução de erros de leitura', description: 'Com validação automática por inteligência artificial' },
      { metric: 'XX%', label: 'Redução de reclamações', description: 'Com faturamento mais preciso e confiável' },
      { metric: 'XX%', label: 'Eficiência operacional', description: 'Com priorização inteligente de releituras' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Validação de leituras', 'Controle de qualidade', 'Redução de erros de faturamento', 'Otimização de rotas de leitura'],
    ctaTitle: 'Evite erros antes que virem refaturamento',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys IA Crítica de Leitura pode proporcionar medições mais seguras e faturamento confiável para sua concessionária.',
  },

  'sansys-antifraude': {
    fullDescription: 'O Sansys Antifraude utiliza algoritmos de machine learning e análise comportamental para identificar padrões suspeitos, fraudes e irregularidades em tempo real. Gera alertas automáticos, prioriza inspeções de campo e oferece ferramentas para gestão de fiscalização, reduzindo significativamente perdas comerciais.',
    benefitsTitle: 'Identificação e gestão de irregularidades no consumo de água',
    benefitsSubtitle: 'Redução de perdas com rastreabilidade completa e segurança jurídica.',
    benefits: [
      { title: 'Identificação automática de irregularidades', subtitle: 'Com base em padrões operacionais e dados históricos.' },
      { title: 'Priorização de inspeções', subtitle: 'Possíveis fraudes são classificadas conforme a probabilidade de irregularidades.' },
      { title: 'Segurança jurídica', subtitle: 'Registro de todo o ciclo da fraude, desde a identificação até a regularização.' },
      { title: 'Recuperação de receitas', subtitle: 'O sistema automatiza o cálculo de consumo retroativo, multas e demais encargos relativos à irregularidade encontrada.' },
    ],
    functionalitiesTitle: 'Principais características',
    functionalities: [
      'Detecção automática com machine learning',
      'Análise de padrões de consumo anômalo',
      'Identificação de ligações clandestinas',
      'Priorização inteligente de inspeções',
      'Gestão de ordens de fiscalização',
      'App mobile para equipes de campo',
      'Histórico e evidências digitais',
      'Recuperação de receita com mais agilidade',
      'Indicadores de recuperação de receita',
    ],
    resultsTitle: 'Resultados comprovados',
    // Valores a confirmar internamente
    results: [
      { metric: 'XX%', label: 'Redução de perdas comerciais', description: 'Com detecção automática e priorização de inspeções' },
      { metric: 'XX%', label: 'Agilidade na regularização', description: 'Com app mobile e gestão digital de fiscalização' },
      { metric: 'XX%', label: 'Recuperação de receita', description: 'Com cálculo retroativo automatizado' },
    ],
    applicationsTitle: 'Aplicações',
    applications: ['Combate a fraudes', 'Redução de perdas comerciais', 'Fiscalização de campo', 'Regularização cadastral'],
    ctaTitle: 'Identifique perdas antes que virem prejuízo',
    ctaSubtitle: 'Fale com nossos especialistas e descubra como o Sansys Antifraude pode ajudar sua concessionária a combater fraudes e recuperar receitas.',
  },
}

// ─── Componente principal ────────────────────────────────────────────────────

export function SolutionsPage({ lang }: SolutionsPageProps) {
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false)
  const [moduloIndex, setModuloIndex] = useState(0)
  const [bannerOffset, setBannerOffset] = useState(0)
  const [productIndex, setProductIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateOffset = () => setBannerOffset(calculateBannerOffset())
    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  // Navegar direto para um produto via ?produto= na URL
  useEffect(() => {
    const readProductParam = () => {
      const hash = window.location.hash
      const queryStart = hash.indexOf('?')
      if (queryStart === -1) return
      const params = new URLSearchParams(hash.slice(queryStart + 1))
      const slug = params.get('produto')
      if (!slug) return
      const idx = produtos.findIndex(p => p.slug === slug)
      if (idx !== -1) setProductIndex(idx)
    }
    readProductParam()
    window.addEventListener('hashchange', readProductParam)
    return () => window.removeEventListener('hashchange', readProductParam)
  }, [])

  // Navegar direto para um módulo via ?modulo= na URL
  useEffect(() => {
    const readModuloParam = () => {
      const hash = window.location.hash
      const queryStart = hash.indexOf('?')
      if (queryStart === -1) return
      const params = new URLSearchParams(hash.slice(queryStart + 1))
      const slug = params.get('modulo')
      if (!slug) return
      const idx = modulos.findIndex(m => m.slug === slug)
      if (idx === -1) return
      setProductIndex(0) // garantir que Water está selecionado
      setModuloIndex(idx)
      setTimeout(() => {
        document.getElementById('secao-modulos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
    readModuloParam()
    window.addEventListener('hashchange', readModuloParam)
    return () => window.removeEventListener('hashchange', readModuloParam)
  }, [])

  // Scroll programático do carrossel mobile
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector('.carousel-card')?.clientWidth || 0
      carouselRef.current.scrollTo({ left: productIndex * (cardWidth + 16), behavior: 'smooth' })
    }
  }, [productIndex])

  const produtos = [
    {
      slug: "sansys-water",
      name: "sansys water",
      title: t(lang, "solutions.water.title"),
      description: t(lang, "solutions.water.description"),
      badges: [t(lang, "solutions.badge.specialized"), t(lang, "solutions.badge.integration"), t(lang, "solutions.badge.saas"), t(lang, "solutions.badge.multiplatform")],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
    {
      slug: "sansys-pay",
      name: "sansys pay",
      title: t(lang, "solutions.pay.title"),
      description: t(lang, "solutions.pay.description"),
      badges: [t(lang, "solutions.pay.badge1"), t(lang, "solutions.pay.badge2"), t(lang, "solutions.pay.badge3"), t(lang, "solutions.pay.badge4")],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
    {
      slug: "sansys-waste",
      name: "sansys waste",
      title: t(lang, "solutions.waste.title"),
      description: t(lang, "solutions.waste.description"),
      badges: [t(lang, "solutions.waste.badge1"), t(lang, "solutions.waste.badge2"), t(lang, "solutions.waste.badge3"), t(lang, "solutions.waste.badge4")],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
    {
      slug: "sansys-agency",
      name: "sansys agency",
      title: t(lang, "solutions.agency.title"),
      description: t(lang, "solutions.agency.description"),
      badges: [t(lang, "solutions.agency.badge1"), t(lang, "solutions.agency.badge2"), t(lang, "solutions.agency.badge3"), t(lang, "solutions.agency.badge4")],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
    {
      slug: "sansys-hub",
      name: "sansys hub",
      title: t(lang, "solutions.hub.title"),
      description: t(lang, "solutions.hub.description"),
      badges: [t(lang, "solutions.hub.badge1"), t(lang, "solutions.hub.badge2"), t(lang, "solutions.hub.badge3"), t(lang, "solutions.hub.badge4")],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
    {
      slug: "sansys-flow",
      name: "sansys flow",
      title: t(lang, "solutions.flow.title"),
      description: t(lang, "solutions.flow.description"),
      badges: [t(lang, "solutions.flow.badge1"), t(lang, "solutions.flow.badge2"), t(lang, "solutions.flow.badge3"), t(lang, "solutions.flow.badge4")],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
    {
      slug: "sansys-reader",
      name: "sansys reader",
      title: t(lang, "solutions.reader.title"),
      description: t(lang, "solutions.reader.description"),
      badges: [t(lang, "solutions.reader.badge1"), t(lang, "solutions.reader.badge2"), t(lang, "solutions.reader.badge3"), t(lang, "solutions.reader.badge4")],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
    {
      slug: "sansys-gis",
      name: "sansys gis",
      title: t(lang, "solutions.gis.title"),
      description: t(lang, "solutions.gis.description"),
      badges: [t(lang, "solutions.gis.badge1"), t(lang, "solutions.gis.badge2"), t(lang, "solutions.gis.badge3"), t(lang, "solutions.gis.badge4")],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
    {
      slug: "sansys-bi",
      name: "sansys bi",
      title: "Business Intelligence para saneamento",
      description: "Dashboards estratégicos e análises preditivas integradas ao ecossistema Sansys, com suporte a Qlik Sense e Google BigQuery.",
      badges: ["Dashboards", "Análise preditiva", "Módulo SaaS", "Integração total"],
      image: "https://conteudo.sansys.app/site/img/jtech-sansys-water-software-gestao-saneamento.webp",
    },
  ]

  const diferenciais = [
    t(lang, "solutions.differentials.item1"),
    t(lang, "solutions.differentials.item2"),
    t(lang, "solutions.differentials.item3"),
    t(lang, "solutions.differentials.item4"),
    t(lang, "solutions.differentials.item5"),
  ]

  const modulos = [
    { slug: "sansys-smart-meter", title: t(lang, "solutions.module.smartmeter.title"), text: t(lang, "solutions.module.smartmeter.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-smart-meter.webp" },
    { slug: "sansys-omnichannel", title: t(lang, "solutions.module.omnichannel.title"), text: t(lang, "solutions.module.omnichannel.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-omnichannel.webp" },
    { slug: "sansys-bi", title: t(lang, "solutions.module.bi.title"), text: t(lang, "solutions.module.bi.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-business-intelligence.webp" },
    { slug: "sansys-antifraude", title: t(lang, "solutions.module.antifraude.title"), text: t(lang, "solutions.module.antifraude.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-antifraude.webp" },
    { slug: "sansys-critica-leitura", title: t(lang, "solutions.module.criticaleitura.title"), text: t(lang, "solutions.module.criticaleitura.text"), image: "https://conteudo.sansys.app/site/img/jtech-modulos-critica-leitura.webp" },
  ]

  const nextProduct = () => setProductIndex((prev) => (prev + 1) % produtos.length)
  const prevProduct = () => setProductIndex((prev) => (prev - 1 + produtos.length) % produtos.length)
  const nextModulo = () => setModuloIndex((prev) => (prev + 1) % modulos.length)
  const prevModulo = () => setModuloIndex((prev) => (prev - 1 + modulos.length) % modulos.length)

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) nextProduct()
    if (distance < -50) prevProduct()
    setTouchStart(0)
    setTouchEnd(0)
  }

  const getVisibleModulos = () => {
    return Array.from({ length: 3 }, (_, i) => {
      const idx = (moduloIndex - 1 + i + modulos.length) % modulos.length
      return { ...modulos[idx], originalIndex: idx }
    })
  }

  const currentProduct = produtos[productIndex]
  const detail = productDetails[currentProduct.slug]
  const isWater = currentProduct.slug === 'sansys-water'
  const solutionsPath = lang === 'pt' ? 'solucoes' : lang === 'es' ? 'soluciones' : 'solutions'

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[#0B0B0B] text-white pt-32 pb-20 min-h-[500px] flex items-center"
        style={{ backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-solucoes-tecnologia-desenvolvimento-software-saneamento.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
        role="img"
        aria-label="Profissionais trabalhando com tecnologia em ambiente corporativo moderno"
      >
        <div className="absolute inset-0 bg-black/0" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10" style={{ paddingLeft: bannerOffset > 0 ? `${bannerOffset}px` : 0 }}>
            <div className="max-w-2xl">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl mb-[0.6rem] leading-tight text-white font-extralight [&>strong]:font-bold [&>span]:font-extralight"
                dangerouslySetInnerHTML={{ __html: t(lang, "solutions.hero.title") }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CARROSSEL DE PRODUTOS ─────────────────────────────────────────────── */}
      <section
        className="py-22 bg-white relative min-h-[700px]"
        style={{ backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-solucoes-saneamento.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
        role="img"
        aria-label="Fundo abstrato com elementos gráficos suaves representando tecnologia e inovação"
      >
        <Container>
          <div className="relative">
            {/* Setas desktop */}
            <button onClick={prevProduct} className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group bg-white cursor-pointer z-10 shadow-md" aria-label="Produto anterior">
              <ChevronLeft className="h-6 w-6 text-[#E30613] group-hover:text-white" />
            </button>
            <button onClick={nextProduct} className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group bg-white cursor-pointer z-10 shadow-md" aria-label="Próximo produto">
              <ChevronRight className="h-6 w-6 text-[#E30613] group-hover:text-white" />
            </button>

            <div className="overflow-visible">
              {/* Mobile */}
              <div className="lg:hidden relative">
                <button onClick={prevProduct} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-10 shadow-md" aria-label="Produto anterior">
                  <ChevronLeft className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                </button>
                <button onClick={nextProduct} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-10 shadow-md" aria-label="Próximo produto">
                  <ChevronRight className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                </button>
                <div
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1"
                  style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
                  onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
                  ref={carouselRef}
                >
                  {produtos.map((produto, idx) => (
                    <div key={idx} className={`carousel-card flex-none w-[85vw] snap-center transition-all duration-300 ${idx === productIndex ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} onClick={() => setProductIndex(idx)}>
                      <div className="p-6 rounded-lg h-full">
                        <div className="mb-4">
                          <ImageWithFallback src={`https://conteudo.sansys.app/site/img/jtech-${produto.slug}.webp`} alt={`Logo ${produto.name}`} className="h-10 w-auto" />
                        </div>
                        <h3 className="text-xl mb-3">{produto.title}</h3>
                        <p className="text-gray-700 text-base mb-4 leading-relaxed line-clamp-4">{produto.slug !== 'sansys-water' && productDetails[produto.slug] ? productDetails[produto.slug].fullDescription : produto.description}</p>
                        <div className="mb-4">
                          <ImageWithFallback src={produto.image} alt={produto.title} className="w-full rounded-lg aspect-video object-contain" style={{ transform: 'scale(1.3)' }} />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {produto.badges.slice(0, 3).map((badge, i) => (
                            <span key={i} className="bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full">{badge}</span>
                          ))}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" className="bg-[#E30613] hover:bg-[#C10511] text-white w-full" onClick={() => setWhatsappModalOpen(true)}>
                            Fale com um de nossos especialistas
                          </Button>
                          <Button size="sm" variant="ghost" className="text-[#E30613] hover:bg-[#E30613]/10 flex items-center justify-center gap-2 w-full text-[19px] font-semibold tracking-wide" onClick={() => document.getElementById('product-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                            SAIBA MAIS <ChevronDown className="h-4 w-4 arrow-bounce" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop */}
              <div key={`product-${productIndex}`} className="hidden lg:block animate-fade-in p-8 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-6">
                  <div className="animate-slide-in-left">
                    <div className="mb-6">
                      <ImageWithFallback src={`https://conteudo.sansys.app/site/img/jtech-${currentProduct.slug}.webp`} alt={`Logo ${currentProduct.name}`} className="h-20 w-auto" />
                    </div>
                    <h3 className="text-2xl mb-4">{currentProduct.title}</h3>
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">{!isWater && detail ? detail.fullDescription : currentProduct.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {currentProduct.badges.map((badge, idx) => (
                        <span key={idx} className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full">{badge}</span>
                      ))}
                      <button className="bg-gray-700 text-white text-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
                        <Play className="h-4 w-4" />
                        {t(lang, "solutions.video.demo")}
                      </button>
                    </div>
                  </div>
                  <div className="animate-slide-in-right">
                    <ImageWithFallback src={currentProduct.image} alt={currentProduct.title} className="w-full rounded-lg aspect-video object-contain" style={{ transform: 'scale(1.3)' }} />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Button className="bg-[#E30613] hover:bg-[#C10511] text-white min-w-[200px]" onClick={() => setWhatsappModalOpen(true)}>
                    Fale com um de nossos especialistas
                  </Button>
                  <Button variant="ghost" className="text-[#E30613] hover:bg-[#E30613]/10 flex items-center gap-2 min-w-[200px] text-[19px] font-semibold tracking-wide" onClick={() => document.getElementById('product-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                    SAIBA MAIS <ChevronDown className="h-4 w-4 arrow-bounce" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-8">
            {produtos.map((_, idx) => (
              <button key={idx} onClick={() => setProductIndex(idx)} className={`h-2 rounded-full transition-all ${idx === productIndex ? "bg-[#E30613] w-8" : "bg-gray-300 w-2"}`} aria-label={`Ir para produto ${idx + 1}`} />
            ))}
          </div>
        </Container>

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
          .animate-fade-in { animation: fadeIn 0.6s ease-out; }
          .animate-slide-in-left { animation: slideInLeft 0.6s ease-out; }
          .animate-slide-in-right { animation: slideInRight 0.6s ease-out; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .line-clamp-4 { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
          @keyframes arrowBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
          .arrow-bounce { animation: arrowBounce 1.2s ease-in-out infinite; }
        `}</style>
      </section>

      {/* ── CONTEÚDO DINÂMICO (muda com o carrossel) ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          id="product-detail"
          key={currentProduct.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {isWater ? (
            /* ── WATER: layout original ──────────────────────────────────────── */
            <>
              {/* Diferenciais */}
              <section
                className="pt-16 bg-[#0B0B0B] text-white relative"
                style={{ backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp')", backgroundSize: "cover", backgroundPosition: "bottom", paddingBottom: "240px" }}
                role="img" aria-label="Fundo abstrato escuro com padrões geométricos representando diferenciais tecnológicos"
              >
                <Container className="pb-16">
                  <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="mb-8">
                        <h2 className="text-white font-extralight">{t(lang, "solutions.differentials.title")}</h2>
                        <div className="h-[2px] bg-[#E30613] w-[80px]" />
                      </div>
                      <ul className="space-y-6">
                        {diferenciais.map((d, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <span className="text-[#E30613] text-2xl flex-shrink-0">•</span>
                            <p className="text-gray-300 leading-relaxed">{d}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <ImageWithFallback src="https://conteudo.sansys.app/site/img/sansys-water-interface-gestao-comercial-operacional-saneamento.webp" alt={t(lang, "solutions.image.screenshots")} className="w-full rounded-lg shadow-lg" />
                    </div>
                  </div>
                </Container>
              </section>

              {/* Módulos */}
              <section id="secao-modulos" className="bg-white relative -mt-[164px]">
                <Container>
                  <h2 className="mb-12 text-center font-extralight pt-16" dangerouslySetInnerHTML={{ __html: t(lang, "solutions.modules.title") }} />
                  <div className="relative pb-4">
                    <div className="flex items-center justify-center gap-4">
                      <button onClick={prevModulo} className="hidden lg:flex w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group flex-shrink-0 z-30 bg-white shadow-md" aria-label={t(lang, "solutions.module.prev")}>
                        <ChevronLeft className="h-6 w-6 text-[#E30613] group-hover:text-white transition-colors" />
                      </button>
                      <div className="relative w-full overflow-visible py-4" style={{ maxWidth: '1200px', minHeight: '380px' }}>
                        <button onClick={prevModulo} className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-30 shadow-md" aria-label={t(lang, "solutions.module.prev")}>
                          <ChevronLeft className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                        </button>
                        <button onClick={nextModulo} className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-[#E30613]/30 flex items-center justify-center hover:bg-[#E30613] transition-all group z-30 shadow-md" aria-label={t(lang, "solutions.module.next")}>
                          <ChevronRight className="h-5 w-5 text-[#E30613] group-hover:text-white" />
                        </button>
                        <motion.div key={moduloIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} className="flex gap-6 relative z-20">
                          {getVisibleModulos().map((modulo, idx) => {
                            const isActive = modulo.originalIndex === moduloIndex
                            return (
                            <div key={idx} onClick={() => setModuloIndex(modulo.originalIndex)}
                              className={`rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer flex-shrink-0 ${isActive ? 'border-[#E30613] shadow-xl scale-105 opacity-100 z-10' : 'border-gray-200 bg-white opacity-60 hover:opacity-80'}`}
                              style={{ width: 'calc((100% - 48px) / 3)', minWidth: '200px' }}
                            >
                              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                                <ImageWithFallback src={modulo.image} alt={modulo.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="p-4">
                                <h3 className="text-lg font-bold text-center">{modulo.title}</h3>
                              </div>
                            </div>
                          )
                          })}
                        </motion.div>
                      </div>
                      <button onClick={nextModulo} className="hidden lg:flex w-12 h-12 rounded-full border-2 border-[#E30613] items-center justify-center hover:bg-[#E30613] transition-all group flex-shrink-0 z-30 bg-white shadow-md" aria-label={t(lang, "solutions.module.next")}>
                        <ChevronRight className="h-6 w-6 text-[#E30613] group-hover:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </Container>
              </section>

              {/* Detalhe do módulo selecionado */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={modulos[moduloIndex].slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {(() => {
                    const md = moduleDetails[modulos[moduloIndex].slug]
                    const currentModulo = modulos[moduloIndex]
                    if (!md) return null
                    return (
                      <>
                        {/* Blocos 1+2 — Descrição + Benefícios lado a lado */}
                        <section className="pt-8 pb-16 bg-white">
                          <Container>
                            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-start">
                              {/* Coluna esquerda: logo SVG + descrição + CTA */}
                              <div className="flex flex-col gap-6">
                                <div className="flex justify-start">
                                  <LogoBySlug slug={currentModulo.slug} className="h-14 w-auto" variant="default" />
                                </div>
                                <p className="text-lg text-gray-700 leading-relaxed">{md.fullDescription}</p>
                                <div className="flex justify-center">
                                  <Button size="lg" className="bg-[#E30613] hover:bg-[#C10511]" onClick={() => setWhatsappModalOpen(true)}>
                                    Fale com um de nossos especialistas
                                  </Button>
                                </div>
                              </div>
                              {/* Coluna direita: benefícios */}
                              <div>
                                <h2 className="text-2xl mb-2">{md.benefitsTitle}</h2>
                                <p className="text-gray-500 mb-6">{md.benefitsSubtitle}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {md.benefits.map((b, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-5 border-l-4 border-[#E30613] shadow-sm hover:shadow-md transition-shadow">
                                      <h3 className="text-base font-semibold mb-1 text-gray-900">{b.title}</h3>
                                      <p className="text-sm text-gray-600 leading-relaxed">{b.subtitle}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Container>
                        </section>

                        {/* Funcionalidades */}
                        <section className="py-16 bg-white">
                          <Container>
                            <div
                              className="rounded-2xl p-10 text-white"
                              style={{ backgroundColor: "#0B0B0B", backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp')", backgroundSize: "cover", backgroundPosition: "bottom" }}
                            >
                              <div className="mb-10">
                                <h2 className="text-white font-extralight text-3xl">{md.functionalitiesTitle}</h2>
                                <div className="h-[2px] bg-[#E30613] w-[80px] mt-2" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {md.functionalities.map((f, idx) => (
                                  <div key={idx} className="flex items-start gap-4">
                                    <span className="text-[#E30613] text-2xl flex-shrink-0 leading-none mt-0.5">•</span>
                                    <p className="text-gray-300 leading-relaxed">{f}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Container>
                        </section>

                        {/* Aplicações */}
                        <section className="py-16 bg-white">
                          <Container>
                            <div className="mb-10">
                              <h2 className="text-3xl font-extralight">{md.applicationsTitle}</h2>
                              <div className="h-[2px] bg-[#E30613] w-[80px] mt-2" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {md.applications.map((app, idx) => (
                                <div key={idx} className="text-center py-6 px-4 rounded-lg border-2 border-gray-200 bg-gray-50 hover:border-[#E30613] hover:bg-red-50 transition-all">
                                  <span className="text-gray-700 font-medium">{app}</span>
                                </div>
                              ))}
                            </div>
                          </Container>
                        </section>

                        {/* CTA do módulo */}
                        <section
                          className="py-20 text-white"
                          style={{ backgroundColor: "#0B0B0B", backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-contato-suporte-atendimento-cliente-saneamento.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                          role="img" aria-label="Fundo com elementos gráficos tecnológicos para call-to-action"
                        >
                          <Container>
                            <div className="text-center max-w-3xl mx-auto">
                              <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">{md.ctaTitle}</h2>
                              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{md.ctaSubtitle}</p>
                              <Button size="lg" className="bg-[#E30613] hover:bg-[#C10511]" onClick={() => setWhatsappModalOpen(true)}>
                                Entrar em contato
                              </Button>
                            </div>
                          </Container>
                        </section>
                      </>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>
            </>
          ) : detail ? (
            /* ── DEMAIS PRODUTOS: novos blocos ───────────────────────────────── */
            <>
              {/* Bloco 1 — Benefícios (4 boxes) */}
              <section className="py-16 bg-white">
                <Container>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl mb-3">{detail.benefitsTitle}</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">{detail.benefitsSubtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detail.benefits.map((b, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-6 border-l-4 border-[#E30613] shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">{b.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{b.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>

              {/* Bloco 3 — Funcionalidades (6 bullets) */}
              <section
                className="py-16 text-white"
                style={{ backgroundColor: "#0B0B0B", backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-missao-visao-valores.webp')", backgroundSize: "cover", backgroundPosition: "bottom" }}
                role="img" aria-label="Fundo escuro para seção de funcionalidades"
              >
                <Container>
                  <div className="mb-10">
                    <h2 className="text-white font-extralight text-3xl">{detail.functionalitiesTitle}</h2>
                    <div className="h-[2px] bg-[#E30613] w-[80px] mt-2" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {detail.functionalities.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="text-[#E30613] text-2xl flex-shrink-0 leading-none mt-0.5">•</span>
                        <p className="text-gray-300 leading-relaxed">{f}</p>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>

              {/* Bloco 4 — Resultados (3 boxes) */}
              <section className="py-16 bg-white" style={{ backgroundImage: 'url(https://conteudo.sansys.app/site/img/jtech-background-solucoes-saneamento.webp)', backgroundSize: 'cover', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat' }}>
                <Container>
                  <div className="text-center mb-12">
                    <h2 className="text-3xl mb-2">{detail.resultsTitle}</h2>
                    <div className="h-[2px] bg-[#E30613] w-[80px] mx-auto mt-3" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {detail.results.map((r, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-5xl font-bold text-[#E30613] mb-2">{r.metric}</div>
                        <div className="text-lg font-semibold text-gray-900 mb-1">{r.label}</div>
                        <div className="text-sm text-gray-500">{r.description}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Button size="lg" className="bg-[#E30613] hover:bg-[#C10511]" onClick={() => setWhatsappModalOpen(true)}>
                      Fale com um de nossos especialistas
                    </Button>
                  </div>
                </Container>
              </section>

              {/* Bloco 5 — Aplicações (4 boxes) */}
              <section className="py-16 bg-white">
                <Container>
                  <div className="mb-10">
                    <h2 className="text-3xl font-extralight">{detail.applicationsTitle}</h2>
                    <div className="h-[2px] bg-[#E30613] w-[80px] mt-2" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {detail.applications.map((app, idx) => (
                      <div key={idx} className="text-center py-6 px-4 rounded-lg border-2 border-gray-200 hover:border-[#E30613] hover:bg-red-50 transition-all">
                        <span className="text-gray-700 font-medium">{app}</span>
                      </div>
                    ))}
                  </div>
                </Container>
              </section>

              {/* Bloco 6 — CTA Final */}
              <section
                className="py-20 text-white"
                style={{ backgroundColor: "#0B0B0B", backgroundImage: "url('https://conteudo.sansys.app/site/img/jtech-background-contato-suporte-atendimento-cliente-saneamento.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
                role="img" aria-label="Fundo com elementos gráficos tecnológicos para call-to-action"
              >
                <Container>
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extralight text-white mb-4">{detail.ctaTitle}</h2>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">{detail.ctaSubtitle}</p>
                    <Button size="lg" className="bg-[#E30613] hover:bg-[#C10511]" onClick={() => setWhatsappModalOpen(true)}>
                      Entrar em contato
                    </Button>
                  </div>
                </Container>
              </section>
            </>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <PreWhatsAppModal lang={lang} open={whatsappModalOpen} onClose={() => setWhatsappModalOpen(false)} />
      <ScrollToTop showThreshold={200} />
    </>
  )
}
