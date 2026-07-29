import { cn } from '@/lib/utils'

/**
 * Ilustrações próprias das etapas 4.0 e 5.0, que não têm arte pintada.
 *
 * Seguem a composição das ilustrações existentes — céu, linha do horizonte,
 * lavoura em perspectiva e um sujeito em primeiro plano — usando as cores do
 * sistema via classes utilitárias (atributo de apresentação SVG não resolve
 * `var()`, então cor vai por classe).
 */

function FieldRows({ className }: { className?: string }) {
  return (
    <g className={className}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M ${160 + i * 12} 118 L ${-60 + i * 88} 200`}
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
        />
      ))}
    </g>
  )
}

/** Agricultura 4.0 — o campo conectado: satélite, drone e sensores em rede. */
export function IllustrationConnectedField({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Ilustração de uma lavoura conectada, com satélite, drone e sensores enviando dados."
    >
      {/* Céu */}
      <defs>
        <linearGradient id="sky40" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="[stop-color:var(--color-tech)]" stopOpacity="0.55" />
          <stop offset="100%" className="[stop-color:var(--color-tech)]" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="ground40" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="[stop-color:var(--color-leaf)]" stopOpacity="0.45" />
          <stop offset="100%" className="[stop-color:var(--color-primary)]" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      <rect width="320" height="200" fill="url(#sky40)" />

      {/* Colinas distantes */}
      <path
        d="M0 118 Q 46 100 92 114 T 184 110 T 268 116 L 320 108 L 320 122 L 0 122 Z"
        className="fill-tech/45"
      />

      {/* Lavoura */}
      <rect y="118" width="320" height="82" fill="url(#ground40)" />
      <FieldRows className="stroke-leaf/60" />

      {/* Satélite */}
      <g className="stroke-tech fill-tech">
        <rect x="243" y="22" width="16" height="11" rx="2" className="fill-tech/85" stroke="none" />
        <rect x="231" y="24" width="10" height="7" rx="1.5" className="fill-tech/50" stroke="none" />
        <rect x="261" y="24" width="10" height="7" rx="1.5" className="fill-tech/50" stroke="none" />
        <g fill="none" strokeWidth="1.4" strokeLinecap="round" className="stroke-tech/50">
          <path d="M240 40 Q 251 50 262 40" />
          <path d="M234 46 Q 251 62 268 46" />
        </g>
      </g>

      {/* Drone */}
      <g>
        <rect x="96" y="56" width="26" height="9" rx="3" className="fill-tech/85" />
        <circle cx="109" cy="60.5" r="2" className="fill-background" />
        <g strokeWidth="1.6" strokeLinecap="round" className="stroke-tech" fill="none">
          <path d="M99 56 L 90 49" />
          <path d="M119 56 L 128 49" />
          <path d="M84 49 h 12" />
          <path d="M122 49 h 12" />
        </g>
        {/* Feixe de leitura */}
        <path
          d="M104 66 L 92 116 L 128 116 L 114 66 Z"
          className="fill-tech/12"
        />
      </g>

      {/* Sensores no solo com sinal */}
      {[
        { x: 52, y: 150 },
        { x: 168, y: 140 },
        { x: 252, y: 162 },
      ].map((s) => (
        <g key={s.x}>
          <path
            d={`M${s.x} ${s.y} v -16`}
            strokeWidth="2"
            strokeLinecap="round"
            className="stroke-primary"
          />
          <circle cx={s.x} cy={s.y - 18} r="3" className="fill-primary" />
          <g fill="none" strokeWidth="1.3" strokeLinecap="round" className="stroke-tech/70">
            <path d={`M${s.x + 5} ${s.y - 23} q 4 5 0 10`} />
            <path d={`M${s.x - 5} ${s.y - 23} q -4 5 0 10`} />
          </g>
        </g>
      ))}

      {/* Rede entre os pontos */}
      <g
        fill="none"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        strokeLinecap="round"
        className="stroke-tech/45"
      >
        <path d="M52 132 Q 110 104 168 122" />
        <path d="M168 122 Q 214 128 252 144" />
        <path d="M109 66 Q 178 82 246 40" />
      </g>
    </svg>
  )
}

/** Agricultura 5.0 — pessoas e máquinas juntas, natureza e circuito no mesmo traço. */
export function IllustrationRegenerativeField({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={cn('h-full w-full', className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Ilustração de lavoura regenerativa: uma pessoa e um robô agrícola lado a lado, com uma folha atravessada por trilhas de circuito."
    >
      <defs>
        <linearGradient id="sky50" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="[stop-color:var(--color-leaf)]" stopOpacity="0.5" />
          <stop offset="100%" className="[stop-color:var(--color-tech)]" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="ground50" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="[stop-color:var(--color-leaf)]" stopOpacity="0.5" />
          <stop offset="100%" className="[stop-color:var(--color-primary)]" stopOpacity="0.78" />
        </linearGradient>
      </defs>

      <rect width="320" height="200" fill="url(#sky50)" />

      {/* Sol baixo */}
      <circle cx="258" cy="52" r="18" className="fill-wheat/65" />

      {/* Horizonte */}
      <path
        d="M0 120 Q 60 108 118 118 T 232 112 T 320 118 L 320 126 L 0 126 Z"
        className="fill-primary/45"
      />

      <rect y="120" width="320" height="80" fill="url(#ground50)" />
      <FieldRows className="stroke-primary/50" />

      {/*
        Folha atravessada por trilhas de circuito — a mesma ideia da marca do
        projeto, ampliada: natureza e técnica no mesmo desenho.
      */}
      <g transform="translate(28 26)">
        <path
          d="M64 4 C 64 46 40 74 4 82 C 0 40 24 8 64 4 Z"
          className="fill-leaf/25 stroke-leaf"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M10 78 C 26 58 42 38 54 16"
          className="stroke-leaf"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <g className="stroke-tech" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M36 44 l 14 4" />
          <path d="M24 58 l 11 7" />
          <path d="M47 28 l 10 -3" />
        </g>
        <g className="fill-tech">
          <circle cx="54" cy="16" r="3" />
          <circle cx="51" cy="49" r="2.6" />
          <circle cx="36" cy="66" r="2.6" />
          <circle cx="58" cy="24" r="2.2" />
        </g>
      </g>

      {/* Robô agrícola autônomo */}
      <g transform="translate(196 128)">
        <rect x="0" y="0" width="42" height="22" rx="5" className="fill-tech/85" />
        <rect x="8" y="6" width="12" height="8" rx="2" className="fill-background/85" />
        <circle cx="30" cy="10" r="3" className="fill-leaf" />
        <path d="M6 22 v 8 M36 22 v 8" strokeWidth="2.5" strokeLinecap="round" className="stroke-tech" />
        <circle cx="6" cy="33" r="4" className="fill-foreground/70" />
        <circle cx="36" cy="33" r="4" className="fill-foreground/70" />
        {/* Braço que inspeciona a planta */}
        <path
          d="M42 6 q 12 -2 14 10"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-tech"
        />
        <circle cx="57" cy="17" r="2.4" className="fill-tech" />
      </g>

      {/* Pessoa, lado a lado com a máquina — colaboração é o tema da etapa */}
      <g transform="translate(150 122)">
        <circle cx="10" cy="4" r="5" className="fill-earth" />
        <path
          d="M10 10 v 16 M10 26 l -6 12 M10 26 l 6 12 M2 16 h 16"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
          className="stroke-earth"
        />
        {/* Tablet na mão, recebendo o dado do robô */}
        <rect x="16" y="12" width="9" height="7" rx="1.5" className="fill-tech/80" />
      </g>

      {/* Dado circulando entre pessoa e máquina */}
      <g
        fill="none"
        strokeWidth="1.3"
        strokeDasharray="3 4"
        strokeLinecap="round"
        className="stroke-tech/55"
      >
        <path d="M178 132 Q 190 122 200 130" />
      </g>

      {/* Brotos novos em primeiro plano */}
      {[70, 104, 268].map((x) => (
        <g key={x} transform={`translate(${x} 176)`}>
          <path d="M0 12 v -10" strokeWidth="1.8" strokeLinecap="round" className="stroke-primary" />
          <path
            d="M0 4 q -7 -4 -9 2 q 6 3 9 -2 Z M0 6 q 7 -5 9 1 q -6 4 -9 -1 Z"
            className="fill-leaf/70"
          />
        </g>
      ))}
    </svg>
  )
}
