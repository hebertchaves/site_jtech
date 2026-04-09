declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function initializeGTM(): void {
  const gtmId = import.meta.env.VITE_GTM_ID
  if (!gtmId || gtmId === "GTM-XXXXXXX") return

  if (document.getElementById("gtm-script")) return

  window.dataLayer = window.dataLayer || []

  // GTM Script
  const script = document.createElement("script")
  script.id = "gtm-script"
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `
  document.head.appendChild(script)

  // GTM NoScript fallback
  const noscript = document.createElement("noscript")
  const iframe = document.createElement("iframe")
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
  iframe.height = "0"
  iframe.width = "0"
  iframe.style.display = "none"
  iframe.style.visibility = "hidden"
  noscript.appendChild(iframe)
  document.body.insertBefore(noscript, document.body.firstChild)
}

export function pushDataLayer(event: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
}
