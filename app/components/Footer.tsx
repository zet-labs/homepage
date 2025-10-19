"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="fixed bottom-4 left-0 right-0 z-[5] text-sm text-[rgb(var(--color-footer-muted)/0.5)] pb-2 text-center animate-[fade-in-up_1s_ease-out_0.5s_both] md:text-sm md:bottom-4 max-md:text-[0.8rem] max-md:bottom-3 max-[480px]:text-[0.75rem] max-[480px]:bottom-3 tracking-wide">
      <span className="opacity-60 hover:opacity-100 transition-opacity duration-300">
        {t("footer")}
      </span>
    </footer>
  );
}
