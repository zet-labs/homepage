import { getTranslations } from "next-intl/server";
import { ZET_MODELS } from "@/app/lib/zet-models";
import { ModelGlyph } from "./ModelGlyph";

type ModelsProps = {
  /** Use on `/models` so the page has a single document-level heading. */
  headingLevel?: "h1" | "h2";
};

export default async function Models({ headingLevel = "h2" }: ModelsProps) {
  const t = await getTranslations();
  const TitleTag = headingLevel === "h1" ? "h1" : "h2";

  return (
    <section className="w-full max-w-[1100px] mx-auto reveal-on-scroll">
      <div className="text-center mb-16 max-md:mb-12">
        <span className="inline-block mb-4 text-xs font-medium tracking-[0.2em] uppercase text-[rgb(var(--color-accent-purple))]">
          {t("models.subtitle")}
        </span>
        <TitleTag className="text-[rgb(var(--color-foreground))] text-5xl font-medium tracking-tight mb-4 max-md:text-4xl font-[family-name:var(--font-geist-sans)]">
          {t("models.title")}
        </TitleTag>
        <p className="text-[rgb(var(--color-foreground-muted)/0.7)] text-lg max-w-[500px] mx-auto max-md:text-base">
          {t("models.description")}
        </p>
        <div className="w-24 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-[rgb(var(--color-accent-purple))] to-transparent" />
      </div>

      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1 max-md:gap-5 items-stretch">
        {ZET_MODELS.map(({ id, gradientClass, color, tier }) => (
          <div key={id} className="group relative flex">
            <div
              className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
            />

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[rgb(var(--color-surface)/0.5)] to-[rgb(var(--color-surface)/0.12)] backdrop-blur-2xl border border-[rgb(var(--color-foreground)/0.08)] group-hover:border-[rgb(var(--color-foreground)/0.15)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] flex-1 flex flex-col">
              <div className={`h-1.5 w-full bg-gradient-to-r ${gradientClass}`} />

              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b ${gradientClass} opacity-[0.08] blur-3xl pointer-events-none`}
              />
              <div className="absolute -right-6 -top-10 text-[150px] font-black tracking-tighter text-[rgb(var(--color-foreground)/0.04)] select-none">
                {tier}
              </div>

              <div className="relative p-8 max-md:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <ModelGlyph model={id} size="md" className="opacity-[0.98]" aria-hidden />
                    <h3 className="text-[rgb(var(--color-foreground))] font-semibold text-2xl tracking-tight max-md:text-xl font-[family-name:var(--font-geist-sans)]">
                      {t(`models.${id}.name`)}
                    </h3>
                  </div>
                  <span className="text-[rgb(var(--color-foreground-muted)/0.2)] text-4xl font-semibold tracking-tighter leading-none">
                    {tier}
                  </span>
                </div>

                <p className="text-[rgb(var(--color-foreground))] font-medium text-lg mb-3 max-md:text-base">
                  {t(`models.${id}.subtitle`)}
                </p>

                <span
                  className={`mb-5 inline-flex items-center gap-2 self-start text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${gradientClass} text-white shadow-lg w-fit`}
                >
                  {t(`models.${id}.badge`)}
                </span>

                <p className="text-[rgb(var(--color-foreground-muted)/0.65)] text-sm leading-relaxed">
                  {t(`models.${id}.desc`)}
                </p>

                <div className="mt-5">
                  <span className="block text-[11px] uppercase tracking-[0.22em] font-semibold text-[rgb(var(--color-foreground-muted)/0.6)] mb-2">
                    {t("models.bestForTitle")}
                  </span>
                  <div className="flex flex-col gap-2">
                    {(t.raw(`models.${id}.bestFor`) as string[]).map((item) => (
                      <span
                        key={`${id}-bestfor-${item}`}
                        className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-[rgb(var(--color-surface)/0.35)] border border-[rgb(var(--color-foreground)/0.08)] text-[rgb(var(--color-foreground-muted)/0.8)] w-fit"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 0 8px ${color}`,
                          }}
                        />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
