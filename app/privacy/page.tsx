import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { FooterSkeleton } from "../components/Skeletons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const title = t("meta.privacy.title");
  const description = t("meta.privacy.description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/privacy",
      type: "website",
      siteName: t("meta.siteName"),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations();
  const sections = [
    {
      title: t("legal.privacy.sections.data.title"),
      body: t.raw("legal.privacy.sections.data.body") as string[],
    },
    {
      title: t("legal.privacy.sections.use.title"),
      body: t.raw("legal.privacy.sections.use.body") as string[],
    },
    {
      title: t("legal.privacy.sections.sharing.title"),
      body: t.raw("legal.privacy.sections.sharing.body") as string[],
    },
    {
      title: t("legal.privacy.sections.security.title"),
      body: t.raw("legal.privacy.sections.security.body") as string[],
    },
    {
      title: t("legal.privacy.sections.choices.title"),
      body: t.raw("legal.privacy.sections.choices.body") as string[],
    },
    {
      title: t("legal.privacy.sections.contact.title"),
      body: [t("legal.privacy.sections.contact.body")],
    },
  ];

  return (
    <div className="min-h-screen w-screen relative overflow-x-hidden bg-[rgb(var(--color-background-start))] flex flex-col">
      <Navigation />

      <main className="relative z-[4] flex flex-col items-center px-6 max-md:px-4 max-[480px]:px-3 flex-1">
        <section className="py-28 w-full max-w-[900px] max-md:py-20">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[rgb(var(--color-foreground-muted)/0.6)] mb-4">
              {t("legal.privacy.kicker")}
            </p>
            <h1 className="text-[rgb(var(--color-foreground))] text-5xl font-medium tracking-tight max-md:text-4xl font-[family-name:var(--font-geist-sans)]">
              {t("legal.privacy.title")}
            </h1>
            <p className="text-[rgb(var(--color-foreground-muted)/0.7)] text-sm mt-3">
              {t("legal.privacy.updated")}
            </p>
          </div>

          <p className="text-[rgb(var(--color-foreground-soft)/0.85)] text-base leading-relaxed max-w-[760px] mb-10">
            {t("legal.privacy.intro")}
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-[rgb(var(--color-foreground))] text-xl font-semibold">
                  {section.title}
                </h2>
                <ul className="space-y-2 text-[rgb(var(--color-foreground-muted)/0.8)] text-sm leading-relaxed">
                  {section.body.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}
