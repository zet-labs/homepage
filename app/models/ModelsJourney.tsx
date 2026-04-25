import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MODEL_IDS, type ModelId, zetModelById } from '@/app/lib/zet-models';
import { ModelGlyph, SvgModelGlyph } from '../components/ModelGlyph';

const JOURNEY_ROMAN = ['I', 'II', 'III'] as const;

/** Copy keys for the narrative bridges between journey sections (second → third step). */
const JOURNEY_BRIDGE_KEYS = ['bridgeNanoToFlow', 'bridgeFlowToOne'] as const;

const stepPhaseKey: Record<ModelId, 'nanoPhase' | 'flowPhase' | 'onePhase'> = {
  nano: 'nanoPhase',
  flow: 'flowPhase',
  one: 'onePhase',
};

const specKey: Record<ModelId, 'nanoSpecs' | 'flowSpecs' | 'oneSpecs'> = {
  nano: 'nanoSpecs',
  flow: 'flowSpecs',
  one: 'oneSpecs',
};

function Meridian({
  label,
  title,
  caption,
  legendLeft,
  legendMid,
  legendRight,
  names,
  axisLabel,
  nanoTag,
  flowTag,
  oneTag,
  stepChangeLabel,
  journeyLine,
}: {
  label: string;
  title: string;
  caption: string;
  legendLeft: string;
  legendMid: string;
  legendRight: string;
  names: { nano: string; flow: string; one: string };
  axisLabel: string;
  nanoTag: string;
  flowTag: string;
  oneTag: string;
  stepChangeLabel: string;
  journeyLine: string;
}) {
  return (
    <section className="reveal-on-scroll relative mx-auto w-full max-w-[1180px] pt-12 pb-20 max-[480px]:pt-10 max-[480px]:pb-16 md:pt-28 md:pb-48 lg:pb-56">
      <div className="mb-12 flex flex-col gap-5 max-[480px]:mb-10 max-[480px]:gap-4 md:mb-28 md:gap-7">
        <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[rgb(var(--color-foreground-muted)/0.7)]">
          {label}
        </span>
        <h2 className="max-w-[min(18ch,100%)] text-[clamp(1.65rem,5.5vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.045em] text-[rgb(var(--color-foreground))] font-[family-name:var(--font-geist-sans)]">
          {title}
        </h2>
        <p className="max-w-[56ch] text-[0.95rem] leading-[1.72] text-[rgb(var(--color-foreground-muted)/0.78)] max-[480px]:text-[0.92rem] md:text-[1.05rem]">
          {caption}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[22px] border border-[rgb(var(--color-foreground)/0.08)] bg-[radial-gradient(65%_80%_at_50%_0%,rgb(var(--color-accent-indigo)/0.08),transparent_70%),linear-gradient(180deg,rgb(var(--color-surface)/0.55),rgb(var(--color-surface)/0.12))] shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] md:rounded-[32px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(var(--color-foreground) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--color-foreground) / 0.06) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(75% 80% at 50% 50%, black, transparent 95%)',
          }}
        />

        <svg
          viewBox="0 0 1200 395"
          preserveAspectRatio="none"
          className="relative block h-[min(50vh,380px)] w-full max-[480px]:h-[min(42vh,290px)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="meridian-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0.62" />
              <stop offset="42%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0.78" />
              <stop offset="100%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0.94" />
            </linearGradient>
            <linearGradient id="meridian-glow-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0.18" />
              <stop offset="42%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0.28" />
              <stop offset="100%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0.38" />
            </linearGradient>
            <linearGradient id="meridian-area" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0.06" />
              <stop offset="42%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0.17" />
            </linearGradient>
            <radialGradient id="one-bloom" cx="82%" cy="18%" r="55%">
              <stop offset="0%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="node-blue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0.85" />
              <stop offset="70%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0.05" />
              <stop offset="100%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="node-indigo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0.85" />
              <stop offset="70%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0.05" />
              <stop offset="100%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="node-purple" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0.92" />
              <stop offset="65%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0.06" />
              <stop offset="100%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* One-zone ambient bloom */}
          <rect x="0" y="0" width="1200" height="395" fill="url(#one-bloom)" />

          {/* Subtle horizontal gridlines — "marketing chart" feel */}
          {([72, 138, 204, 270, 336] as number[]).map((gy) => (
            <line
              key={gy}
              x1="48"
              y1={gy}
              x2="1152"
              y2={gy}
              stroke="rgb(var(--color-foreground))"
              strokeOpacity="0.035"
              strokeWidth="0.6"
            />
          ))}

          {/* Y-axis spine */}
          <line
            x1="48"
            y1="48"
            x2="48"
            y2="345"
            stroke="rgb(var(--color-foreground))"
            strokeOpacity="0.055"
            strokeWidth="0.75"
          />

          {/* Y-axis label */}
          <text
            x="16"
            y="197"
            textAnchor="middle"
            fontSize="9"
            fontWeight="500"
            fill="rgb(var(--color-foreground-muted))"
            fillOpacity="0.28"
            letterSpacing="0.18em"
            transform="rotate(-90 16 197)"
            style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
          >
            {axisLabel}
          </text>

          {/* Area fill under the curve */}
          <path
            d="M 148 300 C 248 300, 338 262, 445 256 C 532 251, 652 106, 1065 92 L 1065 348 L 148 348 Z"
            fill="url(#meridian-area)"
          />

          {/* Flow baseline dashed — shows "plateau" before the leap */}
          <line
            x1="445"
            y1="256"
            x2="1148"
            y2="256"
            stroke="rgb(var(--color-accent-indigo))"
            strokeOpacity="0.12"
            strokeWidth="0.7"
            strokeDasharray="4 9"
          />

          {/* Leap bracket — vertical bar on the far right showing the delta */}
          <line
            x1="1138"
            y1="256"
            x2="1138"
            y2="92"
            stroke="rgb(var(--color-accent-purple))"
            strokeOpacity="0.2"
            strokeWidth="0.75"
          />
          <line
            x1="1128"
            y1="256"
            x2="1148"
            y2="256"
            stroke="rgb(var(--color-accent-purple))"
            strokeOpacity="0.2"
            strokeWidth="0.75"
          />
          <line
            x1="1128"
            y1="92"
            x2="1148"
            y2="92"
            stroke="rgb(var(--color-accent-purple))"
            strokeOpacity="0.2"
            strokeWidth="0.75"
          />
          <text
            x="1158"
            y="178"
            fontSize="13"
            fontWeight="600"
            fill="rgb(var(--color-accent-purple))"
            fillOpacity="0.42"
            style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
          >
            ∞
          </text>

          {/* Glow pass for the curve (wide, blurred via opacity trick) */}
          <path
            d="M 148 300 C 248 300, 338 262, 445 256 C 532 251, 652 106, 1065 92"
            fill="none"
            stroke="url(#meridian-glow-stroke)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />

          {/* Node halos */}
          <circle
            cx="148"
            cy="300"
            r="48"
            fill="url(#node-blue)"
            className="node-halo"
            style={{ animationDelay: '0.4s' }}
          />
          <circle
            cx="445"
            cy="256"
            r="58"
            fill="url(#node-indigo)"
            className="node-halo"
            style={{ animationDelay: '1.6s' }}
          />
          <circle
            cx="1065"
            cy="92"
            r="88"
            fill="url(#node-purple)"
            className="node-halo"
            style={{ animationDelay: '2.8s' }}
          />

          {/* Main curve */}
          <path
            className="meridian-path"
            d="M 148 300 C 248 300, 338 262, 445 256 C 532 251, 652 106, 1065 92"
            fill="none"
            stroke="url(#meridian-stroke)"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Model glyphs */}
          <SvgModelGlyph idPrefix="meridian" model="nano" cx={148} cy={300} scale={0.82} />
          <SvgModelGlyph idPrefix="meridian" model="flow" cx={445} cy={256} scale={0.98} />
          <SvgModelGlyph idPrefix="meridian" model="one" cx={1065} cy={92} scale={1.18} />

          {/* Labels and capability tags */}
          <g fontFamily="var(--font-geist-sans), system-ui, sans-serif">
            {/* Nano */}
            <text
              x="148"
              y="352"
              textAnchor="middle"
              fontSize="13"
              fontWeight="500"
              fill="rgb(var(--color-foreground))"
              letterSpacing="-0.01em"
            >
              {names.nano}
            </text>
            <text
              x="148"
              y="368"
              textAnchor="middle"
              fontSize="9"
              fontWeight="500"
              fill="rgb(var(--color-accent-blue))"
              fillOpacity="0.62"
              letterSpacing="0.12em"
            >
              {nanoTag}
            </text>

            {/* Flow */}
            <text
              x="445"
              y="293"
              textAnchor="middle"
              fontSize="14"
              fontWeight="500"
              fill="rgb(var(--color-foreground))"
              letterSpacing="-0.01em"
            >
              {names.flow}
            </text>
            <text
              x="445"
              y="308"
              textAnchor="middle"
              fontSize="9"
              fontWeight="500"
              fill="rgb(var(--color-accent-indigo))"
              fillOpacity="0.72"
              letterSpacing="0.1em"
            >
              {flowTag}
            </text>

            {/* One */}
            <text
              x="1065"
              y="50"
              textAnchor="middle"
              fontSize="15"
              fontWeight="600"
              fill="rgb(var(--color-foreground))"
              letterSpacing="-0.02em"
            >
              {names.one}
            </text>
            <text
              x="1065"
              y="68"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fill="rgb(var(--color-accent-purple))"
              fillOpacity="0.84"
              letterSpacing="0.18em"
            >
              {oneTag}
            </text>
          </g>

          {/* Callout badge — drawn last so it sits on top of the curve and glow */}
          <rect
            x="668"
            y="128"
            width="98"
            height="24"
            rx="12"
            fill="rgb(var(--color-surface))"
            fillOpacity="1"
          />
          <rect
            x="668"
            y="128"
            width="98"
            height="24"
            rx="12"
            fill="rgb(var(--color-accent-purple))"
            fillOpacity="0.12"
            stroke="rgb(var(--color-accent-purple))"
            strokeOpacity="0.5"
            strokeWidth="0.9"
          />
          <text
            x="717"
            y="140"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontWeight="700"
            fill="rgb(var(--color-accent-purple))"
            letterSpacing="0.16em"
            style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}
          >
            {stepChangeLabel}
          </text>
        </svg>

        <p className="border-t border-[rgb(var(--color-foreground)/0.05)] px-5 py-4 text-center text-[11px] leading-[1.65] text-[rgb(var(--color-foreground-muted)/0.62)] max-[480px]:px-4 max-[480px]:py-3 sm:px-8 md:px-14 md:py-5 md:text-[12px]">
          {journeyLine}
        </p>

        <div className="flex flex-col gap-3 border-t border-[rgb(var(--color-foreground)/0.06)] px-5 py-5 text-[11px] text-[rgb(var(--color-foreground-muted)/0.72)] max-[480px]:gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-7 sm:text-[12px] md:px-14 md:py-8">
          <span className="inline-flex min-h-[2.75rem] items-center gap-2.5 sm:min-h-0">
            <ModelGlyph model="nano" size="sm" className="opacity-95" aria-hidden />
            {legendLeft}
          </span>
          <span className="inline-flex min-h-[2.75rem] items-center gap-2.5 sm:min-h-0">
            <ModelGlyph model="flow" size="sm" className="opacity-95" aria-hidden />
            {legendMid}
          </span>
          <span className="inline-flex min-h-[2.75rem] items-center gap-2.5 sm:min-h-0">
            <ModelGlyph model="one" size="sm" className="opacity-95" aria-hidden />
            {legendRight}
          </span>
        </div>
      </div>
    </section>
  );
}

function NanoEdgeCinema({
  foot,
  deviceLabels,
}: {
  foot: string;
  deviceLabels: [string, string, string];
}) {
  const [a, b, c] = deviceLabels;
  const hx = 200;
  const hy = 132;
  return (
    <div
      className="relative isolate flex h-[min(340px,68vw)] min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[22px] border border-[rgb(var(--color-foreground)/0.08)] bg-[radial-gradient(72%_62%_at_50%_52%,rgb(var(--color-accent-blue)/0.12),transparent_62%),radial-gradient(44%_36%_at_50%_18%,rgb(255_255_255/0.08),transparent_82%),linear-gradient(180deg,rgb(var(--color-surface)/0.68),rgb(var(--color-surface)/0.12))] shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_24px_70px_rgb(0_0_0/0.14)] [background-clip:padding-box] max-[480px]:min-h-[200px] md:min-h-[260px] md:h-[min(360px,62vw)] md:rounded-[28px]"
      aria-hidden
    >
      <div className="nano-stage-sheen pointer-events-none absolute inset-0 z-[1]" />
      <div
        className="pointer-events-none absolute inset-[10%] rounded-[24px] border border-[rgb(255_255_255/0.04)] opacity-60"
        style={{ boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.04)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[0] opacity-[0.28]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgb(var(--color-background-start) / 0.4) 0%, transparent 58%)',
        }}
      />

      <svg
        className="relative z-[2] w-[min(100%,340px)] shrink-0 md:w-[min(100%,380px)]"
        viewBox="0 0 400 248"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="nano-hub-bloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0.34" />
            <stop offset="48%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0.08" />
            <stop offset="100%" stopColor="rgb(var(--color-accent-blue))" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nano-shell" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(255 255 255 / 0.16)" />
            <stop offset="100%" stopColor="rgb(255 255 255 / 0)" />
          </radialGradient>
          <filter id="nano-icon-soft" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.55" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx={hx}
          cy={hy}
          r="67"
          fill="url(#nano-shell)"
          opacity="0.24"
          className="nano-shell-ring"
        />
        <circle
          cx={hx}
          cy={hy}
          r="44"
          fill="url(#nano-hub-bloom)"
          className="nano-edge-hub-bloom"
        />
        <circle
          cx={hx}
          cy={hy}
          r="17"
          fill="rgb(var(--color-background-start) / 0.5)"
          stroke="rgb(var(--color-accent-blue) / 0.5)"
          strokeWidth="1.05"
          className="nano-edge-hub-ring"
        />
        <circle
          cx={hx}
          cy={hy}
          r="4.5"
          fill="rgb(var(--color-accent-blue) / 0.45)"
          className="nano-edge-hub-dot"
        />

        <path
          d={`M 78 156 Q 136 142 ${hx} ${hy}`}
          stroke="rgb(var(--color-accent-blue) / 0.18)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M ${hx} 78 L ${hx} 108`}
          stroke="rgb(var(--color-accent-blue) / 0.18)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M 322 156 Q 264 142 ${hx} ${hy}`}
          stroke="rgb(var(--color-accent-blue) / 0.18)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={`M 78 156 Q 136 142 ${hx} ${hy}`}
          stroke="rgb(var(--color-accent-blue) / 0.42)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          className="nano-signal-path"
        />
        <path
          d={`M ${hx} 78 L ${hx} 108`}
          stroke="rgb(var(--color-accent-blue) / 0.42)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          className="nano-signal-path"
          style={{ animationDelay: '-1.6s' }}
        />
        <path
          d={`M 322 156 Q 264 142 ${hx} ${hy}`}
          stroke="rgb(var(--color-accent-blue) / 0.42)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          className="nano-signal-path"
          style={{ animationDelay: '-3.2s' }}
        />

        <g filter="url(#nano-icon-soft)" opacity="0.94" className="nano-device-group">
          <rect
            x="57"
            y="131"
            width="40"
            height="58"
            rx="14"
            fill="rgb(255 255 255 / 0.04)"
            stroke="rgb(255 255 255 / 0.06)"
            strokeWidth="0.8"
          />
          <rect
            x="64"
            y="138"
            width="26"
            height="44"
            rx="5"
            stroke="rgb(var(--color-accent-blue) / 0.58)"
            strokeWidth="1"
            fill="rgb(var(--color-surface) / 0.22)"
          />
          <rect
            x="71"
            y="144"
            width="12"
            height="2.5"
            rx="0.75"
            fill="rgb(var(--color-accent-blue) / 0.3)"
          />
          <line
            x1="77"
            y1="174"
            x2="77"
            y2="176"
            stroke="rgb(var(--color-accent-blue) / 0.4)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        <g
          filter="url(#nano-icon-soft)"
          opacity="0.94"
          className="nano-device-group"
          style={{ animationDelay: '-2.2s' }}
        >
          <rect
            x="150"
            y="38"
            width="100"
            height="68"
            rx="22"
            fill="rgb(255 255 255 / 0.04)"
            stroke="rgb(255 255 255 / 0.06)"
            strokeWidth="0.8"
          />
          <rect
            x="174"
            y="54"
            width="52"
            height="34"
            rx="4"
            stroke="rgb(var(--color-accent-blue) / 0.5)"
            strokeWidth="1"
            fill="rgb(var(--color-surface) / 0.18)"
          />
          <rect
            x="180"
            y="60"
            width="40"
            height="22"
            rx="1.5"
            fill="rgb(var(--color-accent-blue) / 0.05)"
            stroke="rgb(var(--color-accent-blue) / 0.18)"
            strokeWidth="0.65"
          />
          <path
            d="M 162 92 H 238 L 246 98 H 154 Z"
            fill="rgb(var(--color-surface) / 0.28)"
            stroke="rgb(var(--color-accent-blue) / 0.38)"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
        </g>

        <g
          filter="url(#nano-icon-soft)"
          opacity="0.94"
          className="nano-device-group"
          style={{ animationDelay: '-4.1s' }}
        >
          <rect
            x="302"
            y="134"
            width="46"
            height="58"
            rx="16"
            fill="rgb(255 255 255 / 0.04)"
            stroke="rgb(255 255 255 / 0.06)"
            strokeWidth="0.8"
          />
          <rect
            x="310"
            y="142"
            width="30"
            height="42"
            rx="5"
            stroke="rgb(var(--color-accent-blue) / 0.52)"
            strokeWidth="1"
            fill="rgb(var(--color-surface) / 0.2)"
          />
          <circle
            cx="325"
            cy="160"
            r="4.5"
            stroke="rgb(var(--color-accent-blue) / 0.28)"
            strokeWidth="0.75"
            fill="none"
          />
          <circle cx="325" cy="160" r="1.8" fill="rgb(var(--color-accent-blue) / 0.22)" />
        </g>

        <g
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fontSize="9"
          fontWeight="500"
          fill="rgb(var(--color-foreground-muted) / 0.68)"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          <text x="77" y="208">
            {a}
          </text>
          <text x="200" y="42">
            {b}
          </text>
          <text x="325" y="208">
            {c}
          </text>
        </g>
      </svg>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-[3] text-center text-[10px] font-medium tracking-[0.16em] text-[rgb(var(--color-foreground-muted)/0.5)] md:bottom-5 md:text-[11px]">
        {foot}
      </div>
    </div>
  );
}

function AscentRail({
  title,
  lead,
  ariaLabel,
  chapters,
}: {
  title: string;
  lead: string;
  ariaLabel: string;
  chapters: {
    id: ModelId;
    name: string;
    phase: string;
    index: string;
    accent: string;
  }[];
}) {
  return (
    <div className="reveal-on-scroll w-full">
      <div className="relative overflow-hidden rounded-[22px] border border-[rgb(var(--color-foreground)/0.08)] bg-[linear-gradient(165deg,rgb(var(--color-surface)/0.45),rgb(var(--color-surface)/0.06))] shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] md:rounded-[28px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(105deg, rgb(var(--color-accent-blue) / 0.05) 0%, transparent 38%, transparent 62%, rgb(var(--color-accent-purple) / 0.05) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute left-5 right-5 top-0 h-px sm:left-8 sm:right-8 md:left-10 md:right-10"
          style={{
            background:
              'linear-gradient(90deg, rgb(var(--color-accent-blue) / 0.35), rgb(var(--color-accent-indigo) / 0.35), rgb(var(--color-accent-purple) / 0.35))',
          }}
        />

        <div className="relative px-4 pb-6 pt-8 max-[480px]:px-3 sm:px-6 md:px-10 md:pb-10 md:pt-12">
          <div className="mb-6 max-w-[48ch] space-y-2.5 max-[480px]:mb-5 md:mb-10 md:space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[rgb(var(--color-foreground-muted)/0.65)] max-[480px]:tracking-[0.22em] sm:text-[11px] sm:tracking-[0.28em]">
              {title}
            </p>
            <p className="text-[clamp(1rem,4.2vw,1.2rem)] font-medium leading-snug tracking-[-0.02em] text-[rgb(var(--color-foreground-soft)/0.92)]">
              {lead}
            </p>
          </div>

          <nav
            className="grid grid-cols-1 divide-y divide-[rgb(var(--color-foreground)/0.07)] md:grid-cols-3 md:divide-x md:divide-y-0"
            aria-label={ariaLabel}
          >
            {chapters.map((ch) => (
              <a
                key={ch.id}
                href={`#${ch.id}`}
                className="ascent-chapter-link group relative flex min-h-[3.5rem] flex-col gap-3 rounded-xl py-6 pl-0.5 pr-1 transition-colors [-webkit-tap-highlight-color:transparent] first:pt-2 last:pb-2 active:bg-[rgb(var(--color-foreground)/0.03)] max-[480px]:gap-2.5 max-[480px]:py-5 sm:min-h-0 sm:rounded-none sm:py-8 sm:pl-1 sm:pr-2 sm:first:pt-0 sm:last:pb-0 sm:active:bg-transparent md:px-6 md:py-2 md:pl-8 md:pr-6 md:first:pl-6"
                style={{ ['--chapter-accent' as string]: ch.accent }}
              >
                <span
                  aria-hidden
                  className="ascent-numeral font-[family-name:var(--font-geist-sans)] text-[clamp(2.75rem,11vw,4.5rem)] font-medium leading-[0.85] tracking-[-0.06em] text-[rgb(var(--color-foreground)/0.06)] sm:text-[clamp(3.25rem,8vw,4.5rem)]"
                >
                  {ch.index}
                </span>
                <div className="relative -mt-1 flex flex-col gap-1.5 max-[480px]:-mt-0.5 md:-mt-3 md:gap-2">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="transition-transform duration-300 group-hover:scale-[1.06] group-active:scale-[1.02]">
                      <ModelGlyph model={ch.id} size="md" className="opacity-[0.96]" aria-hidden />
                    </span>
                    <span className="text-[clamp(1.35rem,5vw,1.85rem)] font-medium tracking-[-0.04em] text-[rgb(var(--color-foreground))] font-[family-name:var(--font-geist-sans)]">
                      {ch.name}
                    </span>
                  </span>
                  <span className="text-[12px] font-medium uppercase tracking-[0.16em] text-[rgb(var(--color-foreground-muted)/0.55)] max-[480px]:text-[11px] max-[480px]:tracking-[0.14em] sm:text-[13px] sm:tracking-[0.18em]">
                    {ch.phase}
                  </span>
                </div>
                <span
                  className="mt-2 block h-px w-10 origin-left transition-all duration-300 group-hover:w-16"
                  style={{ background: `linear-gradient(90deg, ${ch.accent}, transparent)` }}
                />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function FlowDiagram({ foot }: { foot: string }) {
  const tools = [
    { id: 'crm', label: 'CRM', x: 82, y: 74, delay: '0s' },
    { id: 'api', label: 'API', x: 318, y: 74, delay: '-1.3s' },
    { id: 'db', label: 'DB', x: 82, y: 168, delay: '-2.2s' },
    { id: 'mail', label: 'Mail', x: 318, y: 168, delay: '-3.1s' },
  ];

  return (
    <div
      className="relative isolate h-[min(340px,72vw)] min-h-[220px] w-full overflow-hidden rounded-[22px] border border-[rgb(var(--color-foreground)/0.08)] bg-[radial-gradient(90%_74%_at_50%_45%,rgb(var(--color-accent-indigo)/0.16),transparent_70%),radial-gradient(36%_36%_at_50%_18%,rgb(255_255_255/0.08),transparent_90%),linear-gradient(195deg,rgb(var(--color-surface)/0.58),rgb(var(--color-surface)/0.12))] shadow-[inset_0_1px_0_rgb(255_255_255/0.04),0_24px_70px_rgb(0_0_0/0.14)] [background-clip:padding-box] max-[480px]:min-h-[200px] md:h-[min(380px,62vw)] md:min-h-0 md:rounded-[28px]"
      aria-hidden
    >
      <div className="flow-stage-sheen pointer-events-none absolute inset-0 z-[1]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 240" fill="none">
        <defs>
          <linearGradient id="flow-hub" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0.85" />
            <stop offset="100%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="flow-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0.2" />
            <stop offset="70%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="flow-packet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-accent-indigo))" stopOpacity="0.85" />
            <stop offset="100%" stopColor="rgb(var(--color-accent-purple))" stopOpacity="0.78" />
          </linearGradient>
        </defs>

        <g transform="translate(200 120)">
          <g className="flow-ring-spin">
            <circle
              r="74"
              fill="none"
              stroke="rgb(var(--color-accent-indigo) / 0.12)"
              strokeWidth="0.9"
              strokeDasharray="3 8"
            />
            <circle
              r="93"
              fill="none"
              stroke="rgb(var(--color-accent-purple) / 0.08)"
              strokeWidth="0.9"
              strokeDasharray="2 12"
            />
          </g>
          <circle r="56" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="0.7" />
        </g>

        <circle cx="200" cy="120" r="60" fill="url(#flow-halo)" />

        {tools.map((t, i) => (
          <g key={t.id}>
            <path
              d={`M ${t.x} ${t.y} Q ${(t.x + 200) / 2} ${(t.y + 120) / 2 - 12} 200 120`}
              stroke="rgb(var(--color-accent-indigo) / 0.2)"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M ${t.x} ${t.y} Q ${(t.x + 200) / 2} ${(t.y + 120) / 2 - 12} 200 120`}
              stroke="rgb(var(--color-accent-indigo) / 0.5)"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
              className="flow-signal-path"
              style={{ animationDelay: t.delay }}
            />
            <g className="flow-node-float" style={{ animationDelay: `${i * 0.7}s` }}>
              <rect
                x={t.x - 42}
                y={t.y - 22}
                width="84"
                height="44"
                rx="18"
                fill="rgb(var(--color-surface) / 0.74)"
                stroke="rgb(255 255 255 / 0.06)"
                strokeWidth="0.8"
              />
              <rect
                x={t.x - 30}
                y={t.y - 14}
                width="60"
                height="28"
                rx="14"
                fill="rgb(var(--color-surface))"
                stroke="rgb(var(--color-accent-indigo) / 0.4)"
                strokeWidth="1"
              />
              <circle cx={t.x - 18} cy={t.y} r="2.5" fill="url(#flow-packet)" />
            </g>
            <text
              x={t.x}
              y={t.y + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              fill="rgb(var(--color-foreground) / 0.78)"
              style={{
                fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                letterSpacing: '-0.01em',
              }}
            >
              {t.label}
            </text>
          </g>
        ))}

        <circle
          cx="200"
          cy="120"
          r="40"
          fill="url(#flow-hub)"
          opacity="0.2"
          className="flow-hub-breathe"
        />
        <circle
          cx="200"
          cy="120"
          r="26"
          fill="rgb(var(--color-surface))"
          stroke="rgb(var(--color-accent-indigo))"
          strokeWidth="1.3"
        />
        <circle
          cx="200"
          cy="120"
          r="16"
          fill="rgb(255 255 255 / 0.02)"
          stroke="rgb(255 255 255 / 0.08)"
          strokeWidth="0.6"
        />
        <text
          x="200"
          y="125"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="rgb(var(--color-foreground))"
          style={{
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          Flow
        </text>
      </svg>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 px-2 text-center text-[11px] leading-snug text-[rgb(var(--color-foreground-muted)/0.6)] md:bottom-6 md:px-0 md:text-[12px]">
        {foot}
      </div>
    </div>
  );
}

function OneMonolith({
  modelName,
  badge,
  subtitle,
  strata,
}: {
  modelName: string;
  badge: string;
  subtitle: string;
  strata: string[];
}) {
  const n = strata.length;
  return (
    <div className="one-flagship-card relative isolate w-full overflow-hidden rounded-[22px] border border-[rgb(var(--color-accent-purple)/0.12)] bg-[linear-gradient(168deg,rgb(var(--color-accent-purple)/0.07)_0%,rgb(var(--color-surface)/0.72)_18%,rgb(var(--color-background-start)/0.92)_45%,rgb(var(--color-background-start))_100%),radial-gradient(90%_70%_at_100%_0%,rgb(var(--color-accent-pink)/0.06),transparent_55%)] shadow-[0_32px_80px_rgb(0_0_0/0.22),0_48px_100px_-48px_rgb(var(--color-accent-purple)/0.18),inset_0_1px_0_rgb(255_255_255/0.05)] backdrop-blur-[2px] [background-clip:padding-box] md:rounded-[32px]">
      {/* Brand-tinted fields — purple + pink drift */}
      <div
        className="one-ambient-field pointer-events-none absolute -left-[22%] top-1/2 h-[min(125%,540px)] w-[min(145%,660px)] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_52%_58%_at_48%_48%,rgb(var(--color-accent-purple)/0.26),rgb(var(--color-accent-indigo)/0.06)_52%,transparent_72%)] blur-3xl"
        aria-hidden
      />
      <div
        className="one-ambient-field-pink pointer-events-none absolute -right-[18%] bottom-[-15%] h-[min(95%,420px)] w-[min(85%,480px)] rounded-full bg-[radial-gradient(ellipse_58%_56%_at_50%_50%,rgb(var(--color-accent-pink)/0.2),rgb(var(--color-accent-purple)/0.05)_45%,transparent_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(155deg, rgb(var(--color-accent-purple) / 0.06) 0%, transparent 32%), linear-gradient(210deg, rgb(var(--color-accent-pink) / 0.05) 0%, transparent 40%), linear-gradient(165deg, rgb(255 255 255 / 0.035) 0%, transparent 42%)',
        }}
        aria-hidden
      />
      <div className="one-flagship-sheen pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <div className="relative z-[2] px-5 py-12 max-[480px]:px-4 max-[480px]:py-10 md:px-14 md:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[920px] gap-10 max-[480px]:gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center md:gap-16 lg:gap-20">
          {/* Apex mark */}
          <div className="one-apex-column flex flex-col items-center justify-center text-center md:items-center">
            <div className="relative flex h-[min(240px,56vw)] w-full max-w-[300px] items-center justify-center max-[380px]:max-w-[280px] md:h-[300px] md:max-w-none">
              <svg
                className="absolute inset-0 m-auto h-[88%] w-[88%] max-h-[280px] max-w-[280px]"
                viewBox="0 0 240 240"
                fill="none"
                aria-hidden
              >
                <defs>
                  <radialGradient id="one-core-bloom" cx="50%" cy="50%" r="50%">
                    <stop
                      offset="0%"
                      stopColor="rgb(var(--color-accent-purple))"
                      stopOpacity="0.32"
                    />
                    <stop
                      offset="42%"
                      stopColor="rgb(var(--color-accent-pink))"
                      stopOpacity="0.12"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(var(--color-accent-purple))"
                      stopOpacity="0"
                    />
                  </radialGradient>
                  <linearGradient id="one-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop
                      offset="0%"
                      stopColor="rgb(var(--color-accent-purple))"
                      stopOpacity="0.72"
                    />
                    <stop
                      offset="48%"
                      stopColor="rgb(var(--color-accent-pink))"
                      stopOpacity="0.55"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(var(--color-accent-indigo))"
                      stopOpacity="0.45"
                    />
                  </linearGradient>
                </defs>
                <circle
                  cx="120"
                  cy="120"
                  r="52"
                  fill="url(#one-core-bloom)"
                  className="one-core-bloom"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="112"
                  stroke="rgb(var(--color-accent-purple) / 0.14)"
                  strokeWidth="0.65"
                  className="one-ring-outer-glow"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="92"
                  stroke="rgb(var(--color-accent-indigo) / 0.22)"
                  strokeWidth="0.75"
                  className="one-ring-breathe"
                  style={{ animationDelay: '-2s' }}
                />
                <g transform="translate(120 120)">
                  <g className="one-dashed-orbit-group">
                    <circle
                      cx="0"
                      cy="0"
                      r="76"
                      stroke="url(#one-ring-grad)"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeDasharray="1 9"
                      opacity="0.92"
                      className="one-ring-breathe"
                      style={{ animationDelay: '-4.5s' }}
                    />
                  </g>
                </g>
                <circle
                  cx="120"
                  cy="120"
                  r="58"
                  stroke="rgb(var(--color-accent-pink) / 0.38)"
                  strokeWidth="1.2"
                  className="one-ring-breathe one-ring-pink-counter"
                />
              </svg>
              <div className="relative z-[1] flex flex-col items-center gap-1">
                <span
                  className="one-apex-wordmark font-[family-name:var(--font-geist-sans)] text-[clamp(3rem,14vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.07em] text-[rgb(var(--color-foreground))]"
                  style={{
                    textShadow:
                      '0 0 100px rgb(var(--color-accent-purple) / 0.28), 0 0 48px rgb(var(--color-accent-pink) / 0.14), 0 1px 0 rgb(255 255 255 / 0.05)',
                  }}
                >
                  {modelName}
                </span>
                <span className="one-apex-badge text-[10px] font-medium uppercase tracking-[0.32em] text-[rgb(var(--color-accent-purple)/0.72)]">
                  {badge}
                </span>
              </div>
            </div>
          </div>

          {/* Reasoning depth — timeline, no progress chrome */}
          <div className="one-reason-column relative min-w-0">
            <p className="mb-6 max-w-[40ch] text-[clamp(1rem,4vw,1.22rem)] font-medium leading-[1.38] tracking-[-0.022em] text-[rgb(var(--color-foreground-soft)/0.94)] [text-shadow:0_0_42px_rgb(var(--color-accent-purple)/0.08)] max-[480px]:mb-5 md:mb-9">
              {subtitle}
            </p>
            <div className="relative">
              <ol className="relative m-0 list-none p-0">
                {strata.map((row, i) => {
                  const last = i === n - 1;
                  return (
                    <li
                      key={`${i}-${row}`}
                      className="one-step-row relative flex gap-4 pb-8 last:pb-0 max-[480px]:gap-3.5 max-[480px]:pb-7 md:gap-5 md:pb-9"
                    >
                      {!last && (
                        <span
                          className="one-step-connector pointer-events-none absolute left-2 top-[21px] z-0 h-[calc(100%-21px)] w-px -translate-x-1/2 overflow-hidden bg-[linear-gradient(180deg,rgb(var(--color-accent-indigo)/0.35),rgb(var(--color-accent-purple)/0.55),rgb(var(--color-accent-pink)/0.4),rgb(var(--color-accent-purple)/0.35))] shadow-[0_0_10px_rgb(var(--color-accent-purple)/0.22)]"
                          aria-hidden
                        />
                      )}
                      <div className="relative z-[1] mt-[5px] flex h-4 w-4 shrink-0 items-center justify-center">
                        <span
                          className={
                            last
                              ? 'one-step-dot one-step-dot--final h-2 w-2 rounded-full bg-gradient-to-br from-[rgb(var(--color-accent-purple))] to-[rgb(var(--color-accent-pink))] shadow-[0_0_0_4px_rgb(var(--color-background-start)),0_0_22px_rgb(var(--color-accent-purple)/0.5),0_0_12px_rgb(var(--color-accent-pink)/0.25)]'
                              : 'one-step-dot h-2 w-2 rounded-full border border-[rgb(var(--color-accent-purple)/0.45)] bg-[rgb(var(--color-background-start))] shadow-[0_0_0_4px_rgb(var(--color-background-start)),0_0_14px_rgb(var(--color-accent-purple)/0.18)]'
                          }
                          aria-hidden
                        />
                      </div>
                      <p className="one-step-copy m-0 min-w-0 max-w-[42ch] text-[0.94rem] leading-[1.65] tracking-[-0.012em] text-[rgb(var(--color-foreground-soft)/0.9)] max-[480px]:text-[0.9rem] md:text-[1.02rem] md:leading-[1.58]">
                        {row}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRack({
  title,
  labels,
  values,
}: {
  title: string;
  labels: { context: string; latency: string; host: string };
  values: { context: string; latency: string; host: string };
}) {
  const rows = [
    { label: labels.context, value: values.context },
    { label: labels.latency, value: values.latency },
    { label: labels.host, value: values.host },
  ];
  return (
    <div className="mt-5 max-[480px]:mt-4 md:mt-8">
      <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[rgb(var(--color-foreground-muted)/0.6)] max-[480px]:tracking-[0.18em] md:mb-5 md:text-[11px] md:tracking-[0.22em]">
        {title}
      </div>
      <dl className="flex flex-col divide-y divide-[rgb(var(--color-foreground)/0.07)] border-y border-[rgb(var(--color-foreground)/0.07)]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 py-3.5 max-[480px]:py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:py-4 md:py-5"
          >
            <dt className="shrink-0 text-[12px] text-[rgb(var(--color-foreground-muted)/0.72)] max-[480px]:text-[11px] sm:text-[13px]">
              {row.label}
            </dt>
            <dd className="text-[13px] font-medium leading-snug text-[rgb(var(--color-foreground))] tracking-[-0.01em] max-[480px]:text-[12px] sm:text-right sm:text-[14px]">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Lineage({
  kicker,
  title,
  body,
  pillars,
}: {
  kicker: string;
  title: string;
  body: string;
  pillars: { tag: string; value: string }[];
}) {
  return (
    <section className="reveal-on-scroll relative mx-auto w-full max-w-[1180px] py-20 max-[480px]:py-16 md:py-40 lg:py-48">
      <div className="grid gap-10 max-[480px]:gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-24 lg:gap-28">
        <div className="space-y-5 max-[480px]:space-y-4 md:space-y-7">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgb(var(--color-foreground-muted)/0.7)] max-[480px]:tracking-[0.2em] sm:text-[11px] sm:tracking-[0.24em]">
            {kicker}
          </span>
          <h2 className="text-[clamp(1.65rem,5.5vw,2.6rem)] font-medium leading-[1.06] tracking-[-0.045em] text-[rgb(var(--color-foreground))] font-[family-name:var(--font-geist-sans)]">
            {title}
          </h2>
          <p className="max-w-[50ch] text-[0.95rem] leading-[1.72] text-[rgb(var(--color-foreground-muted)/0.78)] max-[480px]:text-[0.92rem] md:text-[1rem] md:leading-[1.75]">
            {body}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[22px] border border-[rgb(var(--color-foreground)/0.08)] bg-[radial-gradient(80%_60%_at_20%_0%,rgb(var(--color-accent-indigo)/0.09),transparent_65%),linear-gradient(180deg,rgb(var(--color-surface)/0.5),rgb(var(--color-surface)/0.1))] p-6 max-[480px]:p-5 sm:p-8 md:rounded-[28px] md:p-14 lg:p-16">
          <svg
            viewBox="0 0 600 284"
            className="h-auto w-full min-h-[180px] max-[480px]:min-h-[160px] sm:min-h-[210px]"
            aria-hidden
          >
            {/* Gradients in SVG <stop> often fail to resolve CSS variables in WebKit — use direct stroke on the spine */}
            <circle
              cx="300"
              cy="38"
              r="8"
              fill="rgb(var(--color-background-start))"
              stroke="rgb(var(--color-accent-indigo) / 0.55)"
              strokeWidth="1.2"
            />
            <text
              x="300"
              y="16"
              textAnchor="middle"
              fontSize="11"
              fill="rgb(var(--color-foreground) / 0.82)"
              style={{
                fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                letterSpacing: '-0.01em',
                fontWeight: 500,
              }}
            >
              Zet · Core
            </text>

            <path
              d="M 300 122 C 292 122 78 178 78 215"
              stroke="rgb(var(--color-accent-blue) / 0.58)"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 300 122 C 308 122 522 178 522 215"
              stroke="rgb(var(--color-accent-purple) / 0.58)"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Solid spine (no url() gradient — WebKit ignores var() inside <stop>) */}
            <path
              d="M 300 46 L 300 215"
              fill="none"
              stroke="rgb(var(--color-accent-indigo))"
              strokeWidth="1.45"
              strokeOpacity={0.72}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="300"
              cy="122"
              r="3.5"
              fill="rgb(var(--color-accent-indigo))"
              style={{ opacity: 0.92 }}
            />

            {(
              [
                { x: 78, label: 'Nano', model: 'nano' as const },
                { x: 300, label: 'Flow', model: 'flow' as const },
                { x: 522, label: 'One', model: 'one' as const },
              ] as const
            ).map((n) => (
              <g key={n.label}>
                <circle
                  cx={n.x}
                  cy="232"
                  r="21"
                  fill="rgb(var(--color-foreground) / 0.04)"
                  stroke="rgb(var(--color-foreground) / 0.07)"
                  strokeWidth="1"
                />
                <SvgModelGlyph
                  idPrefix={`lineage-${n.label}`}
                  model={n.model}
                  cx={n.x}
                  cy={232}
                  scale={1.05}
                />
                <text
                  x={n.x}
                  y="264"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="500"
                  fill="rgb(var(--color-foreground))"
                  style={{
                    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 max-[480px]:gap-x-3 max-[480px]:gap-y-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-x-5">
            {pillars.map((p) => (
              <div key={p.tag} className="min-w-0 py-0.5">
                <div className="text-[9px] font-medium uppercase leading-tight tracking-[0.08em] text-[rgb(var(--color-foreground-muted)/0.6)] max-[380px]:text-[8px] sm:text-[10px] sm:tracking-[0.1em] md:text-[11px] md:tracking-[0.14em]">
                  {p.tag}
                </div>
                <div className="mt-1.5 text-[12px] font-medium leading-snug text-[rgb(var(--color-foreground))] tracking-[-0.01em] sm:mt-2 sm:text-[14px]">
                  {p.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ModelsJourney() {
  const t = await getTranslations();
  const tp = await getTranslations('modelsPage');

  const names = {
    nano: t('models.nano.name'),
    flow: t('models.flow.name'),
    one: t('models.one.name'),
  };

  const specLabels = {
    context: tp('specs.context'),
    latency: tp('specs.latency'),
    host: tp('specs.host'),
  };

  const oneStrata = tp.raw('oneStrata') as string[];
  const nanoDevices = tp.raw('nanoDevices') as string[];
  const nanoDeviceTriple = [
    nanoDevices[0] ?? '·',
    nanoDevices[1] ?? '·',
    nanoDevices[2] ?? '·',
  ] as [string, string, string];

  return (
    <div className="relative w-full">
      {/* ambient bloom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(92vh,960px)] overflow-visible">
        <div className="absolute -left-[20%] top-[-10%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgb(var(--color-accent-blue)/0.12),transparent_70%)] blur-3xl" />
        <div className="absolute -right-[15%] top-[5%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgb(var(--color-accent-purple)/0.1),transparent_72%)] blur-3xl" />
        <div className="absolute bottom-[8%] left-1/2 h-[40%] w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--color-accent-indigo)/0.06),transparent_74%)] blur-3xl" />
      </div>

      {/* Hero */}
      <header className="relative mx-auto flex w-full max-w-[1180px] flex-col gap-10 pb-16 pt-4 max-[480px]:gap-8 max-[480px]:pb-12 max-[480px]:pt-2 md:gap-16 md:pb-36 md:pt-8 lg:pb-44">
        <div className="reveal-on-scroll flex flex-col gap-6 max-[480px]:gap-5 md:gap-9">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgb(var(--color-foreground-muted)/0.72)] max-[480px]:tracking-[0.2em] sm:text-[11px] sm:tracking-[0.24em]">
            {tp('heroEyebrow')}
          </p>
          <h1 className="max-w-[min(20ch,100%)] text-[clamp(2.2rem,9vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.055em] text-[rgb(var(--color-foreground))] font-[family-name:var(--font-geist-sans)] sm:max-w-[18ch]">
            {tp('heroTitle')}
          </h1>
          <p className="max-w-[52ch] text-[clamp(1rem,3.8vw,1.25rem)] leading-relaxed text-[rgb(var(--color-foreground-soft)/0.9)]">
            {tp('heroLead')}
          </p>
        </div>

        <AscentRail
          title={tp('railTitle')}
          lead={tp('railLead')}
          ariaLabel={tp('railTitle')}
          chapters={MODEL_IDS.map((key, i) => ({
            id: key,
            name: t(`models.${key}.name`),
            phase: tp(stepPhaseKey[key]),
            index: JOURNEY_ROMAN[i],
            accent: zetModelById[key].color,
          }))}
        />
      </header>

      {/* Meridian */}
      <Meridian
        label={tp('meridian.label')}
        title={tp('meridian.title')}
        caption={tp('meridian.caption')}
        legendLeft={tp('meridian.legendLeft')}
        legendMid={tp('meridian.legendMid')}
        legendRight={tp('meridian.legendRight')}
        names={names}
        axisLabel={tp('meridian.axisCapability')}
        nanoTag={tp('meridian.nanoTag')}
        flowTag={tp('meridian.flowTag')}
        oneTag={tp('meridian.oneTag')}
        stepChangeLabel={tp('meridian.stepChange')}
        journeyLine={tp('meridian.journeyLine')}
      />

      {/* Journey sections */}
      <div className="relative mx-auto w-full max-w-[1180px] pt-2 max-[480px]:pt-0 md:pt-8 lg:pt-10">
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
          <div className="absolute left-1/2 top-0 h-full w-[22px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(var(--color-accent-indigo)/0.04),transparent_100%)]" />
          <div
            className="absolute left-1/2 top-[5%] h-[90%] w-px -translate-x-1/2 rounded-full opacity-[0.26]"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgb(var(--color-accent-blue) / 0.028) 18%, rgb(var(--color-accent-indigo) / 0.038) 50%, rgb(var(--color-accent-purple) / 0.028) 82%, transparent 100%)',
            }}
          />
        </div>

        <div className="flex flex-col gap-24 max-[480px]:gap-20 md:gap-56 lg:gap-64 xl:gap-72">
          {MODEL_IDS.map((key, index) => {
            const specValues = {
              context: tp(`${specKey[key]}.context`),
              latency: tp(`${specKey[key]}.latency`),
              host: tp(`${specKey[key]}.host`),
            };

            return (
              <div key={key} className="relative">
                {index > 0 && (
                  <div className="reveal-on-scroll mx-auto max-w-[min(36rem,100%)] px-4 py-14 text-center max-[480px]:px-3 max-[480px]:py-12 md:py-36 lg:py-44">
                    <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-indigo)/0.14)] to-transparent max-[480px]:mb-5 md:mb-10 md:hidden" />
                    <p className="text-[clamp(0.98rem,3.8vw,1.14rem)] leading-[1.72] tracking-[-0.01em] text-[rgb(var(--color-foreground-muted)/0.76)]">
                      {tp(JOURNEY_BRIDGE_KEYS[index - 1])}
                    </p>
                  </div>
                )}

                <section
                  id={key}
                  className={`reveal-on-scroll scroll-mt-28 max-[480px]:scroll-mt-24 md:scroll-mt-36 ${key === 'one' ? 'pb-8 max-[480px]:pb-6 md:pb-14' : 'pb-2 max-[480px]:pb-1 md:pb-6'}`}
                >
                  <div
                    className={
                      key === 'one'
                        ? 'relative flex flex-col gap-10 max-[480px]:gap-8 md:gap-24 lg:gap-28'
                        : `relative grid gap-10 max-[480px]:gap-8 md:grid-cols-2 md:gap-24 md:gap-y-20 lg:gap-x-28 ${
                            key === 'flow'
                              ? 'md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1'
                              : ''
                          }`
                    }
                  >
                    {/* Left / text */}
                    <div
                      className={`relative z-[1] flex flex-col justify-center gap-7 max-[480px]:gap-6 md:gap-10 ${
                        key === 'flow' ? 'md:pl-4 lg:pl-8' : key === 'nano' ? 'md:pr-4 lg:pr-8' : ''
                      } ${
                        /* One is flex-col (visual below full width); cap copy + “At a glance” to ~same measure as Nano/Flow’s grid text column */
                        key === 'one' ? 'w-full md:max-w-xl' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="tabular-nums text-[12px] text-[rgb(var(--color-foreground-muted)/0.5)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="h-px w-8 bg-[rgb(var(--color-foreground)/0.1)]" />
                        <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[rgb(var(--color-foreground-muted)/0.62)]">
                          {tp(stepPhaseKey[key])}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 max-[480px]:gap-x-2.5">
                        <span
                          className="flex shrink-0 items-center justify-center rounded-[10px] border border-[rgb(var(--color-foreground)/0.06)] bg-[rgb(var(--color-surface)/0.35)] p-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] md:p-2"
                          aria-hidden
                        >
                          <ModelGlyph model={key} size="lg" />
                        </span>
                        <h2 className="text-[clamp(1.85rem,6.5vw,3.2rem)] font-medium tracking-[-0.045em] text-[rgb(var(--color-foreground))] font-[family-name:var(--font-geist-sans)]">
                          {t(`models.${key}.name`)}
                        </h2>
                        <span
                          className="text-[13px] text-[rgb(var(--color-foreground-muted)/0.42)]"
                          title={tp('tierLabel')}
                        >
                          {zetModelById[key].tier}
                        </span>
                      </div>

                      <p className="text-[clamp(1.05rem,4vw,1.35rem)] font-medium leading-[1.35] tracking-[-0.025em] text-[rgb(var(--color-foreground-soft)/0.94)]">
                        {t(`models.${key}.subtitle`)}
                      </p>

                      <p className="max-w-[48ch] text-[0.94rem] leading-[1.72] text-[rgb(var(--color-foreground-muted)/0.78)] max-[480px]:text-[0.9rem]">
                        {t(`models.${key}.desc`)}
                      </p>

                      <div>
                        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[rgb(var(--color-foreground-muted)/0.55)]">
                          {t('models.bestForTitle')}
                        </p>
                        <ul className="flex flex-col gap-2.5">
                          {(t.raw(`models.${key}.bestFor`) as string[]).map((item, bfIdx) => (
                            <li
                              key={`${key}-bf-${bfIdx}`}
                              className="flex items-start gap-2.5 text-[13px] leading-snug text-[rgb(var(--color-foreground-muted)/0.88)] max-[480px]:gap-2 max-[480px]:text-[12.5px] md:gap-3 md:text-[14px]"
                            >
                              <span
                                className="mt-[0.35em] h-1 w-1 shrink-0 rounded-full"
                                style={{ backgroundColor: zetModelById[key].color }}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <SpecRack title={tp('specs.title')} labels={specLabels} values={specValues} />
                    </div>

                    {/* Right / visual */}
                    {key !== 'one' && (
                      <div
                        className={`relative z-[1] overflow-visible px-0 py-4 max-[480px]:py-3 sm:px-2 sm:py-8 ${
                          key === 'flow' ? 'md:pt-10' : 'md:pt-6'
                        }`}
                      >
                        {key === 'nano' ? (
                          <NanoEdgeCinema
                            foot={tp('nanoLatticeFoot')}
                            deviceLabels={nanoDeviceTriple}
                          />
                        ) : (
                          <FlowDiagram foot={tp('flowDiagramFoot')} />
                        )}
                      </div>
                    )}

                    {key === 'one' && (
                      <div className="overflow-visible px-0 py-4 max-[480px]:py-3 sm:px-2 sm:py-8 md:py-10">
                        <OneMonolith
                          modelName={t('models.one.name')}
                          badge={t('models.one.badge')}
                          subtitle={t('models.one.subtitle')}
                          strata={oneStrata}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className="pointer-events-none absolute left-1/2 top-10 hidden h-2 w-2 -translate-x-1/2 rounded-full border border-[rgb(var(--color-foreground)/0.06)] bg-[rgb(var(--color-background-start)/0.85)] backdrop-blur-sm md:block"
                    style={{ boxShadow: zetModelById[key].nodeGlow }}
                    aria-hidden
                  />
                </section>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lineage */}
      <Lineage
        kicker={tp('lineage.kicker')}
        title={tp('lineage.title')}
        body={tp('lineage.body')}
        pillars={tp.raw('lineage.pillars') as { tag: string; value: string }[]}
      />

      {/* Outro + CTA */}
      <footer className="reveal-on-scroll relative mx-auto mt-20 flex w-full max-w-[1180px] flex-col gap-10 border-t border-[rgb(var(--color-foreground)/0.06)] pt-16 pb-8 max-[480px]:mt-16 max-[480px]:gap-8 max-[480px]:pt-12 max-[480px]:pb-6 md:mt-40 md:flex-row md:items-end md:justify-between md:gap-20 md:pt-40 md:pb-10 lg:mt-44 lg:pt-48 lg:pb-14">
        <div className="max-w-[52ch] space-y-5 max-[480px]:space-y-4 md:space-y-7">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[rgb(var(--color-foreground-muted)/0.7)] max-[480px]:tracking-[0.2em] sm:text-[11px] sm:tracking-[0.24em]">
            {tp('outroKicker')}
          </span>
          <h2 className="text-[clamp(1.5rem,5.5vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.045em] text-[rgb(var(--color-foreground))] font-[family-name:var(--font-geist-sans)]">
            {tp('outroTitle')}
          </h2>
          <p className="text-[0.95rem] leading-[1.72] text-[rgb(var(--color-foreground-muted)/0.78)] max-[480px]:text-[0.92rem] md:text-[1rem] md:leading-[1.75]">
            {tp('outroBody')}
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 max-[480px]:gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 md:flex-col md:items-end md:gap-5">
          <Link
            href="/#waitlist"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[rgb(var(--color-foreground))] px-7 py-3.5 text-[14px] font-medium !text-[rgb(var(--color-background-start))] transition-opacity hover:opacity-[0.88] active:opacity-[0.92] sm:w-auto sm:min-h-0 sm:py-3"
          >
            {tp('ctaWaitlist')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-[14px] text-[rgb(var(--color-foreground-muted)/0.85)] transition-colors hover:text-[rgb(var(--color-foreground))] sm:min-h-0"
          >
            {tp('ctaSecondary')}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
