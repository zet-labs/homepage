import { getTranslations } from "next-intl/server";
import TerminalDemoLoader from "./TerminalDemoLoader";

export default async function Hero() {
  const t = await getTranslations();

  return (
    <div className="w-full flex flex-col items-center gap-6 max-md:gap-4">
      <div className="flex items-center gap-3 animate-[fade-in-down_0.6s_ease-out]">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[rgb(var(--color-foreground-muted)/0.6)] text-xs tracking-[0.15em] uppercase font-medium">
          {t("labBadge")}
        </span>
      </div>

      <h1 className="text-[clamp(3rem,10vw,7rem)] font-medium leading-[1.1] tracking-[-0.04em] animate-[fade-in-up_0.6s_ease-out] max-md:text-[clamp(2.5rem,12vw,4rem)] font-[family-name:var(--font-geist-sans)]">
        <span className="bg-gradient-to-br from-[rgb(var(--color-hero-gradient-from))] via-[rgb(var(--color-hero-gradient-via))] to-[rgb(var(--color-hero-gradient-to))] bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient-shift_8s_ease_infinite] inline-block">
          {t("brandName")}
        </span>
      </h1>

      <p className="text-[rgb(var(--color-foreground-soft)/0.8)] font-normal text-[clamp(1.1rem,2.5vw,1.5rem)] leading-[1.4] max-w-[600px] mx-auto animate-[fade-in-up_0.6s_ease-out_0.1s_both] max-md:text-[1.1rem] max-md:max-w-[90%] max-[480px]:text-[1rem]">
        {t("tagline")}
      </p>

      <div className="animate-[fade-in-up_0.6s_ease-out_0.2s_both] w-full">
        <TerminalDemoLoader />
      </div>
    </div>
  );
}
