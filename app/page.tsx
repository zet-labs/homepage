import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import BottomCTA from "./components/BottomCTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Models from "./components/Models";
import Navigation from "./components/Navigation";
import ContactCTA from "./components/ContactCTA";
import ScrollIndicator from "./components/ScrollIndicator";
import ScrollRevealHandler from "./components/ScrollRevealHandler";
import SecurityBadges from "./components/SecurityBadges";
import Services from "./components/Services";
import AIAgentDiagram from "./components/AIAgentDiagram";
import {
  BottomCTASkeleton,
  FooterSkeleton,
  HeroSkeleton,
  ModelsSkeleton,
  SecurityBadgesSkeleton,
  ServicesSkeleton,
  TrustedBySkeleton,
} from "./components/Skeletons";
import TrustedBy from "./components/TrustedBy";
import WaitlistButton from "./components/WaitlistButton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const title = t("meta.home.title");
  const description = t("meta.home.description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/",
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

export default async function Home() {
  const t = await getTranslations("responsible");

  return (
    <div className="min-h-screen w-screen relative overflow-x-hidden bg-[rgb(var(--color-background-start))] flex flex-col">
      <ScrollRevealHandler />
      <Navigation />

      <main className="relative z-[4] flex flex-col items-center px-6 max-md:px-4 max-[480px]:px-3 flex-1">
        <section
          id="waitlist"
          className="min-h-[100dvh] flex flex-col items-center justify-center py-12 w-full max-w-[1400px] relative max-md:pt-20"
        >
          <div className="text-center w-full flex flex-col items-center justify-center gap-6 max-md:gap-5">
            <Suspense fallback={<HeroSkeleton />}>
              <Hero />
            </Suspense>
            <WaitlistButton />
          </div>
          <div className="absolute bottom-32 left-0 right-0 max-lg:static max-lg:mt-12 max-lg:mb-20">
            <Suspense fallback={<TrustedBySkeleton />}>
              <TrustedBy />
            </Suspense>
          </div>
          <ScrollIndicator />
        </section>

        <section id="services" className="py-16 w-full max-w-[1200px] max-md:py-12 scroll-mt-16">
          <Suspense fallback={<ServicesSkeleton />}>
            <Services />
          </Suspense>
        </section>

        <section className="w-full max-w-[1200px]">
          <AIAgentDiagram />
        </section>

        <section id="models" className="py-16 w-full max-w-[1200px] max-md:py-12 scroll-mt-16">
          <Suspense fallback={<ModelsSkeleton />}>
            <Models />
          </Suspense>
        </section>

        <section
          id="responsible-ai"
          className="py-16 w-full max-w-[1200px] max-md:py-12 reveal-on-scroll"
        >
          <div className="relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-[32px] border border-[rgb(var(--color-foreground)/0.1)] bg-[radial-gradient(900px_circle_at_12%_-20%,rgb(16_185_129/0.2),transparent_55%),radial-gradient(700px_circle_at_88%_0%,rgb(59_130_246/0.16),transparent_60%),linear-gradient(140deg,rgb(var(--color-surface)/0.9)_0%,rgb(var(--color-surface)/0.55)_55%,rgb(var(--color-surface)/0.25)_100%)] p-8 md:p-12 shadow-[0_32px_90px_rgb(0_0_0/0.28)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-35" />
            <div className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgb(16_185_129/0.35),transparent_70%)] blur-2xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.7),rgba(59,130,246,0.6),transparent)] opacity-80" />
            <div className="relative grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col gap-5">
                <span className="w-fit rounded-full border border-[rgb(16_185_129/0.5)] bg-[rgb(16_185_129/0.12)] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[rgb(16_185_129)]">
                  {t("kicker")}
                </span>
                <h2 className="text-[rgb(var(--color-foreground))] text-2xl md:text-3xl font-semibold tracking-tight">
                  {t("title")}
                </h2>
                <p className="text-[rgb(var(--color-foreground-soft)/0.9)] text-[1rem] md:text-[1.05rem] max-w-[520px]">
                  {t("subtitle")}
                </p>
              </div>
              <div className="flex flex-col gap-5">
                {(t.raw("principles") as { title: string; body: string }[]).map(
                  (item, index, list) => (
                    <div key={item.title} className="group relative flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-[rgb(16_185_129)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`mt-3 w-px flex-1 bg-[linear-gradient(180deg,rgba(16,185,129,0.55),rgba(59,130,246,0.12))] ${
                            index === list.length - 1 ? "opacity-0" : "opacity-100"
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="relative flex-1 overflow-hidden rounded-2xl border border-[rgb(var(--color-foreground)/0.12)] bg-[linear-gradient(135deg,rgb(var(--color-surface)/0.85),rgb(var(--color-surface)/0.4))] p-5 md:p-6 shadow-[0_18px_40px_rgb(0_0_0/0.18)] transition-transform duration-300 group-hover:-translate-y-1">
                        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgb(16_185_129/0.35),transparent_70%)] opacity-70 blur-2xl" />
                        <h3 className="text-[rgb(var(--color-foreground))] text-lg font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[rgb(var(--color-foreground-soft)/0.85)] text-[0.95rem] leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full reveal-on-scroll">
          <ContactCTA />
        </section>

        <section className="py-12 w-full max-w-[1200px] max-md:py-8 reveal-on-scroll">
          <Suspense fallback={<SecurityBadgesSkeleton />}>
            <SecurityBadges />
          </Suspense>
        </section>

        <section className="py-16 w-full max-w-[1200px] max-md:py-12 reveal-on-scroll">
          <Suspense fallback={<BottomCTASkeleton />}>
            <BottomCTA />
          </Suspense>
        </section>
      </main>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}
