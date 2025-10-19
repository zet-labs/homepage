"use client";

import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-[clamp(4rem,15vw,11rem)] font-thin leading-[1.1] tracking-[-0.03em] m-0 animate-[fade-in-up_1s_ease-out] md:text-[clamp(4rem,15vw,11rem)] max-md:text-[clamp(4.5rem,16vw,6.5rem)] max-[480px]:text-[clamp(4rem,18vw,6rem)]">
        <span className="bg-gradient-to-br from-[rgb(var(--color-hero-gradient-from))] via-[rgb(var(--color-hero-gradient-via))] to-[rgb(var(--color-hero-gradient-to))] bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient-shift_8s_ease_infinite,fade-in-up_1s_ease-out] inline-block font-thin">
          {t("brandName")}
        </span>
      </h1>

      <p className="text-[rgb(var(--color-foreground-soft)/0.65)] font-extralight text-[clamp(0.875rem,1.8vw,1.05rem)] leading-[1.7] tracking-[0.01em] max-w-[650px] mx-auto my-0 animate-[fade-in-up_1s_ease-out_0.2s_both] md:text-[clamp(0.875rem,1.8vw,1.05rem)] max-md:text-[1rem] max-md:max-w-[85%] max-[480px]:text-[0.95rem] max-[480px]:max-w-[90%] max-[480px]:leading-[1.6] [text-shadow:0_0_40px_rgb(var(--color-accent-indigo)_/_0.15)]">
        {t("tagline")}
      </p>
    </>
  );
}
