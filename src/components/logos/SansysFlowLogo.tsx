// Path data separados por camada semântica
const FLOW_PATH =
  "M44,44c-.3,0-.6,0-1,0-.3,0-.7,0-1-.2-.3,0-.6-.2-.8-.3l.5-2.8h1.5c.5,0,.9-.1,1.2-.4.3-.3.5-.6.5-1.1l2.4-13.8h-2.3l.6-3.3h2.3l.3-1.8c.2-.9.4-1.7.8-2.3.4-.7.9-1.2,1.6-1.6.7-.4,1.6-.6,2.8-.6s.7,0,1,0c.3,0,.7,0,1,.2.3,0,.6.1.8.2l-.5,2.8h-1.5c-.5,0-.9.1-1.2.4-.3.2-.5.6-.5,1.1l-.3,1.6h2.9l-.6,3.3h-2.9l-2.5,14.1c-.1.8-.4,1.6-.8,2.3-.4.7-.9,1.2-1.6,1.6-.7.4-1.6.6-2.8.6ZM54.8,38.2l3.9-22.2h4.3l-3.9,22.2h-4.2ZM69.6,38.6c-1.6,0-2.9-.2-4-.7-1.1-.5-1.9-1.1-2.4-2.1-.6-.9-.8-2.1-.8-3.5s0-.8,0-1.2c0-.4.1-.8.2-1.3.3-1.9.9-3.4,1.7-4.6.8-1.2,1.9-2.1,3.2-2.7,1.3-.6,2.8-.9,4.5-.9s2.9.2,4,.7c1.1.5,1.9,1.1,2.5,2.1.6.9.8,2.1.8,3.5s0,1.2-.2,1.8c-.1.6-.3,1.1-.5,1.7-.4,1.6-1,3-1.8,4-.8,1.1-1.8,1.8-3,2.3-1.2.5-2.6.8-4.3.8ZM69.9,35.3c.9,0,1.7-.2,2.3-.5.6-.3,1.1-.9,1.5-1.6.4-.7.7-1.6.9-2.6,0-.5.1-.8.2-1.1,0-.3,0-.5,0-.7,0-.2,0-.4,0-.6,0-.7-.1-1.2-.3-1.7-.2-.5-.6-.8-1-1.1-.5-.2-1.1-.4-1.8-.4s-1.7.2-2.3.6c-.6.4-1.1.9-1.5,1.6-.4.7-.7,1.6-.9,2.6,0,.5-.1.8-.2,1.1,0,.3,0,.5,0,.7,0,.2,0,.4,0,.5,0,.7.1,1.2.3,1.7.2.5.6.8,1.1,1,.5.2,1.1.4,1.8.4ZM82.8,38.2l-2.2-16.2h4.3l.6,6.9c0,.3,0,.7,0,1.3,0,.5,0,1.1,0,1.6,0,.6,0,1.1,0,1.6h.2c.2-.5.4-1,.6-1.6.2-.6.4-1.1.6-1.6.2-.5.4-.9.5-1.2l2.9-6.9h4.5l.5,6.9c0,.3,0,.7,0,1.3,0,.5,0,1.1.1,1.6,0,.6,0,1.1,0,1.5h.2c.1-.4.3-.9.5-1.4.2-.5.4-1.1.6-1.6.2-.5.4-1,.5-1.4l3-6.9h4.3l-7.9,16.2h-4.4l-.6-7.7c0-.3,0-.7,0-1.1,0-.4,0-.9,0-1.3,0-.4,0-.8,0-1.1h-.1c-.1.3-.2.6-.4,1.1-.2.4-.3.8-.5,1.3-.2.4-.3.8-.5,1.2l-3.3,7.7h-4.4Z";

const SANSYS_PATH =
  "M56,7.2l-.2,1.4c-1,0-2,0-2.9,0s-1.4,0-1.4.5.3.5,1,.7l1.9.5c1.3.4,1.9.9,1.9,2.2,0,1.9-1,2.3-3.4,2.3s-1.9,0-3.4-.3v-1.5c.7,0,1.7,0,2.7,0,1.5,0,1.9,0,1.9-.6s-.3-.5-1.1-.7l-1.9-.5c-1.4-.4-1.8-1.1-1.8-2.3s.9-2.2,3.2-2.2c1.1,0,2.5.1,3.5.3ZM64.6,9.7v5h-1.8l-.2-1.1c-.5.6-1.4,1.3-2.8,1.3s-2.5-.8-2.5-2.2v-.8c0-1.2.9-1.9,2.3-1.9h2.7v-.3c0-.8-.3-1-1.2-1s-2,0-3.2.1l-.2-1.5c1.1-.2,2.9-.4,3.9-.4,1.9,0,3,.6,3,2.8ZM59.6,12.4c0,.5.3.8.9.8s1.2-.2,1.9-.7v-1.1h-2c-.5,0-.7.3-.7.7v.3ZM73.7,9v5.6h-2.2v-4.9c0-.7-.2-.9-.7-.9s-1.2.2-2.1.7v5.1s-2.2,0-2.2,0v-7.5h1.8l.2,1.1c1-.9,2.1-1.3,3.2-1.3s2.1.7,2.1,2.1ZM81.9,7.2l-.2,1.4c-1,0-2,0-2.9,0s-1.4,0-1.4.5.3.5,1,.7l1.9.5c1.3.4,1.9.9,1.9,2.2,0,1.9-1,2.3-3.4,2.3s-1.9,0-3.4-.3v-1.5c.7,0,1.7,0,2.7,0,1.5,0,1.9,0,1.9-.6s-.3-.5-1.1-.7l-1.9-.5c-1.4-.4-1.8-1.1-1.8-2.3s.9-2.2,3.2-2.2c1.1,0,2.5.1,3.5.3ZM88.4,14.8c-.5,1.5-1.7,3.2-4.1,3l-.2-1.3c1.2-.3,1.9-.8,2.2-1.7h0c0,0-.4,0-.4,0-.4,0-.6-.2-.7-.5l-2.5-7h2.4l1.4,4.9c0,.4.2.7.2,1.1h.2c.1-.4.2-.8.3-1.1l1.4-4.9h2.4l-2.7,7.6ZM98.4,7.2l-.2,1.4c-1,0-2,0-2.9,0s-1.4,0-1.4.5.3.5,1,.7l1.9.5c1.3.4,1.9.9,1.9,2.2,0,1.9-1,2.3-3.4,2.3s-1.9,0-3.4-.3v-1.5c.7,0,1.7,0,2.7,0,1.5,0,1.9,0,1.9-.6s-.3-.5-1.1-.7l-1.9-.5c-1.4-.4-1.8-1.1-1.8-2.3s.9-2.2,3.2-2.2c1.1,0,2.5.1,3.5.3Z";

const ICON_LAYER_1 =
  "M25.7,4H8.7c-.5,0-.9.4-1,.8L1,42.9c0,.6.3,1.1.9,1.1h16.5c.6,0,1.1-.4,1.2-1L26.4,4.8c0-.4-.3-.8-.7-.8Z";

const ICON_LAYER_2 =
  "M8.2,22.1h30.4c.5,0,.9-.3.9-.8l2.5-14.3c0-.4-.3-.8-.7-.8H10.8c-.4,0-.8.3-.8.7l-2.5,14.4c0,.4.3.8.7.8Z";

const ICON_LAYER_3 =
  "M10.7,34.7h19.9c.3,0,.6-.2.6-.5l1.7-9.4c0-.3-.2-.5-.5-.5H12.4c-.3,0-.5.2-.5.5l-1.7,9.5c0,.3.2.5.5.5Z";

// Tokens de cor das variações (alinhados ao DSS)
const VARIANTS = {
  default: {
    flowColor: "#a4a6a5",
    sansysColor: "#a4a6a5",
    iconColor: "#a4a6a5",
  },
  colored: {
    flowColor: "#1c0d60",
    sansysColor: "#1c0d60",
    iconColor: "#1c0d60",
  },
} as const;

export type LogoVariant = keyof typeof VARIANTS;

export interface SansysFlowLogoProps {
  className?: string;
  /** Preset de cores. 'default' = monocromático neutro, 'colored' = cores da marca. */
  variant?: LogoVariant;
  /**
   * Cor do wordmark "Flow".
   * Sobrepõe a cor definida pelo variant.
   */
  flowColor?: string;
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
   * @deprecated Use `flowColor` + `sansysColor` + `iconColor` para controle granular,
   * ou `variant` para presets. Mantido por compatibilidade.
   */
  color?: string;
}

export function SansysFlowLogo({
  className = "h-12",
  variant = "default",
  flowColor,
  sansysColor,
  iconColor,
  color, // legacy
}: SansysFlowLogoProps) {
  const base = VARIANTS[variant];

  // Resolução de cor: prop explícita > legacy `color` > valor do variant
  const resolvedFlow = flowColor ?? color ?? base.flowColor;
  const resolvedSansys = sansysColor ?? color ?? base.sansysColor;
  const resolvedIcon = iconColor ?? color ?? base.iconColor;

  return (
    <svg
      className={className}
      viewBox="0 0 106 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sansys Flow"
      role="img"
    >
      <g>
        {/* Wordmark: Flow */}
        <path fill={resolvedFlow} d={FLOW_PATH} />

        {/* Wordmark: Sansys */}
        <path fill={resolvedSansys} d={SANSYS_PATH} />

        {/* Ícone com camadas sobrepostas - Layer 1 (opacidade 0.7) */}
        <path fill={resolvedIcon} fillOpacity={0.7} d={ICON_LAYER_1} />

        {/* Ícone - Layer 2 (opacidade 0.6) */}
        <path fill={resolvedIcon} fillOpacity={0.6} d={ICON_LAYER_2} />

        {/* Ícone - Layer 3 (opacidade 0.6) */}
        <path fill={resolvedIcon} fillOpacity={0.6} d={ICON_LAYER_3} />
      </g>
    </svg>
  );
}
