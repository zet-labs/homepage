"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SITE_EMAIL, SITE_EMAIL_JOBS } from "../../lib/site";

type Job = {
  id: string;
  title: string;
  formalTitle: string;
  seniority: string;
  location: string;
  category: "ai-ml" | "frontend-backend";
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export default function JobsPageClient() {
  const t = useTranslations("jobs");
  const common = useTranslations("common");
  const roles = t.raw("roles") as Job[];
  const stack = t.raw("stack") as {
    kicker: string;
    title: string;
    subtitle: string;
    groups: { title: string; items: string[] }[];
  };
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleCopy = async (id: string) => {
    const url = `${window.location.origin}/jobs#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setCopiedId(null);
    }
  };

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace("#", "").trim();
      setActiveId(id || null);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <main className="relative z-[4] flex flex-col items-center px-6 max-md:px-4 max-[480px]:px-3 pt-28 pb-20 flex-1">
      <section className="w-full max-w-[1100px]">
        <div className="flex flex-col items-center text-center mb-10">
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-medium leading-[1.1] tracking-[-0.04em] font-[family-name:var(--font-geist-sans)]">
            {t("heroTitle")}
          </h1>

          <p className="text-[rgb(var(--color-foreground-soft)/0.85)] text-[clamp(1rem,2.2vw,1.2rem)] max-w-[720px] mt-4">
            {t("heroSubtitle")}
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-[820px] rounded-full bg-[linear-gradient(135deg,rgb(16_185_129/0.95),rgb(52_211_153/0.95))] px-6 py-3 text-sm text-white shadow-[0_0_35px_rgb(16_185_129/0.6)] max-md:rounded-2xl max-md:px-4 max-md:py-2 max-md:text-[0.8rem] max-md:leading-snug max-md:text-center">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white/90 shadow-[0_0_10px_rgb(255_255_255/0.8)]" />
              {t("status")}
            </span>
          </div>
        </div>

        <section className="mt-10 relative overflow-hidden rounded-[26px] border border-[rgb(var(--color-foreground)/0.1)] bg-[radial-gradient(900px_circle_at_15%_-20%,rgb(var(--color-accent-indigo)/0.18),transparent_55%),radial-gradient(700px_circle_at_85%_0%,rgb(var(--color-accent-purple)/0.16),transparent_60%),linear-gradient(160deg,rgb(var(--color-surface)/0.75)_0%,rgb(var(--color-surface)/0.4)_60%,rgb(var(--color-surface)/0.2)_100%)] backdrop-blur-2xl p-5 md:p-7 shadow-[0_26px_70px_rgb(0_0_0/0.2)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.6),rgba(139,92,246,0.6),transparent)] opacity-70" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--color-foreground)/0.18),transparent_70%)] blur-3xl" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <h2 className="text-[rgb(var(--color-foreground))] text-xl md:text-2xl font-semibold tracking-tight">
                  {stack.title}
                </h2>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgb(var(--color-foreground)/0.15)] bg-[rgb(var(--color-foreground)/0.04)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[rgb(var(--color-foreground-muted)/0.85)]">
                  {stack.kicker}
                </span>
              </div>
              <p className="text-[rgb(var(--color-foreground-soft)/0.9)] text-[0.92rem] max-w-[700px]">
                {stack.subtitle}
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {stack.groups.map((group) => (
                <div
                  key={group.title}
                  className="group rounded-2xl border border-[rgb(var(--color-foreground)/0.1)] bg-[linear-gradient(160deg,rgb(var(--color-surface)/0.6),rgb(var(--color-surface)/0.25))] p-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgb(var(--color-foreground-muted)/0.75)]">
                      {group.title}
                    </h3>
                    <span className="h-px flex-1 ml-3 bg-[linear-gradient(90deg,transparent,rgb(var(--color-foreground)/0.2),transparent)]" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[rgb(var(--color-foreground))] bg-[rgb(var(--color-foreground)/0.06)] border border-[rgb(var(--color-foreground)/0.12)] shadow-[0_8px_16px_rgb(0_0_0/0.08)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-12">
          {[
            { key: "frontend-backend", title: t("categories.frontendBackend") },
            { key: "ai-ml", title: t("categories.aiMl") },
          ].map((group) => {
            const items = roles.filter((role) => role.category === group.key);
            if (items.length === 0) return null;
            return (
              <section key={group.key} className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[rgb(var(--color-foreground))] text-xl md:text-2xl font-semibold tracking-tight">
                    {group.title}
                  </h2>
                  <div className="h-px flex-1 ml-6 bg-[linear-gradient(90deg,transparent,rgb(var(--color-foreground)/0.18),transparent)]" />
                </div>

                <div className="grid gap-12">
                  {items.map((job) => (
                    <article
                      key={job.id}
                      id={job.id}
                      className={`relative overflow-hidden rounded-[24px] border border-[rgb(var(--color-foreground)/0.08)] bg-[radial-gradient(1000px_circle_at_10%_-20%,rgb(var(--color-accent-indigo)/0.1),transparent_45%),radial-gradient(800px_circle_at_100%_0%,rgb(var(--color-accent-purple)/0.1),transparent_55%),linear-gradient(160deg,rgb(var(--color-surface)/0.6)_0%,rgb(var(--color-surface)/0.25)_55%,rgb(var(--color-surface)/0.12)_100%)] backdrop-blur-2xl p-7 md:p-9 shadow-[0_24px_70px_rgb(0_0_0/0.28)] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(var(--color-foreground)/0.2)] hover:shadow-[0_32px_90px_rgb(0_0_0/0.36)] ${
                        activeId === job.id
                          ? "border-[rgb(var(--color-accent-indigo)/0.5)] shadow-[0_34px_100px_rgb(99_102_241/0.28)]"
                          : ""
                      }`}
                    >
                      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_circle_at_20%_-15%,rgb(var(--color-accent-indigo)/0.16),transparent_55%),radial-gradient(700px_circle_at_90%_0%,rgb(var(--color-accent-purple)/0.14),transparent_55%)] opacity-80" />
                      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.6),rgba(139,92,246,0.6),transparent)] opacity-80" />
                      <div className="relative z-[1] flex flex-col gap-7">
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-col gap-1">
                              <h3 className="text-xl md:text-2xl font-semibold text-[rgb(var(--color-foreground))] tracking-[-0.01em]">
                                {job.title}
                              </h3>
                              <span className="text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--color-foreground-muted)/0.6)]">
                                {job.formalTitle}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 md:justify-end">
                              <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase text-[rgb(var(--color-foreground-muted)/0.9)] border border-[rgb(var(--color-foreground)/0.15)] bg-[rgb(var(--color-foreground)/0.03)]">
                                {job.seniority}
                              </span>
                              <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase text-[rgb(var(--color-foreground-muted)/0.9)] border border-[rgb(var(--color-foreground)/0.15)] bg-[rgb(var(--color-foreground)/0.03)]">
                                {job.location}
                              </span>
                            </div>
                          </div>
                          <p className="text-[rgb(var(--color-foreground-soft)/0.9)] text-[0.98rem] leading-[1.65] max-w-[900px]">
                            {job.summary}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10">
                          <div className="space-y-3">
                            <h4 className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[rgb(var(--color-foreground-muted)/0.75)]">
                              {t("sections.responsibilities")}
                            </h4>
                            <ul className="space-y-3 text-[rgb(var(--color-foreground)/0.9)] text-[0.9rem] leading-relaxed">
                              {job.responsibilities.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="text-[rgb(var(--color-accent-indigo))]">
                                    {common("separator")}
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[rgb(var(--color-foreground-muted)/0.75)]">
                              {t("sections.requirements")}
                            </h4>
                            <ul className="space-y-3 text-[rgb(var(--color-foreground)/0.9)] text-[0.9rem] leading-relaxed">
                              {job.requirements.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="text-[rgb(var(--color-accent-purple))]">
                                    {common("separator")}
                                  </span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-3 w-full max-md:flex-nowrap max-md:justify-start">
                          <button
                            type="button"
                            onClick={() => handleCopy(job.id)}
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-full border text-[rgb(var(--color-foreground))] transition-all duration-200 shrink-0 cursor-pointer ${
                              copiedId === job.id
                                ? "border-[rgb(16_185_129/0.9)] bg-[rgb(16_185_129/0.2)] text-[rgb(16_185_129)] shadow-[0_0_18px_rgb(16_185_129/0.45)]"
                                : "border-[rgb(var(--color-foreground)/0.25)] bg-[rgb(var(--color-surface)/0.35)] hover:border-[rgb(var(--color-foreground)/0.4)] hover:bg-[rgb(var(--color-foreground)/0.08)]"
                            }`}
                            aria-label={
                              copiedId === job.id ? t("actions.copied") : t("actions.copyLink")
                            }
                            title={
                              copiedId === job.id ? t("actions.copied") : t("actions.copyLink")
                            }
                          >
                            {copiedId === job.id ? (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4"
                                aria-hidden="true"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            ) : (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4"
                                aria-hidden="true"
                              >
                                <path d="M10 14a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10 6" />
                                <path d="M14 10a5 5 0 0 0-7.07 0l-2.12 2.12a5 5 0 0 0 7.07 7.07L14 18" />
                              </svg>
                            )}
                          </button>
                          <a
                            href={`mailto:${SITE_EMAIL_JOBS}?subject=${encodeURIComponent(job.title)}`}
                            className="inline-flex items-center justify-center px-4 h-10 rounded-full text-[13px] font-semibold whitespace-nowrap bg-[linear-gradient(135deg,rgb(var(--color-accent-indigo)),rgb(var(--color-accent-purple)))] !text-white border border-[rgb(var(--color-foreground)/0.18)] shadow-[0_12px_28px_rgb(var(--color-accent-indigo)/0.35),0_0_32px_rgb(var(--color-accent-purple)/0.22)] hover:shadow-[0_14px_34px_rgb(var(--color-accent-indigo)/0.4),0_0_40px_rgb(var(--color-accent-purple)/0.26)] hover:-translate-y-[1px] transition-all duration-200 shrink-0"
                            style={{ color: "white" }}
                          >
                            {t("actions.apply")}
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="w-full max-w-[1100px] mt-20">
        <div className="rounded-3xl border border-[rgb(var(--color-foreground)/0.08)] bg-[rgb(var(--color-surface)/0.3)] backdrop-blur-xl p-8 md:p-10 text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
          <h3 className="text-xl md:text-2xl font-semibold text-[rgb(var(--color-foreground))]">
            {t("footer.title")}
          </h3>
          <p className="text-[rgb(var(--color-foreground-soft)/0.85)] mt-3">{t("footer.body")}</p>
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="inline-flex items-center justify-center mt-5 px-6 h-11 rounded-full bg-[rgb(var(--color-accent-indigo))] !text-white text-sm font-semibold hover:bg-[rgb(var(--color-accent-purple))] transition-colors"
            style={{ color: "white" }}
          >
            {t("footer.cta")}
          </a>
        </div>
      </section>
    </main>
  );
}
