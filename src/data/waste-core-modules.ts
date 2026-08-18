import { CoreModule } from "./core-modules"

// Módulos principais (core) do Sansys Waste — exibidos na dobra "Principais Módulos"
// (acordeão) da página de soluções. Conteúdo nos 4 idiomas do site.

export const wasteCoreModules: CoreModule[] = [
  {
    id: "balanca",
    name: {
      pt: "Balança",
      es: "Báscula",
      en: "Weighbridge",
      fr: "Pont-bascule",
    },
    bullets: [
      {
        pt: "Controle automatizado de entrada, pesagem e identificação por RFID ou biometria.",
        es: "Control automatizado de entrada, pesaje e identificación por RFID o biometría.",
        en: "Automated control of entry, weighing and identification via RFID or biometrics.",
        fr: "Contrôle automatisé de l’entrée, de la pesée et de l’identification par RFID ou biométrie.",
      },
      {
        pt: "Registro fotográfico, validação de documentação e direcionamento automático de veículos.",
        es: "Registro fotográfico, validación de documentación y direccionamiento automático de vehículos.",
        en: "Photographic records, document validation and automatic vehicle routing.",
        fr: "Enregistrement photographique, validation des documents et orientation automatique des véhicules.",
      },
    ],
  },
  {
    id: "analise-laboratorio",
    name: {
      pt: "Análise de Laboratório",
      es: "Análisis de Laboratorio",
      en: "Laboratory Analysis",
      fr: "Analyse de Laboratoire",
    },
    bullets: [
      {
        pt: "Consulta de licenças e registros.",
        es: "Consulta de licencias y registros.",
        en: "Query of licenses and records.",
        fr: "Consultation des licences et des enregistrements.",
      },
      {
        pt: "Testes laboratoriais com registro e emissão automática de certificados.",
        es: "Pruebas de laboratorio con registro y emisión automática de certificados.",
        en: "Laboratory tests with recording and automatic issuance of certificates.",
        fr: "Analyses de laboratoire avec enregistrement et émission automatique de certificats.",
      },
    ],
  },
  {
    id: "descarga",
    name: {
      pt: "Descarga",
      es: "Descarga",
      en: "Unloading",
      fr: "Déchargement",
    },
    bullets: [
      {
        pt: "Controle de tempo de espera entre chegada e descarga.",
        es: "Control del tiempo de espera entre la llegada y la descarga.",
        en: "Control of waiting time between arrival and unloading.",
        fr: "Contrôle du temps d’attente entre l’arrivée et le déchargement.",
      },
      {
        pt: "Registro de fotos e vinculação ao cadastro do cliente.",
        es: "Registro de fotos y vinculación al registro del cliente.",
        en: "Photo records linked to the customer’s registration.",
        fr: "Enregistrement de photos et rattachement à la fiche du client.",
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
    bullets: [
      {
        pt: "Consolidação automática por cliente e serviço.",
        es: "Consolidación automática por cliente y servicio.",
        en: "Automatic consolidation by customer and service.",
        fr: "Consolidation automatique par client et par service.",
      },
      {
        pt: "Validação online com possibilidade de contestação pelo cliente.",
        es: "Validación en línea con posibilidad de impugnación por parte del cliente.",
        en: "Online validation with the possibility of dispute by the customer.",
        fr: "Validation en ligne avec possibilité de contestation par le client.",
      },
      {
        pt: "Integração ao ERP para emissão e envio de faturas.",
        es: "Integración al ERP para la emisión y el envío de facturas.",
        en: "ERP integration for issuing and sending invoices.",
        fr: "Intégration à l’ERP pour l’émission et l’envoi des factures.",
      },
    ],
  },
  {
    id: "transferencia",
    name: {
      pt: "Transferência",
      es: "Transferencia",
      en: "Transfer",
      fr: "Transfert",
    },
    bullets: [
      {
        pt: "Gestão de zonas de transbordo com rastreabilidade completa até o aterro.",
        es: "Gestión de zonas de transferencia con trazabilidad completa hasta el relleno sanitario.",
        en: "Management of transfer stations with full traceability through to the landfill.",
        fr: "Gestion des zones de transbordement avec une traçabilité complète jusqu’à la décharge.",
      },
      {
        // MTR = Manifesto de Transporte de Resíduos (documento brasileiro);
        // glosado nos demais idiomas por não ter equivalente direto.
        pt: "Atualização automática do MTR junto ao órgão regulador.",
        es: "Actualización automática del MTR (manifiesto de transporte de residuos) ante el organismo regulador.",
        en: "Automatic update of the MTR (waste transport manifest) with the regulatory agency.",
        fr: "Mise à jour automatique du MTR (manifeste de transport de déchets) auprès de l’organisme de réglementation.",
      },
    ],
  },
]
