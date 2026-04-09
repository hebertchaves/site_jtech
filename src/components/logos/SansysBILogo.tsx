// Path data separados por camada semântica
const BI_PATH =
  "M46.7,36.2l4.2-23.4h11.9c1.5,0,2.8.2,3.8.6,1,.4,1.9,1,2.4,1.8.6.8.9,1.7.9,2.9s-.2,1.8-.6,2.6c-.4.8-1,1.5-1.7,2-.7.5-1.6.9-2.5,1.1h0c1,.5,1.9,1,2.6,1.9.7.8,1,1.9,1,3.2s-.4,3-1.2,4c-.8,1.1-1.8,1.8-3.1,2.4-1.3.5-2.6.8-4.1.8h-13.5ZM52.5,32.1h7.2c.7,0,1.3-.1,1.8-.3.6-.2,1-.6,1.3-1.1.3-.5.5-1.1.5-1.9s-.2-1.4-.7-1.8c-.5-.4-1.2-.7-2.2-.7h-6.9l-1,5.8ZM54.3,22.3h6.7c.6,0,1.1,0,1.5-.3.4-.2.8-.4,1.1-.7.3-.3.5-.6.6-1,.1-.4.2-.8.2-1.2,0-.8-.2-1.4-.7-1.7-.5-.4-1.1-.6-1.8-.6h-6.8l-.9,5.4ZM71.3,36.2l4.2-23.4h5.1l-4.1,23.4h-5.1Z";

const SANSYS_PATH =
  "M53.4,6v.9c-.7,0-1.3,0-1.9,0s-.9,0-.9.3.2.3.6.4l1.2.3c.8.2,1.2.6,1.2,1.4,0,1.2-.7,1.5-2.2,1.5s-1.2,0-2.2-.2v-.9c.4,0,1.1,0,1.8,0,1,0,1.2,0,1.2-.4s-.2-.3-.7-.4l-1.2-.3c-.9-.3-1.2-.7-1.2-1.5s.5-1.4,2-1.4c.7,0,1.6,0,2.2.2ZM58.9,7.5v3.2h-1.1v-.7c-.5.4-1.1.8-1.9.8s-1.6-.5-1.6-1.4v-.5c0-.8.6-1.2,1.5-1.2h1.7v-.2c0-.5-.2-.6-.8-.6s-1.3,0-2,0v-1c.6-.1,1.7-.2,2.4-.2,1.2,0,1.9.4,1.9,1.8ZM55.7,9.2c0,.3.2.5.6.5s.8-.2,1.2-.5v-.7h-1.3c-.4,0-.5.2-.5.5v.2ZM64.7,7.1v3.6h-1.4v-3.2c0-.4-.1-.6-.5-.6s-.8.1-1.3.4v3.3s-1.4,0-1.4,0v-4.8h1.2v.7c.8-.5,1.5-.8,2.2-.8s1.3.5,1.3,1.3ZM69.9,6v.9c-.7,0-1.3,0-1.9,0s-.9,0-.9.3.2.3.6.4l1.2.3c.8.2,1.2.6,1.2,1.4,0,1.2-.7,1.5-2.2,1.5s-1.2,0-2.2-.2v-.9c.4,0,1.1,0,1.8,0,1,0,1.2,0,1.2-.4s-.2-.3-.7-.4l-1.2-.3c-.9-.3-1.2-.7-1.2-1.5s.5-1.4,2-1.4c.7,0,1.6,0,2.2.2ZM74.1,10.8c-.3.9-1.1,2.1-2.7,1.9v-.8c.7-.2,1.1-.5,1.3-1.1h0s-.3,0-.3,0c-.2,0-.4-.1-.5-.4l-1.6-4.5h1.5l.9,3.1c0,.2.1.5.1.7h.1c0-.2.1-.5.2-.7l.9-3.1h1.5l-1.7,4.9ZM80.4,6v.9c-.7,0-1.3,0-1.9,0s-.9,0-.9.3.2.3.6.4l1.2.3c.8.2,1.2.6,1.2,1.4,0,1.2-.7,1.5-2.2,1.5s-1.2,0-2.2-.2v-.9c.4,0,1.1,0,1.8,0,1,0,1.2,0,1.2-.4s-.2-.3-.7-.4l-1.2-.3c-.9-.3-1.2-.7-1.2-1.5s.5-1.4,2-1.4c.7,0,1.6,0,2.2.2Z";

const ICON_PATH =
  "M31.9,40.8H10.5c-5,0-9.1-4.1-9.1-9.1V10.3C1.4,5.2,5.5,1.2,10.5,1.2h21.4c5,0,9.1,4.1,9.1,9.1v21.4c0,5-4.1,9.1-9.1,9.1ZM10.5,5.3c-2.7,0-5,2.2-5,5v21.4c0,2.7,2.2,5,5,5h21.4c2.7,0,5-2.2,5-5V10.3c0-2.7-2.2-5-5-5H10.5ZM23.3,10.2h-4.1v21.7h4.1V10.2ZM15.4,16.9h-4.1v15h4.1v-15ZM31.2,13.4h-4.1v18.5h4.1V13.4Z";

// Tokens de cor das variações (alinhados ao DSS)
const VARIANTS = {
  default: {
    biColor: "#a4a6a5",
    sansysColor: "#a4a6a5",
    iconColor: "#a4a6a5",
  },
  colored: {
    biColor: "#763382",
    sansysColor: "#1d4971",
    iconColor: "#763382",
  },
} as const;

export type LogoVariant = keyof typeof VARIANTS;

export interface SansysBILogoProps {
  className?: string;
  /** Preset de cores. 'default' = monocromático neutro, 'colored' = cores da marca. */
  variant?: LogoVariant;
  /**
   * Cor do wordmark "BI".
   * Sobrepõe a cor definida pelo variant.
   */
  biColor?: string;
  /**
   * Cor do wordmark "Sansys".
   * Sobrepõe a cor definida pelo variant.
   */
  sansysColor?: string;
  /**
   * Cor do ícone.
   * Sobrepõe a cor definida pelo variant.
   */
  iconColor?: string;
  /**
   * @deprecated Use `biColor` + `sansysColor` + `iconColor` para controle granular,
   * ou `variant` para presets. Mantido por compatibilidade.
   */
  color?: string;
}

export function SansysBILogo({
  className = "h-12",
  variant = "default",
  biColor,
  sansysColor,
  iconColor,
  color, // legacy
}: SansysBILogoProps) {
  const base = VARIANTS[variant];

  // Resolução de cor: prop explícita > legacy `color` > valor do variant
  const resolvedBI = biColor ?? color ?? base.biColor;
  const resolvedSansys = sansysColor ?? color ?? base.sansysColor;
  const resolvedIcon = iconColor ?? color ?? base.iconColor;

  return (
    <svg
      className={className}
      viewBox="0 0 82 42"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sansys BI"
      role="img"
    >
      <g>
        {/* Wordmark: BI */}
        <path fill={resolvedBI} d={BI_PATH} />

        {/* Wordmark: Sansys */}
        <path fill={resolvedSansys} d={SANSYS_PATH} />

        {/* Ícone com gráficos de barras */}
        <path fill={resolvedIcon} d={ICON_PATH} />
      </g>
    </svg>
  );
}
