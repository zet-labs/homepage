import type { SVGAttributes } from 'react';
import { type ModelId, zetModelById } from '@/app/lib/zet-models';

export type { ModelId } from '@/app/lib/zet-models';

const sizeClass = {
  sm: 'h-3.5 w-3.5',
  md: 'h-[18px] w-[18px]',
  lg: 'h-7 w-7',
  xl: 'h-8 w-8',
} as const;

export type ModelGlyphSize = keyof typeof sizeClass;

function HtmlGlyph({ model }: { model: ModelId }) {
  const { icon: kind, color: accent } = zetModelById[model];

  if (kind === 'diamond') {
    return (
      <>
        <rect
          x="5.25"
          y="5.25"
          width="13.5"
          height="13.5"
          rx="2.25"
          transform="rotate(45 12 12)"
          fill={accent}
          style={{ filter: 'drop-shadow(0 0 7px rgb(var(--color-accent-blue) / 0.5))' }}
        />
        <rect
          x="5.25"
          y="5.25"
          width="13.5"
          height="13.5"
          rx="2.25"
          transform="rotate(45 12 12)"
          fill="none"
          stroke="rgb(255 255 255 / 0.3)"
          strokeWidth="0.6"
        />
      </>
    );
  }

  if (kind === 'ring') {
    return (
      <>
        <circle cx="12" cy="12" r="8.25" fill="none" stroke={accent} strokeOpacity="0.14" strokeWidth="1" />
        <circle
          cx="12"
          cy="12"
          r="5.65"
          fill="none"
          stroke={accent}
          strokeWidth="2.35"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 6px rgb(var(--color-accent-indigo) / 0.48))' }}
        />
        <circle cx="12" cy="12" r="5.65" fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="0.45" />
      </>
    );
  }

  return (
    <>
      <path
        d="M12 3.9 19.74 18.45H4.26L12 3.9z"
        fill={accent}
        stroke="rgb(var(--color-background-start))"
        strokeWidth="1.1"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 7px rgb(var(--color-accent-purple) / 0.48))' }}
      />
      <path d="M12 5.95 17.28 16.25H6.72L12 5.95z" fill="rgb(255 255 255 / 0.16)" />
    </>
  );
}

export type ModelGlyphProps = {
  model: ModelId;
  size?: ModelGlyphSize;
  className?: string;
  title?: string;
} & Omit<SVGAttributes<SVGSVGElement>, 'children'>;

/**
 * Vector marks aligned with the homepage models strip: Nano ◆, Flow ○, One △.
 */
export function ModelGlyph({ model, size = 'md', className = '', title, ...rest }: ModelGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${sizeClass[size]} ${className}`}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <HtmlGlyph model={model} />
    </svg>
  );
}

type SvgGlyphProps = {
  model: ModelId;
  cx: number;
  cy: number;
  /** Scale for 24×24 artwork in parent user space */
  scale?: number;
  /** Unique prefix for &lt;defs&gt; ids inside this diagram */
  idPrefix: string;
};

/**
 * Inline-SVG variant for parent &lt;svg&gt; diagrams (Meridian, Lineage).
 */
export function SvgModelGlyph({ model, cx, cy, scale = 1, idPrefix }: SvgGlyphProps) {
  const { icon: kind, color: accent } = zetModelById[model];
  const t = `translate(${cx}, ${cy}) scale(${scale}) translate(-12, -12)`;
  const gradId = `${idPrefix}-diamond-grad-${model}`;

  if (kind === 'diamond') {
    return (
      <g transform={t}>
        <defs>
          <linearGradient id={gradId} x1="18%" y1="0%" x2="82%" y2="100%">
            <stop offset="0%" stopColor="rgb(255 255 255 / 0.5)" />
            <stop offset="40%" stopColor={accent} />
            <stop offset="100%" stopColor={accent} />
          </linearGradient>
        </defs>
        <rect
          x="5.25"
          y="5.25"
          width="13.5"
          height="13.5"
          rx="2.25"
          transform="rotate(45 12 12)"
          fill={`url(#${gradId})`}
          style={{ filter: 'drop-shadow(0 0 4px rgb(var(--color-accent-blue) / 0.4))' }}
        />
        <rect
          x="5.25"
          y="5.25"
          width="13.5"
          height="13.5"
          rx="2.25"
          transform="rotate(45 12 12)"
          fill="none"
          stroke="rgb(255 255 255 / 0.26)"
          strokeWidth="0.55"
        />
      </g>
    );
  }

  if (kind === 'ring') {
    return (
      <g transform={t}>
        <circle cx="12" cy="12" r="8.25" fill="none" stroke={accent} strokeOpacity="0.15" strokeWidth="0.9" />
        <circle
          cx="12"
          cy="12"
          r="5.65"
          fill="none"
          stroke={accent}
          strokeWidth="2.15"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px rgb(var(--color-accent-indigo) / 0.38))' }}
        />
        <circle cx="12" cy="12" r="5.65" fill="none" stroke="rgb(255 255 255 / 0.2)" strokeWidth="0.42" />
      </g>
    );
  }

  return (
    <g transform={t}>
      <path
        d="M12 3.9 19.74 18.45H4.26L12 3.9z"
        fill={accent}
        stroke="rgb(var(--color-background-start))"
        strokeWidth="1.05"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 4px rgb(var(--color-accent-purple) / 0.42))' }}
      />
      <path d="M12 5.85 17.42 16.35H6.58L12 5.85z" fill="rgb(255 255 255 / 0.12)" />
    </g>
  );
}
