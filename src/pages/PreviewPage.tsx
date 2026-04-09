import { useEffect, useState } from "react"
import { getCurrentLangFromHash } from "../lib/i18n"

/**
 * PreviewPage - Handles preview token and creates HttpOnly cookie session
 * 
 * Routes:
 * /:lang/conteudo/preview?token=...&slug=...
 * /:lang/ebooks/preview?token=...&slug=...
 * 
 * Security:
 * - Token never stored in sessionStorage/localStorage
 * - Creates server-side session with HttpOnly cookie
 * - Token removed from URL immediately
 */
export function PreviewPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const lang = getCurrentLangFromHash()
    
    // Parse query params from hash URL
    const hash = window.location.hash
    const queryString = hash.split('?')[1]
    
    if (!queryString) {
      console.error('Preview: Missing query params')
      window.location.hash = `#/${lang}/conteudo`
      return
    }

    const params = new URLSearchParams(queryString)
    const token = params.get('token')
    const slug = params.get('slug')
    
    // Determine content type from path
    const isEbook = hash.includes('/ebooks/')
    const contentType = isEbook ? 'ebook' : 'post'

    if (!token || !slug) {
      console.error('Preview: Missing token or slug')
      window.location.hash = `#/${lang}/conteudo`
      return
    }

    // ✅ SECURITY: Remove token from URL IMMEDIATELY
    // This prevents token from appearing in browser history, logs, referrer headers
    const cleanHash = hash.split('?')[0]
    window.history.replaceState({}, '', cleanHash)

    // ============================================
    // CREATE PREVIEW SESSION (HttpOnly Cookie)
    // ============================================
    const cmsUrl = import.meta.env.VITE_CMS_URL || 'http://localhost:1337'
    
    fetch(`${cmsUrl}/api/preview/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✅ Allow cookies to be set
      body: JSON.stringify({
        token,
        contentType,
        slug,
        locale: lang,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to create preview session')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Preview session created:', data.message)
        
        // ✅ Token is now in HttpOnly cookie (not accessible to JS)
        // Redirect to content page
        setIsLoading(false)
        
        if (contentType === 'ebook') {
          window.location.hash = `#/${lang}/ebooks/${slug}`
        } else {
          window.location.hash = `#/${lang}/conteudo/${slug}`
        }
      })
      .catch((err) => {
        console.error('Preview session error:', err)
        setError(err.message || 'Falha ao ativar preview')
        setIsLoading(false)
      })
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl mb-2">Erro no Preview</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.hash = '#/pt/conteudo'}
            className="px-4 py-2 bg-jtech-red text-white rounded hover:bg-red-700"
          >
            Voltar para Blog
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jtech-red mx-auto mb-4"></div>
        <p className="text-gray-600">
          {isLoading ? 'Ativando modo de visualização...' : 'Redirecionando...'}
        </p>
      </div>
    </div>
  )
}