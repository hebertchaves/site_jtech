import DOMPurify from "dompurify"

// Sanitização de HTML vindo do CMS antes de ir para dangerouslySetInnerHTML.
// O conteúdo é escrito por editores autenticados, mas isso não o torna confiável:
// uma conta comprometida no Strapi conseguiria executar script em jtech.com.br
// para todos os visitantes do artigo.
//
// Iframes são liberados apenas para embeds de vídeo (YouTube/Vimeo) — a checagem
// do host acontece no hook abaixo, já que ALLOWED_TAGS não filtra atributos.
const ALLOWED_IFRAME_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
]

let hooksRegistered = false

function registerHooks() {
  if (hooksRegistered) return

  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    // Links em nova aba não podem dar acesso a window.opener
    if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
      node.setAttribute("rel", "noopener noreferrer")
    }

    // Só sobrevivem iframes de plataformas de vídeo conhecidas
    if (node.tagName === "IFRAME") {
      const src = node.getAttribute("src") || ""
      let host = ""
      try {
        host = new URL(src, window.location.origin).hostname
      } catch {
        host = ""
      }
      if (!ALLOWED_IFRAME_HOSTS.includes(host)) {
        node.remove()
      }
    }
  })

  hooksRegistered = true
}

/**
 * Limpa HTML de fonte não confiável, preservando a formatação usada nos artigos.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ""
  registerHooks()

  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["target", "allow", "allowfullscreen", "frameborder", "loading"],
    // Sem handlers inline (onclick, onerror...) e sem <script>/<style>
    FORBID_TAGS: ["script", "style", "form", "input", "button"],
    FORBID_ATTR: ["style", "formaction", "srcdoc"],
    ALLOW_DATA_ATTR: false,
  })
}
