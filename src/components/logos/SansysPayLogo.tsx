// Path data separado por camada semântica
const PAY_PATH =
  "M66.2,40.5l4.5-25.3h4.1v2.6h.3c.7-1,1.6-1.8,2.7-2.3,1-.5,2.1-.7,3.3-.7s2.5.3,3.5.8c1,.5,1.7,1.3,2.2,2.4.5,1,.8,2.3.8,3.9s0,1,0,1.5c0,.5-.1,1.1-.2,1.7-.4,2.2-1,4-1.9,5.4-.9,1.4-1.9,2.5-3.1,3.1-1.2.7-2.5,1-3.9,1s-1.7,0-2.4-.3c-.7-.2-1.3-.5-1.8-.8-.5-.4-.9-.9-1.2-1.4h-.3l-1.5,8.5h-5ZM77,30.4c1,0,1.8-.2,2.5-.6.6-.4,1.2-1,1.6-1.8.4-.8.7-1.8.9-2.9.1-.6.2-1,.3-1.4,0-.4,0-.7.1-.9s0-.5,0-.7c0-.7-.1-1.4-.4-1.8-.2-.5-.6-.8-1.1-1.1-.5-.3-1.1-.4-1.9-.4s-1.7.2-2.4.6c-.7.4-1.2,1.1-1.7,1.9-.4.8-.7,1.8-.9,3,0,.4-.1.8-.2,1.1,0,.3,0,.6,0,.8,0,.2,0,.4,0,.6,0,.8.1,1.4.3,2,.2.5.6.9,1.1,1.2.5.3,1.1.4,1.8.4ZM95.8,34.5c-1.3,0-2.4-.3-3.4-.8-1-.5-1.7-1.3-2.2-2.4-.5-1-.8-2.3-.8-3.9s0-1,0-1.5c0-.5.1-1.1.2-1.7.4-2.2,1-4,1.8-5.5.8-1.4,1.8-2.5,3.1-3.1,1.2-.7,2.6-1,4.1-1s1.6,0,2.2.3c.7.2,1.3.5,1.8.9.5.4,1,.9,1.3,1.5h.3l1.2-2.2h4.1l-.9,4.6c-.2.9-.3,1.9-.5,2.8-.2.9-.3,1.8-.5,2.6-.1.8-.3,1.5-.4,2.2-.1.6-.2,1.2-.3,1.6,0,.4,0,.7,0,.8,0,.3,0,.6.3.7.2.2.4.2.7.2h1.2l-.5,3.2c-.3.1-.7.3-1.2.4-.5.1-1,.2-1.7.2s-1.2-.1-1.7-.3c-.5-.2-.9-.6-1.2-1-.1-.2-.2-.5-.3-.7,0-.3-.1-.6-.2-.9h-.3c-.8,1-1.7,1.7-2.8,2.2-1.1.5-2.3.8-3.5.8ZM97.9,30.4c.6,0,1.2-.1,1.8-.4.6-.3,1-.6,1.5-1.1.4-.5.8-1.1,1.1-1.7.3-.7.5-1.4.7-2.3,0-.4.2-.8.2-1.1,0-.3,0-.6,0-.8,0-.2,0-.4,0-.6,0-.8-.1-1.5-.3-2-.2-.5-.6-.9-1.1-1.2-.5-.3-1.1-.4-1.8-.4s-1.8.2-2.5.6c-.7.4-1.2,1-1.6,1.8-.4.8-.7,1.8-1,3,0,.5-.2.9-.2,1.3,0,.3,0,.6-.1.9,0,.3,0,.5,0,.7,0,1.1.3,1.9.8,2.5.5.6,1.4.8,2.6.8ZM112.7,40.8c-.9,0-1.7,0-2.2-.2-.6-.1-.9-.2-1.1-.3l.6-3.4h2.2c.6,0,1.2-.1,1.7-.3.5-.2,1-.6,1.4-1,.4-.4.8-.9,1-1.6l-4.1-18.9h5l1.7,8.4c0,.5.2,1.1.3,1.8.1.7.2,1.3.3,2,0,.6.2,1.2.2,1.7h.2c.2-.4.3-.8.5-1.2.2-.4.4-.9.6-1.4.2-.5.4-.9.6-1.3.2-.4.4-.8.5-1.2l4.2-8.8h5.2l-9.5,18c-.6,1.1-1.1,2-1.8,3-.6.9-1.3,1.7-2.1,2.4-.8.7-1.6,1.3-2.5,1.7-.9.4-1.9.6-3.1.6Z";

const SANSYS_PATH =
  "M78.1,1.5l-.2,1.7c-1.1,0-2.3,0-3.5,0s-1.7,0-1.7.6.3.6,1.2.8l2.3.6c1.5.4,2.2,1.1,2.2,2.6,0,2.2-1.2,2.7-4.1,2.7s-2.3,0-4-.3l.2-1.7c.7,0,1.9,0,3.1,0,1.8,0,2.3,0,2.3-.7s-.4-.6-1.3-.8l-2.2-.6c-1.7-.5-2.2-1.3-2.2-2.7s1-2.6,3.8-2.6c1.3,0,3,.1,4.1.3ZM88.4,4.4v5.9h-2.1l-.3-1.4c-.6.7-1.7,1.6-3.3,1.6s-2.9-.9-2.9-2.6v-.9c0-1.4,1-2.3,2.7-2.3h3.2v-.4c0-.9-.3-1.2-1.5-1.2s-2.3,0-3.8.1l-.3-1.8c1.3-.2,3.4-.4,4.7-.4,2.3,0,3.5.8,3.5,3.3ZM82.4,7.6c0,.6.3.9,1.1.9s1.5-.3,2.2-.9v-1.3h-2.4c-.7,0-.9.3-.9.9v.3ZM99.2,3.6v6.7h-2.7v-5.9c0-.8-.2-1.1-.9-1.1s-1.4.3-2.5.8v6.1s-2.7,0-2.7,0V1.4h2.2l.2,1.3c1.2-1,2.5-1.6,3.8-1.6s2.5.9,2.5,2.5ZM108.9,1.5l-.2,1.7c-1.1,0-2.3,0-3.5,0s-1.7,0-1.7.6.3.6,1.2.8l2.3.6c1.5.4,2.2,1.1,2.2,2.6,0,2.2-1.2,2.7-4.1,2.7s-2.3,0-4-.3l.2-1.7c.7,0,1.9,0,3.1,0,1.8,0,2.3,0,2.3-.7s-.4-.6-1.3-.8l-2.2-.6c-1.7-.5-2.2-1.3-2.2-2.7s1-2.6,3.8-2.6c1.3,0,3,.1,4.1.3ZM116.7,10.5c-.6,1.7-2,3.9-4.9,3.5l-.2-1.6c1.5-.4,2.2-1,2.7-2h0c0,0-.5,0-.5,0-.4,0-.7-.3-.9-.7l-2.9-8.3h2.9l1.7,5.8c.1.4.2.9.3,1.3h.2c.1-.5.3-1,.4-1.3l1.7-5.8h2.9l-3.2,9.1ZM128.6,1.5l-.2,1.7c-1.1,0-2.3,0-3.5,0s-1.7,0-1.7.6.3.6,1.2.8l2.3.6c1.5.4,2.2,1.1,2.2,2.6,0,2.2-1.2,2.7-4.1,2.7s-2.3,0-4-.3l.2-1.7c.7,0,1.9,0,3.1,0,1.8,0,2.3,0,2.3-.7s-.4-.6-1.3-.8l-2.2-.6c-1.7-.5-2.2-1.3-2.2-2.7s1-2.6,3.8-2.6c1.3,0,3,.1,4.1.3Z";

const ICON_SHAPE1_PATH =
  "M60.7,12.1l-4.4,25.2c0,.4-.4.7-.8.7H10.5c-.5,0-.9-.5-.8-1l4.4-25.2c0-.4.4-.7.8-.7h44.9c.5,0,.9.5.8,1Z";

const ICON_SHAPE2_PATH =
  "M4.6,2L1.4,19.9c0,.5.3,1,.8,1h30.5c.4,0,.8-.3.8-.7l3.2-17.9c0-.5-.3-1-.8-1H5.4c-.4,0-.8.3-.8.7Z";

// Tokens de cor das variações (alinhados ao DSS)
const VARIANTS = {
  default: {
    payColor: "#a4a6a5",
    sansysColor: "#a4a6a5",
    iconColor: "#a4a6a5",
  },
  colored: {
    payColor: "#52b90f", // verde
    sansysColor: "#1d4971", // azul
    iconColor: "#52b90f", // verde (mesmo tom do wordmark)
  },
} as const;

export type LogoVariant = keyof typeof VARIANTS;

export interface SansysPayLogoProps {
  className?: string;
  /** Preset de cores. 'default' = monocromático neutro, 'colored' = cores da marca. */
  variant?: LogoVariant;
  /**
   * Cor do wordmark "Pay".
   * Sobrepõe a cor definida pelo variant.
   */
  payColor?: string;
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
   * @deprecated Use `payColor` + `sansysColor` + `iconColor` para controle granular,
   * ou `variant` para presets. Mantido por compatibilidade.
   */
  color?: string;
  /**
   * @deprecated Legacy props. Use `variant="colored"` para cores da marca.
   */
  accentColor1?: string;
  /**
   * @deprecated Legacy props. Use `variant="colored"` para cores da marca.
   */
  accentColor2?: string;
}

export function SansysPayLogo({
  className = "h-12",
  variant = "default",
  payColor,
  sansysColor,
  iconColor,
  color, // legacy
  accentColor1, // legacy
  accentColor2, // legacy
}: SansysPayLogoProps) {
  const base = VARIANTS[variant];

  // Resolução de cor: prop explícita > legacy colors > valor do variant
  const resolvedPay = payColor ?? color ?? base.payColor;
  const resolvedSansys = sansysColor ?? color ?? base.sansysColor;
  const resolvedIcon = iconColor ?? accentColor1 ?? accentColor2 ?? color ?? base.iconColor;

  return (
    <svg
      className={className}
      viewBox="0 0 133 42"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sansys Pay"
      role="img"
    >
      <g>
        {/* Wordmark: Pay */}
        <path fill={resolvedPay} d={PAY_PATH} />

        {/* Wordmark: Sansys */}
        <path fill={resolvedSansys} d={SANSYS_PATH} />

        {/* Ícone - Shape 1 com opacidade 0.7 */}
        <path fill={resolvedIcon} fillOpacity={0.7} d={ICON_SHAPE1_PATH} />

        {/* Ícone - Shape 2 com opacidade 0.4 */}
        <path fill={resolvedIcon} fillOpacity={0.4} d={ICON_SHAPE2_PATH} />
      </g>
    </svg>
  );
}
