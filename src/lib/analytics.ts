import { pushToDataLayer } from "./gtm"
import { ANALYTICS_TOOL, HOTJAR_SITE_ID, CLARITY_PROJECT_ID } from "./endpoints"
import { hasConsent } from "./consent"

declare global {
  interface Window {
    hj?: any
    clarity?: any
    __hotjarInitialized?: boolean
    __clarityInitialized?: boolean
  }
}

export function initializeAnalytics(): void {
  if (!hasConsent("analytics")) return

  if (ANALYTICS_TOOL === "hotjar" && HOTJAR_SITE_ID > 0) {
    initializeHotjar()
  } else if (ANALYTICS_TOOL === "clarity" && CLARITY_PROJECT_ID) {
    initializeClarity()
  }
}

function initializeHotjar(): void {
  if (window.__hotjarInitialized) return
  if (typeof window.hj === "function") {
    window.__hotjarInitialized = true
    return
  }

  const script = document.createElement("script")
  script.innerHTML = `
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:${HOTJAR_SITE_ID},hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `
  document.head.appendChild(script)
  window.__hotjarInitialized = true
}

function initializeClarity(): void {
  if (window.__clarityInitialized) return
  if (typeof window.clarity === "function") {
    window.__clarityInitialized = true
    return
  }

  const script = document.createElement("script")
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
  `
  document.head.appendChild(script)
  window.__clarityInitialized = true
}

export function trackPageView(page: string, lang: string): void {
  if (!hasConsent("analytics")) return
  pushToDataLayer("page_view", { page_path: page, page_language: lang })
}

export function trackCTAClick(cta_name: string, cta_location: string): void {
  if (!hasConsent("analytics")) return
  pushToDataLayer("click_cta_whatsapp", { cta_name, cta_location })
}

export function trackFormSubmit(form_type: string, form_name: string): void {
  if (!hasConsent("analytics")) return
  pushToDataLayer(`form_submit_${form_type}`, { form_name })
}

export function trackProductClick(product_name: string, product_slug: string): void {
  if (!hasConsent("analytics")) return
  pushToDataLayer("click_product", { product_name, product_slug })
}

export function trackPostClick(post_title: string, post_slug: string): void {
  if (!hasConsent("analytics")) return
  pushToDataLayer("click_post", { post_title, post_slug })
}

export function trackScrollDepth(depth: number): void {
  if (!hasConsent("analytics")) return
  pushToDataLayer(`scroll_${depth}`, { scroll_depth: depth })
}

let scrollTracked50 = false
let scrollTracked90 = false

export function setupScrollTracking(): () => void {
  const handleScroll = () => {
    if (!hasConsent("analytics")) return

    const denom = document.documentElement.scrollHeight - window.innerHeight
    if (denom <= 0) return

    const scrollPercentage = (window.scrollY / denom) * 100

    if (scrollPercentage >= 50 && !scrollTracked50) {
      trackScrollDepth(50)
      scrollTracked50 = true
    }

    if (scrollPercentage >= 90 && !scrollTracked90) {
      trackScrollDepth(90)
      scrollTracked90 = true
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true })

  return () => window.removeEventListener("scroll", handleScroll)
}

export function resetScrollTracking(): void {
  scrollTracked50 = false
  scrollTracked90 = false
}
