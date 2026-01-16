"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const nextLocale = locale === "en" ? "cs" : "en";

  const toggleLanguage = () => {
    document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`;
    router.refresh();
  };

  return (
    <button
      type="button"
      className="inline-flex items-center justify-center w-8 h-8 max-md:w-7 max-md:h-7 text-xs font-medium text-[rgb(var(--color-foreground-muted)/0.6)] bg-transparent border-none cursor-pointer transition-all duration-300 tracking-wide opacity-60 hover:opacity-100 leading-none shrink-0"
      onClick={toggleLanguage}
      aria-label={nextLocale === "cs" ? t("ariaToCs") : t("ariaToEn")}
    >
      <span className="block">{nextLocale === "cs" ? t("toCs") : t("toEn")}</span>
    </button>
  );
}
