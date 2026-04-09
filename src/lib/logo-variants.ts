/**
 * Lista de slugs de produtos/módulos que possuem suporte ao prop `variant`
 * para exibição colorida dos logotipos.
 * 
 * Manter esta lista atualizada sempre que novos logos receberem suporte a variant.
 */
export const LOGO_SLUGS_WITH_VARIANT_SUPPORT = [
  "sansys-agency",
  "sansys-antifraude",
  "sansys-bi",
  "sansys-critica-leitura",
  "sansys-flow",
  "sansys-gis",
  "sansys-hub",
  "sansys-omnichannel",
  "sansys-pay",
  "sansys-reader",
  "sansys-smart-meter",
  "sansys-waste",
  "sansys-water",
] as const;

/**
 * Type-guard para verificar se um slug tem suporte a variant
 */
export function hasVariantSupport(slug: string): boolean {
  return LOGO_SLUGS_WITH_VARIANT_SUPPORT.includes(slug as any);
}