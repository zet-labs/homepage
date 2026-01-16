import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import BackgroundEffects from "./components/BackgroundEffects";
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

export default function Home() {
  return (
    <div className="min-h-screen w-screen relative overflow-x-hidden bg-[rgb(var(--color-background-start))] flex flex-col">
      <ScrollRevealHandler />
      <Navigation />
      <BackgroundEffects />

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
