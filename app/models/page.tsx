import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ScrollRevealHandler from "../components/ScrollRevealHandler";
import { FooterSkeleton, ModelsJourneySkeleton } from "../components/Skeletons";
import ModelsJourney from "./ModelsJourney";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const title = t("meta.models.title");
  const description = t("meta.models.description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/models",
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

export default function ModelsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[rgb(var(--color-background-start))]">
      <ScrollRevealHandler />
      <Navigation />

      <main className="relative z-[4] flex w-full min-w-0 flex-col items-center overflow-x-hidden overflow-y-visible px-5 max-md:px-4 max-[480px]:px-3 pt-24 max-[380px]:pt-[5.75rem] sm:pt-28 pb-24 max-[480px]:pb-[max(6rem,calc(env(safe-area-inset-bottom,0px)+1.25rem))] sm:pb-28 md:pb-36 lg:pb-44 flex-1">
        <Suspense fallback={<ModelsJourneySkeleton />}>
          <ModelsJourney />
        </Suspense>
      </main>

      <Suspense fallback={<FooterSkeleton />}>
        <Footer />
      </Suspense>
    </div>
  );
}
