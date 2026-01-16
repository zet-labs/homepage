import { getTranslations } from "next-intl/server";

const services = [
  { key: "research", number: "01" },
  { key: "agentic", number: "02" },
  { key: "solutions", number: "03" },
];

export default async function Services() {
  const t = await getTranslations();

  return (
    <section className="w-full max-w-[1000px] mx-auto reveal-on-scroll">
      <div className="text-center mb-12 max-md:mb-10">
        <h2 className="text-[rgb(var(--color-foreground))] text-4xl font-light tracking-tight mb-3 max-md:text-3xl font-[family-name:var(--font-geist-sans)]">
          {t("services.title")}
        </h2>
        <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-indigo))] to-transparent" />
      </div>

      <div className="flex flex-col gap-4 max-md:gap-3">
        {services.map(({ key, number }) => (
          <div
            key={key}
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-[rgb(var(--color-surface)/0.5)] to-[rgb(var(--color-surface)/0.08)] backdrop-blur-xl border border-[rgb(var(--color-foreground)/0.08)] hover:border-[rgb(var(--color-accent-indigo)/0.3)] transition-all duration-300 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] max-md:p-6"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgb(var(--color-accent-indigo)/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[rgb(var(--color-accent-indigo))] via-[rgb(var(--color-accent-indigo)/0.2)] to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300 [mask-image:linear-gradient(to_right,black_0,black_3px,transparent_3px)]" />
            <div className="absolute left-5 top-7 w-2.5 h-2.5 rounded-full bg-[rgb(var(--color-accent-indigo))] opacity-30 group-hover:opacity-70 transition-opacity duration-300 max-md:left-4 max-md:top-6" />

            <div className="relative z-10 flex items-start gap-6 max-md:flex-col max-md:gap-4">
              <span className="text-[rgb(var(--color-accent-indigo)/0.25)] text-5xl font-bold tracking-tighter shrink-0 max-md:text-4xl">
                {number}
              </span>

              <div className="flex-1 pt-1">
                <div className="flex items-baseline gap-3 mb-2 max-md:flex-col max-md:gap-1">
                  <h3 className="text-[rgb(var(--color-foreground))] font-semibold text-2xl tracking-tight max-md:text-xl">
                    {t(`services.${key}.title`)}
                  </h3>
                  <span className="text-[rgb(var(--color-accent-indigo))] text-xs font-semibold uppercase tracking-[0.2em] max-md:text-[11px]">
                    {t(`services.${key}.subtitle`)}
                  </span>
                </div>
                <p className="text-[rgb(var(--color-foreground-muted)/0.75)] text-base leading-relaxed max-w-[600px] max-md:text-sm">
                  {t(`services.${key}.desc`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
