/**
 * Calcula o offset correto para alinhar títulos de banner com o logotipo do header
 * Considera o max-width do Container (max-w-7xl = 1280px) para telas grandes
 */
export function calculateBannerOffset(): number {
  const logo = document.querySelector('header a[href*="/"]')
  if (!logo) return 0

  const rect = logo.getBoundingClientRect()
  const windowWidth = window.innerWidth
  
  // Padding do Container baseado em breakpoints do Tailwind
  const containerPadding = windowWidth >= 1024 ? 32 : (windowWidth >= 640 ? 24 : 16)
  
  // Max-width do Container (max-w-7xl = 1280px do Tailwind)
  const containerMaxWidth = 1280
  
  // Se a janela é maior que max-width + (2 * padding), o container está centralizado
  const totalContainerWidth = containerMaxWidth + (2 * containerPadding)
  
  if (windowWidth > totalContainerWidth) {
    // Container está centralizado
    // Ambos os containers (header e banner) têm a mesma posição esquerda
    const containerLeftEdge = (windowWidth - containerMaxWidth) / 2
    
    // O logo está dentro do header container, que tem padding
    // Calculamos a posição do logo relativa ao início do conteúdo (após o padding)
    const logoOffsetWithinContainer = rect.left - (containerLeftEdge + containerPadding)
    
    return logoOffsetWithinContainer
  } else {
    // Container está usando padding normal
    return rect.left - containerPadding
  }
}