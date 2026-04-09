/**
 * Image URL Helper
 * Gera URLs de imagens do CDN Sansys com fallback automático para .png
 */

const CDN_BASE_URL = "https://conteudo.sansys.app/site/img/"

/**
 * Gera URL de imagem do CDN com fallback
 * @param filename Nome do arquivo (ex: "jtech-background-hero.webp")
 * @returns URL completa da imagem
 */
export function getCDNImageURL(filename: string): string {
  return `${CDN_BASE_URL}${filename}`
}

/**
 * Gera URL com fallback automático para .png
 * Para usar com ImageWithFallback component
 */
export function getImageWithFallback(baseFilename: string) {
  // Se já tem extensão, usar diretamente
  if (baseFilename.includes('.')) {
    const pngFilename = baseFilename.replace(/\.(webp)$/, '.png')
    return {
      src: getCDNImageURL(baseFilename),
      fallback: getCDNImageURL(pngFilename)
    }
  }
  
  // Se não tem extensão, assumir .webp com fallback .png
  return {
    src: getCDNImageURL(`${baseFilename}.webp`),
    fallback: getCDNImageURL(`${baseFilename}.png`)
  }
}