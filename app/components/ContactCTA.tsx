import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function ContactCTA() {
  const t = await getTranslations();

  return (
    <section className="py-12 w-full max-md:py-10">
      <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--color-foreground)/0.08)] bg-[rgb(var(--color-surface)/0.25)] backdrop-blur-2xl px-10 py-10 max-md:px-6 max-md:py-8 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] max-w-[1100px] mx-auto">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-indigo))] to-transparent opacity-70" />
        <div className="pointer-events-none absolute -top-24 right-0 h-48 w-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--color-accent-purple)/0.22),transparent_70%)] blur-3xl" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-[640px] text-left">
            <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--color-foreground-muted)/0.6)] mb-3">
              {t("contactCta.kicker")}
            </p>
            <h3 className="text-[rgb(var(--color-foreground))] text-3xl font-semibold tracking-tight max-md:text-2xl font-[family-name:var(--font-geist-sans)]">
              {t("contactCta.title")}
            </h3>
            <p className="text-[rgb(var(--color-foreground-muted)/0.8)] text-sm mt-3">
              {t("contactCta.subtitle")}
            </p>
          </div>
          <Link
            href="/contact"
            prefetch
            className="inline-flex items-center justify-center px-6 h-11 rounded-full text-sm font-semibold bg-[rgb(var(--color-accent-indigo))] !text-white hover:bg-[rgb(var(--color-accent-purple))] transition-colors"
            style={{ color: "white" }}
          >
            {t("contactCta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
