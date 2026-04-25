/**
 * Single source of truth for Zet product models (Nano, Flow, One).
 * Display names and copy use i18n keys `models.<id>.*`; this module holds structure: tier, colors, icon, gradients.
 */

export const MODEL_IDS = ['nano', 'flow', 'one'] as const;

export type ModelId = (typeof MODEL_IDS)[number];

/** Visual glyph family used by `ModelGlyph` / marketing diagrams */
export type ModelIcon = 'diamond' | 'ring' | 'triangle';

export type ZetModel = {
  id: ModelId;
  /** Tailwind `bg-gradient-to-r` / `from-to` fragment for card chrome */
  gradientClass: string;
  /** Primary accent as a CSS color (for inline styles and glyphs) */
  color: string;
  tier: 'S' | 'M' | 'L';
  icon: ModelIcon;
  /** Soft glow used on journey timeline nodes (full `box-shadow` value) */
  nodeGlow: string;
};

export const ZET_MODELS: ZetModel[] = [
  {
    id: 'nano',
    icon: 'diamond',
    tier: 'S',
    color: 'rgb(var(--color-accent-blue))',
    gradientClass: 'from-[rgb(var(--color-accent-blue))] to-[rgb(var(--color-accent-indigo))]',
    nodeGlow: '0 0 12px 2px rgb(var(--color-accent-blue) / 0.1)',
  },
  {
    id: 'flow',
    icon: 'ring',
    tier: 'M',
    color: 'rgb(var(--color-accent-indigo))',
    gradientClass: 'from-[rgb(var(--color-accent-indigo))] to-[rgb(var(--color-accent-purple))]',
    nodeGlow: '0 0 12px 2px rgb(var(--color-accent-indigo) / 0.1)',
  },
  {
    id: 'one',
    icon: 'triangle',
    tier: 'L',
    color: 'rgb(var(--color-accent-purple))',
    gradientClass: 'from-[rgb(var(--color-accent-purple))] to-[rgb(var(--color-accent-pink))]',
    nodeGlow: '0 0 12px 2px rgb(var(--color-accent-purple) / 0.1)',
  },
];

export const zetModelById = Object.fromEntries(ZET_MODELS.map((m) => [m.id, m])) as Record<
  ModelId,
  ZetModel
>;

export function getZetModel(id: ModelId): ZetModel {
  return zetModelById[id];
}
