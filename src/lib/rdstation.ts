import { RD_STATION_LOADER_URL } from "./endpoints"
import { hasConsent } from "./consent"

const SCRIPT_ID = "rd-station-loader"

/**
 * Script de rastreamento da RD Station.
 *
 * Identifica a jornada do visitante antes da conversão, ligando a sessão no site
 * ao lead criado depois. Sem ele, a conversão chega à RD sem o histórico de
 * navegação que a antecedeu.
 *
 * A RD instrui a colocá-lo antes do fechamento do `<body>`, e é onde ele entra —
 * mas via código, e não fixo no HTML, porque grava cookie de identificação: só
 * pode subir depois do aceite da categoria de marketing no banner.
 */
export function initializeRDStation(): void {
  if (!hasConsent("marketing")) return
  if (!RD_STATION_LOADER_URL) return
  if (document.getElementById(SCRIPT_ID)) return

  const script = document.createElement("script")
  script.id = SCRIPT_ID
  script.type = "text/javascript"
  script.async = true
  script.src = RD_STATION_LOADER_URL
  document.body.appendChild(script)
}

export interface RDTrackingIds {
  rd_client_tracking_id?: string
  rd_traffic_source?: string
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)")
  )
  return match ? decodeURIComponent(match[1]) : undefined
}

/**
 * Identificadores que o loader da RD grava no navegador.
 *
 * A conversão é criada pelo n8n, do servidor, que não enxerga estes cookies —
 * sem repassá-los, o lead chega à RD sem a origem de tráfego que o script
 * coletou aqui, e o rastreamento não serve para atribuição.
 *
 * Vêm vazios quando o visitante não aceitou cookies de marketing: aí o loader
 * não subiu e não há o que atribuir.
 */
export function getRDTrackingIds(): RDTrackingIds {
  // rdtrk guarda um JSON: {"id":"<uuid>"}
  let clientTrackingId: string | undefined
  const rdtrk = readCookie("rdtrk")
  if (rdtrk) {
    try {
      clientTrackingId = JSON.parse(rdtrk)?.id
    } catch {
      // formato inesperado: melhor mandar nada do que mandar lixo
    }
  }

  return {
    rd_client_tracking_id: clientTrackingId,
    // __trf.src viaja como está; quem decodifica é a RD
    rd_traffic_source: readCookie("__trf.src"),
  }
}
