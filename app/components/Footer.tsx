'use client';

import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[5] text-sm text-[rgb(var(--color-footer-muted)/0.5)] !pb-8 text-center animate-[fade-in-up_1s_ease-out_0.5s_both] max-md:text-xs max-md:bottom-6">
      {t('footer')}
    </footer>
  );
}
