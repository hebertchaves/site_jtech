// Path data separados por camada semântica
const GIS_PATH =
  "M56.8,41c-1.4,0-2.6-.2-3.6-.5-1-.3-1.8-.8-2.3-1.4-.5-.6-.8-1.3-.8-2.2s0-.3,0-.6c0-.2,0-.5.1-.8h4.4c0,0,0,.2,0,.2v.2c0,.3.1.6.3.8.2.2.5.4.9.5.4,0,.9.1,1.4.1.9,0,1.7-.2,2.3-.5.6-.3,1.1-.8,1.5-1.4.4-.6.6-1.4.8-2.2,0-.2,0-.5.1-.7,0-.2,0-.4.1-.6h-.2c-.4.5-.9.9-1.4,1.3-.5.3-1.1.6-1.7.8-.6.2-1.3.2-2,.2-1.2,0-2.2-.2-3-.7-.9-.4-1.5-1.1-2-2.1-.5-.9-.7-2.1-.7-3.5s0-.8,0-1.2c0-.4,0-.9.2-1.3.5-2.8,1.5-4.9,2.9-6.2,1.4-1.3,3.2-2,5.2-2s2.2.2,3.1.7c.9.4,1.5,1.1,2,2h.2l.8-2.3h3.7l-2.7,15.2c-.3,1.9-.9,3.5-1.7,4.7-.8,1.2-1.9,2-3.1,2.6-1.3.5-2.9.8-4.7.8ZM58.6,30.6c.6,0,1.1-.1,1.6-.3.5-.2.9-.5,1.3-.9.4-.4.7-.9.9-1.4s.4-1.2.6-1.9c0-.3.1-.6.1-.8,0-.2,0-.4,0-.6,0-.2,0-.3,0-.5,0-.6-.1-1.2-.3-1.6-.2-.5-.5-.8-1-1-.4-.2-1-.3-1.7-.3s-1.5.2-2.2.5c-.6.3-1.1.8-1.5,1.5-.4.7-.7,1.5-.8,2.5,0,.4-.1.7-.2,1,0,.3,0,.5,0,.7,0,.2,0,.3,0,.5,0,.6.1,1.2.3,1.6.2.4.5.7,1,1,.5.2,1,.3,1.8.3ZM70.7,34.9l3-17.1h4.5l-3,17.1h-4.5ZM74.1,15.2l.7-3.9h4.5l-.7,3.9h-4.6ZM87.3,35.3c-1.1,0-2.2-.1-3.1-.3-.9-.2-1.7-.5-2.4-.9-.7-.4-1.2-.9-1.5-1.4-.3-.6-.5-1.2-.5-1.9s0-.5,0-.7c0-.2,0-.4.1-.6h4.4c0,.1,0,.2,0,.3,0,.1,0,.2,0,.3,0,.5.1.8.4,1.1.3.3.7.5,1.2.6.5.1,1,.2,1.6.2s.8,0,1.3,0c.4,0,.8-.2,1.2-.3.4-.1.6-.3.8-.6.2-.2.3-.5.3-.9s-.1-.6-.3-.9c-.2-.2-.5-.4-.9-.6-.4-.2-.8-.3-1.3-.5-.5-.1-1-.3-1.6-.4-.6-.2-1.3-.4-1.9-.6-.6-.2-1.2-.5-1.7-.8s-.9-.7-1.3-1.3c-.3-.5-.5-1.1-.5-1.8s.2-1.9.6-2.6c.4-.7,1-1.4,1.7-1.9.7-.5,1.6-.9,2.6-1.1,1-.2,2-.4,3.1-.4s1.9,0,2.8.3c.8.2,1.6.5,2.2.8.6.3,1.1.8,1.5,1.3.3.5.5,1.1.5,1.7s0,.6,0,.9c0,.3,0,.4-.1.5h-4.3c0-.1,0-.2,0-.3,0,0,0-.1,0-.2,0-.3-.1-.6-.3-.9-.2-.2-.5-.4-.9-.6s-.9-.2-1.5-.2-.9,0-1.3.1c-.4,0-.7.2-1,.3-.3.2-.5.3-.6.6-.1.2-.2.4-.2.7,0,.4.2.7.5.9.4.2.8.4,1.4.6.6.2,1.2.3,1.9.6.7.2,1.3.4,2,.6.7.2,1.3.5,1.8.8.6.3,1,.7,1.4,1.3.3.5.5,1.2.5,2,0,1.2-.2,2.2-.7,2.9-.4.8-1.1,1.4-1.8,1.9-.8.5-1.7.8-2.7,1.1-1,.2-2.1.3-3.2.3Z";

const SANSYS_PATH =
  "M59.5,2l-.2,1.5c-1,0-2.1,0-3.1,0s-1.5,0-1.5.5.3.5,1.1.7l2,.6c1.4.4,2,.9,2,2.3,0,2-1.1,2.4-3.7,2.4s-2,0-3.6-.3v-1.6c.7,0,1.8,0,2.9,0,1.6,0,2,0,2-.6s-.3-.5-1.1-.7l-2-.5c-1.5-.4-1.9-1.2-1.9-2.4s.9-2.3,3.4-2.3c1.1,0,2.7.1,3.7.3ZM68.7,4.7v5.3h-1.9l-.2-1.2c-.6.7-1.5,1.4-2.9,1.4s-2.6-.8-2.6-2.3v-.8c0-1.3.9-2,2.4-2h2.8v-.4c0-.8-.3-1-1.3-1s-2.1,0-3.4.1l-.2-1.6c1.2-.2,3-.4,4.2-.4,2.1,0,3.1.7,3.1,2.9ZM63.3,7.5c0,.6.3.8.9.8s1.3-.3,2-.8v-1.1h-2.2c-.6,0-.8.3-.8.8v.3ZM78.3,4v6h-2.4v-5.2c0-.7-.2-.9-.8-.9s-1.3.2-2.2.7v5.5s-2.4,0-2.4,0V2h1.9l.2,1.2c1.1-.9,2.3-1.4,3.4-1.4s2.2.8,2.2,2.2ZM87,2l-.2,1.5c-1,0-2.1,0-3.1,0s-1.5,0-1.5.5.3.5,1.1.7l2,.6c1.4.4,2,.9,2,2.3,0,2-1.1,2.4-3.7,2.4s-2,0-3.6-.3v-1.6c.7,0,1.8,0,2.9,0,1.6,0,2,0,2-.6s-.3-.5-1.1-.7l-2-.5c-1.5-.4-1.9-1.2-1.9-2.4s.9-2.3,3.4-2.3c1.1,0,2.7.1,3.7.3ZM93.9,10.1c-.5,1.6-1.8,3.4-4.4,3.1l-.2-1.4c1.3-.3,2-.9,2.4-1.8h0c0,0-.5,0-.5,0-.4,0-.7-.2-.8-.6l-2.6-7.4h2.6l1.5,5.2c0,.4.2.8.2,1.2h.2c.1-.4.2-.9.3-1.2l1.5-5.2h2.6l-2.8,8.1ZM104.5,2l-.2,1.5c-1,0-2.1,0-3.1,0s-1.5,0-1.5.5.3.5,1.1.7l2,.6c1.4.4,2,.9,2,2.3,0,2-1.1,2.4-3.7,2.4s-2,0-3.6-.3v-1.6c.7,0,1.8,0,2.9,0,1.6,0,2,0,2-.6s-.3-.5-1.1-.7l-2-.5c-1.5-.4-1.9-1.2-1.9-2.4s.9-2.3,3.4-2.3c1.1,0,2.7.1,3.7.3Z";

const ICON_ELLIPSE_PATH = "M20.8,20.8";

const ICON_SHAPE1_PATH =
  "M45.3,1.4h-11.3c-.2,0-.5.2-.5.4l-3.8,21.2c0,.4.2.7.6.7h11.2c.2,0,.5-.2.5-.4l3.8-21.3c0-.3-.2-.6-.5-.6Z";

const ICON_SHAPE2_PATH =
  "M48.6,17.3h-23.4c-.3,0-.5-.3-.5-.6l1.4-8.6c0-.2.2-.4.5-.4h23.5c.3,0,.5.3.5.6l-1.4,8.5c0,.3-.3.5-.6.5Z";

// Tokens de cor das variações (alinhados ao DSS)
const VARIANTS = {
  default: {
    gisColor: "#a4a6a5",
    sansysColor: "#a4a6a5",
    iconColor: "#a4a6a5",
    iconAccent1: "#a4a6a5",
    iconAccent2: "#a4a6a5",
  },
  colored: {
    gisColor: "#e8ae0a", // amarelo
    sansysColor: "#1d4971", // azul
    iconColor: "#e8ae0a", // amarelo
    iconAccent1: "#e8ae0a", // amarelo
    iconAccent2: "#e8ae0a", // amarelo
  },
} as const;

export type LogoVariant = keyof typeof VARIANTS;

export interface SansysGISLogoProps {
  className?: string;
  /** Preset de cores. 'default' = monocromático neutro, 'colored' = cores da marca. */
  variant?: LogoVariant;
  /**
   * Cor do wordmark "GIS".
   * Sobrepõe a cor definida pelo variant.
   */
  gisColor?: string;
  /**
   * Cor do wordmark "Sansys".
   * Sobrepõe a cor definida pelo variant.
   */
  sansysColor?: string;
  /**
   * Cor base do ícone.
   * Sobrepõe a cor definida pelo variant.
   */
  iconColor?: string;
  /**
   * @deprecated Use `gisColor` + `sansysColor` + `iconColor` para controle granular,
   * ou `variant` para presets. Mantido por compatibilidade.
   */
  color?: string;
}

export function SansysGISLogo({
  className = "h-12",
  variant = "default",
  gisColor,
  sansysColor,
  iconColor,
  color, // legacy
}: SansysGISLogoProps) {
  const base = VARIANTS[variant];

  // Resolução de cor: prop explícita > legacy `color` > valor do variant
  const resolvedGIS = gisColor ?? color ?? base.gisColor;
  const resolvedSansys = sansysColor ?? color ?? base.sansysColor;
  const resolvedIcon = iconColor ?? color ?? base.iconColor;
  const resolvedAccent1 = iconColor ?? color ?? base.iconAccent1;
  const resolvedAccent2 = iconColor ?? color ?? base.iconAccent2;

  return (
    <svg
      className={className}
      viewBox="0 0 106 42"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sansys GIS"
      role="img"
    >
      <g>
        {/* Wordmark: GIS */}
        <path fill={resolvedGIS} d={GIS_PATH} />

        {/* Wordmark: Sansys */}
        <path fill={resolvedSansys} d={SANSYS_PATH} />

        {/* Ícone: Elipse central com opacidade */}
        <ellipse
          fill={resolvedIcon}
          opacity="0.7"
          cx="20.8"
          cy="20.8"
          rx="21.2"
          ry="18"
          transform="translate(-8.6 22) rotate(-47.4)"
        />

        {/* Ícone: Shape 1 com opacidade */}
        <path fill={resolvedAccent1} opacity="0.6" d={ICON_SHAPE1_PATH} />

        {/* Ícone: Shape 2 com opacidade */}
        <path fill={resolvedAccent2} opacity="0.6" d={ICON_SHAPE2_PATH} />
      </g>
    </svg>
  );
}