import { X, Eye } from "lucide-react"
import { getCurrentLangFromHash } from "../lib/i18n"
import { getContentProvider } from "../providers"

interface PreviewBadgeProps {
  className?: string
}

/**
 * PreviewBadge - Shows when viewing draft content via preview session
 * 
 * Features:
 * - Visual indicator that user is in preview mode
 * - Button to exit preview (calls logout endpoint, clears HttpOnly cookie)
 */
export function PreviewBadge({ className = "" }: PreviewBadgeProps) {
  const handleExitPreview = async () => {
    const provider = getContentProvider()
    
    // Call logout endpoint to clear HttpOnly cookie
    if ('exitPreview' in provider && typeof provider.exitPreview === 'function') {
      await provider.exitPreview()
    }

    // Get current lang and redirect to content listing
    const lang = getCurrentLangFromHash()
    window.location.hash = `#/${lang}/conteudo`
    
    // Force reload to fetch published version
    window.location.reload()
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 ${className}`}
      role="alert"
    >
      <Eye className="w-5 h-5" />
      <span className="font-medium">Modo de Visualização</span>
      <button
        onClick={handleExitPreview}
        className="ml-2 hover:bg-yellow-600 rounded p-1 transition-colors"
        aria-label="Sair do modo de visualização"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}