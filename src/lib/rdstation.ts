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
