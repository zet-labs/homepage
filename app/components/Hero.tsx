import { getTranslations } from "next-intl/server";
import TerminalDemoLoader from "./TerminalDemoLoader";

function SparkBars({ className }: { className?: string }) {
  const heights = [5, 9, 4, 13, 7, 15, 10, 14];
  return (
    <svg width="44" height="16" viewBox="0 0 44 16" className={className} aria-hidden="true">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 6}
          y={16 - h}
          width="4"
          height={h}
          rx="1"
          fill="currentColor"
          opacity={0.35 + (i / heights.length) * 0.65}
        />
      ))}
    </svg>
  );
}

function FloatCard({
  children,
  topAccentClass,
  className,
}: {
  children: React.ReactNode;
  topAccentClass: string;
  className?: string;
}) {
  return (
    <div
      className={`hidden xl:flex flex-col gap-1 px-3.5 py-3 rounded-xl border border-[rgb(var(--color-foreground)/0.09)] bg-[rgb(var(--color-surface)/0.68)] backdrop-blur-md shadow-[0_8px_32px_rgb(0_0_0/0.22),inset_0_1px_0_rgb(255_255_255/0.06)] overflow-hidden ${className ?? ""}`}
    >
      <div className={`absolute inset-x-0 top-0 h-px ${topAccentClass}`} aria-hidden="true" />
      {children}
    </div>
  );
}

export default async function Hero() {
  const t = await getTranslations();

  return (
    <div className="w-full flex flex-col items-center gap-6 max-md:gap-4 max-[480px]:gap-3">
      <div className="relative flex flex-col items-center gap-5 max-md:gap-4 w-full">
        <div
          className="absolute -top-24 -left-[18%] w-[560px] h-[380px] rounded-full bg-[radial-gradient(ellipse,rgb(99_102_241/0.16),transparent_65%)] blur-3xl pointer-events-none animate-[float_14s_ease-in-out_infinite] max-md:w-[260px] max-md:h-[220px] max-md:opacity-50"
          aria-hidden="true"
        />
        <div
          className="absolute -top-14 -right-[16%] w-[480px] h-[320px] rounded-full bg-[radial-gradient(ellipse,rgb(139_92_246/0.13),transparent_65%)] blur-3xl pointer-events-none animate-[float_18s_ease-in-out_infinite] max-md:w-[220px] max-md:h-[180px] max-md:opacity-40"
          style={{ animationDelay: "3s" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-28 left-1/2 -translate-x-1/2 w-[640px] h-[190px] rounded-full bg-[radial-gradient(ellipse,rgb(59_130_246/0.08),transparent_65%)] blur-3xl pointer-events-none animate-[float_22s_ease-in-out_infinite] max-md:hidden"
          style={{ animationDelay: "7s" }}
          aria-hidden="true"
        />

        <div
          className="flex items-center gap-3 animate-[fade-in-down_0.5s_ease-out]"
          aria-hidden="true"
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[rgb(var(--color-accent-indigo)/0.45)]" />
          <span className="text-[0.6rem] font-mono tracking-[0.32em] text-[rgb(var(--color-foreground-muted)/0.38)] uppercase select-none">
            AI Research Lab · Prague
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[rgb(var(--color-accent-indigo)/0.45)]" />
        </div>

        <div className="relative flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-[rgb(var(--color-foreground)/0.12)] bg-[rgb(var(--color-surface)/0.6)] backdrop-blur-sm animate-[fade-in-down_0.6s_ease-out] overflow-hidden">
          <span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[rgb(255_255_255/0.05)] to-transparent animate-[shimmer_5s_ease_infinite]"
            aria-hidden="true"
          />
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="relative text-[rgb(var(--color-foreground-muted)/0.72)] text-[0.72rem] tracking-[0.16em] uppercase font-medium max-md:text-[0.68rem]">
            {t("labBadge")}
          </span>
        </div>

        <h1 className="hero-text-glow text-[clamp(3rem,10vw,7rem)] font-medium leading-[1.1] tracking-[-0.04em] animate-[fade-in-up_0.6s_ease-out] max-md:text-[clamp(2.2rem,11vw,3.4rem)] max-[480px]:text-[clamp(2rem,12vw,2.9rem)] font-[family-name:var(--font-geist-sans)]">
          <span className="bg-gradient-to-br from-[rgb(var(--color-hero-gradient-from))] via-[rgb(var(--color-hero-gradient-via))] to-[rgb(var(--color-hero-gradient-to))] bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradient-shift_8s_ease_infinite] inline-block">
            {t("brandName")}
          </span>
        </h1>

        <p className="text-[rgb(var(--color-foreground-soft)/0.8)] font-normal text-[clamp(1.1rem,2.5vw,1.5rem)] leading-[1.4] max-w-[600px] mx-auto animate-[fade-in-up_0.6s_ease-out_0.1s_both] max-md:text-[1.02rem] max-md:max-w-[92%] max-[480px]:text-[0.95rem] max-[480px]:max-w-[94%]">
          {t("tagline")}
        </p>

        <div
          className="flex items-center gap-3 w-full max-w-[220px] animate-[fade-in-up_0.6s_ease-out_0.22s_both]"
          aria-hidden="true"
        >
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgb(var(--color-foreground)/0.1)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-accent-indigo)/0.55)] animate-pulse" />
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgb(var(--color-foreground)/0.1)]" />
        </div>
      </div>

      <div className="animate-[fade-in-up_0.6s_ease-out_0.2s_both] w-full">
        <div className="relative mx-auto max-w-[960px]">
          <div
            className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[rgb(var(--color-accent-indigo)/0.38)] hidden xl:block"
            aria-hidden="true"
          />
          <div
            className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-[rgb(var(--color-accent-indigo)/0.38)] hidden xl:block"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-[rgb(var(--color-accent-indigo)/0.38)] hidden xl:block"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[rgb(var(--color-accent-indigo)/0.38)] hidden xl:block"
            aria-hidden="true"
          />

          <div
            className="absolute inset-x-[18%] -bottom-5 h-14 bg-[radial-gradient(ellipse_at_center,rgb(99_102_241/0.38),transparent_70%)] blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div
            className="absolute inset-x-[10%] top-12 bottom-8 overflow-hidden pointer-events-none hidden xl:block rounded-xl"
            aria-hidden="true"
          >
            <div className="w-full h-24 bg-gradient-to-b from-transparent via-[rgb(99_102_241/0.04)] to-transparent animate-[hero-scan_8s_linear_infinite]" />
          </div>

          <FloatCard
            topAccentClass="bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-indigo)/0.7)] to-transparent"
            className="absolute left-0 top-16"
          >
            <span className="text-lg font-semibold leading-none tabular-nums text-[rgb(var(--color-accent-indigo))]">
              &lt;100ms
            </span>
            <span className="text-[rgb(var(--color-foreground-muted)/0.48)] text-[0.67rem] tracking-[0.06em]">
              Edge latency
            </span>
          </FloatCard>

          <FloatCard
            topAccentClass="bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent"
            className="absolute left-0 bottom-20"
          >
            <span className="text-lg font-semibold leading-none text-emerald-400">On-Prem</span>
            <span className="text-[rgb(var(--color-foreground-muted)/0.48)] text-[0.67rem] tracking-[0.06em]">
              No external APIs
            </span>
          </FloatCard>

          <FloatCard
            topAccentClass="bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-purple)/0.7)] to-transparent"
            className="absolute right-0 top-16"
          >
            <span className="text-lg font-semibold leading-none tabular-nums text-[rgb(var(--color-accent-purple))]">
              3
            </span>
            <span className="text-[rgb(var(--color-foreground-muted)/0.48)] text-[0.67rem] tracking-[0.06em]">
              AI Models
            </span>
          </FloatCard>

          <FloatCard
            topAccentClass="bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-blue)/0.7)] to-transparent"
            className="absolute right-0 bottom-20"
          >
            <SparkBars className="text-[rgb(var(--color-accent-blue))]" />
            <span className="text-[rgb(var(--color-foreground-muted)/0.48)] text-[0.67rem] tracking-[0.06em]">
              Zet Flow
            </span>
          </FloatCard>

          <TerminalDemoLoader />
        </div>
      </div>
    </div>
  );
}
