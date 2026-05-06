// Path data separados por camada semântica
const HUB_PATH =
  "M49.6,35.9l3.9-21.7h4.7l-1.5,8.6h9.6l1.5-8.6h4.7l-3.8,21.7h-4.7l1.6-9.1h-9.6l-1.6,9.1h-4.7ZM83.2,36.3c-2.7,0-4.9-.6-6.4-1.7-1.5-1.1-2.3-2.8-2.3-5.1s0-.6,0-1c0-.3,0-.7.1-1l2.3-13.3h4.7l-2.3,13.3c0,.1,0,.3,0,.6,0,.2,0,.5,0,.6,0,1.2.3,2.1,1,2.7.7.6,1.7.9,3,.9s2.8-.4,3.8-1.2c1-.8,1.6-2,1.9-3.6l2.4-13.4h4.7l-2.4,13.5c-.3,1.9-1,3.5-1.9,4.7-.9,1.3-2.1,2.2-3.5,2.8-1.4.6-3.2.9-5.1.9ZM97,35.9l3.9-21.7h11c1.4,0,2.6.2,3.5.6,1,.4,1.7.9,2.2,1.7.5.7.8,1.6.8,2.7s-.2,1.7-.6,2.4c-.4.7-.9,1.4-1.6,1.9-.7.5-1.4.9-2.3,1h0c.9.4,1.7,1,2.4,1.7.6.8.9,1.8.9,3s-.4,2.7-1.1,3.7c-.7,1-1.7,1.7-2.8,2.2-1.2.5-2.4.7-3.8.7h-12.5ZM102.4,32.1h6.6c.6,0,1.2-.1,1.7-.3.5-.2.9-.5,1.2-1,.3-.5.4-1,.4-1.7s-.2-1.3-.6-1.7c-.4-.4-1.1-.6-2-.6h-6.4l-.9,5.4ZM104,23h6.2c.5,0,1,0,1.4-.2.4-.2.7-.4,1-.6.3-.3.4-.6.6-.9.1-.3.2-.7.2-1.1,0-.7-.2-1.3-.6-1.6-.4-.4-1-.5-1.7-.5h-6.2l-.9,5Z";

const SANSYS_PATH =
  "M59.8,1.5l-.2,1.5c-1,0-2,0-3,0s-1.5,0-1.5.5.3.5,1,.7l2,.5c1.3.4,1.9.9,1.9,2.3,0,1.9-1.1,2.4-3.6,2.4s-2,0-3.5-.3v-1.5c.7,0,1.8,0,2.9,0,1.6,0,2,0,2-.6s-.3-.5-1.1-.7l-2-.5c-1.5-.4-1.9-1.1-1.9-2.4s.9-2.2,3.3-2.2c1.1,0,2.7.1,3.6.3ZM68.8,4v5.2h-1.9l-.2-1.2c-.6.7-1.5,1.4-2.9,1.4s-2.6-.8-2.6-2.3v-.8c0-1.3.9-2,2.4-2h2.8v-.4c0-.8-.3-1-1.3-1s-2.1,0-3.3.1l-.2-1.6c1.1-.2,3-.4,4.1-.4,2,0,3.1.7,3.1,2.9ZM63.5,6.8c0,.6.3.8.9.8s1.3-.3,2-.8v-1.1h-2.1c-.6,0-.8.3-.8.7v.3ZM78.3,3.3v5.9h-2.3v-5.2c0-.7-.2-.9-.8-.9s-1.3.2-2.2.7v5.4s-2.3,0-2.3,0V1.4h1.9l.2,1.2c1.1-.9,2.2-1.4,3.4-1.4s2.2.8,2.2,2.2ZM86.8,1.5l-.2,1.5c-1,0-2,0-3,0s-1.5,0-1.5.5.3.5,1,.7l2,.5c1.3.4,1.9.9,1.9,2.3,0,1.9-1.1,2.4-3.6,2.4s-2,0-3.5-.3v-1.5c.7,0,1.8,0,2.9,0,1.6,0,2,0,2-.6s-.3-.5-1.1-.7l-2-.5c-1.5-.4-1.9-1.1-1.9-2.4s.9-2.2,3.3-2.2c1.1,0,2.7.1,3.6.3ZM93.6,9.3c-.5,1.5-1.8,3.4-4.3,3.1l-.2-1.4c1.3-.3,1.9-.9,2.3-1.8h0c0,0-.4,0-.4,0-.4,0-.7-.2-.8-.6l-2.6-7.3h2.5l1.5,5.1c0,.4.2.8.2,1.2h.2c.1-.4.2-.8.3-1.2l1.5-5.1h2.5l-2.8,8ZM104,1.5l-.2,1.5c-1,0-2,0-3,0s-1.5,0-1.5.5.3.5,1,.7l2,.5c1.3.4,1.9.9,1.9,2.3,0,1.9-1.1,2.4-3.6,2.4s-2,0-3.5-.3v-1.5c.7,0,1.8,0,2.9,0,1.6,0,2,0,2-.6s-.3-.5-1.1-.7l-2-.5c-1.5-.4-1.9-1.1-1.9-2.4s.9-2.2,3.3-2.2c1.1,0,2.7.1,3.6.3Z";

const ICON_SHAPE1_PATH =
  "M4.6,12.8L1.6,29.5c0,.6.3,1.1.9,1.1h33.6c.4,0,.8-.3.9-.7l3-16.8c0-.6-.3-1.1-.9-1.1H5.5c-.4,0-.8.3-.9.7Z";

const ICON_SHAPE2_PATH =
  "M13.8,4l-6.3,35.8c-.1.6.3,1.1.9,1.1h15.3c.5,0,.9-.3.9-.8L31,4.3c.1-.6-.3-1.1-.9-1.1h-15.3c-.5,0-.9.3-.9.8Z";

const ICON_SHAPE3_PATH =
  "M40.4,35.2L46.2,2.2c0-.5-.3-1-.9-1h-9.1c-.4,0-.8.3-.9.7l-5.8,33c0,.5.3,1,.9,1h9.1c.4,0,.8-.3.9-.7Z";

// Tokens de cor das variações (alinhados ao DSS)
const VARIANTS = {
  default: {
    hubColor: "#a4a6a5",
    sansysColor: "#a4a6a5",
    iconColor: "#a4a6a5",
  },
  colored: {
    hubColor: "#ff7d14", // laranja
    sansysColor: "#1d4971", // azul
    iconColor: "#ff7d14", // laranja (mesmo tom para todas as partes do ícone)
  },
} as const;

export type LogoVariant = keyof typeof VARIANTS;

export interface SansysHubLogoProps {
  className?: string;
  /** Preset de cores. 'default' = monocromático neutro, 'colored' = cores da marca. */
  variant?: LogoVariant;
  /**
   * Cor do wordmark "HUB".
   * Sobrepõe a cor definida pelo variant.
   */
  hubColor?: string;
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
   * @deprecated Use `hubColor` + `sansysColor` + `iconColor` para controle granular,
   * ou `variant` para presets. Mantido por compatibilidade.
   */
  color?: string;
}

export function SansysHubLogo({
  className = "h-12",
  variant = "default",
  hubColor,
  sansysColor,
  iconColor,
  color, // legacy
}: SansysHubLogoProps) {
  const base = VARIANTS[variant];

  // Resolução de cor: prop explícita > legacy `color` > valor do variant
  const resolvedHub = hubColor ?? color ?? base.hubColor;
  const resolvedSansys = sansysColor ?? color ?? base.sansysColor;
  const resolvedIcon = iconColor ?? color ?? base.iconColor;

  return (
    <svg
      className={className}
      viewBox="0 0 120 42"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sansys Hub"
      role="img"
    >
      <g>
        {/* Wordmark: HUB */}
        <path fill={resolvedHub} d={HUB_PATH} />

        {/* Wordmark: Sansys */}
        <path fill={resolvedSansys} d={SANSYS_PATH} />

        {/* Ícone - Shape 1 com opacidade 0.7 */}
        <path fill={resolvedIcon} fillOpacity={0.7} d={ICON_SHAPE1_PATH} />

        {/* Ícone - Shape 2 com opacidade 0.6 */}
        <path fill={resolvedIcon} fillOpacity={0.6} d={ICON_SHAPE2_PATH} />

        {/* Ícone - Shape 3 com opacidade 0.7 */}
        <path fill={resolvedIcon} fillOpacity={0.7} d={ICON_SHAPE3_PATH} />
      </g>
    </svg>
  );
}
