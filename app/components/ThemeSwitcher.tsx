'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

const themeOrder = ['system', 'light', 'dark'] as const;

export default function ThemeSwitcher() {
  const t = useTranslations('themeSwitcher');
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const activeTheme = themeOrder.includes((theme ?? 'system') as (typeof themeOrder)[number])
    ? (theme as (typeof themeOrder)[number])
    : 'system';

  const cycleTheme = () => {
    const nextIndex = (themeOrder.indexOf(activeTheme) + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center justify-center w-8 h-8 max-md:w-7 max-md:h-7 text-[rgb(var(--color-foreground)/0.6)] bg-transparent border-none opacity-60 shrink-0"
        aria-label={t('cycle')}
      >
        <svg
          width="16"
          height="16"
          className="block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="inline-flex items-center justify-center w-8 h-8 max-md:w-7 max-md:h-7 text-[rgb(var(--color-foreground)/0.6)] bg-transparent border-none cursor-pointer transition-all duration-300 opacity-60 hover:opacity-100 shrink-0"
      aria-label={t('cycle')}
      title={t('current', {
        mode:
          activeTheme === 'system' ? t('system') : activeTheme === 'light' ? t('light') : t('dark'),
        resolved: resolvedTheme === 'dark' ? t('dark') : t('light'),
      })}
    >
      {activeTheme === 'system' ? (
        <svg
          width="16"
          height="16"
          className="block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8" />
          <path d="M12 16v4" />
        </svg>
      ) : activeTheme === 'dark' ? (
        <svg
          width="16"
          height="16"
          className="block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          className="block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
